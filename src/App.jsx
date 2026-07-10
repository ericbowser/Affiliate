import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Landing from "./components/Landing";

// Route-level code splitting for secondary pages — homepage is eager (LCP route).
const Category = lazy(() => import("./components/Category"));
const Review = lazy(() => import("./components/Review"));
const Compare = lazy(() => import("./components/Compare"));
const About = lazy(() => import("./components/About"));
const NotFound = lazy(() => import("./components/NotFound"));
const DetectorMatch = lazy(() => import("./tools/detectorMatch/DetectorMatch.jsx"));
const SiteMap = lazy(() => import("./components/SiteMap"));
const BlogPost = lazy(() => import("./components/BlogPost"));
const Blog = lazy(() => import("./components/Blog"));
const WeatherPage = lazy(() => import("./components/WeatherPage"));

const PageFallback = () => (
  <div className="min-h-[50vh] bg-slate-900" aria-hidden="true" />
);

const App = () => {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="min-h-screen bg-slate-900 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/category/:slug" element={<Category />} />
              <Route path="/review/:id" element={<Review />} />
              <Route path="/compare/:id1/:id2" element={<Compare />} />
              <Route path="/tools/detector-match" element={<DetectorMatch />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/weather" element={<WeatherPage />} />
              <Route path="/guides/utah-sites-map" element={<SiteMap />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
