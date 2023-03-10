import axios from 'axios';
import * as errors from '../../common/constants/errors.js';
import * as httpStatusCodes from '../../common/constants/httpStatusCodes.js';

axios.defaults.baseURL = "https://pi-dogs-backend-1ijz.onrender.com";
axios.defaults.timeout = 45000;

export async function getBreeds(searchText, exactSearch = false) {
    try {
        const endpoint = searchText ? `/dogs?name=${searchText}&exactSearch=${exactSearch}` : '/dogs';
        const response = await axios.get(endpoint);
        response.ok = true;

        return response;
    } catch (error) {
        return handleError(error);
    }
}

export async function getBreed(id, source) {
    try {
        const endPoint = `/dogs/${id}${source}`;
        const response = await axios.get(endPoint);
        response.ok = true;

        return response;
    } catch (error) {
        return handleError(error);
    }
}

export async function getTemperaments() {
    try {
        const endpoint = '/temperaments';
        const response = await axios.get(endpoint);
        response.ok = true;

        return response;
    } catch (error) {
        return handleError(error);
    }
}

export async function postBreed(breed) {
    try {
        const endpoint = '/dogs';
        const response = await axios.post(endpoint, breed);
        response.ok = true;
    
        return response;
    } catch (error) {
        return handleError(error);
    }
}

function handleError(error) {
    // console.log('api error: ', error);
    const response = {
        ok: false,
        error: {
            message: errors.DEFAULT_ERROR_MESSAGE,
            status: errors.DEFAULT_ERROR_STATUS
        }
    };

    if (error.response && error.response.status === httpStatusCodes.BAD_REQUEST) {
        response.error.message = errors.BAD_REQUEST_MESSAGE;
        response.error.status = error.response.status;
        return response;
    }

    if (error.response && error.response.status === httpStatusCodes.NOT_FOUND) {
        response.error.message = error.response.data;
        response.error.status = error.response.status;
    }

    return response;
}
