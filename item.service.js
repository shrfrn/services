import { storageService } from './async-storage.service.js'
import { makeId, loadFromStorage, saveToStorage, getRandomInt } from './util.service.js'

const _storageKey = 'item'
const _key = '_id'

_createItems()

export const itemService = {
	query,
	get,
	remove,
	save,
	getEmptyItem,
    getDefaultFilter,
}

async function query(filterBy = {}) {
	var items = await storageService.query(_storageKey)

	if (filterBy.txt) {
		const regex = new RegExp(filterBy.txt, 'i')
		items = items.filter(item => regex.test(item.txt))
	}
	return items
}

async function get(id) {
	return storageService.get(_storageKey, id)
}

async function remove(id) {
	return storageService.remove(_storageKey, id)
}

async function save(item) {
	if (item[_key]) return storageService.put(_storageKey, item)
	else return storageService.post(_storageKey, item)
}

function getEmptyItem() {
	return {
		value: '',
		num: 0,
	}
}

function getDefaultFilter() {
    return {
        txt: '',
        minValue: 0,
    }
}

function _createItems(count = 12) {
	var items = loadFromStorage(_storageKey)
	if (items && items.length) return

    const items = []
	const values = ['audi', 'fiat', 'honda', 'suzuki']

    for(var i = 0; i < count; i++){
        const idx = getRandomInt(0, values.length)
        items.push(_createItem(values[idx]))
    }

    saveToStorage(_storageKey, items)
}

function _createItem(value, num = getRandomInt(20, 130)) {
	return {
		[_key]: makeId(),
		value,
		num,
	}
}
