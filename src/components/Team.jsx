import React, { useState } from 'react';
import { Github } from 'lucide-react';

const TeamMember = ({ name, role, image, github }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="flex flex-col items-center text-center border-4 border-lotus-1700 p-8 bg-lotus-1700 transition-all duration-300 hover:-translate-y-3 hover:translate-x-3"
            style={{
                boxShadow: isHovered ? '0px 0px 20px #d9e497ff, -1px 1px 0px #d9e497ff, -2px 2px 0px #d9e497ff, -3px 3px 0px #d9e497ff, -4px 4px 0px #d9e497ff, -5px 5px 0px #d9e497ff, -6px 6px 0px #d9e497ff, -7px 7px 0px #d9e497ff, -8px 8px 0px #d9e497ff, -9px 9px 0px #d9e497ff, -10px 10px 0px #d9e497ff, -11px 11px 0px #d9e497ff, -12px 12px 0px #d9e497ff' : 'none'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
        >
            <div className="relative mb-6 peer group">
                <div className="w-40 h-40 overflow-hidden border-lotus-1700 shadow-lg transition-all">
                    <img src={image} alt={name} className="w-full h-full object-cover" />
                </div>
                <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-0 left-0 p-2 rounded-full shadow-md text-lotus-2600 hover:text-white group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-colors"
                >
                    <Github size={20} />
                </a>
            </div>
            <h3 className="text-xl font-bold text-lotus-2300 mb-1 transition-all duration-300 peer-hover:text-lotus-2300 peer-hover:drop-shadow-[0_0_8px_rgba(217,228,151,0.8)]">{name}</h3>
            <p className="text-lotus-2700 text-bold font-medium mb-2 transition-all duration-300 peer-hover:text-lotus-2600 peer-hover:drop-shadow-[0_0_8px_rgba(217,228,151,0.8)]">{role}</p>
        </div>
    );
};

const Team = () => {
    return (
        <section id="team" className="py-60  bg-lotus-1700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 xl:grid-cols-10 gap-0 mb-24 md:items-end border-b-4 border-lotus-1500 pb-6  text-left md:text-right">
                    <p className="text-lg text-lotus-2300 pb-4 pt-8 xl:pt-0 max-w-xl xl:col-span-4 md:ml-auto order-2 xl:order-1 ">
                        Mentes por trás da Lotus.
                    </p>

                    <h2 className="text-[70px] sm:text-[110px] md:text-[150px] text-lotus-1500 font-bold leading-none xl:col-span-6 order-1 xl:order-2"
                    >Liderança</h2>
                </div>
                <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto"
                >
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
