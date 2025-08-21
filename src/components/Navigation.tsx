import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu, X, Shield, Home, Info, Wrench, Newspaper, FolderOpen, Calendar, Contact,
  Camera, Phone, Search, FileText, ChevronDown, ChevronRight, Play, Bell, Zap,
  AlertTriangle, Cloud, Database, Globe, Heart, Lock, Mail, Monitor,
  Navigation as NavigationIcon, Palette, Radio, Share2, Star, Target,
  PenTool as Tool, Truck, Video, Wifi, Activity, Archive, Award, Bookmark,
  Building, CheckCircle, Clock, Code, Compass, CreditCard, Edit, Eye, Filter,
  Flag, Gift, Grid, HelpCircle, Image, Key, Layers, List, MessageCircle, Mic,
  Move, Package, PieChart, Plus, Power, Printer, RefreshCw as Refresh, Save,
  Send, Server, Sliders, Smartphone, Tag, Terminal, Trash2, TrendingUp,
  Upload, Volume2
} from 'lucide-react';
const [data, setData] = useState<any[]>([]);

  const [openSubmenus, setOpenSubmenus] = useState<Set<string>>(new Set());
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isConnected } = useDatabase();
  const { pages } = usePages();

  React.useEffect(() => {
    fetchNavigationItems();
    
    // Handle scroll effect
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    setOpenSubmenus(prev => {
      const newOpenSubmenus = new Set(prev);
      
      if (newOpenSubmenus.has(itemId)) {
        // If clicking on already open submenu, close it
        newOpenSubmenus.delete(itemId);
      } else {
        // Close all other submenus and open the clicked one
        newOpenSubmenus.clear();
        newOpenSubmenus.add(itemId);
      }
      
      return newOpenSubmenus;
    });
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
    { path: '/', label: 'Home', icon: Home, featured: true },
    { path: '/about', label: 'About', icon: Info },
    { path: '/services-detail', label: 'Services', icon: Wrench, featured: true },
    { path: '/news-portal', label: 'News', icon: Newspaper, featured: true },
    { path: '/resources', label: 'Resources', icon: FolderOpen, featured: true },
    { path: '/disaster-planning', label: 'Planning', icon: Calendar },
    { path: '/gallery', label: 'Gallery', icon: Camera },
    { path: '/video-gallery', label: 'Videos', icon: Play },
    { path: '/contact', label: 'Contact', icon: Phone, featured: true }
  ];

  // Use dynamic navigation items if available, otherwise use default
  const navigationTree = React.useMemo(() => {
    if (dynamicNavItems.length > 0) {
      return buildNavigationTree(dynamicNavItems.map(item => ({
        ...item,
        icon: getIconComponent(item.icon)
      })));
    }
    return publicNavItems.map(item => ({ ...item, children: [], id: item.path }));
  }, [dynamicNavItems]);

  function getIconComponent(iconName: string) {
    const icons: Record<string, any> = {
      Home, Info, Wrench, Newspaper, FolderOpen, Calendar, Camera, Phone, FileText, Shield, Play, Bell, Zap,
      AlertTriangle, Cloud, Database, Globe, Heart, Lock, Mail, Monitor, Navigation, Palette,
      Radio, Search, Share2, Star, Target, Tool, Truck, Video, Wifi, Activity, Archive,
      Award, Bookmark, Building, CheckCircle, Clock, Code, Compass, CreditCard, Edit, Eye,
      Filter, Flag, Gift, Grid, HelpCircle, Image, Key, Layers, Link, List, MessageCircle,
      Mic, Move, Package, PieChart, Plus, Power, Printer, Refresh, Save, Send, Server,
      Sliders, Smartphone, Tag, Terminal, Trash2, TrendingUp, Upload, Volume2
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
    const itemIsActive = isActive(item.path);
    
    if (hasChildren) {
      return (
        <div key={item.id || item.path} className="relative group">
          <button
            onClick={() => toggleSubmenu(item.id)}
            className={`flex items-center justify-between w-full px-1 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:transform hover:scale-105 ${
              itemIsActive
                ? 'bg-gradient-to-r from-yellow-500 to-yellow-500 text-blue-900 shadow-lg'
                : 'text-white/90 hover:bg-white/10 hover:text-white backdrop-blur-sm'
            }`}
          >
            <div className="flex items-center">
              <item.icon size={18} className="mr-3" />
              <span>{item.label}</span>
              {item.featured && (
                <span className="ml-2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
              )}
            </div>
            {isMobile ? (
              isSubmenuOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />
            ) : (
              <ChevronDown size={16} className={`transform transition-transform duration-300 ${isSubmenuOpen ? 'rotate-180' : ''}`} />
            )}
          </button>
          
          {/* Submenu */}
          {isSubmenuOpen && hasChildren && (
            <div className={`${isMobile ? 'ml-4 mt-2 space-y-1' : 'absolute top-full left-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl py-3 z-50 border border-white/20'}`}>
              {item.children.map((child: any) => (
                <Link
                  key={child.id || child.path}
                  to={child.path}
                  onClick={() => {
                    if (isMobile) {
                      setIsOpen(false);
                      setOpenSubmenus(new Set());
                    }
                  }}
                  className={`flex items-center px-2 py-3 text-sm font-medium transition-all duration-300 hover:transform hover:scale-105 ${
                    isMobile ? 'rounded-xl' : 'rounded-xl mx-2'
                  } ${
                    isActive(child.path)
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                      : isMobile 
                        ? 'text-white/90 hover:bg-white/10 hover:text-white'
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  <child.icon size={16} className="mr-3" />
                  <span>{child.label}</span>
                  {child.featured && (
                    <span className="ml-2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                  )}
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
        onClick={() => {
          if (isMobile) {
            setIsOpen(false);
            setOpenSubmenus(new Set());
          }
        }}
        className={`flex items-center px-2 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:transform hover:scale-105 group ${
          itemIsActive
            ? 'bg-gradient-to-r from-yellow-500 to-yellow-500 text-blue-700 shadow-lg'
            : 'text-white/90 hover:bg-white/10 hover:text-white backdrop-blur-sm'
        }`}
      >
        <item.icon size={18} className="mr-3 group-hover:animate-pulse" />
        <span>{item.label}</span>
        {item.featured && (
          <span className="ml-2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
        )}
      </Link>
    );
  }

  return (
    <>
      <nav className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-blue-950 backdrop-blur-xl shadow-2xl border-b-4 border-yellow-500' 
          : 'bg-blue-950 backdrop-blur-sm border-b-4 border-yellow-500'
      }`}>
        <div className="container mx-auto px-2">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <img 
                  src="https://res.cloudinary.com/dedcmctqk/image/upload/v1750079276/logome_h9snnx.webp" 
                  alt="MDRRMO" 
                  className="h-12 w-auto transition-transform duration-300 group-hover:scale-110"
                />
                {!isConnected && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                )}
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-yellow-500 text-xl tracking-wide">MDRRMO</h1>
                <p className="text-yellow-400 text-sm font-medium">PIO DURAN</p>
                {!isConnected && (
                  <p className="text-red-400 text-xs font-medium flex items-center">
                    <span className="w-2 h-2 bg-red-400 rounded-full mr-1 animate-pulse"></span>
                    Offline Mode
                  </p>
                )}
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationTree.map((item) => renderNavigationItem(item, false))}
              
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center px-2 py-3 rounded-xl text-sm font-medium text-yellow-500 hover:bg-white/10 hover:text-yellow-500 transition-all duration-300 hover:transform hover:scale-105 backdrop-blur-sm group"
              >
                <Search size={18} className="mr-1 group-hover:animate-pulse" />
                <span className="hidden xl:inline">Search</span>
              </button>
              
              {/* Emergency Button */}
              <Link
                to="/contact"
                className="flex items-center px-2 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105 group"
              >
                <Contact size={18} className="mr-1 group-hover:animate-bounce" />
                <span className="hidden xl:inline">Contact</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center space-x-3">
              {/* Mobile Emergency Button */}
              <Link
                to="/contact"
                className="flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 font-bold shadow-lg"
              >
                <Contact size={16} />
              </Link>
              
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-yellow-500 hover:text-yellow-400 transition-colors p-2 rounded-xl hover:bg-white/10"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="lg:hidden py-2 border-t border-blue-800/50 backdrop-blur-xl">
              <div className="space-y-1">
                {navigationTree.map((item) => renderNavigationItem(item, true))}
                
                {/* Mobile Search */}
                <button
                  onClick={() => {
                    setIsSearchOpen(true);
                    if (isMobile) {
                      setIsOpen(false);
                      setOpenSubmenus(new Set());
                    }
                  }}
                  className="flex items-center px-2 py-3 rounded-xl text-sm font-medium text-yellow-500 hover:bg-white/10 w-full group"
                >
                  <Search size={18} className="mr-3 group-hover:animate-pulse" />
                  Search Resources
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 opacity-20"></div>
      </nav>
      
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navigation;