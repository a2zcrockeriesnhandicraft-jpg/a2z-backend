process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors()); // Allows your front-end to communicate with this back-end
app.use(bodyParser.json()); // Parses incoming JSON data

// POST route to handle order submissions
app.post('/send-order', (req, res) => {
    const { name, address, phone, email, orderDetails } = req.body;

    // Set up the email transporter using your Gmail account
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'a2zcrockeriesnhandicraft@gmail.com', // **REPLACE WITH YOUR GMAIL ADDRESS**
            pass: 'yvuqyllmmgtzxubl' // **REPLACE WITH YOUR APP PASSWORD**
        }
    });

    // Email content
    const mailOptions = {
        from: 'a2zcrockeriesnhandicraft@gmail.com', // Sender address
        to: 'a2zcrockeriesnhandicraft@gmail.com', // List of receivers (you)
        subject: `New Order from ${name}`, // Subject line
        text: `You have a new order!

Customer Details:
Name: ${name}
Address: ${address}
Phone: ${phone}
Email: ${email}

${orderDetails}
        `
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: 'Something went wrong.' });
        }
        console.log('Email sent: ' + info.response);
        return res.status(200).json({ message: 'Order received successfully!' });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});