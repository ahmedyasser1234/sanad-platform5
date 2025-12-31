import React from 'react';
import { Instagram, Twitter, MessageCircle, Music2 } from 'lucide-react';

interface FooterProps {
    lang: 'ar' | 'en';
}

// --- CONFIGURATION ---
// The image that sits on top of the footer border, above the icons
// Updated to use absolute path starting with '/' for correct loading
const FOOTER_DECORATION_IMAGE = "/images/Asset 14@2x.png";

const Footer: React.FC<FooterProps> = ({ lang }) => {
  const content = {
      ar: {
          links: [
              'الرئيسية',
              'رحلة القبول',
              'رحلة الحياة الجامعية',
              'رحلة المنح الدراسية والحلول المالية',
              'رحلة الأكاديمية',
              'رحلة قيمية',
              'خدمـــاتي',
              'خدمات سند'
          ],
          title: 'مركز سند',
          subtitle: 'لرعاية الطلاب المستفيدين',
          desc: 'مركز سند نموذجاً رائداً في رعاية وتمكين المستفيدين بالجامعة.'
      },
      en: {
          links: [
              'Home',
              'Admissions Journey',
              'University Life Journey',
              'Scholarships & Financial Solutions',
              'Academic Journey',
              'Values Journey',
              'My Services',
              'Sanad Services'
          ],
          title: 'Sanad Center',
          subtitle: 'Student Care & Support',
          desc: 'Sanad Center is a pioneering model in caring for and empowering beneficiaries at the university.'
      }
  };

  const t = content[lang];

  return (
    // Wrapped in a div with the same gradient as the previous section to ensure the corners blend seamlessly
    <div className={`w-full transition-all duration-500 ${lang === 'en' ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-[#bce6f9] via-[#e6f5fc] to-white`}>
        <footer id="main-footer" className="relative w-full bg-[#9b8bd9] text-white pt-32 pb-20 overflow-visible z-0 rounded-t-[50px] md:rounded-t-[100px]">
            
            <div className="container mx-auto px-6 md:px-20 relative z-10">
                
                <div className="flex flex-col md:flex-row justify-between items-start gap-10 md:gap-4">
                    
                    {/* MOBILE ONLY: Decoration Image (Order 1) */}
                    <div className="w-full flex justify-center md:hidden order-1 -mt-32 mb-6 relative z-20">
                        <img 
                            src={FOOTER_DECORATION_IMAGE} 
                            alt="Decoration" 
                            className="w-48 h-auto object-contain drop-shadow-xl"
                        />
                    </div>

                    {/* 1. Navigation Links (Start Side) */}
                    {/* Mobile: Order 2 | Desktop: Order 1 */}
                    <div className={`w-full md:w-1/3 text-center pt-2 order-2 md:order-1 ${lang === 'ar' ? 'md:text-right' : 'md:text-left'}`}>
                        <ul className="space-y-4 text-lg md:text-xl font-bold">
                            {t.links.map((link, idx) => (
                                <li key={idx}><a href="#" className="hover:opacity-80 transition-opacity inline-block">{link}</a></li>
                            ))}
                        </ul>
                    </div>

                    {/* 2. CENTER SECTION: Logo and Text */}
                    {/* Mobile: Order 3 | Desktop: Order 2 */}
                    <div className="w-full md:w-1/3 text-center order-3 md:order-2 md:mt-0 flex flex-col items-center">
                        <h2 className="text-4xl md:text-6xl font-black mb-2 tracking-wide">{t.title}</h2>
                        <p className="text-xl md:text-2xl font-bold mb-8 opacity-90">{t.subtitle}</p>
                        
                        <p className="text-xl md:text-2xl leading-loose font-medium opacity-95 max-w-sm mx-auto">
                            {t.desc}
                        </p>
                    </div>

                    {/* 3. Social Icons & Decoration (End Side) */}
                    {/* Mobile: Order 4 | Desktop: Order 3 */}
                    {/* Updated alignment: Always use md:items-end. 
                        In RTL (AR), 'end' is Left. In LTR (EN), 'end' is Right. 
                        This ensures icons hug the outer edge in both languages. */}
                    <div className="w-full md:w-1/3 flex flex-col order-4 md:order-3 items-center md:items-end">
                        
                        {/* The Decorative Image - DESKTOP ONLY */}
                        {/* Negative top margin pulls it up over the footer border */}
                        <div className="-mt-32 mb-6 relative z-20 hidden md:block">
                            <img 
                                src={FOOTER_DECORATION_IMAGE} 
                                alt="Decoration" 
                                className="w-48 md:w-56 h-auto object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        {/* Icons */}
                        <div className="flex md:flex-col gap-5 items-center md:items-end">
                            {/* Twitter / X */}
                            <a href="#" className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#9b8bd9] hover:scale-110 transition-transform shadow-lg">
                                <Twitter className="w-7 h-7 fill-current" />
                            </a>
                            
                            {/* TikTok */}
                            <a href="#" className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#9b8bd9] hover:scale-110 transition-transform shadow-lg">
                                <Music2 className="w-7 h-7" />
                            </a>

                            {/* Instagram */}
                            <a href="#" className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#9b8bd9] hover:scale-110 transition-transform shadow-lg">
                                <Instagram className="w-7 h-7" />
                            </a>

                            {/* Whatsapp */}
                            <a href="#" className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#9b8bd9] hover:scale-110 transition-transform shadow-lg">
                                <MessageCircle className="w-7 h-7 fill-current" />
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    </div>
  );
};

export default Footer;