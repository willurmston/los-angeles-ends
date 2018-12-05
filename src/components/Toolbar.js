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
    transition: transform 0.3s 0.2s;
    will-change: transform;
    @media screen and (min-width: 600px) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        overflow: hidden;
        top: auto;
        bottom: 0;
        height: 70px;
    }
    &.hidden {
        transition: transform 0.3s;
        transform: translateY(-100%);
        @media screen and (min-width: 600px) {
            transform: translateY(100%);
        }
    }
    & h2 {
        margin: 14px 10px 6px 10px;
        letter-spacing: 0.05em;
        @media screen and (min-width: 600px) {
            flex-shrink: 0;
            font-size: 30px;
            margin: 0 auto 0 16px;
        }
    }
    & nav {
        width: calc(100% - 100px);
        display: flex;
        overflow: hidden;
        flex-wrap: no-wrap;
        margin-left: 10px;
        @media screen and (min-width: 600px) {
            flex-shrink: 1;
            margin-right: 24px;
            max-width: 45vw;
        }
        & div {
            margin: 0 4px 0 0;
            height: 3px;
            width: 100%;
            flex-shrink: 1;
            transition: opacity 0.3s;
            background: var(--song-color);
            @media screen and (min-width: 600px) {
                margin-right: 0;
                margin-left: 8px;
                height: 8px;
            }
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
        transition: opacity 0.2s;
        overflow: visible;
        & svg {
            fill: var(--song-color);
            overflow: visible;
        }
        &:active {
            opacity: 0.5;
        }
        @media screen and (min-width: 600px) {
            position: static;
            flex-shrink: 0;
            margin-left: 14px;
            width: 48px;
            height: 48px;
            transition: opacity 0.05s;
            &:hover {
                cursor: pointer;
                opacity: 0.8;
            }
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

        const bigScreen = window.matchMedia('screen and (min-width: 600px)').matches

        if (bigScreen) {
            return (
                <div
                    class={cx('Toolbar', style, this.props.isOpen ? '' : 'hidden' )}
                >
                    <PlayButton
                        icon={buttonIcon}
                        progress={this.props.playerProgress}
                        onclick={this.props.onPlayButtonClick}
                    />
                    <h2>{this.props.song.title.toUpperCase()}</h2>
                    <nav>
                        {this.props.song.slides.map( (slide, index) =>
                            <div class={index < this.props.currentSlideIndex && 'past'}></div>
                        )}
                    </nav>
                </div>
            )
        } else {
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
}
