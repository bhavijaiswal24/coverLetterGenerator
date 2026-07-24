require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();


// CORS
const corsOptions = {
    origin: "https://cover-letter-generator-inky.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
};


// Apply CORS before routes
app.use(cors(corsOptions));


// Handle all preflight requests
app.use((req, res, next) => {
    if (req.method === "OPTIONS") {
        res.header(
            "Access-Control-Allow-Origin",
            "https://cover-letter-generator-inky.vercel.app"
        );
        res.header(
            "Access-Control-Allow-Methods",
            "GET,POST,PUT,DELETE,OPTIONS"
        );
        res.header(
            "Access-Control-Allow-Headers",
            "Content-Type, Authorization"
        );
        return res.sendStatus(200);
    }

    next();
});


app.use(express.json());


// Routes
const aiRoutes = require("./routes/aiRoutes");

app.use("/api", aiRoutes);


// Test route
app.get("/", (req, res) => {
    res.send("Cover Letter Generator Backend Running 🚀");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});