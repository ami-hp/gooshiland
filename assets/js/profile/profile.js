
$('#practicalBtn').find('.active-back').removeClass('active-back');
$('#practicalBtn').find('.active-color').removeClass('active-color');
$('#practicalBtn').find('path').attr('fill', 'white');


/*panel js requirement*/
$('[data-kill]').click(function () {
    var attr = $(this).data("kill");
    $(document).find("[data-bait='" + attr + "']").removeClass(function (index, css) {
        return (css.match(/(^|\s)active\S+/g) || []).join(' ');
    });

});

$('[data-hunt]').click(function () {
    var hunt = $(this).data("hunt");
    var gun = $(this).data("gun");
    var all = $(this).data("all");

    if (all) {
        $(document).find("[class*='active']").removeClass(function (index, css) {
            return (css.match(/(^|\s)active\S+/g) || []).join(' ');
        });
    }
    else {
        $(document).find("[class*='active']:not('.no')").removeClass(function (index, css) {
            return (css.match(/(^|\s)active\S+/g) || []).join(' ');
        });
    }

    $(document).find("[data-bait='" + hunt + "']").toggleClass("active-" + gun);

});

$('[data-kill] [data-merci]').click(function (event) {
    event.stopPropagation();
});

$('[data-slidein]').on('click', function () {
    var slide = $(this).data('slidein');
    $(document).find('[data-slide="' + slide + '"]').addClass('active-top');
});

$('[data-slideout]').on('click', function () {
    var slide = $(this).data('slideout');
    $(document).find('[data-slide="' + slide + '"]').removeClass('active-top');
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
            $('.profile-aside').addClass('profile-aside-mx-content');
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


// -----------------------------------------------------------------------------------------------------------------------


// Info
$("body").on('click', '.edit-address', function (e) {

    $(".edit-address-btn").data('id', $(this).data("id"));

    $('#edit-address-modal select[name ="province"]').val($(this).data("province"));
    $('#edit-address-modal textarea[name ="address"]').val($(this).data("address"));
    $('#edit-address-modal input[name ="postal_code"]').val($(this).data("postal_code"));

    var index = $("#edit-address-modal .provinces-list").find(":selected").data('key');
    var city = "";

    provinces[index].cities.forEach(function (val, key) {
        city += "<option value='" + val.faname + "'>" + val.faname + "</option>";
    });

    $("#edit-address-modal .cities-list").html(city).attr('disabled', false);
    $('#edit-address-modal select[name ="city"]').val($(this).data("city"));
    $("#edit-address-modal").modal("show");
});

$(".open-address-modal").click(function () {
    $(".add-address-btn").removeClass('edit-address-btn');
    $("#address-modal").modal("show");
});

$(".add-address-btn").click(function () {
    var province = $('select[name ="province"]').val();
    var city = $('select[name ="city"]').val();
    var address = $('textarea[name ="address"]').val().trim();
    var postal_code = $('input[name ="postal_code"]').val().trim();

    if (province != "" && city != "" && address != "") {
        loading('start');
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

                swal({
                    icon: 'success',
                    title: ' ',
                    text: 'با موفقیت ثبت شد',
                    button: false,
                });

                location.reload();
            }
        });
    } else {
        swal({
            icon: 'error',
            title: 'خطا',
            text: 'همه اطلاعات را وارد نمایید',
            button: false,
            timer: 2000
        });
    }
});

$(".edit-address-btn").click(function () {

    var id = $(this).data('id');
    var province = $('#edit-address-modal select[name ="province"]').val();
    var city = $('#edit-address-modal select[name ="city"]').val();
    var address = $('#edit-address-modal textarea[name ="address"]').val();
    var postal_code = $('#edit-address-modal input[name ="postal_code"]').val();

    if (province != "" && city != "" && address != "") {
        loading('start');
        $.ajax({
            url: '/address/edit/' + id,
            type: 'POST',
            dataType: 'JSON',
            data: {
                'province': province,
                'city': city,
                'address': address,
                'postal_code': postal_code,
            },
            success: function (response) {

                swal({
                    icon: 'success',
                    title: ' ',
                    text: 'با موفقیت ویرایش شد',
                    button: false,
                });

                location.reload();

            }
        });
    } else {
        swal({
            icon: 'error',
            title: 'خطا',
            text: 'همه اطلاعات را وارد نمایید',
            button: false,
            timer: 2000
        });
    }
});

$("body").on('click', '.delete-address', function (e) {

    var address = $(this);

    swal({
        title: " ",
        text: "آیا مطمئنید میخواهید حذف کنید؟",
        icon: "error",
        buttons: true,
        buttons: ["خیر", "بله"],
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                loading('start');

                $.ajax({
                    url: '/address/delete',
                    method: 'POST',
                    data: {
                        'id': $(this).data('address')
                    },
                    success: function (response) {
                        loading('stop');
                        $(address).closest('.row').remove();
                    }
                });

            }
        });

});

// -----------------------------------------------------------------------------------------------------------------------

