<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * WP User Model. Not intended to replace WP_User, but this just allows
 * for EE model queries to more easily integrate with the WP User table
 *
 * @package			Event Espresso
 * @subpackage		includes/models/
 * @author				Michael Nelson
 */
class EEM_WP_User extends EEM_Base {

	/**
	 * private instance of the EEM_WP_User object
	 * @type EEM_WP_User
	 */
	protected static $_instance = NULL;



	/**
	 *    constructor
	 * @param null $timezone
	 * @throws \EE_Error
	 */
	protected function __construct( $timezone = NULL ){
		$this->singular_item = __('WP_User','event_espresso');
		$this->plural_item = __('WP_Users','event_espresso');
		global $wpdb;
		$this->_tables = array(
			'WP_User'=> new EE_Primary_Table( $wpdb->users, 'ID', true)
		);
		$this->_fields = array(
			'WP_User'=>array(
				'ID'=> new EE_Primary_Key_Int_Field('ID', __('WP_User ID','event_espresso')),
				'user_login'=>new EE_Plain_Text_Field('user_login', __('User Login','event_espresso'), false, '' ),
				'user_pass'=>new EE_Plain_Text_Field('user_pass', __('User Password','event_espresso'), false, '' ),
				'user_nicename'=>new EE_Plain_Text_Field('user_nicename', __(' User Nice Name','event_espresso'), false, ''),
				'user_email' => new EE_Email_Field('user_email', __( 'User Email', 'event_espresso' ), false),
				'user_registered' => new EE_Datetime_Field( 'user_registered', __( 'Date User Registered', 'event_espresso' ), false, EE_Datetime_Field::now, $timezone ),
				'user_activation_key' => new EE_Plain_Text_Field( 'user_activation_key', __( 'User Activation Key', 'event_espresso' ), false, '' ),
				'user_status' => new EE_Integer_Field( 'user_status', __( 'User Status', 'event_espresso' ), false, 0 ),
				'display_name' => new EE_Plain_Text_Field( 'display_name', __( 'Display Name', 'event_espresso' ), false, '' )
			));
		$this->_model_relations = array(
			'Attendee' => new EE_Has_Many_Relation(),
			'Change_Log' => new EE_Has_Many_Relation(),
			'Event'=>new EE_Has_Many_Relation(),
			'Payment_Method' => new EE_Has_Many_Relation(),
			'Price' => new EE_Has_Many_Relation(),
			'Price_Type' => new EE_Has_Many_Relation(),
			'Question'=>new EE_Has_Many_Relation(),
			'Question_Group' => new EE_Has_Many_Relation(),
			'Ticket' => new EE_Has_Many_Relation(),
			'Venue' => new EE_Has_Many_Relation(),
			'Message' => new EE_Has_Many_Relation()
		);
		$this->_wp_core_model = true;
		$this->_caps_slug = 'users';
		$this->_cap_contexts_to_cap_action_map[ EEM_Base::caps_read ] = 'list';
		$this->_cap_contexts_to_cap_action_map[ EEM_Base::caps_read_admin ] = 'list';
		foreach( $this->_cap_contexts_to_cap_action_map as $context => $action ) {
			$this->_cap_restriction_generators[ $context ] = new EE_Restriction_Generator_WP_User();
		}
		//@todo: account for create_users controls whether they can create users at all

		parent::__construct( $timezone );
	}

	/**
	 * We don't need a foreign key to the WP_User model, we just need its primary key
	 * @return string
	 */
	public function wp_user_field_name() {
		return $this->primary_key_name();
	}

	/**
	 * This WP_User model IS owned, even though it doesn't have a foreign key to itself
	 * @return boolean
	 */
	public function is_owned() {
		return true;
	}
}
// End of file EEM_WP_User.model.php
// Location: /core/db_models/EEM_WP_User.model.php