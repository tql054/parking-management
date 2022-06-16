import axiosClient from "./axiosClient";

const pmApi = {
    //lay tat ca o do
    getAllOdo: (id, params) => { 
        const url = `all-odo/${id}`
        return axiosClient.get(url, params)
    },

    getSearchResults: (dangky, searchType, params) => {
        const url = `${dangky}/${searchType}`
        return axiosClient.get(url, {
            params: {...params}
        })
    }
}

const notificationApi = {
    
}

export default pmApi