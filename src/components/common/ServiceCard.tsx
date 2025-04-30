import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Service } from '../../types/Service';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const { id, title, description, icon: Icon, image } = service;

  return (
    <div className="card card-hover">
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110" 
        />
      </div>
      <div className="p-6">
        <div className="flex items-center mb-4">
          <Icon className="w-8 h-8 text-primary-600 mr-3" />
          <h3 className="font-bold text-xl">{title}</h3>
        </div>
        <p className="text-gray-600 mb-4">{description.substring(0, 120)}...</p>
        <Link 
          to={`/services/${id}`} 
          className="group inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
        >
          Learn More 
          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;