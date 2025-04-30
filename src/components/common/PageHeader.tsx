import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  bgImage?: string;
}

const PageHeader = ({ 
  title, 
  subtitle, 
  children,
  bgImage = 'https://images.pexels.com/photos/7014337/pexels-photo-7014337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
}: PageHeaderProps) => {
  return (
    <div className="relative pt-20 pb-12 md:pt-24 md:pb-16">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-secondary-900/80"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-3xl text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">{title}</h1>
          {subtitle && <p className="text-xl md:text-2xl text-white/90 mb-8">{subtitle}</p>}
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;