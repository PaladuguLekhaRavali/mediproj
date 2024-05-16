// // const express = require('express');
// // const bodyParser = require('body-parser');
// // const cors = require('cors');
// // const nodemailer = require('nodemailer');
// // const mysql = require('mysql');

// // const app = express();
// // app.use(cors());
// // app.use(bodyParser.json());
// // app.use(bodyParser.urlencoded({ extended: true }));
// // const activeOTPs={}


// // // Database connection configuration
// // const db = mysql.createConnection({
// //   host: "localhost",
// //   user: "root",
// //   password: "Lekha.123",
// //   database: "mediproj",
// // });

// // // Connect to the database
// // db.connect((err) => {
// //   if (err) {
// //     console.error("Error connecting to the database:", err);
// //     return;
// //   }
// //   console.log("Connected to the database!");
// // });

// // // Route to handle root endpoint
// // app.get("/", (req, res) => {
// //   res.send("Welcome to the application!");
// // });

// // // Nodemailer transporter configuration
// // const transporter = nodemailer.createTransport({
// //   host: 'smtp.gmail.com',
// //   port: 587,
// //   secure: false, // false for other ports
// //   auth: {
// //     user: 'lekharavalipaladugu1234@gmail.com', // Sender's Gmail address
// //     pass: 'xvnv zbtm uomk prqx', // App-specific password or Gmail password
// //   },
// // });


// // // Function to generate a random 6-digit OTP
// // const generateOTP = () => {
// //   return Math.floor(100000 + Math.random() * 900000);
// // };

// // // Route to send OTP via email using POST request
// // app.post('/send-otp', async (req, res) => {
// //   const { email } = req.body; // Extract email from request body

// //   if (!email) {
// //     return res.status(400).json({ error: 'Email is required in the request body' });
// //   }

// //   const otp = generateOTP();
// //   const mailOptions = {
// //     from: 'lekharavalipaladugu1234@gmail.com',
// //     to: email,
// //     subject: 'OTP Verification',
// //     text: `Your OTP for email verification is: ${otp}`,
// //   };

// //   try {
// //     // Send OTP email
// //     await transporter.sendMail(mailOptions);
// //     console.log('OTP sent successfully:', otp);

// //     // Store OTP in a temporary object (can be replaced with a more secure storage)
// //     activeOTPs[email] = otp;

// //     // Respond with success message
// //     res.status(200).json({ success: true, message: 'OTP sent successfully' });
// //   } catch (error) {
// //     console.error('Error sending email:', error);
// //     res.status(500).json({ error: 'Failed to send OTP' });
// //   }
// // });


// // app.post('/verify-otp', (req, res) => {
// //   const { email, otp } = req.body;
// //   console.log(email)
  
// //   console.log(otp)
// //   console.log(activeOTPs)

// //   if (!email || !otp) {
// //     return res.status(400).json({ error: 'Email and OTP are required' });
// //   }

// //   if (!activeOTPs[email] || activeOTPs[email] !== parseInt(otp)) {
// //     return res.status(400).json({ error: 'Invalid OTP. Please enter the correct OTP' });
// //   }

// //   // Clear the OTP from activeOTPs after successful verification
// //   delete activeOTPs[email];

// //   res.status(200).json({ success: true, message: 'OTP verification successful' });
// // });


// // app.post("/save-user", (req, res) => {
// //   console.log("enter into save user");
// //   console.log(req.body)
// //   const { name, password, email, mobile_number } = req.body;

// //   console.log(req.body); // Log the request body to check the data received

// //   if (!name || !password || !email || !mobile_number) {
// //     return res.status(400).json({ error: "All fields are required" });
// //   }

// //   // Check if email already exists in the database
// //   db.query(
// //     "SELECT * FROM register WHERE email = ?",
// //     [email],
// //     (error, result) => {
// //       if (error) {
// //         console.error("Error checking email:", error);
// //         return res.status(500).json({ error: "Internal server error" });
// //       }

// //       if (result.length > 0) {
// //         return res.status(400).json({ error: "Email already exists" });
// //       }

// //       // Insert new user into the database
// //       db.query(
// //         "INSERT INTO register (email, password, name, mobile_number) VALUES (?,?,?,?)",
// //         [email, password, name, mobile_number],
// //         (error, result) => {
// //           if (error) {
// //             console.error("Error inserting data:", error);
// //             return res.status(500).json({ error: "Internal server error" });
// //           }

// //           console.log("Data inserted successfully!");

// //           // Redirect to verify-otp page upon successful registration
// //           res.status(200).json({ redirectUrl: "/verifyotp" });
// //         }
// //       );
// //     }
// //   );
// // });

// // // Server listening on port 3004
// // app.listen(3004, () => {
// //   console.log("Server listening on port 3004");
// // });