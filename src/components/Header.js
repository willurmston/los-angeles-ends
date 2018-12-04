import {css, cx} from 'emotion'
import Logo from './Logo'

const Header = ({...props}) => {
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
		}
		& h1 {
			bottom: 16px;
			color: var(--${props.color});
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
		& svg {
			fill: var(--${props.color});
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
			color: var(--${props.color});
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
	`

	const bigScreen = window.matchMedia('screen and (min-width: 600px)').matches

	return (
		<header class={headerStyle}>
			<Logo />
			{bigScreen ?
				<h1>
					<span class="big">LOS ANGELES ENDS</span>
					<br/><span class="small">a record by simulcast</span>
				</h1>
			:
				<h1>LOS ANGELES ENDS<br/>a record by SIMULCAST</h1>
			}

			<button onclick={props.onLinerNotesButtonClick}>liner notes</button>
		</header>
	)
}

export default Header
