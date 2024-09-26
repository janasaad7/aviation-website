import { navigationBar  , populateAndSelectFilters } from './main.js';

document.addEventListener("DOMContentLoaded", () => {
    navigationBar()
    const accessKey = '67855f922d2032559af9fd6211988932s'
    const url = `https://api.aviationstack.com/v1/flights?access_key=${accessKey}`

    const loading = document.querySelector(".loading");
    loading.style.display = "block"; 

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            loading.style.display = "none";
            const result = data.data
            const flightsList = document.querySelector(".flights__list")
            const template = document.querySelector("#flight-temp").content
            const airlines = []
            const dates = []
            const statuses = []
            const takeoffs = []
            const touchdowns = []

            result.forEach((flight) => {
                const flightTemp = document.importNode(template, true);

                // flight date
                const flightDate = flightTemp.querySelector(".flights__list__flight__date")
                if(flight.flight_date !== null){
                    if(!dates.includes(flight.flight_date)){
                        dates.push(flight.flight_date)
                    }
                    flightDate.textContent = flight.flight_date
                }
                else{
                    flightDate.textContent = "N/A"
                }

                // flight number
                if((flight.flight).iata !== null){
                    flightTemp.querySelector(".flights__list__flight__header__number").textContent = (flight.flight).iata
                }
                else{
                    flightTemp.querySelector(".flights__list__flight__header__number").textContent = "N/A"
                }

                // flight status
                const flightStatus = flightTemp.querySelector(".flights__list__flight__header__status")
                if(flight.flight_status !== "unknown" && flight.flight_status !== null){
                    if(!statuses.includes(flight.flight_status[0].toUpperCase() + flight.flight_status.substring(1))){
                        statuses.push(flight.flight_status[0].toUpperCase() + flight.flight_status.substring(1))
                    }
                    flightStatus.textContent = flight.flight_status
                    flightStatus.textContent = ((flightStatus.textContent)[0]).toUpperCase() + (flightStatus.textContent).substring(1)
                    switch(flight.flight_status){
                        case("scheduled"): flightStatus.classList.add("flights__list__flight__header__status--scheduled"); break;
                        case("active"): flightStatus.classList.add("flights__list__flight__header__status--active"); break;
                        case("landed"): flightStatus.classList.add("flights__list__flight__header__status--landed"); break;
                        case("cancelled"): flightStatus.classList.add("flights__list__flight__header__status--cancelled"); break;
                        case("diverted"): flightStatus.classList.add("flights__list__flight__header__status--diverted"); break;
                    }
                }
                else{
                    flightStatus.textContent = "N/A";
                    flightStatus.classList.add("flights__list__flight__header__status--unknown");
                }
                
                // airline
                const airlineLogo = flightTemp.querySelector(".flights__list__flight__body__airline-logo")
                if((flight.airline).name !== null && (flight.airline).name !== "empty"){
                    if(!airlines.includes((flight.airline).name)){
                        airlines.push((flight.airline).name)
                    }
                   airlineLogo.alt = (flight.airline).name
                    switch((flight.airline).name){
                        case("Malaysia Airlines"): airlineLogo.src = "images/malaysia.png"; break;
                        case("FlexFlight"): airlineLogo.src = "images/flexflight.png"; break;
                        case("Myanmar Airways International"): airlineLogo.src = "images/myanmar.png"; break;
                        case("Firefly"): airlineLogo.src = "images/firefly.png"; break;
                        case("KLM"): airlineLogo.src = "images/klm.png"; break;
                        case("LATAM Airlines"): airlineLogo.src = "images/latam.png"; break;
                        case("Qantas"): airlineLogo.src = "images/qantas.png"; break;
                        case("Qatar Airways"): airlineLogo.src = "images/qatar.png"; break;
                        case("Turkish Airlines"): airlineLogo.src = "images/turkish.png"; break;
                        case("SriLankan Airlines"): airlineLogo.src = "images/srilankan.jpg"; break;
                        case("Oman Air"): airlineLogo.src = "images/oman.png"; break;
                        case("China Eastern Airlines"): airlineLogo.src = "images/chinaeast.png"; break;
                        case("China Southern Airlines"): airlineLogo.src = "images/chinasouth.png"; break;
                        case("Xiamen Airlines"): airlineLogo.src = "images/xiamen.png"; break;
                        case("Jet Linx Aviation"): airlineLogo.src = "images/jetlinx.png"; break;
                        case("Air New Zealand"): airlineLogo.src = "images/newzealand.png"; break;
                        case("Aero K"): airlineLogo.src = "images/aerok.png"; break;
                        case("American Airlines"): airlineLogo.src = "images/american.png"; break;
                        case("Loong Air"): airlineLogo.src = "images/loong.png"; break;
                        case("Virgin Australia"): airlineLogo.src = "images/virginaust.png"; break;
                        case("United Airlines"): airlineLogo.src = "images/united.png"; break;
                        case("SAS"): airlineLogo.src = "images/sas.png"; break;
                        case("SWISS"): airlineLogo.src = "images/swiss.png"; break;
                        case("Air India"): airlineLogo.src = "images/india.png"; break;
                        case("Air Canada"): airlineLogo.src = "images/canada.png"; break;
                        case("Batik Air"): airlineLogo.src = "images/batik.png"; break;
                        case("Guangxi Beibu Gulf Airlines"): airlineLogo.src = "images/guangxi.png"; break;
                        case("Yeti Airlines"): airlineLogo.src = "images/yeti.png"; break;
                        case("China Express Air"): airlineLogo.src = "images/chinaexpress.png"; break;
                        case("Air China LTD"): airlineLogo.src = "images/chinaltd.png"; break;
                        case("IndiGo"): airlineLogo.src = "images/indigo.png"; break;
                        case("Sichuan Airlines"): airlineLogo.src = "images/sichuan.png"; break;
                        case("Freebird Airlines"): airlineLogo.src = "images/freebird.png"; break;
                        case("Aeroflot"): airlineLogo.src = "images/aeroflot.png"; break;
                        case("JAL"): airlineLogo.src = "images/jal.png"; break;
                        case("AJet"): airlineLogo.src = "images/ajet.png"; break;
                        case("Solaseed Air"): airlineLogo.src = "images/solaseed.png"; break;
                        case("Juneyao Airlines"): airlineLogo.src = "images/juneyao.png"; break;
                        case("Shenzhen Airlines"): airlineLogo.src = "images/shenzhen.png"; break;
                        case("Skymark Airlines"): airlineLogo.src = "images/skymark.png"; break;
                        case("Tibet Airlines"): airlineLogo.src = "images/tibet.png"; break;
                        case("Smartavia"): airlineLogo.src = "images/smartavia.png"; break;
                        case("Jazeera Airways"): airlineLogo.src = "images/jazeera.png"; break;

                        default: airlineLogo.src = "images/airplane.png"; break;
                    }
                }
                else{
                    airlineLogo.alt = "N/A"
                    airlineLogo.src = "images/airplane.png";
                }

                // departure time
                if((flight.departure).scheduled !== null){
                    const depISOdate = (flight.departure).scheduled 
                    const depDate = new Date(depISOdate)
                    const depHour = depDate.getUTCHours();  
                    const depMin = depDate.getUTCMinutes();  
                    const depTime = `${depHour.toString().padStart(2,'0')}:${depMin.toString().padStart(2,'0')}`;
                    flightTemp.querySelector(".flights__list__flight__body__departure__scheduled").textContent = depTime
                }
                else{
                    flightTemp.querySelector(".flights__list__flight__body__departure__schedule").textContent = "N/A"
                }
                
                // departure iata
                if((flight.departure).iata !== null){
                    flightTemp.querySelector(".flights__list__flight__body__departure__iata").textContent = (flight.departure).iata
                }
                else{
                    flightTemp.querySelector(".flights__list__flight__body__departure__iata").textContent = "N/A"
                }

                // departure timezone
                const departureTimezone = flightTemp.querySelector(".flights__list__flight__body__departure__timezone")                    
                if((flight.departure).timezone !== null && ((flight.departure).timezone).includes("/")){
                    if(!takeoffs.includes(((flight.departure).timezone).split('/')[1])){
                        takeoffs.push(((flight.departure).timezone).split('/')[1])
                    }
                    departureTimezone.textContent = ((flight.departure).timezone).split('/')[1]
                }
                else{
                    departureTimezone.textContent = "N/A"
                }
                
                // arrival time
                if((flight.arrival).scheduled !== null){
                    const arrISOdate = (flight.arrival).scheduled 
                    const arrDate = new Date(arrISOdate)
                    const arrHour = arrDate.getUTCHours();  
                    const arrMin = arrDate.getUTCMinutes();  
                    const arrTime = `${arrHour.toString().padStart(2,'0')}:${arrMin.toString().padStart(2,'0')}`;
                    flightTemp.querySelector(".flights__list__flight__body__arrival__scheduled").textContent = arrTime
                }
                else{
                    flightTemp.querySelector(".flights__list__flight__body__arrival__scheduled").textContent = "N/A"
                }

                // arrival iata
                if((flight.arrival).iata !== null){
                    flightTemp.querySelector(".flights__list__flight__body__arrival__iata").textContent = (flight.arrival).iata
                }
                else{
                    flightTemp.querySelector(".flights__list__flight__body__arrival__iata").textContent = "N/A"
                }

                // arrival timezone
                const arrivalTimezone = flightTemp.querySelector(".flights__list__flight__body__arrival__timezone")                    
                if((flight.arrival).timezone !== null && ((flight.arrival).timezone).includes("/")){
                    if(!touchdowns.includes(((flight.arrival).timezone).split('/')[1])){
                        touchdowns.push(((flight.arrival).timezone).split('/')[1])
                    }
                    arrivalTimezone.textContent = ((flight.arrival).timezone).split('/')[1]
                }
                else{
                    arrivalTimezone.textContent = "N/A"
                }

                flightsList.appendChild(flightTemp)
            })
            const flights = document.querySelectorAll(".flights__list__flight")
            const searchInput = document.querySelector(".bar__search")
            searchInput.addEventListener("input", () => search(flights,searchInput.value))
            filterBy(flights, airlines, dates, statuses, takeoffs, touchdowns)
        })
        .catch(error => {console.error('error fetching data:', error)});
})

