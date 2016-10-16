/**
 * Created by yunhailu on 2016/9/21.
 */

import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const myURI = "http://127.0.0.1:3000";
const rootURI = "http://118.244.212.122:8008";

const Api = {
    request({url="", params= {}, method= "jsonp"}={}){
        return Vue.http[method](url, {
            params
        });
    },
    get(opts){
        opts.method = "get";
        return this.request(opts);
    },
    post(opts){
        opts.method = "post";
        return this.request(opts);
    },
    jsonp(opts){
        opts.method = "jsonp";
        return this.request(opts);
    }
};

/**
 *  Encapsulate `Login` interface
 *
 *  @param {String} username
 *  @param {String} password
 *
 *  @return {Promise} With Login info.
 */
export const login = params => {
    return Api.request({
        url: `${rootURI}/auth/login`,
        params
    });
};

/**
 *  Encapsulate `Logout` interface
 *  
 *  @return {Promise} With Logout.
 */
export const logout = params => {
    return Api.request({
        url: `${rootURI}/auth/logout`,
        params
    });
};

/**
 *  Encapsulate `get group list` interface
 *
 *  @return {Promise} With Group List.
 */
export const getGroupList = params => {
    return Api.request({
        url: `${rootURI}/topic/grouplist`,
        params
    });
};

/**
 *  Encapsulate `topic add` interface
 *
 *  @param {String} name
 *  @param {String} topic_group_id
 *
 *  @return {Promise} With Topic add.
 */
export const topicAdd = params => {
    return Api.request({
        url: `${rootURI}/topic/add`,
        params
    });
};

/**
 *  Encapsulate `topic delete` interface
 *
 *  @param {String} id
 *
 *  @return {Promise} With Topic add.
 */
export const topicDelete = params => {
    return Api.request({
        url: `${rootURI}/topic/delete`,
        params
    });
};

/**
 *  Encapsulate `get topic list` interface
 *
 *  @return {Promise} With Topic List.
 */
export const getTopicList = params => {
    return Api.request({
        url: `${rootURI}/topic/list`,
        params
    });
};

/**
 *  Encapsulate `get Summary Detail` interface
 *
 *  @return {Promise} With Summary Detail.
 */
export const getSummaryDetail = params => {
    return Api.request({
        url: `${rootURI}/summary/detail`,
        params
    });
};

/**
 *  Encapsulate `get Sentiment Detail` interface
 *
 *  @return {Promise} With Sentiment Detail.
 */
export const getSentimentDetail = params => {
    return Api.request({
        url: `${rootURI}/sentiment/detail`,
        params
    });
};

/**
 *  Encapsulate `get Comment Detail` interface
 *
 *  @return {Promise} With Topic List.
 */
export const getCommentDetail = params => {
    return Api.request({
        url: `${rootURI}/comment/detail`,
        params
    });
};

/**
 *  Encapsulate `get Influence Popular List` interface
 *
 *  @return {Promise} With Influence Popular List.
 */
export const getPopularList = params => {
    return Api.request({
        url: `${rootURI}/influence/popularlist`,
        params
    });
};

/**
 *  Encapsulate `get Influence List` interface
 *
 *  @return {Promise} With Influence List.
 */
export const getInfluenceList = params => {
    return Api.request({
        url: `${rootURI}/influence/list`,
        params
    });
};

/**
 *  Encapsulate `get theme word cloud` interface
 *
 *  @return {Promise} With Theme Word Cloud.
 */
export const getWordCloud = params => {
    return Api.request({
        url: `${rootURI}/theme/wordcloud`,
        params
    });
};

/**
 *  Encapsulate `get theme Trend List` interface
 *
 *  @return {Promise} With Theme Trend List.
 */
export const getTrendList = params => {
    return Api.request({
        url: `${rootURI}/theme/trendlist`,
        params
    });
};

/**
 *  Encapsulate `get theme Theme Best` interface
 *
 *  @return {Promise} With Theme Theme Best.
 */
export const getThemeBest = params => {
    return Api.request({
        url: `${rootURI}/theme/best`,
        params
    });
};


/**
 *  Encapsulate `get theme Detail` interface
 *
 *  @return {Promise} With Theme Detail.
 */
export const getThemeDetail = params => {
    return Api.request({
        url: `${rootURI}/theme/detail`,
        params
    });
};

/**
 *  Encapsulate `getDashboardDetail` interface
 *
 *  @param {String} id
 *
 *  @return {Promise} With dashboard detail info.
 */
export const getDashboardDetail = params => {
    return Api.request({
        url: `${rootURI}/dashboard/${params.id}`,
        params
    });
};

/**
 *  Encapsulate `实时热点事件（前5名）` interface
 *
 *  @param {String}
 *
 *  @return {Promise} With Get Hot Realtime.
 */
export const getHotRealtime = params => {
    return Api.request({
        //url: `${myURI}/hot/realtime`,
        url: `${rootURI}/hotspot/reallist`,
        params
    });
};

/**
 *  Encapsulate `今日热点排行` interface
 *
 *  @param {String}
 *
 *  @return {Promise} With Get Hot Today.
 */
export const getHotToday = params => {
    return Api.request({
        //url: `${myURI}/hot/today`,
        url: `${rootURI}/hotspot/todaylist`,
        params
    });
};

/**
 *  Encapsulate `获取热点事件详情` interface
 *
 *  @param {String}
 *
 *  @return {Promise} With Get Hot Detail.
 */
export const getHotDetail = params => {
    return Api.request({
        //url: `${myURI}/hot/getDetail`,
        url: `${rootURI}/hotspot/detail`,
        params
    });
};