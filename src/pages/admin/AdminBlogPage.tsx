import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, ChevronLeft, ChevronRight, FileText, Search } from 'lucide-react';
import { useBlog } from '../../context/BlogContext';
import { Blog } from '../../types/Blog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Define the form schema
const blogSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  slug: z.string().min(5, 'Slug must be at least 5 characters'),
  author: z.string().min(2, 'Author name is required'),
  date: z.string(),
  image: z.string().url('Must be a valid URL'),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters'),
  content: z.string().min(50, 'Content must be at least 50 characters'),
  tags: z.string().optional()
});

type BlogFormData = z.infer<typeof blogSchema>;

const AdminBlogPage = () => {
  const { blogs, addBlog, updateBlog, deleteBlog } = useBlog();
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<Blog | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5;
  
  // Filter blogs based on search term
  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get current blogs for pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  
  // Form handling
  const { 
    register, 
    handleSubmit, 
    reset,
    setValue,
    formState: { errors, isSubmitting } 
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
  });
  
  // Set page title
  useEffect(() => {
    document.title = 'Manage Blog Posts | Admin Dashboard';
  }, []);
  
  // Reset form when editing status changes
  useEffect(() => {
    if (isEditing && currentBlog) {
      setValue('title', currentBlog.title);
      setValue('slug', currentBlog.slug);
      setValue('author', currentBlog.author);
      setValue('date', currentBlog.date);
      setValue('image', currentBlog.image);
      setValue('excerpt', currentBlog.excerpt);
      setValue('content', currentBlog.content);
      setValue('tags', currentBlog.tags?.join(', ') || '');
    } else {
      reset({
        title: '',
        slug: '',
        author: '',
        date: new Date().toISOString().split('T')[0],
        image: '',
        excerpt: '',
        content: '',
        tags: ''
      });
    }
  }, [isEditing, currentBlog, reset, setValue]);
  
  const handleEdit = (blog: Blog) => {
    setCurrentBlog(blog);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleDelete = (id: string) => {
    if (confirmDelete === id) {
      deleteBlog(id);
      setConfirmDelete(null);
      
      // Update pagination if needed
      if (currentBlogs.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } else {
      setConfirmDelete(id);
    }
  };
  
  const handleCancelDelete = () => {
    setConfirmDelete(null);
  };
  
  const onSubmit = async (data: BlogFormData) => {
    // Process tags
    const processedTags = data.tags 
      ? data.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0) 
      : undefined;
    
    const blogData: Blog = {
      ...data,
      id: currentBlog?.id || String(Date.now()),
      tags: processedTags
    };
    
    if (isEditing && currentBlog) {
      updateBlog(blogData);
    } else {
      addBlog(blogData);
    }
    
    // Reset form and state
    setIsEditing(false);
    setCurrentBlog(null);
    reset();
  };
  
  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Blog Posts</h1>
          <Link 
            to="/admin" 
            className="btn bg-gray-600 text-white hover:bg-gray-700"
          >
            Back to Dashboard
          </Link>
        </div>
        
        {/* Blog Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {isEditing ? 'Edit Blog Post' : 'Add New Blog Post'}
          </h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  id="title"
                  type="text"
                  {...register('title')}
                  className={`form-control ${errors.title ? 'border-red-500' : ''}`}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                  Slug * (URL-friendly version of title)
                </label>
                <input
                  id="slug"
                  type="text"
                  {...register('slug')}
                  className={`form-control ${errors.slug ? 'border-red-500' : ''}`}
                />
                {errors.slug && (
                  <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>
                )}
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                  Author *
                </label>
                <input
                  id="author"
                  type="text"
                  {...register('author')}
                  className={`form-control ${errors.author ? 'border-red-500' : ''}`}
                />
                {errors.author && (
                  <p className="mt-1 text-sm text-red-600">{errors.author.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Publication Date *
                </label>
                <input
                  id="date"
                  type="date"
                  {...register('date')}
                  className={`form-control ${errors.date ? 'border-red-500' : ''}`}
                />
                {errors.date && (
                  <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  id="tags"
                  type="text"
                  {...register('tags')}
                  className="form-control"
                  placeholder="data science, analytics, research"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                Image URL *
              </label>
              <input
                id="image"
                type="text"
                {...register('image')}
                className={`form-control ${errors.image ? 'border-red-500' : ''}`}
                placeholder="https://example.com/image.jpg"
              />
              {errors.image && (
                <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
                Excerpt * (Brief summary)
              </label>
              <textarea
                id="excerpt"
                rows={2}
                {...register('excerpt')}
                className={`form-control ${errors.excerpt ? 'border-red-500' : ''}`}
              ></textarea>
              {errors.excerpt && (
                <p className="mt-1 text-sm text-red-600">{errors.excerpt.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Content * (Markdown supported)
              </label>
              <textarea
                id="content"
                rows={10}
                {...register('content')}
                className={`form-control font-mono ${errors.content ? 'border-red-500' : ''}`}
              ></textarea>
              {errors.content && (
                <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
              )}
            </div>
            
            <div className="flex justify-end space-x-4">
              {isEditing && (
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setCurrentBlog(null);
                    reset();
                  }}
                  className="btn bg-gray-200 text-gray-800 hover:bg-gray-300"
                >
                  Cancel
                </button>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
              >
                {isSubmitting ? 'Saving...' : isEditing ? 'Update Post' : 'Add Post'}
              </button>
            </div>
          </form>
        </div>
        
        {/* Blog List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">All Blog Posts</h2>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 form-control w-60"
              />
            </div>
          </div>
          
          {currentBlogs.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Author
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentBlogs.map((blog) => (
                      <tr key={blog.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                              <div className="text-sm text-gray-500">{blog.slug}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{blog.author}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(blog.date).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => handleEdit(blog)}
                              className="text-primary-600 hover:text-primary-900"
                            >
                              <Edit className="h-5 w-5" />
                            </button>
                            
                            <button
                              onClick={() => handleDelete(blog.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                          
                          {confirmDelete === blog.id && (
                            <div className="absolute bg-white border border-gray-200 shadow-lg p-3 rounded-md mt-2 right-10 z-10">
                              <p className="text-sm text-gray-700 mb-2">
                                Are you sure you want to delete this post?
                              </p>
                              <div className="flex justify-end space-x-2">
                                <button
                                  onClick={handleCancelDelete}
                                  className="px-2 py-1 text-xs text-gray-700 hover:bg-gray-100 rounded"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => handleDelete(blog.id)}
                                  className="px-2 py-1 text-xs bg-red-600 text-white hover:bg-red-700 rounded"
                                >
                                  Confirm
                                </button>
                              </div>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-between items-center mt-6">
                  <div className="text-sm text-gray-600">
                    Showing {indexOfFirstBlog + 1} to {Math.min(indexOfLastBlog, filteredBlogs.length)} of {filteredBlogs.length} posts
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`p-2 rounded ${
                        currentPage === 1 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded ${
                          currentPage === page
                            ? 'bg-primary-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded ${
                        currentPage === totalPages
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">
                {searchTerm 
                  ? 'No blog posts match your search criteria.' 
                  : 'No blog posts have been created yet.'}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="btn btn-outline"
                >
                  Clear Search
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBlogPage;