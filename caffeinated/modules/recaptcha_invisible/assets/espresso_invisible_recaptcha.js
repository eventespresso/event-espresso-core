/**
 * espresso_invisible_recaptcha.js
 *
 * @license GNU General Public License v2.0
 * @version 0.1
 * @author  Event Espresso
 * @link    http://www.eventespresso.com
 *
 * @namespace {object} eeRecaptcha
 * @type {{
 *     siteKey: string,
 *     submit_button_id: string,
 *     wp_debug: boolean,
 * }}
 *
 * @namespace {object} grecaptcha
 * @type {{
 *     render: function,
 *     execute: function,
 * }}
 */
function espressoLoadRecaptcha() {
    jQuery(document).ready(function($) {
        if (typeof eeRecaptcha === 'undefined'){
            return;
        }
        // convert truthy values to pure booleans
        eeRecaptcha.recaptcha_passed = eeRecaptcha.recaptcha_passed === 'true' || eeRecaptcha.recaptcha_passed === '1';
        eeRecaptcha.disable_submit = eeRecaptcha.disable_submit === 'true' || eeRecaptcha.disable_submit === '1';
        eeRecaptcha.wp_debug = eeRecaptcha.wp_debug === 'true' || eeRecaptcha.wp_debug === '1';
        console_log_object('eeRecaptcha', eeRecaptcha, 3);
        if (eeRecaptcha.recaptcha_passed !== true) {
            if (eeRecaptcha.wp_debug) {
                console.log();
                console.log(JSON.stringify('eeRecaptcha.siteKey: ' + eeRecaptcha.siteKey, null, 4));
                console.log();
            }
            $('.g-recaptcha').each(function() {
                var $recaptcha_div = $(this),
                    $recaptcha_id  = $recaptcha_div.attr('id'),
                    $form          = $(this).parents('form:first'),
                    $submit        = $recaptcha_div.data('submit_button_id') !== ''
                        ? $('#' + $recaptcha_div.data('submit_button_id'))
                        : $form.find(':submit:not(.datetime-selector)');
                if (eeRecaptcha.wp_debug) {
                    console.log(JSON.stringify('recaptcha id: ' + $recaptcha_id, null, 4));
                    console.log(JSON.stringify('form name: ' + $form.attr('name'), null, 4));
                    console.log(JSON.stringify('$recaptcha_div.data(\'submit_button_id\'): ' + $recaptcha_div.data('submit_button_id'), null, 4));
                    console.log(JSON.stringify('submit id: ' + $submit.attr('id'), null, 4));
                }
                var widgetId = grecaptcha.render(
                    $recaptcha_id,
                    {
                        'sitekey':  eeRecaptcha.siteKey,
                        'callback': function(token) {
                            if (eeRecaptcha.wp_debug) {
                                console.log();
                                console.log(JSON.stringify('FORM SUBMIT CALLBACK', null, 4));
                                console.log(JSON.stringify('eeRecaptcha.token: ' + token, null, 4));
                            }
                            // $recaptcha_div.parent().find('.g-recaptcha-response').val(token);
                            $('.g-recaptcha-response').each(function() {
                                $(this).val(token);
                                if (eeRecaptcha.wp_debug) {
                                    console.log('set g-recaptcha-response: ' + $(this).attr('id'));
                                    console.log('g-recaptcha-response: ' + $(this).val());
                                }
                            });
                            eeRecaptcha.recaptcha_passed = true;
                            // $form.submit();
                            $submit.data('ee-submitted', true)
                                   .prop('disabled', false)
                                   .removeClass('disabled ee-button-disabled');
                            if (eeRecaptcha.wp_debug) {
                                console.log();
                                console.log(JSON.stringify('>> TRIGGER CLICK ON #' + $submit.attr('id') + ' <<', null, 4));
                            }
                            // need a small timeout before triggering click on submit button
                            setTimeout(
                                function() {
                                    $submit.click();
                                    if (eeRecaptcha.disable_submit !== true) {
                                        $submit.prop('disabled', true).addClass('disabled ee-button-disabled');
                                    }
                                },
                                100
                            );
                        }
                    }
                );
                if (eeRecaptcha.wp_debug) {
                    console.log(JSON.stringify('widgetId: ' + widgetId, null, 4));
                    console.log();
                }
                $submit.on('click', function(event) {
                    if (eeRecaptcha.wp_debug) {
                        console.log();
                        console.log(JSON.stringify('>> SUBMIT BUTTON CLICKED <<', null, 4));
                        console.log(JSON.stringify('data(ee-submitted): ' + $submit.data('ee-submitted'), null, 4));
                        console.log(JSON.stringify('disabled: ' + $submit.prop('disabled'), null, 4));
                    }
                    if ($submit.data('ee-submitted') !== true && eeRecaptcha.recaptcha_passed !== true) {
                        event.preventDefault();
                        event.stopPropagation();
                        if (eeRecaptcha.disable_submit !== true) {
                            $submit.prop('disabled', true).addClass('disabled ee-button-disabled');
                        }
                        if (eeRecaptcha.wp_debug) {
                            console.log(JSON.stringify('disabled: ' + $submit.prop('disabled'), null, 4));
                        }
                        if ($(this).data('g-recaptcha-id') !== $recaptcha_id) {
                            $(this).data('g-recaptcha-id', $recaptcha_id);
                            if (eeRecaptcha.wp_debug) {
                                console.log(JSON.stringify('SUBMIT WIDGET ID: ' + widgetId, null, 4));
                                console.log();
                            }
                            grecaptcha.execute(widgetId);
                        }
                    }
                });
            });
        }
    });
}

/*

*/
