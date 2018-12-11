import {h, Component} from 'preact'
import {css, cx} from 'emotion'

const style = css`
    position: absolute;
    background: var(--off-white);
    /* background: var(--song-color); */
    --width: 70px;
    transition: transform 0.4s cubic-bezier(.23,.23,.36,.95);
    &.open {
        transition: transform 0.7s cubic-bezier(.23,.23,.36,.95);
    }
    &.top {
        height: var(--width);
        width: 100%;
        left: 0;
        top: 0;
        &.open {
            transform: translateY(-100%);
        }
    }
    &.right {
        height: 100%;
        width: var(--width);
        right: 0;
        top: 0;
        &.open {
            transform: translateX(100%);
        }
    }
    &.bottom {
        height: var(--width);
        width: 100%;
        left: 0;
        bottom: 0;
        &.open {
            transform: translateY(100%);
        }
    }
    &.left {
        height: 100%;
        width: var(--width);
        left: 0;
        top: 0;
        &.open {
            transform: translateX(-100%);
        }
    }
`

export default ({...props}) => (
    <div
        class={cx(style, props.side, props.isOpen && 'open')}
    ></div>
)
