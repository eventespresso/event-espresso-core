<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}
/**
 * Class Datetime Model
 *
 * @package               Event Espresso
 * @subpackage            includes/models/
 * @author                Michael Nelson, Brent Christensen
 */
class EEM_Datetime extends EEM_Soft_Delete_Base
{

    /**
     * @var EEM_Datetime $_instance
     */
    protected static $_instance;



    /**
     *        private constructor to prevent direct creation
     *
     * @Constructor
     * @access private
     * @param string $timezone string representing the timezone we want to set for returned Date Time Strings (and any
     *                         incoming timezone data that gets saved).  Note this just sends the timezone info to the
     *                         date time model field objects.  Default is NULL (and will be assumed using the set
     *                         timezone in the 'timezone_string' wp option)
     * @throws \EE_Error
     */
    protected function __construct($timezone)
    {
        $this->singular_item = __('Datetime', 'event_espresso');
        $this->plural_item = __('Datetimes', 'event_espresso');
        $this->_tables = array(
            'Datetime' => new EE_Primary_Table('esp_datetime', 'DTT_ID'),
        );
        $this->_fields = array(
            'Datetime' => array(
                'DTT_ID'          => new EE_Primary_Key_Int_Field('DTT_ID', __('Datetime ID', 'event_espresso')),
                'EVT_ID'          => new EE_Foreign_Key_Int_Field(
                    'EVT_ID', __('Event ID', 'event_espresso'), false, 0, 'Event'
                ),
                'DTT_name'        => new EE_Plain_Text_Field(
                    'DTT_name', __('Datetime Name', 'event_espresso'), false, ''
                ),
                'DTT_description' => new EE_Post_Content_Field(
                    'DTT_description', __('Description for Datetime', 'event_espresso'), false, ''
                ),
                'DTT_EVT_start'   => new EE_Datetime_Field(
                    'DTT_EVT_start', __('Start time/date of Event', 'event_espresso'), false, EE_Datetime_Field::now,
                    $timezone
                ),
                'DTT_EVT_end'     => new EE_Datetime_Field(
                    'DTT_EVT_end', __('End time/date of Event', 'event_espresso'), false, EE_Datetime_Field::now,
                    $timezone
                ),
                'DTT_reg_limit'   => new EE_Infinite_Integer_Field(
                    'DTT_reg_limit', __('Registration Limit for this time', 'event_espresso'), true, EE_INF),
                'DTT_sold'        => new EE_Integer_Field(
                    'DTT_sold', __('How many sales for this Datetime that have occurred', 'event_espresso'), true, 0
                ),
                'DTT_reserved' => new EE_Integer_Field('DTT_reserved',
                    __('Quantity of tickets reserved, but not yet fully purchased', 'event_espresso'), false, 0
                ),
                'DTT_is_primary'  => new EE_Boolean_Field(
                    'DTT_is_primary', __('Flag indicating datetime is primary one for event', 'event_espresso'),
                    false, false
                ),
                'DTT_order'       => new EE_Integer_Field(
                    'DTT_order', __('The order in which the Datetime is displayed', 'event_espresso'), false, 0
                ),
                'DTT_parent'      => new EE_Integer_Field(
                    'DTT_parent', __('Indicates what DTT_ID is the parent of this DTT_ID'), true, 0
                ),
                'DTT_deleted'     => new EE_Trashed_Flag_Field(
                    'DTT_deleted', __('Flag indicating datetime is archived', 'event_espresso'), false, false
                ),
            ),
        );
        $this->_model_relations = array(
            'Ticket'  => new EE_HABTM_Relation('Datetime_Ticket'),
            'Event'   => new EE_Belongs_To_Relation(),
            'Checkin' => new EE_Has_Many_Relation(),
        );
        $this->_model_chain_to_wp_user = 'Event';
        //this model is generally available for reading
        $this->_cap_restriction_generators[EEM_Base::caps_read] = new EE_Restriction_Generator_Event_Related_Public('Event');
        $this->_cap_restriction_generators[EEM_Base::caps_read_admin] = new EE_Restriction_Generator_Event_Related_Protected('Event');
        $this->_cap_restriction_generators[EEM_Base::caps_edit] = new EE_Restriction_Generator_Event_Related_Protected('Event');
        $this->_cap_restriction_generators[EEM_Base::caps_delete] = new EE_Restriction_Generator_Event_Related_Protected('Event',
            EEM_Base::caps_edit);
        parent::__construct($timezone);
    }



    /**
     * create new blank datetime
     *
     * @access public
     * @return EE_Datetime[] array on success, FALSE on fail
     * @throws \EE_Error
     */
    public function create_new_blank_datetime()
    {
        //makes sure timezone is always set.
        $timezone_string = $this->get_timezone();
        $blank_datetime = EE_Datetime::new_instance(
            array(
                'DTT_EVT_start' => $this->current_time_for_query('DTT_EVT_start', true) + MONTH_IN_SECONDS,
                'DTT_EVT_end'   => $this->current_time_for_query('DTT_EVT_end', true) + MONTH_IN_SECONDS,
                'DTT_order'     => 1,
                'DTT_reg_limit' => EE_INF,
            ),
            $timezone_string
        );
        $blank_datetime->set_start_time($this->convert_datetime_for_query('DTT_EVT_start', '8am', 'ga',
            $timezone_string));
        $blank_datetime->set_end_time($this->convert_datetime_for_query('DTT_EVT_end', '5pm', 'ga', $timezone_string));
        return array($blank_datetime);
    }



    /**
     * get event start date from db
     *
     * @access public
     * @param  int $EVT_ID
     * @return EE_Datetime[] array on success, FALSE on fail
     * @throws \EE_Error
     */
    public function get_all_event_dates($EVT_ID = 0)
    {
        if ( ! $EVT_ID) { // on add_new_event event_id gets set to 0
            return $this->create_new_blank_datetime();
        }
        $results = $this->get_datetimes_for_event_ordered_by_DTT_order($EVT_ID);
        if (empty($results)) {
            return $this->create_new_blank_datetime();
        }
        return $results;
    }



    /**
     * get all datetimes attached to an event ordered by the DTT_order field
     *
     * @public
     * @param  int    $EVT_ID     event id
     * @param boolean $include_expired
     * @param boolean $include_deleted
     * @param  int    $limit      If included then limit the count of results by
     *                            the given number
     * @return EE_Datetime[]
     * @throws \EE_Error
     */
    public function get_datetimes_for_event_ordered_by_DTT_order(
        $EVT_ID,
        $include_expired = true,
        $include_deleted = true,
        $limit = null
    ) {
        //sanitize EVT_ID
        $EVT_ID = absint($EVT_ID);
        $old_assumption = $this->get_assumption_concerning_values_already_prepared_by_model_object();
        $this->assume_values_already_prepared_by_model_object(EEM_Base::prepared_for_use_in_db);
        $where_params = array('Event.EVT_ID' => $EVT_ID);
        $query_params = ! empty($limit)
            ? array(
                $where_params,
                'limit'                    => $limit,
                'order_by'                 => array('DTT_order' => 'ASC'),
                'default_where_conditions' => 'none',
            )
            : array(
                $where_params,
                'order_by'                 => array('DTT_order' => 'ASC'),
                'default_where_conditions' => 'none',
            );
        if ( ! $include_expired) {
            $query_params[0]['DTT_EVT_end'] = array('>=', current_time('mysql', true));
        }
        if ($include_deleted) {
            $query_params[0]['DTT_deleted'] = array('IN', array(true, false));
        }
        /** @var EE_Datetime[] $result */
        $result = $this->get_all($query_params);
        $this->assume_values_already_prepared_by_model_object($old_assumption);
        return $result;
    }



