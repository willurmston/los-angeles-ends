import {h, Component} from 'preact'
import {css, cx} from 'emotion'
import Logo from './Logo'

export default class LinerNotes extends Component {
    render() {
        const style = css`
            & .links {
                position: relative;
                background: var(--${this.props.color});
                color: var(--off-white);
                padding: 20px 20px;
                overflow: hidden;
                & a {
                    display: table;
                    line-height: 2.67;
                    letter-spacing: 0.02em;
                }
                & svg {
                    width: 260px;
                    height: 260px;
                    position: absolute;
                    right: -66px;
                    bottom: -90px;
                    fill: var(--off-white);
                }
            }
            & .credits {
                padding: 20px 20px;
                line-height: 1.45;
                & h2 {
                    letter-spacing: 1px;
                    color: var(--${this.props.accentColor});
                }
                & div {
                    color: var(--${this.props.color});
                    & em {
                        font-style: normal;
                        color: var(--${this.props.accentColor});
                    }
                }
            }
        `

        return (
            <footer
                class={cx('LinerNotes', style)}
            >
                <section class="links">
                    {this.props.links.map(link =>
                        <a href={link.href} target="_blank">{link.text}</a>
                    )}
                    <Logo />
                </section>
                <section class="credits">
                    <h2>LINER NOTES</h2>
                    <div dangerouslySetInnerHTML={{__html: this.props.credits}}></div>
                </section>
            </footer>
        )
    }
}
