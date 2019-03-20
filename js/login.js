//日期插件
lay('#version').html('-v' + laydate.v);
laydate.render({
    elem: '#zc_date' //指定元素
});

//验证码插件
$.fn.code_Obj = function (o) {
    var _this = $(this);
    var options = {
        code_l: o.codeLength, //验证码长度
        codeChars: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
        ],
        codeColors: ['#f44336', '#009688', '#cddc39', '#03a9f4', '#9c27b0', '#5e4444', '#9ebf9f', '#ffc8c4', '#2b4754', '#b4ced9', '#835f53', '#aa677e'],
        code_Init: function () {
            var code = "";
            var codeColor = "";
            var checkCode = _this.find("#data_code");
            for (var i = 0; i < this.code_l; i++) {
                var charNum = Math.floor(Math.random() * 52);
                code += this.codeChars[charNum];
            }
            for (var i = 0; i < this.codeColors.length; i++) {
                var charNum = Math.floor(Math.random() * 12);
                codeColor = this.codeColors[charNum];
            }
            // console.log(code);
            if (checkCode) {
                checkCode.css('color', codeColor);
                checkCode.className = "code";
                checkCode.text(code);
                checkCode.attr('data-value', code);
            }
        }
    };

    options.code_Init(); //初始化验证码
    _this.find("#data_code").bind('click', function () {
        options.code_Init();
        $("#zc_txyzm").val("");
    });
    $("#sx").click(function () {
        options.code_Init();
        $("#zc_txyzm").val("");
    })
};
//实例验证码
$('#txyzm').code_Obj({
    "codeLength": 4
});

//单选按钮
let i = 0;
$(".login_check").click(function () {
    if (i == 0) {
        $(this).children().addClass("current");
        i = 1;
    } else {
        $(this).children().removeAttr("class")
        i = 0;
    }

})
//性别按钮
$(".sex>span>a").click(function () {
    $(".sex").children().not(".span_a").children("a").removeAttr("class");
    $(this).addClass("current");

})
//失焦事件
$(".input_txt").blur(function () {
    $(this).parent().children().last().css("display", "none");
    //为空
    if ($(this).val() == "") {
        $(this).parent().children().last().css("display", "block");
    } else {
        mess($(this));
    }
})

