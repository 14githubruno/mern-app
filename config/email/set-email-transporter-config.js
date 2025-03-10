/**
 * @function
 * Set Nodemailer transporter config.
 *
 * @returns {Object} Nodemailer transporter config object.
 */
const setEmailTransporterConfig = () => {
  const transporterConfig = {
    service: process.env.MAIL_SERVICE,
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: Boolean(process.env.MAIL_SECURE),
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    tls: {
      rejectUnauthorized: process.env.NODE_ENV === "production" ? true : false,
    },
  };

  return transporterConfig;
};

export { setEmailTransporterConfig };
