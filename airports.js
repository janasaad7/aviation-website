import { navigationBar, search, populateAndSelectFilters } from './main.js'

document.addEventListener("DOMContentLoaded", () => {
    navigationBar()
    const accessKey = '67855f922d2032559af9fd6211988932'
    const url = `https://api.aviationstack.com/v1/airports?access_key=${accessKey}`

    const loading = document.querySelector(".loading");
    loading.style.display = "block"; 

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            loading.style.display = "none";
            const result = data.data
            const airportsList = document.querySelector(".airports__container__list")
            const template = document.querySelector("#airport-temp").content

            const countriesAfrica = new Set ()
            const countriesAsia = new Set ()
            const countriesEurope = new Set ()
            const countriesAustralia = new Set ()
            const countriesPacific = new Set ()
            const countriesAtlantic = new Set ()
            const countriesAmerica = new Set ()

            result.forEach((airport) => {
                const airportTemp = document.importNode(template, true);

                // airport iata
                airportTemp.querySelector(".airports__container__list__airport__header__iata").textContent = airport.iata_code
                
                // airport name
                airportTemp.querySelector(".airports__container__list__airport__body__name").textContent = airport.airport_name

                // airport country
                if(airport.country_name !== null){
                    airportTemp.querySelector(".airports__container__list__airport__body__country").innerHTML += airport.country_name
                }
                else{
                    airportTemp.querySelector(".airports__container__list__airport__body__country").innerHTML += "N/A"
                }

                // airport timezone
                airportTemp.querySelector(".airports__container__list__airport__body__timezone").innerHTML += airport.timezone
                const area = (airport.timezone).split('/')[0]
                switch(area){
                    case "Africa": if(airport.country_name !== null) countriesAfrica.add(airport.country_name); break;
                    case "Asia": if(airport.country_name !== null) countriesAsia.add(airport.country_name); break;
                    case "Europe": if(airport.country_name !== null) countriesEurope.add(airport.country_name); break;
                    case "Australia": if(airport.country_name !== null) countriesAustralia.add(airport.country_name); break;
                    case "Pacific": if(airport.country_name !== null) countriesPacific.add(airport.country_name); break;
                    case "Atlantic": if(airport.country_name !== null) countriesAtlantic.add(airport.country_name); break;
                    case "America": if(airport.country_name !== null) countriesAmerica.add(airport.country_name); break;
                }

                airportsList.appendChild(airportTemp)
            })
            const airports = document.querySelectorAll(".airports__container__list__airport")
            const searchInput = document.querySelector(".bar__search")
            searchInput.addEventListener("input", () => search(airports,searchInput.value))
            filterBy(airports, countriesAfrica, countriesAsia, countriesEurope, countriesAustralia, countriesPacific, countriesAtlantic, countriesAmerica)
        })
        .catch(error => {console.error('error fetching data:', error)});
})

const filterAfrica = document.querySelector("#airports__filter__africa")
const filterAsia = document.querySelector("#airports__filter__asia")
const filterEurope = document.querySelector("#airports__filter__europe")
const filterAustralia = document.querySelector("#airports__filter__australia")
const filterPacific = document.querySelector("#airports__filter__pacific")
const filterAtlantic = document.querySelector("#airports__filter__atlantic")
const filterAmerica = document.querySelector("#airports__filter__america")

const arrowAfrica = document.querySelector("#dropdown-arrow-africa")
const arrowAsia = document.querySelector("#dropdown-arrow-asia")
const arrowEurope = document.querySelector("#dropdown-arrow-europe")
const arrowAustralia = document.querySelector("#dropdown-arrow-australia")
const arrowPacific = document.querySelector("#dropdown-arrow-pacific")
const arrowAtlantic = document.querySelector("#dropdown-arrow-atlantic")
const arrowAmerica = document.querySelector("#dropdown-arrow-america")

const africaTitle = document.querySelector("#airports__filter__africa")
const asiaTitle = document.querySelector("#airports__filter__asia")
const europeTitle = document.querySelector("#airports__filter__europe")
const australiaTitle = document.querySelector("#airports__filter__australia")
const pacificTitle = document.querySelector("#airports__filter__pacific")
const atlanticTitle = document.querySelector("#airports__filter__atlantic")
const americaTitle = document.querySelector("#airports__filter__america")

const africaOptions = document.querySelector("#airports__container__filter__africa__options")
const asiaOptions = document.querySelector("#airports__container__filter__asia__options")
const europeOptions = document.querySelector("#airports__container__filter__europe__options")
const australiaOptions = document.querySelector("#airports__container__filter__australia__options")
const pacificOptions = document.querySelector("#airports__container__filter__pacific__options")
const atlanticOptions = document.querySelector("#airports__container__filter__atlantic__options")
const americaOptions = document.querySelector("#airports__container__filter__america__options")

let selectedFilters = {
    africa: new Set(),
    asia: new Set(),
    europe: new Set(),
    australia: new Set(),
    pacific: new Set(),
    atlantic: new Set(),
    america: new Set()
}

function filterBy(airports, countriesAfrica, countriesAsia, countriesEurope, countriesAustralia, countriesPacific, countriesAtlantic, countriesAmerica){
    filterAfrica.addEventListener("click", () => {
        populateAndSelectFilters("africa", countriesAfrica, africaOptions, africaTitle, arrowAfrica, selectedFilters, airports, "airports")
    })
    filterAsia.addEventListener("click", () => {
        populateAndSelectFilters("asia", countriesAsia, asiaOptions, asiaTitle, arrowAsia, selectedFilters, airports, "airports")
    })
    filterEurope.addEventListener("click", () => {
        populateAndSelectFilters("europe", countriesEurope, europeOptions, europeTitle, arrowEurope, selectedFilters, airports, "airports")
    })  
    filterAustralia.addEventListener("click", () => {
        populateAndSelectFilters("australia", countriesAustralia, australiaOptions, australiaTitle, arrowAustralia, selectedFilters, airports, "airports");
    })
    filterPacific.addEventListener("click", () => {
        populateAndSelectFilters("pacific", countriesPacific, pacificOptions, pacificTitle, arrowPacific, selectedFilters, airports, "airports");
    })
    filterAtlantic.addEventListener("click", () => {
        populateAndSelectFilters("atlantic", countriesAtlantic, atlanticOptions, atlanticTitle, arrowAtlantic, selectedFilters, airports, "airports");
    })
    filterAmerica.addEventListener("click", () => {
        populateAndSelectFilters("america", countriesAmerica, americaOptions, americaTitle, arrowAmerica, selectedFilters, airports, "airports");
    })
}
