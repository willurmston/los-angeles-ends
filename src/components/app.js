import 'preact/debug'
import 'intersection-observer'
import '../request-idle-callback'
import whatInput from 'what-input'
import {h, Component} from 'preact'
import {css, cx, injectGlobal} from 'emotion'
import content from '../../content/index.js'
import Router, {route}  from 'preact-router'
import Match from 'preact-router/match'
import utils from '../utils'

// TweenLite has to be loaded in /src/template.html
const TweenLite = window.TweenLite

import DelayUnmount from './DelayUnmount'
import Loader from './Loader'
import Header from './Header'
import Song from './Song'
import ArrowCursor from './ArrowCursor'
import LinerNotes from './LinerNotes'
import KeyboardListener from './KeyboardListener'

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state.songs = content.songs
        this.state.currentSong = null
        this.state.initialRender = true
        this.state.playBackgrounds = true
        this.state.allowScroll = true
    }

    handleRoute = (e) => {
        if (e.url === '/') {
            const bigScreen = window.matchMedia('screen and (min-width: 600px)').matches
            this.setState({
                currentSong: null,
                allowScroll: !bigScreen
            })
        } else {
            const matchingSong = this.state.songs.find(song => song.slug === e.current.attributes.songSlug)
            if (matchingSong) {
                if (this.state.currentSong) {
                    // If there's already a song open
                    // First close the song
                    route('/')
                    // Then, scroll to next project
                    setTimeout(() => {
                        const songElement = document.querySelector(`.Song#${matchingSong.slug}`)
                        this.scrollToElement(songElement, () => {
                            this.setState({
                                currentSong: matchingSong
                            })
                        })
                    }, 500)
                } else {
                    const songElement = document.querySelector(`.Song#${matchingSong.slug}`)
                    this.scrollToElement(songElement, () => {
                        this.setState({
                            currentSong: matchingSong
                        })
                    })
                }
            }
        }
    }

    // Reusable method to scroll to an element at a constant speed
    scrollToElement(element, onComplete, pixelsPerSec = 1500, maxDuration = 2) {
        const currentScroll = document.scrollingElement.scrollTop
        const targetScroll = utils.offset(element).top
        const delta = Math.abs(targetScroll - currentScroll)
        const duration = Math.min(delta / pixelsPerSec, maxDuration)

        TweenLite.to( document.scrollingElement, duration, {
            scrollTop: targetScroll,
            ease: Sine.easeInOut,
            onComplete: onComplete
        })
    }

    enterNearestSong() {
        const songSections = Array.from(document.querySelectorAll('div.songs > .Song'))
        const scrollTop = document.scrollingElement.scrollTop
        const offsetTops = songSections.map(section => utils.offset(section).top)
        const nearestSong = songSections[utils.nearestNumber(offsetTops, scrollTop)]
        route(`/${nearestSong.getAttribute('id')}`)
    }

    scrollToSection = (target, duration = 0.4) => {
        if (target === 'next') {
            // Get array of all sections except Header
            const sections = Array.from(document.querySelectorAll('div.songs > .Song, .LinerNotes'))
            // cache scrollTop (causes reflow)
            const scrollTop = document.scrollingElement.scrollTop
            target = sections.find(section => {
                return utils.offset(section).top - 1 > scrollTop
            })
        } else if (target === 'prev') {
            // Get array of all sections
            const sections = Array.from(document.querySelectorAll('.Header, div.songs > .Song, .LinerNotes'))
            // cache scrollTop (causes reflow)
            const scrollTop = document.scrollingElement.scrollTop
            target = sections.reverse().find(section => {
                return utils.offset(section).top < scrollTop
            })
        } else if (target.slug) {
            // It's a song object, not a DOM node
            target = document.querySelector(`.Song#${target.slug}`)
        }

        if (target) {
            this.scrollToElement(target)
        }
    }

    onLoaderClick = () => {
        this.scrollToElement(document.querySelector('.Song'))
        this.setState({
            allowScroll: true
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.currentSong !== prevState.currentSong) {
            if (this.state.currentSong === null) {
                // Immediately scroll to the song we just exited
                const songElement = document.querySelector(`.Song#${prevState.currentSong.slug}`)
                const offsetTop = utils.offset(songElement).top
                const bigScreen = window.matchMedia('screen and (min-width: 600px)').matches

                if (bigScreen) {
                    document.scrollingElement.scrollTop = offsetTop
                } else {
                    // On small screens, center song vertically
                    document.scrollingElement.scrollTop = offsetTop - (window.innerHeight / 4)
                }
            }
        } else if (this.state.allowScroll !== prevState.allowScroll) {
            document.documentElement.style['overflow-y'] = this.state.allowScroll === false ? 'hidden' : 'auto'
        }
    }

    render() {
        const style = css`
            height: 100%;
            & .songs .Song:nth-child(${this.state.songs.length}) {
                border-bottom: none;
            }
            & .LinerNotes {
                transition: opacity 0.3s;
                animation: ${this.state.currentSong === this.state.songs[this.state.songs.length - 1] ? 'fade-out both 0.2s' : 'fade-in both 0.3s 0.3s' };
            }
        `

        const bigScreen = window.matchMedia('screen and (min-width: 600px)').matches

        return (
            <div class={cx('App', style)} ontouchstart={e => {return true}}>
                {this.state.currentSong === null && bigScreen &&
                    <Loader
                        onclick={this.onLoaderClick}
                        songs={this.state.songs}
                    />
                }
                {this.state.currentSong === null && !bigScreen &&
                    <Header
                        songs={this.state.songs}
                    />
                }
                <div
                    class="songs"
                    ref={element => this.songsElement = element}
                    onmouseenter={() =>
                        this.setState({
                            showArrowCursor: true
                        })
                    }
                    onmouseleave={() =>
                        this.setState({
                            showArrowCursor: false
                        })
                    }
                >
                    {content.songs.map( (song, index) => (
                        <Song
                            song={song}
                            index={index}
                            isOpen={song === this.state.currentSong}
                            isVisible={this.state.currentSong === null || song === this.state.currentSong}
                            onclick={() => route(`/${song.slug}`)}
                            pauseBackground={this.state.pauseBackgrounds}
                            showArrowCursor={this.state.showArrowCursor}
                            key={song.slug}
                        />
                    ))}
                    {bigScreen && this.state.currentSong === null &&
                        <ArrowCursor
                            visible={this.state.showArrowCursor}
                            direction={'right'}
                        />
                    }
                </div>
                {this.state.currentSong === null &&
                    <LinerNotes
                        color={'blue'}
                        accentColor={'pink'}
                        listenLinks={content.listenLinks}
                        socialLinks={content.socialLinks}
                        credits={content.credits}
                    />
                }
                <Router onChange={this.handleRoute}>
                    <div path="/:songSlug"></div>
                    <div default></div>
                </Router>
                {this.state.allowScroll !== false &&
                    <KeyboardListener
                        onUp={e => {
                            e.preventDefault()
                            if(this.state.currentSong === null) {
                                this.scrollToSection('prev')
                            } else {
                                const cycleAmount = this.state.songs.indexOf(this.state.currentSong) - 1
                                // First, animate home
                                route('/')
                                // Then, scroll to next project
                                setTimeout(() => {
                                    route(`/${utils.cycleArray(this.state.songs, cycleAmount )[0].slug}`, true)
                                }, 500)
                            }
                        }}
                        onDown={e => {
                            e.preventDefault()
                            if(this.state.currentSong === null) {
                                this.scrollToSection('next')
                            } else {
                                const cycleAmount = this.state.songs.indexOf(this.state.currentSong) + 1
                                // First, animate home
                                route('/')
                                // Then, scroll to next project
                                setTimeout(() => {
                                    route(`/${utils.cycleArray(this.state.songs, cycleAmount )[0].slug}`, true)
                                }, 500)
                            }
                        }}
                        onRight={e => {
                            if (this.state.currentSong === null) {
                                e.preventDefault()
                                this.enterNearestSong()
                            }
                        }}
                        onEsc={() => route('/')}
                    />
                }
            </div>
        )
    }
}
