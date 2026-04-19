import PageHeader from '../components/common/PageHeader';
import SectionTitle from '../components/common/SectionTitle';
import {
  CheckCircle2,
  Users,
  Lightbulb,
  HeartHandshakeIcon as HandshakeIcon,
  BarChart2,
  RefreshCw,
} from 'lucide-react';
import { usePageContent } from '../context/PageContentContext';

const AboutPage = () => {
  const { content } = usePageContent();
  const about = content.about;

  return (
    <>
      <PageHeader
        title={about.headerTitle}
        subtitle={about.headerSubtitle}
        bgImage="https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />

      <section className="section bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle title={about.storyTitle} align="left" />
              <p className="text-gray-700 mb-6">{about.storyParagraph1}</p>
              <p className="text-gray-700 mb-6">{about.storyParagraph2}</p>
              <p className="text-gray-700">{about.storyParagraph3}</p>
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

      <section className="section bg-gray-50">
        <div className="container">
          <SectionTitle
            title="Our Mission & Vision"
            subtitle="Guided by strong values and a clear purpose"
          />

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-primary-600 mb-4">{about.missionTitle}</h3>
              <p className="text-gray-700">{about.missionText}</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-primary-600 mb-4">{about.visionTitle}</h3>
              <p className="text-gray-700">{about.visionText}</p>
            </div>
          </div>

          <SectionTitle title="Our Core Values" align="center" />

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <CheckCircle2 className="w-12 h-12 text-primary-600" />,
                title: 'Integrity',
                description:
                  'Upholding transparency, honesty, and trustworthiness in all engagements.',
              },
              {
                icon: <BarChart2 className="w-12 h-12 text-primary-600" />,
                title: 'Excellence',
                description:
                  'Delivering superior quality solutions through rigorous analytical methods and innovation.',
              },
              {
                icon: <Lightbulb className="w-12 h-12 text-primary-600" />,
                title: 'Innovation',
                description:
                  'Continuously leveraging new technologies and data science techniques to solve complex challenges.',
              },
              {
                icon: <HandshakeIcon className="w-12 h-12 text-primary-600" />,
                title: 'Collaboration',
                description: 'Building strong partnerships with clients to co-create value.',
              },
              {
                icon: <Users className="w-12 h-12 text-primary-600" />,
                title: 'Responsiveness',
                description: 'Delivering agile and customized solutions that meet evolving client needs.',
              },
              {
                icon: <RefreshCw className="w-12 h-12 text-primary-600" />,
                title: 'Kaizen',
                description:
                  'Embracing continuous improvement through data-driven learning and innovation.',
              },
            ].map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h4 className="text-xl font-semibold mb-2">{value.title}</h4>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <SectionTitle title={about.commitmentTitle} />
            <p className="text-xl text-gray-700 mb-8">{about.commitmentText}</p>
            <div className="p-8 bg-primary-50 rounded-lg border border-primary-100">
              <h3 className="text-2xl font-bold text-primary-600 mb-4">{about.philosophyTitle}</h3>
              <p className="text-lg text-gray-700 italic">{about.philosophyText}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;