import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import Home from './pages/Home';
import Works from './pages/Works';
import WorkDetail from './pages/WorkDetail';
import ServiceDetail from './pages/ServiceDetail';
import Services from './pages/Services';
import About from './pages/About';
import Contacts from './pages/Contacts';
import Reviews from './pages/Reviews';
import Partners from './pages/Partners';
import Blog from './pages/Blog';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function MainLayout() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const location = useLocation();
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    // Only animate transitions if initial load is finished
    if (!initialLoading) {
      setTransitioning(true);
      const timer = setTimeout(() => setTransitioning(false), 400);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, initialLoading]);

  return (
    <>
      <Preloader onComplete={() => setInitialLoading(false)} />
      
      <div className={`page-wrapper ${initialLoading ? 'loading' : ''} ${transitioning ? 'loading' : ''}`}>
        <Navbar onPlayClick={() => setIsVideoOpen(true)} />
        <main>
          <Routes>
            <Route path="/" element={<Home isVideoOpen={isVideoOpen} setIsVideoOpen={setIsVideoOpen} />} />
            <Route path="/works" element={<Works />} />
            <Route path="/work/:id" element={<WorkDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/service/:serviceId" element={<ServiceDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <MainLayout />
    </Router>
  );
}

export default App;
