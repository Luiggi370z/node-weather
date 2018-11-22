import yargs from 'yargs'
import {
    GetCoords,
    GetWeather
} from './api/location'

const argv = yargs.options({
    address: {
        alias: 'a',
        desc: 'Address of the country to gather the weather info',
        demand: true
    }
}).argv

let getInfo = async (address) => {
    try {
        let coords = await GetCoords(address)
        let weatherInfo = await GetWeather(coords.lat, coords.lng)

        return `Weather for 🏠  ${argv.address}:\n ⛅️  ${weatherInfo.weather} \n 🌡  ${weatherInfo.temperature} C`
    } catch (e) {
        return `Can't find weather info for ${address}`
    }
}


getInfo(argv.address)
    .then(msg => console.log(msg))
    .catch(err => console.log(err))