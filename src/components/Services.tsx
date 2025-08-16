import React from 'react';
import { Shield, Heart, Truck, Home, FolderOpen } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  const { services } = useData();
  const activeServices = services.filter(service => service.status === 'active');

  const defaultServices = [
   
  ];

  return (
    <section id="services" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-blue-900 mb-4 relative inline-block">
            <span className="relative z-10 px-4">OUR SERVICES</span>
            <span className="absolute bottom-0 left-0 right-0 h-2 bg-yellow-400 z-0"></span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            <strong>Comprehensive disaster risk reduction and management services for the Duran community</strong>
          </p>
        </div>

        {/* Dynamic Services from Admin */}
        {activeServices.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-center text-blue-900 mb-8">Current Services</h3>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {activeServices.slice(0, 4).map((service) => (
                <div
                  key={service.id}
                  className="flex bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-blue-600"
                >
                  <div className="mr-5 self-start">
                    <div className="bg-blue-100 p-4 rounded-full">
                      <Shield className="text-blue-600" size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-blue-900">
                      {service.title}
                    </h3>
                    <p className="text-gray-700 mb-4">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
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

        <div className="grid md:grid-cols-2 gap-8">
          {defaultServices.map((service, index) => (
            <div
              key={index}
              className={`flex bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 ${service.color}`}
            >
              <div className="mr-5 self-start">
                <div className={`${service.bgColor} p-4 rounded-full`}>
                  <service.icon className={`${service.iconColor} text-2xl`} size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-blue-900">
                  {service.title}
                </h3>
                <p className="text-gray-700 mb-4">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className={`${service.bgColor.replace('bg-', 'bg-').replace('-100', '-200')} text-blue-800 text-xs px-3 py-1 rounded-full`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link 
            to="/services-detail"
            className="inline-flex items-center px-6 py-3 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-600 transition duration-300 font-medium"
          >
            <Shield className="mr-2" size={20} />
            View All Services
          </Link>
          <Link 
            to="/resources"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 font-medium ml-4"
          >
            <FolderOpen className="mr-2" size={20} />
            Download Complete Services Brochure (PDF)
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;