<?php

use EventEspresso\core\exceptions\InvalidStatusException;
use EventEspresso\core\services\database\TableAnalysis;

/**
 * Registration Model
 *
 * @package    Event Espresso
 * @subpackage includes/models/
 * @author     Mike Nelson, Brent Christensen
 */
class EEM_Registration extends EEM_Soft_Delete_Base
{

    /**
     * @var EEM_Registration
     */
    protected static $_instance;

    /**
     * Keys are the status IDs for registrations (eg, RAP, RCN, etc), and the values
     * are status codes (eg, approved, cancelled, etc)
     *
     * @var array
     */
    private static $_reg_status;

    /**
     * The value of REG_count for a primary registrant
     */
    const PRIMARY_REGISTRANT_COUNT = 1;

    /**
     * Status ID (STS_ID on esp_status table) to indicate an INCOMPLETE registration.
     * Initial status for registrations when they are first created
     * Payments are NOT allowed.
     * Automatically toggled to whatever the default Event registration status is upon completion of the attendee
     * information reg step NO space reserved. Registration is NOT active
     */
    const status_id_incomplete = 'RIC';

    /**
     * Status ID (STS_ID on esp_status table) to indicate an UNAPPROVED registration.
     * Payments are NOT allowed.
     * Event Admin must manually toggle STS_ID for it to change
     * No space reserved.
     * Registration is active
     */
    const status_id_not_approved = 'RNA';

    /**
     * Status ID (STS_ID on esp_status table) to indicate registration is PENDING_PAYMENT .
     * Payments are allowed.
     * STS_ID will automatically be toggled to RAP if payment is made in full by the attendee
     * No space reserved.
     * Registration is active
     */
    const status_id_pending_payment = 'RPP';

    /**
     * Status ID (STS_ID on esp_status table) to indicate registration is on the WAIT_LIST .
     * Payments are allowed.
     * STS_ID will automatically be toggled to RAP if payment is made in full by the attendee
     * No space reserved.
     * Registration is active
     */
    const status_id_wait_list = 'RWL';

    /**
     * Status ID (STS_ID on esp_status table) to indicate an APPROVED registration.
     * the TXN may or may not be completed ( paid in full )
     * Payments are allowed.
     * A space IS reserved.
     * Registration is active
     */
    const status_id_approved = 'RAP';

    /**
     * Status ID (STS_ID on esp_status table) to indicate a registration was CANCELLED by the attendee.
     * Payments are NOT allowed.
     * NO space reserved.
     * Registration is NOT active
     */
    const status_id_cancelled = 'RCN';

    /**
     * Status ID (STS_ID on esp_status table) to indicate a registration was DECLINED by the Event Admin
     * Payments are NOT allowed.
     * No space reserved.
     * Registration is NOT active
     */
    const status_id_declined = 'RDC';

    /**
     * @var TableAnalysis $table_analysis
     */
    protected $_table_analysis;


