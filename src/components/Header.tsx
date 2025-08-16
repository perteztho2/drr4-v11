import React from 'react';
import { Phone, AlertTriangle, Shield } from 'lucide-react';

interface HeaderProps {
  onEmergencyClick: () => void;
  onIncidentClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onEmergencyClick, onIncidentClick }) => {
  return (
    <header className="relative z-40 bg-gradient-to-r from-blue-900/90 to-blue-800/90 backdrop-blur-sm border-b border-blue-700/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Site Name */}
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-500 p-2 rounded-full">
              <Shield className="text-blue-900" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Resilient Pio Duran</h1>
              <p className="text-sm text-blue-200">Disaster Risk Reduction</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onEmergencyClick}
              className="hidden sm:inline-flex items-center px-4 py-2 bg-yellow-500 text-blue-900 font-semibold rounded-lg hover:bg-yellow-400 transition-colors duration-200"
            >
              <Phone className="mr-2" size={16} />
              Emergency
            </button>
            <button
              onClick={onIncidentClick}
              className="hidden sm:inline-flex items-center px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              <AlertTriangle className="mr-2" size={16} />
              Report
            </button>
            
            {/* Mobile Menu Button */}
            <div className="sm:hidden flex space-x-2">
              <button
                onClick={onEmergencyClick}
                className="p-2 bg-yellow-500 text-blue-900 rounded-lg hover:bg-yellow-400 transition-colors duration-200"
              >
                <Phone size={18} />
              </button>
              <button
                onClick={onIncidentClick}
                className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                <AlertTriangle size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;