function mess(obj) {
    //输入信息有效性判断 
    let str1 = null;
    let i=0;
    switch (obj.attr("id")) {
        //登录用户名验证 
        case "dl_tel":
            str1 = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/;
            let str2 = /^1\d{10}$/;
            if (!str1.test(obj.val()) && !str2.test(obj.val())) {
                obj.parent().children().last().css("display", "block");
                obj.parent().children().last().text("邮箱/手机无效！");
            } else {
                obj.parent().children().last().css("display", "none");
                i = 1;
            }
            break;
            //注册邮箱
        case "zc_email":
            str1 = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/;
            if (!str1.test(obj.val())) {
                obj.parent().children().last().css("display", "block");
                obj.parent().children().last().text("邮箱格式不正确！");
                
            } else {
                obj.parent().children().last().css("display", "none");
                i = 1;
            }
            // 唯一性验证
            $.ajax({
                "url": "login.php",
                "type": "POST",
                "data": "tel=&pass=&email=" + obj.val(),
                "success": function (str) {
                    if (str == "1") {
                        obj.parent().children().last().css("display", "block");
                        obj.parent().children().last().text("该邮箱已存在!");
                    } else {
                        obj.parent().children().last().css("display", "none");
                        i = 1;
                    }
                }
            })
            break;
            // 注册手机号
        case "zc_tel":
            str1 = /^1\d{10}$/;
            if (!str1.test(obj.val())) {
                obj.parent().children().last().css("display", "block");
                obj.parent().children().last().text("手机格式不正确！");
            }else{
                i = 1;
            }
            // 唯一性验证
            $.ajax({
                "url": "login.php",
                "type": "POST",
                "data": "tel=" + obj.val() + "&pass=&email=",
                "success": function (str) {
                    if (str == "1") {
                        obj.parent().children().last().css("display", "block");
                        obj.parent().children().last().text("手机号码已经被绑定过!");
                    } else {
                        obj.parent().children().last().css("display", "none");
                              i = 1;
                    }
                }
            })
            break;
            //图形验证码
        case "zc_txyzm":
            if (obj.val() != obj.next().attr("data-value")) {
                obj.parent().children().last().css("display", "block");
                obj.parent().children().last().text("图形验证码错误，请重新输入!");
            } else {
                obj.parent().children().last().css("display", "none");
                      i = 1;
            }
            break;
            //注册密码
        case "zc_pass":
            str1 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
            if (!str1.test(obj.val())) {
                obj.parent().children().last().css("display", "block");
                obj.parent().children().last().text("密码长度6~20个英文和数字字符！");
            } else {
                obj.parent().children().last().css("display", "none");
                      i = 1;
            }
            break;
            //确认密码
        case "zc_pass2":
            if (obj.val() != $("#zc_pass").val()) {
                obj.parent().children().last().css("display", "block");
                obj.parent().children().last().text("两次密码填写不一致！");
            } else {
                obj.parent().children().last().css("display", "none");
                      i = 1;
            }
            break;
            //姓名
        case "zc_name":
            if (obj.val().length > 0 && obj.val().length <= 30) {
                obj.parent().children().last().css("display", "none");
                i = 1;
            } else {
                obj.parent().children().last().css("display", "block");
                obj.parent().children().last().text("姓名必须小于30位!");
            }
            break;
        default:
            break;
    }
   return i;

}
// 登录
$("#login").click(function () {
    //为空判断
    if ($("#dl_tel").val() == "" && $("#dl_pass").val() == "") {
        $("#dl_tel").parent().children().last().css("display", "block");
        $("#dl_pass").parent().children().last().css("display", "block");
        return;
    } else if ($("#dl_tel").val() == "") {
        $("#dl_tel").parent().children().last().css("display", "block");
        $("#dl_pass").parent().children().last().css("display", "none");
    } else if ($("#dl_pass").val() == "") {
        $("#dl_tel").parent().children().last().css("display", "none");
        $("#dl_pass").parent().children().last().css("display", "block");
    } else {
        let tel1 = "";
        let email1 = "";
        if ($("#dl_tel").val().indexOf("@") != -1) {
            email1 = $("#dl_tel").val();
            tel1 = "";
        } else {
            email1 = "";
            tel1 = $("#dl_tel").val();
        }
        let pass1 = $("#dl_pass").val();
        // ajax请求
        $.ajax({
            "url": "login.php",
            "type": "POST",
            "data": "tel=" + tel1 + "&pass=" + pass1 + "&email=" + email1,
            "success": function (str) {
                if (str == "1") {
                    alert("登录成功");
                    //ajax请求获取用户名
                    let xx = "";
                     $.ajax({
                         "url": "select.php",
                         "type": "POST",
                         "data": "tel=" + tel1 + "&email=" + email1,
                         "success": function (str) {
                             xx = str;
                            $.ajax({
                                        "url": "selectId.php",
                                        "type": "POST",
                                        "data": "tel=" + tel1 + "&email=" + email1,
                                        "success": function (str1) {
                                            if ($("#login_cookie").children().attr("class") != "") {
                                                $.cookie('ck', xx+"#"+str1, {
                                                    "expires": 7
                                                });
                                            } else {
                                                $.cookie('ck', xx+"#"+str1);
                                            }
                                            location.href = "index.html";
                                        }});

                            //  console.log($.cookie('ck'));
                             
                         }
                     });
                    
                } else {
                    $("#dl_tel").parent().children().last().css("display", "block");
                    $("#dl_tel").parent().children().last().text("用户名或密码错误！");
                    $("#dl_pass").parent().children().last().css("display", "none");
                }
            }
        })
    }
});
// 注册
$("#reg").click(function () {
    //点击我同意
    if ($("#yes>a").attr("class") != "current") {
        $(".reg .error").css("display", "block");
        return;
    }
    setInterval(() => {
        if ($("#yes>a").attr("class") == "current") {
            $(".reg .error").css("display", "none");
        }
    }, 100);

    //获取输入框的值
    //订阅
    let dy = 0;
    if ($("#dy>a").attr("class") == "current") {
        dy = 1;
    }
    //邮箱
    let email = "";
    email = $("#zc_email").val();
    //手机号
    let tel = "";
    tel = $("#zc_tel").val();
    //密码
    let pass = "";
    pass = $("#zc_pass").val();
    //名字
    let name = "";
    name = $("#zc_name").val();
    //性别
    let sex = "男";
    if ($("#nv").attr("class") == "current") {
        sex = "女";
    }
    //出生日期
    let date = "";
    date = $("#zc_date").val();
    if (mess($("#zc_email")) == 1 && mess($("#zc_tel")) == 1 && mess($("#zc_txyzm")) == 1 && mess($("#zc_pass")) == 1 && mess($("#zc_pass2")) == 1 && mess($("#zc_name")) == 1 && $("#min_date").val() != ""){
        $.ajax({
            "url": "addUser.php",
            "type": "POST",
            "data": "dy=" + dy + "&email=" + email + "&tel=" + tel + "&pass=" + pass + "&name=" + name + "&sex=" + sex + "&date=" + date,
            "success": function (str) {
                // console.log(str);
                if (str == "1") {
                    // alert("注册成功");
                    $(".content").css("display", "none");
                    $(".regOk").css("display", "block");
                    $("#regOK_email").html(email);
                    $("#test").click(function () {
                        $(".regOk").css("display", "none");
                        $("#yzOk").css("display", "block");
                        //将name存入cookie
                        $.ajax({
                            "url": "selectId.php",
                            "type": "POST",
                            "data": "tel=" + tel + "&email=" + email,
                            "success": function (str1) {
                                $.cookie('ck', name + "#" + str1, {
                                    "expires": 7
                                });
                                let i = 0;
                                let timer = setInterval(() => {
                                    let j = parseInt(30 - i);
                                    if (j <= 0) {
                                        clearInterval(timer);
                                        location.href = "index.html";
                                    }
                                    $(".yzOk_m").html(j);
                                    i++;
                                }, 1000);
                            }
                        });

                    })
                } else if (str == "0") {
                    alert("注册失败");
                }
            }
        })
    }else{
        // console.log(mess($("#zc_email")),mess($("#zc_tel")) ,mess($("#zc_txyzm")),mess($("#zc_pass")),mess($("#zc_pass2")),mess($("#zc_name")))
        alert("请检查您的注册信息！");
        return;
    }
    
});