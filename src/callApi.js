import secrets from '../src/secrets.js';

// const axios = require('axios');

const apiKey = secrets.apiKey;

export default function callApi(address) {
    const response = UrlFetchApp.fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${apiKey}&input=${address}&inputtype=textquery`, {contentType: "application/json"});
    const data = JSON.parse(response.getContentText());
    console.log(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${apiKey}&input=${address}&inputtype=textquery`);
    console.log(response.getResponseCode());
    console.log(data);
}