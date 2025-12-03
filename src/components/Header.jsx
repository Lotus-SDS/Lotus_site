import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const lotusLogo = '/LOTUSGREEN.svg';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [textColor, setTextColor] = useState('text-lotus-2000');

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleScroll = (e, targetId) => {
        e.preventDefault();
        const element = document.querySelector(targetId);
        if (element) {
            const isMobile = window.innerWidth < 1024;
            const isShortVertical = window.innerHeight < 850;
            element.scrollIntoView({ behavior: 'smooth', block: (isMobile || isShortVertical) ? 'start' : 'center' });
        }
    };

    useEffect(() => {
        const checkSection = () => {
            const aboutSection = document.getElementById('sobre');
            if (aboutSection) {
                const rect = aboutSection.getBoundingClientRect();
                const headerHeight = 80; // Approximate header height

                // Check if the header is overlapping with the About section
                if (rect.top <= headerHeight && rect.bottom >= headerHeight) {

                    setTextColor('hover:text-lotus-2000')
                } else {
                    setTextColor('text-lotus-1300');


                }
            }
        };

        window.addEventListener('scroll', checkSection);
        // Initial check
        checkSection();

        return () => window.removeEventListener('scroll', checkSection);
    }, []);

    return (
        <header className={`fixed w-full z-50 ${isMenuOpen ? 'bg-white' : ''}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center items-center h-20">

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8 items-center">
                        <a href="#inicio" onClick={(e) => handleScroll(e, '#hero')} className={`${textColor} hover:text-lotus-1900 font-medium transition-colors`}>Início</a>
                        <a href="#sobre" onClick={(e) => handleScroll(e, '#sobre')} className={`${textColor} hover:text-lotus-1900 font-medium transition-colors`}>Sobre</a>
                        <a href="#servicos" onClick={(e) => handleScroll(e, '#servicos')} className={`${textColor} hover:text-lotus-1900 font-medium transition-colors`}>Serviços</a>
                        <a href="#team" onClick={(e) => handleScroll(e, '#team')} className={`${textColor} hover:text-lotus-1900 font-medium transition-colors`}>Time</a>
                        <a href="#contato" onClick={(e) => handleScroll(e, '#contato')} className={`relative ${textColor} hover:text-lotus-1900 font-medium transition-colors`}>
                            Contato
                        </a>
                    </nav>

                    <div className="md:hidden flex items-center absolute right-6">
                        <button onClick={toggleMenu} className={`${isMenuOpen ? 'text-lotus-2000' : textColor} hover:text-lotus-1900 focus:outline-none`}>
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-white  border-t border-slate-100">
                    <div className="px-4 py-6 space-y-2">
                        <a href="#hero" onClick={(e) => { toggleMenu(); handleScroll(e, '#hero'); }} className="block px-3 py-3 text-base font-medium text-lotus-1700 hover:text-lotus-2000 hover:bg-slate-50">Início</a>
                        <a href="#sobre" onClick={(e) => { toggleMenu(); handleScroll(e, '#sobre'); }} className="block px-3 py-3 text-base font-medium text-lotus-1700 hover:text-lotus-2000 hover:bg-slate-50">Sobre</a>
                        <a href="#servicos" onClick={(e) => { toggleMenu(); handleScroll(e, '#servicos'); }} className="block px-3 py-3  text-base font-medium text-lotus-1700 hover:text-lotus-2000 hover:bg-slate-50">Serviços</a>
                        <a href="#team" onClick={(e) => { toggleMenu(); handleScroll(e, '#team'); }} className="block px-3 py-3 text-base font-medium text-lotus-1700 hover:text-lotus-2000 hover:bg-slate-50">Time</a>
                        <a href="#contato" onClick={(e) => { toggleMenu(); handleScroll(e, '#contato'); }} className="block px-3 py-3 text-base font-medium text-lotus-1700 hover:text-lotus-2000 hover:bg-slate-50">Contato</a>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
