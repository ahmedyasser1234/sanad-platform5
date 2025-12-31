import React, { useState, useEffect } from 'react';
import SanadCharacter from './SanadCharacter';

interface HeroProps {
    lang: 'ar' | 'en';
}

const Hero: React.FC<HeroProps> = ({ lang }) => {
  const content = {
      ar: {
          welcome: 'هلا وغلا معاك سند',
          secondLine: 'إذا أردت التحدث لا تتردد',
          title: 'مركز سند نموذجاً رائداً في رعاية وتمكين المستفيدين بالجامعة.',
      },
      en: {
          welcome: 'Hello & Welcome',
          secondLine: ' Do not hesitate to chat',
          title: 'Sanad Center is a pioneering model in caring for and empowering beneficiaries at the university.',
      }
  };

  const t = content[lang];
  
  // Animation States for Bubble Appearance
  const [showDots, setShowDots] = useState(false);
  const [showPill, setShowPill] = useState(false);

  useEffect(() => {
    // Sequence: Load -> 500ms Dots -> 1200ms Pill
    const t1 = setTimeout(() => setShowDots(true), 500);
    const t2 = setTimeout(() => setShowPill(true), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  
  // Typewriter Effect State
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    // Only start typing logic if the pill is visible
    if (!showPill) return;

    // Reset text when language changes to restart animation
    setDisplayedText('');
    
    const messages = [t.welcome, t.secondLine];
    let msgIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const type = () => {
      const currentMsg = messages[msgIndex];
      
      if (isDeleting) {
        // Deleting
        setDisplayedText(currentMsg.substring(0, charIndex - 1));
        charIndex--;
        
        if (charIndex === 0) {
          isDeleting = false;
          msgIndex = (msgIndex + 1) % messages.length; // Switch to next message
          timeoutId = setTimeout(type, 500); // Wait before typing next
        } else {
          timeoutId = setTimeout(type, 30); // Deleting speed
        }
      } else {
        // Typing
        setDisplayedText(currentMsg.substring(0, charIndex + 1));
        charIndex++;
        
        if (charIndex === currentMsg.length) {
          isDeleting = true;
          timeoutId = setTimeout(type, 2000); // Wait before starting to delete
        } else {
          timeoutId = setTimeout(type, 100); // Typing speed
        }
      }
    };

    timeoutId = setTimeout(type, 300); // Start typing shortly after pill appears

    return () => clearTimeout(timeoutId);
  }, [t.welcome, t.secondLine, lang, showPill]);

  return (
    <section className="relative w-full pt-28 md:pt-32 pb-12 overflow-visible">
        <div className="container mx-auto px-4 relative min-h-[350px] lg:min-h-[400px]">
            
            {/* Visuals (Character + Pill) */}
            {/* Increased z-index to 20 to ensure it stays on top of the text box */}
            <div className={`absolute top-0 z-20 flex flex-col pointer-events-none transition-all duration-500 ${lang === 'ar' ? 'right-0 items-end' : 'left-0 items-start'}`}>
                {/* Visual Group Wrapper */}
                {/* For English: Shifting it more to the far-left (ml-4 lg:ml-8) to avoid center overlap */}
                {/* For Arabic: Adjusted negative margin to -mr-16 on mobile to move it slightly left from the extreme right */}
                {/* Update: For English mobile, shifted left with -ml-6 */}
                <div className={`relative mt-6 md:mt-0 ${lang === 'ar' ? '-mr-16 md:mr-24 lg:mr-48' : '-ml-6 md:ml-4 lg:ml-8'}`}>
                    
                    {/* Speech Bubble Container */}
                    {/* Adjusted position: Moved to the side (where yellow icons were indicated) */}
                    <div className={`absolute z-30 flex items-end min-w-max transition-all duration-500 ${lang === 'ar' ? 'top-[15%] right-[75%] md:right-[75%]' : 'top-[15%] left-[75%] md:left-[75%]'}`}>
                         <div className="flex items-end gap-2">
                             
                             {/* Dots Component - Animated */}
                             <div className={`flex items-end mb-1 gap-1 transition-all duration-500 ease-out transform ${showDots ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-sanad-soft rounded-full"></div>
                                <div className="w-3 h-3 md:w-5 md:h-5 bg-sanad-soft rounded-full"></div>
                            </div>

                             {/* Pill Component with Typewriter Effect - Animated */}
                             <div className={`bg-sanad-soft text-white px-6 py-2 md:px-10 md:py-4 rounded-full text-sm md:text-2xl font-bold shadow-sm whitespace-nowrap mb-2 min-w-[120px] md:min-w-[200px] transition-all duration-500 ease-out transform ${showPill ? 'opacity-100 scale-100' : 'opacity-0 scale-0'} ${lang === 'ar' ? 'origin-bottom-right' : 'origin-bottom-left'}`}>
                                {displayedText}
                                <span className="animate-pulse">|</span>
                             </div>

                         </div>
                    </div>

                    {/* The Character SVG */}
                    {/* Added scale-x-[-1] for English to make him look towards the text box */}
                    <div className={`w-[260px] md:w-[400px] flex items-end justify-center relative z-0 mt-2 md:mt-4 transition-transform duration-500 ${lang === 'en' ? 'scale-x-[-1]' : ''}`}>
                         <SanadCharacter className="w-full h-auto drop-shadow-lg relative z-10" />
                         {/* Ground Shadow */}
                         <div className="absolute bottom-[8%] left-1/2 transform -translate-x-1/2 w-[70%] h-4 md:h-8 bg-black/15 blur-lg rounded-[100%] z-0"></div>
                    </div>
                </div>
            </div>

            {/* Center: Text Box (Sanad Center Message) */}
            {/* Kept z-10 so character (z-20) can overlap if needed on smaller screens without hiding part of the character */}
            {/* REDUCED PADDING TOP significantly to raise the section */}
            {/* Mobile Padding increased from pt-64 to pt-80 to move box down */}
            <div className={`w-full flex justify-center lg:justify-center items-center relative z-10 pt-80 md:pt-72 lg:pt-56 ${lang === 'ar' ? 'md:justify-start' : 'md:justify-end'}`}>
                {/* 
                    Glassmorphism Update:
                    - Gradient: White/95 (Top Left Shine) -> Pinkish White/70 -> Pale Pink/40 (Bottom Right)
                    - Blur: backdrop-blur-2xl for frosted glass look
                    - Border: Subtle white border for edge definition
                    - Shadow: Colored pinkish shadow for glow
                */}
                <div className={`bg-gradient-to-br from-white/95 via-[#fff1f2]/70 to-[#ffe4e6]/40 backdrop-blur-2xl border border-white/70 px-4 py-4 md:px-10 md:py-8 lg:px-12 lg:py-10 rounded-[2rem] md:rounded-[2.5rem] w-full max-w-[260px] md:max-w-[420px] lg:max-w-2xl shadow-[0_8px_32px_rgba(255,200,220,0.15)] text-center mx-auto lg:mx-auto ${lang === 'ar' ? 'md:mx-0 md:mr-96 lg:mr-[46rem]' : 'md:mx-0 md:ml-96 lg:ml-[46rem]'}`}>
                    <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-700 leading-relaxed">
                        {t.title}
                    </h2>
                </div>
            </div>

        </div>
    </section>
  );
};

export default Hero;