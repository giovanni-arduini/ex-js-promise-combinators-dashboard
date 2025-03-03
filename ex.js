async function fetchJson(url){
    const response = await fetch(url);
    const obj = await response.json();
    return obj
}

async function getDashboardData(city){

    try{
        const destinationPromise =  (await fetchJson(`https://boolean-spec-frontend.vercel.app/freetestapi/destinations?search=${city}`))
     
        const weathersPromise =  (await fetchJson(`https://boolean-spec-frontend.vercel.app/freetestapi/weathers?search=${city}`))
    
        const airportsPromise =  (await fetchJson(`https://boolean-spec-frontend.vercel.app/freetestapi/airports?search=${city}`)) 
    
        const promises = [destinationPromise, weathersPromise, airportsPromise]
        const [destinations, weathers, airports] = await Promise.all(promises)
        
        const destination = destinations[0];
        const weather = weathers[0];
        const airport = airports[0];
        
        return {
            city: destination ? destinations[0].name : null,
            country: destination ? destinations[0].country : null,
            temperature: weather ? weathers[0].temperature : null,
            weather: weather ? weathers[0].weather_description : null,
            airport: airport ? airports[0].name : null
        }
    }catch(error){
        console.error(error)
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


getDashboardData('milan')
    .then(data => {
        let message = ""

        if(data.city !== null && data.country !== null){
            message += `${data.city} is in ${data.country}.\n`
        } if (data. temperature !== null && data.weather !== null){
             message += `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`
        } if (data.airport !== null){
            `The main airport is ${data.airport}.\n`
        } if(!data.city&&!data.country&&!data.temperature&&!data.weather&&!data.airport){message = "No available information for the selected destination"}

        console.log(message);
    })
    .catch(error => console.error(error));