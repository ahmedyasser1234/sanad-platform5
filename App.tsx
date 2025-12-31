import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Journeys from './components/Journeys';
import VisionMission from './components/VisionMission';
import Footer from './components/Footer';
import ChatAssistant from './components/ChatAssistant';
import AboutSanad from './components/AboutSanad';
import Services from './components/Services';
import SanadServices from './components/SanadServices';

const App: React.FC = () => {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className="min-h-screen flex flex-col relative bg-slate-50 font-sans">
      {/* Top Section with Gradient Background */}
      {/* Logic: 
          AR (Default): 'bg-gradient-to-r' -> From Left (Blue) to Right (White).
          EN: 'bg-gradient-to-l' -> From Right (Blue) to Left (White). 
      */}
      <div className={`relative overflow-hidden transition-all duration-500 ${lang === 'en' ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-[#bce6f9] via-[#e6f5fc] to-white`}>
        <Header lang={lang} setLang={setLang} />
        <Hero lang={lang} />
        <Journeys lang={lang} />
      </div>
      
      <main className="flex-grow">
      <Services lang={lang} />
      <AboutSanad lang={lang} />
      <VisionMission lang={lang} />
      <SanadServices lang={lang} />
      </main>
      <ChatAssistant lang={lang} />
      <Footer lang={lang} />
    </div>
  );
};

export default App;