import Image from 'next/image';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  image?: string;
  rating?: number;
}

const TestimonialCard = ({
  quote,
  author,
  role,
  company,
  image,
  rating = 5,
}: TestimonialCardProps) => {
  return (
    <div className="card p-6 flex flex-col h-full">
      {/* Stars */}
      <div className="flex mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={`h-5 w-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 15.934l-6.18 3.245 1.179-6.875-5-4.867 6.902-1.002L10 0l3.099 6.435 6.902 1.002-5 4.867 1.179 6.875z"
            />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-gray-700 flex-grow">
        <p className="text-lg font-medium leading-relaxed">&quot;{quote}&quot;</p>
      </blockquote>

      {/* Author */}
      <div className="flex items-center mt-6">
        <div className="flex-shrink-0">
          {image ? (
            <div className="h-12 w-12 rounded-full overflow-hidden">
              <Image
                src={image}
                alt={author}
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-medium text-lg">{author.charAt(0)}</span>
            </div>
          )}
        </div>
        <div className="ml-4">
          <div className="font-medium text-gray-900">{author}</div>
          <div className="text-sm text-gray-600">
            {role}, {company}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard; 