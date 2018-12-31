import {h, Component} from 'preact'
import {css, cx} from 'emotion'
import Logo from './Logo'
import RadialBackground from './RadialBackground'

const style = css`
    --color: var(--blue);
    --accent-color: var(--pink);
    @media screen and (min-width: 600px) {
        margin-top: 30px;
        display: flex;
        border-top: 2px solid var(--color);
        display: flex;
    }
    @media screen and (min-width: 1000px) {
        margin-left: 70px;
        margin-right: 70px;
        margin-bottom: 90px;
    }
    & .links {
        position: relative;
        background: var(--color);
        color: var(--off-white);
        padding: 30px 20px;
        overflow: hidden;
        & .content {
            position: relative;
            width: 100%;
            flex-direction: column;
        }
        & .RadialBackground {
            position: absolute;
            opacity: 0.7;
            & svg {
                min-height: 100%;
                right: -140%;
                @media screen and (min-width: 1000px) {
                    right: -100%;
                }
            }
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
            align-items: flex-end;
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
                position: absolute;
                fill: var(--off-white);
                width: 70px;
                height: 70px;
                right: auto;
                left: 30px;
                bottom: 30px;
            }
        }
    }
    & .credits {
        background: var(--off-white);
        padding: 20px 20px;
        line-height: 1.45;
        @media screen and (min-width: 600px) {
            width: 50%;
            padding: 32px 32px;
        }
        @media screen and (min-width: 1000px) {
            padding: 62px 64px;
            border-right: 2px solid var(--color);
            border-bottom: 2px solid var(--color);
        }
        & h2 {
            letter-spacing: 1px;
            color: var(--color);
            @media screen and (min-width: 600px) {
                margin-top: 0;
                letter-spacing: 4px;
            }
        }
        & div {
            max-width: 550px;
            color: var(--color);
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

    render() {
        const bigScreen = window.matchMedia('screen and (min-width: 600px)').matches

        return (
            <footer
                class={cx('LinerNotes', style, this.props.class)}
            >
                <section class="links">
                    <RadialBackground />
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
                    <h2>LOS ANGELES ENDS</h2>
                    <div dangerouslySetInnerHTML={{__html: this.props.credits}}></div>
                </section>
            </footer>
        )
    }
}
