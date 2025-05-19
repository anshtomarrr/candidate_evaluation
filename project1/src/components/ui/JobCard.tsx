'use client';

import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookmarkIcon as BookmarkOutline } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolid } from '@heroicons/react/24/solid';

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  type: string;
  posted: string;
  logo?: string;
  skills?: string[];
  featured?: boolean;
  href?: string;
}

const JobCard = ({
  id,
  title,
  company,
  location,
  salary,
  type,
  posted,
  logo,
  skills = [],
  featured = false,
  href = `/jobs/${id}`,
}: JobCardProps) => {
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSaved(!saved);
  };

  return (
    <div className={`card group p-6 hover:border-blue-200 relative ${featured ? 'border-l-4 border-l-blue-600' : ''}`}>
      {featured && (
        <div className="absolute -top-3 left-4">
          <span className="badge badge-blue">Featured</span>
        </div>
      )}
      
      <Link href={href} className="flex flex-col sm:flex-row gap-4">
        <div className="flex-shrink-0">
          {logo ? (
            <Image 
              src={logo} 
              alt={`${company} logo`} 
              width={48}
              height={48}
              className="h-12 w-12 rounded-md object-contain bg-gray-50 p-1 border border-gray-200" 
            />
          ) : (
            <div className="h-12 w-12 rounded-md bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
              {company.charAt(0)}
            </div>
          )}
        </div>
        
        <div className="flex-grow">
          <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
            {title}
          </h3>
          <div className="mt-1 flex flex-wrap items-center text-sm text-gray-600 gap-x-3 gap-y-1">
            <span>{company}</span>
            <span>•</span>
            <span>{location}</span>
            {salary && (
              <>
                <span>•</span>
                <span>{salary}</span>
              </>
            )}
          </div>
          
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="badge badge-blue">{type}</span>
            {skills.slice(0, 3).map((skill) => (
              <span key={skill} className="badge badge-green">{skill}</span>
            ))}
            {skills.length > 3 && (
              <span className="badge badge-secondary">+{skills.length - 3} more</span>
            )}
          </div>
        </div>
        
        <div className="flex flex-col sm:items-end justify-between mt-3 sm:mt-0">
          <button 
            onClick={handleSave} 
            className="text-gray-400 hover:text-blue-600 transition-colors duration-200 p-1"
            aria-label={saved ? "Unsave job" : "Save job"}
          >
            {saved ? (
              <BookmarkSolid className="h-5 w-5 text-blue-600" />
            ) : (
              <BookmarkOutline className="h-5 w-5" />
            )}
          </button>
          <div className="text-sm text-gray-500 mt-2">
            Posted {posted}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default JobCard; 