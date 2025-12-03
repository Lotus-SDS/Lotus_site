import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section id="hero" className="bg-lotus-1100 pt-24 flex flex-col relative border-b-4 border-lotus-1300 md:border-0">

            <div className="flex items-center justify-center mb-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col items-center justify-center text-center pb-24 space-y-0">
                        <motion.img
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.15 }}
                            src="/src/assets/LOTUS-VERDE-PPK(1).png"
                            alt="Lotus"
                            className="color-lotus-1900 w-72 md:w-96 lg:w-[500px] h-auto mb-5"
                        />

                        <motion.h2
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.30 }}
                            className="text-5xl md:text-7xl lg:text-[100px] font-normal text-lotus-1900 tracking-tight leading-none"
                        >
                            lotusdev.com.br
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.45 }}
                            className="text-2xl md:text-3xl lg:text-[55px] text-lotus-1900/80 font-light leading-tight"
                        >
                            Soluções de desenvolvimento de software
                        </motion.p>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
        </section>
    );
};

export default Hero;
