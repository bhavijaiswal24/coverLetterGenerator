require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();


// CORS Configuration
const corsOptions = {
    origin: "https://cover-letter-generator-inky.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options(/.*/, cors(corsOptions));


// Middleware
app.use(express.json());


// Routes
const aiRoutes = require("./routes/aiRoutes");

app.use("/api", aiRoutes);


// Test API
app.get("/", (req, res) => {
    res.send("Cover Letter Generator Backend Running 🚀");
});


// Server Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});