# Google Apps Script Parse Address Formula

This is a Google Apps Script project that utilizes Google Maps and Places API to parse an address in a Google sheet and return individual address components in the appropriate columns.

## Installation & Setup
In order to run this script, you will need to [acquire a Google Cloud API key](https://developers.google.com/maps/documentation/javascript/get-api-key). Make sure to [enable the Places Search and Geocoding APIs on your key](https://support.google.com/googleapi/answer/6158841?hl=en).

Clone this repo into your local machine and run `npm install`. Then create a `secrets.js` file in the /src folder, and add your API key:
```
// src/secrets.js
export const secrets = {
  apiKey: "YOUR_API_KEY"
}
```
Run `npm run build`. Webpack will compile the modules into /dist/bundle.js. If you're [using clasp (highly recommended)](https://developers.google.com/apps-script/guides/clasp), run `clasp push` to push script to Google Apps Script. Otherwise, copy the code in /dist/bundle.js into the Google Apps Script Cloud Editor.

## Usage
This script extends Google Sheets with several custom functions:
- `FETCHSTREET()` Returns the street address
- `FETCHCITY()` Returns the city, or data labeled as "locality" in the Google Geocode API address_components types field
- `FETCHSTATE()` Returns the highest civil organizational sublevel underneath country, or data labeled as "administrative_area_level_\[1-5\]" (in the United States, this corresponds to state)
- `FETCHCOUNTRY()` Returns the country
- `FETCHCODE()` Returns the postal code
- `FETCHLAT()` Returns the latitude
- `FETCHLONG()` Returns the longitude 

To use, just input the function into a Google Sheets cell like a normal function, with the address you want to parse (or a reference to the cell containing the address) inside the parentheses. For example, if the address "701 E Joppa Rd Maryland" is in cell B2 and you want to return the latitude in cell B5, type the following into B5:

`=FETCHLAT(B2)`

This will return 39.3991112 in cell B5.

## Acknowledgements
The Webpack configuration and clasp setup used here is heavily based on David Barreto's excellent and extremely helpful article, "Google Apps Script (GAS) Local Development Tutorial" - you should go check it out at [https://david-barreto.com/google-app-script-local-development-tutorial/](https://david-barreto.com/google-app-script-local-development-tutorial/).
