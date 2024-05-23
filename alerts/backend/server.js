
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const mysql = require('mysql');
const schedule = require('node-schedule');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const activeOTPs = {};

// Database connection configuration
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Lekha.123",
  database: "mediproj",
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database!");
});

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'lekharavalipaladugu1234@gmail.com',
    pass: 'xvnvzbtmuomkprqx',
  },
});

// Function to generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

// Endpoint to send OTP via email
app.post('/send-otp', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required in the request body' });
  }

  const otp = generateOTP();
  const mailOptions = {
    from: 'lekharavalipaladugu1234@gmail.com',
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP for email verification is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('OTP sent successfully:', otp);

    activeOTPs[email] = otp.toString();

    res.status(200).json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

// Endpoint to verify OTP
app.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  console.log(email)
  console.log(otp)
  if (!email || !otp) {
    return res.status(400).json({ error: 'Email and OTP are required' });
  }
  console.log(activeOTPs)

  const storedOTP = activeOTPs[email].trim();
  const submittedOTP = otp.toString().trim();
  if (!storedOTP || storedOTP !== submittedOTP) {
    console.log("Invalid otp")
    return res.status(400).json({ error: 'Invalid OTP. Please enter the correct OTP' });
  }
  console.log("otpverification success")

  delete activeOTPs[email]; // Clear the OTP from activeOTPs after successful verification

  res.status(200).json({ success: true, message: 'OTP verification successful' });
});

