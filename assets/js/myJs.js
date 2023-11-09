//------------------------statics----------------------------//
var baseUrl = location.origin + "/";


var pageHeight = $(window).height();
var pageWidth = $(window).width();
var ajax;
var interval;
/////////
let scrollTime;
var currentScroll = 0;
window.onscroll = function(event) {
    if(currentScroll > window.pageYOffset)//if moved towards top
        $('header').removeClass('header-scroll-act');
    else
        $('header').addClass('header-scroll-act');

    currentScroll = window.pageYOffset;

};
////////////////////////////////////Functions//////////////////////////////////
let fixNumbers = (str) => {
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
function countdown() {
    clearInterval(interval);
    interval = setInterval( function() {
        var timer = $('.js-timeout').html();
        timer = timer.split(':');
        var minutes = timer[0];
        var seconds = timer[1];
        seconds -= 1;
        if (minutes < 0) return;
        else if (seconds < 0 && minutes != 0) {
            minutes -= 1;
            seconds = 59;
        }
        else if (seconds < 10 && length.seconds != 2) seconds = '0' + seconds;

        $('.js-timeout').html(minutes + ':' + seconds);

        if (minutes == 0 && seconds == 0){
            clearInterval(interval);
            // alert("2 min over");
            $('#try').css('display' , 'none');
            $('#try_verify').css('display' , 'unset');
            // $('.kh_btn').attr('id' , 'try_verify');
        }
    }, 1000);
}
function getMaxHeight(selector, height) {
    $(selector).css({"max-height": pageHeight - height + "px"});
}
function getMinHeight(selector, height) {
    $(selector).css({"min-height": pageHeight - height + "px"});
}
function getMaxWidth(selector, width) {
    $(selector).css({"max-width": pageWidth - width + "px"});
}
function getMinWidth(selector, width) {
    $(selector).css({"min-width": pageWidth - width + "px"});
}
function replaceClass(selector , currentClass , newClass) {
    $(selector).toggleClass(currentClass).toggleClass(newClass);
}
function loaderToggle(selector){
    $(selector).fadeToggle();
}

function isset(selector){
    if ($(selector)[0]){
        return true;
    } else {
        return false;
    }
}
function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}
function trimWords(selector){//change number of words depending on width in the category blog page
    var maxLength;
    if(pageWidth > 1000 || pageWidth >= 400 && pageWidth < 768){
        maxLength = 90 // maximum number of characters to extract
    }
    else if (pageWidth >= 768 && pageWidth < 1000){
        maxLength = 50
    }
    else if (pageWidth < 400){
        maxLength = 30
    }
    /*else if (pageWidth >= 1279){
        maxLength = 400
    }*/
    $(selector).each(function () {
        var trimmedStringOriginal = $(this).html().trim();

        //trim the string to the maximum length
        var trimmedString = trimmedStringOriginal.substr(0, maxLength);
        //re-trim if we are in the middle of a word
        trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));

        $(this).html(trimmedString + "...");
    });
}
function loadAddress(){
    $.ajax({
        url: baseUrl + 'shop/addBasket.php',
        type: 'GET',
        data: {"loadAdrress": "temp"},
        success: function (data) {
            $('#loadaddress').html(data);
            $('#loadaddress').find('label').remove();
            $('#loadaddress').find('[data-type="1"]').remove();
            $('#loadStoreAddress').html(data);
            $('#loadStoreAddress').find('label').remove();
            $('#loadStoreAddress').find('[data-type="0"]').remove();
            $('#checkAddress').html(data);
            $('#checkAddress').find('.editadd,.deladd').remove();
            $('#checkAddress').find('.list-style-fake').remove();
        }
    });
}
function lazyImage(selector){
    //var param = $(selector).data("lazy-param");
    $(selector).each(function () {
        if (this.complete) {
            var src = $(this).data("lazy-src");
            $(this).attr("src", src);
            $(this).removeAttr("data-lazy-src");
        }
    });
}
let hideSearch = () => {
    $(".search-shadow").removeClass('visible z-on2');
    $(".search-result").html('');

    $(".search-box").animate({ 'top': '-100%' , 'opacity' : 0},  400, function(){
        $("header").animate({'opacity':1},  'fast');
    })
}
const cart_shadow = $(".cart-shadow");
let hideCart = () => cart_shadow.removeClass('visible z-on2');
let showCart = () => cart_shadow.addClass('visible z-on2');

