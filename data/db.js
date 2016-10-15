/**
 * Created by yunhailu on 2016/10/5.
 */

var fs = require('fs');
var dbjson = function(){
    return{
        'theme/trendlist': require('./data/theme_trendList.js'),
        'theme/wordcloud': require('./data/theme_wordcloud.js'),
        'theme/best': require('./data/theme_best.js'),
        'theme/detail': require('./data/theme_detail.js'),
        'hot/realtime': require('./data/hot_realtime.js'),
        'hot/today': require('./data/hot_today.js'),
        'hot/getDetail': require('./data/hot_getDetail.js'),
    }
};
fs.writeFile('./db.json', JSON.stringify(dbjson(),null,4))
module.exports = dbjson;