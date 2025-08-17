import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Facebook, Twitter, Linkedin, Instagram, Check } from 'lucide-react';
import SEOHead from '../../components/SEOHead';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitted(false);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      content: 'Municipal Bldg, DRRM Operation Center\nBarangay Caratagan, Pio Duran, Albay\n4516, Philippines',
      color: 'bg-yellow-500'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '911 / (052) 234-5678',
      color: 'bg-yellow-500'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'mdrrmo@pioduran.gov.ph',
      color: 'bg-yellow-500'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      content: 'Monday - Friday: 8:00 AM - 5:00 PM\nSaturday: Emergency Only\nSunday: Emergency Only',
      color: 'bg-yellow-500'
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/mdrrmo.pioduran', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/mdrrmo_pioduran', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com/company/mdrrmo-pioduran', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com/mdrrmo.pioduran', label: 'Instagram' }
  ];

  return (
    <>
      <SEOHead
        title="Contact MDRRMO Pio Duran"
        description="Get in touch with the Municipal Disaster Risk Reduction and Management Office of Pio Duran, Albay. Emergency hotlines, office hours, and contact information."
        keywords="MDRRMO contact, Pio Duran emergency, disaster management contact, Albay emergency services"
      />
      
      <div className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 min-h-screen pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-white mb-6">Get In Touch</h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-8 border border-white/20">
                <h2 className="text-3xl font-semibold text-white mb-8">Send Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-blue-100 text-sm font-medium mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 focus:transform focus:-translate-y-1"
                        placeholder="Juan"
                      />
                    </div>
                    <div>
                      <label className="block text-blue-100 text-sm font-medium mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 focus:transform focus:-translate-y-1"
                        placeholder="Dela Cruz"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-blue-100 text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 focus:transform focus:-translate-y-1"
                      placeholder="juandelacruz@gmail.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-blue-100 text-sm font-medium mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 focus:transform focus:-translate-y-1"
                      placeholder="How can we help?"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-blue-100 text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none transition-all duration-300 focus:transform focus:-translate-y-1"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 ${
                      isSubmitted 
                        ? 'bg-green-500 hover:bg-green-400 text-white' 
                        : 'bg-yellow-500 hover:bg-yellow-400 text-blue-950'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-950"></div>
                        Sending...
                      </>
                    ) : isSubmitted ? (
                      <>
                        <Check size={20} />
                        Message Sent!
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-8 border border-white/20">
                  <h2 className="text-3xl font-semibold text-white mb-8">Contact Information</h2>
                  
                  <div className="space-y-6">
                    {contactInfo.map((info, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 rounded-lg hover:bg-white/5 cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-1"
                      >
                        <div className={`${info.color} p-3 rounded-lg`}>
                          <info.icon className="w-6 h-6 text-blue-950" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold text-lg mb-1">{info.title}</h3>
                          <p className="text-blue-100 whitespace-pre-line">{info.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social Media */}
                <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-8 border border-white/20">
                  <h3 className="text-2xl font-semibold text-white mb-6">Follow Us</h3>
                  <div className="flex gap-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/10 hover:bg-yellow-500 p-3 rounded-lg transition-all duration-300 group"
                        title={social.label}
                      >
                        <social.icon className="w-6 h-6 text-yellow-500 group-hover:text-blue-950" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Emergency Notice */}
                <div className="backdrop-blur-sm bg-red-500/20 rounded-2xl p-8 border border-red-500/30">
                  <h3 className="text-2xl font-semibold text-white mb-4">Emergency Contact</h3>
                  <p className="text-red-100 mb-4">
                    For immediate emergency assistance, please call our 24/7 hotline:
                  </p>
                  <div className="bg-red-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg flex items-center text-xl justify-center">
                    <Phone className="mr-3" size={24} />
                    <span>911</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;