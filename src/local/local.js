/**
 * Created by yunhailu on 2016/8/20.
 */
import { zh_CN } from './zh_CN';
import { en } from './en';

export default function(){
    let lang;

    switch (window.navigator.language){
        case "zh-CN":
            lang = zh_CN;
            break;
        default:
            lang = zh_CN;
            break;
    }

    return lang;
}