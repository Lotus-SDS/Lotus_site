import { useEffect, useState } from 'react';

// Devolve o primeiro caminho de imagem que carregar, ou null se nenhum existir.
// Permite soltar a imagem gerada em public/images/ em qualquer formato comum.
export function useFirstImage(candidates) {
    const [src, setSrc] = useState(null);
    const key = candidates.join('|');

    useEffect(() => {
        let cancelled = false;
        const list = key.split('|');
        const tryAt = (i) => {
            if (cancelled || i >= list.length) return;
            const img = new Image();
            img.onload = () => {
                if (!cancelled) setSrc(list[i]);
            };
            img.onerror = () => tryAt(i + 1);
            img.src = list[i];
        };
        tryAt(0);
        return () => {
            cancelled = true;
        };
    }, [key]);

    return src;
}
