import PageHeader from '../components/common/PageHeader';
import SectionTitle from '../components/common/SectionTitle';
import ServiceCard from '../components/common/ServiceCard';
import { Link } from 'react-router-dom';
import { services } from '../data/servicesData';
import { CheckCircle2 } from 'lucide-react';

const ServicesPage = () => {
  return (
    <>
      <PageHeader 
        title="Our Services" 
        subtitle="Comprehensive data solutions to help your organization thrive"
        bgImage="https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />

      {/* Services Overview */}
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

      {/* Our Approach */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle title="Our Approach" align="left" />
              <p className="text-gray-700 mb-6">
                We follow a structured, collaborative approach to every project, ensuring clarity, quality, and alignment with your objectives at each step of the journey.
              </p>
              
              <div className="space-y-4 mb-6">
                {[
                  {
                    title: "1. Discovery",
                    description: "We begin by understanding your goals, challenges, and context through stakeholder interviews and document review."
                  },
                  {
                    title: "2. Design",
                    description: "We design tailored solutions that align with your objectives, incorporating best practices and innovative approaches."
                  },
                  {
                    title: "3. Implementation",
                    description: "Our expert team executes the solution with precision, maintaining clear communication throughout the process."
                  },
                  {
                    title: "4. Analysis",
                    description: "We apply rigorous analytical methods to transform raw data into meaningful insights."
                  },
                  {
                    title: "5. Visualization",
                    description: "We create intuitive visualizations and dashboards that make complex information accessible."
                  },
                  {
                    title: "6. Knowledge Transfer",
                    description: "We ensure your team can interpret, use, and build upon our solutions through training and documentation."
                  }
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

      {/* Research & M&E Approach */}
      <section className="section bg-white">
        <div className="container">
          <SectionTitle 
            title="Research & M&E Methodology" 
            subtitle="Our comprehensive approach ensures quality, rigor, and relevance"
          />
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "Preparatory Phase",
                description: "Initial client briefing, project design, sampling strategy, and tool development.",
                icon: "1"
              },
              {
                title: "Training Phase",
                description: "Comprehensive training for enumerators and supervisors on tools and protocols.",
                icon: "2"
              },
              {
                title: "Pilot Testing",
                description: "Pre-testing tools for accuracy, relevance, and refinement before full deployment.",
                icon: "3"
              },
              {
                title: "Fieldwork",
                description: "Systematic data collection using digital tools with real-time quality checks.",
                icon: "4"
              },
              {
                title: "Data Management",
                description: "Secure data entry, cleaning, validation, and coding for analysis readiness.",
                icon: "5"
              },
              {
                title: "Analysis & Reporting",
                description: "Advanced analytics, insightful dashboarding, and comprehensive reporting.",
                icon: "6"
              },
              {
                title: "Learning Workshops",
                description: "Collaborative dissemination of findings, validation, and strategy development.",
                icon: "7"
              }
            ].map((phase, index) => (
              <div key={index} className="card p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-lg">
                    {phase.icon}
                  </div>
                  <h3 className="text-xl font-semibold ml-3">{phase.title}</h3>
                </div>
                <p className="text-gray-600">{phase.description}</p>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Techniques We Use</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Quantitative Surveys (CATI, CAPI, PAPI)",
                "Qualitative Research (FGDs, KIIs, IDIs)",
                "Mixed-Methods Research",
                "Digital Data Collection",
                "Experimental & Quasi-experimental Designs",
                "Participatory Methods",
                "Longitudinal Studies",
                "Remote Sensing & Geospatial Analysis"
              ].map((technique, index) => (
                <div key={index} className="bg-white p-4 rounded shadow-sm">
                  <p className="text-center">{technique}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/7567468/pexels-photo-7567468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-secondary-900/80"></div>
        </div>
        
        <div className="container relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Data?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Let's discuss how our services can help you achieve your goals through data-driven insights.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="btn btn-primary bg-white text-primary-600 hover:bg-gray-100">
              Contact Us
            </Link>
            <Link to="/about" className="btn btn-outline border-white text-white hover:bg-white/10">
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;