let showSearch = () => {
    $("header").animate({'opacity':0} ,  'fast', function () {
        $(".search-shadow").addClass('visible z-on2');
        $(".search-box").animate({ 'top': 0 , 'opacity' : 1},  400, function () {
            $(".search-box input").val('');
            $(".search-input").focus();
        });
    });
}
let removeActive = (selector = document) => {
    $(selector).find("[class*='active']:not('.no')").removeClass(function (index, css) {
        return (css.match(/(^|\s)active\S+/g) || []).join(' ');
    });
}
let swal_err = () => {
    swal({
        icon: 'error',
        title: 'خطا',
        text: 'لطفا همه اطلاعات را وارد نمایید',
        button: false,
        timer: 3000
    });
}

window.addEventListener( "load" , () => {
    lazyImage("img[data-lazy-src]");

    setTimeout(function (){
        $('#loader-opening').fadeOut(1500);
    },1500);

    $('#loader-paging').fadeOut(500);



    ////////////////////////////////////Events////////////////////////////////////////
    $("input:not(:file)").on("input",function(){
        this.value = fixNumbers(this.value);
    });

    $(".window").height($(window).height());

    $(window).resize(function (){
        pageHeight = $(window).height();
        pageWidth = $(window).width();

        $(".window").height($(window).height());
        $("span[data-abort='spinner']").click(function () {
            ajax.abort();
            loaderToggle("#loader");
        });
    });

    $("#phoneNumber").on("input", function() {
        if (/^0/.test(this.value)) {
            this.value = this.value.replace(/^0/, "");
        }
    });
    var x = window.matchMedia("(max-width: 700px)");
    if (x.matches) { // If media query matches
        if (isset('.setOffer')){
            $('.setOffer').closest('.fourBox').find('.prPrice').css('bottom','20px');
        }
    }

    $("[data-abort='spinner']").click(function () {
        ajax.abort();
        $("#loader").fadeToggle();
    });

    ////////////////////////////////////AJAX////////////////////////////////////////
    function loadBasket() {
        var load = 'start';
        $.ajax({
            url: baseUrl + 'shop/addBasket.php',
            type: 'POST',
            data: {'load': load},
            success: function (data) {
                $('.basketItems').html(data);
            }
        });
    }
    $('#updateUserForm').on('submit',function (event) {
        event.preventDefault();
        var form = $('#updateUserForm');
        var url = baseUrl + 'lib/ajax.php';
        $("#loader").fadeToggle();
        ajax = $.ajax({
            type: "POST",
            url: url,
            data: form.serialize(),
            success: function (data) {
                alert(data);
                $("#loader").fadeToggle();
            }
        });
    });


    /////////////////////////////////////ACTIVE/////////////////////////////////////
    //data-close //data-bait //data-hunt //data-gun //data-shot
    /*$('[data-close]').click(function (){
        var attr = $(this).data("kill");
        $(this).closest("[data-bait='" + attr + "']").removeClass(function (index, css) {
            return (css.match(/(^|\s)active\S+/g) || []).join(' ');
        });
    });

    $('[data-hunt]').click(function (){
        var hunt = $(this).data("hunt");
        var gun = $(this).data("gun");

        $(document).find("[class*='active']:not([data-bait='" + hunt + "'])").removeClass(function (index, css) {
            return (css.match(/(^|\s)active\S+/g) || []).join(' ');
        });

        $(document).find("[data-bait='" + hunt + "']").toggleClass("active-" + gun);
    });

    $('[data-kill] [data-prevent]').click(function (event) {
        event.stopPropagation();
    });*/


    //checkout
    // check out step form start
    $('#email').change(function () {
        var valEmail = $(this).val();
        var valid = isEmail(valEmail);
        if (valid || valEmail == "") {
            $('button.nextStep').prop("disabled", false);
        } else {
            $('button.nextStep').attr("disabled", "disabled");
            alert('فرمت ایمیل نامعتبر');
        }
    });
    $('button.nextStep').click(function () {
        var zero = 0;
        var valid = $(this).closest('.box').find('.req:invalid').val();

        if (valid === "" || valid === 'on') {
            zero = 1;
        }
        if (zero === 0) {
            $(this).closest('.box').toggleClass('hide');
            $(this).closest('.box').next().toggleClass('hide');
        } else {
            alert('Please fill the required field');
        }
    });
    $('button.prevStep').click(function () {
        $(this).closest('.box').toggleClass('hide');
        $(this).closest('.box').prev().toggleClass('hide');
    });

//------------------------dynamics---------------------------//
});





    // Show Search
    $(document).on('click' , "#search-btn", function() {
        showSearch()
        removeActive();
    });

// Hide Search
    $(document).on('click' , "#close-search-box , .search-shadow", function() {
        hideSearch()
    })



