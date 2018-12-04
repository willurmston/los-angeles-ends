import 'preact/debug'
import 'intersection-observer'
import {h, Component} from 'preact'
import {css, cx} from 'emotion'
import MarkdownIt from 'markdown-it'
import content from '../../content/index.js'
import Router, {route}  from 'preact-router'
import Match from 'preact-router/match'
// import TweenLite from 'gsap/TweenLite'
// import { TweenLite } from 'gsap/TweenLite'
// import TweenLite from '../../node_modules/gsap/TweenLite'
const TweenLite = window.TweenLite

import DelayUnmount from './DelayUnmount'
import Header from './Header'
import Song from './Song'
import ArrowCursor from './ArrowCursor'
import LinerNotes from './LinerNotes'

// PARSE MARKDOWN
const md = MarkdownIt({
    typographer: true,
    quotes: '“”‘’'
})

const markdownToHTML = string => md.render(string.replace(/ +(?= )/g, ''))
// Parse song markdown
content.songs.forEach( song => {
    // Add backgroundVideo
    song.slides.forEach( slide => {
        if (Object.keys(slide).includes('markdown')) {
            slide.markdown = markdownToHTML(slide.markdown)
        }
    })
})
// Parse liner notes markdown
content.credits = markdownToHTML(content.credits)

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
                this.enterSong(matchingSong)
            }
        }
    }

    // Animate into song
    enterSong = (song) => {
        const songElement = document.querySelector(`.Song#${song.slug}`)
        this.setState({
            currentSong: song
        })
        TweenLite.to( document.scrollingElement, 0.7, {
            scrollTop: songElement.offsetTop,
            ease: Power2.easeOut
        })
    }

    exitSong = (prevSong) => {
        const songElement = document.querySelector(`.Song#${prevSong.slug}`)
        const offsetTop = songElement.offsetTop
        // First, immediately scroll to top of element
        document.scrollingElement.scrollTop = songElement.offsetTop
        // Then scroll smoothly and keep the element centered
        const closedSongHeight = window.innerWidth
        const targetScroll = offsetTop - (closedSongHeight / 2)
        TweenLite.to( document.scrollingElement, 0.7, {
            scrollTop: targetScroll,
            ease: Power1.easeOut,
        })
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
        `

        const bigScreen = window.matchMedia('screen and (min-width: 600px)').matches

        return (
            <div class={cx('App', style)} ontouchstart={e => {return true}}>
                <DelayUnmount
                    mount={this.state.currentSong === null}
                    unmountDelay={800}
                >
                    <Header
                        color={content.songs[0].color}
                        onLinerNotesButtonClick={this.scrollToLinerNotes}
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
                                    onclick={this.state.currentSong === null ? () => route(`/${song.slug}`) : null}
                                    pauseBackground={this.state.pauseBackgrounds}
                                    key={song.slug}
                                    showArrowCursor={this.state.showArrowCursor}
                                />
                            </DelayUnmount>
                        )
                    })}
                    {bigScreen && this.state.currentSong === null &&
                        <ArrowCursor
                            visible={this.state.showArrowCursor}
                            parent={this.songsElement}
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
                        links={content.links}
                        credits={content.credits}
                    />
                </DelayUnmount>
                <Router onChange={this.handleRoute}>
                    <div path="/:songSlug"></div>
                    <div default></div>
                </Router>
            </div>
        )
    }
}
