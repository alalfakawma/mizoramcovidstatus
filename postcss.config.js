const tailwindcss = require('tailwindcss');

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

const plugins = [ tailwindcss ];

if (!IS_DEVELOPMENT) {
    const purgecss = require('@fullhuman/postcss-purgecss');

    plugins.push(
        purgecss({
            content: ['src/*.html', 'src/App.tsx', 'src/components/*'],
            defaultExtractor: content => {
                // Capture as liberally as possible, including things like `h-(screen-1.5)`
                const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []

                // Capture classes within other delimiters like .block(class="w-1/2") in Pug
                const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || []

                return broadMatches.concat(innerMatches)
            }
        })
    );
}

module.exports = {
    plugins: plugins,
}
