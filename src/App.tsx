import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
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
    <LanguageProvider>
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
    </LanguageProvider>
  );
}

export default App;