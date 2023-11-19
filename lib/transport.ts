const nodemailer = require("nodemailer");

const mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: "ess.lockerreg.demo@gmail.com",
        pass: "cedbnwrlbfinhjry"
    }
})

const details = {
    from: "ess.lockerreg.demo@gmail.com",
    to: "oluwatoni.david45@gmail.com",
    subject: "test3",
    text: "This is a test3"
}

const info = mailTransporter.sendMail(details)

console.log(info)