function search(flights, searchInputValue){
    const searchValue = searchInputValue.toLowerCase().trim()
    flights.forEach((flight) => {
        const flightText = (flight.textContent).toLowerCase()
        const flightAirline = (flight.querySelector(".flights__list__flight__body__airline-logo").alt).toLowerCase()
        if (flightText.includes(searchValue) || flightAirline.includes(searchValue)){
            flight.style.display = "flex";
        } 
        else {
            flight.style.display = "none";
        }

    })
}

const filterDate = document.querySelector("#flights__filter__date")
const filterAirline = document.querySelector("#flights__filter__airline")
const filterStatus = document.querySelector("#flights__filter__status")
const filterTakeoff = document.querySelector("#flights__filter__takeoff")
const filterTouchdown = document.querySelector("#flights__filter__touchdown")

const arrowDate = document.querySelector("#dropdown-arrow-date")
const arrowAirline = document.querySelector("#dropdown-arrow-airline")
const arrowStatus = document.querySelector("#dropdown-arrow-status")
const arrowTakeoff = document.querySelector("#dropdown-arrow-takeoff")
const arrowTouchdown = document.querySelector("#dropdown-arrow-touchdown")

const dateTitle = document.querySelector("#flights__filter__date")
const airlineTitle = document.querySelector("#flights__filter__airline")
const statusTitle = document.querySelector("#flights__filter__status")
const takeoffTitle = document.querySelector("#flights__filter__takeoff")
const touchdownTitle = document.querySelector("#flights__filter__touchdown")

