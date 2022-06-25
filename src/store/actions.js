import { SET_INFO_USER, UNSET_INFO_USER } from "./constant";

export const setInfoUser = (payload) => {
    return {
        type: SET_INFO_USER,
        payload
    }
}

export const unsetInfoUser = (payload) => {
    return {
        type: UNSET_INFO_USER,
        payload
    }
}