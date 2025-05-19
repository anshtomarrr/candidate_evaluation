'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { BellIcon, BellAlertIcon, CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import NotificationBadge from './NotificationBadge';

interface Notification {
  id: string;
  type: 'job_alert' | 'application_update' | 'message' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  link?: string;
}

interface NotificationCenterProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClearNotification: (id: string) => void;
}

const NotificationCenter = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearNotification
}: NotificationCenterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'job_alert':
        return <div className="rounded-full bg-blue-100 p-2"><BellAlertIcon className="h-5 w-5 text-blue-600" /></div>;
      case 'application_update':
        return <div className="rounded-full bg-green-100 p-2"><CheckCircleIcon className="h-5 w-5 text-green-600" /></div>;
      case 'message':
        return <div className="rounded-full bg-purple-100 p-2"><svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg></div>;
      default:
        return <div className="rounded-full bg-gray-100 p-2"><svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>;
    }
  };
  
  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      onMarkAsRead(notification.id);
    }
    if (notification.link) {
      setIsOpen(false);
    }
  };
  
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="relative p-1 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="sr-only">View notifications</span>
        <BellIcon className="h-6 w-6" />
        {unreadCount > 0 && (
          <NotificationBadge 
            count={unreadCount} 
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
          />
        )}
      </button>
      
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="py-2">
            <div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
              <div className="flex space-x-2">
                {unreadCount > 0 && (
                  <button
                    onClick={onMarkAllAsRead}
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    Mark all as read
                  </button>
                )}
                <Link 
                  href="/notifications"
                  className="text-xs text-gray-600 hover:text-gray-800"
                  onClick={() => setIsOpen(false)}
                >
                  View all
                </Link>
              </div>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.slice(0, 5).map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`px-4 py-3 flex items-start hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                  >
                    <div className="flex-shrink-0 mr-3 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      {notification.link ? (
                        <Link 
                          href={notification.link}
                          className="block"
                          onClick={() => handleNotificationClick(notification)}
                        >
                          <p className="text-sm font-medium text-gray-900 truncate">{notification.title}</p>
                          <p className="text-sm text-gray-600 truncate">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{format(notification.timestamp, 'MMM d, h:mm a')}</p>
                        </Link>
                      ) : (
                        <div onClick={() => handleNotificationClick(notification)}>
                          <p className="text-sm font-medium text-gray-900 truncate">{notification.title}</p>
                          <p className="text-sm text-gray-600 truncate">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{format(notification.timestamp, 'MMM d, h:mm a')}</p>
                        </div>
                      )}
                    </div>
                    <button 
                      className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        onClearNotification(notification.id);
                      }}
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="px-4 py-6 text-center">
                  <p className="text-sm text-gray-500">No notifications yet</p>
                </div>
              )}
            </div>
            
            {notifications.length > 5 && (
              <div className="px-4 py-2 border-t border-gray-200">
                <Link 
                  href="/notifications"
                  className="block text-center text-sm text-blue-600 hover:text-blue-800"
                  onClick={() => setIsOpen(false)}
                >
                  View all {notifications.length} notifications
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter; 