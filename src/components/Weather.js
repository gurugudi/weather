import React, { useState } from "react";
import "./weather.css";
import DisplayWeather  from "./DisplayWeather";

function Weather() {
    const APIKEY = "d66b2c290374c1e3fe33caac5d117a78"
    const [form, setForm] = useState({
        city: "",
        country: "",
    });
    const [weather, setWeather] = useState([])

    async function weatherData(e) {
        e.preventDefault();
        console.log("City value is", form.city, form.country)
        if (form.city === "") {
            alert("Add value of city");
        }
        else {
            const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${form.city},${form.country}&appid=${APIKEY}`)
                .then((res) => res.json())
                .then((data) => data)
            setWeather(
                {
                    data: data
                }
            )
        }

    }
    const handleChange = e => {
        let name = e.target.name;
        let value = e.target.value;

        if (name === "city") {
            setForm({ ...form, city: value });
        }
        if (name === "country") {
            setForm({ ...form, country: value });
        }

    }
    return <div className="weather ">
        <span className="title">Weather App</span>
        <br />

        <form>
            <input type="text" name="city" placeholder="Type City name" onChange={e => handleChange(e)} />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <input type="text" name="country" placeholder="Type Country Name" onChange={e => handleChange(e)} />
            <button className="getweather" onClick={e => weatherData(e)}>Submit</button>
        </form>
        {weather.data !== undefined ? (
        <div>
          <DisplayWeather data={weather.data} />
        </div>
      ) : null}
    </div>;
}

export default Weather