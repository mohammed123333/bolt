import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import SearchFilters from './components/SearchFilters';
import About from './components/About';
import Services from './components/Services';
import Doctors from './components/Doctors';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DrMuhanedAlzoubi from './pages/DrMuhanedAlzoubi';
import BookingPage from './pages/BookingPage';
import PersonalInfoPage from './pages/PersonalInfoPage';
import TermsConditions from './pages/TermsConditions';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <Hero />
              <SearchFilters />
              <About />
              <Services />
              <Doctors />
              <Contact />
              <Footer />
            </>
          } />
          <Route path="/DrMuhanedAlzoubi" element={<DrMuhanedAlzoubi />} />
          <Route path="/DrMuhanedAlzoubi/booking" element={<BookingPage />} />
          <Route path="/DrMuhanedAlzoubi/personal-info" element={<PersonalInfoPage />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PersonalInfoPage from './PersonalInfoPage';
import BookingPage from './BookingPage';
import TermsPage from './TermsPage';
import HomePage from './HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/personal-info" element={<PersonalInfoPage />} />
        <Route path="/terms-conditions" element={<TermsPage />} />
      </Routes>
    </Router>
  );
}

export default App;