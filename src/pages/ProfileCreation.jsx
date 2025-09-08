import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Briefcase, Heart, Upload, Camera, Save, ChevronLeft, ChevronRight,
  Award, Calendar, MapPin, FileText, CheckCircle, AlertCircle, Book,
  GraduationCap, Globe, Languages, Clock, Building
} from 'lucide-react';

const ProfileCreation = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState({
    // Personal Information
    personalInfo: {
      profilePicture: null,
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      nationality: '',
      currentLocation: '',
      aboutMe: ''
    },
    // Professional Information
    professionalInfo: {
      currentTitle: '',
      yearsOfExperience: '',
      qualification: '',
      institution: '',
      graduationYear: '',
      specializations: [],
      workHistory: [
        {
          position: '',
          hospital: '',
          location: '',
          startDate: '',
          endDate: '',
          description: ''
        }
      ],
      licenses: [
        {
          name: '',
          issuingAuthority: '',
          issueDate: '',
          expiryDate: '',
          licenseNumber: ''
        }
      ]
    },
    // Languages & Skills
    languages: [
      {
        language: '',
        proficiency: ''
      }
    ],
    skills: {
      clinicalSkills: [],
      technicalSkills: [],
      softSkills: []
    },
    // Career Interests
    interests: {
      preferredCountries: [],
      preferredSpecializations: [],
      employmentType: [],
      salaryExpectation: '',
      availabilityDate: ''
    },
    // Documents
    documents: {
      resume: null,
      certificates: [],
      transcripts: null,
      passport: null,
      photos: []
    }
  });

  const [uploadProgress, setUploadProgress] = useState({});
  const [errors, setErrors] = useState({});

  const steps = [
    { id: 1, title: 'Personal Info', icon: <User className="w-5 h-5" /> },
    { id: 2, title: 'Professional', icon: <Briefcase className="w-5 h-5" /> },
    { id: 3, title: 'Skills & Languages', icon: <Globe className="w-5 h-5" /> },
    { id: 4, title: 'Career Interests', icon: <Heart className="w-5 h-5" /> },
    { id: 5, title: 'Documents', icon: <FileText className="w-5 h-5" /> }
  ];

  const countries = [
    'Germany', 'Netherlands', 'United Kingdom', 'Switzerland', 'Austria',
    'Belgium', 'France', 'Sweden', 'Norway', 'Denmark', 'Finland'
  ];

  const specializations = [
    'General Nursing', 'ICU/Critical Care', 'Emergency Nursing', 'Surgical Nursing',
    'Pediatric Nursing', 'Geriatric Nursing', 'Mental Health Nursing', 'Oncology Nursing',
    'Cardiac Nursing', 'Orthopedic Nursing', 'Maternity Nursing', 'Community Health'
  ];

  const clinicalSkills = [
    'Patient Assessment', 'Medication Administration', 'IV Therapy', 'Wound Care',
    'Vital Signs Monitoring', 'CPR/BLS', 'ACLS', 'Patient Education', 'Infection Control',
    'Emergency Response', 'Documentation', 'Care Planning'
  ];

  const technicalSkills = [
    'Electronic Health Records', 'Medical Equipment Operation', 'Telemetry Monitoring',
    'Ventilator Management', 'Dialysis', 'Chemotherapy Administration', 'Medical Software',
    'Laboratory Procedures', 'Diagnostic Testing', 'Medical Imaging'
  ];

  const softSkills = [
    'Communication', 'Team Collaboration', 'Leadership', 'Problem Solving',
    'Time Management', 'Cultural Sensitivity', 'Empathy', 'Adaptability',
    'Stress Management', 'Critical Thinking', 'Patient Advocacy', 'Mentoring'
  ];

  const languages = [
    'English', 'German', 'Dutch', 'French', 'Spanish', 'Italian', 'Portuguese',
    'Arabic', 'Hindi', 'Tagalog', 'Indonesian', 'Thai', 'Vietnamese', 'Mandarin'
  ];

  const proficiencyLevels = [
    'Basic (A1-A2)', 'Intermediate (B1-B2)', 'Advanced (C1)', 'Native (C2)'
  ];

  const handleInputChange = (section, field, value, index = null) => {
    if (index !== null) {
      // Handle array updates
      setProfileData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: prev[section][field].map((item, i) => 
            i === index ? { ...item, ...value } : item
          )
        }
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    }
  };

  const addArrayItem = (section, field, emptyItem) => {
    setProfileData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: [...prev[section][field], emptyItem]
      }
    }));
  };

  const removeArrayItem = (section, field, index) => {
    setProfileData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: prev[section][field].filter((_, i) => i !== index)
      }
    }));
  };

  const handleFileUpload = (section, field, file) => {
    // Mock file upload
    setUploadProgress(prev => ({ ...prev, [`${section}-${field}`]: 0 }));
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const key = `${section}-${field}`;
        const progress = prev[key] + 10;
        
        if (progress >= 100) {
          clearInterval(interval);
          setProfileData(prevData => ({
            ...prevData,
            [section]: {
              ...prevData[section],
              [field]: file
            }
          }));
          return { ...prev, [key]: 100 };
        }
        
        return { ...prev, [key]: progress };
      });
    }, 100);
  };

  const validateStep = (step) => {
    const stepErrors = {};
    
    switch (step) {
      case 1:
        if (!profileData.personalInfo.firstName) stepErrors.firstName = 'First name is required';
        if (!profileData.personalInfo.lastName) stepErrors.lastName = 'Last name is required';
        if (!profileData.personalInfo.dateOfBirth) stepErrors.dateOfBirth = 'Date of birth is required';
        break;
      case 2:
        if (!profileData.professionalInfo.currentTitle) stepErrors.currentTitle = 'Current title is required';
        if (!profileData.professionalInfo.yearsOfExperience) stepErrors.yearsOfExperience = 'Experience is required';
        break;
      case 4:
        if (profileData.interests.preferredCountries.length === 0) stepErrors.preferredCountries = 'Select at least one country';
        break;
    }
    
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(5)) {
      // Mock profile creation
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }
  };

  const toggleArrayValue = (section, field, value) => {
    const currentValues = profileData[section][field];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    handleInputChange(section, field, newValues);
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      {/* Profile Picture */}
      <div className="text-center">
        <div className="relative inline-block">
          <div className="w-32 h-32 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4 overflow-hidden">
            {profileData.personalInfo.profilePicture ? (
              <img src={URL.createObjectURL(profileData.personalInfo.profilePicture)} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <Camera className="w-12 h-12 text-gray-400" />
            )}
          </div>
          <label htmlFor="profile-picture" className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full cursor-pointer hover:bg-primary-700 transition-colors">
            <Camera className="w-4 h-4" />
          </label>
          <input
            id="profile-picture"
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload('personalInfo', 'profilePicture', e.target.files[0])}
            className="hidden"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="form-label">First Name *</label>
          <input
            type="text"
            value={profileData.personalInfo.firstName}
            onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
            className={`form-input ${errors.firstName ? 'border-error-500' : ''}`}
            placeholder="Enter your first name"
          />
          {errors.firstName && <p className="mt-1 text-sm text-error-600">{errors.firstName}</p>}
        </div>

        <div>
          <label className="form-label">Last Name *</label>
          <input
            type="text"
            value={profileData.personalInfo.lastName}
            onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
            className={`form-input ${errors.lastName ? 'border-error-500' : ''}`}
            placeholder="Enter your last name"
          />
          {errors.lastName && <p className="mt-1 text-sm text-error-600">{errors.lastName}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="form-label">Date of Birth *</label>
          <input
            type="date"
            value={profileData.personalInfo.dateOfBirth}
            onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)}
            className={`form-input ${errors.dateOfBirth ? 'border-error-500' : ''}`}
          />
          {errors.dateOfBirth && <p className="mt-1 text-sm text-error-600">{errors.dateOfBirth}</p>}
        </div>

        <div>
          <label className="form-label">Gender</label>
          <select
            value={profileData.personalInfo.gender}
            onChange={(e) => handleInputChange('personalInfo', 'gender', e.target.value)}
            className="form-input"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
        </div>

        <div>
          <label className="form-label">Nationality</label>
          <select
            value={profileData.personalInfo.nationality}
            onChange={(e) => handleInputChange('personalInfo', 'nationality', e.target.value)}
            className="form-input"
          >
            <option value="">Select Nationality</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="form-label">Current Location</label>
        <input
          type="text"
          value={profileData.personalInfo.currentLocation}
          onChange={(e) => handleInputChange('personalInfo', 'currentLocation', e.target.value)}
          className="form-input"
          placeholder="City, Country"
        />
      </div>

      <div>
        <label className="form-label">About Me</label>
        <textarea
          value={profileData.personalInfo.aboutMe}
          onChange={(e) => handleInputChange('personalInfo', 'aboutMe', e.target.value)}
          className="form-input min-h-[120px]"
          placeholder="Tell us about yourself, your passion for nursing, and your career goals..."
        />
      </div>
    </div>
  );

  const renderProfessionalInfo = () => (
    <div className="space-y-8">
      {/* Current Position */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Position</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="form-label">Current Title *</label>
            <input
              type="text"
              value={profileData.professionalInfo.currentTitle}
              onChange={(e) => handleInputChange('professionalInfo', 'currentTitle', e.target.value)}
              className={`form-input ${errors.currentTitle ? 'border-error-500' : ''}`}
              placeholder="e.g., Staff Nurse, Charge Nurse"
            />
            {errors.currentTitle && <p className="mt-1 text-sm text-error-600">{errors.currentTitle}</p>}
          </div>

          <div>
            <label className="form-label">Years of Experience *</label>
            <select
              value={profileData.professionalInfo.yearsOfExperience}
              onChange={(e) => handleInputChange('professionalInfo', 'yearsOfExperience', e.target.value)}
              className={`form-input ${errors.yearsOfExperience ? 'border-error-500' : ''}`}
            >
              <option value="">Select Experience</option>
              <option value="0-1">0-1 years</option>
              <option value="2-5">2-5 years</option>
              <option value="6-10">6-10 years</option>
              <option value="11-15">11-15 years</option>
              <option value="15+">15+ years</option>
            </select>
            {errors.yearsOfExperience && <p className="mt-1 text-sm text-error-600">{errors.yearsOfExperience}</p>}
          </div>
        </div>
      </div>

      {/* Education */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Education</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="form-label">Highest Qualification</label>
            <select
              value={profileData.professionalInfo.qualification}
              onChange={(e) => handleInputChange('professionalInfo', 'qualification', e.target.value)}
              className="form-input"
            >
              <option value="">Select Qualification</option>
              <option value="diploma">Diploma in Nursing</option>
              <option value="bachelor">Bachelor of Science in Nursing (BSN)</option>
              <option value="master">Master of Science in Nursing (MSN)</option>
              <option value="doctorate">Doctor of Nursing Practice (DNP)</option>
              <option value="phd">PhD in Nursing</option>
            </select>
          </div>

          <div>
            <label className="form-label">Graduation Year</label>
            <input
              type="number"
              value={profileData.professionalInfo.graduationYear}
              onChange={(e) => handleInputChange('professionalInfo', 'graduationYear', e.target.value)}
              className="form-input"
              placeholder="2020"
              min="1980"
              max={new Date().getFullYear()}
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="form-label">Institution</label>
          <input
            type="text"
            value={profileData.professionalInfo.institution}
            onChange={(e) => handleInputChange('professionalInfo', 'institution', e.target.value)}
            className="form-input"
            placeholder="University or College name"
          />
        </div>
      </div>

      {/* Specializations */}
      <div>
        <label className="form-label">Areas of Specialization</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {specializations.map(spec => (
            <label key={spec} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={profileData.professionalInfo.specializations.includes(spec)}
                onChange={() => toggleArrayValue('professionalInfo', 'specializations', spec)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">{spec}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Work History */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Work History</h3>
          <button
            type="button"
            onClick={() => addArrayItem('professionalInfo', 'workHistory', {
              position: '', hospital: '', location: '', startDate: '', endDate: '', description: ''
            })}
            className="btn-outline text-sm"
          >
            Add Position
          </button>
        </div>
        
        {profileData.professionalInfo.workHistory.map((work, index) => (
          <div key={index} className="card p-6 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="form-label">Position</label>
                <input
                  type="text"
                  value={work.position}
                  onChange={(e) => handleInputChange('professionalInfo', 'workHistory', { position: e.target.value }, index)}
                  className="form-input"
                  placeholder="Job title"
                />
              </div>
              <div>
                <label className="form-label">Hospital/Facility</label>
                <input
                  type="text"
                  value={work.hospital}
                  onChange={(e) => handleInputChange('professionalInfo', 'workHistory', { hospital: e.target.value }, index)}
                  className="form-input"
                  placeholder="Workplace name"
                />
              </div>
              <div>
                <label className="form-label">Location</label>
                <input
                  type="text"
                  value={work.location}
                  onChange={(e) => handleInputChange('professionalInfo', 'workHistory', { location: e.target.value }, index)}
                  className="form-input"
                  placeholder="City, Country"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="form-label">Start Date</label>
                  <input
                    type="date"
                    value={work.startDate}
                    onChange={(e) => handleInputChange('professionalInfo', 'workHistory', { startDate: e.target.value }, index)}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">End Date</label>
                  <input
                    type="date"
                    value={work.endDate}
                    onChange={(e) => handleInputChange('professionalInfo', 'workHistory', { endDate: e.target.value }, index)}
                    className="form-input"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="form-label">Description</label>
              <textarea
                value={work.description}
                onChange={(e) => handleInputChange('professionalInfo', 'workHistory', { description: e.target.value }, index)}
                className="form-input min-h-[80px]"
                placeholder="Describe your responsibilities and achievements..."
              />
            </div>
            {profileData.professionalInfo.workHistory.length > 1 && (
              <button
                type="button"
                onClick={() => removeArrayItem('professionalInfo', 'workHistory', index)}
                className="mt-2 text-sm text-error-600 hover:text-error-700"
              >
                Remove Position
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderSkillsLanguages = () => (
    <div className="space-y-8">
      {/* Languages */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Languages</h3>
          <button
            type="button"
            onClick={() => addArrayItem('languages', '', { language: '', proficiency: '' })}
            className="btn-outline text-sm"
          >
            Add Language
          </button>
        </div>
        
        {profileData.languages.map((lang, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 border border-gray-200 rounded-xl">
            <div>
              <label className="form-label">Language</label>
              <select
                value={lang.language}
                onChange={(e) => handleInputChange('languages', '', { language: e.target.value }, index)}
                className="form-input"
              >
                <option value="">Select Language</option>
                {languages.map(language => (
                  <option key={language} value={language}>{language}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label">Proficiency</label>
              <select
                value={lang.proficiency}
                onChange={(e) => handleInputChange('languages', '', { proficiency: e.target.value }, index)}
                className="form-input"
              >
                <option value="">Select Proficiency</option>
                {proficiencyLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
            {profileData.languages.length > 1 && (
              <div className="col-span-2">
                <button
                  type="button"
                  onClick={() => removeArrayItem('languages', '', index)}
                  className="text-sm text-error-600 hover:text-error-700"
                >
                  Remove Language
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Clinical Skills */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Clinical Skills</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {clinicalSkills.map(skill => (
            <label key={skill} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={profileData.skills.clinicalSkills.includes(skill)}
                onChange={() => toggleArrayValue('skills', 'clinicalSkills', skill)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">{skill}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Technical Skills */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Skills</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {technicalSkills.map(skill => (
            <label key={skill} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={profileData.skills.technicalSkills.includes(skill)}
                onChange={() => toggleArrayValue('skills', 'technicalSkills', skill)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">{skill}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Soft Skills */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Soft Skills</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {softSkills.map(skill => (
            <label key={skill} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={profileData.skills.softSkills.includes(skill)}
                onChange={() => toggleArrayValue('skills', 'softSkills', skill)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">{skill}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCareerInterests = () => (
    <div className="space-y-8">
      {/* Preferred Countries */}
      <div>
        <label className="form-label">Preferred Countries *</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {countries.map(country => (
            <label key={country} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={profileData.interests.preferredCountries.includes(country)}
                onChange={() => toggleArrayValue('interests', 'preferredCountries', country)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">{country}</span>
            </label>
          ))}
        </div>
        {errors.preferredCountries && <p className="mt-1 text-sm text-error-600">{errors.preferredCountries}</p>}
      </div>

      {/* Preferred Specializations */}
      <div>
        <label className="form-label">Preferred Nursing Areas</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {specializations.map(spec => (
            <label key={spec} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={profileData.interests.preferredSpecializations.includes(spec)}
                onChange={() => toggleArrayValue('interests', 'preferredSpecializations', spec)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">{spec}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Employment Type */}
      <div>
        <label className="form-label">Employment Type</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['Full-time', 'Part-time', 'Contract', 'Temporary'].map(type => (
            <label key={type} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={profileData.interests.employmentType.includes(type)}
                onChange={() => toggleArrayValue('interests', 'employmentType', type)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Other Preferences */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="form-label">Salary Expectation (Annual)</label>
          <select
            value={profileData.interests.salaryExpectation}
            onChange={(e) => handleInputChange('interests', 'salaryExpectation', e.target.value)}
            className="form-input"
          >
            <option value="">Select Range</option>
            <option value="30000-40000">€30,000 - €40,000</option>
            <option value="40000-50000">€40,000 - €50,000</option>
            <option value="50000-60000">€50,000 - €60,000</option>
            <option value="60000-70000">€60,000 - €70,000</option>
            <option value="70000+">€70,000+</option>
          </select>
        </div>

        <div>
          <label className="form-label">Availability Date</label>
          <input
            type="date"
            value={profileData.interests.availabilityDate}
            onChange={(e) => handleInputChange('interests', 'availabilityDate', e.target.value)}
            className="form-input"
          />
        </div>
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-8">
      <div className="bg-warning-50 border border-warning-200 rounded-xl p-4 mb-6">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-warning-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-warning-800">Document Upload Currently Locked</h4>
            <p className="text-sm text-warning-700 mt-1">
              Document upload will be unlocked after admin approval of your profile. You'll receive a notification once ready.
            </p>
          </div>
        </div>
      </div>

      {/* Document Checklist */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Documents Checklist</h3>
        <div className="space-y-4">
          {[
            { name: 'Resume/CV', required: true, description: 'Updated professional resume' },
            { name: 'Nursing Diploma/Certificate', required: true, description: 'Official nursing qualification' },
            { name: 'Academic Transcripts', required: true, description: 'Official academic records' },
            { name: 'Passport Copy', required: true, description: 'Valid passport identification' },
            { name: 'Professional License', required: true, description: 'Current nursing license' },
            { name: 'Work Experience Certificates', required: false, description: 'Letters from previous employers' },
            { name: 'Language Certificates', required: false, description: 'IELTS, OET, or other language tests' },
            { name: 'Professional Photo', required: true, description: 'Recent passport-style photo' }
          ].map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">{index + 1}</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    {doc.name} {doc.required && <span className="text-error-600">*</span>}
                  </h4>
                  <p className="text-xs text-gray-600">{doc.description}</p>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                {doc.required ? 'Required' : 'Optional'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Placeholders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          'Resume/CV',
          'Nursing Certificate',
          'Academic Transcripts',
          'Passport Copy'
        ].map((docType, index) => (
          <div key={index} className="card p-6 text-center opacity-50">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">{docType}</h4>
            <button className="btn-secondary text-sm w-full cursor-not-allowed" disabled>
              Upload Locked
            </button>
            <p className="text-xs text-gray-500 mt-2">Available after profile approval</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderPersonalInfo();
      case 2:
        return renderProfessionalInfo();
      case 3:
        return renderSkillsLanguages();
      case 4:
        return renderCareerInterests();
      case 5:
        return renderDocuments();
      default:
        return renderPersonalInfo();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Create Your Professional Profile</h1>
          <p className="text-lg text-gray-600">Help us understand your background and career goals</p>
        </div>

        {/* Progress Steps */}
        <div className="card p-6 mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full mb-2 transition-all ${
                  currentStep >= step.id 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step.icon}
                </div>
                <span className={`text-xs font-medium ${
                  currentStep >= step.id ? 'text-primary-600' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`hidden md:block w-24 h-0.5 mt-6 ${
                    currentStep > step.id ? 'bg-primary-600' : 'bg-gray-200'
                  }`} style={{ position: 'absolute', left: `${(index + 1) * 20}%` }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="card p-8 mb-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {steps.find(step => step.id === currentStep)?.title}
            </h2>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="progress-fill h-2" 
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {renderCurrentStep()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`flex items-center ${
              currentStep === 1 
                ? 'btn-secondary cursor-not-allowed opacity-50' 
                : 'btn-secondary'
            }`}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </button>

          {currentStep < 5 ? (
            <button onClick={nextStep} className="btn-primary">
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </button>
          ) : (
            <button onClick={handleSubmit} className="btn-primary">
              <Save className="w-4 h-4 mr-2" />
              Create Profile
            </button>
          )}
        </div>

        {/* Admin Note */}
        <div className="mt-8 card p-6 bg-primary-50 border-primary-200">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-6 h-6 text-primary-600 mt-0.5" />
            <div>
              <h4 className="text-lg font-semibold text-primary-900 mb-2">What happens next?</h4>
              <ul className="text-sm text-primary-800 space-y-1">
                <li>• Your profile will be reviewed by our admin team within 24-48 hours</li>
                <li>• You'll receive an email notification once approved</li>
                <li>• Document upload will be unlocked after approval</li>
                <li>• You can then schedule your verification appointment</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCreation;