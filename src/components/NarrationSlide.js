import {h, Component} from 'preact'
import {css, cx} from 'emotion'

export default class NarrationSlide extends Component {
    render() {
        const style = css`
            width: 100vw;
            position: relative;
            & .content {
                padding-top: 30px;
                overflow: visible;
                & p {
                    border: 2px solid var(--song-color);
                    line-height: 1.7;
                    margin: 16px 20px;
                    padding: 16px 20px;
                    background: var(--off-white);
                    color: var(--song-color);
                }
                & p:last-child {
                    margin-bottom: 60px;
                }
            }
        `

        return (
            <div class={cx('slide', 'NarrationSlide', style)}>
                <div class='content' dangerouslySetInnerHTML={{__html: this.props.slide.markdown}}>
                </div>
            </div>
        )
    }
}
