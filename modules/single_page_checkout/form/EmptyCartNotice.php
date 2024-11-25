<?php

namespace EventEspresso\modules\single_page_checkout\form;

use EE_Form_Section_HTML;
use EEH_HTML;
use EventEspresso\core\domain\entities\custom_post_types\EspressoPostType;

class EmptyCartNotice extends EE_Form_Section_HTML
{
    public function __construct()
    {
        parent::__construct(
            $this->nothingInYourCartHeader()
            . $this->emptyCartMessage()
            . $this->cookiesNotSetMessage()
        );
    }


    private function nothingInYourCartHeader(): string
    {
        return EEH_HTML::h3(
            esc_html__('Nothing in your Event Queue', 'event_espresso'),
            'spco-empty-cart-hdr',
            'spco-step-title-hdr'
        );
    }


    private function emptyCartMessage(): string
    {
        return EEH_HTML::p(
            apply_filters(
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
            )
        );
    }


    private function cookiesNotSetMessage(): string
    {
        return apply_filters(
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
        );
    }
}
