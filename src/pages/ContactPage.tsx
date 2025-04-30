// ContactPage.tsx — Integrated with Resend via Netlify Function

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
        bgImage="https://images.pexels.com/photos/7681091/pexels-photo-7681091.jpeg"
      />

      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            {[...
              { title: 'Phone', icon: <Phone />, details: ['+254 717 065 015'], href: 'tel:+254717065015' },
              { title: 'Email', icon: <Mail />, details: ['info@cosgitanalytics.com'], href: 'mailto:info@cosgitanalytics.com' },
              { title: 'Office', icon: <MapPin />, details: ['Kabete Gardens Apartment', 'Lower Kabete, Nairobi, Kenya'], href: 'https://maps.google.com' },
            ].map((item, idx) => (
              <div key={idx} className="text-center p-8 rounded-lg shadow hover:shadow-lg">
                <div className="w-16 h-16 mx-auto bg-primary-50 flex items-center justify-center rounded-full mb-4">{item.icon}</div>
                <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                {item.details.map((line, i) => <p key={i} className="text-gray-600">{line}</p>)}
                <a href={item.href} className="mt-3 inline-block text-primary-600 font-medium">{item.title === 'Office' ? 'Get directions' : `Contact via ${item.title}`}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container grid lg:grid-cols-2 gap-12">
          <div className="bg-white shadow p-8 rounded-lg">
            <SectionTitle title="Send us a Message" subtitle="Fill out the form below and we'll get back to you." align="left" />

            {isSubmitted ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto mb-2" />
                <h3 className="text-xl font-semibold">Thank You!</h3>
                <p className="text-gray-600 mb-4">Your message was successfully sent.</p>
                <button onClick={() => setIsSubmitted(false)} className="btn btn-primary">Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {error && <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>}

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label>Full Name *</label>
                    <input {...register('name')} className={`form-control ${errors.name ? 'border-red-500' : ''}`} />
                    {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label>Email *</label>
                    <input type="email" {...register('email')} className={`form-control ${errors.email ? 'border-red-500' : ''}`} />
                    {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label>Phone *</label>
                    <input type="tel" {...register('phone')} className={`form-control ${errors.phone ? 'border-red-500' : ''}`} />
                    {errors.phone && <p className="text-red-600 text-sm">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label>Organization</label>
                    <input {...register('organization')} className="form-control" />
                  </div>
                </div>

                <div>
                  <label>Subject *</label>
                  <input {...register('subject')} className={`form-control ${errors.subject ? 'border-red-500' : ''}`} />
                  {errors.subject && <p className="text-red-600 text-sm">{errors.subject.message}</p>}
                </div>

                <div>
                  <label>Project Type *</label>
                  <select {...register('projectType')} className={`form-control ${errors.projectType ? 'border-red-500' : ''}`}>
                    <option value="">Select type</option>
                    <option value="data-science">Data Science</option>
                    <option value="analytics">Analytics</option>
                    <option value="research">Research</option>
                    <option value="monitoring">Monitoring</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.projectType && <p className="text-red-600 text-sm">{errors.projectType.message}</p>}
                </div>

                <div>
                  <label>Message *</label>
                  <textarea rows={6} {...register('message')} className={`form-control ${errors.message ? 'border-red-500' : ''}`} />
                  {errors.message && <p className="text-red-600 text-sm">{errors.message.message}</p>}
                </div>

                <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full flex items-center justify-center gap-2">
                  {isSubmitting ? (<><Clock className="animate-spin" /> Sending...</>) : (<><Send /> Send Message</>)}
                </button>
              </form>
            )}
          </div>

          <div className="hidden lg:block">
            <img
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
              alt="Contact us"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
