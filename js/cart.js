//vip提示的轮播
$(".next_shop").click(function () {
    location.href = "index.html";
});

function btn() {

    //全选
    $("#qx_btn").toggle(function () {
        $(this).addClass("current");
        $(".dx").addClass("current");
        // console.log(1)
    }, function () {
        $(this).removeClass("current");
        $(".dx").removeClass("current");
    })
    // 单选

    $(".dx").toggle(function () {
        $(this).addClass("current");
    }, function () {
        $(this).removeClass("current");
    })
    //商品选择数量
    let cou = 0;
    $(".nums").click(function () {
        if (cou == 0) {
            $(this).next().css("display", "block");
            $(this).children().last().css({
                "margin-top": "11.5px",
                "border-color": "transparent",
                "border-bottom-color": "black"
            });
            cou = 1;
        } else {
            if ($(this).next().css("display") == "block") {
                $(this).next().css("display", "none");
            } else {
                $(this).next().css("display", "block");
            }
            $(this).children().last().css({
                "margin-top": "16px",
                "border-color": "transparent",
                "border-top-color": "black"
            })
            cou = 0;
        }
        $(".nums_xz>li").click(function () {
            $(this).parent().prev().find(".num").html($(this).html());
            $(this).parent().css("display", "none");
            $(this).parent().prev().children().last().css({
                "margin-top": "16px",
                "border-color": "transparent",
                "border-top-color": "black"
            })
            cou = 0;
        });
    });
    //删除该商品
    $(".remove").click(function () {
        let id = $.cookie("ck").split("#")[1];
        if (confirm("您确定要删除吗？") == false) {
            return;
        }
        $(this).parents(".goods_item").remove();
        let index = $(this).attr("index");
        $.ajax({
            "url": "deleteGoods.php",
            "type": "GET",
            "data": "vipName=" + id + "&goodsId=" + index,
            "success": function (str4) {
                console.log(1)
                if (str4 == "1") {
                    alert("删除成功");
                    history.go(0);
                } else {
                    alert("删除失败");
                }

            }
        });
    });
    let timer2 = setInterval(() => {

        if ($(".goods_item").children(".col_1").children().attr("class").indexOf("current") != -1) {
            // console.log(3)
             $(".car_btn>span:first").css({
                 "display": "block"
             })
             $("#car_null").css({
                 "display": "none"
             })
        } else {
            $(".car_btn>span:first").css({
                "display": "none"
            })
            $("#car_null").css({
                "display": "block"
            })
        }
    }, 10);
}


$(
    //自动载入购物车
    function () {
        if ($.cookie("ck") != undefined) {
            let id = $.cookie("ck").split("#")[1];
            $.ajax({
                "url": "getShoppingCart.php",
                "type": "GET",
                "data": "vipName=" + id,
                "dataType": "json",
                "success": function (str) {
                    // console.log(2)
                    if (str.length > 0) {
                        $(".not_coo").css("display", "none");
                        $(".cart_tit").css("display", "block");
                        $(".cart_lis").css("display", "block");
                        $(".car_dd").css("display", "block");
                        // 总价格
                        let prices = 0;
                        for (let i = 0; i < str.length; i++) {
                            prices += str[i].beiyong5 * str[i].goodsCount;
                            $(".lis_shop").append(
                                `<li class="goods_item">
                    <div class="col_1">
                        <div class="dx"></div>
                        <a href="##">
                            <img src = "${str[i].beiyong1}">
                        </a>
                    </div>
                    <div class="col_2">
                        <div class="good_xx">
                            <p class="goods_tit">${str[i].goodsName}</p>
                            <p class="goods_color">颜色：<span>${str[i].beiyong3}</span></p>
                            <p class = "goods_size" >尺码：<span> ${str[i].beiyong4}</span></p>
                            <div class="goods_num">
                                <div class="nums">
                                    <span>数量：</span>
                                    <span class = "num"> ${str[i].goodsCount}</span>
                                    <span class="nums_sj"></span>
                                </div>
                                <ul class="nums_xz">
                                    <li>1</li>
                                    <li>2</li>
                                    <li>3</li>
                                    <li>4</li>
                                    <li>5</li>
                                </ul>
                            </div>
                            <p class="goods_change">
                                <a href="##">修改</a>
                                <a href="##" class="remove" index="${str[i].goodsId}">删除</a>
                                <a href="##">加入心愿单</a>
                            </p>
                        </div>
                    </div>
                    <div class="col_3">
                        <p>有货</p>
                        <p>1-2个工作日内发货</p>
                    </div>
                    <div class="col_4">
                        <p>
                            <span>￥${str[i].goodsPrice}</span>
                            <span>￥${str[i].beiyong5}</span>
                        </p>
                    </div>
                    <div class="col_5">
                        <p>￥${str[i].goodsCount * str[i].beiyong5}</p>
                    </div>
                </li>`);
                        }
                        $("#cart_num1").html(str.length);
                        $(".car_sum").html("￥" + prices);
                        $("#car_zj").html("￥" + prices);
                        let timer = setInterval(() => {
                            $(".car_vip>ul").animate({
                                "margin-top": -30
                            }, 1000, function () {
                                $(".car_vip>ul").css("margin-top", 0);
                                $(".car_vip>ul").append($(".car_vip>ul>li:first"));
                            });
                        }, 2000);

                    }
                    btn();
                }

            });


        }
    }
);
console.log(2)
//喜欢的商品
$(function () {
    console.log(1)
    $.ajax({
        "url": "getGoodsList.php",
        "dataType": "json",
        "success": function (list) {
            let html = "";
            for (let i = 0; i < list.length; i++) {
                html += `<li>
                            <div class="like_img">
                                <div class="like_default">
                                    <a href="##">
                                        <img src="${list[i].goodsImg}" alt="">
                                    </a>
                                </div>
                                <div class="like_hover">
                                    <a href="item.html?id=${list[i].goodsId}">
                                        <img src="${list[i].beiyong1}" alt="">
                                    </a>
                                    <a href="item.html?id=${list[i].goodsId}" class="like_btn">快速浏览</a>
                                </div>
                            </div>
                            <div class="like_txt">
                                <div>
                                    <span>￥${list[i].beiyong5}</span>
                                    <a href="item.html?id=${list[i].goodsId}">更多颜色</a>
                                </div>
                                <h3>${list[i].goodsDesc}</h3>
                            </div>
                        </li>`;
            }
            $("#likes").append(html);
        }
    })
})