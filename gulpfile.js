const {src , dest} = require('gulp');
exports.default = function fontawesome(){
    // place code for your default task here
    return src(["node_modules/@fortawesome/fontawesome-free/js/brands.js",
        "node_modules/@fortawesome/fontawesome-free/js/solid.js",
        "node_modules/@fortawesome/fontawesome-free/js/brands.js",
        "node_modules/@fortawesome/fontawesome-free/js/fontawesome.js",
        "node_modules/@fortawesome/fontawesome-free/webfonts/*"
    ])
.pipe(dest('dist/font-awesome'))

}



