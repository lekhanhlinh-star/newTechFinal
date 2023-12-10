import {AxiosClient,apiService} from "./AxiosClient";



const UserAPI={

    getAllStudent:(params:any)=>{
        const url="user/students"

        return  apiService.getAll(url,params)

    },
    getStudent:(id:string)=>{
        const url=`user/students/${id}`
        return AxiosClient.get(url)


    },
    createStudent:(data:object)=>{
      const url=`user/students`
         return AxiosClient.post(url,data)
    },
    updateStudent:(id:string,data:object)=>{
        const url=`user/students/${id}`

        return AxiosClient.patch(url,data)

    }



}

export  default  UserAPI


