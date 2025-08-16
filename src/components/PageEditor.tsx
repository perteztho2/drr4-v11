import React, { useState, useRef } from 'react';
import { Save, Eye, Code, Type, Image, Layout, Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

interface PageSection {
  id: string;
  type: 'text' | 'image' | 'heading' | 'list' | 'quote' | 'code';
  content: string;
  styles?: Record<string, string>;
  order: number;
}

interface PageEditorProps {
  initialContent?: string;
  onSave: (content: string, sections: PageSection[]) => void;
  onPreview?: () => void;
}

const PageEditor: React.FC<PageEditorProps> = ({ initialContent = '', onSave, onPreview }) => {
  const [sections, setSections] = useState<PageSection[]>([
    {
      id: '1',
      type: 'heading',
      content: 'Page Title',
      order: 1
    },
    {
      id: '2',
      type: 'text',
      content: 'Start writing your content here...',
      order: 2
    }
  ]);
  const [activeSection, setActiveSection] = useState<string>('1');
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');
  const editorRef = useRef<HTMLTextAreaElement>(null);

  const sectionTypes = [
    { type: 'heading', label: 'Heading', icon: Type },
    { type: 'text', label: 'Text', icon: Type },
    { type: 'image', label: 'Image', icon: Image },
    { type: 'list', label: 'List', icon: Layout },
    { type: 'quote', label: 'Quote', icon: Code },
    { type: 'code', label: 'Code', icon: Code }
  ];

  const addSection = (type: PageSection['type']) => {
    const newSection: PageSection = {
      id: Date.now().toString(),
      type,
      content: getDefaultContent(type),
      order: sections.length + 1
    };
    setSections(prev => [...prev, newSection]);
    setActiveSection(newSection.id);
  };

  const getDefaultContent = (type: PageSection['type']): string => {
    switch (type) {
      case 'heading': return 'New Heading';
      case 'text': return 'Enter your text content here...';
      case 'image': return 'https://images.pexels.com/photos/6146970/pexels-photo-6146970.jpeg';
      case 'list': return '• List item 1\n• List item 2\n• List item 3';
      case 'quote': return 'This is a quote or callout text.';
      case 'code': return '// Code example\nfunction example() {\n  return "Hello World";\n}';
      default: return '';
    }
  };

  const updateSection = (id: string, content: string) => {
    setSections(prev => prev.map(section => 
      section.id === id ? { ...section, content } : section
    ));
  };

  const deleteSection = (id: string) => {
    if (sections.length <= 1) {
      alert('Cannot delete the last section');
      return;
    }
    setSections(prev => prev.filter(section => section.id !== id));
    if (activeSection === id) {
      setActiveSection(sections[0]?.id || '');
    }
  };

  const moveSection = (id: string, direction: 'up' | 'down') => {
    const currentIndex = sections.findIndex(s => s.id === id);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= sections.length) return;

    const newSections = [...sections];
    [newSections[currentIndex], newSections[newIndex]] = [newSections[newIndex], newSections[currentIndex]];
    
    // Update order values
    newSections.forEach((section, index) => {
      section.order = index + 1;
    });
    
    setSections(newSections);
  };

  const generateHtml = (): string => {
    return sections
      .sort((a, b) => a.order - b.order)
      .map(section => {
        switch (section.type) {
          case 'heading':
            return `<h2 class="text-2xl font-bold text-gray-900 mb-4">${section.content}</h2>`;
          case 'text':
            return `<p class="text-gray-700 mb-4">${section.content.replace(/\n/g, '<br>')}</p>`;
          case 'image':
            return `<img src="${section.content}" alt="Content image" class="w-full h-64 object-cover rounded-lg mb-4">`;
          case 'list':
            const listItems = section.content.split('\n').filter(item => item.trim());
            return `<ul class="list-disc list-inside text-gray-700 mb-4">${listItems.map(item => `<li>${item.replace(/^[•\-\*]\s*/, '')}</li>`).join('')}</ul>`;
          case 'quote':
            return `<blockquote class="border-l-4 border-blue-500 pl-4 italic text-gray-700 mb-4">${section.content}</blockquote>`;
          case 'code':
            return `<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4"><code>${section.content}</code></pre>`;
          default:
            return `<div class="mb-4">${section.content}</div>`;
        }
      })
      .join('\n');
  };

  const handleSave = () => {
    const htmlContent = generateHtml();
    onSave(htmlContent, sections);
  };

  const renderSectionPreview = (section: PageSection) => {
    switch (section.type) {
      case 'heading':
        return <h2 className="text-2xl font-bold text-gray-900">{section.content}</h2>;
      case 'text':
        return <p className="text-gray-700">{section.content}</p>;
      case 'image':
        return <img src={section.content} alt="Content" className="w-full h-32 object-cover rounded" />;
      case 'list':
        const items = section.content.split('\n').filter(item => item.trim());
        return (
          <ul className="list-disc list-inside text-gray-700">
            {items.map((item, index) => (
              <li key={index}>{item.replace(/^[•\-\*]\s*/, '')}</li>
            ))}
          </ul>
        );
      case 'quote':
        return <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700">{section.content}</blockquote>;
      case 'code':
        return <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto"><code>{section.content}</code></pre>;
      default:
        return <div>{section.content}</div>;
    }
  };

  const activeSecData = sections.find(s => s.id === activeSection);

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('edit')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'edit' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Code size={16} className="mr-2 inline" />
            Edit
          </button>
          <button
            onClick={() => setViewMode('preview')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'preview' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Eye size={16} className="mr-2 inline" />
            Preview
          </button>
        </div>

        <div className="flex items-center space-x-2">
          {onPreview && (
            <button
              onClick={onPreview}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
            >
              <Eye size={16} />
              <span>Preview Page</span>
            </button>
          )}
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Save size={16} />
            <span>Save</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Sections Panel */}
        <div className="w-64 bg-gray-50 border-r border-gray-200 overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-medium text-gray-900 mb-3">Page Sections</h3>
            <div className="grid grid-cols-2 gap-2">
              {sectionTypes.map((type) => (
                <button
                  key={type.type}
                  onClick={() => addSection(type.type)}
                  className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-xs flex items-center justify-center"
                  title={`Add ${type.label}`}
                >
                  <type.icon size={14} className="mr-1" />
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4">
            {sections
              .sort((a, b) => a.order - b.order)
              .map((section, index) => (
              <div
                key={section.id}
                className={`p-3 mb-2 rounded-lg cursor-pointer transition-colors ${
                  activeSection === section.id ? 'bg-blue-100 border-blue-300' : 'bg-white border-gray-200'
                } border`}
                onClick={() => setActiveSection(section.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium capitalize">{section.type}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        moveSection(section.id, 'up');
                      }}
                      disabled={index === 0}
                      className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
                    >
                      <ArrowUp size={12} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        moveSection(section.id, 'down');
                      }}
                      disabled={index === sections.length - 1}
                      className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
                    >
                      <ArrowDown size={12} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSection(section.id);
                      }}
                      className="text-red-400 hover:text-red-600"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-1 truncate">
                  {section.content.substring(0, 30)}...
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Editor/Preview Panel */}
        <div className="flex-1 flex flex-col">
          {viewMode === 'edit' ? (
            <div className="flex-1 p-6">
              {activeSecData && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900 capitalize">
                      Edit {activeSecData.type} Section
                    </h3>
                    <span className="text-sm text-gray-500">Order: {activeSecData.order}</span>
                  </div>
                  
                  {activeSecData.type === 'image' ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image URL
                      </label>
                      <input
                        type="url"
                        value={activeSecData.content}
                        onChange={(e) => updateSection(activeSecData.id, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://example.com/image.jpg"
                      />
                      {activeSecData.content && (
                        <img
                          src={activeSecData.content}
                          alt="Preview"
                          className="mt-4 w-full h-64 object-cover rounded-lg"
                        />
                      )}
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Content
                      </label>
                      <textarea
                        ref={editorRef}
                        value={activeSecData.content}
                        onChange={(e) => updateSection(activeSecData.id, e.target.value)}
                        className="w-full h-96 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                        placeholder={`Enter ${activeSecData.type} content...`}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 p-6 bg-white overflow-y-auto">
              <div className="max-w-4xl mx-auto prose prose-lg">
                {sections
                  .sort((a, b) => a.order - b.order)
                  .map((section) => (
                  <div key={section.id} className="mb-6">
                    {renderSectionPreview(section)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageEditor;