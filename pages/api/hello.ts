import { NextApiRequest, NextApiResponse } from "next";
import { mailOptions, transporter } from "../../config/nodemailer";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    transporter.sendMail({
      ...mailOptions,
      to: "oluwatoni.david45@gmail.com",
      subject: "test5",
      text: "This is a test5"
    })
    
  } catch (error) {
    console.error(error);
    
  }
  res.status(200).json({ name: "John Doe!!!" });
}
