import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import {
  BarChart2,
  PieChart,
  LineChart,
  TrendingUp,
  Database,
  MapPin,
} from 'lucide-react';
import { Service } from '../types/Service';
import { supabase } from '../lib/supabase';

export type ServiceIconName =
  | 'BarChart2'
  | 'PieChart'
  | 'LineChart'
  | 'TrendingUp'
  | 'Database'
  | 'MapPin';

export interface StoredService {
  id: string;
  title: string;
  description: string;
  fullDescription?: string[];
  iconName: ServiceIconName;
  image: string;
  features?: string[];
}

interface ServicesContextType {
  services: Service[];
  storedServices: StoredService[];
  addService: (service: StoredService) => Promise<void>;
  updateService: (service: StoredService) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  getServiceById: (id: string) => Service | undefined;
  refreshServices: () => Promise<void>;
  isLoading: boolean;
}

const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

const iconMap = {
  BarChart2,
  PieChart,
  LineChart,
  TrendingUp,
  Database,
  MapPin,
};

const normalizeIconName = (iconName: string): ServiceIconName => {
  const validIcons: ServiceIconName[] = [
    'BarChart2',
    'PieChart',
    'LineChart',
    'TrendingUp',
    'Database',
    'MapPin',
  ];

  return validIcons.includes(iconName as ServiceIconName)
    ? (iconName as ServiceIconName)
    : 'BarChart2';
};

const toRuntimeService = (service: StoredService): Service => ({
  id: service.id,
  title: service.title,
  description: service.description,
  fullDescription: service.fullDescription || [],
  icon: iconMap[service.iconName],
  image: service.image,
  features: service.features || [],
});

const fromDbRow = (row: any): StoredService => ({
  id: row.id,
  title: row.title,
  description: row.description,
  fullDescription: Array.isArray(row.full_description) ? row.full_description : [],
  iconName: normalizeIconName(row.icon_name),
  image: row.image,
  features: Array.isArray(row.features) ? row.features : [],
});

const toDbRow = (service: StoredService) => ({
  id: service.id,
  title: service.title,
  description: service.description,
  full_description: service.fullDescription || [],
  icon_name: service.iconName,
  image: service.image,
  features: service.features || [],
  updated_at: new Date().toISOString(),
});

export const ServicesProvider = ({ children }: { children: ReactNode }) => {
  const [storedServices, setStoredServices] = useState<StoredService[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshServices = async () => {
    setIsLoading(true);

    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('title', { ascending: true });

    if (error) {
      console.error('Failed to fetch services from Supabase:', error);
      setIsLoading(false);
      return;
    }

    setStoredServices((data || []).map(fromDbRow));
    setIsLoading(false);
  };

  useEffect(() => {
    refreshServices();
  }, []);

  const services = useMemo(() => {
    return storedServices.map(toRuntimeService);
  }, [storedServices]);

  const addService = async (service: StoredService) => {
    const { error } = await supabase.from('services').insert([toDbRow(service)]);

    if (error) {
      console.error('Failed to add service:', error);
      throw error;
    }

    await refreshServices();
  };

  const updateService = async (service: StoredService) => {
    const { error } = await supabase
      .from('services')
      .update(toDbRow(service))
      .eq('id', service.id);

    if (error) {
      console.error('Failed to update service:', error);
      throw error;
    }

    await refreshServices();
  };

  const deleteService = async (id: string) => {
    const { error } = await supabase.from('services').delete().eq('id', id);

    if (error) {
      console.error('Failed to delete service:', error);
      throw error;
    }

    await refreshServices();
  };

  const getServiceById = (id: string) => {
    return services.find((service) => service.id === id);
  };

  return (
    <ServicesContext.Provider
      value={{
        services,
        storedServices,
        addService,
        updateService,
        deleteService,
        getServiceById,
        refreshServices,
        isLoading,
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
};

export const useServices = () => {
  const context = useContext(ServicesContext);

  if (!context) {
    throw new Error('useServices must be used within a ServicesProvider');
  }

  return context;
};