/**
 * Created by yunhailu on 2016/10/18.
 */

// 事件绑定
export const addEvent = (elem, type, handle) => {
    try{  // Chrome、FireFox、Opera、Safari、IE9.0及其以上版本
        elem.addEventListener(type,handle,false);
    }catch(e){
        try{  // IE8.0及其以下版本
            elem.attachEvent('on' + type,handle);
        }catch(e){  // 早期浏览器
            elem['on' + type] = handle;
        }
    }
};

// 事件解绑
export const removeEvent = (elem, type, handler) => {
    if (window.removeEventListerner) {// 标准浏览器
        elem.removeEventListerner(type, handler, false);
    } else if (window.detachEvent) {// IE浏览器
        elem.detachEvent("on" + type, handler);
    }
};

// 格式化文件大小
export const formatSize = (s) =>  {
    if(!s) return ;
    const size = parseInt(s, 10);
    if(size / 1024 < 1){
        return size.toFixed(2) + ' B';
    }
    if(size / 1024 / 1024 < 1){
        return (size / 1024).toFixed(2) + ' KB';
    }
    if(size / 1024 / 1024 / 1024 < 1){
        return (size / 1024 / 1024).toFixed(2) + ' M';
    }
    return (size / 1024 / 1024 / 1024 ).toFixed(2) + ' G';
};

// 判断是否为父子节点
export const isFatherDom = (p, c2) =>  {
    var c = c2;
    while(c.parentNode){
        c = c.parentNode;
        if(c == p)
            return true;
    }
    return false;
};