//Menu Start
$('.menu [data-closeMenu]').click(function () {
    $('.menuBody').removeClass('js-right-0');
    $('.menu').removeClass('js-visible-op-100');
});

$('[data-menu="in-out"]').click(function (event) {
    $('.menuBody').toggleClass('js-right-0');
    $('.menu').toggleClass('js-visible-op-100');
});
$('[data-backMenu]').click(function(){
    if(isset('.menu-subCat.js-right-0')){
        $(".subcat-items").find('.js-right-0').removeClass("js-right-0");
    }
    else{
        $(".cat-items").removeClass("js-right-0");
        $('[data-backMenu]').fadeToggle(200);
    }
});
$('[data-toggle="menu"] .menuBody').click(function (event) {
    event.stopPropagation();
});
$('[data-target="cats"]').click(function (event) {
    $('[data-toggle="cats"]').addClass("js-right-0");
    $('[data-backMenu]').fadeIn(200);
});
$('[data-target="cat"]').click(function (event) {
    var id = $(this).attr('data-id');
    $('.menu-subCat[data-id="' + id + '"]').addClass("js-right-0");
});
$('[data-target="brands"]').click(function (event) {
    $('[data-toggle="brands"]').addClass("js-right-0");
    $('[data-backMenu]').fadeIn(200);
});

$(document).on("click" , '#subMenuBtn' ,function () {
    $('.menuHolder').addClass('d-none');
    $('.menuSub').removeClass('d-none');
});
$(document).on("click" , '.backMenu' ,function () {
    $(this).closest('.menuSub').toggleClass('d-none');
    $(this).closest('.menuSub').prev().toggleClass('d-none');
});

$('[data-collapse="hunt"]').click( function (){
    let parent = $(this).data('parent');
    let item = $(this).data('target');
    let parentDiv = $(this).closest('div[data-parent="' + parent + '"]');
    if(isset($('.show[data-collapse="bait"]'+item))){
        parentDiv.find('[data-collapse="bait"]'+item).toggleClass('show');
        $(this).find('svg').toggleClass('rotate-90-acw');
        return;
    }
    parentDiv.find('.rotate-90-acw').removeClass('rotate-90-acw');
    parentDiv.find('.show').removeClass('show');

    parentDiv.find('[data-collapse="bait"]'+item).addClass('show');
    $(this).find('svg').addClass('rotate-90-acw');
});

//Menu End










/*panel js requirement*/
$('[data-kill]').click(function () {
    let attr = $(this).data("kill").split(',');
    $.each(attr, function(index, value) {
        $(document).find("[data-bait='" + value + "']").removeClass(function (index, css) {
            return (css.match(/(^|\s)active\S+/g) || []).join(' ');
        });
    });
});

$('[data-hunt]').click(function () {
    let hunt     = $(this).data("hunt");
    let gun      = $(this).data("gun");
    let all      = $(this).data("all");
    let active;
    // Get the data-hunt attribute and split it into an array
    let huntArray = hunt.split(',');

    // Get the data-gun attribute and split it into an array
    let gunArray = gun.split(',');

    if(all){
        active = $(document).find("[class*='active']");
    }
    else{
        active = $(document).find("[class*='active']:not('.no')");
    }

    active.removeClass(function (index, css) {
        return (css.match(/(^|\s)active\S+/g) || []).join(' ');
    });

    // Iterate through the arrays and use the values as needed
    $.each(huntArray, function(index, value) {

        let bait_div = $(document).find("[data-bait='" + value + "']");

        bait_div.toggleClass("active-" + gunArray[index]);
    });
});

$('[data-kill] [data-merci]').click(function (event) {
    event.stopPropagation();
});

$('[data-slidein]').on('click',function () {
    var slide = $(this).data('slidein');
    $(document).find('[data-slide="'+slide+'"]').addClass('active-top');
});

$('[data-slideout]').on('click',function () {
    var slide = $(this).data('slideout');
    $(document).find('[data-slide="'+slide+'"]').removeClass('active-top');
});

$('[data-back]').on('click', function () {
    $('#practicalBtn').find('path').attr('fill', 'white');
    $('#practicalBtn').find('.active-back').removeClass('active-back');
    $(this).closest('div').addClass('active-back');
    $(this).addClass('active-color');
    $(this).prev().find('path').attr('fill', 'var(--color-main)');
    $('.profile-aside').addClass('profile-aside-mx-content');
});


$('[data-fadein]').click(function () {
    var delay = $(this).data('fadedelay');
    var fadeTarget = $(this).data('fadein');
    if (delay) {
        setTimeout(function () {
            $(document).find('[data-fade="' + fadeTarget + '"]').fadeIn();
        }, delay * 1000);
    } else {
        $(document).find('[data-fade="' + fadeTarget + '"]').fadeIn();
    }


});

