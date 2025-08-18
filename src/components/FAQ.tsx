import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQ: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const faqs = [
    {
      question: 'What is the MDRRMO?',
      answer: 'The Municipal Disaster Risk Reduction and Management Office (MDRRMO) leads disaster preparedness, mitigation, response, and recovery within the municipality.'
    },
    {
      question: 'How do I report an emergency?',
      answer: 'You can use the report form on this website, call our emergency hotline 911, or contact us at (052) 234-5678 for life-threatening emergencies.'
    },
    {
      question: 'Can I volunteer with the MDRRMO?',
      answer: 'Yes, we welcome community volunteers! Please visit our office at the Municipal Hall or contact us through our website to register and join training programs.'
    },
    {
      question: 'Where are the evacuation centers?',
      answer: 'Evacuation centers are listed in our resources section and posted at each barangay hall. You can also download our evacuation routes map from the resources page.'
    },
    {
      question: 'How can I access disaster preparedness resources?',
      answer: 'All our resources including guides, forms, and maps are available for free download in our Resources section. No registration required for public documents.'
    },
    {
      question: 'What should I include in my emergency kit?',
      answer: 'Download our Emergency Kit Checklist from the Resources section for a comprehensive list of essential items for your family emergency kit.'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
    alert('Message sent successfully!');
  };

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(234, 179, 8, 0.1) 0%, transparent 50%)`
        }}></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-950 mb-6 relative">
            <span className="relative z-10">Frequently Asked Questions</span>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full"></div>
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Find answers to common questions about MDRRMO services and emergency procedures
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-2xl p-8 md:p-12 shadow-2xl border border-gray-200">
          
          {/* FAQ Section */}
          <div>
            <h3 className="text-2xl font-bold text-blue-950 mb-8">Common Questions</h3>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full p-6 text-left font-semibold flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-900 text-lg">{faq.question}</span>
                    {openFAQ === index ? (
                      <ChevronUp size={24} className="text-blue-600" />
                    ) : (
                      <ChevronDown size={24} className="text-blue-600" />
                    )}
                  </button>
                  {openFAQ === index && (
                    <div className="p-6 pt-0 text-gray-700 bg-gray-50 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-blue-800">
                <strong>Still have questions?</strong> Visit our{' '}
                <Link to="/contact" className="underline hover:text-blue-900 font-semibold">
                  contact page
                </Link>{' '}
                or call our office at (052) 234-5678.
              </p>
            </div>
          </div>

          {/* Contact Form Section */}
          <div>
            <h3 className="text-2xl font-bold text-blue-950 mb-8">Quick Contact</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-semibold mb-2 text-blue-950">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2 text-blue-950">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2 text-blue-950">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  required
                  className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-xl shadow-xl transition-all duration-300 flex items-center justify-center transform hover:scale-105"
              >
                <Send className="mr-3" size={20} />
                Send Message
              </button>
            </form>
            
            <div className="mt-8 p-6 bg-yellow-50 rounded-xl border border-yellow-200">
              <p className="text-yellow-800">
                <strong>For detailed inquiries,</strong> visit our{' '}
                <Link to="/contact" className="underline hover:text-yellow-900 font-semibold">
                  full contact page
                </Link>{' '}
                with office hours and location details.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;