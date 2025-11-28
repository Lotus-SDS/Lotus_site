import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="min-h-screen font-sans text-slate-600 bg-white selection:bg-lotus-100 selection:text-lotus-900">
      <Header />
      <Hero />
      <div className="h-24 bg-gradient-to-b from-white to-slate-50"></div>
      <About />
      <div className="h-24 bg-gradient-to-b from-slate-50 to-white"></div>
      <Services />
      <div className="h-24 bg-gradient-to-b from-white to-slate-50"></div>
      <Team />
      <div className="h-24 bg-gradient-to-b from-slate-50 to-white"></div>
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
