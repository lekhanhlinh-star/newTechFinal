import axios from "axios";
import queryString from "query-string";

export  const AxiosClient=axios.create({
    baseURL:process.env.REACT_APP_BASE_URL_SERVER,
    headers:{
        'Content-Type':'application/json'
    },
    paramsSerializer: params=>queryString.stringify(params)
}
)
AxiosClient.interceptors.request.use(async(config)=>{
    return config
})
AxiosClient.interceptors.response.use((response)=>{
    if(response&&response.data){
        response.data
    }
    return response
},(error)=>{
    throw error
}
)
export default AxiosClient

