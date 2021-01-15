require.config({

    // paths 中是模块名对应文件
    paths: {
        jquery: "./jquery.min",
        denglu: "./library/login"
    }
})

// 使用模块使用 require函数

//  require(arr,callback);
// arr 依赖列表
// callback 执行的功能 
//     回调参数是注入模块
require(['denglu'], function(denglu) {
    denglu.poster()
})