import {h, Component} from 'preact'
import {css, cx, keyframes, injectGlobal} from 'emotion'
import Logo from './Logo'
import ArrowCursor from './ArrowCursor'
import Map from './Map'

const scrollPoster = keyframes`
    0% {
        transform: translate3d(-50%,0,0);
    }
    to {
        transform: translate3d(0, 0, 0);
    }
`

const loaderStyle = css`
	position: relative;
	z-index: 10;
	width: 100%;
	height: 100%;
	font-size: 20px;
	letter-spacing: 1px;
	--ease-out-cubic: cubic-bezier(0.215, 0.610, 0.355, 1.000);
	--song-color: var(--orange);
	opacity: 1;
	@media screen and (min-width: 600px) {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-end;
		text-align: left;
		padding-left: 20px;
		height: 100vh;
		width: 100vw;
		font-size: 24px;
		overflow: hidden;
		margin-bottom: 20px;
		background-color: var(--off-white);
		image-rendering: auto;
		image-rendering: crisp-edges;
		image-rendering: pixelated;
		background-image: repeating-radial-gradient(circle at 80% 30%, transparent, transparent 1px, var(--song-color) 1px, var(--song-color) 12px, transparent 12px);
		&::before {
			content: '';
			display: block;
			position: absolute;
			top: 0;
			left: 0;
			width: 200%;
			height: 100%;
			/* background-image: repeating-linear-gradient(90deg, transparent, transparent 5px, var(--off-white) 6px, var(--off-white) 7px); */
			z-index: 0;
			animation: ${keyframes`
				from {
					transform: translateX(0);
				}
				to {
					transform: translateX(-7px);
				}
			`} 0.2s both infinite linear;
		}
		&::after {
			content: '';
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background: var(--off-white);
			opacity: 1;
		}
		&.map-loaded::after {
			opacity: 0;
			transition: opacity 0.2s 0.2s ease-in-out;
		}
	}
	& div.poster {
		height: 100%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		/* background-image: url('assets/noise.png'); */
		background-size: auto 100%;
		image-rendering: auto;
		image-rendering: crisp-edges;
		image-rendering: pixelated;
		background-position: 50% 100%;
		& div {
			width: 200%;
			height: 100%;
			image-rendering: auto;
			image-rendering: crisp-edges;
			image-rendering: pixelated;
			/* animation: ${scrollPoster} ${20}s infinite both linear; */
			/* background-image: url('assets/noise.png'); */
			background-position: center center;
			background-size: auto 100%;
		}
	}
	&.map-loaded {
		cursor: pointer;
	}
	& button.start-button {
		display: block;
		position: absolute;
		bottom: 30px;
		right: 50px;
		padding: 13px 22px 8px;
		font-size: 28px;
		text-align: center;
		letter-spacing: 0.1em;
		color: var(--off-white);
		overflow: hidden;
		z-index: 1;
		cursor: pointer;
		background-color: var(--song-color);
		&:hover {
			background-color: var(--off-white);
			color: var(--song-color);
			background-image: repeating-linear-gradient(90deg, var(--song-color) 1px, var(--song-color) 2px, transparent 2px, transparent 4px);
		}
		& span {
			position: relative;
		}
	}
	& .title {
		bottom: 8px;
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
				position: relative;
				text-rendering: optimizeSpeed;
				font-size: 11vmin;
				margin: 0 0 -10px 0;
				span {
					display: block;
				}
			}
			& h2 {
				margin-bottom: 0;
				margin-left: 0.8vh;
				font-size: 20px;
				/* background: var(--off-white); */
				/* background: var(--song-color); */
				display: table;
				padding: 4px 8px;
				color: var(--song-color);
				color: var(--off-white);
				z-index: 0;
			}
		}
		@media screen and (min-width: 1400px) {
			& h1 {
				font-size: 15vmin;
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
`

export default class Loader extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		if (nextState.mapLoaded !== this.state.mapLoaded) return true
		if (nextState.exiting !== this.state.exiting) return true
	}

	render() {
		const bigScreen = window.matchMedia('screen and (min-width: 600px)').matches

		return (
			<header
				class={cx('Loader', this.state.mapLoaded ? 'map-loaded' : 'map-not-loaded', this.state.exiting && 'exiting', loaderStyle)}
				ref={element => this.element = element}
				onclick={() => {
					if (this.state.mapLoaded) {
						this.setState({exiting: true})
						this.props.onclick()
					}
				}}
			>
				<div class="poster">
					<div></div>
				</div>
				{bigScreen &&
					<Map
						onload={() => {
							this.setState({mapLoaded: true})
							this.props.onload()
						}}
						pins={this.props.songs}
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
				{bigScreen &&
					<button class="start-button">
						<span>{this.state.mapLoaded ? 'ENTER' : 'LOADING...'}</span>
					</button>
				}
			</header>
		)
	}
}
