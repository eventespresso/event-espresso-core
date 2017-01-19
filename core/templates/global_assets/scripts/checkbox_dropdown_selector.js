jQuery(document).ready(function ($) {

    var autoFadeTime = 1000;

    $('.checkbox-dropdown-selector-btn').on(
        'click',
        function (e) {
            e.preventDefault();
            e.stopPropagation();
            var $options = $('#' + $(this).data('target'));
            if ($options.length) {
                clearTimeout(parseInt($options.data('optionsAutoFade')));
                $options.css({
                    'background': eeGetParentBackgroundColor($options)
                });
                $options.stop(true).fadeIn(100);
            }
        }
    ).mouseleave(
        function () {
            var $options = $('#' + $(this).data('target'));
            if ($options.length) {
                var optionsAutoFade = setTimeout(
                    function () {
                        if ($options.length && $options.not(":hover")) {
                            $options.stop(true).fadeOut(250);
                        }
                    },
                    autoFadeTime
                );
                $options.data('optionsAutoFade', parseInt(optionsAutoFade));
            }
        }
    );

    $(document).on(
        'mouseenter',
        '.checkbox-dropdown-selector',
        function () {
            clearTimeout(parseInt($(this).data('optionsAutoFade')));
            $(this).stop(true).fadeIn(100);
        }
    ).on(
        'mouseleave',
        '.checkbox-dropdown-selector',
        function () {
            $(this).stop(true).delay(autoFadeTime).fadeOut(250);
        }
    );


});



