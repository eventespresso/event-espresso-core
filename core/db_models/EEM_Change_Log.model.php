<?php

defined('EVENT_ESPRESSO_VERSION') || exit('No direct access allowed');

/**
 * EEM_Change_Log
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 * ------------------------------------------------------------------------
 */
class EEM_Change_Log extends EEM_Base
{

    /**
     * the related object was created log type
     */
    const type_create = 'create';
    /**
     * the related object was updated (changed, or soft-deleted)
     */
    const type_update = 'update';
    /**
     * the related object was deleted permanently
     */
    const type_delete = 'delete';
    /**
     * the related item had something worth noting happen on it, but
     * only for the purposes of debugging problems
     */
    const type_debug = 'debug';
    /**
     * the related item had an error occur on it
     */
    const type_error = 'error';
    /**
     * the related item is regarding some gateway interaction, like an IPN
     * or request to process a payment
     */
    const type_gateway = 'gateway';

    /**
     * private instance of the EEM_Change_Log object
     *
     * @access private
     * @var EEM_Change_Log $_instance
     */
    protected static $_instance = null;


    /**
     * constructor
     *
     * @access protected
     * @param null $timezone
     * @throws EE_Error
     */
    protected function __construct($timezone = null)
    {
        global $current_user;
        $this->singular_item       = esc_html__('Log', 'event_espresso');
        $this->plural_item         = esc_html__('Logs', 'event_espresso');
        $this->_tables             = array(
            'Log' => new EE_Primary_Table('esp_log', 'LOG_ID'),
        );
        $models_this_can_attach_to = array_keys(EE_Registry::instance()->non_abstract_db_models);
        $this->_fields             = array(
            'Log' => array(
                'LOG_ID'      => new EE_Primary_Key_Int_Field('LOG_ID', esc_html__('Log ID', 'event_espresso')),
                'LOG_time'    => new EE_Datetime_Field(
                    'LOG_time',
                    esc_html__("Log Time", 'event_espresso'),
                    false,
                    EE_Datetime_Field::now
                ),
                'OBJ_ID'      => new EE_Foreign_Key_String_Field(
                    'OBJ_ID',
                    esc_html__("Object ID (int or string)", 'event_espresso'),
                    true,
                    null,
                    $models_this_can_attach_to
                ),
                'OBJ_type'    => new EE_Any_Foreign_Model_Name_Field(
                    'OBJ_type',
                    esc_html__("Object Type", 'event_espresso'),
                    true,
                    null,
                    $models_this_can_attach_to
                ),
                'LOG_type'    => new EE_Plain_Text_Field(
                    'LOG_type',
                    esc_html__("Type of log entry", "event_espresso"),
                    false,
                    self::type_debug
                ),
                'LOG_message' => new EE_Maybe_Serialized_Text_Field(
                    'LOG_message',
                    esc_html__("Log Message (body)", 'event_espresso'),
                    true
                ),
                /*
                 * Note: when querying for a change log's user, the OBJ_ID and OBJ_type fields are used,
                 * not the LOG_wp_user field. E.g.,
                 * `EEM_Change_Log::instance()->get_all(array(array('WP_User.ID'=>1)))` will actually return
                 * all log rows where OBJ_ID=1 and OBJ_type=WP_User, NOT log rows where LOG_wp_user=1.
                 * I.e. it's returning all log entries which affected user 1, not all log entries done by user 1.
                 *  If you want the latter, you can't use the model's magic joining. E.g, you would need to do
                 * `EEM_Change_Log::instance()->get_all(array(array('LOG_wp_user' => 1)))`.
                 */
                'LOG_wp_user' => new EE_WP_User_Field(
                    'LOG_wp_user',
                    esc_html__("User who was logged in while this occurred", 'event_espresso'),
                    true
                ),
            ),
        );
        $this->_model_relations    = array();
        foreach ($models_this_can_attach_to as $model) {
            if ($model != 'Change_Log') {
                $this->_model_relations[$model] = new EE_Belongs_To_Any_Relation();
            }
        }
        //use completely custom caps for this
        $this->_cap_restriction_generators = false;
        //caps-wise this is all-or-nothing: if you have the default role you can access anything, otherwise nothing
        foreach ($this->_cap_contexts_to_cap_action_map as $cap_context => $action) {
            $this->_cap_restrictions[$cap_context][EE_Restriction_Generator_Base::get_default_restrictions_cap()]
                = new EE_Return_None_Where_Conditions();
        }
        parent::__construct($timezone);
    }

