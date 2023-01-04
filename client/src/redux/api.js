import axios from 'axios';

axios.defaults.baseURL = "http://localhost:3001";

export async function getBreeds(searchText) {
    const endpoint = searchText ? `/dogs?name=${searchText}` : '/dogs';
    const response = await axios.get(endpoint);

    return response;
}

export async function getTemperaments() {
    const endpoint = 'http://localhost:3001/temperaments';
    const response = await axios.get(endpoint);

    return response;
}