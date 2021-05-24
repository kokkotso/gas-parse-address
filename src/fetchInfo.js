import { secrets } from './secrets.js';
import { callApis } from './callApis';

const apiKey = secrets.apiKey;

export function fetchInfo(address) {
    // validate input
    if (typeof address !== "string" || !address) {
        throw new Error('Invalid address')
    }

    // encode address
    const encodedAddress = encodeURIComponent(address.toLowerCase());
    console.log(encodedAddress);

    // check cache
    const cache = CacheService.getDocumentCache();
    const cachedValue = cache.get(encodedAddress);

    if (cachedValue === null) {
        const locationDetails = callApis(encodedAddress);

        // save result to cache
        cache.put(encodedAddress, JSON.stringify(locationDetails));
        console.log(cache.get(encodedAddress));
        return locationDetails;
    } else {
        console.log("accessing cache");
        const locationDetails = JSON.parse(cachedValue);
        return locationDetails;
    }
}
