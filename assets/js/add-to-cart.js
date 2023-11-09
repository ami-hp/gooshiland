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


    if(selected_span.innerText.trim() === "is"){

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
                console.log(selected);
                html = get_price_html(selected.price, selected.prev);
            } else {
                // console.log(111);
                html = get_tag_html(selected.tag);
            }
        }

        // }

        cart_btn_section.html(html);

        $("#cw_data").data('id', selected.id);

    }



    // Select Color
    $(document).on("click", ".color-img", function () {

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
                    console.log(data);
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
