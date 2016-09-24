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
    'reports': {
        name: 'reports',
        auth: true,
        component (resolve) {
            require(['../components/Reports/Reports.vue'], resolve);
        }
    },
    'setting': {
        name: 'setting',
        auth: true,
        component (resolve) {
            require(['../components/Setting/Setting.vue'], resolve);
        },
        subRoutes:{
            '/': {
                name: 'settingDefault',
                component (resolve) {
                    require(['../components/Setting/Default/Default.vue'], resolve);
                }
            },
            '/add': {
                name: 'settingAdd',
                component (resolve) {
                    require(['../components/Setting/Form/Form.vue'], resolve);
                }
            },
            '/edit/:topic_id': {
                name: 'settingEdit',
                component (resolve) {
                    require(['../components/Setting/Form/Form.vue'], resolve);
                }
            }
        }
    },
    '/login': {
        name: 'login',
        component (resolve) {
            require(['../components/Login/Login.vue'], resolve);
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