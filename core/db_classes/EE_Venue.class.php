<?php

use EventEspresso\core\services\address\AddressInterface;

/**
 * EE_Venue class
 *
 * @package               Event Espresso
 * @subpackage            includes/classes/EE_Venue.class.php
 * @author                Mike Nelson
 * @method EE_Country|EE_State get_first_related(string $relation_name, array $query_params = [])
 * @method EE_Country|EE_State _add_relation_to($otherObjectModelObjectOrID, $relationName)
 */
class EE_Venue extends EE_CPT_Base implements AddressInterface
{
    /**
     * @param array  $props_n_values          incoming values
     * @param string|null $timezone           incoming timezone (if not set the timezone set for the website
     *                                        will be
     *                                        used.)
     * @param array  $date_formats            incoming date_formats in an array where the first value is the
     *                                        date_format and the second value is the time format
     * @return EE_Venue
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function new_instance(
        array $props_n_values = [],
        ?string $timezone = '',
        array $date_formats = []
    ): EE_Venue {
        $has_object = parent::_check_for_object($props_n_values, __CLASS__, $timezone, $date_formats);
        return $has_object ?: new self($props_n_values, false, $timezone, $date_formats);
    }


    /**
     * @param array  $props_n_values  incoming values from the database
     * @param string|null $timezone   incoming timezone as set by the model.
     *                                If not set the timezone for the website will be used.
     * @return EE_Venue
     * @throws EE_Error
     * @throws ReflectionException
     */
    public static function new_instance_from_db(array $props_n_values = [], ?string $timezone = ''): EE_Venue
    {
        return new self($props_n_values, true, $timezone);
    }


