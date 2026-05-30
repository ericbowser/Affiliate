import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Landing from "./components/Landing";
import Category from "./components/Category";
import Review from "./components/Review";
import Compare from "./components/Compare";
import About from "./components/About";
import NotFound from "./components/NotFound";
import DetectorMatch from "./tools/detectorMatch/DetectorMatch.jsx";
import SiteMap from "./components/SiteMap";
import BlogPost from "./components/BlogPost";
import Blog from "./components/Blog";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/category/:slug" element={<Category />} />
            <Route path="/review/:id" element={<Review />} />
            <Route path="/compare/:id1/:id2" element={<Compare />} />
            <Route path="/tools/detector-match" element={<DetectorMatch />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/guides/utah-sites-map" element={<SiteMap />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
