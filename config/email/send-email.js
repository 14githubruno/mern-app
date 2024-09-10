import nodemailer from "nodemailer";
import { setEmailTransporterConfig } from "./set-email-transporter-config.js";
import { throwError } from "../../lib/throw-error.js";
import User from "../../models/user-model.js";

const sendEmail = async (forRegistration, res, to, subject, text) => {
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
    //delete unverified user during registration if email is not sent
    if (forRegistration) {
      try {
        const deletedUser = await User.findOneAndDelete(
          { email: to },
          { new: true }
        );
        if (deletedUser)
          return throwError(res, "Email sending error. Try again");
      } catch (error) {
        console.error(error);
        return throwError(res, "Try again with another email");
      }
    }
  }
};

export { sendEmail };
