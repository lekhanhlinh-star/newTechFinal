import {apiService, AxiosClient} from "./AxiosClient";


const StudentAPI = {


    getAll: (params: any) => {
        const url = "user/students"

        return apiService.getAll(url, params)

    }, getOne: (id: string) => {
        const url = `user/students/${id}`
        return AxiosClient.get(url)


    }, createOne: (data: object) => {
        const url = `user/students`
        return AxiosClient.post(url, data)
    }, updateOne: (id: string, data: object) => {
        const url = `user/students/${id}`

        return AxiosClient.patch(url, data)

    }


}

export default StudentAPI


