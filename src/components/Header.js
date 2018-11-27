import {css, cx} from 'emotion'
import Logo from './Logo'

const Header = ({...props}) => {
	const headerStyle = css`
		position: relative;
		height: 200px;
		font-size: 20px;
		letter-spacing: 1px;
		& h1 {
			bottom: 16px;
			color: var(--${props.color});
			left: 16px;
			line-height: 1.45;
			margin: 0;
			position: absolute;
		}
		& svg {
			fill: var(--${props.color});
			position: absolute;
			top: 16px;
			left: 16px;
		}
		& button {
			background: none;
			border: none;
			color: var(--${props.color});
			text-decoration: underline;
			top: 16px;
			padding: 16px 16px;
			position: absolute;
			right: 0;
		}
	`

	return (
		<header class={headerStyle}>
			<Logo />
			<h1>LOS ANGELES ENDS <br/>a record by SIMULCAST</h1>
			<button>liner notes</button>
		</header>
	)
}

export default Header
