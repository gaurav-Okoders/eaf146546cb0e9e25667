import React, { PureComponent } from 'react'
import InfoPage from './InfoPage';
import PropTypes from 'prop-types'
import { Button, responsiveFontSizes } from '@material-ui/core'

class Home extends PureComponent {
    static propTypes = {}

    constructor(props) {
        super(props)
        this.myRef = React.createRef()
        this.state = {
            countryData : [],
            isDataPresent : false,
        }
    }
    componentDidMount(){
        if(document.getElementById("inputButton")){
            document.getElementById("inputButton").style.color = 'red';
            document.getElementById("inputButton").disabled = true;
        }

    }

    handleinputChange = ()=>{
        console.log('REaced',this.myRef.current.value)
        if(this.myRef.current.value.length > 0){
            document.getElementById("inputButton").disabled = false;
            document.getElementById("inputButton").style.color = 'white';
        }else{
            document.getElementById("inputButton").disabled = true;
            document.getElementById("inputButton").style.color = 'red';

        }
    }


    getCountryDetails = (e) => {
        const countryName = this.myRef.current;
        fetch(`https://restcountries.eu/rest/v2/name/${countryName.value}`,
        {method : 'GET',

        })
        .then(response => response.json())
        .then(res => this.setState({countryData : res, isDataPresent : true}))
        e.preventDefault();
    }



    render() {
        return (
            
            <React.Fragment>
                <h1 className="heading">Okoder Application</h1>
                {!this.state.isDataPresent ? 
                <div>
                
                    <form className="formStyle">
                        Enter you Country  : <br/>

                        <input 
                            ref={this.myRef} 
                            type="field" 
                            className="inputCountry"
                            onChange={this.handleinputChange}    
                        />
                        <br/>
                        <Button color="primary" variant="contained" 
                        type="submit" 
                        id="inputButton"
                        onClick={(e) => this.getCountryDetails(e)} 
                        >
                        Submit
                        </Button>
                    </form>
                </div> : 
                <div><InfoPage countryData = {this.state.countryData}/></div>}
            </React.Fragment>
        )
    }
}

export default Home