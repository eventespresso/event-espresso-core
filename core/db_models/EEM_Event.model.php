<?php

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;

/**
 * EEM_Event Model
 * extends EEM_CPT_Base which extends EEM_Base
 *
 * @package               Event Espresso
 * @subpackage            includes/models/
 * @author                Michael Nelson, Brent Christensen
 */
class EEM_Event extends EEM_CPT_Base
{

    /**
     * constant used by status(), indicating that no more tickets can be purchased for any of the datetimes for the
     * event
     */
    const sold_out = 'sold_out';

    /**
     * constant used by status(), indicating that upcoming event dates have been postponed (may be pushed to a later
     * date)
     */
    const postponed = 'postponed';

    /**
     * constant used by status(), indicating that the event will no longer occur
     */
    const cancelled = 'cancelled';


    /**
     * @var string
     */
    protected static $_default_reg_status;


    /**
     * This is the default for the additional limit field.
     *
     * @var int
     */
    protected static $_default_additional_limit = 10;


    /**
     * private instance of the Event object
     *
     * @var EEM_Event
     */
    protected static $_instance;


    /**
     * Adds a relationship to Term_Taxonomy for each CPT_Base
     *
     * @param string $timezone
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function __construct(string $timezone = '')
    {
        EE_Registry::instance()->load_model('Registration');
        $this->singular_item = esc_html__('Event', 'event_espresso');
        $this->plural_item   = esc_html__('Events', 'event_espresso');
        // to remove Cancelled events from the frontend, copy the following filter to your functions.php file
        // add_filter( 'AFEE__EEM_Event__construct___custom_stati__cancelled__Public', '__return_false' );
        // to remove Postponed events from the frontend, copy the following filter to your functions.php file
        // add_filter( 'AFEE__EEM_Event__construct___custom_stati__postponed__Public', '__return_false' );
        // to remove Sold Out events from the frontend, copy the following filter to your functions.php file
        //  add_filter( 'AFEE__EEM_Event__construct___custom_stati__sold_out__Public', '__return_false' );
        $this->_custom_stati       = apply_filters(
            'AFEE__EEM_Event__construct___custom_stati',
            [
                EEM_Event::cancelled => [
                    'label'  => esc_html__('Cancelled', 'event_espresso'),
                    'public' => apply_filters('AFEE__EEM_Event__construct___custom_stati__cancelled__Public', true),
                ],
                EEM_Event::postponed => [
                    'label'  => esc_html__('Postponed', 'event_espresso'),
                    'public' => apply_filters('AFEE__EEM_Event__construct___custom_stati__postponed__Public', true),
                ],
                EEM_Event::sold_out  => [
                    'label'  => esc_html__('Sold Out', 'event_espresso'),
                    'public' => apply_filters('AFEE__EEM_Event__construct___custom_stati__sold_out__Public', true),
                ],
            ]
        );
        self::$_default_reg_status = empty(self::$_default_reg_status) ? EEM_Registration::status_id_pending_payment
            : self::$_default_reg_status;
        $this->_tables             = [
            'Event_CPT'  => new EE_Primary_Table('posts', 'ID'),
            'Event_Meta' => new EE_Secondary_Table('esp_event_meta', 'EVTM_ID', 'EVT_ID'),
        ];
        $this->_fields             = [
            'Event_CPT'  => [
                'EVT_ID'         => new EE_Primary_Key_Int_Field(
                    'ID',
                    esc_html__('Post ID for Event', 'event_espresso')
                ),
                'EVT_name'       => new EE_Plain_Text_Field(
                    'post_title',
                    esc_html__('Event Name', 'event_espresso'),
                    false,
                    ''
                ),
                'EVT_desc'       => new EE_Post_Content_Field(
                    'post_content',
                    esc_html__('Event Description', 'event_espresso'),
                    false,
                    ''
                ),
                'EVT_slug'       => new EE_Slug_Field(
                    'post_name',
                    esc_html__('Event Slug', 'event_espresso'),
                    false,
                    ''
                ),
                'EVT_created'    => new EE_Datetime_Field(
                    'post_date',
                    esc_html__('Date/Time Event Created', 'event_espresso'),
                    false,
                    EE_Datetime_Field::now
                ),
                'EVT_short_desc' => new EE_Simple_HTML_Field(
                    'post_excerpt',
                    esc_html__('Event Short Description', 'event_espresso'),
                    false,
                    ''
                ),
                'EVT_modified'   => new EE_Datetime_Field(
                    'post_modified',
                    esc_html__('Date/Time Event Modified', 'event_espresso'),
                    false,
                    EE_Datetime_Field::now
                ),
                'EVT_wp_user'    => new EE_WP_User_Field(
                    'post_author',
                    esc_html__('Event Creator ID', 'event_espresso'),
                    false
                ),
                'parent'         => new EE_Integer_Field(
                    'post_parent',
                    esc_html__('Event Parent ID', 'event_espresso'),
                    false,
                    0
                ),
                'EVT_order'      => new EE_Integer_Field(
                    'menu_order',
                    esc_html__('Event Menu Order', 'event_espresso'),
                    false,
                    1
                ),
                'post_type'      => new EE_WP_Post_Type_Field('espresso_events'),
                // EE_Plain_Text_Field( 'post_type', esc_html__( 'Event Post Type', 'event_espresso' ), FALSE, 'espresso_events' ),
                'status'         => new EE_WP_Post_Status_Field(
                    'post_status',
                    esc_html__('Event Status', 'event_espresso'),
                    false,
                    'draft',
                    $this->_custom_stati
                ),
                'password'       => new EE_Password_Field(
                    'post_password',
                    esc_html__('Password', 'event_espresso'),
                    false,
                    '',
                    [
                        'EVT_desc',
                        'EVT_short_desc',
                        'EVT_display_desc',
                        'EVT_display_ticket_selector',
                        'EVT_visible_on',
                        'EVT_additional_limit',
                        'EVT_default_registration_status',
                        'EVT_member_only',
                        'EVT_phone',
                        'EVT_allow_overflow',
                        'EVT_timezone_string',
                        'EVT_external_URL',
                        'EVT_donations',
                    ]
                ),
            ],
            'Event_Meta' => [
                'EVTM_ID'                         => new EE_DB_Only_Float_Field(
                    'EVTM_ID',
                    esc_html__('Event Meta Row ID', 'event_espresso'),
                    false
                ),
                'EVT_ID_fk'                       => new EE_DB_Only_Int_Field(
                    'EVT_ID',
                    esc_html__('Foreign key to Event ID from Event Meta table', 'event_espresso'),
                    false
                ),
                'EVT_display_desc'                => new EE_Boolean_Field(
                    'EVT_display_desc',
                    esc_html__('Display Description Flag', 'event_espresso'),
                    false,
                    true
                ),
                'EVT_display_ticket_selector'     => new EE_Boolean_Field(
                    'EVT_display_ticket_selector',
                    esc_html__('Display Ticket Selector Flag', 'event_espresso'),
                    false,
                    true
                ),
                'EVT_visible_on'                  => new EE_Datetime_Field(
                    'EVT_visible_on',
                    esc_html__('Event Visible Date', 'event_espresso'),
                    true,
                    EE_Datetime_Field::now
                ),
                'EVT_additional_limit'            => new EE_Integer_Field(
                    'EVT_additional_limit',
                    esc_html__('Limit of Additional Registrations on Same Transaction', 'event_espresso'),
                    true,
                    self::$_default_additional_limit
                ),
                'EVT_default_registration_status' => new EE_Enum_Text_Field(
                    'EVT_default_registration_status',
                    esc_html__('Default Registration Status on this Event', 'event_espresso'),
                    false,
                    EEM_Event::$_default_reg_status,
                    EEM_Registration::reg_status_array()
                ),
                'EVT_member_only'                 => new EE_Boolean_Field(
                    'EVT_member_only',
                    esc_html__('Member-Only Event Flag', 'event_espresso'),
                    false,
                    false
                ),
                'EVT_phone'                       => new EE_Plain_Text_Field(
                    'EVT_phone',
                    esc_html__('Event Phone Number', 'event_espresso'),
                    false,
                    ''
                ),
                'EVT_allow_overflow'              => new EE_Boolean_Field(
                    'EVT_allow_overflow',
                    esc_html__('Allow Overflow on Event', 'event_espresso'),
                    false,
                    false
                ),
                'EVT_timezone_string'             => new EE_Plain_Text_Field(
                    'EVT_timezone_string',
                    esc_html__('Timezone (name) for Event times', 'event_espresso'),
                    false,
                    ''
                ),
                'EVT_external_URL'                => new EE_Plain_Text_Field(
                    'EVT_external_URL',
                    esc_html__('URL of Event Page if hosted elsewhere', 'event_espresso'),
                    true
                ),
                'EVT_donations'                   => new EE_Boolean_Field(
                    'EVT_donations',
                    esc_html__('Accept Donations?', 'event_espresso'),
                    false,
                    false
                ),
            ],
        ];
        $this->_model_relations    = [
            'Registration'           => new EE_Has_Many_Relation(),
            'Datetime'               => new EE_Has_Many_Relation(),
            'Question_Group'         => new EE_HABTM_Relation('Event_Question_Group'),
            'Event_Question_Group'   => new EE_Has_Many_Relation(),
            'Venue'                  => new EE_HABTM_Relation('Event_Venue'),
            'Term_Relationship'      => new EE_Has_Many_Relation(),
            'Term_Taxonomy'          => new EE_HABTM_Relation('Term_Relationship'),
            'Message_Template_Group' => new EE_HABTM_Relation('Event_Message_Template'),
            'Attendee'               => new EE_HABTM_Relation('Registration'),
            'WP_User'                => new EE_Belongs_To_Relation(),
        ];
        // this model is generally available for reading
        $this->_cap_restriction_generators[ EEM_Base::caps_read ] = new EE_Restriction_Generator_Public();
        $this->model_chain_to_password                            = '';
        parent::__construct($timezone);
    }


    /**
     * @param string $default_reg_status
     * @throws EE_Error
     * @throws EE_Error
     */
    public static function set_default_reg_status(string $default_reg_status)
    {
        self::$_default_reg_status = $default_reg_status;
        // if EEM_Event has already been instantiated,
        // then we need to reset the `EVT_default_reg_status` field to use the new default.
        if (self::$_instance instanceof EEM_Event) {
            $default_reg_status = new EE_Enum_Text_Field(
                'EVT_default_registration_status',
                esc_html__('Default Registration Status on this Event', 'event_espresso'),
                false,
                $default_reg_status,
                EEM_Registration::reg_status_array()
            );
            $default_reg_status->_construct_finalize(
                'Event_Meta',
                'EVT_default_registration_status',
                'EEM_Event'
            );
            self::$_instance->_fields['Event_Meta']['EVT_default_registration_status'] = $default_reg_status;
        }
    }


