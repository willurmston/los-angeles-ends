import MarkdownIt from 'markdown-it'

// Set up markdown parser
const markdown = MarkdownIt({
    typographer: true,
    quotes: '“”‘’',
    breaks: false
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
