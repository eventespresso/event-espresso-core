<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}

/**
 * Message Model
 *
 * @package            Event Espresso
 * @subpackage         models
 * @author             Darren Ethier
 */
class EEM_Message extends EEM_Base implements EEI_Query_Filter
{

    // private instance of the Message object
    protected static $_instance = null;


    /**
     * This priority indicates a message should be generated and sent ASAP
     *
     * @type int
     */
    const priority_high = 10;


    /**
     * This priority indicates a message should be generated ASAP and queued for sending.
     *
     * @type
     */
    const priority_medium = 20;


    /**
     * This priority indicates a message should be queued for generating.
     *
     * @type int
     */
    const priority_low = 30;


    /**
     * indicates this message was sent at the time modified
     */
    const status_sent = 'MSN';


    /**
     * indicates this message is waiting to be sent
     */
    const status_idle = 'MID';


    /**
     * indicates an attempt was a made to send this message
     * at the scheduled time, but it failed at the time modified.  This differs from MDO status in that it will ALWAYS
     * appear to the end user.
     */
    const status_failed = 'MFL';


    /**
     * indicates the message has been flagged for resending (at the time modified).
     */
    const status_resend = 'MRS';


    /**
     * indicates the message has been flagged for generation but has not been generated yet.  Messages always start as
     * this status when added to the queue.
     */
    const status_incomplete = 'MIC';


    /**
     * Indicates everything was generated fine for the message, however, the messenger was unable to send.
     * This status means that its possible to retry sending the message.
     */
    const status_retry = 'MRT';


    /**
     * This is used for more informational messages that may not indicate anything is broken but still cannot be
     * generated or sent correctly. An example of a message that would get flagged this way would be when a not
     * approved message was queued for generation, but at time of generation, the attached registration(s) are
     * approved. So the message queued for generation is no longer valid.  Messages for this status will only persist
     * in the db and be viewable in the message activity list table when the messages system is in debug mode.
     *
     * @see EEM_Message::debug()
     */
    const status_debug_only = 'MDO';


    /**
     * This status is given to messages it is processed by the messenger send method.
     * Messages with this status should rarely be seen in the Message List table, but if they are, that's usually
     * indicative of a PHP timeout or memory limit issue.
     */
    const status_messenger_executing = 'MEX';


    /**
     *    Private constructor to prevent direct creation.
     *
     * @param string $timezone string representing the timezone we want to set for returned Date Time Strings (and
     *                         any incoming timezone data that gets saved).  Note this just sends the timezone info to
     *                         the date time model field objects.  Default is null (and will be assumed using the set
     *                         timezone in the 'timezone_string' wp option)
     * @return EEM_Message
     */
    protected function __construct($timezone = null)
    {
        $this->singular_item = __('Message', 'event_espresso');
        $this->plural_item   = __('Messages', 'event_espresso');

        //used for token generator
        EE_Registry::instance()->load_helper('URL');

        $this->_tables = array(
            'Message' => new EE_Primary_Table('esp_message', 'MSG_ID'),
        );

        $allowed_priority = array(
            self::priority_high   => __('high', 'event_espresso'),
            self::priority_medium => __('medium', 'event_espresso'),
            self::priority_low    => __('low', 'event_espresso'),
        );

        $this->_fields          = array(
            'Message' => array(
                'MSG_ID'             => new EE_Primary_Key_Int_Field('MSG_ID', __('Message ID', 'event_espresso')),
                'MSG_token'          => new EE_Plain_Text_Field('MSG_token',
                    __('Unique Token used to represent this row in publicly viewable contexts (eg. a url).',
                        'event_espresso'), false, EEH_URL::generate_unique_token()),
                'GRP_ID'             => new EE_Foreign_Key_Int_Field('GRP_ID',
                    __('Foreign key to the EEM_Message_Template_Group table.', 'event_espresso'), true, 0,
                    'Message_Template_Group'),
                'TXN_ID'             => new EE_Foreign_Key_Int_Field('TXN_ID',
                    __('Foreign key to the related EE_Transaction.  This is required to give context for regenerating the specific message',
                        'event_espresso'), true, 0, 'Transaction'),
                'MSG_messenger'      => new EE_Plain_Text_Field('MSG_messenger',
                    __('Corresponds to the EE_messenger::name used to send this message. This will also be used to attempt any resending of the message.',
                        'event_espresso'), false, 'email'),
                'MSG_message_type'   => new EE_Plain_Text_Field('MSG_message_type',
                    __('Corresponds to the EE_message_type::name used to generate this message.', 'event_espresso'),
                    false, 'receipt'),
                'MSG_context'        => new EE_Plain_Text_Field('MSG_context', __('Context', 'event_espresso'), false),
                'MSG_recipient_ID'   => new EE_Foreign_Key_Int_Field('MSG_recipient_ID',
                    __('Recipient ID', 'event_espresso'), true, null, array('Registration', 'Attendee', 'WP_User')),
                'MSG_recipient_type' => new EE_Any_Foreign_Model_Name_Field('MSG_recipient_type',
                    __('Recipient Type', 'event_espresso'), true, null, array('Registration', 'Attendee', 'WP_User')),
                'MSG_content'        => new EE_Maybe_Serialized_Text_Field('MSG_content',
                    __('Content', 'event_espresso'), true, ''),
                'MSG_to'             => new EE_Maybe_Serialized_Text_Field('MSG_to', __('Address To', 'event_espresso'),
                    true),
                'MSG_from'           => new EE_Maybe_Serialized_Text_Field('MSG_from',
                    __('Address From', 'event_espresso'), true),
                'MSG_subject'        => new EE_Maybe_Serialized_Text_Field('MSG_subject',
                    __('Subject', 'event_espresso'), true, ''),
                'MSG_priority'       => new EE_Enum_Integer_Field('MSG_priority', __('Priority', 'event_espresso'),
                    false, self::priority_low, $allowed_priority),
                'STS_ID'             => new EE_Foreign_Key_String_Field('STS_ID', __('Status', 'event_espresso'), false,
                    self::status_incomplete, 'Status'),
                'MSG_created'        => new EE_Datetime_Field('MSG_created', __('Created', 'event_espresso'), false,
                    EE_Datetime_Field::now),
                'MSG_modified'       => new EE_Datetime_Field('MSG_modified', __('Modified', 'event_espresso'), true,
                    EE_Datetime_Field::now),
            ),
        );
        $this->_model_relations = array(
            'Attendee'               => new EE_Belongs_To_Any_Relation(),
            'Registration'           => new EE_Belongs_To_Any_Relation(),
            'WP_User'                => new EE_Belongs_To_Any_Relation(),
            'Message_Template_Group' => new EE_Belongs_To_Relation(),
            'Transaction'            => new EE_Belongs_To_Relation(),
        );
        parent::__construct($timezone);
    }


