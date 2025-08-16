import React, { useState } from 'react';
import SEOHead from '../../components/SEOHead';
import Hero from '../../components/Hero';
import About from '../../components/About';
import Services from '../../components/Services';
import Planning from '../../components/Planning';
import EmergencyProcedures from '../../components/EmergencyProcedures';
import News from '../../components/News';
import FAQ from '../../components/FAQ';
import Resources from '../../components/Resources';
import ImageGallery from '../../components/ImageGallery';
import SocialMediaFeed from '../../components/SocialMediaFeed';
import IncidentModal from '../../components/modals/IncidentModal';
import HotlineModal from '../../components/modals/HotlineModal';
import SuccessModal from '../../components/modals/SuccessModal';
import { useData } from '../../contexts/DataContext';
import { validateIncidentForm } from '../../utils/validation';

const Home: React.FC = () => {
  const [isIncidentModalOpen, setIsIncidentModalOpen] = useState(false);
  const [isHotlineModalOpen, setIsHotlineModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');
  
  const { addIncident } = useData();

  const handleIncidentSubmit = (formData: any) => {
    // Add incident to data context
    addIncident(formData)
      .then((refNum) => {
        setReferenceNumber(refNum || `RD-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999) + 1).padStart(4, '0')}`);
        setIsIncidentModalOpen(false);
        setIsSuccessModalOpen(true);
      })
      .catch((error) => {
        console.error('Error submitting incident:', error);
        alert('Error submitting incident report. Please try again.');
      });
  };

  return (
    <>
      <SEOHead
        title="MDRRMO Pio Duran - Building Resilient Communities"
        description="Municipal Disaster Risk Reduction and Management Office of Pio Duran, Albay. Emergency response, disaster preparedness, and community safety services."
        keywords="MDRRMO, disaster management, emergency response, Pio Duran, Albay, Philippines, disaster preparedness, emergency hotline"
      />
      
      <Hero 
        onEmergencyClick={() => setIsHotlineModalOpen(true)}
        onIncidentClick={() => setIsIncidentModalOpen(true)}
      />
      <About />
      <Services />
      <Planning />
      <EmergencyProcedures />
      <News />
      
      {/* Social Media Feed Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Stay Connected</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow our latest updates and community activities on social media
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <SocialMediaFeed maxPosts={4} showEngagement={true} />
          </div>
        </div>
      </section>
      
      <FAQ />
      <Resources />
      <ImageGallery />

      <IncidentModal
        isOpen={isIncidentModalOpen}
        onClose={() => setIsIncidentModalOpen(false)}
        onSubmit={handleIncidentSubmit}
      />

      <HotlineModal
        isOpen={isHotlineModalOpen}
        onClose={() => setIsHotlineModalOpen(false)}
      />

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        referenceNumber={referenceNumber}
      />
    </>
  );
};

export default Home;