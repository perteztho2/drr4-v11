import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, Home, Info, Wrench, Newspaper, FolderOpen, Calendar, Camera, Phone, Search, FileText, ChevronDown, ChevronRight, Play } from 'lucide-react';
import { useDatabase } from '../contexts/DatabaseContext';
import { usePages } from '../contexts/PagesContext';
import { supabase } from '../lib/supabase';
import SearchModal from './SearchModal';

interface NavigationProps {
  variant?: 'public' | 'admin';
}

const Navigation: React.FC<NavigationProps> = ({ variant = 'public' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [dynamicNavItems, setDynamicNavItems] = useState<any[]>([]);
  const [openSubmenus, setOpenSubmenus] = useState<Set<string>>(new Set());
  const location = useLocation();
  const { isConnected } = useDatabase();
  const { pages } = usePages();

  React.useEffect(() => {
    fetchNavigationItems();
  }, []);

  const fetchNavigationItems = async () => {
    try {
      const { data, error } = await supabase
        .from('navigation_items')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true });

      if (error && !error.message.includes('relation "navigation_items" does not exist')) {
        throw error;
      }
      
      setDynamicNavItems(data || []);
    } catch (error) {
      console.error('Error fetching navigation items:', error);
    }
  };

  const toggleSubmenu = (itemId: string) => {
    const newOpenSubmenus = new Set(openSubmenus);
    if (newOpenSubmenus.has(itemId)) {
      newOpenSubmenus.delete(itemId);
    } else {
      newOpenSubmenus.add(itemId);
    }
    setOpenSubmenus(newOpenSubmenus);
  };

  const buildNavigationTree = (items: any[]) => {
    const tree: any[] = [];
    const itemMap = new Map();
    
    // Create a map of all items
    items.forEach(item => {
      itemMap.set(item.id, { ...item, children: [] });
    });
    
    // Build the tree structure
    items.forEach(item => {
      if (item.parent_id) {
        const parent = itemMap.get(item.parent_id);
        if (parent) {
          parent.children.push(itemMap.get(item.id));
        }
      } else {
        tree.push(itemMap.get(item.id));
      }
    });
    
    return tree;
  };
  const publicNavItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/about', label: 'About', icon: Info },
    { path: '/services-detail', label: 'Services', icon: Wrench },
    { path: '/news-portal', label: 'News', icon: Newspaper },
    { path: '/resources', label: 'Resources', icon: FolderOpen },
    { path: '/disaster-planning', label: 'Planning', icon: Calendar },
    { path: '/gallery', label: 'Gallery', icon: Camera },
    { path: '/video-gallery', label: 'Videos', icon: Play },
    { path: '/contact', label: 'Contact', icon: Phone }
  ];

  // Use dynamic navigation items if available, otherwise use default
  const navigationTree = dynamicNavItems.length > 0 
    ? buildNavigationTree(dynamicNavItems.map(item => ({
        ...item,
        icon: getIconComponent(item.icon)
      })))
    : publicNavItems.map(item => ({ ...item, children: [] }));

  function getIconComponent(iconName: string) {
    const icons: Record<string, any> = {
      Home, Info, Wrench, Newspaper, FolderOpen, Calendar, Camera, Phone, FileText, Shield, Play
    };
    return icons[iconName] || Home;
  }

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const renderNavigationItem = (item: any, isMobile: boolean = false) => {
    const hasChildren = item.children && item.children.length > 0;
    const isSubmenuOpen = openSubmenus.has(item.id);
    
    if (hasChildren) {
      return (
        <div key={item.id || item.path} className="relative">
          <button
            onClick={() => toggleSubmenu(item.id)}
            className={`flex items-center justify-between w-full px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              isActive(item.path)
                ? 'bg-yellow-500 text-blue-950'
                : 'text-yellow-500 hover:bg-blue-800 hover:text-yellow-400'
            }`}
          >
            <div className="flex items-center">
              <item.icon size={16} className="mr-2" />
              {item.label}
            </div>
            {isMobile ? (
              isSubmenuOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />
            ) : (
              <ChevronDown size={16} className={`transform transition-transform ${isSubmenuOpen ? 'rotate-180' : ''}`} />
            )}
          </button>
          
          {/* Submenu */}
          {isSubmenuOpen && (
            <div className={`${isMobile ? 'ml-4 mt-2 space-y-1' : 'absolute top-full left-0 mt-1 w-48 bg-blue-900 rounded-lg shadow-lg py-2 z-50'}`}>
              {item.children.map((child: any) => (
                <Link
                  key={child.id || child.path}
                  to={child.path}
                  onClick={() => isMobile && setIsOpen(false)}
                  className={`flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    isMobile ? 'rounded-lg' : ''
                  } ${
                    isActive(child.path)
                      ? 'bg-yellow-500 text-blue-950'
                      : 'text-yellow-400 hover:bg-blue-800 hover:text-yellow-300'
                  }`}
                >
                  <child.icon size={14} className="mr-2" />
                  {child.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }
    
    return (
      <Link
        key={item.id || item.path}
        to={item.path}
        onClick={() => isMobile && setIsOpen(false)}
        className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
          isActive(item.path)
            ? 'bg-yellow-500 text-blue-950'
            : 'text-yellow-500 hover:bg-blue-800 hover:text-yellow-400'
        }`}
      >
        <item.icon size={16} className="mr-2" />
        {item.label}
      </Link>
    );
  };
  return (
    <nav className="bg-blue-950 border-b-4 border-yellow-500 sticky top-0 z-50 shadow-lg">
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
              {!isConnected && (
                <p className="text-red-400 text-xs">⚠ Offline Mode</p>
              )}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationTree.map((item) => renderNavigationItem(item, false))}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center px-4 py-2 rounded-lg text-sm font-medium text-yellow-500 hover:bg-blue-800 hover:text-yellow-400 transition-all duration-200"
            >
              <Search size={16} className="mr-2" />
              Search
            </button>
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
              {navigationTree.map((item) => renderNavigationItem(item, true))}
              <button
                onClick={() => {
                  setIsSearchOpen(true);
                  setIsOpen(false);
                }}
                className="flex items-center px-4 py-3 rounded-lg text-sm font-medium text-yellow-500 hover:bg-blue-800 w-full"
              >
                <Search size={16} className="mr-3" />
                Search
              </button>
            </div>
          </div>
        )}
      </div>
      
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </nav>
  );
};

export default Navigation;