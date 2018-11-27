import {h, Component} from 'preact'
import {css, cx} from 'emotion'
import {route} from 'preact-router'
import TitleSlide from './TitleSlide'
import QuoteSlide from './QuoteSlide'
import NarrationSlide from './NarrationSlide'
import LyricsSlide from './LyricsSlide'
import VideoSlide from './VideoSlide'
import BackgroundVideo from './BackgroundVideo'
import Toolbar from './Toolbar'

// Script is loaded in HTML head
window.SC.initialize({
    client_id: 'e247c5d6731ba617c24462912ff16e29'
})

export default class Song extends Component {
    constructor(props) {
        super(props)
        this.state.slides = [
            {
                type: 'title',
                title: this.props.song.title,
                layout: this.props.song.titleLayout,
                slug: this.props.song.slug
            },
            ...this.props.song.slides
        ]

        this.state.currentSlideIndex = 0
        this.state.playerState = 'paused'
    }

    onSongButtonClick = () => {
        this.props.onSongButtonClick(this.props.song)
        this.setState({
            playerState: 'loading',
            intro: true
        })
        setTimeout(() => {
            this.setState({
                intro: false,
            })
            if (this.state.currentSongIndex === 0) {
                this.setState({
                    currentSlideIndex: 1
                })
            }
        }, 700)
        this.player.play()
    }

    renderSlide = (slide) => {
        const isCurrent = this.state.slides[this.state.currentSlideIndex] === slide

        if (slide.type === 'title') {
            return (
                <TitleSlide
                    {...slide}
                    isCurrent={isCurrent}
                    playerState={this.state.playerState}
                    onPlayButtonClick={this.onSongButtonClick}
                    showButton={!this.props.isOpen || this.state.intro}
                />
            )
        } else if (slide.type === 'quote') {
            return (
                <QuoteSlide
                    slide={slide}
                    isCurrent={isCurrent}
                />
            )
        } else if (slide.type === 'narration') {
            return (
                <NarrationSlide
                    slide={slide}
                    isCurrent={isCurrent}
                />
            )
        } else if (slide.type === 'lyrics') {
            return (
                <LyricsSlide
                    slide={slide}
                    isCurrent={isCurrent}
                />
            )
        } else if (slide.type === 'video') {
            return (
                <VideoSlide
                    slide={slide}
                    isCurrent={isCurrent}
                />
            )
        }
    }

    onVisibilityChange = (entries, observer) => {
        this.setState({
            playBackground: entries[0].intersectionRatio > 0
        })
    }

    componentDidMount() {
        this.onhashchange()
        window.addEventListener('hashchange', this.onhashchange)

        // Play or pause the video when it enters or leaves the viewport
        this.observer = new IntersectionObserver(this.onVisibilityChange, {
            threshold: 0
        })
        this.observer.observe(this.element)

        SC.stream(`/tracks/${this.props.song.trackID}`).then(player => {
            this.player = player
            const duration = this.player.getDuration()
            this.player.on('state-change', this.onPlayerStateChange)
            this.player.on('time', time => {
                this.setState({
                    playerProgress: time / this.player.getDuration()
                })
            })
            if (this.props.isOpen)  this.player.play()
        }).catch(error => console.error(error))
    }

    onPlayerStateChange = (state) => {
        // state is 'playing', 'paused', 'loading', 'ended', 'error' or 'dead'
        let playerState = null

        if (state === 'playing') {
            if (this.state.currentSlideIndex === 0 && !this.state.intro) {
                this.setState({
                    intro: false
                })
                this.nextSlide()
            }
            playerState = 'playing'
        } else if (state === 'loading') {
            playerState = 'loading'
        } else {
            playerState = 'paused'
        }

        this.setState({
            playerState: playerState
        })
    }

    onPlayButtonClick = () => {
        if (this.state.playerState === 'paused') {
            this.player.play()
        } else if (this.state.playerState === 'playing') {
            this.player.pause()
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.player && this.props.isOpen !== prevProps.isOpen) {
            if (this.props.isOpen) {
                this.player.play()
            } else {
                this.player.pause()
            }
        }

        if (this.state.currentSlideIndex !== prevState.currentSlideIndex) {
            this.element.querySelectorAll(`.slide`)[this.state.currentSlideIndex].scrollTop = 0
        }
    }

    componentWillUnmount() {
        if (this.player) this.player.pause()
        if (this.observer) this.observer.disconnect()
    }

