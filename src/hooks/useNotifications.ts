import { useState, useEffect } from 'react';

export interface Notification {
  id: string;
  type: 'job_alert' | 'application_update' | 'message' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  link?: string;
}

// Mock notifications data for development
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'job_alert',
    title: 'New job match',
    message: 'A new Frontend Developer position matches your profile',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
    link: '/jobs/1',
  },
  {
    id: '2',
    type: 'application_update',
    title: 'Application status update',
    message: 'Your application for UX Designer at CreativeMinds has been reviewed',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false,
    link: '/profile/applications/2',
  },
  {
    id: '3',
    type: 'message',
    title: 'New message from TechCorp',
    message: 'We would like to schedule an interview with you',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    read: true,
    link: '/messages/3',
  },
  {
    id: '4',
    type: 'system',
    title: 'Profile completion reminder',
    message: 'Complete your profile to increase visibility to recruiters',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
    link: '/profile',
  },
  {
    id: '5',
    type: 'job_alert',
    title: 'Jobs in your area',
    message: '3 new jobs in San Francisco match your skills',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    read: true,
    link: '/jobs?location=San+Francisco',
  },
  {
    id: '6',
    type: 'application_update',
    title: 'Interview scheduled',
    message: 'Your interview with DataSystems has been confirmed',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
    read: true,
    link: '/profile/applications/6',
  },
];

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  // Load notifications on mount
  useEffect(() => {
    // In a real app, this would be an API call
    const loadNotifications = () => {
      // Simulate API delay
      setTimeout(() => {
        setNotifications(MOCK_NOTIFICATIONS);
        setLoading(false);
      }, 500);
    };

    loadNotifications();
  }, []);

  // Mark a notification as read
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  // Clear a notification
  const clearNotification = (id: string) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== id)
    );
  };

  // Add a new notification
  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  };

  return {
    notifications,
    loading,
    unreadCount: notifications.filter(n => !n.read).length,
    markAsRead,
    markAllAsRead,
    clearNotification,
    addNotification,
  };
}; 