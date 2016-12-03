/**
 * Created by yunhailu on 2016/12/3.
 */

import _ from 'underscore';
import Q from 'qiniu-js/dist/qiniu';

export const up = (uptoken, opts, context) => {
    const options = _.extend({}, {
        runtimes: 'html5,flash,html4',    //上传模式,依次退化
        browse_button: 'uploadBtn',       //上传选择的点选按钮，**必需**
        //uptoken_url: 'http://118.244.212.122:8008/upload/token?callback=_jsonpv78th89spplw7xmw9sv1dzpvi',            //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
        uptoken : uptoken, //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
        unique_names: true, // 默认 false，key为文件名。若开启该选项，SDK为自动生成上传成功后的key（文件名）。
        //save_key: true,   // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK会忽略对key的处理
        //domain: 'http://qiniu-plupload.qiniudn.com/',   //bucket 域名，下载资源时用到，**必需**
        domain: 'http://of4d1rz63.bkt.clouddn.com/',   //bucket 域名，下载资源时用到，**必需**
        get_new_uptoken: false,  //设置上传文件的时候是否每次都重新获取新的token
        container: 'uploadBtnWrap',           //上传区域DOM ID，默认是browser_button的父元素，
        max_file_size: '100mb',           //最大文件体积限制
        flash_swf_url: require('./Moxie.swf'),  //引入flash,相对路径
        max_retries: 3,                   //上传失败最大重试次数
        dragdrop: true,                   //开启可拖曳上传
        drop_element: 'uploadBtnWrap',        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
        chunk_size: '4mb',                //分块上传时，每片的体积
        auto_start: true,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
        init: {
            'FilesAdded': function(up, files) {
                plupload.each(files, function(file) {
                    // 文件添加进队列后,处理相关的事情
                });
                console.log('FilesAdded',up, files);
            },
            'BeforeUpload': function(up, file) {
                // 每个文件上传前,处理相关的事情
                console.log('BeforeUpload',up, file);
            },
            'UploadProgress': function(up, file) {
                // 每个文件上传时,处理相关的事情
                console.log('UploadProgress',up, file);
            },
            'FileUploaded': function(up, file, info) {
                console.log('FileUploaded',up, file, info);
                console.log('FileUploaded getSource:', file.getSource());

                // 每个文件上传成功后,处理相关的事情
                // 其中 info 是文件上传成功后，服务端返回的json，形式如
                // {
                //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
                //    "key": "gogopher.jpg"
                //  }
                // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html

                var domain = up.getOption('domain');
                var res = JSON.parse(info);
                var sourceLink = domain + res.key; //获取上传成功后的文件的Url
                console.log(sourceLink);
            },
            'Error': function(up, err, errTip) {
                //上传出错时,处理相关的事情
                console.log('Error',up, err, errTip);
                alert('上传失败！');
            },
            'UploadComplete': function() {
                //队列文件处理完毕后,处理相关的事情
            },
            'Key': function(up, file) {
                // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                // 该配置必须要在 unique_names: false , save_key: false 时才生效

                console.log('Key',up, file);
                var key = "";
                // do something with key here
                return key
            }
        }
    }, opts);
    const uploader = Qiniu.uploader(options);
    // uploader.bind('FileUploaded', function() {
    //     console.log('hello man,a file is uploaded');
    // });
    return uploader;
};

