/**
 * Created by yunhailu on 2016/8/9.
 */
import Local from "../local/local";
/**
 * 白名单列表
 * link: 本网站的路由地址, name: 路由渲染组件名, domain: 第三方网站
 * */
export const WhiteList = [{
    id: '',
    name: 'demo03',
    local: '',
    link: 'ccsi',
    domain: 'http://vipccsi.ccn.com.cn'
}, {
    id: '',
    name: 'demo06',
    local: 'zh_CN_society',
    link: 'login',
    domain: 'http://v2.wordemotion.com'
}];


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
            saveAsImage: {}
        }
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
        show: true,
        showTitle: true,
        feature: {
            magicType: {
                type: ['line', 'bar']
            },
            saveAsImage: {}
        }
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