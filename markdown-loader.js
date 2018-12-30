import MarkdownIt from 'markdown-it'
import iterator from 'markdown-it-for-inline'

// Set up markdown parser
const markdown = MarkdownIt({
    typographer: true,
    quotes: '“”‘’',
    breaks: false
})

// Add target _blank to all links so they open in new tabs
markdown.use(iterator, 'url_new_win', 'link_open', function (tokens, idx) {
    var aIndex = tokens[idx].attrIndex('target')
    if (aIndex < 0) {
        tokens[idx].attrPush(['target', '_blank'])
    } else {
        tokens[idx].attrs[aIndex][1] = '_blank'
    }
})

module.exports = moduleString => {
    // markdown.options.breaks = true;
    // Get array of strings that look like this:
    // markdown`
    //      a dream of falling daylight
    //      underneath the orange glow so familiar in los angeles
    //      as a cloud blooms on the horizon
    // `
    const markdownStrings = moduleString.match(/markdown`([\S\s]+?)`/g)

    if (markdownStrings) {
        let newModuleString = moduleString
        markdownStrings.forEach(string => {
            // Remove opening/closing tags and whitespace at start of lines
            const content = string.slice(9, -1).replace(/ +(?= )/g, '')
            const html = markdown.render(content)
            // Replace markdown in module
            // newModuleString = newModuleString.replace(string, '`'+ html.replace(/(\n)+/g, '') +'`')
            newModuleString = newModuleString.replace(string, '`'+ html +'`')
        })
        return newModuleString
    } else {
        return moduleString
    }
}
