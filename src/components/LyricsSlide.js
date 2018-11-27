import {h, Component} from 'preact'
import {css, cx} from 'emotion'

export default class LyricsSlide extends Component {
    componentDidMount() {
        this.element.querySelectorAll('p').forEach( (p, index) => {
            p.style.transform = `rotateZ(${ (Math.random() * 8) - 4 }deg)`
            p.style.transformOrigin = '20% 50%'
            p.style.transitionDelay = `${index * 0.1}s`
        })
    }

    shouldComponentUpdate() {
        return false
    }

    render() {
        const style = css`
            width: 100vw;
            height: 100%;
            position: relative;
            & .content {
                overflow: visible;
                padding-top: 80px;
                & p {
                    background: var(--off-white);
                    /* color: var(--song-color); */
                    display: table;
                    margin: 16px 24px;
                    padding: 8px 12px;
                    color: var(--song-color);
                }
                & p:last-child {
                    margin-bottom: 60px;
                }
            }
        `

        return (
            <div class={cx('slide', 'LyricsSlide', style)} ref={element => this.element = element}>
                <div class='content' dangerouslySetInnerHTML={{__html: this.props.slide.markdown}}>
                </div>
            </div>
        )
    }
}
