
$(document).ready(function () {

    // Mobile Menu
    mobile_menu('category');
    mobile_menu('search');
    mobile_menu('profile');
    mobile_menu('cart');

    // -----------------------------------------------------

    show_cart();

    // Show Cart Box
    $("#cart-dropdown-btn").click(function () {

        var UnAvailable = $(this).data('param');

        if (UnAvailable.length) {

            $('.cart-content .alert').css('display', 'block');

            UnAvailable.forEach(element => {
                $.ajax({
                    url: "/cart/delete",
                    type: "POST",
                    dataType: "json",
                    data: {
                        'id': element[0],
                        'type': element[1],
                    },
                    success: function (response) {
                    }
                });
            });
        }

        $("#cart-dropdown > .dropdown-menu").css('display', 'block');
        $("#cart-back").css('display', 'block');
    });

    // Hide Cart Box
    $("#cart-back").click(function () {
        $(this).css('display', 'none');
        $("#cart-dropdown > .dropdown-menu").css('display', 'none');
    });

    // Cart Plus
    $('body').on('click', '.cart-plus', function () {
        var id = $(this).data('id');
        var type = $(this).data('type');

        loading('start');
        add_cart(id, type);
    });

    // Cart Minus
    $('body').on('click', '.cart-minus', function () {

        var id = $(this).data('id');
        var type = $(this).data('type');

        loading('start');
        remove_cart(id, type);

    });

    // Cart Delete
    $("body").on("click", ".cart-delete", function () {

        swal({
            title: "آیا از حذف این آیتم اطمینان دارید؟",
            icon: "warning",
            buttons: true,
            buttons: ["خیر", "بله"],
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {

                var id = $(this).data('id');
                var type = $(this).data('type');

                loading('start');
                delete_cart(id, type);
            }
        });

    });

    // Gift Wrapping
    $("body").on("click", ".gift-wrapping", function () {

        if ($(this).is(':checked')) {

            var a = $(".cart-result").data('price');
            var b = parseInt($(this).val());
            var price = a + b;
            $(".cart-result").text(price.toLocaleString("en")).data('price', price);

        } else {

            var a = $(".cart-result").data('price');
            var b = parseInt($(this).val());
            var price = a - b;
            $(".cart-result").text(price.toLocaleString("en")).data('price', price);
        }

    });

    // -----------------------------------------------------

    // Show Search
    $("#search-btn").click(function () {
        $(".search-shadow").css('display', 'block');
        $(".search-input").focus();

        $("#desktop-navbar").animate({ 'top': '-102px', 'opacity': 0 }, 400, function () {
            $("#desktop-navbar").css('display', 'none');
            $(".search-box input").val('');
            $(".search-box").css('display', 'block').animate({ 'top': '0px', 'opacity': 1 }, 400);
        });
    });

    // Hide Search
    $(".close-search-box , .search-shadow").click(function () {
        $(".search-shadow").css('display', 'none');
        $(".search-result").html('');

        $(".search-box").animate({ 'top': '-50', 'opacity': 0 }, 400, function () {
            $(".search-box").css('display', 'none');
            $("#desktop-navbar").css('display', 'block').animate({ 'top': '0px', 'opacity': 1 }, 400);
        });
    });

    // -----------------------------------------------------

    var order = {};


    // Steps Buy
    $("body").on('click', '.cart-confirm-btn', function () {
        $("#steps-buy").modal({ show: true, backdrop: "static" });
    });

    // Data Picker
    $("#datepicker").persianDatepicker({
        startDate: "today",
        endDate: "1500/00/00",
        formatDate: "ND DD NM YYYY",
        cellWidth: 36,
        cellHeight: 30,
        fontSize: 16,
    });

    // Go
    $(".go-to-step-2").click(function () {
        var name = $('#steps-buy input[name ="name"]').val().trim();
        var phone = $('#steps-buy input[name ="phone"]').val().trim();
        var email = $('#steps-buy input[name ="email"]').val().trim();
        var code_meli = $('#steps-buy input[name ="code_meli"]').val().trim();

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

    $('.go-to-step-3').click(function () {

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

        var date = $("#datepicker").data('jdate');
        var time = $('input[name=time]:checked').val();

        if (date != null) {
            order.date = date;
            order.time = time;

            $(".step-3").css('display', 'none');
            $(".step-4").css('display', 'block');
        } else {
            swal_err();
        }

    });

    // Back
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

    $("input[name=roles]").change(function () {
        if ($(this).is(':checked')) {
            $('.confirm').attr('disabled', false);
        } else {
            $('.confirm').attr('disabled', true);
        }
    });

    // Confirm Order
    $(".confirm").click(function () {

        if (!order.name || !order.phone || !order.email || !order.code_meli || !order.address || !order.date || !order.time) {
            swal_err();
        } else {

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

    // -----------------------------------------------------

    // Address
    $(".open-address-modal").click(function () {
        $("#address-modal").modal('show');
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

                    var html = "";

                    response.forEach(element => {
                        html += "<div>";
                        html += "<label class='form-check-label' style='cursor:pointer;'>";
                        html += "<input type='radio' name='address' value=" + element.id + " class='mb-3'></input>";
                        html += "<span class='mr-2'>" + element.province + " - " + element.city + " - " + element.address + "</span>";
                        html += "</label>";
                        html += "</div>";
                    });

                    $(".address-content").html(html);
                    $("#address-modal").modal('hide');

                    iran_provinces();
                    loading('stop');

                    // $('select[name ="province"]').val('');
                    $('select[name ="city"]').attr('disabled', true);
                    $('textarea[name ="address"]').val('');
                    $('input[name ="postal_code"]').val('');

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


});


// -----------------------------------------------------------------------------

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

lazy_load();