
var phone, code, interval;
var intRegex = /^\d+$/;
$(document).ready(function () {


// Enter Phone
    $("#phoneModal-input").on("input", function () {

        phone = $(this).val();
        btn = $("#phoneModal-btn");

        if (phone.length < 11) {
            btn.attr("disabled", true);
        } else {
            if (intRegex.test(phone)) {
                if (phone.slice(0, 2) == '09') {
                    btn.attr("disabled", false);
                    btn.focus();
                }
                else {
                    btn.attr("disabled", true);
                }
            } else {
                btn.attr("disabled", true);
            }
        }
    })

// Send Code
    $("#phoneModal-btn").click(function () {

        var html = "<span class='spinner-border' role='status' aria-hidden='true'></span>";
        $(this).html(html).attr('disabled', true);

        phone = $("#phoneModal-input").val();
        getCode(phone);

    });

// Edit Phone Number
    $("#codeModal-edit").click(function () {
        $("#codeModal").modal("hide");
        $("#phoneModal").modal("show");

        $("#phoneModal-btn").attr("disabled", false);
    });

// Enter Code
    $("#codeModal-input").on("input", function () {

        code = $(this).val();
        var btn = $("#codeModal-btn");

        if (code.length < 6) {
            btn.attr("disabled", true);
        } else {
            if (intRegex.test(code)) {
                btn.attr("disabled", false);
                btn.focus();
            } else {
                btn.attr("disabled", true);
            }
        }
    })

// Confirm Code
    $("#codeModal-btn").click(function () {

        code = $("#codeModal-input").val();
        checkVerify(code);

    });

// When Open Phone
    $('#phoneModal').on('shown.bs.modal', function () {

        $('#phoneModal-input').focus();
        clearInterval(interval);

    });

// When Close Phone
    $("#phoneModal").on('hidden.bs.modal', function () {

        $("#phoneModal-btn").attr('disabled', true);

    });

// When Open Code
    $('#codeModal').on('shown.bs.modal', function () {
        $('#codeModal-input').focus();
    });

// When Close Code
    $("#codeModal").on('hidden.bs.modal', function () {

        $('#codeModal-btn').attr('disabled', true);
        clearInterval(interval);

    });

});
const phoneModal = $("#phoneModal");
// Get Verify Code
function getCode(phone) {

    $.ajax({
        url: "/user-login",
        type: "POST",
        data: {
            'phone': phone,
        },
        success: function (response) {
            if(response.trashed){
                phoneModal.modal("hide");
                swal({
                    text: "شماره ی وارد شده مجاز به ورود نمی باشد.",
                    icon: 'error',
                    button: false,
                    timer: 2000,
                })
                    .then((value) => {
                        location.reload();
                    });

                return;
            }
            if(response.sms === "expired"){
                phoneModal.modal("hide");
                swal({
                    title: "ورود موقتا بسته می باشد",
                    text : "لطفا به پشتیبانی اطلاع دهید.",
                    icon : 'error',
                    button: false,
                    timer: 4000,
                })

                return;
            }

            $("#codeModal-phone").text(response.phone);
            $("#codeModal-input").val('');

            phoneModal.modal("hide");
            $("#codeModal").modal("show");

            $('#codeModal-timer').text("2:00");
            $("#phoneModal-btn").text('ارسال کد');

            timer();
            // console.log(response);
        }
    });

}

// Check Verify Code
function checkVerify(code) {

    $.ajax({
        url: "/user-verify",
        type: "POST",
        data: {
            'code': code,
        },
        success: function (response) {

            if (response.expire == true) {

                expire();

            } else {
                if (response.code == true) {

                    clearInterval(interval);

                    swal({
                        text: "با موفقیت وارد شدید",
                        icon: 'success',
                        button: false,
                        timer: 2000,
                    })
                        .then((value) => {
                            location.reload();
                        });

                } else {

                    swal({
                        text: "کد وارد شده اشتباه است",
                        icon: 'error',
                        button: "تایید",
                    })
                        .then((value) => {
                            $("#codeModal-btn").attr('disabled', true);
                            $("#codeModal-input").val('').focus();
                        });

                }
            }
        }
    });

}

// Timer
function timer() {

    clearInterval(interval);

    interval = setInterval(function () {
        var timer = $('#codeModal-timer').html();
        timer = timer.split(':');
        var minutes = timer[0];
        var seconds = timer[1];
        seconds -= 1;

        if (minutes < 0) return;
        else if (seconds < 0 && minutes != 0) {
            minutes -= 1;
            seconds = 59;
        } else if (seconds < 10 && length.seconds != 2) seconds = '0' + seconds;

        $('#codeModal-timer').html(minutes + ':' + seconds);

        // Expire
        if (minutes == 0 && seconds == 0) {

            clearInterval(interval);
            expire();

        }
    }, 1000);

}

// Expire Code
function expire() {

    swal("کد شما منقضی شده", {
        buttons: {
            confirm: {
                text: "ارسال مجدد",
                value: "try",
            },
            cancel: "انصراف",
        },
        icon: "info",
    })
        .then((value) => {

            switch (value) {
                case "try":
                    $("#codeModal-btn").attr('disabled', true);
                    phone = $("#phoneModal-input").val();
                    getCode(phone);
                    break;

                default:
                    $("#phoneModal").modal("hide");
                    $("#codeModal").modal("hide");
            }
        });

}
