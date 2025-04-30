import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart2, FileText, Users, Calendar, ArrowUp, PieChart, TrendingUp } from 'lucide-react';
import { useBlog } from '../../context/BlogContext';
import { useAdmin } from '../../context/AdminContext';

const AdminDashboardPage = () => {
  const { blogs } = useBlog();
  const { logout } = useAdmin();
  
  useEffect(() => {
    document.title = 'Admin Dashboard | Cosgit Analytics';
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button 
            onClick={logout}
            className="btn bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            Logout
          </button>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: 'Total Blog Posts',
              value: blogs.length,
              change: '+2 this month',
              icon: <FileText className="w-8 h-8 text-blue-500" />,
              color: 'bg-blue-100'
            },
            {
              title: 'Website Visitors',
              value: '1,243',
              change: '+12% from last month',
              icon: <Users className="w-8 h-8 text-green-500" />,
              color: 'bg-green-100'
            },
            {
              title: 'New Inquiries',
              value: '8',
              change: '+3 this week',
              icon: <TrendingUp className="w-8 h-8 text-purple-500" />,
              color: 'bg-purple-100'
            },
            {
              title: 'Upcoming Events',
              value: '2',
              change: 'Next: Data Science Workshop',
              icon: <Calendar className="w-8 h-8 text-orange-500" />,
              color: 'bg-orange-100'
            }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-600 text-sm">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-gray-600">{stat.change}</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link 
              to="/admin/blog" 
              className="btn bg-primary-600 text-white hover:bg-primary-700"
            >
              Manage Blog Posts
            </Link>
            <button className="btn bg-secondary-600 text-white hover:bg-secondary-700">
              View Analytics
            </button>
            <button className="btn bg-gray-600 text-white hover:bg-gray-700">
              Edit Services
            </button>
          </div>
        </div>
        
        {/* Recent Activity and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Blog Posts */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Blog Posts</h2>
            <div className="space-y-4">
              {blogs.slice(0, 5).map((blog) => (
                <div key={blog.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <h3 className="font-medium hover:text-primary-600 transition-colors">
                    <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                  </h3>
                  <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
                    <span>{new Date(blog.date).toLocaleDateString()}</span>
                    <span>{blog.author}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-right">
              <Link 
                to="/admin/blog" 
                className="text-primary-600 font-medium hover:underline"
              >
                View All Posts
              </Link>
            </div>
          </div>
          
          {/* Analytics Overview */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Analytics Overview</h2>
            <div className="flex space-x-4 mb-6">
              <button className="px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm font-medium">
                Last 7 Days
              </button>
              <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-full text-sm font-medium">
                Last 30 Days
              </button>
              <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-full text-sm font-medium">
                All Time
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Page Views</span>
                  <span className="font-medium">1,876</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Unique Visitors</span>
                  <span className="font-medium">1,243</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-secondary-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Avg. Session Duration</span>
                  <span className="font-medium">2m 34s</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Bounce Rate</span>
                  <span className="font-medium">38.2%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '38%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-right">
              <button className="text-primary-600 font-medium hover:underline">
                View Detailed Analytics
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;