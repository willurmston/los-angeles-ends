import {h, Component} from 'preact'
import {css, cx} from 'emotion'

export default class NarrationSlide extends Component {
    shouldComponentUpdate(nextProps) {
        return false
    }

    componentDidMount() {

        const bigScreen = window.matchMedia('screen and (min-width: 600px)').matches
        if (bigScreen) {
            const children = this.element.querySelectorAll('p')

            const availableSpace = this.element.querySelector('.content').offsetWidth - 400
            const interval = availableSpace / children.length

            children.forEach((child, index) => {
                child.style = `
                    left: ${interval * index}px;
                `
            })
        }
    }

    render() {
        const style = css`
            width: 100vw;
            position: relative;
            @media screen and (min-width: 600px) {
                font-size: 24px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            & .content {
                padding-top: 40px;
                overflow: visible;
                flex-direction: column;
                @media screen and (min-width: 600px) {
                    width: 800px;
                    padding: 40% 0 150px 0;
                    flex-shrink: 0;
                }
                & p {
                    display: table;
                    border: 2px solid var(--song-color);
                    line-height: 1.7;
                    margin: 16px 20px;
                    padding: 16px 20px;
                    background: var(--off-white);
                    color: var(--song-color);
                    @media screen and (min-width: 600px) {
                        padding: 28px 32px;
                        max-width: 420px;
                        margin: -24px; 0;
                        position: relative;
                        flex-shrink: 0;
                    }
                }
                & p:last-child {
                    margin-bottom: 60px;
                    @media screen and (min-width: 600px) {
                        margin-bottom: 150px;
                    }
                }
            }
        `

        return (
            <div class={cx('slide', 'NarrationSlide', style)} ref={element => this.element = element}>
                <div class='content' dangerouslySetInnerHTML={{__html: this.props.slide.markdown}}></div>
            </div>
        )
    }
}
