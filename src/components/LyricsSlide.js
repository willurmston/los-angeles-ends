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
            position: relative;
            overflow: visible;
            @media screen and (min-width: 600px) {
                font-size: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            & .content {
                overflow: visible;
                padding-top: 30px;
                @media screen and (min-width: 600px) {
                    padding-top: 40px;
                    max-width: 800px;
                }
                & p {
                    background: var(--off-white);
                    display: table;
                    margin: 0 24px;
                    padding: 10px 12px 10px 60px;
                    text-indent: -60px;
                    color: var(--song-color);
                    transform: none !important;
                    @media screen and (min-width: 600px) {
                        margin: 0;
                        line-height: 2;
                        padding: 0 20px 0 80px;
                    }
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