    /**
     * private constructor to prevent direct creation
     *
     * @param string $timezone string representing the timezone we want to set for returned Date Time Strings (and any
     *                         incoming timezone data that gets saved). Note this just sends the timezone info to the
     *                         date time model field objects.  Default is NULL (and will be assumed using the set
     *                         timezone in the 'timezone_string' wp option)
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function __construct(string $timezone = '')
    {
        $this->_table_analysis         = EE_Registry::instance()->create('TableAnalysis', [], true);
        $this->singular_item           = esc_html__('Registration', 'event_espresso');
        $this->plural_item             = esc_html__('Registrations', 'event_espresso');
        $this->_tables                 = [
            'Registration' => new EE_Primary_Table('esp_registration', 'REG_ID'),
        ];
        $this->_fields                 = [
            'Registration' => [
                'REG_ID'           => new EE_Primary_Key_Int_Field(
                    'REG_ID',
                    esc_html__('Registration ID', 'event_espresso')
                ),
                'EVT_ID'           => new EE_Foreign_Key_Int_Field(
                    'EVT_ID',
                    esc_html__('Event ID', 'event_espresso'),
                    false,
                    0,
                    'Event'
                ),
                'ATT_ID'           => new EE_Foreign_Key_Int_Field(
                    'ATT_ID',
                    esc_html__('Attendee ID', 'event_espresso'),
                    false,
                    0,
                    'Attendee'
                ),
                'TXN_ID'           => new EE_Foreign_Key_Int_Field(
                    'TXN_ID',
                    esc_html__('Transaction ID', 'event_espresso'),
                    false,
                    0,
                    'Transaction'
                ),
                'TKT_ID'           => new EE_Foreign_Key_Int_Field(
                    'TKT_ID',
                    esc_html__('Ticket ID', 'event_espresso'),
                    false,
                    0,
                    'Ticket'
                ),
                'STS_ID'           => new EE_Foreign_Key_String_Field(
                    'STS_ID',
                    esc_html__('Status ID', 'event_espresso'),
                    false,
                    EEM_Registration::status_id_incomplete,
                    'Status'
                ),
                'REG_date'         => new EE_Datetime_Field(
                    'REG_date',
                    esc_html__('Time registration occurred', 'event_espresso'),
                    false,
                    EE_Datetime_Field::now,
                    $timezone
                ),
                'REG_final_price'  => new EE_Money_Field(
                    'REG_final_price',
                    esc_html__('Registration\'s share of the transaction total', 'event_espresso'),
                    false,
                    0
                ),
                'REG_paid'         => new EE_Money_Field(
                    'REG_paid',
                    esc_html__('Amount paid to date towards registration', 'event_espresso'),
                    false,
                    0
                ),
                'REG_session'      => new EE_Plain_Text_Field(
                    'REG_session',
                    esc_html__('Session ID of registration', 'event_espresso'),
                    false,
                    ''
                ),
                'REG_code'         => new EE_Plain_Text_Field(
                    'REG_code',
                    esc_html__('Unique Code for this registration', 'event_espresso'),
                    false,
                    ''
                ),
                'REG_url_link'     => new EE_Plain_Text_Field(
                    'REG_url_link',
                    esc_html__('String to be used in URL for identifying registration', 'event_espresso'),
                    false,
                    ''
                ),
                'REG_count'        => new EE_Integer_Field(
                    'REG_count',
                    esc_html__('Count of this registration in the group registration ', 'event_espresso'),
                    true,
                    1
                ),
                'REG_group_size'   => new EE_Integer_Field(
                    'REG_group_size',
                    esc_html__('Number of registrations on this group', 'event_espresso'),
                    false,
                    1
                ),
                'REG_att_is_going' => new EE_Boolean_Field(
                    'REG_att_is_going',
                    esc_html__('Flag indicating the registrant plans on attending', 'event_espresso'),
                    false,
                    false
                ),
                'REG_deleted'      => new EE_Trashed_Flag_Field(
                    'REG_deleted',
                    esc_html__('Flag indicating if registration has been archived or not.', 'event_espresso'),
                    false,
                    false
                ),
            ],
        ];
        $this->_model_relations        = [
            'Event'                => new EE_Belongs_To_Relation(),
            'Attendee'             => new EE_Belongs_To_Relation(),
            'Transaction'          => new EE_Belongs_To_Relation(),
            'Ticket'               => new EE_Belongs_To_Relation(),
            'Status'               => new EE_Belongs_To_Relation(),
            'Answer'               => new EE_Has_Many_Relation(),
            'Checkin'              => new EE_Has_Many_Relation(),
            'Registration_Payment' => new EE_Has_Many_Relation(),
            'Payment'              => new EE_HABTM_Relation('Registration_Payment'),
            'Message'              => new EE_Has_Many_Any_Relation(false)
            // allow deletes even if there are messages in the queue related
        ];
        $this->_model_chain_to_wp_user = 'Event';
        parent::__construct($timezone);
    }


    /**
     * a list of ALL valid registration statuses currently in use within the system
     * generated by combining the filterable active and inactive reg status arrays
     *
     * @return array
     */
    public static function reg_statuses(): array
    {
        return array_unique(
            array_merge(
                EEM_Registration::active_reg_statuses(),
                EEM_Registration::inactive_reg_statuses()
            )
        );
    }


    /**
     * reg_statuses_that_allow_payment
     * a filterable list of registration statuses that allow a registrant to make a payment
     *
     * @return array
     */
    public static function reg_statuses_that_allow_payment(): array
    {
        return apply_filters(
            'FHEE__EEM_Registration__reg_statuses_that_allow_payment',
            [
                EEM_Registration::status_id_approved,
                EEM_Registration::status_id_pending_payment,
            ]
        );
    }


