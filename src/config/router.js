/**
 * Created by yunhailu on 2016/8/3.
 */

module.exports = {
    '/': {
        name: 'home',
        component (resolve) {
            require(['../components/Home/Home.vue'], resolve);
        }
    },
    '/login': {
        name: 'login',
        component (resolve) {
            require(['../components/Login/Login.vue'], resolve);
        }
    },
    '/main': {
        name: 'main',
        component (resolve) {
            require(['../components/Main/Main.vue'], resolve);
        }
    },
    '/test': {
        name: 'test',
        component (resolve) {
            require(['../components/Test/Test.vue'], resolve);
        }
    },
    '/detail': {
        name: 'detail',
        component (resolve) {
            require(['../components/Detail/Detail.vue'], resolve);
        }
    }
};