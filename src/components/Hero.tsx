import React, { useEffect, useRef } from 'react';
import { Phone, AlertTriangle, ChevronDown } from 'lucide-react';
import Navigation from './Navigation';
import WeatherTickerWidget from './WeatherTickerWidget';
import WeatherForecastWidget from './WeatherForecastWidget';

interface HeroProps {
  onEmergencyClick: () => void;
  onIncidentClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onEmergencyClick, onIncidentClick }) => {
  const rainContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create rain effect
    const createRain = () => {
      const rainContainer = rainContainerRef.current;
      if (!rainContainer) return;

      const rainCount = 50;
      rainContainer.innerHTML = '';

      for (let i = 0; i < rainCount; i++) {
        const drop = document.createElement('div');
        drop.className = 'absolute w-px bg-gradient-to-b from-white/30 to-transparent';
        
        const left = Math.random() * 100;
        const height = 20 + Math.random() * 40;
        const duration = 1 + Math.random() * 2;
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
      lightningFlash.style.opacity = '0.3';
      
      setTimeout(() => {
        lightningFlash.style.opacity = '0';
        setTimeout(() => {
          document.body.removeChild(lightningFlash);
        }, 200);
      }, 100);
    };
    createRain();
    
    // Random lightning every 8-15 seconds
    const lightningInterval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance
        createLightning();
      }
    }, 8000 + Math.random() * 7000);

    return () => {
      clearInterval(lightningInterval);
    };
  }, []);

  return (
    <section id="home" className="relative h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <div className="relative z-40">
        <Navigation />
        {/* The button container that was here has been removed */}
      </div>

      {/* Hero Content Container */}
      <div className="flex-1 flex items-center justify-center relative">
        {/* Background Image */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900 to-black"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1527482797697-8795b05a13fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')"
          }}
        ></div>

        {/* Rain Effect */}
        <div ref={rainContainerRef} className="absolute inset-0 z-10"></div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 z-30 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            <span className="text-yellow-500 drop-shadow-lg">Resilient Pio Duran:</span>
            <br />
            <span className="drop-shadow-lg">Prepared for Tomorrow</span>
          </h2>
          <p className="text-xl text-white max-w-2xl mx-auto mb-8 drop-shadow-md">
            Enhancing disaster preparedness, strengthening community resilience and ensuring safety for all.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={onEmergencyClick}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-900 font-bold rounded-full shadow-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95"
            >
              <Phone className="mr-2" size={20} />
              Emergency Hotline
            </button>
            <button
              onClick={onIncidentClick}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-full shadow-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 pulse-animation"
            >
              <AlertTriangle className="mr-2" size={20} />
              Report Incident
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-20 left-0 right-0 flex justify-center z-30">
          <ChevronDown className="text-white animate-bounce" size={32} />
        </div>
      </div>
      
      {/* Weather Ticker Widget */}
      <div className="relative z-1">
        <WeatherTickerWidget />
        <WeatherForecastWidget />
      </div>
    </section>
  );
};

export default Hero;