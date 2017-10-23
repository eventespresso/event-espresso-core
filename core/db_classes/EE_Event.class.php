<?php

use EventEspresso\core\domain\services\event\EventSpacesCalculator;
use EventEspresso\core\exceptions\UnexpectedEntityException;

if (!defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}


/**
 * EE_Event
 *
 * @package               Event Espresso
 * @subpackage            includes/models/
 * @author                Mike Nelson
 */
class EE_Event extends EE_CPT_Base implements EEI_Line_Item_Object, EEI_Admin_Links, EEI_Has_Icon, EEI_Event
{

    /**
     * cached value for the the logical active status for the event
     *
     * @see get_active_status()
     * @var string
     */
    protected $_active_status = '';

    /**
     * This is just used for caching the Primary Datetime for the Event on initial retrieval
     *
     * @var EE_Datetime
     */
    protected $_Primary_Datetime;

    /**
     * @var EventSpacesCalculator $available_spaces_calculator
     */
    protected $available_spaces_calculator;


    /**
     * @param array $props_n_values incoming values
     * @param string $timezone incoming timezone (if not set the timezone set for the website will be
     *                                        used.)
     * @param array $date_formats incoming date_formats in an array where the first value is the
     *                                        date_format and the second value is the time format
     * @return EE_Event
     * @throws EE_Error
     */
    public static function new_instance($props_n_values = array(), $timezone = null, $date_formats = array())
    {
        $has_object = parent::_check_for_object($props_n_values, __CLASS__, $timezone, $date_formats);
        return $has_object ? $has_object : new self($props_n_values, false, $timezone, $date_formats);
    }


    /**
     * @param array $props_n_values incoming values from the database
     * @param string $timezone incoming timezone as set by the model.  If not set the timezone for
     *                                the website will be used.
     * @return EE_Event
     * @throws EE_Error
     */
    public static function new_instance_from_db($props_n_values = array(), $timezone = null)
    {
        return new self($props_n_values, true, $timezone);
    }



    /**
     * @return EventSpacesCalculator
     * @throws \EE_Error
     */
    public function getAvailableSpacesCalculator()
    {
        if(! $this->available_spaces_calculator instanceof EventSpacesCalculator){
            $this->available_spaces_calculator = new EventSpacesCalculator($this);
        }
        return $this->available_spaces_calculator;
    }



    /**
     * Overrides parent set() method so that all calls to set( 'status', $status ) can be routed to internal methods
     *
     * @param string $field_name
     * @param mixed $field_value
     * @param bool $use_default
     * @throws EE_Error
     */
    public function set($field_name, $field_value, $use_default = false)
    {
        switch ($field_name) {
            case 'status' :
                $this->set_status($field_value, $use_default);
                break;
            default :
                parent::set($field_name, $field_value, $use_default);
        }
    }


    /**
     *    set_status
     * Checks if event status is being changed to SOLD OUT
     * and updates event meta data with previous event status
     * so that we can revert things if/when the event is no longer sold out
     *
     * @access public
     * @param string $new_status
     * @param bool $use_default
     * @return void
     * @throws EE_Error
     */
    public function set_status($new_status = null, $use_default = false)
    {
        // if nothing is set, and we aren't explicitly wanting to reset the status, then just leave
        if (empty($new_status) && !$use_default) {
            return;
        }
        // get current Event status
        $old_status = $this->status();
        // if status has changed
        if ($old_status !== $new_status) {
            // TO sold_out
            if ($new_status === EEM_Event::sold_out) {
                // save the previous event status so that we can revert if the event is no longer sold out
                $this->add_post_meta('_previous_event_status', $old_status);
                do_action('AHEE__EE_Event__set_status__to_sold_out', $this, $old_status, $new_status);
                // OR FROM  sold_out
            } else if ($old_status === EEM_Event::sold_out) {
                $this->delete_post_meta('_previous_event_status');
                do_action('AHEE__EE_Event__set_status__from_sold_out', $this, $old_status, $new_status);
            }
            // update status
            parent::set('status', $new_status, $use_default);
            do_action('AHEE__EE_Event__set_status__after_update', $this);
            return;
        }
        // even though the old value matches the new value, it's still good to
        // allow the parent set method to have a say
        parent::set('status', $new_status, $use_default);
    }


