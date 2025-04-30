import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Phone, MapPin, Send, Clock, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import SectionTitle from '../components/common/SectionTitle';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
  organization: z.string().optional(),
  projectType: z.enum(['data-science', 'analytics', 'research', 'monitoring', 'other']),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      setError(null);
      setIsSubmitting(true);

      const response = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
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
        title="Contact Us" 
        subtitle="Get in touch with our team for any inquiries or to discuss your data needs"
        bgImage="https://images.pexels.com/photos/7681091/pexels-photo-7681091.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />

      <section className="py-16 bg-white">
        <div className="container grid md:grid-cols-3 gap-8">
          <div className="text-center p-8 rounded-lg bg-white shadow-lg hover:shadow-xl">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 mb-4">
              <Phone className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">Phone</h3>
            <p className="text-gray-600">+254 717 065 015</p>
            <a href="tel:+254717065015" className="text-primary-600 font-medium hover:text-primary-700">Call us</a>
          </div>

          <div className="text-center p-8 rounded-lg bg-white shadow-lg hover:shadow-xl">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 mb-4">
              <Mail className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">Email</h3>
            <p className="text-gray-600">info@cosgitanalytics.com</p>
            <a href="mailto:info@cosgitanalytics.com" className="text-primary-600 font-medium hover:text-primary-700">Email us</a>
          </div>

          <div className="text-center p-8 rounded-lg bg-white shadow-lg hover:shadow-xl">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 mb-4">
              <MapPin className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">Office</h3>
            <p className="text-gray-600">Kabete Gardens Apartment, Lower Kabete, Nairobi, Kenya</p>
            <a href="https://maps.google.com" className="text-primary-600 font-medium hover:text-primary-700">Get directions</a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container grid lg:grid-cols-2 gap-12 items-start">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <SectionTitle 
              title="Send us a Message" 
              subtitle="Fill out the form below and we'll get back to you as soon as possible"
              align="left" />

            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-600 mb-6">Your message has been received.</p>
                <button onClick={() => setIsSubmitted(false)} className="btn btn-primary">Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {error && <div className="p-4 bg-red-50 text-red-600 rounded-lg">{error}</div>}

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name">Full Name *</label>
                    <input id="name" type="text" {...register('name')} className={`form-control ${errors.name ? 'border-red-500' : ''}`} />
                    {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="email">Email Address *</label>
                    <input id="email" type="email" {...register('email')} className={`form-control ${errors.email ? 'border-red-500' : ''}`} />
                    {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone">Phone Number *</label>
                    <input id="phone" type="tel" {...register('phone')} className={`form-control ${errors.phone ? 'border-red-500' : ''}`} />
                    {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="organization">Organization</label>
                    <input id="organization" type="text" {...register('organization')} className="form-control" />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject">Subject *</label>
                  <input id="subject" type="text" {...register('subject')} className={`form-control ${errors.subject ? 'border-red-500' : ''}`} />
                  {errors.subject && <p className="text-sm text-red-600">{errors.subject.message}</p>}
                </div>

                <div>
                  <label htmlFor="projectType">Project Type *</label>
                  <select id="projectType" {...register('projectType')} className={`form-control ${errors.projectType ? 'border-red-500' : ''}`}>
                    <option value="">Select a project type</option>
                    <option value="data-science">Data Science</option>
                    <option value="analytics">Analytics</option>
                    <option value="research">Research</option>
                    <option value="monitoring">Monitoring</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.projectType && <p className="text-sm text-red-600">{errors.projectType.message}</p>}
                </div>

                <div>
                  <label htmlFor="message">Message *</label>
                  <textarea id="message" rows={6} {...register('message')} className={`form-control ${errors.message ? 'border-red-500' : ''}`} />
                  {errors.message && <p className="text-sm text-red-600">{errors.message.message}</p>}
                </div>

                <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full flex items-center justify-center gap-2">
                  {isSubmitting ? (<><Clock className="animate-spin" /> Sending...</>) : (<><Send /> Send Message</>)}
                </button>
              </form>
            )}
          </div>

          <div className="hidden lg:block">
            <img src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Contact us" className="rounded-lg shadow-lg w-full h-full object-cover" />
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
