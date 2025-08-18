import React from 'react';
import { FileText, BarChart3, ClipboardList, Search, MoreHorizontal } from 'lucide-react';
import { usePages } from '../contexts/PagesContext';
import { Link } from 'react-router-dom';
import ResourceDownloadCard from './ResourceDownloadCard';

const Resources: React.FC = () => {
  const { resources } = usePages();
  const publishedResources = resources.filter(resource => resource.status === 'published');
  const featuredResources = publishedResources.filter(resource => resource.featured).slice(0, 3);

  const resourceTypes = [
    {
      icon: FileText,
      title: 'Manuals & Guides',
      description: 'Official DRRM procedures and best practices',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: BarChart3,
      title: 'Reports & Data',
      description: 'Incident reports and statistical analysis',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: ClipboardList,
      title: 'Forms & Templates',
      description: 'Ready-to-use templates for your needs',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  const accessSteps = [
    'Click on any folder to view its contents',
    'Click the three-dot menu on a file to download',
    'Some files may require sign-in with your official email'
  ];

  return (
    <section id="resources" className="py-24 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-10 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-950 mb-6 relative">
            <span className="relative z-10">RESOURCES & DOWNLOADS</span>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full"></div>
          </h2>
          <p className="text-xl text-gray-700 mb-4 max-w-4xl mx-auto leading-relaxed">
            Essential disaster preparedness and response materials for the community
          </p>
          <p className="text-sm text-gray-600 max-w-3xl mx-auto italic">
            <strong>Note:</strong> All the information materials here are for public consumption. Request for high-resolution copies for printing and/or reproduction can be requested through the Public Information Unit
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mx-auto border border-gray-200">
          <div className="flex flex-col md:flex-row gap-8">
            
            {/* Left Side - Description */}
            <div className="md:w-1/3">
              <div className="sticky top-8">
                <h3 className="text-2xl font-bold text-blue-950 mb-6">
                  Resources Available
                </h3>
                <div className="space-y-4">
                  {resourceTypes.map((resource, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className={`${resource.bgColor} p-3 rounded-xl`}>
                        <resource.icon className={`h-6 w-6 ${resource.color}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{resource.title}</h4>
                        <p className="text-sm text-gray-600">{resource.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-4">How to Access Files</h4>
                  <ol className="text-sm text-gray-600 space-y-3 list-decimal pl-5">
                    {accessSteps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
                
                <div className="mt-8">
                  <Link
                    to="/resources"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <FileText className="mr-3" size={18} />
                    Browse All Resources
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Right Side - Google Drive Embed */}
            <div className="md:w-2/3">
              {featuredResources.length > 0 ? (
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
                    <h3 className="text-xl font-bold text-white mb-2">Featured Resources</h3>
                    <p className="text-blue-100">Most popular downloads</p>
                  </div>
                  
                  <div className="space-y-4 p-6">
                    {featuredResources.map((resource) => (
                      <ResourceDownloadCard 
                        key={resource.id} 
                        resource={resource} 
                        variant="compact"
                        showStats={true}
                      />
                    ))}
                  </div>
                  
                  <div className="p-6 bg-gray-50 text-center border-t border-gray-200">
                    <Link
                      to="/resources"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                    >
                      View All {publishedResources.length} Resources
                      <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xl">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">Public Resources</h3>
                        <p className="text-blue-100">Download & View Only</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-12 text-center">
                    <FileText className="mx-auto h-20 w-20 text-gray-400 mb-6" />
                    <h4 className="text-xl font-bold text-gray-900 mb-4">No resources available yet</h4>
                    <p className="text-gray-600 mb-6">Resources will appear here once uploaded</p>
                    <Link
                      to="/admin/resources"
                      className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold"
                    >
                      <FileText className="mr-2" size={16} />
                      Add Resources in Admin Panel
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
     
    </section>
  );
};

export default Resources;