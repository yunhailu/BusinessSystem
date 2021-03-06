/**
 * Created by yunhailu on 2016/8/20.
 */
import _ from 'underscore';
import { zh_CN } from './zh_CN';
import { zh_CN_society } from './zh_CN_society';
import { en } from './en';
import { zh_CN_CCSI } from './zh_CN_CCSI';
import { WhiteList } from '../config/config';
import {zh_CN_mediaq } from './zh_CN_mediaq';
import {zh_CN_news} from './zh_CN_news';
import {zh_CN_taiwan} from './zh_CN_taiwan';
import {zh_CN_develop} from './zh_CN_develop'
import {zh_CN_star} from './zh_CN_star'

export default function(){
    const Local = { zh_CN, zh_CN_society, en, zh_CN_CCSI ,zh_CN_mediaq,zh_CN_news,zh_CN_taiwan,zh_CN_develop,zh_CN_star};
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