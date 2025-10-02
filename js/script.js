// today variables
let todayLocation = document.querySelector('.location')
let todayTemp = document.querySelector('.today-num')
let todayImg = document.getElementById('today-img')
let todayCondition = document.getElementById('today-condition')
let humidity = document.getElementById('humidity')
let windSpeed = document.getElementById('wind-speed')
let windDir = document.getElementById('wind-dir')
let todayName = document.querySelector('.today-name')
let todayNumber = document.querySelector('.today-number')
let todayMonth = document.querySelector('.today-month')
// next days variables
let maxTemp = document.querySelectorAll('.num')
let minTemp = document.querySelectorAll('.small')
let nextDaysCondition = document.querySelectorAll('.customs')
let nextImg = document.querySelectorAll('#next-img')
let nextDay = document.querySelectorAll('.next-day')
//search input
let searchInput = document.getElementById('search')
//fetch API data
async function getWeatherData(cityName){
    let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=8368c25e3a144521a8545830250709&q=${cityName}&days=3`)
    let weatherData = await weatherResponse.json()
    return weatherData
}
// dsiplay today data
function displayTodayData(data){
    let todayDate = new Date()
    todayName.innerHTML = todayDate.toLocaleDateString("en-US" , {weekday : "long"})
    todayNumber.innerHTML = todayDate.getDate()
    todayMonth.innerHTML = todayDate.toLocaleDateString("en-US" , {month:"long"})
    todayLocation.innerHTML = data.location.name
    todayTemp.innerHTML = data.current.temp_c + '<sup>o</sup>C'
    todayImg.setAttribute('src', "https:" + data.current.condition.icon)
    todayCondition.innerHTML = data.current.condition.text
    humidity.innerHTML = `<img src="images/icon-umberella.png" class="align-middle" alt="">`+ data.current.humidity + '%'
    windSpeed.innerHTML = `<img src="images/icon-wind.png" class="align-middle" alt="">` + data.current.wind_kph + 'km/h'
    windDir.innerHTML = `<img src="images/icon-compass.png" class="align-middle" alt="">` + data.current.wind_dir
}
//display next days data
function displayNextData(data){
    let forcastData = data.forecast.forecastday
    for(let i=0 ; i<2 ; i++){
        let nextDate = new Date(forcastData[i+1].date)
        nextDay[i].innerHTML = nextDate.toLocaleDateString("en-US" , {weekday : "long"})
        maxTemp[i].innerHTML = forcastData[i+1].day.maxtemp_c + '<sup>o</sup>C'
        minTemp[i].innerHTML = forcastData[i+1].day.mintemp_c + '<sup>o</sup>'
        nextDaysCondition[i].innerHTML = forcastData[i+1].day.condition.text
        nextImg[i].setAttribute('src' ,"https:" + forcastData[i+1].day.condition.icon)
    }
}
//start app
async function startApp(city = "cairo") {
    let weatherData = await getWeatherData(city)
    if(!weatherData.error){
        displayTodayData(weatherData)
        displayNextData(weatherData)
    }
}
startApp()

searchInput.addEventListener('keyup' , function(){
    startApp(searchInput.value)    
})