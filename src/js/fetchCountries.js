export default function getNameCountry(countryName) {
    return fetch(`https://restcountries.eu/rest/v2/name/${countryName}`
    ).then(response => {
        if (response.ok) { return response.json(); }
    });
}