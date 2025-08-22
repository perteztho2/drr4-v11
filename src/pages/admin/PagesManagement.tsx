import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, Globe, FileText, Layout, Settings, X, Save, Code, Search, Filter, Calendar, BarChart3, Users, Image, Video, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube, Linkedin, Check, AlertCircle, Info, HelpCircle, Star, Heart, Share2, Download, Upload, Copy, Move, RotateCcw, ZoomIn, ZoomOut, Maximize, Minimize, AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline, List, ListOrdered, Link, Image as ImageIcon, Video as VideoIcon, Table, Code as CodeIcon } from 'lucide-react';

const PagesManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
  const [editingPage, setEditingPage] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedPageForSections, setSelectedPageForSections] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterTemplate, setFilterTemplate] = useState('all');
  const [sortBy, setSortBy] = useState('updated_at');
  const [viewMode, setViewMode] = useState('table');

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    meta_description: '',
    meta_keywords: '',
    hero_title: '',
    hero_subtitle: '',
    hero_image: '',
    status: 'draft',
    template: 'default',
    featured: false
  });

  const [pages, setPages] = useState([
    {
      id: '1',
      title: 'Home',
      slug: 'home',
      content: 'Welcome to our barangay website...',
      meta_description: 'Official website of Barangay MDRRMO',
      meta_keywords: 'barangay, mdrrmo, disaster, preparedness',
      hero_title: 'Welcome to Barangay MDRRMO',
      hero_subtitle: 'Your safety is our priority',
      hero_image: 'https://placehold.co/1200x600',
      status: 'published',
      template: 'default',
      featured: true,
      view_count: 1250,
      created_at: '2024-01-15T10:30:00Z',
      updated_at: '2024-01-20T14:45:00Z'
    },
    {
      id: '2',
      title: 'About Us',
      slug: 'about',
      content: 'Learn about our barangay...',
      meta_description: 'About Barangay MDRRMO and our mission',
      meta_keywords: 'about, mission, vision, barangay',
      hero_title: 'About Our Barangay',
      hero_subtitle: 'Serving the community since 1995',
      hero_image: 'https://placehold.co/1200x600',
      status: 'published',
      template: 'about',
      featured: false,
      view_count: 890,
      created_at: '2024-01-10T09:15:00Z',
      updated_at: '2024-01-18T11:20:00Z'
    },
    {
      id: '3',
      title: 'Disaster Preparedness',
      slug: 'disaster-preparedness',
      content: 'Resources for disaster preparedness...',
      meta_description: 'Disaster preparedness resources and guides',
      meta_keywords: 'disaster, preparedness, emergency, safety',
      hero_title: 'Be Prepared, Stay Safe',
      hero_subtitle: 'Download essential preparedness materials',
      hero_image: 'https://placehold.co/1200x600',
      status: 'published',
      template: 'disaster-plan',
      featured: true,
      view_count: 2100,
      created_at: '2024-01-05T16:45:00Z',
      updated_at: '2024-01-22T09:30:00Z'
    },
    {
      id: '4',
      title: 'Services',
      slug: 'services',
      content: 'Our community services...',
      meta_description: 'List of barangay services and programs',
      meta_keywords: 'services, programs, community, barangay',
      hero_title: 'Community Services',
      hero_subtitle: 'Programs and services for residents',
      hero_image: 'https://placehold.co/1200x600',
      status: 'draft',
      template: 'services',
      featured: false,
      view_count: 450,
      created_at: '2024-01-12T13:20:00Z',
      updated_at: '2024-01-19T15:10:00Z'
    }
  ]);

  const templates = [
    { id: 'default', name: 'Default Page', description: 'Standard page layout' },
    { id: 'about', name: 'About Page', description: 'About MDRRMO template' },
    { id: 'services', name: 'Services Page', description: 'Services showcase template' },
    { id: 'news', name: 'News Portal', description: 'News listing and detail template' },
    { id: 'resources', name: 'Resources Page', description: 'Downloads and resources template' },
    { id: 'disaster-plan', name: 'Disaster Planning', description: 'DRRM planning template' }
  ];

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const filteredAndSortedPages = pages
    .filter(page => {
      const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          page.slug.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || page.status === filterStatus;
      const matchesTemplate = filterTemplate === 'all' || page.template === filterTemplate;
      return matchesSearch && matchesStatus && matchesTemplate;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'created_at':
          return new Date(b.created_at) - new Date(a.created_at);
        case 'view_count':
          return b.view_count - a.view_count;
        default:
          return new Date(b.updated_at) - new Date(a.updated_at);
      }
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const pageData = {
      ...formData,
      slug: formData.slug || generateSlug(formData.title),
      id: editingPage || Date.now().toString(),
      created_at: editingPage ? pages.find(p => p.id === editingPage)?.created_at : new Date().toISOString(),
      updated_at: new Date().toISOString(),
      view_count: editingPage ? pages.find(p => p.id === editingPage)?.view_count : 0
    };

    if (editingPage) {
      setPages(pages.map(page => page.id === editingPage ? pageData : page));
    } else {
      setPages([...pages, pageData]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      content: '',
      meta_description: '',
      meta_keywords: '',
      hero_title: '',
      hero_subtitle: '',
      hero_image: '',
      status: 'draft',
      template: 'default',
      featured: false
    });
    setEditingPage(null);
    setIsModalOpen(false);
  };

  const handleEdit = (page) => {
    setFormData({
      title: page.title,
      slug: page.slug,
      content: page.content,
      meta_description: page.meta_description || '',
      meta_keywords: page.meta_keywords || '',
      hero_title: page.hero_title || '',
      hero_subtitle: page.hero_subtitle || '',
      hero_image: page.hero_image || '',
      status: page.status,
      template: page.template,
      featured: page.featured || false
    });
    setEditingPage(page.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this page?')) {
      setPages(pages.filter(page => page.id !== id));
    }
  };

  const handleTitleChange = (title) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title)
    }));
  };

  const handleOpenEditor = (page) => {
    if (page) {
      setFormData({
        title: page.title,
        slug: page.slug,
        content: page.content,
        meta_description: page.meta_description || '',
        meta_keywords: page.meta_keywords || '',
        hero_title: page.hero_title || '',
        hero_subtitle: page.hero_subtitle || '',
        hero_image: page.hero_image || '',
        status: page.status,
        template: page.template,
        featured: page.featured || false
      });
      setEditingPage(page.id);
    }
    setIsEditorOpen(true);
  };

  const handleEditorSave = (content, sections = []) => {
    const pageData = {
      ...formData,
      content,
      slug: formData.slug || generateSlug(formData.title),
      id: editingPage || Date.now().toString(),
      created_at: editingPage ? pages.find(p => p.id === editingPage)?.created_at : new Date().toISOString(),
      updated_at: new Date().toISOString(),
      view_count: editingPage ? pages.find(p => p.id === editingPage)?.view_count : 0
    };

    if (editingPage) {
      setPages(pages.map(page => page.id === editingPage ? pageData : page));
      alert('Page updated successfully!');
    } else {
      setPages([...pages, pageData]);
      alert('Page created successfully!');
    }
    
    setIsEditorOpen(false);
    resetForm();
  };

  const PageEditor = ({ initialContent, onSave, onPreview }) => {
    const [content, setContent] = useState(initialContent);
    const [activeTab, setActiveTab] = useState('visual');
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const editorTools = [
      { icon: Bold, action: 'bold', title: 'Bold' },
      { icon: Italic, action: 'italic', title: 'Italic' },
      { icon: Underline, action: 'underline', title: 'Underline' },
      { icon: AlignLeft, action: 'align-left', title: 'Align Left' },
      { icon: AlignCenter, action: 'align-center', title: 'Align Center' },
      { icon: AlignRight, action: 'align-right', title: 'Align Right' },
      { icon: List, action: 'list', title: 'Bullet List' },
      { icon: ListOrdered, action: 'list-ordered', title: 'Numbered List' },
      { icon: Link, action: 'link', title: 'Insert Link' },
      { icon: ImageIcon, action: 'image', title: 'Insert Image' },
      { icon: VideoIcon, action: 'video', title: 'Insert Video' },
      { icon: Table, action: 'table', title: 'Insert Table' }
    ];

    const insertContent = (type) => {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const selectedText = range.toString();
        let newText = '';

        switch (type) {
          case 'bold':
            newText = `**${selectedText || 'bold text'}**`;
            break;
          case 'italic':
            newText = `*${selectedText || 'italic text'}*`;
            break;
          case 'underline':
            newText = `__${selectedText || 'underlined text'}__`;
            break;
          case 'link':
            newText = `[${selectedText || 'link text'}](https://example.com)`;
            break;
          case 'image':
            newText = `![alt text](https://placehold.co/600x400)`;
            break;
          default:
            newText = selectedText || `${type} content`;
        }

        const newContent = content.substring(0, range.startOffset) + newText + content.substring(range.endOffset);
        setContent(newContent);
      }
    };

    return (
      

        {/* Editor Header */}
        

          

            

              {editorTools.map((tool) => {
                const IconComponent = tool.icon;
                return (
                   insertContent(tool.action)}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    title={tool.title}
                  >
                    
                );
              })}
            

            

             setIsPreviewOpen(true)}
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              
          

          

            
              View Live
            
             onSave(content)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              
          

        


        {/* Editor Content */}