import React from 'react';
import CodeTypingAnimation from './CodeTypingAnimation';

const About = () => {
    return (
        <section id="sobre" className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative">
                        <div className="bg-slate-900 rounded-3xl p-6 shadow-2xl relative overflow-hidden aspect-square flex items-center justify-center border border-slate-800">
                            {/* Background decoration */}
                            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-lotus-500 rounded-full opacity-20 blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-emerald-500 rounded-full opacity-20 blur-3xl"></div>

                            <div className="relative z-10 w-full h-full bg-slate-950/50 rounded-xl p-4 border border-slate-800 backdrop-blur-sm">
                                <CodeTypingAnimation />
                            </div>
                        </div>
                        <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl max-w-xs hidden md:block border border-slate-100 z-20">
                            <p className="text-lotus-600 font-serif italic text-lg">"A simplicidade é o último grau de sofisticação."</p>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Sobre a Lótus</h2>
                        <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                            Fundada em 2025, a Lótus nasceu com uma missão clara: elevar o padrão do desenvolvimento de software.
                            Não escrevemos apenas código; criamos experiências digitais que impulsionam negócios e facilitam vidas.
                        </p>
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            Nossa abordagem combina rigor técnico com sensibilidade estética. Acreditamos que softwares poderosos
                            não precisam ser complicados. Pelo contrário, a verdadeira sofisticação está na entrega de soluções
                            intuitivas e eficientes.
                        </p>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                                <h3 className="text-3xl font-bold text-lotus-600 mb-1">2025</h3>
                                <p className="text-sm text-slate-500">Ano de Fundação</p>
                            </div>
                            <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                                <h3 className="text-3xl font-bold text-lotus-600 mb-1">100%</h3>
                                <p className="text-sm text-slate-500">Foco em Qualidade</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
