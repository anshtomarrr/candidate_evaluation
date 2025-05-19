'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/shared/Navbar';

// Mock data for recruiter dashboard
const MOCK_POSTED_JOBS = [
  {
    id: 101,
    title: 'Senior Frontend Developer',
    location: 'Remote',
    postedDate: '2023-05-12',
    applicants: 24,
    status: 'active',
  },
  {
    id: 102,
    title: 'UX/UI Designer',
    location: 'New York, NY',
    postedDate: '2023-05-08',
    applicants: 18,
    status: 'active',
  },
  {
    id: 103,
    title: 'Product Manager',
    location: 'San Francisco, CA',
    postedDate: '2023-05-01',
    applicants: 32,
    status: 'closed',
  },
];

const MOCK_RECENT_APPLICANTS = [
  {
    id: 201,
    name: 'Alex Johnson',
    jobTitle: 'Senior Frontend Developer',
    appliedDate: '2023-05-18',
    status: 'review',
  },
  {
    id: 202,
    name: 'Sarah Williams',
    jobTitle: 'UX/UI Designer',
    appliedDate: '2023-05-17',
    status: 'interview',
  },
  {
    id: 203,
    name: 'Michael Brown',
    jobTitle: 'Senior Frontend Developer',
    appliedDate: '2023-05-16',
    status: 'rejected',
  },
  {
    id: 204,
    name: 'Emily Davis',
    jobTitle: 'UX/UI Designer',
    appliedDate: '2023-05-15',
    status: 'review',
  },
];

export default function RecruiterDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Recruiter Dashboard</h1>
            <p className="text-gray-600">Manage your job listings and applicants</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link
              href="/recruiter/jobs/new"
              className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Post New Job
            </Link>
          </div>
        </div>
        
        {/* Dashboard navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {['overview', 'jobs', 'applicants', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize
                  ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
        
        {/* Dashboard content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Stats cards */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Job Postings Overview</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Active Jobs</p>
                  <p className="text-2xl font-bold text-blue-600">2</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Total Applicants</p>
                  <p className="text-2xl font-bold text-green-600">74</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Pending Review</p>
                  <p className="text-2xl font-bold text-yellow-600">12</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Interviews Scheduled</p>
                  <p className="text-2xl font-bold text-purple-600">5</p>
                </div>
              </div>
            </div>
            
            {/* Recent applicants */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Applicants</h2>
              <div className="overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  {MOCK_RECENT_APPLICANTS.slice(0, 3).map((applicant) => (
                    <li key={applicant.id} className="py-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{applicant.name}</p>
                          <p className="text-sm text-gray-500">{applicant.jobTitle}</p>
                        </div>
                        <div className="flex items-center">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              applicant.status === 'review'
                                ? 'bg-yellow-100 text-yellow-800'
                                : applicant.status === 'interview'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {applicant.status === 'review'
                              ? 'Review'
                              : applicant.status === 'interview'
                              ? 'Interview'
                              : 'Rejected'}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <Link
                    href="/recruiter/applicants"
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    View all applicants
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Posted jobs */}
            <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Your Posted Jobs</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                        Job Title
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Location
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Posted Date
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Applicants
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Status
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {MOCK_POSTED_JOBS.map((job) => (
                      <tr key={job.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {job.title}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{job.location}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{job.postedDate}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{job.applicants}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span
                            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                              job.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {job.status === 'active' ? 'Active' : 'Closed'}
                          </span>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <Link
                            href={`/recruiter/jobs/${job.id}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4">
                <Link
                  href="/recruiter/jobs"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  View all jobs
                </Link>
              </div>
            </div>
          </div>
        )}
        
        {/* Other tabs would be implemented here */}
        {activeTab !== 'overview' && (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-500">
              {activeTab === 'jobs' && 'Jobs management would be implemented here.'}
              {activeTab === 'applicants' && 'Applicants management would be implemented here.'}
              {activeTab === 'settings' && 'Settings would be implemented here.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 