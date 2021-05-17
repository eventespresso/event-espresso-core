<?php

namespace EventEspresso\core\services\form\meta\inputs;

class DateTime
{

    /**
     * indicates that the HTML input type is 'date'
     */
    public const TYPE_DATE = 'date';

    /**
     * indicates that the HTML input type is 'datetime-local'
     */
    public const TYPE_DATETIME_LOCAL = 'datetime-local';

    /**
     * indicates that the HTML input type is 'month'
     */
    public const TYPE_MONTH = 'month';

    /**
     * indicates that the HTML input type is 'time'
     */
    public const TYPE_TIME = 'time';

    /**
     * indicates that the HTML input type is 'week'
     */
    public const TYPE_WEEK = 'week';

    // CUSTOM EE DATE TYPES

    /**
     * indicates that the input is an HTML dropdown used for selecting the day for a date
     */
    public const TYPE_SELECT_DAY = 'day-select';

    /**
     * indicates that the input is an HTML dropdown used for selecting the month for a date
     */
    public const TYPE_SELECT_MONTH = 'month-select';

    /**
     * indicates that the input is an HTML dropdown used for selecting the year for a date
     */
    public const TYPE_SELECT_YEAR = 'year-select';


    /**
     * @var array
     */
    private $valid_type_options;


    protected function __construct()
    {
        $this->valid_type_options = apply_filters(
            'FHEE__EventEspresso_core_services_form_meta_inputs_DateTime__valid_type_options',
            [
                DateTime::TYPE_DATE           => esc_html__('Date Picker', 'event_espresso'),
                DateTime::TYPE_DATETIME_LOCAL => esc_html__('Local Date Picker', 'event_espresso'),
                DateTime::TYPE_MONTH          => esc_html__('Month Picker', 'event_espresso'),
                DateTime::TYPE_TIME           => esc_html__('Time Picker', 'event_espresso'),
                DateTime::TYPE_WEEK           => esc_html__('Week Picker', 'event_espresso'),
                DateTime::TYPE_SELECT_DAY     => esc_html__('Day Selector', 'event_espresso'),
                DateTime::TYPE_SELECT_MONTH   => esc_html__('Month Selector', 'event_espresso'),
                DateTime::TYPE_SELECT_YEAR    => esc_html__('Year Selector', 'event_espresso'),
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
