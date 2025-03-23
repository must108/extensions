import { useState, useEffect } from "react";

interface WeatherDataProps {
    main: { temp: number };
    weather: { description: string; }[];
    name: string;
}

interface EventProps {
    target: { value: string };
}

export function CityInput() {
    const [weatherData, setWeatherData] = useState<WeatherDataProps | null>(null);
    const [city, setCity] = useState<string>("");
    const [toggleFetch, setToggleFetch] = useState<boolean>(false);
    const [inputEntered, setInputEntered] = useState<boolean>(false);

    const submitEvent = () => {
        setToggleFetch(!toggleFetch);
        setInputEntered(true);
    }

    const handleInputChange = (e: EventProps) => {
        setCity(e.target.value);
        setInputEntered(false)
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
                setWeatherData(data);
            } catch (error) {
                console.error("error while fetching weather data! ", error);
                return;
            }
        }

        getWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toggleFetch]);

    return (
        <div className="flex flex-col">
            <form className="p-5 flex flex-col gap-2">
                <input 
                    type="text" 
                    id="input" 
                    className="border-1 border-l-0 border-r-0 border-t-0 outline-none text-white"
                    value={city}
                    onChange={handleInputChange}
                    placeholder="search for a city!"
                />
                <div className="flex justify-center">
                    <button 
                        type="button" 
                        className="p-2 font-bold bg-[#7BAFD4] text-white hover:bg-[#8ebbda] rounded-lg pl-3 pr-3"
                        onClick={submitEvent}
                    >
                        Submit
                    </button>
                </div>
            </form>
            <div className="text-white text-center">
                {weatherData ? 
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl font-bold">{weatherData.name}</h1>
                        <p className="text-6xl font-bold">{weatherData.main.temp}°F</p>
                        <p className="font-bold">{weatherData.weather[0].description}</p>
                    </div>
                : <div>
                    {inputEntered ? "Weather data cannot be found!" : "Enter a city to get started!"}
                </div>}
            </div>
        </div>
    );
}