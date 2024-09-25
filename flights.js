import { navigationBar } from './main.js';

document.addEventListener("DOMContentLoaded", () => {
    navigationBar()
    const accessKey = '021f3bf7e84211994b2797d1a56980df'
    const url = `https://api.aviationstack.com/v1/flights?access_key=${accessKey}`

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const result = data.data
            console.log(result)
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
                    //     case("KLM"): airlineLogo.src = ""; break;
                    //     case("LATAM Airlines"): airlineLogo.src = ""; break;
                    //     case("Qantas"): airlineLogo.src = ""; break;
                    //     case("Qatar Airways"): airlineLogo.src = ""; break;
                        case("Turkish Airlines"): airlineLogo.src = "images/turkish.png"; break;
                        case("SriLankan Airlines"): airlineLogo.src = "images/srilankan.jpg"; break;
                        case("Oman Air"): airlineLogo.src = "images/oman.png"; break;
                    //     case("Virgin Australia"): airlineLogo.src = ""; break;
                    //     case("United Airlines"): airlineLogo.src = ""; break;
                    //     case("SAS"): airlineLogo.src = ""; break;
                    //     case("Air New Zealand"): airlineLogo.src = ""; break;
                    //     case("SWISS"): airlineLogo.src = ""; break;
                    //     case("Air India"): airlineLogo.src = ""; break;
                    //     case("Air Canada"): airlineLogo.src = ""; break;
                    //     case("Batik Air"): airlineLogo.src = ""; break;
                    //     case("China Eastern Airlines"): airlineLogo.src = ""; break;
                    //     case("Xiamen Airlines"): airlineLogo.src = ""; break;
                        case("Jet Linx Aviation"): airlineLogo.src = "images/jetlinx.png"; break;
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
            const searchInput = document.querySelector(".flights__bar__search")
            searchInput.addEventListener("input", () => search(flights,searchInput.value))
            filterBy(flights, airlines, dates, statuses, takeoffs, touchdowns)
        })
        .catch(error => {console.error('error fetching data:', error)});
})

function toggleDropDown(dropdown){
    if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
    } else {
        dropdown.style.display = "block";
    }
}

const filterDate = document.querySelector("#flights__filter__date")
const filterAirline = document.querySelector("#flights__filter__airline")
const filterStatus = document.querySelector("#flights__filter__status")
const filterTakeoff = document.querySelector("#flights__filter__takeoff")
const filterTouchdown = document.querySelector("#flights__filter__touchdown")

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

function filterByDate(flights, date){
    flights.forEach((flight) => {
        const flightDate = flight.querySelector(".flights__list__flight__date").innerText
        if (flightDate === date) {
            flight.style.display = "flex"
        } 
        else {
            flight.style.display = "none" 
        }
    });
}

function filterByAirline(flights, airline){
    flights.forEach((flight) => {
        const flightAirline = flight.querySelector(".flights__list__flight__body__airline-logo").alt.toLowerCase()
        if (flightAirline === airline.toLowerCase()) {
            flight.style.display = "flex"; 
        } 
        else {
            flight.style.display = "none"; 
        }
    });
}

function filterByStatus(flights, status){
    flights.forEach((flight) => {
        const flightStatus = flight.querySelector(".flights__list__flight__header__status").innerText
        if (flightStatus === status) {
            flight.style.display = "flex"
        } 
        else {
            flight.style.display = "none" 
        }
    });
}

function filterByTakeoff(flights, takeoff){
    flights.forEach((flight) => {
        const flightTakeoff = flight.querySelector(".flights__list__flight__body__departure__timezone").innerText
        if (flightTakeoff === takeoff) {
            flight.style.display = "flex"
        } 
        else {
            flight.style.display = "none" 
        }
    });
}

function filterByTouchdown(flights, touchdown){
    flights.forEach((flight) => {
        const flightTouchdown = flight.querySelector(".flights__list__flight__body__arrival__timezone").innerText
        if (flightTouchdown === touchdown) {
            flight.style.display = "flex"
        } 
        else {
            flight.style.display = "none" 
        }
    });
}   

function filterBy(flights, airlines, dates, statuses, takeoffs, touchdowns) {
    filterDate.addEventListener("click", () => populateDropDown("date", dates, flights))
    filterAirline.addEventListener("click", () => populateDropDown("airline", airlines, flights))
    filterStatus.addEventListener("click", () => populateDropDown("status", statuses, flights))
    filterTakeoff.addEventListener("click", () => populateDropDown("takeoff", takeoffs, flights))
    filterTouchdown.addEventListener("click", () => populateDropDown("touchdown", touchdowns, flights))
    // populateDropDown("date", dates, flights)
    // populateDropDown("airline", airlines, flights)
    // populateDropDown("status", statuses, flights)
    // populateDropDown("takeoff", takeoffs, flights)
    // populateDropDown("touchdown", touchdowns, flights)
}

