<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
require_once ( EE_MODELS . 'EEM_Base.model.php' );

/**
 *
 * Attendee Model
 *
 * @package			Event Espresso
 * @subpackage		includes/models/
 * @author				Mike Nelson, Brent Christensen
 */

class EEM_Attendee extends EEM_CPT_Base {

  	// private instance of the Attendee object
	protected static $_instance = NULL;

	/**
	 * QST_ID and QST_systems that relate to attendee attributes.
	 * NOTE: this will be deprecated if we remove system questions
	 */
	const fname_question_id=1;
	const lname_question_id=2;
	const email_question_id=3;
	const address_question_id=4;
	const address2_question_id=5;
	const city_question_id=6;
	const state_question_id=7;
	const country_question_id=8;
	const zip_question_id=9;
	const phone_question_id=10;



	/**
	 *        private constructor to prevent direct creation
	 *
	 * @Constructor
	 * @access protected
	 * @param null $timezone
	 */
	protected function __construct( $timezone = NULL ) {
		$this->singular_item = __('Attendee','event_espresso');
		$this->plural_item = __('Attendees','event_espresso');
		$this->_tables = array(
			'Attendee_CPT'=> new EE_Primary_Table('posts', 'ID'),
			'Attendee_Meta'=>new EE_Secondary_Table('esp_attendee_meta', 'ATTM_ID', 'ATT_ID')
		);
		$this->_fields = array(
			'Attendee_CPT'=>array(
				'ATT_ID'=>new EE_Primary_Key_Int_Field('ID', __("Attendee ID", "event_espresso")),
				'ATT_full_name'=>new EE_Plain_Text_Field('post_title', __("Attendee Full Name", "event_espresso"), false, __("Unknown", "event_espresso")),
				'ATT_bio'=>new EE_Post_Content_Field('post_content', __("Attendee Biography", "event_espresso"), false, __("No Biography Provided", "event_espresso")),
				'ATT_slug'=>new EE_Slug_Field('post_name', __("Attendee URL Slug", "event_espresso"), false),
				'ATT_created'=>new EE_Datetime_Field('post_date', __("Time Attendee Created", "event_espresso"), false, current_time('timestamp')),
				'ATT_short_bio'=>new EE_Simple_HTML_Field('post_excerpt', __("Attendee Short Biography", "event_espresso"), true, __("No Biography Provided", "event_espresso")),
				'ATT_modified'=>new EE_Datetime_Field('post_modified', __("Time Attendee Last Modified", "event_espresso"), FALSE, current_time('timestamp')),
				'ATT_author'=>new EE_WP_User_Field('post_author', __("Creator ID of the first Event attended", "event_espresso"), false ),
				'ATT_parent'=>new EE_DB_Only_Int_Field('post_parent', __("Parent Attendee (unused)", "event_espresso"), false, 0),
				'post_type'=>new EE_WP_Post_Type_Field('espresso_attendees'),// EE_DB_Only_Text_Field('post_type', __("Post Type of Attendee", "event_espresso"), false,'espresso_attendees'),
				'status' => new EE_WP_Post_Status_Field('post_status', __('Attendee Status', 'event_espresso'), false, 'publish')
			),
			'Attendee_Meta'=>array(
				'ATTM_ID'=> new EE_DB_Only_Int_Field('ATTM_ID', __('Attendee Meta Row ID','event_espresso'), false),
				'ATT_ID_fk'=>new EE_DB_Only_Int_Field('ATT_ID', __("Foreign Key to Attendee in Post Table", "event_espresso"), false),
				'ATT_fname'=>new EE_Plain_Text_Field('ATT_fname', __('First Name','event_espresso'), true, ''),
				'ATT_lname'=>new EE_Plain_Text_Field('ATT_lname', __('Last Name','event_espresso'), true, ''),
				'ATT_address'=>new EE_Plain_Text_Field('ATT_address', __('Address Part 1','event_espresso'), true, ''),
				'ATT_address2'=>new EE_Plain_Text_Field('ATT_address2', __('Address Part 2','event_espresso'), true, ''),
				'ATT_city'=>new EE_Plain_Text_Field('ATT_city', __('City','event_espresso'), true, ''),
				'STA_ID'=>new EE_Foreign_Key_Int_Field('STA_ID', __('State','event_espresso'), true,0,'State'),
				'CNT_ISO'=>new EE_Foreign_Key_String_Field('CNT_ISO', __('Country','event_espresso'), true,'','Country'),
				'ATT_zip'=>new EE_Plain_Text_Field('ATT_zip', __('ZIP/Postal Code','event_espresso'), true, ''),
				'ATT_email'=>new EE_Email_Field('ATT_email', __('Email Address','event_espresso'), true, ''),
				'ATT_phone'=>new EE_Plain_Text_Field('ATT_phone', __('Phone','event_espresso'), true, '')
			));
		$this->_model_relations = array(
			'Registration'=>new EE_Has_Many_Relation(),
			'State'=>new EE_Belongs_To_Relation(),
			'Country'=>new EE_Belongs_To_Relation(),
			'Event'=>new EE_HABTM_Relation('Registration', FALSE ),
			'WP_User' => new EE_Belongs_To_Relation(),
		);
		require_once('strategies/EE_CPT_Where_Conditions.strategy.php');
		$this->_default_where_conditions_strategy = new EE_CPT_Where_Conditions('espresso_attendees', 'ATTM_ID');
		$this->_caps_slug = 'contacts';
		parent::__construct( $timezone );

	}




