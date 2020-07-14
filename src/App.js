import React, { Component } from 'react';
import Weather from './components/Weather';
import Form from './components/Form';
let Api_Key="859bc7a52d0afc085490ae7758cf86d4";
class App extends Component {
  //http://api.openweathermap.org/data/2.5/weather?q=cairo,egypt&appid=e36ed364400282e43250b6c4c0274d44
  state={
    temperature:'',
    city:'',
    country:'',
    humidity:'',
    description:'',
    error:''
  }
  getWeather = async(e) => {
    e.preventDefault();
    const city=e.target.elements.city.value;
    const country=e.target.elements.country.value;
    const api=await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`)
    const data=await api.json();
    if(city && country){
      this.setState({
        temperature:data.main.temp,
        city:data.name,
        country:data.sys.country,
        humidity:data.main.humidity,
        description:data.weather[0].description,
        error:''
      })
    }else{
      this.setState({
        temperature:'',
        city:'',
        country:'',
        humidity:'',
        description:'',
        error:'Enter Data,Bitch!'
      })
    }
    
  }
  render(){
    return (
      <div className="wrapper">
        <div className="form-container">
          <Form getWeather={this.getWeather}/>
          <Weather 
            temperature={this.state.temperature}
            city={this.state.city}
            country={this.state.country}
            humidity={this.state.humidity}
            description={this.state.description}
            error={this.state.error}
          />
        </div>
      </div>
    );
  }
  
}
export default App;
