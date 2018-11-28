import {h, Component} from 'preact'
import {css, keyframes, cx} from 'emotion'

const blink = keyframes`
    0% {
        opacity: 0;
    }
    40% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
`

const style = css`
    position: relative;
    transform: translate3d(0,0,0);
    & svg {
        width: 100%;
        height: 100%;
        display: block;
        & circle {
            transform: translate3d(0,0,0);
        }
        & #loading {
            & circle:nth-child(1) {
                animation: ${blink} 1.2s infinite steps(1) 0.15s;
            }
            & circle:nth-child(2) {
                animation: ${blink} 1.2s infinite steps(1) 0.3s ;
            }
            & circle:nth-child(3) {
                animation: ${blink} 1.2s infinite steps(1) 0.45s;
            }
        }
    }
`

export default ({...props}) => {
    return (
        <button class={cx('PlayButton', style)} onclick={props.onclick}>
            <svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <mask id="play" fill-rule="evenodd">
                        <rect x="0" y="0" width="36" height="36" fill="#fff" />
                        <path fill="#000" d="M13 10l13.3 8L13 26z"/>
                    </mask>
                    <mask id="loading" fill-rule="evenodd">
                        <rect x="0" y="0" width="36" height="36" fill="#fff" />
                        <g transform="translate(6 15)" fill="#000">
                            <circle cx="3" cy="3" r="3" />
                            <circle cx="12" cy="3" r="3" />
                            <circle cx="21" cy="3" r="3" />
                        </g>
                    </mask>
                    <mask id="pause" fill-rule="evenodd">
                        <rect x="0" y="0" width="36" height="36" fill="#fff" />
                        <path d="M10 10h5v16h-5V10zm11 0h5v16h-5V10z" fill="#000" />
                    </mask>
                    <mask id="next">
                        <rect x="0" y="0" width="36" height="36" fill="#fff" />
                        <path d="M22,17.2 L22,10 L26,10 L26,26 L22,26 L22,18.8 L10,26 L10,10 L22,17.2 Z"fill="#000" />
                    </mask>
                </defs>
                <g fill-rule="evenodd">
                    <circle
                        class="background"
                        mask={`url(#${props.icon})`}
                        cx="18"
                        cy="18"
                        r="18"
                    />
                </g>
            </svg>
        </button>
    )
}
