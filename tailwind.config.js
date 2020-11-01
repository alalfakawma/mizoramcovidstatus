module.exports = {
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
    },
    purge: ["./src/*.html", "./src/App.tsx", "./src/components/*"],
    theme: {
        extend: {},
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
