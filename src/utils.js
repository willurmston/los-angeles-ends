export default {
    cycleArray: (array, amount, l=array.length) => {
        const offset = (((amount % l) + l) %l)
        return array.slice(offset).concat(array.slice(0,offset))
    },
    offset: el => {
        const rect = el.getBoundingClientRect()
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
}