    /**
     * active_reg_statuses
     * a filterable list of registration statuses that are considered active
     *
     * @return array
     */
    public static function active_reg_statuses(): array
    {
        return apply_filters(
            'FHEE__EEM_Registration__active_reg_statuses',
            [
                EEM_Registration::status_id_approved,
                EEM_Registration::status_id_pending_payment,
                EEM_Registration::status_id_wait_list,
                EEM_Registration::status_id_not_approved,
            ]
        );
    }


    /**
     * inactive_reg_statuses
     * a filterable list of registration statuses that are not considered active
     *
     * @return array
     */
    public static function inactive_reg_statuses(): array
    {
        return apply_filters(
            'FHEE__EEM_Registration__inactive_reg_statuses',
            [
                EEM_Registration::status_id_incomplete,
                EEM_Registration::status_id_cancelled,
                EEM_Registration::status_id_declined,
            ]
        );
    }


    /**
     * closed_reg_statuses
     * a filterable list of registration statuses that are considered "closed"
     * meaning they should not be considered in any calculations involving monies owing
     *
     * @return array
     */
    public static function closed_reg_statuses(): array
    {
        return apply_filters(
            'FHEE__EEM_Registration__closed_reg_statuses',
            [
                EEM_Registration::status_id_cancelled,
                EEM_Registration::status_id_declined,
                EEM_Registration::status_id_wait_list,
            ]
        );
    }


    /**
     * get list of registration statuses
     *
     * @param array $exclude    The status ids to exclude from the returned results
     * @param bool  $translated If true will return the values as singular localized strings
     * @return array
     * @throws EE_Error
     */
    public static function reg_status_array(array $exclude = [], bool $translated = false): array
    {
        EEM_Registration::instance()->_get_registration_status_array($exclude);
        return $translated
            ? EEM_Status::instance()->localized_status(self::$_reg_status, false, 'sentence')
            : self::$_reg_status;
    }


    /**
     * get list of registration statuses
     *
     * @access private
     * @param array $exclude
     * @return void
     * @throws EE_Error
     */
    private function _get_registration_status_array(array $exclude = [])
    {
        // in the very rare circumstance that we are deleting a model's table's data
        // and the table hasn't actually been created, this could have an error
        global $wpdb;
        if ($this->_get_table_analysis()->tableExists($wpdb->prefix . 'esp_status')) {
            $results           = $wpdb->get_results(
                "SELECT STS_ID, STS_code FROM {$wpdb->prefix}esp_status WHERE STS_type = 'registration'"
            );
            self::$_reg_status = [];
            foreach ($results as $status) {
                if (! in_array($status->STS_ID, $exclude, true)) {
                    self::$_reg_status[ $status->STS_ID ] = $status->STS_code;
                }
            }
        }
    }


    /**
     * Gets the injected table analyzer, or throws an exception
     *
     * @return TableAnalysis
     * @throws EE_Error
     */
    protected function _get_table_analysis(): TableAnalysis
    {
        if ($this->_table_analysis instanceof TableAnalysis) {
            return $this->_table_analysis;
        }
        throw new EE_Error(
            sprintf(
                esc_html__('Table analysis class on class %1$s is not set properly.', 'event_espresso'),
                get_class($this)
            )
        );
    }


