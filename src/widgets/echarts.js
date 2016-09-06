/**
 * Created by yunhailu on 2016/8/3.
 */


import Vue from 'vue';
import echarts from  'echarts';
import _ from  'underscore';
import infographic from 'echarts/theme/infographic';
import def from 'echarts/theme/default';
import macarons from 'echarts/theme/macarons';

module.exports = {
    deep: true,
    params: ['loading', 'resize', 'theme'],
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
        console.log(a, this);
        var _this = this;

        Vue.nextTick(function () {
            // init echarts instance
            //_this.instance = echarts.init(_this.el, _this.params.theme || 'default');

            var theme = _this.params.theme || 'default';
            _this.instance = echarts.init(_this.el, theme);

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