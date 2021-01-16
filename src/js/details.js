import './library/jquery.js';
import { cookie } from '../js/library/cookie.js';
import './library/swiper.min.js'
import './library/top.js'

let id = location.search.split('=')[1];

$.ajax({
    type: "get",
    url: "../../interface/getItem.php",
    data: {
        id: id
    },
    dataType: "json",
    success: function(res) {
        // console.log(res)

        let picture = JSON.parse(res.picture);
        let title = `<h2>${res.title}</h2><p class="det-title">
        <em>「今日上午10点开售；最高享6期免息；购机返双倍米金；标配不提供充电器和数据线，如需请选择套装版」</em>${res.introduce}</p><p class="det-compant">小米自营</p><div class="det-price">${res.price}元</div>`;
        let image = `<div class="swiper-slide " style="background-image: url(${picture[1].src}) "><div class="swiper-slide " style="background-image: url(${picture[1].src}) ">`
        let price = `<em>${res.price}元</em><div>
        总计：${res.price}元
    </div>`;
        let addbtn = ` <div class="sale-btn">
        <a href="../html/shopcar.html">
添加到购物车
        </a>


    </div>`;
        var num = 1
        $('.right-text-title').append(title)
        $('.swiper-wrapper').append(image)
        $('.selected-list').append(price)
        $('.btn-box').prepend(addbtn).on('click', function() {

            addItem(res.id, res.price, num)
                // alert(1)

        })

        var swiper = new Swiper('.swiper-container ', {

            effect: 'fade',
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


    }
});

function addItem(id, price, num) {
    console.log(id, price, num)
    let shop = cookie.get('shop');
    let product = {
        id,
        price,
        num,
    };
    if (shop) { // 判断购物车是否有添加过数据
        shop = JSON.parse(shop); //将JSON字符串转回数组

        if (shop.some(elm => elm.id == id)) {
            shop.forEach(el => {
                // el.id == id ? el.num = num : null;
                el.id == id ? el.num += num : null;
            });

        } else {
            shop.push(product)
        }
    } else {
        shop = []; // 初始没有数据 初始化一个空数组
        shop.push(product);
        // 将第一个商品添加进数组
    }

    cookie.set('shop', JSON.stringify(shop), 1);
}