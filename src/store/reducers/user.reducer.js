import { userService } from "../../services/user.service.js"

//* Count
export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const CHANGE_BY = 'CHANGE_BY'


//* User
export const SET_USER = 'SET_USER'
export const SET_WATCHED_USER = 'SET_WATCHED_USER'


const initialState = {
    count: 105,
    loggedInUser: userService.getLoggedinUser()
}

export function userReducer(state = initialState, action = {}) {
    var newState = state
    switch (action.type) {
        //* User
        case SET_USER:
            return {
                ...state,
                loggedInUser: action.user
            }
        case SET_WATCHED_USER:
            newState = { ...state, watchedUser: action.user }
        default:
            return state;
    }
}