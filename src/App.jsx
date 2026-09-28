import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Approach from './components/Approach';
import Services from './components/Services';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Stem from './components/animations/Stem';

const App = () => {
    return (
        <div className="relative">
            <a
                href="#conteudo"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-lime focus:px-5 focus:py-3 focus:text-void"
            >
                Pular para o conteúdo
            </a>
            <Header />
            <main id="conteudo" tabIndex={-1} className="outline-none">
                <Hero />
                <About />
                <Approach />
                <Services />
                <Team />
                <Contact />
            </main>
            <Footer />
            <Stem />
            <div aria-hidden="true" className="grain pointer-events-none fixed inset-0 z-[60]" />
        </div>
    );
};

export default App;
