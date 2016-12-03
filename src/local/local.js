/**
 * Created by yunhailu on 2016/8/20.
 */
import _ from 'underscore';
import { zh_CN } from './zh_CN';
import { zh_CN_society } from './zh_CN_society';
import { en } from './en';
import { WhiteList } from '../config/config';

export default function(){
    const Local = { zh_CN, zh_CN_society, en };
    let lang;

    switch (window.navigator.language){
        case "zh-CN":
            lang = zh_CN;
            break;
        case "en":
            lang = en;
            break;
        default:
            lang = zh_CN;
            break;
    }

    const domain = location.origin;
    const whiteName = _.filter(WhiteList, item => (item.domain == domain));
    if(whiteName.length){
        const name = whiteName[0];
        const type = name.local || 'zh_CN';
        lang = Local[`${type}`];
    }
    return lang;
}