<?php

namespace EventEspresso\core\services\form\meta\inputs;

class Button
{
    /**
     * indicates that the HTML input type is 'button'
     */
    public const TYPE_BUTTON = 'button';

    /**
     * indicates that the HTML input type is 'reset'
     */
    public const TYPE_BUTTON_RESET = 'reset';

    /**
     * indicates that the HTML input type is 'submit'
     */
    public const TYPE_BUTTON_SUBMIT = 'submit';


    /**
     * @var array
     */
    private $valid_type_options;


    public function __construct()
    {
        $this->valid_type_options = apply_filters(
            'FHEE__EventEspresso_core_services_form_meta_inputs_Button__valid_type_options',
            [
                Button::TYPE_BUTTON        => esc_html__('Button', 'event_espresso'),
                Button::TYPE_BUTTON_RESET  => esc_html__('Reset Button', 'event_espresso'),
                Button::TYPE_BUTTON_SUBMIT => esc_html__('Submit Button', 'event_espresso'),
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
