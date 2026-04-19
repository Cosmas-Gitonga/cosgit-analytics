import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { Layout } from './components/layout/Layout';
import { ScrollToTop } from './components/common/ScrollToTop';
import { BlogProvider } from './context/BlogContext';
import { AdminProvider } from './context/AdminContext';
import { ServicesProvider } from './context/ServicesContext';
import { PageContentProvider } from './context/PageContentContext';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AdminProvider>
        <BlogProvider>
          <ServicesProvider>
            <PageContentProvider>
              <Layout>
                <AppRoutes />
              </Layout>
            </PageContentProvider>
          </ServicesProvider>
        </BlogProvider>
      </AdminProvider>
    </Router>
  );
}

export default App;