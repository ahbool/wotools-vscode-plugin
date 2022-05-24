function setToTop() {
    $('body').append('<div id="toTop"  title="back to the top"><span class="fa fa-chevron-circle-up fa-3x pui-text-blue-400"></span></div>');
    $(window).scroll(function () {
        if ($(this).scrollTop()) {
            $('#toTop').fadeIn();
        } else {
            $('#toTop').fadeOut();
        }
    });
    $('#toTop').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 200);
    });
}
$(document).ready(function () {
    'use strict';
    try {
        setToTop();
        $('.custom-select').select2();
        $('[data-toggle="tooltip"]').tooltip();
    } catch (err) {}
});