    /**
     * Gets all the datetimes for this event
     *
     * @param array $query_params like EEM_Base::get_all
     * @return EE_Base_Class[]|EE_Datetime[]
     * @throws EE_Error
     */
    public function datetimes($query_params = array())
    {
        return $this->get_many_related('Datetime', $query_params);
    }


    /**
     * Gets all the datetimes for this event, ordered by DTT_EVT_start in ascending order
     *
     * @return EE_Base_Class[]|EE_Datetime[]
     * @throws EE_Error
     */
    public function datetimes_in_chronological_order()
    {
        return $this->get_many_related('Datetime', array('order_by' => array('DTT_EVT_start' => 'ASC')));
    }


    /**
     * Gets all the datetimes for this event, ordered by the DTT_order on the datetime.
     * @darren, we should probably UNSET timezone on the EEM_Datetime model
     * after running our query, so that this timezone isn't set for EVERY query
     * on EEM_Datetime for the rest of the request, no?
     *
     * @param boolean $show_expired whether or not to include expired events
     * @param boolean $show_deleted whether or not to include deleted events
     * @param null $limit
     * @return EE_Datetime[]
     * @throws EE_Error
     */
    public function datetimes_ordered($show_expired = true, $show_deleted = false, $limit = null)
    {
        return EEM_Datetime::instance($this->_timezone)->get_datetimes_for_event_ordered_by_DTT_order(
            $this->ID(),
            $show_expired,
            $show_deleted,
            $limit
        );
    }


    /**
     * Returns one related datetime. Mostly only used by some legacy code.
     *
     * @return EE_Base_Class|EE_Datetime
     * @throws EE_Error
     */
    public function first_datetime()
    {
        return $this->get_first_related('Datetime');
    }


    /**
     * Returns the 'primary' datetime for the event
     *
     * @param bool $try_to_exclude_expired
     * @param bool $try_to_exclude_deleted
     * @return EE_Datetime
     * @throws EE_Error
     */
    public function primary_datetime($try_to_exclude_expired = true, $try_to_exclude_deleted = true)
    {
        if (!empty ($this->_Primary_Datetime)) {
            return $this->_Primary_Datetime;
        }
        $this->_Primary_Datetime = EEM_Datetime::instance($this->_timezone)->get_primary_datetime_for_event(
            $this->ID(),
            $try_to_exclude_expired,
            $try_to_exclude_deleted
        );
        return $this->_Primary_Datetime;
    }


    /**
     * Gets all the tickets available for purchase of this event
     *
     * @param array $query_params like EEM_Base::get_all
     * @return EE_Base_Class[]|EE_Ticket[]
     * @throws EE_Error
     */
    public function tickets($query_params = array())
    {
        //first get all datetimes
        $datetimes = $this->datetimes_ordered();
        if (!$datetimes) {
            return array();
        }
        $datetime_ids = array();
        foreach ($datetimes as $datetime) {
            $datetime_ids[] = $datetime->ID();
        }
        $where_params = array('Datetime.DTT_ID' => array('IN', $datetime_ids));
        //if incoming $query_params has where conditions let's merge but not override existing.
        if (is_array($query_params) && isset($query_params[0])) {
            $where_params = array_merge($query_params[0], $where_params);
            unset($query_params[0]);
        }
        //now add $where_params to $query_params
        $query_params[0] = $where_params;
        return EEM_Ticket::instance()->get_all($query_params);
    }


    /**
     * get all unexpired untrashed tickets
     *
     * @return EE_Ticket[]
     * @throws EE_Error
     */
    public function active_tickets()
    {
        return $this->tickets(array(
            array(
                'TKT_end_date' => array('>=', EEM_Ticket::instance()->current_time_for_query('TKT_end_date')),
                'TKT_deleted' => false,
            ),
        ));
    }


