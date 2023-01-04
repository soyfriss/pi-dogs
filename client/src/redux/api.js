import axios from 'axios';

axios.defaults.baseURL = "http://localhost:3001";

export async function getBreeds(searchText) {
    const endpoint = searchText ? `/dogs?name=${searchText}` : '/dogs';
    const response = await axios.get(endpoint);

    return response;
}

export async function getBreed(id, source) {
    const endPoint = `/dogs/${id}${source}`;
    const response = await axios.get(endPoint);

    return response;
}

export async function getTemperaments() {
    const endpoint = '/temperaments';
    const response = await axios.get(endpoint);

    return response;
}

export async function postBreed(breed) {
    const endpoint = '/dogs';
    const response = await axios.post(endpoint, breed);

    return response;
}