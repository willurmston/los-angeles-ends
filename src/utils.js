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
    },
    // https://codereview.stackexchange.com/a/168754
    nearestNumber: (nums, target) => {
    	let closest = Number.MAX_SAFE_INTEGER
        let index = 0
    	nums.forEach((num, i) => {
    		let dist = Math.abs(target - num)
    		if (dist < closest) {
    			closest = dist
                index = i
    		}
    	})
    	return index
    }
}