    /**
     * @return bool
     * @throws EE_Error
     */
    public function additional_limit()
    {
        return $this->get('EVT_additional_limit');
    }


    /**
     * @return bool
     * @throws EE_Error
     */
    public function allow_overflow()
    {
        return $this->get('EVT_allow_overflow');
    }


    /**
     * @return bool
     * @throws EE_Error
     */
    public function created()
    {
        return $this->get('EVT_created');
    }


    /**
     * @return bool
     * @throws EE_Error
     */
    public function description()
    {
        return $this->get('EVT_desc');
    }


    /**
     * Runs do_shortcode and wpautop on the description
     *
     * @return string of html
     * @throws EE_Error
     */
    public function description_filtered()
    {
        return $this->get_pretty('EVT_desc');
    }


    /**
     * @return bool
     * @throws EE_Error
     */
    public function display_description()
    {
        return $this->get('EVT_display_desc');
    }


    /**
     * @return bool
     * @throws EE_Error
     */
    public function display_ticket_selector()
    {
        return (bool)$this->get('EVT_display_ticket_selector');
    }


    /**
     * @return bool
     * @throws EE_Error
     */
    public function external_url()
    {
        return $this->get('EVT_external_URL');
    }


    /**
     * @return bool
     * @throws EE_Error
     */
    public function member_only()
    {
        return $this->get('EVT_member_only');
    }


    /**
     * @return bool
     * @throws EE_Error
     */
    public function phone()
    {
        return $this->get('EVT_phone');
    }


    /**
     * @return bool
     * @throws EE_Error
     */
    public function modified()
    {
        return $this->get('EVT_modified');
    }


    /**
     * @return bool
     * @throws EE_Error
     */
    public function name()
    {
        return $this->get('EVT_name');
    }


    /**
     * @return bool
     * @throws EE_Error
     */
    public function order()
    {
        return $this->get('EVT_order');
    }


    /**
     * @return bool|string
     * @throws EE_Error
     */
    public function default_registration_status()
    {
        $event_default_registration_status = $this->get('EVT_default_registration_status');
        return !empty($event_default_registration_status)
            ? $event_default_registration_status
            : EE_Registry::instance()->CFG->registration->default_STS_ID;
    }


    /**
     * @param int $num_words
     * @param null $more
     * @param bool $not_full_desc
     * @return bool|string
     * @throws EE_Error
     */
    public function short_description($num_words = 55, $more = null, $not_full_desc = false)
    {
        $short_desc = $this->get('EVT_short_desc');
        if (!empty($short_desc) || $not_full_desc) {
            return $short_desc;
        }
        $full_desc = $this->get('EVT_desc');
        return wp_trim_words($full_desc, $num_words, $more);
    }


    /**
     * @return bool
     * @throws EE_Error
     */
    public function slug()
    {
        return $this->get('EVT_slug');
    }


    /**
     * @return bool
     * @throws EE_Error
     */
    public function timezone_string()
    {
        return $this->get('EVT_timezone_string');
    }


    /**
     * @return bool
     * @throws EE_Error
     */
    public function visible_on()
    {
        return $this->get('EVT_visible_on');
    }


    /**
     * @return int
     * @throws EE_Error
     */
    public function wp_user()
    {
        return $this->get('EVT_wp_user');
    }


    /**
     * @return bool
     * @throws EE_Error
     */
    public function donations()
    {
        return $this->get('EVT_donations');
    }


    /**
     * @param $limit
     * @throws EE_Error
     */
    public function set_additional_limit($limit)
    {
        $this->set('EVT_additional_limit', $limit);
    }


    /**
     * @param $created
     * @throws EE_Error
     */
    public function set_created($created)
    {
        $this->set('EVT_created', $created);
    }


    /**
     * @param $desc
     * @throws EE_Error
     */
    public function set_description($desc)
    {
        $this->set('EVT_desc', $desc);
    }


    /**
     * @param $display_desc
     * @throws EE_Error
     */
    public function set_display_description($display_desc)
    {
        $this->set('EVT_display_desc', $display_desc);
    }