    /**
     * Used to override the default for the additional limit field.
     *
     * @param $additional_limit
     */
    public static function set_default_additional_limit($additional_limit)
    {
        self::$_default_additional_limit = (int) $additional_limit;
        if (self::$_instance instanceof EEM_Event) {
            self::$_instance->_fields['Event_Meta']['EVT_additional_limit'] = new EE_Integer_Field(
                'EVT_additional_limit',
                esc_html__('Limit of Additional Registrations on Same Transaction', 'event_espresso'),
                true,
                self::$_default_additional_limit
            );
            self::$_instance->_fields['Event_Meta']['EVT_additional_limit']->_construct_finalize(
                'Event_Meta',
                'EVT_additional_limit',
                'EEM_Event'
            );
        }
    }


    /**
     * Return what is currently set as the default additional limit for the event.
     *
     * @return int
     */
    public static function get_default_additional_limit(): int
    {
        return apply_filters('FHEE__EEM_Event__get_default_additional_limit', self::$_default_additional_limit);
    }


    /**
     * get_question_groups
     *
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_all_question_groups(): array
    {
        return EE_Registry::instance()->load_model('Question_Group')->get_all(
            [
                ['QSG_deleted' => false],
                'order_by' => ['QSG_order' => 'ASC'],
            ]
        );
    }


    /**
     * get_question_groups
     *
     * @param int $EVT_ID
     * @return array|bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_all_event_question_groups(int $EVT_ID = 0)
    {
        if (! isset($EVT_ID) || ! absint($EVT_ID)) {
            EE_Error::add_error(
                esc_html__(
                    'An error occurred. No Event Question Groups could be retrieved because an Event ID was not received.',
                    'event_espresso'
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            return false;
        }
        return EE_Registry::instance()->load_model('Event_Question_Group')->get_all(
            [
                ['EVT_ID' => $EVT_ID],
            ]
        );
    }


    /**
     * get_question_groups
     *
     * @param int     $EVT_ID
     * @param boolean $for_primary_attendee
     * @return array|bool
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function get_event_question_groups(int $EVT_ID = 0, bool $for_primary_attendee = true)
    {
        if (! isset($EVT_ID) || ! absint($EVT_ID)) {
            EE_Error::add_error(
                esc_html__(
                // @codingStandardsIgnoreStart
                    'An error occurred. No Event Question Groups could be retrieved because an Event ID was not received.',
                    // @codingStandardsIgnoreEnd
                    'event_espresso'
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            return false;
        }
        $query_params = [
            [
                'EVT_ID'                                                                         => $EVT_ID,
                EEM_Event_Question_Group::instance()->fieldNameForContext($for_primary_attendee) => true,
            ],
        ];
        if ($for_primary_attendee) {
            $query_params[0]['EQG_primary'] = true;
        } else {
            $query_params[0]['EQG_additional'] = true;
        }
        return EE_Registry::instance()->load_model('Event_Question_Group')->get_all($query_params);
    }


    /**
     * get_question_groups
     *
     * @param int             $EVT_ID
     * @param EE_Registration $registration
     * @return array|bool
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     */
    public function get_question_groups_for_event(int $EVT_ID, EE_Registration $registration)
    {
        if (! isset($EVT_ID) || ! absint($EVT_ID)) {
            EE_Error::add_error(
                esc_html__(
                    'An error occurred. No Question Groups could be retrieved because an Event ID was not received.',
                    'event_espresso'
                ),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            return false;
        }
        return EE_Registry::instance()->load_model('Question_Group')->get_all(
            [
                [
                    'Event_Question_Group.EVT_ID' => $EVT_ID,
                    'Event_Question_Group.'
                    . EEM_Event_Question_Group::instance()->fieldNameForContext(
                        $registration->is_primary_registrant()
                    )                             => true,
                ],
                'order_by' => ['QSG_order' => 'ASC'],
            ]
        );
    }


    /**
     * get_question_target_db_column
     *
     * @param string $QSG_IDs csv list of $QSG IDs
     * @return array|bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_questions_in_groups(string $QSG_IDs = '')
    {
        if (empty($QSG_IDs)) {
            EE_Error::add_error(
                esc_html__('An error occurred. No Question Group IDs were received.', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            return false;
        }
        return EE_Registry::instance()->load_model('Question')->get_all(
            [
                [
                    'Question_Group.QSG_ID' => ['IN', $QSG_IDs],
                    'QST_deleted'           => false,
                    'QST_admin_only'        => is_admin(),
                ],
                'order_by' => 'QST_order',
            ]
        );
    }


    /**
     * get_options_for_question
     *
     * @param string $QST_IDs csv list of $QST IDs
     * @return array|bool
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_options_for_question(string $QST_IDs)
    {
        if (empty($QST_IDs)) {
            EE_Error::add_error(
                esc_html__('An error occurred. No Question IDs were received.', 'event_espresso'),
                __FILE__,
                __FUNCTION__,
                __LINE__
            );
            return false;
        }
        return EE_Registry::instance()->load_model('Question_Option')->get_all(
            [
                [
                    'Question.QST_ID' => ['IN', $QST_IDs],
                    'QSO_deleted'     => false,
                ],
                'order_by' => 'QSO_ID',
            ]
        );
    }


    /**
     * Gets all events that are published
     * and have event start time earlier than now and an event end time later than now
     *
     * @param array $query_params  An array of query params to further filter on
     *                             (note that status and DTT_EVT_start and DTT_EVT_end will be overridden)
     * @param bool  $count         whether to return the count or not (default FALSE)
     * @return EE_Event[]|int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_active_events(array $query_params, bool $count = false)
    {
        if (array_key_exists(0, $query_params)) {
            $where_params = $query_params[0];
            unset($query_params[0]);
        } else {
            $where_params = [];
        }
        // if we have count make sure we don't include group by
        if ($count && isset($query_params['group_by'])) {
            unset($query_params['group_by']);
        }
        // let's add specific query_params for active_events
        // keep in mind this will override any sent status in the query AND any date queries.
        $where_params['status'] = ['IN', ['publish', EEM_Event::sold_out]];
        // if already have where params for DTT_EVT_start or DTT_EVT_end then append these conditions
        if (isset($where_params['Datetime.DTT_EVT_start'])) {
            $where_params['Datetime.DTT_EVT_start******'] = [
                '<',
                EEM_Datetime::instance()->current_time_for_query('DTT_EVT_start'),
            ];
        } else {
            $where_params['Datetime.DTT_EVT_start'] = [
                '<',
                EEM_Datetime::instance()->current_time_for_query('DTT_EVT_start'),
            ];
        }
        if (isset($where_params['Datetime.DTT_EVT_end'])) {
            $where_params['Datetime.DTT_EVT_end*****'] = [
                '>',
                EEM_Datetime::instance()->current_time_for_query('DTT_EVT_end'),
            ];
        } else {
            $where_params['Datetime.DTT_EVT_end'] = [
                '>',
                EEM_Datetime::instance()->current_time_for_query('DTT_EVT_end'),
            ];
        }
        $query_params[0] = $where_params;
        // don't use $query_params with count()
        // because we don't want to include additional query clauses like "GROUP BY"
        return $count
            ? $this->count([$where_params], 'EVT_ID', true)
            : $this->get_all($query_params);
    }


    /**
     * get all events that are published and have an event start time later than now
     *
     * @param array $query_params  An array of query params to further filter on
     *                             (Note that status and DTT_EVT_start will be overridden)
     * @param bool  $count         whether to return the count or not (default FALSE)
     * @return EE_Event[]|int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_upcoming_events(array $query_params, bool $count = false)
    {
        if (array_key_exists(0, $query_params)) {
            $where_params = $query_params[0];
            unset($query_params[0]);
        } else {
            $where_params = [];
        }
        // if we have count make sure we don't include group by
        if ($count && isset($query_params['group_by'])) {
            unset($query_params['group_by']);
        }
        // let's add specific query_params for active_events
        // keep in mind this will override any sent status in the query AND any date queries.
        // we need to pull events with a status of publish and sold_out
        $event_status = ['publish', EEM_Event::sold_out];
        // check if the user can read private events and if so add the 'private status to the were params'
        if (EE_Registry::instance()->CAP->current_user_can('ee_read_private_events', 'get_upcoming_events')) {
            $event_status[] = 'private';
        }
        $where_params['status'] = ['IN', $event_status];
        // if there are already query_params matching DTT_EVT_start then we need to modify that to add them.
        if (isset($where_params['Datetime.DTT_EVT_start'])) {
            $where_params['Datetime.DTT_EVT_start*****'] = [
                '>',
                EEM_Datetime::instance()->current_time_for_query('DTT_EVT_start'),
            ];
        } else {
            $where_params['Datetime.DTT_EVT_start'] = [
                '>',
                EEM_Datetime::instance()->current_time_for_query('DTT_EVT_start'),
            ];
        }
        $query_params[0] = $where_params;
        // don't use $query_params with count()
        // because we don't want to include additional query clauses like "GROUP BY"
        return $count
            ? $this->count([$where_params], 'EVT_ID', true)
            : $this->get_all($query_params);
    }


    /**
     * Gets all events that are published
     * and have an event end time later than now
     *
     * @param array $query_params  An array of query params to further filter on
     *                             (note that status and DTT_EVT_end will be overridden)
     * @param bool  $count         whether to return the count or not (default FALSE)
     * @return EE_Event[]|int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_active_and_upcoming_events(array $query_params, bool $count = false)
    {
        if (array_key_exists(0, $query_params)) {
            $where_params = $query_params[0];
            unset($query_params[0]);
        } else {
            $where_params = [];
        }
        // if we have count make sure we don't include group by
        if ($count && isset($query_params['group_by'])) {
            unset($query_params['group_by']);
        }
        // let's add specific query_params for active_events
        // keep in mind this will override any sent status in the query AND any date queries.
        $where_params['status'] = ['IN', ['publish', EEM_Event::sold_out]];
        // add where params for DTT_EVT_end
        if (isset($where_params['Datetime.DTT_EVT_end'])) {
            $where_params['Datetime.DTT_EVT_end*****'] = [
                '>',
                EEM_Datetime::instance()->current_time_for_query('DTT_EVT_end'),
            ];
        } else {
            $where_params['Datetime.DTT_EVT_end'] = [
                '>',
                EEM_Datetime::instance()->current_time_for_query('DTT_EVT_end'),
            ];
        }
        $query_params[0] = $where_params;
        // don't use $query_params with count()
        // because we don't want to include additional query clauses like "GROUP BY"
        return $count
            ? $this->count([$where_params], 'EVT_ID', true)
            : $this->get_all($query_params);
    }


    /**
     * This only returns events that are expired.
     * They may still be published but all their datetimes have expired.
     *
     * @param array $query_params  An array of query params to further filter on
     *                             (note that status and DTT_EVT_end will be overridden)
     * @param bool  $count         whether to return the count or not (default FALSE)
     * @return EE_Event[]|int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_expired_events(array $query_params, bool $count = false)
    {
        $where_params = $query_params[0] ?? [];
        // if we have count make sure we don't include group by
        if ($count && isset($query_params['group_by'])) {
            unset($query_params['group_by']);
        }
        // let's add specific query_params for active_events
        // keep in mind this will override any sent status in the query AND any date queries.
        if (isset($where_params['status'])) {
            unset($where_params['status']);
        }
        $exclude_query = $query_params;
        if (isset($exclude_query[0])) {
            unset($exclude_query[0]);
        }
        $exclude_query[0] = [
            'Datetime.DTT_EVT_end' => [
                '>',
                EEM_Datetime::instance()->current_time_for_query('DTT_EVT_end'),
            ],
        ];
        // first get all events that have datetimes where its not expired.
        $event_ids = $this->_get_all_wpdb_results($exclude_query, OBJECT_K, 'Event_CPT.ID');
        $event_ids = array_keys($event_ids);
        // if we have any additional query_params, let's add them to the 'AND' condition
        $and_condition = [
            'Datetime.DTT_EVT_end' => ['<', EEM_Datetime::instance()->current_time_for_query('DTT_EVT_end')],
            'EVT_ID'               => ['NOT IN', $event_ids],
        ];
        if (isset($where_params['OR'])) {
            $and_condition['OR'] = $where_params['OR'];
            unset($where_params['OR']);
        }
        if (isset($where_params['Datetime.DTT_EVT_end'])) {
            $and_condition['Datetime.DTT_EVT_end****'] = $where_params['Datetime.DTT_EVT_end'];
            unset($where_params['Datetime.DTT_EVT_end']);
        }
        if (isset($where_params['Datetime.DTT_EVT_start'])) {
            $and_condition['Datetime.DTT_EVT_start'] = $where_params['Datetime.DTT_EVT_start'];
            unset($where_params['Datetime.DTT_EVT_start']);
        }
        // merge remaining $where params with the and conditions.
        $where_params['AND'] = array_merge($and_condition, $where_params);
        $query_params[0]     = $where_params;
        // don't use $query_params with count()
        // because we don't want to include additional query clauses like "GROUP BY"
        return $count
            ? $this->count([$where_params], 'EVT_ID', true)
            : $this->get_all($query_params);
    }


    /**
     * This basically just returns the events that do not have the publish status.
     *
     * @param array   $query_params  An array of query params to further filter on
     *                               (note that status will be overwritten)
     * @param boolean $count         whether to return the count or not (default FALSE)
     * @return EE_Event[]|int
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function get_inactive_events(array $query_params, bool $count = false)
    {
        $where_params = $query_params[0] ?? [];
        // let's add in specific query_params for inactive events.
        if (isset($where_params['status'])) {
            unset($where_params['status']);
        }
        // if we have count make sure we don't include group by
        if ($count && isset($query_params['group_by'])) {
            unset($query_params['group_by']);
        }
        // if we have any additional query_params, let's add them to the 'AND' condition
        $where_params['AND']['status'] = ['!=', 'publish'];
        if (isset($where_params['OR'])) {
            $where_params['AND']['OR'] = $where_params['OR'];
            unset($where_params['OR']);
        }
        if (isset($where_params['Datetime.DTT_EVT_end'])) {
            $where_params['AND']['Datetime.DTT_EVT_end****'] = $where_params['Datetime.DTT_EVT_end'];
            unset($where_params['Datetime.DTT_EVT_end']);
        }
        if (isset($where_params['Datetime.DTT_EVT_start'])) {
            $where_params['AND']['Datetime.DTT_EVT_start'] = $where_params['Datetime.DTT_EVT_start'];
            unset($where_params['Datetime.DTT_EVT_start']);
        }
        $query_params[0] = $where_params;
        // don't use $query_params with count()
        // because we don't want to include additional query clauses like "GROUP BY"
        return $count
            ? $this->count([$where_params], 'EVT_ID', true)
            : $this->get_all($query_params);
    }


    /**
     * This is just injecting into the parent add_relationship_to so we do special handling on price relationships
     * because we don't want to override any existing global default prices but instead insert NEW prices that get
     * attached to the event. See parent for param descriptions
     *
     * @param        $id_or_obj
     * @param        $other_model_id_or_obj
     * @param string $relationName
     * @param array  $extra_join_model_fields_n_values
     * @return EE_Base_Class
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function add_relationship_to(
        $id_or_obj,
        $other_model_id_or_obj,
        $relationName,
        $extra_join_model_fields_n_values = []
    ): EE_Base_Class {
        if ($relationName === 'Price') {
            // let's get the PRC object for the given ID to make sure that we aren't dealing with a default
            $price = $this->get_related_model_obj($relationName)->ensure_is_obj($other_model_id_or_obj);
            // if EVT_ID = 0, then this is a default
            if ((int) $price->get('EVT_ID') === 0) {
                // let's set the prc_id as 0 so we force an insert on the add_relation_to carried out by relation
                $price->set('PRC_ID', 0);
            }
            // run parent
            return parent::add_relationship_to(
                $id_or_obj,
                $price,
                $relationName,
                $extra_join_model_fields_n_values
            );
        }
        // otherwise carry on as normal
        return parent::add_relationship_to(
            $id_or_obj,
            $other_model_id_or_obj,
            $relationName,
            $extra_join_model_fields_n_values
        );
    }



    /******************** DEPRECATED METHODS ********************/


    /**
     * _get_question_target_db_column
     *
     * @param EE_Registration $registration    (so existing answers for registration are included)
     * @param int             $EVT_ID          so all question groups are included for event (not just answers from
     *                                         registration).
     * @return    array
     * @throws ReflectionException
     * @throws EE_Error*@deprecated as of 4.8.32.rc.001. Instead consider using
     *                                         EE_Registration_Custom_Questions_Form located in
     *                                         admin_pages/registrations/form_sections/EE_Registration_Custom_Questions_Form.form.php
     * @access     public
     */
    public function assemble_array_of_groups_questions_and_options(
        EE_Registration $registration,
        int $EVT_ID = 0
    ): array {
        if (empty($EVT_ID)) {
            throw new EE_Error(
                __(
                    'An error occurred. No EVT_ID is included.  Needed to know which question groups to retrieve.',
                    'event_espresso'
                )
            );
        }
        $questions = [];
        // get all question groups for event
        $question_groups = $this->get_question_groups_for_event($EVT_ID, $registration);
        if (! empty($question_groups)) {
            foreach ($question_groups as $question_group) {
                $QSG_ID = $question_group->ID();
                $questions[ $QSG_ID ]                  = $question_group->model_field_array();
                $questions[ $QSG_ID ]['QSG_questions'] = [];
                $question_groups_questions                           = $question_group->questions();
                foreach ($question_groups_questions as $question_groups_question) {
                    if ($question_groups_question->is_system_question()) {
                        continue;
                    }
                    $QGQ_ID = $question_groups_question->ID();
                    $answer = EEM_Answer::instance()->get_one(
                        [
                            [
                                'QST_ID' => $QGQ_ID,
                                'REG_ID' => $registration->ID(),
                            ],
                        ]
                    );
                    $answer = $answer instanceof EE_Answer
                        ? $answer
                        : EEM_Answer::instance()->create_default_object();
                    $question_name = $question_id = $QGQ_ID;
                    $ANS_ID = $answer->ID();
                    $question_name = ! empty($ANS_ID)
                        ? '[' . $question_name . '][' . $ANS_ID . ']'
                        : '[' . $question_name . ']';
                    $input_name = '';
                    $input_id = sanitize_key($question_groups_question->display_text());
                    $input_class
                            = '';
                    $questions[ $QSG_ID ]['QSG_questions'][ $QGQ_ID ]
                            = $question_groups_question->model_field_array();
                    $questions[ $QSG_ID ]['QSG_questions'][ $QGQ_ID ]['QST_input_name'] = 'qstn'
                                                                                           . $input_name
                                                                                           . $question_name;
                    $questions[ $QSG_ID ]['QSG_questions'][ $QGQ_ID ]['QST_input_id'] = $input_id . '-' . $question_id;
                    $questions[ $QSG_ID ]['QSG_questions'][ $QGQ_ID ]['QST_input_class'] = $input_class;
                    $questions[ $QSG_ID ]['QSG_questions'][ $QGQ_ID ]['QST_options'] = [];
                    $questions[ $QSG_ID ]['QSG_questions'][ $QGQ_ID ]['qst_obj'] = $question_groups_question;
                    $questions[ $QSG_ID ]['QSG_questions'][ $QGQ_ID ]['ans_obj'] = $answer;
                    // leave responses as-is, don't convert stuff into html entities please!
                    $questions[ $QSG_ID ]['QSG_questions'][ $QGQ_ID ]['htmlentities'] = false;
                    if (
                        $question_groups_question->type() == 'RADIO_BTN'
                        || $question_groups_question->type() == 'CHECKBOX'
                        || $question_groups_question->type() == 'DROPDOWN'
                    ) {
                        $question_options = $question_groups_question->options(true, $answer->value());
                        if (is_array($question_options)) {
                            foreach ($question_options as $QSO_ID => $question_option) {
                                $questions[ $QSG_ID ]['QSG_questions'][ $QGQ_ID ]['QST_options'][ $QSO_ID ]
                                    = $question_option->model_field_array();
                            }
                        }
                    }
                }
            }
        }
        return $questions;
    }


    /**
     * @param mixed $cols_n_values either an array of where each key is the name of a field, and the value is its value
     *                             or an stdClass where each property is the name of a column,
     * @return EE_Base_Class
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function instantiate_class_from_array_or_object($cols_n_values)
    {
        $classInstance = parent::instantiate_class_from_array_or_object($cols_n_values);
        if ($classInstance instanceof EE_Event) {
            // events have their timezone defined in the DB, so use it immediately
            $this->set_timezone($classInstance->get_timezone());
        }
        return $classInstance;
    }
}
