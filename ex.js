async function fetchJson(url){
    const response = await fetch(url);
    const obj = await response.json();
    return obj
}

async function getDashboardData(city){

    const destinationPromise =  (await fetchJson(`https://boolean-spec-frontend.vercel.app/freetestapi/destinations?search=${city}`))
 
    const weathersPromise =  (await fetchJson(`https://boolean-spec-frontend.vercel.app/freetestapi/weathers?search=${city}`))

    const airportsPromise =  (await fetchJson(`https://boolean-spec-frontend.vercel.app/freetestapi/airports?search=${city}`)) 

    const promises = [destinationPromise, weathersPromise, airportsPromise]
    const [destinations, weathers, airports] = await Promise.all(promises)

    return {
        city: destinations[0].name,
        country: destinations[0].country,
        temperature: weathers[0].temperature,
        weather: weathers[0].weather_description,
        airport: airports[0].name
    }

}


// (async()=>{
//     try{
//         const dashboard = await getDashboardData("london")
//         console.log(dashboard)
//     }catch(error){
//         console.error(error)
//     }
// })()



getDashboardData('london')
    .then(data => {
        console.log('Dasboard data:', data);
        console.log(
            `${data.city} is in ${data.country}.\n` +
            `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`+
            `The main airport is ${data.airport}.\n`
        );
    })
    .catch(error => console.error(error));