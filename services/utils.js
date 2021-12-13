import { PrismaClient } from '.prisma/client';
const prisma = new PrismaClient();



export const encryptPassword = (pass) => {

    // const Cryptr = require('cryptr');
    const crypto = require("crypto");

    const algorithm = process.env.UTIL_ALGORITHM; 

    const password = pass;

    // use a hex key here
    const key = Buffer.from(process.env.UTIL_BUFFER, process.env.UTIL_TYPE);

    const cipher = crypto.createCipheriv(algorithm, key, null);

    let encrypted = cipher.update(password, 'utf8', process.env.UTIL_TYPE);

    encrypted += cipher.final('hex');

    return encrypted;
};


export const dycryptPassword = (pass) => {

     const crypto = require("crypto");

     const algorithm = process.env.UTIL_ALGORITHM; 

     const key = Buffer.from(process.env.UTIL_BUFFER, process.env.UTIL_TYPE);

     const decipher = crypto.createDecipheriv(algorithm, key, null);

     let decrypted = decipher.update(pass, process.env.UTIL_TYPE, 'utf8');

     decrypted += decipher.final('utf8');
    
    return decrypted;
    
}



export const GetUser = async (email, pass) => {

    const encryptedPassword = encryptPassword(pass);

    const rawSQL = `_G_Login`;
    const result = await prisma.$queryRawUnsafe(`${rawSQL} @Email='${email}', @Password='${encryptedPassword}'`)

    if(result.length > 0){

        let state = [];

        for(let x = 0; x < result.length; x++){

            let obj = {
                'Privilege' : result[x]['Privilege'],
                'PrivilegeID' : result[x]['PrivilegeID'],
                'PrivilegeType' : result[x]['PrivilegeType'],
                'LoginPrivilege' : result[x]['LoginPrivilege'],
                'Type' : result[x]['Type']
            }

            state.push(obj);
        }

        return {
            id: result[0]['UserID'],         
            name: result[0]['Name'],
            email: result[0]['Email'],
            state
        };
        
    }else{
        return null;
    }

}


export const validBrands = (arr) => {

    let tempArray = [];

    arr.forEach((brand) => {

        if(brand === 'Classic Rope') tempArray.push({"brand": brand, "show": true});

        if(brand === 'Classic Equine') tempArray.push({"brand": brand, "show": true});

        if(brand === 'Rattler Rope') tempArray.push({"brand": brand, "show": true});

        if(brand === 'Martin Strap') tempArray.push({"brand": brand.replace('Strap', 'Saddlery'), "show": true});

        if(brand === 'Cashel') tempArray.push({"brand": brand, "show": true});

    })


    return tempArray;

}