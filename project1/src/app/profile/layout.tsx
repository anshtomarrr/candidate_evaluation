'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  UserIcon, 
  BriefcaseIcon, 
  DocumentTextIcon, 
  AcademicCapIcon, 
  Cog6ToothIcon 
} from '@heroicons/react/24/outline';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  const navigation = [
    { name: 'Personal Info', href: '/profile', icon: UserIcon },
    { name: 'Experience', href: '/profile/experience', icon: BriefcaseIcon },
    { name: 'Applications', href: '/profile/applications', icon: DocumentTextIcon },
    { name: 'Education', href: '/profile/education', icon: AcademicCapIcon },
    { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar navigation */}
          <div className="w-full md:w-64 flex-shrink-0">
            <nav className="bg-white shadow-md rounded-lg overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`flex items-center px-4 py-3 hover:bg-gray-50 transition-colors duration-200 ${
                          isActive ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                        }`}
                      >
                        <item.icon
                          className={`mr-3 h-5 w-5 ${
                            isActive ? 'text-blue-600' : 'text-gray-500'
                          }`}
                        />
                        <span
                          className={`text-sm font-medium ${
                            isActive ? 'text-blue-600' : 'text-gray-700'
                          }`}
                        >
                          {item.name}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            <div className="bg-white shadow-md rounded-lg p-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 