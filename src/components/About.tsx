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
    <section id="about" className="relative py-3 md:py-3 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-3 left-3 w-20 md:w-30 h-32 md:h-30 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-5 right-5 w-20 md:w-30 h-32 md:h-30 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-4 left-10 w-25 md:w-40 h-25 md:h-30 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-4 md:mb-6">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-yellow-500 mb-4 md:mb-6 relative">
            <span className="relative z-10">About DRRM Pio Duran</span>
            <div className="absolute -bottom-1 md:-bottom-2 left-1/2 transform -translate-x-1/2 w-20 md:w-40 h-0.5 md:h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
          </h2>
          <p className="text-sm md:text-md lg:text-lg text-blue-100 max-w-4xl mx-auto leading-relaxed px-2">
            MDRRMO Pio Duran is the central hub for all disaster risk reduction and management activities, ensuring coordinated responses and sustainable preparedness measures.
          </p>
        </div>

        <div className={`grid grid-cols-1 ${displayCards.length === 4 ? 'md:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-4'} gap-2 md:gap-8 mb-4 md:mb-8`}>
          {displayCards.map((card, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm p-2 md:p-2 rounded-xl md:rounded-2xl shadow-lg md:shadow-2xl hover:shadow-2xl md:hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1 md:hover:-translate-y-3 border border-white/20 hover:border-yellow-500/50 group"
            >
              <div className="text-center mb-6">
                <div className="w-12 h-12 md:w-15 md:h-15 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-1 md:mb-1 group-hover:scale-110 transition-transform duration-300">
                  <card.icon size={24} className="text-blue-950 md:w-15 md:h-15" />
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-center mb-2 md:mb-3 text-white">
                {card.title}
              </h3>
              <p className="text-sm md:text-base text-blue-100 text-center leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link 
            to="/about"
            className="group relative inline-flex items-center justify-center px-3 md:px-5 py-2 md:py-2 overflow-hidden font-bold text-blue-950 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-xl md:shadow-2xl hover:shadow-2xl md:hover:shadow-3xl"
          >
            <Users className="mr-2 md:mr-3" size={18} />
            <span className="text-sm md:text-lg lg:text-xl tracking-wide">Meet the DRRM Team</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;