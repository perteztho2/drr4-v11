import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, Home, Info, Wrench, Newspaper, FolderOpen, Calendar, Camera, Phone } from 'lucide-react';

interface NavigationProps {
  variant?: 'public' | 'admin';
}

const Navigation: React.FC<NavigationProps> = ({ variant = 'public' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const publicNavItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/about', label: 'About', icon: Info },
    { path: '/services-detail', label: 'Services', icon: Wrench },
    { path: '/news-portal', label: 'News', icon: Newspaper },
    { path: '/resources', label: 'Resources', icon: FolderOpen },
    { path: '/disaster-planning', label: 'Planning', icon: Calendar },
    { path: '/gallery', label: 'Gallery', icon: Camera },
    { path: '/contact', label: 'Contact', icon: Phone }
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="bg-blue-950 border-b-4 border-yellow-500 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="https://res.cloudinary.com/dedcmctqk/image/upload/v1750079276/logome_h9snnx.webp" 
              alt="MDRRMO" 
              className="h-10 w-auto"
            />
            <div>
              <h1 className="font-bold text-yellow-500 text-lg">MDRRMO</h1>
              <p className="text-yellow-400 text-xs">PIO DURAN, ALBAY</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {publicNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-yellow-500 text-blue-950'
                    : 'text-yellow-500 hover:bg-blue-800 hover:text-yellow-400'
                }`}
              >
                <item.icon size={16} className="mr-2" />
                {item.label}
              </Link>
            ))}
            <Link
              to="/admin"
              className="ml-4 bg-yellow-500 text-blue-950 px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors text-sm font-medium flex items-center"
            >
              <Shield size={16} className="mr-2" />
              Admin
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-yellow-500 hover:text-yellow-400 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-blue-800">
            <div className="space-y-2">
              {publicNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-yellow-500 text-blue-950'
                      : 'text-yellow-500 hover:bg-blue-800'
                  }`}
                >
                  <item.icon size={16} className="mr-3" />
                  {item.label}
                </Link>
              ))}
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="flex items-center px-4 py-3 bg-yellow-500 text-blue-950 rounded-lg hover:bg-yellow-400 transition-colors text-sm font-medium"
              >
                <Shield size={16} className="mr-3" />
                Admin Panel
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;