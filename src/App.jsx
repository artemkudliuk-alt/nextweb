import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Preloader from "./components/Preloader";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contacts from "./pages/Contacts";
import Home from "./pages/Home";
import Partners from "./pages/Partners";
import Reviews from "./pages/Reviews";
import ServiceDetail from "./pages/ServiceDetail";
import Services from "./pages/Services";
import WorkDetail from "./pages/WorkDetail";
import Works from "./pages/Works";
import { useUIStore } from "./store/useUIStore";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function MainLayout() {
  const preloaderComplete = useUIStore((state) => state.preloaderComplete);
  const setPreloaderComplete = useUIStore((state) => state.setPreloaderComplete);
  const transitioning = useUIStore((state) => state.transitioning);
  const setTransitioning = useUIStore((state) => state.setTransitioning);

  const _location = useLocation();

  useEffect(() => {
    // Only animate transitions if initial load is finished
    if (preloaderComplete) {
      setTransitioning(true);
      const timer = setTimeout(() => setTransitioning(false), 400);
      return () => clearTimeout(timer);
    }
  }, [preloaderComplete, setTransitioning]);

  return (
    <>
      <Preloader onComplete={() => setPreloaderComplete(true)} />

      {/* SVG Gooey filter — creates organic blob merging effect (lava lamp) */}
      <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
        <defs>
          <filter id="lava-goo" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="22" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 14 -5"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div
        className={`page-wrapper ${!preloaderComplete ? "loading" : ""} ${transitioning ? "loading" : ""}`}
      >
        {/* Global Lava Lamp Background — GPU-only animations (transform + opacity) */}
        <div className="global-aurora-bg lava-lamp-bg" aria-hidden="true">
          <div className="lava-blob lava-blob--1"></div>
          <div className="lava-blob lava-blob--2"></div>
          <div className="lava-blob lava-blob--3"></div>
          <div className="lava-blob lava-blob--4"></div>
          <div className="lava-blob lava-blob--5"></div>
          <div className="lava-blob lava-blob--6"></div>
        </div>

        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
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
