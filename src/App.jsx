import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleMapsProvider } from "./context/GoogleMapsContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Route-level code splitting: each page ships only its own JS instead of
// every route bundled into one payload. SRP/Open-Closed — add a new route
// by adding one lazy import + one <Route>, nothing else changes.
const Landing = lazy(() => import("./components/Landing"));
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
  <div className="min-h-[60vh] flex items-center justify-center bg-slate-900">
    <div className="h-8 w-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

// Only routes that actually render a map pay for the Google Maps JS SDK.
// Previously this wrapped the entire app, so every page (About, reviews,
// comparisons, weather, etc.) loaded the Maps script on every visit.
const withMaps = (element) => <GoogleMapsProvider>{element}</GoogleMapsProvider>;

const App = () => {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="min-h-screen bg-slate-900 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={withMaps(<Landing />)} />
              <Route path="/category/:slug" element={<Category />} />
              <Route path="/review/:id" element={<Review />} />
              <Route path="/compare/:id1/:id2" element={<Compare />} />
              <Route path="/tools/detector-match" element={<DetectorMatch />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={withMaps(<BlogPost />)} />
              <Route path="/weather" element={<WeatherPage />} />
              <Route path="/guides/utah-sites-map" element={withMaps(<SiteMap />)} />
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
