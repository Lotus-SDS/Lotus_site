import React from 'react';
import { Github } from 'lucide-react';

const TeamMember = ({ name, role, image, github }) => (
    <div className="flex flex-col items-center text-center group">
        <div className="relative mb-6">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:shadow-lotus-200/50 transition-all">
                <img src={image} alt={name} className="w-full h-full object-cover" />
            </div>
            <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md text-slate-700 hover:text-lotus-600 transition-colors"
            >
                <Github size={20} />
            </a>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-1">{name}</h3>
        <p className="text-lotus-400 font-medium mb-2">{role}</p>
    </div>
);

const Team = () => {
    return (
        <section id="team" className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Liderança</h2>
                    <p className="text-lg text-slate-500">Mentes visionárias por trás da Lótus.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                    <TeamMember
                        name="João Paulo G. Azevedo"
                        role="Co-Founder & CEO"
                        image="https://github.com/jpguelerazevedo.png"
                        github="https://github.com/jpguelerazevedo"
                    />
                    <TeamMember
                        name="Pedro Henrique B. Duarte"
                        role="Co-Founder & CEO"
                        image="https://github.com/PhenBD.png"
                        github="https://github.com/PhenBD"
                    />
                </div>
            </div>
        </section>
    );
};

export default Team;
