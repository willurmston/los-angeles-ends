import {h, Component} from 'preact'
import {css, cx} from 'emotion'

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
        this.canvas.width = this.video.videoWidth
        this.canvas.height = this.video.videoHeight
    }

    componentWillUnmount() {
        this.stop()
        this.video.removeEventListener('loadeddata', this.onloadeddata)
        this.video.removeEventListener('play', this.start)
        this.video.removeEventListener('pause', this.stop)
    }

    shouldComponentUpdate() {
        return false
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.play && this.video.paused) {
            this.video.play()
        } else if (!nextProps.play && !this.video.paused && this.video.readyState === 4) {
            this.video.pause()
        }
    }

    start = () => {
        this.paintFrame()
    }

    stop = () => {
        cancelAnimationFrame(this.RAF)
    }

    paintFrame = (timeStamp = 0) => {
        this.RAF = requestAnimationFrame(this.paintFrame)

        // calc elapsed time since last loop
        const elapsed = timeStamp - this.lastTimeStamp

        // if enough time has elapsed, draw the next frame
        if (elapsed > this.FPSInterval) {
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
            & canvas {
                height: 100vh;
                image-rendering: auto;
                image-rendering: crisp-edges;
                image-rendering: pixelated;
                position: fixed;
                top: 0;
                width: 100vw;
                object-fit: cover;
                position: relative;
                display: block;
            }
            & video {
                position: absolute;
                z-index: -2;
                display: block;
                top: 0;
            }
        `

        return (
            <div class={cx('BackgroundVideo', style)}>
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