    /**
     * @return \EE_Message
     */
    public function create_default_object()
    {
        /** @type EE_Message $message */
        $message = parent::create_default_object();
        if ($message instanceof EE_Message) {
            return EE_Message_Factory::set_messenger_and_message_type($message);
        }
        return null;
    }


    /**
     * @param mixed $cols_n_values
     * @return \EE_Message
     */
    public function instantiate_class_from_array_or_object($cols_n_values)
    {
        /** @type EE_Message $message */
        $message = parent::instantiate_class_from_array_or_object($cols_n_values);
        if ($message instanceof EE_Message) {
            return EE_Message_Factory::set_messenger_and_message_type($message);
        }
        return null;
    }


    /**
     * Returns whether or not a message of that type was sent for a given attendee.
     *
     * @param EE_Attendee|int $attendee
     * @param string          $message_type the message type slug
     * @return boolean
     */
    public function message_sent_for_attendee($attendee, $message_type)
    {
        $attendee_ID = EEM_Attendee::instance()->ensure_is_ID($attendee);
        return $this->exists(array(
            array(
                'Attendee.ATT_ID'  => $attendee_ID,
                'MSG_message_type' => $message_type,
                'STS_ID'           => array('IN', $this->stati_indicating_sent()),
            ),
        ));
    }


    /**
     * Returns whether or not a message of that type was sent for a given registration
     *
     * @param EE_Registration|int $registration
     * @param string              $message_type the message type slug
     * @return boolean
     */
    public function message_sent_for_registration($registration, $message_type)
    {
        $registrationID = EEM_Registration::instance()->ensure_is_ID($registration);
        return $this->exists(array(
            array(
                'Registration.REG_ID' => $registrationID,
                'MSG_message_type'    => $message_type,
                'STS_ID'              => array('IN', $this->stati_indicating_sent()),
            ),
        ));
    }


    /**
     * This retrieves an EE_Message object from the db matching the given token string.
     *
     * @param string $token
     * @return EE_Message
     */
    public function get_one_by_token($token)
    {
        return $this->get_one(array(
            array(
                'MSG_token' => $token,
            ),
        ));
    }


    /**
     * Returns stati that indicate the message HAS been sent
     *
     * @return array of strings for possible stati
     */
    public function stati_indicating_sent()
    {
        return apply_filters('FHEE__EEM_Message__stati_indicating_sent', array(self::status_sent));
    }


    /**
     * Returns stati that indicate the message is waiting to be sent.
     *
     * @return array of strings for possible stati.
     */
    public function stati_indicating_to_send()
    {
        return apply_filters('FHEE__EEM_Message__stati_indicating_to_send',
            array(self::status_idle, self::status_resend));
    }


