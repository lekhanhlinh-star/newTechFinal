import {apiService} from "./AxiosClient";

/**
 * The base URL for accessing the majors API.
 *
 * @type {string}
 */
const urlBase = "majors"
/**
 * The MajorAPI object provides methods for interacting with major-related data.
 * @namespace
 */
const MajorAPI = {
    /**
     * Retrieve all major items from the API based on the specified parameters.
     *
     * @param {object} params - The parameters for the API request.
     *
     * @returns {Promise} - A Promise that resolves with the response from the API.
     */
    getAllMajor: (params: object={}) => {

        return apiService.getAll(urlBase, params)

    }, /**
     * Retrieves a single major using its ID.
     *
     * @param {string} id - The ID of the major to retrieve.
     * @return {Promise}  - A promise that resolves to the retrieved major.
     */
    getOneMajor: (id: string) => {
        return apiService.getOne(urlBase, id)
    }, /**
     * Updates the major version of a specific entity.
     *
     * @param {string} id - The ID of the entity to be updated.
     * @param {object} data - The updated data for the entity.
     * @returns {Promise} - A promise that resolves to the updated entity.
     */
    updateMajor: (id: string, data: object) => {
        return apiService.updateOne(urlBase, id, data)

    }, /**
     * Creates a major using the given ID and data.
     *
     * @param {string} id - The ID of the major to be created.
     * @param {object} data - The data to be used for creating the major.
     * @returns {Promise} - A Promise that resolves to the result of the createOne() API call.
     */
    createMajor: (id: string, data: object) => {
        return apiService.createOne(urlBase, data)
    }, /**
     * Deletes one major from the API.
     * @param {string} id - The ID of the major to be deleted.
     * @returns {Promise<void>} - A promise that resolves when the major is successfully deleted.
     */
    deleteOneMajor: (id: string) => {
        return apiService.deleteOne(urlBase, id)
    }


}

export default MajorAPI