    /**
     * This returns a wpdb->results array of all registration date month and years matching the incoming query params
     * and grouped by month and year.
     *
     * @param array $where_params @see
     *                            https://github.com/eventespresso/event-espresso-core/tree/master/docs/G--Model-System/model-query-params.md#0-where-conditions
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_reg_months_and_years(array $where_params): array
    {
        $query_params[0]          = $where_params;
        $query_params['group_by'] = ['reg_year', 'reg_month'];
        $query_params['order_by'] = ['REG_date' => 'DESC'];
        $columns_to_select        = [
            'reg_year'  => ['YEAR(REG_date)', '%s'],
            'reg_month' => ['MONTHNAME(REG_date)', '%s'],
        ];
        return $this->_get_all_wpdb_results($query_params, OBJECT, $columns_to_select);
    }


    /**
     * retrieve ALL registrations for a particular Attendee from db
     *
     * @param int $ATT_ID
     * @return EE_Registration[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_all_registrations_for_attendee(int $ATT_ID = 0): array
    {
        if (! $ATT_ID) {
            return [];
        }
        return $this->get_all([['ATT_ID' => $ATT_ID]]);
    }


    /**
     * Gets a registration given their REG_url_link. Yes, this should usually
     * be passed via a GET parameter.
     *
     * @param string $REG_url_link
     * @return EE_Registration|null
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_registration_for_reg_url_link(string $REG_url_link): ?EE_Registration
    {
        if (! $REG_url_link) {
            return null;
        }
        return $this->get_one([['REG_url_link' => $REG_url_link]]);
    }


    /**
     * retrieve registration for a specific transaction attendee from db
     *
     * @param int $TXN_ID
     * @param int $ATT_ID
     * @param int $att_nmbr in case the ATT_ID is the same for multiple registrations (same details used) then the
     *                      attendee number is required
     * @return EE_Registration|null
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_registration_for_transaction_attendee(
        int $TXN_ID = 0,
        int $ATT_ID = 0,
        int $att_nmbr = 0
    ): ?EE_Registration {
        return $this->get_one(
            [
                [
                    'TXN_ID' => $TXN_ID,
                    'ATT_ID' => $ATT_ID,
                ],
                'limit' => [min($att_nmbr - 1, 0), 1],
            ]
        );
    }


    /**
     * get the number of registrations per day  for the Registration Admin page Reports Tab.
     * (doesn't utilize models because it's a fairly specialized query)
     *
     * @param $period string which can be passed to php's strtotime function (eg "-1 month")
     * @return stdClass[] with properties regDate and total
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_registrations_per_day_report(string $period = '-1 month'): array
    {
        $sql_date = $this->convert_datetime_for_query(
            'REG_date',
            date('Y-m-d H:i:s', strtotime($period)),
            'Y-m-d H:i:s',
            'UTC'
        );
        $where    = [
            'REG_date' => ['>=', $sql_date],
            'STS_ID'   => ['!=', EEM_Registration::status_id_incomplete],
        ];
        if (! EE_Registry::instance()->CAP->current_user_can('ee_read_others_registrations', 'reg_per_day_report')) {
            $where['Event.EVT_wp_user'] = get_current_user_id();
        }
        $query_interval = EEH_DTT_Helper::get_sql_query_interval_for_offset($this->get_timezone(), 'REG_date');
        return $this->_get_all_wpdb_results(
            [
                $where,
                'group_by' => 'regDate',
                'order_by' => ['REG_date' => 'ASC'],
            ],
            OBJECT,
            [
                'regDate' => ['DATE(' . $query_interval . ')', '%s'],
                'total'   => ['count(REG_ID)', '%d'],
            ]
        );
    }


    /**
     * Get the number of registrations per day including the count of registrations for each Registration Status.
     * Note: EEM_Registration::status_id_incomplete registrations are excluded from the results.
     *
     * @param string $period
     * @return stdClass[] with properties Registration_REG_date and a column for each registration status as the STS_ID
     * @throws EE_Error
     * (i.e. RAP)
     */
    public function get_registrations_per_day_and_per_status_report(string $period = '-1 month'): array
    {
        global $wpdb;
        $registration_table = $wpdb->prefix . 'esp_registration';
        $event_table        = $wpdb->posts;
        $sql_date           = date('Y-m-d H:i:s', strtotime($period));
        // prepare the query interval for displaying offset
        $query_interval = EEH_DTT_Helper::get_sql_query_interval_for_offset($this->get_timezone(), 'dates.REG_date');
        // inner date query
        $inner_date_query = "SELECT DISTINCT REG_date from {$registration_table} ";
        $inner_where      = ' WHERE';
        // exclude events not authored by user if permissions in effect
        if (! EE_Registry::instance()->CAP->current_user_can('ee_read_others_registrations', 'reg_per_event_report')) {
            $inner_date_query .= "LEFT JOIN $event_table ON ID = EVT_ID";
            $inner_where      .= ' post_author = ' . get_current_user_id() . ' AND';
        }
        $inner_where      .= " REG_date >= '{$sql_date}'";
        $inner_date_query .= $inner_where;
        // start main query
        $select       = "SELECT DATE({$query_interval}) as Registration_REG_date, ";
        $join         = '';
        $join_parts   = [];
        $select_parts = [];
        // loop through registration statuses to do parts for each status.
        foreach (EEM_Registration::reg_status_array() as $STS_ID => $STS_code) {
            if ($STS_ID === EEM_Registration::status_id_incomplete) {
                continue;
            }
            $select_parts[] = "COUNT({$STS_code}.REG_ID) as {$STS_ID}";
            $join_parts[]
                            = "{$registration_table} AS {$STS_code} ON {$STS_code}.REG_date = dates.REG_date AND {$STS_code}.STS_ID = '{$STS_ID}'";
        }
        // setup the selects
        $select .= implode(', ', $select_parts);
        $select .= " FROM ($inner_date_query) AS dates LEFT JOIN ";
        // setup the joins
        $join .= implode(' LEFT JOIN ', $join_parts);
        // now let's put it all together
        $query = $select . $join . ' GROUP BY Registration_REG_date';
        // and execute it
        return $wpdb->get_results($query, ARRAY_A);
    }


    /**
     * get the number of registrations per event  for the Registration Admin page Reports Tab
     *
     * @param $period string which can be passed to php's strtotime function (eg "-1 month")
     * @return stdClass[] each with properties event_name, reg_limit, and total
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_registrations_per_event_report(string $period = '-1 month'): array
    {
        $date_sql = $this->convert_datetime_for_query(
            'REG_date',
            date('Y-m-d H:i:s', strtotime($period)),
            'Y-m-d H:i:s',
            'UTC'
        );
        $where    = [
            'REG_date' => ['>=', $date_sql],
            'STS_ID'   => ['!=', EEM_Registration::status_id_incomplete],
        ];
        if (
        ! EE_Registry::instance()->CAP->current_user_can(
            'ee_read_others_registrations',
            'reg_per_event_report'
        )
        ) {
            $where['Event.EVT_wp_user'] = get_current_user_id();
        }
        return $this->_get_all_wpdb_results(
            [
                $where,
                'group_by' => 'Event.EVT_name',
                'order_by' => 'Event.EVT_name',
                'limit'    => [0, 24],
            ],
            OBJECT,
            [
                'event_name' => ['Event_CPT.post_title', '%s'],
                'total'      => ['COUNT(REG_ID)', '%s'],
            ]
        );
    }


    /**
     * Get the number of registrations per event grouped by registration status.
     * Note: EEM_Registration::status_id_incomplete registrations are excluded from the results.
     *
     * @param string $period
     * @return stdClass[] with properties `Registration_Event` and a column for each registration status as the STS_ID
     * @throws EE_Error
     * (i.e. RAP)
     */
    public function get_registrations_per_event_and_per_status_report(string $period = '-1 month'): array
    {
        global $wpdb;
        $registration_table = $wpdb->prefix . 'esp_registration';
        $event_table        = $wpdb->posts;
        $sql_date           = date('Y-m-d H:i:s', strtotime($period));
        // inner date query
        $inner_date_query = "SELECT DISTINCT EVT_ID, REG_date from $registration_table ";
        $inner_where      = ' WHERE';
        // exclude events not authored by user if permissions in effect
        if (! EE_Registry::instance()->CAP->current_user_can('ee_read_others_registrations', 'reg_per_event_report')) {
            $inner_date_query .= "LEFT JOIN {$event_table} ON ID = EVT_ID";
            $inner_where      .= ' post_author = ' . get_current_user_id() . ' AND';
        }
        $inner_where      .= " REG_date >= '{$sql_date}'";
        $inner_date_query .= $inner_where;
        // build main query
        $select       = 'SELECT Event.post_title as Registration_Event, ';
        $join         = '';
        $join_parts   = [];
        $select_parts = [];
        // loop through registration statuses to do parts for each status.
        foreach (EEM_Registration::reg_status_array() as $STS_ID => $STS_code) {
            if ($STS_ID === EEM_Registration::status_id_incomplete) {
                continue;
            }
            $select_parts[] = "COUNT({$STS_code}.REG_ID) as {$STS_ID}";
            $join_parts[]
                            = "{$registration_table} AS {$STS_code} ON {$STS_code}.EVT_ID = dates.EVT_ID AND {$STS_code}.STS_ID = '{$STS_ID}' AND {$STS_code}.REG_date = dates.REG_date";
        }
        // setup the selects
        $select .= implode(', ', $select_parts);
        $select .= " FROM ($inner_date_query) AS dates LEFT JOIN $event_table as Event ON Event.ID = dates.EVT_ID LEFT JOIN ";
        // setup remaining joins
        $join .= implode(' LEFT JOIN ', $join_parts);
        // now put it all together
        $query = $select . $join . ' GROUP BY Registration_Event';
        // and execute
        return $wpdb->get_results($query, ARRAY_A);
    }


