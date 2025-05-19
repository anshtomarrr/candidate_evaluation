'use client';

interface NotificationBadgeProps {
  count: number;
  className?: string;
  maxCount?: number;
}

const NotificationBadge = ({ 
  count, 
  className = '', 
  maxCount = 99 
}: NotificationBadgeProps) => {
  if (count <= 0) return null;
  
  const displayCount = count > maxCount ? `${maxCount}+` : count.toString();
  
  return (
    <span 
      className={`inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full ${className}`}
      aria-label={`${count} notifications`}
    >
      {displayCount}
    </span>
  );
};

export default NotificationBadge; 