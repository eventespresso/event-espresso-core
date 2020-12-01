<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;

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
     * private constructor to prevent direct creation
     *
     * @param string $timezone A string representing the timezone we want to set for returned Date Time Strings
     *                         (and any incoming timezone data that gets saved).
     *                         Note this just sends the timezone info to the date time model field objects.
     *                         Default is NULL
     *                         (and will be assumed using the set timezone in the 'timezone_string' wp option)
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidArgumentException
     */
    protected function __construct($timezone)
    {
        $this->singular_item           = esc_html__('Datetime', 'event_espresso');
        $this->plural_item             = esc_html__('Datetimes', 'event_espresso');
        $this->_tables                 = [
            'Datetime' => new EE_Primary_Table('esp_datetime', 'DTT_ID'),
        ];
        $this->_fields                 = [
            'Datetime' => [
                'DTT_ID'          => new EE_Primary_Key_Int_Field(
                    'DTT_ID',
                    esc_html__('Datetime ID', 'event_espresso')
                ),
                'EVT_ID'          => new EE_Foreign_Key_Int_Field(
                    'EVT_ID',
                    esc_html__('Event ID', 'event_espresso'),
                    false,
                    0,
                    'Event'
                ),
                'DTT_name'        => new EE_Plain_Text_Field(
                    'DTT_name',
                    esc_html__('Datetime Name', 'event_espresso'),
                    false,
                    ''
                ),
                'DTT_description' => new EE_Post_Content_Field(
                    'DTT_description',
                    esc_html__('Description for Datetime', 'event_espresso'),
                    false,
                    ''
                ),
                'DTT_EVT_start'   => new EE_Datetime_Field(
                    'DTT_EVT_start',
                    esc_html__('Start time/date of Event', 'event_espresso'),
                    false,
                    EE_Datetime_Field::now,
                    $timezone
                ),
                'DTT_EVT_end'     => new EE_Datetime_Field(
                    'DTT_EVT_end',
                    esc_html__('End time/date of Event', 'event_espresso'),
                    false,
                    EE_Datetime_Field::now,
                    $timezone
                ),
                'DTT_reg_limit'   => new EE_Infinite_Integer_Field(
                    'DTT_reg_limit',
                    esc_html__('Registration Limit for this time', 'event_espresso'),
                    true,
                    EE_INF
                ),
                'DTT_sold'        => new EE_Integer_Field(
                    'DTT_sold',
                    esc_html__('How many sales for this Datetime that have occurred', 'event_espresso'),
                    true,
                    0
                ),
                'DTT_reserved'    => new EE_Integer_Field(
                    'DTT_reserved',
                    esc_html__('Quantity of tickets reserved, but not yet fully purchased', 'event_espresso'),
                    false,
                    0
                ),
                'DTT_is_primary'  => new EE_Boolean_Field(
                    'DTT_is_primary',
                    esc_html__('Flag indicating datetime is primary one for event', 'event_espresso'),
                    false,
                    false
                ),
                'DTT_order'       => new EE_Integer_Field(
                    'DTT_order',
                    esc_html__('The order in which the Datetime is displayed', 'event_espresso'),
                    false,
                    0
                ),
                'DTT_parent'      => new EE_Integer_Field(
                    'DTT_parent',
                    esc_html__('Indicates what DTT_ID is the parent of this DTT_ID', 'event_espresso'),
                    true,
                    0
                ),
                'DTT_deleted'     => new EE_Trashed_Flag_Field(
                    'DTT_deleted',
                    esc_html__('Flag indicating datetime is archived', 'event_espresso'),
                    false,
                    false
                ),
            ],
        ];
        $this->_model_relations        = [
            'Ticket'          => new EE_HABTM_Relation('Datetime_Ticket'),
            'Event'           => new EE_Belongs_To_Relation(),
            'Checkin'         => new EE_Has_Many_Relation(),
            'Datetime_Ticket' => new EE_Has_Many_Relation(),
        ];
        $path_to_event_model           = 'Event';
        $this->model_chain_to_password = $path_to_event_model;
        $this->_model_chain_to_wp_user = $path_to_event_model;
        // this model is generally available for reading
        $this->_cap_restriction_generators[ EEM_Base::caps_read ]       =
            new EE_Restriction_Generator_Event_Related_Public(
                $path_to_event_model
            );
        $this->_cap_restriction_generators[ EEM_Base::caps_read_admin ] =
            new EE_Restriction_Generator_Event_Related_Protected(
                $path_to_event_model
            );
        $this->_cap_restriction_generators[ EEM_Base::caps_edit ]       =
            new EE_Restriction_Generator_Event_Related_Protected(
                $path_to_event_model
            );
        $this->_cap_restriction_generators[ EEM_Base::caps_delete ]     =
            new EE_Restriction_Generator_Event_Related_Protected(
                $path_to_event_model,
                EEM_Base::caps_edit
            );
        parent::__construct($timezone);
    }


    /**
     * create new blank datetime
     *
     * @access public
     * @return EE_Datetime[] array on success, FALSE on fail
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws ReflectionException
     * @throws InvalidInterfaceException
     */
    public function create_new_blank_datetime()
    {
        // makes sure timezone is always set.
        $timezone_string = $this->get_timezone();
        /**
         * Filters the initial start date for the new datetime.
         * Any time included in this value will be overridden later so use additional filters to modify the time.
         *
         * @param int $start_date Unixtimestamp representing now + 30 days in seconds.
         * @return int unixtimestamp
         */
        $start_date = apply_filters(
            'FHEE__EEM_Datetime__create_new_blank_datetime__start_date',
            $this->current_time_for_query('DTT_EVT_start', true) + MONTH_IN_SECONDS
        );
        /**
         * Filters the initial end date for the new datetime.
         * Any time included in this value will be overridden later so use additional filters to modify the time.
         *
         * @param int $end_data Unixtimestamp representing now + 30 days in seconds.
         * @return int unixtimestamp
         */
        $end_date       = apply_filters(
            'FHEE__EEM_Datetime__create_new_blank_datetime__end_date',
            $this->current_time_for_query('DTT_EVT_end', true) + MONTH_IN_SECONDS
        );
        $blank_datetime = EE_Datetime::new_instance(
            [
                'DTT_EVT_start' => $start_date,
                'DTT_EVT_end'   => $end_date,
                'DTT_order'     => 1,
                'DTT_reg_limit' => EE_INF,
            ],
            $timezone_string
        );
        /**
         * Filters the initial start time and format for the new EE_Datetime instance.
         *
         * @param array $start_time An array having size 2.  First element is the time, second element is the time
         *                          format.
         * @return array
         */
        $start_time = apply_filters(
            'FHEE__EEM_Datetime__create_new_blank_datetime__start_time',
            ['8am', 'ga']
        );
        /**
         * Filters the initial end time and format for the new EE_Datetime instance.
         *
         * @param array $end_time An array having size 2.  First element is the time, second element is the time
         *                        format
         * @return array
         */
        $end_time = apply_filters(
            'FHEE__EEM_Datetime__create_new_blank_datetime__end_time',
            ['5pm', 'ga']
        );
        $this->validateStartAndEndTimeForBlankDate($start_time, $end_time);
        $blank_datetime->set_start_time(
            $this->convert_datetime_for_query(
                'DTT_EVT_start',
                $start_time[0],
                $start_time[1],
                $timezone_string
            )
        );
        $blank_datetime->set_end_time(
            $this->convert_datetime_for_query(
                'DTT_EVT_end',
                $end_time[0],
                $end_time[1],
                $timezone_string
            )
        );
        return [$blank_datetime];
    }


    /**
     * Validates whether the start_time and end_time are in the expected format.
     *
     * @param array $start_time
     * @param array $end_time
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     */
    private function validateStartAndEndTimeForBlankDate(array $start_time, array $end_time)
    {
        if (! is_array($start_time)) {
            throw new InvalidDataTypeException('start_time', $start_time, 'array');
        }
        if (! is_array($end_time)) {
            throw new InvalidDataTypeException('end_time', $end_time, 'array');
        }
        if (count($start_time) !== 2) {
            throw new InvalidArgumentException(
                sprintf(
                    'The variable %1$s is expected to be an array with two elements.  The first item in the '
                    . 'array should be a valid time string, the second item in the array should be a valid time format',
                    '$start_time'
                )
            );
        }
        if (count($end_time) !== 2) {
            throw new InvalidArgumentException(
                sprintf(
                    'The variable %1$s is expected to be an array with two elements.  The first item in the '
                    . 'array should be a valid time string, the second item in the array should be a valid time format',
                    '$end_time'
                )
            );
        }
    }


    /**
     * get event start date from db
     *
     * @access public
     * @param int $EVT_ID
     * @return EE_Datetime[] array on success, FALSE on fail
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_all_event_dates($EVT_ID = 0)
    {
        if (! $EVT_ID) { // on add_new_event event_id gets set to 0
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
     * @param int     $EVT_ID     event id
     * @param boolean $include_expired
     * @param boolean $include_deleted
     * @param int     $limit      If included then limit the count of results by
     *                            the given number
     * @return EE_Datetime[]
     * @throws EE_Error
     */
    public function get_datetimes_for_event_ordered_by_DTT_order(
        $EVT_ID,
        $include_expired = true,
        $include_deleted = true,
        $limit = null
    ) {
        $prev_data_prep_value = $this->prepModelForQuery();
        $where_params         = ['Event.EVT_ID' => absint($EVT_ID)];
        $query_params[0]      = $this->addDefaultWhereParams($where_params, $include_deleted, $include_expired);
        $query_params         = $this->addDefaultWhereConditions($query_params);
        $query_params         = $this->addDefaultQueryParams($query_params, $limit, 'DTT_order');
        return $this->getDatetimesAndRestoreModel($query_params, $prev_data_prep_value);
    }


    /**
     * Gets the datetimes for the event (with the given limit), and orders them by "importance".
     * By importance, we mean that the primary datetimes are most important (DEPRECATED FOR NOW),
     * and then the earlier datetimes are the most important.
     * Maybe we'll want this to take into account datetimes that haven't already passed, but we don't yet.
     *
     * @param int $EVT_ID
     * @param int $limit
     * @return EE_Datetime[]|EE_Base_Class[]
     * @throws EE_Error
     */
    public function get_datetimes_for_event_ordered_by_importance($EVT_ID = 0, $limit = 0)
    {
        $query_params[0] = ['Event.EVT_ID' => absint($EVT_ID)];
        $query_params    = $this->addDefaultWhereConditions($query_params);
        $query_params    = $this->addDefaultQueryParams($query_params, $limit);
        return $this->get_all($query_params);
    }


    /**
     * @param int     $EVT_ID
     * @param boolean $include_expired
     * @param boolean $include_deleted
     * @return EE_Datetime
     * @throws EE_Error
     */
    public function get_oldest_datetime_for_event($EVT_ID, $include_expired = false, $include_deleted = false)
    {
        $results = $this->get_datetimes_for_event_ordered_by_start_time(
            $EVT_ID,
            $include_expired,
            $include_deleted,
            1
        );
        if ($results) {
            return array_shift($results);
        }
        return null;
    }


    /**
     * Gets the 'primary' datetime for an event.
     *
     * @param int  $EVT_ID
     * @param bool $try_to_exclude_expired
     * @param bool $try_to_exclude_deleted
     * @return \EE_Datetime
     * @throws EE_Error
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
     * @throws EE_Error
     */
    public function get_datetimes_for_event_ordered_by_start_time(
        $EVT_ID,
        $include_expired = true,
        $include_deleted = true,
        $limit = null
    ) {
        $prev_data_prep_value = $this->prepModelForQuery();
        $where_params         = ['Event.EVT_ID' => absint($EVT_ID)];
        $query_params[0]      = $this->addDefaultWhereParams($where_params, $include_deleted, $include_expired);
        $query_params         = $this->addDefaultWhereConditions(
            $query_params,
            EEM_Base::default_where_conditions_this_only
        );
        $query_params         = $this->addDefaultQueryParams($query_params, $limit, 'DTT_order');
        return $this->getDatetimesAndRestoreModel($query_params, $prev_data_prep_value);
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
     * @throws EE_Error
     */
    public function get_datetimes_for_ticket_ordered_by_start_time(
        $TKT_ID,
        $include_expired = true,
        $include_deleted = true,
        $limit = null
    ) {
        $prev_data_prep_value = $this->prepModelForQuery();
        $where_params         = ['Ticket.TKT_ID' => absint($TKT_ID)];
        $query_params[0]      = $this->addDefaultWhereParams($where_params, $include_deleted, $include_expired);
        $query_params         = $this->addDefaultQueryParams($query_params, $limit);
        return $this->getDatetimesAndRestoreModel($query_params, $prev_data_prep_value);
    }


    /**
     * Gets all the datetimes for a ticket (including trashed ones, for now), ordered by the DTT_order for the
     * datetimes.
     *
     * @param int      $TKT_ID           ID of ticket to retrieve the datetimes for
     * @param boolean  $include_expired  whether to include expired datetimes or not
     * @param boolean  $include_deleted  whether to include trashed datetimes or not.
     * @param int|null $limit            if null, no limit, if int then limit results by
     *                                   that number
     * @return EE_Datetime[]
     * @throws EE_Error
     */
    public function get_datetimes_for_ticket_ordered_by_DTT_order(
        $TKT_ID,
        $include_expired = true,
        $include_deleted = true,
        $limit = null
    ) {
        $prev_data_prep_value = $this->prepModelForQuery();
        $where_params         = ['Ticket.TKT_ID' => absint($TKT_ID)];
        $query_params[0]      = $this->addDefaultWhereParams($where_params, $include_deleted, $include_expired);
        $query_params         = $this->addDefaultQueryParams($query_params, $limit, 'DTT_order');
        return $this->getDatetimesAndRestoreModel($query_params, $prev_data_prep_value);
    }


    /**
     * Gets the most important datetime for a particular event (ie, the primary event usually. But if for some WACK
     * reason it doesn't exist, we consider the earliest event the most important)
     *
     * @param int $EVT_ID
     * @return EE_Datetime
     * @throws EE_Error
     */
    public function get_most_important_datetime_for_event($EVT_ID)
    {
        $results = $this->get_datetimes_for_event_ordered_by_importance($EVT_ID, 1);
        if ($results) {
            return array_shift($results);
        }
        return null;
    }


    /**
     * This returns a wpdb->results        Array of all DTT month and years matching the incoming query params and
     * grouped by month and year.
     *
     * @param array  $where_params       @see
     *                                   https://github.com/eventespresso/event-espresso-core/tree/master/docs/G--Model-System/model-query-params.md#0-where-conditions
     * @param string $evt_active_status  A string representing the evt active status to filter the months by.
     *                                   Can be:
     *                                   - '' = no filter
     *                                   - upcoming = Published events with at least one upcoming datetime.
     *                                   - expired = Events with all datetimes expired.
     *                                   - active = Events that are published and have at least one datetime that
     *                                   starts before now and ends after now.
     *                                   - inactive = Events that are either not published.
     * @return EE_Base_Class[]
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidArgumentException
     */
    public function get_dtt_months_and_years(array $where_params, $evt_active_status = '')
    {
        $current_time_for_DTT_EVT_start = $this->current_time_for_query('DTT_EVT_start');
        $current_time_for_DTT_EVT_end   = $this->current_time_for_query('DTT_EVT_end');
        switch ($evt_active_status) {
            case 'upcoming':
                $where_params['Event.status'] = 'publish';
                // if there are already query_params matching DTT_EVT_start then we need to modify that to add them.
                if (isset($where_params['DTT_EVT_start'])) {
                    $where_params['DTT_EVT_start*****'] = $where_params['DTT_EVT_start'];
                }
                $where_params['DTT_EVT_start'] = ['>', $current_time_for_DTT_EVT_start];
                break;
            case 'expired':
                if (isset($where_params['Event.status'])) {
                    unset($where_params['Event.status']);
                }
                // get events to exclude
                $exclude_query[0] = array_merge(
                    $where_params,
                    ['DTT_EVT_end' => ['>', $current_time_for_DTT_EVT_end]]
                );
                // first get all events that have datetimes where its not expired.
                $event_ids = $this->_get_all_wpdb_results(
                    $exclude_query,
                    OBJECT_K,
                    'Datetime.EVT_ID'
                );
                $event_ids = array_keys($event_ids);
                if (isset($where_params['DTT_EVT_end'])) {
                    $where_params['DTT_EVT_end****'] = $where_params['DTT_EVT_end'];
                }
                $where_params['DTT_EVT_end']  = ['<', $current_time_for_DTT_EVT_end];
                $where_params['Event.EVT_ID'] = ['NOT IN', $event_ids];
                break;
            case 'active':
                $where_params['Event.status'] = 'publish';
                if (isset($where_params['DTT_EVT_start'])) {
                    $where_params['Datetime.DTT_EVT_start******'] = $where_params['DTT_EVT_start'];
                }
                if (isset($where_params['Datetime.DTT_EVT_end'])) {
                    $where_params['Datetime.DTT_EVT_end*****'] = $where_params['DTT_EVT_end'];
                }
                $where_params['DTT_EVT_start'] = ['<', $current_time_for_DTT_EVT_start];
                $where_params['DTT_EVT_end']   = ['>', $current_time_for_DTT_EVT_end];
                break;
            case 'inactive':
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
                $where_params['AND']['Event.status'] = ['!=', 'publish'];
                break;
        }
        $query_params[0]          = $where_params;
        $query_params['group_by'] = ['dtt_year', 'dtt_month'];
        $query_params             = $this->addOrderByQueryParams($query_params, 'DTT_EVT_start', 'DESC');

        $query_interval    = EEH_DTT_Helper::get_sql_query_interval_for_offset(
            $this->get_timezone(),
            'DTT_EVT_start'
        );
        $columns_to_select = [
            'dtt_year'      => ['YEAR(' . $query_interval . ')', '%s'],
            'dtt_month'     => ['MONTHNAME(' . $query_interval . ')', '%s'],
            'dtt_month_num' => ['MONTH(' . $query_interval . ')', '%s'],
        ];
        return $this->_get_all_wpdb_results($query_params, OBJECT, $columns_to_select);
    }


    /**
     * Updates the DTT_sold attribute on each datetime (based on the registrations
     * for the tickets for each datetime)
     *
     * @param EE_Base_Class[]|EE_Datetime[] $datetimes
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function update_sold(array $datetimes)
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
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function sum_tickets_currently_available_at_datetime($DTT_ID, array $query_params = [])
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
     * @param array $stati_to_include  If included you can restrict the statuses we return counts for by including the
     *                                 stati you want counts for as values in the array.  An empty array returns counts
     *                                 for all valid stati.
     * @param array $query_params      If included can be used to refine the conditions for returning the count (i.e.
     *                                 only for Datetimes connected to a specific event, or specific ticket.
     * @return array  The value returned is an array indexed by Datetime Status and the values are the counts.  The
     * @throws EE_Error
     *                                 stati used as index keys are: EE_Datetime::active EE_Datetime::upcoming
     *                                 EE_Datetime::expired
     */
    public function get_datetime_counts_by_status(array $stati_to_include = [], array $query_params = [])
    {
        // only accept where conditions for this query.
        $_where            = isset($query_params[0]) ? $query_params[0] : [];
        $status_query_args = [
            EE_Datetime::active   => array_merge(
                $_where,
                ['DTT_EVT_start' => ['<', time()], 'DTT_EVT_end' => ['>', time()]]
            ),
            EE_Datetime::upcoming => array_merge(
                $_where,
                ['DTT_EVT_start' => ['>', time()]]
            ),
            EE_Datetime::expired  => array_merge(
                $_where,
                ['DTT_EVT_end' => ['<', time()]]
            ),
        ];
        if (! empty($stati_to_include)) {
            foreach (array_keys($status_query_args) as $status) {
                if (! in_array($status, $stati_to_include, true)) {
                    unset($status_query_args[ $status ]);
                }
            }
        }
        // loop through and query counts for each stati.
        $status_query_results = [];
        foreach ($status_query_args as $status => $status_where_conditions) {
            $status_query_results[ $status ] = EEM_Datetime::count(
                [$status_where_conditions],
                'DTT_ID',
                true
            );
        }
        return $status_query_results;
    }


    /**
     * Returns the specific count for a given Datetime status matching any given query_params.
     *
     * @param string $status Valid string representation for Datetime status requested. (Defaults to Active).
     * @param array  $query_params
     * @return int
     * @throws EE_Error
     */
    public function get_datetime_count_for_status($status = EE_Datetime::active, array $query_params = [])
    {
        $count = $this->get_datetime_counts_by_status([$status], $query_params);
        return ! empty($count[ $status ]) ? $count[ $status ] : 0;
    }


    /**
     * @return bool|int
     * @since   $VID:$
     */
    private function prepModelForQuery()
    {
        $prev_data_prep_value = $this->get_assumption_concerning_values_already_prepared_by_model_object();
        $this->assume_values_already_prepared_by_model_object(EEM_Base::prepared_for_use_in_db);
        return $prev_data_prep_value;
    }


    /**
     * @param array    $query_params
     * @param bool|int $prev_data_prep_value
     * @return EE_Base_Class[]|EE_Datetime[]
     * @throws EE_Error
     * @since   $VID:$
     */
    private function getDatetimesAndRestoreModel(array $query_params, $prev_data_prep_value)
    {
        $result = $this->get_all($query_params);
        $this->assume_values_already_prepared_by_model_object($prev_data_prep_value);
        return $result;
    }


    /**
     * @param array  $query_params
     * @param int    $limit
     * @param string $order_by
     * @param string $order
     * @return array
     * @since   $VID:$
     */
    private function addDefaultQueryParams(array $query_params, $limit = 0, $order_by = 'DTT_EVT_start', $order = 'ASC')
    {
        $query_params = $this->addOrderByQueryParams($query_params, $order_by, $order);
        $query_params = $this->addLimitQueryParams($query_params, $limit);
        return $query_params;
    }


    /**
     * @param array  $query_params
     * @param string $default_where_conditions
     * @return array
     * @since   $VID:$
     */
    private function addDefaultWhereConditions(
        array $query_params,
        $default_where_conditions = EEM_Base::default_where_conditions_none
    ) {
        $query_params['default_where_conditions'] = $default_where_conditions;
        return $query_params;
    }


    /**
     * @param array $where_params
     * @param bool  $include_deleted
     * @param bool  $include_expired
     * @return array
     * @since   $VID:$
     */
    private function addDefaultWhereParams(array $where_params, $include_deleted = true, $include_expired = true)
    {
        $where_params = $this->addExpiredWhereParams($where_params, $include_expired);
        $where_params = $this->addDeletedWhereParams($where_params, $include_deleted);
        return $where_params;
    }


    /**
     * @param array $where_params
     * @param bool  $include_deleted
     * @return array
     * @since   $VID:$
     */
    private function addDeletedWhereParams(array $where_params, $include_deleted = true)
    {
        $deleted                     = $include_deleted ? [true, false] : [false];
        $where_params['DTT_deleted'] = ['IN', $deleted];
        return $where_params;
    }


    /**
     * @param array $where_params
     * @param bool  $include_expired
     * @return array
     * @since   $VID:$
     */
    private function addExpiredWhereParams(array $where_params, $include_expired = true)
    {
        if (! $include_expired) {
            $where_params['DTT_EVT_end'] = ['>=', current_time('mysql', true)];
        }
        return $where_params;
    }


    /**
     * @param array $query_params
     * @param int   $limit
     * @return array
     * @since   $VID:$
     */
    private function addLimitQueryParams(array $query_params, $limit = 0)
    {
        if ($limit) {
            $query_params['limit'] = $limit;
        }
        return $query_params;
    }


    /**
     * @param array  $query_params
     * @param string $order_by
     * @param string $order
     * @return array
     * @since   $VID:$
     */
    private function addOrderByQueryParams(array $query_params, $order_by = 'DTT_EVT_start', $order = 'ASC')
    {
        $order                    = $order === 'ASC' ? 'ASC' : 'DESC';
        $valid_order_columns      = ['DTT_ID', 'DTT_EVT_start', 'DTT_EVT_end', 'DTT_order'];
        $order_by                 = in_array($order_by, $valid_order_columns) ? $order_by : 'DTT_EVT_start';
        $query_params['order_by'] = [$order_by => $order];
        return $query_params;
    }
}
