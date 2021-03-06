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
		id: "1232",
		name: "柳叶刀"
	},{
		id: "1222",
		name: "里约奥运会"
	}]
 }
 * */

var  timer = [
    "0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00",
    "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"
];
var events = ["三亚_旅行_互粉", "菏泽_小溪_伟大成就", "好感度倍增_半径", "希望之星_碉堡", "不息之河_勇士"];

module.exports = {
    code: 0,
    data: _.map(events, (value, index) => ({
        name: value,
        id: index + 10
    }))
};
