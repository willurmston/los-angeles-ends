import {h, Component} from 'preact'
import {css, cx} from 'emotion'

export default class QuoteSlide extends Component {
    shouldComponentUpdate() {
        return false
    }

    render() {
        const style = css`
            width: 100vw;
            position: relative;
            & .content {
                position: relative;
                margin: 50px 20px;
                overflow: visible;
                & p {
                    display: table;
                    line-height: 1.7;
                    letter-spacing: 0.04em;
                    margin: 0;
                    padding: 20px 20px;
                    background: var(--song-color);
                    color: var(--off-white);
                    border-bottom: 2px solid var(--off-white);
                }
                & p:first-child {
                    margin-top: 0;
                }
                & p:last-child {
                    margin-bottom: 60px;
                    border-bottom: none;
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
