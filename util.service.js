export function makeId(length = 5) {
	var id = ''
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

	for (var i = 0; i < length; i++) {
		id += possible.charAt(getRandomInt(0, possible.length))
	}
	return id
}

export function getRandomInt(num1, num2) {
	var max = num1 >= num2 ? num1 + 1 : num2 + 1
	var min = num1 <= num2 ? num1 : num2
	return Math.floor(Math.random() * (max - min)) + min
}

export function getRandomIntInclusive(min, max) {
	const minCeiled = Math.ceil(min)
	const maxFloored = Math.floor(max)
	return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled) // The maximum is inclusive and the minimum is inclusive
}

export function saveToStorage(key, value) {
	localStorage.setItem(key, JSON.stringify(value))
}

export function loadFromStorage(key) {
	const data = localStorage.getItem(key)
	return data ? JSON.parse(data) : undefined
}

export function deepCopy(data) {
    return JSON.parse(JSON.stringify(data))
}

export function debounce(func, delay) {
	var timeoutId

	return (...args) => {
		clearTimeout(timeoutId)
		timeoutId = setTimeout(() => func(...args), delay)
	}
}

export function throttle(func, delay) {
	var isSuspended = false

	return (...args) => {
        if (isSuspended) return

        isSuspended = true
        setTimeout(() => isSuspended = false, delay)

        func(...args)
	}
}