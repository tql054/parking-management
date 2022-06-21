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
            params: { ...params }
        })
    },

    getUnRegistedOdo: (makhudo, params) => {
        const url = `all-odo-vanglai/${makhudo}`
        return axiosClient.get(url, {
            params: { ...params }
        })
    },

    getSearchResults: (dangky, searchType, params) => {
        const url = `${dangky}/${searchType}`
        return axiosClient.get(url, {
            params: { ...params }
        })
    },

    getInfoOdo: (loaiDk, params) => {
        const url = `${loaiDk}`
        return axiosClient.get(url, {
            params: { ...params }
        })
    },

    //dangky
    checkoutDangky: (id, loaiDk) => {
        const url = `checkoutDangky${loaiDk}/${id}`
        return axiosClient.post(url, {})
    },

    //Khudo
    getKhudo: (loaiKhudo, params) => {
        const url = `all-khudo/${loaiKhudo}`
        return axiosClient.get(url, params)
    },

    postThongbao: (params) => {
        const url = `create-thongbao/`
        return axiosClient.post((url, {
            params: { ...params }
        }))
    }



}

const notificationApi = {

}

export default pmApi