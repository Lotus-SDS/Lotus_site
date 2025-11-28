import React from 'react';
import { motion } from 'framer-motion';

const BackgroundWaves = () => {
    // Definição das ondas
    const waves = [
        {
            color: "#f0fdf4", // lotus-50 (Quase branco/verde)
            width: 20, // Mais fina
            d: "M-200,360 C400,260 800,660 1600,160",
            delay: 0
        },
        {
            color: "#86efac", // lotus-300 (Verde claro)
            width: 35,
            d: "M-200,380 C400,280 800,680 1600,180",
            delay: 0.1
        },
        {
            color: "#22c55e", // lotus-500 (Verde médio)
            width: 50,
            d: "M-200,420 C400,320 800,720 1600,220",
            delay: 0.2
        },
        {
            color: "#15803d", // lotus-700 (Verde escuro)
            width: 65,
            d: "M-200,460 C400,360 800,760 1600,260",
            delay: 0.3
        },
        {
            color: "#022c22", // lotus-950 (Muito escuro)
            width: 80, // Mais grossa
            d: "M-200,500 C400,400 800,800 1600,300",
            delay: 0.4
        }
    ]; return (
        <div className="absolute top-0 left-0 w-full h-screen overflow-hidden pointer-events-none">
            <svg
                className="absolute w-full h-full"
                viewBox="0 0 1440 800"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
            >
                <defs>
                    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.3" />
                    </filter>
                </defs>

                {waves.map((wave, index) => (
                    <motion.path
                        key={index}
                        d={wave.d}
                        fill="none"
                        stroke={wave.color}
                        strokeWidth={wave.width}
                        strokeLinecap="round"
                        filter="url(#shadow)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                            pathLength: 1,
                            opacity: 1
                        }}
                        transition={{
                            duration: 2,
                            ease: "easeOut",
                            delay: wave.delay
                        }}
                    />
                ))}
            </svg>
        </div>
    );
};

export default BackgroundWaves;