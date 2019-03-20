//遮罩层
$(function () {
    if ($.cookie("ck") == undefined) {
        $(".alert").css("display", "block");
    }
    $(".close").one("click", function () {
        $(".alert").css("display", "none");
    })
})