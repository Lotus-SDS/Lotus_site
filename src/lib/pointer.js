import { useEffect } from 'react';
import { motionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';

// Posição do cursor normalizada em [-1, 1], compartilhada por todas as camadas de parallax.
const pointerX = motionValue(0);
const pointerY = motionValue(0);
let bound = false;

function bindPointer() {
    if (bound || typeof window === 'undefined') return;
    bound = true;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    window.addEventListener(
        'pointermove',
        (e) => {
            pointerX.set((e.clientX / window.innerWidth) * 2 - 1);
            pointerY.set((e.clientY / window.innerHeight) * 2 - 1);
        },
        { passive: true },
    );
}

const SPRING = { stiffness: 55, damping: 18, mass: 0.7 };

// Desloca uma camada conforme o cursor: amplitude em px para cada eixo.
export function usePointerShift(ampX, ampY) {
    const reduce = useReducedMotion();
    useEffect(bindPointer, []);
    const sx = useSpring(pointerX, SPRING);
    const sy = useSpring(pointerY, SPRING);
    const x = useTransform(sx, (v) => (reduce ? 0 : v * ampX));
    const y = useTransform(sy, (v) => (reduce ? 0 : v * ampY));
    return { x, y };
}
