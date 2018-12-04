import {h, Component} from 'preact'
import {css, cx} from 'emotion'

const style = css`
    position: fixed;
    left: -50px;
    top: -50px;
    width: 100px;
    height: 100px;
    pointer-events: none;
    transition: opacity 0.05s;
        & svg {
            width: 100%;
            height: 100%;
            & polygon {
                fill: var(--off-white);
            }
        }
    }
`

export default class ArrowCursor extends Component {
    componentDidMount() {
        window.addEventListener('mousemove', this.onmousemove)
    }

    onmousemove = e => {
        this.setState({
            x: e.clientX,
            y: e.clientY
        })
    }

    componentWillUnmount() {
        window.addEventListener('mousemove', this.onmousemove)
    }

    render() {
        if (this.state.x && this.props.visible) {
            const rotation = this.props.direction === 'right' ?
                0 : this.state.x > this.props.parent.offsetWidth / 2 ?
                    0 : 180

            return (
                <div
                    class={cx('ArrowCursor', style)}
                    style={{
                        transform: `translate3d(${this.state.x}px, ${this.state.y}px, 0) rotateZ(${rotation}deg)`
                    }}
                >
                    <svg width="82px" height="100px" viewBox="0 0 82 100" version="1.1">
                        <polygon fill-rule="evenodd" points="82 50 0 100 1.16529009e-14 0"/>
                    </svg>
                </div>
            )
        } else {
            return null
        }
    }
}