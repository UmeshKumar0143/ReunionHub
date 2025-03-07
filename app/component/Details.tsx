"use client"
import { BookOpen, Building, Briefcase, User, User2Icon, Loader2 } from 'lucide-react';
import { useState, useTransition } from 'react';
import { createUser } from '../Actions/UserAction';
import { useRouter } from 'next/navigation';

function App() {
const router = useRouter(); 
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    admissionNo: "",
    universityName: "",
    course: "",
    joiningYear: "",
    graduationYear: "",
    interests: "",
    role: "", 
    careerField: "",
    company: "",
    title: " ", 
    profession: "",
    description: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfessionSelect = (profession: string) => {
    setFormData(prev => ({ ...prev, profession }));
  };

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const response = await createUser(formData);
      if (response?.success) {
        router.push(response.redirectTo); // Redirect on success
    } else {
        console.log("Error Occured"); 
    }
    });
  };

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Form Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-2 text-gray-800">Complete Your Profile</h1>
            <p className="text-gray-500 mb-6">Help us connect you with alumni in your field of interest</p>

            <form action={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="admissionNo" className="block text-sm font-medium text-gray-700">
                  Admission No.
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                    <User size={18} />
                  </div>
                  <input
                    id="admissionNo"
                    name="admissionNo"
                    type="text"
                    placeholder="23XXXX"
                    className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.admissionNo}
                    onChange={handleChange}
                  />
                </div>
                <p className="text-xs text-gray-500">** Enter your admission number as provided by your university</p>
              </div>

              <div className="space-y-2">
                <label htmlFor="universityName" className="block text-sm font-medium text-gray-700">
                  University Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                    <Building size={18} />
                  </div>
                  <input
                    id="universityName"
                    name="universityName"
                    type="text"
                    placeholder="e.g. Graphic Era University"
                    className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.universityName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label htmlFor="course" className="block text-sm font-medium text-gray-700">
                    Course
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                      <BookOpen size={18} />
                    </div>
                    <input
                      id="course"
                      name="course"
                      type="text"
                      placeholder="e.g. B.Tech"
                      className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={formData.course}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="joiningYear" className="block text-sm font-medium text-gray-700">
                      Joining Year
                    </label>
                    <select
                      id="joiningYear"
                      name="joiningYear"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={formData.joiningYear}
                      onChange={handleChange}
                    >
                      <option value="" disabled>Select year</option>
                      {yearOptions.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700">
                      {formData.profession === 'Alumni' ? 'Graduation Year' : 'Expected Graduation'}
                    </label>
                    <select
                      id="graduationYear"
                      name="graduationYear"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={formData.graduationYear}
                      onChange={handleChange}
                    >
                      <option value="" disabled>Select year</option>
                      {yearOptions.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="careerField" className="block text-sm font-medium text-gray-700">
                  Career Field of Interest
                </label>
                <select
                  id="careerField"
                  name="careerField"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.careerField}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select field</option>
                  <option value="technology">Technology</option>
                  <option value="business">Business</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="education">Education</option>
                  <option value="engineering">Engineering</option>
                  <option value="arts">Arts & Design</option>
                  <option value="science">Science & Research</option>
                </select>
              </div>

              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-gray-700">Select your profession</h2>
                <div className="flex justify-evenly gap-4">
                  <button
                    type="button"
                    onClick={() => handleProfessionSelect('alumni')}
                    className={`flex-1 py-2 px-6 rounded-lg hover:cursor-pointer font-bold capitalize transition-all duration-200 ${
                      formData.profession === 'alumni'
                        ? 'bg-purple-500 text-white shadow-lg scale-105'
                        : 'bg-zinc-200 text-zinc-400 hover:bg-purple-500 hover:text-white'
                    }`}
                  >
                    Alumni
                  </button>
                  <button
                    type="button"
                    onClick={() => handleProfessionSelect('student')}
                    className={`flex-1 py-2 px-6 rounded-lg font-bold capitalize hover:cursor-pointer transition-all duration-200 ${
                      formData.profession === 'student'
                        ? 'bg-purple-500 text-white shadow-lg scale-105'
                        : 'bg-zinc-200 text-zinc-400 hover:bg-purple-500 hover:text-white'
                    }`}
                  >
                    Student
                  </button>
                  <input type="hidden" name="profession" value={formData.profession} />

                </div>
              </div>
              
              {formData.profession === 'alumni' && (
                <div className="space-y-2">
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                    Current Company
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                      <Briefcase size={18} />
                    </div>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      placeholder="e.g. Google"
                      className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                     Title
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                      <User2Icon size={18} />
                    </div>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      placeholder="e.g.Senior Engineer"
                      className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}
                  <div>
                    <label htmlFor="description">Enter your description</label>
                    <textarea name='description' onChange={handleChange} value={formData.description}  className='w-full h-[10vh]  border rounded-lg  border-stone-300 p-2 focus:outline-0'/>
                </div>
              <button
                type="submit"
                disabled={isPending}
                className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out ${isPending ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isPending ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  'Submit your details'
                )}
              </button>
            </form>
          </div>

          {/* Image Section */}
          <div className="hidden md:block sticky top-8 h-[82vh] rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800"
              alt="Alumni networking"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/90 to-transparent flex flex-col justify-end p-8">
              <h2 className="text-white text-2xl font-bold mb-2">Build Your Professional Network</h2>
              <p className="text-white/90 mb-4">Connect with successful alumni who've walked your path</p>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-indigo-700 font-medium border-2 border-white">
                    TH
                  </div>
                  <div>
                    <p className="text-white font-medium">Team Hello_World</p>
                    <p className="text-white/80 text-sm">Connecting Together</p>
                  </div>
                </div>
                <p className="text-white/90 text-sm italic">
                  "Get Guidance for you better Future"
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;