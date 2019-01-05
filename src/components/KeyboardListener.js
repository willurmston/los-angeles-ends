import {h, Component} from 'preact'
import {css} from 'emotion'

export default class  extends Component {
    componentDidMount() {
        document.addEventListener('keydown', this.handler)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handler)
    }

    handler = e => {
        switch (e.key) {
            case 'ArrowUp':
                if (this.props.onUp) this.props.onUp(e)
                break

            case 'ArrowRight':
                if (this.props.onRight) this.props.onRight(e)
                break

            case 'ArrowDown':
                if (this.props.onDown) this.props.onDown(e)
                break

            case 'ArrowLeft':
                if (this.props.onLeft) this.props.onLeft(e)
                break

            case 'Escape':
                if (this.props.onEsc) this.props.onEsc(e)
                break

        }
    }

    render() {
        return null
    }
}
