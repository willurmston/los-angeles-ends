import {h, Component} from 'preact'
import {css, cx} from 'emotion'
import Logo from './Logo'
import ArrowCursor from './ArrowCursor'

export default class Header extends Component {
	scrollDown(e) {
		if (e.target.tagName === 'BUTTON') return
		const firstSong = document.querySelector('.Song')
		TweenLite.to( document.scrollingElement, 1, {
            scrollTop: firstSong.offsetTop,
            ease: Power2.easeOut
        })
	}

	render() {
		const headerStyle = css`
			position: relative;
			height: 200px;
			font-size: 20px;
			letter-spacing: 1px;
			@media screen and (min-width: 600px) {
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				justify-content: center;
				text-align: left;
				padding-left: 40px;
				height: calc(100vh - 60px);
				font-size: 24px;
				cursor: none;
			}
			& h1 {
				bottom: 16px;
				color: var(--${this.props.color});
				left: 16px;
				line-height: 1.5;
				margin: 0;
				position: absolute;
				@media screen and (min-width: 600px) {
					position: static;
					left: 24px;
					bottom: 24px;
					line-height: 1.3;
					& span {
						display: inline;
						margin-bottom: 1.1em;
						padding-bottom: 4px;
					}
					& span.big {
						letter-spacing: 3px;
						font-size: 60px;
						&:nth-child(1) {
							/* border-bottom: 2px solid var(--purple); */
						}
					}
					& span.small {
						padding-right: 14px;
						letter-spacing: 0.035em;
						font-size: 24px;
						margin-left: 4px;
					}
				}
			}
			& svg.Logo {
				fill: var(--${this.props.color});
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
				color: var(--${this.props.color});
				text-decoration: underline;
				top: 12px;
				letter-spacing: inherit;
				padding: 16px 16px;
				position: absolute;
				right: 0;
				@media screen and (min-width: 600px) {
					/* position: static; */
					top: auto;
					bottom: 14px;
					right: 20px;
				}
			}
			& .ArrowCursor {
				& svg {
					transform: scaleY(0.8) rotate(-31.5deg);
				}
	            & polygon {
	                fill: var(--purple);
	            }
			}
		`

		const bigScreen = window.matchMedia('screen and (min-width: 600px)').matches

		return (
			<header
				class={cx('Header', headerStyle)}
				ref={element => this.element = element}
				onmouseenter={() => this.setState({showArrowCursor: true})}
				onmouseleave={() => this.setState({showArrowCursor: false})}
				onclick={this.scrollDown}
			>
				<Logo />
				{bigScreen ?
					<h1>
						<span class="big">LOS ANGELES ENDS</span>
						<br/><span class="small">a record by simulcast</span>
					</h1>
				:
					<h1>LOS ANGELES ENDS<br/>a record by SIMULCAST</h1>
				}
				{bigScreen &&
					<ArrowCursor
						visible={this.state.showArrowCursor }
						direction={'right'}
					/>
				}
				<button
					onclick={this.props.onLinerNotesButtonClick}
				>
					liner notes
				</button>
			</header>
		)
	}
}
