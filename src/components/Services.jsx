import React from 'react';
import { Code2, Smartphone, Cloud, Cpu } from 'lucide-react';

const ServiceCard = ({ icon, title, description }) => (
    <div className="group p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className="w-14 h-14 rounded-xl bg-lotus-50 text-lotus-600 flex items-center justify-center mb-6 group-hover:bg-lotus-600 group-hover:text-white transition-colors">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
        <p className="text-slate-500 leading-relaxed">
            {description}
        </p>
    </div>
);

const Services = () => {
    return (
        <section id="servicos" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Nossos Serviços</h2>
                    <p className="text-lg text-slate-500">
                        Oferecemos um leque completo de soluções tecnológicas para transformar sua visão em realidade digital.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <ServiceCard
                        icon={<Code2 size={32} />}
                        title="Desenvolvimento Web"
                        description="Sistemas complexos, dashboards interativos e Landing Pages de alta conversão com React e Next.js."
                    />
                    <ServiceCard
                        icon={<Smartphone size={32} />}
                        title="Aplicativos Móveis"
                        description="Apps nativos e híbridos para iOS e Android que oferecem performance excepcional e UX fluida."
                    />
                    <ServiceCard
                        icon={<Cloud size={32} />}
                        title="Arquitetura Cloud"
                        description="Infraestrutura escalável e segura na AWS ou Azure, com práticas modernas de DevOps e CI/CD."
                    />
                    <ServiceCard
                        icon={<Cpu size={32} />}
                        title="Integração com IA"
                        description="Implementação de modelos de Inteligência Artificial para automatizar processos e gerar insights."
                    />
                </div>
            </div>
        </section>
    );
};

export default Services;