    /**
     * @param string        $log_type !see the acceptable values of LOG_type in EEM__Change_Log::__construct
     * @param mixed         $message  array|string of the message you want to record
     * @param EE_Base_Class $related_model_obj
     * @return EE_Change_Log
     * @throws EE_Error
     */
    public function log($log_type, $message, $related_model_obj)
    {
        if ($related_model_obj instanceof EE_Base_Class) {
            $obj_id   = $related_model_obj->ID();
            $obj_type = $related_model_obj->get_model()->get_this_model_name();
        } else {
            $obj_id   = null;
            $obj_type = null;
        }
        /** @var EE_Change_Log $log */
        $log = EE_Change_Log::new_instance(array(
            'LOG_type'    => $log_type,
            'LOG_message' => $message,
            'OBJ_ID'      => $obj_id,
            'OBJ_type'    => $obj_type,
        ));
        $log->save();
        return $log;
    }


    /**
     * Adds a gateway log for the specified object, given its ID and type
     *
     * @param string $message
     * @param mixed  $related_obj_id
     * @param string $related_obj_type
     * @throws EE_Error
     * @return EE_Change_Log
     */
    public function gateway_log($message, $related_obj_id, $related_obj_type)
    {
        if (! EE_Registry::instance()->is_model_name($related_obj_type)) {
            throw new EE_Error(
                sprintf(
                    esc_html__(
                        "'%s' is not a model name. A model name must be provided when making a gateway log. Eg, 'Payment', 'Payment_Method', etc",
                        "event_espresso"
                    ),
                    $related_obj_type
                )
            );
        }
        /** @var EE_Change_Log $log */
        $log = EE_Change_Log::new_instance(array(
            'LOG_type'    => EEM_Change_Log::type_gateway,
            'LOG_message' => $message,
            'OBJ_ID'      => $related_obj_id,
            'OBJ_type'    => $related_obj_type,
        ));
        $log->save();
        return $log;
    }


    /**
     * Just gets the bare-bones wpdb results as an array in cases where efficiency is essential
     *
     * @param array $query_params @see EEM_Base::get_all
     * @return array of arrays
     * @throws EE_Error
     */
    public function get_all_efficiently($query_params)
    {
        return $this->_get_all_wpdb_results($query_params);
    }


    /**
     * Executes a database query to delete gateway logs. Does not affect model objects, so if you attempt to use
     * models after this, they may be out-of-sync with the database
     *
     * @param DateTime $datetime
     * @return false|int
     * @throws EE_Error
     */
    public function delete_gateway_logs_older_than(DateTime $datetime)
    {
        global $wpdb;
        return $wpdb->query(
            $wpdb->prepare(
                'DELETE FROM ' . $this->table() . ' WHERE LOG_type = %s AND LOG_time < %s',
                EEM_Change_Log::type_gateway,
                $datetime->format(EE_Datetime_Field::mysql_timestamp_format)
            )
        );
    }


    /**
     * Returns the map of type to pretty label for identifiers used for `LOG_type`.  Client code can register their own
     * map vai the given filter.
     *
     * @return array
     */
    public static function get_pretty_label_map_for_registered_types()
    {
        return apply_filters(
            'FHEE__EEM_Change_Log__get_pretty_label_map_for_registered_types',
            array(
                self::type_create=>  esc_html__("Create", "event_espresso"),
                self::type_update=>  esc_html__("Update", "event_espresso"),
                self::type_delete => esc_html__("Delete", "event_espresso"),
                self::type_debug=>  esc_html__("Debug", "event_espresso"),
                self::type_error=>  esc_html__("Error", "event_espresso"),
                self::type_gateway=> esc_html__("Gateway Interaction (IPN or Direct Payment)", 'event_espresso')
            )
        );
    }


    /**
     * Return the pretty (localized) label for the given log type identifier.
     * @param string $type_identifier
     * @return string
     */
    public static function get_pretty_label_for_type($type_identifier)
    {
        $type_identifier_map = self::get_pretty_label_map_for_registered_types();
        //we fallback to the incoming type identifier if there is no localized label for it.
        return isset($type_identifier_map[$type_identifier])
            ? $type_identifier_map[$type_identifier]
            : $type_identifier;
    }
}
