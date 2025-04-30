import { ReactNode } from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  children?: ReactNode;
}

const SectionTitle = ({ 
  title, 
  subtitle, 
  align = 'center',
  children 
}: SectionTitleProps) => {
  // Split the title into first word and rest
  const words = title.split(' ');
  const firstWord = words[0];
  const restWords = words.slice(1).join(' ');

  return (
    <div className={`mb-12 ${align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'}`}>
      <h2 className="text-3xl md:text-4xl font-bold">
        <span className="text-secondary-600">{firstWord}</span>
        {restWords && <span className="text-primary-600"> {restWords}</span>}
      </h2>
      {subtitle && (
        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
};

export default SectionTitle;