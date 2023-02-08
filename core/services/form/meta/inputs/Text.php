<?php

namespace EventEspresso\core\services\form\meta\inputs;

class Text
{
    /**
     * indicates that the HTML input type is 'email'
     */
    const TYPE_EMAIL = 'email';

    /**
     * indicates that the input is used to confirm an email address
     */
    const TYPE_EMAIL_CONFIRMATION = 'email-confirmation';

    /**
     * indicates that the HTML input type is 'text'
     */
    const TYPE_TEXT = 'text';

    /**
     * indicates that the input is a TEXTAREA that only allows plain text
     */
    const TYPE_TEXTAREA = 'textarea';

    /**
     * indicates that the input is a TEXTAREA that allows simple html
     */
    const TYPE_TEXTAREA_HTML = 'textarea-html';


    /**
     * @var array
     */
    private $valid_type_options;


    public function __construct()
    {
        $this->valid_type_options = apply_filters(
            'FHEE__EventEspresso_core_services_form_meta_inputs_Text__valid_type_options',
            [
                Text::TYPE_EMAIL              => esc_html__('Email', 'event_espresso'),
                Text::TYPE_EMAIL_CONFIRMATION => esc_html__('Email Confirmation', 'event_espresso'),
                Text::TYPE_TEXT               => esc_html__('Plain Text', 'event_espresso'),
                Text::TYPE_TEXTAREA           => esc_html__('Plain Textarea', 'event_espresso'),
                Text::TYPE_TEXTAREA_HTML      => esc_html__('Simple HTML Textarea', 'event_espresso'),
            ]
        );
    }


    /**
     * @param bool $constants_only
     * @return array
     */
    public function validTypeOptions($constants_only = false)
    {
        return $constants_only
            ? array_keys($this->valid_type_options)
            : $this->valid_type_options;
    }
}
