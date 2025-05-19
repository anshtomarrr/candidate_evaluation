import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  hasBackground?: boolean;
}

const PageHeader = ({
  title,
  description,
  children,
  className = '',
  hasBackground = false,
}: PageHeaderProps) => {
  return (
    <div className={`${hasBackground ? 'bg-gradient-to-b from-blue-50 to-white' : ''} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl animate-fade-in">
            {title}
          </h1>
          {description && (
            <p className="mt-4 text-lg text-gray-600 animate-fade-in">
              {description}
            </p>
          )}
        </div>
        {children && (
          <div className="mt-6 animate-fade-in">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader; 