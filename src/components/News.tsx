import React from 'react';
import { Calendar, ArrowRight, Newspaper, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const News = () => {
  // Mock data for news articles
  const news = [
    {
      id: 1,
      title: "Community Disaster Preparedness Training Conducted",
      excerpt: "Local residents participated in comprehensive disaster preparedness training organized by MDRRMO.",
      image: "https://images.pexels.com/photos/6146970/pexels-photo-6146970.jpeg",
      date: "2024-01-15",
      created_at: "2024-01-15"
    },
    {
      id: 2,
      title: "New Evacuation Center Inaugurated",
      excerpt: "The municipality inaugurates a new multi-purpose evacuation center to accommodate more residents.",
      image: "https://images.pexels.com/photos/6146970/pexels-photo-6146970.jpeg",
      date: "2024-01-12",
      created_at: "2024-01-12"
    },
    {
      id: 3,
      title: "Flood Control Measures Enhanced",
      excerpt: "Infrastructure improvements to strengthen flood control systems across vulnerable areas.",
      image: "https://images.pexels.com/photos/6146970/pexels-photo-6146970.jpeg",
      date: "2024-01-10",
      created_at: "2024-01-10"
    },
    {
      id: 4,
      title: "Earthquake Drill Successfully Completed",
      excerpt: "Annual earthquake drill conducted with participation from all barangays.",
      image: "https://images.pexels.com/photos/6146970/pexels-photo-6146970.jpeg",
      date: "2024-01-08",
      created_at: "2024-01-08"
    }
  ];

  const SocialShareButtons = ({ url, title }) => (
    <div className="flex space-x-2">
      <button className="p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
        <Share2 size={14} className="text-white" />
      </button>
      <button className="p-2 bg-blue-800 rounded-full hover:bg-blue-900 transition-colors">
        <Share2 size={14} className="text-white" />
      </button>
    </div>
  );

  const SocialMediaFeed = () => (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
            <div>
              <div className="text-white text-sm font-medium">MDRRMO Pio Duran</div>
              <div className="text-gray-400 text-xs">2h ago</div>
            </div>
          </div>
          <p className="text-gray-300 text-sm mb-2">Latest update from our community preparedness program...</p>
          <div className="flex space-x-4 text-xs text-gray-400">
            <span>❤️ 24</span>
            <span>💬 5</span>
            <span>↗️ 12</span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="py-8 md:py-12 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-400 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-400 rounded-full blur-2xl"></div>
      </div>
      
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-xl md:text-3xl font-bold text-yellow-500 mb-2 relative inline-block">
            <span className="relative z-10">News & Updates</span>
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-yellow-400 rounded-full"></div>
          </h2>
          <p className="text-xs md:text-sm text-blue-100 max-w-2xl mx-auto px-2">
            Stay informed with the latest news and announcements
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 md:gap-6 mb-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {news.length > 0 ? (
              <div className="space-y-4 md:space-y-6">
                {/* Featured News */}
                {news[0] && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-white/20 hover:border-yellow-500/50 transition-all duration-300">
                    <div className="relative">
                      {news[0].image && (
                        <div className="h-32 md:h-48 overflow-hidden">
                          <img
                            src={news[0].image}
                            alt={news[0].title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className="absolute top-2 left-2">
                        <span className="bg-yellow-500 text-blue-950 px-2 py-1 rounded-full text-xs font-bold">
                          Featured
                        </span>
                      </div>
                    </div>
                    <div className="p-3 md:p-5">
                      <div className="flex items-center text-yellow-400 text-xs mb-2">
                        <Calendar size={12} className="mr-1" />
                        {new Date(news[0].date || news[0].created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                      <h3 className="text-sm md:text-lg font-bold text-white mb-2 leading-tight">
                        {news[0].title}
                      </h3>
                      <p className="text-xs md:text-sm text-blue-100 mb-3 leading-relaxed">
                        {news[0].excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <SocialShareButtons
                          url={`${window.location.origin}/news-portal`}
                          title={news[0].title}
                        />
                        
                        <Link 
                          to="/news-portal"
                          className="inline-flex items-center px-3 py-1.5 bg-yellow-500 text-blue-950 rounded-full text-xs font-bold hover:bg-yellow-400 transition-colors"
                        >
                          Read Story
                          <ArrowRight size={12} className="ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {/* Secondary News */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {news.slice(1, 5).map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="bg-white/10 backdrop-blur-sm rounded-lg shadow-md overflow-hidden border border-white/20 hover:border-yellow-500/50 transition-all duration-300"
                    >
                      {item.image ? (
                        <div className="h-24 overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ) : (
                        <div className="h-24 bg-slate-800 flex items-center justify-center text-blue-300 text-xs">
                          No Image
                        </div>
                      )}
                      <div className="p-3">
                        <div className="flex items-center text-yellow-400 text-xs mb-1">
                          <Calendar size={10} className="mr-1" />
                          {new Date(item.date || item.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                        <h3 className="text-xs font-bold text-white mb-1 line-clamp-2 leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-blue-100 text-xs line-clamp-2 mb-2">
                          {item.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <SocialShareButtons
                            url={`${window.location.origin}/news-portal`}
                            title={item.title}
                          />
                          
                          <Link 
                            to="/news-portal"
                            className="text-yellow-400 font-medium hover:text-yellow-300 text-xs flex items-center"
                          >
                            More
                            <ArrowRight size={10} className="ml-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-6 text-center border border-white/20">
                <Newspaper className="mx-auto h-10 w-10 text-yellow-400 mb-3" />
                <h3 className="text-base font-bold text-white mb-2">No News Available</h3>
                <p className="text-xs text-blue-100 mb-4">News will appear here once published.</p>
                <Link 
                  to="/admin/news"
                  className="inline-flex items-center px-3 py-2 bg-yellow-500 text-blue-950 rounded-full text-xs font-bold hover:bg-yellow-400 transition-colors"
                >
                  <Newspaper size={12} className="mr-1" />
                  Manage News
                </Link>
              </div>
            )}
          </div>

          {/* Social Media Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 overflow-hidden">
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-3">
                  <h3 className="text-sm font-bold text-blue-950">Stay Connected</h3>
                  <p className="text-blue-900 text-xs">Latest updates</p>
                </div>
                <div className="p-2">
                  <SocialMediaFeed />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link 
            to="/news-portal"
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-950 font-bold rounded-full shadow-lg hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 text-xs"
          >
            <Newspaper size={14} className="mr-1" />
            View All News
          </Link>
        </div>
      </div>
    </section>
  );
};

export default News;