    /**
     * Gets the datetimes for the event (with the given limit), and orders them by "importance". By importance, we mean
     * that the primary datetimes are most important (DEPRECATED FOR NOW), and then the earlier datetimes are the most
     * important. Maybe we'll want this to take into account datetimes that haven't already passed, but we don't yet.
     *
     * @param int $EVT_ID
     * @param int $limit
     * @return EE_Datetime[]|EE_Base_Class[]
     * @throws \EE_Error
     */
    public function get_datetimes_for_event_ordered_by_importance($EVT_ID = 0, $limit = null)
    {
        return $this->get_all(
            array(
                array('Event.EVT_ID' => $EVT_ID),
                'limit'                    => $limit,
                'order_by'                 => array('DTT_EVT_start' => 'ASC'),
                'default_where_conditions' => 'none',
            )
        );
    }



    /**
     * @param int     $EVT_ID
     * @param boolean $include_expired
     * @param boolean $include_deleted
     * @return EE_Datetime
     * @throws \EE_Error
     */
    public function get_oldest_datetime_for_event($EVT_ID, $include_expired = false, $include_deleted = false)
    {
        $results = $this->get_datetimes_for_event_ordered_by_start_time($EVT_ID, $include_expired, $include_deleted, 1);
        if ($results) {
            return array_shift($results);
        } else {
            return null;
        }
    }



    /**
     * Gets the 'primary' datetime for an event.
     *
     * @param int  $EVT_ID
     * @param bool $try_to_exclude_expired
     * @param bool $try_to_exclude_deleted
     * @return \EE_Datetime
     * @throws \EE_Error
     */
    public function get_primary_datetime_for_event(
        $EVT_ID,
        $try_to_exclude_expired = true,
        $try_to_exclude_deleted = true
    ) {
        if ($try_to_exclude_expired) {
            $non_expired = $this->get_oldest_datetime_for_event($EVT_ID, false, false);
            if ($non_expired) {
                return $non_expired;
            }
        }
        if ($try_to_exclude_deleted) {
            $expired_even = $this->get_oldest_datetime_for_event($EVT_ID, true);
            if ($expired_even) {
                return $expired_even;
            }
        }
        return $this->get_oldest_datetime_for_event($EVT_ID, true, true);
    }



    /**
     * Gets ALL the datetimes for an event (including trashed ones, for now), ordered
     * only by start date
     *
     * @param int     $EVT_ID
     * @param boolean $include_expired
     * @param boolean $include_deleted
     * @param int     $limit
     * @return EE_Datetime[]
     * @throws \EE_Error
     */
    public function get_datetimes_for_event_ordered_by_start_time(
        $EVT_ID,
        $include_expired = true,
        $include_deleted = true,
        $limit = null
    ) {
        //sanitize EVT_ID
        $EVT_ID = absint($EVT_ID);
        $old_assumption = $this->get_assumption_concerning_values_already_prepared_by_model_object();
        $this->assume_values_already_prepared_by_model_object(EEM_Base::prepared_for_use_in_db);
        $query_params = array(array('Event.EVT_ID' => $EVT_ID), 'order_by' => array('DTT_EVT_start' => 'asc'));
        if ( ! $include_expired) {
            $query_params[0]['DTT_EVT_end'] = array('>=', current_time('mysql', true));
        }
        if ($include_deleted) {
            $query_params[0]['DTT_deleted'] = array('IN', array(true, false));
        }
        if ($limit) {
            $query_params['limit'] = $limit;
        }
        /** @var EE_Datetime[] $result */
        $result = $this->get_all($query_params);
        $this->assume_values_already_prepared_by_model_object($old_assumption);
        return $result;
    }



