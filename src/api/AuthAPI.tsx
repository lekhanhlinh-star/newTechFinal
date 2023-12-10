import {AxiosClient} from "./AxiosClient";

const header_default = {
    'Content-Type': 'application/json'
}
const authenticateAPI = {
    login: async ( data:object, header: object = header_default) => {

        return await AxiosClient.post("users/login", data, {
            headers: header
        })
    }, logout: async (url: string) => {
        await AxiosClient.get("uers/logout")
    }


}
export default authenticateAPI