    /**
     * Returns the EE_Registration of the primary attendee on the transaction id provided
     *
     * @param int $TXN_ID
     * @return EE_Registration|null
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_primary_registration_for_transaction_ID(int $TXN_ID = 0): ?EE_Registration
    {
        if (! $TXN_ID) {
            return null;
        }
        return $this->get_one(
            [
                [
                    'TXN_ID'    => $TXN_ID,
                    'REG_count' => EEM_Registration::PRIMARY_REGISTRANT_COUNT,
                ],
            ]
        );
    }


    /**
     * get_event_registration_count
     *
     * @param int     $EVT_ID
     * @param boolean $for_incomplete_payments
     * @return int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_event_registration_count(int $EVT_ID, bool $for_incomplete_payments = false): int
    {
        // we only count approved registrations towards registration limits
        $query_params = [['EVT_ID' => $EVT_ID, 'STS_ID' => self::status_id_approved]];
        if ($for_incomplete_payments) {
            $query_params[0]['Transaction.STS_ID'] = ['!=', EEM_Transaction::complete_status_code];
        }
        return $this->count($query_params);
    }


    /**
     * Deletes all registrations with no transactions. Note that this needs to be very efficient
     * and so it uses wpdb directly. Also, we can't put a limit on this because MySQL doesn't allow a limit on a delete
     * when joining tables like this.
     *
     * @return int number deleted
     * @throws EE_Error
     * @global WPDB $wpdb
     */
    public function delete_registrations_with_no_transaction(): int
    {
        global $wpdb;
        return $wpdb->query(
            'DELETE r FROM '
            . $this->table()
            . ' r LEFT JOIN '
            . EEM_Transaction::instance()->table()
            . ' t ON r.TXN_ID = t.TXN_ID WHERE t.TXN_ID IS NULL'
        );
    }


    /**
     * Count registrations checked into (or out of) a datetime
     *
     * @param int     $DTT_ID     datetime ID
     * @param boolean $checked_in whether to count registrations checked IN or OUT
     * @return int
     * @throws EE_Error
     */
    public function count_registrations_checked_into_datetime(int $DTT_ID, bool $checked_in = true): int
    {
        global $wpdb;
        // subquery to get latest checkin
        $query = $wpdb->prepare(
            'SELECT '
            . 'COUNT( DISTINCT checkins.REG_ID ) '
            . 'FROM ' . EEM_Checkin::instance()->table() . ' AS checkins INNER JOIN'
            . '( SELECT '
            . 'max( CHK_timestamp ) AS latest_checkin, '
            . 'REG_ID AS REG_ID '
            . 'FROM ' . EEM_Checkin::instance()->table() . ' '
            . 'WHERE DTT_ID=%d '
            . 'GROUP BY REG_ID'
            . ') AS most_recent_checkin_per_reg '
            . 'ON checkins.REG_ID=most_recent_checkin_per_reg.REG_ID '
            . 'AND checkins.CHK_timestamp = most_recent_checkin_per_reg.latest_checkin '
            . 'WHERE '
            . 'checkins.CHK_in=%d',
            $DTT_ID,
            $checked_in
        );
        return (int) $wpdb->get_var($query);
    }


