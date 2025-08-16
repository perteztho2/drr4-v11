import React, { useState } from 'react';
import { Waves, Mountain, Zap, Cloud, Home, Flame, Globe, Thermometer, Calendar, AlertTriangle } from 'lucide-react';

const EmergencyProcedures: React.FC = () => {
  const [activeTab, setActiveTab] = useState('storm-surge');

  const procedures = {
    'storm-surge': {
      icon: Waves,
      name: 'Storm Surge',
      color: 'text-blue-500',
      before: [
        { title: 'Know Your Risk', description: 'Check if your area is prone to storm surges and know your evacuation routes.' },
        { title: 'Prepare Emergency Kit', description: 'Include food, water, medications, flashlight, batteries, and important documents.' },
        { title: 'Reinforce Your Home', description: 'Install storm shutters or board up windows. Secure outdoor items that could become projectiles.' },
        { title: 'Plan Evacuation', description: 'Identify higher ground and plan how to get there. Know where official shelters are located.' }
      ],
      during: [
        { title: 'Evacuate if Ordered', description: 'Leave immediately if authorities issue evacuation orders. Don\'t wait until it\'s too late.' },
        { title: 'Move to Higher Ground', description: 'If trapped by rising water, move to the highest level of your home or building.' },
        { title: 'Avoid Flood Waters', description: 'Never walk, swim, or drive through flood waters. Just 6 inches can knock you down.' },
        { title: 'Stay Informed', description: 'Listen to weather updates and emergency instructions on battery-powered radio.' }
      ],
      after: [
        { title: 'Wait for All Clear', description: 'Don\'t return home until authorities declare it\'s safe to do so.' },
        { title: 'Inspect for Damage', description: 'Check for structural damage before entering buildings. Watch for downed power lines.' },
        { title: 'Avoid Contaminated Water', description: 'Don\'t drink tap water until officials say it\'s safe. Boil water if unsure.' },
        { title: 'Document Damage', description: 'Take photos for insurance claims before cleaning up or making repairs.' }
      ]
    },
    'earthquake': {
      icon: Globe,
      name: 'Earthquake',
      color: 'text-red-600',
      before: [
        { title: 'Secure Your Space', description: 'Fasten shelves, heavy furniture, and appliances to walls. Store breakables in low cabinets.' },
        { title: 'Create Emergency Plan', description: 'Identify safe spots in each room and practice drop, cover, and hold on drills.' },
        { title: 'Prepare Supplies', description: 'Stock up on food, water, first aid kit, flashlight, and sturdy shoes near your bed.' },
        { title: 'Learn to Shut Off', description: 'Know how to turn off gas, water, and electricity in case of leaks or damage.' }
      ],
      during: [
        { title: 'Drop, Cover, Hold On', description: 'Drop to hands and knees, cover head and neck, hold on to sturdy furniture.' },
        { title: 'Stay Indoors', description: 'Remain inside until shaking stops. Stay away from windows and exterior walls.' },
        { title: 'If Outside', description: 'Move to open area away from buildings, trees, streetlights, and utility wires.' },
        { title: 'If Driving', description: 'Pull over in safe area, stop, and stay inside vehicle until shaking stops.' }
      ],
      after: [
        { title: 'Expect Aftershocks', description: 'Be ready for additional smaller earthquakes following the main shock.' },
        { title: 'Check for Injuries', description: 'Attend to injuries first before helping others. Don\'t move seriously injured people.' },
        { title: 'Inspect for Damage', description: 'Check for gas leaks, electrical damage, and structural issues before entering buildings.' },
        { title: 'Listen for Updates', description: 'Tune to emergency broadcasts for official information and instructions.' }
      ]
    },
    'fire': {
      icon: Flame,
      name: 'Fire',
      color: 'text-red-500',
      before: [
        { title: 'Install Smoke Alarms', description: 'Place alarms on every level and test monthly. Replace batteries yearly.' },
        { title: 'Create Escape Plan', description: 'Identify two exits from every room and practice fire drills regularly.' },
        { title: 'Clear Escape Routes', description: 'Keep hallways and exits clear of clutter. Make sure windows open easily.' },
        { title: 'Fire Extinguishers', description: 'Keep ABC-rated extinguishers in kitchen, garage, and near fireplaces.' }
      ],
      during: [
        { title: 'Get Out Fast', description: 'Leave immediately when alarm sounds. Don\'t stop for belongings.' },
        { title: 'Stay Low', description: 'Crawl under smoke to exit. Hot air rises, cleaner air is near floor.' },
        { title: 'Feel Doors First', description: 'Use back of hand to test doors for heat before opening. Use alternate exit if hot.' },
        { title: 'Stop, Drop, Roll', description: 'If clothes catch fire, stop moving, drop to ground, and roll to smother flames.' }
      ],
      after: [
        { title: 'Call for Help', description: 'Once safely outside, call emergency services. Never re-enter burning building.' },
        { title: 'Account for Everyone', description: 'Meet at designated spot and confirm all family members are accounted for.' },
        { title: 'Wait for All Clear', description: 'Don\'t return until firefighters say it\'s safe to re-enter.' },
        { title: 'Contact Insurance', description: 'Begin claims process and document all damage with photos and videos.' }
      ]
    }
  };

  const tabs = [
    { id: 'storm-surge', icon: Waves, name: 'Storm Surge', color: 'text-blue-500' },
    { id: 'landslide', icon: Mountain, name: 'Landslide', color: 'text-amber-600' },
    { id: 'thunderstorm', icon: Zap, name: 'Thunderstorm', color: 'text-purple-600' },
    { id: 'typhoon', icon: Cloud, name: 'Typhoon', color: 'text-orange-500' },
    { id: 'flood', icon: Home, name: 'Flood', color: 'text-teal-600' },
    { id: 'earthquake', icon: Globe, name: 'Earthquake', color: 'text-red-600' },
    { id: 'fire', icon: Flame, name: 'Fire', color: 'text-red-500' },
    { id: 'tsunami', icon: Waves, name: 'Tsunami', color: 'text-blue-800' },
    { id: 'heat', icon: Thermometer, name: 'Heat', color: 'text-red-400' }
  ];

  const renderProcedureCard = (title: string, items: Array<{title: string, description: string}>, icon: React.ReactNode, color: string) => (
    <div className={`bg-white p-6 rounded-lg shadow-md h-full border-l-4 ${color.replace('text-', 'border-')}`}>
      <h3 className="text-2xl font-bold mb-4 flex items-center text-blue-900">
        {icon}
        <span className="ml-3">{title}</span>
      </h3>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="relative pl-6">
            <div className={`absolute left-0 top-2 w-3 h-3 rounded-full ${color.replace('text-', 'bg-')}`}></div>
            <h4 className="font-semibold mb-1">{item.title}</h4>
            <p className="text-gray-700 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const currentProcedure = procedures[activeTab as keyof typeof procedures] || procedures['storm-surge'];

  return (
    <section id="emergency-procedures" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-blue-900 mb-4 relative inline-block">
            <span className="relative z-10 px-4">EMERGENCY PROCEDURES</span>
            <span className="absolute bottom-0 left-0 right-0 h-2 bg-yellow-400 z-0"></span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            What to do before, during, and after different types of emergencies
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
          {/* Tab Navigation */}
          <div className="flex flex-wrap border-b overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-3 md:px-4 py-2 md:py-3 text-sm md:text-base transition-all duration-300 hover:bg-gray-50 border-b-3 ${
                  activeTab === tab.id
                    ? `${tab.color} border-current font-semibold`
                    : 'text-gray-600 border-transparent hover:text-gray-800'
                }`}
              >
                <tab.icon className="mr-1 md:mr-2" size={16} />
                <span className="whitespace-nowrap">{tab.name}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {renderProcedureCard(
                'Before',
                currentProcedure.before,
                <Calendar size={24} />,
                currentProcedure.color
              )}
              {renderProcedureCard(
                'During',
                currentProcedure.during,
                <AlertTriangle size={24} />,
                currentProcedure.color
              )}
              {renderProcedureCard(
                'After',
                currentProcedure.after,
                <Home size={24} />,
                currentProcedure.color
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmergencyProcedures;