import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Home, Info, Phone, RefreshCw } from 'lucide-react';
import {
  AboutPageContent,
  ContactPageContent,
  HomePageContent,
  usePageContent,
} from '../../context/PageContentContext';

type ActiveTab = 'home' | 'about' | 'contact';

const AdminPagesPage = () => {
  const { content, updateHome, updateAbout, updateContact, refreshPageContent, isLoading } =
    usePageContent();

  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [homeForm, setHomeForm] = useState<HomePageContent>(content.home);
  const [aboutForm, setAboutForm] = useState<AboutPageContent>(content.about);
  const [contactForm, setContactForm] = useState<ContactPageContent>(content.contact);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    document.title = 'Edit Pages | Admin Dashboard';
  }, []);

  useEffect(() => {
    setHomeForm(content.home);
    setAboutForm(content.about);
    setContactForm(content.contact);
  }, [content]);

  const handleHomeChange = (field: keyof HomePageContent, value: string) => {
    setHomeForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAboutChange = (field: keyof AboutPageContent, value: string) => {
    setAboutForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleContactChange = (field: keyof ContactPageContent, value: string) => {
    setContactForm((prev) => ({ ...prev, [field]: value }));
  };

  const renderInput = (
    label: string,
    value: string,
    onChange: (value: string) => void,
    textarea = false,
    rows = 4
  ) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {textarea ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} className="form-control" />
      ) : (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="form-control" />
      )}
    </div>
  );

  const handleSaveHome = async () => {
    try {
      setIsSaving(true);
      await updateHome(homeForm);
      alert('Home page saved.');
    } catch {
      alert('Failed to save Home page.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAbout = async () => {
    try {
      setIsSaving(true);
      await updateAbout(aboutForm);
      alert('About page saved.');
    } catch {
      alert('Failed to save About page.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveContact = async () => {
    try {
      setIsSaving(true);
      await updateContact(contactForm);
      alert('Contact page saved.');
    } catch {
      alert('Failed to save Contact page.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 pt-20">
        <div className="container py-8 text-gray-600">Loading page content...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Edit Pages</h1>
          <div className="flex gap-3">
            <button
              onClick={refreshPageContent}
              className="btn bg-blue-100 text-blue-700 hover:bg-blue-200"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </button>
            <Link to="/admin" className="btn bg-gray-600 text-white hover:bg-gray-700">
              Back to Dashboard
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('home')}
              className={`btn ${activeTab === 'home' ? 'btn-primary' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`btn ${activeTab === 'about' ? 'btn-primary' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
            >
              <Info className="w-4 h-4 mr-2" />
              About
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`btn ${activeTab === 'contact' ? 'btn-primary' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
            >
              <Phone className="w-4 h-4 mr-2" />
              Contact
            </button>
          </div>
        </div>

        {activeTab === 'home' && (
          <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
            <h2 className="text-2xl font-semibold">Home Page Content</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {renderInput('Hero Title', homeForm.heroTitle, (v) => handleHomeChange('heroTitle', v), true, 3)}
              {renderInput('Hero Subtitle', homeForm.heroSubtitle, (v) => handleHomeChange('heroSubtitle', v), true, 4)}
              {renderInput('Hero Primary Button Text', homeForm.heroPrimaryButtonText, (v) => handleHomeChange('heroPrimaryButtonText', v))}
              {renderInput('Hero Secondary Button Text', homeForm.heroSecondaryButtonText, (v) => handleHomeChange('heroSecondaryButtonText', v))}
            </div>

            <h3 className="text-xl font-semibold pt-4 border-t">About Preview Section</h3>

            <div className="grid md:grid-cols-2 gap-6">
              {renderInput('Section Title', homeForm.aboutPreviewTitle, (v) => handleHomeChange('aboutPreviewTitle', v))}
              {renderInput('About Button Text', homeForm.aboutButtonText, (v) => handleHomeChange('aboutButtonText', v))}
              {renderInput('Paragraph 1', homeForm.aboutPreviewParagraph1, (v) => handleHomeChange('aboutPreviewParagraph1', v), true, 5)}
              {renderInput('Paragraph 2', homeForm.aboutPreviewParagraph2, (v) => handleHomeChange('aboutPreviewParagraph2', v), true, 5)}
              {renderInput('Feature 1 Title', homeForm.aboutFeature1Title, (v) => handleHomeChange('aboutFeature1Title', v))}
              {renderInput('Feature 1 Text', homeForm.aboutFeature1Text, (v) => handleHomeChange('aboutFeature1Text', v))}
              {renderInput('Feature 2 Title', homeForm.aboutFeature2Title, (v) => handleHomeChange('aboutFeature2Title', v))}
              {renderInput('Feature 2 Text', homeForm.aboutFeature2Text, (v) => handleHomeChange('aboutFeature2Text', v))}
              {renderInput('Feature 3 Title', homeForm.aboutFeature3Title, (v) => handleHomeChange('aboutFeature3Title', v))}
              {renderInput('Feature 3 Text', homeForm.aboutFeature3Text, (v) => handleHomeChange('aboutFeature3Text', v))}
              {renderInput('Feature 4 Title', homeForm.aboutFeature4Title, (v) => handleHomeChange('aboutFeature4Title', v))}
              {renderInput('Feature 4 Text', homeForm.aboutFeature4Text, (v) => handleHomeChange('aboutFeature4Text', v))}
            </div>

            <h3 className="text-xl font-semibold pt-4 border-t">CTA Section</h3>

            <div className="grid md:grid-cols-2 gap-6">
              {renderInput('CTA Title', homeForm.ctaTitle, (v) => handleHomeChange('ctaTitle', v), true, 3)}
              {renderInput('CTA Button Text', homeForm.ctaButtonText, (v) => handleHomeChange('ctaButtonText', v))}
              {renderInput('CTA Subtitle', homeForm.ctaSubtitle, (v) => handleHomeChange('ctaSubtitle', v), true, 4)}
            </div>

            <div className="flex justify-end">
              <button onClick={handleSaveHome} disabled={isSaving} className="btn btn-primary">
                {isSaving ? 'Saving...' : 'Save Home Page'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
            <h2 className="text-2xl font-semibold">About Page Content</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {renderInput('Header Title', aboutForm.headerTitle, (v) => handleAboutChange('headerTitle', v))}
              {renderInput('Header Subtitle', aboutForm.headerSubtitle, (v) => handleAboutChange('headerSubtitle', v), true, 3)}
              {renderInput('Story Section Title', aboutForm.storyTitle, (v) => handleAboutChange('storyTitle', v))}
              {renderInput('Story Paragraph 1', aboutForm.storyParagraph1, (v) => handleAboutChange('storyParagraph1', v), true, 5)}
              {renderInput('Story Paragraph 2', aboutForm.storyParagraph2, (v) => handleAboutChange('storyParagraph2', v), true, 5)}
              {renderInput('Story Paragraph 3', aboutForm.storyParagraph3, (v) => handleAboutChange('storyParagraph3', v), true, 5)}
              {renderInput('Mission Title', aboutForm.missionTitle, (v) => handleAboutChange('missionTitle', v))}
              {renderInput('Mission Text', aboutForm.missionText, (v) => handleAboutChange('missionText', v), true, 4)}
              {renderInput('Vision Title', aboutForm.visionTitle, (v) => handleAboutChange('visionTitle', v))}
              {renderInput('Vision Text', aboutForm.visionText, (v) => handleAboutChange('visionText', v), true, 4)}
              {renderInput('Commitment Title', aboutForm.commitmentTitle, (v) => handleAboutChange('commitmentTitle', v))}
              {renderInput('Commitment Text', aboutForm.commitmentText, (v) => handleAboutChange('commitmentText', v), true, 4)}
              {renderInput('Philosophy Title', aboutForm.philosophyTitle, (v) => handleAboutChange('philosophyTitle', v))}
              {renderInput('Philosophy Text', aboutForm.philosophyText, (v) => handleAboutChange('philosophyText', v), true, 3)}
            </div>

            <div className="flex justify-end">
              <button onClick={handleSaveAbout} disabled={isSaving} className="btn btn-primary">
                {isSaving ? 'Saving...' : 'Save About Page'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
            <h2 className="text-2xl font-semibold">Contact Page Content</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {renderInput('Header Title', contactForm.headerTitle, (v) => handleContactChange('headerTitle', v))}
              {renderInput('Header Subtitle', contactForm.headerSubtitle, (v) => handleContactChange('headerSubtitle', v), true, 3)}
              {renderInput('Phone Card Title', contactForm.phoneTitle, (v) => handleContactChange('phoneTitle', v))}
              {renderInput('Phone Number', contactForm.phoneNumber, (v) => handleContactChange('phoneNumber', v))}
              {renderInput('Phone Button Text', contactForm.phoneButtonText, (v) => handleContactChange('phoneButtonText', v))}
              {renderInput('Email Card Title', contactForm.emailTitle, (v) => handleContactChange('emailTitle', v))}
              {renderInput('Email Address', contactForm.emailAddress, (v) => handleContactChange('emailAddress', v))}
              {renderInput('Email Button Text', contactForm.emailButtonText, (v) => handleContactChange('emailButtonText', v))}
              {renderInput('Address Card Title', contactForm.addressTitle, (v) => handleContactChange('addressTitle', v))}
              {renderInput('Address Text', contactForm.addressText, (v) => handleContactChange('addressText', v), true, 4)}
            </div>

            <div className="flex justify-end">
              <button onClick={handleSaveContact} disabled={isSaving} className="btn btn-primary">
                {isSaving ? 'Saving...' : 'Save Contact Page'}
              </button>
            </div>
          </div>
        )}

        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
          <div className="flex items-start">
            <FileText className="w-5 h-5 mr-2 mt-0.5" />
            <p>These edits now save to Supabase and are shared globally.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPagesPage;