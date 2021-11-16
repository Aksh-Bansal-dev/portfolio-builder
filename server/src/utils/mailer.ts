import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
export const mailer = async (
  email: string,
  confirmationLink: string,
  username: string
): Promise<void> => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: process.env.GMAIL_ID,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GMAIL_REFRESH_TOKEN,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.GMAIL_ID, // sender address
    to: email, // list of receivers
    subject: "Please confirm your Email account", // Subject line
    html:
      `Hello ${username},<br> We're happy you signed up for Portfolio Builder.
      To start exploring our website, please confirm your email address.<br><a href=` +
      confirmationLink +
      ">Click here to verify</a><br>Thank You,<br>Portfolio Builder Team", // html body
  });
  console.log(`Email sent to ${email}!`);
  console.log(info);
};
