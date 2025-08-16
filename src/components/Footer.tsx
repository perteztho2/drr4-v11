import React from 'react';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const emergencyHotlines = [
    { name: 'Office of the Mayor', number: '(052) 123-4567' },
    { name: 'MDRRMO', number: '911 / (052) 234-5678' },
    { name: 'MSWD', number: '1343' },
    { name: 'Medical/MHO', number: '(052) 345-6789' },
    { name: 'PNP', number: '117 / (052) 456-7890' },
    { name: 'BFP', number: '(052) 567-8901' },
    { name: 'PCG', number: '(052) 678-9012' }
  ];

  const quickLinks = [
    { label: 'About Us', path: '/about' },
    { label: 'Programs & Services', path: '/services-detail' },
    { label: 'News & Updates', path: '/news-portal' },
    { label: 'Resources', path: '/resources' },
    { label: 'Contact Us', path: '/contact' }
  ];

  const socialLinks = [
    { icon: Facebook, url: 'https://facebook.com/mdrrmo.pioduran', label: 'Facebook' },
    { icon: Twitter, url: 'https://twitter.com/mdrrmo_pioduran', label: 'Twitter' },
    { icon: Instagram, url: 'https://instagram.com/mdrrmo.pioduran', label: 'Instagram' },
    { icon: Youtube, url: 'https://youtube.com/@mdrrmo-pioduran', label: 'YouTube' }
  ];

  return (
    <footer className="bg-blue-950 text-white border-t-4 border-yellow-500 shadow-lg">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        
          {/* MDRRMO Contact Info */}
          <div className="text-sm">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="https://res.cloudinary.com/dedcmctqk/image/upload/v1750079276/logome_h9snnx.webp" 
                alt="MDRRMO" 
                className="h-10 w-auto"
              />
              <div>
                <h2 className="text-lg font-semibold text-yellow-500">MDRRMO</h2>
                <p className="text-yellow-400 text-xs">Pio Duran, Albay</p>
              </div>
            </div>
            <div className="space-y-3">
              <p className="flex items-center">
                <MapPin className="mr-2 text-yellow-500" size={16} />
                Municipal Hall, Pio Duran, Albay
              </p>
              <p className="flex items-center">
                <Phone className="mr-2 text-yellow-500" size={16} />
                Emergency Hotline: 911
              </p>
              <p className="flex items-center">
                <Mail className="mr-2 text-yellow-500" size={16} />
                mdrrmo@pioduran.gov.ph
              </p>
            </div>
            <p className="mt-4 text-gray-400">
              Committed to safety and resilience in our community.
            </p>
            
            {/* Social Media Links */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold mb-3 text-yellow-500">Follow Us</h3>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center hover:bg-yellow-500 hover:text-blue-950 transition-colors"
                    title={social.label}
                  >
                    <social.icon size={14} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-sm">
            <h2 className="text-lg font-semibold mb-4 text-yellow-500">Quick Links</h2>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="hover:text-yellow-400 transition-colors flex items-center"
                  >
                    <span className="w-1 h-1 bg-yellow-500 rounded-full mr-2"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency Hotline Numbers */}
          <div className="text-sm">
            <h2 className="text-lg font-semibold mb-4 text-yellow-500">Emergency Hotlines</h2>
            <ul className="space-y-2">
              {emergencyHotlines.map((hotline, index) => (
                <li key={index} className="flex flex-col">
                  <span className="text-gray-300 text-xs">{hotline.name}</span>
                  <a 
                    href={`tel:${hotline.number.replace(/[^\d]/g, '')}`} 
                    className="text-yellow-500 hover:text-yellow-400 font-semibold transition-colors"
                  >
                    {hotline.number}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Google Map Embed */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-yellow-500">Find Us</h2>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d627.0440762880165!2d123.455991!3d13.044111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a01dcb8f5dc12d%3A0xf32c415c60d3f10f!2sMunicipal%20Hall%20of%20Pio%20Duran%2C%20Albay!5e0!3m2!1sen!2sph!4v1718610900000"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="MDRRMO Location"
              />
            </div>
            <div className="mt-3 text-xs text-gray-400">
              <p>Municipal Hall, Pio Duran, Albay</p>
              <p>Office Hours: Monday - Friday, 8:00 AM - 5:00 PM</p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-blue-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              &copy; 2025 MDRRMO Pio Duran, Albay. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <Link to="/contact" className="text-gray-400 hover:text-yellow-500 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-yellow-500 transition-colors">
                Terms of Service
              </Link>
              <Link to="/admin" className="text-yellow-500 hover:text-yellow-400 transition-colors">
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;