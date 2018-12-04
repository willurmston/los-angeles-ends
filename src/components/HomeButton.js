export default ({...props}) => {
    return (
        <button
            class="HomeButton"
            onclick={props.onclick}
        >
            <svg width="75" height="65" xmlns="http://www.w3.org/2000/svg">
                <path d="M62.13 25.1v37.5a.5.5 0 0 1-.5.5H48.87V31.4a.5.5 0 0 0-.5-.5h-14a.5.5 0 0 0-.5.5v31.7H11.63a.5.5 0 0 1-.5-.5V25.1H1.77a.5.5 0 0 1-.28-.91L36.85.29a.5.5 0 0 1 .56 0l35.37 23.9a.5.5 0 0 1-.28.91H62.13z" fill-rule="nonzero"/>
            </svg>
        </button>
    )
}
