import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDatabase } from "../contexts/DatabaseContext";
import { usePages } from "../contexts/PagesContext";
import { supabase } from "../lib/supabase";
import SearchModal from "./SearchModal";
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
} from "lucide-react";

// -------------------- ICON MAP --------------------
const ICONS: Record<string, any> = {
  Home, Info, Wrench, Newspaper, FolderOpen, Calendar, Camera, Phone, FileText, Shield, Play, Bell, Zap,
  AlertTriangle, Cloud, Database, Globe, Heart, Lock, Mail, Monitor, Navigation: NavigationIcon, Palette,
  Radio, Search, Share2, Star, Target, Tool, Truck, Video, Wifi, Activity, Archive,
  Award, Bookmark, Building, CheckCircle, Clock, Code, Compass, CreditCard, Edit, Eye,
  Filter, Flag, Gift, Grid, HelpCircle, Image, Key, Layers, Link, List, MessageCircle,
  Mic, Move, Package, PieChart, Plus, Power, Printer, Refresh, Save, Send, Server,
  Sliders, Smartphone, Tag, Terminal, Trash2, TrendingUp, Upload, Volume2,
};

const getIcon = (name: string) => ICONS[name] || Home;

// -------------------- HELPERS --------------------
const buildNavigationTree = (items: any[]) => {
  const tree: any[] = [];
  const map = new Map();

  items.forEach(item => map.set(item.id, { ...item, children: [] }));

  items.forEach(item => {
    if (item.parent_id) {
      map.get(item.parent_id)?.children.push(map.get(item.id));
    } else {
      tree.push(map.get(item.id));
    }
  });

  return tree;
};

const isActivePath = (pathname: string, path: string) =>
  path === "/" ? pathname === "/" : pathname.startsWith(path);

// -------------------- DEFAULT NAV ITEMS --------------------
const DEFAULT_NAV = [
  { path: "/", label: "Home", icon: Home, featured: true },
  { path: "/about", label: "About", icon: Info },
  { path: "/services-detail", label: "Services", icon: Wrench, featured: true },
  { path: "/news-portal", label: "News", icon: Newspaper, featured: true },
  { path: "/resources", label: "Resources", icon: FolderOpen, featured: true },
  { path: "/disaster-planning", label: "Planning", icon: Calendar },
  { path: "/gallery", label: "Gallery", icon: Camera },
  { path: "/video-gallery", label: "Videos", icon: Play },
  { path: "/contact", label: "Contact", icon: Phone, featured: true },
];

