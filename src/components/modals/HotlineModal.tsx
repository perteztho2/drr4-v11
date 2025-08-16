import React from 'react';
import { X, Phone, Users, Heart, Stethoscope, Shield, Flame, Anchor } from 'lucide-react';

interface HotlineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HotlineModal: React.FC<HotlineModalProps> = ({ isOpen, onClose }) => {
  const hotlines = [
    {
      icon: Users,
      name: 'Office of the Mayor',
      number: '(052) 123-4567',
      color: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      icon: Shield,
      name: 'MDRRMO',
      number: '911 / (052) 234-5678',
      color: 'bg-red-50',
      iconColor: 'text-red-600'
    },
    {
      icon: Heart,
      name: 'MSWD',
      number: '1343',
      color: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      icon: Stethoscope,
      name: 'Medical/MHO',
      number: '(052) 345-6789',
      color: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      icon: Shield,
      name: 'PNP',
      number: '117 / (052) 456-7890',
      color: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      icon: Flame,
      name: 'BFP',
      number: '(052) 567-8901',
      color: 'bg-orange-50',
      iconColor: 'text-orange-600'
    },
    {
      icon: Anchor,
      name: 'PCG',
      number: '(052) 678-9012',
      color: 'bg-blue-50',
      iconColor: 'text-blue-600'
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center transition-all duration-300 px-4 pt-20">
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-lg w-full animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl transition-colors"
        >
          <X size={24} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Phone className="text-blue-600" size={24} />
          </div>
          <h3 className="text-2xl font-bold text-blue-950">Emergency Hotlines</h3>
        </div>

        {/* Hotline List */}
        <div className="space-y-3 text-gray-800 text-sm">
          {hotlines.map((hotline, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${hotline.color} rounded-lg p-3 hover:shadow-md transition duration-300`}
            >
              <hotline.icon className={`${hotline.iconColor} w-6 h-6 mt-1`} />
              <div className="flex-1">
                <p className="font-semibold">{hotline.name}:</p>
                <div className="flex flex-wrap gap-2">
                  {hotline.number.split(' / ').map((num, numIndex) => (
                    <a
                      key={numIndex}
                      href={`tel:${num.replace(/[^\d]/g, '')}`}
                      className="text-yellow-600 hover:text-yellow-700 hover:underline font-medium transition-colors"
                    >
                      {num}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
          <p className="text-sm text-gray-700">
            <strong>Note:</strong> For life-threatening emergencies, call <strong>911</strong> immediately.
            Keep these numbers handy for quick access during emergencies.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HotlineModal;