    /**
     * Gets ALL the datetimes for an ticket (including trashed ones, for now), ordered
     * only by start date
     *
     * @param int     $TKT_ID
     * @param boolean $include_expired
     * @param boolean $include_deleted
     * @param int     $limit
     * @return EE_Datetime[]
     * @throws \EE_Error
     */
    public function get_datetimes_for_ticket_ordered_by_start_time(
        $TKT_ID,
        $include_expired = true,
        $include_deleted = true,
        $limit = null
    ) {
        //sanitize TKT_ID
        $TKT_ID = absint($TKT_ID);
        $old_assumption = $this->get_assumption_concerning_values_already_prepared_by_model_object();
        $this->assume_values_already_prepared_by_model_object(EEM_Base::prepared_for_use_in_db);
        $query_params = array(array('Ticket.TKT_ID' => $TKT_ID), 'order_by' => array('DTT_EVT_start' => 'asc'));
        if ( ! $include_expired) {
            $query_params[0]['DTT_EVT_end'] = array('>=', current_time('mysql', true));
        }
        if ($include_deleted) {
            $query_params[0]['DTT_deleted'] = array('IN', array(true, false));
        }
        if ($limit) {
            $query_params['limit'] = $limit;
        }
        /** @var EE_Datetime[] $result */
        $result = $this->get_all($query_params);
        $this->assume_values_already_prepared_by_model_object($old_assumption);
        return $result;
    }



    /**
     * Gets all the datetimes for a ticket (including trashed ones, for now), ordered by the DTT_order for the
     * datetimes.
     *
     * @param  int      $TKT_ID          ID of ticket to retrieve the datetimes for
     * @param  boolean  $include_expired whether to include expired datetimes or not
     * @param  boolean  $include_deleted whether to include trashed datetimes or not.
     * @param  int|null $limit           if null, no limit, if int then limit results by
     *                                   that number
     * @return EE_Datetime[]
     * @throws \EE_Error
     */
    public function get_datetimes_for_ticket_ordered_by_DTT_order(
        $TKT_ID,
        $include_expired = true,
        $include_deleted = true,
        $limit = null
    ) {
        //sanitize id.
        $TKT_ID = absint($TKT_ID);
        $old_assumption = $this->get_assumption_concerning_values_already_prepared_by_model_object();
        $this->assume_values_already_prepared_by_model_object(EEM_Base::prepared_for_use_in_db);
        $where_params = array('Ticket.TKT_ID' => $TKT_ID);
        $query_params = array($where_params, 'order_by' => array('DTT_order' => 'ASC'));
        if ( ! $include_expired) {
            $query_params[0]['DTT_EVT_end'] = array('>=', current_time('mysql', true));
        }
        if ($include_deleted) {
            $query_params[0]['DTT_deleted'] = array('IN', array(true, false));
        }
        if ($limit) {
            $query_params['limit'] = $limit;
        }
        /** @var EE_Datetime[] $result */
        $result = $this->get_all($query_params);
        $this->assume_values_already_prepared_by_model_object($old_assumption);
        return $result;
    }



    /**
     * Gets the most important datetime for a particular event (ie, the primary event usually. But if for some WACK
     * reason it doesn't exist, we consider the earliest event the most important)
     *
     * @param int $EVT_ID
     * @return EE_Datetime
     * @throws \EE_Error
     */
    public function get_most_important_datetime_for_event($EVT_ID)
    {
        $results = $this->get_datetimes_for_event_ordered_by_importance($EVT_ID, 1);
        if ($results) {
            return array_shift($results);
        } else {
            return null;
        }
    }



