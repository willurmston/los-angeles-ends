import {h, Component} from 'preact'
import {css, cx} from 'emotion'
import Logo from './Logo'
import ArrowCursor from './ArrowCursor'
import Map from './Map'

const headerStyle = css`
	position: relative;
	height: 200px;
	font-size: 20px;
	letter-spacing: 1px;
	--section-color: var(--orange);
	& .title {
		bottom: 0px;
		color: var(--section-color);
		left: 16px;
		line-height: 1.3;
		margin: 0;
		position: absolute;
		pointer-events: none;
	}
	& svg.Logo {
		fill: var(--section-color);
		position: absolute;
		top: 16px;
		left: 16px;
	}
`

export default class Header extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		return false
	}

	render() {
		return (
			<header
				class={cx('Header', headerStyle)}
			>
				<Logo />
				<div class="title">
					<h1>LOS ANGELES ENDS<br/>a record by SIMULCAST</h1>
				</div>
			</header>
		)
	}
}
