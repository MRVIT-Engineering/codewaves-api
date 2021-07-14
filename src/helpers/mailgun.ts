const mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

const FROM = 'Codewaves Team <modure_rares@mrv-it.com>';

export const sendConfirmationLink = (id: string, email: string) => {
  const data: any = {
    from: FROM,
    to: email,
    subject: 'Confirm Your Account',
    template: 'codewaves-account-confirmation',
  };
  data['h:X-Mailgun-Variables'] = JSON.stringify({ id });

  mailgun.messages().send(data, (error: any, body: any) => {
    // eslint-disable-next-line
    console.log(body);
  });
};
