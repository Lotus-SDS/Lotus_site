import React from 'react';
import { ArrowRight } from 'lucide-react';
import BackgroundWaves from './animations/BackgroundWaves';

const Hero = () => {
    return (
        <section className="min-h-screen flex items-center pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden relative">
            <BackgroundWaves />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center max-w-4xl mx-auto">
                    <div className="h-8 mb-6"></div>
                    <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight mb-8 leading-tight">
                        Inovação que floresce <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-lotus-500 to-emerald-600">através do código.</span>
                    </h1>
                    <p className="mt-4 text-xl text-white max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-md font-medium">
                        Transformamos problemas complexos em soluções digitais elegantes.
                        Ecossistemas de software robustos, escaláveis e focados na experiência do usuário.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                        <a
                            href="#contato"
                            className="px-8 py-4 rounded-full bg-lotus-600 text-white font-semibold text-lg hover:bg-lotus-700 transition-all shadow-lg shadow-lotus-200 hover:shadow-lotus-300 flex items-center justify-center gap-2"
                        >
                            Iniciar Projeto <ArrowRight size={20} />
                        </a>
                        <a
                            href="#servicos"
                            className="px-8 py-4 rounded-full bg-white text-slate-700 border border-slate-200 font-semibold text-lg hover:bg-slate-50 transition-all flex items-center justify-center"
                        >
                            Nossos Serviços
                        </a>
                    </div>
                </div>

                {/* Abstract Background Elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[800px] h-[800px] bg-lotus-100/50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
            </div>
        </section>
    );
};

export default Hero;
