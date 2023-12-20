import axios from "axios";
import queryString from "query-string";


/**
 * Represents the default header configuration.
 *
 * @type {Object}
 * @property {string} 'Content-Type' - The value for the 'Content-Type' header field.
 */
const header_default = {
    'Content-Type': 'application/json'
}
/**
 * AxiosClient is an instance of Axios used to make HTTP requests.
 *
 * @type {import('axios').AxiosInstance}
 * @example
 * AxiosClient.get('/users')
 *   .then(response => {
 *     console.log(response.data);
 *   })
 *   .catch(error => {
 *     console.error(error);
 *   });
 */
export const AxiosClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL_SERVER || "http://localhost:5000/api/v1", headers: {
        'Content-Type': 'application/json'
    }, paramsSerializer: params => queryString.stringify(params)
})
AxiosClient.interceptors.request.use(async (config) => {
    return config
})
AxiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data
    }
    return response
}, (error) => {
    throw error
})
/**
 * Retrieves a single item from the specified API endpoint by its ID.
 *
 * @async
 * @param {string} endpoint - The API endpoint to retrieve the item from.
 * @param {string} id - The ID of the item to retrieve.
 * @param {object} headers - The headers to be included in the request (optional).
 * @returns {Promise} A promise that resolves to the retrieved item.
 * @throws {Error} If an error occurs during the retrieval process.
 */
const getOne = async (endpoint: string, id: string, headers: object = header_default) => {
    return await AxiosClient.get(`${endpoint}/${id}`, {
        headers: headers
    })

}
/**
 * Retrieves data from the specified endpoint using GET method.
 *
 * @param {string} endpoint - The URL of the endpoint to retrieve data from.
 * @param {object} params - The optional parameters to include in the request.
 * @param {object} headers - The optional headers to include in the request.
 * @returns {Promise} A Promise that resolves to the response data.
 */
const getAll = async (endpoint: string, params: object = {}, headers: object = header_default) => {

    return await AxiosClient.get(endpoint, {
        params, headers: headers
    },)
}

/**
 * Update a resource by making a PATCH request to the provided endpoint with the specified ID and data.
 *
 * @param {string} endpoint - The endpoint URL to send the PATCH request to.
 * @param {string} id - The ID of the resource to update.
 * @param {object} data - The data object containing the updated values for the resource.
 * @param {object} [headers={}] - The headers object containing any additional headers to include in the request.
 * @returns {Promise<Object>} - A promise that resolves with the response data from the server.
 *
 * @throws {Error} - If the request fails or returns an error.
 */
const updateOne = async (endpoint: string, id: string, data: object, headers: object = header_default) => {
    return await AxiosClient.patch(`${endpoint}/${id}`, data, {
        headers: headers
    })

}
/**
 * Function to send a POST request to the specified endpoint with data and headers.
 *
 * @param {string} endpoint - The endpoint to send the request to.
 * @param {object} data - The data to be sent in the request body.
 * @param {object} header - The headers to be included in the request. Default value is `header_default`.
 * @returns {Promise} - A promise that resolves to the response of the request.
 */
const createOne = async (endpoint: string, data: object, header: object = header_default) => {
    return await AxiosClient.post(endpoint, data, {
        headers: header
    })
}
/**
 * Delete a resource from a specified endpoint by its ID using Axios DELETE request.
 *
 * @param {string} endpoint - The URL endpoint for the resource.
 * @param {string} id - The ID of the resource to delete.
 * @param {object} [header=header_default] - Additional headers for the request (optional, defaults to header_default).
 * @returns {Promise} - A Promise that resolves to the Axios response object.
 * @throws {Error} - If the request fails or an error occurs.
 */

const deleteOne = async (endpoint: string, id: string, header: object = header_default) => {
    return await AxiosClient.delete(`${endpoint}/${id}`, {
        headers: header
    })
}

/**
 * @typedef {Object} ApiGenerator
 * @property {Function} getAll - Retrieves all data from the API for the specified endpoint.
 * @property {Function} getOne - Retrieves a single data entry from the API for the specified endpoint.
 * @property {Function} createOne - Creates a new data entry in the API for the specified endpoint.
 * @property {Function} updateOne - Updates an existing data entry in the API for the specified endpoint.
 * @property {Function} deleteOne - Deletes a data entry from the API for the specified endpoint.
 *
 * @param {string} apiEndpoint - The endpoint URL for the API.
 *
 * @returns {ApiGenerator} - An object with methods for interacting with the API.
 */


const updateMe=async()=>{
    return await AxiosClient.patch("users/update")
}

const getMe=async ()=>{
    return await AxiosClient.get("users/me")
}

const ApiGenerator = (apiEndpoint: string) => ({
        getAll: (params: object) => apiService.getAll(apiEndpoint, params),
        getOne: (id: string) => apiService.getOne(apiEndpoint, id),
        createOne: (data: object) => apiService.createOne(apiEndpoint, data),
        updateOne: (id: string, data: object) => apiService.updateOne(apiEndpoint, id, data),
        deleteOne: (id: string) => apiService.deleteOne(apiEndpoint, id),
    });
/**
 * @description Provides API service for CRUD operations
 * @name apiService
 * @typedef {Object} apiService
 * @property {function(id: number): Promise} getOne - Retrieves a single entity by ID.
 * @property {function(): Promise<Array>} getAll - Retrieves all entities.
 * @property {function(id: number, newData: Object): Promise} updateOne - Updates an entity with new data.
 * @property {function(data: Object): Promise} createOne - Creates a new entity with provided data.
 * @property {function(id: number): Promise} deleteOne - Deletes an entity by ID.
 */
export const apiService = {
    getOne, getAll, updateOne, createOne, deleteOne,updateMe,getMe
}

export default ApiGenerator;