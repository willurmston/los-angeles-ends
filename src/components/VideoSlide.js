import {h, Component} from 'preact'
import {css, cx} from 'emotion'

export default class VideoSlide extends Component {
    componentDidMount() {
        this.video.defaultMuted = true
        this.setState({
            muted: true
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.isCurrent && this.video.paused) {
            this.video.play()
        } else if (!this.props.isCurrent && !this.video.paused) {
            this.video.pause()
        }
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
            display: flex;
            justify-content: center;
            flex-direction: center;
            & .content {
                position: relative;
                margin-top: 100px;
                height: calc(100vh - 240px);
                width: calc(100% - 60px);
                border: 10px solid var(--off-white);
                overflow: hidden;
                & video {
                    display: block;
                    height: 100%;
                    width: 100%;
                    object-fit: cover;
                    filter: saturate(0%);
                    mix-blend-mode: multiply;
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
