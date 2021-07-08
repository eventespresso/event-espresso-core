<?php

namespace EventEspresso\core\services\form\meta\inputs;

class Input
{

    /**
     * indicates that the HTML input type is 'checkbox'
     */
    public const TYPE_CHECKBOX = 'checkbox';

    /**
     * indicates that the HTML input type is 'multi checkbox'
     */
    public const TYPE_CHECKBOX_MULTI = 'checkbox-multi';

    /**
     * indicates that the HTML input type is 'color'
     */
    public const TYPE_COLOR = 'color';

    /**
     * indicates that the HTML input type is 'file'
     */
    public const TYPE_FILE = 'file';

    /**
     * indicates that the HTML input type is 'hidden'
     */
    public const TYPE_HIDDEN = 'hidden';

    /**
     * indicates that the HTML input type is 'image'
     */
    public const TYPE_IMAGE = 'image';

    /**
     * indicates that the HTML input type is 'password'
     */
    public const TYPE_PASSWORD = 'password';

    /**
     * indicates that the input is used to confirm a password
     */
    public const TYPE_PASSWORD_CONFIRMATION = 'password-confirmation';

    /**
     * indicates that the HTML input type is 'radio'
     */
    public const TYPE_RADIO = 'radio';

    /**
     * indicates that the HTML input type is 'url'
     */
    public const TYPE_URL = 'url';

    /**
     * @var array
     */
    private $valid_type_options;


    public function __construct()
    {
        $this->valid_type_options = apply_filters(
            'FHEE__EventEspresso_core_services_form_meta_inputs_Input__valid_type_options',
            [
                Input::TYPE_CHECKBOX              => esc_html__('Checkbox', 'event_espresso'),
                Input::TYPE_CHECKBOX_MULTI        => esc_html__('Multi Checkbox', 'event_espresso'),
                Input::TYPE_COLOR                 => esc_html__('Color Picker', 'event_espresso'),
                Input::TYPE_FILE                  => esc_html__('File Upload', 'event_espresso'),
                Input::TYPE_HIDDEN                => esc_html__('Hidden', 'event_espresso'),
                Input::TYPE_IMAGE                 => esc_html__('Image Upload', 'event_espresso'),
                Input::TYPE_PASSWORD              => esc_html__('Password', 'event_espresso'),
                Input::TYPE_PASSWORD_CONFIRMATION => esc_html__('Password Confirmation', 'event_espresso'),
                Input::TYPE_RADIO                 => esc_html__('Radio Button', 'event_espresso'),
                Input::TYPE_URL                   => esc_html__('URL', 'event_espresso'),
            ]
        );
    }


    /**
     * @param bool $constants_only
     * @return array
     */
    public function validTypeOptions(bool $constants_only = false): array
    {
        return $constants_only
            ? array_keys($this->valid_type_options)
            : $this->valid_type_options;
    }
}
