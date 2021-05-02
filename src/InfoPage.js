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

    capitalWeather =(index) =>{
        const weatherkey = '5d618e6f98685b65920320428f64f5c8';
        fetch(`http://api.weatherstack.com/current?access_key=${weatherkey}&query=${this.state.countryData[index].name}`,
        {method : 'GET',
        })
        .then(response => response.json())
        .then(res => {console.log(res);this.setState({weatherData : res, isweatherData :true}) })
    }

    render() {
        const countryDetailData = this.state.countryData.map((data, index) =>{
            return (
                <React.Fragment>
            <div className="countryDetail">
            <div className="detailsOnly">
                <b>Country Name :</b> {data.name}<br/>
                <b>Capital :</b> {data.capital}<br/>
                <b>Population</b>  : {data.population}<br/>
                <b>latlng</b> : {data.latlng}<br/>
            </div>
            <img src ={data.flag} className='imageStyle'/>
            <br/><br/>
             </div>
            <div className="weatherInfo">
               <br/> <Button color="primary" variant="contained" onClick={()=>this.capitalWeather(index)}> Capital Weather</Button >
            </div>
            <hr/>
            </React.Fragment>
            )
        })
        return (
            <div>
                <a href='/'>Back</a>
                {countryDetailData}
                <hr/>
                CapitalWeather info : 
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