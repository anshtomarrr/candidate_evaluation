'use client';

import { useState } from 'react';
import { useNotifications } from '@/hooks/useNotifications';

const NotificationDemo = () => {
  const { addNotification } = useNotifications();
  const [demoType, setDemoType] = useState<'job_alert' | 'application_update' | 'message' | 'system'>('job_alert');
  
  const demoNotifications = {
    job_alert: {
      title: 'New job match',
      message: 'A new Senior Developer position at TechCorp matches your profile',
      link: '/jobs/1',
    },
    application_update: {
      title: 'Application status update',
      message: 'Your application for Frontend Developer at DataSystems has moved to the interview stage',
      link: '/profile/applications/2',
    },
    message: {
      title: 'New message from recruiter',
      message: 'Sarah from TechCorp has sent you a message about your application',
      link: '/messages/3',
    },
    system: {
      title: 'Account security alert',
      message: 'Your account was accessed from a new device. Please verify this was you.',
      link: '/settings/security',
    },
  };
  
  const handleAddNotification = () => {
    addNotification({
      type: demoType,
      ...demoNotifications[demoType],
    });
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Demo</h3>
      <p className="text-sm text-gray-600 mb-4">
        Test the notification system by sending yourself a demo notification.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-grow">
          <label htmlFor="notification-type" className="form-label">Notification Type</label>
          <select
            id="notification-type"
            className="form-input"
            value={demoType}
            onChange={(e) => setDemoType(e.target.value as 'job_alert' | 'application_update' | 'message' | 'system')}
          >
            <option value="job_alert">Job Alert</option>
            <option value="application_update">Application Update</option>
            <option value="message">Message</option>
            <option value="system">System Alert</option>
          </select>
        </div>
        <div className="flex items-end">
          <button
            onClick={handleAddNotification}
            className="btn-primary w-full sm:w-auto"
          >
            Send Notification
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationDemo; 