$('[data-fadeout]').on('click', function () {
    var delay = $(this).data('fadedelay');
    var fadeTarget = $(this).data('fadeout');
    if (delay) {
        $(document).find('[data-fade="' + fadeTarget + '"]').fadeOut(delay * 1000);
    } else {
        $(document).find('[data-fade="' + fadeTarget + '"]').fadeOut();
    }

});

$('[data-fade="add-address"]').on('click', function () {
    $(this).fadeOut();
});

$('[data-fadeout] [data-frez]').on('click', function (e) {
    e.stopPropagation()
});

$('[data-rate]').on('click', function () {
    var rate = $(this).data('rate');
    var rateBox = $(this).closest('[data-ratebox]');
    var mainBox = $(this).closest('[data-comehere]');
    var myArray = rateBox.find('[data-rate]');
    myArray.each(function () {
        var star = $(this).data('rate');
        if (rate >= star) {
            rateBox.find('[data-rate="' + star + '"] path').attr('fill', 'var(--color-star)');
        } else {
            rateBox.find('[data-rate="' + star + '"] path').attr('fill', 'var(--color-off)');
        }
        mainBox.next().find('[data-userrate]').val(rate);

    });
});

//just for tablet and mobile
(function () {
        if (window.matchMedia('(max-width: 767px)').matches) {
            //close menu when click out of area
            $('#panel-right-side').click(function () {
                $('#panel-right-side').removeClass('active-menuback');
                $('#panel-right-side .main-box').removeClass('active-menu');
                $('[data-menuclose] svg').removeClass('active-opacity');
                $('.user-info-box').removeClass('active-opacity');
            });

            $('#panel-right-side .main-box').click(function (e) {
                e.stopPropagation()
            });

            $('[data-menuclose]').on('click', function () {
                $('#panel-right-side').removeClass('active-menuback');
                $('#panel-right-side .main-box').removeClass('active-menu');
                $('[data-menuclose] svg').removeClass('active-opacity');
                $('.user-info-box').removeClass('active-opacity');

            });

            $('[data-menuopen]').on('click', function () {
                $('#panel-right-side').addClass('active-menuback');
                $('#panel-right-side .main-box').addClass('active-menu');
                $('[data-menuclose] svg').addClass('active-opacity');
                $('.user-info-box').addClass('active-opacity');
                $('.profile-aside').removeClass('profile-aside-mx-content');
            });
        }
    }
)();
//just for tablet and mobile

//panel js requirement



$('[data-go="menu"]').click(function () {
    $('[data-fetch="menu"]').toggleClass('active-right0');
    $('[data-fetch="menuBack"]').toggleClass('active-visible');
});
$('[data-kill="menu"]').click(function () {
    var attr = $(this).data("kill");
    $(document).find("[data-fetch='" + "menuBack" + "']").removeClass(function (index, css) {
        return (css.match(/(^|\s)active\S+/g) || []).join(' ');
    });
    $(document).find("[data-fetch='" + "menu" + "']").removeClass(function (index, css) {
        return (css.match(/(^|\s)active\S+/g) || []).join(' ');
    });
});

$('[data-target="search"]').click(function () {
    $("section[class*='active']:not('.searchThat'):not('.searchThat'),div[class*='active']").removeClass(function (index, css) {
        return (css.match(/(^|\s)active\S+/g) || []).join(' ');
    });
    $('.searchThat').toggleClass('activeFade');
});
$('#search').click(function () {
    $('.searchInput').toggleClass('activeSearch');
});
$('#search .searchInput').click(function (event) {
    event.stopPropagation();
});





//*================*/

var order = {};

// Data Picker
// $("#datepicker").persianDatepicker({
//     startDate: "today",
//     endDate: "1500/01/01",
//     formatDate: "ND DD NM YYYY",
    // cellWidth: 36,
    // cellHeight: 30,
    // fontSize: 16,
// });

// Steps Buy
$(".cart-confirm-btn").click(function () {
    $("#steps-buy").modal({ show: true, backdrop: "static" });
});

$(".go-to-step-2").click(function () {
    let name = $('#steps-buy input[name ="name"]').val().trim();
    let phone = $('#steps-buy input[name ="phone"]').val().trim();
    let email = $('#steps-buy input[name ="email"]').val().trim();
    let code_meli = $('#steps-buy input[name ="code_meli"]').val().trim();

    if (name != "" && phone != "" && email != "" && code_meli != "") {
        order.name = name;
        order.phone = phone;
        order.email = email;
        order.code_meli = code_meli;

        $(".step-1").css('display', 'none');
        $(".step-2").css('display', 'block');

    } else {
        swal_err();
    }
});

