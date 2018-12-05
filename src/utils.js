export default {
    cycleArray: (array, amount, l=array.length) => {
        const offset = (((amount % l) + l) %l)
        return array.slice(offset).concat(array.slice(0,offset))
    }
}
