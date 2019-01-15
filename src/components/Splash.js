import {h, Component} from 'preact'
import {css, cx, keyframes, injectGlobal} from 'emotion'
import Logo from './Logo'
import ArrowCursor from './ArrowCursor'
import Map from './Map'

const splashStyle = css`
	position: relative;
	z-index: 10;
	width: 100%;
	height: 100%;
	font-size: 20px;
	letter-spacing: 1px;
	--section-color: var(--orange);
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
		background-image: repeating-radial-gradient(circle at 80% 30%, transparent, transparent 1px, var(--section-color) 1px, var(--section-color) 12px, transparent 12px);
		&::after {
			content: '';
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background: var(--off-white);
			opacity: 1;
            z-index: 1;
		}
		&.map-loaded::after {
			opacity: 0;
			transition: opacity 0.2s 0.2s ease-in-out;
		}
	}
	&.map-loaded {
		cursor: pointer;
	}
	& button.start-button {
		display: flex;
		position: absolute;
		bottom: 30px;
		right: 50px;
		padding: 16px 22px;
        line-height: 28px;
		font-size: 28px;
		text-align: center;
		letter-spacing: 0.1em;
		color: var(--off-white);
		overflow: hidden;
		z-index: 2;
		cursor: pointer;
		background-color: var(--section-color);
        border: 1px solid var(--off-white);
		&:hover {
			background-color: var(--off-white);
			color: var(--section-color);
            border: 1px solid var(--section-color);
		}
		& span {
            display: block;
            line-height: 23px;
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
				margin: 0 0 10px 0;
				span {
					display: block;
				}
			}
			& h2 {
				margin-bottom: 0;
				margin-left: 0.8vh;
				font-size: 20px;
				display: table;
				padding: 2px 6px;
				color: var(--off-white);
                background: var(--section-color);
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
				class={cx('Splash', this.state.mapLoaded ? 'map-loaded' : 'map-not-loaded', this.state.exiting && 'exiting', splashStyle)}
				ref={element => this.element = element}
				onclick={() => {
					if (this.state.mapLoaded) {
						this.setState({exiting: true})
						this.props.onclick()
					}
				}}
			>
				<Map
					onload={() => {
						this.setState({mapLoaded: true})
						this.props.onload()
					}}
					pins={this.props.songs}
				/>
				<div class="title">
					<h1><span>LOS</span><span>ANGELES</span><span>ENDS</span></h1>
					<h2>a record by Simulcast</h2>
				</div>
				<button class="start-button">
					<span>{this.state.mapLoaded ? 'ENTER' : 'LOADING...'}</span>
				</button>
			</header>
		)
	}
}
