import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

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
                Country Name : {this.state.countryData[0].name}<br/>
                Capital : {this.state.countryData[0].capital}<br/>
                Population  : {this.state.countryData[0].population}<br/>
                latlng : {this.state.countryData[0].latlng}<br/>
                <img src ={this.state.countryData[0].flag} style={{'height' :'100px'}}/><br/>

                <br/><br/>
                <div className="weatherInfo">Capital Weather<br/><br/>
                    Click to find :<br/> <button onClick={this.capitalWeather}> Capital Weather</button>
                </div>
                {this.state.isweatherData && <div>
                    <img src= {this.state.weatherData.current.weather_icons[0]}/>
                    Temperature : {this.state.weatherData.current.temperature}<br/>
                    Wind Speed : {this.state.weatherData.current.wind_speed}<br/>
                    Precip : {this.state.weatherData.current.precip} <br/>
                </div>}
            </div>
        )
    }
}

export default InfoPage