    /**
     * @param $display_ticket_selector
     * @throws EE_Error
     */
    public function set_display_ticket_selector($display_ticket_selector)
    {
        $this->set('EVT_display_ticket_selector', $display_ticket_selector);
    }


    /**
     * @param $external_url
     * @throws EE_Error
     */
    public function set_external_url($external_url)
    {
        $this->set('EVT_external_URL', $external_url);
    }


    /**
     * @param $member_only
     * @throws EE_Error
     */
    public function set_member_only($member_only)
    {
        $this->set('EVT_member_only', $member_only);
    }


    /**
     * @param $event_phone
     * @throws EE_Error
     */
    public function set_event_phone($event_phone)
    {
        $this->set('EVT_phone', $event_phone);
    }


    /**
     * @param $modified
     * @throws EE_Error
     */
    public function set_modified($modified)
    {
        $this->set('EVT_modified', $modified);
    }


    /**
     * @param $name
     * @throws EE_Error
     */
    public function set_name($name)
    {
        $this->set('EVT_name', $name);
    }


    /**
     * @param $order
     * @throws EE_Error
     */
    public function set_order($order)
    {
        $this->set('EVT_order', $order);
    }


    /**
     * @param $short_desc
     * @throws EE_Error
     */
    public function set_short_description($short_desc)
    {
        $this->set('EVT_short_desc', $short_desc);
    }


    /**
     * @param $slug
     * @throws EE_Error
     */
    public function set_slug($slug)
    {
        $this->set('EVT_slug', $slug);
    }


    /**
     * @param $timezone_string
     * @throws EE_Error
     */
    public function set_timezone_string($timezone_string)
    {
        $this->set('EVT_timezone_string', $timezone_string);
    }


    /**
     * @param $visible_on
     * @throws EE_Error
     */
    public function set_visible_on($visible_on)
    {
        $this->set('EVT_visible_on', $visible_on);
    }


    /**
     * @param $wp_user
     * @throws EE_Error
     */
    public function set_wp_user($wp_user)
    {
        $this->set('EVT_wp_user', $wp_user);
    }


    /**
     * @param $default_registration_status
     * @throws EE_Error
     */
    public function set_default_registration_status($default_registration_status)
    {
        $this->set('EVT_default_registration_status', $default_registration_status);
    }


    /**
     * @param $donations
     * @throws EE_Error
     */
    public function set_donations($donations)
    {
        $this->set('EVT_donations', $donations);
    }


    /**
     * Adds a venue to this event
     *
     * @param EE_Venue /int $venue_id_or_obj
     * @return EE_Base_Class|EE_Venue
     * @throws EE_Error
     */
    public function add_venue($venue_id_or_obj)
    {
        return $this->_add_relation_to($venue_id_or_obj, 'Venue');
    }


    /**
     * Removes a venue from the event
     *
     * @param EE_Venue /int $venue_id_or_obj
     * @return EE_Base_Class|EE_Venue
     * @throws EE_Error
     */
    public function remove_venue($venue_id_or_obj)
    {
        return $this->_remove_relation_to($venue_id_or_obj, 'Venue');
    }


    /**
     * Gets all the venues related ot the event. May provide additional $query_params if desired
     *
     * @param array $query_params like EEM_Base::get_all's $query_params
     * @return EE_Base_Class[]|EE_Venue[]
     * @throws EE_Error
     */
    public function venues($query_params = array())
    {
        return $this->get_many_related('Venue', $query_params);
    }


    /**
     * check if event id is present and if event is published
     *
     * @access public
     * @return boolean true yes, false no
     * @throws EE_Error
     */
    private function _has_ID_and_is_published()
    {
        // first check if event id is present and not NULL,
        // then check if this event is published (or any of the equivalent "published" statuses)
        return
            $this->ID() && $this->ID() !== null
            && (
                $this->status() === 'publish'
                || $this->status() === EEM_Event::sold_out
                || $this->status() === EEM_Event::postponed
                || $this->status() === EEM_Event::cancelled
            );
    }


