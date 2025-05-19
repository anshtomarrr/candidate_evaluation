'use client';

import { useState } from 'react';
import { useNotifications, Notification } from '@/hooks/useNotifications';
import PageHeader from '@/components/ui/PageHeader';
import NotificationDemo from '@/components/ui/NotificationDemo';
import { BellAlertIcon, CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';

export default function NotificationsPage() {
  const { 
    notifications, 
    loading, 
    markAsRead, 
    markAllAsRead, 
    clearNotification 
  } = useNotifications();
  
  const [filter, setFilter] = useState<'all' | 'unread' | 'job_alert' | 'application_update' | 'message' | 'system'>('all');
  
  // Filter notifications based on selected filter
  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });
  
  // Group notifications by date
  const groupedNotifications: Record<string, Notification[]> = {};
  filteredNotifications.forEach(notification => {
    const date = new Date(notification.timestamp).toDateString();
    if (!groupedNotifications[date]) {
      groupedNotifications[date] = [];
    }
    groupedNotifications[date].push(notification);
  });
  
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
  
  // Format date for section headers
  const formatDateHeader = (dateString: string) => {
    const today = new Date().toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toDateString();
    
    if (dateString === today) {
      return 'Today';
    } else if (dateString === yesterdayString) {
      return 'Yesterday';
    } else {
      return format(new Date(dateString), 'MMMM d, yyyy');
    }
  };
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  return (
    <div className="pt-24">
      <PageHeader 
        title="Notifications"
        description="Stay updated with your job applications, matches, and messages."
        hasBackground={true}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Filters and actions */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center space-x-2">
              <select
                className="form-input py-1 text-sm"
                value={filter}
                onChange={(e) => setFilter(e.target.value as 'all' | 'unread' | 'job_alert' | 'application_update' | 'message' | 'system')}
              >
                <option value="all">All notifications</option>
                <option value="unread">Unread</option>
                <option value="job_alert">Job alerts</option>
                <option value="application_update">Application updates</option>
                <option value="message">Messages</option>
                <option value="system">System</option>
              </select>
              <span className="text-sm text-gray-500">
                {filteredNotifications.length} {filteredNotifications.length === 1 ? 'notification' : 'notifications'}
              </span>
            </div>
            
            <div className="flex space-x-3">
              {unreadCount > 0 && (
                <button 
                  onClick={markAllAsRead}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Mark all as read
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Demo section */}
        <div className="mb-8">
          <NotificationDemo />
        </div>
        
        {/* Notifications list */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredNotifications.length > 0 ? (
          <div className="space-y-8">
            {Object.keys(groupedNotifications).sort((a, b) => new Date(b).getTime() - new Date(a).getTime()).map(date => (
              <div key={date} className="animate-fade-in">
                <h2 className="text-sm font-medium text-gray-500 mb-4">{formatDateHeader(date)}</h2>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  {groupedNotifications[date].map((notification: Notification, index: number) => (
                    <div 
                      key={notification.id}
                      className={`p-4 flex items-start ${!notification.read ? 'bg-blue-50' : ''} ${
                        index !== groupedNotifications[date].length - 1 ? 'border-b border-gray-200' : ''
                      }`}
                    >
                      <div className="flex-shrink-0 mr-4">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                          <p className="text-xs text-gray-500 ml-2">
                            {format(new Date(notification.timestamp), 'h:mm a')}
                          </p>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        {notification.link && (
                          <a 
                            href={notification.link}
                            className="mt-2 inline-block text-sm text-blue-600 hover:text-blue-800"
                            onClick={() => markAsRead(notification.id)}
                          >
                            View details
                          </a>
                        )}
                      </div>
                      <div className="ml-4 flex-shrink-0 flex">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="mr-2 text-sm text-blue-600 hover:text-blue-800"
                          >
                            Mark as read
                          </button>
                        )}
                        <button
                          onClick={() => clearNotification(notification.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <XMarkIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <BellAlertIcon className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No notifications</h3>
            <p className="text-gray-500">
              {filter === 'all' 
                ? "You don't have any notifications yet." 
                : `You don't have any ${filter === 'unread' ? 'unread' : filter.replace('_', ' ')} notifications.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 