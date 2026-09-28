/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Fundo: vazio quase preto com um leve tom verde
                void: token('void'),
                ink: token('ink'),
                // Texto: principal, secundário e apagado
                bone: token('bone'),
                sage: token('sage'),
                moss: token('moss'),
                // Única fonte de luz: o verde-lima do logo (#B7C95B)
                lime: {
                    DEFAULT: token('lime'),
                    hi: token('lime-hi'),
                },
            },
            fontFamily: {
                sans: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
            },
            maxWidth: {
                shell: '1360px',
            },
            transitionTimingFunction: {
                expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
            },
            keyframes: {
                marquee: {
                    from: { transform: 'translate3d(0, 0, 0)' },
                    to: { transform: 'translate3d(-50%, 0, 0)' },
                },
                caret: {
                    '0%, 49%': { opacity: '1' },
                    '50%, 100%': { opacity: '0' },
                },
                breathe: {
                    '0%, 100%': { transform: 'scale(1)', opacity: '0.9' },
                    '50%': { transform: 'scale(1.35)', opacity: '0.45' },
                },
            },
            animation: {
                marquee: 'marquee 48s linear infinite',
                caret: 'caret 1.1s steps(1) infinite',
                breathe: 'breathe 2.4s ease-in-out infinite',
            },
        },
    },
    plugins: [],
}
