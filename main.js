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





