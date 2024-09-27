import { navigationBar, search, populateAndSelectFilters } from './main.js'

document.addEventListener("DOMContentLoaded", () => {
    navigationBar()
    const accessKey = '87ef5415af8e022369d077622770089b'
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
        .catch(error => {console.error('error fetching data:', error)})
})

const filterTitles = ["#airports__filter__africa", "#airports__filter__asia", "#airports__filter__europe", "#airports__filter__australia", "#airports__filter__pacific", "#airports__filter__atlantic", "#airports__filter__america"]
const filterElements = filterTitles.map(selector => document.querySelector(selector))

const filterArrows = ["#dropdown-arrow-africa", "#dropdown-arrow-asia", "#dropdown-arrow-europe", "#dropdown-arrow-australia", "#dropdown-arrow-pacific", "#dropdown-arrow-atlantic", "#dropdown-arrow-america"]
const arrowElements = filterArrows.map(selector => document.querySelector(selector))

const optionsSelectors = ["#airports__container__filter__africa__options", "#airports__container__filter__asia__options", "#airports__container__filter__europe__options", "#airports__container__filter__australia__options", "#airports__container__filter__pacific__options", "#airports__container__filter__atlantic__options", "#airports__container__filter__america__options"]
const optionsElements = optionsSelectors.map(selector => document.querySelector(selector))

const [africaTitle, asiaTitle, europeTitle, australiaTitle, pacificTitle, atlanticTitle, americaTitle] = filterElements
const [arrowAfrica, arrowAsia, arrowEurope, arrowAustralia, arrowPacific, arrowAtlantic, arrowAmerica] = arrowElements
const [africaOptions, asiaOptions, europeOptions, australiaOptions, pacificOptions, atlanticOptions, americaOptions] = optionsElements

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
    africaTitle.addEventListener("click", () => {
        populateAndSelectFilters("africa", countriesAfrica, africaOptions, africaTitle, arrowAfrica, selectedFilters, airports, "airports")
    })
    asiaTitle.addEventListener("click", () => {
        populateAndSelectFilters("asia", countriesAsia, asiaOptions, asiaTitle, arrowAsia, selectedFilters, airports, "airports")
    })
    europeTitle.addEventListener("click", () => {
        populateAndSelectFilters("europe", countriesEurope, europeOptions, europeTitle, arrowEurope, selectedFilters, airports, "airports")
    })  
    australiaTitle.addEventListener("click", () => {
        populateAndSelectFilters("australia", countriesAustralia, australiaOptions, australiaTitle, arrowAustralia, selectedFilters, airports, "airports");
    })
    pacificTitle.addEventListener("click", () => {
        populateAndSelectFilters("pacific", countriesPacific, pacificOptions, pacificTitle, arrowPacific, selectedFilters, airports, "airports");
    })
    atlanticTitle.addEventListener("click", () => {
        populateAndSelectFilters("atlantic", countriesAtlantic, atlanticOptions, atlanticTitle, arrowAtlantic, selectedFilters, airports, "airports");
    })
    americaTitle.addEventListener("click", () => {
        populateAndSelectFilters("america", countriesAmerica, americaOptions, americaTitle, arrowAmerica, selectedFilters, airports, "airports");
    })
}
