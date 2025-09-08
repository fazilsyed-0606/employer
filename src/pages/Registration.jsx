import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, CheckCircle, AlertCircle, User, Mail, Phone, Lock, Calendar, MapPin } from 'lucide-react';

const Registration = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const countries = [
    'Germany', 'Netherlands', 'United Kingdom', 'Philippines', 'India', 'Egypt', 
    'Nigeria', 'Indonesia', 'Malaysia', 'Thailand', 'Vietnam', 'Other'
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.nationality) newErrors.nationality = 'Nationality is required';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm() && agreedToTerms) {
      setShowConfirmation(true);
    }
  };

  const handleConfirmRegistration = () => {
    setShowConfirmation(false);
    setOtpSent(true);
    setStep(2);
  };

  const handleOtpVerification = (e) => {
    e.preventDefault();
    if (otp.length === 6) {
      // Mock OTP verification
      setTimeout(() => {
        navigate('/profile-creation');
      }, 1000);
    }
  };

  const handleSocialRegister = (provider) => {
    // Mock social registration
    navigate('/profile-creation');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-12 animate-fade-in">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {step === 1 ? 'Create Your Account' : 'Verify Your Account'}
          </h1>
          <p className="text-lg text-gray-600">
            {step === 1 
              ? 'Join thousands of nurses advancing their international careers' 
              : 'We sent a verification code to your email and phone'
            }
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              step >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              1
            </div>
            <div className={`w-20 h-1 rounded ${step >= 2 ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              step >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              2
            </div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>Registration</span>
            <span>Verification</span>
          </div>
        </div>

        <div className="card p-8">
          {step === 1 ? (
            <>
              {/* Registration Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">
                      <User className="w-4 h-4 inline mr-2" />
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`form-input ${errors.firstName ? 'border-error-500 focus:ring-error-500' : ''}`}
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-error-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="form-label">
                      <User className="w-4 h-4 inline mr-2" />
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`form-input ${errors.lastName ? 'border-error-500 focus:ring-error-500' : ''}`}
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-error-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`form-input ${errors.email ? 'border-error-500 focus:ring-error-500' : ''}`}
                      placeholder="Enter your email address"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-error-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="form-label">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`form-input ${errors.phone ? 'border-error-500 focus:ring-error-500' : ''}`}
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-error-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Personal Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="form-label">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className={`form-input ${errors.dateOfBirth ? 'border-error-500 focus:ring-error-500' : ''}`}
                    />
                    {errors.dateOfBirth && (
                      <p className="mt-1 text-sm text-error-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.dateOfBirth}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="form-label">Gender *</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className={`form-input ${errors.gender ? 'border-error-500 focus:ring-error-500' : ''}`}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                    {errors.gender && (
                      <p className="mt-1 text-sm text-error-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.gender}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="form-label">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Nationality *
                    </label>
                    <select
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleInputChange}
                      className={`form-input ${errors.nationality ? 'border-error-500 focus:ring-error-500' : ''}`}
                    >
                      <option value="">Select Nationality</option>
                      {countries.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                    {errors.nationality && (
                      <p className="mt-1 text-sm text-error-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.nationality}
                      </p>
                    )}
                  </div>
                </div>

                {/* Password */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">
                      <Lock className="w-4 h-4 inline mr-2" />
                      Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`form-input pr-12 ${errors.password ? 'border-error-500 focus:ring-error-500' : ''}`}
                        placeholder="Create a strong password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-sm text-error-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="form-label">
                      <Lock className="w-4 h-4 inline mr-2" />
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`form-input pr-12 ${errors.confirmPassword ? 'border-error-500 focus:ring-error-500' : ''}`}
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-error-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-700">
                      I have read and agree to the{' '}
                      <Link to="/terms" className="text-primary-600 hover:text-primary-700 font-medium">
                        Terms & Conditions
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-primary-600 hover:text-primary-700 font-medium">
                        Privacy Policy
                      </Link>
                      . I understand that my personal information will be processed in accordance with these terms.
                    </label>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={!agreedToTerms}
                  className={`w-full ${agreedToTerms ? 'btn-primary' : 'btn-secondary cursor-not-allowed'}`}
                >
                  Create Account
                </button>
              </form>

              {/* Social Registration */}
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or register with</span>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button 
                    onClick={() => handleSocialRegister('google')}
                    className="btn-secondary flex justify-center items-center"
                  >
                    <span className="mr-2">🔍</span> Google
                  </button>
                  <button 
                    onClick={() => handleSocialRegister('apple')}
                    className="btn-secondary flex justify-center items-center"
                  >
                    <span className="mr-2">🍎</span> Apple
                  </button>
                  <button 
                    onClick={() => handleSocialRegister('facebook')}
                    className="btn-secondary flex justify-center items-center"
                  >
                    <span className="mr-2">📘</span> Facebook
                  </button>
                </div>
              </div>

              {/* Already have account */}
              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <Link to="/" className="text-primary-600 hover:text-primary-700 font-medium">
                    Sign in here
                  </Link>
                </p>
              </div>
            </>
          ) : (
            /* OTP Verification */
            <div className="text-center">
              <div className="mb-8">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-10 h-10 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email & Phone</h2>
                <p className="text-gray-600">
                  We sent a 6-digit verification code to<br />
                  <span className="font-medium text-gray-900">{formData.email}</span> and <span className="font-medium text-gray-900">{formData.phone}</span>
                </p>
              </div>

              <form onSubmit={handleOtpVerification}>
                <div className="mb-6">
                  <label className="form-label">Enter Verification Code</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="form-input text-center text-2xl tracking-widest"
                    placeholder="000000"
                    maxLength={6}
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={otp.length !== 6}
                  className={`w-full mb-4 ${otp.length === 6 ? 'btn-primary' : 'btn-secondary cursor-not-allowed'}`}
                >
                  Verify Account
                </button>
              </form>

              <div className="text-sm text-gray-500">
                <p>
                  Didn't receive the code?{' '}
                  <button className="text-primary-600 hover:text-primary-700 font-medium">
                    Resend Code
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full">
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-success-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Registration</h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to create an account with the email address{' '}
                  <span className="font-medium text-gray-900">{formData.email}</span>?
                </p>
                <div className="flex space-x-4">
                  <button 
                    onClick={() => setShowConfirmation(false)}
                    className="flex-1 btn-secondary"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleConfirmRegistration}
                    className="flex-1 btn-primary"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Registration;