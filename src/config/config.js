/**
 * Created by yunhailu on 2016/8/9.
 */
import Local from "../local/local";
/**
 * 白名单列表
 * link: 本网站的路由地址, name: 路由渲染组件名, domain: 第三方网站
 * */
export const WhiteList = [{
    title: "中国消费者情绪指数CCSI",
    local: 'zh_CN_CCSI',
    link: 'ccsi',
    domain: 'http://vipccsi.ccn.com.cn'
},{
    title: "沃德社会气象台",
    local: 'zh_CN_society',
    link: 'society',
    domain: 'http://v2.wordemotion.com'
},{
    title: "沃德社会气象台",
    local: 'zh_CN_society',
    link: 'society',
    domain: 'http://www.wordemotion.com'
},{
    title: "发改舆情大数据综合平台",
    local: 'zh_CN_develop',
    link: 'develop',
    domain: 'http://develop.wordemotion.com'
},{
    title: "沃德媒商气象站",
    local: 'zh_CN_mediaq',
    link: 'mediaq',
    domain: 'http://www.wodemediaq.com'
},{
    title: "沃德新闻气象站",
    local: 'zh_CN_news',
    link: 'news',
    domain: 'http://news.wordemotion.com'
},{
    title: "沃德台湾气象站",
    local: 'zh_CN_taiwan',
    link: 'taiwan',
    domain: 'http://taiwan.wordemotion.com'
},{
    title: "沃德精美明星气象站",
    local: 'zh_CN_star',
    link: 'star',
    domain: 'http://www.wdjmstar.com'
}];
//人名白名单
export const WhiteNameList = ["习近平","马凯","王岐山","王沪宁","刘云山","刘延东","刘奇葆","许其亮","孙春兰","孙政才","李克强","李建国","李源潮","汪洋","张春贤","张高丽","张德江","范长龙","孟建柱","赵乐际","胡春华","俞正声","栗战书","郭金龙","韩正","王刚","王乐泉","王兆国","回良玉","刘淇","李长春","吴邦国","汪洋","张高丽","周永康","胡锦涛","贺国强","贾庆林","徐才厚","温家宝","薄熙来","郭伯雄","李长春","吴仪","吴官正","张立昌","张德江","陈良宇","罗干","贺国强","贾庆林","黄菊","曹刚川","曾庆红","曾培炎"];

//外国网站白名单
export const WhiteWebSites =["twitter","facebook","youtube"];
// 统计图表基础配置(饼图、环形图)
export const Pie = {
    title: {
        text: "Chart Data",
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowBlur: 10
    },
    toolbox: {
        show: true,
        showTitle: true,
        feature: {
            saveAsImage: {
                iconStyle:{
                    normal:{
                        borderColor:'#3bcacc'
                    }
                }
            }
        },
        right:20
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {},
    textStyle: {
        fontFamily: 'pingfang'
    },
    graphic:[
        {
            type: 'text',
            z: -10,
            left: 'center', // 相对父元素居中
            top: 'middle',  // 相对父元素居中
            rotation: Math.PI / 4,
            style: {
                fill: '#eee',
                text: Local().common.source,
                font: 'bold 34px Microsoft YaHei'
            }
        }
    ],
    series: {
        name:'pie',
        type:'pie',
        radius: ['40%', '85%'],
        avoidLabelOverlap: false,
        center: ['50%', '50%'],
        label: {
            normal: {
                show: false,
                position: 'center'
            },
            emphasis: {
                show: true,
                textStyle: {
                    fontSize: '20',
                    fontWeight: 'bold'
                }
            }
        },
        labelLine: {
            normal: {
                show: false
            }
        },
    }
};

// 统计图表基础配置(折线图、柱状图)
export const Chart = {
    title: {
        text: "Chart Data",
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowBlur: 10
    },
    dataZoom: [
        {   // 这个dataZoom组件，默认控制x轴。
            type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            start: 0,      // 左边在 10% 的位置。
            end: 100         // 右边在 60% 的位置。
        },
        {   // 这个dataZoom组件，也控制x轴。
            type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
            start: 0,      // 左边在 10% 的位置。
            end: 100         // 右边在 60% 的位置。
        }
    ],
    xAxis: {
        axisLine: {
            lineStyle: {
                color: '#aaa'
            }
        },
        splitLine: {
            lineStyle: {
                type: 'dashed' //solid  dashed  dotted
            }
        }
    },
    graphic:[
        {
            type: 'text',
            z: -10,
            left: 'center', // 相对父元素居中
            top: 'middle',  // 相对父元素居中
            rotation: Math.PI / 4,
            style: {
                fill: '#eee',
                text:Local().common.source,
                font: 'bold 34px Microsoft YaHei'
            }
        }
    ],
    yAxis: {
        axisLine: {
            lineStyle: {
                color: '#aaa'
            }
        },
        splitLine: {
            lineStyle: {
                type: 'dashed' //solid  dashed  dotted
            }
        }
    },
    Axis: {
        axisLine: {
            lineStyle: {
                color: '#999'
            }
        },
        splitLine: {
            lineStyle: {
                type: 'dashed' //solid  dashed  dotted
            }
        }
    },
    textStyle: {
        fontFamily: 'pingfang'
    },
    tooltip : {
        show: true,
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '6%',
        bottom: '3%',
        containLabel: true
    },
    color:[
        '#27727B','#F3A43B','#B5C334','#60C0DD','#E87C25',
        '#FE8463','#9BCA63','#FAD860','#FCCE10','#C1232B',
        '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
    ],
    color2:[
        '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
        '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
        '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
    ],
    color3:[
        '#2ec7c9','#b6a2de','#5ab1ef','#ffb980','#d87a80',
        '#8d98b3','#e5cf0d','#97b552','#95706d','#dc69aa',
        '#07a2a4','#9a7fd1','#588dd5','#f5994e','#c05050',
        '#59678c','#c9ab00','#7eb00a','#6f5553','#c14089'
    ],
    toolbox: {
        iconStyle:{
            normal:{
                borderColor:'#3bcacc'
            }
        },
        show: true,
        showTitle: true,
        feature: {
            magicType: {
                type: ['line', 'bar']
            },
            saveAsImage: {}
        },
        right:20
    }
};


// 主菜单
export const MainMenu = [{
    router: 'summary',
    name: '概况',
    icon: 'fa-dashboard',
    isActive: true,
    children: []
},{
    router: 'source',
    name: '数据源',
    icon: 'fa-bar-chart-o',
    isActive: false,
    children: [
        {router: 'weibo', name: '微博'},
        {router: 'wechat', name: '微信公众号'},
        {router: 'platfrom', name: '社区'}
    ]
}, {
    router: 'display',
    name: '数据展示',
    icon: 'fa-laptop',
    isActive: false,
    children: [
        {router: 'topic', name: '主题外延'},
        {router: 'atlas', name: '关键词图谱'},
        {router: 'waveform', name: '发布波形图'},
        {router: 'ranking', name: '传播力排行'}
    ]
}, {
    router: 'analysis',
    name: '用户分析',
    icon: 'fa-edit',
    isActive: false,
    children: [
        {router: 'area', name: '地域分布'},
        {router: 'forward', name: '转发'}
    ]
}];


// Analytics list
export const AnalyticMenu = [{
    router: 'source',
    name: '出行分组',
    //icon: 'fa-bar-chart-o',
    isActive: false,
    children: [
        {router: 'weibo', name: '滴滴'},
        {router: 'wechat', name: '优步'},
        {router: 'platfrom', name: '易到'}
    ]
}, {
    router: 'display',
    name: '购物分组',
    //icon: 'fa-laptop',
    isActive: false,
    children: [
        {router: 'topic', name: '淘宝'},
        {router: 'atlas', name: '京东'},
        {router: 'waveform', name: '唯品会'},
        {router: 'ranking', name: '美丽说'},
        {router: 'ranking', name: '国美在线'}
    ]
}, {
    router: 'analysis',
    name: '地产分组',
    //icon: 'fa-edit',
    isActive: false,
    children: [
        {router: 'area', name: '恒大地产'},
        {router: 'forward', name: '绿地地产'},
        {router: 'forward', name: '万科地产'}
    ]
}];

// Compare list
export const CompareMenu = [{
    router: 'source',
    name: '人物分组',
    //icon: 'fa-bar-chart-o',
    isActive: false,
    children: [
        {router: 'weibo', name: '滴滴'},
        {router: 'wechat', name: '优步'},
        {router: 'platfrom', name: '易到'}
    ]
}, {
    router: 'display',
    name: '事件分组',
    //icon: 'fa-laptop',
    isActive: false,
    children: [
        {router: 'topic', name: '淘宝'},
        {router: 'atlas', name: '京东'},
        {router: 'waveform', name: '唯品会'},
        {router: 'ranking', name: '美丽说'},
        {router: 'ranking', name: '国美在线'}
    ]
}, {
    router: 'analysis',
    name: '品牌分组',
    //icon: 'fa-edit',
    isActive: false,
    children: [
        {router: 'area', name: '恒大地产'},
        {router: 'forward', name: '绿地地产'},
        {router: 'forward', name: '万科地产'}
    ]
}];

// Analytics list
export const ChannelMenu = [{
    router: 'source',
    name: '数据源',
    //icon: 'fa-bar-chart-o',
    isActive: false,
    children: [
        {router: 'weibo', name: '微博'},
        {router: 'wechat', name: '微信公众号'},
        {router: 'platfrom', name: '社区'}
    ]
}, {
    router: 'display',
    name: '数据展示',
    //icon: 'fa-laptop',
    isActive: false,
    children: [
        {router: 'topic', name: '主题外延'},
        {router: 'atlas', name: '关键词图谱'},
        {router: 'waveform', name: '发布波形图'},
        {router: 'ranking', name: '传播力排行'}
    ]
}, {
    router: 'analysis',
    name: '用户分析',
    //icon: 'fa-edit',
    isActive: false,
    children: [
        {router: 'area', name: '地域分布'},
        {router: 'forward', name: '转发'}
    ]
}];