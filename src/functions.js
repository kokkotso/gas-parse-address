import { fetchInfo } from './fetchInfo.js';

export function fetchStreet(address) {
    return fetchInfo(address).street;
}

export function fetchCity(address) {
    return fetchInfo(address).city;
}

export function fetchState(address) {
    return fetchInfo(address).state;
}

export function fetchCountry(address) {
    return fetchInfo(address).country;
}

export function fetchCode(address) {
    return fetchInfo(address).code;
}

export function fetchLat(address) {
    return fetchInfo(address).lat;
}

export function fetchLong(address) {
    return fetchInfo(address).long;
}

