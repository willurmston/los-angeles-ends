import {h, Component} from 'preact'
import {css, cx} from 'emotion'

export default class VideoSlide extends Component {
    componentDidMount() {
        this.video.defaultMuted = true
        this.setState({
            muted: true,
            loaded: false,
            firstView: true
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.isCurrent && this.video.paused) {
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
    }

    muteButton() {
        if (!this.state.muted) {
            return (
                <button class="mute" onclick={this.toggleMute}>
                    <svg width="37" height="37" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.5 37a18.5 18.5 0 1 1 0-37 18.5 18.5 0 0 1 0 37zm5.5-8V8l-9.25 5.62H10v9.76h4.75L24 29z" fill="var(--off-white)" fill-rule="nonzero"/>
                    </svg>
                </button>
            )
        } else {
            return (
                <button class="mute" onclick={this.toggleMute}>
                    <svg width="37" height="37" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.5 37a18.5 18.5 0 1 1 0-37 18.5 18.5 0 0 1 0 37zm-1.77-12.12L24 29V17.96l-7.27 6.92zm-5.23-1.5L24 11.48V8l-9.91 5.62H9v9.76h2.5zm-2.3 4.18l1.29 1.24L29.6 10.24 28.32 9 9.2 27.56z" fill="var(--off-white)" fill-rule="nonzero"/>
                    </svg>
                </button>
            )
        }
    }

    render() {
        const style = css`
            width: 100vw;
            position: relative;
            display: flex;
            justify-content: center;
            flex-direction: center;
            @media screen and (min-width: 600px) {
                align-items: center;
            }
            & .content {
                position: relative;
                margin-top: 30px;
                height: calc(100vh - 240px);
                width: calc(100% - 60px);
                border: 10px solid var(--off-white);
                overflow: hidden;
                background: var(--off-white);
                @media screen and (min-width: 600px) {
                    margin-top: -50px;
                    width: auto;
                    height: auto;
                    width: 100%;
                    max-width: 70vw;
                }
                & video {
                    display: block;
                    height: 100%;
                    width: 100%;
                    object-fit: cover;
                    opacity: ${!this.state.firstView && this.state.loaded ? 1 : 0};
                    transition: opacity 0.5s 0.3s ease-out;
                    @media screen and (min-width: 600px) {
                        height: 100%;
                        width: 100%;
                        max-width: 70vw;
                        max-height: 70vh;
                    }
                }
                & button.mute {
                    position: absolute;
                    bottom: 20px;
                    right: 20px;
                    & svg {
                        display: block;
                    }
                }
            }
        `

        return (
            <div class={cx('slide', 'VideoSlide', style)}>
                <div class="content">
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
            </div>
        )
    }
}
