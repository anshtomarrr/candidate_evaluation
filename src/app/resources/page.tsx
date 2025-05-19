'use client';

import Link from 'next/link';
import { useState } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import { DocumentTextIcon, BookOpenIcon, VideoCameraIcon } from '@heroicons/react/24/outline';

// Mock resource data
const RESOURCES = [
  {
    id: '1',
    title: 'How to Write a Standout Resume',
    category: 'Resume Tips',
    type: 'Article',
    description: 'Learn how to create a resume that gets noticed by recruiters and passes through applicant tracking systems.',
    readTime: '5 min read',
    featured: true,
  },
  {
    id: '2',
    title: 'Mastering the Job Interview',
    category: 'Interview Prep',
    type: 'Guide',
    description: 'Comprehensive guide to preparing for and excelling in job interviews, including common questions and best practices.',
    readTime: '10 min read',
    featured: true,
  },
  {
    id: '3',
    title: 'Salary Negotiation Strategies',
    category: 'Career Growth',
    type: 'Video',
    description: 'Expert tips on how to negotiate your salary and benefits package to get the compensation you deserve.',
    readTime: '15 min watch',
    featured: false,
  },
  {
    id: '4',
    title: 'Building Your Personal Brand on LinkedIn',
    category: 'Networking',
    type: 'Article',
    description: 'Strategies for creating a compelling LinkedIn profile that attracts recruiters and builds your professional network.',
    readTime: '7 min read',
    featured: false,
  },
  {
    id: '5',
    title: 'Remote Work Success Strategies',
    category: 'Work Life',
    type: 'Guide',
    description: 'Tips and tools for staying productive, connected, and balanced while working remotely.',
    readTime: '8 min read',
    featured: false,
  },
  {
    id: '6',
    title: 'Career Change: A Step-by-Step Guide',
    category: 'Career Growth',
    type: 'Guide',
    description: 'How to successfully transition to a new career path, including skills assessment and transferable skills identification.',
    readTime: '12 min read',
    featured: true,
  },
];

// Categories for filtering
const CATEGORIES = [
  'All Categories',
  'Resume Tips',
  'Interview Prep',
  'Career Growth',
  'Networking',
  'Work Life',
];

// Resource types for filtering
const TYPES = [
  'All Types',
  'Article',
  'Guide',
  'Video',
];

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedType, setSelectedType] = useState('All Types');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter resources based on filters and search
  const filteredResources = RESOURCES.filter(resource => {
    const matchesCategory = selectedCategory === 'All Categories' || resource.category === selectedCategory;
    const matchesType = selectedType === 'All Types' || resource.type === selectedType;
    const matchesSearch = searchQuery === '' || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesType && matchesSearch;
  });

  // Get icon based on resource type
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'Article':
        return <DocumentTextIcon className="h-6 w-6" />;
      case 'Guide':
        return <BookOpenIcon className="h-6 w-6" />;
      case 'Video':
        return <VideoCameraIcon className="h-6 w-6" />;
      default:
        return <DocumentTextIcon className="h-6 w-6" />;
    }
  };

  return (
    <div className="pt-24">
      <PageHeader 
        title="Career Resources"
        description="Expert advice and tools to help you succeed in your job search and career development."
        hasBackground={true}
      />
      
      {/* Search and filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <label htmlFor="search" className="form-label">Search Resources</label>
              <input
                type="text"
                id="search"
                className="form-input"
                placeholder="Search by keyword"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48">
              <label htmlFor="category" className="form-label">Category</label>
              <select
                id="category"
                className="form-input"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="w-full md:w-48">
              <label htmlFor="type" className="form-label">Type</label>
              <select
                id="type"
                className="form-input"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {TYPES.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured resources */}
      {selectedCategory === 'All Categories' && selectedType === 'All Types' && searchQuery === '' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Featured Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RESOURCES.filter(resource => resource.featured).map((resource) => (
              <Link key={resource.id} href={`/resources/${resource.id}`} className="card group hover:shadow-lg transition-shadow duration-200">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="badge badge-blue">{resource.category}</span>
                    <div className="text-gray-500">
                      {getResourceIcon(resource.type)}
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200 mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{resource.description}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">{resource.readTime}</span>
                    <span className="text-blue-600 font-medium group-hover:underline">Read more</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      
      {/* All resources */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          {selectedCategory !== 'All Categories' || selectedType !== 'All Types' || searchQuery !== '' ? 
            'Search Results' : 'All Resources'}
        </h2>
        
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {filteredResources.map((resource) => (
              <Link key={resource.id} href={`/resources/${resource.id}`} className="card group hover:shadow-lg transition-shadow duration-200">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="badge badge-blue">{resource.category}</span>
                    <div className="text-gray-500">
                      {getResourceIcon(resource.type)}
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200 mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{resource.description}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">{resource.readTime}</span>
                    <span className="text-blue-600 font-medium group-hover:underline">Read more</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-lg text-gray-600">No resources found matching your criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('All Categories');
                setSelectedType('All Types');
                setSearchQuery('');
              }}
              className="mt-4 btn-secondary"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
      
      {/* Newsletter signup */}
      <div className="bg-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Get Career Tips in Your Inbox</h2>
              <p className="mt-2 text-gray-600">Subscribe to our newsletter for the latest career advice and job search tips.</p>
            </div>
            <form className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  className="form-input flex-grow"
                  placeholder="Enter your email"
                  required
                />
                <button type="submit" className="btn-primary whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 