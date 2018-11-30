import {h, Component} from 'preact'
import {route} from 'preact-router'
import {css, cx} from 'emotion'
import PlayButton from './PlayButton'

const titleSlideStyle = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    width: 100vw;
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
        & svg {
            fill: var(--off-white);
            &:active {
                fill: var(--song-color);
            }
        }

    }
`

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

    homeButton() {
        return (
            <button
                class="home-button"
                onclick={this.onHomeButtonClick}
            >
                <svg width="75" height="65" xmlns="http://www.w3.org/2000/svg">
                    <path d="M62.13 25.1v37.5a.5.5 0 0 1-.5.5H48.87V31.4a.5.5 0 0 0-.5-.5h-14a.5.5 0 0 0-.5.5v31.7H11.63a.5.5 0 0 1-.5-.5V25.1H1.77a.5.5 0 0 1-.28-.91L36.85.29a.5.5 0 0 1 .56 0l35.37 23.9a.5.5 0 0 1-.28.91H62.13z" fill-rule="nonzero"/>
                </svg>
            </button>
        )
    }

    rightButton() {
        return (
            <svg width="51" height="65" xmlns="http://www.w3.org/2000/svg">
                <path d="M48.64 32.15L3.53 3.95A1 1 0 0 0 2 4.8v56.4a1 1 0 0 0 1.53.84l45.11-28.2a1 1 0 0 0 0-1.69z" fill-rule="nonzero"/>
            </svg>
        )
    }

    render() {
        return (
            <div class={cx('slide', 'TitleSlide', this.props.layout, titleSlideStyle)}>
                <h1 dangerouslySetInnerHTML={{__html: this.words()}}>
                </h1>
                { this.props.showButtons ?
                    <div class="buttons">
                        {this.homeButton()}
                        {this.rightButton()}
                    </div>
                : null}
            </div>
        )
    }
}
