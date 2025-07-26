import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SearchFilters from './components/SearchFilters';
import About from './components/About';
import Services from './components/Services';
import Doctors from './components/Doctors';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <SearchFilters />
      <About />
      <Services />
      <Doctors />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;