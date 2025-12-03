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
    <div className="font-sans selection:bg-lotus-100 ">
      <Header />
      <Hero />
      <About />
      <Services />
      <Team />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
