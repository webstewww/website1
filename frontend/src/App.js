import React, { useState } from "react";
import "./App.css";

// Sample perfume database with scent profiles
const PERFUME_DATABASE = [
  {
    id: 1,
    brand: "Chanel",
    name: "No. 5",
    description: "The ultimate classic feminine fragrance with aldehydic florals",
    notes: ["Rose", "Jasmine", "Aldehydes", "Sandalwood", "Vanilla"],
    categories: ["Floral", "Oriental"],
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=200"
  },
  {
    id: 2,
    brand: "Dior",
    name: "Sauvage",
    description: "A fresh and spicy masculine fragrance inspired by wide-open spaces",
    notes: ["Bergamot", "Pepper", "Lavender", "Cedar", "Ambroxan"],
    categories: ["Fresh", "Spicy", "Woody"],
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=200"
  },
  {
    id: 3,
    brand: "Tom Ford",
    name: "Black Orchid",
    description: "A luxurious and sensual unisex fragrance with dark florals",
    notes: ["Black Orchid", "Patchouli", "Dark Chocolate", "Incense", "Black Truffle"],
    categories: ["Oriental", "Floral"],
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=200"
  },
  {
    id: 4,
    brand: "Hermès",
    name: "Un Jardin Sur Le Toit",
    description: "A fresh green fragrance inspired by a secret garden on a rooftop",
    notes: ["Grass", "Apple", "Pear", "Rose", "Petitgrain"],
    categories: ["Fresh", "Citrus", "Floral"],
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=200"
  },
  {
    id: 5,
    brand: "Yves Saint Laurent",
    name: "Black Opium",
    description: "An addictive gourmand fragrance with coffee and vanilla",
    notes: ["Coffee", "Vanilla", "White Flowers", "Cedar", "Patchouli"],
    categories: ["Gourmand", "Oriental"],
    image: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=200"
  },
  {
    id: 6,
    brand: "Creed",
    name: "Aventus",
    description: "A sophisticated masculine fragrance with fruity and smoky notes",
    notes: ["Pineapple", "Birch", "Musk", "Oakmoss", "Ambergris"],
    categories: ["Fresh", "Woody", "Smoky"],
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=200"
  },
  {
    id: 7,
    brand: "Marc Jacobs",
    name: "Daisy",
    description: "A playful and feminine fragrance with white florals and fruits",
    notes: ["White Violet", "Blood Grapefruit", "Strawberry", "Jasmine", "White Woods"],
    categories: ["Floral", "Fresh", "Citrus"],
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=200"
  },
  {
    id: 8,
    brand: "Thierry Mugler",
    name: "Angel",
    description: "A revolutionary gourmand fragrance with chocolate and caramel",
    notes: ["Chocolate", "Caramel", "Honey", "Red Berries", "Patchouli"],
    categories: ["Gourmand", "Oriental"],
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=200"
  },
  {
    id: 9,
    brand: "Viktor & Rolf",
    name: "Flowerbomb",
    description: "An explosive floral bouquet with oriental warmth",
    notes: ["Tea", "Bergamot", "Freesia", "Orchid", "Rose", "Jasmine", "Patchouli"],
    categories: ["Floral", "Oriental"],
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=200"
  },
  {
    id: 10,
    brand: "Calvin Klein",
    name: "Eternity",
    description: "A timeless fresh fragrance representing eternal love",
    notes: ["Mandarin", "Freesia", "White Lily", "Marigold", "Sandalwood"],
    categories: ["Fresh", "Floral", "Citrus"],
    image: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=200"
  }
];

const SCENT_CATEGORIES = [
  { name: "Floral", description: "Rose, jasmine, lily, and other flower scents" },
  { name: "Woody", description: "Cedar, sandalwood, oak, and forest-like scents" },
  { name: "Citrus", description: "Lemon, orange, bergamot, and zesty fresh scents" },
  { name: "Oriental", description: "Spices, amber, incense, and exotic warm scents" },
  { name: "Fresh", description: "Clean, aquatic, and airy light scents" },
  { name: "Spicy", description: "Pepper, cinnamon, clove, and warming spices" },
  { name: "Gourmand", description: "Vanilla, chocolate, caramel, and edible scents" }
];

