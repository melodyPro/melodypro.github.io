$(function(){
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        direction: 'vertical',
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: 30,
        mousewheelControl: true,
        //回调函数，slider 切换结束时执行
        onSlideChangeEnd: function(swiper){
            var index =swiper.activeIndex;
            $('.nav-icon').stop(true,true).animate({'left':index*120+'px'},250,function(){
                $(this).addClass('animated pulse').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    $(this).removeClass('animated pulse');
                });
            });
            $('.nav-list li').eq(index).addClass('active').siblings().removeClass('active');
            $('.nav-list li').eq(index).addClass('animated flipInX').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
                $('.nav-list li').eq(index).removeClass('animated flipInX');
            });
        }
    });

    $('.nav-list li').each(function(i){
        $(this).click(function(){
            $('.swiper-pagination span').eq(i).trigger('click');
            $('.nav-icon').stop(true,true).animate({'left':i*120+'px'},250,function(){
                $(this).addClass('animated pulse').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    $(this).removeClass('animated pulse');
                });
            });
            $('.nav-list li').eq(i).addClass('active').siblings().removeClass('active');
        })
    });

    $("img.lazy").lazyload({
        placeholder: "/images/guide/icon.png",
        effect: "fadeIn",
        event: "sporty"
    });
    $(window).bind("load", function () {
        var timeout = setTimeout(function () {
            $("img.lazy").trigger("sporty");
        }, 5000);
    });
})
