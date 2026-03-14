import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import TermsAndConditions from './pages/TermsAndConditions';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';
import Recipes from './pages/Recipes';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import AdminPanel from './pages/AdminPanel';
import NotFound from './pages/NotFound';
import FloatingContactButtons from './components/ui/FloatingContactButtons';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppShell = () => {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith('/fruitllyadminpanel');

  return (
    <div className="min-h-screen flex flex-col font-body">
      {!isAdminRoute && <Navbar />}

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:postId" element={<BlogDetails />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:categoryId/:productId" element={<ProductDetails />} />
          <Route path="/fruitllyadminpanel" element={<AdminPanel />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!isAdminRoute && <FloatingContactButtons />}
      {!isAdminRoute && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppShell />
    </Router>
  );
}
