import { callApi } from './callApi.js';

export function fetchStreet(address) {
    return callApi(address).street;
}

export function fetchCity(address) {
    return callApi(address).city;
}

export function fetchState(address) {
    return callApi(address).state;
}

export function fetchCountry(address) {
    return callApi(address).country;
}

export function fetchCode(address) {
    return callApi(address).code;
}

export function fetchLat(address) {
    return callApi(address).lat;
}

export function fetchLong(address) {
    return callApi(address).long;
}

