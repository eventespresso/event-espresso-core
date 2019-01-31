<?php
use EventEspresso\core\services\loaders\Loader;
use EventEspresso\core\services\orm\ModelFieldFactory;

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
     * QST_system for questions are strings not integers now,
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
    const system_question_fname = 'fname';

    const system_question_lname = 'lname';

    const system_question_email = 'email';

    const system_question_address = 'address';

    const system_question_address2 = 'address2';

    const system_question_city = 'city';

    const system_question_state = 'state';

    const system_question_country = 'country';

    const system_question_zip = 'zip';

    const system_question_phone = 'phone';

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
     * EEM_Attendee constructor.
     *
     * @param null              $timezone
     * @param ModelFieldFactory $model_field_factory
     * @throws EE_Error
     * @throws InvalidArgumentException
     */
    protected function __construct($timezone = null, ModelFieldFactory $model_field_factory)
    {
        $this->singular_item = esc_html__('Attendee', 'event_espresso');
        $this->plural_item = esc_html__('Attendees', 'event_espresso');
        $this->_tables = array(
            'Attendee_CPT'  => new EE_Primary_Table('posts', 'ID'),
            'Attendee_Meta' => new EE_Secondary_Table(
                'esp_attendee_meta',
                'ATTM_ID',
                'ATT_ID'
            ),
        );
        $this->_fields = array(
            'Attendee_CPT'  => array(
                'ATT_ID'        => $model_field_factory->createPrimaryKeyIntField(
                    'ID',
                    esc_html__('Attendee ID', 'event_espresso')
                ),
                'ATT_full_name' => $model_field_factory->createPlainTextField(
                    'post_title',
                    esc_html__('Attendee Full Name', 'event_espresso'),
                    false,
                    esc_html__('Unknown', 'event_espresso')
                ),
                'ATT_bio'       => $model_field_factory->createPostContentField(
                    'post_content',
                    esc_html__('Attendee Biography', 'event_espresso'),
                    false,
                    esc_html__('No Biography Provided', 'event_espresso')
                ),
                'ATT_slug'      => $model_field_factory->createSlugField(
                    'post_name',
                    esc_html__('Attendee URL Slug', 'event_espresso')
                ),
                'ATT_created'   => $model_field_factory->createDatetimeField(
                    'post_date',
                    esc_html__('Time Attendee Created', 'event_espresso')
                ),
                'ATT_short_bio' => $model_field_factory->createSimpleHtmlField(
                    'post_excerpt',
                    esc_html__('Attendee Short Biography', 'event_espresso'),
                    true,
                    esc_html__('No Biography Provided', 'event_espresso')
                ),
                'ATT_modified'  => $model_field_factory->createDatetimeField(
                    'post_modified',
                    esc_html__('Time Attendee Last Modified', 'event_espresso')
                ),
                'ATT_author'    => $model_field_factory->createWpUserField(
                    'post_author',
                    esc_html__('Creator ID of the first Event attended', 'event_espresso'),
                    false
                ),
                'ATT_parent'    => $model_field_factory->createDbOnlyIntField(
                    'post_parent',
                    esc_html__('Parent Attendee (unused)', 'event_espresso'),
                    false,
                    0
                ),
                'post_type'     => $model_field_factory->createWpPostTypeField('espresso_attendees'),
                'status'        => $model_field_factory->createWpPostStatusField(
                    'post_status',
                    esc_html__('Attendee Status', 'event_espresso'),
                    false,
                    'publish'
                ),
                'password' => new EE_Password_Field(
                    'post_password',
                    __('Password', 'event_espresso'),
                    false,
                    '',
                    array(
                        'ATT_bio',
                        'ATT_short_bio',
                        'ATT_address',
                        'ATT_address2',
                        'ATT_city',
                        'STA_ID',
                        'CNT_ISO',
                        'ATT_zip',
                        'ATT_email',
                        'ATT_phone'
                    )
                )
            ),
            'Attendee_Meta' => array(
                'ATTM_ID'      => $model_field_factory->createDbOnlyIntField(
                    'ATTM_ID',
                    esc_html__('Attendee Meta Row ID', 'event_espresso'),
                    false
                ),
                'ATT_ID_fk'    => $model_field_factory->createDbOnlyIntField(
                    'ATT_ID',
                    esc_html__('Foreign Key to Attendee in Post Table', 'event_espresso'),
                    false
                ),
                'ATT_fname'    => $model_field_factory->createPlainTextField(
                    'ATT_fname',
                    esc_html__('First Name', 'event_espresso')
                ),
                'ATT_lname'    => $model_field_factory->createPlainTextField(
                    'ATT_lname',
                    esc_html__('Last Name', 'event_espresso')
                ),
                'ATT_address'  => $model_field_factory->createPlainTextField(
                    'ATT_address',
                    esc_html__('Address Part 1', 'event_espresso')
                ),
                'ATT_address2' => $model_field_factory->createPlainTextField(
                    'ATT_address2',
                    esc_html__('Address Part 2', 'event_espresso')
                ),
                'ATT_city'     => $model_field_factory->createPlainTextField(
                    'ATT_city',
                    esc_html__('City', 'event_espresso')
                ),
                'STA_ID'       => $model_field_factory->createForeignKeyIntField(
                    'STA_ID',
                    esc_html__('State', 'event_espresso'),
                    true,
                    0,
                    'State'
                ),
                'CNT_ISO'      => $model_field_factory->createForeignKeyStringField(
                    'CNT_ISO',
                    esc_html__('Country', 'event_espresso'),
                    true,
                    '',
                    'Country'
                ),
                'ATT_zip'      => $model_field_factory->createPlainTextField(
                    'ATT_zip',
                    esc_html__('ZIP/Postal Code', 'event_espresso')
                ),
                'ATT_email'    => $model_field_factory->createEmailField(
                    'ATT_email',
                    esc_html__('Email Address', 'event_espresso')
                ),
                'ATT_phone'    => $model_field_factory->createPlainTextField(
                    'ATT_phone',
                    esc_html__('Phone', 'event_espresso')
                ),
            ),
        );
        $this->_model_relations = array(
            'Registration'      => new EE_Has_Many_Relation(),
            'State'             => new EE_Belongs_To_Relation(),
            'Country'           => new EE_Belongs_To_Relation(),
            'Event'             => new EE_HABTM_Relation('Registration', false),
            'WP_User'           => new EE_Belongs_To_Relation(),
            'Message'           => new EE_Has_Many_Any_Relation(false),
            // allow deletion of attendees even if they have messages in the queue for them.
            'Term_Relationship' => new EE_Has_Many_Relation(),
            'Term_Taxonomy'     => new EE_HABTM_Relation('Term_Relationship'),
        );
        $this->_caps_slug = 'contacts';
        $this->model_chain_to_password = '';
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
        return isset($this->_system_question_to_attendee_field_name[ $system_question_string ])
            ? $this->_system_question_to_attendee_field_name[ $system_question_string ]
            : null;
    }



    /**
     * Gets mapping from esp_question.QST_system values to their corresponding attendee field names
     *
     * @return array
     */
    public function system_question_to_attendee_field_mapping()
    {
        return $this->_system_question_to_attendee_field_name;
    }



    /**
     * Gets all the attendees for a transaction (by using the esp_registration as a join table)
     *
     * @param EE_Transaction /int $transaction_id_or_obj EE_Transaction or its ID
     * @return EE_Attendee[]|EE_Base_Class[]
     * @throws EE_Error
     */
    public function get_attendees_for_transaction($transaction_id_or_obj)
    {
        return $this->get_all(
            array(
                array(
                    'Registration.Transaction.TXN_ID' => $transaction_id_or_obj instanceof EE_Transaction
                        ? $transaction_id_or_obj->ID()
                        : $transaction_id_or_obj,
                ),
            )
        );
    }



    /**
     * retrieve  a single attendee from db via their ID
     *
     * @param $ATT_ID
     * @return mixed array on success, FALSE on fail
     * @deprecated
     */
    public function get_attendee_by_ID($ATT_ID = false)
    {
        // retrieve a particular EE_Attendee
        return $this->get_one_by_ID($ATT_ID);
    }



    /**
     * retrieve  a single attendee from db via their ID
     *
     * @param array $where_cols_n_values
     * @return mixed array on success, FALSE on fail
     * @throws EE_Error
     */
    public function get_attendee($where_cols_n_values = array())
    {
        if (empty($where_cols_n_values)) {
            return false;
        }
        $attendee = $this->get_all(array($where_cols_n_values));
        if (! empty($attendee)) {
            return array_shift($attendee);
        }
        return false;
    }



    /**
     * Search for an existing Attendee record in the DB
     *
     * @param array $where_cols_n_values
     * @return bool|mixed
     * @throws EE_Error
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
        $where_cols_n_values = is_array($where_cols_n_values) && ! empty($where_cols_n_values)
            ? $where_cols_n_values
            : $attendee_data_keys;
        $valid_data = true;
        // check for required values
        $valid_data = isset($where_cols_n_values['ATT_fname']) && ! empty($where_cols_n_values['ATT_fname'])
            ? $valid_data
            : false;
        $valid_data = isset($where_cols_n_values['ATT_lname']) && ! empty($where_cols_n_values['ATT_lname'])
            ? $valid_data
            : false;
        $valid_data = isset($where_cols_n_values['ATT_email']) && ! empty($where_cols_n_values['ATT_email'])
            ? $valid_data
            : false;
        if ($valid_data) {
            $attendee = $this->get_attendee($where_cols_n_values);
            if ($attendee instanceof EE_Attendee) {
                return $attendee;
            }
        }
        return false;
    }



    /**
     * Takes an incoming array of EE_Registration ids
     * and sends back a list of corresponding non duplicate EE_Attendee objects.
     *
     * @since  4.3.0
     * @param  array $ids array of EE_Registration ids
     * @return EE_Attendee[]|EE_Base_Class[]
     * @throws EE_Error
     */
    public function get_array_of_contacts_from_reg_ids($ids)
    {
        $ids = (array) $ids;
        $_where = array(
            'Registration.REG_ID' => array('in', $ids),
        );
        return $this->get_all(array($_where));
    }
}
