import {h, Component} from 'preact'
import {css, cx} from 'emotion'
import Logo from './Logo'
import getLatestCommit from './getLatestCommit'

const style = css`
    --color: var(--blue);
    --accent-color: var(--pink);
    @media screen and (min-width: 600px) {
        margin-top: 70px;
        display: flex;
        border-top: 2px solid var(--color);
    }
    @media screen and (min-width: 1000px) {
        margin-left: 70px;
        margin-right: 70px;
        margin-bottom: 90px;
        align-items: flex-start;
    }
    & .links {
        position: relative;
        background: var(--color);
        color: var(--off-white);
        padding: 30px 20px;
        overflow: hidden;

        &::before {
            content: '';
            display: block;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0.5;
            background-image: repeating-radial-gradient(circle at 130% -20%, transparent, transparent 8px, var(--off-white) 9px, transparent 10px);
        }
        & .content {
            position: relative;
            width: 100%;
            flex-direction: column;
        }
        & h2 {
            width: 100%;
            margin-top: 0;
            margin-bottom: 26px;
            letter-spacing: 4px;
            text-align: left;
            @media screen and (min-width: 600px) {
                margin-bottom: 31px;
            }
        }
        @media screen and (min-width: 600px) {
            width: 50%;
            min-width: 250px;
            font-size: 20px;
            padding: 0;
            text-align: center;
            padding: 32px 32px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }
        @media screen and (min-width: 1000px) {
            padding: 64px 64px;
        }
        & ul {
            padding-left: 0;
            margin-top: 0;
            margin-bottom: 50px;
            height: auto;
            list-style: none;
            @media screen and (min-width: 1400px) {
                display: flex;
                margin-bottom: 60px;
            }
            & a {
                display: block;
                line-height: 2.67;
                letter-spacing: 0.02em;
                width: 100%;
                min-width: 200px;
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                align-items: center;
                flex-grow: 0;
                letter-spacing: 0.05em;
                line-height: 1.8;
                text-decoration: none;
                height: 70px;
                border: 2px solid var(--off-white);
                background: var(--off-white);
                box-sizing: border-box;
                color: var(--color);
                margin-right: 2px;
                margin-bottom: 2px;
                @media screen and (min-width: 600px) {
                    &:hover {
                        color: var(--off-white);
                        background: var(--color);
                        border: 2px solid var(--color);
                    }
                }
                @media screen and (min-width: 1400px) {
                    width: 32%;
                    height: 80px;
                    min-width: auto;
                }
            }
        }
        & svg.Logo {
            display: none;
            @media screen and (min-width: 600px) {
                display: block;
                position: relative;
                fill: var(--off-white);
                width: 70px;
                height: 70px;
                left: -4px;
            }
        }
    }
    & .credits {
        background: var(--off-white);
        padding: 20px 20px;
        line-height: 1.45;
        overflow-x: hidden;
        @media screen and (min-width: 600px) {
            width: 50%;
            padding: 32px 32px;
            border-left: 2px solid var(--color);
        }
        @media screen and (min-width: 1000px) {
            padding: 62px 64px;
            border-right: 2px solid var(--color);
            border-bottom: 2px solid var(--color);
        }
        & h1 {
            letter-spacing: 1px;
            color: var(--accent-color);
            @media screen and (min-width: 600px) {
                margin-top: 0;
                letter-spacing: 4px;
            }
        }
        & h2 {
            letter-spacing: 1px;
            color: var(--color);
            margin-top: 0;
            @media screen and (min-width: 600px) {
                margin-top: 2em;
                letter-spacing: 4px;
            }
        }
        & h2:nth-child(1) {
            margin-top: 0;
        }
        & h2.header {
            border-top: none;
            margin-top: 1em;
            color: var(--accent-color);
        }
        & .latest-commit {
            display: block;
            background: var(--off-white);
            color: var(--color);
            font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
            font-size: 0.8em;
            border-radius: 2px;
            overflow: hidden;
            cursor: pointer;
            text-decoration: none;
            margin-top: 1em;
            background: var(--color);
            color: var(--off-white);
            & header {
                border-bottom: 1px solid var(--off-white);
                padding: 6px 6px 2px;
            }
            & main {
                position: relative;
                display: flex;
            }
            & main > * {
                padding: 6px 6px 2px;
            }
            & .hash {
                border-right: 1px solid var(--off-white);
                display: block;
            }
            &:hover, &:active {
                --color: var(--accent-color);
                --off-white: var(--color;)
            }
        }
        & div {
            & h2:not(:first-child)::before {
                content: '';
                display: block;
                width: 3000px;
                position: relative;
                left: -64px;
                background: var(--color);
                height: 2px;
                margin-bottom: 2em;
            }
            max-width: 550px;
            color: var(--color);
            & p {
                white-space: pre-wrap;
                font-size: 18px;
            }
            & em {
                font-style: normal;
                color: var(--accent-color);
            }
            & a {
                @media screen and (min-width: 600px) {
                    &:hover {
                        color: var(--off-white);
                        background: var(--accent-color);
                    }
                }
            }
        }
    }
`

export default class LinerNotes extends Component {
    shouldComponentUpdate() {
        return false
    }

    async componentDidMount() {
        const githubLink = this.element.querySelector('a[href="https://github.com/simulcast/los-angeles-ends"]')
        if (githubLink) {
            const commit = await getLatestCommit('simulcast','los-angeles-ends','master')
            if (commit) {
                const date = new Date(commit.author.date)
                const day = date.toLocaleDateString({
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                })
                const time = date.toLocaleTimeString({
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                })

                const widget = document.createElement('a')
                widget.setAttribute('href', commit.html_url)
                widget.setAttribute('target', '_blank')

                widget.classList.add('latest-commit')

                widget.innerHTML = `<header>Latest commit by ${commit.author.name} on ${day} at ${time}</header>`
                widget.innerHTML += `<main><span class="hash">${commit.sha.substring(0,7)}</span> <span>"${commit.message.replace(/\n/g, ' ')}"</span></main>`

                githubLink.parentNode.replaceChild(widget, githubLink)
            }
        }
    }

    render() {
        const bigScreen = window.matchMedia('screen and (min-width: 600px)').matches

        return (
            <footer
                class={cx('LinerNotes', style, this.props.class)}
                ref={element => this.element = element}
            >
                <section class="links">
                    <div class="content">
                        <h2>LISTEN</h2>
                        <ul>
                            {this.props.listenLinks.map(link =>
                                <a href={link.href} target="_blank"><li>{link.text}</li></a>
                            )}
                        </ul>
                        <h2>FOLLOW</h2>
                        <ul>
                            {this.props.socialLinks.map(link =>
                                <a href={link.href} target="_blank"><li>{link.text}</li></a>
                            )}
                        </ul>
                    </div>
                    <a href="http://simulcast.fm" target="_blank">
                        <Logo />
                    </a>
                </section>
                <section class="credits">
                    <h1 class="header">END CREDITS</h1>
                    <div dangerouslySetInnerHTML={{__html: this.props.credits}}></div>
                </section>
            </footer>
        )
    }
}
