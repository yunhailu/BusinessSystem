/**
 * Created by yunhailu on 2016/8/1.
 */

import Cookie from "js-cookie";

const auth = function(){
    const user = Cookie.get('business_uid');
    if(user && user == 'admin'){
        return true;
    }
    return false;
};

const redirect = function(hash = ""){
    if(auth()){
        location.href = '/' + hash;
    } else {
        location.href = '/login';
    }
};

export {auth, redirect};