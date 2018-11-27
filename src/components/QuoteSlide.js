import {h, Component} from 'preact'
import {css, cx} from 'emotion'

export default class QuoteSlide extends Component {
    shouldComponentUpdate() {
        return false
    }

    zigzag() {
        return (
            <svg class="zigzag" viewBox="0 0 338 40" version="1.1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" >
                <path
                    d="M27.6666667,18.9062506 L45.1898646,10.5262825 L63,17.9236336 L80.8101354,10.5262825 L98.3333333,18.9062506 L115.856531,10.5262825 L133.666667,17.9236336 L151.333333,10.5858715 L169,17.9236336 L186.810135,10.5262825 L204.333333,18.9062506 L221.856531,10.5262825 L239.666667,17.9236336 L257.333333,10.5858715 L275,17.9236336 L292.615096,10.607291 L311.224499,17.9225429 L333,8.33553602 L333,50 L5,50 L5,8.06656566 L27.6666667,18.9062506 Z"
                    stroke="var(--off-white)"
                    stroke-width="10"
                    fill="none"
                    vector-effect="non-scaling-stroke"
                ></path>
            </svg>
        )
    }

    render() {
        const style = css`
            width: 100vw;
            height: 100%;
            position: relative;
            & div.zigzag-wrapper {
                position: relative;
                margin: 100px 20px;
                & .content {
                    overflow: visible;
                    & p {
                        display: table;
                        line-height: 1.7;
                        margin: 0;
                        padding: 20px 20px;
                        background: var(--off-white);
                        color: var(--song-color);
                        border-bottom: 1px solid var(--song-color);
                    }
                    & p:first-child {
                        margin-top: 0;
                    }
                    & p:last-child {
                        margin-bottom: 60px;
                        border-bottom: none;
                    }
                }
                & svg.zigzag {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    transform: translateY(-36%);
                    z-index: 1;
                    width: calc(100%);
                    pointer-events: none;
                }
            }
        `

        return (
            <div class={cx('slide', 'QuoteSlide', style)}>
                <div class="zigzag-wrapper">
                    {this.zigzag()}
                    <div class='content' dangerouslySetInnerHTML={{__html: this.props.slide.markdown}}>
                    </div>
                </div>
            </div>
        )
    }
}
