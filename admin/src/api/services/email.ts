import nodemailer from "nodemailer";
let emailClient = {
    email: "@outlook.com",
    password: "Qw3rty###",
};

function sendEmail(to: string, otp: Number) {
    const transporter = nodemailer.createTransport({
        service: "outlook",
        auth: {
            user: emailClient.email,
            pass: emailClient.password,
        },
    });
    const options = {
        from: emailClient.email,
        to: to,
        subject: "CourseHub Admin Login",
        text: "Your OTP is " + otp,
    };
    transporter.sendMail(options, function (err, info) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("Sent", info.response);
    });
}

export default sendEmail;
