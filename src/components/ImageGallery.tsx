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
    <section className="py-16 bg-blue-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-yellow-500 mb-4">
          Our Activities and Events
        </h2>
        <p className="text-center text-gray-200 max-w-2xl mx-auto mb-8">
          Photos from our disaster preparedness activities and community events
        </p>
        
        {/* Horizontal Scrolling Gallery */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center z-10">
            <button
              onClick={() => scroll('left')}
              className="bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-lg ml-2 transition-all"
            >
              <ChevronLeft className="text-blue-900" size={20} />
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center z-10">
            <button
              onClick={() => scroll('right')}
              className="bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-lg mr-2 transition-all"
            >
              <ChevronRight className="text-blue-900" size={20} />
            </button>
          </div>
          
          <div className="bg-white rounded-lg border-2 border-blue-100 py-4 overflow-hidden">
            <div
              ref={galleryRef}
              className="flex space-x-4 px-4 overflow-x-auto scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-64 h-64 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 relative group"
                >
                  <LazyImage
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full"
                    width={256}
                    height={256}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-end">
                    <div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h4 className="font-semibold text-sm">{image.title}</h4>
                      <p className="text-xs opacity-90">{image.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <Link
            to="/gallery"
            className="inline-flex items-center px-6 py-3 bg-yellow-500 text-blue-950 rounded-lg hover:bg-yellow-400 transition-colors font-medium"
          >
            <Camera className="mr-2" size={16} />
            View Full Gallery
          </Link>
          <Link
            to="/video-gallery"
            className="inline-flex items-center px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-400 transition-colors font-medium ml-4"
          >
            <Play className="mr-2" size={16} />
            Watch Videos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;