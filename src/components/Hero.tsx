import React, { useEffect, useRef, useState } from 'react';
import { Phone, AlertTriangle, ChevronDown } from 'lucide-react';
import Navigation from './Navigation';
import WeatherTickerWidget from './WeatherTickerWidget';
import WeatherForecastWidget from './WeatherForecastWidget';
import SmoothScroll from './SmoothScroll';

interface HeroProps {
  onEmergencyClick: () => void;
  onIncidentClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onEmergencyClick, onIncidentClick }) => {
  const rainContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    // Create rain effect
    const createRain = () => {
      const rainContainer = rainContainerRef.current;
      if (!rainContainer) return;

      const rainCount = 80;
      rainContainer.innerHTML = '';

      for (let i = 0; i < rainCount; i++) {
        const drop = document.createElement('div');
        drop.className = 'absolute w-px bg-gradient-to-b from-white/40 to-transparent';
        
        const left = Math.random() * 100;
        const height = 30 + Math.random() * 60;
        const duration = 0.8 + Math.random() * 1.5;
        const delay = Math.random() * 2;

        drop.style.left = `${left}%`;
        drop.style.height = `${height}px`;
        drop.style.animation = `rainDrop ${duration}s linear infinite`;
        drop.style.animationDelay = `${delay}s`;

        rainContainer.appendChild(drop);
      }
    };

    // Create lightning effect
    const createLightning = () => {
      const lightningFlash = document.createElement('div');
      lightningFlash.className = 'fixed inset-0 bg-white pointer-events-none z-20';
      lightningFlash.style.opacity = '0';
      document.body.appendChild(lightningFlash);

      // Flash effect
      lightningFlash.style.transition = 'opacity 0.1s';
      lightningFlash.style.opacity = '0.4';
      
      setTimeout(() => {
        lightningFlash.style.opacity = '0';
        setTimeout(() => {
          document.body.removeChild(lightningFlash);
        }, 300);
      }, 150);
    };
    createRain();
    
    // Random lightning every 8-15 seconds
    const lightningInterval = setInterval(() => {
      if (Math.random() > 0.8) { // 20% chance
        createLightning();
      }
    }, 10000 + Math.random() * 8000);

    return () => {
      clearInterval(lightningInterval);
    };
  }, []);

  const handleScrollClick = () => {
    if (isScrolling) {
      setIsScrolling(false);
      return;
    }
    
    setIsScrolling(true);
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Stop scrolling after reaching the target
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    }
  };
  return (
    <section id="home" className="relative h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <div className="relative z-40">
        <Navigation />
      </div>

      {/* Hero Content Container */}
      <div className="flex-1 flex items-center justify-center relative">
        {/* Background Image */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-black"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1527482797697-8795b05a13fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')"
          }}
        ></div>

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 z-20"></div>
        {/* Rain Effect */}
        <div ref={rainContainerRef} className="absolute inset-0 z-10"></div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 z-30 text-center">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            <span className="text-yellow-400 drop-shadow-2xl">Resilient Pio Duran:</span>
            <br />
            <span className="drop-shadow-2xl">Prepared for Tomorrow</span>
            </h1>
          <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto mb-9 drop-shadow-lg leading-relaxed">
            Building stronger communities through comprehensive disaster preparedness, innovative response strategies, and unwavering commitment to public safety.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-9">
            <button
              onClick={onEmergencyClick}
              className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-full shadow-2xl hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 hover:shadow-3xl active:scale-95 text-lg"
            >
              <Phone className="mr-3" size={24} />
              Emergency Hotline
            </button>
            <button
              onClick={onIncidentClick}
              className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-950 font-bold rounded-full shadow-2xl hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 hover:shadow-3xl active:scale-95 text-lg"
            >
              <AlertTriangle className="mr-0" size={24} />
              Report Incident
            </button>
          </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute inset-0 bottom-1 left-0 right-0 flex justify-center z-30">
          <button
            onClick={handleScrollClick}
            className="text-white hover:text-yellow-400 transition-all duration-300 focus:outline-none transform hover:scale-110"
            aria-label="Scroll to next section"
          >
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 border border-white/30">
              <ChevronDown className={`animate-bounce ${isScrolling ? 'animate-pulse' : ''}`} size={28} />
            </div>
          </button>
        </div>
      </div>
      
      {/* Weather Ticker Widget */}
      <div className="relative z-40">
        <WeatherTickerWidget />
        <WeatherForecastWidget />
      </div>
      
      <SmoothScroll isActive={isScrolling} onStop={() => setIsScrolling(false)} />
    </section>
  );
};

export default Hero;