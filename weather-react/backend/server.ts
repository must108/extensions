import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello, world!");
});

app.get("/api/weather", async (req, res) => {
    const city = req.query.city;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=imperial`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`response is not ok! ${response.status}`)
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("error fetching weather data: ", error);
        res.status(500).json({ error: "Internal Server Error "});
    }
});

app.listen(3000, () => console.log("Server running on port 3000..."));