app.post('/save-user', (req, res) => {
  const { email, name, password, mobileNumber } = req.body;

  if (!name || !email || !password || !mobileNumber) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Check if the user with the same email or name already exists
  db.query('SELECT * FROM register WHERE email = ? OR name = ?', [email, name], (error, results) => {
    if (error) {
      console.error("Error checking email or name:", error);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length > 0) {
      const existingUser = results.find(user => user.email === email);
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      } else {
        return res.status(400).json({ error: "Name already exists" });
      }
    }

    // Insert new user into the register table
    db.query(
      'INSERT INTO register (email, password, name, mobile_number) VALUES (?, ?, ?, ?)',
      [email, password, name, mobileNumber],
      (error, result) => {
        if (error) {
          console.error("Error inserting user data:", error);
          return res.status(500).json({ error: "Internal server error" });
        }

        console.log("User data inserted successfully:", result);
        res.status(200).json({ success: true, message: "User registered successfully" });
      }
    );
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  // Query the database to check if the user exists with the provided email and password
  db.query('SELECT * FROM register WHERE name = ? AND password = ?', [username, password], (error, results) => {
    if (error) {
      // console.error("Error checking login credentials:", error);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // User found, login successful
    res.status(200).json({ success: true, message: "Login successful" });
  });
});

app.post('/requests', (req, res) => {
  const { sender_name, receiver_name } = req.body;

  // Check if the receiver's name exists in the register table
  db.query('SELECT name FROM register WHERE name = ?', [receiver_name], (err, rows) => {
    if (err) {
      // console.error('Error checking user:', err);
      res.status(500).json({ success: false, message: 'Internal server error.' });
      return;
    }

    if (rows.length > 0) {
      // If receiver exists, insert the request details into the requests table
      db.query('INSERT INTO requests (sender_name, receiver_name) VALUES (?, ?)', [sender_name, receiver_name], (err) => {
        if (err) {
          // console.error('Error sending request:', err);
          res.status(500).json({ success: false, message: 'Failed to send request.' });
        } else {
          // console.log('Request sent successfully:', { sender_name, receiver_name });
          res.status(200).json({ success: true, message: 'Request sent successfully!' });
        }
      });
    } else {
      // If receiver does not exist, send user not found message
      // console.log('User not found:', receiver_name);
      res.status(404).json({ success: false, message: 'User not found.' });
    }
  });
});

app.get('/requestsfe', (req, res) => {
  const { receiver_name } = req.query;

  db.query('SELECT sender_name FROM requests WHERE receiver_name = ?', [receiver_name], (err, rows) => {
    if (err) {
      console.error('Error fetching requests:', err);
      res.status(500).json({ success: false, message: 'Internal server error.' });
      return;
    }

    res.status(200).json({ success: true, requests: rows });
  });
});

// Accept request
app.post('/requestsfe/accept', (req, res) => {
  const { sender_name, receiver_name } = req.body;

  db.query('DELETE FROM requests WHERE sender_name = ? AND receiver_name = ?', [sender_name, receiver_name], (err) => {
    if (err) {
      console.error('Error deleting request:', err);
      res.status(500).json({ success: false, message: 'Internal server error.' });
      return;
    }

    db.query('INSERT INTO friends (user1, user2) VALUES (?, ?)', [sender_name, receiver_name], (err) => {
      if (err) {
        console.error('Error inserting into friends:', err);
        res.status(500).json({ success: false, message: 'Internal server error.' });
        return;
      }

      res.status(200).json({ success: true, message: 'Request accepted successfully!' });
    });
  });
});

// Reject request
app.post('/requestsfe/reject', (req, res) => {
  const { sender_name, receiver_name } = req.body;

  db.query('UPDATE requests SET status = "rejected" WHERE sender_name = ? AND receiver_name = ?', [sender_name, receiver_name], (err) => {
    if (err) {
      console.error('Error rejecting request:', err);
      res.status(500).json({ success: false, message: 'Internal server error.' });
      return;
    }

    res.status(200).json({ success: true, message: 'Request rejected successfully!' });
  });
});

const getRequestHistoryForSender = async (senderName) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT receiver_name, status FROM requests WHERE sender_name = ?', [senderName], (error, results) => {
      if (error) {
        console.error('Error fetching request history:', error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

app.get('/request-history/:senderName', async (req, res) => {
  const senderName = req.params.senderName;
  try {
    // Fetch the request history from the database
    const requests = await getRequestHistoryForSender(senderName);
    res.json({ requests });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to delete a request by sender_name and receiver_name
app.delete('/deleterequests', (req, res) => {
  const { sender_name, receiver_name } = req.body;

  db.query('DELETE FROM requests WHERE sender_name = ? AND receiver_name = ?', [sender_name, receiver_name], (err) => {
    if (err) {
      console.error('Error deleting request:', err);
      res.status(500).json({ success: false, message: 'Internal server error.' });
      return;
    }

    res.status(200).json({ success: true, message: 'Request deleted successfully!' });
  });
});

app.get('/friends', (req, res) => {
  const { username } = req.query;

  db.query('SELECT user1 AS name FROM friends WHERE user2 = ? UNION SELECT user2 AS name FROM friends WHERE user1 = ?', [username, username], (err, rows) => {
    if (err) {
      console.error('Error fetching friends:', err);
      res.status(500).json({ success: false, message: 'Internal server error.' });
      return;
    }

    res.status(200).json({ success: true, friends: rows });
  });
});

// Create reminder
app.post('/reminders', (req, res) => {
  const { sender_name, receiver_name, message, date_time } = req.body;

  db.query('SELECT email FROM register WHERE name = ?', [receiver_name], (err, rows) => {
    if (err) {
      console.error('Error fetching receiver email:', err);
      res.status(500).json({ success: false, message: 'Internal server error' });
      return;
    }

    if (rows.length === 0) {
      res.status(404).json({ success: false, message: 'Receiver not found.' });
      return;
    }

    const receiver_email = rows[0].email;

    db.query('INSERT INTO reminders (sender_name, receiver_name, message, date_time, status) VALUES (?, ?, ?, ?, ?)', [sender_name, receiver_name, message, date_time, 'pending'], (err, result) => {
      if (err) {
        console.error('Error creating reminder:', err);
        res.status(500).json({ success: false, message: 'Failed to create reminder.' });
        return;
      }

      const reminderId = result.insertId;
      const reminderDate = new Date(date_time);

      schedule.scheduleJob(reminderDate, () => {
        const mailOptions = {
          from: 'lekharavalipaladugu1234@gmail.com',
          to: receiver_email,
          subject: 'Reminder Notification',
          text: message,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
          } else {
            console.log('Reminder email sent:', info.response);
            // Update the status to "sent" after email is successfully sent
            db.query('UPDATE reminders SET status = ? WHERE id = ?', ['sent', reminderId], (err) => {
              if (err) {
                console.error('Error updating reminder status:', err);
              } else {
                console.log('Reminder status updated to sent');
              }
            });
          }
        });
      });

      res.status(200).json({ success: true, message: 'Reminder created successfully!' });
    });
  });
});

app.get('/reminders', (req, res) => {
  const { username } = req.query;

  if (!username) {
    console.error('Username is required to fetch reminders');
    return res.status(400).json({ success: false, message: 'Username is required' });
  }

  db.query('SELECT id, receiver_name, message, date_time AS reminder_time, status FROM reminders WHERE sender_name = ?', [username], (err, rows) => {
    if (err) {
      console.error('Error fetching reminders:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }

    res.status(200).json({ success: true, reminders: rows });
  });
});

app.post('/expiry-alerts', (req, res) => {
  const { expiry_date } = req.body;
  const username = req.body.username;

  if (!username || !expiry_date) {
    return res.status(400).json({ error: "Username and expiry date are required" });
  }

  db.query('SELECT email FROM register WHERE name = ?', [username], (error, results) => {
    if (error) {
      console.error("Error fetching email:", error);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const email = results[0].email;
    const daysLeft = Math.ceil((new Date(expiry_date) - new Date()) / (1000 * 60 * 60 * 24));

    db.query(
      'INSERT INTO expiry_alerts (username, expiry_date, days_left) VALUES (?, ?, ?)',
      [username, expiry_date, daysLeft],
      (error, result) => {
        if (error) {
          console.error("Error inserting expiry alert:", error);
          return res.status(500).json({ error: "Internal server error" });
        }

        console.log("Expiry alert inserted successfully:", result);
        res.status(200).json({ success: true, message: "Expiry alert added successfully" });
      }
    );
  });
});

app.get('/expiry-alerts/:username', (req, res) => {
  const username = req.params.username;

  db.query('SELECT * FROM expiry_alerts WHERE username = ?', [username], (error, results) => {
    if (error) {
      console.error("Error fetching expiry alerts:", error);
      return res.status(500).json({ error: "Internal server error" });
    }

    res.status(200).json({ success: true, alerts: results });
  });
});

const sendReminderEmail = (email, username, daysLeft) => {
  const mailOptions = {
    from: 'lekharavalipaladugu1234@gmail.com',
    to: email,
    subject: 'Expiry Alert Reminder',
    text: `Hello ${username},\n\nYour item is set to expire in ${daysLeft} days.\n\nBest regards,\nExpiry Alerts Team`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error('Error sending reminder email:', error);
    }
    console.log('Reminder email sent:', info.response);
  });
};

const checkExpiryAlerts = () => {
  db.query('SELECT * FROM expiry_alerts', (error, results) => {
    if (error) {
      return console.error('Error fetching expiry alerts:', error);
    }

    results.forEach((alert) => {
      const daysLeft = Math.ceil((new Date(alert.expiry_date) - new Date()) / (1000 * 60 * 60 * 24));
      if (daysLeft > 0 && daysLeft <= 10) {
        db.query('SELECT email FROM register WHERE name = ?', [alert.username], (error, results) => {
          if (error) {
            return console.error('Error fetching email:', error);
          }

          const email = results[0].email;
          sendReminderEmail(email, alert.username, daysLeft);
          db.query('UPDATE expiry_alerts SET days_left = ? WHERE id = ?', [daysLeft, alert.id]);
        });
      } else if (daysLeft <= 0) {
        db.query('DELETE FROM expiry_alerts WHERE id = ?', [alert.id]);
      }
    });
  });
};

schedule.scheduleJob('0 0 * * *', checkExpiryAlerts);
// Start the server
const PORT = 3004;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

