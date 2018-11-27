import {h, Component} from 'preact'
import {css, cx} from 'emotion'
import PlayButton from './PlayButton'

const titleSlideStyle = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    position: relative;
    width: 100vw;
    & h1 {
        background: var(--off-white);
        color: var(--song-color);
        font-size: 11vw;
        line-height: 1.325;
        letter-spacing: -1px;
        margin: 0 52px 40% 52px;
        padding: 14px 20px;
        & span {
            display: block;
            width: 100%;
        }
    }
    & button.PlayButton {
        position: absolute;
        width: 70px;
        height: 70px;
        bottom: 30px;
        right: 30px;
        & svg {
            fill: var(--off-white);
        }
        &:active {
            & svg {
                fill: var(--song-color) !important;
            }
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
`

export default class TitleSlide extends Component {
    words() {
        return this.props.title.split(' ').map(
            word => `<span>${word}</span>`
        ).join('')
    }

    shouldComponentUpdate() {
        return false
    }

    render() {
        return (
            <div class={cx('slide', 'TitleSlide', this.props.layout, titleSlideStyle)}>
                <h1 dangerouslySetInnerHTML={{__html: this.words()}}>
                </h1>
                {this.props.showButton &&
                    <PlayButton
                        icon={this.props.playerState === 'loading' || this.props.playerState === 'playing' ? 'loading' : 'play'}
                        progress={this.props.playerProgress}
                        onclick={this.props.onPlayButtonClick}
                    />
                }
            </div>
        )
    }
}
