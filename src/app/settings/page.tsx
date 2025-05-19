'use client';

import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';
import { 
  BellIcon, 
  UserCircleIcon, 
  LockClosedIcon, 
  DocumentTextIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

export default function SettingsPage() {
  const settingsSections = [
    {
      id: 'account',
      title: 'Account Settings',
      description: 'Manage your personal information and account details.',
      icon: <UserCircleIcon className="h-6 w-6 text-gray-400" />,
      href: '/settings/account',
    },
    {
      id: 'notifications',
      title: 'Notification Preferences',
      description: 'Control which notifications you receive and how you receive them.',
      icon: <BellIcon className="h-6 w-6 text-gray-400" />,
      href: '/settings/notifications',
    },
    {
      id: 'privacy',
      title: 'Privacy Settings',
      description: 'Manage your privacy settings and control who can see your information.',
      icon: <ShieldCheckIcon className="h-6 w-6 text-gray-400" />,
      href: '/settings/privacy',
    },
    {
      id: 'security',
      title: 'Security',
      description: 'Update your password and secure your account.',
      icon: <LockClosedIcon className="h-6 w-6 text-gray-400" />,
      href: '/settings/security',
    },
    {
      id: 'billing',
      title: 'Billing & Payments',
      description: 'Manage your payment methods and subscription details.',
      icon: <CreditCardIcon className="h-6 w-6 text-gray-400" />,
      href: '/settings/billing',
    },
    {
      id: 'preferences',
      title: 'Job Preferences',
      description: 'Update your job preferences to get more relevant job matches.',
      icon: <DocumentTextIcon className="h-6 w-6 text-gray-400" />,
      href: '/settings/job-preferences',
    },
  ];

  return (
    <div className="pt-24">
      <PageHeader 
        title="Settings"
        description="Manage your account settings and preferences."
        hasBackground={true}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {settingsSections.map((section) => (
              <li key={section.id}>
                <Link 
                  href={section.href}
                  className="block hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="px-6 py-5 flex items-center">
                    <div className="flex-shrink-0">
                      {section.icon}
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">{section.title}</p>
                        <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{section.description}</p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-10 text-center">
          <button className="text-sm text-red-600 hover:text-red-800 font-medium">
            Delete Account
          </button>
          <p className="mt-1 text-xs text-gray-500">
            Permanently delete your account and all associated data.
          </p>
        </div>
      </div>
    </div>
  );
} 