'use client';

import Link from 'next/link';
import JobDetailCard from '@/components/ui/JobDetailCard';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

// Mock job data - in a real app, this would come from an API
const JOB_DATA = {
  id: '1',
  title: 'Senior Frontend Developer',
  company: 'TechCorp',
  location: 'San Francisco, CA (Remote Available)',
  salary: '$120,000 - $150,000',
  type: 'Full-time',
  posted: '2 days ago',
  description: `We are looking for an experienced Senior Frontend Developer to join our growing team. You'll work on challenging projects using the latest technologies to build responsive, user-friendly web applications.

As a Senior Frontend Developer, you will be responsible for implementing visual elements and their behaviors with user interactions. You will work with both the UI/UX team and the backend team to build all client-side logic. You will also be involved in the design and development of new features.`,
  responsibilities: [
    'Develop new user-facing features using React.js and Next.js',
    'Build reusable components and libraries for future use',
    'Optimize applications for maximum speed and scalability',
    'Collaborate with the design team to implement UI/UX designs accurately',
    'Work with backend developers to integrate frontend components with server-side logic',
    'Implement responsive design and ensure cross-browser compatibility',
    'Participate in code reviews and mentor junior developers',
  ],
  requirements: [
    '5+ years of professional experience in frontend development',
    'Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model',
    'Experience with React.js and its core principles (hooks, context, etc.)',
    'Experience with Next.js and server-side rendering',
    'Thorough understanding of responsive design and mobile-first principles',
    'Good understanding of SEO principles and ensuring that applications adhere to them',
    'Experience with common frontend development tools such as Babel, Webpack, npm, etc.',
    'Familiarity with code versioning tools such as Git',
    'Strong problem-solving skills and attention to detail',
  ],
  benefits: [
    'Competitive salary and equity options',
    'Health, dental, and vision insurance',
    'Flexible work hours and remote work options',
    '401(k) with company match',
    'Professional development budget',
    'Generous paid time off',
    'Regular team events and activities',
  ],
  companyDescription: `TechCorp is a leading technology company specializing in creating innovative software solutions for businesses of all sizes. Founded in 2010, we've grown to over 500 employees across 5 global offices.

Our mission is to empower businesses through technology, and we're passionate about creating products that make a real difference in how companies operate. We value collaboration, innovation, and continuous learning.`,
  applicationDeadline: 'June 30, 2023',
  featured: true,
};

// In a real app, you would fetch the job data based on the ID from the params
export default function JobDetailPage() {
  // For demo purposes, we're using the mock data
  // In a real app, you would fetch the job data based on jobId
  const job = JOB_DATA;

  return (
    <main className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link 
            href="/jobs" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Back to jobs
          </Link>
        </div>
        
        <JobDetailCard 
          id={job.id}
          title={job.title}
          company={job.company}
          location={job.location}
          salary={job.salary}
          type={job.type}
          posted={job.posted}
          description={job.description}
          requirements={job.requirements}
          responsibilities={job.responsibilities}
          benefits={job.benefits}
          companyDescription={job.companyDescription}
          applicationDeadline={job.applicationDeadline}
          featured={job.featured}
        />
        
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Similar Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card p-6 hover:border-blue-200">
              <h3 className="text-lg font-medium text-gray-900">Frontend Developer</h3>
              <p className="text-gray-600">DataSystems • Remote</p>
              <div className="mt-2 flex items-center">
                <span className="badge badge-blue">Full-time</span>
                <span className="ml-3 text-sm text-gray-500">Posted 1 week ago</span>
              </div>
            </div>
            <div className="card p-6 hover:border-blue-200">
              <h3 className="text-lg font-medium text-gray-900">React Developer</h3>
              <p className="text-gray-600">InnovateCo • New York, NY</p>
              <div className="mt-2 flex items-center">
                <span className="badge badge-blue">Full-time</span>
                <span className="ml-3 text-sm text-gray-500">Posted 3 days ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 