    /**
     * This simply compares the internal dates with NOW and determines if the event is upcoming or not.
     *
     * @access public
     * @return boolean true yes, false no
     * @throws EE_Error
     */
    public function is_upcoming()
    {
        // check if event id is present and if this event is published
        if ($this->is_inactive()) {
            return false;
        }
        // set initial value
        $upcoming = false;
        //next let's get all datetimes and loop through them
        $datetimes = $this->datetimes_in_chronological_order();
        foreach ($datetimes as $datetime) {
            if ($datetime instanceof EE_Datetime) {
                //if this dtt is expired then we continue cause one of the other datetimes might be upcoming.
                if ($datetime->is_expired()) {
                    continue;
                }
                //if this dtt is active then we return false.
                if ($datetime->is_active()) {
                    return false;
                }
                //otherwise let's check upcoming status
                $upcoming = $datetime->is_upcoming();
            }
        }
        return $upcoming;
    }


    /**
     * @return bool
     * @throws EE_Error
     */
    public function is_active()
    {
        // check if event id is present and if this event is published
        if ($this->is_inactive()) {
            return false;
        }
        // set initial value
        $active = false;
        //next let's get all datetimes and loop through them
        $datetimes = $this->datetimes_in_chronological_order();
        foreach ($datetimes as $datetime) {
            if ($datetime instanceof EE_Datetime) {
                //if this dtt is expired then we continue cause one of the other datetimes might be active.
                if ($datetime->is_expired()) {
                    continue;
                }
                //if this dtt is upcoming then we return false.
                if ($datetime->is_upcoming()) {
                    return false;
                }
                //otherwise let's check active status
                $active = $datetime->is_active();
            }
        }
        return $active;
    }


    /**
     * @return bool
     * @throws EE_Error
     */
    public function is_expired()
    {
        // check if event id is present and if this event is published
        if ($this->is_inactive()) {
            return false;
        }
        // set initial value
        $expired = false;
        //first let's get all datetimes and loop through them
        $datetimes = $this->datetimes_in_chronological_order();
        foreach ($datetimes as $datetime) {
            if ($datetime instanceof EE_Datetime) {
                //if this dtt is upcoming or active then we return false.
                if ($datetime->is_upcoming() || $datetime->is_active()) {
                    return false;
                }
                //otherwise let's check active status
                $expired = $datetime->is_expired();
            }
        }
        return $expired;
    }


    /**
     * @return bool
     * @throws EE_Error
     */
    public function is_inactive()
    {
        // check if event id is present and if this event is published
        if ($this->_has_ID_and_is_published()) {
            return false;
        }
        return true;
    }


    /**
     * calculate spaces remaining based on "saleable" tickets
     *
     * @param array $tickets
     * @param bool $filtered
     * @return int|float
     * @throws EE_Error
     * @throws DomainException
     * @throws UnexpectedEntityException
     */
    public function spaces_remaining($tickets = array(), $filtered = true)
    {
        $this->getAvailableSpacesCalculator()->setActiveTickets($tickets);
        $spaces_remaining = $this->getAvailableSpacesCalculator()->spacesRemaining();
        return $filtered
            ? apply_filters(
                'FHEE_EE_Event__spaces_remaining',
                $spaces_remaining,
                $this,
                $tickets
            )
            : $spaces_remaining;
    }


