import { WebpackPlugin } from '@electron-forge/plugin-webpack'
import type { ForgeConfig } from '@electron-forge/shared-types'
import path from 'node:path'
import { mainConfig } from './webpack.main.config'
import { rendererConfig } from './webpack.renderer.config'

require('dotenv').config()
const packageJson = require('./package.json')
const iconDir = path.resolve(__dirname, 'src', 'lib', 'images', 'icons')

const { version } = packageJson

const config: ForgeConfig = {
    packagerConfig: {
        name: 'ITArmy',
        // executableName: 'itarmy',
        // icon: './src/lib/images/logo.png',
        asar: true,
        icon: path.resolve(__dirname, 'src', 'lib', 'images', 'icons', 'icon'),
        appBundleId: 'com.slamy.itarmy',
    },
    rebuildConfig: {},
    makers: [
        {
            name: '@electron-forge/maker-squirrel',
            platforms: ['win32'],
            config: (arch: any) => ({
                name: 'ITArmy',
                exe: 'itarmy.exe',
                authors: 'slamy',
                noMsi: true,
                setupExe: `ITArmy-${version}-win32-${arch}-setup.exe`,
                setupIcon: path.resolve(iconDir, 'logo.ico'),
                iconUrl:
                    'https://media.discordapp.net/attachments/818154748657664031/1128407510496325712/ITLogo.jpg',
            }),
        },
        {
            name: '@electron-forge/maker-zip',
            platforms: ['darwin'],
            config: {
                name: 'ITArmy',
            },
        },
        {
            name: '@electron-forge/maker-deb',
            platforms: ['linux'],
            config: {},
        },
        {
            name: '@electron-forge/maker-rpm',
            platforms: ['linux'],
            config: {},
        },
        {
            name: '@electron-forge/maker-wix',
            config: {
                name: 'itarmy',
                exe: 'itarmy.exe',
                icon: path.resolve(iconDir, 'logo.ico'),
            },
        },
    ],
    publishers: [
        {
            name: '@electron-forge/publisher-github',
            config: {
                repository: {
                    owner: 'opengs',
                    name: 'itarmykit',
                },
                draft: true,
                prerelease: false,
            },
        },
    ],
    plugins: [
        new WebpackPlugin({
            mainConfig,
            renderer: {
                config: rendererConfig,
                entryPoints: [
                    {
                        html: './src/index.html',
                        js: './src/renderer.ts',
                        name: 'main_window',
                        preload: {
                            js: './src/preload/preload.ts',
                        },
                    },
                ],
            },
        }),
    ],
}

export default config
