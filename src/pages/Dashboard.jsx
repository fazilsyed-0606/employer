import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, Mail, Phone, Calendar, MapPin, FileText, Camera, Award,
  CheckCircle, Clock, XCircle, Bell, MessageSquare, ChevronRight,
  Upload, Download, Eye, Edit3, BookOpen, Briefcase, Heart,
  TrendingUp, AlertTriangle, Star
} from 'lucide-react';
import { useAppContext } from '../App';

const Dashboard = () => {
  const { user } = useAppContext();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Profile Approved',
      message: 'Your profile has been approved by our admin team.',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'Document Required',
      message: 'Please upload your nursing license certificate.',
      time: '1 day ago',
      read: false
    },
    {
      id: 3,
      type: 'info',
      title: 'Interview Scheduled',
      message: 'Your interview with Medicare Hospital is scheduled for tomorrow.',
      time: '2 days ago',
      read: true
    }
  ]);

  // Mock user data
  const profileData = {
    completionPercentage: 85,
    status: 'verified', // verified, pending, rejected
    personalInfo: {
      firstName: 'Maria',
      lastName: 'Santos',
      email: 'maria.santos@email.com',
      phone: '+49 30 12345678',
      dateOfBirth: '1990-05-15',
      nationality: 'Philippines',
      profilePicture: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    professionalInfo: {
      qualification: 'Bachelor of Science in Nursing',
      experience: '5 years',
      specialization: 'ICU Nursing',
      languages: ['English', 'Filipino', 'Basic German']
    },
    documents: [
      { name: 'Nursing Diploma', status: 'approved', uploadDate: '2024-01-15' },
      { name: 'Passport Copy', status: 'approved', uploadDate: '2024-01-15' },
      { name: 'Work Experience Certificate', status: 'pending', uploadDate: '2024-01-20' },
      { name: 'Language Certificate', status: 'rejected', uploadDate: '2024-01-18' }
    ],
    jobProcess: [
      { step: 'Registration', status: 'completed', date: '2024-01-10' },
      { step: 'Appointment', status: 'completed', date: '2024-01-15' },
      { step: 'Document Verification', status: 'in-progress', date: null },
      { step: 'Interview', status: 'pending', date: null },
      { step: 'Health Check', status: 'pending', date: null },
      { step: 'Contract Signing', status: 'pending', date: null },
      { step: 'Training', status: 'pending', date: null }
    ],
    applications: [
      {
        id: 1,
        employer: 'Medicare Hospital',
        position: 'ICU Nurse',
        location: 'Berlin, Germany',
        appliedDate: '2024-01-20',
        status: 'interview-scheduled',
        logo: 'https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
      },
      {
        id: 2,
        employer: 'St. Mary\'s Clinic',
        position: 'General Nurse',
        location: 'Munich, Germany',
        appliedDate: '2024-01-18',
        status: 'under-review',
        logo: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
      }
    ]
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-success-600" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-warning-600" />;
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-success-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-warning-600" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-error-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return 'status-verified';
      case 'pending':
        return 'status-pending';
      case 'rejected':
        return 'status-rejected';
      default:
        return 'status-pending';
    }
  };

  const markAsRead = (notificationId) => {
    setNotifications(notifications.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {profileData.personalInfo.firstName}!</h1>
              <p className="text-gray-600 mt-2">Track your nursing career journey and manage your applications</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link to="/profile-creation" className="btn-primary">
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Summary Card */}
            <div className="card p-6">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <img
                    src={profileData.personalInfo.profilePicture}
                    alt="Profile"
                    className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-medium"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {profileData.personalInfo.firstName} {profileData.personalInfo.lastName}
                    </h2>
                    <span className={getStatusColor(profileData.status)}>
                      {getStatusIcon(profileData.status)}
                      <span className="ml-1">
                        {profileData.status === 'verified' ? 'Verified' : 
                         profileData.status === 'pending' ? 'Pending' : 'Needs Attention'}
                      </span>
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-gray-400" />
                      {profileData.personalInfo.email}
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-gray-400" />
                      {profileData.personalInfo.phone}
                    </div>
                    <div className="flex items-center">
                      <Award className="w-4 h-4 mr-2 text-gray-400" />
                      {profileData.professionalInfo.qualification}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      {profileData.personalInfo.nationality}
                    </div>
                  </div>

                  {/* Profile Completion */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Profile Completion</span>
                      <span className="text-sm text-gray-600">{profileData.completionPercentage}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${profileData.completionPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Process Tracker */}
            <div className="card p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Job Process Tracker</h3>
              <div className="space-y-4">
                {profileData.jobProcess.map((step, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {getStatusIcon(step.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">{step.step}</p>
                        {step.date && (
                          <p className="text-xs text-gray-500">{step.date}</p>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 capitalize">{step.status.replace('-', ' ')}</p>
                    </div>
                    {index < profileData.jobProcess.length - 1 && (
                      <div className="flex-shrink-0">
                        <ChevronRight className="w-4 h-4 text-gray-300" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Current Applications */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Current Applications</h3>
                <Link to="/employers" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  Browse More Jobs
                </Link>
              </div>
              <div className="space-y-4">
                {profileData.applications.map((app) => (
                  <div key={app.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-soft transition-all">
                    <div className="flex items-center space-x-4">
                      <img
                        src={app.logo}
                        alt={app.employer}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-semibold text-gray-900">{app.position}</h4>
                        <p className="text-sm text-gray-600">{app.employer} • {app.location}</p>
                        <p className="text-xs text-gray-500">Applied: {app.appliedDate}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          app.status === 'interview-scheduled' ? 'bg-primary-100 text-primary-800' :
                          app.status === 'under-review' ? 'bg-warning-100 text-warning-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {app.status.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Document Status */}
            <div className="card p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Document Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profileData.documents.map((doc, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-900">{doc.name}</h4>
                      {getStatusIcon(doc.status)}
                    </div>
                    <p className="text-xs text-gray-500">Uploaded: {doc.uploadDate}</p>
                    <p className="text-xs text-gray-600 capitalize mt-1">{doc.status}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link to="/profile-creation" className="btn-outline w-full">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload More Documents
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="card p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link to="/appointment" className="flex items-center p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <Calendar className="w-5 h-5 text-primary-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900">Schedule Appointment</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
                <Link to="/employers" className="flex items-center p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <Briefcase className="w-5 h-5 text-secondary-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900">Browse Jobs</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
                <Link to="/training" className="flex items-center p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <BookOpen className="w-5 h-5 text-accent-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900">Training Center</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
                </Link>
                <button className="flex items-center p-3 rounded-xl hover:bg-gray-50 transition-colors w-full text-left">
                  <MessageSquare className="w-5 h-5 text-warning-600 mr-3" />
                  <span className="text-sm font-medium text-gray-900">Chat with Admin</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
                </button>
              </div>
            </div>

            {/* Notifications */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
                <Bell className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-3">
                {notifications.slice(0, 3).map((notification) => (
                  <div 
                    key={notification.id}
                    onClick={() => markAsRead(notification.id)}
                    className={`p-3 rounded-xl cursor-pointer transition-colors ${
                      notification.read ? 'bg-gray-50' : 'bg-primary-50 hover:bg-primary-100'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                        notification.read ? 'bg-gray-300' : 'bg-primary-600'
                      }`}></div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-sm text-primary-600 hover:text-primary-700 font-medium">
                View All Notifications
              </button>
            </div>

            {/* Statistics */}
            <div className="card p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Your Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Applications Sent</span>
                  <span className="text-sm font-bold text-gray-900">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Profile Views</span>
                  <span className="text-sm font-bold text-gray-900">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Success Rate</span>
                  <span className="text-sm font-bold text-success-600">85%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Profile Strength</span>
                  <div className="flex items-center space-x-1">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                    ))}
                    <Star className="w-3 h-3 text-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;