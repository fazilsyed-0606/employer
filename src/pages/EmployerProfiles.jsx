import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, Users, Clock, Heart, Filter, Search, Building2, 
  Briefcase, Globe, Star, ChevronRight, Award, TrendingUp
} from 'lucide-react';

const EmployerProfiles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    country: '',
    specialization: '',
    employmentType: '',
    salaryRange: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  // Mock employer data
  const employers = [
    {
      id: 1,
      name: 'Medicare Hospital Berlin',
      logo: 'https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      country: 'Germany',
      city: 'Berlin',
      rating: 4.8,
      employees: '2000+',
      founded: '1985',
      description: 'Leading medical center specializing in advanced healthcare services with state-of-the-art facilities.',
      specialties: ['Cardiology', 'Neurology', 'Oncology', 'Pediatrics'],
      benefits: ['Health Insurance', 'Pension Plan', 'Training Programs', 'Relocation Support'],
      openPositions: [
        {
          id: 1,
          title: 'ICU Nurse',
          type: 'Full-time',
          salary: '€45,000 - €55,000',
          posted: '2 days ago'
        },
        {
          id: 2,
          title: 'Surgical Nurse',
          type: 'Full-time',
          salary: '€42,000 - €50,000',
          posted: '1 week ago'
        },
        {
          id: 3,
          title: 'Emergency Nurse',
          type: 'Full-time',
          salary: '€48,000 - €58,000',
          posted: '3 days ago'
        }
      ]
    },
    {
      id: 2,
      name: 'St. Mary\'s Medical Center',
      logo: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      country: 'Germany',
      city: 'Munich',
      rating: 4.6,
      employees: '1500+',
      founded: '1978',
      description: 'Comprehensive healthcare provider committed to excellence in patient care and nursing professional development.',
      specialties: ['General Medicine', 'Surgery', 'Maternity', 'Geriatrics'],
      benefits: ['Competitive Salary', 'Career Development', 'Work-Life Balance', 'International Environment'],
      openPositions: [
        {
          id: 4,
          title: 'General Nurse',
          type: 'Full-time',
          salary: '€40,000 - €48,000',
          posted: '1 day ago'
        },
        {
          id: 5,
          title: 'Maternity Nurse',
          type: 'Part-time',
          salary: '€35,000 - €42,000',
          posted: '5 days ago'
        }
      ]
    },
    {
      id: 3,
      name: 'Amsterdam Medical Institute',
      logo: 'https://images.pexels.com/photos/2324837/pexels-photo-2324837.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      country: 'Netherlands',
      city: 'Amsterdam',
      rating: 4.9,
      employees: '3000+',
      founded: '1962',
      description: 'Internationally recognized medical institute offering cutting-edge treatments and excellent career opportunities.',
      specialties: ['Research', 'Cardiothoracic', 'Transplantation', 'Intensive Care'],
      benefits: ['Research Opportunities', 'International Exposure', 'Dutch Language Classes', 'Housing Assistance'],
      openPositions: [
        {
          id: 6,
          title: 'Research Nurse',
          type: 'Full-time',
          salary: '€52,000 - €62,000',
          posted: '4 days ago'
        },
        {
          id: 7,
          title: 'Cardiac Care Nurse',
          type: 'Full-time',
          salary: '€50,000 - €60,000',
          posted: '1 week ago'
        }
      ]
    },
    {
      id: 4,
      name: 'Royal London Hospital',
      logo: 'https://images.pexels.com/photos/1170979/pexels-photo-1170979.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      country: 'United Kingdom',
      city: 'London',
      rating: 4.7,
      employees: '4000+',
      founded: '1740',
      description: 'Historic hospital with modern facilities, renowned for clinical excellence and nursing education programs.',
      specialties: ['Trauma Care', 'Emergency Medicine', 'Cancer Treatment', 'Teaching Hospital'],
      benefits: ['NHS Benefits', 'Continuous Education', 'Career Progression', 'Visa Sponsorship'],
      openPositions: [
        {
          id: 8,
          title: 'Trauma Nurse',
          type: 'Full-time',
          salary: '£32,000 - £38,000',
          posted: '2 days ago'
        },
        {
          id: 9,
          title: 'Oncology Nurse',
          type: 'Full-time',
          salary: '£34,000 - £42,000',
          posted: '6 days ago'
        }
      ]
    },
    {
      id: 5,
      name: 'Geneva University Hospital',
      logo: 'https://images.pexels.com/photos/2324838/pexels-photo-2324838.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      country: 'Switzerland',
      city: 'Geneva',
      rating: 4.8,
      employees: '2500+',
      founded: '1856',
      description: 'Premier university hospital combining medical excellence with innovative research and international collaboration.',
      specialties: ['University Medicine', 'Research', 'Specialty Care', 'International Medicine'],
      benefits: ['Swiss Standards', 'Multilingual Environment', 'Research Participation', 'Excellent Benefits'],
      openPositions: [
        {
          id: 10,
          title: 'Clinical Research Nurse',
          type: 'Full-time',
          salary: 'CHF 70,000 - CHF 85,000',
          posted: '3 days ago'
        }
      ]
    },
    {
      id: 6,
      name: 'Karolinska University Hospital',
      logo: 'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      country: 'Sweden',
      city: 'Stockholm',
      rating: 4.9,
      employees: '1800+',
      founded: '1940',
      description: 'World-renowned university hospital known for Nobel Prize connections and exceptional healthcare standards.',
      specialties: ['Nobel Medicine', 'Advanced Surgery', 'Pediatric Care', 'Mental Health'],
      benefits: ['Swedish Benefits', 'Work-Life Balance', 'Innovation Focus', 'Nordic Lifestyle'],
      openPositions: [
        {
          id: 11,
          title: 'Pediatric Nurse',
          type: 'Full-time',
          salary: 'SEK 420,000 - SEK 480,000',
          posted: '1 day ago'
        },
        {
          id: 12,
          title: 'Mental Health Nurse',
          type: 'Full-time',
          salary: 'SEK 400,000 - SEK 460,000',
          posted: '4 days ago'
        }
      ]
    }
  ];

  const countries = ['Germany', 'Netherlands', 'United Kingdom', 'Switzerland', 'Sweden', 'Belgium', 'France'];
  const specializations = ['General Nursing', 'ICU/Critical Care', 'Emergency', 'Surgical', 'Pediatric', 'Oncology', 'Cardiac', 'Research'];
  const employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Temporary'];
  const salaryRanges = ['€30,000 - €40,000', '€40,000 - €50,000', '€50,000 - €60,000', '€60,000+'];

  const filteredEmployers = employers.filter(employer => {
    const matchesSearch = employer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employer.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employer.country.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCountry = !filters.country || employer.country === filters.country;
    const matchesSpecialization = !filters.specialization || 
                                 employer.specialties.some(spec => spec.toLowerCase().includes(filters.specialization.toLowerCase()));
    
    return matchesSearch && matchesCountry && matchesSpecialization;
  });

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Healthcare Employers
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover leading healthcare institutions across Europe and find your perfect nursing opportunity
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="card p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search employers, locations, specialties..."
                  className="form-input pl-12"
                />
              </div>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-outline flex items-center"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="form-label">Country</label>
                <select
                  value={filters.country}
                  onChange={(e) => setFilters({...filters, country: e.target.value})}
                  className="form-input"
                >
                  <option value="">All Countries</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label">Specialization</label>
                <select
                  value={filters.specialization}
                  onChange={(e) => setFilters({...filters, specialization: e.target.value})}
                  className="form-input"
                >
                  <option value="">All Specializations</option>
                  {specializations.map(spec => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label">Employment Type</label>
                <select
                  value={filters.employmentType}
                  onChange={(e) => setFilters({...filters, employmentType: e.target.value})}
                  className="form-input"
                >
                  <option value="">All Types</option>
                  {employmentTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label">Salary Range</label>
                <select
                  value={filters.salaryRange}
                  onChange={(e) => setFilters({...filters, salaryRange: e.target.value})}
                  className="form-input"
                >
                  <option value="">All Ranges</option>
                  {salaryRanges.map(range => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card p-6 text-center">
            <Building2 className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{filteredEmployers.length}</div>
            <div className="text-sm text-gray-600">Healthcare Institutions</div>
          </div>
          <div className="card p-6 text-center">
            <Briefcase className="w-8 h-8 text-secondary-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {filteredEmployers.reduce((total, emp) => total + emp.openPositions.length, 0)}
            </div>
            <div className="text-sm text-gray-600">Open Positions</div>
          </div>
          <div className="card p-6 text-center">
            <Globe className="w-8 h-8 text-accent-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{countries.length}</div>
            <div className="text-sm text-gray-600">Countries</div>
          </div>
          <div className="card p-6 text-center">
            <TrendingUp className="w-8 h-8 text-warning-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">95%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>
        </div>

        {/* Employer Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredEmployers.map(employer => (
            <div key={employer.id} className="card hover:shadow-large transition-all duration-300">
              {/* Employer Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start space-x-4">
                  <img
                    src={employer.logo}
                    alt={employer.name}
                    className="w-16 h-16 rounded-xl object-cover border-2 border-gray-100"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{employer.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {employer.city}, {employer.country}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {employer.employees}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        {renderStars(employer.rating)}
                      </div>
                      <span className="text-sm font-medium text-gray-700">{employer.rating}</span>
                      <span className="text-sm text-gray-500">• Est. {employer.founded}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mt-4 leading-relaxed">{employer.description}</p>
              </div>

              {/* Specialties */}
              <div className="p-6 border-b border-gray-100">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Medical Specialties</h4>
                <div className="flex flex-wrap gap-2">
                  {employer.specialties.map(specialty => (
                    <span key={specialty} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="p-6 border-b border-gray-100">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Employee Benefits</h4>
                <div className="grid grid-cols-2 gap-2">
                  {employer.benefits.map(benefit => (
                    <div key={benefit} className="flex items-center text-sm text-gray-600">
                      <Award className="w-4 h-4 text-accent-600 mr-2 flex-shrink-0" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>

              {/* Open Positions */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-semibold text-gray-900">
                    Open Positions ({employer.openPositions.length})
                  </h4>
                  <Link 
                    to={`/job-application/${employer.id}`}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    View All
                  </Link>
                </div>
                <div className="space-y-3">
                  {employer.openPositions.slice(0, 3).map(position => (
                    <div key={position.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="flex-1">
                        <h5 className="text-sm font-medium text-gray-900">{position.title}</h5>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-gray-600">{position.type}</span>
                          <span className="text-xs font-medium text-primary-600">{position.salary}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">{position.posted}</span>
                        <Link 
                          to={`/job-application/${employer.id}?position=${position.id}`}
                          className="btn-primary text-xs px-3 py-1"
                        >
                          Apply
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEmployers.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No employers found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 card p-8 bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Apply?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Complete your profile to unlock applications to these amazing healthcare institutions. 
              Our team will guide you through every step of the process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/profile-creation" className="btn-primary">
                Complete Your Profile
              </Link>
              <Link to="/dashboard" className="btn-outline">
                View Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerProfiles;