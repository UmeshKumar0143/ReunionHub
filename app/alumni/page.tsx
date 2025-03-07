"use client"
import React, { useEffect, useState } from 'react';
import { PlusCircle, Calendar, Briefcase, Users, MessageSquare, Bell, Search, X, Loader2 } from 'lucide-react';
import { createPost, createWebinar, createJobPosting } from '../Actions/UserPostAction';
import { getPosts, getReferrals, getWebinars  } from './post';
import { UserButton } from '@clerk/nextjs';

function App() {
  const [activeTab, setActiveTab] = useState('posts');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);

  // State for dynamic data
  const [posts, setPosts] = useState([]);
  const [webinars, setWebinars] = useState([]);
  const [referrals, setReferrals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data on initial load
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const postData = await getPosts();
        setPosts(postData || []);
        
        // Fetch webinars and referrals
        // You'll need to implement these functions in separate files
        const webinarData = await getWebinars();
        setWebinars(webinarData || []);
        
        const referralData = await getReferrals();
        setReferrals(referralData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Sample data for preview (in case API calls fail)
  const sampleWebinars = [
    {
      id: 1,
      title: "Breaking into Tech Industry",
      host: "Emily Watson",
      date: "March 15, 2024",
      time: "2:00 PM EST",
      attendees: 156
    },
    {
      id: 2,
      title: "Machine Learning in Production",
      host: "David Kim",
      date: "March 20, 2024",
      time: "3:30 PM EST",
      attendees: 89
    }
  ];

  const sampleReferrals = [
    {
      id: 1,
      title: "Software Engineer",
      company: "Google",
      location: "Mountain View, CA",
      description: "Looking for experienced software engineers to join our cloud platform team...",
      salary: 150000
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Microsoft",
      location: "Seattle, WA",
      description: "Seeking product managers with 3+ years of experience in tech...",
      salary: 140000
    }
  ];

  // Use sample data if the actual data is empty
  useEffect(() => {
    if (!isLoading && webinars.length === 0) {
      setWebinars(sampleWebinars);
    }
    if (!isLoading && referrals.length === 0) {
      setReferrals(sampleReferrals);
    }
  }, [isLoading, webinars.length, referrals.length]);

  const getButtonText = () => {
    switch(activeTab) {
      case 'posts': return 'Create Post';
      case 'webinars': return 'Create Webinar';
      case 'referrals': return 'Post Referral';
      default: return 'Create New';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({});
    setFormError(null);
    setFormSuccess(null);
    setIsSubmitting(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);
    setFormSuccess(null);
    
    try {
      const formDataObj = new FormData();
      
      // Add all form fields to FormData object
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value);
      });
      
      let result;
      
      // Call the appropriate server action based on active tab
      switch(activeTab) {
        case 'posts':
          result = await createPost(formDataObj);
          if (result && result.success) {
            // Update posts state with the new post to avoid refresh
            const newPost = {
              id: Date.now(), // Temporary ID, you might get a real one from result
              title: formData.title,
              description: formData.content,
              time: new Date().toLocaleString(),
              role: "Member", // Default role
            };
            setPosts(prev => [newPost, ...prev]);
          }
          break;
        case 'webinars':
          result = await createWebinar(formDataObj);
          if (result && result.success) {
            // Update webinars state with the new webinar
            const newWebinar = {
              id: Date.now(),
              title: formData.title,
              host: "You", // Default host name
              date: formData.date,
              time: formData.time,
              attendees: 0,
              description: formData.description,
              link: formData.link
            };
            setWebinars(prev => [newWebinar, ...prev]);
          }
          break;
        case 'referrals':
          result = await createJobPosting(formDataObj);
          if (result && result.success) {
            // Update referrals state with the new referral
            const newReferral = {
              id: Date.now(),
              title: formData.title,
              company: formData.company,
              location: formData.location,
              description: formData.description,
              salary: formData.salary,
              link: formData.link
            };
            setReferrals(prev => [newReferral, ...prev]);
          }
          break;
        default:
          throw new Error("Unknown tab type");
      }
      
      // Check if there's an error in the result
      if (result && !result.success) {
        setFormError(result.error || "An error occurred");
      } else {
        setFormSuccess(`${activeTab.slice(0, -1)} created successfully!`);
        setTimeout(() => {
          setShowForm(false);
          resetForm();
        }, 1500);
      }
    } catch (error) {
      setFormError("An unexpected error occurred. Please try again.");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderForm = () => {
    switch(activeTab) {
      case 'posts':
        return (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input 
                id="title" 
                name="title" 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={formData.title || ''}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mt-3">Content</label>
              <textarea 
                id="content" 
                name="content" 
                rows={4} 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={formData.content || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button 
                type="button" 
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 flex items-center"
                disabled={isSubmitting}
              >
                {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Post
              </button>
            </div>
          </form>
        );
      
      case 'webinars':
        return (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Webinar Title</label>
              <input 
                type="text" 
                id="title" 
                name="title" 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={formData.title || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                <input 
                  type="date" 
                  id="date" 
                  name="date" 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={formData.date || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
                <input 
                  type="time" 
                  id="time" 
                  name="time" 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={formData.time || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea 
                id="description" 
                name="description" 
                rows={3} 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={formData.description || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="link" className="block text-sm font-medium text-gray-700">Meeting Link</label>
              <input 
                type="url" 
                id="link" 
                name="link" 
                placeholder="https://meet.google.com/..."
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={formData.link || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button 
                type="button" 
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 flex items-center"
                disabled={isSubmitting}
              >
                {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Create Webinar
              </button>
            </div>
          </form>
        );
      
      case 'referrals':
        return (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Job Title</label>
              <input 
                type="text" 
                id="title" 
                name="title" 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={formData.title || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
                <input 
                  type="text" 
                  id="company" 
                  name="company" 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={formData.company || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                <input 
                  type="text" 
                  id="location" 
                  name="location" 
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={formData.location || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="salary" className="block text-sm font-medium text-gray-700">Salary (Optional)</label>
              <input 
                type="number" 
                id="salary" 
                name="salary" 
                placeholder="Annual salary amount" 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={formData.salary || ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="link" className="block text-sm font-medium text-gray-700">Job Link</label>
              <input 
                type="url" 
                id="link" 
                name="link" 
                placeholder="https://careers.company.com/..."
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={formData.link || ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Job Description</label>
              <textarea 
                id="description" 
                name="description" 
                rows={4} 
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={formData.description || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button 
                type="button" 
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 flex items-center"
                disabled={isSubmitting}
              >
                {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Post Referral
              </button>
            </div>
          </form>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">Alumni Connect</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Bell className="h-6 w-6 text-gray-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
               <UserButton afterSignOutUrl='/sign-up'/>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Alumni Dashboard</h1>
          <button 
            onClick={() => setShowForm(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            {getButtonText()}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-4 py-2 ${activeTab === 'posts' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
          >
            <MessageSquare className="inline h-5 w-5 mr-2" />
            Posts
          </button>
          <button
            onClick={() => setActiveTab('webinars')}
            className={`px-4 py-2 ${activeTab === 'webinars' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
          >
            <Calendar className="inline h-5 w-5 mr-2" />
            Webinars
          </button>
          <button
            onClick={() => setActiveTab('referrals')}
            className={`px-4 py-2 ${activeTab === 'referrals' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
          >
            <Briefcase className="inline h-5 w-5 mr-2" />
            Referrals
          </button>
        </div>

        {/* Modal Popup */}
        {showForm && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">{getButtonText()}</h3>
                <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-500">
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              {/* Form Error or Success Message */}
              {formError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 rounded-md">
                  {formError}
                </div>
              )}
              
              {formSuccess && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-800 rounded-md">
                  {formSuccess}
                </div>
              )}
              
              {renderForm()}
            </div>
          </div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
            <span className="ml-2 text-gray-600">Loading...</span>
          </div>
        )}

        {/* Content */}
        {!isLoading && activeTab === 'posts' && (
          <div className="space-y-6">
            {posts.length > 0 ? (
              posts.map(post => (
                <div key={post.id} className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{post.title}</h3>
                      <p className="text-sm text-gray-500">{post.role}</p>
                      <p className="text-sm text-gray-400">{post.time}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-700">{post.description || post.content}</p>
                  <div className="mt-4 flex items-center space-x-4">
                    <button className="text-gray-500 hover:text-blue-600">
                      ❤ {post.likes || 0}
                    </button>
                    <button className="text-gray-500 hover:text-blue-600">
                      💬 {post.comments || 0}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <p className="text-gray-500">No posts available. Create your first post!</p>
              </div>
            )}
          </div>
        )}

        {!isLoading && activeTab === 'webinars' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {webinars.length > 0 ? (
              webinars.map(webinar => (
                <div key={webinar.id} className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900">{webinar.title}</h3>
                  <p className="text-sm text-gray-500">Hosted by {webinar.host}</p>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">
                      <Calendar className="inline h-4 w-4 mr-2" />
                      {webinar.date} at {webinar.time}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      <Users className="inline h-4 w-4 mr-2" />
                      {webinar.attendees} registered
                    </p>
                  </div>
                  {webinar.description && (
                    <p className="mt-2 text-gray-700">{webinar.description}</p>
                  )}
                  <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Register Now
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-2 bg-white p-6 rounded-lg shadow text-center">
                <p className="text-gray-500">No webinars available. Create your first webinar!</p>
              </div>
            )}
          </div>
        )}

        {!isLoading && activeTab === 'referrals' && (
          <div className="space-y-6">
            {referrals.length > 0 ? (
              referrals.map(referral => (
                <div key={referral.id} className="bg-white p-6 rounded-lg shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{referral.title}</h3>
                      <p className="text-sm text-gray-500">{referral.company} • {referral.location}</p>
                      {referral.salary && (
                        <p className="text-sm text-green-600 mt-1">${referral.salary.toLocaleString()} per year</p>
                      )}
                    </div>
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      New
                    </span>
                  </div>
                  <p className="mt-2 text-gray-700">{referral.description}</p>
                  <div className="mt-4 flex space-x-3">
                    {referral.link ? (
                      <a 
                        href={referral.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Apply Now
                      </a>
                    ) : (
                      <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
                        Request Referral
                      </button>
                    )}
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                      Save
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white p-6 rounded-lg shadow text-center">
                <p className="text-gray-500">No referrals available. Post your first referral!</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;