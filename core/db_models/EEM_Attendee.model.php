<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}
require_once(EE_MODELS . 'EEM_Base.model.php');



/**
 * Attendee Model
 *
 * @package               Event Espresso
 * @subpackage            includes/models/
 * @author                Mike Nelson, Brent Christensen
 */
class EEM_Attendee extends EEM_CPT_Base
{

    // private instance of the Attendee object
    protected static $_instance = null;

    /**
     * QST_system for questions are strings not ints now,
     * so these constants are deprecated.
     * Please instead use the EEM_Attendee::system_question_* constants
     *
     * @deprecated
     */
    const fname_question_id = 1;

    /**
     * @deprecated
     */
    const lname_question_id = 2;


    /**
     * @deprecated
     */
    const email_question_id = 3;


    /**
     * @deprecated
     */
    const address_question_id = 4;


    /**
     * @deprecated
     */
    const address2_question_id = 5;


    /**
     * @deprecated
     */
    const city_question_id = 6;


    /**
     * @deprecated
     */
    const state_question_id = 7;


    /**
     * @deprecated
     */
    const country_question_id = 8;


    /**
     * @deprecated
     */
    const zip_question_id = 9;


    /**
     * @deprecated
     */
    const phone_question_id = 10;

    /**
     * When looking for questions that correspond to attendee fields,
     * look for the question with this QST_system value.
     * These replace the old constants like EEM_Attendee::*_question_id
     */
    const system_question_fname    = 'fname';

    const system_question_lname    = 'lname';

    const system_question_email    = 'email';

    const system_question_address  = 'address';

    const system_question_address2 = 'address2';

    const system_question_city     = 'city';

    const system_question_state    = 'state';

    const system_question_country  = 'country';

    const system_question_zip      = 'zip';

    const system_question_phone    = 'phone';

    /**
     * Keys are all the EEM_Attendee::system_question_* constants, which are
     * also all the values of QST_system in the questions table, and values
     * are their corresponding Attendee field names
     *
     * @var array
     */
    protected $_system_question_to_attendee_field_name = array(
        EEM_Attendee::system_question_fname    => 'ATT_fname',
        EEM_Attendee::system_question_lname    => 'ATT_lname',
        EEM_Attendee::system_question_email    => 'ATT_email',
        EEM_Attendee::system_question_address  => 'ATT_address',
        EEM_Attendee::system_question_address2 => 'ATT_address2',
        EEM_Attendee::system_question_city     => 'ATT_city',
        EEM_Attendee::system_question_state    => 'STA_ID',
        EEM_Attendee::system_question_country  => 'CNT_ISO',
        EEM_Attendee::system_question_zip      => 'ATT_zip',
        EEM_Attendee::system_question_phone    => 'ATT_phone',
    );



