import nodemailer from "nodemailer";

const testAccount = await nodemailer.createTestAccount();
var transport = nodemailer.createTransport({
  host: testAccount.smtp.host,
  port: testAccount.smtp.port,
  secure: testAccount.smtp.secure,
  auth: {
    user: testAccount.user,
    pass: testAccount.pass,
  },
});

export default transport;
