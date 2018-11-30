<?php

/**
 * EE_Venue class
 *
 * @package               Event Espresso
 * @subpackage            includes/classes/EE_Venue.class.php
 * @author                Mike Nelson
 */
class EE_Venue extends EE_CPT_Base implements EEI_Address
{

    /**
     *
     * @param array  $props_n_values          incoming values
     * @param string $timezone                incoming timezone (if not set the timezone set for the website will be
     *                                        used.)
     * @param array  $date_formats            incoming date_formats in an array where the first value is the
     *                                        date_format and the second value is the time format
     * @return EE_Attendee
     */
    public static function new_instance($props_n_values = array(), $timezone = null, $date_formats = array())
    {
        $has_object = parent::_check_for_object($props_n_values, __CLASS__, $timezone, $date_formats);
        return $has_object ? $has_object : new self($props_n_values, false, $timezone, $date_formats);
    }


    /**
     * @param array  $props_n_values  incoming values from the database
     * @param string $timezone        incoming timezone as set by the model.  If not set the timezone for
     *                                the website will be used.
     * @return EE_Attendee
     */
    public static function new_instance_from_db($props_n_values = array(), $timezone = null)
    {
        return new self($props_n_values, true, $timezone);
    }


    /**
     * Gets name
     *
     * @return string
     */
    public function name()
    {
        return $this->get('VNU_name');
    }


    /**
     * Gets phone
     *
     * @return string
     */
    public function phone()
    {
        return $this->get('VNU_phone');
    }


    /**
     * venue_url
     *
     * @return string
     */
    public function venue_url()
    {
        return $this->get('VNU_url');
    }


    /**
     * Gets desc
     *
     * @return string
     */
    public function description()
    {
        return $this->get('VNU_desc');
    }


    /**
     * Gets short description (AKA: the excerpt)
     *
     * @return string
     */
    public function excerpt()
    {
        return $this->get('VNU_short_desc');
    }


    /**
     * Gets identifier
     *
     * @return string
     */
    public function identifier()
    {
        return $this->get('VNU_identifier');
    }


    /**
     * Gets address
     *
     * @return string
     */
    public function address()
    {
        return $this->get('VNU_address');
    }


    /**
     * Gets address2
     *
     * @return string
     */
    public function address2()
    {
        return $this->get('VNU_address2');
    }


    /**
     * Gets city
     *
     * @return string
     */
    public function city()
    {
        return $this->get('VNU_city');
    }

    /**
     * Gets state
     *
     * @return int
     */
    public function state_ID()
    {
        return $this->get('STA_ID');
    }


    /**
     * @return string
     */
    public function state_abbrev()
    {
        return $this->state_obj() instanceof EE_State ? $this->state_obj()->abbrev() : '';
    }


    /**
     * @return string
     */
    public function state_name()
    {
        return $this->state_obj() instanceof EE_State ? $this->state_obj()->name() : '';
    }


    /**
     * Gets the state for this venue
     *
     * @return EE_State
     */
    public function state_obj()
    {
        return $this->get_first_related('State');
    }


    /**
     * either displays the state abbreviation or the state name, as determined
     * by the "FHEE__EEI_Address__state__use_abbreviation" filter.
     * defaults to abbreviation
     *
     * @return string
     */
    public function state()
    {
        if (apply_filters('FHEE__EEI_Address__state__use_abbreviation', true, $this->state_obj())) {
            return $this->state_abbrev();
        } else {
            return $this->state_name();
        }
    }


    /**
     * country_ID
     *
     * @return string
     */
    public function country_ID()
    {
        return $this->get('CNT_ISO');
    }


    /**
     * @return string
     */
    public function country_name()
    {
        return $this->country_obj() instanceof EE_Country ? $this->country_obj()->name() : '';
    }


    /**
     * Gets the country of this venue
     *
     * @return EE_Country
     */
    public function country_obj()
    {
        return $this->get_first_related('Country');
    }


    /**
     * either displays the country ISO2 code or the country name, as determined
     * by the "FHEE__EEI_Address__country__use_abbreviation" filter.
     * defaults to abbreviation
     *
     * @return string
     */
    public function country()
    {
        if (apply_filters('FHEE__EEI_Address__country__use_abbreviation', true, $this->country_obj())) {
            return $this->country_ID();
        } else {
            return $this->country_name();
        }
    }


    /**
     * Gets zip
     *
     * @return string
     */
    public function zip()
    {
        return $this->get('VNU_zip');
    }


    /**
     * Gets capacity
     *
     * @return int
     */
    public function capacity()
    {
        return $this->get_pretty('VNU_capacity', 'symbol');
    }


