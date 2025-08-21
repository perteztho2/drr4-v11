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
      
      <div className="bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 min-h-screen pt-20 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-48 h-48 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
          <div className="absolute top-20 right-10 w-48 h-48 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-float stagger-2"></div>
          <div className="absolute bottom-10 left-1/2 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-float stagger-4"></div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto relative z-10">
            {/* Header Section */}
            <div className="text-center mb-20">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500 rounded-full mb-8 animate-pulse-glow">
                <Mail className="text-blue-950" size={40} />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 animate-text-glow">Get In Touch</h1>
              <div className="w-32 h-1.5 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full mb-8"></div>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <div className="glass-modern rounded-3xl p-10 border border-white/30 shadow-modern-xl hover:shadow-modern-2xl transition-all duration-500">
                <h2 className="text-3xl font-bold text-white mb-10 flex items-center">
                  <Send className="mr-4 text-yellow-500" size={32} />
                  Send Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-blue-100 font-medium mb-3">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-4 glass-modern border border-white/30 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 focus:transform focus:-translate-y-1 focus:shadow-lg"
                        placeholder="Juan"
                      />
                    </div>
                    <div>
                      <label className="block text-blue-100 font-medium mb-3">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-4 glass-modern border border-white/30 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 focus:transform focus:-translate-y-1 focus:shadow-lg"
                        placeholder="Dela Cruz"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-blue-100 font-medium mb-3">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-4 glass-modern border border-white/30 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 focus:transform focus:-translate-y-1 focus:shadow-lg"
                      placeholder="juandelacruz@gmail.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-blue-100 font-medium mb-3">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-4 glass-modern border border-white/30 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 focus:transform focus:-translate-y-1 focus:shadow-lg"
                      placeholder="How can we help?"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-blue-100 font-medium mb-3">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-4 glass-modern border border-white/30 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none transition-all duration-300 focus:transform focus:-translate-y-1 focus:shadow-lg"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full font-bold py-5 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-3 text-lg ${
                      isSubmitted 
                        ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white shadow-xl' 
                        : 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-blue-950 shadow-xl'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-950"></div>
                        Sending...
                      </>
                    ) : isSubmitted ? (
                      <>
                        <Check size={24} className="animate-bounce" />
                        Message Sent!
                      </>
                    ) : (
                      <>
                        <Send size={24} className="hover:animate-pulse" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div className="glass-modern rounded-3xl p-10 border border-white/30 shadow-modern-xl">
                  <h2 className="text-3xl font-bold text-white mb-10 flex items-center">
                    <MapPin className="mr-4 text-yellow-500" size={32} />
                    Contact Information
                  </h2>
                  
                  <div className="space-y-8">
                    {contactInfo.map((info, index) => (
                      <div
                        key={index}
                        className={`flex items-start gap-6 p-6 rounded-2xl hover:bg-white/10 cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-lg stagger-${index + 1}`}
                      >
                        <div className={`${info.color} p-4 rounded-2xl shadow-lg hover:scale-110 transition-transform duration-300`}>
                          <info.icon className="w-7 h-7 text-blue-950" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-xl mb-2 hover:text-yellow-300 transition-colors">{info.title}</h3>
                          <p className="text-blue-100 whitespace-pre-line text-lg leading-relaxed">{info.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social Media */}
                <div className="glass-modern rounded-3xl p-10 border border-white/30 shadow-modern-xl">
                  <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                    <Share2 className="mr-4 text-yellow-500" size={28} />
                    Follow Us
                  </h3>
                  <div className="flex gap-6">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`glass-modern hover:bg-yellow-500 p-4 rounded-2xl transition-all duration-300 group hover:scale-110 hover:shadow-xl stagger-${index + 1}`}
                        title={social.label}
                      >
                        <social.icon className="w-7 h-7 text-yellow-500 group-hover:text-blue-950 group-hover:animate-bounce" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Emergency Notice */}
                <div className="glass-modern bg-red-500/20 rounded-3xl p-10 border border-red-500/40 shadow-modern-xl animate-pulse-glow">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                    <AlertTriangle className="mr-4 text-yellow-500 animate-pulse" size={32} />
                    Emergency Contact
                  </h3>
                  <p className="text-red-100 mb-8 text-lg leading-relaxed">
                    For immediate emergency assistance, please call our 24/7 hotline:
                  </p>
                  <div className="bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-6 px-12 rounded-2xl shadow-2xl flex items-center text-3xl justify-center hover:scale-105 transition-transform duration-300 hover:shadow-3xl">
                    <Phone className="mr-4 animate-bounce" size={36} />
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