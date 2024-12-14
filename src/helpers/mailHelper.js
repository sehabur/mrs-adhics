import { createTransport } from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";

function createNodeMailerTransport() {
  const transporter = createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    })
  );
  return transporter;
}

export async function sendOtpMailToUser(mailTo, otp) {
  const transporter = createNodeMailerTransport();

  const subject = "Account Creation OTP - MRS";

  const mailBody = `<html><body><h3>New Account Creation</h3><p>Use the below OTP for account creration.</p><h1>${otp}</h1><br/><p>If you face any difficulties or need any assistance please contact us at <a href="mailto:kuetianshub@gmail.com">kuetianshub@gmail.com</a></p></body></html>`;

  try {
    return await transporter.sendMail({
      from: {
        name: "MRS-Test",
        address: "kuetianshub@gmail.com",
      },
      to: mailTo,
      subject,
      html: mailBody,
    });
  } catch (err) {
    return err;
  }
}

export async function sendMailToUser(mailTo, subject, mailBody) {
  const transporter = createNodeMailerTransport();

  try {
    return await transporter.sendMail({
      from: {
        name: "MRS-Test",
        address: "kuetianshub@gmail.com",
      },
      to: mailTo,
      subject,
      html: mailBody,
    });
  } catch (err) {
    return err;
  }
}
