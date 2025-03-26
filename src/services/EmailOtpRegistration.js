import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'faltufaltu929@gmail.com',
        pass: process.env.APP_PASSWORD, // Make sure APP_PASSWORD is set in .env
    },
});

const sendEmail = async (userEmail, otp) => {
    const mailOptions = {
        from: 'faltufaltu929@gmail.com',
        to: userEmail,  // Use the actual recipient email
        subject: 'Shobhit University Student Registration',
        text: `Thank you for Registration! Your OTP is ${otp}`,
    };

    try {
        const info = await transport.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error:', error);
    }
};

export default sendEmail
