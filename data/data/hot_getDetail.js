/**
 * Created by 58 yunhailu 2016/10/15.
 */

/**
 * 获取热点事件详情
 *
 * {
	code: 0,
	data: {
		sentiment: [{
			key: "happy",
			value: 50
		},{
			key: "sorrow",
			value: 20
		},{
			key: "anger",
			value: 12
		},{
			key: "disgust",
			value: 5
		},{
			key: "fear",
			value: 32
		}],
		words: [{
			id: "2123",
			value: 523,
			name: "阿拉希"
		},{
			id: "9821",
			value: 843,
			name: "网易新闻"
		}]
	}
 }
 * */

var _ = require('underscore');
var words = ["阿拉希", "网易新闻", "今日头条" , "QQ空间", "房间调控", "今日说法", "叙利亚冲突", "南海问题", "知乎", "货币战争", "舆情分析", "美国选举", "新浪微博"];

module.exports = {
    code: 0,
    data: {
        sentiment: [{
            key: "happy",
            value: Math.ceil(Math.random()*1000)
        },{
            key: "sorrow",
            value: Math.ceil(Math.random()*700)
        },{
            key: "anger",
            value: Math.ceil(Math.random()*500)
        },{
            key: "disgust",
            value: Math.ceil(Math.random()*250)
        },{
            key: "fear",
            value: Math.ceil(Math.random()*100)
        }],
        words: _.map(words, (value, index) => {
            return { id: index, value: Math.ceil(Math.random()*(1000 - index*50)), name: value };
        }),
    }
};
