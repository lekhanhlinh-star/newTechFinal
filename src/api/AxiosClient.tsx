import axios from "axios";
import queryString from "query-string";


/**
 * Represents the default headers for an HTTP request.
 *
 * @constant
 * @type {Object}
 * @property {string} 'Content-Type' - The content type for the request body.
 *                                      Defaults to 'application/json'.
 */
const header_default = {
    'Content-Type': 'application/json'
}
/**
 * AxiosClient is a variable that represents an Axios instance with customized configuration.
 * It is used to make HTTP requests to a server.
 *
 * @type {Axios}
 * @name AxiosClient
 *
 * @property {string} baseURL - The base URL for all requests made by AxiosClient. Defaults to process.env.REACT_APP_BASE_URL_SERVER or "http://localhost:5000/api/v1".
 * @property {object} headers - The headers sent with each request made by AxiosClient. Defaults to {'Content-Type': 'application/json'}.
 * @property {function} paramsSerializer - A function used to serialize query parameters. Defaults to using query-string library to serialize parameters.
 *
 * @example
 * // Using AxiosClient to make a GET request
 * AxiosClient.get('/users')
 *   .then(response => {
 *     console.log(response.data);
 *   })
 *   .catch(error => {
 *     console.error(error);
 *   });
 *
 * @example
 * // Using AxiosClient to make a POST request
 * AxiosClient.post('/users', { name: 'John Doe', age: 25 })
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
 * @function getOne
 * @description Retrieves data from a specified endpoint with a given ID.
 * @param {string} endpoint - The endpoint to retrieve data from.
 * @param {string} id - The ID of the resource to retrieve.
 * @param {object} [headers=header_default] - Optional headers to include in the request.
 * @returns {Promise} - A promise that resolves with the retrieved data.
 */
const getOne = async (endpoint: string, id: string, headers: object = header_default) => {
    return await AxiosClient.get(`${endpoint}/${id}`, {
        headers: headers
    })

}
/**
 * Retrieves data from the specified endpoint using AxiosClient's GET method.
 *
 * @async
 * @param {string} endpoint - The endpoint URL to send the GET request to.
 * @param {Object} params - (optional) The parameters to be included in the request URL.
 * @param {Object} headers - (optional) The additional headers to be included in the request.
 * @returns {Promise} - A promise that resolves with the response data from the GET request.
 */
const getAll = async (endpoint: string, params: object = {}, headers: object = header_default) => {

    return await AxiosClient.get(endpoint, {
        params, headers: headers
    },)
}

/**
 * Update a resource with given data by making a PATCH request to the specified endpoint.
 *
 * @param {string} endpoint - The endpoint URL where the resource is located.
 * @param {string} id - The ID of the resource to be updated.
 * @param {object} data - The data object containing the updated values for the resource.
 * @param {object} [headers=header_default] - The optional headers to be included in the request.
 * @returns {Promise} - A Promise that resolves to the response from the server.
 */
const updateOne = async (endpoint: string, id: string, data: object, headers: object = header_default) => {
    return await AxiosClient.patch(`${endpoint}/${id}`, data, {
        headers: headers
    })

}
/**
 * Sends a POST request to the specified endpoint with the given data and headers.
 *
 * @param {string} endpoint - The URL of the endpoint to send the request to.
 * @param {object} data - The data to be sent with the request.
 * @param {object} [header=header_default] - The headers to be included with the request. Defaults to `header_default`.
 * @returns {Promise} A promise that resolves to the response received from the server.
 */
const createOne = async (endpoint: string, data: object, header: object = header_default) => {
    return await AxiosClient.post(endpoint, data, {
        headers: header
    })
}
/**
 * Deletes a resource from the given endpoint using provided id and header.
 *
 * @param {string} endpoint - The endpoint URL.
 * @param {string} id - The id of the resource to be deleted.
 * @param {object} header - The header object to be included in the request. (Default: header_default)
 *
 * @returns {Promise} - A promise that resolves when the resource is successfully deleted.
 */

const deleteOne = async (endpoint: string, id: string, header: object = header_default) => {
    return await AxiosClient.delete(`${endpoint}/${id}`, {
        headers: header
    })
}
/**
 * API service for interacting with a backend API.
 * @namespace
 */
export const apiService = {
    getOne, getAll, updateOne, createOne, deleteOne
}