    /**
     * This returns a wpdb->results        Array of all DTT month and years matching the incoming query params and
     * grouped by month and year.
     *
     * @param  array  $where_params      Array of query_params as described in the comments for EEM_Base::get_all()
     * @param  string $evt_active_status A string representing the evt active status to filter the months by.
     *                                   Can be:
     *                                   - '' = no filter
     *                                   - upcoming = Published events with at least one upcoming datetime.
     *                                   - expired = Events with all datetimes expired.
     *                                   - active = Events that are published and have at least one datetime that
     *                                   starts before now and ends after now.
     *                                   - inactive = Events that are either not published.
     * @return EE_Base_Class[]
     * @throws \EE_Error
     */
    public function get_dtt_months_and_years($where_params, $evt_active_status = '')
    {
        $current_time_for_DTT_EVT_start = $this->current_time_for_query('DTT_EVT_start');
        $current_time_for_DTT_EVT_end = $this->current_time_for_query('DTT_EVT_end');
        switch ($evt_active_status) {
            case 'upcoming' :
                $where_params['Event.status'] = 'publish';
                //if there are already query_params matching DTT_EVT_start then we need to modify that to add them.
                if (isset($where_params['DTT_EVT_start'])) {
                    $where_params['DTT_EVT_start*****'] = $where_params['DTT_EVT_start'];
                }
                $where_params['DTT_EVT_start'] = array('>', $current_time_for_DTT_EVT_start);
                break;
            case 'expired' :
                if (isset($where_params['Event.status'])) {
                    unset($where_params['Event.status']);
                }
                //get events to exclude
                $exclude_query[0] = array_merge($where_params,
                    array('DTT_EVT_end' => array('>', $current_time_for_DTT_EVT_end)));
                //first get all events that have datetimes where its not expired.
                $event_ids = $this->_get_all_wpdb_results($exclude_query, OBJECT_K, 'Datetime.EVT_ID');
                $event_ids = array_keys($event_ids);
                if (isset($where_params['DTT_EVT_end'])) {
                    $where_params['DTT_EVT_end****'] = $where_params['DTT_EVT_end'];
                }
                $where_params['DTT_EVT_end'] = array('<', $current_time_for_DTT_EVT_end);
                $where_params['Event.EVT_ID'] = array('NOT IN', $event_ids);
                break;
            case 'active' :
                $where_params['Event.status'] = 'publish';
                if (isset($where_params['DTT_EVT_start'])) {
                    $where_params['Datetime.DTT_EVT_start******'] = $where_params['DTT_EVT_start'];
                }
                if (isset($where_params['Datetime.DTT_EVT_end'])) {
                    $where_params['Datetime.DTT_EVT_end*****'] = $where_params['DTT_EVT_end'];
                }
                $where_params['DTT_EVT_start'] = array('<', $current_time_for_DTT_EVT_start);
                $where_params['DTT_EVT_end'] = array('>', $current_time_for_DTT_EVT_end);
                break;
            case 'inactive' :
                if (isset($where_params['Event.status'])) {
                    unset($where_params['Event.status']);
                }
                if (isset($where_params['OR'])) {
                    $where_params['AND']['OR'] = $where_params['OR'];
                }
                if (isset($where_params['DTT_EVT_end'])) {
                    $where_params['AND']['DTT_EVT_end****'] = $where_params['DTT_EVT_end'];
                    unset($where_params['DTT_EVT_end']);
                }
                if (isset($where_params['DTT_EVT_start'])) {
                    $where_params['AND']['DTT_EVT_start'] = $where_params['DTT_EVT_start'];
                    unset($where_params['DTT_EVT_start']);
                }
                $where_params['AND']['Event.status'] = array('!=', 'publish');
                break;
        }
        $query_params[0] = $where_params;
        $query_params['group_by'] = array('dtt_year', 'dtt_month');
        $query_params['order_by'] = array('DTT_EVT_start' => 'DESC');
        $query_interval = EEH_DTT_Helper::get_sql_query_interval_for_offset($this->get_timezone(), 'DTT_EVT_start');
        $columns_to_select = array(
            'dtt_year'      => array('YEAR(' . $query_interval . ')', '%s'),
            'dtt_month'     => array('MONTHNAME(' . $query_interval . ')', '%s'),
            'dtt_month_num' => array('MONTH(' . $query_interval . ')', '%s'),
        );
        return $this->_get_all_wpdb_results($query_params, OBJECT, $columns_to_select);
    }



