import axios from 'axios'

const googleApiUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='
const googleApiKey = 'AIzaSyA5mjCwx1TRLuBAjwQw84WE6h5ErSe7Uj8'

const openWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?'
const openWeatherApiKey = 'f369635965b00ad16ced5da4da4b9f3b'

export const GetCoords = async (address) => {
    let encodedAddress = encodeURI(address)
    let url = `${googleApiUrl}${encodedAddress}&key=${googleApiKey}`

    let res = await axios.get(url)
    if (res.data.status === 'ZERO_RESULTS')
        throw new Error(`No results for the following address: ${address}`)

    let location = res.data.results[0]
    const {
        lat,
        lng
    } = location.geometry.location

    return {
        address: location.formatted_address,
        lat,
        lng
    }
}

export const GetWeather = async (lat, lng) => {
    let url = `${openWeatherUrl}units=metric&lat=${lat}&lon=${lng}&appId=${openWeatherApiKey}`
    let response = await axios.get(url)
    const {
        data
    } = response

    if (data.cod !== 200)
        throw new Error(`Could not gather weather info: ${data.message}`)

    return {
        weather: data.weather.map(item => item.description).join(', '),
        temperature: data.main.temp
    }
};