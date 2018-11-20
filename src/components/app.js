import {h, Component} from 'preact'
import {css} from 'emotion'
import MarkdownIt from 'markdown-it'
import content from '../../content/index.js'
import style from './style.css'

// PARSE MARKDOWN
const md = MarkdownIt()
const markdownToHTML = string => md.render(string.replace(/ +(?= )/g, ''))
// Parse song markdown
content.songs.forEach( song => {
    song.slides.forEach( slide => {
        if (Object.keys(slide).includes('markdown')) {
            slide.markdown = markdownToHTML(slide.markdown)
        }
    })
})
// Parse liner notes markdown
content.linerNotes = markdownToHTML(content.linerNotes)

export default class App extends Component {
    render() {
        return (
            <div>
                test
            </div>
        )
    }
}
