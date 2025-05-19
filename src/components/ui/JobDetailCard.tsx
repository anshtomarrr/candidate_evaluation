'use client';

import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  BuildingOfficeIcon, 
  MapPinIcon, 
  CurrencyDollarIcon, 
  CalendarIcon, 
  ClockIcon,
  BookmarkIcon as BookmarkOutline,
  ShareIcon
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolid } from '@heroicons/react/24/solid';

interface JobDetailCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  type: string;
  posted: string;
  logo?: string;
  description: string;
  requirements?: string[];
  responsibilities?: string[];
  benefits?: string[];
  companyDescription?: string;
  applicationDeadline?: string;
  featured?: boolean;
}

const JobDetailCard = ({
  id,
  title,
  company,
  location,
  salary,
  type,
  posted,
  logo,
  description,
  requirements = [],
  responsibilities = [],
  benefits = [],
  companyDescription,
  applicationDeadline,
  featured = false,
}: JobDetailCardProps) => {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(!saved);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${title} at ${company}`,
        text: `Check out this job: ${title} at ${company}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Link copied to clipboard!'))
        .catch(console.error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className={`p-6 ${featured ? 'border-l-4 border-l-blue-600' : ''}`}>
        <div className="flex flex-col md:flex-row md:items-start md:justify-between">
          <div className="flex items-start">
            {logo ? (
              <Image 
                src={logo} 
                alt={`${company} logo`} 
                width={64}
                height={64}
                className="h-16 w-16 rounded-md object-contain bg-gray-50 p-1 border border-gray-200 mr-4" 
              />
            ) : (
              <div className="h-16 w-16 rounded-md bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-2xl mr-4">
                {company.charAt(0)}
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              <div className="mt-1 flex items-center text-gray-600">
                <BuildingOfficeIcon className="h-5 w-5 text-gray-400 mr-1" />
                <span>{company}</span>
              </div>
              <div className="mt-1 flex items-center text-gray-600">
                <MapPinIcon className="h-5 w-5 text-gray-400 mr-1" />
                <span>{location}</span>
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end">
            <div className="flex space-x-2">
              <button 
                onClick={handleSave} 
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                aria-label={saved ? "Unsave job" : "Save job"}
              >
                {saved ? (
                  <BookmarkSolid className="h-5 w-5 text-blue-600 mr-1" />
                ) : (
                  <BookmarkOutline className="h-5 w-5 mr-1" />
                )}
                {saved ? 'Saved' : 'Save'}
              </button>
              <button 
                onClick={handleShare} 
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <ShareIcon className="h-5 w-5 mr-1" />
                Share
              </button>
            </div>
            <div className="mt-4">
              <Link 
                href={`/apply/${id}`} 
                className="btn-primary inline-flex justify-center w-full md:w-auto"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
        
        {/* Job highlights */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {salary && (
            <div className="flex items-center">
              <CurrencyDollarIcon className="h-5 w-5 text-gray-400 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Salary</p>
                <p className="font-medium">{salary}</p>
              </div>
            </div>
          )}
          <div className="flex items-center">
            <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Job Type</p>
              <p className="font-medium">{type}</p>
            </div>
          </div>
          <div className="flex items-center">
            <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Posted</p>
              <p className="font-medium">{posted}</p>
            </div>
          </div>
        </div>
        
        {applicationDeadline && (
          <div className="mt-4 text-sm text-gray-600">
            <span className="font-medium">Application Deadline:</span> {applicationDeadline}
          </div>
        )}
      </div>
      
      {/* Job details */}
      <div className="border-t border-gray-200 px-6 py-5">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Job Description</h2>
        <div className="prose prose-blue max-w-none text-gray-600">
          <p className="whitespace-pre-line">{description}</p>
        </div>
        
        {responsibilities.length > 0 && (
          <div className="mt-6">
            <h3 className="text-md font-medium text-gray-900 mb-3">Responsibilities</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              {responsibilities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        
        {requirements.length > 0 && (
          <div className="mt-6">
            <h3 className="text-md font-medium text-gray-900 mb-3">Requirements</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              {requirements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        
        {benefits.length > 0 && (
          <div className="mt-6">
            <h3 className="text-md font-medium text-gray-900 mb-3">Benefits</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              {benefits.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        
        {companyDescription && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">About {company}</h2>
            <p className="text-gray-600 whitespace-pre-line">{companyDescription}</p>
          </div>
        )}
      </div>
      
      {/* Footer with CTA */}
      <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-gray-600 mb-4 sm:mb-0">
          Interested in this job? Apply now to get started!
        </p>
        <Link 
          href={`/apply/${id}`} 
          className="btn-primary inline-flex justify-center w-full sm:w-auto"
        >
          Apply Now
        </Link>
      </div>
    </div>
  );
};

export default JobDetailCard; 