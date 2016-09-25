/**
 * Created by yunhailu on 2016/9/21.
 */

import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

//const rootURI = "http://business.com:3000";
const rootURI = "http://192.168.0.5";

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
 *  Encapsulate `topic add` interface
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