    /**
     * Returns stati that indicate the message has failed sending
     *
     * @return array  array of strings for possible stati.
     */
    public function stati_indicating_failed_sending()
    {
        $failed_stati = array(
            self::status_failed,
            self::status_retry,
            self::status_messenger_executing,
        );
        //if WP_DEBUG is set, then let's include debug_only fails
        if (WP_DEBUG) {
            $failed_stati[] = self::status_debug_only;
        }
        return apply_filters('FHEE__EEM_Message__stati_indicating_failed_sending', $failed_stati);
    }


    /**
     * Returns filterable array of all EEM_Message statuses.
     *
     * @return array
     */
    public function all_statuses()
    {
        return apply_filters(
            'FHEE__EEM_Message__all_statuses',
            array(
                EEM_Message::status_sent,
                EEM_Message::status_incomplete,
                EEM_Message::status_idle,
                EEM_Message::status_resend,
                EEM_Message::status_retry,
                EEM_Message::status_failed,
                EEM_Message::status_messenger_executing,
                EEM_Message::status_debug_only,
            )
        );
    }

    /**
     * Detects any specific query variables in the request and uses those to setup appropriate
     * filter for any queries.
     *
     * @return array
     */
    public function filter_by_query_params()
    {
        // expected possible query_vars, the key in this array matches an expected key in the request,
        // the value, matches the corresponding EEM_Base child reference.
        $expected_vars   = $this->_expected_vars_for_query_inject();
        $query_params[0] = array();
        foreach ($expected_vars as $request_key => $model_name) {
            $request_value = EE_Registry::instance()->REQ->get($request_key);
            if ($request_value) {
                //special case
                switch ($request_key) {
                    case '_REG_ID' :
                        $query_params[0]['AND**filter_by']['OR**filter_by_REG_ID'] = array(
                            'Transaction.Registration.REG_ID' => $request_value,
                        );
                        break;
                    case 'EVT_ID' :
                        $query_params[0]['AND**filter_by']['OR**filter_by_EVT_ID'] = array(
                            'Transaction.Registration.EVT_ID' => $request_value,
                        );
                        break;
                    default :
                        $query_params[0]['AND**filter_by']['OR**filter_by_' . $request_key][$model_name . '.' . $request_key] = $request_value;
                        break;
                }
            }
        }
        return $query_params;
    }


    /**
     * @return string
     */
    public function get_pretty_label_for_results()
    {
        $expected_vars = $this->_expected_vars_for_query_inject();
        $pretty_label  = '';
        $label_parts   = array();
        foreach ($expected_vars as $request_key => $model_name) {
            $model = EE_Registry::instance()->load_model($model_name);
            if ($model_field_value = EE_Registry::instance()->REQ->get($request_key)) {
                switch ($request_key) {
                    case '_REG_ID' :
                        $label_parts[] = sprintf(
                            esc_html__('Registration with the ID: %s', 'event_espresso'),
                            $model_field_value
                        );
                        break;
                    case 'ATT_ID' :
                        /** @var EE_Attendee $attendee */
                        $attendee      = $model->get_one_by_ID($model_field_value);
                        $label_parts[] = $attendee instanceof EE_Attendee
                            ? sprintf(esc_html__('Attendee %s', 'event_espresso'), $attendee->full_name())
                            : sprintf(esc_html__('Attendee ID: %s', 'event_espresso'), $model_field_value);
                        break;
                    case 'ID' :
                        /** @var EE_WP_User $wpUser */
                        $wpUser        = $model->get_one_by_ID($model_field_value);
                        $label_parts[] = $wpUser instanceof EE_WP_User
                            ? sprintf(esc_html__('WP User: %s', 'event_espresso'), $wpUser->name())
                            : sprintf(esc_html__('WP User ID: %s', 'event_espresso'), $model_field_value);
                        break;
                    case 'TXN_ID' :
                        $label_parts[] = sprintf(
                            esc_html__('Transaction with the ID: %s', 'event_espresso'),
                            $model_field_value
                        );
                        break;
                    case 'EVT_ID' :
                        /** @var EE_Event $Event */
                        $Event         = $model->get_one_by_ID($model_field_value);
                        $label_parts[] = $Event instanceof EE_Event
                            ? sprintf(esc_html__('for the Event: %s', 'event_espresso'), $Event->name())
                            : sprintf(esc_html__('for the Event with ID: %s', 'event_espresso'), $model_field_value);
                        break;
                }
            }
        }

        if ($label_parts) {

            //prepend to the last element of $label_parts an "and".
            if (count($label_parts) > 1) {
                $label_parts_index_to_prepend               = count($label_parts) - 1;
                $label_parts[$label_parts_index_to_prepend] = 'and' . $label_parts[$label_parts_index_to_prepend];
            }

            $pretty_label .= sprintf(
                esc_html_x(
                    'Showing messages for %s',
                    'A label for the messages returned in a query that are filtered by items in the query. This could be Transaction, Event, Attendee, Registration, or WP_User.',
                    'event_espresso'
                ),
                implode(', ', $label_parts)
            );
        }
        return $pretty_label;
    }