    /**
     *    perform_sold_out_status_check
     *    checks all of this events's datetime  reg_limit - sold values to determine if ANY datetimes have spaces available...
     *    if NOT, then the event status will get toggled to 'sold_out'
     *
     * @return bool    return the ACTUAL sold out state.
     * @throws EE_Error
     * @throws DomainException
     * @throws UnexpectedEntityException
     */
    public function perform_sold_out_status_check()
    {
        // get all unexpired untrashed tickets
        $tickets = $this->active_tickets();
        // if all the tickets are just expired, then don't update the event status to sold out
        if (empty($tickets)) {
            return true;
        }
        $spaces_remaining = $this->spaces_remaining($tickets);
        if ($spaces_remaining < 1) {
            $this->set_status(EEM_Event::sold_out);
            $this->save();
            $sold_out = true;
        } else {
            $sold_out = false;
            // was event previously marked as sold out ?
            if ($this->status() === EEM_Event::sold_out) {
                // revert status to previous value, if it was set
                $previous_event_status = $this->get_post_meta('_previous_event_status', true);
                if ($previous_event_status) {
                    $this->set_status($previous_event_status);
                    $this->save();
                }
            }
        }
        do_action('AHEE__EE_Event__perform_sold_out_status_check__end', $this, $sold_out, $spaces_remaining, $tickets);
        return $sold_out;
    }



    /**
     * This returns the total remaining spaces for sale on this event.
     *
     * @uses EE_Event::total_available_spaces()
     * @return float|int
     * @throws EE_Error
     * @throws DomainException
     * @throws UnexpectedEntityException
     */
    public function spaces_remaining_for_sale()
    {
        return $this->total_available_spaces(true);
    }



    /**
     * This returns the total spaces available for an event
     * while considering all the qtys on the tickets and the reg limits
     * on the datetimes attached to this event.
     *
     * @param   bool $consider_sold Whether to consider any tickets that have already sold in our calculation.
     *                              If this is false, then we return the most tickets that could ever be sold
     *                              for this event with the datetime and tickets setup on the event under optimal
     *                              selling conditions.  Otherwise we return a live calculation of spaces available
     *                              based on tickets sold.  Depending on setup and stage of sales, this
     *                              may appear to equal remaining tickets.  However, the more tickets are
     *                              sold out, the more accurate the "live" total is.
     * @return float|int
     * @throws EE_Error
     * @throws DomainException
     * @throws UnexpectedEntityException
     */
    public function total_available_spaces($consider_sold = false)
    {
        $spaces_available = $consider_sold
            ? $this->getAvailableSpacesCalculator()->spacesRemaining()
            : $this->getAvailableSpacesCalculator()->totalSpacesAvailable();
        return apply_filters(
            'FHEE_EE_Event__total_available_spaces__spaces_available',
            $spaces_available,
            $this,
            $this->getAvailableSpacesCalculator()->getDatetimes(),
            $this->getAvailableSpacesCalculator()->getActiveTickets()
        );
    }


    /**
     * Checks if the event is set to sold out
     *
     * @param  bool $actual whether or not to perform calculations to not only figure the
     *                      actual status but also to flip the status if necessary to sold
     *                      out If false, we just check the existing status of the event
     * @return boolean
     * @throws EE_Error
     */
    public function is_sold_out($actual = false)
    {
        if (!$actual) {
            return $this->status() === EEM_Event::sold_out;
        }
        return $this->perform_sold_out_status_check();
    }


    /**
     * Checks if the event is marked as postponed
     *
     * @return boolean
     */
    public function is_postponed()
    {
        return $this->status() === EEM_Event::postponed;
    }


    /**
     * Checks if the event is marked as cancelled
     *
     * @return boolean
     */
    public function is_cancelled()
    {
        return $this->status() === EEM_Event::cancelled;
    }


