const SERVER_URL = 'http://localhost:3000/';
function searchWeather(form){

    if(!form.city.value.trim() && !form.zip.value.trim()){
        alert('Please, enter a city or a post code');
        return;
    }
    const city = form.city.value.trim();
    const zip = form.zip.value.trim();
    const doc = document;
    let countryCode = doc.querySelector('#country_code');
    let serverUrl = SERVER_URL + 'getWeather/';
    if(city){
        serverUrl += city;
    } else {
        serverUrl += zip;
    }

    if(countryCode && countryCode.value){
        serverUrl +='?country_code=' + countryCode.value;
    }

    // Lingua del browser
    if(navigator.language){
        const lang = navigator.language.split('-');
        serverUrl += serverUrl.includes('?')?'&lang='+lang[0] : '?lang=' +lang[0];
    }

    let cityname = doc.querySelector('#cityname');
    let weather = doc.querySelector('#weather');
    let temp = doc.querySelector('#temp');
    let minTemp = doc.querySelector('#min-temp');
    let maxTemp = doc.querySelector('#max-temp');

    cityname.innerHTML = '';
    temp.innerHTML = '';
    temp.innerHTML = '';
    minTemp.innerHTML = '';
    maxTemp.innerHTML = '';

    axios.get(serverUrl).then(resp =>{
        cityname.innerHTML = resp.data.name;
        weather.innerHTML = resp.data.weather[0].description;
        temp.innerHTML = resp.data.main.temp;
        minTemp.innerHTML = resp.data.main.temp_min;
        maxTemp.innerHTML = resp.data.main.temp_max;
    })
    .catch(error=>{
        console.log(error.response)
        alert(error.response.data.toString());
    })

}

document.addEventListener('DOMContentLoaded', ()=> {
    axios.get(SERVER_URL + 'getCountries')
        .then( result =>{
            const countries = result.data;
            const countryList = document.querySelector('#country_code');
            countries.forEach((country)=>{
                 const option = new Option();
                 option.value = country.code;
                 option.text = country.name;
                countryList.appendChild(option);
            })
        })
        .catch(error=>{
            console.log(error.response)
            alert(error.response.data.toString());
        })
});