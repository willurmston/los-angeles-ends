import {h, Component} from 'preact'
import {css, cx} from 'emotion'

const style = css`
    width: auto;
    height: 100%;
    position: absolute;
    right: -20%;
    overflow: visible;
    @media screen and (min-width: 1500px) {
        right: 0;
    }
    & img {
        height: 100%;
        position: relative;
        image-rendering: pixelated;
    }
    & a {
        display: block;
        position: absolute;
        & .label {
            background: var(--off-white);
            color: var(--song-color);
            padding: 6px 12px;
            font-size: 20px;
            letter-spacing: 0.03em;
            text-decoration: none;
            cursor: pointer;
            border: 2px solid var(--song-color);
            border-left: none;
            &:hover {
                background: var(--song-color);
                color: var(--off-white);
            }
        }
        & .line {
            position: absolute;
            width: 2px;
            height: 64px;
            left: 0;
            top: 0;
            background: var(--song-color);
        }
        & .dot {
            position: absolute;
            width: 4px;
            height: 4px;
            top: 62px;
            left: -3px;
            border-radius: 100% 100%;
            border: 2px solid var(--song-color);
        }
    }
    & a.through-the-windshield {
        transform: translateY(64px);
        & .label {
            position: relative;
            top: 23px;
            left: -100%;
            border-left: 2px solid var(--song-color);
            border-right: none;
        }
        & .dot {
            top: -6px;
        }
    }
`

export default class Map extends Component {

    render() {
        return (
            <nav class={cx('Map', style)}>
                <img src={'assets/map.png'} alt="Hand-drawn map of Los Angeles with labeled pins" />
                {this.props.pins.map(song =>
                    <a
                        class={song.slug}
                        style={{
                            left: `calc(${song.pinX})`,
                            top: `calc(${song.pinY} - 64px)`,
                        }}
                        onclick={() => this.props.onPinClick(song, 0.6 * this.props.pins.indexOf(song) )}
                    >
                        <div class="label">{song.title}</div>
                        <div class="line"></div>
                        <div class="dot"></div>
                    </a>
                )}
            </nav>
        )
    }
}
