/**
 * Created by yunhailu on 2016/8/9.
 */

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
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
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