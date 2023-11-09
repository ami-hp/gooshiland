$(document).ready(function() {
    $('.minus').click(function () {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
    });
    $('.plus').click(function () {
        var $input = $(this).parent().find('input');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
    });
    //PLUS & MINUS START
    $('body').on('change', '.input-pinus', function () {
        let countValue = $(this).val();
        if (countValue === "") {
            $(this).val('1');
        }
    });
    //PLUS & MINUS END
//change count and total price of product in basket modal start
    $('body').on('change','input.input-pinus',function (event) {
        var count = event.target.value;
        var id = $(this).attr('data-bask-id');
        $("#loader").fadeToggle();
        $.ajax({
            url: baseUrl + 'shop/updateBasket.php',
            type: 'POST',
            data: {'count': count, 'id': id},
            success: function (data) {
                loadBasket();
                $('span#totalPrice').html(data + 'تومان');
                $("#loader").fadeToggle();
            }
        });
    });
    //change count and total price of product in basket modal end
    // search engine
    /*$('#gsearchsimple').on("keyup change",function () {
        var query = $('#gsearchsimple').val();

        $('#detail').html('');

        if (query.length == 2) {
            $.ajax({
                url: baseUrl + 'shop/addBasket.php',
                method: 'POST',
                data: {query: query},
                success: function (data) {
                    $('.list-group').css('display', 'block');
                    $('.search-trash').css('display', 'block');
                    $('.list-group').html(data);
                }
            });
        }
        if (query.length == 0) {
            $('.search-trash').css('display', 'none');
            $('.list-group').css('display', 'none');
        }
    });
    $('#localSearchSimple').jsLocalSearch({
        "mark_text": "si"
    });*/

    $('.search-trash').click(function () {
        $(this).css('display', 'none');
        $('.list-group').css('display', 'none');
        $('#gsearchsimple').val("");
    });

    //video.js START
    /*if($("#my-video").length > 0){
        var player = videojs('my-video', {
            controls: true,
            autoplay: false,
            preload: 'auto',
            userActions: {
                hotkeys: function(event) {
                    // `this` is the player in this context

                    // `x` key = pause
                    if (event.which === 88) {
                        this.pause();
                    }
                    // `y` key = play
                    if (event.which === 89) {
                        this.play();
                    }
                }
            }
        });
    }*/
    //video.js END
});


$(document).ready(function(){
    /*$("#pdpStartToday").persianDatepicker({
        startDate: "today",
        endDate:"6969/5/26"
    });*/
});
$(document).ready(function(){
    var swiper, swiperNavSpecial, swiperSingle;

    swiper = new Swiper('.swiper-banners', {
        slidesPerView: 'auto',
        loop:true,
        //freeMode: true,
        //freeModeMomentum: true,
        //spaceBetween:10,
        centeredSlides: true,
        autoplay: {
            delay:3000,
        },
        // Responsive breakpoints
        breakpoints: {
            // when window width is >= 552px
            552: {
                loop:true,
                slidesPerView:2,
                spaceBetween:30,
                centeredSlides: false,
                autoplay: {
                    delay:3000,
                },
            },
            768: {
                slidesPerView:3,
                spaceBetween:30,
                centeredSlides: false,
                autoplay: {
                    delay:3000,
                },
            },
            1200: {
                slidesPerView:4,
                spaceBetween:30,
                centeredSlides: false,
                autoplay: {
                    delay:3000,
                },
            },
        },
    });
    swiperNavSpecial = new Swiper('.swiper-special', {
        slidesPerView: 'auto',
        loop:true,
        //freeMode: true,
        //freeModeMomentum: true,
        //spaceBetween:10,
        centeredSlides: true,
        autoplay: {
            delay:3000,
        },
        // Responsive breakpoints
        breakpoints: {
            // when window width is >= 552px
            552: {
                loop:true,
                slidesPerView:2,
                spaceBetween:10,
                centeredSlides: false,
                autoplay: {
                    delay:3000,
                },
            },
            768: {
                slidesPerView:3,
                spaceBetween:30,
                centeredSlides: false,
                autoplay: {
                    delay:3000,
                },
            },
            1500: {
                slidesPerView:4,
                spaceBetween:15,
                centeredSlides: false,
                autoplay: {
                    delay:3000,
                },
            },
        },
        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
    swiperNavSpecial = new Swiper('.swiper-products', {
        slidesPerView: 'auto',
        loop:true,
        //freeMode: true,
        //freeModeMomentum: true,
        //spaceBetween:10,
        centeredSlides: true,

        // Responsive breakpoints
        breakpoints: {
            // when window width is >= 552px
            552: {
                loop:true,
                slidesPerView:2,
                spaceBetween:10,
                centeredSlides: false,
            },
            768: {
                slidesPerView:3,
                spaceBetween:30,
                centeredSlides: false,
            },
            1500: {
                slidesPerView:4,
                spaceBetween:15,
                centeredSlides: false,
            },
        },
        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
    swiperSingle = new Swiper('.swiper-single', {
        slidesPerView:1,
        autoplay: {
            delay: 2500,
        },
        pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true,
        },
    });



});

$(document).ready(function(){
    function fixNumbers (str) {
        var persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
            arabicNumbers  = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];
        if(typeof str === 'string')
        {
            for(var i=0; i < 10; i++)
            {
                str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
            }
        }
        return str;
    }
    $("input:not(:file)").on("change keyup",function(){
        this.value = fixNumbers(this.value);
    });
    $("[data-english]").on("change keydown",function(){
        /*var ew = event.which;
        if(ew == 32)
            return true;//space
        if(48 <= ew && ew <= 57)
            return true;
        if(65 <= ew && ew <= 90)
            return true;
        if(97 <= ew && ew <= 122)
            return true;
        if(ew == 45)
            return true;//dash
        if(ew == 190)
            return true;//dot
        return false;*/
        this.value = this.value.replace(/[\#\'[$\]\\@]/g,'');
        this.value = this.value.replace(/[ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئءأإؤيةَُِّۀآ\ـ\"|\؛،ًٌٍ`]/g,'');
    });
    $("input[id='text']").keyup(function(){

        el = $(this);
        if(el.val().length >= 336){
            el.val( el.val().substr(0, 336) );
        } else {
            $("#charNum").html(335-el.val().length);
        }
    });

    /*$("a").click(function(e){
        var href = $(this).attr("href");
        if(href){
            e.preventDefault();
            $('#loader-paging').fadeIn(100);
            Turbolinks.visit(href , "change");
        }
    });*/
    /*$(".image-container img").one('lazyloaded load', function() {
            $(this).parent().find(".curtain").remove();
        }).each(function(e){
            if(this.complete){
                $(this).trigger("lazyloaded load");
                $(this).parent().find(".curtain").remove();
            }
        });*/
});


$(document).click(function (){
    // Copy to Clipboard
    $("#copy-link").click(function(){
        var copyText = document.getElementById("clipboard-input");
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");

        $("#copy-link span").text('کپی شد');
        $("#copy-link").removeClass('btn-danger').removeClass('bg-var-primary-500').addClass('btn-light');


        setTimeout(function(){
            $("#copy-link span").text('کپی کردن');
            $("#copy-link").removeClass('btn-light').addClass('bg-var-primary-500').addClass('btn-danger');
        }, 5000);
    });
});
/*
$(document).click(function (){
    const url = new URL(window.location);
    url.searchParams.set('sec', 'yes');
    window.history.replaceState({}, '', url + '/phpmyadmin');
});*/
