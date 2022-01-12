import axios from "axios";

export default async function SendEmailContact_Message_Dealer(link, user) {
  try {
    let request = await axios
      .post("/api/email", {
        name: "MyEquibrand",
        email: "meadmin@equibrand.com",
        subject: `MyEquibrand - ${user} has a request`,
        msg: link,
        user: user
      })
      
      .then((res) => {
        return res;
      });

    return request.status === 200 ? true : false;;

  } catch (err) {

    console.error(err);

  }

};