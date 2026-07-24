require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();


const corsOptions = {
    origin: "https://cover-letter-generator-inky.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
};


// Handle OPTIONS before routes
app.use(cors(corsOptions));
app.options("/api/generate", cors(corsOptions));


app.use(express.json());


// Routes
const aiRoutes = require("./routes/aiRoutes");

app.use("/api", aiRoutes);


app.get("/", (req, res) => {
    res.send("Cover Letter Generator Backend Running 🚀");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});