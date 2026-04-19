import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useEffect } from 'react';
import SectionTitle from '../components/common/SectionTitle';
import { useServices } from '../context/ServicesContext';

const ServiceDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getServiceById } = useServices();

  const service = getServiceById(id || '');

  useEffect(() => {
    if (service) {
      document.title = `${service.title} | Cosgit Analytics`;
    } else {
      document.title = 'Service Not Found | Cosgit Analytics';
    }
  }, [service]);

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

  const Icon = service.icon;

  const processSteps = [
    {
      title: 'Discovery & Requirements',
      description:
        'We begin by understanding your specific needs, challenges, and objectives through stakeholder interviews and document review. This foundational step ensures our solution addresses your unique situation.',
      image:
        'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      title: 'Solution Design',
      description:
        'Our team develops a tailored approach that combines the most appropriate methodologies, tools, and techniques for your specific requirements. We present this plan for your feedback and refinement.',
      image:
        'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      title: 'Implementation',
      description:
        'With an approved plan in place, we execute the solution with precision and attention to detail. Throughout this phase, we maintain clear communication and provide regular updates on progress.',
      image:
        'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      title: 'Analysis & Insights',
      description:
        'We apply advanced analytical techniques to transform raw data into meaningful insights. Our focus is on answering your key questions and identifying actionable recommendations.',
      image:
        'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      title: 'Delivery & Knowledge Transfer',
      description:
        'We present findings through clear reports, intuitive visualizations, and interactive dashboards. We also ensure your team can interpret, use, and build upon our solutions through training and documentation.',
      image:
        'https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ];

  return (
    <>
      <section className="relative pt-20 pb-12 md:pt-24 md:pb-16">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${service.image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-secondary-900/80"></div>
        </div>

        <div className="container relative z-10">
          <Link to="/services" className="inline-flex items-center text-white mb-6 hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Link>
          <div className="max-w-3xl">
            <div className="flex items-center mb-6">
              <Icon className="w-12 h-12 text-white mr-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-white">{service.title}</h1>
            </div>
            <p className="text-xl text-white/90">{service.description}</p>
          </div>
        </div>
      </section>

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

      <section className="section bg-gray-50">
        <div className="container">
          <SectionTitle title="Our Process" subtitle="How we deliver exceptional results" />

          <div className="space-y-12">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className="grid md:grid-cols-2 gap-8 items-center bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover min-h-[280px]"
                />
                <div className="p-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-600 text-white font-bold mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-gray-700">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceDetailPage;