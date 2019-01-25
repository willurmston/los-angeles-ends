import {h, Component} from 'preact'
import {css, cx} from 'emotion'
import {disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks} from 'body-scroll-lock'

const style = css`
    width: 100vw;
    height: 100%;
    position: relative;
    flex-shrink: 0;
    position: relative;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    @media screen and (min-width: 600px) {
        font-size: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }
`

export default class Slide extends Component {
    componentDidMount() {
        disableBodyScroll(this.element)
    }

    componentWillUnmount() {
        clearAllBodyScrollLocks()
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.isCurrent !== this.props.isCurrent
    }

    render() {
        return (
            <div
                class={cx('Slide', style)} ref={element => this.element = element}
                >
                {this.props.children}
            </div>
        )
    }
}
