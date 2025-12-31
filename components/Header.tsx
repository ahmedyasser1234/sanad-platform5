import React, { useState, useEffect } from 'react';
import { User, Menu, X, Globe } from 'lucide-react';
import { NavItem } from '../types';

interface HeaderProps {
  lang: 'ar' | 'en';
  setLang: (lang: 'ar' | 'en') => void;
}

// --- CONFIGURATION ---
// Change this string to the name of your image file in the public/images folder
// Updated to use absolute path starting with '/' for correct loading
const HEADER_LOGO_IMAGE = "/images/Asset 11.png";

const Header: React.FC<HeaderProps> = ({ lang, setLang }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const content = {
    ar: {
      home: 'الرئيسية',
      about: 'تعرف على سند',
      journey: 'رحلتي',
      services: 'خدماتي',
      sanadServices: 'خدمات سند',
      centerName: 'مركز سند',
      tagline: 'لرعاية الطلاب المستفيدين'
    },
    en: {
      home: 'Home',
      about: 'About Sanad',
      journey: 'My Journey',
      services: 'My Services',
      sanadServices: 'Sanad Services',
      centerName: 'Sanad Center',
      tagline: 'Student Care & Support'
    }
  };

  const t = content[lang];

  const navItems: NavItem[] = [
    { label: t.home, href: '#', isActive: true },
    { label: t.about, href: '#' },
    { label: t.journey, href: '#' },
    { label: t.services, href: '#' },
    { label: t.sanadServices, href: '#', hasDropdown: true },
  ];

  const toggleLanguage = () => {
    const newLang = lang === 'ar' ? 'en' : 'ar';
    setLang(newLang);
  };

  return (
    <header 
        className={`w-full fixed top-0 left-0 right-0 z-[100] transition-all duration-300 px-4 lg:px-8
        ${isScrolled 
            ? 'bg-white/50 backdrop-blur-xl shadow-sm py-2 border-b border-white/20' 
            : 'bg-transparent py-4'
        }`}
    >
      <div className="container mx-auto flex items-center justify-between gap-4">
        
        {/* Logo Section */}
        {/* In RTL (ar), order-1 is right. In LTR (en), order-1 is left. 
            We use margin-inline-end (me) instead of mr to handle spacing automatically based on dir */}
        <div className="flex items-center gap-2 order-1 min-w-max ltr:mr-8 rtl:ml-8 md:ltr:mr-16 md:rtl:ml-16">
          <div className="relative h-12 w-auto">
             {/* Sanad Logo Image - Replaced SVG */}
             <img 
                src={HEADER_LOGO_IMAGE} 
                alt="Sanad Center" 
                className="h-full w-auto object-contain"
             />
          </div>
          {/* Hidden on mobile (hidden), displayed on medium screens and up (md:flex) */}
          <div className="hidden md:flex flex-col items-start">
            <span className="text-xl font-black text-sanad-primary leading-none">{t.centerName}</span>
            <span className="text-xs text-sanad-primary font-bold mt-1">{t.tagline}</span>
          </div>
        </div>

        {/* Center: Navigation Pill */}
        <nav className="hidden lg:flex flex-1 max-w-3xl mx-auto bg-sanad-primary rounded-full p-1 ltr:pl-6 ltr:pr-1 rtl:pr-6 rtl:pl-1 shadow-md order-2 items-center justify-between">
            
            {/* Links Container */}
            {/* Increased font size from text-sm to text-lg */}
            <div className="flex-1 flex justify-between items-center px-4 xl:px-8 text-white font-bold text-lg whitespace-nowrap">
                {navItems.map((item, idx) => (
                    <a 
                        key={idx} 
                        href={item.href}
                        className={`transition-opacity hover:opacity-80 relative group py-1 ${item.isActive ? 'opacity-100' : 'opacity-85'}`}
                    >
                        {item.label}
                        {item.isActive && <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></span>}
                    </a>
                ))}
            </div>
            
            {/* Profile Icon */}
            <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-sanad-primary cursor-pointer hover:bg-gray-100 transition-colors shadow-sm shrink-0 ml-0">
                <div className="w-7 h-7 bg-purple-100 rounded-full flex items-center justify-center">
                     <User className="w-3.5 h-3.5 text-purple-600" />
                </div>
            </div>
        </nav>

        {/* Settings (Toggle + Lang) */}
        <div className="flex items-center gap-3 order-3 min-w-max ltr:ml-8 rtl:mr-8 md:ltr:ml-16 md:rtl:mr-16">
            
            {/* Language Globe Button with Text */}
            <button 
                onClick={toggleLanguage}
                className="flex items-center gap-2 bg-white/90 hover:bg-white backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm transition-all group border border-white/50 hover:shadow-md"
                title={lang === 'ar' ? 'Switch to English' : 'التحويل للعربية'}
            >
                <Globe className="w-5 h-5 text-sanad-primary group-hover:text-sanad-secondary transition-colors" />
                <span className="font-bold text-sm text-sanad-primary group-hover:text-sanad-secondary transition-colors pt-0.5 leading-none">
                    {lang === 'ar' ? 'EN' : 'AR'}
                </span>
            </button>

             {/* Mobile Menu Button */}
             <button 
                className="lg:hidden p-2 text-sanad-primary"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/90 backdrop-blur-xl border-t border-white/20 p-6 shadow-xl absolute w-full left-0 top-full z-50">
            <ul className="space-y-4">
                {navItems.map((item, idx) => (
                    <li key={idx}>
                        <a href={item.href} className="block p-3 rounded-xl hover:bg-sanad-sky/50 text-sanad-dark font-bold text-base transition-colors">
                            {item.label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
      )}
    </header>
  );
};

export default Header;