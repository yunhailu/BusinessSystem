/**
 * Created by yunhailu on 2016/10/15.
 */

var _ = require("underscore");

/**
 * 实时热点事件（前5名）
 * 
 * {
    code: 0,
    data: [{
        id: "1234123",
        name: "里约奥运会",
        data: [{
            date: "0:00",   //时间
            value: 2   //关注值，没有就为0
        },{
            date: "1:00",
            value: 0
        }]
    },{
        id: "12341212",
        name: "南海问题",
        data: [{
            date: "0:00",
            value: 2
        }]
    }]
  }
 * */

var  timer = [
    "0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00",
    "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"
];
var events = ["不算_否认_路虎", "小明_小伙伴_爆笑", "奇奇微信_工具软件", "武汉_After_Summer", "法国巴黎_圣托_旅拍"];

module.exports = {
    code: 0,
    data: _.map(events, (event, index) => {
        return ({
            id: index,
            name: event,
            data: _.map(timer, time => {
                return ({
                    time,   //时间
                    value: Math.ceil(Math.random()*10)    //关注值，没有就为0
                });
            })
        })
    })
};
