
var doc = document,
    docEl = doc.documentElement,
    metaEl,
    tid;
// 刷新REM
function refreshRem() {
    var width = docEl.getBoundingClientRect().width;
    docEl.style.fontSize = (width / 320 * 16) + 'px';
}
function createViewport() {
    var scale = 1;
    metaEl = doc.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
    docEl.firstElementChild.appendChild(metaEl);
}
// 启动函数
export default function () {
    createViewport();
    refreshRem();
    window.addEventListener('resize', function () {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 100);
    }, false);
    window.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 100);
        }
    }, false);
};
