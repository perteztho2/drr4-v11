import React, { useState } from 'react';
import { Shield, Calendar, AlertTriangle, Home, CheckCircle, Mountain, Zap, Cloud, Flame, Globe, Thermometer, Waves, Users, Building, Download, FileText, FolderOpen, Search, BarChart3, ArrowRight } from 'lucide-react';
import { usePages } from '../../contexts/PagesContext';
import { Link } from 'react-router-dom';

const DisasterPlanPage: React.FC = () => {
  const [activeAccordion, setActiveAccordion] = useState<string | null>('mitigation');
  const { resources } = usePages();
  
  // Filter planning-related resources
  const planningResources = resources.filter(resource => 
    resource.status === 'published' && 
    (resource.category === 'plan' || resource.tags.some(tag => 
      tag.toLowerCase().includes('plan') || 
      tag.toLowerCase().includes('drrm') ||
      tag.toLowerCase().includes('strategy')
    ))
  );

  const planComponents = [
    {
      icon: Shield,
      title: 'Contingency Plan',
      description: 'A specific plan that outlines the steps to be taken in response to an anticipated disaster, ensuring that resources and personnel are ready for rapid deployment.',
      color: 'bg-red-500',
      textColor: 'text-red-500'
    },
    {
      icon: Zap,
      title: 'Disaster Response Plan',
      description: 'Details immediate actions to be taken during a disaster, including evacuation procedures, communication protocols, and resource allocation.',
      color: 'bg-yellow-500',
      textColor: 'text-yellow-500'
    },
    {
      icon: Home,
      title: 'Disaster Recovery Plan',
      description: 'Focuses on restoring and improving the community\'s infrastructure and services after a disaster has occurred.',
      color: 'bg-green-500',
      textColor: 'text-green-500'
    },
    {
      icon: Globe,
      title: 'Risk Assessment Plan',
      description: 'Involves identifying and analyzing potential hazards and vulnerabilities to inform planning efforts.',
      color: 'bg-purple-500',
      textColor: 'text-purple-500'
    },
    {
      icon: CheckCircle,
      title: 'Emergency Preparedness Plan',
      description: 'Outlines measures to prepare individuals and communities before a disaster strikes, such as training, drills, and education.',
      color: 'bg-blue-500',
      textColor: 'text-blue-500'
    },
    {
      icon: AlertTriangle,
      title: 'Evacuation Plan',
      description: 'Specific routes, shelters, and procedures for safely evacuating people during a disaster.',
      color: 'bg-orange-500',
      textColor: 'text-orange-500'
    }
  ];

  const additionalPlans = [
    {
      id: 'mitigation',
      icon: Mountain,
      title: 'Mitigation Plan',
      description: 'Strategies aimed at reducing the impact of disasters by implementing structural and non-structural measures, such as building codes, land-use planning, and public awareness campaigns.',
      tags: ['Building Codes', 'Land-Use Planning', 'Public Awareness'],
      color: 'text-gray-600'
    },
    {
      id: 'education',
      icon: Shield,
      title: 'Public Awareness and Education Plan',
      description: 'Initiatives aimed at increasing community knowledge about disaster risks and preparedness measures through workshops, campaigns, and educational programs.',
      tags: ['Workshops', 'Campaigns', 'School Programs'],
      color: 'text-green-600'
    },
    {
      id: 'communication',
      icon: Zap,
      title: 'Communication Plan',
      description: 'Establishes clear lines of communication among emergency services, government agencies, and the community during a disaster through multiple channels and protocols.',
      tags: ['Emergency Alerts', 'Media Relations', 'Public Information'],
      color: 'text-purple-600'
    }
  ];

  const keyPrinciples = [
    { icon: CheckCircle, title: 'Prevention and Mitigation', color: 'text-blue-500' },
    { icon: Calendar, title: 'Preparedness and Planning', color: 'text-green-500' },
    { icon: AlertTriangle, title: 'Response and Recovery', color: 'text-red-500' },
    { icon: Users, title: 'Community Engagement', color: 'text-purple-500' }
  ];

  const implementationSteps = [
    { icon: CheckCircle, title: 'Regular Updates', description: 'Plans should be reviewed and updated annually or after significant events to ensure relevance and effectiveness.', color: 'text-blue-600' },
    { icon: Users, title: 'Training & Drills', description: 'Regular training sessions and simulation exercises to test plan effectiveness and improve response capabilities.', color: 'text-green-600' },
    { icon: Shield, title: 'Community Engagement', description: 'Active participation from all community members to enhance resilience and ensure inclusive preparedness.', color: 'text-yellow-600' }
  ];

  const planningSteps = [
    {
      step: 1,
      title: 'Risk Assessment',
      description: 'Identify and analyze potential hazards and vulnerabilities in the community',
      icon: Search,
      color: 'bg-red-500'
    },
    {
      step: 2,
      title: 'Plan Development',
      description: 'Create comprehensive strategies and response protocols',
      icon: FileText,
      color: 'bg-blue-500'
    },
    {
      step: 3,
      title: 'Implementation',
      description: 'Execute plans through training, drills, and community engagement',
      icon: Users,
      color: 'bg-green-500'
    },
    {
      step: 4,
      title: 'Monitoring & Evaluation',
      description: 'Continuously assess and improve planning effectiveness',
      icon: BarChart3,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <section className="bg-blue-950 text-white py-20">
        <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500 rounded-full mb-6">
            <Shield className="text-white text-2xl" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Disaster Risk Reduction & Management Planning
          </h1>
            <div className="w-24 h-1 bg-yellow-500 mx-auto mb-6"></div>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Comprehensive strategies for preparing, responding to, and recovering from disasters to build resilient communities
          </p>
        </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        {/* Introduction Section */}
        <div className="bg-white rounded-xl shadow-xl p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Building Resilient Communities</h2>
              <p className="text-gray-600 mb-4">
                Developing a comprehensive Disaster Risk Reduction and Management (DRRM) plan involves various components and strategies to effectively prepare for, respond to, and recover from disasters. These integrated approaches ensure communities can withstand and quickly recover from emergency situations.
              </p>
              <p className="text-gray-600">
                Each plan should be tailored to the specific needs and characteristics of the community or organization it serves. Regular updates, training, and drills are essential to ensure their effectiveness in real-world scenarios.
              </p>
            </div>
            <div className="flex-1">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-8 text-white">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="text-yellow-300 text-2xl mr-3" size={24} />
                  <h3 className="text-xl font-bold">Key Principles</h3>
                </div>
                <ul className="space-y-3">
                  {keyPrinciples.map((principle, index) => (
                    <li key={index} className="flex items-start">
                      <principle.icon className={`${principle.color} mt-1 mr-3`} size={16} />
                      <span>{principle.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Planning Process Steps */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">DRRM Planning Process</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our systematic approach to developing effective disaster risk reduction and management plans
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {planningSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                  <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <span className="text-white font-bold text-xl">{step.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < planningSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="text-gray-400" size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* DRRM Plans Section */}
        <div className="mb-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Core DRRM Planning Components</h2>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Essential components that form the foundation of effective disaster management
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {planComponents.map((plan, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:transform hover:-translate-y-2">
                <div className={`${plan.color} p-6`}>
                  <div className="flex items-center">
                    <plan.icon className="text-white text-2xl mr-4" size={24} />
                    <h3 className="text-xl font-bold text-white">{plan.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className={`flex items-center ${plan.textColor} font-medium`}>
                    <span>Essential for preparedness</span>
                    <AlertTriangle className="ml-2" size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Available Resources */}
        {planningResources.length > 0 && (
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Planning Resources</h2>
              <div className="w-24 h-1 bg-green-500 mx-auto mb-6"></div>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Download official planning documents and templates
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {planningResources.slice(0, 6).map((resource) => (
                <div key={resource.id} className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <FileText className="text-blue-600" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800">{resource.title}</h3>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {resource.category}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Download size={14} />
                      <span>{resource.download_count} downloads</span>
                    </div>
                    
                    <button
                      onClick={() => window.open(resource.file_url, '_blank')}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                      <Download className="mr-2" size={16} />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                to="/resources"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FolderOpen className="mr-2" size={16} />
                View All Resources
              </Link>
            </div>
          </section>
        )}

        {/* Additional Plans Accordion */}
        <div className="mb-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Additional Strategic Plans</h2>
            <div className="w-24 h-1 bg-purple-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Specialized planning components for comprehensive disaster management
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-4">
            {additionalPlans.map((plan) => (
              <div key={plan.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div 
                  className={`bg-gray-100 p-6 flex justify-between items-center cursor-pointer hover:bg-gray-200 transition-colors ${
                    activeAccordion === plan.id ? 'bg-gray-200' : ''
                  }`}
                  onClick={() => setActiveAccordion(activeAccordion === plan.id ? null : plan.id)}
                >
                  <div className="flex items-center">
                    <plan.icon className={`${plan.color} text-xl mr-4`} size={24} />
                    <h3 className="text-xl font-bold text-gray-800">{plan.title}</h3>
                  </div>
                  <div 
                    className={`text-gray-600 transition-transform duration-300 ${
                      activeAccordion === plan.id ? 'rotate-180' : ''
                    }`} 
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6,9 12,15 18,9"></polyline>
                    </svg>
                  </div>
                </div>
                {activeAccordion === plan.id && (
                  <div className="p-6 bg-white">
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {plan.tags.map((tag, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Implementation Framework */}
        <section className="bg-white rounded-xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Implementation Framework</h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Key elements for successful implementation of disaster risk reduction and management plans
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {implementationSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <step.icon className={`${step.color} text-2xl`} size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Develop Your DRRM Plan?</h2>
            <p className="text-yellow-100 mb-6 max-w-2xl mx-auto">
              Start building comprehensive disaster resilience for your community with our expert guidance and resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/resources"
                className="bg-white text-yellow-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-300 flex items-center justify-center"
              >
                <Shield className="mr-2" size={20} />
                Download Planning Guide
              </Link>
              <Link 
                to="/contact"
                className="bg-blue-900 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-800 transition duration-300 flex items-center justify-center"
              >
                <AlertTriangle className="mr-2" size={20} />
                Contact Experts
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DisasterPlanPage;