// Order
$(".myOrder").click(function () {

    loading('start');

    $.ajax({
        url: '/order/get',
        method: 'POST',
        data: {
            'id': $(this).data('order')
        }, success: function (response) {

            // var total_price = response.order.price + response.order.gift_wrapping;
            var total_price = response.order.price;

            html = "<div class='row row-cols-xl-2 row-cols-lg-2 row-cols-md-2 row-cols-sm-1 row-cols-1 pb-3 font-weight-bold'>";
            html += "    <div class='col py-2'>";
            html += "        <span class='text-danger'>کد پیگیری : </span>";
            html += "        <span>" + response.order.code + "</span>";
            html += "    </div>";
            html += "    <div class='col py-2'>";
            html += "        <span class='text-danger'>تاریخ سفارش : </span>";
            html += "        <span class='nowrap'>" + response.order.date + "</span>";
            html += "    </div>";
            html += "    <div class='col py-2'>";
            html += "        <span class='text-danger'>نام و نام خانوادگی : </span>";
            html += "        <span>" + response.order.user + "</span>";
            html += "    </div>";
            html += "    <div class='col py-2'>";
            html += "        <span class='text-danger'>آدرس : </span>";
            html += "        <span>" + response.order.address.province + " - " + response.order.address.city + " - " + response.order.address.address + "</span>";
            html += "    </div>";
            html += "    <div class='col py-2'>";
            html += "        <span class='text-danger'>کد پستی : </span>";
            html += "        <span>" + response.order.address.postal_code + "</span>";
            html += "    </div>";
            html += "    <div class='col py-2'>";
            html += "        <span class='text-danger'>کد ملی : </span>";
            html += "        <span>" + response.order.code_meli + "</span>";
            html += "    </div>";
            html += "    <div class='col py-2'>";
            html += "        <span class='text-danger'>عملیات پرداخت : </span>";
            html += "        <span class='text-success'>موفق</span>";
            html += "    </div>";
            html += "    <div class='col py-2'>";
            html += "        <span class='text-danger'>وضعیت سفارش : </span>";
            html += "        <span class='nowrap'>" + response.order.status + "</span>";
            html += "    </div>";

            if (response.order.gift_wrapping) {
                html += "    <div class='col py-2'>";
                html += "        <span class='text-danger'>کادوپیچی : </span>";
                html += "        <span class='text-success'>" + response.order.gift_wrapping.toLocaleString("en") + "</span>";
                html += "        <span class='small'>تومان</span>";
                html += "    </div>";
            }

            html += "    <div class='col py-2'>";
            html += "        <span class='text-danger'>جمع مبلغ : </span>";
            html += "        <span class='text-success'>" + total_price.toLocaleString("en") + "</span>";
            html += "        <span class='small'>تومان</span>";
            html += "    </div>";
            html += "</div>";

            response.products.forEach(product => {

                html += "<div class='row border-top py-4 font-weight-bold'>";
                html += "    <div class='col-xl-2 col-12'>";
                html += "<a href='" + product.slug + "'><img src='" + product.image + "' class='rounded'></a>";
                html += "    </div>";
                html += "    <div class='col-xl-10 col-12 text-right'>";
                html += "        <div class='my-3'>";
                html += "            <span class='text-danger'>نام : </span>";
                html += "            <span>" + product.name + "</span>";
                html += "        </div>";

                if (product.color) {
                    html += "        <div class='mb-3'>";
                    html += "            <span class='text-danger'>رنگ : </span>";
                    html += "            <span>" + product.color + "</span>";
                    html += "        </div>";
                }

                if (product.warranty) {
                    html += "        <div class='mb-3'>";
                    html += "            <span class='text-danger'>گارانتی : </span>";
                    html += "            <span>" + product.warranty + "</span>";
                    html += "        </div>";
                }

                html += "        <div class='mb-3'>";
                html += "            <span class='text-danger'>تعداد : </span>";
                html += "            <span>" + product.count + "</span>";
                html += "            <span> عدد</span>";
                html += "        </div>";
                html += "        <div class='mb-3'>";
                html += "            <span class='text-danger'>مبلغ : </span>";
                html += "            <span class='text-success'>" + product.price.toLocaleString("en") + "</span>";
                html += "            <span class='small'> تومان</span>";
                html += "        </div>";
                html += "    </div>";
                html += "</div>";

            });


            $(".order-products").html(html);
            loading('stop');

        },
        // error: function (err) {
        //     console.log(err.responseText);
        // }

    })
})

// -----------------------------------------------------------------------------------------------------------------------

// Ticket
$('#ticket-form').submit(function (event) {
    event.preventDefault();
    var form = $(this);

    $.ajax({
        url: "/ajax/ticket",
        type: 'POST',
        data: form.serialize(),
        beforeSend: function () {
            loading('start');
        },
        success: function (data) {
            swal({
                title: " ",
                text: 'تیکت شما با موفقیت ارسال شد',
                icon: 'success',
                button: false,
                timer: 1500,
            }).then(
                loading('stop')
            );

            form.find('input').val('');
            form.find('textarea').val('');
        },
        error: function (data) {
            console.log(data.responseJSON);
        }
    });
});


// -----------------------------------------------------------------------------------------------------------------------

// Messages
$("body").on('click', '[data-unseen]', function () {

    loading('start');

    let selector = $(this);
    let notificationID = $(this).attr('data-unseen');
    $.ajax({
        url: '/ajax/msgseen',
        type: 'POST',
        data: { "notificationID": notificationID },
        success: function (data) {

            loading('stop');

            selector.removeAttr('data-unseen');
            selector.find('.unSeenBox').remove();
            if (data != 0) {
                $(document).find('[data-msg]').html(data);
            } else {
                $(document).find('[data-msg]').remove();
            }

        },
        error: function (data) {
            let error = data.responseJSON;
            //console.log(error.message)
        }
    });

});

$("body").on('click', '[data-notifInfo]', function () {
    let notification = $(this).attr('data-notifInfo');
    notification = JSON.parse(notification);
    let messageBox = $('#message-overall');
    messageBox.find('#m-subject').html(notification.subject);
    messageBox.find('#m-message').html(notification.message);
    messageBox.find('#m-image').attr('src', notification.image);
    messageBox.find('#m-date').html(notification.date);
});
