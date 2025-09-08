import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Globe, User, LogOut, Bell } from 'lucide-react';
import { useAppContext } from '../App';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, setIsAuthenticated, language, setLanguage } = useAppContext();

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'id', name: 'Bahasa', flag: '🇮🇩' }
  ];

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
    setIsMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-soft border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">NC</span>
              </div>
              <span className="text-xl font-bold text-gray-900 hidden sm:block">NurseConnect</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`${
                    isActive('/dashboard')
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-700 hover:text-primary-600'
                  } px-3 py-2 text-sm font-medium transition-colors`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/employers"
                  className={`${
                    isActive('/employers')
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-700 hover:text-primary-600'
                  } px-3 py-2 text-sm font-medium transition-colors`}
                >
                  Jobs
                </Link>
                <Link
                  to="/training"
                  className={`${
                    isActive('/training')
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-700 hover:text-primary-600'
                  } px-3 py-2 text-sm font-medium transition-colors`}
                >
                  Training
                </Link>
                <div className="relative">
                  <Bell className="w-5 h-5 text-gray-700 hover:text-primary-600 cursor-pointer" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-error-500 rounded-full"></div>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className={`${
                    isActive('/')
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-700 hover:text-primary-600'
                  } px-3 py-2 text-sm font-medium transition-colors`}
                >
                  Home
                </Link>
                <Link
                  to="/employers"
                  className={`${
                    isActive('/employers')
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-700 hover:text-primary-600'
                  } px-3 py-2 text-sm font-medium transition-colors`}
                >
                  Browse Jobs
                </Link>
                <Link
                  to="/faq"
                  className={`${
                    isActive('/faq')
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-700 hover:text-primary-600'
                  } px-3 py-2 text-sm font-medium transition-colors`}
                >
                  FAQ
                </Link>
              </>
            )}

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {languages.find(l => l.code === language)?.flag} {languages.find(l => l.code === language)?.code.toUpperCase()}
                </span>
              </button>
              
              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-large border border-gray-100 py-1 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangOpen(false);
                      }}
                      className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Actions */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-700" />
                  <span className="text-sm font-medium text-gray-700">
                    {user?.name || 'User'}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-error-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/" className="btn-secondary">
                  Login
                </Link>
                <Link to="/registration" className="btn-primary">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-600 focus:outline-none"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-700 hover:text-primary-600 px-4 py-2 text-base font-medium"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/employers"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-700 hover:text-primary-600 px-4 py-2 text-base font-medium"
                  >
                    Jobs
                  </Link>
                  <Link
                    to="/training"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-700 hover:text-primary-600 px-4 py-2 text-base font-medium"
                  >
                    Training
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-error-600 px-4 py-2 text-base font-medium text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-700 hover:text-primary-600 px-4 py-2 text-base font-medium"
                  >
                    Home
                  </Link>
                  <Link
                    to="/employers"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-700 hover:text-primary-600 px-4 py-2 text-base font-medium"
                  >
                    Browse Jobs
                  </Link>
                  <Link
                    to="/faq"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-700 hover:text-primary-600 px-4 py-2 text-base font-medium"
                  >
                    FAQ
                  </Link>
                  <div className="px-4 py-2 space-y-2">
                    <Link
                      to="/"
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full text-center btn-secondary"
                    >
                      Login
                    </Link>
                    <Link
                      to="/registration"
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full text-center btn-primary"
                    >
                      Register
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;