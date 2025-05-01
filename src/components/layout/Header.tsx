import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BarChart2, ChevronDown } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { services } from '../../data/servicesData';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAdmin();
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const mobileServicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
      
      if (mobileServicesRef.current && !mobileServicesRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setServicesOpen(false);
  }, [location]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Blog', path: '/blog' },
  ];

  const desktopNavItems = [
    ...navItems.slice(0, 2),
    { name: 'Services', path: '/services', hasDropdown: true },
    ...navItems.slice(2)
  ];

  const handleMobileServicesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setServicesOpen(!servicesOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-sm ${
        scrolled
          ? 'bg-secondary-500 shadow-lg py-2'
          : 'bg-gradient-to-r from-primary-500/95 to-primary-600/95 py-4'
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between">
          {/* <Link 
            to="/" 
            className="flex items-center group transition-transform duration-300 hover:scale-105"
          >
            <BarChart2 className="w-8 h-8 text-white transition-transform group-hover:rotate-12" />
            <span className="ml-2 text-xl font-bold text-white">
              Cosgit Analytics
            </span>
          </Link> */}

          <Link 
            to="/" 
            className="flex items-center transition-transform duration-300 hover:scale-105"
          >
            <img 
              src="/cosgit-logo.png" 
              alt="Cosgit Analytics Logo" 
              className="h-14 md:h-16 w-auto object-contain"
            />
          </Link>




          <nav className="hidden md:flex items-center space-x-1">
            {desktopNavItems.map((item) => 
              item.hasDropdown ? (
                <div 
                  key="services"
                  className="relative"
                  ref={servicesDropdownRef}
                >
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    onMouseEnter={() => setServicesOpen(true)}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                      location.pathname.startsWith('/services')
                        ? 'text-white bg-white/20'
                        : 'text-white/90 hover:text-white hover:bg-white/20'
                    }`}
                  >
                    Services
                    <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {servicesOpen && (
                    <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 animate-fade-in">
                      <Link
                        to="/services"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-500 transition-colors"
                      >
                        All Services
                      </Link>
                      <div className="h-px bg-gray-100 my-2"></div>
                      {services.map((service) => (
                        <Link
                          key={service.id}
                          to={`/services/${service.id}`}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-500 transition-colors"
                        >
                          <service.icon className="w-4 h-4 mr-2" />
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'text-white bg-white/20'
                      : 'text-white/90 hover:text-white hover:bg-white/20'
                  }`}
                >
                  {item.name}
                </Link>
              )
            )}
            
            {isAuthenticated && (
              <Link
                to="/admin"
                className="ml-2 btn btn-primary bg-white text-primary-600 hover:bg-white/90"
              >
                Dashboard
              </Link>
            )}
          </nav>

          <button
            type="button"
            className="md:hidden p-2 rounded-md hover:bg-white/10 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden pt-4 pb-4 space-y-1 animate-slide-down bg-white rounded-lg mt-4 shadow-lg">
            {navItems.slice(0, 2).map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-4 py-2 text-base font-medium rounded-md transition-colors ${
                  location.pathname === item.path
                    ? 'text-primary-500 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-500 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            <div className="px-4 py-2" ref={mobileServicesRef}>
              <button
                onClick={handleMobileServicesClick}
                className={`flex items-center w-full text-left text-base font-medium transition-colors ${
                  servicesOpen ? 'text-primary-500' : 'text-gray-700'
                }`}
              >
                Services
                <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {servicesOpen && (
                <div className="mt-2 pl-4 space-y-2 border-l-2 border-gray-100 animate-slide-down">
                  <Link
                    to="/services"
                    className="block py-2 text-sm text-gray-700 hover:text-primary-500 transition-colors"
                  >
                    All Services
                  </Link>
                  {services.map((service) => (
                    <Link
                      key={service.id}
                      to={`/services/${service.id}`}
                      className="flex items-center py-2 text-sm text-gray-700 hover:text-primary-500 transition-colors"
                    >
                      <service.icon className="w-4 h-4 mr-2" />
                      {service.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navItems.slice(2).map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-4 py-2 text-base font-medium rounded-md transition-colors ${
                  location.pathname === item.path
                    ? 'text-primary-500 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-500 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {isAuthenticated && (
              <Link
                to="/admin"
                className="block px-4 py-2 text-base font-medium text-primary-500 hover:bg-primary-50 rounded-md"
              >
                Dashboard
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;