$(function () {
    let url = location.href;
    let id = url.split("?id=")[1];
    // console.log(url)
    $.ajax({
        "url": "getGoodsInfo.php",
        "type": "GET",
        "data": "goodsId=" + id,
        "dataType": "json",
        "success": function (shops) {

            console.log(shops);
            let html = ` <p class="shop_pingjia">CALVIN KLEIN PERFORMANCE</p>
                        <p class="shop_name">${shops.goodsName}</p>
                        <p class="shop_name2">${shops.goodsDesc}</p>
                        <p class="shop_price">现价：￥<span>${shops.beiyong5}</span> 吊牌零售价：￥<span>${shops.goodsPrice}</span></p>
                        <p class="colll">颜色：<span class="shop_color1">${shops.beiyong3}</span></p>
                        <div class="shop_color2">
                            <span index="黑色">
                                <img src="images/15359629704425017.jpg" alt="">
                            </span>
                            <span index="藏青色">
                                <img src="images/15359629704425017.jpg" alt="" class="current">
                            </span>
                        </div>
                        <div class="shop_size">
                            <p>尺码</p>
                            <span>${shops.beiyong4}</span>
                            <span>M</span>
                            <span>L</span>
                            <span>XL</span>
                        </div>
                        <div class="shop_nums">
                            <div class="shop_xz">
                                <span>数量：</span>
                                <span class="num">1</span>
                                <span class="nums_sj"></span>
                            </div>
                            <ul class="nums_xz">
                                <li>1</li>
                                <li>2</li>
                                <li>3</li>
                                <li>4</li>
                                <li>5</li>
                            </ul>
                            <div id="join_car" index="${shops.goodsId}">请先选择颜色、尺码和数量</div>
                        </div>
                        <div class="fenxiang">
                            <span>分享至</span>
                            <span>加入心愿单</span>
                        </div>`;
            $(".shop_xx").html(html);
            let img1 = `<li>
                            <img src="${shops.beiyong1}" alt="">
                        </li>
                        <li>
                            <img src="${shops.beiyong2}" alt="">
                        </li>
                        <li>
                            <img src="${shops.beiyong6}" alt="">
                        </li>
                        <li>
                            <img src="${shops.beiyong7}" alt="">
                        </li>`;
            $(".ims").html(img1);
            let arr = shops.beiyong8.split(",");
            let img2 = `<li>
                            <img src="images/shop/${arr[0]}" alt="">
                        </li>
                        <li style="display:none;">
                            <img src="images/shop/${arr[1]}" alt="">
                        </li>
                        <li style="display:none;">
                            <img src="images/shop/${arr[2]}" alt="">
                        </li>
                        <li style="display:none;">
                            <img src="images/shop/${arr[3]}" alt="">
                        </li>`;
            $(".img_big>ul").html(img2);
            lod();
            $("#join_car").click(function () {
                if($.cookie("ck")==undefined){
                    alert("请登录!");
                    location.href = "login.html";
                    return;
                }
                let userid = $.cookie("ck").split("#")[1];
                let shopid = $(this).attr("index");
                let num = $(".num").html();
                $.ajax({
                            "url": "addShoppingCart.php",
                            "type": "GET",
                            "data": "vipName=" + userid + "&goodsId=" + shopid + "&goodsCount="+num,
                            "dataType": "json",
                            "success": function (car) {
                                if(car==1){
                                    alert("加入购物车成功");
                                }else{
                                    alert("加入失败");
                                }
                            }});
            })
            $(".ims>li").click(function () {
                console.log($(this).index())
                $(".img_big>ul>li").css("display","none");
                $(".img_big>ul>li").eq($(this).index()).css("display","block");
            })
            $(".liulan>img").toggle(function () {
                $(".ims").animate({
                    "margin-top": "-146px"
                })
            },
            function () {
                $(".ims").animate({
                    "margin-top": "0px"
                })
            });
        }
    });
});

function lod() {
    //数量
    let cou = 0;
    $(".shop_xz").click(function () {

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
    //尺码选择之后才可以购物
    $(".shop_size").children("span").click(function () {
        $(".shop_size").children("span").css("border-color", "#bebebe");
        $(this).css("border-color", "#000");
        //改变购物按钮
        $("#join_car").css({
            "background": "#000",
            "color": "white",
            "cursor": "pointer"
        });
        $("#join_car").html("加入购物车");
    });
    //改变颜色
    $(".shop_color2>span").click(function () {
        $(".shop_color2>span>img").addClass("current");
        $(this).children().removeClass("current");
        $(".shop_color1").html($(this).attr("index"));
    })
}