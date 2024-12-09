// pkgs
import nodemailer from "nodemailer";

// lib
import { setEmailTransporterConfig } from "./set-email-transporter-config.js";
import { throwError } from "../../lib/throw-error.js";

/**
 * @async
 * @function
 * To send emails.
 *
 * (Uses Nodemailer)
 *
 * @param {Response} res - The Express response object.
 * @param {string} to - The user email address to which send the email.
 * @param {string} subject - The email subject.
 * @param {string} text - The email body text.
 *
 * @returns {Promise<void>} Resolves when the email is sent successfully, or rejects with an error.
 * @throws Error if sending email fails
 */
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
    console.error(err);
    throwError(res, 500, "Try again with another email");
  }
};

export { sendEmail };
