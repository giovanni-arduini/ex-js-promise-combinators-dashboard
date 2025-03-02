async function getDashboardData(city){
    let destination = {}

    const destinationResponse =  (await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/destinations?search=${city}`)).json()
    // let destData = await destinationResponse.json()
    // destination.city = destData[0].name
    destination.country = destinationResponse[0].country
   

    const weatherResponse = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/weathers?search=${city}`)
    let weather = await weatherResponse.json()
    destination.temperature = weather[0].temperature
    destination.weather = weather[0].weather_description

    const airportsResponse = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/airports?search=${city}`)
    let airports = await airportsResponse.json()
    destination.airport = airports[0].name

    return destination
}


(async()=>{
    try{
        const dashboard = await getDashboardData("london")
        console.log(dashboard)
    }catch(error){
        console.error(error)
    }
})()



// getDashboardData('london')
//     .then(data => {
//         console.log('Dasboard data:', data);
//         console.log(
//             `${data.city} is in ${data.country}.\n` +
//             `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`+
//             `The main airport is ${data.airport}.\n`
//         );
//     })
//     .catch(error => console.error(error));