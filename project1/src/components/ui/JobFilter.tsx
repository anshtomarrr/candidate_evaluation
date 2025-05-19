'use client';

import { useState } from 'react';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface FilterOption {
  id: string;
  label: string;
}

interface FilterGroup {
  id: string;
  name: string;
  options: FilterOption[];
}

interface JobFilterProps {
  filters: FilterGroup[];
  onFilterChange: (filterId: string, optionId: string, isChecked: boolean) => void;
  selectedFilters?: Record<string, string[]>;
  className?: string;
}

const JobFilter = ({
  filters,
  onFilterChange,
  selectedFilters = {},
  className = '',
}: JobFilterProps) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const handleFilterChange = (filterId: string, optionId: string, isChecked: boolean) => {
    onFilterChange(filterId, optionId, isChecked);
  };
  
  const countSelectedFilters = () => {
    return Object.values(selectedFilters).reduce((count, options) => count + options.length, 0);
  };
  
  const selectedCount = countSelectedFilters();

  return (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      {/* Mobile filter dialog */}
      <div className="sm:hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-medium text-gray-900">Filters</h2>
          <button
            type="button"
            className="inline-flex items-center justify-center text-gray-500 hover:text-gray-700"
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          >
            <span className="sr-only">{mobileFiltersOpen ? 'Close filters' : 'Open filters'}</span>
            {mobileFiltersOpen ? (
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            ) : (
              <div className="flex items-center">
                <FunnelIcon className="h-5 w-5 mr-1" aria-hidden="true" />
                <span className="text-sm font-medium">
                  Filter{selectedCount > 0 && <span> ({selectedCount})</span>}
                </span>
              </div>
            )}
          </button>
        </div>
        
        {/* Mobile filter options */}
        {mobileFiltersOpen && (
          <div className="p-4 divide-y divide-gray-200">
            {filters.map((filter) => (
              <div key={filter.id} className="py-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">{filter.name}</h3>
                <div className="space-y-2">
                  {filter.options.map((option) => (
                    <div key={option.id} className="flex items-center">
                      <input
                        id={`mobile-${filter.id}-${option.id}`}
                        name={`${filter.id}[]`}
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={selectedFilters[filter.id]?.includes(option.id) || false}
                        onChange={(e) => handleFilterChange(filter.id, option.id, e.target.checked)}
                      />
                      <label
                        htmlFor={`mobile-${filter.id}-${option.id}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Desktop filter */}
      <div className="hidden sm:block">
        <div className="p-4 border-b">
          <h2 className="text-lg font-medium text-gray-900 flex items-center">
            <FunnelIcon className="h-5 w-5 mr-2" aria-hidden="true" />
            Filters
            {selectedCount > 0 && <span className="ml-1 text-blue-600">({selectedCount})</span>}
          </h2>
        </div>
        
        <div className="p-4 divide-y divide-gray-200">
          {filters.map((filter) => (
            <div key={filter.id} className="py-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">{filter.name}</h3>
              <div className="space-y-2">
                {filter.options.map((option) => (
                  <div key={option.id} className="flex items-center">
                    <input
                      id={`desktop-${filter.id}-${option.id}`}
                      name={`${filter.id}[]`}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedFilters[filter.id]?.includes(option.id) || false}
                      onChange={(e) => handleFilterChange(filter.id, option.id, e.target.checked)}
                    />
                    <label
                      htmlFor={`desktop-${filter.id}-${option.id}`}
                      className="ml-3 text-sm text-gray-600"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobFilter; 