const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Basic email format validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

app.post("/api/tailor-resume", async (req, res) => {
  const { name, email, resumeText, jobDescription } = req.body;

  // Check if email is valid
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email format." });
  }

  try {
    // Combine user inputs into a formatted string
    const emailContent = `
      Name: ${name}
      Email: ${email}
      
      Resume Text:
      ${resumeText}
      
      Job Description:
      ${jobDescription}
    `;

    // Send email
    await sendEmail(email, emailContent);

    res.status(200).json({ message: "Details sent via email successfully." });
  } catch (error) {
    console.error("Error sending email:", error);

    // Handle specific SMTP errors
    if (error.responseCode === 550) {
      res
        .status(400)
        .json({ error: "The recipient email address does not exist." });
    } else {
      res.status(500).json({ error: "Failed to send email." });
    }
  }
});

// Health check route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is working!" });
});

// Email function
async function sendEmail(email, content) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Details Confirmation",
    text: content,
  });
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
