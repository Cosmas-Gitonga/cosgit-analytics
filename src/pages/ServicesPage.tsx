import PageHeader from '../components/common/PageHeader';
import SectionTitle from '../components/common/SectionTitle';
import ServiceCard from '../components/common/ServiceCard';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { useServices } from '../context/ServicesContext';

const ServicesPage = () => {
  const { services } = useServices();

  return (
    <>
      <PageHeader
        title="Our Services"
        subtitle="Comprehensive data solutions to help your organization thrive"
        bgImage="https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />

      <section className="section bg-white">
        <div className="container">
          <SectionTitle
            title="How We Help"
            subtitle="At Cosgit Analytics, we offer end-to-end data solutions tailored to your unique needs"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-gray-50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle title="Our Approach" align="left" />
              <p className="text-gray-700 mb-6">
                We follow a structured, collaborative approach to every project, ensuring clarity,
                quality, and alignment with your objectives at each step of the journey.
              </p>

              <div className="space-y-4 mb-6">
                {[
                  {
                    title: '1. Discovery',
                    description:
                      'We begin by understanding your goals, challenges, and context through stakeholder interviews and document review.',
                  },
                  {
                    title: '2. Design',
                    description:
                      'We design tailored solutions that align with your objectives, incorporating best practices and innovative approaches.',
                  },
                  {
                    title: '3. Implementation',
                    description:
                      'Our expert team executes the solution with precision, maintaining clear communication throughout the process.',
                  },
                  {
                    title: '4. Analysis',
                    description:
                      'We apply rigorous analytical methods to transform raw data into meaningful insights.',
                  },
                  {
                    title: '5. Visualization',
                    description:
                      'We create intuitive visualizations and dashboards that make complex information accessible.',
                  },
                  {
                    title: '6. Knowledge Transfer',
                    description:
                      'We ensure your team can interpret, use, and build upon our solutions through training and documentation.',
                  },
                ].map((step, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle2 className="w-5 h-5 text-primary-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold">{step.title}</h4>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/contact" className="btn btn-primary">
                Discuss Your Project
              </Link>
            </div>

            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary-100 rounded-lg z-0"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-secondary-100 rounded-lg z-0"></div>
              <img
                src="https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Our collaborative approach"
                className="rounded-lg shadow-xl relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <SectionTitle
            title="Research & M&E Methodology"
            subtitle="Our comprehensive approach ensures quality, rigor, and relevance"
          />

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: 'Preparatory Phase',
                description:
                  'Initial client briefing, project design, sampling strategy, and tool development.',
                icon: '1',
              },
              {
                title: 'Training Phase',
                description:
                  'Comprehensive training for enumerators and supervisors on tools and protocols.',
                icon: '2',
              },
              {
                title: 'Pilot Testing',
                description:
                  'Pre-testing tools for accuracy, relevance, and refinement before full deployment.',
                icon: '3',
              },
              {
                title: 'Fieldwork',
                description:
                  'Systematic data collection using digital tools with real-time quality checks.',
                icon: '4',
              },
              {
                title: 'Data Management',
                description:
                  'Secure data entry, cleaning, validation, and coding for analysis readiness.',
                icon: '5',
              },
              {
                title: 'Analysis & Reporting',
                description:
                  'Rigorous analysis, visualization, interpretation, and actionable reporting.',
                icon: '6',
              },
            ].map((phase, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold mb-4">
                  {phase.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{phase.title}</h3>
                <p className="text-gray-600">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;