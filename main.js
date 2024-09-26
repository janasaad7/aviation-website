export function navigationBar(){
    const home = document.querySelector("#home")
    const flights = document.querySelectorAll("#flights")
    const airlines = document.querySelectorAll("#airlines")
    const airports = document.querySelectorAll("#airports")
    const airplanes = document.querySelectorAll("#airplanes")

    home.addEventListener("click",() =>  window.location = 'index.html')

    flights.forEach((button) => button.addEventListener("click",() =>  window.location = 'flights.html'))

    airlines.forEach((button) => button.addEventListener("click",() =>  window.location = 'airlines.html'))

    airports.forEach((button) => button.addEventListener("click",() =>  window.location = 'airports.html'))

    airplanes.forEach((button) => button.addEventListener("click",() =>  window.location = 'airplanes.html'))
}

document.addEventListener("DOMContentLoaded", () => navigationBar())

export function search(dataSet, searchInputValue){
    const searchValue = searchInputValue.toLowerCase().trim()
    dataSet.forEach((data) => {
        const content = (data.textContent).toLowerCase()
        if (content.includes(searchValue)){
            data.style.display = "flex";
        } 
        else {
            data.style.display = "none";
        }
    })
}

export function toggleDropDown(options, title){
    if (options.style.display === "block") {
        options.style.display = "none";
        title.style.marginBottom = "10%";
    } else {
        options.style.display = "block";
    }
}

export function toggleArrow(arrow){
    if(arrow.classList.contains("down")){
        arrow.classList.remove("down")
        arrow.classList.add("up")
    }
    else{
        arrow.classList.remove("up")
        arrow.classList.add("down")
    }
}

export function populateAndSelectFilters(filter, dataset, filterOptions, filterTitle, filterArrow, selectedFilters, list, page){
    filterOptions.innerHTML = "";
    dataset.forEach((data) => {
        const checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.classList.add("filter__options-list__options__checkbox")

        const label = document.createElement("label")
        label.innerText = data
        label.classList.add("filter__options-list__options__labels")

        const choice = document.createElement("div")
        choice.classList.add("filter__options-list__options")
        choice.appendChild(checkbox) 
        choice.appendChild(label) 

        filterOptions.appendChild(choice)
        
        checkbox.addEventListener("change", (event) => {
            if(event.target.checked)
                (selectedFilters[filter]).add(data.toLowerCase())
            else
                (selectedFilters[filter]).delete(data.toLowerCase())
            applySelectedFilters(list, selectedFilters, page) 
        })           
    })
    toggleDropDown(filterOptions, filterTitle)
    toggleArrow(filterArrow)
}

export function applySelectedFilters(list, selectedFilters, page) {
    switch(page){
        case "flights":
            list.forEach((flight) => {
                const flightDate = flight.querySelector(".flights__list__flight__date").innerText.toLowerCase()
                const flightAirline = flight.querySelector(".flights__list__flight__body__airline-logo").alt.toLowerCase()
                const flightStatus = flight.querySelector(".flights__list__flight__header__status").innerText.toLowerCase()
                const flightTakeoff = flight.querySelector(".flights__list__flight__body__departure__timezone").innerText.toLowerCase()
                const flightTouchdown = flight.querySelector(".flights__list__flight__body__arrival__timezone").innerText.toLowerCase()

                const matchesDate = (selectedFilters.date.size === 0) || (selectedFilters.date.has(flightDate))
                const matchesAirline = (selectedFilters.airline.size === 0) || (selectedFilters.airline.has(flightAirline))
                const matchesStatus = (selectedFilters.status.size === 0) || (selectedFilters.status.has(flightStatus))
                const matchesTakeoff = (selectedFilters.takeoff.size === 0) || (selectedFilters.takeoff.has(flightTakeoff))
                const matchesTouchdown = (selectedFilters.touchdown.size === 0) || (selectedFilters.touchdown.has(flightTouchdown))

                if (matchesDate && matchesAirline && matchesStatus && matchesTakeoff && matchesTouchdown) 
                    flight.style.display = "flex";
                else 
                    flight.style.display = "none";
            })
        break
        case "airports":
            list.forEach((airport) => {
                const airportCountry = airport.querySelector(".airports__container__list__airport__body__country").innerText.toLowerCase()
                if (selectedFilters.africa.has(airportCountry) || selectedFilters.asia.has(airportCountry) || selectedFilters.europe.has(airportCountry) || selectedFilters.australia.has(airportCountry) || selectedFilters.pacific.has(airportCountry) || selectedFilters.atlantic.has(airportCountry) || selectedFilters.america.has(airportCountry))
                    airport.style.display = "flex";
                else
                    airport.style.display = "none";
            })
        break
    }
}