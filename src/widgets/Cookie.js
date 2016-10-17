/**
 * Created by yunhailu on 2016/10/18.
 */

import Cookies from  'js-cookie';

export const getCookie = (name) => {
    return Cookies.get(name);
};

export const setCookie = (name, value, opts = {}) => {
    return Cookies.set(name, value, opts);
};

export const removeCookie = (name, opts = { path: '' }) => {
    Cookies.remove(name, opts);
};