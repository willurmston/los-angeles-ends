export default function(config, env, helpers) {
    // Disables url-loader on big files, like videos
    // Instead, it will copy the file and return file path
    const urlLoader = helpers.getLoadersByName(config, 'url-loader')[0]
    urlLoader.rule.options = {
        limit: 8192
    }
}
