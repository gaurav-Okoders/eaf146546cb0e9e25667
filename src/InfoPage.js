import React, { PureComponent } from 'react'
import { Box, Button } from '@material-ui/core';

class InfoPage extends PureComponent {
    static propTypes = {}

    constructor(props) {
        super(props)

        this.state = {
            countryData : this.props.countryData,
            weatherData : {},
            isweatherData : false
        }
    }

    capitalWeather =() =>{
        const weatherkey = '5d618e6f98685b65920320428f64f5c8';
        fetch(`http://api.weatherstack.com/current?access_key=${weatherkey}&query=${this.state.countryData[0].name}`,
        {method : 'GET',
        })
        .then(response => response.json())
        .then(res => {console.log(res);this.setState({weatherData : res, isweatherData :true}) })
    }

    render() {
        return (
            <div>
                <a href='/'>Back</a>
                <div className="countryDetail">
                    <div className="detailsOnly">
                        <b>Country Name :</b> {this.state.countryData[0].name}<br/>
                        <b>Capital :</b> {this.state.countryData[0].capital}<br/>
                        <b>Population</b>  : {this.state.countryData[0].population}<br/>
                        <b>latlng</b> : {this.state.countryData[0].latlng}<br/>
                    </div>
                    <img src ={this.state.countryData[0].flag} className='imageStyle'/><br/>

                    <br/><br/>
                    </div>

                <div className="weatherInfo">Capital Weather<br/>
                    Click to find :<br/> <Button color="primary" variant="contained" onClick={this.capitalWeather}> Capital Weather</Button >
                </div>
                <Box color="text.primary" component="span" m={1}>
                    {this.state.isweatherData && <div className="weatherDetail">
                        <img className='imageStyle' src= {this.state.weatherData.current.weather_icons[0]}/><br/>
                        <b>Temperature :</b> {this.state.weatherData.current.temperature}<br/>
                        <b>Wind Speed :</b> {this.state.weatherData.current.wind_speed}<br/>
                        <b>Precip :</b> {this.state.weatherData.current.precip} <br/>
                    </div>}
                </Box>
            </div>
        )
    }
}

export default InfoPage