    /**
     * This returns the array of expected variables for the EEI_Query_Filter methods being implemented
     * The array is in the format:
     * array(
     *  {$field_name} => {$model_name}
     * );
     *
     * @since 4.9.0
     * @return array
     */
    protected function _expected_vars_for_query_inject()
    {
        return array(
            '_REG_ID' => 'Registration',
            'ATT_ID'  => 'Attendee',
            'ID'      => 'WP_User',
            'TXN_ID'  => 'Transaction',
            'EVT_ID'  => 'Event',
        );
    }


    /**
     * This returns whether EEM_Message is in debug mode or not.
     * Currently "debug mode" is used to control the handling of the EEM_Message::debug_only status when
     * generating/sending messages. Debug mode can be set by either:
     * 1. Sending in a value for the $set_debug argument
     * 2. Defining `EE_DEBUG_MESSAGES` constant in wp-config.php
     * 3. Overriding the above via the provided filter.
     *
     * @param bool|null $set_debug      If provided, then the debug mode will be set internally until reset via the
     *                                  provided boolean. When no argument is provided (default null) then the debug
     *                                  mode will be returned.
     * @return bool         true means Messages is in debug mode.  false means messages system is not in debug mode.
     */
    public static function debug($set_debug = null)
    {
        static $is_debugging = null;

        //initialize (use constant if set).
        if (is_null($set_debug) && is_null($is_debugging)) {
            $is_debugging = defined('EE_DEBUG_MESSAGES') && EE_DEBUG_MESSAGES;
        }

        if ( ! is_null($set_debug)) {
            $is_debugging = filter_var($set_debug, FILTER_VALIDATE_BOOLEAN);
        }

        //return filtered value
        return apply_filters('FHEE__EEM_Message__debug', $is_debugging);
    }


    /**
     * Deletes old messages meeting certain criteria for removal from the database.
     * By default, this will delete messages that:
     * - are older than the value of the delete_threshold in months.
     * - have a STS_ID other than EEM_Message::status_idle
     *
     * @param int $delete_threshold  This integer will be used to set the boundary for what messages are deleted in months.
     * @return bool|false|int Either the number of records affected or false if there was an error (you can call
     *                         $wpdb->last_error to find out what the error was.
     */
    public function delete_old_messages($delete_threshold = 6)
    {
        $number_deleted = 0;
        /**
         * Allows code to change the boundary for what messages are kept.
         * Uses the value of the `delete_threshold` variable by default.
         *
         * @param int $seconds seconds that will be subtracted from the timestamp for now.
         * @return int
         */
        $time_to_leave_alone = absint(
            apply_filters(
                'FHEE__EEM_Message__delete_old_messages__time_to_leave_alone',
                ((int) $delete_threshold) * MONTH_IN_SECONDS
            )
        );


        /**
         * Allows code to change what message stati are ignored when deleting.
         * Defaults to only ignore EEM_Message::status_idle messages.
         *
         * @param string $message_stati_to_keep  An array of message statuses that will be ignored when deleting.
         */
        $message_stati_to_keep = (array) apply_filters(
            'FHEE__EEM_Message__delete_old_messages__message_stati_to_keep',
            array(
                EEM_Message::status_idle
            )
        );

        //first get all the ids of messages being deleted
        $message_ids_to_delete = EEM_Message::instance()->get_col(
            array(
                0 => array(
                    'STS_ID' => array('NOT_IN', $message_stati_to_keep),
                    'MSG_modified' => array('<', time() - $time_to_leave_alone)
                )
            )
        );

        if(! empty($message_ids_to_delete) && is_array($message_ids_to_delete)) {
            global $wpdb;
            $number_deleted = $wpdb->query('
                DELETE
                FROM ' . $this->table() . '
                WHERE
                    MSG_ID IN (' . implode(",", $message_ids_to_delete) . ')
            ');
        }

        /**
         * This will get called if the number of records deleted 0 or greater.  So a successful deletion is one where
         * there were no errors.  An unsuccessful deletion is where there were errors.  Keep that in mind for the actions
         * below.
         */
        if ($number_deleted !== false) {
            do_action('AHEE__EEM_Message__delete_old_messages__after_successful_deletion', $message_ids_to_delete, $number_deleted);
        } else {
            do_action('AHEE__EEM_Message__delete_old_messages__after_deletion_fail', $message_ids_to_delete, $number_deleted);
        }
        return $number_deleted;
    }

}
// End of file EEM_Message.model.php
// Location: /includes/models/EEM_Message.model.php
