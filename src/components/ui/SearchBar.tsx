'use client';

import { useState, FormEvent } from 'react';
import { MagnifyingGlassIcon, MapPinIcon } from '@heroicons/react/24/outline';

interface SearchBarProps {
  onSearch: (query: { keyword: string; location: string }) => void;
  initialKeyword?: string;
  initialLocation?: string;
  className?: string;
  placeholder?: string;
  locationPlaceholder?: string;
}

const SearchBar = ({
  onSearch,
  initialKeyword = '',
  initialLocation = '',
  className = '',
  placeholder = 'Job title, keywords, or company',
  locationPlaceholder = 'City, state, or remote',
}: SearchBarProps) => {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [location, setLocation] = useState(initialLocation);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch({ keyword: keyword.trim(), location: location.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className={`${className}`}>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="form-input pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder={placeholder}
            aria-label="Search keywords"
          />
        </div>

        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MapPinIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="form-input pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder={locationPlaceholder}
            aria-label="Location"
          />
        </div>

        <button
          type="submit"
          className="btn-primary md:w-auto flex-shrink-0 flex items-center justify-center"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar; 