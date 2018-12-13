import {h, Component} from 'preact'
import {css, cx} from 'emotion'

export default class LyricsSlide extends Component {
    componentDidMount() {
        const bigScreen = window.matchMedia('screen and (min-width: 600px)').matches
        this.element.querySelectorAll('p').forEach(p => {
            const innerHTML = '<span>' + p.innerHTML.replace(/\n/g, '</span><span>') + '</span>'
            p.innerHTML = innerHTML
            if (!bigScreen) {
                p.querySelectorAll('span').forEach((span, index) => {
                    span.style.transformOrigin = '20% 50%'
                    span.style.transform = `rotateZ(${ (Math.random() * 8) - 4 }deg)`
                })
            }
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
                height: auto;
                @media screen and (min-width: 600px) {
                    margin: auto 0;
                    padding-top: 40px;
                    max-width: 580px;
                }
                & p {
                    padding: 0;
                    color: var(--song-color);
                    white-space: pre-wrap;
                    & span {
                        background: var(--off-white);
                        padding: 10px 16px;
                        margin-top: -2px;
                        display: inline-block;
                        @media screen and (min-width: 600px) {
                            padding: 10px 20px;
                        }
                    }
                    display: table;
                    margin: 40px 20px;
                    color: var(--song-color);
                    @media screen and (min-width: 600px) {
                        line-height: 1.4;
                        margin-bottom: 40px;
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
