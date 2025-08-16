import React from 'react';
import { Shield, Heart, Truck, Home, CheckCircle, Users, Phone, Clock, MapPin, AlertTriangle, Building } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { Link } from 'react-router-dom';

const ServicesPage: React.FC = () => {
  const { services } = useData();
  const activeServices = services.filter(service => service.status === 'active');

  const mainServices = [
    {
      icon: Shield,
      title: 'Risk Assessment',
      description: 'Systematic evaluation of potential hazards, vulnerabilities, and risks to communities, infrastructure, and environment.',
      image: 'https://images.pexels.com/photos/6146970/pexels-photo-6146970.jpeg',
      color: 'bg-yellow-500',
      features: [
        'Hazard identification and mapping',
        'Vulnerability and capacity assessment',
        'Risk profiling and prioritization',
        'Climate change impact analysis'
      ]
    },
    {
      icon: AlertTriangle,
      title: 'Emergency Planning',
      description: 'Development of comprehensive emergency response plans to ensure coordinated and effective action during disasters.',
      image: 'https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg',
      color: 'bg-red-500',
      features: [
        'Contingency planning for all hazards',
        'Evacuation and shelter planning',
        'Resource allocation strategies',
        'Inter-agency coordination protocols'
      ]
    },
    {
      icon: Users,
      title: 'Community Training',
      description: 'Capacity building programs to empower communities with knowledge and skills for disaster preparedness and response.',
      image: 'https://images.pexels.com/photos/6146970/pexels-photo-6146970.jpeg',
      color: 'bg-green-500',
      features: [
        'Disaster preparedness workshops',
        'First aid and CPR training',
        'Search and rescue techniques',
        'Emergency communication skills'
      ]
    },
    {
      icon: Building,
      title: 'Barangay DRRM Planning',
      description: 'Workshops and training for barangay officials to develop localized disaster risk reduction and management plans.',
      image: 'https://images.pexels.com/photos/73833/worm-s-eye-view-us-flag-low-angle-shot-flag-73833.jpeg',
      color: 'bg-purple-500',
      features: [
        'Barangay contingency planning',
        'Local resource inventory systems',
        'Community mobilization strategies',
        'Early warning system implementation'
      ]
    },
    {
      icon: Shield,
      title: 'Early Warning Systems',
      description: 'Advanced monitoring and alert systems to provide timely information about impending disasters to communities.',
      image: 'https://images.pexels.com/photos/6146970/pexels-photo-6146970.jpeg',
      color: 'bg-sky-500',
      features: [
        'Real-time weather monitoring',
        'Sirens and alert mechanisms',
        'Mobile alert notifications',
        'Community-based warning networks'
      ]
    },
    {
      icon: Home,
      title: 'Infrastructure Resilience',
      description: 'Strengthening critical infrastructure to withstand natural disasters and ensure continuity of essential services.',
      image: 'https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg',
      color: 'bg-orange-500',
      features: [
        'Bridge and road reinforcement',
        'Flood control systems',
        'School and hospital fortification',
        'Utility system hardening'
      ]
    }
  ];

  const recoveryPhases = [
    {
      title: 'Immediate Response',
      icon: AlertTriangle,
      color: 'bg-blue-500',
      items: ['Damage assessment', 'Emergency relief distribution', 'Search and rescue operations']
    },
    {
      title: 'Medium-term Recovery',
      icon: Home,
      color: 'bg-green-500',
      items: ['Temporary housing solutions', 'Economic livelihood programs', 'Psychosocial support services']
    },
    {
      title: 'Long-term Rehabilitation',
      icon: Building,
      color: 'bg-purple-500',
      items: ['Permanent housing reconstruction', 'Infrastructure rebuilding', 'Community development projects']
    }
  ];

  const frameworkPhases = [
    { title: 'Prevention', description: 'Avoiding hazards and exposure to risks', color: 'text-yellow-500', bgColor: 'bg-yellow-100' },
    { title: 'Mitigation', description: 'Reducing the severity of disasters', color: 'text-red-500', bgColor: 'bg-red-100' },
    { title: 'Preparedness', description: 'Planning and readiness for emergencies', color: 'text-green-500', bgColor: 'bg-green-100' },
    { title: 'Response & Recovery', description: 'Effective emergency response and rehabilitation', color: 'text-blue-500', bgColor: 'bg-blue-100' }
  ];

  const emergencyContacts = [
    { name: 'MDRRMO Emergency Hotline', number: '911', description: 'Primary emergency response' },
    { name: 'Municipal Hall', number: '(052) 123-4567', description: 'General inquiries' },
    { name: 'Fire Department', number: '(052) 567-8901', description: 'Fire emergencies' },
    { name: 'Police Station', number: '117', description: 'Security and law enforcement' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-blue-950 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Disaster Risk Reduction Services</h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Comprehensive disaster management services to build resilient communities and ensure effective emergency response
            </p>
          </div>
        </div>
      </section>

      {/* Dynamic Services from Admin */}
      {activeServices.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Current Services</h2>
              <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Services currently offered by MDRRMO Pio Duran
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {activeServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-blue-600"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-4 rounded-full">
                      <Shield className="text-blue-600" size={24} />
                    </div>
                    <div className="flex-1">
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
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {mainServices.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-2">
                <div className="h-48 overflow-hidden">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`${service.color} p-3 rounded-lg mr-4`}>
                      <service.icon className="text-white text-xl" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                  </div>
                  <p className="text-gray-700 mb-4">{service.description}</p>
                  <div className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start">
                        <CheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" size={16} />
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recovery & Rehabilitation */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-16">
            <div className="md:flex">
              <div className="md:w-1/3 h-64 md:h-auto">
                <img 
                  src="https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg" 
                  alt="Recovery & Rehabilitation" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-2/3 p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-cyan-500 p-3 rounded-lg mr-4">
                    <Home className="text-white text-xl" size={24} />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">Recovery & Rehabilitation</h3>
                </div>
                <p className="text-gray-700 mb-6 text-lg">
                  Comprehensive post-disaster recovery programs focused on rebuilding communities stronger and more resilient than before.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {recoveryPhases.map((phase, index) => (
                    <div key={index} className="bg-blue-50 p-5 rounded-lg">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                        <phase.icon className="text-blue-500 mr-2" size={20} />
                        {phase.title}
                      </h4>
                      <ul className="space-y-2 text-gray-600">
                        {phase.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* National Framework */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">National Disaster Risk Reduction Framework</h2>
            <p className="text-gray-700 mb-6 max-w-4xl mx-auto text-center">
              Aligned with the National Disaster Risk Reduction and Management Council (NDRRMC) guidelines, our services follow the comprehensive approach to disaster management which includes prevention, mitigation, preparedness, response, and recovery phases.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
              {frameworkPhases.map((phase, index) => (
                <div key={index} className="text-center">
                  <div className={`${phase.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Shield className={`${phase.color} text-2xl`} size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{phase.title}</h3>
                  <p className="text-gray-600 text-sm">{phase.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contacts Section */}
      <section className="py-16 bg-blue-950 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Emergency Contacts</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto mb-6"></div>
            <p className="text-blue-200 max-w-3xl mx-auto">
              Important contact numbers for emergency situations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="bg-blue-800 rounded-lg p-6 text-center hover:bg-blue-700 transition-colors">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="text-blue-950" size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2">{contact.name}</h3>
                <a 
                  href={`tel:${contact.number.replace(/[^\d]/g, '')}`}
                  className="text-2xl font-bold text-yellow-500 hover:text-yellow-400 transition-colors block mb-2"
                >
                  {contact.number}
                </a>
                <p className="text-blue-200 text-sm">{contact.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact Section */}
      <section className="py-16 bg-gradient-to-r from-red-500 to-yellow-500">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Need Emergency Assistance?</h3>
            <p className="text-white mb-6 max-w-2xl mx-auto">
              For immediate assistance during disasters or emergencies, contact the National Emergency Hotline
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <div className="bg-white text-red-500 font-bold py-4 px-8 rounded-lg shadow-lg flex items-center text-xl">
                <Phone className="mr-3" size={24} />
                <span>911 or (02) 8888-8888</span>
              </div>
            </div>
            <p className="text-white mt-4 text-sm">
              For more information, visit{' '}
              <a href="https://ndrrmc.gov.ph/" target="_blank" rel="noopener noreferrer" className="underline font-bold">
                NDRRMC Official Website
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;