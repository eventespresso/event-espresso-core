<?php

namespace EventEspresso\core\services\address;

use EE_State;
use EE_Error;
use EEM_State;
use ReflectionException;

/**
 * @since 5.0.30.p
 */
class States
{
    /**
     * indicates that ALL states should be retrieved from the db
     */
    public const GET_ALL = 'all';

    /**
     * indicates that only ACTIVE states should be retrieved from the db
     */
    public const GET_ACTIVE        = 'active';

    public const INDEX_TYPE_ID     = 'id';

    public const INDEX_TYPE_ABBREV = 'abbrev';

    public const LIST_TYPE_NAME    = 'name';

    public const LIST_TYPE_ABBREV  = 'abbrev';


    private static function validGetOption(string $get_all_or_active): string
    {
        return in_array($get_all_or_active, [States::GET_ALL, States::GET_ACTIVE], true)
            ? $get_all_or_active
            : States::GET_ACTIVE;
    }


    private static function validIndexType(string $index_type): string
    {
        return in_array($index_type, [States::INDEX_TYPE_ID, States::INDEX_TYPE_ABBREV], true)
            ? $index_type
            : States::INDEX_TYPE_ID;
    }


    private static function validListType(string $list_type): string
    {
        return in_array($list_type, [States::LIST_TYPE_NAME, States::LIST_TYPE_ABBREV], true)
            ? $list_type
            : States::LIST_TYPE_NAME;
    }


    /**
     * @param string $get_all_or_active
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    private static function getStates(string $get_all_or_active = States::GET_ACTIVE): array
    {
        $get_all_or_active = States::validGetOption($get_all_or_active);
        // get possibly cached list of states
        return $get_all_or_active === States::GET_ALL
            ? EEM_State::instance()->get_all_states()
            : EEM_State::instance()->get_all_active_states();
    }


    /**
     * @param string $index_type        what to use as keys for the array, one of the States::INDEX_TYPE_* constants
     * @param bool   $group_by_country  whether to group the states by country
     * @param string $get_all_or_active whether to get all states or just active states,
     *                                  one of the States::GET_* constants
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function arrayOfNames(
        string $index_type = States::INDEX_TYPE_ID,
        bool $group_by_country = true,
        string $get_all_or_active = States::GET_ACTIVE
    ): array {
        return States::arrayOfStates($index_type, $group_by_country, $get_all_or_active, States::LIST_TYPE_NAME);
    }


    /**
     * @param string $index_type        what to use as keys for the array, one of the States::INDEX_TYPE_* constants
     * @param bool   $group_by_country  whether to group the states by country
     * @param string $get_all_or_active whether to get all states or just active states,
     *                                  one of the States::GET_* constants
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function arrayOfAbbreviations(
        string $index_type = States::INDEX_TYPE_ID,
        bool $group_by_country = true,
        string $get_all_or_active = States::GET_ACTIVE
    ): array {
        return States::arrayOfStates($index_type, $group_by_country, $get_all_or_active, States::LIST_TYPE_ABBREV);
    }


    /**
     * generate list of state names or ISO codes
     *
     * @param string $index_type        what to use as keys for the array, one of the States::INDEX_TYPE_* constants
     * @param bool   $group_by_country  whether to group the states by country
     * @param string $get_all_or_active whether to get all states or just active states,
     *                                  one of the States::GET_* constants
     * @param string $list_type         whether to use state names or abbreviations as values for the array,
     *                                  one of the States::LIST_TYPE_* constants
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    private static function arrayOfStates(
        string $index_type,
        bool $group_by_country,
        string $get_all_or_active,
        string $list_type
    ): array {
        $list       = [0 => ''];
        $group_list = ['' => [0 => '']];
        $states     = States::getStates($get_all_or_active);
        $list_type  = States::validListType($list_type);
        $index_type = States::validIndexType($index_type);
        if (! empty($states)) {
            foreach ($states as $state) {
                if ($state instanceof EE_State) {
                    $index = $index_type === States::INDEX_TYPE_ID ? $state->ID() : $state->abbrev();
                    $value = $list_type === States::LIST_TYPE_NAME ? $state->name() : $state->abbrev();
                    if ($group_by_country) {
                        $group_list[ $state->country()->name() ][ $index ] = $value;
                    } else {
                        $list[ $index ] = $value;
                    }
                }
            }
        }
        return $group_by_country ? $group_list : $list;
    }
}
