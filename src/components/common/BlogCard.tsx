import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Blog } from '../../types/Blog';

interface BlogCardProps {
  blog: Blog;
  view?: 'grid' | 'list';
}

const BlogCard = ({ blog, view = 'grid' }: BlogCardProps) => {
  const { title, excerpt, image, slug, date, author, tags } = blog;

  if (view === 'list') {
    return (
      <div className="card card-hover group flex flex-col md:flex-row">
        <Link to={`/blog/${slug}`} className="md:w-1/3 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-48 md:h-full object-cover transform transition-transform duration-500 group-hover:scale-110" 
          />
        </Link>
        <div className="p-6 md:w-2/3 flex flex-col">
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-2 py-1 bg-primary-50 text-primary-600 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <Link to={`/blog/${slug}`}>
            <h3 className="text-xl font-semibold mb-3 text-[#069494] transition-colors hover:text-primary-600">
              {title}
            </h3>
          </Link>
          
          <p className="text-gray-600 mb-4 flex-grow">{excerpt.substring(0, 150)}...</p>
          
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center text-sm text-gray-500">
              <span className="flex items-center mr-4">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
              <span className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                {author}
              </span>
            </div>
            
            <Link 
              to={`/blog/${slug}`} 
              className="group inline-flex items-center text-[#069494] font-medium hover:text-primary-600"
            >
              Read More 
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card card-hover group h-full flex flex-col">
      <Link to={`/blog/${slug}`} className="block overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-110" 
        />
      </Link>
      <div className="p-6 flex-grow flex flex-col">
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag) => (
              <span 
                key={tag}
                className="px-2 py-1 bg-primary-50 text-primary-600 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span className="flex items-center mr-4">
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </span>
          <span className="flex items-center">
            <User className="w-4 h-4 mr-1" />
            {author}
          </span>
        </div>
        
        <Link to={`/blog/${slug}`}>
          <h3 className="text-xl font-semibold mb-3 text-[#069494] transition-colors hover:text-primary-600">
            {title}
          </h3>
        </Link>
        
        <p className="text-gray-600 mb-4 flex-grow">{excerpt.substring(0, 120)}...</p>
        
        <Link 
          to={`/blog/${slug}`} 
          className="group inline-flex items-center text-[#069494] font-medium hover:text-primary-600 mt-auto"
        >
          Read More 
          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;