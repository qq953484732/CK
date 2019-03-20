// 导航条固定定位
$(function () {
    //导航跳转
    $(".nav_a>li").click(function () {
        location.href = "goodslist.html";
    })
    setInterval(() => {
        if ($(document).scrollTop() >= 50) {
            $(".nav").css({
                "position": "fixed",
                "top": 0,
                "left": 0,
                "z-index": 100
            });
            //    console.log(1)
        }
        if ($(document).scrollTop() < 50) {
            $(".nav").removeAttr("style")
        }
    }, 10);
});
// 返回顶部和客服固定定位
$(function () {
    setInterval(() => {
        if ($(document).scrollTop() < $(document).height() - $(window).height() - $(".foot").height()) {
            $(".fix").css({
                "position": "fixed",
                "bottom": "20px",
                "right": "12%",
                "top": "auto",
                "z-index": 100
            });
        }
        if ($(document).scrollTop() >= $(document).height() - $(window).height() - $(".foot").height()) {
            $(".fix").removeAttr("style")
        }
        // console.log("$(document).height()" + $(document).height() + " - $(window).height() -" + $(window).height() + " $('.foot').height()" + $('.foot').height())
    }, 10);
});
//返回顶部
$(function () {
    $(".getTop").click(function () {
        $("html,body").animate({
            "scrollTop": 0
        }, 2000)
    })
});
//搜索的点击事件
$(function () {
    //搜索开关按钮
    let i = 1;
    $(".ss>a").click(function (event) {
        if (i == 1) {
            event.stopPropagation();
            i = 0;
            $(".sousuo").css({
                "display": "block"
            });
            $(".sousuo_input").css({
                "display": "block"
            });
            $(".ss>a>span").html("");
            $(".ss>a>span").css({
                "display": "inline-block",
                "width": "12px",
                "height": "12px",
                "background": "url(images/icon.png) no-repeat",
                "background-position": "-96px -95px"
            });
        }
    })
    $(".sousuo_input>input").focus(function (event) {

            $(".sousuo_input").css({
                "display": "block"
            });
            $(".ss>a>span").html("");
            $(".ss>a>span").css({
                "display": "inline-block",
                "width": "12px",
                "height": "12px",
                "background": "url(images/icon.png) no-repeat",
                "background-position": "-96px -95px"
            });
    })
    $(".ss>a>span").click(function (event) {
        if (i == 0) {
            event.stopPropagation();
            $(".sousuo").css({
                "display": "none"
            });
            $(".sousuo_input").css({
                "display": "none"
            });
            $(".ss>a>span").html("搜索");
            $(".ss>a>span").removeAttr("style");
            i = 1;
        }

    });
    $(document).children().not(".ss").click(function () {
             $(".sousuo_input>input").val("内裤");
             $(".sousuo").css({
                 "display": "none"
             });
    })
    // 点击别的区域隐藏
    // $(document).click(function (event) {
    //     event.stopPropagation();
    //     if(i==0&&this!=$(".ss"))
    //     // $(".sousuo_input").first.value("内裤");
    //     $(".sousuo").css({
    //         "display": "none"
    //     });
    // })

});

 
//cookie是否存在
$(function () {
        if ($.cookie("ck") != undefined) {       
            let ii = $.cookie("ck").split("#")[0];
            let jj = $.cookie("ck").split("#")[1];
            // console.log(i,j)
            //登录左上角
            $(".unlogin").css("display", "none");
            $(".oklogin").css("display", "block");
            $("#user_name").html(ii);
            $(".unlogin_x").css("display", "none");
            $(".oklogin_x").css("display", "block");

            $.ajax({
                "url": "getShoppingCart.php",
                "type": "GET",
                "data": "vipName=" + jj,
                "dataType": "json",
                "success": function (str3) {
                    // console.log(str3)
                    if (str3.length > 0) {
                        $("#cart_num").html("(" + str3.length + ")");
                        //左上交购物车
                        $(".uncar").css("display", "none");
                        $(".okcar").html()
                        let htm = "<div class='okcars'><ul>";
                        let sum = 0;
                        for(let i = 0;i<str3.length;i++){
                            htm += `<li><div class="car_img"><img src="${str3[i].beiyong2}" alt=""></div><div class="car_xx">
                                        <h4>${str3[i].goodsName}</h4>
                                        <p>价格：<span>￥${str3[i].beiyong5}</span></p>
                                        <p>数量：<span>${str3[i].goodsCount}</span></p>
                                        <p>颜色：<span>${str3[i].beiyong3}</span></p>
                                        <p>尺码：<span>${str3[i].beiyong4}</span></p>
                                    </div></li>`;
                            sum += str3[i].beiyong5 * str3[i].goodsCount;
                        }
                        htm += `</ul>
                        </div>
                        <div class="okcar_sum">
                            <span>总计</span>
                            <span>￥${sum}</span>
                        </div>
                        <div class="now_car">立即结算</div>
                        <div class="see_car"><a href="cart.html">查看购物袋</a></div>`;
                        $(".okcar").html(htm);
                        if (str3.length==1){
                            $("okcars>ul").css({
                                "height": "160px"
                            })
                        }
                        if (str3.length>2){
                            $(".okcars>ul").css({
                                "height": "287px",
                                "overflow-y": "auto"
                            })
                        }
                        $(".okcar").css("display", "block");
                        $(".now_car").click(function () {
                            alert("您的商品价格为" + sum);
                        })
                    }
                    
                }
            });
        } else {
            $(".unlogin").css("display", "block");
            $("oklogin").css("display", "none");
        }
    }
);

// console.log($.cookie("ck"));
//退出按钮清除cookie
$(
    $("#exit").click(function () {
        $.cookie('ck', "", {
            "expires": -1
        });
        location.href = "login.html";
    })
);