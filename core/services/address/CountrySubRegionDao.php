<?php

namespace EventEspresso\core\services\address;

use EE_Country;
use EE_Error;
use EE_State;
use EEM_Country;
use EEM_State;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\validators\JsonValidator;
use InvalidArgumentException;
use ReflectionException;
use stdClass;
use WP_Error;

/**
 * Class CountrySubRegionDao
 * Data Access Object for retrieving Country and Country SubRegion data
 *
 * @package EventEspresso\core\services\address
 * @author  Brent Christensen
 * @since   4.9.70.p
 */
class CountrySubRegionDao
{

    const REPO_URL = 'https://raw.githubusercontent.com/eventespresso/countries-and-subregions/master/';

    const OPTION_NAME_COUNTRY_DATA_VERSION = 'espresso-country-sub-region-data-version';

    /**
     * @var EEM_State $state_model
     */
    private $state_model;

    /**
     * @var JsonValidator $json_validator
     */
    private $json_validator;

    /**
     * @var string $data_version
     */
    private $data_version;

    /**
     * @var array $countries
     */
    private $countries = array();


    /**
     * CountrySubRegionDao constructor.
     *
     * @param EEM_State     $state_model
     * @param JsonValidator $json_validator
     */
    public function __construct(EEM_State $state_model, JsonValidator $json_validator)
    {
        $this->state_model = $state_model;
        $this->json_validator = $json_validator;
    }


    /**
     * @param EE_Country $country_object
     * @return bool
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function saveCountrySubRegions(EE_Country $country_object)
    {
        $CNT_ISO = $country_object->ID();
        $has_sub_regions = $this->state_model->count(array(array('Country.CNT_ISO' => $CNT_ISO)));
        $data = [];
        if (empty($this->countries)) {
            $this->data_version = $this->getCountrySubRegionDataVersion();
            $data = $this->retrieveJsonData(self::REPO_URL . 'countries.json');
        }
        if (empty($data)) {
            EE_Error::add_error(
                'Country Subregion Data could not be retrieved',
                __FILE__,
                __METHOD__,
                __LINE__
            );
        }
        if (! $has_sub_regions
            || (isset($data->version) && version_compare($data->version, $this->data_version))
        ) {
            if (isset($data->countries)
                && $this->processCountryData($CNT_ISO, $data->countries) > 0
            ) {
                $this->countries = $data->countries;
                $this->updateCountrySubRegionDataVersion($data->version);
                return true;
            }
        }
        return false;
    }


    /**
     * @since 4.9.70.p
     * @return string
     */
    private function getCountrySubRegionDataVersion()
    {
        return get_option(self::OPTION_NAME_COUNTRY_DATA_VERSION, null);
    }


    /**
     * @param string $version
     */
    private function updateCountrySubRegionDataVersion($version = '')
    {
        // add version option if it has never been added before, or update existing
        if ($this->data_version === null) {
            add_option(self::OPTION_NAME_COUNTRY_DATA_VERSION, $version, '', false);
        } else {
            update_option(self::OPTION_NAME_COUNTRY_DATA_VERSION, $version);
        }
    }


    /**
     * @param string $CNT_ISO
     * @param array  $countries
     * @return int
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @since 4.9.70.p
     */
    private function processCountryData($CNT_ISO, $countries = array())
    {
        if (! empty($countries)) {
            foreach ($countries as $key => $country) {
                if ($country instanceof stdClass
                    && $country->code === $CNT_ISO
                    && empty($country->sub_regions)
                    && ! empty($country->filename)
                ) {
                    $country->sub_regions = $this->retrieveJsonData(
                        self::REPO_URL . 'countries/' . $country->filename . '.json'
                    );
                    return $this->saveSubRegionData($country, $country->sub_regions);
                }
            }
        }
        return 0;
    }


    /**
     * @param string $url
     * @return array
     */
    private function retrieveJsonData($url)
    {
        if (empty($url)) {
            EE_Error::add_error(
                'No URL was provided!',
                __FILE__,
                __METHOD__,
                __LINE__
            );
            return array();
        }
        $request = wp_safe_remote_get($url);
        if ($request instanceof WP_Error) {
            EE_Error::add_error(
                $request->get_error_message(),
                __FILE__,
                __METHOD__,
                __LINE__
            );
            return array();
        }
        $body = wp_remote_retrieve_body($request);
        $json = json_decode($body);
        if ($this->json_validator->isValid(__FILE__, __METHOD__, __LINE__)) {
            return $json;
        }
        return array();
    }


    /**
     * @param stdClass $country
     * @param array    $sub_regions
     * @return int
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    private function saveSubRegionData(stdClass $country, $sub_regions = array())
    {
        $results = 0;
        if (is_array($sub_regions)) {
            $existing_sub_regions = $this->getExistingStateAbbreviations($country->code);
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
                if (! in_array($abbrev, $existing_sub_regions, true)
                    && $this->state_model->insert(
                        [
                            // STA_ID CNT_ISO STA_abbrev STA_name STA_active
                            'CNT_ISO'    => $country->code,
                            'STA_abbrev' => $abbrev,
                            'STA_name'   => sanitize_text_field($sub_region->name),
                            'STA_active' => 1,
                        ]
                    )
                ) {
                    $results++;
                }
            }
        }
        return $results;
    }


    /**
     * @param string $CNT_ISO
     * @since 4.9.76.p
     * @return array
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    private function getExistingStateAbbreviations($CNT_ISO)
    {
        $existing_sub_region_IDs = [];
        $existing_sub_regions = $this->state_model->get_all(array(
            array(
                'Country.CNT_ISO' => array(
                    'IN',
                    [$CNT_ISO]
                )
            ),
            'order_by' => array('Country.CNT_name' => 'ASC', 'STA_name' => 'ASC')
        ));
        if (is_array($existing_sub_regions)) {
            foreach ($existing_sub_regions as $existing_sub_region) {
                if ($existing_sub_region instanceof EE_State) {
                    $existing_sub_region_IDs[] = $existing_sub_region->abbrev();
                }
            }
        }
        return $existing_sub_region_IDs;
    }
}
