import axiosClient from "./axiosClient";

const pmApi = {
    //login
    checkLogin: (params) => {
        const url = `login`
        return axiosClient.post(url, {
                 ...params 
            }   
        )
    },

    checkHasUser: (phone) => {
        const url = `check-user/${phone}`
        return axiosClient.post(url, {})
    }, 

    //taikhoan
    getInfoUser: (right, phone) => {
        const url = `getinfo/${right}/${phone}`
        return axiosClient.get(url, {})
    },


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
            ...params
        }))
    },

    //xe

    getXeByPhone: (phone, carType, searchCar, params) => {
        if(phone) {
            console.log({phone, carType, searchCar})
            const url = `list-xe/${phone}/${carType}/${searchCar}`
            return axiosClient.get(url, params)
        } return []
    }, 
    //Dang ky
    postDangkyTV: (params) => {
        const url = `create-dangkythanvien/`
        return axiosClient.post(url, {
            params: { ...params }
        }   )
    },

    postDangkyVL: (params) => {
        const url = `create-khachvanglai/`
        return axiosClient.post(url, {
            params: { ...params }
        }   )
    }

    

}

const notificationApi = {

}

export default pmApi