import { httpService } from '../http.service'

export const toyService = {
    query,
    getById,
    save,
    remove,
    addToyMsg
}

async function query(filterBy = { txt: '', minSpeed: 0 }) {
    return httpService.get(`toy`, filterBy)
}

function getById(toyId) {
    return httpService.get(`toy/${toyId}`)
}

async function remove(toyId) {
    return httpService.delete(`toy/${toyId}`)
}
async function save(toy) {
    var savedToy
    if (toy._id) {
        savedToy = await httpService.put(`toy/${toy._id}`, toy)
    } else {
        savedToy = await httpService.post('toy', toy)
    }
    return savedToy
}

async function addToyMsg(toyId, txt) {
    const savedMsg = await httpService.post(`toy/${toyId}/msg`, {txt})
    return savedMsg
}