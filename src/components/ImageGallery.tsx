import React, { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Camera, Play } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { Link } from 'react-router-dom';
import LazyImage from './LazyImage';

const ImageGallery: React.FC = () => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const { gallery } = useData();
  const publishedGallery = gallery.filter(item => item.status === 'published');

  // Use gallery images if available, otherwise fallback to default images
  const images = publishedGallery.length > 0 
    ? publishedGallery.map(item => ({ 
        url: item.image || 'https://images.pexels.com/photos/6146970/pexels-photo-6146970.jpeg',
        title: item.title,
        description: item.description
      }))
    : [
        { url: 'https://res.cloudinary.com/dedcmctqk/image/upload/v1750575265/487673077_1062718335885316_7552782387266701410_n_gexfn2.jpg', title: 'BDRRM Training Workshop', description: 'Barangay officials training' },
        { url: 'https://res.cloudinary.com/dedcmctqk/image/upload/v1750575261/489043126_1065374988952984_1331524645056736117_n_fbmvch.jpg', title: 'Earthquake Drill', description: 'Community preparedness exercise' },
        { url: 'https://res.cloudinary.com/dedcmctqk/image/upload/v1750575263/472984055_1002760098547807_5747993743270536498_n_cgi07u.jpg', title: 'Water Rescue Training', description: 'WASAR training session' },
        { url: 'https://images.pexels.com/photos/73833/worm-s-eye-view-us-flag-low-angle-shot-flag-73833.jpeg', title: 'Fire Safety Campaign', description: 'Community fire prevention' },
        { url: 'https://images.pexels.com/photos/6146970/pexels-photo-6146970.jpeg', title: 'Emergency Response', description: 'Community training' },
        { url: 'https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg', title: 'Flood Response', description: 'Emergency simulation' }
      ];

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    let scrollInterval: NodeJS.Timeout;

    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (gallery.scrollLeft >= gallery.scrollWidth - gallery.clientWidth) {
          gallery.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          gallery.scrollBy({ left: 1, behavior: 'smooth' });
        }
      }, 30);
    };

    const stopAutoScroll = () => {
      clearInterval(scrollInterval);
    };

    startAutoScroll();

    gallery.addEventListener('mouseenter', stopAutoScroll);
    gallery.addEventListener('mouseleave', startAutoScroll);

    return () => {
      clearInterval(scrollInterval);
      gallery.removeEventListener('mouseenter', stopAutoScroll);
      gallery.removeEventListener('mouseleave', startAutoScroll);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const scrollAmount = 300;
    gallery.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <section className="py-24 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(234, 179, 8, 0.4) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(234, 179, 8, 0.3) 0%, transparent 50%)`
        }}></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-6 relative">
            <span className="relative z-10">Our Activities & Events</span>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Capturing moments from our disaster preparedness activities and community engagement events
          </p>
        </div>
        
        {/* Horizontal Scrolling Gallery */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center z-10">
            <button
              onClick={() => scroll('left')}
              className="bg-white/90 hover:bg-white p-3 rounded-full shadow-xl ml-4 transition-all duration-300 transform hover:scale-110 backdrop-blur-sm"
            >
              <ChevronLeft className="text-blue-950" size={24} />
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center z-10">
            <button
              onClick={() => scroll('right')}
              className="bg-white/90 hover:bg-white p-3 rounded-full shadow-xl mr-4 transition-all duration-300 transform hover:scale-110 backdrop-blur-sm"
            >
              <ChevronRight className="text-blue-950" size={24} />
            </button>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 py-6 overflow-hidden shadow-2xl">
            <div
              ref={galleryRef}
              className="flex space-x-6 px-6 overflow-x-auto scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-72 h-72 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 relative group border border-white/20"
                >
                  <LazyImage
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full"
                    width={288}
                    height={288}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end">
                    <div className="p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h4 className="font-bold text-lg mb-2">{image.title}</h4>
                      <p className="text-sm opacity-90 leading-relaxed">{image.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="text-center mt-16">
          <Link
            to="/gallery"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-950 rounded-full hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 mr-4"
          >
            <Camera className="mr-3" size={20} />
            View Full Gallery
          </Link>
          <Link
            to="/video-gallery"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full hover:from-red-400 hover:to-red-500 transition-all duration-300 font-bold shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            <Play className="mr-3" size={20} />
            Watch Videos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;