/**
 * Created by yunhailu on 2016/8/3.
 */

module.exports = {
    '/home': {
        name: 'home',
        auth: true,
        component (resolve) {
            require(['../components/Home/Home.vue'], resolve);
        }
    },
    '/analytics': {
        name: 'analytics',
        auth: true,
        component (resolve) {
            require(['../components/Analytics/Analytics.vue'], resolve);
        },
        subRoutes: {
            '/': {
                name: 'result',
                component (resolve) {
                    require(['../components/Result/Result.vue'], resolve);
                }
            },
            '/result': {
                name: 'result',
                component (resolve) {
                    require(['../components/Result/Result.vue'], resolve);
                }
            },
            '/sentiment': {
                name: 'sentiment',
                component (resolve) {
                    require(['../components/Sentiment/Sentiment.vue'], resolve);
                }
            },
            '/influence': {
                name: 'influence',
                component (resolve) {
                    require(['../components/Influence/Influence.vue'], resolve);
                }
            },
            '/theme': {
                name: 'theme',
                component (resolve) {
                    require(['../components/Theme/Theme.vue'], resolve);
                }
            }
        }
    },
    'compare': {
        name: 'compare',
        auth: true,
        component (resolve) {
            require(['../components/Compare/Compare.vue'], resolve);
        }
    },
    'dashboard': {
        name: 'dashboard',
        auth: true,
        component (resolve) {
            require(['../components/Dashboard/Dashboard.vue'], resolve);
        }
    },
    'dashboard/:id': {
        name: 'dashboardDetail',
        auth: true,
        component (resolve) {
            require(['../components/DashboardDetail/DashboardDetail.vue'], resolve);
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
        auth: true,
        component (resolve) {
            require(['../components/Main/Main.vue'], resolve);
        },
        subRoutes: {
            '/summary': {
                name: 'summary',
                component (resolve) {
                    require(['../components/Summary/Summary.vue'], resolve);
                }
            }
        }
    },
    '/test': {
        name: 'test',
        component (resolve) {
            require(['../components/Test/Test.vue'], resolve);
        }
    },
    '/source/:item': {
        name: 'source',
        component (resolve) {
            require(['../components/Test/Test.vue'], resolve);
        }
    },
    '/display/:item': {
        name: 'display',
        component (resolve) {
            require(['../components/Test/Test.vue'], resolve);
        }
    },
    '/analysis/:item': {
        name: 'analysis',
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