    /**
     * Gets created
     *
     * @return string
     */
    public function created()
    {
        return $this->get('VNU_created');
    }


    /**
     * Gets modified
     *
     * @return string
     */
    public function modified()
    {
        return $this->get('VNU_modified');
    }


    /**
     * Gets order
     *
     * @return int
     */
    public function order()
    {
        return $this->get('VNU_order');
    }


    /**
     * Gets wp_user
     *
     * @return int
     */
    public function wp_user()
    {
        return $this->get('VNU_wp_user');
    }


    /**
     * @return string
     */
    public function virtual_phone()
    {
        return $this->get('VNU_virtual_phone');
    }


    /**
     * @return string
     */
    public function virtual_url()
    {
        return $this->get('VNU_virtual_url');
    }


    /**
     * @return bool
     */
    public function enable_for_gmap()
    {
        return $this->get('VNU_enable_for_gmap');
    }


    /**
     * @return string
     */
    public function google_map_link()
    {
        return $this->get('VNU_google_map_link');
    }


    /**
     * Gets all events happening at this venue. Query parameters can be added to
     * fetch a subset of those events.
     *
     * @param array $query_params @see https://github.com/eventespresso/event-espresso-core/tree/master/docs/G--Model-System/model-query-params.md
     * @param bool  $upcoming
     * @return EE_Event[]
     */
    public function events($query_params = array(), $upcoming = false)
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
     */
    public function set_address($address = '')
    {
        $this->set('VNU_address', $address);
    }


    /**
     * @param string $address2
     */
    public function set_address2($address2 = '')
    {
        $this->set('VNU_address2', $address2);
    }


    /**
     * @param string $city
     */
    public function set_city($city = '')
    {
        $this->set('VNU_city', $city);
    }


    /**
     * @param int $state
     */
    public function set_state_ID($state = 0)
    {
        $this->set('STA_ID', $state);
    }


    /**
     * Sets the state, given either a state id or state object
     *
     * @param EE_State /int $state_id_or_obj
     * @return EE_State
     */
    public function set_state_obj($state_id_or_obj)
    {
        return $this->_add_relation_to($state_id_or_obj, 'State');
    }


    /**
     * @param int $country_ID
     */
    public function set_country_ID($country_ID = 0)
    {
        $this->set('CNT_ISO', $country_ID);
    }


    /**
     * Sets the country on the venue
     *
     * @param EE_Country /string $country_id_or_obj
     * @return EE_Country
     */
    public function set_country_obj($country_id_or_obj)
    {
        return $this->_add_relation_to($country_id_or_obj, 'Country');
    }


    /**
     * @param string $zip
     */
    public function set_zip($zip = '')
    {
        $this->set('VNU_zip', $zip);
    }


    /**
     * @param int $capacity
     */
    public function set_capacity($capacity = 0)
    {
        $this->set('VNU_capacity', $capacity);
    }


    /**
     * @param string $created
     */
    public function set_created($created = '')
    {
        $this->set('VNU_created', $created);
    }


    /**
     * @param string $desc
     */
    public function set_description($desc = '')
    {
        $this->set('VNU_desc', $desc);
    }


    /**
     * @param string $identifier
     */
    public function set_identifier($identifier = '')
    {
        $this->set('VNU_identifier', $identifier);
    }


    /**
     * @param string $modified
     */
    public function set_modified($modified = '')
    {
        $this->set('VNU_modified', $modified);
    }


    /**
     * @param string $name
     */
    public function set_name($name = '')
    {
        $this->set('VNU_name', $name);
    }


    /**
     * @param int $order
     */
    public function set_order($order = 0)
    {
        $this->set('VNU_order', $order);
    }


    /**
     * @param string $phone
     */
    public function set_phone($phone = '')
    {
        $this->set('VNU_phone', $phone);
    }


    /**
     * @param int $wp_user
     */
    public function set_wp_user($wp_user = 1)
    {
        $this->set('VNU_wp_user', $wp_user);
    }


    /**
     * @param string $url
     */
    public function set_venue_url($url = '')
    {
        $this->set('VNU_url', $url);
    }


    /**
     * @param string $phone
     */
    public function set_virtual_phone($phone = '')
    {
        $this->set('VNU_virtual_phone', $phone);
    }


    /**
     * @param string $url
     */
    public function set_virtual_url($url = '')
    {
        $this->set('VNU_virtual_url', $url);
    }


    /**
     * @param string $enable
     */
    public function set_enable_for_gmap($enable = '')
    {
        $this->set('VNU_enable_for_gmap', $enable);
    }


    /**
     * @param string $google_map_link
     */
    public function set_google_map_link($google_map_link = '')
    {
        $this->set('VNU_google_map_link', $google_map_link);
    }
}
