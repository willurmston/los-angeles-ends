import path from 'path'
import asyncPlugin from 'preact-cli-plugin-async'

export default function(config, env, helpers) {
    // Use custom markdown-loader for scripts in content folder
    // It looks for: markdown`My example paragraph`
    // and replaces with HTML string
    config.module.loaders.push({
        enforce: 'pre',
        test:/\.js/,
        include: [
            path.resolve(__dirname, 'content/')
        ],
        use: [
            {loader: '../markdown-loader.js'}
        ]
    })

    if (env.production) {
        const fileLoader = helpers.getLoadersByName(config, 'file-loader')[0]
        fileLoader.rule.options = {
            name: 'assets/[name].[ext]'
        }
    } else {
        // Disables url-loader on big files, like videos
        // Instead, it will copy the file and return file path
        const urlLoader = helpers.getLoadersByName(config, 'url-loader')[0]
        urlLoader.rule.options = {
            limit: 8192,
            name: 'assets/[name].[ext]'
        }
    }

    asyncPlugin(config)
}
