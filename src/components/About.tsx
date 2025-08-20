import React from 'react';
import { Shield, Eye, Target, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const About: React.FC = () => {
  const [aboutSections, setAboutSections] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchAboutSections();
  }, []);

  const fetchAboutSections = async () => {
    try {
      const { data, error } = await supabase
        .from('about_sections')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true });

      if (error && !error.message.includes('relation "about_sections" does not exist')) {
        throw error;
      }
      
      setAboutSections(data || []);
    } catch (error) {
      console.error('Error fetching about sections:', error);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      icon: Target,
      title: 'Mission',
      description: 'To ensure the safety and resilience of Pio Duran through effective disaster risk reduction and management.',
      color: 'text-blue-600'
    },
    {
      icon: Eye,
      title: 'Vision',
      description: 'A disaster-resilient community with zero casualties through proactive preparedness and efficient response.',
      color: 'text-green-600'
    },
    {
      icon: Target,
      title: 'Goal',
      description: 'To reduce vulnerability and enhance capacity of communities to prepare for, respond to, and recover from disasters.',
      color: 'text-purple-600'
    }
  ];

  // Use dynamic sections if available, otherwise use default cards
  const displayCards = aboutSections.length > 0 
    ? aboutSections.map(section => ({
        icon: Target, // Default icon, could be made dynamic
        title: section.title,
        description: section.content,
        color: 'text-blue-600'
      }))
    : cards;
  return (
    <section id="about" className="py-24 bg-gradient-to-br mt-30 from-blue-950 via-blue-900 to-blue-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-6 relative">
            <span className="relative z-10">About DRRM Pio Duran</span>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
          </h2>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            MDRRMO Pio Duran is the central hub for all disaster risk reduction and management activities, ensuring coordinated responses and sustainable preparedness measures.
          </p>
        </div>

        <div className={`grid grid-cols-1 ${displayCards.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3'} gap-8 mb-16`}>
          {displayCards.map((card, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-3 border border-white/20 hover:border-yellow-500/50 group"
            >
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <card.icon size={40} className="text-blue-950" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-center mb-4 text-white">
                {card.title}
              </h3>
              <p className="text-blue-100 text-center leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link 
            to="/about"
            className="group relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-bold text-blue-950 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl"
          >
            <Users className="mr-3" size={22} />
            <span className="text-xl tracking-wide">Meet the DRRM Team</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;