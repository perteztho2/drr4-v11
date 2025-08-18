import React, { useState, useEffect } from 'react';
import { Camera, Search, Filter, Calendar, MapPin, Tag, Eye, Grid, List, BookOpen, X, Download, Play } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import LazyImage from '../../components/LazyImage';

interface Album {
  id: string;
  name: string;
  description: string;
  icon: string;
  count: number;
  coverImage: string;
  photos: string[];
}

const Gallery: React.FC = () => {
  const { gallery } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [albums, setAlbums] = useState<Album[]>([]);

  const publishedGallery = gallery.filter(item => item.status === 'published');
  const featuredGallery = publishedGallery.filter(item => item.featured);

  // Create albums from gallery categories
  useEffect(() => {
    const categories = [...new Set(publishedGallery.map(item => item.category).filter(Boolean))];
    const generatedAlbums: Album[] = categories.map((category, index) => {
      const categoryItems = publishedGallery.filter(item => item.category === category);
      return {
        id: category,
        name: category,
        description: `${categoryItems.length} photos from ${category.toLowerCase()} activities`,
        icon: getIconForCategory(category),
        count: categoryItems.length,
        coverImage: categoryItems[0]?.image || 'https://images.pexels.com/photos/6146970/pexels-photo-6146970.jpeg',
        photos: categoryItems.map(item => item.id)
      };
    });
    setAlbums(generatedAlbums);
  }, [publishedGallery]);

  const getIconForCategory = (category: string): string => {
    const categoryLower = category.toLowerCase();
    if (categoryLower.includes('training')) return 'graduation-cap';
    if (categoryLower.includes('drill')) return 'shield';
    if (categoryLower.includes('response')) return 'truck';
    if (categoryLower.includes('meeting')) return 'users';
    if (categoryLower.includes('workshop')) return 'wrench';
    return 'camera';
  };

  const filteredGallery = publishedGallery.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.location && item.location.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesAlbum = selectedAlbum === null || item.category === selectedAlbum;
    
    return matchesSearch && matchesCategory && matchesAlbum;
  });

  const selectAlbum = (albumId: string | null) => {
    setSelectedAlbum(albumId);
    setCategoryFilter(albumId || 'all');
  };

  const openModal = (item: any) => {
    setSelectedImage(item);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const downloadImage = () => {
    if (!selectedImage) return;
    
    const a = document.createElement('a');
    a.href = selectedImage.image;
    a.download = `${selectedImage.title.replace(/\s+/g, '_')}.jpg`;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // If no gallery items available, show placeholder
  if (publishedGallery.length === 0) {
    return (
      <>
        <SEOHead
          title="Photo Gallery - MDRRMO Pio Duran"
          description="Browse photos from MDRRMO activities, training sessions, and community events in Pio Duran, Albay."
        />
        <div className="min-h-screen bg-gray-50 py-20">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-blue-900 mb-8">Photo Gallery</h1>
              <div className="bg-white rounded-xl shadow-lg p-12">
                <Camera className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">No Photos Available</h2>
                <p className="text-gray-600 mb-6">Gallery photos will appear here once uploaded by the admin.</p>
                <Link 
                  to="/admin/gallery"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Camera className="mr-2" size={16} />
                  Go to Admin Panel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead
        title="Photo Gallery - MDRRMO Pio Duran"
        description="Browse photos from MDRRMO activities, training sessions, and community events in Pio Duran, Albay."
        keywords="MDRRMO gallery, Pio Duran photos, disaster management activities, training photos, community events"
      />
      
      <div className="bg-gradient-to-br from-blue-950 to-blue-900 min-h-screen flex">
        {/* Photo Albums Sidebar */}
        <div className="w-80 bg-blue-950 shadow-xl border-r border-yellow-500/20 overflow-y-auto">
          <div className="p-6 border-b border-yellow-500/20">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-yellow-500" />
              <h2 className="text-2xl font-bold text-yellow-500">Through the lens</h2>
            </div>
            <p className="text-yellow-200 text-sm">MDRRMO collections</p>
          </div>
          
          <div className="p-4">
            <div className="space-y-4">
              {/* All Photos Album */}
              <div
                onClick={() => selectAlbum(null)}
                className={`bg-blue-900 rounded-xl p-4 cursor-pointer border transition-all duration-200 hover:transform hover:translate-x-1 ${
                  selectedAlbum === null 
                    ? 'border-yellow-500 bg-yellow-500/10' 
                    : 'border-yellow-500/20 hover:border-yellow-500/40 hover:bg-yellow-500/5'
                }`}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                    <Camera className="w-8 h-8 text-blue-950" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-yellow-500 mb-1">All Photos</h3>
                    <p className="text-sm text-yellow-200">{publishedGallery.length} photos</p>
                  </div>
                </div>
                <p className="text-xs text-yellow-300">Complete collection</p>
              </div>

              {/* Individual Albums */}
              {albums.map((album) => (
                <div
                  key={album.id}
                  onClick={() => selectAlbum(album.id)}
                  className={`bg-blue-900 rounded-xl p-4 cursor-pointer border transition-all duration-200 hover:transform hover:translate-x-1 ${
                    selectedAlbum === album.id 
                      ? 'border-yellow-500 bg-yellow-500/10' 
                      : 'border-yellow-500/20 hover:border-yellow-500/40 hover:bg-yellow-500/5'
                  }`}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden">
                      <img 
                        src={album.coverImage} 
                        alt={album.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-yellow-500 mb-1">{album.name}</h3>
                      <p className="text-sm text-yellow-200">{album.count} photos</p>
                    </div>
                  </div>
                  <p className="text-xs text-yellow-300">{album.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Main Gallery */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-yellow-500 mb-2">
                {selectedAlbum ? albums.find(a => a.id === selectedAlbum)?.name : 'Document Gallery'}
              </h1>
              <p className="text-yellow-200">
                {selectedAlbum 
                  ? albums.find(a => a.id === selectedAlbum)?.description 
                  : 'A curated collection of events and activities'
                }
              </p>
            </div>

            {/* Search and Filter */}
            <div className="mb-8 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-300" size={20} />
                <input
                  type="text"
                  placeholder="Search photos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="all" className="text-gray-900">All Categories</option>
                {[...new Set(publishedGallery.map(item => item.category).filter(Boolean))].map((category) => (
                  <option key={category} value={category} className="text-gray-900">{category}</option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGallery.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => openModal(item)}
                  className="bg-blue-900 rounded-xl shadow-lg overflow-hidden border border-yellow-500/20 cursor-pointer transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl"
                >
                  <div className="aspect-square overflow-hidden">
                    <LazyImage
                      src={item.image || 'https://images.pexels.com/photos/6146970/pexels-photo-6146970.jpeg'}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-yellow-500 mb-1 line-clamp-1">{item.title}</h3>
                    <p className="text-sm text-yellow-200">
                      {item.category} • {item.date ? new Date(item.date).toLocaleDateString() : 'No date'}
                    </p>
                    {item.location && (
                      <p className="text-xs text-yellow-300 mt-1 flex items-center">
                        <MapPin size={12} className="mr-1" />
                        {item.location}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {filteredGallery.length === 0 && (
              <div className="text-center py-12">
                <Camera className="mx-auto h-12 w-12 text-yellow-400 mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No photos found</h3>
                <p className="text-yellow-200">Try adjusting your search or filter criteria</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setCategoryFilter('all');
                    setSelectedAlbum(null);
                  }}
                  className="text-yellow-500 hover:text-yellow-400 font-medium mt-2"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Full Screen Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
          style={{ animation: 'fadeIn 0.3s ease' }}
        >
          <div className="relative max-w-7xl max-h-full">
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-yellow-500 text-2xl font-bold z-10 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
            
            <div className="absolute bottom-4 right-4 flex gap-3">
              <button
                onClick={downloadImage}
                className="bg-yellow-500 hover:bg-yellow-600 text-blue-950 px-6 py-3 rounded-full font-medium shadow-lg flex items-center gap-2 transition-all duration-200 hover:scale-110"
              >
                <Download className="w-5 h-5" />
                Download
              </button>
            </div>
            
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full">
              <span className="font-medium">{selectedImage.title}</span>
            </div>

            {/* Image Details */}
            <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full">
              <div className="flex items-center space-x-2 text-sm">
                <Calendar size={14} />
                <span>{selectedImage.date ? new Date(selectedImage.date).toLocaleDateString() : 'No date'}</span>
                {selectedImage.location && (
                  <>
                    <span>•</span>
                    <MapPin size={14} />
                    <span>{selectedImage.location}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default Gallery;