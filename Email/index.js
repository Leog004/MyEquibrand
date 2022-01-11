import axios from "axios";

export default async function sendMail(link, user) {
  try {
    let request = await axios
      .post("/api/email", {
        name: "MyEquibrand",
        email: "lgarza@equibrand.com",
        subject: "Someone sent you a Link.",
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