import './library/jquery.js';
import { cookie } from '../js/library/cookie.js';

let id = location.search.split('=')[1];

$.ajax({
    type: "get",
    url: "../interface/getItem.php",
    data: {
        id: id
    },
    dataType: "json",
    success: function(res) {
        console.log(res)
        console.log(res.price)
        let picture = JSON.parse(res.picture);
        let title = `<h2>${res.title}</h2><p class="det-title">
        <em>「今日上午10点开售；最高享6期免息；购机返双倍米金；标配不提供充电器和数据线，如需请选择套装版」</em>${res.introduce}</p><p class="det-compant">小米自营</p><div class="det-price">${res.price}</div>`;
        let image = `<div class="swiper-slide " style="background-image: url(${picture[1].src}) "><div class="swiper-slide " style="background-image: url(${picture[1].src}) ">`
        let price = `<div class="total-price">
        总计：${res.price}
    </div>`
        let addbtn = `<div class="sale-btn">
        <a href="">登录后购买</a>
    </div>`
        $('.right-text-title').append(title)
        $('.swiper-wrapper').append(image)
        $('.selected-list').append(price)
            /* $('.btn-box').append(addbtn) */
    }
});


/* function addItem(id, price, num) {
    let shop = cookie.get('shop'); // 获得cookie数据
    let product = {
        id,
        price,
        num
    };

    if (shop) { // 判断购物车是否有添加过数据
        shop = JSON.parse(shop); //将JSON字符串转回数组

        // 判断购物车中是否存在该商品
        if (shop.some(elm => elm.id == id)) {
            // 修改数量
            shop.forEach(el => {
                el.id == id ? el.num = num : null;
            });
        } else {
            shop.push(product);
        }

    } else {
        shop = []; // 初始没有数据 初始化一个空数组
        shop.push(product); // 将第一个商品添加进数组
    }


    cookie.set('shop', JSON.stringify(shop), 1);

} */