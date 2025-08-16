import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface AboutSection {
  id: string;
  title: string;
  content: string;
  image?: string;
  order: number;
  isActive: boolean;
  created_at?: string;
  updated_at?: string;
}

const AboutManagement: React.FC = () => {
  const [aboutSections, setAboutSections] = useState<AboutSection[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    order: 1,
    isActive: true
  });

  // Fetch about sections from Supabase
  React.useEffect(() => {
    fetchAboutSections();
  }, []);

  const fetchAboutSections = async () => {
    try {
      const { data, error } = await supabase
        .from('about_sections')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      
      const transformedData = (data || []).map(section => ({
        id: section.id,
        title: section.title,
        content: section.content,
        image: section.image || '',
        order: section.order_index,
        isActive: section.is_active,
        created_at: section.created_at,
        updated_at: section.updated_at
      }));
      
      setAboutSections(transformedData);
    } catch (error) {
      console.error('Error fetching about sections:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingSection) {
        const { data, error } = await supabase
          .from('about_sections')
          .update({
            title: formData.title,
            content: formData.content,
            image: formData.image || null,
            order_index: formData.order,
            is_active: formData.isActive
          })
          .eq('id', editingSection)
          .select()
          .single();

        if (error) throw error;
        
        setAboutSections(prev => prev.map(section => 
          section.id === editingSection 
            ? { ...section, ...formData }
            : section
        ));
      } else {
        const { data, error } = await supabase
          .from('about_sections')
          .insert([{
            title: formData.title,
            content: formData.content,
            image: formData.image || null,
            order_index: formData.order,
            is_active: formData.isActive
          }])
          .select()
          .single();

        if (error) throw error;
        
        const newSection: AboutSection = {
          id: data.id,
          title: data.title,
          content: data.content,
          image: data.image || '',
          order: data.order_index,
          isActive: data.is_active,
          created_at: data.created_at,
          updated_at: data.updated_at
        };
        setAboutSections(prev => [...prev, newSection]);
      }
      
      alert('About section saved successfully!');
      resetForm();
    } catch (error) {
      console.error('Error saving about section:', error);
      alert('Error saving about section. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      image: '',
      order: 1,
      isActive: true
    });
    setEditingSection(null);
    setIsModalOpen(false);
  };

  const handleEdit = (section: AboutSection) => {
    setFormData({
      title: section.title,
      content: section.content,
      image: section.image || '',
      order: section.order,
      isActive: section.isActive
    });
    setEditingSection(section.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this section?')) {
      try {
        const { error } = await supabase
          .from('about_sections')
          .delete()
          .eq('id', id);

        if (error) throw error;
        
        setAboutSections(prev => prev.filter(section => section.id !== id));
        alert('About section deleted successfully!');
      } catch (error) {
        console.error('Error deleting about section:', error);
        alert('Error deleting about section. Please try again.');
      }
    }
  };

  const toggleActive = async (id: string) => {
    try {
      const section = aboutSections.find(s => s.id === id);
      if (!section) return;
      
      const { error } = await supabase
        .from('about_sections')
        .update({ is_active: !section.isActive })
        .eq('id', id);

      if (error) throw error;
      
      setAboutSections(prev => prev.map(section => 
        section.id === id 
          ? { ...section, isActive: !section.isActive }
          : section
      ));
    } catch (error) {
      console.error('Error toggling section status:', error);
      alert('Error updating section status. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">About Page Management</h1>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading about sections...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">About Page Management</h1>
          <p className="text-gray-600">Manage the content sections for the About page</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Section</span>
        </button>
      </div>

      {/* Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aboutSections
          .sort((a, b) => a.order - b.order)
          .map((section) => (
          <div key={section.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-semibold text-gray-900">{section.title}</h3>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    Order: {section.order}
                  </span>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  section.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {section.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEdit(section)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(section.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {section.content}
            </p>
            
            {section.image && (
              <img
                src={section.image}
                alt={section.title}
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
            )}

            <button
              onClick={() => toggleActive(section.id)}
              className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                section.isActive
                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              {section.isActive ? 'Deactivate' : 'Activate'}
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingSection ? 'Edit Section' : 'Add Section'}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL (Optional)
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="1"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.isActive ? 'active' : 'inactive'}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'active' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Save size={16} />
                  <span>{editingSection ? 'Update' : 'Create'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutManagement;