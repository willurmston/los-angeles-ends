import {h, Component} from 'preact'
import {css, cx} from 'emotion'

export default class NarrationSlide extends Component {
    shouldComponentUpdate(nextProps) {
        return false
    }

    componentDidMount() {
        // Narration slides have special dynamic layouts on wider screens
        const children = this.element.querySelectorAll('p')
        children.forEach((child, index) => {
            child.setAttribute('class', css`
                /* stack top-to-bottom */
                @media screen and (min-width: 600px) {
                    margin-top: ${index > 0 ? '-34px' : 0} !important;
                    margin-right: 0 !important;
                    margin-left: ${15 * (index - (children.length / 2) + 1)}% !important;
                }
                /* stack left-to-right */
                @media screen and (min-width: 1300px) {
                    margin-right: -20px !important;
                    margin-left: 0 !important;
                    margin-top: ${4 * index}% !important;
                }
            `)
        })
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
                flex-wrap: wrap;
            }
            & .content {
                padding-top: 40px;
                overflow: visible;
                @media screen and (min-width: 600px) {
                    display: block;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    width: auto;
                    flex-shrink: 1;
                    margin: auto 0;
                    padding-top: 60px;
                    width: calc(100vw - 200px);
                }
                @media screen and (min-width: 1300px) {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: flex-start;
                    max-width: calc(100vw - 200px);
                }
                & p {
                    display: table;
                    border: 2px solid var(--song-color);
                    line-height: 1.7;
                    margin: 16px 20px;
                    padding: 16px 20px;
                    background: var(--off-white);
                    color: var(--song-color);
                    white-space: pre-wrap;
                    & a {
                        text-decoration: none;
                        pointer-events: none;
                        @media screen and (min-width: 600px) {
                            text-decoration: underline;
                            pointer-events: all;
                            &:hover {
                                color: var(--off-white);
                                background: var(--song-color);
                            }
                        }
                    }
                    @media screen and (min-width: 600px) {
                        display: table;
                        padding: 24px 28px;
                        max-width: 420px;
                        position: relative;
                        flex-shrink: 0;
                        flex-grow: 0;
                    }
                    @media screen and (min-width: 1300px) {
                        display: table;
                        width: auto;
                        max-width: 420px;
                        flex-shrink: 1;
                        margin-bottom: 60px;
                    }
                }
                & p:last-child {
                    margin-bottom: 60px;
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