    /**
     *        private constructor to prevent direct creation
     *
     * @Constructor
     * @access protected
     * @param null $timezone
     */
    protected function __construct($timezone = null)
    {
        $this->singular_item = __('Attendee', 'event_espresso');
        $this->plural_item = __('Attendees', 'event_espresso');
        $this->_tables = array(
            'Attendee_CPT'  => new EE_Primary_Table('posts', 'ID'),
            'Attendee_Meta' => new EE_Secondary_Table('esp_attendee_meta', 'ATTM_ID', 'ATT_ID'),
        );
        $this->_fields = array(
            'Attendee_CPT'  => array(
                'ATT_ID'        => new EE_Primary_Key_Int_Field('ID', __("Attendee ID", "event_espresso")),
                'ATT_full_name' => new EE_Plain_Text_Field('post_title', __("Attendee Full Name", "event_espresso"),
                    false, __("Unknown", "event_espresso")),
                'ATT_bio'       => new EE_Post_Content_Field('post_content', __("Attendee Biography", "event_espresso"),
                    false, __("No Biography Provided", "event_espresso")),
                'ATT_slug'      => new EE_Slug_Field('post_name', __("Attendee URL Slug", "event_espresso"), false),
                'ATT_created'   => new EE_Datetime_Field('post_date', __("Time Attendee Created", "event_espresso"),
                    false, EE_Datetime_Field::now),
                'ATT_short_bio' => new EE_Simple_HTML_Field('post_excerpt',
                    __("Attendee Short Biography", "event_espresso"), true,
                    __("No Biography Provided", "event_espresso")),
                'ATT_modified'  => new EE_Datetime_Field('post_modified',
                    __("Time Attendee Last Modified", "event_espresso"), false, EE_Datetime_Field::now),
                'ATT_author'    => new EE_WP_User_Field('post_author',
                    __("Creator ID of the first Event attended", "event_espresso"), false),
                'ATT_parent'    => new EE_DB_Only_Int_Field('post_parent',
                    __("Parent Attendee (unused)", "event_espresso"), false, 0),
                'post_type'     => new EE_WP_Post_Type_Field('espresso_attendees'),
                // EE_DB_Only_Text_Field('post_type', __("Post Type of Attendee", "event_espresso"), false,'espresso_attendees'),
                'status'        => new EE_WP_Post_Status_Field('post_status', __('Attendee Status', 'event_espresso'),
                    false, 'publish'),
            ),
            'Attendee_Meta' => array(
                'ATTM_ID'      => new EE_DB_Only_Int_Field('ATTM_ID', __('Attendee Meta Row ID', 'event_espresso'),
                    false),
                'ATT_ID_fk'    => new EE_DB_Only_Int_Field('ATT_ID',
                    __("Foreign Key to Attendee in Post Table", "event_espresso"), false),
                'ATT_fname'    => new EE_Plain_Text_Field('ATT_fname', __('First Name', 'event_espresso'), true, ''),
                'ATT_lname'    => new EE_Plain_Text_Field('ATT_lname', __('Last Name', 'event_espresso'), true, ''),
                'ATT_address'  => new EE_Plain_Text_Field('ATT_address', __('Address Part 1', 'event_espresso'), true,
                    ''),
                'ATT_address2' => new EE_Plain_Text_Field('ATT_address2', __('Address Part 2', 'event_espresso'), true,
                    ''),
                'ATT_city'     => new EE_Plain_Text_Field('ATT_city', __('City', 'event_espresso'), true, ''),
                'STA_ID'       => new EE_Foreign_Key_Int_Field('STA_ID', __('State', 'event_espresso'), true, 0,
                    'State'),
                'CNT_ISO'      => new EE_Foreign_Key_String_Field('CNT_ISO', __('Country', 'event_espresso'), true, '',
                    'Country'),
                'ATT_zip'      => new EE_Plain_Text_Field('ATT_zip', __('ZIP/Postal Code', 'event_espresso'), true, ''),
                'ATT_email'    => new EE_Email_Field('ATT_email', __('Email Address', 'event_espresso'), true, ''),
                'ATT_phone'    => new EE_Plain_Text_Field('ATT_phone', __('Phone', 'event_espresso'), true, ''),
            ),
        );
        $this->_model_relations = array(
            'Registration'      => new EE_Has_Many_Relation(),
            'State'             => new EE_Belongs_To_Relation(),
            'Country'           => new EE_Belongs_To_Relation(),
            'Event'             => new EE_HABTM_Relation('Registration', false),
            'WP_User'           => new EE_Belongs_To_Relation(),
            'Message'           => new EE_Has_Many_Any_Relation(false),
            //allow deletion of attendees even if they have messages in the queue for them.
            'Term_Relationship' => new EE_Has_Many_Relation(),
            'Term_Taxonomy'     => new EE_HABTM_Relation('Term_Relationship'),
        );
        $this->_caps_slug = 'contacts';
        parent::__construct($timezone);
    }



