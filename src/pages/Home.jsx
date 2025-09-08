import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { QrCode, Globe, Heart, Shield, Users, Trophy, ChevronRight, Star, CheckCircle, ArrowRight } from 'lucide-react';
import { useAppContext } from '../App';

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const { setUser, setIsAuthenticated } = useAppContext();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login - in real app, this would be API call
    setUser({ name: 'John Doe', email: loginForm.email });
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  const handleSocialLogin = (provider) => {
    // Mock social login
    setUser({ name: 'John Doe', email: `user@${provider}.com` });
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  const features = [
    {
      icon: <Heart className="w-8 h-8 text-primary-600" />,
      title: 'Healthcare Excellence',
      description: 'Connect with top-rated healthcare institutions worldwide'
    },
    {
      icon: <Shield className="w-8 h-8 text-secondary-600" />,
      title: 'Secure Process',
      description: 'End-to-end encrypted and verified application process'
    },
    {
      icon: <Users className="w-8 h-8 text-accent-600" />,
      title: 'Expert Support',
      description: '24/7 multilingual support throughout your journey'
    },
    {
      icon: <Trophy className="w-8 h-8 text-warning-600" />,
      title: 'Career Growth',
      description: 'Access to continuous training and development programs'
    }
  ];

  const testimonials = [
    {
      name: 'Maria Santos',
      role: 'ICU Nurse',
      country: 'Philippines → Germany',
      image: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      quote: 'NurseConnect made my transition to Germany seamless. The support team guided me through every step.',
      rating: 5
    },
    {
      name: 'Ahmed Hassan',
      role: 'Emergency Nurse',
      country: 'Egypt → Netherlands',
      image: 'https://images.pexels.com/photos/6129967/pexels-photo-6129967.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      quote: 'The training program prepared me perfectly for the European healthcare system. Highly recommended!',
      rating: 5
    },
    {
      name: 'Priya Patel',
      role: 'Pediatric Nurse',
      country: 'India → UK',
      image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      quote: 'Amazing platform! I found my dream job and received excellent career guidance throughout the process.',
      rating: 5
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Register & Verify',
      description: 'Create your profile and verify your nursing credentials'
    },
    {
      number: '02',
      title: 'Match & Apply',
      description: 'Get matched with suitable employers and submit applications'
    },
    {
      number: '03',
      title: 'Interview & Contract',
      description: 'Complete interviews and sign your employment contract'
    },
    {
      number: '04',
      title: 'Training & Placement',
      description: 'Complete language training and start your new career'
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-16 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left animate-slide-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">Nursing Career</span> Journey With Us
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Connect with top healthcare institutions worldwide and take the next step in your nursing career. 
                We provide comprehensive support from application to employment.
              </p>

              {!showLogin ? (
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                  <Link to="/registration" className="btn-primary text-lg px-8 py-4">
                    Get Started Today
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                  <button 
                    onClick={() => setShowLogin(true)}
                    className="btn-outline text-lg px-8 py-4"
                  >
                    Sign In
                  </button>
                </div>
              ) : (
                <div className="bg-white p-6 rounded-2xl shadow-large border border-gray-100 mb-8">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="form-label">Email Address</label>
                      <input
                        type="email"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                        className="form-input"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                        className="form-input"
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                    <button type="submit" className="btn-primary w-full">
                      Sign In
                    </button>
                  </form>
                  
                  <div className="mt-4">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-3 gap-3">
                      <button 
                        onClick={() => handleSocialLogin('google')}
                        className="btn-secondary flex justify-center items-center text-sm py-2"
                      >
                        <span className="mr-2">🔍</span> Google
                      </button>
                      <button 
                        onClick={() => handleSocialLogin('apple')}
                        className="btn-secondary flex justify-center items-center text-sm py-2"
                      >
                        <span className="mr-2">🍎</span> Apple
                      </button>
                      <button 
                        onClick={() => handleSocialLogin('facebook')}
                        className="btn-secondary flex justify-center items-center text-sm py-2"
                      >
                        <span className="mr-2">📘</span> Facebook
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <button 
                      onClick={() => setShowLogin(false)}
                      className="text-sm text-primary-600 hover:text-primary-700"
                    >
                      Back to main page
                    </button>
                  </div>
                </div>
              )}

              {/* QR Code Download */}
              <div className="flex items-center justify-center lg:justify-start space-x-4 p-4 bg-white rounded-2xl shadow-soft border border-gray-100">
                <QrCode className="w-12 h-12 text-gray-400" />
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">Download Our App</p>
                  <p className="text-xs text-gray-500">Scan QR code for iOS & Android</p>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative z-10 bg-white rounded-3xl shadow-2xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/5327658/pexels-photo-5327658.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                  alt="Healthcare professionals"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-100 rounded-full opacity-60"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-secondary-100 rounded-full opacity-40"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose NurseConnect?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive support throughout your international nursing career journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card p-8 text-center hover:shadow-medium transition-all duration-300 group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple steps to launch your international nursing career
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full text-white font-bold text-lg mb-6">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full">
                    <ChevronRight className="w-6 h-6 text-gray-300 mx-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/registration" className="btn-primary text-lg px-8 py-4">
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from nurses who transformed their careers with NurseConnect
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card p-8 text-center">
                <div className="mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <blockquote className="text-gray-600 italic mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                  <div className="text-sm text-primary-600 font-medium">{testimonial.country}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">5000+</div>
              <div className="text-primary-100">Nurses Placed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">200+</div>
              <div className="text-primary-100">Healthcare Partners</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="text-primary-100">Countries</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-primary-100">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your International Nursing Career?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join thousands of nurses who have successfully launched their international careers through our platform. 
            Your dream job is just a few clicks away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/registration" className="btn-primary text-lg px-8 py-4">
              Register Now - It's Free
            </Link>
            <Link to="/employers" className="btn-outline text-lg px-8 py-4">
              Browse Available Jobs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;