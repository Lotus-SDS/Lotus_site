/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // Desativa o modo escuro automático do sistema
    theme: {
        extend: {
            colors: {
                lotus: {
                    50: '#f0fdf4',
                    100: '#dcfce7',
                    200: '#bbf7d0',
                    300: '#86efac',
                    400: '#4ade80',
                    500: '#22c55e',
                    600: '#16a34a',
                    700: '#15803d',
                    800: '#166534',
                    900: '#14532d',
                    1000: '#5D8736',
                    1100: '#14532D',
                    1200: '#A9C46C',
                    1300: '#F4FFC3',
                    1400: '#DCD7C9',
                    1500: '#BBC863',
                    1600: '#658C58',
                    1700: '#2C3930',
                    1800: '#6f7c73ff',
                    1900: '#D8E2AC',
                    2000: '#778873',
                    2100: '#c6cab1ff',
                    2200: '#cfd1c4ff',
                    2300: '#d9e497ff',
                    2400: '#29352cff',
                    2500: '#a6b15eff',
                    2600: '#c4ccc6ff',
                    2700: '#a6bba1ff',
                    2800: '#26663fff',
                    2900: '#49554dff',

                },
                slate: {
                    850: '#1e293b', // Custom dark for footer
                }
            },
            fontFamily: {
                sans: ['DM Sans', 'Inter', 'Roboto', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
