import {h, Component} from 'preact'
import {css, cx} from 'emotion'
import Logo from './Logo'

export default class LinerNotes extends Component {
    render() {
        const style = css`
            @media screen and (min-width: 600px) {
                display: flex;
            }
            & .links {
                position: relative;
                background: var(--${this.props.color});
                color: var(--off-white);
                padding: 20px 20px;
                overflow: hidden;
                @media screen and (min-width: 600px) {
                    width: 25%;
                    min-width: 250px;
                    font-size: 24px;
                    padding: 55px 50px;
                    text-align: right;
                }
                & a {
                    display: table;
                    line-height: 2.67;
                    letter-spacing: 0.02em;
                    @media screen and (min-width: 600px) {
                        width: 100%;
                        letter-spacing: 2px;
                        line-height: 1.8;
                        text-decoration: none;
                    }
                }
                & svg {
                    width: 260px;
                    height: 260px;
                    position: absolute;
                    right: -66px;
                    bottom: -90px;
                    fill: var(--off-white);
                    @media screen and (min-width: 600px) {
                        /* width: 40vw;
                        height: 40vw;
                        right: -12vw;
                        bottom: -10vw; */
                        /* width: 40vw; */
                        /* height: 40vw; */
                        width: 70px;
                        height: 70px;
                        right: auto;
                        left: 50px;
                        bottom: 50px;
                    }
                }
            }
            & .credits {
                background: var(--off-white);
                padding: 20px 20px;
                line-height: 1.45;
                @media screen and (min-width: 600px) {
                    width: 50%;
                    padding: 62px 64px;
                }
                & h2 {
                    letter-spacing: 1px;
                    color: var(--${this.props.accentColor});
                    @media screen and (min-width: 600px) {
                        margin-top: 0;
                        letter-spacing: 4px;
                    }
                }
                & div {
                    max-width: 550px;
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
                class={cx('LinerNotes', style, this.props.class)}
            >
                <section class="links">
                    {this.props.links.map(link =>
                        <a href={link.href} target="_blank">{link.text}</a>
                    )}
                    <Logo />
                </section>
                <section class="credits">
                    <h2>LOS ANGELES ENDS</h2>
                    <div dangerouslySetInnerHTML={{__html: this.props.credits}}></div>
                </section>
            </footer>
        )
    }
}
