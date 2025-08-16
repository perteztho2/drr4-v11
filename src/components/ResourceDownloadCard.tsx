import React from 'react';
import { Download, FileText, Eye, Calendar, Tag } from 'lucide-react';
import { usePages } from '../contexts/PagesContext';
import { useAnalytics } from '../utils/analytics';
import type { Resource } from '../types';

interface ResourceDownloadCardProps {
  resource: Resource;
  variant?: 'card' | 'list' | 'compact';
  showStats?: boolean;
}

const ResourceDownloadCard: React.FC<ResourceDownloadCardProps> = ({ 
  resource, 
  variant = 'card',
  showStats = true 
}) => {
  const { incrementDownload } = usePages();
  const { trackDownload } = useAnalytics();

  const handleDownload = async () => {
    try {
      await incrementDownload(resource.id);
      trackDownload(resource.id, resource.title);
      // Open download link
      window.open(resource.file_url, '_blank');
    } catch (error) {
      console.error('Error tracking download:', error);
      // Still allow download even if tracking fails
      window.open(resource.file_url, '_blank');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileTypeIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf': return '📄';
      case 'doc':
      case 'docx': return '📝';
      case 'image': return '🖼️';
      case 'video': return '🎥';
      case 'zip': return '📦';
      default: return '📄';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'guide': return 'bg-blue-100 text-blue-800';
      case 'form': return 'bg-green-100 text-green-800';
      case 'map': return 'bg-red-100 text-red-800';
      case 'report': return 'bg-purple-100 text-purple-800';
      case 'plan': return 'bg-yellow-100 text-yellow-800';
      case 'manual': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (variant === 'list') {
    return (
      <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
            <FileText className="text-white" size={20} />
          </div>
          <div>
            <h4 className="font-bold text-white">{resource.title}</h4>
            <p className="text-gray-300 text-sm">{resource.description}</p>
            {showStats && (
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs text-gray-400">
                  {resource.download_count} downloads
                </span>
                {resource.file_size && (
                  <span className="text-xs text-gray-400">
                    • {formatFileSize(resource.file_size)}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        <button
          onClick={handleDownload}
          className="text-yellow-500 hover:text-yellow-400 transition-colors"
        >
          <Download size={20} />
        </button>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
        <div className="flex items-center">
          <span className="text-lg mr-3">{getFileTypeIcon(resource.file_type)}</span>
          <div>
            <h4 className="font-medium text-gray-900 text-sm">{resource.title}</h4>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <span>{resource.file_type.toUpperCase()}</span>
              {resource.file_size && <span>• {formatFileSize(resource.file_size)}</span>}
              {showStats && <span>• {resource.download_count} downloads</span>}
            </div>
          </div>
        </div>
        <button
          onClick={handleDownload}
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          <Download size={16} />
        </button>
      </div>
    );
  }

  // Default card variant
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-center mb-4">
        <div className={`w-12 h-12 ${getCategoryColor(resource.category).replace('text-', 'bg-').replace('-800', '-100')} rounded-lg flex items-center justify-center mr-4`}>
          <FileText className={getCategoryColor(resource.category).replace('bg-', 'text-').replace('-100', '-600')} size={24} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-800">{resource.title}</h3>
          <div className="flex items-center space-x-2 mt-1">
            <span className={`text-xs px-2 py-1 rounded ${getCategoryColor(resource.category)}`}>
              {resource.category}
            </span>
            {resource.featured && (
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                Featured
              </span>
            )}
          </div>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
      
      {resource.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {resource.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
          {resource.tags.length > 3 && (
            <span className="text-xs text-gray-500">+{resource.tags.length - 3} more</span>
          )}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center">
            <Download size={14} className="mr-1" />
            <span>{resource.download_count}</span>
          </div>
          {resource.file_size && (
            <span>{formatFileSize(resource.file_size)}</span>
          )}
          <span className="uppercase">{resource.file_type}</span>
        </div>
        
        <button
          onClick={handleDownload}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          <Download className="mr-2" size={16} />
          Download
        </button>
      </div>
    </div>
  );
};

export default ResourceDownloadCard;