import React, { useState } from 'react';
import { Code2, Smartphone, Cloud, Cpu } from 'lucide-react';

const ServiceCard = ({ icon, title, description }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="group p-8 bg-lotus-1700 border-lotus-1700 hover:-translate-y-3 hover:translate-x-3 transition-all duration-300"
            style={{
                boxShadow: isHovered ? '0px 0px 20px #d9e497ff, -1px 1px 0px #d9e497ff, -2px 2px 0px #d9e497ff, -3px 3px 0px #d9e497ff, -4px 4px 0px #d9e497ff, -5px 5px 0px #d9e497ff, -6px 6px 0px #d9e497ff, -7px 7px 0px #d9e497ff, -8px 8px 0px #d9e497ff, -9px 9px 0px #d9e497ff, -10px 10px 0px #d9e497ff, -11px 11px 0px #d9e497ff, -12px 12px 0px #d9e497ff' : 'none'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
        >
            <div className="w-14 h-14 text-lotus-1500 flex items-center justify-center mb-6 group-hover:text-lotus-2300 transition-colors">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-lotus-1800 group-hover:text-lotus-2600 mb-3">{title}</h3>
            <p className="text-lotus-2000 leading-relaxed group-hover:text-lotus-2700">
                {description}
            </p>
        </div>
    );
};

const Services = () => {
    return (
        <section id="servicos" className="py-48 bg-lotus-1700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-24 items-end border-b-4 border-lotus-1500 pb-6">
                    <h2 className="text-[80px] sm:text-[110px] md:text-[150px] text-lotus-1500 font-bold  leading-none"

                    >Serviços</h2>
                    <p className="text-lg text-lotus-2300 pb-4 max-w-xl">
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
