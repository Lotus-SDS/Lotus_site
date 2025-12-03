import React from 'react';
import { Mail, Linkedin } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contato" className="py-24 bg-lotus-1500 relative overflow-hidden">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className=" p-10 md:p-16 text-center shadow-2xl overflow-hidden relative">
                    {/* Background decoration */}

                    <h2 className="text-3xl md:text-4xl font-bold text-lotus-1100 mb-6">Vamos construir o futuro juntos?</h2>
                    <p className="text-lg text-lotus-2800 mb-10 max-w-2xl mx-auto">
                        Tem um projeto em mente? Entre em contato e descubra como a Lotus pode elevar o nível do seu negócio.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a
                            href="mailto:contato.lotus.sds@gmail.com"
                            className="relative px-8 py-4 bg-white text-slate-900 font-bold text-lg overflow-hidden group flex items-center justify-center"
                        >
                            <span className="absolute inset-0 bg-slate-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
                            <span className="relative z-10 flex items-center gap-2">
                                <Mail size={20} /> Falar com Especialista
                            </span>
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative px-8 py-4 bg-transparent border border-lotus-2800 text-white font-semibold text-lg overflow-hidden group flex items-center justify-center"
                        >
                            <span className="absolute inset-0 bg-lotus-2800 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
                            <span className="relative z-10 flex items-center gap-2">
                                <Linkedin size={20} /> LinkedIn
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
