const mailgun = require("mailgun-js")({
  apiKey: process.env.MAILGUN_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

const FROM = "Codewaves Team <modure_rares@mrv-it.com>";

export const sendConfirmationLink = (id: string, email: string) => {
  var data = {
    from: FROM,
    to: email,
    subject: "Confirm Your Account",
    template: "codewaves-account-confirmation",
    "h:X-Mailgun-Variables": JSON.stringify({
      id,
    }),
  };

  mailgun.messages().send(data, function (error: any, body: any) {
    console.log(body);
  });
};
