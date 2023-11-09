class OfferTimer {

    xmlHttp;
    serverTime;

    srvTime() {

        try {
            //FF, Opera, Safari, Chrome
            this.xmlHttp = new XMLHttpRequest();
        } catch (err1) {
            //IE
            try {
                this.xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
            } catch (err2) {
                try {
                    this.xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
                } catch (eerr3) {
                    //AJAX not supported, use CPU time.
                    console.error('AJAX is not Supported')
                }
            }
        }

        this.xmlHttp.open('HEAD', window.location.href.toString(), false);
        this.xmlHttp.setRequestHeader("Content-Type", "text/html");
        this.xmlHttp.send('');

        return this.xmlHttp.getResponseHeader("Date");
    }

    timer(time, day_selector, hour_selector, minute_selector, second_selector) {
        let st = this.srvTime();
        let date = new Date(st);
        let now = date.getTime();
        this.serverTime = now;
        let deadline = time * 1000;
        let MS_PER_SECOND = 1000; //1s

        setInterval(() => {

            now = now + MS_PER_SECOND;
            this.serverTime = now;

            if (deadline > now) {

                let t = deadline - now;
                let days = Math.floor(t / (1000 * 60 * 60 * 24));
                let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((t % (1000 * 60)) / 1000);

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
}


window.addEventListener("load", function () {

    const timestamp = document.getElementById('offer1_timestamp');
    const active = document.getElementById('offer1_active');

    if (timestamp) {
        let offer_time = timestamp.innerHTML.trim();
        let offer_active = active.innerHTML.trim();

        console.log(offer_time, offer_active);

        if (offer_active > 0) {
            let OfferTimerClass = new OfferTimer();

            OfferTimerClass.timer(offer_time, '.offer_day', '.offer_hour', '.offer_minutes', '.offer_second');
        }
    }

});
