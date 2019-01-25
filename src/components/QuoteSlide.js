import {h, Component} from 'preact'
import {css, cx} from 'emotion'

export default class QuoteSlide extends Component {
    shouldComponentUpdate(nextProps) {
        return false
    }

    render() {
        const style = css`
            padding: 30px 20px;
            @media screen and (min-width: 600px) {
                max-width: 800px;
            }
            & p {
                display: table;
                line-height: 1.7;
                letter-spacing: 0.04em;
                margin: 0;
                padding: 20px 20px;
                background: var(--song-color);
                color: var(--off-white);
                white-space: pre-wrap;
                @media screen and (min-width: 600px) {
                    padding: 30px 40px;
                }
                & a {
                    text-decoration: none;
                    pointer-events: none;
                    @media screen and (min-width: 600px) {
                        text-decoration: underline;
                        pointer-events: all;
                        &:hover {
                            color: var(--song-color);
                            background: var(--off-white);
                        }
                    }
                }
            }
            /* ATTRIBUTION */
            & h1 {
                background: var(--off-white);
                color: var(--song-color);
                position: relative;
                margin: -10px -10px 30px 20px;
                display: table;
                font-size: 16px;
                padding: 5px 16px;
                line-height: 1.5;
                @media screen and (min-width: 600px) {
                    font-size: 20px;
                    line-height: 1.7
                }
            }
            & p:first-child {
                margin-top: 0;
            }
            & p:last-child {
                margin-bottom: 60px;
                border-bottom: none;
                @media screen and (min-width: 600px) {
                    margin-bottom: 0;
                }
            }
        `

        return (
            <div
                class={cx('QuoteSlide', style)}
                dangerouslySetInnerHTML={{__html: this.props.slide.markdown}}
            ></div>
        )
    }
}
