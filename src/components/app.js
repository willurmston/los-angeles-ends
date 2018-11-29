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

import Header from './Header'
import Song from './Song'
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
                this.setState({
                    currentSong: matchingSong
                })
            }
        }
    }

    scrollToSong(song, onComplete) {
        const offsetTop = document.querySelector(`.Song#${song.slug}`).offsetTop
        TweenLite.to( document.scrollingElement, 0.35, {
            scrollTop: offsetTop,
            ease: Power0.easeNone,
            onComplete: (e) => {
                if (onComplete) onComplete()
            }
        })
    }

    scrollToLinerNotes = () => {
        this.setState({
            pauseBackgrounds: true
        }, () => {
            TweenLite.to(document.scrollingElement, 1, {
        		scrollTop: document.querySelector('footer.LinerNotes').offsetTop,
        		ease: Power2.easeOut,
                onComplete: (e) => {
                    this.setState({
                        pauseBackgrounds: false
                    })
                }
        	})
        })
    }

    // Animate into song
    enterSong = (song) => {
        setTimeout(() => {
            route(`/${song.slug}`)
        }, 350)
        // this.scrollToSong(song, () => {
        //     setTimeout(() => {
        //         route(`/${song.slug}`)
        //     }, 350)
        // })
    }

    playNextSong = () => {
        const nextSongIndex = (this.state.songs.indexOf(this.state.currentSong) + 1) % (this.state.songs.length)
        const nextSong = this.state.songs[nextSongIndex]
        route(`/${nextSong.slug}`)
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.currentSong !== prevState.currentSong) {
            if (this.state.currentSong === null) {
                // document.scrollingElement.scrollTop = document.querySelector(`.Song#${prevState.currentSong.slug}`).offsetTop
                // this.forceUpdate()
                setTimeout(() => {
                    const targetSong = document.querySelector(`.Song#${prevState.currentSong.slug}`)
                    const scrollAmt = targetSong.offsetTop - ((window.innerHeight - targetSong.offsetHeight) / 2)

                    TweenLite.to( document.scrollingElement,0.4, {
                        scrollTop: scrollAmt,
                        ease: Power2.easeOut,
                        onComplete: (e) => {

                        }
                    })
                }, 200)
            } else if (prevState.currentSong === null) {
                const targetSong = document.querySelector(`.Song#${prevState.currentSong.slug}`)
                const scrollAmt = targetSong.offsetTop - ((window.innerHeight - targetSong.offsetHeight) / 2)

                console.log(scrollAmt, targetSong.offsetHeight,window.innerHeight)

                TweenLite.to( document.scrollingElement, 0.35, {
                    scrollTop: scrollAmt,
                    ease: Power2.easeOut,
                })
            }
        }
    }

    render() {
        const style = css`
            height: 100%;
        `

        return (
            <div class={cx('App', style)} ontouchstart={e => {return true}}>
                {!this.state.currentSong &&
                    <Header
                        color={content.songs[0].color}
                        onLinerNotesButtonClick={this.scrollToLinerNotes}
                    />
                }
                {!this.state.currentSong && content.songs.map( song =>
                    <Song
                        song={song}
                        isOpen={false}
                        onSongButtonClick={this.enterSong}
                        pauseBackground={this.state.pauseBackgrounds}
                        key={song.slug}
                    />
                )}
                {this.state.currentSong ?
                    <Song
                        song={this.state.currentSong}
                        isOpen={true}
                        onSongButtonClick={this.enterSong}
                        currentSlideIndex={this.state.currentSlideIndex || 0}
                        key={this.state.currentSong.slug}
                        playNextSong={this.playNextSong}
                    />
                : null}
                {this.state.currentSong ? null :
                    <LinerNotes
                        color={'blue'}
                        accentColor={'pink'}
                        links={content.links}
                        credits={content.credits}
                    />
                }
                <Router onChange={this.handleRoute}>
                    <div path="/:songSlug"></div>
                    <div default></div>
                </Router>
            </div>
        )
    }
}