function App() {
  const [currentStep, setCurrentStep] = useState('welcome');
  const [preferences, setPreferences] = useState({
    categories: [],
    intensity: 'medium',
    occasion: '',
    gender: ''
  });
  const [recommendations, setRecommendations] = useState([]);
  const [showNotepad, setShowNotepad] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const handleCategoryToggle = (category) => {
    setPreferences(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const generateRecommendations = () => {
    let scored = PERFUME_DATABASE.map(perfume => {
      let score = 0;
      
      // Score based on category matches
      const categoryMatches = perfume.categories.filter(cat => 
        preferences.categories.includes(cat)
      ).length;
      score += categoryMatches * 10;
      
      // Bonus for multiple category matches
      if (categoryMatches > 1) score += 5;
      
      // Add some randomness for variety
      score += Math.random() * 3;
      
      return { ...perfume, score };
    });
    
    // Sort by score and take top 3
    scored.sort((a, b) => b.score - a.score);
    setRecommendations(scored.slice(0, 3));
    setCurrentStep('results');
  };

  const resetQuiz = () => {
    setCurrentStep('welcome');
    setPreferences({ categories: [], intensity: 'medium', occasion: '', gender: '' });
    setRecommendations([]);
  };

  const DesktopIcon = ({ icon, label, x, y, onDoubleClick }) => (
    <div 
      className="desktop-icon" 
      style={{ left: x, top: y }}
      onDoubleClick={onDoubleClick}
    >
      <div className="desktop-icon-image">{icon}</div>
      <div className="desktop-icon-label">{label}</div>
    </div>
  );

  const Notepad = () => (
    <div className="window notepad-window" style={{ position: 'absolute', left: '50px', top: '50px', width: '350px', zIndex: 5 }}>
      <div className="title-bar">
        <div className="title-bar-text">Notepad - Fragrance Notes.txt</div>
        <div className="title-bar-controls">
          <button className="title-bar-control" aria-label="Minimize"></button>
          <button className="title-bar-control" aria-label="Maximize"></button>
          <button className="title-bar-control" aria-label="Close" onClick={() => setShowNotepad(false)}>✕</button>
        </div>
      </div>
      <div className="window-body" style={{ padding: '4px' }}>
        <textarea 
          className="notepad-textarea"
          defaultValue={`My Fragrance Notes:
          
• Need something fresh for summer
• Love citrus and floral combinations  
• Avoid heavy oriental scents
• Looking for daily wear perfume
• Budget: $50-150

Favorites so far:
- Light florals ✓
- Citrus bergamot ✓
- Clean ocean scents ✓`}
          readOnly
        />
      </div>
    </div>
  );

  const Calculator = () => (
    <div className="window calculator-window" style={{ position: 'absolute', right: '100px', top: '80px', width: '200px', zIndex: 4 }}>
      <div className="title-bar">
        <div className="title-bar-text">Calculator</div>
        <div className="title-bar-controls">
          <button className="title-bar-control" aria-label="Close" onClick={() => setShowCalculator(false)}>✕</button>
        </div>
      </div>
      <div className="window-body calculator-body">
        <div className="calculator-display">0</div>
        <div className="calculator-buttons">
          {['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+'].map(btn => (
            <button key={btn} className="calculator-btn">{btn}</button>
          ))}
        </div>
      </div>
    </div>
  );

  const AboutDialog = () => (
    <div className="window about-window" style={{ position: 'absolute', left: '150px', top: '120px', width: '300px', zIndex: 6 }}>
      <div className="title-bar">
        <div className="title-bar-text">About Perfume Advisor</div>
        <div className="title-bar-controls">
          <button className="title-bar-control" aria-label="Close" onClick={() => setShowAbout(false)}>✕</button>
        </div>
      </div>
      <div className="window-body" style={{ padding: '12px', textAlign: 'center' }}>
        <div style={{ fontSize: '32px', marginBottom: '8px' }}>🌸</div>
        <h3>Perfume Advisor 97</h3>
        <p>Version 1.0</p>
        <p style={{ fontSize: '9px', margin: '8px 0' }}>
          Advanced fragrance recommendation system using scent profiling technology.
        </p>
        <p style={{ fontSize: '9px' }}>© 1997 FragranceTech Systems</p>
        <button className="btn-primary" onClick={() => setShowAbout(false)} style={{ marginTop: '8px' }}>OK</button>
      </div>
    </div>
  );

  const WelcomeScreen = () => (
    <div className="window main-window">
      <div className="title-bar">
        <div className="title-bar-text">Perfume Advisor 97</div>
        <div className="title-bar-controls">
          <button className="title-bar-control" aria-label="Minimize"></button>
          <button className="title-bar-control" aria-label="Maximize"></button>
          <button className="title-bar-control" aria-label="Close"></button>
        </div>
      </div>
      <div className="window-body">
        <div className="welcome-content">
          <div className="icon-section">
            <div className="perfume-icon">🌸</div>
          </div>
          <h1>Welcome to Perfume Advisor 97</h1>
          <p>Find your perfect fragrance based on your scent preferences!</p>
          <p>This program will analyze your favorite scent categories and recommend 3 perfumes that match your taste.</p>
          <div className="button-section">
            <button className="btn-primary" onClick={() => setCurrentStep('questionnaire')}>
              Start Fragrance Analysis
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const QuestionnaireScreen = () => (
    <div className="window main-window">
      <div className="title-bar">
        <div className="title-bar-text">Scent Profile Questionnaire</div>
        <div className="title-bar-controls">
          <button className="title-bar-control" aria-label="Minimize"></button>
          <button className="title-bar-control" aria-label="Maximize"></button>
          <button className="title-bar-control" aria-label="Close"></button>
        </div>
      </div>
      <div className="window-body">
        <div className="questionnaire-content">
          <h2>Select your favorite scent categories:</h2>
          <div className="category-grid">
            {SCENT_CATEGORIES.map(category => (
              <div 
                key={category.name}
                className={`category-card ${preferences.categories.includes(category.name) ? 'selected' : ''}`}
                onClick={() => handleCategoryToggle(category.name)}
              >
                <div className="category-name">{category.name}</div>
                <div className="category-desc">{category.description}</div>
                <div className="checkbox">
                  {preferences.categories.includes(category.name) ? '✓' : ''}
                </div>
              </div>
            ))}
          </div>
          
          <div className="form-section">
            <label>Preferred Intensity:</label>
            <select 
              value={preferences.intensity} 
              onChange={(e) => setPreferences({...preferences, intensity: e.target.value})}
            >
              <option value="light">Light & Subtle</option>
              <option value="medium">Medium Strength</option>
              <option value="strong">Strong & Bold</option>
            </select>
          </div>

          <div className="form-section">
            <label>Primary Occasion:</label>
            <select 
              value={preferences.occasion} 
              onChange={(e) => setPreferences({...preferences, occasion: e.target.value})}
            >
              <option value="">Select occasion...</option>
              <option value="daily">Daily Wear</option>
              <option value="work">Professional/Work</option>
              <option value="evening">Evening/Date</option>
              <option value="special">Special Events</option>
            </select>
          </div>

          <div className="button-section">
            <button className="btn-secondary" onClick={resetQuiz}>Back</button>
            <button 
              className="btn-primary" 
              onClick={generateRecommendations}
              disabled={preferences.categories.length === 0}
            >
              Get My Recommendations
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ResultsScreen = () => (
    <div className="window main-window">
      <div className="title-bar">
        <div className="title-bar-text">Your Perfume Recommendations</div>
        <div className="title-bar-controls">
          <button className="title-bar-control" aria-label="Minimize"></button>
          <button className="title-bar-control" aria-label="Maximize"></button>
          <button className="title-bar-control" aria-label="Close"></button>
        </div>
      </div>
      <div className="window-body">
        <div className="results-content">
          <h2>🎯 Perfect Matches for You!</h2>
          <p>Based on your preferences: <strong>{preferences.categories.join(', ')}</strong></p>
          
          <div className="recommendations">
            {recommendations.map((perfume, index) => (
              <div key={perfume.id} className="perfume-card">
                <div className="rank">#{index + 1}</div>
                <div className="perfume-info">
                  <img src={perfume.image} alt={perfume.name} className="perfume-image" />
                  <div className="perfume-details">
                    <h3>{perfume.brand} - {perfume.name}</h3>
                    <p>{perfume.description}</p>
                    <div className="notes">
                      <strong>Key Notes:</strong> {perfume.notes.join(', ')}
                    </div>
                    <div className="categories">
                      {perfume.categories.map(cat => (
                        <span key={cat} className={`category-tag ${preferences.categories.includes(cat) ? 'match' : ''}`}>
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="button-section">
            <button className="btn-primary" onClick={resetQuiz}>
              Try Another Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="App">
      <div className="desktop-background">
        {/* Desktop Icons */}
        <DesktopIcon icon="💻" label="My Computer" x="20px" y="20px" />
        <DesktopIcon icon="🗑️" label="Recycle Bin" x="20px" y="100px" />
        <DesktopIcon icon="📁" label="My Documents" x="20px" y="180px" />
        <DesktopIcon icon="📄" label="Fragrance Notes" x="20px" y="260px" onDoubleClick={() => setShowNotepad(true)} />
        <DesktopIcon icon="🧮" label="Calculator" x="20px" y="340px" onDoubleClick={() => setShowCalculator(true)} />
        <DesktopIcon icon="ℹ️" label="About" x="20px" y="420px" onDoubleClick={() => setShowAbout(true)} />
        
        {/* Background Windows */}
        {showNotepad && <Notepad />}
        {showCalculator && <Calculator />}
        {showAbout && <AboutDialog />}
        
        {/* Taskbar */}
        <div className="taskbar">
          <div className="start-button">
            <div className="windows-flag">
              <div className="flag-red"></div>
              <div className="flag-green"></div>
              <div className="flag-blue"></div>
              <div className="flag-yellow"></div>
            </div>
            Start
          </div>
          <div className="taskbar-apps">
            <div className="taskbar-app active">Perfume Advisor 97</div>
            {showNotepad && <div className="taskbar-app">Notepad</div>}
            {showCalculator && <div className="taskbar-app">Calculator</div>}
          </div>
          <div className="taskbar-time">
            {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </div>
        </div>
        
        {/* Main Application Window */}
        <div className="desktop-content">
          {currentStep === 'welcome' && <WelcomeScreen />}
          {currentStep === 'questionnaire' && <QuestionnaireScreen />}
          {currentStep === 'results' && <ResultsScreen />}
        </div>
      </div>
    </div>
  );
}

export default App;