/**
 * Created by yunhailu on 2016/8/3.
 */


import Vue from 'vue';
import echarts from  'echarts';
import _ from  'underscore';
import infographic from 'echarts/theme/infographic';
import dark from 'echarts/theme/dark';
import vintage from 'echarts/theme/vintage';
import roma from 'echarts/theme/roma';
import def from 'echarts/theme/default';
import macarons from 'echarts/theme/macarons';
import WordCloud from 'echarts-wordcloud';

module.exports = {
    deep: true,
    params: ['loading', 'resize', 'theme', 'click'],
    paramWatchers: {
        loading: function (val, oldVal) {
            var _this = this;

            if (val === true) {
                _this.instance.showLoading();
            } else {
                _this.instance.hideLoading();
            }
        },
        resize: function(val, oldVal){
            if(val != oldVal){
                var _this = this;
                _this.instance.resize();
            }
        },
    },
    bind: function (a) {
        var _this = this;

        Vue.nextTick(function () {
            // init echarts instance
            var theme = _this.params.theme || 'default';
            _this.instance = echarts.init(_this.el, theme);

            // add echart click Event
            if(_this.params.click){
                _this.instance.on('click', _this.params.click);
            }

            // show loading animation
            if (_this.params.loading === true) {
                _this.instance.showLoading();
            }

            // auto resize
            var resizeEvent = new Event('resize');

            _this.resizeEventHandler = function () {
                _this.instance.resize();
            };

            _this.el.addEventListener('resize', _this.resizeEventHandler, false);

            window.onresize = function () {
                _this.el.dispatchEvent(resizeEvent);
            };
        });
    },
    update: function (val, oldVal) {
        var _this = this;
        var options = val;

        Vue.nextTick(function () {
            _this.instance.setOption(options);
            if(options.series.type != 'wordCloud' || _.some(options.series, item => {return item.type == 'wordCloud'})){
                _this.instance.resize();
            }
        });
    },
    unbind: function () {
        var _this = this;

        _this.instance.dispose();

        _this.el.removeEventListener('resize', _this.resizeEventHandler, false);
    }
};