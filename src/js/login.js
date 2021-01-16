import './library/jquery.js'


$('.btn').on('click', function() {
    let phone = $('.text').val()
    let password = $('.pass').val()
        // console.log(password)
    $.ajax({
        type: "get",
        url: `../../interface/login.php`,
        data: {
            phone: phone,
            password: password
        },
        success: function(res) {
            if (res == 1) {
                alert('登录成功')
                location.href = "../html/index.html"
            } else if (res == 0) {
                alert('号码不存在')
                location.href = "../html/login.html"
            }
        }
    });
})