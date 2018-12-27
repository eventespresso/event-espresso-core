<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;

/**
 * Class EE_Country_Select_Input
 * Generates an HTML <select> form input
 * and populates it with a list of Countries from the wp_esp_country table
 *
 * @package             Event Espresso
 * @subpackage          core
 * @author              Brent Christensen
 */
class EE_Country_Select_Input extends EE_Select_Input
{
    /**
     * $input_settings key used for detecting the "get" option
     */
    const OPTION_GET_KEY = 'get';

    /**
     * indicates that ALL countries should be retrieved from the db for the input
     */
    const OPTION_GET_ALL = 'all';

    /**
     * indicates that only ACTIVE countries should be retrieved from the db for the input
     */
    const OPTION_GET_ACTIVE = 'active';


    /**
     * @param array $country_options
     * @param array $input_settings
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function __construct($country_options = null, $input_settings = array())
    {
        $get = isset($input_settings[ self::OPTION_GET_KEY ])
            ? $input_settings[ self::OPTION_GET_KEY ]
            : self::OPTION_GET_ACTIVE;
        $country_options = apply_filters(
            'FHEE__EE_Country_Select_Input____construct__country_options',
            $this->get_country_answer_options($country_options, $get),
            $this,
            $get
        );
        $input_settings['html_class'] = isset($input_settings['html_class'])
            ? $input_settings['html_class'] . ' ee-country-select-js'
            : 'ee-country-select-js';
        parent::__construct($country_options, $input_settings);
    }


    /**
     * get_country_answer_options
     *
     * @param array  $country_options
     * @param string $get
     * @return array
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function get_country_answer_options($country_options = null, $get = self::OPTION_GET_ACTIVE)
    {
        // if passed something that is NOT an array
        if (! is_array($country_options)) {
            // get possibly cached list of countries
            $countries = $get === self::OPTION_GET_ALL
                ? EEM_Country::instance()->get_all_countries()
                : EEM_Country::instance()->get_all_active_countries();
            if (! empty($countries)) {
                $country_options[''] = '';
                foreach ($countries as $country) {
                    if ($country instanceof EE_Country) {
                        $country_options[ $country->ID() ] = $country->name();
                    }
                }
            } else {
                $country_options = array();
            }
        }
        return $country_options;
    }
}
