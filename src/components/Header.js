import {h, Component} from 'preact'
import {css, cx} from 'emotion'
import Logo from './Logo'
import ArrowCursor from './ArrowCursor'
import Map from './Map'
import RadialBackground from './RadialBackground'

const headerStyle = css`
	position: relative;
	height: 200px;
	font-size: 20px;
	letter-spacing: 1px;
	--song-color: var(--red);
	@media screen and (min-width: 600px) {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-end;
		text-align: left;
		padding-left: 20px;
		height: 82vh;
		font-size: 24px;
		overflow: hidden;
		margin-bottom: 20px;
		background: var(--song-color);
		border-bottom: 2px solid var(--song-color);
	}
	& .title {
		bottom: 8px;
		color: var(--song-color);
		left: 16px;
		line-height: 1.3;
		margin: 0;
		position: absolute;
		pointer-events: none;
		@media screen and (min-width: 600px) {
			color: var(--off-white);
			position: static;
			margin-bottom: 30px;
			line-height: 1.09;
			width: 46vw;
			z-index: 1;
			& h1 {
				text-rendering: optimizeSpeed;
				font-size: 11vh;
				margin: 0 0 -10px 0;
				span {
					display: block;
				}
			}
			& h2 {
				margin-bottom: 0;
				margin-left: 0.8vh;
				font-size: 20px;
			}
		}
		@media screen and (min-width: 1300px) {
			& h1 {
				font-size: 15vh;
			}
		}
		@media screen and (min-width: 1500px) {
			& h1 {
				& span {
					&:nth-child(1) {
						text-align: left;
					}
					&:nth-child(2) {
						text-align: center;
					}
					&:nth-child(3) {
						text-align: right;
					}
				}
			}
			& h2 {
				position: absolute;
				left: 20px;
				bottom: 30px;
			}
		}
	}
	& svg.Logo {
		fill: var(--song-color);
		position: absolute;
		top: 16px;
		left: 16px;
		@media screen and (min-width: 600px) {
			position: static;
			margin-bottom: 50px;
			width: 64px;
			height: 64px;
			left: 22px;
			top: 30px;
		}
	}
	& button {
		background: none;
		border: none;
		cursor: pointer;
		color: var(--song-color);
		text-decoration: underline;
		top: 12px;
		letter-spacing: inherit;
		padding: 16px 16px;
		position: absolute;
		right: 0;
		@media screen and (min-width: 600px) {
			top: auto;
			bottom: 14px;
			right: 20px;
		}
	}
`

export default class Header extends Component {
	shouldComponentUpdate() {
		return false
	}

	scrollDown(e) {
		if (e.target.tagName === 'BUTTON') return
		const firstSong = document.querySelector('.Song')
		TweenLite.to( document.scrollingElement, 1, {
            scrollTop: firstSong.offsetTop,
            ease: Power2.easeOut
        })
	}

	render() {
		const bigScreen = window.matchMedia('screen and (min-width: 600px)').matches

		return (
			<header
				class={cx('Header', headerStyle)}
				ref={element => this.element = element}
			>
				{bigScreen &&
					<RadialBackground />
				}
				{bigScreen &&
					<Map
						pins={this.props.songs}
						onPinClick={this.props.onPinClick}
					/>
				}
				{!bigScreen &&
					<Logo />
				}
				{bigScreen ?
					<div class="title">
						<h1><span>LOS</span><span>ANGELES</span><span>ENDS</span></h1>
						<h2>a record by Simulcast</h2>
					</div>
				:
					<div class="title">
						<h1>LOS ANGELES ENDS<br/>a record by SIMULCAST</h1>
					</div>
				}
			</header>
		)
	}
}
