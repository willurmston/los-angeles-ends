export default function(config, env, helpers) {
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
}
