/**
 * Created by yunhailu on 2016/9/21.
 */

import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

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
 *  Encapsulate `getDashboardDetail` interface
 *
 *  @param {String} id
 *
 *  @return {Promise} With product info.
 */
export const getDashboardDetail = params => {
    return Api.request({
        url: 'http://business.com:3000/dashboard/'+params.id,
        params
    });
};