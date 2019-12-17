
const path = require("path")

module.exports = {
    entry: "./src/js/index",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "/"
    },
    devServer: {
        publicPath: '/dist',
        contentBase: './src/js',
    }

}
