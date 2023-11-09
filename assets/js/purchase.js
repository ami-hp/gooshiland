const cart_price = $(".cart-result");

/**
 * Add To Cart
 * @param {Number} id `Product ID`
 * @param {String} type `Product Type`
 */
function add_cart(id) {

    $.ajax({
        url: "/cart/add",
        type: "POST",
        dataType: "json",
        data: {
            'id': id,
        },
        success: (res) => {
            show_cart();
        },
        error: (err) => {
            console.log(err.responseText);
        }
    });
}

/**
 *
 * @param {Number} id `Product ID`
 * @param {String} type `Product Type`
 */
function remove_cart(id) {

    $.ajax({
        url: "/cart/remove",
        type: "POST",
        dataType: "json",
        data: {
            'id': id,
        },
        success: (res) => {
            show_cart();
        },
        error: (err) => {
            console.log(err.responseText);
        }
    });
}

/**
 *
 * @param {Number} id `Product ID`
 * @param {String} type `Product Type`
 */
function delete_cart(id) {

    $.ajax({
        url: "/cart/delete",
        type: "POST",
        dataType: "json",
        data: {
            'id': id,
        },
        success: function (response) {
            show_cart();
        },
        error: (err) => {
            console.log(err.responseText);
        }
    });
}

/**
 *
 */
