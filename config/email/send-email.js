import nodemailer from "nodemailer";
import { setEmailTransporterConfig } from "./set-email-transporter-config.js";
import { throwError } from "../../lib/throw-error.js";

const sendEmail = async (res, to, subject, text) => {
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
    return throwError(res, "Email sending error. Try again");
  }
};

export { sendEmail };
