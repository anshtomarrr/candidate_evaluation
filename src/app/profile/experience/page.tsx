'use client';

import { useState } from 'react';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  CheckIcon, 
  XMarkIcon 
} from '@heroicons/react/24/outline';

// Mock experience data - in a real app, this would come from an API
const MOCK_EXPERIENCE = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    startDate: '2020-01',
    endDate: null,
    current: true,
    description: 'Leading the frontend development team in building responsive web applications using React, TypeScript, and Next.js. Implemented component library and design system that improved development velocity by 40%.',
  },
  {
    id: '2',
    title: 'Frontend Developer',
    company: 'InnovateSoft',
    location: 'Remote',
    startDate: '2017-03',
    endDate: '2019-12',
    current: false,
    description: 'Developed and maintained multiple client-facing web applications. Collaborated with designers and backend developers to implement new features and improve existing ones.',
  },
  {
    id: '3',
    title: 'Junior Web Developer',
    company: 'WebSolutions Inc.',
    location: 'Boston, MA',
    startDate: '2015-06',
    endDate: '2017-02',
    current: false,
    description: 'Started as an intern and grew into a full-time role. Worked on various client projects using JavaScript, HTML, and CSS.',
  },
];

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string;
}

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>(MOCK_EXPERIENCE);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Experience, 'id'>>({
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setFormData(prev => ({
      ...prev,
      current: checked,
      endDate: checked ? null : prev.endDate,
    }));
  };
  
  const resetForm = () => {
    setFormData({
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing experience
      setExperiences(prev => 
        prev.map(exp => 
          exp.id === editingId ? { ...formData, id: editingId } : exp
        )
      );
      setEditingId(null);
    } else {
      // Add new experience
      const newId = Date.now().toString();
      setExperiences(prev => [
        { ...formData, id: newId },
        ...prev,
      ]);
      setIsAdding(false);
    }
    
    resetForm();
  };
  
  const handleEdit = (experience: Experience) => {
    setFormData({
      title: experience.title,
      company: experience.company,
      location: experience.location,
      startDate: experience.startDate,
      endDate: experience.endDate,
      current: experience.current,
      description: experience.description,
    });
    setEditingId(experience.id);
    setIsAdding(false);
  };
  
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      setExperiences(prev => prev.filter(exp => exp.id !== id));
      
      if (editingId === id) {
        setEditingId(null);
        resetForm();
      }
    }
  };
  
  const handleCancel = () => {
    resetForm();
    setIsAdding(false);
    setEditingId(null);
  };
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Work Experience</h2>
        {!isAdding && !editingId && (
          <button
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            <PlusIcon className="h-4 w-4 mr-1" />
            Add Experience
          </button>
        )}
      </div>
      
      {(isAdding || editingId) && (
        <div className="mb-8 bg-gray-50 p-4 rounded-md border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingId ? 'Edit Experience' : 'Add Experience'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title*
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-input w-full"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Company*
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="form-input w-full"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="form-input w-full"
                />
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date*
                  </label>
                  <input
                    type="month"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="form-input w-full"
                    required
                  />
                </div>
                
                <div className="flex-1">
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="month"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate || ''}
                    onChange={handleChange}
                    className="form-input w-full"
                    disabled={formData.current}
                  />
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="current"
                  name="current"
                  checked={formData.current}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="current" className="ml-2 block text-sm text-gray-700">
                  I am currently working here
                </label>
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="form-input w-full"
                placeholder="Describe your responsibilities, achievements, and the technologies you used."
              ></textarea>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCancel}
                className="btn-secondary"
              >
                <XMarkIcon className="h-4 w-4 mr-1" />
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
              >
                <CheckIcon className="h-4 w-4 mr-1" />
                {editingId ? 'Save Changes' : 'Add Experience'}
              </button>
            </div>
          </form>
        </div>
      )}
      
      {experiences.length > 0 ? (
        <div className="space-y-6">
          {experiences.map((experience) => (
            <div 
              key={experience.id} 
              className={`border-l-4 ${
                experience.current ? 'border-blue-500' : 'border-gray-300'
              } pl-4`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{experience.title}</h3>
                  <p className="text-gray-600">{experience.company}</p>
                  <p className="text-sm text-gray-500">
                    {experience.location && `${experience.location} • `}
                    {formatDate(experience.startDate)} - {experience.current ? 'Present' : formatDate(experience.endDate)}
                  </p>
                </div>
                
                {editingId !== experience.id && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(experience)}
                      className="text-gray-400 hover:text-blue-600 p-1"
                      aria-label="Edit"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(experience.id)}
                      className="text-gray-400 hover:text-red-600 p-1"
                      aria-label="Delete"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
              
              {experience.description && (
                <p className="mt-2 text-sm text-gray-600">{experience.description}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No work experience added yet.</p>
          <button
            onClick={() => setIsAdding(true)}
            className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            Add your first experience
          </button>
        </div>
      )}
    </div>
  );
} 