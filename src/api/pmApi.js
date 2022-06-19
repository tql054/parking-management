import axiosClient from "./axiosClient";

const pmApi = {
    //lay tat ca o do
    getAllOdo: (id, params) => { 
        const url = `all-odo/${id}`
        return axiosClient.get(url, params)
    },

    getRegistedOdo: (makhudo, params) => {
        const url = `all-odo-bydate/${makhudo}`
        return axiosClient.get(url, {
            params: {...params}
        })
    },

    getUnRegistedOdo: (makhudo, params) => {
        const url = `all-odo-vanglai/${makhudo}`
        return axiosClient.get(url, {
            params: {...params}
        })
    },

    getSearchResults: (dangky, searchType, params) => {
        const url = `${dangky}/${searchType}`
        return axiosClient.get(url, {
            params: {...params}
        })
    },

    //Khudo
    getKhudo: (loaiKhudo) => {
        const url = `all-khudo/${loaiKhudo}`
        return axiosClient.get(url, {})
    }

}

const notificationApi = {
    
}

export default pmApi