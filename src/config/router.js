/**
 * Created by yunhailu on 2016/8/3.
 */

module.exports = {
    '/': {
        name: 'home',
        auth: true,
        component (resolve) {
            require(['../components/Home/Home.vue'], resolve);
        }
    },
    '/home': {
        name: 'home',
        auth: true,
        component (resolve) {
            require(['../components/Home/Home.vue'], resolve);
        }
    },
    '/summarylist':{
        name: 'summarylist',
        component (resolve) {
            require(['../components/Summary/Summary.vue'], resolve);
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
                name: 'summary',
                component (resolve) {
                    require(['../components/Result/Result.vue'], resolve);
                }
            },
            '/information': {
                name: 'information',
                component (resolve) {
                    require(['../components/Information/Information.vue'], resolve);
                }
            },
            '/summary': {
                name: 'summary',
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
            '/comment': {
                name: 'comment',
                component (resolve) {
                    require(['../components/Comment/Comment.vue'], resolve);
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
            },
            '/comparision':{
                name:'comparision',
                component(resolve){
                    require(['../components/Comparision/Comparision.vue'],resolve)
                }
            }
        }
    },
    '/:type/detail/:id' : {
        name: 'detail',
        auth: true,
        component (resolve) {
            require(['../components/Detail/Detail.vue'], resolve);
        }
    },
    'compare': {
        name: 'compare',
        auth: true,
        component (resolve) {
            require(['../components/Compare/Compare.vue'], resolve);
        }
    },

    'media': {
        name: 'media',
        auth: true,
        component (resolve) {
            require(['../components/Media/Media.vue'], resolve);
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
        },
        subRoutes:{
            // '/': {
            //     name: 'settingDefault',
            //     component (resolve) {
            //         require(['../components/Setting/Default/Default.vue'], resolve);
            //     }
            // },
            '/': {
                name: 'reportsAdd',
                component (resolve) {
                    require(['../components/Reports/Reports.vue'], resolve);
                }
            },
            '/add': {
                name: 'reportsAdd',
                component (resolve) {
                    require(['../components/Reports/Reports.vue'], resolve);
                }
            },
            '/:group_id/:topic_id': {
                name: 'reportsEdit',
                component (resolve) {
                    require(['../components/Reports/Reports.vue'], resolve);
                }
            }
        }


    },
    'setting': {
        name: 'setting',
        auth: true,
        component (resolve) {
            require(['../components/Setting/Setting.vue'], resolve);
        },
        subRoutes:{
            // '/': {
            //     name: 'settingDefault',
            //     component (resolve) {
            //         require(['../components/Setting/Default/Default.vue'], resolve);
            //     }
            // },
            '/': {
                name: 'settingAdd',
                component (resolve) {
                    require(['../components/Setting/Form/Form.vue'], resolve);
                }
            },
            '/add': {
                name: 'settingAdd',
                component (resolve) {
                    require(['../components/Setting/Form/Form.vue'], resolve);
                }
            },
            '/edit/:group_id/:topic_id': {
                name: 'settingEdit',
                component (resolve) {
                    require(['../components/Setting/Form/Form.vue'], resolve);
                }
            }
        }
    },
    'instruction':{
        name:'instruction',
        component(resolve){
            require(['../components/Common/InstructionsForUse/InstructionsForUse.vue'],resolve);
        }
    },
    '/profile': {
        name: 'profile',
        component (resolve) {
            require(['../components/Profile/Profile.vue'], resolve);
        }
    },
    '/login': {
        name: 'login',
        component (resolve) {
            require(['../components/Login/Login.vue'], resolve);
        }
    },
    '/ccsi': {
        name: 'ccsi',
        component (resolve) {
            require(['../components/CcsiLogin/CcsiLogin.vue'], resolve);
        }
    },
    '/society': {
        name: 'society',
        component (resolve) {
            require(['../components/SocietyLogin/SocietyLogin.vue'], resolve);
        }
    },
    '/mediaq': {
        name: 'mediaq',
        component (resolve) {
            require(['../components/MediaQLogin/MediaQLogin.vue'], resolve);
        }
    },
    '/news': {
        name: 'news',
        component (resolve) {
            require(['../components/NewsLogin/NewsLogin.vue'], resolve);
        }
    },
    '/taiwan': {
        name: 'taiwan',
        component (resolve) {
            require(['../components/TaiwanLogin/TaiwanLogin.vue'], resolve);
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
    }
};