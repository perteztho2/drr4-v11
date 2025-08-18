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
    <section className="py-20 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(234, 179, 8, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(234, 179, 8, 0.2) 0%, transparent 50%),
                           radial-gradient(circle at 40% 80%, rgba(234, 179, 8, 0.1) 0%, transparent 50%)`
        }}></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-6 relative">
            <span className="relative z-10">News & Updates</span>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
          </h2>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Stay informed with the latest news, announcements, and events from the Municipality of Pio Duran.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          {/* Main News Content */}
          <div className="lg:col-span-2">
            {publishedNews.length > 0 ? (
              <div className="space-y-8">
                {/* Featured News */}
                {publishedNews[0] && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/20 hover:border-yellow-500/50 transition-all duration-500 group">
                    <div className="relative">
                      {publishedNews[0].image && (
                        <div className="h-80 overflow-hidden">
                          <img
                            src={publishedNews[0].image}
                            alt={publishedNews[0].title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://images.pexels.com/photos/6146970/pexels-photo-6146970.jpeg';
                            }}
                          />
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="bg-yellow-500 text-blue-950 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                          Featured
                        </span>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center text-yellow-400 font-semibold mb-4">
                        <Calendar size={18} className="mr-3" />
                        {new Date(publishedNews[0].date || publishedNews[0].created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                        {publishedNews[0].title}
                      </h3>
                      <p className="text-blue-100 mb-6 text-lg leading-relaxed">
                        {publishedNews[0].excerpt || 'No excerpt available'}
                      </p>
                      
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <SocialShareButtons
                          url={`${window.location.origin}/news-portal`}
                          title={publishedNews[0].title}
                          description={publishedNews[0].excerpt || publishedNews[0].title}
                          image={publishedNews[0].image}
                          size="sm"
                          showLabels={false}
                          hashtags={['MDRRMO', 'PioDuran', 'News']}
                        />
                        
                        <Link 
                          to="/news-portal"
                          className="inline-flex items-center px-6 py-3 bg-yellow-500 text-blue-950 rounded-full font-bold hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                          Read Full Story
                          <ArrowRight size={18} className="ml-2" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {/* Secondary News */}
                {publishedNews.length > 1 && (
                  <div className="grid md:grid-cols-2 gap-6">
                    {publishedNews.slice(1).map((item) => (
                      <div
                        key={item.id}
                        className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-white/20 hover:border-yellow-500/50 transition-all duration-300 transform hover:-translate-y-2 group"
                      >
                        {item.image && (
                          <div className="h-48 overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'https://images.pexels.com/photos/6146970/pexels-photo-6146970.jpeg';
                              }}
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <div className="flex items-center text-yellow-400 font-medium mb-3 text-sm">
                            <Calendar size={14} className="mr-2" />
                            {new Date(item.date || item.created_at).toLocaleDateString()}
                          </div>
                          <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 leading-tight">
                            {item.title}
                          </h3>
                          <p className="text-blue-100 mb-4 line-clamp-2 text-sm">
                            {item.excerpt || 'No excerpt available'}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <SocialShareButtons
                              url={`${window.location.origin}/news-portal`}
                              title={item.title}
                              description={item.excerpt || item.title}
                              image={item.image}
                              size="sm"
                              showLabels={false}
                              hashtags={['MDRRMO', 'PioDuran', 'News']}
                            />
                            
                            <Link 
                              to="/news-portal"
                              className="text-yellow-400 font-semibold hover:text-yellow-300 flex items-center transition-colors text-sm"
                            >
                              Read More
                              <ArrowRight size={14} className="ml-1" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg p-12 text-center border border-white/20">
                <Newspaper className="mx-auto h-20 w-20 text-yellow-400 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">No News Available</h3>
                <p className="text-blue-100 mb-8 text-lg">News articles will appear here once published by the admin.</p>
                <Link 
                  to="/admin/news"
                  className="inline-flex items-center px-6 py-3 bg-yellow-500 text-blue-950 rounded-full font-bold hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105"
                >
                  <Newspaper className="mr-2" size={18} />
                  Manage News
                </Link>
              </div>
            )}
          </div>

          {/* Social Media Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Social Media Feed */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6">
                  <h3 className="text-xl font-bold text-blue-950 mb-2">Stay Connected</h3>
                  <p className="text-blue-900 text-sm">Follow our latest updates</p>
                </div>
                <div className="p-6">
                  <SocialMediaFeed maxPosts={4} showEngagement={true} />
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
                <h3 className="text-lg font-bold text-white mb-4">Quick Access</h3>
                <div className="space-y-3">
                  <Link 
                    to="/resources"
                    className="block p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white hover:text-yellow-400"
                  >
                    📄 Emergency Resources
                  </Link>
                  <Link 
                    to="/disaster-planning"
                    className="block p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white hover:text-yellow-400"
                  >
                    🗺️ Disaster Planning
                  </Link>
                  <Link 
                    to="/gallery"
                    className="block p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white hover:text-yellow-400"
                  >
                    📸 Photo Gallery
                  </Link>
                  <Link 
                    to="/contact"
                    className="block p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-white hover:text-yellow-400"
                  >
                    📞 Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* View All Button */}
        <div className="text-center mt-16">
          <Link 
            to="/news-portal"
            className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-950 font-bold rounded-full shadow-2xl hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 hover:shadow-3xl active:scale-95"
          >
            <Newspaper className="mr-3" size={22} />
            View All News & Updates
          </Link>
        </div>
      </div>
    </section>
  );
};

export default News;