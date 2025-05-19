import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPinIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

interface CompanyCardProps {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  location: string;
  description: string;
  jobCount: number;
  href?: string;
  featured?: boolean;
}

const CompanyCard = ({
  id,
  name,
  logo,
  industry,
  location,
  description,
  jobCount,
  href = `/companies/${id}`,
  featured = false,
}: CompanyCardProps) => {
  return (
    <Link 
      href={href} 
      className={`card group block p-6 hover:shadow-lg transition-all duration-200 ${
        featured ? 'border-l-4 border-l-blue-600' : ''
      }`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {logo ? (
            <Image 
              src={logo} 
              alt={`${name} logo`} 
              width={64}
              height={64}
              className="h-16 w-16 rounded-md object-contain bg-gray-50 p-1 border border-gray-200" 
            />
          ) : (
            <div className="h-16 w-16 rounded-md bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-2xl">
              {name.charAt(0)}
            </div>
          )}
        </div>
        
        <div className="ml-5 flex-grow">
          <div className="flex justify-between">
            <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
              {name}
            </h3>
            {featured && (
              <span className="badge badge-blue">Featured</span>
            )}
          </div>
          
          <div className="mt-1 flex flex-wrap items-center text-sm text-gray-600 gap-x-4 gap-y-1">
            <span>{industry}</span>
            <div className="flex items-center">
              <MapPinIcon className="h-4 w-4 text-gray-400 mr-1" />
              <span>{location}</span>
            </div>
          </div>
          
          <p className="mt-3 text-gray-600 line-clamp-2">{description}</p>
          
          <div className="mt-4 flex items-center text-sm">
            <BriefcaseIcon className="h-4 w-4 text-gray-400 mr-1" />
            <span className="text-blue-600 font-medium">{jobCount} open position{jobCount !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CompanyCard; 