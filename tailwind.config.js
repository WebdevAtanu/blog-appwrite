/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            keyframes: {
                scale: {
                    '0%': {
                        transform: 'scale(0.9)'
                    }, // Start at 90% scale
                    '100%': {
                        transform: 'scale(1)'
                    }, // End at 100% scale
                },
            },
            animation: {
                scale: 'scale 0.2s ease-in-out', // Define the animation properties
            },
        },
    },
    plugins: [
        require('daisyui'),
    ],
    daisyui: {
        themes: ["light", "dark", "cupcake", "dim"],
    },
};