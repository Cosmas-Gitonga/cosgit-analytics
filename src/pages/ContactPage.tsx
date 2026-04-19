import { usePageContent } from '../context/PageContentContext';
import { useServices } from '../context/ServicesContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Phone, MapPin, Send, Clock, CheckCircle2, Key } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import PageHeader from '../components/common/PageHeader';
import SectionTitle from '../components/common/SectionTitle';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
  organization: z.string().optional(),
  projectType: z.string().min(1, 'Please select a project type'),
  otherProjectType: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactPage = () => {
  const { content } = usePageContent();
  const contactContent = content.contact;
  const { services } = useServices();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem('google_maps_api_key') || '');
  const [showApiKeyInput, setShowApiKeyInput] = useState(!apiKey);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const projectType = watch('projectType');

  useEffect(() => {
    if (apiKey && mapRef.current && !mapInstanceRef.current) {
      const loader = new Loader({
        apiKey,
        version: 'weekly',
      });

      loader
        .load()
        .then(() => {
          const location = { lat: -1.2518, lng: 36.7089 };

          mapInstanceRef.current = new google.maps.Map(mapRef.current!, {
            center: location,
            zoom: 15,
            styles: [
              {
                featureType: 'all',
                elementType: 'geometry',
                stylers: [{ color: '#242f3e' }],
              },
              {
                featureType: 'all',
                elementType: 'labels.text.stroke',
                stylers: [{ color: '#242f3e' }],
              },
              {
                featureType: 'all',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#746855' }],
              },
              {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#d59563' }],
              },
              {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{ color: '#17263c' }],
              },
              {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#515c6d' }],
              },
              {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{ color: '#38414e' }],
              },
              {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{ color: '#212a37' }],
              },
              {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#9ca5b3' }],
              },
            ],
          });

          new google.maps.Marker({
            position: location,
            map: mapInstanceRef.current,
            title: 'Cosgit Analytics',
            animation: google.maps.Animation.DROP,
          });
        })
        .catch((error) => {
          console.error('Error loading Google Maps:', error);
          setShowApiKeyInput(true);
        });
    }
  }, [apiKey]);

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('google_maps_api_key', apiKey);
    setShowApiKeyInput(false);
  };

  const onSubmit = async (data: ContactFormData) => {
    try {
      setError(null);
      setIsSubmitting(true);

      const finalProjectType =
        data.projectType === 'other' ? `Other: ${data.otherProjectType}` : data.projectType;

      const formData = {
        ...data,
        projectType: finalProjectType,
      };

      const response = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const text = await response.text();
      let result;

      try {
        result = JSON.parse(text);
      } catch {
        throw new Error('Invalid JSON response from email service.');
      }

      if (!response.ok || !result?.success) {
        throw new Error(result?.error || 'Failed to send email');
      }

      setIsSubmitted(true);
      reset();
    } catch (err) {
      console.error('Submission error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageHeader
        title={contactContent.headerTitle}
        subtitle={contactContent.headerSubtitle}
        bgImage="https://images.pexels.com/photos/7681091/pexels-photo-7681091.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />

      <section className="py-8 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="group relative overflow-hidden bg-white rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.15)] hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-5 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-50 mb-3 transform transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary-100">
                  <Phone className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{contactContent.phoneTitle}</h3>
                <p className="text-gray-600 mb-2">{contactContent.phoneNumber}</p>
                <a
                  href={`tel:${contactContent.phoneNumber.replace(/\s+/g, '')}`}
                  className="inline-flex items-center justify-center px-4 py-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                >
                  {contactContent.phoneButtonText}
                </a>
              </div>
            </div>

            <div className="group relative overflow-hidden bg-white rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.15)] hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-5 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-50 mb-3 transform transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary-100">
                  <Mail className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{contactContent.emailTitle}</h3>
                <p className="text-gray-600 mb-2">{contactContent.emailAddress}</p>
                <a
                  href={`mailto:${contactContent.emailAddress}`}
                  className="inline-flex items-center justify-center px-4 py-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                >
                  {contactContent.emailButtonText}
                </a>
              </div>
            </div>

            <div className="group relative overflow-hidden bg-white rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.15)] hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-5 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-50 mb-3 transform transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary-100">
                  <MapPin className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {contactContent.addressTitle}
                </h3>
                <p className="text-gray-600 mb-2">{contactContent.addressText}</p>
                <a
                  href="https://maps.google.com"
                  className="inline-flex items-center justify-center px-4 py-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                >
                  Get directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container grid lg:grid-cols-2 gap-12 items-start">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <SectionTitle
              title="Send us a Message"
              subtitle="Fill out the form below and we'll get back to you as soon as possible"
              align="left"
            />

            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-600 mb-6">Your message has been received.</p>
                <button onClick={() => setIsSubmitted(false)} className="btn btn-primary">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {error && <div className="p-4 bg-red-50 text-red-600 rounded-lg">{error}</div>}

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      {...register('name')}
                      className={`form-control ${errors.name ? 'border-red-500' : ''}`}
                    />
                    {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register('email')}
                      className={`form-control ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      {...register('phone')}
                      className={`form-control ${errors.phone ? 'border-red-500' : ''}`}
                    />
                    {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label
                      htmlFor="organization"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Organization
                    </label>
                    <input
                      id="organization"
                      type="text"
                      {...register('organization')}
                      className="form-control"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Subject *
                  </label>
                  <input
                    id="subject"
                    type="text"
                    {...register('subject')}
                    className={`form-control ${errors.subject ? 'border-red-500' : ''}`}
                  />
                  {errors.subject && <p className="text-sm text-red-600">{errors.subject.message}</p>}
                </div>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="projectType"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Project Type *
                    </label>
                    <select
                      id="projectType"
                      {...register('projectType')}
                      className={`form-control ${errors.projectType ? 'border-red-500' : ''}`}
                    >
                      <option value="">Select a project type</option>
                      {services.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.title}
                        </option>
                      ))}
                      <option value="other">Other</option>
                    </select>
                    {errors.projectType && (
                      <p className="text-sm text-red-600">{errors.projectType.message}</p>
                    )}
                  </div>

                  {projectType === 'other' && (
                    <div>
                      <label
                        htmlFor="otherProjectType"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Please specify your project type *
                      </label>
                      <input
                        id="otherProjectType"
                        type="text"
                        {...register('otherProjectType')}
                        className="form-control"
                        placeholder="Enter your project type"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    {...register('message')}
                    className={`form-control ${errors.message ? 'border-red-500' : ''}`}
                    placeholder="Tell us about your project or inquiry..."
                  />
                  {errors.message && <p className="text-sm text-red-600">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      <Send /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          <div className="space-y-8">
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-900/50 to-secondary-900/50 z-10 rounded-lg" />

              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Professional African team in boardroom"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {showApiKeyInput ? (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <form onSubmit={handleApiKeySubmit} className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Key className="w-5 h-5 text-primary-600" />
                    <h3 className="text-lg font-semibold">Google Maps API Key</h3>
                  </div>
                  <input
                    type="text"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your API key"
                    className="form-control"
                  />
                  <button type="submit" className="btn btn-primary w-full">
                    Load Map
                  </button>
                </form>
              </div>
            ) : (
              <div ref={mapRef} className="w-full h-[400px] rounded-lg shadow-lg overflow-hidden" />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;