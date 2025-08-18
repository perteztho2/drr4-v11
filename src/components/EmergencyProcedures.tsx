import React, { useState, useEffect } from 'react';
import { Waves, Mountain, Zap, Cloud, Home, Flame, Globe, Thermometer, Calendar, AlertTriangle, Download } from 'lucide-react';

const EmergencyProcedures: React.FC = () => {
  const [activeTab, setActiveTab] = useState('storm-surge');

  useEffect(() => {
    // Load external scripts for PDF generation
    const loadScript = (src: string) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const loadScripts = async () => {
      try {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
      } catch (error) {
        console.error('Error loading PDF generation scripts:', error);
      }
    };

    loadScripts();
  }, []);

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
    'landslide': {
      icon: Mountain,
      name: 'Landslide',
      color: 'text-amber-600',
      before: [
        { title: 'Learn About Risk', description: 'Learn about landslide risk in your area and watch for warning signs like tilting trees or poles.' },
        { title: 'Develop Plan', description: 'Develop evacuation plan with multiple routes and keep emergency supplies ready.' },
        { title: 'Install Safety', description: 'Install flexible pipe fittings for gas and water and consider professional slope stability assessment.' },
        { title: 'Know Escape Routes', description: 'Know two ways out of every room and identify safe areas away from slopes.' }
      ],
      during: [
        { title: 'Move Away Fast', description: 'Move away from the path of landslide quickly and run to nearest high ground perpendicular to flow.' },
        { title: 'Protect Head', description: 'Protect your head from falling debris and stay alert for flooding after landslide.' },
        { title: 'Listen for Sounds', description: 'Listen for unusual sounds indicating movement and evacuate if you suspect imminent landslide.' },
        { title: 'Avoid Slope Areas', description: 'Stay away from steep slopes and areas with loose soil or rock.' }
      ],
      after: [
        { title: 'Stay Away', description: 'Stay away from slide area - more slides may occur and check for injured or trapped persons.' },
        { title: 'Watch for Hazards', description: 'Watch for flooding or broken utility lines and report broken utility lines to authorities.' },
        { title: 'Replant Ground', description: 'Replant damaged ground as soon as possible and seek professional evaluation of land stability.' },
        { title: 'Document Damage', description: 'Take photos for insurance claims and contact authorities for assessment.' }
      ]
    },
    'thunderstorm': {
      icon: Zap,
      name: 'Thunderstorm',
      color: 'text-purple-600',
      before: [
        { title: 'Monitor Weather', description: 'Monitor weather forecasts and warnings and secure outdoor objects that could blow away.' },
        { title: 'Prepare Home', description: 'Trim tree branches near your home and install surge protectors for electronics.' },
        { title: 'Review Plan', description: 'Review family emergency plan and charge electronic devices and flashlights.' },
        { title: 'Secure Items', description: 'Bring in or secure outdoor furniture, decorations, and equipment.' }
      ],
      during: [
        { title: 'Go Indoors', description: 'Go indoors immediately when thunder is heard and stay away from windows, doors, and porches.' },
        { title: 'Avoid Electronics', description: 'Avoid electrical equipment and plumbing and don\'t use corded phones except for emergencies.' },
        { title: 'Seek Shelter', description: 'If outdoors, seek shelter in hard-topped vehicle and avoid tall objects like trees if caught outside.' },
        { title: 'Stay Inside', description: 'Remain indoors until 30 minutes after the last thunder is heard.' }
      ],
      after: [
        { title: 'Wait Safely', description: 'Wait 30 minutes after last thunder before going out and check for damage to home and property.' },
        { title: 'Avoid Hazards', description: 'Avoid downed power lines and report them and be cautious of flooding in low-lying areas.' },
        { title: 'Check Others', description: 'Check on neighbors, especially elderly and document any damage for insurance claims.' },
        { title: 'Report Issues', description: 'Report any electrical hazards or structural damage to authorities.' }
      ]
    },
    'typhoon': {
      icon: Cloud,
      name: 'Typhoon',
      color: 'text-orange-500',
      before: [
        { title: 'Monitor Tracking', description: 'Monitor typhoon tracking and evacuation orders and stock up on food, water, and medical supplies.' },
        { title: 'Secure Property', description: 'Secure or bring in outdoor furniture and board up windows with plywood.' },
        { title: 'Prepare Water', description: 'Fill bathtubs and containers with water and fuel vehicles and check emergency equipment.' },
        { title: 'Emergency Kit', description: 'Prepare emergency kit with 72-hour supplies and important documents in waterproof container.' }
      ],
      during: [
        { title: 'Stay Indoors', description: 'Stay indoors and away from windows and go to interior room on lowest floor.' },
        { title: 'Listen to Radio', description: 'Listen to battery-powered radio for updates and avoid using candles - use flashlights instead.' },
        { title: 'Avoid Eye', description: 'Don\'t go outside during eye of storm and be prepared for power outages.' },
        { title: 'Stay Alert', description: 'Remain alert for changing conditions and follow official evacuation orders.' }
      ],
      after: [
        { title: 'Wait for Clear', description: 'Wait for official all-clear before venturing out and watch for flooding and storm surge.' },
        { title: 'Avoid Hazards', description: 'Avoid downed power lines and damaged buildings and use generators outdoors only to prevent CO poisoning.' },
        { title: 'Water Safety', description: 'Boil water if advised by authorities and take photos of damage for insurance.' },
        { title: 'Help Others', description: 'Check on neighbors and assist with recovery efforts when safe to do so.' }
      ]
    },
    'flood': {
      icon: Home,
      name: 'Flood',
      color: 'text-teal-600',
      before: [
        { title: 'Know Risk', description: 'Know your area\'s flood risk and evacuation routes and sign up for community alert systems.' },
        { title: 'Make Plan', description: 'Make flood emergency plan with family and keep emergency supplies in waterproof container.' },
        { title: 'Consider Insurance', description: 'Consider flood insurance (requires 30-day waiting period) and identify higher ground locations nearby.' },
        { title: 'Prepare Kit', description: 'Prepare emergency kit with essential supplies and important documents.' }
      ],
      during: [
        { title: 'Move Higher', description: 'Move to higher ground immediately and avoid walking in moving water.' },
        { title: 'Don\'t Drive', description: 'Don\'t drive through flooded roads and stay away from downed power lines.' },
        { title: 'Listen Updates', description: 'Listen to emergency broadcasts and evacuate if told to do so by authorities.' },
        { title: 'Stay Safe', description: 'Never attempt to walk or drive through flood waters - turn around, don\'t drown.' }
      ],
      after: [
        { title: 'Return Safely', description: 'Return home only when authorities say it\'s safe and avoid floodwater - may be contaminated.' },
        { title: 'Check Damage', description: 'Check for structural damage before entering and clean and disinfect everything touched by floodwater.' },
        { title: 'Food Safety', description: 'Throw away food that came in contact with floodwater and document damage with photos.' },
        { title: 'Health Precautions', description: 'Seek medical attention if you come into contact with flood water.' }
      ]
    },
    'earthquake': {
      icon: Globe,
      name: 'Earthquake',
      color: 'text-red-600',
      before: [
        { title: 'Secure Space', description: 'Secure heavy furniture and appliances to walls and practice "Drop, Cover, and Hold On" drills.' },
        { title: 'Identify Safe Spots', description: 'Identify safe spots in each room and keep emergency supplies accessible.' },
        { title: 'Learn Shutoffs', description: 'Learn how to turn off gas, water, and electricity and make family communication plan.' },
        { title: 'Emergency Kit', description: 'Prepare earthquake emergency kit with supplies for 72 hours.' }
      ],
      during: [
        { title: 'Drop Cover Hold', description: 'Drop to hands and knees immediately and take cover under sturdy desk or table.' },
        { title: 'Protect Head', description: 'Hold on to shelter and protect head/neck and stay where you are until shaking stops.' },
        { title: 'If Outside', description: 'If outdoors, move away from buildings and trees and if driving, pull over and stop safely.' },
        { title: 'Stay Calm', description: 'Remain calm and do not run outside during shaking.' }
      ],
      after: [
        { title: 'Check Injuries', description: 'Check for injuries and provide first aid and inspect home for damage and hazards.' },
        { title: 'Turn Off Utilities', description: 'Turn off utilities if damaged and clean up spilled hazardous materials.' },
        { title: 'Expect Aftershocks', description: 'Be prepared for aftershocks and stay out of damaged buildings.' },
        { title: 'Get Information', description: 'Listen to emergency broadcasts for updates and instructions.' }
      ]
    },
    'fire': {
      icon: Flame,
      name: 'Fire',
      color: 'text-red-500',
      before: [
        { title: 'Install Alarms', description: 'Install smoke alarms and check batteries monthly and create and practice fire escape plan.' },
        { title: 'Keep Extinguishers', description: 'Keep fire extinguishers in key locations and clear vegetation around home (defensible space).' },
        { title: 'Fire-Resistant Materials', description: 'Use fire-resistant materials for landscaping and know two ways out of every room.' },
        { title: 'Emergency Plan', description: 'Create family fire escape plan and practice regularly with all family members.' }
      ],
      during: [
        { title: 'Get Out Fast', description: 'Get out fast and call 911 and crawl low under smoke to avoid inhaling it.' },
        { title: 'Feel Doors', description: 'Feel doors before opening - don\'t open if hot and close doors behind you as you escape.' },
        { title: 'Meeting Place', description: 'Meet at designated meeting place and never go back inside for belongings.' },
        { title: 'Stop Drop Roll', description: 'If clothes catch fire: stop, drop to ground, and roll to smother flames.' }
      ],
      after: [
        { title: 'Stay Out', description: 'Don\'t enter damaged building until cleared and watch for hot spots that may re-ignite.' },
        { title: 'Check Clearance', description: 'Check with fire department before re-entry and beware of structural damage.' },
        { title: 'Document Damage', description: 'Document damage with photos and contact insurance company immediately.' },
        { title: 'Professional Help', description: 'Seek professional evaluation for structural integrity before reoccupying.' }
      ]
    },
    'tsunami': {
      icon: Waves,
      name: 'Tsunami',
      color: 'text-blue-800',
      before: [
        { title: 'Know Zone', description: 'Learn if you live in tsunami hazard zone and know evacuation routes to higher ground.' },
        { title: 'Practice Drills', description: 'Practice evacuation drills with family and prepare emergency kit for quick grab.' },
        { title: 'Sign Up Alerts', description: 'Sign up for tsunami warning alerts and identify vertical evacuation structures.' },
        { title: 'Emergency Supplies', description: 'Keep emergency supplies in easily accessible location.' }
      ],
      during: [
        { title: 'Move Higher', description: 'Move to higher ground immediately and don\'t wait for official warning.' },
        { title: 'Go Far Inland', description: 'Go as high and as far inland as possible and if trapped, go to upper floor of sturdy building.' },
        { title: 'Stay Away Beach', description: 'Stay away from beach and waterfront and listen to emergency broadcasts.' },
        { title: 'Don\'t Return', description: 'Do not return to evacuation zone until authorities give all-clear.' }
      ],
      after: [
        { title: 'Stay Away', description: 'Stay away from flooded and damaged areas and wait for official all-clear before returning.' },
        { title: 'Multiple Waves', description: 'Be aware that tsunamis come in series and avoid disaster areas to allow rescue operations.' },
        { title: 'Help Others', description: 'Help injured or trapped persons if safe to do so and stay out of buildings with water around them.' },
        { title: 'Follow Instructions', description: 'Follow all official instructions and avoid areas that may be unstable.' }
      ]
    },
    'heat': {
      icon: Thermometer,
      name: 'Heat Emergency',
      color: 'text-red-400',
      before: [
        { title: 'Install Cooling', description: 'Install air conditioning or cooling systems and identify air-conditioned public places nearby.' },
        { title: 'Check Others', description: 'Check on elderly neighbors and relatives and never leave people or pets in parked cars.' },
        { title: 'Learn Signs', description: 'Learn signs of heat-related illness and prepare cooling supplies and extra water.' },
        { title: 'Plan Activities', description: 'Plan outdoor activities for cooler parts of the day.' }
      ],
      during: [
        { title: 'Stay Cool', description: 'Stay indoors in air conditioning when possible and drink plenty of water even if not thirsty.' },
        { title: 'Avoid Substances', description: 'Avoid alcohol and caffeine and wear lightweight, light-colored clothing.' },
        { title: 'Cool Down', description: 'Take cool showers or baths and limit outdoor activities to early morning/evening.' },
        { title: 'Rest Often', description: 'Take frequent breaks in shade or air conditioning.' }
      ],
      after: [
        { title: 'Monitor Weather', description: 'Continue monitoring weather forecasts and check on family, friends, and neighbors.' },
        { title: 'Watch for Signs', description: 'Watch for signs of heat exhaustion or heat stroke and seek medical attention if feeling unwell.' },
        { title: 'Return Gradually', description: 'Gradually return to normal activities and evaluate cooling strategies for future events.' },
        { title: 'Stay Hydrated', description: 'Continue drinking plenty of fluids even after temperatures cool.' }
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

  const downloadPDF = (disasterType: string, phase: string) => {
    const currentProcedure = procedures[activeTab as keyof typeof procedures];
    if (!currentProcedure) return;

    const phaseData = currentProcedure[phase as keyof typeof currentProcedure] as Array<{title: string, description: string}>;
    if (!phaseData) return;

    // Create temporary element for PDF generation
    const tempElement = document.createElement('div');
    tempElement.style.padding = '20px';
    tempElement.style.fontFamily = 'Arial, sans-serif';
    tempElement.style.maxWidth = '600px';
    tempElement.style.backgroundColor = '#fff';
    
    // Add header
    const header = document.createElement('div');
    header.innerHTML = `
      <h1 style="color: #172554; text-align: center; margin-bottom: 20px; font-size: 24px;">
        ${currentProcedure.name} - ${phase.charAt(0).toUpperCase() + phase.slice(1)} Procedures
      </h1>
      <hr style="margin-bottom: 20px; border: 1px solid #e2e8f0;">
    `;
    tempElement.appendChild(header);

    // Add content
    const content = document.createElement('div');
    phaseData.forEach((item, index) => {
      const itemDiv = document.createElement('div');
      itemDiv.style.marginBottom = '15px';
      itemDiv.innerHTML = `
        <h3 style="color: #172554; font-size: 16px; margin-bottom: 5px;">
          ${index + 1}. ${item.title}
        </h3>
        <p style="color: #475569; font-size: 14px; line-height: 1.5; margin-left: 15px;">
          ${item.description}
        </p>
      `;
      content.appendChild(itemDiv);
    });
    tempElement.appendChild(content);

    // Add footer
    const footer = document.createElement('div');
    footer.innerHTML = `
      <hr style="margin-top: 20px; border: 1px solid #e2e8f0;">
      <p style="text-align: center; font-size: 12px; color: #666; margin-top: 10px;">
        MDRRMO Pio Duran - Emergency Procedures Guide - Generated on ${new Date().toLocaleDateString()}
      </p>
    `;
    tempElement.appendChild(footer);

    // Add to body temporarily
    document.body.appendChild(tempElement);

    // Generate PDF using html2canvas and jsPDF
    if (window.html2canvas && window.jspdf) {
      window.html2canvas(tempElement, {
        scale: 2,
        backgroundColor: '#fff'
      }).then((canvas: any) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new window.jspdf.jsPDF('p', 'mm', 'a4');
        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        
        const filename = `${currentProcedure.name.replace(/\s+/g, '_')}_${phase}_procedures.pdf`;
        pdf.save(filename);
        
        document.body.removeChild(tempElement);
      });
    } else {
      console.error('PDF generation libraries not loaded');
      document.body.removeChild(tempElement);
    }
  };

  const renderProcedureCard = (title: string, items: Array<{title: string, description: string}>, icon: React.ReactNode, color: string, phase: string) => (
    <div className={`bg-white p-6 rounded-xl shadow-lg h-full border-l-4 ${color.replace('text-', 'border-')} relative`}>
      <button
        onClick={() => downloadPDF(activeTab, phase)}
        className="absolute top-4 right-4 bg-blue-950 text-white px-3 py-1 rounded-lg text-xs hover:bg-blue-800 transition-colors flex items-center space-x-1"
      >
        <Download size={12} />
        <span>PDF</span>
      </button>
      
      <h3 className="text-2xl font-bold mb-6 flex items-center text-blue-900">
        {icon}
        <span className="ml-3">{title}</span>
      </h3>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="relative pl-6">
            <div className={`absolute left-0 top-2 w-3 h-3 rounded-full ${color.replace('text-', 'bg-')}`}></div>
            <h4 className="font-semibold mb-2 text-blue-950">{item.title}</h4>
            <p className="text-gray-700 text-sm leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const currentProcedure = procedures[activeTab as keyof typeof procedures] || procedures['storm-surge'];

  return (
    <section id="emergency-procedures" className="py-16 bg-blue-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-yellow-500 mb-4 relative inline-block">
            <span className="relative z-10 px-4">EMERGENCY PROCEDURES</span>
            <span className="absolute bottom-0 left-0 right-0 h-2 bg-gray-400 z-0"></span>
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            What to do before, during, and after different types of emergencies
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-12">
          {/* Tab Navigation */}
          <div className="bg-gray-50 p-4">
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg text-xs font-medium transition-all duration-300 hover:bg-blue-100 ${
                    activeTab === tab.id
                      ? `${tab.color} bg-blue-100 border-2 border-current`
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <tab.icon size={20} />
                  <span className="text-center leading-tight">{tab.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <currentProcedure.icon className={`${currentProcedure.color} text-4xl mr-4`} size={48} />
                <h3 className="text-3xl font-bold text-blue-950">{currentProcedure.name} Emergency Procedures</h3>
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Follow these step-by-step procedures to stay safe during {currentProcedure.name.toLowerCase()} emergencies
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {renderProcedureCard(
                'Before',
                currentProcedure.before,
                <Calendar size={24} />,
                currentProcedure.color,
                'before'
              )}
              {renderProcedureCard(
                'During',
                currentProcedure.during,
                <AlertTriangle size={24} />,
                currentProcedure.color,
                'during'
              )}
              {renderProcedureCard(
                'After',
                currentProcedure.after,
                <Home size={24} />,
                currentProcedure.color,
                'after'
              )}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-blue-950 mb-4">Ready to Learn More?</h3>
            <p className="text-blue-900 mb-6 max-w-2xl mx-auto">
              Download our comprehensive emergency procedures guide or contact us for training sessions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/resources"
                className="inline-flex items-center px-6 py-3 bg-blue-950 text-white rounded-full font-bold hover:bg-blue-900 transition-all duration-300 transform hover:scale-105"
              >
                <Calendar className="mr-2" size={18} />
                Download Guides
              </Link>
              <Link 
                to="/contact"
                className="inline-flex items-center px-6 py-3 bg-white text-blue-950 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                <Home className="mr-2" size={18} />
                Request Training
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmergencyProcedures;