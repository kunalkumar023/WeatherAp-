import React, { useEffect, useState } from 'react';
import './style.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const HourlyWeather = ({ cityName }) => {
    const [forecastDetails, setForecastDetails] = useState(null);
    const [loader, setLoader] = useState(false);
    const [status, setStatus] = useState("");
    const currentDate = new Date();
    const currHr = currentDate.getHours();

    useEffect(() => {
        const fetchDetails = async () => {
            setLoader(true);
            setStatus(""); // Reset status when cityName changes
            setForecastDetails(null); // Reset forecast details when cityName changes
            try {
                const url = `https://api.weatherapi.com/v1/forecast.json?key=0570552a47d746d4b9c35104242404&q=${cityName}&days=5`;
                const response = await fetch(url);

                if (response.status === 400) {
                    setStatus("City not found");
                    setLoader(false);
                    return;
                }

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();
                setForecastDetails(data);
            } catch (error) {
                setStatus("Failed to fetch data");
                console.error('Error fetching data:', error);
            } finally {
                setLoader(false);
            }
        };

        fetchDetails();
    }, [cityName]);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <div className='main'>
            {loader ? (
                <div className='loader'>Loading...</div>
            ) : status ? (
                <div>{status}</div>
            ) : forecastDetails ? (
                <div className='forecast'>
                    <div className="weather-info">
                        <h2>Weather in {forecastDetails.location.name}</h2>
                        <p>Temperature: {forecastDetails.current.temp_c}°C</p>
                        <p>Humidity: {forecastDetails.current.humidity}%</p>
                        <img src={forecastDetails.current.condition.icon} alt='icon' />
                        <p>Description: {forecastDetails.current.condition.text}</p>
                    </div>
                    <div className="hrday">
                        <h3>Hourly Forecast</h3>
                        <Carousel responsive={responsive}>
                            {forecastDetails.forecast.forecastday[0].hour.map(hour => (
                                (parseInt(hour.time.split(" ")[1].split(":")[0])) > currHr ? (
                                    <div key={hour.time_epoch} className='hourly-data'>
                                        <p>{hour.time.split(" ")[1]}</p>
                                        <p>{hour.temp_c}°C</p>
                                        <img src={hour.condition.icon} alt="icon" />
                                    </div>
                                ) : null
                            ))}
                        </Carousel>

                        <h2>Day Forecast</h2>
                        <Carousel responsive={responsive}>
                            {forecastDetails.forecast.forecastday.map(item => (
                                <div key={item.date} className='daily-data'>
                                    <p>Day: {item.date}</p>
                                    <pre>Min: {item.day.maxtemp_c}°C <br />
                                    Max: {item.day.mintemp_c}°C</pre>
                                    <img src={item.day.condition.icon} alt="icon" />
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default HourlyWeather;
