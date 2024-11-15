require('dotenv').config();
const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = process.env.ENCRYPTION_KEY;
const iv = process.env.INITIALIZATION_VECTOR;

const  encrypt= (data)=> {
    const cipher = crypto.createCipheriv(algorithm, key, iv)
    return Buffer.from(
      cipher.update(data, 'utf8', 'hex') + cipher.final('hex')
    ).toString('base64') 
  }
  

  const  decrypt=(encryptedData) =>{

    const buff = Buffer.from(encryptedData, 'base64')
    const decipher = crypto.createDecipheriv(algorithm, key,iv )
    return (
      decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
      decipher.final('utf8')
    ) 
  }
const myData = 'Hello, world!';
const encryptedData = encrypt(myData);
console.log( key, iv);
console.log('Encrypted:', encryptedData);
const decryptedData = decrypt(encryptedData, encryptedData.iv);
console.log('Decrypted:', decryptedData);

module.exports = { encrypt, decrypt };