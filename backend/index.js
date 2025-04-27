const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 5000;

// ✅ Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ MongoDB Connection URI
const uri = "mongodb+srv://avin:avin@cluster0.fhxczjk.mongodb.net/mytest?retryWrites=true&w=majority";
// app.use(express.static('uploads'));
app.use('/uploads', express.static('uploads'));
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const db = mongoose.connection;
db.on("error", (err) => console.error("MongoDB Connection Error:", err));
db.once("open", () => console.log("✅ Connected to MongoDB"));

// ✅ Define Schema (Fixed Timestamp Issue)

const control_unit = new mongoose.Schema({
  fan: Boolean,
  aeration: Boolean,
  heat_sink: Boolean,
  light: Boolean,
  light2: Boolean,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const ControlUnit = mongoose.model("ControlUnit", control_unit);

const sensorDataSchema = new mongoose.Schema(
  {
    solar_voltage: Number,
    turbidity: Number,
    ldr_state: String, // "0" is a string in your data
    ph: Number,
    co2_ppm: Number,
    temperature: Number,
    humidity: Number,
    temp_DS18B20: Number,
    oxygen_concentration: Number,
    particle_0_3um: Number,
    particle_0_5um: Number,
    particle_1_0um: Number,
    particle_2_5um: Number,
    particle_5_0um: Number,
    particle_10um: Number,
    timestamp: { type: Date, default: Date.now },
  },
  { collection: "sensor_database" }
);


const SensorData = mongoose.model("SensorData", sensorDataSchema);

// ✅ Ensure 'uploads' folder exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Multer Storage Config (File Upload)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  },
});
const upload = multer({ storage });

// ✅ Route: Upload Media File
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: "No file uploaded" });
  }
  const fileUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
  res.json({
    success: true,
    message: "File uploaded successfully",
    filePath: fileUrl,
  });
});

// ✅ Route: Send Custom Message
app.post("/custom-message", (req, res) => {
  const { message } = req.body;
  if (!message || message.trim() === "") {
    return res.status(400).json({ success: false, error: "Message cannot be empty" });
  }
  res.json({
    success: true,
    message: "Custom message received successfully",
    text: message,
  });
  console.log(message);
});
app.post("/control", async (req, res) => {
  const obj = req.body;
  console.log(obj);

  // Extract key-value pairs from the request
  const key = Object.keys(obj)[0];
  const value = Object.values(obj)[0];

  // try {
  //   const result = await ControlUnit.findOneAndUpdate(
  //     {},                             
  //     { $set: { [key]: value } },     
  //     { upsert: true, new: true }     
  //   );

  //   console.log("✅ Control obj updated:", result);
  //   res.json({ success: true, message: "Control obj updated", obj });
  // } catch (error) {
  //   console.error("❌ Error saving control data:", error);
  //   res.status(500).json({ error: "Failed to save data" });
  // }
});


// ✅ Route: Get Latest Sensor Data (Fixed)
app.get("/sensor/data", async (req, res) => {
  try {
    const latestData = await SensorData.findOne().sort({ timestamp: -1 }).lean(); // ✅ Sort by timestamp

    if (!latestData) {
      return res.status(404).json({ error: "No data found" });
    }

    console.log("✅ Sending Data:", latestData);

    res.json({
      solar_voltage: latestData.solar_voltage ?? null,
      turbidity: latestData.turbidity ?? null,
      ldr_state: latestData.ldr_state ?? null,
      ph: latestData.ph ?? null,
      co2: latestData.co2_ppm ?? null,
      temperature: latestData.temperature ?? null,
      humidity: latestData.humidity ?? null,
      temp_DS18B20: latestData.temp_DS18B20 ?? null,
      oxygen_concentration: latestData.oxygen_concentration ?? null,
      pm0_3: latestData.particle_0_3um ?? null,
      pm0_5: latestData.particle_0_5um ?? null,
      pm1_0: latestData.particle_1_0um ?? null,
      pm2_5: latestData.particle_2_5um ?? null,
      pm5_0: latestData.particle_5_0um ?? null,
      pm10: latestData.particle_10um ?? null,
      timestamp: latestData.timestamp, // ✅ Proper Date object
    });
  } catch (error) {
    console.error("❌ Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data from MongoDB" });
  }
});


// ✅ Route: Post Sensor Data (Fixed)
app.post("/sensor/data", async (req, res) => {
  try {
    const incomingData = req.body;

    // ✅ Convert timestamp to a Date object (Fix)
    const formattedData = {
      solar_voltage: incomingData.solar_voltage || null,
      turbidity: incomingData.turbidity || null,
      ldr_state: incomingData.ldr_state || null,
      ph: incomingData.ph || null,
      co2_ppm: incomingData.co2_ppm || null,
      temperature: incomingData.temperature || null,
      humidity: incomingData.humidity || null,
      temp_DS18B20: incomingData.temp_DS18B20 || null,
      oxygen_concentration: incomingData.oxygen_concentration || null,
      airQuality: {
        pm1_0: incomingData.particle_1_0um || 0,
        pm2_5: incomingData.particle_2_5um || 0,
        pm10: incomingData.particle_10um || 0,
      },
      timestamp: incomingData.timestamp ? new Date(incomingData.timestamp) : new Date() // ✅ Convert to Date
    };

    console.log("✅ Saving Data:", formattedData);

    const sensorEntry = new SensorData(formattedData);
    await sensorEntry.save();

    res.status(201).json({ success: true, message: "Sensor data saved", data: formattedData });
  } catch (error) {
    console.error("❌ Error saving sensor data:", error);
    res.status(500).json({ error: "Failed to save data" });
  }
});


app.post('/control/unit', async(req, res) => {
  // Log the received control states
  console.log('Received control states:');
  console.log("✅ Saving Data:", req.body);

    const controlEntry = new ControlUnit(req.body);
    await controlEntry.save();
  
  // Send success response
  res.json({ success: true });
});


// ✅ Serve Uploaded Files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