    /**
     * Count registrations checked into (or out of) an event.
     *
     * @param int     $EVT_ID     event ID
     * @param boolean $checked_in whether to count registrations checked IN or OUT
     * @return int
     * @throws EE_Error
     */
    public function count_registrations_checked_into_event(int $EVT_ID, bool $checked_in = true): int
    {
        global $wpdb;
        // subquery to get latest checkin
        $query = $wpdb->prepare(
            'SELECT '
            . 'COUNT( DISTINCT checkins.REG_ID ) '
            . 'FROM ' . EEM_Checkin::instance()->table() . ' AS checkins INNER JOIN'
            . '( SELECT '
            . 'max( CHK_timestamp ) AS latest_checkin, '
            . 'REG_ID AS REG_ID '
            . 'FROM ' . EEM_Checkin::instance()->table() . ' AS c '
            . 'INNER JOIN ' . EEM_Datetime::instance()->table() . ' AS d '
            . 'ON c.DTT_ID=d.DTT_ID '
            . 'WHERE d.EVT_ID=%d '
            . 'GROUP BY REG_ID'
            . ') AS most_recent_checkin_per_reg '
            . 'ON checkins.REG_ID=most_recent_checkin_per_reg.REG_ID '
            . 'AND checkins.CHK_timestamp = most_recent_checkin_per_reg.latest_checkin '
            . 'WHERE '
            . 'checkins.CHK_in=%d',
            $EVT_ID,
            $checked_in
        );
        return (int) $wpdb->get_var($query);
    }


    /**
     * The purpose of this method is to retrieve an array of
     * EE_Registration objects that represent the latest registration
     * for each ATT_ID given in the function argument.
     *
     * @param array $attendee_ids
     * @return EE_Registration[]
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_latest_registration_for_each_of_given_contacts(array $attendee_ids = []): array
    {
        // first do a native wp_query to get the latest REG_ID's matching these attendees.
        global $wpdb;
        $registration_table = $wpdb->prefix . 'esp_registration';
        $attendee_table     = $wpdb->posts;
        $attendee_ids       = is_array($attendee_ids)
            ? array_map('absint', $attendee_ids)
            : [(int) $attendee_ids];
        $ATT_IDs            = implode(',', $attendee_ids);
        // first we do a query to get the registration ids
        // (because a group by before order by causes the order by to be ignored.)
        $registration_id_query = "
			SELECT registrations.registration_ids as registration_id
			FROM (
				SELECT
					Attendee.ID as attendee_ids,
					Registration.REG_ID as registration_ids
				FROM {$registration_table} AS Registration
				JOIN {$attendee_table} AS Attendee
					ON Registration.ATT_ID = Attendee.ID
					AND Attendee.ID IN ( {$ATT_IDs} )
				ORDER BY Registration.REG_ID DESC
			  ) AS registrations
			  GROUP BY registrations.attendee_ids
		";
        $registration_ids      = $wpdb->get_results($registration_id_query, ARRAY_A);
        if (empty($registration_ids)) {
            return [];
        }
        $ids_for_model_query = [];
        // let's flatten the ids so they can be used in the model query.
        foreach ($registration_ids as $registration_id) {
            if (isset($registration_id['registration_id'])) {
                $ids_for_model_query[] = $registration_id['registration_id'];
            }
        }
        // construct query
        $_where = [
            'REG_ID' => ['IN', $ids_for_model_query],
        ];
        return $this->get_all([$_where]);
    }


    /**
     * returns a count of registrations for the supplied event having the status as specified
     *
     * @param int   $EVT_ID
     * @param array $statuses
     * @return int
     * @throws InvalidArgumentException
     * @throws InvalidStatusException
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function event_reg_count_for_statuses(int $EVT_ID, array $statuses = []): int
    {
        $EVT_ID = absint($EVT_ID);
        if (! $EVT_ID) {
            throw new InvalidArgumentException(
                esc_html__('An invalid Event ID was supplied.', 'event_espresso')
            );
        }
        $statuses           = is_array($statuses) ? $statuses : [$statuses];
        $statuses           = ! empty($statuses) ? $statuses : [EEM_Registration::status_id_approved];
        $valid_reg_statuses = EEM_Registration::reg_statuses();
        foreach ($statuses as $status) {
            if (! in_array($status, $valid_reg_statuses, true)) {
                throw new InvalidStatusException($status, esc_html__('Registration', 'event_espresso'));
            }
        }
        return $this->count(
            [
                [
                    'EVT_ID' => $EVT_ID,
                    'STS_ID' => ['IN', $statuses],
                ],
            ],
            'REG_ID',
            true
        );
    }
}
