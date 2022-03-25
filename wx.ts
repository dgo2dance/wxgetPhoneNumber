import { ok } from 'assert';
import axios from 'axios';


import Decode from './Biz';

/**
 * 微信处理类
 */
 @Provide()
 export class wxUtils {

              appId: string
             sessionKey: string

  constructor(appId: string, sessionKey: string) {
    this.appId = appId
    this.sessionKey = sessionKey
  }

    /**
     * 获得手机号
     */
    async getPhoneNumber(param:any) {
        const session=JSON.parse(JSON.stringify(await this.getSessionKey(param.code)));

        
        let pc = new Decode('wx473a7e47ddda24f5', session.session_key);
        let phoneData = await pc.decryptData(param.encryptedData, param.iv);
        console.log("------phoneData------",phoneData);
        return phoneData;
        
        }



    /**
     * 获得session
     */
    async getSessionKey(code) {
       
        const url='https://api.weixin.qq.com/sns/jscode2session?appid='+appId+'&secret='+sessionKey+'&js_code='+code+'&grant_type=authorization_code';

        return axios({
            method: 'get',
            url: url,
            data: {  
            } //get 传参
        }).then((result) => {
        //    console.log('---session--result----',result.data)
                    return result.data;
                 
                } ) 
        
        }



    }