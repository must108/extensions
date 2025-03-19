const input = document.querySelector("#city");
const submit = document.querySelector("#submitButton");
const content = document.querySelector("#content");

const API_KEY = "ur not getting this bro...";

submit.addEventListener("click", async () => {
    const main = await getWeather(input.value);

    content.textContent = main.temp;
});

async function getWeather(city) {
    const link = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`

    try {
        const res = await fetch(link);

        if (!res.ok) {
            throw new Error("fetch is not ok!");
        }

        if (res.message && res.message === "city not found") {
            throw new Error("city is not valid!");
        }

        const data = await res.json();
        const { main } = data;
        return main;
    } catch (error) {
        console.error("an error occurred during fetch: ", error);
    }
}