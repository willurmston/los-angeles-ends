import {h, Component} from 'preact'
import {css, cx} from 'emotion'

export default class QuoteSlide extends Component {
    shouldComponentUpdate(nextProps) {
        return false
    }

    render() {
        const style = css`
            width: 100vw;
            position: relative;
            @media screen and (min-width: 600px) {
                font-size: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            & .content {
                position: relative;
                margin: 50px 20px;
                overflow: visible;
                @media screen and (min-width: 600px) {
                    max-width: 800px;
                    pointer-events: none;
                    user-select: none;
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
            }
        `

        return (
            <div class={cx('slide', 'QuoteSlide', style)}>
                <div class='content' dangerouslySetInnerHTML={{__html: this.props.slide.markdown}}>
                </div>
            </div>
        )
    }
}
