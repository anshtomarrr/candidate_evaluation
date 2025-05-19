'use client';

import { useState } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import Link from 'next/link';
import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/outline';

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  email: boolean;
  push: boolean;
  sms: boolean;
}

export default function NotificationSettingsPage() {
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: 'job_matches',
      title: 'Job Matches',
      description: 'Receive notifications when new jobs match your profile and preferences.',
      email: true,
      push: true,
      sms: false,
    },
    {
      id: 'application_updates',
      title: 'Application Updates',
      description: 'Get notified when there are updates to your job applications.',
      email: true,
      push: true,
      sms: false,
    },
    {
      id: 'messages',
      title: 'Messages',
      description: 'Receive notifications when you get new messages from recruiters.',
      email: true,
      push: true,
      sms: true,
    },
    {
      id: 'interviews',
      title: 'Interview Reminders',
      description: 'Get reminders about upcoming interviews and events.',
      email: true,
      push: true,
      sms: true,
    },
    {
      id: 'saved_searches',
      title: 'Saved Search Alerts',
      description: 'Receive updates when new jobs match your saved searches.',
      email: true,
      push: false,
      sms: false,
    },
    {
      id: 'platform_updates',
      title: 'Platform Updates',
      description: 'Stay informed about new features and improvements to JobMatch.',
      email: false,
      push: false,
      sms: false,
    },
  ]);

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleToggle = (id: string, channel: 'email' | 'push' | 'sms') => {
    setSettings(prev => 
      prev.map(setting => 
        setting.id === id 
          ? { ...setting, [channel]: !setting[channel] } 
          : setting
      )
    );
    setSaved(false);
  };

  const handleSave = () => {
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      
      // Reset saved status after a few seconds
      setTimeout(() => {
        setSaved(false);
      }, 3000);
    }, 1000);
  };

  return (
    <div className="pt-24">
      <PageHeader 
        title="Notification Settings"
        description="Customize how and when you receive notifications from JobMatch."
        hasBackground={true}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="mb-6">
          <Link 
            href="/settings" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Back to Settings
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Notification Preferences</h2>
            <p className="mt-1 text-sm text-gray-600">
              Choose which notifications you want to receive and how you want to receive them.
            </p>
          </div>
          
          <div className="divide-y divide-gray-200">
            {settings.map((setting) => (
              <div key={setting.id} className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="mb-4 sm:mb-0">
                    <h3 className="text-sm font-medium text-gray-900">{setting.title}</h3>
                    <p className="mt-1 text-sm text-gray-600">{setting.description}</p>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-gray-500 mb-1">Email</span>
                      <button
                        className={`w-10 h-6 rounded-full p-1 transition-colors duration-200 ${
                          setting.email ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                        onClick={() => handleToggle(setting.id, 'email')}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                            setting.email ? 'translate-x-4' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-gray-500 mb-1">Push</span>
                      <button
                        className={`w-10 h-6 rounded-full p-1 transition-colors duration-200 ${
                          setting.push ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                        onClick={() => handleToggle(setting.id, 'push')}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                            setting.push ? 'translate-x-4' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-gray-500 mb-1">SMS</span>
                      <button
                        className={`w-10 h-6 rounded-full p-1 transition-colors duration-200 ${
                          setting.sms ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                        onClick={() => handleToggle(setting.id, 'sms')}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                            setting.sms ? 'translate-x-4' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="px-6 py-4 bg-gray-50 flex items-center justify-between">
            <div>
              {saved && (
                <div className="flex items-center text-green-600">
                  <CheckIcon className="h-5 w-5 mr-1" />
                  <span className="text-sm font-medium">Settings saved</span>
                </div>
              )}
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-primary"
            >
              {saving ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </div>
              ) : 'Save Settings'}
            </button>
          </div>
        </div>
        
        <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Email Frequency</h2>
            <p className="mt-1 text-sm text-gray-600">
              Choose how often you want to receive email notifications.
            </p>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  id="frequency-realtime"
                  name="notification-frequency"
                  type="radio"
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  defaultChecked
                />
                <label htmlFor="frequency-realtime" className="ml-3">
                  <span className="block text-sm font-medium text-gray-900">Real-time</span>
                  <span className="block text-sm text-gray-500">Receive emails as notifications occur</span>
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="frequency-daily"
                  name="notification-frequency"
                  type="radio"
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="frequency-daily" className="ml-3">
                  <span className="block text-sm font-medium text-gray-900">Daily digest</span>
                  <span className="block text-sm text-gray-500">Receive a daily summary of all notifications</span>
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="frequency-weekly"
                  name="notification-frequency"
                  type="radio"
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="frequency-weekly" className="ml-3">
                  <span className="block text-sm font-medium text-gray-900">Weekly digest</span>
                  <span className="block text-sm text-gray-500">Receive a weekly summary of all notifications</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 