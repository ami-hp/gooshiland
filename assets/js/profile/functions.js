
/**
 * 
 * @param {String} name
 */
 function mobile_menu(name) {

    // Open
    $(".open-" + name).click(function () {
        // $("#panel").removeClass('active-top');

        $("#mobile-" + name).animate({ 'margin-bottom': '0px', opacity: 1 }, 800, function () { });

        $(".close-menu").css('display', 'none');
        $(".open-menu").css('display', 'block');

        $(".mobile-menu").css({ 'display': 'none', 'opacity': 0, 'margin-bottom': '-300px' });
        $("#mobile-" + name).css('display', 'block');

        $("#mobile-navbar .open-" + name).css('display', 'none');
        $("#mobile-navbar .close-" + name).css('display', 'block');
    });

    // Close
    $(".menu-close-btn, .close-menu, .close-" + name).click(function () {
        $("#mobile-" + name).animate({ 'margin-bottom': '-300px', opacity: 0 }, 500, function () {
            $("#mobile-" + name).css('display', 'none');

            $(".close-home").css('display', 'none');
            $(".open-home").css('display', 'block');

            $(".close-" + name).css('display', 'none');
            $(".open-" + name).css('display', 'block');
        });
    });
}


/**
 * Loader
 * @param {String} status `start` , `stop`
 */
function loading(status) {

    if (status == "start") {

        $(".loader").css('display', 'flex');

    } else if (status == "stop") {

        $(".loader").css('display', 'none');

    }
}

/**
 * 
 * @param {*} selector 
 * @param {*} limit 
 * @param {*} alertHeight 
 * @param {*} property 
 * @param {*} parent 
 * @param {*} getWidth 
 */
function limitHeight(selector, limit, alertHeight = false, property = null, parent = null, getWidth = false) {
    let parentVal;
    if (getWidth === true) {
        parentVal = $(window).width();
    }
    if (parent == null) {
        parentVal = $(window).height();
    } else {
        parentVal = $(parent).height();
    }
    if (property == null) {
        property = "height";
    }
    if (alertHeight === true) {
        // alert(parentVal + ' - ' + limit + ' = ' + (parentVal - limit + "px"));
    }

    return $(selector).css(property, parentVal - limit + "px");
}

/**
 * 
 */
function swal_err() {
    swal({
        icon: 'error',
        title: 'خطا',
        text: 'لطفا همه اطلاعات را وارد نمایید',
        button: false,
        timer: 3000
    });
}

/**
 * 
 * @param {Date} time `timestamp`
 * @param {String} day_selector 
 * @param {String} hour_selector 
 * @param {String} minute_selector 
 * @param {String} second_selector 
 */
function timer(time, day_selector, hour_selector, minute_selector, second_selector) {

    var deadline = time * 1000;

    setInterval(function () {

        var now = new Date().getTime();

        if (deadline > now) {

            var t = deadline - now;
            var days = Math.floor(t / (1000 * 60 * 60 * 24));
            var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((t % (1000 * 60)) / 1000);

            // Day
            $(day_selector).html(days);

            // Hour
            if (hours <= 9) {
                $(hour_selector).html("0" + hours);
            } else {
                $(hour_selector).html(hours);
            }

            // Minute
            if (minutes <= 9) {
                $(minute_selector).html("0" + minutes);
            } else {
                $(minute_selector).html(minutes);
            }

            // Second
            if (seconds <= 9) {
                $(second_selector).html("0" + seconds);
            } else {
                $(second_selector).html(seconds);
            }

        } else {

            location.reload();

        }
    }, 1000);

}

/**
 * 
 * @param {Number} id `Product ID` 
 * @param {String} type `Product Type`
 */
function add_cart(id, type) {

    $.ajax({
        url: "/cart/add",
        type: "POST",
        dataType: "json",
        data: {
            'id': id,
            'type': type,
        },
        success: function () {
            show_cart();
        }
    });
}

/**
 * 
 * @param {Number} id `Product ID` 
 * @param {String} type `Product Type`
 */
