<?php

namespace EventEspresso\modules\single_page_checkout\form;

use EE_Checkout;
use EE_Form_Section_Proper;
use EE_Registry;
use EE_SPCO_Reg_Step;
use EE_Template_Layout;
use EventEspresso\core\domain\entities\custom_post_types\EspressoPostType;

/**
 * Class LegacySpcoForm
 *
 * @package EventEspresso\modules\single_page_checkout\form
 * @since 5.0.30.p
 */
class LegacySpcoForm extends EE_Form_Section_Proper
{
    public function __construct(EE_Checkout $checkout, bool $empty_cart, int $session_expiration)
    {
        parent::__construct(
            [
                'name'            => 'single-page-checkout',
                'html_id'         => 'ee-single-page-checkout-dv',
                'layout_strategy' =>
                    new EE_Template_Layout(
                        [
                            'layout_template_file' => SPCO_TEMPLATES_PATH . 'registration_page_wrapper.template.php',
                            'template_args'        => [
                                'empty_cart'              => $empty_cart,
                                'revisit'                 => $checkout->revisit,
                                'reg_steps'               => $checkout->reg_steps,
                                'next_step'               => $checkout->next_step instanceof EE_SPCO_Reg_Step
                                    ? $checkout->next_step->slug()
                                    : '',
                                'empty_msg'               => apply_filters(
                                    'FHEE__Single_Page_Checkout__display_spco_reg_form__empty_msg',
                                    sprintf(
                                        esc_html__(
                                            'You need to %1$sReturn to Events list%2$sselect at least one event%3$s before you can proceed with the registration process.',
                                            'event_espresso'
                                        ),
                                        '<a href="'
                                        . get_post_type_archive_link(EspressoPostType::EVENTS)
                                        . '" title="',
                                        '">',
                                        '</a>'
                                    )
                                ),
                                'cookies_not_set_msg'     => $this->getCookiesNotSetMessage($empty_cart),
                                'registration_time_limit' => $checkout->get_registration_time_limit(),
                                'session_expiration'      => gmdate(
                                    'M d, Y H:i:s',
                                    $session_expiration + (get_option('gmt_offset') * HOUR_IN_SECONDS)
                                ),
                                'use_session_countdown'   => EE_Registry::instance()->CFG->registration->useSessionCountdown(),
                            ],
                        ]
                    ),
            ]
        );
    }


    private function getCookiesNotSetMessage($empty_cart)
    {
        return $empty_cart
            ? apply_filters(
                'FHEE__Single_Page_Checkout__display_spco_reg_form__cookies_not_set_msg',
                sprintf(
                    esc_html__(
                        '%1$s%3$sIt appears your browser is not currently set to accept Cookies%4$s%5$sIn order to register for events, you need to enable cookies.%7$sIf you require assistance, then click the following link to learn how to %8$senable cookies%9$s%6$s%2$s',
                        'event_espresso'
                    ),
                    '<div class="ee-attention hidden" id="ee-cookies-not-set-msg">',
                    '</div>',
                    '<h6 class="important-notice">',
                    '</h6>',
                    '<p>',
                    '</p>',
                    '<br />',
                    '<a href="https://www.whatismybrowser.com/guides/how-to-enable-cookies/" target="_blank" rel="noopener noreferrer">',
                    '</a>'
                )
            )
            : '';

    }
}
