'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronDownIcon, 
  ChevronUpIcon,
  EyeIcon,
  DocumentTextIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

// Mock application data - in a real app, this would come from an API
const MOCK_APPLICATIONS: Application[] = [
  {
    id: '1',
    jobTitle: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    appliedDate: '2023-05-15',
    status: 'interview',
    statusUpdatedDate: '2023-05-20',
    notes: 'Interview scheduled for June 5th at 2 PM. Prepare portfolio and review company products.',
    logo: null,
  },
  {
    id: '2',
    jobTitle: 'Full Stack Developer',
    company: 'DataSystems',
    location: 'Remote',
    appliedDate: '2023-05-10',
    status: 'rejected',
    statusUpdatedDate: '2023-05-18',
    notes: 'Position was filled internally. Recruiter suggested to apply again in 3 months.',
    logo: null,
  },
  {
    id: '3',
    jobTitle: 'React Developer',
    company: 'InnovateCo',
    location: 'New York, NY',
    appliedDate: '2023-05-01',
    status: 'submitted',
    statusUpdatedDate: '2023-05-01',
    notes: '',
    logo: null,
  },
  {
    id: '4',
    jobTitle: 'Frontend Engineer',
    company: 'WebSolutions',
    location: 'Boston, MA',
    appliedDate: '2023-04-28',
    status: 'offered',
    statusUpdatedDate: '2023-05-22',
    notes: 'Received offer: $120k base + benefits. Need to respond by June 1st.',
    logo: null,
  },
];

type ApplicationStatus = 'submitted' | 'review' | 'interview' | 'offered' | 'rejected' | 'withdrawn';

interface Application {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  appliedDate: string;
  status: ApplicationStatus;
  statusUpdatedDate: string;
  notes: string;
  logo: string | null;
}

export default function ApplicationsPage() {
  const [applications] = useState<Application[]>(MOCK_APPLICATIONS);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<ApplicationStatus | 'all'>('all');
  
  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };
  
  const filteredApplications = applications.filter(app => 
    filter === 'all' || app.status === filter
  );
  
  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'submitted':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <ClockIcon className="h-3 w-3 mr-1" />
            Submitted
          </span>
        );
      case 'review':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <DocumentTextIcon className="h-3 w-3 mr-1" />
            Under Review
          </span>
        );
      case 'interview':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            <ChatBubbleLeftRightIcon className="h-3 w-3 mr-1" />
            Interview
          </span>
        );
      case 'offered':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircleIcon className="h-3 w-3 mr-1" />
            Offered
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircleIcon className="h-3 w-3 mr-1" />
            Rejected
          </span>
        );
      case 'withdrawn':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Withdrawn
          </span>
        );
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };
  
  const getStatusCount = (status: ApplicationStatus | 'all') => {
    if (status === 'all') return applications.length;
    return applications.filter(app => app.status === status).length;
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Job Applications</h2>
        <Link 
          href="/jobs" 
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          Browse Jobs
        </Link>
      </div>
      
      {/* Filters */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === 'all' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All ({getStatusCount('all')})
          </button>
          <button
            onClick={() => setFilter('submitted')}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === 'submitted' 
                ? 'bg-gray-700 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Submitted ({getStatusCount('submitted')})
          </button>
          <button
            onClick={() => setFilter('review')}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === 'review' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Under Review ({getStatusCount('review')})
          </button>
          <button
            onClick={() => setFilter('interview')}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === 'interview' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Interview ({getStatusCount('interview')})
          </button>
          <button
            onClick={() => setFilter('offered')}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === 'offered' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Offered ({getStatusCount('offered')})
          </button>
          <button
            onClick={() => setFilter('rejected')}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === 'rejected' 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Rejected ({getStatusCount('rejected')})
          </button>
        </div>
      </div>
      
      {filteredApplications.length > 0 ? (
        <div className="space-y-4">
          {filteredApplications.map((application) => (
            <div 
              key={application.id} 
              className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
            >
              <div 
                className="p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => toggleExpand(application.id)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{application.jobTitle}</h3>
                    <p className="text-gray-600">{application.company}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      {getStatusBadge(application.status)}
                      <span className="text-xs text-gray-500">
                        Applied {formatDate(application.appliedDate)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Link 
                      href={`/jobs/${application.id}`}
                      className="mr-2 p-1 text-gray-400 hover:text-blue-600"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <EyeIcon className="h-5 w-5" />
                    </Link>
                    <button className="p-1 text-gray-400">
                      {expandedId === application.id ? (
                        <ChevronUpIcon className="h-5 w-5" />
                      ) : (
                        <ChevronDownIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              
              {expandedId === application.id && (
                <div className="px-4 pb-4 pt-2 border-t border-gray-200 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Location</h4>
                      <p className="text-sm text-gray-900">{application.location}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Status Updated</h4>
                      <p className="text-sm text-gray-900">{formatDate(application.statusUpdatedDate)}</p>
                    </div>
                  </div>
                  
                  {application.notes && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-500">Notes</h4>
                      <p className="text-sm text-gray-900 whitespace-pre-line">{application.notes}</p>
                    </div>
                  )}
                  
                  <div className="mt-4 flex justify-end">
                    <Link
                      href={`/jobs/${application.id}`}
                      className="text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      View Job Details
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No applications found</h3>
          <p className="mt-1 text-gray-500">
            {filter === 'all' 
              ? "You haven't applied to any jobs yet." 
              : `You don't have any ${filter} applications.`}
          </p>
          <div className="mt-6">
            <Link
              href="/jobs"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Browse Jobs
            </Link>
          </div>
        </div>
      )}
    </div>
  );
} 