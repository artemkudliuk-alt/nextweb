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
  }, []);
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

      {/* Global CSS Aurora Background */}
      <div className="global-aurora-bg aurora-bg-container">
        <div className="aurora-blob cyan"></div>
        <div className="aurora-blob magenta"></div>
        <div className="aurora-blob purple"></div>
      </div>

      <div
        className={`page-wrapper ${!preloaderComplete ? "loading" : ""} ${transitioning ? "loading" : ""}`}
      >
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
