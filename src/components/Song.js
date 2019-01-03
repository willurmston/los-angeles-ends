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
import HomeButton from './HomeButton'
import ArrowCursor from './ArrowCursor'
import KeyboardListener from './KeyboardListener'
import Curtain from './Curtain'

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

    renderSlide = (slide) => {
        const isCurrent = this.state.slides[this.state.currentSlideIndex] === slide

        if (slide.type === 'title') {
            return (
                <TitleSlide
                    {...slide}
                    songIsOpen={this.props.isOpen}
                    isCurrent={isCurrent}
                    playerState={this.state.playerState}
                    songUrl={`/${this.props.song.slug}`}
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
            threshold: [0, 0.25, 0.5, 0.75, 1]
        })
        this.observer.observe(this.element)

        SC.stream(`/tracks/${this.props.song.trackID}`, this.props.song.trackSecret || null).then(player => {
            this.player = player
            const duration = this.player.getDuration()
            this.player.on('state-change', this.onPlayerStateChange)
            this.player.on('time', time => {
                this.setState({
                    playerProgress: time / this.player.getDuration()
                })
            })
            if (this.props.isOpen)  this.player.play()
        }).catch(error => console.error(`Request to stream "${this.props.song.title}" failed`, {
            ...error,
            song: {
                title: this.props.song.title,
                slug: this.props.song.slug,
                trackID: this.props.song.trackID,
                trackSecret: this.props.song.trackSecret
            }
        }))
    }

    onPlayerStateChange = (state) => {
        // state is 'playing', 'paused', 'loading', 'ended', 'error' or 'dead'
        let playerState = null

        if (state === 'playing') {
            playerState = 'playing'
        } else if (state === 'loading') {
            playerState = 'loading'
        } else if (state === 'ended') {
            playerState = 'playing'
            this.player.play()
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
        } else if (this.state.playerState === 'ended') {
            this.player.play()
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.player && this.props.isOpen !== prevProps.isOpen) {
            if (this.props.isOpen) {
                setTimeout(() => this.onhashchange(), 400)
                this.player.play()
            } else {
                this.player.pause()
            }
        }

        if (this.state.currentSlideIndex !== prevState.currentSlideIndex) {
            this.element.querySelectorAll(`.slide`)[this.state.currentSlideIndex].scrollTop = 0
        }

        if (this.props.pauseBackground !== prevProps.pauseBackground) {
            this.setState({
                pauseBackground: this.props.pauseBackground
            })
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
        if (this.props.onclick) this.props.onclick()
        if (this.props.isOpen && e.target.tagName !== 'A') {
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

        // if swiped left
        if (end.x < start.x) {
            if (start.x - end.x > 10) {
                this.nextSlide()
                this.lastTouchStart.wasTriggered = true
            }
        } else {
            if (end.x - start.x > 10) {
                this.prevSlide()
                this.lastTouchStart.wasTriggered = true
            }
        }
    }

    setCurrentSlide = (index) => {
        this.setState({
            currentSlideIndex: index
        }, () => {
            this.setHash()
        })
    }

    prevSlide = () => {
        const prevIndex = this.state.currentSlideIndex - 1
        if (prevIndex < 0) {
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
            height: ${this.props.isOpen ? '100vh' : '100vw' };
            overflow: hidden;
            position: relative;
            width: 100vw;
            color: var(--off-white);
            z-index: ${this.props.isOpen ? 10 : 0};
            & .slider {
                display: flex;
                position: absolute;
                height: ${this.props.isOpen ? 'calc(100% - 60px)' : '100%'};
                width: ${this.state.slides.length * 100}vw;
                top: ${this.props.isOpen ? '60px' : 0};
                transform: translateX(-${this.props.isOpen ? this.state.currentSlideIndex * 100 : 0}vw);
                transition: transform 0.35s cubic-bezier(.23,.23,.36,.95);
                overflow: hidden;
                cursor: none;
                user-select: none;
                @media screen and (min-width: 600px) {
                    height: 100%;
                    transition: transform 0.4s cubic-bezier(.23,.23,.36,.95), top 0.2s cubic-bezier(.23,.23,.36,.95);
                    top: 0;
                }
                & .slide {
                    max-height: 100%;
                    position: relative;
                    flex-shrink: 0;
                    overflow-y: auto;
                    -webkit-overflow-scrolling: touch;
                    & .content > * {
                        cursor: default;
                    }
                }
            }
            @media screen and (min-width: 600px) {
                height: calc(100vh - 70px);
                box-sizing: border-box;
                & .HomeButton {
                    position: absolute;
                    top: 30px;
                    left: 30px;
                    & svg {
                        fill: var(--off-white);
                    }
                    &:hover svg {
                        cursor: pointer;
                        fill: var(--song-color);
                    }
                }
            }
        `

        const bigScreen = window.matchMedia('screen and (min-width: 600px)').matches

        return (
            <section
                class={cx('Song', style, this.props.class)}
                id={this.props.song.slug}
                ref={element => this.element = element}
                key={this.props.song.slug}
            >
                <BackgroundVideo
                    src={this.props.song.backgroundVideo}
                    color={this.props.song.color}
                    play={this.state.playBackground && !this.props.pauseBackground}
                    playbackRate={this.props.song.backgroundPlaybackRate}
                    slug={this.props.song.slug}
                    songIndex={this.props.index}
                />
                <Toolbar
                    currentSlideIndex={this.state.currentSlideIndex}
                    isOpen={this.props.isOpen}
                    song={this.props.song}
                    playerState={this.state.playerState}
                    playerProgress={this.state.playerProgress}
                    onPlayButtonClick={this.onPlayButtonClick}
                    onSegmentClick={this.setCurrentSlide}
                />
                {bigScreen &&
                    <ArrowCursor
                        visible={this.props.isOpen && this.props.showArrowCursor && this.state.showArrowCursor}
                    />
                }
                <div
                    class="slider"
                    onclick={this.onclick}
                    ontouchstart={this.props.isOpen && this.ontouchstart}
                    ontouchmove={this.props.isOpen && this.ontouchmove}
                    ontouchend={this.props.isOpen && this.ontouchmove}
                    onmouseenter={() =>
                        this.setState({
                            showArrowCursor: true
                        })
                    }
                    onmouseleave={() =>
                        this.setState({
                            showArrowCursor: true
                        })
                    }
                >
                    {this.state.slides.map( this.renderSlide )}
                </div>
                {bigScreen && this.props.isOpen &&
                    <HomeButton
                        onclick={() => route('/')}
                    />
                }
                {bigScreen &&
                    <Curtain
                        side="top"
                        isOpen={this.props.isOpen}
                    />
                }
                {bigScreen &&
                    <Curtain
                        side="right"
                        isOpen={this.props.isOpen}
                    />
                }
                {bigScreen &&
                    <Curtain
                        side="bottom"
                        isOpen={this.props.isOpen}
                    />
                }
                {bigScreen &&
                    <Curtain
                        side="left"
                        isOpen={this.props.isOpen}
                    />
                }
                {this.props.isOpen &&
                    <KeyboardListener
                        onRight={this.nextSlide}
                        onLeft={this.prevSlide}
                        onEsc={() => route('/')}
                    />
                }
            </section>
        )
    }
}
