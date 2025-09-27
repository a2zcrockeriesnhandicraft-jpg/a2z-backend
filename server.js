process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const express = require('express');
const sgMail = require('@sendgrid/mail'); // Import SendGrid
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Set the SendGrid API Key from the environment variables
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post('/send-order', (req, res) => {
    const { name, address, phone, email, orderDetails } = req.body;

    // Email content for SendGrid
    const msg = {
        to: 'a2zcrockeriesnhandicraft@gmail.com', // The email where you want to receive orders
        from: 'a2zcrockeriesnhandicraft@gmail.com', // IMPORTANT: See note below
        subject: `New Order from ${name}`,
        text: `You have a new order!

Customer Details:
Name: ${name}
Address: ${address}
Phone: ${phone}
Email: ${email}

${orderDetails}
        `
    };

    // Send the email using SendGrid
    sgMail.send(msg)
        .then(() => {
            console.log('Email sent successfully via SendGrid');
            return res.status(200).json({ message: 'Order received successfully!' });
        })
        .catch((error) => {
            console.error(error);
            if (error.response) {
                console.error(error.response.body)
            }
            return res.status(500).json({ message: 'Something went wrong.' });
        });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});