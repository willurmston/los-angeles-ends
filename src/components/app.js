import 'preact/debug'
import 'intersection-observer'
import ric from 'request-idle-callback'
if (!window.requestIdleCallback) ric.requestIdleCallback
import {h, Component} from 'preact'
import {css, cx} from 'emotion'
import content from '../../content/index.js'
import Router, {route}  from 'preact-router'
import Match from 'preact-router/match'
import utils from '../utils'
// import TweenLite from 'gsap/TweenLite'
// import { TweenLite } from 'gsap/TweenLite'
// import TweenLite from '../../node_modules/gsap/TweenLite'
const TweenLite = window.TweenLite

import DelayUnmount from './DelayUnmount'
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
    }

    handleRoute = (e) => {
        if (e.url === '/') {
            this.setState({
                currentSong: null
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
                        this.enterSong(matchingSong)
                    }, 500)
                } else {
                    this.enterSong(matchingSong)
                }
            }
        }
    }

    // Animate into song
    enterSong = (song) => {
        const songElement = document.querySelector(`.Song#${song.slug}`)
        this.setState({
            currentSong: song
        })
        TweenLite.to( document.scrollingElement, 0.4, {
            scrollTop: songElement.offsetTop,
            ease: Power2.easeOut
        })
    }

    exitSong = (prevSong) => {
        const songElement = document.querySelector(`.Song#${prevSong.slug}`)
        const offsetTop = songElement.offsetTop
        const bigScreen = window.matchMedia('screen and (min-width: 600px)').matches
        // First, immediately scroll to top of element
        document.scrollingElement.scrollTop = bigScreen ? offsetTop : offsetTop - (window.innerHeight / 4)
    }

    enterNextSong() {
        const songSections = Array.from(document.querySelectorAll('div.songs > .Song'))
        const scrollTop = document.scrollingElement.scrollTop
        var accumulatedHeight = 0
        const next = songSections.find(section => {
            if (accumulatedHeight >= scrollTop) {
                return true
            } else {
                accumulatedHeight += section.getBoundingClientRect().height
                return false
            }
        })
        if (next) {
            route(`/${next.getAttribute('id')}#1`)
        }
    }

    scrollToSong = (target, duration = 0.4) => {
        if (target === 'next') {
            // Get array of all sections
            const sections = Array.from(document.querySelectorAll('.Header, div.songs > .Song, .LinerNotes'))
            // cache scrollTop (causes reflow)
            const scrollTop = document.scrollingElement.scrollTop
            var accumulatedHeight = 0
            target = sections.find(section => {
                if (accumulatedHeight >= scrollTop) {
                    return true
                } else {
                    accumulatedHeight += section.getBoundingClientRect().height
                    return false
                }
            })
        } else if (target === 'prev') {
            // Get array of all sections
            const sections = Array.from(document.querySelectorAll('.Header, div.songs > .Song, .LinerNotes'))
            // cache scrollTop (causes reflow)
            const scrollTop = document.scrollingElement.scrollTop
            target = sections.reverse().find(section => {
                return section.offsetTop < scrollTop
            })
        } else if (target.slug) {
            // It's a song object, not a DOM node
            target = document.querySelector(`.Song#${target.slug}`)
        }

        if (target) {
            this.setState({
                pauseBackgrounds: true
            })
            TweenLite.to( document.scrollingElement, duration, {
                scrollTop: target.offsetTop,
                ease: Power1.easeOut,
                onComplete: (e) => {
                    this.setState({
                        pauseBackgrounds: false
                    })
                }
            })
        }
    }

    scrollToLinerNotes = () => {
        this.setState({
            pauseBackgrounds: true
        }, () => {
            TweenLite.to(document.scrollingElement, 1, {
        		scrollTop: document.querySelector('footer.LinerNotes').offsetTop,
        		ease: Power1.easeOut,
                onComplete: (e) => {
                    this.setState({
                        pauseBackgrounds: false
                    })
                }
        	})
        })
    }

    playNextSong = () => {
        const nextSongIndex = (this.state.songs.indexOf(this.state.currentSong) + 1) % (this.state.songs.length)
        const nextSong = this.state.songs[nextSongIndex]
        route(`/${nextSong.slug}`)
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.currentSong !== prevState.currentSong) {
            if (this.state.currentSong === null) {
                this.exitSong(prevState.currentSong)
            }
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
                <DelayUnmount
                    mount={this.state.currentSong === null}
                    unmountDelay={800}
                >
                    <Header
                        onLinerNotesButtonClick={this.scrollToLinerNotes}
                        songs={this.state.songs}
                        onPinClick={this.scrollToSong}
                    />
                </DelayUnmount>
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
                    {content.songs.map( (song, index) => {
                        return (
                            <DelayUnmount
                                mount={this.state.currentSong === null || this.state.currentSong === song}
                                unmountDelay={800}
                            >
                                <Song
                                    song={song}
                                    index={index}
                                    isOpen={song === this.state.currentSong}
                                    onclick={this.state.currentSong === null ?
                                        () => route(`/${song.slug}${bigScreen ? '#1' : ''}`)
                                    : null}
                                    pauseBackground={this.state.pauseBackgrounds}
                                    key={song.slug}
                                    showArrowCursor={this.state.showArrowCursor}
                                    playNextSong={this.playNextSong}
                                />
                            </DelayUnmount>
                        )
                    })}
                    {bigScreen && this.state.currentSong === null &&
                        <ArrowCursor
                            visible={this.state.showArrowCursor}
                            direction={'right'}
                        />
                    }
                </div>
                <DelayUnmount
                    mount={this.state.currentSong === null}
                    unmountDelay={800}
                >
                    <LinerNotes
                        color={'blue'}
                        accentColor={'pink'}
                        listenLinks={content.listenLinks}
                        socialLinks={content.socialLinks}
                        credits={content.credits}
                    />
                </DelayUnmount>
                <Router onChange={this.handleRoute}>
                    <div path="/:songSlug"></div>
                    <div default></div>
                </Router>
                <KeyboardListener
                    onUp={() => {
                        if(this.state.currentSong === null) {
                            this.scrollToSong('prev')
                        } else {
                            const cycleAmount = this.state.songs.indexOf(this.state.currentSong) - 1
                            // First, animate home
                            route('/')
                            // Then, scroll to next project
                            setTimeout(() => {
                                route(`/${utils.cycleArray(this.state.songs, cycleAmount )[0].slug}`, true)
                            }, 700)
                        }
                    }}
                    onDown={() => {
                        if(this.state.currentSong === null) {
                            this.scrollToSong('next')
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
                    onRight={this.state.currentSong === null ? () => this.enterNextSong() : null}
                    onEsc={() => route('/')}
                />
            </div>
        )
    }
}
