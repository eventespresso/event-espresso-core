<?php
/**
 * This file contains the code related to the capabilities system in Event Espresso.
 *
 * @since 4.5.0
 * @package Event Espresso
 * @subpackage core, capabilities
 */
if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');


/**
 * This class contains all the code related to Event Espresso capabilities.
 * Assigned to the EE_Registry::instance()->CAP property.
 *
 * @since 4.5.0
 * @package Event Espresso
 * @subpackage core, capabilities
 * @author Darren Ethier
 */
final class EE_Capabilities extends EE_Base {


	/**
	 * instance of EE_Capabilities object
	 *
	 * @var EE_Capabilities
	 */
	private static $_instance = NULL;


	/**
	 * This is a map of caps that correspond to a default WP_Role.
	 * Array is indexed by Role and values are ee capabilities.
	 *
	 * @since 4.5.0
	 *
	 * @var array
	 */
	private $_caps_map = array();





	/**
	 * singleton method used to instantiat class object
	 *
	 * @since 4.5.0
	 *
	 * @return EE_Capabilities
	 */
	public static function instance() {
		//check if instantiated, and if not do so.
		if ( ! self::$_instance instanceof EE_Capabilities ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}




	/**
	 * private constructor
	 *
	 * @since 4.5.0
	 *
	 * @return void
	 */
	private function __construct() {
		$this->_caps_map = $this->_init_caps_map();
	}







	/**
	 * This sets up and returns the initial capabilities map for Event Espresso
	 *
	 * @since 4.5.0
	 *
	 * @return array
	 */
	private function _init_caps_map() {
		return array(
			'administrator' => array(
				//basic access
				'read_ee',
				//gateways
				'manage_gateways',
				//events
				'edit_others_event',
				'edit_published_event',
				'edit_event',
				'manage_event_categories',
				'edit_event_category',
				'read_event_category',
				'delete_event_category',
				'publish_event',
				'edit_private_event',
				'read_private_event',
				'read_event',
				'delete_private_event',
				'delete_event',
				//venues
				'manage_venue_categories',
				'edit_venue_category',
				'read_venue_category',
				'delete_venue_category',
				'edit_others_venue',
				'edit_published_venue',
				'edit_venue',
				'publish_venue',
				'edit_private_venue',
				'read_private_venue',
				'read_venue',
				'delete_private_venue',
				'delete_venue',
				//contacts
				'edit_others_contact',
				'edit_contact',
				'delete_contact',
				'read_contact',
				//registrations & checkins
				'edit_registration',
				'create_registration',
				'read_registration',
				'delete_registration',
				'edit_checkin',
				//transactions && payments
				'edit_transaction',
				'read_transaction',
				'edit_payment',
				'delete_payment',
				//messages
				'edit_global_message',
				'edit_message',
				'read_messages',
				//tickets
				'edit_default_ticket',
				//prices
				'edit_default_price',
				'delete_default_price',
				'edit_default_price_type',
				'delete_default_price_type',
				'read_default_price',
				'read_price_type',
				//registration form
				'edit_question',
				'read_question',
				'delete_question',
				'edit_question_group',
				'read_question_group',
				'delete_question_group'
				)
			);
	}
	}




	/**
	 * This method sets a capability on a role.  Note this should only be done on activation, or if you have something specific to prevent the cap from being added on every page load (adding caps are persistent to the db).
	 * Note. this is a wrapper for $wp_role->add_cap()
	 *
	 * @see wp-includes/capabilities.php
	 *
	 * @since 4.5.0
	 *
	 * @param string $role  A WordPress role the capability is being added to
	 * @param string $cap   The capability being added to the role
	 * @param bool $grant  Whether to grant access to this cap on this role.
	 * @return void
	 */
	public function add_cap_to_role( $role, $cap, $grant = TRUE ) {
		$role = get_role( $role );
		if ( $role instanceof WP_Role ) {
			$role->add_cap( $cap, $grant );
		}
	}





	/**
	 * Functions similarly to add_cap_to_role except removes cap from given role.
	 * Wrapper for $wp_role->remove_cap()
	 *
	 * @see wp-includes/capabilities.php
	 * @since 4.5.0
	 *
	 * @param string $role A WordPress role the capability is being removed from.
	 * @param string $cap  The capability being femoved
	 *
	 * @return void
	 */
	public function remove_cap_from_role( $role, $cap ) {
		$role = get_role( $role );
		if ( $role instanceof WP_Role ) {
			$role->remove_cap( $cap );
		}
	}




	/**
	 * Wrapper for the native WP current_user_can() method.
	 * This is provided as a handy method for a couple things:
	 * 1. Using the context string it allows for targeted filtering by addons for a specific check (without having to write those filters wherever current_user_can is called).
	 * 2. Explicit passing of $id from a given context ( useful in the cases of map_meta_cap filters )
	 *
	 * @since 4.5.0
	 *
	 * @param string $cap     The cap being checked.
	 * @param string $context The context where the current_user_can is being called from.
	 * @param int    $id          Optional. Id for item where current_user_can is being called from (used in map_meta_cap() filters.
	 *
	 * @return bool  Whether user can or not.
	 */
	public function current_user_can( $cap, $context, $id = 0 ) {
		$user_can = !empty( $id ) ? current_user_can( $cap, $id ) : current_user_can( $cap );

		//apply filters (both a global on just the cap, and context specific.  Global overrides context specific)
		$user_can = apply_filters( 'FHEE__EE_Capabilities__current_user_can__user_can__' . $context, $user_can, $cap, $id );
		$user_can = apply_filters( 'FHEE__EE_Capabilities__current_user_can__user_can', $user_can, $context, $cap, $id );
		return $user_can;
	}



	/**
	 * Wrapper for the native WP current_user_can_for_blog() method.
	 * This is provided as a handy method for a couple things:
	 * 1. Using the context string it allows for targeted filtering by addons for a specific check (without having to write those filters wherever current_user_can is called).
	 * 2. Explicit passing of $id from a given context ( useful in the cases of map_meta_cap filters )
	 *
	 * @since 4.5.0
	 *
	 * @param int      $blog_id The blog id that is being checked for.
	 * @param string $cap     The cap being checked.
	 * @param string $context The context where the current_user_can is being called from.
	 * @param int    $id          Optional. Id for item where current_user_can is being called from (used in map_meta_cap() filters.
	 *
	 * @return bool  Whether user can or not.
	 */
	public function current_user_can_for_blog( $blog_id, $cap, $context, $id = 0 ) {
		$user_can = !empty( $id ) ? current_user_can_for_blog( $blog_id, $cap, $id ) : current_user_can( $blog_id, $cap );

		//apply filters (both a global on just the cap, and context specific.  Global overrides context specific)
		$user_can = apply_filters( 'FHEE__EE_Capabilities__current_user_can_for_blog__user_can__' . $context, $user_can, $blog_id, $cap, $id );
		$user_can = apply_filters( 'FHEE__EE_Capabilities__current_user_can_for_blog__user_can', $user_can, $context, $blog_id, $cap, $id );
		return $user_can;
	}
}