    onhashchange = () => {
        const index = window.location.hash.substring(1)
        if (Number(index) !== NaN && Number(index) <= this.state.slides.length - 1 ) {
            this.setState({
                currentSlideIndex: Number(index)
            })
        }
    }

    onclick = e => {
        if (!this.props.isOpen && e.pageX > window.innerWidth / 2) {
            this.onSongButtonClick()
        } else {
            e.pageX < window.innerWidth / 2 ? this.prevSlide() : this.nextSlide()
        }
    }

    ontouchstart = e => {
        this.lastTouchStart = {
            x: e.changedTouches[0].screenX,
            y: e.changedTouches[0].screenY,
            wasTriggered: false
        }
    }

    ontouchmove = e => {
        // if we have already transitioned slides while this finger has been down, ignore
        if (this.lastTouchStart.wasTriggered) return

        const start = this.lastTouchStart

        const end = {
            x: e.changedTouches[0].screenX,
            y: e.changedTouches[0].screenY
        }

        if (Math.abs(end.y - start.y) > 10) return

        // if swiped down
        if (end.x < start.x) {
            if (start.x - end.x > 10) {
                this.setState({
                    currentSlideIndex: Math.min(this.state.slides.length - 1, this.state.currentSlideIndex + 1)
                }, this.setHash)
                this.lastTouchStart.wasTriggered = true
            }
        } else {
            if (end.x - start.x > 10) {
                this.setState({
                    currentSlideIndex: Math.max(0, this.state.currentSlideIndex - 1)
                }, this.setHash)
                this.lastTouchStart.wasTriggered = true
            }
        }
    }

    prevSlide = () => {
        const prevIndex = this.state.currentSlideIndex - 1
        if (prevIndex < 1) {
            route('/')
        } else {
            this.setState({
                currentSlideIndex: prevIndex < 0 ? this.state.slides.length - 1 : prevIndex
            }, this.setHash)
        }
    }

    nextSlide = () => {
        const nextIndex = (this.state.currentSlideIndex + 1) % (this.state.slides.length)
        this.setState({
            currentSlideIndex: nextIndex
        }, this.setHash)
    }

    setHash = () => {
        if (this.state.currentSlideIndex === 0) {
            history.replaceState({}, document.title, `/${this.props.song.slug}`)
        } else {
            history.replaceState({}, document.title, `/${this.props.song.slug}#${this.state.currentSlideIndex}`)
        }
    }

    render() {
        const style = css`
            --song-color: var(--${this.props.song.color});
            background: var(--song-color);
            height: 100vh;
            overflow: hidden;
            position: relative;
            top: ${this.props.isOpen ? 0 : 'auto'};
            width: 100vw;
            color: var(--off-white);
            z-index: ${this.props.isOpen ? 1 : 0};
            border-bottom: ${this.props.isOpen ? 'none' : '2px solid var(--song-color)'};
            & .slider {
                display: flex;
                position: absolute;
                height: 100%;
                width: ${this.state.slides.length * 100}vw;
                top: 0;
                transform: translateX(-${this.props.isOpen ? this.state.currentSlideIndex * 100 : 0}vw);
                transition: transform 0.35s ease-out;
                /* z-index: 3; */
                overflow: hidden;
                & .slide {
                    max-height: 100%;
                    position: relative;
                    flex-shrink: 0;
                    overflow-y: scroll;
                    -webkit-overflow-scrolling: touch;
                }
            }
        `

        return (
            <section
                class={cx('Song', style)}
                id={this.props.song.slug}
                ref={element => this.element = element}
                key={this.props.song.slug}
            >
                <BackgroundVideo
                    src={this.props.song.backgroundVideo}
                    color={this.props.song.color}
                    play={this.state.playBackground}
                    playbackRate={this.props.song.backgroundPlaybackRate}
                />
                <Toolbar
                    currentSlideIndex={this.state.currentSlideIndex}
                    isOpen={this.props.isOpen}
                    song={this.props.song}
                    playerState={this.state.playerState}
                    playerProgress={this.state.playerProgress}
                    onPlayButtonClick={this.onPlayButtonClick}
                />
                <div
                    class="slider"
                    onclick={this.onclick}
                    ontouchstart={this.props.isOpen && this.ontouchstart}
                    ontouchmove={this.props.isOpen && this.ontouchmove}
                    ontouchend={this.props.isOpen && this.ontouchmove}
                >
                    {this.state.slides.map( this.renderSlide )}
                </div>
            </section>
        )
    }
}
