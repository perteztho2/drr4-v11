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
  const lightningTimeoutsRef = useRef<NodeJS.Timeout[]>([]);

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
        const height = 30 + Math.random() * 40;
        const duration = 0.4 + Math.random() * 1.5;
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
      
      const timeout1 = setTimeout(() => {
        lightningFlash.style.opacity = '0';
        const timeout2 = setTimeout(() => {
          if (document.body.contains(lightningFlash)) {
            document.body.removeChild(lightningFlash);
          }
          // Remove timeouts from tracking array
          lightningTimeoutsRef.current = lightningTimeoutsRef.current.filter(t => t !== timeout1 && t !== timeout2);
        }, 300);
        lightningTimeoutsRef.current.push(timeout2);
      }, 150);
      lightningTimeoutsRef.current.push(timeout1);
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
      // Clear all lightning timeouts
      lightningTimeoutsRef.current.forEach(timeout => clearTimeout(timeout));
      lightningTimeoutsRef.current = [];
      // Remove any remaining lightning flash elements
      const lightningElements = document.querySelectorAll('.fixed.inset-0.bg-white.pointer-events-none.z-20');
      lightningElements.forEach(element => {
        if (document.body.contains(element)) {
          document.body.removeChild(element);
        }
      });
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
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-white mb-4 md:mb-5 leading-tight px-4 animate-fade-in">
            <span className="text-yellow-400 drop-shadow-2xl animate-text-glow">Resilient Pio Duran:</span>
            <br />
            <span className="drop-shadow-2xl animate-slide-up">Prepared for Tomorrow</span>
            </h1>
          <p className="text-sm md:text-lg lg:text-2xl text-white max-w-4xl mx-auto mb-6 md:mb-9 drop-shadow-lg leading-relaxed px-4 animate-slide-up stagger-2">
            Building stronger communities through comprehensive disaster preparedness, innovative response strategies, and unwavering commitment to public safety.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-7 md:gap-6 mb-6 md:mb-9 px-4 animate-slide-up stagger-3">
            <button
              onClick={onEmergencyClick}
              className="inline-flex items-center px-6 md:px-12 py-4 md:py-6 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-full shadow-xl md:shadow-2xl hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl md:hover:shadow-3xl active:scale-95 text-sm md:text-xl animate-pulse-glow"
            >
              <Phone className="mr-2 md:mr-4 animate-bounce" size={20} />
              Emergency Hotline
            </button>
            <button
              onClick={onIncidentClick}
              className="inline-flex items-center px-6 md:px-12 py-4 md:py-6 bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-950 font-bold rounded-full shadow-xl md:shadow-2xl hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl md:hover:shadow-3xl active:scale-95 text-sm md:text-xl animate-pulse-glow"
            >
              <AlertTriangle className="mr-2 md:mr-4 animate-bounce" size={20} />
              Report Incident
            </button>
          </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-16 md:bottom-20 left-0 right-0 flex justify-center z-30 animate-bounce">
          <button
            onClick={handleScrollClick}
            className="text-white hover:text-yellow-400 transition-all duration-300 focus:outline-none transform hover:scale-110 animate-float"
            aria-label="Scroll to next section"
          >
            <div className="glass-modern rounded-full p-4 border border-white/40 shadow-lg hover:shadow-xl">
              <ChevronDown className={`${isScrolling ? 'animate-spin' : 'animate-bounce'} hover:scale-110 transition-transform duration-200`} size={24} />
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