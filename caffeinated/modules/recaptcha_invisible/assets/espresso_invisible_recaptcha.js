/**
 * espresso_invisible_recaptcha.js
 *
 * @license GNU General Public License v2.0
 * @version 0.1
 * @author  Event Espresso
 * @link    http://www.eventespresso.com
 */
function espressoLoadRecaptcha() {
    jQuery(document).ready(function($) {
        if (typeof eeRecaptcha !== undefined) {
            // console.log(JSON.stringify('eeRecaptcha.siteKey: ' + eeRecaptcha.siteKey, null, 4));
            $('.g-recaptcha').each(function() {
                var $recaptcha_div = $(this),
                    $recaptcha_id  = $recaptcha_div.attr('id'),
                    $form          = $(this).parents('form:first'),
                    $submit        = $form.find(':submit');
                // console.log(JSON.stringify('recaptcha id: ' + $recaptcha_id, null, 4));
                // console.log(JSON.stringify('form name: ' + $form.attr('name'), null, 4));
                // console.log(JSON.stringify('submit id: ' + $submit.attr('id'), null, 4));
                widgetId = grecaptcha.render($recaptcha_id, {
                    "sitekey":  eeRecaptcha.siteKey,
                    "callback": function(token) {
                        // console.log(JSON.stringify('eeRecaptcha.token: ' + token, null, 4));
                        $recaptcha_div.parent().find(".g-recaptcha-response").val(token);
                        $form.submit();
                    }
                });
                // console.log(JSON.stringify('widgetId: ' + widgetId, null, 4));
                $submit.on('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if ($(this).data('g-recaptcha-id') !== $recaptcha_id) {
                        $(this).data('g-recaptcha-id', $recaptcha_id);
                        // console.log(JSON.stringify('SUBMIT widgetId: ' + widgetId, null, 4));
                        grecaptcha.execute(widgetId);
                    }
                });
            });
        }
    });
}
