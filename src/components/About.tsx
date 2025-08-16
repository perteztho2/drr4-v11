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
    <section id="about" className="py-20 bg-blue-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-100 mb-4 relative inline-block">
            <span className="relative z-10 px-4">About DRRM Pio Duran</span>
            <span className="absolute bottom-0 left-0 right-0 h-2 bg-yellow-400 z-0"></span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">MDRRMO Pio Duran is the central hub for all disaster risk reduction and management activities, ensuring coordinated responses and sustainable preparedness measures.
          </p>
        </div>

        <div className={`grid grid-cols-1 ${displayCards.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3'} gap-8`}>
          {displayCards.map((card, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-blue-600"
            >
              <div className={`${card.color} text-5xl mb-4 text-center`}>
                <card.icon size={48} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-4 text-blue-900">
                {card.title}
              </h3>
              <p className="text-gray-600 text-center">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/about"
            className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-bold text-white rounded-full bg-gradient-to-r from-blue-600 to-blue-900 hover:from-yellow-400 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105"
          >
            <Users className="mr-2" size={20} />
            <span className="text-lg tracking-wide">Meet the DRRM Staff</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;