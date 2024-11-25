<?php

namespace EventEspresso\core\services\address;

use EE_Country;
use EE_Error;
use EEM_Country;
use ReflectionException;

/**
 * @since 5.0.30.p
 */
class Countries
{
    /**
     * indicates that ALL countries should be retrieved from the db
     */
    public const GET_ALL = 'all';

    /**
     * indicates that only ACTIVE countries should be retrieved from the db
     */
    public const GET_ACTIVE     = 'active';

    public const INDEX_TYPE_ID  = 'id';

    public const INDEX_TYPE_ISO = 'iso';

    public const LIST_TYPE_NAME = 'name';

    public const LIST_TYPE_ISO  = 'iso';


    private static function validGetOption(string $get_all_or_active): string
    {
        return in_array($get_all_or_active, [Countries::GET_ALL, Countries::GET_ACTIVE], true)
            ? $get_all_or_active
            : Countries::GET_ACTIVE;
    }


    private static function validIndexType(string $index_type): string
    {
        return in_array($index_type, [Countries::INDEX_TYPE_ID, Countries::INDEX_TYPE_ISO], true)
            ? $index_type
            : Countries::INDEX_TYPE_ID;
    }


    private static function validListType(string $list_type): string
    {
        return in_array($list_type, [Countries::LIST_TYPE_NAME, Countries::LIST_TYPE_ISO], true)
            ? $list_type
            : Countries::LIST_TYPE_NAME;
    }


    /**
     * @param string $get_all_or_active whether to get all countries or just active countries,
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    private static function getCountries(string $get_all_or_active = Countries::GET_ACTIVE): array
    {
        $get_all_or_active = Countries::validGetOption($get_all_or_active);
        // get possibly cached list of countries
        return $get_all_or_active === Countries::GET_ALL
            ? EEM_Country::instance()->get_all_countries()
            : EEM_Country::instance()->get_all_active_countries();
    }


    /**
     * @param string $index_type        what to use as keys for the array, one of the Countries::INDEX_TYPE_* constants
     * @param string $get_all_or_active whether to get all countries or just active countries,
     *                                  one of the Countries::GET_* constants
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function arrayOfNames(
        string $index_type = Countries::INDEX_TYPE_ID,
        string $get_all_or_active = Countries::GET_ACTIVE
    ): array {
        return Countries::arrayOfCountries($index_type, $get_all_or_active, Countries::LIST_TYPE_NAME);
    }


    /**
     * @param string $index_type        what to use as keys for the array, one of the Countries::INDEX_TYPE_* constants
     * @param string $get_all_or_active whether to get all countries or just active countries,
     *                                  one of the Countries::GET_* constants
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function arrayOfISOs(
        string $index_type = Countries::INDEX_TYPE_ID,
        string $get_all_or_active = Countries::GET_ACTIVE
    ): array {
        return Countries::arrayOfCountries($index_type, $get_all_or_active, Countries::LIST_TYPE_ISO);
    }


    /**
     * generate list of country names or ISO codes
     *
     * @param string $index_type        what to use as keys for the array, one of the Countries::INDEX_TYPE_* constants
     * @param string $get_all_or_active whether to get all countries or just active countries,
     *                                  one of the Countries::GET_* constants
     * @param string $list_type         whether to use country names or ISO codes as values for the array,
     *                                  one of the Countries::LIST_TYPE_* constants
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    private static function arrayOfCountries(
        string $index_type,
        string $get_all_or_active,
        string $list_type
    ): array {
        $list       = ['' => ''];
        $countries  = Countries::getCountries($get_all_or_active);
        $list_type  = Countries::validListType($list_type);
        $index_type = Countries::validIndexType($index_type);
        if (! empty($countries)) {
            foreach ($countries as $country) {
                if ($country instanceof EE_Country) {
                    $index          = $index_type === Countries::INDEX_TYPE_ID ? $country->ID() : $country->ISO();
                    $list[ $index ] = $list_type === Countries::LIST_TYPE_NAME ? $country->name() : $country->ISO();
                }
            }
        }
        return $list;
    }
}
