import axiosClient from "./axiosClient";

const pmApi = {
    getAllOdo: (id, params) => { 
        const url = `all-odo/${id}`
        return axiosClient.get(url, params)
    }
}

export default pmApi