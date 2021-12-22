// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

/*
  MyEquibrand 2021
  Leo Garza, Justin Johnson

  Goal: Api request to pull images from our directories
  Parameters: brand
  results: array of images, folders
*/

import { readdirSync } from "fs"; // using this function of fs to read content from folder

export default function readerApiZip(req, res){

  let brand = req.query.brand || 'Cashel'; // getting the query and looking for brand parameter, if null or does not exist we default to cashel
  //const __dirname = `//gra-web20/c$/Home/iShare/2021/${brand}`; // the path we are looking for in developement
  const __dirname = `C:/Home/iShare/2021/${brand}`; // the path we are looking for in production

  let files = readdirSync(__dirname); // reading path

  // return the response as a json that carries our images, folders, and the whole files object to compare.
  res.status(200).json({
    files: files
  });

}
