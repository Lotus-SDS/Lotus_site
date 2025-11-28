import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import lotusLogo from '../assets/logo.png';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
                        <img src={lotusLogo} alt="Lotus Logo" className="h-10 -mt-1 -mr-3 w-auto" />
                        <span className="text-2xl font-bold text-slate-800 tracking-tight">Lotus</span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8 items-center">
                        <a href="#sobre" className="text-slate-600 hover:text-lotus-600 font-medium transition-colors">Sobre</a>
                        <a href="#servicos" className="text-slate-600 hover:text-lotus-600 font-medium transition-colors">Serviços</a>
                        <a href="#team" className="text-slate-600 hover:text-lotus-600 font-medium transition-colors">Time</a>
                        <a
                            href="#contato"
                            className="relative px-5 py-2.5 rounded-full bg-slate-900 text-white font-medium transition-all shadow-lg shadow-slate-200 hover:shadow-xl transform hover:-translate-y-0.5 overflow-hidden group"
                        >
                            <div className="absolute -top-8 -right-8 w-20 h-20 bg-lotus-500 rounded-full opacity-20 blur-2xl group-hover:opacity-40 transition-all duration-500"></div>
                            <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-blue-500 rounded-full opacity-20 blur-2xl group-hover:opacity-40 transition-all duration-500"></div>
                            <span className="relative z-10">Fale Conosco</span>
                        </a>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={toggleMenu} className="text-slate-600 hover:text-slate-900 focus:outline-none">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-100 shadow-lg animate-in slide-in-from-top-5">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        <a href="#sobre" onClick={toggleMenu} className="block px-3 py-3 rounded-lg text-base font-medium text-slate-600 hover:text-lotus-600 hover:bg-slate-50">Sobre</a>
                        <a href="#servicos" onClick={toggleMenu} className="block px-3 py-3 rounded-lg text-base font-medium text-slate-600 hover:text-lotus-600 hover:bg-slate-50">Serviços</a>
                        <a href="#team" onClick={toggleMenu} className="block px-3 py-3 rounded-lg text-base font-medium text-slate-600 hover:text-lotus-600 hover:bg-slate-50">Time</a>
                        <a href="#contato" onClick={toggleMenu} className="block px-3 py-3 mt-4 text-center rounded-lg text-base font-medium bg-lotus-50 text-lotus-700">Fale Conosco</a>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
