import React, { useState } from 'react';
import { FileText, Download, Search, BarChart3, ClipboardList, MapPin, Shield, Users, Award, FolderOpen } from 'lucide-react';
import { usePages } from '../../contexts/PagesContext';
import ResourceDownloadCard from '../../components/ResourceDownloadCard';
import { Link } from 'react-router-dom';

const ResourcesPage: React.FC = () => {
  const { resources } = usePages();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const publishedResources = resources.filter(resource => resource.status === 'published');
  const featuredResources = publishedResources.filter(resource => resource.featured);

  const filteredResources = publishedResources.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const resourceCategories = [
    {
      id: 'guides',
      name: 'Preparedness Guides',
      description: 'Essential safety information and planning templates',
      icon: Shield,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      count: publishedResources.filter(r => r.category === 'guide').length
    },
    {
      id: 'plans',
      name: 'Plans & Reports',
      description: 'Official strategic documents and annual reports',
      icon: FileText,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      count: publishedResources.filter(r => r.category === 'plan' || r.category === 'report').length
    },
    {
      id: 'forms',
      name: 'Forms',
      description: 'Downloadable forms for various purposes',
      icon: ClipboardList,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      count: publishedResources.filter(r => r.category === 'form').length
    },
    {
      id: 'maps',
      name: 'Maps',
      description: 'Detailed hazard and evacuation maps',
      icon: MapPin,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      count: publishedResources.filter(r => r.category === 'map').length
    }
  ];

  const categories = ['all', 'guide', 'form', 'map', 'report', 'plan', 'manual'];

  const resourceStats = [
    { value: publishedResources.length.toString(), label: 'Total Resources', description: 'Documents and maps available' },
    { value: publishedResources.reduce((sum, r) => sum + r.download_count, 0).toLocaleString(), label: 'Total Downloads', description: 'Resources downloaded' },
    { value: '95%', label: 'User Satisfaction', description: 'Based on feedback surveys' },
    { value: '24/7', label: 'Access Availability', description: 'Resources available anytime' }
  ];

  // If no resources available, show admin link
  if (publishedResources.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-blue-900 mb-8">Resources & Downloads</h1>
            <div className="bg-white rounded-xl shadow-lg p-12">
              <FolderOpen className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No Resources Available</h2>
              <p className="text-gray-600 mb-6">Resources will appear here once uploaded by the admin.</p>
              <Link 
                to="/admin/resources"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Users className="mr-2" size={16} />
                Go to Admin Panel
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <section className="bg-blue-950 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Resources & Downloads</h1>
            <div className="w-24 h-1 bg-yellow-500 mx-auto mb-6"></div>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Essential documents, forms, and maps to help residents prepare for and respond to various hazards
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6">
        <div className="py-16">
          {/* Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-12">
            <p className="text-sm text-blue-800 text-center">
              <strong>Note:</strong> All information materials here are for public consumption. 
              Request for high-resolution copies for printing and/or reproduction can be requested through the Public Information Unit.
            </p>
          </div>

          {/* Resource Categories */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Resource Categories</h2>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Browse our comprehensive collection of disaster management resources organized by category
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resourceCategories.map((category) => (
              <button 
                key={category.id} 
                onClick={() => setSelectedCategory(category.id === 'guides' ? 'guide' : category.id)}
                className="bg-white rounded-lg p-6 shadow-lg text-center hover:shadow-xl transition-shadow group cursor-pointer w-full"
              >
                <div className={`w-16 h-16 ${category.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <category.icon className={`${category.color} text-2xl`} size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{category.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                <span className={`${category.color} text-sm font-medium`}>{category.count} Documents</span>
              </button>
            ))}
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              
              <div className="text-sm text-gray-600 flex items-center">
                {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''} found
              </div>
            </div>
          </div>
        </div>

          {/* Featured Resources */}
          {featuredResources.length > 0 && (
            <div className="mb-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Resources</h2>
              <div className="w-24 h-1 bg-yellow-500 mx-auto mb-6"></div>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Most important and frequently accessed resources
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredResources.map((resource) => (
                <ResourceDownloadCard key={resource.id} resource={resource} />
              ))}
            </div>
            </div>
          )}

          {/* All Resources */}
          <div className="mb-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">All Resources ({filteredResources.length})</h2>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              {selectedCategory === 'all' 
                ? 'Browse all available resources and documents'
                : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} resources`
              }
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource) => (
              <ResourceDownloadCard key={resource.id} resource={resource} />
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
          </div>

          {/* Resource Statistics */}
          <div className="mb-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Resource Statistics</h2>
            <div className="w-24 h-1 bg-red-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Overview of our resource collection and usage metrics
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {resourceStats.map((stat, index) => (
              <div key={index} className="text-center bg-white rounded-lg p-8 shadow-lg">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">{stat.value}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{stat.label}</h3>
                <p className="text-gray-600">{stat.description}</p>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
 );
};

export default ResourcesPage;