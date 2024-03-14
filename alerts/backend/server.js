const express = require("express");
const mysql = require("mysql");
const cors = require("cors"); // Import the cors middleware

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Lekha.123",
  database: "mediproj",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database!");
});

// Define GET handler for the root URL
app.get("/", (req, res) => {
  res.send("Welcome to the application!");
});

// Define POST handler for creating an account
app.post("/create-account", (req, res) => {
  const { name, password, email, mobile_number } = req.body;

  // Basic input validation
  if (!name || !password || !email || !mobile_number) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Additional validation logic (e.g., password strength, email format) can be added here

  // Check if the email already exists in the database
  db.query(
    "SELECT * FROM register WHERE email = ?",
    [email],
    (error, result) => {
      if (error) {
        console.error("Error checking email:", error);
        return res.status(500).json({ error: "Internal server error" });
      }

      // If email already exists, send an error response
      if (result.length > 0) {
        return res.status(400).json({ error: "Email already exists" });
      }

      // Insert new user data into the database
      db.query(
        "INSERT INTO register (email, password, name, mobile_number) VALUES (?, ?, ?, ?)",
        [email, password, name, mobile_number],
        (error, result) => {
          if (error) {
            console.error("Error inserting data:", error);
            return res.status(500).json({ error: "Internal server error" });
          }
          console.log("Data inserted successfully!");
          res.status(200).json({ message: "User registered successfully!" });
        }
      );
    }
  );
});

// Start the server and listen on port 3004
app.listen(3004, () => {
  console.log("Server listening on port 3004");
});
