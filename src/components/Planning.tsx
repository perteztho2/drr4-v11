import React from 'react';
import { MapPin, Bell, Route, Leaf, Building, Handshake } from 'lucide-react';
import { Link } from 'react-router-dom';

const Planning: React.FC = () => {
  const planningAreas = [
    {
      icon: MapPin,
      title: 'Risk Assessment & Hazard Mapping',
      description: 'Identifying vulnerable areas and creating updated local disaster maps with interactive GIS technology.',
      color: 'border-blue-500',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-500'
    },
    {
      icon: Bell,
      title: 'Early Warning Systems',
      description: 'Implementing real-time alerts for typhoons, floods, and earthquakes through multiple channels.',
      color: 'border-yellow-500',
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-500'
    },
    {
      icon: Route,
      title: 'Evacuation Planning',
      description: 'Ensuring designated safe zones and clear evacuation routes with regular community drills.',
      color: 'border-red-500',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-500'
    },
    {
      icon: Leaf,
      title: 'Climate Adaptation',
      description: 'Promoting green infrastructure, sustainable land use, and environmental restoration projects.',
      color: 'border-green-500',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-500'
    },
    {
      icon: Building,
      title: 'Infrastructure Resilience',
      description: 'Strengthening community structures to withstand disasters through engineering solutions.',
      color: 'border-purple-500',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-500'
    },
    {
      icon: Handshake,
      title: 'Multi-Sector Collaboration',
      description: 'Partnering with government agencies, NGOs, and businesses for comprehensive disaster response.',
      color: 'border-indigo-500',
      bgColor: 'bg-indigo-50',
      iconColor: 'text-indigo-500'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-6 relative">
            <span className="relative z-10">
            Disaster Risk Reduction & Management Planning
            </span>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
          </h2>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Building resilient communities through comprehensive planning, proactive strategies, and community engagement to minimize disaster risks and enhance emergency response capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {planningAreas.map((area, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-white/20 hover:border-yellow-500/50 group"
            >
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <area.icon size={32} className="text-blue-950" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                {area.title}
              </h3>
              <p className="text-blue-100 mb-6 leading-relaxed">
                {area.description}
              </p>
              <button className="text-yellow-400 font-semibold hover:text-yellow-300 flex items-center transition-colors group-hover:translate-x-1 duration-300">
                Read More
                <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl border border-white/20 mb-16">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h3 className="text-3xl font-bold text-white mb-6">Interactive Hazard Map</h3>
              <p className="text-blue-100 mb-6 leading-relaxed text-lg">
                Explore our real-time hazard mapping system to understand risks in your area.
              </p>
              <Link 
                to="/disaster-planning"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-950 rounded-full font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                <MapPin className="mr-3" size={20} />
                View Community Map
              </Link>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/30">
                <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="mx-auto h-16 w-16 text-blue-600 mb-4" />
                  <span className="text-blue-800 font-semibold text-lg">Interactive Map Preview</span>
                  <p className="text-sm text-blue-600 mt-2">Click "View Community Map" to access full features</p>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-3xl font-bold text-yellow-500 mb-6">Community Engagement</h3>
          <p className="text-blue-100 max-w-3xl mx-auto mb-8 text-lg leading-relaxed">
            Help us improve our disaster planning by sharing your local knowledge and suggestions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link 
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-950 rounded-full font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              <ClipboardList className="mr-3" size={20} />
              Quick Survey
            </Link>
            <Link 
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-full font-bold hover:bg-white/30 transition-all duration-300 transform hover:scale-105 shadow-xl border border-white/30"
            >
              <Users className="mr-3" size={20} />
              Submit Suggestion
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Planning;