import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import {
  CheckCircle2,
  Quote,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import SectionTitle from '../components/common/SectionTitle';
import ServiceCard from '../components/common/ServiceCard';
import Counter from '../components/common/Counter';
import { useServices } from '../context/ServicesContext';
import { usePageContent } from '../context/PageContentContext';

const HomePage = () => {
  const { services } = useServices();
  const { content } = usePageContent();
  const home = content.home;

  const [currentServicePage, setCurrentServicePage] = useState(0);
  const [serviceTouchStart, setServiceTouchStart] = useState(0);
  const [serviceTouchEnd, setServiceTouchEnd] = useState(0);

  const [currentTestimonialPage, setCurrentTestimonialPage] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const servicesPerPage = isMobile ? 1 : 3;
  const totalServicePages = Math.ceil(services.length / servicesPerPage);

  const currentServices = services.slice(
    currentServicePage * servicesPerPage,
    (currentServicePage + 1) * servicesPerPage
  );

  const nextServices = useCallback(() => {
    setCurrentServicePage((prev) => (prev + 1) % totalServicePages);
  }, [totalServicePages]);

  const prevServices = useCallback(() => {
    setCurrentServicePage((prev) => (prev - 1 + totalServicePages) % totalServicePages);
  }, [totalServicePages]);

  const handleServiceTouchStart = (e: React.TouchEvent) => {
    setServiceTouchStart(e.targetTouches[0].clientX);
  };

  const handleServiceTouchMove = (e: React.TouchEvent) => {
    setServiceTouchEnd(e.targetTouches[0].clientX);
  };

  const handleServiceTouchEnd = () => {
    if (!serviceTouchStart || !serviceTouchEnd) return;

    const distance = serviceTouchStart - serviceTouchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) nextServices();
    if (isRightSwipe) prevServices();

    setServiceTouchStart(0);
    setServiceTouchEnd(0);
  };

  const testimonials = [
    {
      id: 1,
      name: 'Jane Smith',
      position: 'Director, INGO',
      quote:
        "Cosgit Analytics transformed our M&E system, delivering actionable insights that directly improved our program outcomes. Their team's expertise and dedication exceeded our expectations.",
      avatar:
        'https://images.pexels.com/photos/7319315/pexels-photo-7319315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 2,
      name: 'Michael Johnson',
      position: 'CEO, Tech Startup',
      quote:
        'The business intelligence dashboards created by Cosgit have revolutionized how we make decisions. We now have real-time visibility into key metrics that drive our business.',
      avatar:
        'https://images.pexels.com/photos/7319303/pexels-photo-7319303.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 3,
      name: 'Sarah Ngugi',
      position: 'Project Manager, Gov. Agency',
      quote:
        'Working with Cosgit Analytics on our data visualization needs was seamless and highly valuable. They translated complex data into clear, intuitive visualizations that tell our story.',
      avatar:
        'https://images.pexels.com/photos/7319297/pexels-photo-7319297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 4,
      name: 'David Chen',
      position: 'Research Director, University',
      quote:
        'Their expertise in data science and research methodologies has been invaluable to our research projects. The insights generated have led to several breakthrough discoveries.',
      avatar:
        'https://images.pexels.com/photos/7319309/pexels-photo-7319309.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 5,
      name: 'Emily Ochieng',
      position: 'Operations Manager, NGO',
      quote:
        'The M&E framework developed by Cosgit has transformed how we track and measure impact. Their approach is both rigorous and practical, perfect for our needs.',
      avatar:
        'https://images.pexels.com/photos/7319313/pexels-photo-7319313.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 6,
      name: 'Robert Kimani',
      position: 'Data Analytics Lead, Corporate',
      quote:
        'Their predictive modeling capabilities are outstanding. The models they developed have helped us optimize operations and reduce costs significantly.',
      avatar:
        'https://images.pexels.com/photos/7319307/pexels-photo-7319307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ];

  const testimonialsPerPage = isMobile ? 1 : 3;
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  const currentTestimonials = testimonials.slice(
    currentTestimonialPage * testimonialsPerPage,
    (currentTestimonialPage + 1) * testimonialsPerPage
  );

  const nextTestimonials = useCallback(() => {
    setCurrentTestimonialPage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const prevTestimonials = useCallback(() => {
    setCurrentTestimonialPage((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) nextTestimonials();
    if (isRightSwipe) prevTestimonials();

    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <>
      <section className="relative h-screen flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 to-secondary-900/70"></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl animate-slide-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {home.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              {home.heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/services" className="btn btn-primary">
                {home.heroPrimaryButtonText}
              </Link>
              <Link
                to="/contact"
                className="btn btn-outline border-white text-white hover:bg-white/10"
              >
                {home.heroSecondaryButtonText}
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <div className="w-8 h-12 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle title={home.aboutPreviewTitle} align="left" />
              <p className="text-gray-700 mb-6">{home.aboutPreviewParagraph1}</p>
              <p className="text-gray-700 mb-6">{home.aboutPreviewParagraph2}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  [home.aboutFeature1Title, home.aboutFeature1Text],
                  [home.aboutFeature2Title, home.aboutFeature2Text],
                  [home.aboutFeature3Title, home.aboutFeature3Text],
                  [home.aboutFeature4Title, home.aboutFeature4Text],
                ].map(([title, text], index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-primary-600 mt-1 mr-2 flex-shrink-0" />
                    <div>
                      <h6 className="text-sm font-medium">{title}</h6>
                      <p className="text-gray-600 text-base mt-1">{text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/about" className="btn btn-primary">
                {home.aboutButtonText}
              </Link>
            </div>

            <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-900/50 to-secondary-900/50 z-10 rounded-lg" />
              <img
                src="https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Data analytics visualization"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-gray-50">
        <div className="container">
          <SectionTitle
            title="Our Services"
            subtitle="We provide comprehensive data solutions to help your organization thrive"
          />

          <div
            className={`grid ${isMobile ? 'grid-cols-1' : 'md:grid-cols-3'} gap-8`}
            onTouchStart={handleServiceTouchStart}
            onTouchMove={handleServiceTouchMove}
            onTouchEnd={handleServiceTouchEnd}
          >
            {currentServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          {isMobile && (
            <div className="flex justify-center items-center mt-8 space-x-4">
              <button
                onClick={prevServices}
                className="p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-primary-500 transition-colors"
                aria-label="Previous services"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="flex space-x-2">
                {Array.from({ length: totalServicePages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentServicePage(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentServicePage === index
                        ? 'bg-primary-600 w-6'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to service page ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextServices}
                className="p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-primary-500 transition-colors"
                aria-label="Next services"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}

          <div className="mt-12 text-center">
            <Link to="/services" className="btn btn-primary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary-600 text-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <Counter end={50} suffix="+" />
              </div>
              <div className="text-lg">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <Counter end={20} suffix="+" />
              </div>
              <div className="text-lg">Satisfied Clients</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <Counter end={10} suffix="+" />
              </div>
              <div className="text-lg">Team Members</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <Counter end={5} />
              </div>
              <div className="text-lg">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <SectionTitle
            title="Client Testimonials"
            subtitle="What our clients say about our data analytics services"
          />

          <div
            className={`grid ${isMobile ? 'grid-cols-1' : 'md:grid-cols-3'} gap-8`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {currentTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="relative bg-primary-50/50 rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="absolute -top-4 right-8">
                  <div className="bg-secondary-500 rounded-full p-2">
                    <Quote className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-gray-700 italic leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                </div>

                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover ring-4 ring-primary-50"
                  />
                  <div className="ml-4">
                    <h4 className="font-semibold text-primary-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center mt-12 space-x-4">
            <button
              onClick={prevTestimonials}
              className="p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-primary-500 transition-colors"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex space-x-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonialPage(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentTestimonialPage === index
                      ? 'bg-primary-600 w-6'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial page ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonials}
              className="p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-primary-500 transition-colors"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      <section className="relative py-20">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-secondary-900/80"></div>
        </div>

        <div className="container relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {home.ctaTitle}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            {home.ctaSubtitle}
          </p>
          <Link
            to="/contact"
            className="btn btn-primary bg-white text-primary-600 hover:bg-gray-100"
          >
            {home.ctaButtonText}
          </Link>
        </div>
      </section>
    </>
  );
};

export default HomePage;