import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Header,
  HeroSection,
  CategoriesGrid,
  FeaturedListings,
  AiAssistant,
  LocationSelector,
  Footer
} from './components';

const Home = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <HeroSection />
      <CategoriesGrid />
      <FeaturedListings />
      <LocationSelector />
      <Footer />
      <AiAssistant />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;