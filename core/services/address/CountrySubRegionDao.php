<?php

namespace EventEspresso\core\services\address;

use EE_Country;
use EE_Error;
use EEM_State;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;
use ReflectionException;
use stdClass;

/**
 * Class CountrySubRegionDao
 * Data Access Object for retrieving Country and Country SubRegion data
 *
 * @package EventEspresso\core\services\address
 * @author  Brent Christensen
 * @since   $VID:$
 */
class CountrySubRegionDao
{

    const REPO_URL = 'https://raw.githubusercontent.com/eventespresso/countries-and-provinces-states-regions/master/';

    /**
     * @var array $countries
     */
    private $countries = array();


    /**
     * @param EE_Country $country_object
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function saveCountrySubRegions(EE_Country $country_object)
    {
        $CNT_ISO = $country_object->ID();
        $has_sub_regions = EEM_State::instance()->count(array(array('Country.CNT_ISO' => $CNT_ISO)));
        if ($has_sub_regions) {
            return;
        }
        if (empty($this->countries)) {
            $this->countries = $this->retrieveJsonData(self::REPO_URL . 'countries.json');
        }
        if (is_array($this->countries)) {
            foreach ($this->countries as $key => $country) {
                if ($country instanceof stdClass
                    && $country->code === $CNT_ISO
                    && empty($country->sub_regions)
                    && $country->filename !== null
                ) {
                    $country->sub_regions = $this->retrieveJsonData(
                        self::REPO_URL . 'countries/' . $country->filename . '.json'
                    );
                    $this->saveSubRegionData($country, $country->sub_regions);
                }
            }
        }
    }


    /**
     * @param string $url
     * @return array
     */
    private function retrieveJsonData($url)
    {
        if (empty($url)) {
            return array();
        }
        $request = wp_safe_remote_get($url);
        if (is_wp_error($request)) {
            return array();
        }
        $body = wp_remote_retrieve_body($request);
        return json_decode($body);
    }


    /**
     * @param stdClass $country
     * @param array    $sub_regions
     * @return void
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    private function saveSubRegionData(stdClass $country, $sub_regions = array())
    {
        if (is_array($sub_regions)) {
            foreach ($sub_regions as $sub_region) {
                // remove country code from sub region code
                $abbrev = str_replace(
                    $country->code . '-',
                    '',
                    sanitize_text_field($sub_region->code)
                );
                // but NOT if sub region code results in only a number
                if (absint($abbrev) !== 0) {
                    $abbrev = sanitize_text_field($sub_region->code);
                }
                EEM_State::instance()->insert(
                    array(
                        // STA_ID	CNT_ISO	STA_abbrev	STA_name	STA_active
                        'CNT_ISO'    => $country->code,
                        'STA_abbrev' => $abbrev,
                        'STA_name'   => sanitize_text_field($sub_region->name),
                        'STA_active' => 1,
                    )
                );
            }
        }
    }
}