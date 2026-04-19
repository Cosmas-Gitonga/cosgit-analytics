import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

export interface HomePageContent {
  heroTitle: string;
  heroSubtitle: string;
  heroPrimaryButtonText: string;
  heroSecondaryButtonText: string;
  aboutPreviewTitle: string;
  aboutPreviewParagraph1: string;
  aboutPreviewParagraph2: string;
  aboutFeature1Title: string;
  aboutFeature1Text: string;
  aboutFeature2Title: string;
  aboutFeature2Text: string;
  aboutFeature3Title: string;
  aboutFeature3Text: string;
  aboutFeature4Title: string;
  aboutFeature4Text: string;
  aboutButtonText: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButtonText: string;
}

export interface AboutPageContent {
  headerTitle: string;
  headerSubtitle: string;
  storyTitle: string;
  storyParagraph1: string;
  storyParagraph2: string;
  storyParagraph3: string;
  missionTitle: string;
  missionText: string;
  visionTitle: string;
  visionText: string;
  commitmentTitle: string;
  commitmentText: string;
  philosophyTitle: string;
  philosophyText: string;
}

export interface ContactPageContent {
  headerTitle: string;
  headerSubtitle: string;
  phoneTitle: string;
  phoneNumber: string;
  phoneButtonText: string;
  emailTitle: string;
  emailAddress: string;
  emailButtonText: string;
  addressTitle: string;
  addressText: string;
}

export interface PageContentState {
  home: HomePageContent;
  about: AboutPageContent;
  contact: ContactPageContent;
}

interface PageContentContextType {
  content: PageContentState;
  updateHome: (home: HomePageContent) => Promise<void>;
  updateAbout: (about: AboutPageContent) => Promise<void>;
  updateContact: (contact: ContactPageContent) => Promise<void>;
  refreshPageContent: () => Promise<void>;
  isLoading: boolean;
}

const PageContentContext = createContext<PageContentContextType | undefined>(undefined);

const defaultContent: PageContentState = {
  home: {
    heroTitle: 'Transform Your Data Into Actionable Insights',
    heroSubtitle:
      'We empower organizations to harness the power of data to drive evidence-based decision-making, optimize operations, and unlock strategic growth.',
    heroPrimaryButtonText: 'Explore Our Services',
    heroSecondaryButtonText: 'Contact Us',
    aboutPreviewTitle: 'About Cosgit Analytics',
    aboutPreviewParagraph1:
      'Cosgit Analytics is a dynamic Data Science, Analytics, Monitoring & Evaluation (M&E), and Business Intelligence consulting firm based in Nairobi, Kenya. Established under the Companies Act (2015), we empower organizations to harness the power of data to drive evidence-based decision-making.',
    aboutPreviewParagraph2:
      'We provide high-impact data-driven solutions across sectors, specializing in research, M&E systems design, advanced analytics, predictive modeling, and cutting-edge data visualizations tailored for businesses, NGOs, governments, and development partners.',
    aboutFeature1Title: 'Expert Team',
    aboutFeature1Text: 'Highly skilled data scientists and analysts',
    aboutFeature2Title: 'Proven Methods',
    aboutFeature2Text: 'Advanced analytical techniques',
    aboutFeature3Title: 'Custom Solutions',
    aboutFeature3Text: 'Tailored to your unique needs',
    aboutFeature4Title: 'Clear Results',
    aboutFeature4Text: 'Actionable insights you can use',
    aboutButtonText: 'Learn More About Us',
    ctaTitle: 'Ready to Transform Your Data Strategy?',
    ctaSubtitle:
      'Contact us today to discuss how our data analytics and M&E services can help your organization make better, data-driven decisions.',
    ctaButtonText: 'Get Started Today',
  },
  about: {
    headerTitle: 'About Cosgit Analytics',
    headerSubtitle:
      'A leading Data Science and Analytics consulting firm based in Nairobi, Kenya',
    storyTitle: 'Our Story',
    storyParagraph1:
      'Cosgit Analytics is a dynamic Data Science, Analytics, Monitoring & Evaluation (M&E), and Business Intelligence consulting firm based in Nairobi, Kenya. Established under the Companies Act (2015), we empower organizations to harness the power of data to drive evidence-based decision-making, optimize operations, and unlock strategic growth.',
    storyParagraph2:
      'We provide high-impact data-driven solutions across sectors, specializing in research, M&E systems design, advanced analytics, predictive modeling, and cutting-edge data visualizations tailored for businesses, NGOs, governments, and development partners.',
    storyParagraph3:
      'Our team of expert data scientists, analysts, and M&E specialists combines deep technical expertise with sector knowledge to deliver solutions that transform data into actionable insights for our clients.',
    missionTitle: 'Our Mission',
    missionText:
      'To empower organizations with data-driven insights through cutting-edge analytics, innovative M&E solutions, and impactful visualizations.',
    visionTitle: 'Our Vision',
    visionText:
      'To be the most trusted and transformative partner in Data Science, Analytics, Monitoring & Evaluation, and Strategic Insights across Africa and beyond.',
    commitmentTitle: 'Our Commitment',
    commitmentText:
      'We are committed to delivering actionable insights through reliable data, advanced analytics, and professional M&E practices, enabling clients to achieve lasting impact.',
    philosophyTitle: 'Our Philosophy',
    philosophyText: '"Kaizen: Continuous improvement through data-driven learning and innovation."',
  },
  contact: {
    headerTitle: 'Contact Us',
    headerSubtitle:
      'Get in touch with our team for any inquiries or to discuss your data needs',
    phoneTitle: 'Phone',
    phoneNumber: '+254 717 065 015',
    phoneButtonText: 'Call us',
    emailTitle: 'Email',
    emailAddress: 'info@cosgitanalytics.com',
    emailButtonText: 'Email us',
    addressTitle: 'Address',
    addressText: 'Kabete Gardens Apartment, Lower Kabete, Nairobi, Kenya',
  },
};

