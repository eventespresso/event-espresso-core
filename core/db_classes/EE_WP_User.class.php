<?php if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/**
 * EE_WP_User class
 *
 * @package 			Event Espresso
 * @subpackage 	includes/classes/EE_WP_User.class.php
 * @author 				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
class EE_WP_User extends EE_Base_Class implements EEI_Admin_Links {

	/**
	 *
	 * @var WP_User
	 */
	protected $_wp_user_obj;

	/**
	 * @param array $props_n_values
	 * @return EE_WP_User|mixed
	 */
	public static function new_instance( $props_n_values = array() ) {
		$has_object = parent::_check_for_object( $props_n_values, __CLASS__ );
		return $has_object ? $has_object : new self( $props_n_values );
	}



	/**
	 * @param array $props_n_values
	 * @return EE_WP_User
	 */
	public static function new_instance_from_db( $props_n_values = array() ) {
		return new self( $props_n_values, TRUE );
	}

	/**
	 * Return a normal WP_User object (caches the object for future calls)
	 * @return WP_User
	 */
	public function wp_user_obj() {
		if( ! $this->_wp_user_obj ) {
			$this->_wp_user_obj = get_user_by('ID', $this->ID() );
		}
		return $this->_wp_user_obj;
	}

	/**
	 * Return the link to the admin details for the object.
	 * @return string
	 */
	public function get_admin_details_link() {
		return $this->get_admin_edit_link();
	}

	/**
	 * Returns the link to the editor for the object.  Sometimes this is the same as the details.
	 * @return string
	 */
	public function get_admin_edit_link() {
		return esc_url(
			add_query_arg(
				'wp_http_referer',
				urlencode(
					wp_unslash(
						$_SERVER['REQUEST_URI']
					)
				),
				get_edit_user_link( $this->ID() )
			)
		);
	}

	/**
	 * Returns the link to a settings page for the object.
	 * @return string
	 */
	public function get_admin_settings_link() {
		return $this->get_admin_edit_link();
	}

	/**
	 * Returns the link to the "overview" for the object (typically the "list table" view).
	 * @return string
	 */
	public function get_admin_overview_link() {
		return admin_url( 'users.php' );
	}


}

/* End of file EE_WP_User.class.php */
/* Location: /core/db_classes/EE_WP_User.class.php */