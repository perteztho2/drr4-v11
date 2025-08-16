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
    <section className="py-16 bg-blue-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-yellow-500 mb-4">
            Disaster Risk Reduction & Management Planning
          </h2>
          <p className="text-lg text-white max-w-3xl mx-auto">
            Preparedness is key to safeguarding lives, livelihoods, and infrastructure. Our MDRRMO Planning Division develops proactive strategies to minimize risks, improve response mechanisms, and enhance resilience across our community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {planningAreas.map((area, index) => (
            <div
              key={index}
              className={`${area.bgColor} p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 ${area.color}`}
            >
              <div className={`${area.iconColor} text-3xl mb-4`}>
                <area.icon size={32} />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">
                {area.title}
              </h3>
              <p className="text-gray-700 mb-4">
                {area.description}
              </p>
              <button className={`${area.iconColor} font-semibold hover:opacity-80 flex items-center transition-colors`}>
                Read More
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 rounded-xl p-8 shadow-inner mb-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Interactive Hazard Map</h3>
              <p className="text-gray-700 mb-4">
                Explore our real-time hazard mapping system to understand risks in your area.
              </p>
              <Link 
                to="/disaster-planning"
                className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-lg transition duration-300 inline-flex items-center"
              >
                View Community Map
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="md:w-1/2 bg-white p-4 rounded-lg shadow-md">
              <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                  <span className="text-gray-500">Interactive Map Preview</span>
                  <p className="text-xs text-gray-400 mt-1">Click "View Community Map" to access</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-bold text-yellow-500 mb-6">Share Your Input</h3>
          <p className="text-white max-w-2xl mx-auto mb-6">
            Help us improve our disaster planning by sharing your local knowledge and suggestions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/contact"
              className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold py-3 px-6 rounded-lg transition duration-300 inline-flex items-center"
            >
              <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Quick Survey
            </Link>
            <Link 
              to="/contact"
              className="bg-blue-900 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition duration-300 inline-flex items-center"
            >
              <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Submit Suggestion
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Planning;