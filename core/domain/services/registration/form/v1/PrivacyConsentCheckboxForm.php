<?php

namespace EventEspresso\core\domain\services\registration\form\v1;

use EE_Checkbox_Multi_Input;
use EE_Error;
use EE_Form_Section_Proper;
use EE_Template_Layout;

class PrivacyConsentCheckboxForm extends EE_Form_Section_Proper
{
    /**
     * @param string $reg_step_slug
     * @param string $consent_checkbox_label_text
     * @throws EE_Error
     */
    public function __construct(string $reg_step_slug, string $consent_checkbox_label_text)
    {
        parent::__construct(
            [
                'layout_strategy' =>
                    new EE_Template_Layout(
                        [
                            'input_template_file' => SPCO_REG_STEPS_PATH
                                                     . $reg_step_slug
                                                     . '/privacy_consent.template.php',
                        ]
                    ),
                'subsections'     => [
                    'consent' => new EE_Checkbox_Multi_Input(
                        [
                            'consent' => $consent_checkbox_label_text,
                        ],
                        [
                            'required'                          => true,
                            'required_validation_error_message' => esc_html__(
                                'You must consent to these terms in order to register.',
                                'event_espresso'
                            ),
                            'html_label_text'                   => '',
                        ]
                    ),
                ],
            ]
        );
    }
}
