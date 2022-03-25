// 引入crypto-js
import * as CryptoJS from 'crypto-js';
import * as crypto from 'crypto-js';


import {Base64} from 'js-base64'
 
 
class Decode {
  appId: string
  sessionKey: string
 
  constructor(appId: string, sessionKey: string) {
    this.appId = appId
    this.sessionKey = sessionKey
  }
 
  decryptData(data: string, ivv: string):any {
    let key = CryptoJS.enc.Base64.parse(this.sessionKey)
    let iv = CryptoJS.enc.Base64.parse(ivv)
    let decrypt = CryptoJS.AES.decrypt(data, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    return JSON.parse(Base64.decode(CryptoJS.enc.Base64.stringify(decrypt)))
  }


}
 
 
export default Decode