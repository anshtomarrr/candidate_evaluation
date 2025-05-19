'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/shared/Navbar';

// Mock job data
const MOCK_JOBS = {
  '1': {
    id: 1,
    title: 'Frontend Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
  },
  '2': {
    id: 2,
    title: 'Backend Engineer',
    company: 'DataSystems',
    location: 'Remote',
  },
  '3': {
    id: 3,
    title: 'UX Designer',
    company: 'CreativeMinds',
    location: 'New York, NY',
  },
};

function ApplicationFormContent() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get('jobId') || '1';
  const job = MOCK_JOBS[jobId as keyof typeof MOCK_JOBS];
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    
    // Experience
    resume: null as File | null,
    experience: '',
    education: '',
    
    // Questions
    coverLetter: '',
    whyInterested: '',
    salary: '',
    startDate: '',
    
    // Review
    agreeToTerms: false,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else if (type === 'file') {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        setFormData({
          ...formData,
          [name]: files[0],
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };
  
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
    window.scrollTo(0, 0);
  };
  
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };
  
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">Application Submitted!</h2>
            <p className="mt-2 text-gray-600">
              Thank you for applying to {job.title} at {job.company}. We will review your application and get back to you soon.
            </p>
            <div className="mt-8">
              <Link
                href="/jobs"
                className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Browse More Jobs
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Apply for {job.title}</h1>
          <p className="text-gray-600">{job.company} • {job.location}</p>
        </div>
        
        {/* Progress steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {['Personal Info', 'Experience', 'Questions', 'Review'].map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep > index + 1
                      ? 'bg-blue-600 text-white'
                      : currentStep === index + 1
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {currentStep > index + 1 ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <span className="mt-2 text-xs text-gray-500">{step}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 h-1 grid grid-cols-3 gap-1">
            <div className={`h-full rounded ${currentStep > 1 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            <div className={`h-full rounded ${currentStep > 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            <div className={`h-full rounded ${currentStep > 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900">Personal Information</h2>
                
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    placeholder="City, State, Country"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            )}
            
            {/* Step 2: Experience */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900">Experience</h2>
                
                <div>
                  <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
                    Resume/CV
                  </label>
                  <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="resume-upload"
                          className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="resume-upload"
                            name="resume"
                            type="file"
                            className="sr-only"
                            onChange={handleChange}
                            accept=".pdf,.doc,.docx"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 5MB</p>
                    </div>
                  </div>
                  {formData.resume && (
                    <p className="mt-2 text-sm text-gray-600">
                      Selected file: {formData.resume.name}
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                    Work Experience
                  </label>
                  <textarea
                    id="experience"
                    name="experience"
                    rows={4}
                    placeholder="Describe your relevant work experience"
                    required
                    value={formData.experience}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="education" className="block text-sm font-medium text-gray-700">
                    Education
                  </label>
                  <textarea
                    id="education"
                    name="education"
                    rows={4}
                    placeholder="Describe your educational background"
                    required
                    value={formData.education}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            )}
            
            {/* Step 3: Questions */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900">Additional Questions</h2>
                
                <div>
                  <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700">
                    Cover Letter
                  </label>
                  <textarea
                    id="coverLetter"
                    name="coverLetter"
                    rows={6}
                    placeholder="Tell us why you're a good fit for this position"
                    required
                    value={formData.coverLetter}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="whyInterested" className="block text-sm font-medium text-gray-700">
                    Why are you interested in working at {job.company}?
                  </label>
                  <textarea
                    id="whyInterested"
                    name="whyInterested"
                    rows={4}
                    required
                    value={formData.whyInterested}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
                    Expected Salary
                  </label>
                  <input
                    type="text"
                    id="salary"
                    name="salary"
                    required
                    value={formData.salary}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                    When can you start?
                  </label>
                  <input
                    type="text"
                    id="startDate"
                    name="startDate"
                    required
                    value={formData.startDate}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            )}
            
            {/* Step 4: Review */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900">Review Your Application</h2>
                
                <div className="border-t border-b border-gray-200 py-4">
                  <h3 className="text-base font-medium text-gray-900">Personal Information</h3>
                  <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Name</dt>
                      <dd className="text-sm text-gray-900">{formData.firstName} {formData.lastName}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Email</dt>
                      <dd className="text-sm text-gray-900">{formData.email}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Phone</dt>
                      <dd className="text-sm text-gray-900">{formData.phone}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Location</dt>
                      <dd className="text-sm text-gray-900">{formData.location}</dd>
                    </div>
                  </dl>
                </div>
                
                <div className="border-b border-gray-200 py-4">
                  <h3 className="text-base font-medium text-gray-900">Experience</h3>
                  <dl className="mt-2 grid grid-cols-1 gap-y-2">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Resume</dt>
                      <dd className="text-sm text-gray-900">
                        {formData.resume ? formData.resume.name : 'No file uploaded'}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Work Experience</dt>
                      <dd className="text-sm text-gray-900 whitespace-pre-line">{formData.experience}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Education</dt>
                      <dd className="text-sm text-gray-900 whitespace-pre-line">{formData.education}</dd>
                    </div>
                  </dl>
                </div>
                
                <div className="border-b border-gray-200 py-4">
                  <h3 className="text-base font-medium text-gray-900">Additional Questions</h3>
                  <dl className="mt-2 grid grid-cols-1 gap-y-2">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Cover Letter</dt>
                      <dd className="text-sm text-gray-900 whitespace-pre-line">{formData.coverLetter}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Why {job.company}?</dt>
                      <dd className="text-sm text-gray-900 whitespace-pre-line">{formData.whyInterested}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Expected Salary</dt>
                      <dd className="text-sm text-gray-900">{formData.salary}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Start Date</dt>
                      <dd className="text-sm text-gray-900">{formData.startDate}</dd>
                    </div>
                  </dl>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="terms"
                    name="agreeToTerms"
                    type="checkbox"
                    required
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                    I certify that all information provided is true and complete to the best of my knowledge.
                  </label>
                </div>
              </div>
            )}
            
            {/* Navigation buttons */}
            <div className="mt-8 flex justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Previous
                </button>
              ) : (
                <div></div>
              )}
              
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function ApplicationForm() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading application form...</p>
        </div>
      </div>
    }>
      <ApplicationFormContent />
    </Suspense>
  );
} 