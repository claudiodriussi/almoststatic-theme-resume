// Main js

// ----------------------------------------------------------------------------
// jQuery submit form with ajax call
// see:
// https://stackoverflow.com/questions/1960240/jquery-ajax-submit-form
//
// in your html code add:
//
// <script> $("#form1").submit(send_mail); </script>
//
function send_mail(e) {
    e.preventDefault(); // avoid to execute the actual submit of the form.
    var form = $(this);
    $.ajax({
        type: form.attr('method'),
        url: form.attr('action'),
        data: form.serialize(), // serializes the form's elements.
        success: function (data) {
            alert(data['message']); // show response from the php script.
        }
    });
}

// ----------------------------------------------------------------------------
// WOW and animate.css
//
// https://wowjs.uk/
// https://animate.style/
//
// animate objet when become visible. add class="wow animate__bounce" to the
// object to animate.
//
// WOW uses as default animateClass the older class of animate.css so you need
// to declare the newer which is 'animate__animated'
//
new WOW({ animateClass: 'animate__animated' }).init();

// ----------------------------------------------------------------------------
// COOKIES EUROPEAN LAW
//
// thanks to: https://html-online.com/articles/cookie-warning-widget-with-javascript/
function GetCookie(name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while (i < clen) {
        var j = i + alen;
        if (document.cookie.substring(i, j) == arg)
            return "here";
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) break;
    }
    return null;
}
function testFirstCookie() {
    var offset = new Date().getTimezoneOffset();
    $("#timezoneOffset").text(offset);
    if ((offset >= -180) && (offset <= 0)) { // Detect European time zones
        var visit = GetCookie("cookieCompliancyCookie");
        if (visit == null) {
            $("#myCookieConsent").fadeIn(400);// Show warning
        } else {
            // Already accepted
        }
    }
}
$(document).ready(function () {
    $("#cookieButton").click(function () {
        console.log('Understood');
        var expire = new Date();
        expire = new Date(expire.getTime() + 7776000000);
        document.cookie = "cookieCompliancyCookie=here; expires=" + expire;
        $("#myCookieConsent").hide(400);
    });
    testFirstCookie();
    // for debug reasons
    // $("#myCookieConsent").fadeIn(400);
});

// ----------------------------------------------------------------------------