	/**
	 * Gets all the attendees for a transaction (by using the esp_registration as a join table)
	 * @param EE_Transaction/int $transaction_id_or_obj EE_Transaction or its ID
	 * @return EE_Attendee[]
	 */
	public function get_attendees_for_transaction( $transaction_id_or_obj ){
		return $this->get_all( array( array(
			  'Registration.Transaction.TXN_ID' => $transaction_id_or_obj instanceof EE_Transaction ? $transaction_id_or_obj->ID() : $transaction_id_or_obj
		  )));
	}



	/**
	*		retrieve  a single attendee from db via their ID
	*
	* 		@access		public
	* 		@param		$ATT_ID
	*		@return 		mixed		array on success, FALSE on fail
	 * 		@deprecated
	*/
	public function get_attendee_by_ID( $ATT_ID = FALSE ) {
		// retrieve a particular EE_Attendee
		return $this->get_one_by_ID( $ATT_ID );
	}




	/**
	*		retrieve  a single attendee from db via their ID
	*
	* 		@access		public
	* 		@param		array $where_cols_n_values
	*		@return 		mixed		array on success, FALSE on fail
	*/
	public function get_attendee( $where_cols_n_values = array() ) {

		if ( empty( $where_cols_n_values )) {
			return FALSE;
		}
		$attendee = $this->get_all( array($where_cols_n_values ));
		if ( ! empty( $attendee )) {
			return array_shift( $attendee );
		} else {
			return FALSE;
		}

	}



	/**
	 *        Search for an existing Attendee record in the DB
	 *
	 * @access        public
	 * @param array $where_cols_n_values
	 * @return bool|mixed
	 */
	public function find_existing_attendee( $where_cols_n_values = NULL ) {
		// search by combo of first and last names plus the email address
		$attendee_data_keys = array( 'ATT_fname' => $this->_ATT_fname, 'ATT_lname' => $this->_ATT_lname, 'ATT_email' => $this->_ATT_email );
		// no search params means attendee object already exists.
		$where_cols_n_values = is_array( $where_cols_n_values ) && ! empty( $where_cols_n_values ) ? $where_cols_n_values : $attendee_data_keys;
		$valid_data = TRUE;
		// check for required values
		$valid_data = isset( $where_cols_n_values['ATT_fname'] ) && ! empty( $where_cols_n_values['ATT_fname'] ) ? $valid_data : FALSE;
		$valid_data = isset( $where_cols_n_values['ATT_lname'] ) && ! empty( $where_cols_n_values['ATT_lname'] ) ? $valid_data : FALSE;
		$valid_data = isset( $where_cols_n_values['ATT_email'] ) && ! empty( $where_cols_n_values['ATT_email'] ) ? $valid_data : FALSE;

		if ( $valid_data ) {
			$attendee = $this->get_attendee( $where_cols_n_values );
			if ( $attendee instanceof EE_Attendee ) {
				return $attendee;
			}
		}
		return FALSE;

	}



	/**
             * Takes an incoming array of EE_Registration ids and sends back a list of corresponding non duplicate
             * EE_Attendee objects.
             *
             * @since    4.3.0
             * @param  array $ids array of EE_Registration ids
             * @return  EE_Attendee[]
             */
            public function get_array_of_contacts_from_reg_ids( $ids ) {
                $ids = (array) $ids;
                $_where = array(
                    'Registration.REG_ID' => array( 'in', $ids )
                    );
                return $this->get_all( array( $_where ) );
            }


}
// End of file EEM_Attendee.model.php
// Location: /ee-mvc/models/EEM_Attendee.model.php
