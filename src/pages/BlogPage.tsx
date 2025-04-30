import { useState, useMemo } from 'react';
import { Search, Filter, ArrowRight } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import BlogCard from '../components/common/BlogCard';
import { useBlog } from '../context/BlogContext';

const categories = [
  {
    id: 'data-science',
    name: 'Data Science & AI',
    description: 'Machine learning, predictive modeling, and artificial intelligence',
    image: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'analytics',
    name: 'Business Analytics',
    description: 'Business intelligence, data visualization, and reporting',
    image: 'https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'research',
    name: 'Research & Impact',
    description: 'Market research, impact assessment, and evaluation',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 'monitoring',
    name: 'M&E',
    description: 'Monitoring, evaluation, and learning frameworks',
    image: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

const BlogPage = () => {
  const { blogs } = useBlog();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [view, setView] = useState<'grid' | 'list'>('grid');

  // Get all unique tags from blogs
  const allTags = useMemo(() => 
    [...new Set(blogs.flatMap(blog => blog.tags || []))],
    [blogs]
  );

  // Filter blogs based on search term and selected category
  const filteredBlogs = useMemo(() => {
    return blogs.filter(blog => {
      const matchesSearch = !searchTerm || 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        
      const matchesCategory = !selectedCategory || 
        (blog.tags && blog.tags.includes(selectedCategory));
      
      return matchesSearch && matchesCategory;
    });
  }, [blogs, searchTerm, selectedCategory]);

  // Get featured blog (most recent)
  const featuredBlog = useMemo(() => 
    blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0],
    [blogs]
  );

  return (
    <>
      <PageHeader 
        title="Blog & Insights" 
        subtitle="Expert perspectives on data science, analytics, and M&E"
        bgImage="https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />

      {/* Featured Post */}
      {featuredBlog && (
        <section className="py-12 bg-white">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <img 
                  src={featuredBlog.image} 
                  alt={featuredBlog.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="lg:pl-8">
                <span className="text-primary-600 font-semibold mb-2 block">Featured Post</span>
                <h2 className="text-3xl font-bold mb-4">{featuredBlog.title}</h2>
                <p className="text-gray-600 mb-6">{featuredBlog.excerpt}</p>
                <a 
                  href={`/blog/${featuredBlog.slug}`}
                  className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700"
                >
                  Read More <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id === selectedCategory ? null : category.id)}
                className={`relative overflow-hidden rounded-lg group ${
                  selectedCategory === category.id ? 'ring-2 ring-primary-600' : ''
                }`}
              >
                <div className="absolute inset-0">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/50"></div>
                </div>
                <div className="relative p-6 text-white">
                  <h3 className="text-xl font-bold mb-2 text-white">{category.name}</h3>
                  <p className="text-sm text-white/90">{category.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          {/* Search and Filters */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="w-full md:w-96 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-control pl-10"
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-gray-400" />
                  <select
                    value={selectedCategory || ''}
                    onChange={(e) => setSelectedCategory(e.target.value || null)}
                    className="form-control"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setView('grid')}
                    className={`px-4 py-2 ${view === 'grid' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600'}`}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setView('list')}
                    className={`px-4 py-2 ${view === 'list' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600'}`}
                  >
                    List
                  </button>
                </div>
              </div>
            </div>

            {/* Active Tags */}
            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedCategory(tag === selectedCategory ? null : tag)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedCategory === tag
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Blog Posts */}
          {filteredBlogs.length > 0 ? (
            <div className={view === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-8'}>
              {filteredBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} view={view} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-2xl font-semibold mb-2">No matching articles found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <button 
                onClick={() => {setSearchTerm(''); setSelectedCategory(null);}} 
                className="btn btn-primary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-primary-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-700 mb-8">
              Subscribe to our newsletter for the latest insights in data science, analytics, and M&E. 
              Join our community of data professionals.
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
              <p className="text-sm text-gray-500 mt-3">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;