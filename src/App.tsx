import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { Layout } from './components/layout/Layout';
import { ScrollToTop } from './components/common/ScrollToTop';
import { BlogProvider } from './context/BlogContext';
import { AdminProvider } from './context/AdminContext';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AdminProvider>
        <BlogProvider>
          <Layout>
            <AppRoutes />
          </Layout>
        </BlogProvider>
      </AdminProvider>
    </Router>
  );
}

export default App;