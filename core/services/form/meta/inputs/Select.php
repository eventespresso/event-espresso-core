<?php

namespace EventEspresso\core\services\form\meta\inputs;

class Select
{
    /**
     * indicates that the input is an HTML dropdown (select input) that accepts only one value
     */
    public const TYPE_SELECT = 'select';

    /**
     * indicates that the input is an HTML dropdown (select input) that accepts multiple values
     */
    public const TYPE_SELECT_MULTI = 'select-multi';

    // CUSTOM EE SELECT TYPES

    /**
     * indicates that input is an HTML dropdown (select input)
     * populated with names of countries that are enabled for the site
     */
    public const TYPE_SELECT_COUNTRY = 'select-country';

    /**
     * indicates that the input is an HTML dropdown (select input)
     * populated with names of states for the countries that are enabled for the site
     */
    public const TYPE_SELECT_STATE = 'select-state';


    /**
     * @var array
     */
    private $valid_type_options;


    public function __construct()
    {
        $this->valid_type_options = apply_filters(
            'FHEE__EventEspresso_core_services_form_meta_inputs_Select__valid_type_options',
            [
                Select::TYPE_SELECT         => esc_html__('Dropdown', 'event_espresso'),
                Select::TYPE_SELECT_MULTI   => esc_html__('Multi-Select Dropdown', 'event_espresso'),
                Select::TYPE_SELECT_COUNTRY => esc_html__('Country Selector', 'event_espresso'),
                Select::TYPE_SELECT_STATE   => esc_html__('State Selector', 'event_espresso'),
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
