import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("trust proxy", true);
app.use(express.json());


const contactLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 2,
    message: {
        success: false,
        msg: "Too many requests. Try again after 1 hour."
    },
    standardHeaders: true,
    legacyHeaders: false,
});
let i = 1
console.log('request no', i++)

app.post("/api/contact", contactLimiter, async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message)
            return res.status(400).json({ success: false, msg: "All fields required" });

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
            to: process.env.RECEIVER_EMAIL,
            subject: `New Contact Message from ${name}`,
            html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `
        });

        res.json({ success: true, msg: "Message Sent Successfully" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: "Something went wrong" });
    }
});



const buildPath = path.join(__dirname, "dist");
app.use(express.static(buildPath));



app.listen(5000, () => console.log("Server running on port 5000"));
