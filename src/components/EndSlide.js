import {h, Component} from 'preact'
import {route} from 'preact-router'
import {css, cx} from 'emotion'
import PlayButton from './PlayButton'
import HomeButton from './HomeButton'

export default class EndSlide extends Component {
    shouldComponentUpdate(nextProps) {
        return false
    }

    onHomeButtonClick = e => {
        e.stopPropagation()
        route('/')
    }

    onNextSongClick = e => {
        e.stopPropagation()
        if (this.props.nextSong) {
            route(`/${this.props.nextSong.slug}`)
        } else {
            route(`/end-credits`)
        }
    }

    render() {
        const endSlideStyle = css`
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            position: relative;
            width: 100vw;
            @media screen and (min-width: 600px) {
                justify-content: center;
            }
            & div.content {
                width: calc(100% - 40px);
                display: flex;
                justify-content: space-between;
                margin: 60px 52px;
                flex-shrink: 1;
                overflow: hidden;
                -webkit-tap-highlight-color: transparent;
                @media screen and (min-width: 600px) {
                    width: 550px;
                }
                & svg {
                    fill: var(--off-white);
                    &:active {
                        fill: var(--song-color);
                    }
                }
                & .next-song-message {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding: 2em;
                    margin: auto;
                    background: var(--off-white);
                    color: var(--song-color);
                    cursor: pointer;
                    & p {
                        font-size: 20px;
                        margin-top: 0;
                        margin-bottom: 18px;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                    }
                    & h3 {
                        font-size: 2.4em;
                        margin-top: 0;
                        margin-bottom: 26px;
                        text-align: center;
                        line-height: 1.2;
                    }
                    & button {
                        display: block;
                        width: 170px;
                        padding: 11px 0px 10px 2px;
                        font-size: 20px;
                        text-align: center;
                        letter-spacing: 0.08em;
                        background-color: var(--song-color);
                        color: var(--off-white);
                        border: 2px solid var(--song-color);
                        & .tighter {
                            letter-spacing: -0.001em;
                        }
                        cursor: pointer;
                        transition: transform 0.4s, opacity 0.1s;
                        opacity: ${this.props.isOpen ? 0 : 1};
                        transform: ${this.props.isOpen ? 'translateY(80px)' : 'translateY(0)'};
                        text-transform: uppercase;
                        &:hover, :active {
                            color: var(--song-color);
                            background-image: repeating-radial-gradient(circle at -50% 200%,transparent,transparent 1px, var(--off-white) 1px, var(--off-white) 8px,transparent 8px);
                        }
                    }
                }
            }
        `

        return (
            <div class={cx('slide', 'EndSlide', endSlideStyle)}>
                <div class="content">
                    <div class="next-song-message">
                        <p>
                            Next:
                        </p>
                        {this.props.nextSong &&
                            <h3>
                                {this.props.nextSong.title}
                            </h3>
                        }
                        {this.props.nextSong ?
                            <button onclick={this.onNextSongClick}>
                                <span>S<span class="tighter">TA</span>RT SONG</span>
                            </button>
                        :
                            <button onclick={this.onNextSongClick}>
                                <span><span class="tighter"></span>END CREDITS</span>
                            </button>
                        }

                    </div>
                </div>
            </div>
        )
    }
}
