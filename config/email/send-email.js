import nodemailer from "nodemailer";
import { setEmailTransporterConfig } from "./set-email-transporter-config.js";

const sendEmail = async (to, subject, text) => {
  console.log(to);
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: process.env.TEST_MAIL, // will be replaced by to
    subject,
    text,
  };

  const transporterConfig = setEmailTransporterConfig();
  const transporter = nodemailer.createTransport(transporterConfig);

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(info.envelope);
  } catch (err) {
    console.error("Error sending email:", err);
  }
};

export { sendEmail };