$(".go-to-step-3").click(function () {
    var address = $('input[name=address]:checked').val();

    if (address != null) {
        order.address = address;

        $(".step-2").css('display', 'none');
        $(".step-3").css('display', 'block');
    } else {
        swal_err();
    }
});

$(".go-to-step-4").click(function () {
    let date = $("#datepicker").data('jdate');
    let time = $('input[name=time]:checked').val();

    if (date != null) {
        order.date = date;
        order.time = time;

        $(".step-3").css('display', 'none');
        $(".step-4").css('display', 'block');
    }
    else {
        swal_err();
    }

});


$(".back-to-step-1").click(function () {
    $(".step-1").css('display', 'block');
    $(".step-2").css('display', 'none');
});

$(".back-to-step-2").click(function () {
    $(".step-2").css('display', 'block');
    $(".step-3").css('display', 'none');
});

$(".back-to-step-3").click(function () {
    $(".step-3").css('display', 'block');
    $(".step-4").css('display', 'none');
});


$(".open-address-modal").click(function () {
    $("#address-modal").modal('show');
});

$("input[name=rules]").change(function () {
    if ($(this).is(':checked')) {
        $('.confirm').attr('disabled', false);
    } else {
        $('.confirm').attr('disabled', true);
    }
});


$(".confirm").click(function () {

    if (!order.name || !order.phone || !order.email || !order.code_meli || !order.address || !order.date || !order.time) {
        swal_err();
    }
    else {

        $("input[name=date]").val(order.date);

        if ($("input[name=cart_factor]").is(':checked')) {
            $("input[name=factor]").val(true);
        } else {
            $("input[name=factor]").val(false);
        }
        if ($("input[name=cart_gift_wrapping]").is(':checked')) {
            $("input[name=gift_wrapping]").val(true);
        } else {
            $("input[name=gift_wrapping]").val(false);
        }



        swal({
            icon: 'success',
            title: ' ',
            text: 'در حال انتقال به درگاه ...',
            button: false,
            timer: 3000

        }).then((value) => {
            $(".order-form").submit();
        });

    }

});


$(".add-address-btn").click(function () {

    let province = $('select[name ="province"]').val();
    let city = $('select[name ="city"]').val();
    let address = $('textarea[name ="address"]').val();
    let postal_code = $('input[name ="postal_code"]').val();
    let data = {
        'province': province,
        'city': city,
        'address': address,
        'postal_code': postal_code,
    }

    if (province != "" && city != "" && address != "" && postal_code != "") {


        $.ajax({
            url: '/address/add',
            type: 'POST',
            dataType: 'JSON',
            data: {
                'province': province,
                'city': city,
                'address': address,
                'postal_code': postal_code,
            },
            success: function (response) {

                let html = "";

                response.forEach(function (address , index) {

                    html += `<div>`;
                    html += `<label class="form-check-label d-flex align-items-center mt-2" style="cursor:pointer">`;
                    html += `<input type="radio" name="address" value="${address.id}" class="mb-2" ${index === 0 ? "checked" : ""}>`;
                    html += `<span class="d-inline-block mr-2">`;
                    html += `<span class="d-block">${address.province} - ${address.city} - ${address.address}</span>`;
                    html += `<small class="d-block">کد پستی: ${address.postal_code}</small>`;
                    html += `</span>`;
                    html += `</label>`;
                    html += `</div>`;

                });


                $(".address-content").html(html);
                $("#address-modal").modal('hide');

                iran_provinces();


                // $('select[name ="province"]').val('');
                $('select[name ="city"]').attr('disabled', true);
                $('textarea[name ="address"]').val('');
                $('input[name ="postal_code"]').val('');

            }
        });

    }
    else {

        swal({
            icon: 'error',
            title: 'خطا',
            text: 'همه اطلاعات را وارد نمایید',
            button: false,
            timer: 2000
        });

    }

});


$('#address-modal').on('show.bs.modal', function () {
    // $("#steps-buy").modal('hide');
})
    .on('hide.bs.modal', function () {
        // $("#steps-buy").modal({ show: true, backdrop: "static" });
    });



/*CART*/

// Login Modal
$(".login-btn").click(function () {
    hideSearch();
    removeActive();
    $("#phoneModal-input").val('');
    $("#phoneModal").modal("show");
});



$('[data-adminmenu]').click(function () {
    $('.admin-taskbar').toggleClass('w-100');
    $(this).toggleClass('admin-menu');
});
