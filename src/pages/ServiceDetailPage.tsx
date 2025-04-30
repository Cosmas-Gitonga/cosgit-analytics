import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { services } from '../data/servicesData';
import { useEffect, useState } from 'react';
import { Service } from '../types/Service';
import SectionTitle from '../components/common/SectionTitle';

const ServiceDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<Service | null>(null);

  useEffect(() => {
    const foundService = services.find(s => s.id === id);
    if (foundService) {
      setService(foundService);
      document.title = `${foundService.title} | Cosgit Analytics`;
    }
  }, [id]);

  if (!service) {
    return (
      <div className="container min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Service not found</h2>
          <Link to="/services" className="btn btn-primary">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const processSteps = [
    {
      title: "Discovery & Requirements",
      description: "We begin by understanding your specific needs, challenges, and objectives through stakeholder interviews and document review. This foundational step ensures our solution addresses your unique situation.",
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "Solution Design",
      description: "Our team develops a tailored approach that combines the most appropriate methodologies, tools, and techniques for your specific requirements. We present this plan for your feedback and refinement.",
      image: "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "Implementation",
      description: "With an approved plan in place, we execute the solution with precision and attention to detail. Throughout this phase, we maintain clear communication and provide regular updates on progress.",
      image: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "Analysis & Insights",
      description: "We apply advanced analytical techniques to transform raw data into meaningful insights. Our focus is on answering your key questions and identifying actionable recommendations.",
      image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "Delivery & Knowledge Transfer",
      description: "We present findings through clear reports, intuitive visualizations, and interactive dashboards. We also ensure your team can interpret, use, and build upon our solutions through training and documentation.",
      image: "https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 md:pt-24 md:pb-16">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ backgroundImage: `url(${service.image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-secondary-900/80"></div>
        </div>

        <div className="container relative z-10">
          <Link 
            to="/services" 
            className="inline-flex items-center text-white mb-6 hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Link>
          <div className="max-w-3xl">
            <div className="flex items-center mb-6">
              <service.icon className="w-12 h-12 text-white mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-white">{service.title}</h1>
            </div>
            <p className="text-xl text-white/90">{service.description}</p>
          </div>
        </div>
      </section>

      {/* Service Description */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <SectionTitle title="Overview" align="left" />
              {service.fullDescription?.map((paragraph, index) => (
                <p key={index} className="text-gray-700 mb-6">
                  {paragraph}
                </p>
              ))}
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg h-fit">
              <h3 className="text-xl font-bold mb-4">Key Features</h3>
              <ul className="space-y-3">
                {service.features?.map((feature, index) => (
                  <li key={index} className="flex">
                    <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section bg-gray-50">
        <div className="container">
          <SectionTitle 
            title="Our Process" 
            subtitle="How we deliver exceptional results"
          />
          
          <div className="relative">
            {/* Process Timeline */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-primary-200 transform -translate-x-1/2"></div>
            
            <div className="space-y-12 relative">
              {processSteps.map((step, index) => (
                <div key={index} className={`md:flex items-center ${index % 2 !== 0 ? 'flex-row-reverse' : ''}`}>
                  <div className="md:w-1/2 mb-6 md:mb-0 md:px-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                      <p className="text-gray-700">{step.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline Node */}
                  <div className="hidden md:flex justify-center items-center">
                    <div className="w-10 h-10 bg-primary-600 rounded-full text-white flex items-center justify-center font-bold z-10">
                      {index + 1}
                    </div>
                  </div>
                  
                  <div className="md:w-1/2 md:px-8">
                    <img 
                      src={step.image} 
                      alt={step.title} 
                      className="rounded-lg shadow-md w-full h-48 md:h-64 object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="section bg-white">
        <div className="container">
          <SectionTitle 
            title="Explore Other Services" 
            subtitle="Discover our full range of data and analytics solutions"
          />
          
          <div className="grid md:grid-cols-3 gap-8">
            {services
              .filter(s => s.id !== service.id)
              .slice(0, 3)
              .map(otherService => (
                <Link 
                  key={otherService.id} 
                  to={`/services/${otherService.id}`}
                  className="card card-hover group"
                >
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={otherService.image} 
                      alt={otherService.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <otherService.icon className="w-6 h-6 text-primary-600 mr-2" />
                      <h3 className="font-semibold">{otherService.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm">{otherService.description.substring(0, 100)}...</p>
                  </div>
                </Link>
              ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/services" className="btn btn-primary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-secondary-900/80"></div>
        </div>
        
        <div className="container relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Contact us today to discuss how our {service.title.toLowerCase()} services can help your organization achieve its goals.
          </p>
          <Link to="/contact" className="btn btn-primary bg-white text-primary-600 hover:bg-gray-100">
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
};

export default ServiceDetailPage;