    /**
     * Gets the name of the field on the attendee model corresponding to the system question string
     * which should be one of the keys from EEM_Attendee::_system_question_to_attendee_field_name
     *
     * @param string $system_question_string
     * @return string|null if not found
     */
    public function get_attendee_field_for_system_question($system_question_string)
    {
        return isset($this->_system_question_to_attendee_field_name[$system_question_string])
            ? $this->_system_question_to_attendee_field_name[$system_question_string] : null;
    }



    /**
     * Gets mapping from esp_question.QST_system values to their corresponding attendee field names
     * @return array
     */
    public function system_question_to_attendee_field_mapping(){
        return $this->_system_question_to_attendee_field_name;
    }



    /**
     * Gets all the attendees for a transaction (by using the esp_registration as a join table)
     *
     * @param EE_Transaction /int $transaction_id_or_obj EE_Transaction or its ID
     * @return EE_Attendee[]
     */
    public function get_attendees_for_transaction($transaction_id_or_obj)
    {
        return $this->get_all(array(
            array(
                'Registration.Transaction.TXN_ID' => $transaction_id_or_obj instanceof EE_Transaction
                    ? $transaction_id_or_obj->ID() : $transaction_id_or_obj,
            ),
        ));
    }



    /**
     *        retrieve  a single attendee from db via their ID
     *
     * @access        public
     * @param        $ATT_ID
     * @return        mixed        array on success, FALSE on fail
     * @deprecated
     */
    public function get_attendee_by_ID($ATT_ID = false)
    {
        // retrieve a particular EE_Attendee
        return $this->get_one_by_ID($ATT_ID);
    }



    /**
     *        retrieve  a single attendee from db via their ID
     *
     * @access        public
     * @param        array $where_cols_n_values
     * @return        mixed        array on success, FALSE on fail
     */
    public function get_attendee($where_cols_n_values = array())
    {
        if (empty($where_cols_n_values)) {
            return false;
        }
        $attendee = $this->get_all(array($where_cols_n_values));
        if ( ! empty($attendee)) {
            return array_shift($attendee);
        } else {
            return false;
        }
    }



    /**
     *        Search for an existing Attendee record in the DB
     *
     * @access        public
     * @param array $where_cols_n_values
     * @return bool|mixed
     */
    public function find_existing_attendee($where_cols_n_values = null)
    {
        // search by combo of first and last names plus the email address
        $attendee_data_keys = array(
            'ATT_fname' => $this->_ATT_fname,
            'ATT_lname' => $this->_ATT_lname,
            'ATT_email' => $this->_ATT_email,
        );
        // no search params means attendee object already exists.
        $where_cols_n_values = is_array($where_cols_n_values) && ! empty($where_cols_n_values) ? $where_cols_n_values
            : $attendee_data_keys;
        $valid_data = true;
        // check for required values
        $valid_data = isset($where_cols_n_values['ATT_fname']) && ! empty($where_cols_n_values['ATT_fname'])
            ? $valid_data : false;
        $valid_data = isset($where_cols_n_values['ATT_lname']) && ! empty($where_cols_n_values['ATT_lname'])
            ? $valid_data : false;
        $valid_data = isset($where_cols_n_values['ATT_email']) && ! empty($where_cols_n_values['ATT_email'])
            ? $valid_data : false;
        if ($valid_data) {
            $attendee = $this->get_attendee($where_cols_n_values);
            if ($attendee instanceof EE_Attendee) {
                return $attendee;
            }
        }
        return false;
    }



    /**
     * Takes an incoming array of EE_Registration ids and sends back a list of corresponding non duplicate
     * EE_Attendee objects.
     *
     * @since    4.3.0
     * @param  array $ids array of EE_Registration ids
     * @return  EE_Attendee[]
     */
    public function get_array_of_contacts_from_reg_ids($ids)
    {
        $ids = (array)$ids;
        $_where = array(
            'Registration.REG_ID' => array('in', $ids),
        );
        return $this->get_all(array($_where));
    }


}
// End of file EEM_Attendee.model.php
// Location: /ee-mvc/models/EEM_Attendee.model.php
