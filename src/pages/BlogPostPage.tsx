import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';
import { useBlog } from '../context/BlogContext';
import { marked } from 'marked';

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getBlogBySlug, blogs } = useBlog();
  
  const blog = getBlogBySlug(slug || '');
  
  useEffect(() => {
    if (blog) {
      document.title = `${blog.title} | Cosgit Analytics Blog`;
    } else {
      document.title = 'Blog Post Not Found | Cosgit Analytics';
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [blog, slug]);
  
  if (!blog) {
    return (
      <div className="container min-h-screen flex items-center justify-center py-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Blog post not found</h2>
          <Link to="/blog" className="btn btn-primary">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Function to get related blog posts (by tags or most recent)
  const getRelatedPosts = () => {
    if (!blog.tags || blog.tags.length === 0) {
      // If no tags, return most recent posts excluding current
      return blogs
        .filter(post => post.id !== blog.id)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3);
    }
    
    // Find posts with matching tags
    return blogs
      .filter(post => post.id !== blog.id && post.tags?.some(tag => blog.tags?.includes(tag)))
      .slice(0, 3);
  };
  
  const relatedPosts = getRelatedPosts();
  
  return (
    <div className="pt-24 bg-white">
      <div className="container">
        <Link 
          to="/blog" 
          className="inline-flex items-center text-primary-600 mb-6 hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>
        
        {/* Hero Section */}
        <div className="mb-8">
          <img 
            src={blog.image} 
            alt={blog.title} 
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>
        
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>
              
              <div className="flex flex-wrap items-center text-gray-600 mb-8">
                <span className="flex items-center mr-6 mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(blog.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                <span className="flex items-center mb-2">
                  <User className="w-4 h-4 mr-2" />
                  {blog.author}
                </span>
              </div>
              
              <div 
                className="prose prose-lg max-w-none" 
                dangerouslySetInnerHTML={{ __html: marked(blog.content) }}
              />
              
              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-3">Topics:</h3>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map(tag => (
                      <Link 
                        key={tag} 
                        to={`/blog?tag=${tag}`}
                        className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm hover:bg-gray-200"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </article>
            
            {/* Share */}
            <div className="mt-12 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Share this article</h3>
              <div className="flex space-x-4">
                <a 
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(blog.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-[#1DA1F2] text-white hover:bg-[#0d8ecf]"
                >
                  Twitter
                </a>
                <a 
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(blog.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-[#0077B5] text-white hover:bg-[#005e93]"
                >
                  LinkedIn
                </a>
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-[#4267B2] text-white hover:bg-[#34518d]"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div>
            {/* Author Bio */}
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h3 className="text-lg font-semibold mb-4">About the Author</h3>
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt={blog.author} 
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-semibold">{blog.author}</h4>
                  <p className="text-gray-600 text-sm">Data Scientist</p>
                </div>
              </div>
              <p className="text-gray-700">
                An experienced data scientist and analytics professional with expertise in 
                creating data-driven solutions for complex business challenges.
              </p>
            </div>
            
            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Related Articles</h3>
                <div className="space-y-6">
                  {relatedPosts.map(post => (
                    <div key={post.id} className="group">
                      <Link to={`/blog/${post.slug}`} className="flex space-x-4">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                        />
                        <div>
                          <h4 className="font-medium group-hover:text-primary-600 transition-colors">
                            {post.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {new Date(post.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Newsletter */}
      <section className="py-16 bg-primary-50 mt-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Enjoy this article?</h2>
            <p className="text-gray-700 mb-8">
              Subscribe to our newsletter to receive more insights on data science, analytics, and M&E.
            </p>
            
            <form className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="form-control flex-grow"
                  required
                />
                <button type="submit" className="btn btn-primary whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPostPage;