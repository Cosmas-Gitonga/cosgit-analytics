import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Blog } from '../types/Blog';
import { sampleBlogPosts } from '../data/blogData';

interface BlogContextType {
  blogs: Blog[];
  addBlog: (blog: Blog) => void;
  updateBlog: (blog: Blog) => void;
  deleteBlog: (id: string) => void;
  getBlogBySlug: (slug: string) => Blog | undefined;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

interface BlogProviderProps {
  children: ReactNode;
}

export const BlogProvider = ({ children }: BlogProviderProps) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    // Load blogs from localStorage or use sample data
    const savedBlogs = localStorage.getItem('cosgit_blogs');
    if (savedBlogs) {
      setBlogs(JSON.parse(savedBlogs));
    } else {
      setBlogs(sampleBlogPosts);
      localStorage.setItem('cosgit_blogs', JSON.stringify(sampleBlogPosts));
    }
  }, []);

  const saveBlogs = (updatedBlogs: Blog[]) => {
    localStorage.setItem('cosgit_blogs', JSON.stringify(updatedBlogs));
  };

  const addBlog = (blog: Blog) => {
    const newBlogs = [...blogs, blog];
    setBlogs(newBlogs);
    saveBlogs(newBlogs);
  };

  const updateBlog = (blog: Blog) => {
    const newBlogs = blogs.map((b) => (b.id === blog.id ? blog : b));
    setBlogs(newBlogs);
    saveBlogs(newBlogs);
  };

  const deleteBlog = (id: string) => {
    const newBlogs = blogs.filter((blog) => blog.id !== id);
    setBlogs(newBlogs);
    saveBlogs(newBlogs);
  };

  const getBlogBySlug = (slug: string) => {
    return blogs.find((blog) => blog.slug === slug);
  };

  return (
    <BlogContext.Provider value={{ blogs, addBlog, updateBlog, deleteBlog, getBlogBySlug }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = (): BlogContextType => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};