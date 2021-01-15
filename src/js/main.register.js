require.config({
    paths: {
        jquery: "../js/jquery.min",
        zhuceye: "../js/library/register"
    }
})

require(['zhuceye'], function(zhuceye) {
    zhuceye.poster()
})