const dateOptions = document.querySelector("#flights__filter__date__options")
const airlineOptions = document.querySelector("#flights__filter__airline__options")
const statusOptions = document.querySelector("#flights__filter__status__options")
const takeoffOptions = document.querySelector("#flights__filter__takeoff__options")
const touchdownOptions = document.querySelector("#flights__filter__touchdown__options")

function populateDropDown(category, data, flights){
    switch(category){
        case("date"):
            dateOptions.innerHTML = "";
            data.forEach((date) => {
                const checkbox = document.createElement("input")
                checkbox.type = "checkbox"
                checkbox.id = date
                checkbox.classList.add("flights__filter__options-list__options__checkbox")

                const label = document.createElement("label")
                label.innerText = date
                label.classList.add("flights__filter__options-list__options__labels")

                const dateChoice = document.createElement("div")
                dateChoice.classList.add("flights__filter__options-list__options")
                dateChoice.appendChild(checkbox) 
                dateChoice.appendChild(label) 

                dateOptions.appendChild(dateChoice)
                checkbox.addEventListener("change", (event) => {
                    if(event.target.checked)
                        filterByDate(flights, dateChoice.innerText)
                    else
                        flights.forEach((flight) => flight.style.display = "flex")
                })            
            })
            toggleDropDown(dateOptions)
        break;
        case("airline"): 
            airlineOptions.innerHTML = "";
            data.forEach((airline) => {
                const checkbox = document.createElement("input")
                checkbox.type = "checkbox"
                checkbox.id = airline
                checkbox.classList.add("flights__filter__options-list__options__checkbox")

                const label = document.createElement("label")
                label.innerText = airline
                label.classList.add("flights__filter__options-list__options__labels")

                const airlineChoice = document.createElement("div")
                airlineChoice.classList.add("flights__filter__options-list__options")
                airlineChoice.appendChild(checkbox) 
                airlineChoice.appendChild(label) 

                airlineOptions.appendChild(airlineChoice)
                checkbox.addEventListener("change", (event) => {
                    if(event.target.checked)
                        filterByAirline(flights, airlineChoice.innerText)
                    else
                        flights.forEach((flight) => flight.style.display = "flex")
                })
            })
            toggleDropDown(airlineOptions)
        break;
        case("status"):
            statusOptions.innerHTML = "";
            data.forEach((status) => {
                const checkbox = document.createElement("input")
                checkbox.type = "checkbox"
                checkbox.id = status
                checkbox.classList.add("flights__filter__options-list__options__checkbox")

                const label = document.createElement("label")
                label.innerText = status
                label.classList.add("flights__filter__options-list__options__labels")

                const statusChoice = document.createElement("div")
                statusChoice.classList.add("flights__filter__options-list__options")
                statusChoice.appendChild(checkbox) 
                statusChoice.appendChild(label) 

                statusOptions.appendChild(statusChoice)
                checkbox.addEventListener("change", (event) => {
                    if(event.target.checked)
                        filterByStatus(flights, statusChoice.innerText)
                    else
                        flights.forEach((flight) => flight.style.display = "flex")
                })
            })
            toggleDropDown(statusOptions)
        break;
        case("takeoff"):
            takeoffOptions.innerHTML = "";
            data.forEach((takeoff) => {
                const checkbox = document.createElement("input")
                checkbox.type = "checkbox"
                checkbox.id = takeoff
                checkbox.classList.add("flights__filter__options-list__options__checkbox")

                const label = document.createElement("label")
                label.innerText = takeoff
                label.classList.add("flights__filter__options-list__options__labels")

                const takeoffChoice = document.createElement("div")
                takeoffChoice.classList.add("flights__filter__options-list__options")
                takeoffChoice.appendChild(checkbox) 
                takeoffChoice.appendChild(label) 

                takeoffOptions.appendChild(takeoffChoice)
                checkbox.addEventListener("change", (event) => {
                    if(event.target.checked)
                        filterByTakeoff(flights, takeoffChoice.innerText)
                    else
                        flights.forEach((flight) => flight.style.display = "flex")
                })
            })
            toggleDropDown(takeoffOptions)
        break;
        case("touchdown"):
            touchdownOptions.innerHTML = "";
            data.forEach((touchdown) => {
                const checkbox = document.createElement("input")
                checkbox.type = "checkbox"
                checkbox.id = touchdown
                checkbox.classList.add("flights__filter__options-list__options__checkbox")

                const label = document.createElement("label")
                label.innerText = touchdown
                label.classList.add("flights__filter__options-list__options__labels")

                const touchdownChoice = document.createElement("div")
                touchdownChoice.classList.add("flights__filter__options-list__options")
                touchdownChoice.appendChild(checkbox) 
                touchdownChoice.appendChild(label) 

                touchdownOptions.appendChild(touchdownChoice)
                checkbox.addEventListener("change", (event) => {
                    if(event.target.checked)
                        filterByTouchdown(flights, touchdownChoice.innerText)
                    else
                        flights.forEach((flight) => flight.style.display = "flex")
                })
            })
            toggleDropDown(touchdownOptions)
        break;
    }
}



{/* <span>&#9654;</span> right triangle*/}
{/* <span>&#9660;</span> down triangle*/}