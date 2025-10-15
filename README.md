# email-otp-setup

@package: email-otp-setup
@maintainer: aryaanpanwar50

A *ready-to-use* Node.js package to send and verify OTPs via email without writing any `nodemailer` code. Perfect for authentication flows, password verification, or any feature that requires OTPs.

---

## Features ✨

- *Generate numeric OTPs* easily.
- *Send OTPs via email* without configuring `nodemailer` in your app.
- *Store and verify OTPs* (in-memory by default).
- *CLI setup* to generate a `.env` file automatically, or manual `.env` support.
- Works with *Node.js*, *Express*, and modern bundlers.

---

## Installation 📦

### Using npm

```bash
npm install email-otp-setup
```

### Using bun

```bash
bun add email-otp-setup
```

---

## CLI Setup ⚡

After installation you can configure your email credentials quickly:

```bash
npx email-otp-setup
```

If installed globally:

```bash
email-otp-setup
```

The CLI will prompt for:

- Email – *your email address*
- App Password – *the SMTP app password* ([Generate one here](https://myaccount.google.com/apppasswords?pli=1&rapt=AEjHL4M3SCSLf3lCDOxMjpamO3e2uEfGy4FH3b97C6XKGBr7c5fZ1aI5vB0pikVIexlpWi4AiG1cNyEtpq7H0Pz8-4sUQ5qXgnyo19BYMmvb98midL2mp8M))

It will then create a `.env` file in your project root with:

```
EMAIL=youremail@gmail.com
PASS=yourapppassword
```

You can also create the same `.env` file manually.

---

## Usage 💌

Import the functions you need:

```js
import { generateNumericOTP, storeOTP, verifyOTP, sendMail } from "email-otp-setup";
```

### Simple Email Sending

*It's not necessary to use OTPs!* You can use this package just to send regular emails:

```js
import { sendMail } from "email-otp-setup";

// Send a simple email without OTP
sendMail("My App", "user@example.com", "Welcome!", "Thanks for signing up!");
```

Functions (summary):

- `generateNumericOTP()` — Generates a random numeric OTP (default 6 digits).
- `storeOTP(email, otp)` — Stores the OTP for a given email (in-memory).
- `verifyOTP(email, otp)` — Verifies an OTP for a given email. Returns `true` if valid.
- `sendMail(sender, receiver, subject, content, otp)` — Sends an email to the recipient. *OTP parameter is optional* - omit it for regular emails. Uses credentials from `.env`.

### Example with Express

```js
import express from "express";
import { generateNumericOTP, storeOTP, verifyOTP, sendMail } from "email-otp-setup";

const app = express();
app.use(express.json());

// Generate OTP
const otp = generateNumericOTP();
storeOTP("aryaanpanwar@gmail.com", otp);

// Send OTP email
sendMail("MY APP", "aryaanpanwar@gmail.com", "OTP to VERIFY", "Here is your OTP:", otp);

console.log("The OTP -> ", otp);

// API endpoint to verify OTP
app.post("/verify", (req, res) => {
  const { email, otp } = req.body;
  const isValid = verifyOTP(email, otp);
  res.json({ valid: isValid });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

---

## Notes

- Make sure you set your email and app password in `.env`.
- OTPs are stored *in memory* by default; for production, integrate with a database or cache.
- This package works out-of-the-box with Express or any Node.js backend.

---

## Contributing 🤝

*Feel free to contribute!* We welcome:

- **Bug reports** and feature requests
- **Pull requests** for improvements or new features
- **Documentation** updates and examples
- **Testing** and feedback

To contribute:

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

