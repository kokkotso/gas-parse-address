import { secrets } from './secrets.js';

const apiKey = secrets.apiKey;

export function callApis(encodedAddress) {
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

    const addressComponents = geoData.address_components;

    // helper function to search for term in types array in address_components returned from Geocoding API
    function searchComponents(term) {
        try {
            return addressComponents.find(component => component.types.includes(term)).long_name;
        } catch(er) {
            return "missing data"
        }
    }

    function multiSearchComponents(terms) {
        for (let i = 0; i < terms.length; i++) {
            const term = terms[i];
            const result = addressComponents.find(component => component.types.includes(term));

            if (result) {
                return result.long_name;
            }
        }

        return "missing data"
    }

    const locObj = {
        formattedAddress: geoData.formatted_address,
        lat: geoData.geometry.location.lat,
        long: geoData.geometry.location.lng,
        code: searchComponents("postal_code"),
        country: searchComponents("country"),
        state: multiSearchComponents(["administrative_area_level_1", "administrative_area_level_2", "administrative_area_level_3", "administrative_area_level_4", "administrative_area_level_5"]),
        city: searchComponents("locality"),
        street: geoData.formatted_address.slice(0, geoData.formatted_address.indexOf(","))
    };

    console.log(locObj);

    return locObj;
}