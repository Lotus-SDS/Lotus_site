import React from 'react';
import { Mail, Linkedin } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contato" className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="bg-slate-900 rounded-3xl p-10 md:p-16 text-center shadow-2xl overflow-hidden relative">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-lotus-500 rounded-full opacity-20 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>

                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Vamos construir o futuro juntos?</h2>
                    <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
                        Tem um projeto em mente? Entre em contato e descubra como a Lotus pode elevar o nível do seu negócio.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a
                            href="mailto:contato.lotus.sds@gmail.com"
                            className="px-8 py-4 rounded-full bg-white text-slate-900 font-bold text-lg hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
                        >
                            <Mail size={20} /> Falar com Especialista
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 rounded-full bg-transparent border border-slate-600 text-white font-semibold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                        >
                            <Linkedin size={20} /> LinkedIn
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
