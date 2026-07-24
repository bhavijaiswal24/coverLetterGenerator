require("dotenv").config();
const express = require("express");
const cors = require("cors");


const app = express();

app.use(cors());
app.use(express.json());

// Import Routes
const aiRoutes = require("./routes/aiRoutes");

// Test Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "AI Cover Letter Generator Backend Running 🚀"
    });
});

// API Routes
app.use("/api", aiRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});