let show_cart = () => {

    $.ajax({
        url: "/cart",
        type: "POST",
        dataType: "JSON",
        success: function (response) {

            let price = 0;
            let total_count = 0;
            let alert_html = "";
            let UnAvailable = [];
            let html = "";

            // if (response.cart) {
            if (response.cart.length) {

                let myCart = response.cart
                    .filter(function(element) {
                        return element.id != null;
                    })

                // -----------------------------------------------------
                //Basket Items Start
                myCart.forEach(object => {

                    price = price + (object.price * object.count);
                    total_count = total_count + object.count;
                    /**
                     * foreach Sample Start
                     */
                    html += `<div class='row m-0 mt-3 mx-auto py-2 position-relative'>`;

                    html += `<div class='col-3 align-self-center p-0 pr-2'>`;
                    // Image Start
                    html += `<img src='${object.image}' class='w-100 rounded' alt='${object.image}'>`;
                    // Image ENd
                    html += "</div>";


                    html += `<div class='col-7 p-0 pr-2'>`;

                    // Title
                    if (object.color) {
                        html += `<div class='limitText-1'>${object.name} | ${object.color} | ${object.warranty}</div>`;
                    }
                    else {
                        html += `<div class='limitText-1'>${object.name}</div>`;
                    }
                    // Title End


                    // Price Start
                    let price2 = parseInt(object.price);
                    html += `<div>`
                    html += `<span>قیمت </span>`;
                    html += `<span class='text-success'>${price2.toLocaleString('en')}</span>`;
                    html += `<span class='small'> تومان</span>`;
                    html += `</div>`;
                    // Price END

                    html += `</div>`;

                    html += `<div class='col-2 justify-content-center p-0'>`;

                    // Plus
                    // if (object.count >= object.storage) {
                    // html += `<img src='/images/icon/plus-r.svg' style='opacity:0.6'>`;
                    // }
                    // else {
                    // html += `<img src='/images/icon/plus-r.svg' class='cart-plus' data-id=` + object.id + ` data-type=` + object.type + `>`;
                    // }

                    // Plus Start
                    if (object.tag != 0) {
                        html += `<svg class='pointer' style='opacity:0.6' width='23' height='23' viewBox='0 0 23 23' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='11.5' cy='11.5' r='11.5' transform='rotate(-180 11.5 11.5)' fill='#fc5952'/><path fill-rule='evenodd' clip-rule='evenodd' d='M11.5002 5.96289C11.9539 5.96289 12.3217 6.34428 12.3217 6.81474V11.074H16.4288C16.8825 11.074 17.2502 11.4554 17.2502 11.9259C17.2502 12.3963 16.8825 12.7777 16.4288 12.7777H12.3217V17.037C12.3217 17.5074 11.9539 17.8888 11.5002 17.8888C11.0466 17.8888 10.6788 17.5074 10.6788 17.037V12.7777H6.57167C6.11801 12.7777 5.75024 12.3963 5.75024 11.9259C5.75024 11.4554 6.11801 11.074 6.57167 11.074H10.6788V6.81474C10.6788 6.34428 11.0466 5.96289 11.5002 5.96289Z' fill='white'/></svg>`;
                        // html += `<img src='/images/icon/plus-r.svg' style='opacity:0.6'>`;
                    }// Plus Start
                    else {
                        html += `<svg class='pointer cart-plus' data-id='${object.id}' width='23' height='23' viewBox='0 0 23 23' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='11.5' cy='11.5' r='11.5' transform='rotate(-180 11.5 11.5)' fill='#fc5952'/><path fill-rule='evenodd' clip-rule='evenodd' d='M11.5002 5.96289C11.9539 5.96289 12.3217 6.34428 12.3217 6.81474V11.074H16.4288C16.8825 11.074 17.2502 11.4554 17.2502 11.9259C17.2502 12.3963 16.8825 12.7777 16.4288 12.7777H12.3217V17.037C12.3217 17.5074 11.9539 17.8888 11.5002 17.8888C11.0466 17.8888 10.6788 17.5074 10.6788 17.037V12.7777H6.57167C6.11801 12.7777 5.75024 12.3963 5.75024 11.9259C5.75024 11.4554 6.11801 11.074 6.57167 11.074H10.6788V6.81474C10.6788 6.34428 11.0466 5.96289 11.5002 5.96289Z' fill='white'/></svg>`;
                        // html += `<img src='/images/icon/plus-r.svg' class='cart-plus' data-id='${object.id}' data-type='${object.type}'>`;
                    }
                    // Plus END

                    // Count
                    html += `<div class='text-danger py-2 cart-count text-center'>${object.count}</div>`;

                    // Minus
                    if (object.count == 1) {
                        html += `<svg class='pointer' style='opacity:0.6' width='24' height='23' viewBox='0 0 24 23' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='11.574' cy='11.5' r='11.5' transform='rotate(-180 11.574 11.5)' fill='#fc5952'/><rect x='5.82397' y='11.0742' width='11.5' height='1.7037' rx='0.851852' fill='white'/></svg>`;
                        // html += `<img src='/images/icon/minus-r.svg' style='opacity:0.6'>`;
                    } else {
                        html += `<svg class='pointer cart-minus' data-id='${object.id}' width='24' height='23' viewBox='0 0 24 23' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='11.574' cy='11.5' r='11.5' transform='rotate(-180 11.574 11.5)' fill='#fc5952'/><rect x='5.82397' y='11.0742' width='11.5' height='1.7037' rx='0.851852' fill='white'/></svg>`;
                        // html += `<img src='/images/icon/minus-r.svg' class='cart-minus' data-id='${object.id}'>`;
                    }


                    // html += `</div><img src='/images/icon/trash.svg' class='cart-delete' data-id='${object.id}'></div>`;

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

                        UnAvailable.push([object.id]);

                        $("#cart-dropdown-btn").data('alert', 'true');

                        alert_html += `<li>`;
                        alert_html += `موجودی `;

                        if (object.color) {
                            alert_html += `<span class='font-black'>${object.name} | ${object.color} | ${object.warranty}</span>`;
                        } else {
                            alert_html += `<span class='font-black'>${object.name}</span>`;
                        }

                        alert_html += " به پایان رسیده است";
                        alert_html += `</li>`;
                    }

                    html += `</div>`;
                    // Delete
                    html += `<svg class='pointer cart-delete' data-id='${object.id}' width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='24' height='24' rx='4' fill='#fc5952' fill-opacity='0.72'/><path opacity='0.4' d='M18.3694 9.90705C18.3694 9.96371 17.9253 15.581 17.6716 17.9451C17.5127 19.3959 16.5775 20.2759 15.1746 20.3009C14.0966 20.325 13.0414 20.3333 12.0032 20.3333C10.901 20.3333 9.82309 20.325 8.77678 20.3009C7.42088 20.2684 6.4848 19.3709 6.33406 17.9451C6.07309 15.5727 5.63706 9.96371 5.62895 9.90705C5.62085 9.73622 5.67596 9.57373 5.78781 9.44206C5.89803 9.3204 6.05688 9.24707 6.22383 9.24707H17.7826C17.9488 9.24707 18.0995 9.3204 18.2186 9.44206C18.3297 9.57373 18.3856 9.73622 18.3694 9.90705Z' fill='white'/><path d='M19.5 6.98055C19.5 6.63807 19.2301 6.36974 18.9059 6.36974H16.4762C15.9818 6.36974 15.5522 6.01809 15.442 5.52227L15.3059 4.91479C15.1154 4.18065 14.4581 3.6665 13.7206 3.6665H10.2802C9.53458 3.6665 8.88378 4.18065 8.68603 4.95479L8.55879 5.52311C8.44775 6.01809 8.01821 6.36974 7.52464 6.36974H5.09488C4.76988 6.36974 4.5 6.63807 4.5 6.98055V7.29721C4.5 7.63136 4.76988 7.90802 5.09488 7.90802H18.9059C19.2301 7.90802 19.5 7.63136 19.5 7.29721V6.98055Z' fill='white'/></svg>`;
                });
                $('.cart-content').html(html);
                $(".cart-box .alert:first ul").html(alert_html);
                /**
                 * foreach Sample end
                 */
                    //Basket Items End


                    // -----------------------------------------------------
                    //Gift Wrapping Start
                let gift_wrapping = parseInt(response.gift_wrapping);
                $('#gift_wrapping_price').html(gift_wrapping.toLocaleString('en'));
                $('#gift_wrapping_input').val(gift_wrapping);
                //Gift Wrapping END


                cart_price.text(price.toLocaleString("en")).data('price', price);


                $("#cart-dropdown-btn").data('param', UnAvailable);

            }
            else {

                html = "<h6 class='mt-5 text-center'>سبد خرید شما خالی میباشد</h6>";

                $(".cart-content").html(html);

            }

            if (total_count > 0) {
                $('.cart-total-count')
                    .css('display', 'flex')
                    .text(total_count);
            } else {
                $('.cart-total-count').css('display', 'none');
            }

            // loading('stop');
        },
        error: (err) => {
            console.log(err.responseText);
        }
    });
}

