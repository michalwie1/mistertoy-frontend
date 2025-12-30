
import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'toy'

export const toyService = {
    query,
    getById,
    save,
    remove,
    addToyMsg
}
window.cs = toyService


async function query(filterBy = { txt: '', minSpeed: 0 }) {
    var toys = await storageService.query(STORAGE_KEY)
    const { txt, minSpeed, sortField, sortDir } = filterBy

    if (txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        toys = toys.filter(toy => regex.test(toy.vendor) || regex.test(toy.description))
    }
    if (minSpeed) {
        toys = toys.filter(toy => toy.speed >= minSpeed)
    }
    if(sortField === 'vendor'){
        toys.sort((toy1, toy2) => 
            toy1[sortField].localeCompare(toy2[sortField]) * +sortDir)
    }
    if(sortField === 'speed'){
        toys.sort((toy1, toy2) => 
            (toy1[sortField] - toy2[sortField]) * +sortDir)
    }
    
    toys = toys.map(({ _id, vendor, speed, owner }) => ({ _id, vendor, speed, owner }))
    return toys
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

async function remove(toyId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, toyId)
}

async function save(toy) {
    var savedToy
    if (toy._id) {
        const toyToSave = {
            _id: toy._id,
            speed: toy.speed
        }
        savedToy = await storageService.put(STORAGE_KEY, toyToSave)
    } else {
        const toyToSave = {
            vendor: toy.vendor,
            speed: toy.speed,
            // Later, owner is set by the backend
            owner: userService.getLoggedinUser(),
            msgs: []
        }
        savedToy = await storageService.post(STORAGE_KEY, toyToSave)
    }
    return savedToy
}

async function addToyMsg(toyId, txt) {
    // Later, this is all done by the backend
    const toy = await getById(toyId)

    const msg = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    toy.msgs.push(msg)
    await storageService.put(STORAGE_KEY, toy)

    return msg
}