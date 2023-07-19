import path from 'path'
import type { Configuration } from 'webpack'
import { plugins } from './webpack.plugins'
import { rules } from './webpack.rules'

rules.push(
    {
        test: /\.css$/,
        use: [
            'style-loader',
            {
                loader: 'css-loader',
                options: {
                    importLoaders: 1,
                },
            },
            {
                loader: 'postcss-loader',
                options: {
                    postcssOptions: {
                        config: './postcss.config.js',
                    },
                },
            },
        ],
    },
    {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'images/',
                },
            },
        ],
    }
)

export const rendererConfig: Configuration = {
    module: {
        rules,
    },
    plugins,
    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
        alias: {
            '@preload': path.resolve(__dirname, './src/preload'),
            '@components': path.resolve(__dirname, './src/lib/components'),
            '@sections': path.resolve(__dirname, './src/lib/sections'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@motions': path.resolve(__dirname, './src/lib/motions'),
            '@images': path.resolve(__dirname, './src/lib/images'),
            '@type': path.resolve(__dirname, './src/lib/types'),
            '@store': path.resolve(__dirname, './src/lib/store'),
        },
    },
}
