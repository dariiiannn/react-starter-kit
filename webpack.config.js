const dev = process.env.NODE_ENV !== "production";
const webpack = require( "webpack" );
const path = require( "path" );
const { BundleAnalyzerPlugin } = require( "webpack-bundle-analyzer" );
const FriendlyErrorsWebpackPlugin = require( "friendly-errors-webpack-plugin" );

const plugins = [
    new webpack.optimize.CommonsChunkPlugin( {
        name: "lib",
        minChunks: Infinity,
        filename: "js/[name].bundle.js",
    } ),
    new FriendlyErrorsWebpackPlugin(),
];

if ( !dev ) {
    plugins.push(
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin( {
            "process.env.NODE_ENV": JSON.stringify( "production" ),
        } ),
        new webpack.optimize.UglifyJsPlugin( { mangle: false, sourceMap: true } ),
        new BundleAnalyzerPlugin( {
            analyzerMode: "static",
            reportFilename: "webpack-report.html",
            openAnalyzer: false,
        } ),
    );
}

module.exports = {
    context: path.join( __dirname, "src" ),
    devtool: dev ? "none" : "source-map",
    entry: {
        app: "./js/App.js",
        lib: [ "react", "react-dom" ],
    },
    resolve: {
        modules: [
            path.resolve( "./src" ),
            "node_modules",
        ],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
            },
        ],
    },
    output: {
        path: path.resolve( __dirname, "dist" ),
        filename: "js/[name].bundle.js",
    },
    plugins,
};
