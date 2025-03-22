import { useState, useEffect } from "react";

interface WeatherDataProps {
    temp: number;
}

interface EventProps {
    target: { value: string };
}

export function CityInput() {
    const [weatherData, setWeatherData] = useState<WeatherDataProps | null>(null);
    const [city, setCity] = useState<string>("");
    const [toggleFetch, setToggleFetch] = useState<boolean>(false);

    const submitEvent = () => {
        setToggleFetch(!toggleFetch);
    }

    const handleInputChange = (e: EventProps) => {
        setCity(e.target.value);
    }

    useEffect(() => {
        async function getWeather() {
            const url = `http://localhost:3000/api/weather?city=${city}`;

            try {
                const res = await fetch(url);

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
    }, [toggleFetch]);

    return (
        <>
            <form className="p-5 flex flex-col">
                <label htmlFor="input">Enter city here: </label>
                <div>
                    <input 
                        type="text" 
                        id="input" 
                        className="border-2 border-gray-500"
                        value={city}
                        onChange={handleInputChange}
                    />
                    <button 
                        type="button" 
                        className="p-2 bg-gray-400 text-white hover:bg-gray-300"
                        onClick={submitEvent}
                    >
                        Submit
                    </button>
                </div>
            </form>
            <div>{weatherData ? weatherData.temp + "°" : ""}</div>
        </>
    );
}