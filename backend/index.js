const express = require("express");
const bodyParser = require("body-parser");
const fileType = require("file-type");

const app = express();
app.use(bodyParser.json({ limit: "10mb" }));

const PORT = 3000;
app.use(cors());
// Helper function to check if a number is prime
const isPrime = (num) => {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

// Helper function to handle file validation
const validateFile = (fileB64) => {
  if (!fileB64) return { fileValid: false, mimeType: null, sizeKB: null };
  try {
    const buffer = Buffer.from(fileB64, "base64");
    const mime = fileType(buffer);
    if (mime) {
      return {
        fileValid: true,
        mimeType: mime.mime,
        sizeKB: (buffer.length / 1024).toFixed(2),
      };
    }
  } catch (err) {
    return { fileValid: false, mimeType: null, sizeKB: null };
  }
  return { fileValid: false, mimeType: null, sizeKB: null };
};

// POST /bfhl endpoint
app.post("/bfhl", (req, res) => {
  const { data, file_b64 } = req.body;

  if (!data || !Array.isArray(data)) {
    return res
      .status(400)
      .json({ is_success: false, message: "Invalid data format" });
  }

  const numbers = [];
  const alphabets = [];
  let highestLowercase = null;
  let primeFound = false;

  // Process data array
  data.forEach((item) => {
    if (!isNaN(item)) {
      const num = parseInt(item, 10);
      numbers.push(num);
      if (isPrime(num)) primeFound = true;
    } else if (/^[a-zA-Z]$/.test(item)) {
      alphabets.push(item);
      if (
        item === item.toLowerCase() &&
        (!highestLowercase || item > highestLowercase)
      ) {
        highestLowercase = item;
      }
    }
  });

  // Validate file
  const { fileValid, mimeType, sizeKB } = validateFile(file_b64);

  // Respond with processed data
  res.json({
    is_success: true,
    user_id: "john_doe_17091999", // Replace with dynamic values if needed
    email: "john@xyz.com",
    roll_number: "ABCD123",
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
    is_prime_found: primeFound,
    file_valid: fileValid,
    file_mime_type: mimeType,
    file_size_kb: sizeKB,
  });
});

// GET /bfhl endpoint
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
