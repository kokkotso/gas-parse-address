import { secrets } from '../src/secrets.js';

const apiKey = secrets.apiKey;

export function callApi(address) {
    // check input
    if (typeof address !== "string" || !address) {
        throw new Error('Invalid address')
    }

    function fetchInfo() {
        const encodedAddress = encodeURIComponent(address);
        console.log(encodedAddress);
        const searchResponse = UrlFetchApp.fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${apiKey}&input=${encodedAddress}&inputtype=textquery&fields=place_id`, {contentType: "application/json"});
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
        const geoResponse = UrlFetchApp.fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=${apiKey}&place_id=${id}`, {contentType: "application/json"});
        console.log(geoResponse.getResponseCode());

        const geoData = JSON.parse(geoResponse.getContentText()).results[0];
        console.log(geoData);

        const locObj = {
            formattedAddress: geoData.formatted_address || undefined,
            lat: geoData.geometry.location.lat || undefined,
            long: geoData.geometry.location.lng || undefined,
            code: geoData.address_components.find(component => component.types.includes("postal_code")).long_name || undefined,
            country: geoData.address_components.find(component => component.types.includes("country")).long_name || undefined,
            state: geoData.address_components.find(component => component.types.includes("administrative_area_level_1" || "administrative_area_level_2" || "administrative_area_level_3" || "administrative_area_level_4" || "administrative_area_level_5")).long_name || undefined,
            city: geoData.address_components.find(component => component.types.includes("locality")).long_name || undefined,
            street: geoData.formatted_address.slice(0, geoData.formatted_address.indexOf(","))
        }

        return locObj;
    }

    return fetchInfo();
}
