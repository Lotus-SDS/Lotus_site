import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import BackgroundWaves from './animations/BackgroundWaves';

const Hero = () => {
    const handleScroll = (e, targetId) => {
        e.preventDefault();
        const element = document.querySelector(targetId);
        if (element) {
            const isMobile = window.innerWidth < 1024;
            element.scrollIntoView({ behavior: 'smooth', block: isMobile ? 'start' : 'center' });
        }
    };

    return (
        <section className="min-h-screen flex items-center pt-24 sm:pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden relative">

            <div className="hidden sm:block">
                <BackgroundWaves />
            </div>

            {/* Mobile Background Gradient */}
            <div className="absolute inset-0 sm:hidden bg-gradient-to-b from-white via-lotus-50/30 to-white -z-20"></div>
            <div className="absolute inset-0 sm:hidden -z-10 opacity-30">
                <div className="absolute top-20 left-10 w-72 h-72 bg-lotus-200 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
                <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center max-w-4xl mx-auto">
                    <div className="h-4 sm:h-8 mb-4 sm:mb-6"></div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight mb-8 leading-tight">
                            Inovação que floresce <br className="hidden md:block" />
                            <span className="relative inline-block isolate">
                                <span className="absolute inset-0 text-transparent [-webkit-text-stroke:4px_white] -z-10" aria-hidden="true">através do código.</span>
                                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-lotus-500 to-emerald-600">através do código.</span>
                            </span>
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative mt-4 max-w-2xl mx-auto mb-10 sm:bg-none sm:p-0 sm:shadow-none bg-gradient-to-br from-lotus-900 to-slate-900 rounded-2xl p-6 shadow-2xl overflow-hidden border border-lotus-500/20 sm:border-none sm:rounded-none sm:overflow-visible"
                    >
                        {/* Decoração Mobile (Estilo Card Contato) */}
                        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-lotus-500 rounded-full opacity-20 blur-2xl sm:hidden"></div>
                        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 bg-lotus-300 rounded-full opacity-10 blur-2xl sm:hidden"></div>

                        <p className="relative z-10 text-xl text-white font-semibold leading-relaxed drop-shadow-md font-medium">
                            Transformamos problemas complexos em soluções digitais elegantes.
                            Ecossistemas de software robustos, escaláveis e focados na experiência do usuário.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
                    >
                        <a
                            href="#contato"
                            onClick={(e) => handleScroll(e, '#contato')}
                            className="px-8 py-4 rounded-full bg-lotus-600 text-white font-semibold text-lg hover:bg-lotus-700 transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
                        >
                            Iniciar Projeto <ArrowRight size={20} />
                        </a>
                        <a
                            href="#servicos"
                            onClick={(e) => handleScroll(e, '#servicos')}
                            className="px-8 py-4 rounded-full bg-white text-slate-700 border border-slate-200 font-semibold text-lg hover:bg-slate-50 transition-all flex items-center justify-center hover:scale-105 active:scale-95"
                        >
                            Nossos Serviços
                        </a>
                    </motion.div>
                </div>

                {/* Abstract Background Elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[800px] h-[800px] bg-lotus-100/50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
            </div>
        </section>
    );
};

export default Hero;