function remove_cart(id, type) {

    $.ajax({
        url: "/cart/remove",
        type: "POST",
        dataType: "json",
        data: {
            'id': id,
            'type': type,
        },
        success: function () {
            show_cart();
        }
    });
}

/**
 * 
 * @param {Number} id `Product ID` 
 * @param {String} type `Product Type`
 */
function delete_cart(id, type) {

    $.ajax({
        url: "/cart/delete",
        type: "POST",
        dataType: "json",
        data: {
            'id': id,
            'type': type,
        },
        success: function (response) {
            show_cart();
        }
    });
}

/**
 * 
 */
function show_cart() {

    $.ajax({
        url: "/cart",
        type: "POST",
        dataType: "JSON",
        success: function (response) {

            // if (response.cart) {
            if (response.cart.length) {

                var price = 0;
                var total_count = 0;
                var alert_html = "";
                var UnAvailable = [];
                var html = "<div><img src='/images/icon/Bag-r2.svg' width='20px'><span style='color:#b31b29'>سبد خرید</span></div>";

                html += "<div class='cart-content'>";
                html += "<div class='alert alert-warning mx-auto mt-2 small' style='display:none; width:95%;'><ul class='text-right p-0 m-0'></ul></div>";

                // -----------------------------------------------------

                response.cart.forEach(object => {

                    price = price + (object.price * object.count);
                    total_count = total_count + object.count;

                    html += "<div class='row position-relative m-0 mt-3 mx-auto py-2 pr-2'><div class='col-3 align-self-center p-0'>";

                    // Image
                    if (object.type == "App\\Product") { html += "<img src='/upload/products/croppie/" + object.image + "'>"; }
                    if (object.type == "App\\GiftCard") { html += "<img src='/upload/giftcards/croppie/" + object.image + "'>"; }
                    if (object.type == "App\\UsedProduct") { html += "<img src='/upload/usedproducts/croppie/" + object.image + "'>"; }

                    // Price
                    html += "</div>";
                    html += "<div class='col-7 p-0 pr-2'>";

                    // Title
                    if (object.color) { html += "<div>" + object.name + " | " + object.color + " | " + object.warranty + "</div>"; } else { html += "<div>" + object.name + "</div>"; }

                    var price2 = parseInt(object.price);
                    html += "<div><span>قیمت </span><span class='text-success'>" + price2.toLocaleString("en") + "</span><span class='small'> تومان</span></div>";
                    html += "</div>";
                    html += "<div class='col-2 justify-content-center p-0'>";

                    // Plus
                    // if (object.count >= object.storage) { html += "<img src='/images/icon/plus-r.svg' style='opacity:0.6'>"; }
                    // else { 
                    // html += "<img src='/images/icon/plus-r.svg' class='cart-plus' data-id=" + object.id + " data-type=" + object.type + ">"; 
                    // }

                    // Plus
                    if (object.tag != 0) { html += "<img src='/images/icon/plus-r.svg' style='opacity:0.6'>"; }
                    else {
                        html += "<img src='/images/icon/plus-r.svg' class='cart-plus' data-id=" + object.id + " data-type=" + object.type + ">";
                    }

                    // Count
                    // data-max=" + object.storage + "
                    html += "<div class='text-danger py-2 cart-count'>" + object.count + "</div>";

                    // Minus
                    if (object.count == 1) { html += "<img src='/images/icon/minus-r.svg' style='opacity:0.6'>"; }
                    else { html += "<img src='/images/icon/minus-r.svg' class='cart-minus' data-id=" + object.id + " data-type=" + object.type + ">"; }

                    // Delete
                    html += "</div><img src='/images/icon/trash.svg' class='cart-delete' data-id=" + object.id + " data-type=" + object.type + "></div>";

                    // if (object.storage == 0) {

                    //     UnAvailable.push([object.id, object.type]);

                    //     $("#cart-dropdown-btn").data('alert', 'true');

                    //     alert_html += "<li>موجودی ";

                    //     if (object.color) {
                    //         alert_html += "<span class='font-black'>" + object.name + " | " + object.color + " | " + object.warranty + "</span>";
                    //     } else {
                    //         alert_html += "<span class='font-black'>" + object.name  + "</span>";
                    //     }

                    //     alert_html += " به پایان رسیده است</li>";
                    // }

                    if (object.tag != 0) {

                        UnAvailable.push([object.id, object.type]);

                        $("#cart-dropdown-btn").data('alert', 'true');

                        alert_html += "<li>موجودی ";

                        if (object.color) {
                            alert_html += "<span class='font-black'>" + object.name + " | " + object.color + " | " + object.warranty + "</span>";
                        } else {
                            alert_html += "<span class='font-black'>" + object.name + "</span>";
                        }

                        alert_html += " به پایان رسیده است</li>";
                    }

                });

                // -----------------------------------------------------

                var gift_wrapping = parseInt(response.gift_wrapping);

                html += "</div>";

                html += "<div class='px-3 pb-2'>";
                html += "<div class='d-flex justify-content-between border-top py-2'><div>فاکتور ارسال شود</div><div><input type='checkbox' name='cart_factor' class='align-middle'></div></div>";
                html += "<div class='d-flex justify-content-between border-top py-2'><div>کادوپیچی شود</div><div><span class='text-success'>" + gift_wrapping.toLocaleString("en") + " </span> <span>تومان</span></div><div><input type='checkbox' name='cart_gift_wrapping' value='" + gift_wrapping + "' class='align-middle gift-wrapping'></div></div>";
                html += "<div class='d-flex justify-content-around border-top pt-2'><div>مجموع قابل پرداخت</div><div><span class='text-success cart-result'></span><span> تومان</span></div></div>";
                html += "<div class='w-100 text-center'>";

                if (response.check == 'guest') { html += "<div class='btn btn-success btn-sm mt-3 login-btn'>ادامه ثبت سفارش</div>"; }
                if (response.check == 'auth') {
                    if (total_count != UnAvailable.length) {
                        html += "<div class='btn btn-success btn-sm mt-3 cart-confirm-btn'>ادامه ثبت سفارش</div>";
                    }
                }

                html += "</div></div>";

                $(".cart-box").html(html);
                $(".cart-result").text(price.toLocaleString("en")).data('price', price);
                $(".cart-content .alert ul").html(alert_html);

                $("#cart-dropdown-btn").data('param', UnAvailable);

            } else {

                var html = "<div><img src='/images/icon/Bag-r2.svg' width='20px'><span style='color:#b31b29'>سبد خرید</span></div>";
                html += "<div class='cart-content'><h6 class='mt-5 text-center'>سبد خرید شما خالی میباشد</h6></div>";
                $(".cart-box").html(html);

            }

            if (total_count > 0) {
                $('.cart-total-count').css('display', 'inline-block');
                $('.cart-total-count').text(total_count);
            } else {
                $('.cart-total-count').css('display', 'none');
            }

            loading('stop');
        }
    });
}

/**
 * Copy to Clipboard
 */
function clipboard() {

    $("#copy-link").click(function () {
        var copyText = document.getElementById("clipboard-input");
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");

        $("#copy-link span").text('کپی شد');

        setTimeout(function () {
            $("#copy-link span").text('کپی کردن');
        }, 3000);
    });

}

// Lazy Load Images using Intersection Observer
function lazy_load() {
    (function () {
        var observer = new IntersectionObserver(onIntersect);

        document.querySelectorAll("[data-lazy]").forEach((img) => {
            observer.observe(img);
        });

        function onIntersect(entries) {
            entries.forEach((entry) => {
                if (entry.target.getAttribute("data-processed") || !entry.isIntersecting)
                    return true;
                entry.target.setAttribute("src", entry.target.getAttribute("data-src"));
                entry.target.setAttribute("data-processed", true);
            });
        }
    })();
}