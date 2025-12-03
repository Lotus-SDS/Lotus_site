import React from 'react';
import { Github, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-slate-100 pt-4 pb-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-2xl font-bold text-lotus-1100">Lotus</span>
                        </div>
                        <p className="text-lotus-1700 max-w-xs">
                            Inovação que floresce através do código. Soluções digitais para um mundo conectado.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-lotus-1100 mb-4">Links Rápidos</h4>
                        <ul className="space-y-2">
                            <li><a href="#sobre" className="text-lotus-1700 hover:text-lotus-1800 transition-colors">Sobre</a></li>
                            <li><a href="#servicos" className="text-lotus-1700 hover:text-lotus-1800 transition-colors">Serviços</a></li>
                            <li><a href="#team" className="text-lotus-1700 hover:text-lotus-1800 transition-colors">Time</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-lotus-1100 mb-4">Contato</h4>
                        <ul className="space-y-2">
                            <li><a href="mailto:contato.lotus.sds@gmail.com" className="text-lotus-1700 hover:text-lotus-1800 transition-colors break-all">contato.lotus.sds@gmail.com</a></li>
                            <li><span className="text-lotus-1700">Espírito Santo, Brasil</span></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-100 pt-4 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-400 text-sm">© 2025 Lotus Soluções em Desenvolvimento de Software. Todos os direitos reservados.</p>
                    <div className="flex space-x-4">
                        <a href="https://github.com/Lotus-SDS" className="text-slate-400 hover:text-lotus-1800 transition-colors"><Github size={20} /></a>
                        <a href="https://www.linkedin.com" className="text-slate-400 hover:text-lotus-1800 transition-colors"><Linkedin size={20} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