    /**
     * Gets name
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function name(): string
    {
        return (string) $this->get('VNU_name');
    }


    /**
     * Gets phone
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function phone(): string
    {
        return (string) $this->get('VNU_phone');
    }


    /**
     * venue_url
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function venue_url(): string
    {
        return (string) $this->get('VNU_url');
    }


    /**
     * Gets desc
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function description(): string
    {
        return (string) $this->get('VNU_desc');
    }


    /**
     * Gets short description (AKA: the excerpt)
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function excerpt(): string
    {
        return (string) $this->get('VNU_short_desc');
    }


    /**
     * Gets identifier
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function identifier(): string
    {
        return (string) $this->get('VNU_identifier');
    }


    /**
     * Gets address
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function address(): string
    {
        return (string) $this->get('VNU_address');
    }


    /**
     * Gets address2
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function address2(): string
    {
        return (string) $this->get('VNU_address2');
    }


    /**
     * Gets city
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function city(): string
    {
        return (string) $this->get('VNU_city');
    }


    /**
     * Gets state
     *
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function state_ID(): int
    {
        return (int) $this->get('STA_ID');
    }


    /**
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function state_abbrev(): string
    {
        return $this->state_obj() instanceof EE_State ? $this->state_obj()->abbrev() : '';
    }


    /**
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function state_name(): string
    {
        return $this->state_obj() instanceof EE_State
            ? (string) $this->state_obj()->name()
            : '';
    }


    /**
     * Gets the state for this venue
     *
     * @return EE_State|null
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function state_obj(): ?EE_State
    {
        return $this->get_first_related('State');
    }


    /**
     * either displays the state abbreviation or the state name, as determined
     * by the "FHEE__EEI_Address__state__use_abbreviation" filter.
     * defaults to abbreviation
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function state(): string
    {
        return apply_filters('FHEE__EEI_Address__state__use_abbreviation', true, $this->state_obj())
            ? $this->state_abbrev()
            : $this->state_name();
    }


    /**
     * country_ID
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function country_ID(): string
    {
        return (string) $this->get('CNT_ISO');
    }


    /**
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function country_name(): string
    {
        return $this->country_obj() instanceof EE_Country ? $this->country_obj()->name() : '';
    }


    /**
     * Gets the country of this venue
     *
     * @return EE_Country|null
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function country_obj(): ?EE_Country
    {
        return $this->get_first_related('Country');
    }


    /**
     * either displays the country ISO2 code or the country name, as determined
     * by the "FHEE__EEI_Address__country__use_abbreviation" filter.
     * defaults to abbreviation
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function country(): string
    {
        return apply_filters('FHEE__EEI_Address__country__use_abbreviation', true, $this->country_obj())
            ? $this->country_ID()
            : $this->country_name();
    }


    /**
     * Gets zip
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function zip(): string
    {
        return $this->get('VNU_zip');
    }


    /**
     * Gets capacity
     *
     * @return int|string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function capacity()
    {
        return $this->get_pretty('VNU_capacity', 'symbol');
    }


    /**
     * Gets created
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function created(): string
    {
        return (string) $this->get('VNU_created');
    }


    /**
     * Gets modified
     *
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function modified(): string
    {
        return (string) $this->get('VNU_modified');
    }


    /**
     * Gets order
     *
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function order(): int
    {
        return (int) $this->get('VNU_order');
    }


    /**
     * Gets wp_user
     *
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function wp_user(): int
    {
        return (int) $this->get('VNU_wp_user');
    }


    /**
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function virtual_phone(): string
    {
        return (string) $this->get('VNU_virtual_phone');
    }


    /**
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function virtual_url(): string
    {
        return (string) $this->get('VNU_virtual_url');
    }


    /**
     * @return bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function enable_for_gmap(): bool
    {
        return (bool) $this->get('VNU_enable_for_gmap');
    }


    /**
     * @return string
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function google_map_link(): string
    {
        return (string) $this->get('VNU_google_map_link');
    }


    /**
     * Gets all events happening at this venue. Query parameters can be added to
     * fetch a subset of those events.
     *
     * @param array $query_params @see https://github.com/eventespresso/event-espresso-core/tree/master/docs/G--Model-System/model-query-params.md
     * @param bool  $upcoming
     * @return EE_Event[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function events(array $query_params = array(), bool $upcoming = false): array
    {
        if ($upcoming) {
            $query_params = array(
                array(
                    'status'                 => 'publish',
                    'Datetime.DTT_EVT_start' => array(
                        '>',
                        EEM_Datetime::instance()->current_time_for_query('DTT_EVT_start'),
                    ),
                ),
            );
        }
        return $this->get_many_related('Event', $query_params);
    }


    /**
     * Sets address
     *
     * @param string $address
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_address(string $address = '')
    {
        $this->set('VNU_address', $address);
    }


    /**
     * @param string $address2
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_address2(string $address2 = '')
    {
        $this->set('VNU_address2', $address2);
    }


    /**
     * @param string $city
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_city(string $city = '')
    {
        $this->set('VNU_city', $city);
    }


    /**
     * @param int $state
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_state_ID(int $state = 0)
    {
        $this->set('STA_ID', $state);
    }


    /**
     * Sets the state, given either a state id or state object
     *
     * @param EE_State|int $state_id_or_obj
     * @return EE_State
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_state_obj($state_id_or_obj): EE_State
    {
        return $this->_add_relation_to($state_id_or_obj, 'State');
    }


    /**
     * @param string $country_ID
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_country_ID(string $country_ID = '')
    {
        $this->set('CNT_ISO', $country_ID);
    }


    /**
     * Sets the country on the venue
     *
     * @param EE_Country|string $country_id_or_obj
     * @return EE_Country
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_country_obj($country_id_or_obj): EE_Country
    {
        return $this->_add_relation_to($country_id_or_obj, 'Country');
    }


    /**
     * @param string $zip
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_zip(string $zip = '')
    {
        $this->set('VNU_zip', $zip);
    }


    /**
     * @param int $capacity
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_capacity(int $capacity = 0)
    {
        $this->set('VNU_capacity', $capacity);
    }


    /**
     * @param string $created
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_created(string $created = '')
    {
        $this->set('VNU_created', $created);
    }


    /**
     * @param string $desc
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_description(string $desc = '')
    {
        $this->set('VNU_desc', $desc);
    }


    /**
     * @param string $identifier
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_identifier(string $identifier = '')
    {
        $this->set('VNU_identifier', $identifier);
    }


    /**
     * @param string $modified
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_modified(string $modified = '')
    {
        $this->set('VNU_modified', $modified);
    }


    /**
     * @param string $name
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_name(string $name = '')
    {
        $this->set('VNU_name', $name);
    }


    /**
     * @param int $order
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_order(int $order = 0)
    {
        $this->set('VNU_order', $order);
    }


    /**
     * @param string $phone
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_phone(string $phone = '')
    {
        $this->set('VNU_phone', $phone);
    }


    /**
     * @param int $wp_user
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_wp_user(int $wp_user = 1)
    {
        $this->set('VNU_wp_user', $wp_user);
    }


    /**
     * @param string $url
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_venue_url(string $url = '')
    {
        $this->set('VNU_url', $url);
    }


    /**
     * @param string $phone
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_virtual_phone(string $phone = '')
    {
        $this->set('VNU_virtual_phone', $phone);
    }


    /**
     * @param string $url
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_virtual_url(string $url = '')
    {
        $this->set('VNU_virtual_url', $url);
    }


    /**
     * @param bool|int|string $enable
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_enable_for_gmap($enable = false)
    {
        $this->set('VNU_enable_for_gmap', $enable);
    }


    /**
     * @param string $google_map_link
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function set_google_map_link(string $google_map_link = '')
    {
        $this->set('VNU_google_map_link', $google_map_link);
    }
}
