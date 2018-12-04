import {h, Component} from 'preact'
import {route} from 'preact-router'
import {css, cx} from 'emotion'
import PlayButton from './PlayButton'
import HomeButton from './HomeButton'

export default class TitleSlide extends Component {
    words() {
        return this.props.title.split(' ').map(
            word => `<span>${word}</span>`
        ).join('')
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.songIsOpen !== this.props.songIsOpen
    }

    onHomeButtonClick = e => {
        e.stopPropagation()
        route('/')
    }

    rightButton() {
        return (
            <button>
                <svg width="51" height="65" xmlns="http://www.w3.org/2000/svg">
                    <path d="M48.64 32.15L3.53 3.95A1 1 0 0 0 2 4.8v56.4a1 1 0 0 0 1.53.84l45.11-28.2a1 1 0 0 0 0-1.69z" fill-rule="nonzero"/>
                </svg>
            </button>
        )
    }

    render() {
        const titleSlideStyle = css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: relative;
            width: 100vw;
            & a.title {
                text-decoration: none;
                cursor: none;
                -webkit-tap-highlight-color: transparent;
                @media screen and (min-width: 600px) {
                    pointer-events: none;
                }
            }
            & h1 {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                background: var(--off-white);
                color: var(--song-color);
                font-size: 12vw;
                line-height: 1.325;
                letter-spacing: -1px;
                margin: 0 34px 0 34px;
                padding: 20px 26px;
                min-height: 180px;
                transition: transform 0.2s;
                @media screen and (min-width: 600px) {
                    font-size: 20.5vmin;
                    line-height: 1.06;
                    letter-spacing: -1vmin;
                    background: transparent;
                    color: var(--off-white);
                    margin: 0;
                    padding: 0 20px 0 10px;
                }
                @media screen and (min-width: 1500px) {
                    font-size: 27vmin;
                }
                &:active {
                    transform: scale(0.97);
                }
                & span {
                    display: block;
                    width: 100%;
                }
            }
            &.center {
                & h1 {
                    text-align: center;
                }
            }
            &.cascade {
                & h1 {
                    & span:first-child {
                        text-align: left;
                    }
                    & span:nth-child(2) {
                        text-align: center;
                    }
                    & span:last-child {
                        text-align: right;
                    }
                }
            }
            & div.buttons {
                display: flex;
                justify-content: space-between;
                margin: 60px 52px;
                flex-shrink: 1;
                overflow: hidden;
                transition: opacity 0.3s;
                -webkit-tap-highlight-color: transparent;
                & svg {
                    fill: var(--off-white);
                    &:active {
                        fill: var(--song-color);
                    }
                }
                opacity: ${this.props.songIsOpen ? 1 : 0};
                pointer-events: ${this.props.songIsOpen ? 'all' : 'none'};
            }
        `

        const bigScreen = window.matchMedia('screen and (min-width: 600px)').matches

        return (
            <div class={cx('slide', 'TitleSlide', this.props.layout, titleSlideStyle)}>
                <a class="title" href={!this.props.songIsOpen && this.props.songUrl}>
                    <h1 dangerouslySetInnerHTML={{__html: this.words()}}>
                    </h1>
                </a>
                {!bigScreen && this.props.songIsOpen &&
                    <div class="buttons">
                        <HomeButton
                            onclick={this.onHomeButtonClick}
                        />
                        {this.rightButton()}
                    </div>
                }
            </div>
        )
    }
}
