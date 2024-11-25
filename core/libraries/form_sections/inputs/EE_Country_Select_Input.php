<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\address\Countries;

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
    public function __construct($country_options = null, $input_settings = [])
    {
        $get                          = $input_settings[ self::OPTION_GET_KEY ] ?? self::OPTION_GET_ACTIVE;
        $country_options              = apply_filters(
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
     * @param array|null $country_options
     * @param string     $get
     * @return array
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function get_country_answer_options(
        array $country_options = null,
        string $get = self::OPTION_GET_ACTIVE
    ): ?array {
        // if passed an array, then just return it, otherwise get the list of country names
        return is_array($country_options) ? $country_options : Countries::arrayOfNames(Countries::INDEX_TYPE_ID, $get);
    }
}
