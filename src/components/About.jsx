import React from 'react';
import CodeTypingAnimation from './animations/CodeTypingAnimation';

const About = () => {
    return (
        <section id="sobre" className="py-48 pb-48  bg-lotus-1300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative">
                        <div className="bg-lotus-1900  p-6 shadow-2xl relative overflow-hidden h-[400px] lg:h-auto lg:aspect-square flex items-center justify-center border border-slate-800">
                            {/* Background decoration */}

                            <CodeTypingAnimation />

                        </div>

                    </div>
                    <div>
                        <div className="md:grid md:grid-cols-2 md:gap-12 lg:flex lg:flex-col lg:gap-0">
                            <div className="flex flex-col mb-6">
                                <h2
                                    className="text-[120px] md:text-[135px] lg:text-[150px] font-bold text-lotus-1700 leading-none 
                                    [text-shadow:1px_1px_0px_black,2px_2px_0px_black,3px_3px_0px_black,4px_4px_0px_black,5px_5px_0px_black,6px_6px_0px_black,7px_7px_0px_black,8px_8px_0px_black,9px_9px_0px_black,10px_10px_0px_black,11px_11px_0px_black,12px_12px_0px_black]
                                    "
                                >
                                    Sobre
                                </h2>
                                <h2
                                    className="text-[120px] md:text-[135px] lg:text-[150px] font-bold text-lotus-1700 leading-none 
                                    [text-shadow:1px_1px_0px_black,2px_2px_0px_black,3px_3px_0px_black,4px_4px_0px_black,5px_5px_0px_black,6px_6px_0px_black,7px_7px_0px_black,8px_8px_0px_black,9px_9px_0px_black,10px_10px_0px_black,11px_11px_0px_black,12px_12px_0px_black]
                                    "
                                >
                                    Lotus
                                </h2>
                            </div>
                            <div className="md:pt-4 lg:pt-0">
                                <p className="text-lg text-lotus-1700 mb-6 leading-relaxed">
                                    Fundada em 2025, a Lotus nasceu com uma missão clara: elevar o padrão do desenvolvimento de software.
                                    Não escrevemos apenas código, criamos experiências digitais que impulsionam negócios e facilitam vidas.
                                </p>
                                <p className="text-lg text-lotus-1700 mb-10 leading-relaxed">
                                    Nossa abordagem combina rigor técnico com sensibilidade estética. Acreditamos que softwares poderosos
                                    não precisam ser complicados. Pelo contrário, a verdadeira sofisticação está na entrega de soluções
                                    intuitivas e eficientes.
                                </p>
                            </div>
                        </div>


                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="relative group">
                                {/* <div className="absolute top-3 left-3 w-full h-full border-2 border-slate-900"></div>*/}

                                <div className="relative p-4 bg-lotus-1700 z-10"

                                    style={{ boxShadow: ' 1px 1px 0px black,2px 2px 0px black,3px 3px 0px black, 4px 4px 0px black,5px 5px 0px black,6px 6px 0px black, 7px 7px 0px black, 8px 8px 0px black, 9px 9px 0px black,10px 10px 0px black,11px 11px 0px black, 12px 12px 0px black' }}>
                                    <h3 className="text-4xl font-bold text-lotus-2000 mb-1">2025</h3>
                                    <p className="texty-md text-lotus-2000">Ano de Fundação</p>
                                </div>
                            </div>
                            <div className="relative group">
                                {/* <div className="absolute top-3 left-3 w-full h-full border-2 border-slate-900"></div>*/}

                                <div className="relative p-4 bg-lotus-1700 z-10"

                                    style={{ boxShadow: ' 1px 1px 0px black,2px 2px 0px black,3px 3px 0px black, 4px 4px 0px black,5px 5px 0px black,6px 6px 0px black, 7px 7px 0px black, 8px 8px 0px black, 9px 9px 0px black,10px 10px 0px black,11px 11px 0px black, 12px 12px 0px black' }}>
                                    <h3 className="text-4xl font-bold text-lotus-2000 mb-1">100%</h3>
                                    <p className="text-md text-lotus-2000">Foco em Qualidade</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
