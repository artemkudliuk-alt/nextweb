import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import Home from './pages/Home';
import Works from './pages/Works';
import WorkDetail from './pages/WorkDetail';

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
