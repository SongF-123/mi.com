import './library/jquery.js';
import './library/jquery.lazyload.min.js';
import './library/swiper.min.js';
import './library/top.js'


$.ajax({
    type: "get",
    url: "../../interface/getData.php",
    dataType: "json",
    success: function(res) {
        // console.log(res);
        let temp = '';
        res.forEach((elm, i) => {
            let picture = JSON.parse(elm.picture);
            // console.log(picture);
            temp += `<li class="public-li-size ">
            <a href="./details.html?id=${elm.id}">
                <div class="public-img-div ">
                    <img data-original="${picture[0].src} " alt=" " class=" public-img-size lazy">
                </div>
                <h3 class="public-title-h3 "> ${elm.title.slice(0,60)}</h3>
                <p class="public-title-p ">${elm.introduce}</p>
                <p>
                    <span>${elm.price}</span>

                </p>
            </a>
        </li>`;


        });

        $('.phone>.box-bd .col-md-9>.rendering').append(temp);

        /* 懒加载 */
        $(function() {
            $("img.lazy").lazyload({ effect: "fadeIn" });
        });
        /* 第一个轮播图 */
        var swiper = new Swiper('.swiper-container ', {
            /* spaceBetween: 30, */
            effect: 'fade ',
            pagination: {
                el: '.swiper-pagination ',
                clickable: true,
            },
            loop: true,
            speed: 2000,
            autoplay: {
                delay: 2000
            },
            navigation: {
                nextEl: '.swiper-button-next ',
                prevEl: '.swiper-button-prev ',
            },
        });
        /* 第二个轮播图 */
        var swiper = new Swiper('.swiper-container1 ', {
            slidesPerView: 4,
            spaceBetween: 14,
            slidesPerGroup: 4,
            loop: false,
            speed: 1000,
            autoplay: {
                delay: 2000
            },
            loopFillGroupWithBlank: false,
            // pagination: {
            //     el: '.swiper-pagination ',
            //     clickable: true,
            // },
            navigation: {
                nextEl: '.swiper-button-next ',
                prevEl: '.swiper-button-prev ',
            },
        });


        /* 选项卡切换  家电部分*/
        $(function() {
            let btns = $('.appli-more>ul>li')
            btns.on('click', function() {
                $(this).addClass('active').siblings().removeClass('active');
                let index = btns.index(this);
                $('.col-md-9>#box').eq(index).removeClass('hide').siblings()
                    .addClass('hide');
                // console.log($('.col-md-9>#box'))

            })
        })

        /* 倒计时 */
        $(function() {

            var futuer = new Date(2021, 1, 12, 0, 0, 0);
            setInterval(function() {
                var now = new Date();
                var calculate = futuer - now;
                var s = calculate / 1000;
                // console.log(s)
                var day = parseInt(s / 86400);
                var hour = parseInt(s % 86400 / 3600)
                var min = parseInt(s % 3600 / 60)
                var sec = parseInt(s % 60)

                $('.day').text(day);
                $('.hour').text(hour);
                $('.min').text(min);
                $('.sec').text(sec);
            }, 1000)
        });





    }

});