const dateOptions = document.querySelector("#flights__filter__date__options")
const airlineOptions = document.querySelector("#flights__filter__airline__options")
const statusOptions = document.querySelector("#flights__filter__status__options")
const takeoffOptions = document.querySelector("#flights__filter__takeoff__options")
const touchdownOptions = document.querySelector("#flights__filter__touchdown__options")

let selectedFilters = {
    airline: new Set(),
    date: new Set(),
    status: new Set(),
    takeoff: new Set(),
    touchdown: new Set()
}

function filterBy(flights, airlines, dates, statuses, takeoffs, touchdowns) {
    filterDate.addEventListener("click", () => {
        populateAndSelectFilters("date", dates, dateOptions, dateTitle, arrowDate, selectedFilters, flights, "flights")
    })
    filterAirline.addEventListener("click", () => {
        populateAndSelectFilters("airline", airlines, airlineOptions, airlineTitle, arrowAirline, selectedFilters, flights, "flights")
        toggleArrow(arrowAirline)
    })
    filterStatus.addEventListener("click", () => {
        populateAndSelectFilters("status", statuses, statusOptions, statusTitle, arrowStatus, selectedFilters, flights, "flights")
        toggleArrow(arrowStatus)
    })  
    filterTakeoff.addEventListener("click", () => {
        populateAndSelectFilters("takeoff", takeoffs, takeoffOptions, takeoffTitle, arrowTakeoff, selectedFilters, flights, "flights")
        toggleArrow(arrowTakeoff)
    })
    filterTouchdown.addEventListener("click", () => {
        populateAndSelectFilters("touchdown", touchdowns, touchdownOptions, touchdownTitle, arrowTouchdown, selectedFilters, flights, "flights")
        toggleArrow(arrowTouchdown)
    })
}