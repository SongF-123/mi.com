import './library/jquery.js';
import { cookie } from './library/cookie.js';

let shop = cookie.get('shop'); //得到JSON字符串
if (shop) {
    shop = JSON.parse(shop); // 有cookie数据才需要转换

    let idList = shop.map(elm => elm.id).join(); // 获得所有id

    // console.log(number)
    $.ajax({
        type: "get",
        url: "../../interface/getItems.php",
        data: {
            idList
        },
        dataType: "json",
        success: function(res) {
            // 空字符串去拼接
            let temp = '';
            let sum = '';
            let check = ''
            res.forEach((elm, i) => {
                let picture = JSON.parse(elm.picture);

                // 让ajax获得的数据结果id与cookie中的id  一一对应
                // 索引不同

                // 从购物车的cookie数据中去选择当前遍历的数据
                let arr = shop.filter(val => val.id == elm.id);

                temp += `<div class="list-item">
                <table>
                    <tr>
                        <td class="col-check">
                            <input type="checkbox" class="checkone">
                        </td>
                        <td class="col-img">
                            <a href="">
                                <img src="${picture[0].src}" alt="">
                            </a>
                        </td>
                        <td class="col-name">${elm.title}</td>
                        <td class="col-price price">${parseFloat(elm.price).toFixed(2)}元</td>
                        <td class="col-num">
                            <div class="change-num">
                                    <i class="glyphicon glyphicon-minus"></i>
                                <input type="text" class="text" value="1">
                                    <i class="glyphicon glyphicon-plus"></i>
                            </div>
                        </td>
                        <td class="col-total">
                            <span class="subtotal">
                            ${(elm.price)}
                            </span>元
                        </td>
                        <td class="col-action">
                            <span class="glyphicon glyphicon-remove" data-id="${elm.id}"></span>
                        </td>
                    </tr>
                </table>
            </div>`;
                sum = `<div class="section-left">
                <a href="">继续购物</a>
                <span>|</span>
                <p>
                    共
                    <i id="allnum"></i> 件商品，已选择<i></i>件
                </p>
            </div>
            <div class="total-price" id="tolprice">
                合计:
                <i id="Sum"></i> 元
                <a href="">去结算</a>
            </div>`

                check = ` <table>
                <tr>
                    <td class="col-check">
                        <input type="checkbox"  id="allcheck" >
                        <span>全选</span>
                    </td>
                    <td class="col-img">&nbsp;</td>
                    <td class="col-name">商品名称</td>
                    <td class="col-price">单价</td>
                    <td class="col-num">数量</td>
                    <td class="col-total">小计</td>
                    <td class="col-action">操作</td>
                </tr>
            </table>`



            });
            /* 添加商品 */
            $('.list-body').append(temp)
            $('.cart-bar').append(sum)
            $('.list-head').append(check)
                /* 删除商品 */
            $('.list-item').on('click', '.glyphicon-remove', function() {
                let shop2 = shop.filter(el => el.id != $(this).attr('data-id')); // 获得id不匹配的元素
                cookie.set('shop', JSON.stringify(shop2), 1); // 将不匹配的元素从新写进cookie
                location.reload();
            });

            // -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --



            /* 加数量 */
            $('.glyphicon-plus').on('click', function() {
                /* 数量 */
                let num = $(this).siblings('.text').val()

                /* 单价 */
                let price = $(this).parents('td').prev('td').text().slice(0, -1) * 1;

                /* 单个商品的总价 */
                let money = $(this).parents('td').siblings('td').children('span').text() * 1;

                let id = $(this).parents('td').nextAll('.col-action').children('span').attr('data-id')
                console.log(id)
                num++;
                if (num > 10) {
                    num = 10
                    alert('最多选购10件')
                }
                $(this).siblings('.text').val(num);



                money = num * price

                $(this).parents('td').siblings('.col-total').children('span').text(money)


                tolPrice()
                sumnumber()
                addItem(id, money, num)


            })

            /* 减数量 */
            $('.glyphicon-minus').on('click', function() {
                /* 数量 */
                let num = $(this).siblings('.text').val()
                    /* 单价 */
                let price = $(this).parents('td').prev('td').text().slice(0, -1);
                /* 单个商品的总价 */
                let money = $(this).parents('td').siblings('td').children('span').text();
                num--
                if (num < 1) {
                    num = 1
                    alert('数量必须大于一')
                };
                $(this).siblings('.text').val(num);

                money = num * price

                $(this).parents('td').siblings('.col-total').children('span').text(money) + '元'

                tolPrice()
                sumnumber()




            });


            /* 总价 */
            function tolPrice() {
                var zong = 0
                $(".subtotal").each(function() {
                    var all = $(this).html() * 1
                    zong += all
                        // console.log(zong)
                    $('#Sum').html(zong)

                })
            }
            /* 总数量 */
            function sumnumber() {
                var zongnum = 0
                $('.text').each(function() {
                    var ALL = $(this).val() * 1
                        // console.log(ALL)
                    zongnum += ALL
                        // console.log(zongnum)
                    $('#allnum').html(zongnum)
                })

            }
            $(function() {
                tolPrice()
                sumnumber()
            })

            $("#allcheck").on('click', function() {
                var a = $("#allcheck");

                var b = $(".checkone");
                // console.log(b)
                for (var i = 0; i < b.length; i++) {
                    if (a.attr('ckecked', true)) {
                        b.attr('checked', true)
                    } else if (a.attr('ckecked', false)) {
                        alert(1)
                    }
                }

            })

            function addItem(id, price, num) {
                let product = cookie.get('product')

                let proinfor = {
                    id: id,
                    price: price,
                    num: num
                };

                if (product) {
                    product = JSON.parse(product);
                    console.log(product);


                    if (product.some(elm => elm.id == id)) {
                        product.forEach(el => {
                            el.id == id ? el.num++ : null
                        })
                    } else {
                        product.push(proinfor)
                    }


                } else {
                    product = [];
                    product.push(proinfor)
                }
                cookie.set('product', JSON.stringify(product), 1)
            }









        }
    });



}