import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  Search,
  Trash2,
  Briefcase,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  ServiceIconName,
  StoredService,
  useServices,
} from '../../context/ServicesContext';

const serviceSchema = z.object({
  id: z
    .string()
    .min(3, 'ID must be at least 3 characters')
    .regex(/^[a-z0-9-]+$/, 'Use lowercase letters, numbers, and hyphens only'),
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  image: z.string().url('Must be a valid URL'),
  iconName: z.enum([
    'BarChart2',
    'PieChart',
    'LineChart',
    'TrendingUp',
    'Database',
    'MapPin',
  ]),
  fullDescription: z.string().optional(),
  features: z.string().optional(),
});

type ServiceFormData = z.infer<typeof serviceSchema>;

const iconOptions: ServiceIconName[] = [
  'BarChart2',
  'PieChart',
  'LineChart',
  'TrendingUp',
  'Database',
  'MapPin',
];

const AdminServicesPage = () => {
  const { storedServices, addService, updateService, deleteService, isLoading } = useServices();
  const [isEditing, setIsEditing] = useState(false);
  const [currentService, setCurrentService] = useState<StoredService | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 5;

  const filteredServices = storedServices.filter((service) =>
    [service.title, service.description, service.id].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService);
  const totalPages = Math.ceil(filteredServices.length / servicesPerPage);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
  });

  useEffect(() => {
    document.title = 'Manage Services | Admin Dashboard';
  }, []);

  useEffect(() => {
    if (isEditing && currentService) {
      setValue('id', currentService.id);
      setValue('title', currentService.title);
      setValue('description', currentService.description);
      setValue('image', currentService.image);
      setValue('iconName', currentService.iconName);
      setValue('fullDescription', (currentService.fullDescription || []).join('\n\n'));
      setValue('features', (currentService.features || []).join('\n'));
    } else {
      reset({
        id: '',
        title: '',
        description: '',
        image: '',
        iconName: 'BarChart2',
        fullDescription: '',
        features: '',
      });
    }
  }, [isEditing, currentService, reset, setValue]);

  const handleEdit = (service: StoredService) => {
    setCurrentService(service);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (confirmDelete === id) {
      try {
        await deleteService(id);
        setConfirmDelete(null);

        if (currentServices.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      } catch {
        alert('Failed to delete service.');
      }
    } else {
      setConfirmDelete(id);
    }
  };

  const onSubmit = async (data: ServiceFormData) => {
    const serviceData: StoredService = {
      id: data.id.trim(),
      title: data.title.trim(),
      description: data.description.trim(),
      image: data.image.trim(),
      iconName: data.iconName,
      fullDescription: data.fullDescription
        ? data.fullDescription
            .split('\n\n')
            .map((item) => item.trim())
            .filter(Boolean)
        : [],
      features: data.features
        ? data.features
            .split('\n')
            .map((item) => item.trim())
            .filter(Boolean)
        : [],
    };

    const duplicateId =
      !isEditing &&
      storedServices.some((service) => service.id.toLowerCase() === serviceData.id.toLowerCase());

    if (duplicateId) {
      alert('A service with that ID already exists. Please use a unique ID.');
      return;
    }

    try {
      if (isEditing && currentService) {
        await updateService(serviceData);
      } else {
        await addService(serviceData);
      }

      setIsEditing(false);
      setCurrentService(null);
      reset();
    } catch {
      alert('Failed to save service.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Services</h1>
          <Link to="/admin" className="btn bg-gray-600 text-white hover:bg-gray-700">
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {isEditing ? 'Edit Service' : 'Add New Service'}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-1">
                  Service ID *
                </label>
                <input
                  id="id"
                  type="text"
                  {...register('id')}
                  disabled={isEditing}
                  className={`form-control ${errors.id ? 'border-red-500' : ''}`}
                  placeholder="example-service-id"
                />
                {errors.id && <p className="mt-1 text-sm text-red-600">{errors.id.message}</p>}
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  id="title"
                  type="text"
                  {...register('title')}
                  className={`form-control ${errors.title ? 'border-red-500' : ''}`}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL *
                </label>
                <input
                  id="image"
                  type="text"
                  {...register('image')}
                  className={`form-control ${errors.image ? 'border-red-500' : ''}`}
                />
                {errors.image && (
                  <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="iconName" className="block text-sm font-medium text-gray-700 mb-1">
                  Icon *
                </label>
                <select
                  id="iconName"
                  {...register('iconName')}
                  className={`form-control ${errors.iconName ? 'border-red-500' : ''}`}
                >
                  {iconOptions.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
                {errors.iconName && (
                  <p className="mt-1 text-sm text-red-600">{errors.iconName.message}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Short Description *
              </label>
              <textarea
                id="description"
                rows={3}
                {...register('description')}
                className={`form-control ${errors.description ? 'border-red-500' : ''}`}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="fullDescription"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Description (separate paragraphs with a blank line)
              </label>
              <textarea
                id="fullDescription"
                rows={8}
                {...register('fullDescription')}
                className="form-control"
              />
            </div>

            <div>
              <label htmlFor="features" className="block text-sm font-medium text-gray-700 mb-1">
                Features (one per line)
              </label>
              <textarea
                id="features"
                rows={8}
                {...register('features')}
                className="form-control"
              />
            </div>

            <div className="flex justify-end space-x-4">
              {isEditing && (
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setCurrentService(null);
                    reset();
                  }}
                  className="btn bg-gray-200 text-gray-800 hover:bg-gray-300"
                >
                  Cancel
                </button>
              )}

              <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                {isSubmitting ? 'Saving...' : isEditing ? 'Update Service' : 'Add Service'}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">All Services</h2>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 form-control w-60"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-12 text-gray-600">Loading services...</div>
          ) : currentServices.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Service
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Icon
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentServices.map((service) => (
                      <tr key={service.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <Briefcase className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {service.title}
                              </div>
                              <div className="text-sm text-gray-500 truncate max-w-md">
                                {service.description}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {service.id}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {service.iconName}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => handleEdit(service)}
                              className="text-primary-600 hover:text-primary-900"
                            >
                              <Edit className="h-5 w-5" />
                            </button>

                            <button
                              onClick={() => handleDelete(service.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>

                          {confirmDelete === service.id && (
                            <div className="absolute bg-white border border-gray-200 shadow-lg p-3 rounded-md mt-2 right-10 z-10">
                              <p className="text-sm text-gray-700 mb-2">
                                Are you sure you want to delete this service?
                              </p>
                              <div className="flex justify-end space-x-2">
                                <button
                                  onClick={() => setConfirmDelete(null)}
                                  className="px-2 py-1 text-xs text-gray-700 hover:bg-gray-100 rounded"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => handleDelete(service.id)}
                                  className="px-2 py-1 text-xs bg-red-600 text-white hover:bg-red-700 rounded"
                                >
                                  Confirm
                                </button>
                              </div>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="flex justify-between items-center mt-6">
                  <div className="text-sm text-gray-600">
                    Showing {indexOfFirstService + 1} to{' '}
                    {Math.min(indexOfLastService, filteredServices.length)} of{' '}
                    {filteredServices.length} services
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`p-2 rounded ${
                        currentPage === 1
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded ${
                          currentPage === page
                            ? 'bg-primary-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded ${
                        currentPage === totalPages
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">
                {searchTerm
                  ? 'No services match your search criteria.'
                  : 'No services have been created yet.'}
              </p>
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="btn btn-outline">
                  Clear Search
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminServicesPage;