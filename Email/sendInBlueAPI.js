var SibApiV3Sdk = require('sib-api-v3-sdk');
var defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SENDINBLUE_API;

export default function sendInBlue(sendSmtpEmail){

    var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    var sendSmtpEmail_ = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email

    sendSmtpEmail_ = sendSmtpEmail;

    apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {

    console.log('API called successfully. Returned data: ' + data);

    }, function(error) {

        console.error(error);
    });


}