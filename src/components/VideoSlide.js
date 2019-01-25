import {h, Component} from 'preact'
import {css, cx} from 'emotion'

export default class VideoSlide extends Component {
    componentDidMount() {
        this.video.defaultMuted = true
        this.setState({
            muted: true,
            loaded: this.video.videoWidth ? true : false,
            firstView: true
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.isCurrent && !prevProps.isCurrent) {
            this.setState({
                firstView: false
            })
            this.video.play()
        } else if (!this.props.isCurrent && !this.video.paused) {
            this.video.pause()
        }
    }

    onload = () => {
        this.setState({
            loaded: true
        })
    }

    onplay = () => {
        this.setState({
            playing: true
        })
    }

    onpause = () => {
        this.setState({
            playing: false
        })
    }

    toggleMute = (e) => {
        e.stopPropagation()
        this.setState({
            muted: !this.state.muted
        })
        if (this.video) this.video.volume = this.props.slide.volume || 1
    }

    muteButton() {
        return (
            <button
                class="mute"
                onclick={this.toggleMute}
            >
                {this.state.muted ?
                    <svg width="37" height="37" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.5 37a18.5 18.5 0 1 1 0-37 18.5 18.5 0 0 1 0 37zm-1.77-12.12L24 29V17.96l-7.27 6.92zm-5.23-1.5L24 11.48V8l-9.91 5.62H9v9.76h2.5zm-2.3 4.18l1.29 1.24L29.6 10.24 28.32 9 9.2 27.56z" fill="var(--off-white)" fill-rule="nonzero"/>
                    </svg>
                :
                    <svg width="37" height="37" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.5 37a18.5 18.5 0 1 1 0-37 18.5 18.5 0 0 1 0 37zm5.5-8V8l-9.25 5.62H10v9.76h4.75L24 29z" fill="var(--off-white)" fill-rule="nonzero"/>
                    </svg>
                }

            </button>
        )
    }

    render() {
        const style = css`
            position: relative;
            margin: 56px 10px 0;
            width: auto;
            height: auto;
            padding: 8px;
            background: var(--off-white);
            @media screen and (min-width: 600px) {
                padding: 10px;
                margin-top: 0;
            }
            & .video-wrapper {
                position: relative;
                & video {
                    display: block;
                    width: auto;
                    height: auto;
                    max-width: 100%;
                    max-height: calc(100% - 200px);
                    opacity: ${!this.state.firstView && this.state.loaded ? 1 : 0};
                    transition: opacity 0.3s 0.3s ease-out;
                    @media screen and (min-width: 600px) {
                        max-width: calc(100vw - 300px);
                        max-height: 70vh;
                    }
                }
            }
            & .caption {
                color: var(--song-color);
                & p {
                    margin: 0.6em 0 0 0;
                }
            }
            & button.mute {
                position: absolute;
                width: 60px;
                height: 60px;
                bottom: 0;
                right: 0;
                cursor: pointer !important;
                display: ${(this.props.slide.volume || this.props.slide.volume !== 0) ? 'block' : 'none'};
                @media screen and (min-width: 600px) {
                    width: 80px;
                    height: 80px;
                }
                & svg {
                    display: block;
                    position: absolute;
                    bottom: 10px;
                    right: 10px;
                    @media screen and (min-width: 600px) {
                        bottom: 20px;
                        right: 20px;
                    }
                }
            }
        `

        return (
            <div
                class={cx('VideoSlide', style)}
            >
                <div class="video-wrapper">
                    <video
                        ref={video => this.video = video}
                        src={this.props.slide.file}
                        onplay={this.onplay}
                        onpause={this.onpause}
                        onloadeddata={this.onload}
                        muted={this.state.muted}
                        playsinline
                        preload
                        loop
                    ></video>
                    {this.muteButton()}
                </div>
                {this.props.slide.caption &&
                    <div class="caption" dangerouslySetInnerHTML={{__html: this.props.slide.caption}}></div>
                }
            </div>
        )
    }
}
