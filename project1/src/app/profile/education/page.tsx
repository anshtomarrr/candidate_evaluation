'use client';

import { useState } from 'react';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  CheckIcon, 
  XMarkIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

// Mock education data - in a real app, this would come from an API
const MOCK_EDUCATION = [
  {
    id: '1',
    school: 'Massachusetts Institute of Technology',
    degree: 'Master of Science',
    field: 'Computer Science',
    startDate: '2018-09',
    endDate: '2020-05',
    current: false,
    description: 'Specialized in Artificial Intelligence and Machine Learning. Thesis on "Neural Networks for Natural Language Processing".',
    gpa: '3.9',
  },
  {
    id: '2',
    school: 'University of California, Berkeley',
    degree: 'Bachelor of Science',
    field: 'Computer Science',
    startDate: '2014-09',
    endDate: '2018-05',
    current: false,
    description: 'Minor in Mathematics. Active member of the Computer Science Club and Hackathon Team.',
    gpa: '3.8',
  },
];

interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string;
  gpa: string;
}

export default function EducationPage() {
  const [educations, setEducations] = useState<Education[]>(MOCK_EDUCATION);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Education, 'id'>>({
    school: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    gpa: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      gpa: '',
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing education
      setEducations(prev => 
        prev.map(edu => 
          edu.id === editingId ? { ...formData, id: editingId } : edu
        )
      );
      setEditingId(null);
    } else {
      // Add new education
      const newId = Date.now().toString();
      setEducations(prev => [
        { ...formData, id: newId },
        ...prev,
      ]);
      setIsAdding(false);
    }
    
    resetForm();
  };
  
  const handleEdit = (education: Education) => {
    setFormData({
      school: education.school,
      degree: education.degree,
      field: education.field,
      startDate: education.startDate,
      endDate: education.endDate,
      current: education.current,
      description: education.description,
      gpa: education.gpa,
    });
    setEditingId(education.id);
    setIsAdding(false);
  };
  
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this education entry?')) {
      setEducations(prev => prev.filter(edu => edu.id !== id));
      
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
        <h2 className="text-xl font-semibold text-gray-900">Education</h2>
        {!isAdding && !editingId && (
          <button
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            <PlusIcon className="h-4 w-4 mr-1" />
            Add Education
          </button>
        )}
      </div>
      
      {(isAdding || editingId) && (
        <div className="mb-8 bg-gray-50 p-4 rounded-md border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingId ? 'Edit Education' : 'Add Education'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-1">
                  School/University*
                </label>
                <input
                  type="text"
                  id="school"
                  name="school"
                  value={formData.school}
                  onChange={handleChange}
                  className="form-input w-full"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="degree" className="block text-sm font-medium text-gray-700 mb-1">
                  Degree*
                </label>
                <select
                  id="degree"
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  className="form-input w-full"
                  required
                >
                  <option value="">Select a degree</option>
                  <option value="High School Diploma">High School Diploma</option>
                  <option value="Associate&apos;s Degree">Associate&apos;s Degree</option>
                  <option value="Bachelor of Arts">Bachelor of Arts</option>
                  <option value="Bachelor of Science">Bachelor of Science</option>
                  <option value="Master of Arts">Master of Arts</option>
                  <option value="Master of Science">Master of Science</option>
                  <option value="Master of Business Administration">Master of Business Administration</option>
                  <option value="Doctor of Philosophy">Doctor of Philosophy</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="field" className="block text-sm font-medium text-gray-700 mb-1">
                  Field of Study*
                </label>
                <input
                  type="text"
                  id="field"
                  name="field"
                  value={formData.field}
                  onChange={handleChange}
                  className="form-input w-full"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="gpa" className="block text-sm font-medium text-gray-700 mb-1">
                  GPA
                </label>
                <input
                  type="text"
                  id="gpa"
                  name="gpa"
                  value={formData.gpa}
                  onChange={handleChange}
                  className="form-input w-full"
                  placeholder="e.g., 3.8"
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
                  I am currently studying here
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
                placeholder="Include relevant coursework, achievements, activities, etc."
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
                {editingId ? 'Save Changes' : 'Add Education'}
              </button>
            </div>
          </form>
        </div>
      )}
      
      {educations.length > 0 ? (
        <div className="space-y-6">
          {educations.map((education) => (
            <div 
              key={education.id} 
              className="border-l-4 border-blue-500 pl-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{education.degree} in {education.field}</h3>
                  <p className="text-gray-600">{education.school}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(education.startDate)} - {education.current ? 'Present' : formatDate(education.endDate)}
                    {education.gpa && ` • GPA: ${education.gpa}`}
                  </p>
                </div>
                
                {editingId !== education.id && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(education)}
                      className="text-gray-400 hover:text-blue-600 p-1"
                      aria-label="Edit"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(education.id)}
                      className="text-gray-400 hover:text-red-600 p-1"
                      aria-label="Delete"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
              
              {education.description && (
                <p className="mt-2 text-sm text-gray-600">{education.description}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <AcademicCapIcon className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-gray-500">No education added yet.</p>
          <button
            onClick={() => setIsAdding(true)}
            className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            Add your educational background
          </button>
        </div>
      )}
    </div>
  );
} 