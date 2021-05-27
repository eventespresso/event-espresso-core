<?php

namespace EventEspresso\core\services\form\meta\inputs;

class Number
{

    /**
     * indicates that the HTML input type is 'number' whose value is a decimal (float)
     */
    public const TYPE_FLOAT = 'decimal';

    /**
     * indicates that the HTML input type is 'number' whose value is an integer (whole number)
     */
    public const TYPE_INT = 'integer';

    /**
     * indicates that the HTML input type is 'range'
     */
    public const TYPE_RANGE = 'range';


    /**
     * @var array
     */
    private $valid_type_options;


    public function __construct()
    {
        $this->valid_type_options = apply_filters(
            'FHEE__EventEspresso_core_services_form_meta_inputs_Number__valid_type_options',
            [
                Number::TYPE_FLOAT => esc_html__('Decimal Number', 'event_espresso'),
                Number::TYPE_INT   => esc_html__('Integer (Whole) Number', 'event_espresso'),
                Number::TYPE_RANGE => esc_html__('Number Range', 'event_espresso'),
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
