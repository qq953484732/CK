// 获取商品
$(function () {
    $.ajax({
        "url": "getGoodsList.php",
        "dataType":"json",
        "success":function (list) {
            // console.log(list)
            let html = "";
            for(let i = 0;i<list.length;i++){
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
            $(".shangp").append(html);
            $(".goods_right_right>span:first").html(list.length);
            $(".list_tit").click(function() {
                $(this).next().toggle(500);
                if($(this).attr("index")==0){
                    $(this).children().last().addClass("current");
                    $(this).attr("index","1");
                }else{
                    $(this).children().last().removeClass("current");
                    $(this).attr("index", "0");
                }
                
                
            })
        }
    })
})