    /**
     * Get the logical active status in a hierarchical order for all the datetimes.  Note
     * Basically, we order the datetimes by EVT_start_date.  Then first test on whether the event is published.  If its
     * NOT published then we test for whether its expired or not.  IF it IS published then we test first on whether an
     * event has any active dates.  If no active dates then we check for any upcoming dates.  If no upcoming dates then
     * the event is considered expired.
     * NOTE: this method does NOT calculate whether the datetimes are sold out when event is published.  Sold Out is a status
     * set on the EVENT when it is not published and thus is done
     *
     * @param bool $reset
     * @return bool | string - based on EE_Datetime active constants or FALSE if error.
     * @throws EE_Error
     */
    public function get_active_status($reset = false)
    {
        // if the active status has already been set, then just use that value (unless we are resetting it)
        if (!empty($this->_active_status) && !$reset) {
            return $this->_active_status;
        }
        //first check if event id is present on this object
        if (!$this->ID()) {
            return false;
        }
        $where_params_for_event = array(array('EVT_ID' => $this->ID()));
        //if event is published:
        if ($this->status() === 'publish') {
            //active?
            if (EEM_Datetime::instance()->get_datetime_count_for_status(EE_Datetime::active, $where_params_for_event) > 0) {
                $this->_active_status = EE_Datetime::active;
            } else {
                //upcoming?
                if (EEM_Datetime::instance()->get_datetime_count_for_status(EE_Datetime::upcoming, $where_params_for_event) > 0) {
                    $this->_active_status = EE_Datetime::upcoming;
                } else {
                    //expired?
                    if (
                        EEM_Datetime::instance()->get_datetime_count_for_status(EE_Datetime::expired, $where_params_for_event) > 0
                    ) {
                        $this->_active_status = EE_Datetime::expired;
                    } else {
                        //it would be odd if things make it this far because it basically means there are no datetime's
                        //attached to the event.  So in this case it will just be considered inactive.
                        $this->_active_status = EE_Datetime::inactive;
                    }
                }
            }
        } else {
            //the event is not published, so let's just set it's active status according to its' post status
            switch ($this->status()) {
                case EEM_Event::sold_out :
                    $this->_active_status = EE_Datetime::sold_out;
                    break;
                case EEM_Event::cancelled :
                    $this->_active_status = EE_Datetime::cancelled;
                    break;
                case EEM_Event::postponed :
                    $this->_active_status = EE_Datetime::postponed;
                    break;
                default :
                    $this->_active_status = EE_Datetime::inactive;
            }
        }
        return $this->_active_status;
    }


    /**
     *    pretty_active_status
     *
     * @access public
     * @param boolean $echo whether to return (FALSE), or echo out the result (TRUE)
     * @return mixed void|string
     * @throws EE_Error
     */
    public function pretty_active_status($echo = true)
    {
        $active_status = $this->get_active_status();
        $status = '<span class="ee-status event-active-status-'
            . $active_status
            . '">'
            . EEH_Template::pretty_status($active_status, false, 'sentence')
            . '</span>';
        if ($echo) {
            echo $status;
            return '';
        }
        return $status;
    }


    /**
     * @return bool|int
     * @throws EE_Error
     */
    public function get_number_of_tickets_sold()
    {
        $tkt_sold = 0;
        if (!$this->ID()) {
            return 0;
        }
        $datetimes = $this->datetimes();
        foreach ($datetimes as $datetime) {
            if ($datetime instanceof EE_Datetime) {
                $tkt_sold += $datetime->sold();
            }
        }
        return $tkt_sold;
    }


    /**
     * This just returns a count of all the registrations for this event
     *
     * @access  public
     * @return int
     * @throws EE_Error
     */
    public function get_count_of_all_registrations()
    {
        return EEM_Event::instance()->count_related($this, 'Registration');
    }


    /**
     * This returns the ticket with the earliest start time that is
     * available for this event (across all datetimes attached to the event)
     *
     * @return EE_Base_Class|EE_Ticket|null
     * @throws EE_Error
     */
    public function get_ticket_with_earliest_start_time()
    {
        $where['Datetime.EVT_ID'] = $this->ID();
        $query_params = array($where, 'order_by' => array('TKT_start_date' => 'ASC'));
        return EE_Registry::instance()->load_model('Ticket')->get_one($query_params);
    }


    /**
     * This returns the ticket with the latest end time that is available
     * for this event (across all datetimes attached to the event)
     *
     * @return EE_Base_Class|EE_Ticket|null
     * @throws EE_Error
     */
    public function get_ticket_with_latest_end_time()
    {
        $where['Datetime.EVT_ID'] = $this->ID();
        $query_params = array($where, 'order_by' => array('TKT_end_date' => 'DESC'));
        return EE_Registry::instance()->load_model('Ticket')->get_one($query_params);
    }


