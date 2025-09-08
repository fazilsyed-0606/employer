import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, createContext, useContext } from 'react';

// Import components
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Registration from './pages/Registration';
import ProfileCreation from './pages/ProfileCreation';
import Dashboard from './pages/Dashboard';
import AppointmentScheduling from './pages/AppointmentScheduling';
import EmployerProfiles from './pages/EmployerProfiles';
import JobApplication from './pages/JobApplication';
import HealthCheck from './pages/HealthCheck';
import Training from './pages/Training';
import FAQ from './pages/FAQ';

// Create Context for global state
const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

function App() {
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState('en');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const contextValue = {
    user,
    setUser,
    language,
    setLanguage,
    isAuthenticated,
    setIsAuthenticated
  };

  return (
    <AppContext.Provider value={contextValue}>
      <Router>
        <div className="min-h-screen bg-gray-50 font-inter">
          <Navigation />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/profile-creation" element={<ProfileCreation />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/appointment" element={<AppointmentScheduling />} />
              <Route path="/employers" element={<EmployerProfiles />} />
              <Route path="/job-application/:employerId" element={<JobApplication />} />
              <Route path="/health-check" element={<HealthCheck />} />
              <Route path="/training" element={<Training />} />
              <Route path="/faq" element={<FAQ />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;