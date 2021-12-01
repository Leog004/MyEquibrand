
export const encryptPassword = (pass) => {


    // const Cryptr = require('cryptr');
    const crypto = require("crypto");

    const algorithm = "des-ecb"; 


    const password = pass;

    // use a hex key here
    const key = Buffer.from("d0e276d0144890d3", "hex");

    const cipher = crypto.createCipheriv(algorithm, key, null);

    let encrypted = cipher.update(password, 'utf8', 'hex');

    encrypted += cipher.final('hex');

    return encrypted;
};


export const dycryptPassword = (pass) => {

     const crypto = require("crypto");

     const algorithm = "des-ecb"; 

     const key = Buffer.from("d0e276d0144890d3", "hex");

     const decipher = crypto.createDecipheriv(algorithm, key, null);

     let decrypted = decipher.update(pass, 'hex', 'utf8');

     decrypted += decipher.final('utf8');
    
    // console.log("Decrypted: ", decrypted);

    return decrypted;
}