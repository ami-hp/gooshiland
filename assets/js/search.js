var old_html, text = "";
let resultBox = document.querySelector('.search-result');
$('.search-input').on('input', delay(function() {

    if (text != this.value.trim()) {
        search(this.value.trim());
    }

    text = this.value.trim();

}, 500));


// Delay
function delay(callback, ms) {
    var timer = 0;
    return function() {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function() {
            callback.apply(context, args);
        }, ms || 0);
    };
}

// Search
function search(text) {

    if (text.length < 2) {

        $(".search-result").html("");
        console.log(resultBox);
        resultBox.style.display = "none";

    } else {
        resultBox.style.display = "flex";
        $.ajax({
            url: "/search",
            type: 'POST',
            data: { "text" : text },
            beforeSend: function (){
                $(".search-result").html("<div class='text-center my-3'><div class='spinner-border text-light'></div></div>");
            },
            success: function(response) {
                console.log(response);

                var html = "";
                var svgSearch = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11.7669" cy="11.7666" r="8.98856" stroke="rgb(var(--color-primary-500))" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path opacity="0.4" d="M18.0186 18.4851L21.5426 22" stroke="rgb(var(--color-primary-500))" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
                // Product Cat
                response.productCat.forEach(productCat => {
                    html += "<a href='/category/" + productCat.en_name + "'>";
                    html += "<div class='d-flex py-2 align-items-center'>";
                    html += svgSearch;
                    html += "<div class='pr-2'>";
                    html += "<div class='f14 limitText-1 text-black'>" + productCat.name + "</div>";
                    html += "<div class='f12 font-weight-light'>دسته بندی</div>";
                    html += "</div>";
                    html += "</div>";
                    html += "</a>";
                });

                // Product
                response.product.forEach(product => {
                    html += "<a href='/product/" + product.slug + "'>";
                    html += "<div class='d-flex py-2 align-items-center'>";
                    html += svgSearch;
                    html += "<div class='pr-2'>";
                    html += "<div class='f14 limitText-1 text-black'>" + product.name + "</div>";
                    html += "<div class='f12 font-weight-light'>محصول</div>";
                    html += "</div>";
                    html += "</div>";
                    html += "</a>";
                });

                // Used Product
                // response.usedproduct.forEach(usedproduct => {
                //     html += "<a href='/used-product/" + usedproduct.en_name + "'>";
                //     html += "<div class='d-flex py-2 w3-animate-right'>";
                //     html += "<img src='/images/icon/search-w.svg' alt='' width='30px'>";
                //     html += "<div class='pr-2'>";
                //     html += "<div class='limitText-1'>" + usedproduct.name + "</div>";
                //     html += "<div>محصول دسته دوم</div>";
                //     html += "</div>";
                //     html += "</div>";
                //     html += "</a>";
                // });

                // News
                response.news.forEach(news => {
                    html += "<a href='/news/" + news.en_title + "'>";
                    html += "<div class='d-flex py-2 align-items-center'>";
                    html += svgSearch;
                    html += "<div class='pr-2'>";
                    html += "<div class='f14 limitText-1 text-black'>" + news.title + "</div>";
                    html += "<div class='f12 font-weight-light'>خبر</div>";
                    html += "</div>";
                    html += "</div>";
                    html += "</a>";
                });

                // Video
                // response.video.forEach(video => {
                //     html += "<a href='/videos/" + video.en_title + "'>";
                //     html += "<div class='d-flex py-2 w3-animate-right'>";
                //     html += "<img src='/images/icon/search-w.svg' alt='' width='30px'>";
                //     html += "<div class='pr-2'>";
                //     html += "<div class='limitText-1'>" + video.title + "</div>";
                //     html += "<div>ویدیو</div>";
                //     html += "</div>";
                //     html += "</div>";
                //     html += "</a>";
                // });

                // Gift Card
                // response.giftcard.forEach(giftcard => {
                //     html += "<a href='/giftcard'>";
                //     html += "<div class='d-flex py-2 w3-animate-right'>";
                //     html += "<img src='/images/icon/search-w.svg' alt='' width='30px'>";
                //     html += "<div class='pr-2'>";
                //     html += "<div class='limitText-1'>" + giftcard.name + "</div>";
                //     html += "<div>گیفت کارت</div>";
                //     html += "</div>";
                //     html += "</div>";
                //     html += "</a>";
                // });


                // if (html != old_html) {
                //     old_html = html;
                $(".search-result").html(html);
                // }

                $(".spinner-border").parent().remove();

                if (html.trim().length == 0) {
                    html = "<div class='text-center text-white m-3 w3-animate-right'>چیزی یافت نشد</div>";
                    $(".search-result").html(html);
                }

            },
            error: function (response) {
                console.log(response);
            }
        });

    }

}