    /**
     * Updates the DTT_sold attribute on each datetime (based on the registrations
     * for the tickets for each datetime)
     *
     * @param EE_Base_Class[]|EE_Datetime[] $datetimes
     * @throws \EE_Error
     */
    public function update_sold($datetimes)
    {
        EE_Error::doing_it_wrong(
            __FUNCTION__,
            esc_html__(
                'Please use \EEM_Ticket::update_tickets_sold() instead which will in turn correctly update both the Ticket AND Datetime counts.',
                'event_espresso'
            ),
            '4.9.32.rc.005'
        );
        foreach ($datetimes as $datetime) {
            $datetime->update_sold();
        }
    }



    /**
     *    Gets the total number of tickets available at a particular datetime
     *    (does NOT take into account the datetime's spaces available)
     *
     * @param int   $DTT_ID
     * @param array $query_params
     * @return int of tickets available. If sold out, return less than 1. If infinite, returns EE_INF,  IF there are NO
     *             tickets attached to datetime then FALSE is returned.
     */
    public function sum_tickets_currently_available_at_datetime($DTT_ID, array $query_params = array())
    {
        $datetime = $this->get_one_by_ID($DTT_ID);
        if ($datetime instanceof EE_Datetime) {
            return $datetime->tickets_remaining($query_params);
        }
        return 0;
    }



    /**
     * This returns an array of counts of datetimes in the database for each Datetime status that can be queried.
     *
     * @param  array $stati_to_include If included you can restrict the statuses we return counts for by including the
     *                                 stati you want counts for as values in the array.  An empty array returns counts
     *                                 for all valid stati.
     * @param  array $query_params     If included can be used to refine the conditions for returning the count (i.e.
     *                                 only for Datetimes connected to a specific event, or specific ticket.
     * @return array  The value returned is an array indexed by Datetime Status and the values are the counts.  The
     * @throws \EE_Error
     *                                 stati used as index keys are: EE_Datetime::active EE_Datetime::upcoming EE_Datetime::expired
     */
    public function get_datetime_counts_by_status(array $stati_to_include = array(), array $query_params = array())
    {
        //only accept where conditions for this query.
        $_where = isset($query_params[0]) ? $query_params[0] : array();
        $status_query_args = array(
            EE_Datetime::active   => array_merge(
                $_where,
                array('DTT_EVT_start' => array('<', time()), 'DTT_EVT_end' => array('>', time()))
            ),
            EE_Datetime::upcoming => array_merge(
                $_where,
                array('DTT_EVT_start' => array('>', time()))
            ),
            EE_Datetime::expired  => array_merge(
                $_where,
                array('DTT_EVT_end' => array('<', time()))
            ),
        );
        if ( ! empty($stati_to_include)) {
            foreach (array_keys($status_query_args) as $status) {
                if ( ! in_array($status, $stati_to_include, true)) {
                    unset($status_query_args[$status]);
                }
            }
        }
        //loop through and query counts for each stati.
        $status_query_results = array();
        foreach ($status_query_args as $status => $status_where_conditions) {
            $status_query_results[$status] = EEM_Datetime::count(array($status_where_conditions), 'DTT_ID', true);
        }
        return $status_query_results;
    }



    /**
     * Returns the specific count for a given Datetime status matching any given query_params.
     *
     * @param string $status Valid string representation for Datetime status requested. (Defaults to Active).
     * @param array  $query_params
     * @return int
     * @throws \EE_Error
     */
    public function get_datetime_count_for_status($status = EE_Datetime::active, array $query_params = array())
    {
        $count = $this->get_datetime_counts_by_status(array($status), $query_params);
        return ! empty($count[$status]) ? $count[$status] : 0;
    }



}
// End of file EEM_Datetime.model.php
// Location: /includes/models/EEM_Datetime.model.php
