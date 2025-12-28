import { toyService } from "../../services/toy.service.js";
import { showSuccessMsg } from "../../services/event-bus.service.js";
import { ADD_TOY, TOY_UNDO, REMOVE_TOY, SET_TOYS, SET_FILTER_BY, SET_IS_LOADING, UPDATE_TOY, SET_SORT_BY } from "../reducers/toy.reducer.js";
import { store } from "../store.js";

export async function loadToys() {
    const filterBy = store.getState().toyModule.filterBy
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    const toys = await toyService.query(filterBy)
    try {
        store.dispatch({ type: SET_TOYS, toys })
    } catch (err) {
        console.log('toy action -> Cannot load toys', err)
        throw err
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
    // return toyService.query(filterBy)
    //     .then(toys => {
    //         store.dispatch({ type: SET_TOYS, toys })
    //     })
    //     .catch(err => {
    //         console.log('toy action -> Cannot load toys', err)
    //         throw err
    //     })
    //     .finally(() => {
    //         store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    //     })
}

export async function removeToy(toyId) {
    await toyService.remove(toyId)
    try {
         store.dispatch({ type: REMOVE_TOY, toyId })
    } catch (err) {
        console.log('toy action -> Cannot remove toy', err)
            throw err
    }
    // return toyService.remove(toyId)
    //     .then(() => {
    //         store.dispatch({ type: REMOVE_TOY, toyId })
    //     })
    //     .catch(err => {
    //         console.log('toy action -> Cannot remove toy', err)
    //         throw err
    //     })
}

export async function removeToyOptimistic(toyId) {
    store.dispatch({ type: REMOVE_TOY, toyId })
    await toyService.remove(toyId)
    try {
      showSuccessMsg('Removed Toy!')  
    } catch (err) {
        store.dispatch({ type: TOY_UNDO })
            console.log('toy action -> Cannot remove toy', err)
            throw err
    }
    // return toyService.remove(toyId)
    //     .then(() => {
    //         showSuccessMsg('Removed Toy!')
    //     })
    //     .catch(err => {
    //         store.dispatch({ type: TOY_UNDO })
    //         console.log('toy action -> Cannot remove toy', err)
    //         throw err
    //     })
}

export async function saveToy(toy) {
    console.log(toy)
    try {
        const type = toy._id ? UPDATE_TOY : ADD_TOY
        const toyToSave = await toyService.save(toy)
        store.dispatch({ type, toy: toyToSave })
        return toyToSave
    } catch (error) {
        console.log('toy action -> Cannot save toy', error)
        throw error
    }
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}

export function setSort(sortBy = toyService.getDefaultSort()) {
    store.dispatch({ type: SET_SORT_BY, sortBy: sortBy })
}
