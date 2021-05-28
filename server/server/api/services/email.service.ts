import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';
import Mail from 'nodemailer/lib/mailer';

let transporter: Mail | undefined;

if (process.env.EMAIL_API_KEY && process.env.EMAIL_API_DOMAIN) {
  transporter = nodemailer.createTransport(
    mg({
      auth: {
        api_key: process.env.EMAIL_API_KEY,
        domain: process.env.EMAIL_API_DOMAIN,
      },
    })
  );

  transporter.verify((error, _success) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take our messages');
    }
  });
} else {
  console.warn('undef EMAIL_API_KEY');
}

export default (recepient: string, subject: string, html: string): void => {
  if (transporter) {
    transporter.sendMail(
      {
        from: 'tiketin@noreply-tiketin.com',
        to: recepient,
        subject: subject,
        html: html,
      },
      (err, _info) => {
        if (err) {
          console.log(err);
          throw new Error('email not sent');
        } else {
          console.log('Successfully sent email.');
        }
      }
    );
  } else {
    throw new Error('email transporter undef');
  }
};
