import React from 'react';
import { Calendar, ArrowRight, Newspaper } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { Link } from 'react-router-dom';
import SocialShareButtons from './SocialShareButtons';
import SocialMediaFeed from './SocialMediaFeed';

const News: React.FC = () => {
  const { news } = useData();
  const publishedNews = news.filter(article => article.status === 'published').slice(0, 3);

  return (
    <section className="py-16 bg-blue-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-yellow-500 text-center mb-8">
          News & Updates
        </h2>
        <p className="text-center text-gray-200 max-w-3xl mx-auto mb-12">
          Stay informed with the latest news, announcements, and events from the Municipality of Pio Duran.
        </p>

        {publishedNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {publishedNews.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.pexels.com/photos/6146970/pexels-photo-6146970.jpeg';
                  }}
                />
              )}
              <div className="p-6">
                <div className="flex items-center text-sm text-blue-900 font-semibold mb-2">
                  <Calendar size={16} className="mr-2" />
                  {new Date(item.date || item.created_at).toLocaleDateString()}
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {item.excerpt || 'No excerpt available'}
                </p>
                
                {/* Social Share Buttons */}
                <div className="mb-4 border-t pt-4">
                  <SocialShareButtons
                    url={`${window.location.origin}/news-portal`}
                    title={item.title}
                    description={item.excerpt || item.title}
                    image={item.image}
                    size="sm"
                    showLabels={false}
                    hashtags={['MDRRMO', 'PioDuran', 'News']}
                  />
                </div>
                
                <Link 
                  to="/news-portal"
                  className="text-blue-600 font-semibold hover:text-blue-800 flex items-center transition-colors"
                >
                  Read More
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-12 text-center mb-12">
            <Newspaper className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No News Available</h3>
            <p className="text-gray-600 mb-6">News articles will appear here once published by the admin.</p>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center">
          <Link 
            to="/news-portal"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold rounded-full shadow-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95"
          >
            <Newspaper className="mr-2" size={20} />
            View All News & Updates
          </Link>
        </div>
        
        {/* Social Media Feed Integration */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-yellow-500 mb-4">Stay Connected</h3>
            <p className="text-white max-w-2xl mx-auto">
              Follow our latest updates and community activities on social media
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <SocialMediaFeed maxPosts={3} showEngagement={true} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;