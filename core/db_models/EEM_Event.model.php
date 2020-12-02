<?php

use EventEspresso\core\domain\services\database\DatetimeModelQueryHelper;
use EventEspresso\core\domain\services\database\EventModelQueryHelper;
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

    // more better more complete set of status constants

    const STATUS_ACTIVE    = 'active';

    const STATUS_CANCELLED = 'cancelled';

    const STATUS_EXPIRED   = 'expired';

    const STATUS_INACTIVE  = 'inactive';

    const STATUS_POSTPONED = 'postponed';

    const STATUS_SOLD_OUT  = 'sold-out';

    const STATUS_UPCOMING  = 'upcoming';


    /**
     * @var string
     */
    protected static $status_list = [
        self::STATUS_ACTIVE    => self::STATUS_ACTIVE,
        self::STATUS_CANCELLED => self::STATUS_CANCELLED,
        self::STATUS_EXPIRED   => self::STATUS_EXPIRED,
        self::STATUS_INACTIVE  => self::STATUS_INACTIVE,
        self::STATUS_POSTPONED => self::STATUS_POSTPONED,
        self::STATUS_SOLD_OUT  => self::STATUS_SOLD_OUT,
        self::STATUS_UPCOMING  => self::STATUS_UPCOMING,
    ];

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
     * @var DatetimeModelQueryHelper
     */
    protected $datetime_model_query_helper;

    /**
     * @var EventModelQueryHelper
     */
    protected $model_query_helper;


    /**
     * Adds a relationship to Term_Taxonomy for each CPT_Base
     *
     * @param string|null $timezone
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function __construct(string $timezone = null)
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
        $this->_custom_stati            = apply_filters(
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
        EEM_Event::$_default_reg_status =
            empty(EEM_Event::$_default_reg_status) ? EEM_Registration::status_id_pending_payment
                : EEM_Event::$_default_reg_status;
        $this->_tables                  = [
            'Event_CPT'  => new EE_Primary_Table('posts', 'ID'),
            'Event_Meta' => new EE_Secondary_Table('esp_event_meta', 'EVTM_ID', 'EVT_ID'),
        ];
        $this->_fields                  = [
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
                    __('Password', 'event_espresso'),
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
                'EVT_status'                      => new EE_Enum_Text_Field(
                    'EVT_status',
                    esc_html__(
                        'Admin configurable Event Status (unlike active status which is derived)',
                        'event_espresso'
                    ),
                    false,
                    EEM_Event::STATUS_INACTIVE,
                    EEM_Event::$status_list
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
                    EEM_Event::$_default_additional_limit
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
        $this->_model_relations         = [
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
        $this->model_chain_to_password  = '';
        // this model is generally available for reading
        $this->_cap_restriction_generators[ EEM_Base::caps_read ] = new EE_Restriction_Generator_Public();
        parent::__construct($timezone);
        $this->datetime_model_query_helper = new DatetimeModelQueryHelper(EEM_Datetime::instance());
        $this->model_query_helper          = new EventModelQueryHelper(EE_Registry::instance()->CAP);
    }


    /**
     * @param string $default_reg_status
     * @throws EE_Error
     * @throws EE_Error
     */
    public static function set_default_reg_status(string $default_reg_status)
    {
        EEM_Event::$_default_reg_status = $default_reg_status;
        // if EEM_Event has already been instantiated,
        // then we need to reset the `EVT_default_reg_status` field to use the new default.
        if (EEM_Event::$_instance instanceof EEM_Event) {
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
            EEM_Event::$_instance->_fields['Event_Meta']['EVT_default_registration_status'] = $default_reg_status;
        }
    }


    /**
     * Used to override the default for the additional limit field.
     *
     * @param $additional_limit
     */
    public static function set_default_additional_limit($additional_limit)
    {
        EEM_Event::$_default_additional_limit = (int) $additional_limit;
        if (EEM_Event::$_instance instanceof EEM_Event) {
            EEM_Event::$_instance->_fields['Event_Meta']['EVT_additional_limit'] = new EE_Integer_Field(
                'EVT_additional_limit',
                __('Limit of Additional Registrations on Same Transaction', 'event_espresso'),
                true,
                EEM_Event::$_default_additional_limit
            );
            EEM_Event::$_instance->_fields['Event_Meta']['EVT_additional_limit']->_construct_finalize(
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
    public static function get_default_additional_limit()
    {
        return apply_filters('FHEE__EEM_Event__get_default_additional_limit', EEM_Event::$_default_additional_limit);
    }


    /**
     * @return array
     * @throws EE_Error
     */
    public function get_all_question_groups()
    {
        return EEM_Question_Group::instance()->getAllQuestionGroups();
    }


    /**
     * @param int $EVT_ID
     * @return array|bool
     * @throws EE_Error
     */
    public function get_all_event_question_groups($EVT_ID = 0)
    {
        return EEM_Event_Question_Group::instance()->getAllEventQuestionGroups($EVT_ID);
    }


    /**
     * @param int     $EVT_ID
     * @param boolean $for_primary_attendee
     * @return array|bool
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function get_event_question_groups($EVT_ID = 0, $for_primary_attendee = true)
    {
        return EEM_Event_Question_Group::instance()->getEventQuestionGroups($EVT_ID, $for_primary_attendee);
    }


    /**
     * @param int             $EVT_ID
     * @param EE_Registration $registration
     * @return array|bool
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public function get_question_groups_for_event(int $EVT_ID, EE_Registration $registration)
    {
        return EEM_Question_Group::instance()->getQuestionGroupsForEvent($EVT_ID, $registration);
    }


    /**
     * @param string $QSG_IDs csv list of $QSG IDs
     * @return array|bool
     * @throws EE_Error
     */
    public function get_questions_in_groups($QSG_IDs = '')
    {
        return EEM_Question::instance()->getQuestionsInGroups($QSG_IDs);
    }


    /**
     * @param string $QST_IDs csv list of $QST IDs
     * @return array|bool
     * @throws EE_Error
     */
    public function get_options_for_question(string $QST_IDs)
    {
        return EEM_Question_Option::instance()->getOptionsForQuestion($QST_IDs);
    }


    /**
     * @param array $query_params
     * @param bool  $count
     * @return EE_Base_Class[]|EE_Event[]|int
     * @throws EE_Error
     * @since $VID:$
     */
    private function getEvents(array $query_params, bool $count)
    {
        return $count
            ? $this->count($query_params, 'EVT_ID', true)
            : $this->get_all($query_params);
    }


    /**
     * get all events that are published and have an event start time later than now
     *
     * @param array $query_params  An array of query params to further filter on
     *                             (Note that status and DTT_EVT_start will be overridden)
     * @param bool  $count         whether to return the count or not (default FALSE)
     * @return EE_Base_Class[]|EE_Event[]|int
     * @throws EE_Error
     */
    public function get_upcoming_events(array $query_params, bool $count = false)
    {
        $context      = EEM_Event::STATUS_UPCOMING;
        $where_params = $this->model_query_helper->addBasicWhereParams($query_params, $context);
        $where_params = $this->datetime_model_query_helper->addWhereParamsForDateField(
            $where_params,
            'DTT_EVT_start',
            '>'
        );
        $query_params = $this->model_query_helper->finalizeQueryParams($query_params, $where_params, $count);
        return $this->getEvents($query_params, $count);
    }


    /**
     * Gets all events that are published
     * and have event start time earlier than now and an event end time later than now
     *
     * @param array $query_params  An array of query params to further filter on
     *                             (note that status and DTT_EVT_start and DTT_EVT_end will be overridden)
     * @param bool  $count         whether to return the count or not (default FALSE)
     * @return EE_Base_Class[]|EE_Event[]|int
     * @throws EE_Error
     */
    public function get_active_events(array $query_params, bool $count = false)
    {
        $context      = EEM_Event::STATUS_ACTIVE;
        $where_params = $this->model_query_helper->addBasicWhereParams($query_params, $context);
        $where_params = $this->datetime_model_query_helper->addWhereParamsForDateField(
            $where_params,
            'DTT_EVT_start',
            '<'
        );
        $where_params = $this->datetime_model_query_helper->addWhereParamsForDateField(
            $where_params,
            'DTT_EVT_end',
            '>'
        );
        $query_params = $this->model_query_helper->finalizeQueryParams($query_params, $where_params, $count);
        return $this->getEvents($query_params, $count);
    }


    /**
     * Gets all events that are published
     * and have an event end time later than now
     *
     * @param array $query_params  An array of query params to further filter on
     *                             (note that status and DTT_EVT_end will be overridden)
     * @param bool  $count         whether to return the count or not (default FALSE)
     * @return EE_Base_Class[]|EE_Event[]|int
     * @throws EE_Error
     */
    public function get_active_and_upcoming_events(array $query_params, bool $count = false)
    {
        $context      = EEM_Event::STATUS_ACTIVE . '_and_' . EEM_Event::STATUS_UPCOMING;
        $where_params = $this->model_query_helper->addBasicWhereParams($query_params, $context);
        $where_params = $this->datetime_model_query_helper->addWhereParamsForDateField(
            $where_params,
            'DTT_EVT_end',
            '>'
        );
        $query_params = $this->model_query_helper->finalizeQueryParams($query_params, $where_params, $count);
        return $this->getEvents($query_params, $count);
    }


    /**
     * This only returns events that are expired.
     * They may still be published but all their datetimes have expired.
     *
     * @param array $query_params  An array of query params to further filter on
     *                             (note that status and DTT_EVT_end will be overridden)
     * @param bool  $count         whether to return the count or not (default FALSE)
     * @return EE_Base_Class[]|EE_Event[]|int
     * @throws EE_Error
     */
    public function get_expired_events(array $query_params, bool $count = false)
    {
        $context            = EEM_Event::STATUS_EXPIRED;
        $basic_where_params = $this->model_query_helper->addBasicWhereParams($query_params, $context);
        $exclude_params     = $this->datetime_model_query_helper->addWhereParamsForDateField(
            $basic_where_params,
            'DTT_EVT_end',
            '>'
        );
        $exclude_query      = $this->model_query_helper->finalizeQueryParams($query_params, $exclude_params);
        // first get all events that have datetimes where its not expired.
        $event_ids = $this->_get_all_wpdb_results($exclude_query, OBJECT_K, 'Event_CPT.ID');
        $event_ids = array_keys($event_ids);
        // if we have any additional query_params, let's add them to the 'AND' condition
        $and_where_params = ['EVT_ID' => ['NOT IN', $event_ids]];
        $and_where_params = $this->datetime_model_query_helper->addWhereParamsForDateField(
            $and_where_params,
            'DTT_EVT_end',
            '<'
        );
        if (isset($basic_where_params['Datetime.DTT_EVT_end'])) {
            $and_where_params['Datetime.DTT_EVT_end****'] = $basic_where_params['Datetime.DTT_EVT_end'];
            unset($basic_where_params['Datetime.DTT_EVT_end']);
        }
        if (isset($basic_where_params['Datetime.DTT_EVT_start'])) {
            $and_where_params['Datetime.DTT_EVT_start'] = $basic_where_params['Datetime.DTT_EVT_start'];
            unset($basic_where_params['Datetime.DTT_EVT_start']);
        }
        // merge remaining $where params with the and conditions.
        $where_params['AND'] = array_merge($and_where_params, $basic_where_params);
        $query_params        = $this->model_query_helper->finalizeQueryParams($query_params, $where_params, $count);
        return $this->getEvents($query_params, $count);
    }


    /**
     * This basically just returns the events that do not have the publish status.
     *
     * @param array   $query_params  An array of query params to further filter on
     *                               (note that status will be overwritten)
     * @param boolean $count         whether to return the count or not (default FALSE)
     * @return EE_Base_Class[]|EE_Event[]|int
     * @throws EE_Error
     */
    public function get_inactive_events(array $query_params, bool $count = false)
    {
        $context      = EEM_Event::STATUS_INACTIVE;
        $where_params = $this->model_query_helper->addBasicWhereParams($query_params, $context);
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
        $query_params = $this->model_query_helper->finalizeQueryParams($query_params, $where_params, $count);
        return $this->getEvents($query_params, $count);
    }


    /**
     * This is just injecting into the parent add_relationship_to so we do special handling on price relationships
     * because we don't want to override any existing global default prices but instead insert NEW prices that get
     * attached to the event. See parent for param descriptions
     *
     * @param        $id_or_obj
     * @param        $other_model_id_or_obj
     * @param string $relation_name
     * @param array  $where_query
     * @return EE_Base_Class
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function add_relationship_to($id_or_obj, $other_model_id_or_obj, $relation_name, $where_query = [])
    {
        if ($relation_name === 'Price') {
            // let's get the PRC object for the given ID to make sure that we aren't dealing with a default
            $price = $this->get_related_model_obj($relation_name)->ensure_is_obj($other_model_id_or_obj);
            // if EVT_ID = 0, then this is a default
            if ((int) $price->get('EVT_ID') === 0) {
                // let's set the prc_id as 0 so we force an insert on the add_relation_to carried out by relation
                $price->set('PRC_ID', 0);
            }
            // run parent
            return parent::add_relationship_to($id_or_obj, $price, $relation_name, $where_query);
        }
        // otherwise carry on as normal
        return parent::add_relationship_to($id_or_obj, $other_model_id_or_obj, $relation_name, $where_query);
    }



    /******************** DEPRECATED METHODS ********************/


    /**
     * _get_question_target_db_column
     *
     * @param EE_Registration $registration     (so existing answers for registration are included)
     * @param int             $EVT_ID           so all question groups are included for event
     *                                          (not just answers from registration).
     * @return array
     * @throws ReflectionException
     * @throws EE_Error
     * @deprecated 4.8.32.rc.001                Instead consider using EE_Registration_Custom_Questions_Form located in
     *                                          admin_pages/registrations/form_sections/EE_Registration_Custom_Questions_Form.form.php
     */
    public function assemble_array_of_groups_questions_and_options(EE_Registration $registration, $EVT_ID = 0)
    {
        if (empty($EVT_ID)) {
            throw new EE_Error(
                esc_html__(
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
                $QSG_ID                                = $question_group->ID();
                $question_group_questions              = $question_group->questions();
                $questions[ $QSG_ID ]                  = $question_group->model_field_array();
                $questions[ $QSG_ID ]['QSG_questions'] = [];
                foreach ($question_group_questions as $question) {
                    if ($question->is_system_question()) {
                        continue;
                    }
                    $question_name = $QST_ID = $question->ID();
                    $answer        =
                        EEM_Answer::instance()->get_one([['QST_ID' => $QST_ID, 'REG_ID' => $registration->ID()]]);
                    $answer        = $answer instanceof EE_Answer
                        ? $answer
                        : EEM_Answer::instance()->create_default_object();
                    $ANS_ID        = $answer->ID();
                    // if question has already been answered, then append the answer ID
                    $question_name              = ! empty($ANS_ID)
                        ? "qstn[{$question_name}][{$ANS_ID}]"
                        : "qstn[{$question_name}]";
                    $input_id                   = sanitize_key($question->display_text());
                    $details                    = $question->model_field_array();
                    $details['QST_input_name']  = $question_name;
                    $details['QST_input_id']    = "{$input_id}-{$QST_ID}";
                    $details['QST_input_class'] = '';
                    $details['QST_options']     = [];
                    $details['qst_obj']         = $question;
                    $details['ans_obj']         = $answer;
                    // leave responses as-is, don't convert stuff into html entities please!
                    $details['htmlentities']     = false;
                    $question_types_with_options = ['CHECKBOX', 'DROPDOWN', 'RADIO_BTN'];
                    if (in_array($question->type(), $question_types_with_options)) {
                        $question_options = $question->options(true, $answer->value());
                        if (is_array($question_options)) {
                            foreach ($question_options as $QSO_ID => $question_option) {
                                $details['QST_options'][ $QSO_ID ] = $question_option->model_field_array();
                            }
                        }
                    }
                    $questions[ $QSG_ID ]['QSG_questions'][ $QST_ID ] = $details;
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
