let mix = require('laravel-mix');
let webpack = require('webpack');

mix.webpackConfig({
    plugins: [
        new webpack.DefinePlugin({
            'process.env': `${JSON.stringify(process.env)}`
        })
    ]
});

mix.autoload({
    jquery: ['$', 'window.jQuery',"jQuery","window.$","jquery","window.jquery"],
});

mix.sass('source/assets_builds/scss/style.scss','public_html/assets/css/style.min.css')
   .options({
        processCssUrls: false
    })

mix.js(
    [
        'source/assets_builds/js/sendFormAjaxCreateAccount.js',
        'source/assets_builds/js/sendFormAjaxLoginAuthorization.js',
        'source/assets_builds/js/renderPgMyFavorits.js',
        'source/assets_builds/js/renderPgSearch.js',
        'source/assets_builds/js/logout.js',
        'source/assets_builds/js/dateCurrent.js',
        'source/assets_builds/js/toastVannila.js',
    ], 'public_html/assets/js/app.min.js');
