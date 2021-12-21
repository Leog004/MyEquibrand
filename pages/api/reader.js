// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs'
import { readdirSync } from "fs";
import path from 'path'

export default function readerAPI(req, res) {

  let brand = req.query.brand || 'Cashel';

  const __dirname = `//gra-web5/C$/Home/MyEquibrand 2.1 WF/img/Products/iShare/2021/${brand}/Individual Images`;


  // Function to get current filenames
  // in directory with specific extension
  let files = fs.readdirSync(__dirname);
  let images = [];
  let folders = [];
    
  console.log("\Filenames with the .jpg extension:");
  files.forEach(file => {
    if (path.extname(file) == ".png"){
      images.push(...[{
        fileName: `${file}`
      }]);
    }

    if(path.extname(file) === ''){
      folders.push(...[{
        folder: `${file}`
      }]); 
    }
  });

  res.status(200).json({
    data: images,
    folders: folders,
    files: files
  });

}