show_cart();

// Show Cart Box
$("#cart-dropdown-btn").click(function () {

    let UnAvailable = $(this).data('param');

    if (UnAvailable.length) {

        $('.cart-content .alert').css('display', 'block');

        UnAvailable.forEach(element => {
            $.ajax({
                url: "/cart/delete",
                type: "POST",
                dataType: "json",
                data: {
                    'id': element[0],
                },
                success: function (response) {
                    console.log(response);
                },
                error: (err) => {
                    console.log(err.responseText);
                }
            });
        });
    }
});

// Hide Cart Box
// $("#cart-back").click(function () {
//     $(this).css('display', 'none');
//     $("#cart-dropdown > .dropdown-menu").css('display', 'none');
// });


$('body')
    .on('click', '.cart-plus', function () {// Cart Plus
        let id = $(this).data('id');
        if(id)
            add_cart(id)
        else
            console.error('ID is Null')

    })
    .on('click', '.cart-minus', function () {// Cart Minus

        let id = $(this).data('id');
        // var type = $(this).data('type');
        if(id)
            remove_cart(id);
        else
            console.error('ID is Null')

    })
    .on("click", ".cart-delete", function () {// Cart Delete

        swal({
            text: "آیا از حذف این آیتم اطمینان دارید؟",
            title: " ",
            icon: "warning",
            buttons: true,
            buttons: ["خیر", "بله"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    let id = $(this).data('id');
                    if(id)
                        delete_cart(id)
                    else
                        console.error('ID is Null')
                }
            });
    })
    .on("click", ".gift-wrapping", function () { // Gift Wrapping
        let a;
        let b;
        let price;
        if ($(this).is(':checked')) {
            a = cart_price.data('price');
            b = parseInt($(this).val());
            price = a + b;
            cart_price.text(price.toLocaleString("en")).data('price', price);
        }
        else {
            a = cart_price.data('price');
            b = parseInt($(this).val());
            price = a - b;
            cart_price.text(price.toLocaleString("en")).data('price', price);
        }
    });





