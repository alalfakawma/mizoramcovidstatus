module.exports = {
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
    },
    purge: { 
        content: ["./src/*.html", "./src/App.tsx", "./src/components/*"],

        options: {
            whitelist: ['w-2/4', 'w-1/4'],
        }
    },
    theme: {
        extend: {
            opacity: {
                '90': '0.90',
            }
        },
        fontFamily: {
            sans: ['Barlow', 'Helvetica', 'Arial', 'sans-serif'],
            serif: ['Barlow', 'Helvetica', 'Arial', 'sans-serif'],
            mono: ['Barlow', 'Helvetica', 'Arial', 'sans-serif'],
            display: ['Barlow', 'Helvetica', 'Arial', 'sans-serif'],
            body: ['Barlow', 'Helvetica', 'Arial', 'sans-serif']
        }
    },
    variants: {
        borderStyle: ['responsive', 'hover'],
    },
    plugins: [],
}
