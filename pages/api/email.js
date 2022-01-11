// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import sendInBlue from "../../Email/sendInBlueAPI";

/*
  MyEquibrand 2021
  Leo Garza, Justin Johnson

  Goal: API request that will recieve the user contact information as well 
  as its question and will send that information to MyEquibrand

  Parameters: name, email, subject, msg
  results: array of images, folders
*/


export default function emailApi(req, res) {

    const {name, email, subject, msg, user} = req.body || 'Empty user'

    console.log(req.body);

    var sendSmtpEmail = {
        to: [{
            email,
            name,
            subject
        }],
        templateId: 1,
        params: {
            link: msg,
            user: user
        },
        headers: {
            'X-Mailin-custom': 'custom_header_1:custom_value_1|custom_header_2:custom_value_2'
        }
    };

    sendInBlue(sendSmtpEmail);
    res.send('success')
}