// -------------------- MAIN COMPONENT --------------------
const Navigation = () => {
  const location = useLocation();
  const { isConnected } = useDatabase();
  const { pages } = usePages();

  const [dynamicNavItems, setDynamicNavItems] = useState<any[]>([]);
  const [openSubmenus, setOpenSubmenus] = useState<Set<string>>(new Set());
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Fetch nav items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data, error } = await supabase
          .from("navigation_items")
          .select("*")
          .eq("is_active", true)
          .order("order_index", { ascending: true });

        if (error && !error.message.includes("does not exist")) throw error;
        setDynamicNavItems(data || []);
      } catch (err) {
        console.error("Nav fetch error:", err);
      }
    };
    fetchItems();

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Build navigation tree
  const navigationTree = useMemo(() => {
    if (dynamicNavItems.length > 0) {
      return buildNavigationTree(
        dynamicNavItems.map(item => ({
          ...item,
          icon: getIcon(item.icon),
        }))
      );
    }
    return DEFAULT_NAV.map(item => ({ ...item, children: [], id: item.path }));
  }, [dynamicNavItems]);

  // Toggle submenu
  const toggleSubmenu = (id: string) => {
    setOpenSubmenus(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : (newSet.clear(), newSet.add(id));
      return newSet;
    });
  };

  // -------------------- RENDER ITEM --------------------
  const renderItem = (item: any, mobile = false) => {
    const active = isActivePath(location.pathname, item.path);
    const hasChildren = item.children?.length > 0;
    const open = openSubmenus.has(item.id);
    const Icon = item.icon;

    const baseClasses =
      "flex items-center px-2 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105";
    const activeClasses = active
      ? "bg-gradient-to-r from-yellow-500 to-yellow-500 text-blue-900 shadow-lg"
      : mobile
      ? "text-white/90 hover:bg-white/10 hover:text-yellow-500"
      : "text-white/90 hover:bg-white/10 hover:text-yellow-500 backdrop-blur-sm";

    if (hasChildren) {
      return (
        <div key={item.id} className="relative group">
          <button
            onClick={() => toggleSubmenu(item.id)}
            onMouseEnter={() => {
              if (!mobile) {
                const timeout = submenuTimeouts.get(item.id);
                if (timeout) {
                  clearTimeout(timeout);
                  submenuTimeouts.delete(item.id);
                }
                setOpenSubmenus(prev => {
                  const newSet = new Set();
                  newSet.add(item.id);
                  return newSet;
                });
              }
            }}
            onMouseLeave={() => {
              if (!mobile) {
                const timeout = setTimeout(() => {
                  setOpenSubmenus(current => {
                    const updated = new Set(current);
                    updated.delete(item.id);
                    return updated;
                  });
                  submenuTimeouts.delete(item.id);
                }, 300);
                setSubmenuTimeouts(prev => new Map(prev).set(item.id, timeout));
              }
            }}
            className={`${baseClasses} justify-between w-full ${activeClasses}`}
          >
            <span className="flex items-center">
              <Icon size={18} className="mr-0" />
              {item.label}
              {item.featured && <span className="ml-2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>}
            </span>
            {mobile ? (
              open ? <ChevronDown size={16} /> : <ChevronRight size={16} />
            ) : (
              <ChevronDown
                size={16}
                className={`transition-transform ${open ? "rotate-180" : ""}`}
              />
            )}
          </button>

          {open && (
            <div
              className={
                mobile
                  ? "ml-4 mt-2 space-y-1"
                  : "absolute top-full left-0 mt-2 text-black w-56 bg-blue-900 backdrop-blur-xl rounded-2xl shadow-2xl py-3 z-50 border border-white"
              }
            >
              {item.children.map((child: any) => renderItem(child, mobile))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={item.id}
        to={item.path}
        onClick={() => mobile && (setIsOpen(false), setOpenSubmenus(new Set()))}
        className={`${baseClasses} ${activeClasses}`}
      >
        <Icon size={18} className="mr-3 group-hover:animate-pulse" />
        {item.label}
        {item.featured && <span className="ml-2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>}
      </Link>
    );
  };

  // -------------------- RENDER --------------------
  return (
    <>
      <nav
        aria-label="Main navigation"
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-blue-950 backdrop-blur-xl shadow-2xl border-b-4 border-yellow-500"
            : "bg-blue-950 backdrop-blur-sm border-b-4 border-yellow-500"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <img
                  src="https://res.cloudinary.com/dedcmctqk/image/upload/v1750079276/logome_h9snnx.webp"
                  alt="MDRRMO Logo"
                  className="h-12 w-auto transition-transform duration-300 group-hover:scale-110"
                />
                {!isConnected && <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />}
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

            {/* Desktop */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationTree.map(item => renderItem(item))}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center px-2 py-3 rounded-xl text-sm font-medium text-yellow-500 hover:bg-white/10 transition-all hover:scale-105 group"
              >
                <Search size={18} className="mr-1 group-hover:animate-pulse" />
                <span className="hidden xl:inline">Search</span>
              </button>
              <Link
                to="/contact"
                className="flex items-center px-2 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 font-bold shadow-lg hover:scale-105"
              >
                <Contact size={18} className="mr-1 group-hover:animate-bounce" />
                <span className="hidden xl:inline">Contact</span>
              </Link>
            </div>

            {/* Mobile */}
            <div className="lg:hidden flex items-center space-x-3">
              <Link to="/contact" className="flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl shadow-lg">
                <Contact size={16} />
              </Link>
              <button onClick={() => setIsOpen(!isOpen)} className="text-yellow-500 p-2 rounded-xl hover:bg-white/10">
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>

          {isOpen && (
            <div className="lg:hidden py-2 border-t border-blue-800/50 backdrop-blur-xl">
              <div className="space-y-1">
                {navigationTree.map(item => renderItem(item, true))}
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="flex items-center px-2 py-3 rounded-xl text-sm font-medium text-yellow-500 hover:bg-white/10 w-full group"
                >
                  <Search size={18} className="mr-3 group-hover:animate-pulse" />
                  Search Resources
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 opacity-20"></div>
      </nav>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navigation;
