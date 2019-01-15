import {h, Component} from 'preact'
import {css, cx} from 'emotion'

const style = css`
    width: auto;
    height: 100%;
    position: absolute;
    right: -20vh;
    overflow: visible;
    @media screen and (min-width: 1800px) {
        right: 0;
    }
    &.loaded {
        opacity: 1;
    }
    & img {
        height: 100%;
        position: relative;
        image-rendering: pixelated;
    }
    & a {
        display: block;
        position: absolute;
        text-decoration: none;
        & .label {
            color: var(--section-color);
            padding: 6px 14px;
            font-size: 20px;
            letter-spacing: 0.03em;
            text-decoration: none;
            cursor: pointer;
            top: 48px;
            position: relative;
            border-left: none;
        }
        & .dot {
            position: absolute;
            width: 4px;
            height: 4px;
            top: 62px;
            left: -3px;
            border-radius: 100% 100%;
            border: 2px solid var(--section-color);
        }
    }
    & a.through-the-windshield {
        transform: translateY(64px);
        & .label {
            position: relative;
            top: -20px;
            left: -100%;
            border-right: none;
        }
        & .dot {
            top: -6px;
        }
    }
    & a.horizon {
        & .label {
            top: 30px;
            left: -80px;
        }
    }
`

export default class Map extends Component {
    componentDidMount() {
        if (this.map.complete) this.props.onload()
    }

    onload = () => {
        this.setState({loaded: true})
        this.props.onload()
    }

    render() {
        return (
            <nav class={cx('Map', this.state.loaded && 'loaded', style)}>
                <img
                    src={'assets/map.png'}
                    alt="Hand-drawn map of Los Angeles with labeled pins"
                    onload={this.onload}
                    ref={map => this.map = map}
                />
                {this.props.pins.map(song =>
                    <a
                        class={song.slug}
                        style={{
                            left: `calc(${song.pinX})`,
                            top: `calc(${song.pinY} - 64px)`,
                        }}
                        href={`/${song.slug}`}
                    >
                        <div class="label">{song.title}</div>
                        <div class="dot"></div>
                    </a>
                )}
            </nav>
        )
    }
}