window.addEventListener("load", () => {
    const selected_span = document.getElementById('selected_data');
    const cart_btn_section = $("#cart-btn-section");
    let get_tag_html = (tag) => {
        let a;
        switch (tag) {
            case '1':
                a = "<a href='tel:123-456-7890' class='text-white'>تماس بگیرید</a>";
                break;

            case '2':
                a = '<div>سفارشی</div>';
                break;

            case '3':
                a = '<div>توقف تولید</div>';
                break;

            case '4':
                a = '<div>موجود نیست</div>';
                break;

            case '5':
                a = '<div>به زودی</div>';
                break;
        }
        return a;
    }
    let get_price_html = (price, prev = null) => {

        price = parseInt(price);


        html = '<div class="col-12 col-md-5 text-center addBasketBox f12-mxmd f14-mxlg f16 pointer"  id="add-cart-btn"><span>افزودن به سبد خرید</span></div>';

        html += '<div class="col-12 col-md-6 d-flex flex-column align-items-end" id="cw_input" >';
        //off price start
        //html += '<div class=""><del>820,000</del> <span class="badge badge-danger">%15</span></div>';
        if (prev) {
            prev = parseInt(prev);
            html += "<small>";
            html += "<del>" + prev.toLocaleString("en") + " تومان</del>";
            html += "</small>";
        } else {
            html += "<del></del>";
        }
        //off price end
        html += '<div>';
        //main price start
        html += '<span class="h5 bold mt-1">' + price.toLocaleString("en") + '<span class="light h6">تومان</span></span>';
        //main price end
        html += '</div>';

        html += '</div>';


        return html;
    }

    console.log(selected_span);
    if(selected_span != null && selected_span.innerText.trim() === "is"){

        let selected = selected_span.getAttribute('data-params');

        var color = $(".color-img[data-id='" + selected.color + "']");
        $('.color-name').html($(color).data('name'));
        $(color).addClass('active');

        var html = "",
            warranties = $(color).data('param');

        if (warranties) {

            warranties.forEach(warranty => {
                if (warranty.id == selected.id) {
                    html += "<div class='warranty active' data-param='" + JSON.stringify(warranty) + "'>" + warranty.name + "</div>";
                } else {
                    html += "<div class='warranty' data-param='" + JSON.stringify(warranty) + "'>" + warranty.name + "</div>";
                }
            });

            $(".warranties").html(html);
        }


        // if (selected.storage == 0) {
        //     html = get_tag_html('4');
        // } else {

        if (selected.tag == "") {
            html = get_tag_html("4");
            cart_btn_section.html(html);
        } else {

            if (selected.tag == 0) {

                html = get_price_html(selected.price, selected.prev);
            }
            else {
                // console.log(111);
                html = get_tag_html(selected.tag);
            }
        }

        // }

        cart_btn_section.html(html);

        $("#cw_data").data('id', selected.id);

    }



    // Select Color
    $(document)
        .on("click", ".color-img", function () {

        $('.color-img').removeClass('active');
        $('.color-name').html($(this).data('name'));
        $(this).addClass('active');

        var html = "",
            warranties = $(this).data('param');

        warranties.forEach(warranty => {
            html += "<div class='warranty' data-param='" + JSON.stringify(warranty) + "'>" + warranty.name + "</div>";
        });

        $(".warranties").html(html);

        $('.warranty:first').addClass('active');

        var html, data = $('.warranty:first').data('param');

        // if (data.storage == 0) {
        //     html = get_tag_html('4');
        // } else {
        if (data.tag == 0) {
            html = get_price_html(data.price, data.prev_price);
        } else {
            html = get_tag_html(data.tag);
        }
        // }

        $("#cw_data").data('id', data.id);
        cart_btn_section.html(html);
    })
        .on('click', '.warranty', function () {
            // Select Warranty
            let html, data = $(this).data('param');
            $('.warranty').removeClass('active');
            $(this).addClass('active');

            // if (data.storage == 0) {
            //     html = get_tag_html('4');
            // } else {
            if (data.tag == 0) {
                html = get_price_html(data.price, data.prev_price);
            } else {
                html = get_tag_html(data.tag);
            }
            // }

            $("#cw_data").data('id', data.id);
            cart_btn_section.html(html);
        })
        .on('click', "#add-cart-btn", function () {

            console.log("add");

            $.ajax({
                url: "/cart/add",
                type: "POST",
                dataType: "json",
                data: {
                    'id': $("#cw_data").data('id'),
                },
                success: (data) => {

                    show_cart();

                    swal({
                        'text': 'با موفقیت به سبد خرید اضافه شد',
                        'title': ' ',
                        'icon': 'success',
                        button: false,
                        timer: 2500,
                    });
                },
                error: (err) => {
                    console.log(err)
                }
            })


        });
});
