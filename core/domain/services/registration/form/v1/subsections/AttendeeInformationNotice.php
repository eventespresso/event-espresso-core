<?php

namespace EventEspresso\core\domain\services\registration\form\v1\subsections;

use EE_Form_Section_HTML;
use EEH_HTML;

class AttendeeInformationNotice extends EE_Form_Section_HTML
{
    public function __construct()
    {
        parent::__construct(
            EEH_HTML::p(
                apply_filters(
                    'FHEE__registration_page_attendee_information__attendee_information_pg',
                    sprintf(
                        esc_html__(
                            'In order to process your registration, we ask you to provide the following information.%1$sPlease note that all fields marked with an asterisk (%2$s) are required.',
                            'event_espresso'
                        ),
                        '<br />',
                        '<span class="asterisk">*</span>'
                    )
                ),
                'spco-attendee_information-pg',
                'spco-steps-pg small-text drk-grey-text'
            )
        );
    }
}