    /**
     * This returns whether there are any tickets on sale for this event.
     *
     * @return bool true = YES tickets on sale.
     * @throws EE_Error
     */
    public function tickets_on_sale()
    {
        $earliest_ticket = $this->get_ticket_with_earliest_start_time();
        $latest_ticket = $this->get_ticket_with_latest_end_time();
        if (!$latest_ticket instanceof EE_Ticket && !$earliest_ticket instanceof EE_Ticket) {
            return false;
        }
        //check on sale for these two tickets.
        if ($latest_ticket->is_on_sale() || $earliest_ticket->is_on_sale()) {
            return true;
        }
        return false;
    }


    /**
     * Gets the URL for viewing this event on the front-end. Overrides parent
     * to check for an external URL first
     *
     * @return string
     * @throws EE_Error
     */
    public function get_permalink()
    {
        if ($this->external_url()) {
            return $this->external_url();
        }
        return parent::get_permalink();
    }


    /**
     * Gets the first term for 'espresso_event_categories' we can find
     *
     * @param array $query_params like EEM_Base::get_all
     * @return EE_Base_Class|EE_Term|null
     * @throws EE_Error
     */
    public function first_event_category($query_params = array())
    {
        $query_params[0]['Term_Taxonomy.taxonomy'] = 'espresso_event_categories';
        $query_params[0]['Term_Taxonomy.Event.EVT_ID'] = $this->ID();
        return EEM_Term::instance()->get_one($query_params);
    }


    /**
     * Gets all terms for 'espresso_event_categories' we can find
     *
     * @param array $query_params
     * @return EE_Base_Class[]|EE_Term[]
     * @throws EE_Error
     */
    public function get_all_event_categories($query_params = array())
    {
        $query_params[0]['Term_Taxonomy.taxonomy'] = 'espresso_event_categories';
        $query_params[0]['Term_Taxonomy.Event.EVT_ID'] = $this->ID();
        return EEM_Term::instance()->get_all($query_params);
    }


    /**
     * Gets all the question groups, ordering them by QSG_order ascending
     *
     * @param array $query_params @see EEM_Base::get_all
     * @return EE_Base_Class[]|EE_Question_Group[]
     * @throws EE_Error
     */
    public function question_groups($query_params = array())
    {
        $query_params = !empty($query_params) ? $query_params : array('order_by' => array('QSG_order' => 'ASC'));
        return $this->get_many_related('Question_Group', $query_params);
    }


    /**
     * Implementation for EEI_Has_Icon interface method.
     *
     * @see EEI_Visual_Representation for comments
     * @return string
     */
    public function get_icon()
    {
        return '<span class="dashicons dashicons-flag"></span>';
    }


    /**
     * Implementation for EEI_Admin_Links interface method.
     *
     * @see EEI_Admin_Links for comments
     * @return string
     * @throws EE_Error
     */
    public function get_admin_details_link()
    {
        return $this->get_admin_edit_link();
    }


    /**
     * Implementation for EEI_Admin_Links interface method.
     *
     * @see EEI_Admin_Links for comments
     * @return string
     * @throws EE_Error
     */
    public function get_admin_edit_link()
    {
        return EEH_URL::add_query_args_and_nonce(array(
            'page' => 'espresso_events',
            'action' => 'edit',
            'post' => $this->ID(),
        ),
            admin_url('admin.php')
        );
    }


    /**
     * Implementation for EEI_Admin_Links interface method.
     *
     * @see EEI_Admin_Links for comments
     * @return string
     */
    public function get_admin_settings_link()
    {
        return EEH_URL::add_query_args_and_nonce(array(
            'page' => 'espresso_events',
            'action' => 'default_event_settings',
        ),
            admin_url('admin.php')
        );
    }


    /**
     * Implementation for EEI_Admin_Links interface method.
     *
     * @see EEI_Admin_Links for comments
     * @return string
     */
    public function get_admin_overview_link()
    {
        return EEH_URL::add_query_args_and_nonce(array(
            'page' => 'espresso_events',
            'action' => 'default',
        ),
            admin_url('admin.php')
        );
    }

}