const fromRows = (rows: Array<{ slug: string; title: string; content: any }>): PageContentState => {
  const bySlug = Object.fromEntries(rows.map((row) => [row.slug, row.content]));

  return {
    home: { ...defaultContent.home, ...(bySlug.home || {}) },
    about: { ...defaultContent.about, ...(bySlug.about || {}) },
    contact: { ...defaultContent.contact, ...(bySlug.contact || {}) },
  };
};

export const PageContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<PageContentState>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);

  const refreshPageContent = async () => {
    setIsLoading(true);

    const { data, error } = await supabase.from('pages').select('slug, title, content');

    if (error) {
      console.error('Failed to fetch page content from Supabase:', error);
      setIsLoading(false);
      return;
    }

    setContent(fromRows(data || []));
    setIsLoading(false);
  };

  useEffect(() => {
    refreshPageContent();
  }, []);

  const updatePage = async (slug: 'home' | 'about' | 'contact', title: string, pageContent: any) => {
    const { error } = await supabase.from('pages').upsert(
      {
        slug,
        title,
        content: pageContent,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'slug' }
    );

    if (error) {
      console.error(`Failed to update ${slug} page:`, error);
      throw error;
    }

    await refreshPageContent();
  };

  const updateHome = async (home: HomePageContent) => {
    await updatePage('home', 'Home', home);
  };

  const updateAbout = async (about: AboutPageContent) => {
    await updatePage('about', 'About', about);
  };

  const updateContact = async (contact: ContactPageContent) => {
    await updatePage('contact', 'Contact', contact);
  };

  return (
    <PageContentContext.Provider
      value={{ content, updateHome, updateAbout, updateContact, refreshPageContent, isLoading }}
    >
      {children}
    </PageContentContext.Provider>
  );
};

export const usePageContent = () => {
  const context = useContext(PageContentContext);
  if (!context) {
    throw new Error('usePageContent must be used within a PageContentProvider');
  }
  return context;
};