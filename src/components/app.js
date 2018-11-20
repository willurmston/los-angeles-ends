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

const Header = ({...props}) => {
	const headerStyle = css`
		position: relative;
		height: 200px;
		font-size: 20px;
		letter-spacing: 1px;
		& h1 {
			bottom: 16px;
			color: var(--${props.color});
			left: 16px;
			line-height: 1.45;
			margin: 0;
			position: absolute;
		}
		& svg {
			fill: var(--${props.color});
			position: absolute;
			top: 16px;
			left: 16px;
		}
		& button {
			background: none;
			border: none;
			color: var(--${props.color});
			text-decoration: underline;
			top: 16px;
			padding: 16px 16px;
			position: absolute;
			right: 0;
		}
	`

	return (
		<header class={headerStyle}>
			<svg width="50" height="56" xmlns="http://www.w3.org/2000/svg">
				<path d="M33.12 51.35l-2.57 1.51c-1.74 1.01-3.49 2.01-5.22 3.03-.23.14-.4.15-.62 0l-1.23-.74a.5.5 0 0 1-.19-.67c.14-.24.24-.44.32-.6a26.25 26.25 0 0 0 3.24-11.31 26.74 26.74 0 0 0-16.77-26.36 25.8 25.8 0 0 0-9.56-1.85.5.5 0 0 1-.5-.5 310.3 310.3 0 0 1-.02-.98c0-.22.07-.33.25-.43L5.86 9.2A713.6 713.6 0 0 1 8.15 7.9a.5.5 0 0 1 .68.18l.13.23a18.98 18.98 0 0 0 32.27-.23.5.5 0 0 1 .67-.16l2.41 1.4a.5.5 0 0 1 .18.69l-.45.72a22.63 22.63 0 0 1-9.6 8.22 22.86 22.86 0 0 1-11.32 1.95 32.1 32.1 0 0 1 3.48 4.88c1 1.72 1.81 3.53 2.47 5.4 4.11-7.63 10.2-12.01 18.45-12.88a28.82 28.82 0 0 1 1.96-.13.5.5 0 0 1 .52.5v2.82a.5.5 0 0 1-.48.5c-1.18.04-2.07.1-2.69.2a18.76 18.76 0 0 0-6.79 2.45 18.66 18.66 0 0 0-6.98 7.24 18.98 18.98 0 0 0-2.32 9.97 19.42 19.42 0 0 0 1.9 7.59c.15.3.37.71.67 1.24a.5.5 0 0 1-.19.68zM.52 18.15H.6a22.81 22.81 0 0 1 22.41 20.78A22.53 22.53 0 0 1 20 52.59a.5.5 0 0 1-.67.17 83.5 83.5 0 0 1-2.43-1.41.5.5 0 0 1-.17-.68l.28-.5a19.03 19.03 0 0 0 1.63-14.22 18.8 18.8 0 0 0-4.28-7.75A18.86 18.86 0 0 0 .51 21.97a.5.5 0 0 1-.5-.5v-.25-2.48-.1a.5.5 0 0 1 .52-.5zm0 7.63h.2c2.38.08 4.64.64 6.74 1.8a15.07 15.07 0 0 1 7.78 10.63 15.3 15.3 0 0 1-1.84 10.56.5.5 0 0 1-.67.17 93.1 93.1 0 0 1-2.42-1.4.5.5 0 0 1-.17-.68l.22-.39a11.37 11.37 0 0 0 1.29-6.64c-.26-2.45-1.2-4.6-2.85-6.41a11.07 11.07 0 0 0-8.3-3.8.5.5 0 0 1-.48-.5v-.48-2.27-.09a.5.5 0 0 1 .5-.5zM36.6 48.76l-.38-.69a15.17 15.17 0 0 1-1.71-7.34 15.16 15.16 0 0 1 3.57-9.49 14.95 14.95 0 0 1 11.4-5.44.5.5 0 0 1 .52.5v2.81a.5.5 0 0 1-.49.5 11.17 11.17 0 0 0-9.96 6.27 11 11 0 0 0-1.12 6.72 11.42 11.42 0 0 0 1.47 4.24.5.5 0 0 1-.17.68l-.72.42a18945.35 18945.35 0 0 1-1.72 1 .5.5 0 0 1-.69-.18zM.53 33.42h.12c1.63.08 3.1.62 4.4 1.67A7.45 7.45 0 0 1 7.84 40a7.5 7.5 0 0 1-1 4.95.5.5 0 0 1-.68.18l-.4-.23-1.89-1.1-.14-.09a.5.5 0 0 1-.17-.7 3.62 3.62 0 0 0 .07-3.8A3.54 3.54 0 0 0 .5 37.26a.5.5 0 0 1-.48-.5v-.23-2.48-.12a.5.5 0 0 1 .51-.5zM43.2 44.93a7.23 7.23 0 0 1-.95-2.56 7.46 7.46 0 0 1 1.5-6 7.38 7.38 0 0 1 5.74-2.94.5.5 0 0 1 .52.5v2.83a.5.5 0 0 1-.48.5A3.56 3.56 0 0 0 47 38.39a3.75 3.75 0 0 0-.5 4.63.5.5 0 0 1-.19.68l-.66.39-1.28.74-.5.3a.5.5 0 0 1-.68-.2zM37.89 6.2l-.3.46a15 15 0 0 1-9.7 6.41 14.82 14.82 0 0 1-10.76-1.92 14.98 14.98 0 0 1-5.07-5.06.37.37 0 0 1 .13-.52l2.55-1.49a.5.5 0 0 1 .68.17 10.81 10.81 0 0 0 5.12 4.38c2.14.92 4.36 1.13 6.64.7 2-.37 3.78-1.25 5.31-2.59a10.68 10.68 0 0 0 2.12-2.48.5.5 0 0 1 .68-.18l2.43 1.42a.5.5 0 0 1 .17.7zm-6.6-3.82l-.24.35a7.57 7.57 0 0 1-12.42-.5.33.33 0 0 1 .11-.45l2.6-1.52a.5.5 0 0 1 .65.13l.24.3c.87.96 2 1.38 3.4 1.16A3.47 3.47 0 0 0 28.03.4a.5.5 0 0 1 .67-.16l2.43 1.42a.5.5 0 0 1 .16.71z" fill-rule="evenodd"/>
			</svg>
			<h1>LOS ANGELES ENDS <br/>a record by SIMULCAST</h1>
			<button>liner notes</button>
		</header>
	)
}

export default class App extends Component {
    render() {
        return (
            <div>
                <Header color={content.songs[0].color} />
            </div>
        )
    }
}
