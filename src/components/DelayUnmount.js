import { h, Component } from 'preact'

export default class DelayUnmount extends Component {
   constructor(props) {
        super(props)
        this.state = {
            shouldRender: this.props.mount
        }
   }

   componentWillReceiveProps(nextProps) {
        if (this.props.mount && !nextProps.mount) {
            clearTimeout(this.timer)
            if (this.props.unmountDelay) {
                this.timer = setTimeout(() => {
                    this.setState({
                        shouldRender: false
                    })
                }, this.props.unmountDelay)
            } else {
                this.setState({ shouldRender: true })
            }
        } else if (!this.props.mount && nextProps.mount) {
            clearTimeout(this.timer)
            if (this.props.mountDelay) {
                this.timer = setTimeout(() => {
                    this.setState({
                        shouldRender: true
                    })
                }, this.props.mountDelay)
            } else {
                this.setState({ shouldRender: true })
            }
        }
   }

    render() {
        return this.state.shouldRender ? this.props.children[0] : null
    }
}
