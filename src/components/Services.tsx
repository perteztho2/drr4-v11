import React from 'react';
import { Shield, Heart, Truck, Home, FolderOpen } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  const { services } = useData();
  const activeServices = services.filter(service => service.status === 'active');

  const defaultServices = [
    {
      icon: Shield,
      title: 'Disaster Prevention & Mitigation',
      description: 'Immediate response to disaster-related emergencies with our trained response teams.',
      tags: ['Search & Rescue', 'Medical Assistance', 'Fire Response'],
      color: 'border-green-500',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      icon: Heart,
      title: 'Disaster Preparedness',
      description: 'Regular training programs for community members, volunteers, and responders.',
      tags: ['First Aid Training', 'DRRM Workshops', 'Drills'],
      color: 'border-blue-500',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      icon: Truck,
      title: 'Disaster Response',
      description: 'Comprehensive hazard, vulnerability, and capacity assessments for communities.',
      tags: ['Flood Mapping', 'Risk Analysis', 'Mitigation Plans'],
      color: 'border-red-500',
      bgColor: 'bg-red-100',
      iconColor: 'text-red-600'
    },
    {
      icon: Home,
      title: 'Disaster Recovery & Rehabilitation',
      description: 'Engagement initiatives to build disaster-resilient communities.',
      tags: ['Barangay DRRM', 'School Programs', 'Volunteer Network'],
      color: 'border-yellow-500',
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    }
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(45deg, transparent 48%, rgba(59, 130, 246, 0.05) 48%, rgba(59, 130, 246, 0.05) 52%, transparent 52%),
                           linear-gradient(-45deg, transparent 48%, rgba(59, 130, 246, 0.05) 48%, rgba(59, 130, 246, 0.05) 52%, transparent 52%)`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-950 mb-6 relative">
            <span className="relative z-10">OUR SERVICES</span>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full"></div>
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Comprehensive disaster risk reduction and management services for the Pio Duran community
          </p>
        </div>

        {/* Dynamic Services from Admin */}
        {activeServices.length > 0 && (
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center text-blue-950 mb-12">Current Services</h3>
            <div className="grid md:grid-cols-2 gap-10 mb-12">
              {activeServices.slice(0, 4).map((service) => (
                <div
                  key={service.id}
                  className="flex bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-200 hover:border-blue-300 group"
                >
                  <div className="mr-5 self-start">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                      <Shield className="text-white" size={28} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-blue-950">
                      {service.title}
                    </h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full border border-blue-200 hover:bg-blue-100 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-10 mb-16">
          {defaultServices.map((service, index) => (
            <div
              key={index}
              className={`flex bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-200 hover:border-blue-300 group`}
            >
              <div className="mr-5 self-start">
                <div className={`bg-gradient-to-br ${service.color.replace('border-', 'from-').replace('-500', '-500')} to-${service.color.replace('border-', '').replace('-500', '-600')} p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="text-white" size={28} />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-blue-950">
                  {service.title}
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full border border-blue-200 hover:bg-blue-100 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link 
            to="/services-detail"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-bold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl mr-4"
          >
            <Shield className="mr-3" size={20} />
            View All Services
          </Link>
          <Link 
            to="/resources"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-950 rounded-full font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            <FolderOpen className="mr-3" size={20} />
            Browse Resources
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;