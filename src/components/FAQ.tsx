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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Frequently Asked Questions</h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about MDRRMO services and emergency procedures
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl p-6 md:p-8 shadow-lg border-4 border-blue-900">
          
          {/* FAQ Section */}
          <div>
            <h3 className="text-2xl font-bold text-blue-900 mb-6">Common Questions</h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-blue-900 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full p-4 text-left font-medium flex justify-between items-center hover:bg-blue-50 transition-colors"
                  >
                    <span className="text-gray-900">{faq.question}</span>
                    {openFAQ === index ? (
                      <ChevronUp size={20} className="text-blue-600" />
                    ) : (
                      <ChevronDown size={20} className="text-blue-600" />
                    )}
                  </button>
                  {openFAQ === index && (
                    <div className="p-4 pt-0 text-gray-700 bg-blue-50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Still have questions?</strong> Visit our{' '}
                <Link to="/contact" className="underline hover:text-blue-900">
                  contact page
                </Link>{' '}
                or call our office at (052) 234-5678.
              </p>
            </div>
          </div>

          {/* Contact Form Section */}
          <div>
            <h3 className="text-2xl font-bold text-blue-900 mb-6">Quick Contact</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-semibold mb-1 text-blue-950">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-blue-950">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-blue-950">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  required
                  className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-400 text-blue-950 font-bold py-3 px-6 rounded shadow-lg transition-all duration-300 flex items-center"
              >
                <Send className="mr-2" size={16} />
                Send Message
              </button>
            </form>
            
            <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-800">
                <strong>For detailed inquiries,</strong> visit our{' '}
                <Link to="/contact" className="underline hover:text-yellow-900">
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