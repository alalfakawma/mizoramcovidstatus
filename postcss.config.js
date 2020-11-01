const tailwindcss = require('tailwindcss');

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

const plugins = [ tailwindcss ];

if (!IS_DEVELOPMENT) {
    const purgecss = require('@fullhuman/postcss-purgecss');

    function extract(content) {
        return content.match(/[A-z0-0-:\/]+/g) || [];
    }

    plugins.push(
        purgecss({
            content: ['src/*.html', 'src/App.tsx', 'src/components/*'],
            extractors: [
                {
                    extractor: extract,
                    extensions: ['html']
                }
            ]
        })
    );
}

module.exports = {
    plugins: plugins,
}
