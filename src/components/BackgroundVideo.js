import {h, Component} from 'preact'
import {css, cx, keyframes} from 'emotion'

const scrollPoster = keyframes`
    0% {
        transform: translate3d(0,0,0);
    }
    to {
        transform: translate3d(-100%, 0, 0);
    }
`

export default class BackgroundVideo extends Component {
    componentDidMount() {
        this.startTime = this.lastTimeStamp
        this.FPS = 30
        this.FPSInterval = 1000 / this.FPS
        this.lastTimeStamp = window.performance.now()

        if (!this.canvas) return
        this.context = this.canvas.getContext('2d')
        if (this.props.playbackRate) this.video.playbackRate = this.props.playbackRate
        this.video.addEventListener('loadeddata', this.onloadeddata)
        this.video.addEventListener('play', this.start)
        this.video.addEventListener('pause', this.stop)
        this.video.setAttribute('muted', true)
    }

    onloadeddata = () => {
        this.setState({
            loaded: true
        })
        this.canvas.width = this.video.videoWidth
        this.canvas.height = this.video.videoHeight
    }

    componentWillUnmount() {
        this.stop()
        this.video.removeEventListener('loadeddata', this.onloadeddata)
        this.video.removeEventListener('play', this.start)
        this.video.removeEventListener('pause', this.stop)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.loaded !== this.state.loaded
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.play && this.video.paused) {
            this.video.play()
        } else if (!nextProps.play && !this.video.paused && this.video.readyState === 4) {
            this.video.pause()
        }
    }

    start = () => {
        requestIdleCallback(() => {
            if (this.video) this.paintFrame()
        }, {timeout: 1000})
    }

    stop = () => {
        cancelAnimationFrame(this.RAF)
    }

    paintFrame = (timeStamp = 0) => {
        this.RAF = requestAnimationFrame(this.paintFrame)

        // calc elapsed time since last loop
        const elapsed = timeStamp - this.lastTimeStamp

        // if enough time has elapsed, draw the next frame
        if (this.canvas && elapsed > this.FPSInterval) {
            const context = this.canvas.getContext('2d')

            // Get ready for next frame by setting then=now, but...
            // Also, adjust for fpsInterval not being multiple of 16.67
            this.lastTimeStamp = timeStamp - (elapsed % this.FPSInterval);

            context.drawImage(this.video,0,0)
        }
    }

    render() {
        const style = css`
            background: var(--song-color);
            position: relative;
            top: 0;
            & div.poster {
                height: 100%;
                width: 100%;
                display: flex;
                position: absolute;
                top: 0;
                left: 0;
                background-image: url('assets/noise.png');
                background-size: auto 100%;
                image-rendering: auto;
                image-rendering: crisp-edges;
                image-rendering: pixelated;
                & img {
                    position: relative;
                    height: 100%;
                    width: auto;
                    flex-shrink: 0;
                    image-rendering: auto;
                    image-rendering: crisp-edges;
                    image-rendering: pixelated;
                    animation: ${this.state.loaded ? 'none' : `${scrollPoster} ${2 + (this.props.songIndex % 2)}s infinite both steps(100)`};
                }
            }
            & canvas {
                display: block;
                height: 100vh;
                image-rendering: auto;
                image-rendering: crisp-edges;
                image-rendering: pixelated;
                position: fixed;
                top: 0;
                width: 100vw;
                object-fit: cover;
                position: relative;
                opacity: ${this.state.loaded ? 1 : 0};
                transition: opacity 0.5s;
            }
            & video {
                position: absolute;
                z-index: -2;
                display: block;
                top: 0;
                opacity: 0;
            }
        `

        return (
            <div class={cx('BackgroundVideo', style, this.state.loaded && 'loaded')}>
                <div class="poster">
                    <img src="assets/background-poster.png"/>
                    <img src="assets/background-poster.png"/>
                    <img src="assets/background-poster.png"/>
                </div>
                <canvas
                    ref={canvas => this.canvas = canvas}
                ></canvas>
                <video
                    ref={video => this.video = video}
                    src={this.props.src}
                    preload
                    autoplay
                    muted
                    loop
                    playsinline
                ></video>
            </div>
        )
    }
}
