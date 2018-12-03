import {h, Component} from 'preact'
import {css, cx} from 'emotion'
import PlayButton from './PlayButton'

const style = css`
    position: fixed;
    top: 0;
    left: 0;
    background: var(--off-white);
    height: 60px;
    color: var(--song-color);
    width: 100%;
    z-index: 100;
    transition: transform 0.3s 1s;
    will-change: transform;
    &.hidden {
        transition: transform 0.3s;
        transform: translateY(-100%);
    }
    & h2 {
        margin: 14px 10px 6px 10px;
        letter-spacing: 0.05em;
    }
    & nav {
        width: calc(100% - 100px);
        display: flex;
        overflow: hidden;
        flex-wrap: no-wrap;
        margin-left: 10px;
        & div {
            margin: 0 4px 0 0;
            height: 3px;
            width: 100%;
            flex-shrink: 1;
            transition: opacity 0.3s;
            background: var(--song-color);
        }
        & div.past {
            opacity: 0.5;
        }
    }
    & .PlayButton {
        position: absolute;
        top: 12px;
        right: 12px;
        width: 36px;
        height: 36px;
        & svg {
            fill: var(--song-color);
        }
    }
`

export default class Toolbar extends Component {
    render() {
        let buttonIcon = 'play'
        if (this.props.playerState === 'loading') {
            buttonIcon = 'loading'
        } else if (this.props.playerState === 'playing') {
            buttonIcon = 'pause'
        } else if (this.props.playerState === 'ended') {
            buttonIcon = 'next'
        }

        return (
            <div
                class={cx('Toolbar', style, this.props.isOpen ? '' : 'hidden' )}
            >
                <h2>{this.props.song.title.toUpperCase()}</h2>
                <nav>
                    {this.props.song.slides.map( (slide, index) =>
                        <div class={index < this.props.currentSlideIndex && 'past'}></div>
                    )}
                </nav>
                <PlayButton
                    icon={buttonIcon}
                    progress={this.props.playerProgress}
                    onclick={this.props.onPlayButtonClick}
                />
            </div>
        )
    }
}
