import { secrets } from '../src/secrets.js';

const apiKey = secrets.apiKey;

export function callApi(address) {
    // check input
    if (typeof address !== "string" || !address) {
        throw new Error('Invalid address')
    }

    function fetchInfo() {
        const searchResponse = UrlFetchApp.fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${apiKey}&input=${address}&inputtype=textquery&fields=place_id`, {contentType: "application/json"});
        console.log(searchResponse.getResponseCode());
        const searchData = JSON.parse(searchResponse.getContentText());
        console.log(searchData);

        if (searchData.candidates.length > 1) {
            throw new Error('Multiple hits');
        } 

        if (searchData.candidates.length === 0) {
            throw new Error('No address found');
        }

        const id = searchData.candidates[0].place_id;
        console.log(id);
        /* const detailsResponse = UrlFetchApp.fetch(`https://maps.googleapis.com/maps/api/place/details/json?key=${apiKey}&place_id=${id}&fields=address_component`, {contentType: "application/json"});
        const detailsData = JSON.parse(detailsResponse.getContentText()).result.address_components;
        console.log(detailsData); */
        const geoResponse = UrlFetchApp.fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=${apiKey}&place_id=${id}`, {contentType: "application/json"});
        console.log(geoResponse.getResponseCode());

        const geoData = JSON.parse(geoResponse.getContentText()).results[0];
        console.log(geoData);
        const geoFormatted = geoData.formatted_address;
        const geoComponents = geoData.address_components;
        const geoCoordinates = geoData.geometry.location;

        console.log(geoData);
        console.log(geoFormatted);
        console.log(geoComponents);
        console.log(geoCoordinates);
    }

    fetchInfo();
}
