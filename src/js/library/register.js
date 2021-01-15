// 自定义模块
// 使用函数 define(arr,callback)


define(['jquery'], function($) {

    // 返回值就是你的模块内容
    return {
        poster: function() {
            // 函数防抖 
            function call(callback, time) {
                let cont = null
                return function() {
                    if (cont) clearTimeout(cont)
                    var arg = arguments
                    cont = setTimeout(function() {
                        callback.apply(this, arg)
                    }.bind(this), time);
                }
            }
            // 验证格式
            let flag = false
            $('.number').on('input', call(function(e) {
                let reg = /^1[35789]\d{9}$/

                if (reg.test($('.number').val())) {
                    flag = true
                    $('.msg').html('√可以使用')
                    $('.msg').css("color", "green");
                    $('.btn').removeAttr('disabled')
                } else {
                    $('.msg').html('×格式有误')
                    $('.msg').css("color", "red");
                    $('.btn').attr("disabled", "disabled")
                }
            }))

            $('.btn').on('click', function() {
                let phone = $('.number').val()
                    // if (flag && $('.flag').prop('checked')) {
                    //     $('.lastmsg').html('')

                $.ajax({
                    type: "get",
                    url: `../../interface/register.php`,
                    data: {
                        phone: phone
                    },
                    success: function(res) {
                        if (res == 1) {
                            alert('已经被注册')

                            location.href = "../html/register.html"
                        } else if (res == 0) {
                            alert('正在注册')



                            location.href = "../html/login.html"






                        }
                        // console.log(res)
                    }
                });






            })
        }
    }
});