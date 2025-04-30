import PageHeader from '../components/common/PageHeader';
import SectionTitle from '../components/common/SectionTitle';
import { CheckCircle2, Users, Lightbulb, HeartHandshakeIcon as HandshakeIcon, BarChart2, RefreshCw } from 'lucide-react';

const AboutPage = () => {
  return (
    <>
      <PageHeader 
        title="About Cosgit Analytics" 
        subtitle="A leading Data Science and Analytics consulting firm based in Nairobi, Kenya"
        bgImage="https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />

      {/* Company Overview */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle title="Our Story" align="left" />
              <p className="text-gray-700 mb-6">
                Cosgit Analytics is a dynamic Data Science, Analytics, Monitoring & Evaluation (M&E), and Business Intelligence consulting firm based in Nairobi, Kenya. Established under the Companies Act (2015), we empower organizations to harness the power of data to drive evidence-based decision-making, optimize operations, and unlock strategic growth.
              </p>
              <p className="text-gray-700 mb-6">
                We provide high-impact data-driven solutions across sectors, specializing in research, M&E systems design, advanced analytics, predictive modeling, and cutting-edge data visualizations tailored for businesses, NGOs, governments, and development partners.
              </p>
              <p className="text-gray-700">
                Our team of expert data scientists, analysts, and M&E specialists combines deep technical expertise with sector knowledge to deliver solutions that transform data into actionable insights for our clients.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary-100 rounded-lg z-0"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-secondary-100 rounded-lg z-0"></div>
              <img 
                src="https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Data analytics visualization" 
                className="rounded-lg shadow-xl relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="section bg-gray-50">
        <div className="container">
          <SectionTitle 
            title="Our Mission & Vision" 
            subtitle="Guided by strong values and a clear purpose"
          />
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-primary-600 mb-4">Our Mission</h3>
              <p className="text-gray-700">
                To empower organizations with data-driven insights through cutting-edge analytics, innovative M&E solutions, and impactful visualizations.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-primary-600 mb-4">Our Vision</h3>
              <p className="text-gray-700">
                To be the most trusted and transformative partner in Data Science, Analytics, Monitoring & Evaluation, and Strategic Insights across Africa and beyond.
              </p>
            </div>
          </div>
          
          <SectionTitle title="Our Core Values" align="center" />
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <CheckCircle2 className="w-12 h-12 text-primary-600" />,
                title: "Integrity",
                description: "Upholding transparency, honesty, and trustworthiness in all engagements."
              },
              {
                icon: <BarChart2 className="w-12 h-12 text-primary-600" />,
                title: "Excellence",
                description: "Delivering superior quality solutions through rigorous analytical methods and innovation."
              },
              {
                icon: <Lightbulb className="w-12 h-12 text-primary-600" />,
                title: "Innovation",
                description: "Continuously leveraging new technologies and data science techniques to solve complex challenges."
              },
              {
                icon: <HandshakeIcon className="w-12 h-12 text-primary-600" />,
                title: "Collaboration",
                description: "Building strong partnerships with clients to co-create value."
              },
              {
                icon: <Users className="w-12 h-12 text-primary-600" />,
                title: "Responsiveness",
                description: "Delivering agile and customized solutions that meet evolving client needs."
              },
              {
                icon: <RefreshCw className="w-12 h-12 text-primary-600" />,
                title: "Kaizen",
                description: "Embracing continuous improvement through data-driven learning and innovation."
              }
            ].map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h4 className="text-xl font-semibold mb-2">{value.title}</h4>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <SectionTitle title="Our Commitment" />
            <p className="text-xl text-gray-700 mb-8">
              We are committed to delivering actionable insights through reliable data, advanced analytics, and professional M&E practices, enabling clients to achieve lasting impact.
            </p>
            <div className="p-8 bg-primary-50 rounded-lg border border-primary-100">
              <h3 className="text-2xl font-bold text-primary-600 mb-4">Our Philosophy</h3>
              <p className="text-lg text-gray-700 italic">
                "Kaizen: Continuous improvement through data-driven learning and innovation."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="section bg-gray-50">
        <div className="container">
          <SectionTitle 
            title="Our Technology Stack" 
            subtitle="We leverage cutting-edge tools and technologies to deliver robust and reliable analysis"
          />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                name: "SPSS, STATA, R",
                description: "Statistical and Econometric Analysis",
                image: "https://images.pexels.com/photos/574070/pexels-photo-574070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              },
              {
                name: "Python",
                description: "Machine Learning, Data Science, NLP",
                image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              },
              {
                name: "NVivo",
                description: "Qualitative Data Analysis",
                image: "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              },
              {
                name: "Tableau, Power BI",
                description: "Data Visualization and Dashboarding",
                image: "https://images.pexels.com/photos/7567468/pexels-photo-7567468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              },
              {
                name: "Excel Advanced Analytics",
                description: "Data Cleaning, Analysis, Forecasting",
                image: "https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              },
              {
                name: "SQL/PostgreSQL",
                description: "Data Management and Structuring",
                image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              },
              {
                name: "GIS (QGIS, ArcGIS)",
                description: "Geospatial Mapping and Visualization",
                image: "https://images.pexels.com/photos/16013328/pexels-photo-16013328/free-photo-of-globe-model-in-classroom.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              },
              {
                name: "Digital Data Collection",
                description: "ODK, KoboToolbox, SurveyCTO",
                image: "https://images.pexels.com/photos/6393013/pexels-photo-6393013.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              }
            ].map((tech, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-36 overflow-hidden">
                  <img 
                    src={tech.image} 
                    alt={tech.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold mb-1">{tech.name}</h4>
                  <p className="text-sm text-gray-600">{tech.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/3153198/pexels-photo-3153198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)' }}
        >
          <div className="absolute inset-0 bg-primary-900/80"></div>
        </div>
        
        <div className="container relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Partner With Us?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Let's work together to transform your data into actionable insights that drive success.
          </p>
          <a href="/contact" className="btn btn-primary bg-white text-primary-600 hover:bg-gray-100">
            Get in Touch
          </a>
        </div>
      </section>
    </>
  );
};

export default AboutPage;