import { useState, useEffect } from "react";

interface WeatherDataProps {
    temp: number;
}

export function CityInput() {
    const city = "Orlando";
    const [weatherData, setWeatherData] = useState<WeatherDataProps | null>(null);

    useEffect(() => {
        async function getWeather() {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_API_KEY}&units=imperial`;

            try {
                const res = await fetch(url);
                console.log(res);

                if (!res.ok) {
                    throw new Error("response is not ok!");
                }

                const data = await res.json();
                const { main } = data;
                setWeatherData(main);
            } catch (error) {
                console.error("error while fetching weather data! ", error);
                return;
            }
        }

        getWeather();
    }, []);

    return (
        <>
            <div>Hello, world!</div>
            <div>{weatherData!.temp}</div>
        </>
    );
}