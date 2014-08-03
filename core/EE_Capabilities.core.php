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
	 * This used to hold an array of EE_Meta_Capability_Map objects that define the granular capabilities mapped to for a user depending on context.
	 *
	 * @var EE_Meta_Capability_Map[]
	 */
	private $_meta_caps = array();






	/**
	 * singleton method used to instantiate class object
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
	 * @return \EE_Capabilities
	 */
	private function __construct() {
		add_action( 'AHEE__EE_System__core_loaded_and_ready', array( $this, 'init_caps' ));
	}



	/**
	 * This delays the initialization of the capabilities class until EE_System core is loaded and ready.
	 *
	 * @param bool $reset allows for resetting the default capabilities saved on roles.  Note that this doesn't actually REMOVE any capabilities from existing roles, it just resaves defaults roles and ensures that they are up to date.
	 *
	 *
	 * @since 4.5.0
	 * @return void
	 */
	public function init_caps( $reset = FALSE ) {
		if( EE_Maintenance_Mode::instance()->models_can_query() ){
			$this->_caps_map = $this->_init_caps_map();
			$this->init_role_caps( $reset );
			$this->_set_meta_caps();
		}
	}




	/**
	 * This sets the meta caps property.

	 * @since 4.5.0
	 *
	 * @return void
	 */
	private function _set_meta_caps() {
		$this->_meta_caps =  array (
			//edits
			new EE_Meta_Capability_Map_Edit( 'edit_event', array( EEM_Event::instance(), 'edit_published_events', 'edit_others_events', 'edit_private_events' ) ),
			new EE_Meta_Capability_Map_Edit( 'edit_venue', array( EEM_Venue::instance(), 'edit_published_venues', 'edit_others_venues', 'edit_private_venues' ) ),
			new EE_Meta_Capability_Map_Edit( 'edit_registration', array( EEM_Registration::instance(), '', 'edit_others_registrations', '' ) ),
			new EE_Meta_Capability_Map_Edit( 'edit_checkin', array( EEM_Registration::instance(), '', 'edit_others_checkins', '' ) ),
			new EE_Meta_Capability_Map_Messages_Cap( 'edit_message', array( EEM_Message_Template_Group::instance(), '', 'edit_others_messages', 'edit_global_messages' ) ),
			new EE_Meta_Capability_Map_Edit( 'edit_default_ticket', array( EEM_Ticket::instance(), '', 'edit_others_default_tickets', '' ) ),
			new EE_Meta_Capability_Map_Registration_Form_Cap( 'edit_question', array( EEM_Question::instance(), '', '', 'edit_system_questions' ) ),
			new EE_Meta_Capability_Map_Registration_Form_Cap( 'edit_question_group', array( EEM_Question_Group::instance(), '', '', 'edit_system_question_groups' ) ),
			//reads
			new EE_Meta_Capability_Map_Read( 'read_event', array( EEM_Event::instance(), '', 'read_others_events', 'ee_read_private_events' ) ),
			new EE_Meta_Capability_Map_Read( 'read_venue', array( EEM_Venue::instance(), '', 'read_others_venues', 'read_private_venues' ) ),
			new EE_Meta_Capability_Map_Read( 'read_registration', array( EEM_Registration::instance(), '', '', 'edit_others_registrations' ) ),
			new EE_Meta_Capability_Map_Read( 'read_checkin', array( EEM_Registration::instance(), '', '', 'read_others_checkins' ) ),
			new EE_Meta_Capability_Map_Messages_Cap( 'read_message', array( EEM_Message_Template_Group::instance(), '', 'read_others_messages', 'read_global_messages' ) ),
			new EE_Meta_Capability_Map_Read( 'read_default_ticket', array( EEM_Ticket::instance(), '', '', 'read_others_default_tickets' ) ),

			//deletes
			new EE_Meta_Capability_Map_Delete( 'delete_event', array( EEM_Event::instance(), 'delete_published_events', 'delete_others_events', 'delete_private_events' ) ),
			new EE_Meta_Capability_Map_Delete( 'delete_venue', array( EEM_Venue::instance(), 'delete_published_venues', 'delete_others_venues', 'delete_private_venues' ) ),
			new EE_Meta_Capability_Map_Delete( 'delete_registration', array( EEM_Registration::instance(), '', 'edit_others_registrations', '' ) ),
			new EE_Meta_Capability_Map_Delete( 'delete_checkin', array( EEM_Registration::instance(), '', 'delete_others_checkins', '' ) ),
			new EE_Meta_Capability_Map_Messages_Cap( 'delete_message', array( EEM_Message_Template_Group::instance(), '', 'delete_others_messages', 'delete_global_messages' ) ),
			new EE_Meta_Capability_Map_Delete( 'delete_default_ticket', array( EEM_Ticket::instance(), '', 'delete_others_default_tickets', '' ) ),
			new EE_Meta_Capability_Map_Registration_Form_Cap( 'delete_question', array( EEM_Question::instance(), '', '', 'delete_system_questions' ) ),
			new EE_Meta_Capability_Map_Registration_Form_Cap( 'delete_question_group', array( EEM_Question_Group::instance(), '', '', 'delete_system_question_groups' ) ),
		);

		$this->_meta_caps = apply_filters( 'FHEE__EE_Capabilities___set_meta_caps__meta_caps', $this->_meta_caps );
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
				'ee_read_ee',
			//gateways
				'ee_manage_gateways',
			//events
				'ee_publish_events',
				'ee_read_private_events',
				'read_others_events',
				'read_event',
				'read_events',
				'edit_event',
				'edit_events',
				'edit_published_events',
				'edit_others_events',
				'edit_private_events',
				'delete_published_events',
				'delete_private_events',
				'delete_event',
				'delete_events',
				'delete_others_events',
			//event categories
				'manage_event_categories',
				'edit_event_category',
				'delete_event_category',
				'assign_event_category',
			//venues
				'publish_venues',
				'read_venue',
				'read_venues',
				'read_others_venues',
				'read_private_venues',
				'edit_venue',
				'edit_venues',
				'edit_others_venues',
				'edit_published_venues',
				'edit_private_venues',
				'delete_venue',
				'delete_venues',
				'delete_others_venues',
				'delete_private_venues',
				'delete_published_venues',
			//venue categories
				'manage_venue_categories',
				'edit_venue_category',
				'delete_venue_category',
				'assign_venue_category',
			//contacts
				'read_contact',
				'read_contacts',
				'edit_contact',
				'edit_contacts',
				'delete_contact',
				'delete_contacts',
			//registrations
				'read_registration',
				'read_registrations',
				'read_others_registrations',
				'edit_registration',
				'edit_registrations',
				'edit_others_registrations',
				'delete_registration',
				'delete_registrations',
			//checkins
				'read_checkin',
				'read_others_checkins',
				'read_checkins',
				'edit_checkin',
				'edit_checkins',
				'edit_others_checkins',
				'delete_checkin',
				'delete_checkins',
				'delete_others_checkins',
			//transactions && payments
				'read_transaction',
				'read_transactions',
				'edit_payments',
				'delete_payments',
			//messages
				'read_message',
				'read_messages',
				'read_others_messages',
				'read_global_messages',
				'edit_global_messages',
				'edit_message',
				'edit_messages',
				'edit_others_messages',
				'delete_message',
				'delete_messages',
				'delete_others_messages',
				'delete_global_messages',
				'send_message',
			//tickets
				'read_default_ticket',
				'read_default_tickets',
				'read_others_default_tickets',
				'edit_default_ticket',
				'edit_default_tickets',
				'edit_others_default_tickets',
				'delete_ticket',
				'delete_tickets',
				'delete_others_default_tickets',
			//prices
				'edit_default_price',
				'edit_default_prices',
				'delete_default_price',
				'delete_default_prices',
				'edit_default_price_type',
				'edit_default_price_types',
				'delete_default_price_type',
				'delete_default_price_types',
				'read_default_prices',
				'read_default_price_types',
			//registration form
				'edit_question',
				'edit_questions',
				'edit_system_questions',
				'read_questions',
				'delete_question',
				'delete_questions',
				'edit_question_group',
				'edit_question_groups',
				'read_question_groups',
				'edit_system_question_groups',
				'delete_question_group',
				'delete_question_groups',
			//event_type taxonomy
				'assign_event_type',
				'manage_event_types',
				'edit_event_type',
				'delete_event_type',
				)
			);
	}




	/**
	 * This adds all the default caps to roles as registered in the _caps_map property.
	 *
	 * @since 4.5.0
	 *
	 * @param bool $reset allows for resetting the default capabilities saved on roles.  Note that this doesn't actually REMOVE any capabilities from existing roles, it just resaves defaults roles and ensures that they are up to date.
	 * @param array $custom_map Optional.  Can be used to send a custom map of roles and capabilities for setting them up.  Note that this should ONLY be called on activation hook or some other one-time task otherwise the caps will be added on every request.
	 *
	 * @return void
	 */
	public function init_role_caps( $reset = FALSE, $custom_map = array() ) {

		$caps_map = empty( $custom_map ) ? $this->_caps_map : $custom_map;


		//first let's determine if these caps have already been set.
		$cap_to_check = empty( $custom_map ) ? reset($this->_caps_map) : reset($custom_map);
		$cap_to_check = reset($cap_to_check); //should be the first capability in the first role array.
		$caps_are_set = get_option( 'ee_caps_initialized' );

		if ( ! $reset && !empty( $caps_are_set ) && is_array( $caps_are_set ) && in_array( $cap_to_check, $caps_are_set ) ) {
			return;
		}

		//loop through the _init_caps_map for each role and add the caps to the role.
		foreach ( $caps_map as $role => $caps ) {
			foreach ( $caps as $cap ) {
				$this->add_cap_to_role( $role, $cap );
			}
		}

		//now let's just save the cap that has been set.
		$caps_are_set[] = $cap_to_check;
		update_option( 'ee_caps_initialized', $caps_are_set );
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
	 * @param string $cap  The capability being removed
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
		$user_can = ! empty( $id ) ? current_user_can( $cap, $id ) : current_user_can( $cap );

		//apply filters (both a global on just the cap, and context specific.  Global overrides context specific)
		$user_can = apply_filters( 'FHEE__EE_Capabilities__current_user_can__user_can__' . $context, $user_can, $cap, $id );
		$user_can = apply_filters( 'FHEE__EE_Capabilities__current_user_can__user_can', $user_can, $context, $cap, $id );
		return $user_can;
	}





	/**
	 * This is a wrapper for the WP user_can() function and follows the same style as the other wrappers in this class.
	 *
	 * @param int|WP_User $user    Either the user_id or a WP_User object
	 * @param string $cap     The capability string being checked
	 * @param string $context The context where the user_can is being called from (used in filters).
	 * @param int    $id      Optional. Id for item where user_can is being called from ( used in map_meta_cap() filters)
	 *
	 * @return bool Whether user can or not.
	 */
	public function user_can( $user, $cap, $context, $id = 0 ) {
		$user_can = ! empty( $id ) ? user_can( $user, $cap, $id ) : user_can( $user, $cap );

		//apply filters (both a global on just the cap, and context specific.  Global overrides context specific)
		$user_can = apply_filters( 'FHEE__EE_Capabilities__user_can__user_can__' . $context, $user_can, $user, $cap, $id );
		$user_can = apply_filters( 'FHEE__EE_Capabilities__user_can__user_can', $user_can, $user, $context, $cap, $id );
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




/**
 * Meta Capability Map class.
 * This children of this class are used to define capability mappings for capabilities that have further filtering depending on context.
 *
 * @since 4.5.0
 * @package Event Espresso
 * @subpackage core, capabilities
 * @author  Darren Ethier
 */
abstract class EE_Meta_Capability_Map {
	public $meta_cap;
	public $model;
	public $published_cap = '';
	public $others_cap = '';
	public $private_cap = '';



	/**
	 * constructor.
	 * Receives the setup arguments for the map.
	 *
	 * @since    4.5.0
	 *
	 * @param string $meta_cap     What meta capability is this mapping.
	 * @param array  $map_values   array {
	 * 		//array of values that MUST match a count of 4.  It's okay to send an empty string for capabilities that don't get mapped to.
	 * 		@type param \EEM_Base model used for grabbing any context object. Required.
	 * 		@type param string represents the capability used for published. Optional.
	 * 		@type param string represents the capability used for "others". Optional.
	 * 		@type param string represents the capability used for private. Optional.
	 * 	}
	 * @throws EE_Error
	 */
	public function __construct( $meta_cap, $map_values ) {
		$this->meta_cap = $meta_cap;
		//verify there are four args in the $map_values array;
		if ( count( $map_values ) !== 4 ) {
			throw new EE_Error( sprintf( __('Incoming $map_values array should have a count of four values in it.  This is what was given: %s', 'event_espresso'), '<br>' . print_r( $map_values, TRUE ) ) );
		}

		//the first value should be an instance of EEM_Base
		if ( ! $map_values[0] instanceof EEM_Base ) {
			throw new EE_Error( sprintf( __('The first value in the $map_values array should be an instance of EEM_Base.  It is not, instead this was given: %s', 'event_espresso'), '<br>' . print_r( $map_values[0], true ) ) );
		}

		//set properties
		$this->model = $map_values[0];
		$this->published_cap = (string) $map_values[1];
		$this->others_cap = (string) $map_values[2];
		$this->private_cap = (string) $map_values[3];

		//add filter for map_meta_caps
		add_filter( 'map_meta_cap', array( $this, 'map_meta_caps' ), 10, 4 );
	}



	/**
	 * This is the callback for the wp map_meta_caps() function which allows for ensuring certain caps that act as a "meta" for other caps ( i.e. edit_event is a meta for edit_others_events ) work as expected.
	 *
	 * @since 4.5.0
	 * @see  wp-includes/capabilities.php
	 *
	 * @param array  $caps    actual users capabilities
	 * @param string $cap     initial capability name that is being checked (the "map" key)
	 * @param int     $user_id The user id
	 * @param array  $args    Adds context to the cap. Typically the object ID.
	 *
	 * @return array   actual users capabilities
	 */
	abstract public function map_meta_caps( $caps, $cap, $user_id, $args );
}






/**
 * Meta Capability Map class for Edit type capabilities.
 * Any capability that is an edit type of capability utilizes this map.
 *
 * @since 4.5.0
 * @package Event Espresso
 * @subpackage core, capabilities
 * @author  Darren Ethier
 */
class EE_Meta_Capability_Map_Edit extends EE_Meta_Capability_Map {

	/**
	 * This is the callback for the wp map_meta_caps() function which allows for ensuring certain caps that act as a "meta" for other caps ( i.e. edit_event is a meta for edit_others_events ) work as expected.
	 *
	 * @since 4.5.0
	 * @see  wp-includes/capabilities.php
	 *
	 * @param array  $caps    actual users capabilities
	 * @param string $cap     initial capability name that is being checked (the "map" key)
	 * @param int     $user_id The user id
	 * @param array  $args    Adds context to the cap. Typically the object ID.
	 *
	 * @return array   actual users capabilities
	 */
	public function map_meta_caps( $caps, $cap, $user_id, $args ) {
		//only process if we're checking our mapped_cap
		if ( $cap !== $this->meta_cap ) {
			return $caps;
		}

		$obj = ! empty( $args[0] ) ? $this->model->get_one_by_ID( $args[0] ) : NULL;

		//if no obj then let's just do cap
		if ( ! $obj instanceof EE_Base_Class ) {
			$caps[] = $cap;
			return $caps;
		}

		if ( $obj instanceof EE_CPT_Base ) {
			//if the item author is set and the user is the author...
			if ( $obj->wp_user() && $user_id == $obj->wp_user() ) {
				if ( empty( $this->published_cap ) ) {
					$caps[] = $cap;
				} else {
					//if obj is published...
					if ( $obj->status() == 'publish' ) {
						$caps[] = $this->published_cap;
					} else {
						$caps[] = $cap;
					}
				}
			} else {
				//the user is trying to edit someone else's obj
				if ( !empty( $this->others_cap ) ) {
					$caps[] = $this->others_cap;
				}
				if ( ! empty( $this->published_cap ) && $obj->status() == 'publish' ) {
					$caps[] = $this->published_cap;
				} elseif ( ! empty( $this->private_cap ) && $obj->status() == 'private' ) {
					$caps[] = $this->private_cap;
				}
			}
		} else {
			//not a cpt object so handled differently
			if ( $obj->wp_user() && $user_id == $obj->wp_user() ) {
				$caps[] = $cap;
			} else {
				if ( !empty( $this->others_cap ) ) {
					$caps[] = $this->others_cap;
				}
			}
		}
		return $caps;
	}
}





/**
 * Meta Capability Map class for delete type capabilities
 * Merely extends the Edit map.  Intention is for type hinting so it's clear a capability is a "delete" type of capability (in case mapping needs to change in the future)
 *
 * @since 4.5.0
 * @package Event Espresso
 * @subpackage core, capabilities
 * @author  Darren Ethier
 */
class EE_Meta_Capability_Map_Delete extends EE_Meta_Capability_Map_Edit {

	/**
	 * This is the callback for the wp map_meta_caps() function which allows for ensuring certain caps that act as a "meta" for other caps ( i.e. edit_event is a meta for edit_others_events ) work as expected.
	 *
	 * @since 4.5.0
	 * @see  wp-includes/capabilities.php
	 *
	 * @param array  $caps    actual users capabilities
	 * @param string $cap     initial capability name that is being checked (the "map" key)
	 * @param int     $user_id The user id
	 * @param array  $args    Adds context to the cap. Typically the object ID.
	 *
	 * @return array   actual users capabilities
	 */
	public function map_meta_caps( $caps, $cap, $user_id, $args ) {
		return parent::map_meta_caps( $caps, $cap, $user_id, $args );
	}
}





/**
 * Meta Capability Map class for reads.
 * Maps any read meta capabilities to equivalents for context.
 *
 * @since 4.5.0
 * @package Event Espresso
 * @subpackage core, capabilities
 * @author  Darren Ethier
 */
class EE_Meta_Capability_Map_Read extends EE_Meta_Capability_Map {

	/**
	 * This is the callback for the wp map_meta_caps() function which allows for ensuring certain caps that act as a "meta" for other caps ( i.e. edit_event is a meta for edit_others_events ) work as expected.
	 *
	 * @since 4.5.0
	 * @see  wp-includes/capabilities.php
	 *
	 * @param array  $caps    actual users capabilities
	 * @param string $cap     initial capability name that is being checked (the "map" key)
	 * @param int     $user_id The user id
	 * @param array  $args    Adds context to the cap. Typically the object ID.
	 *
	 * @return array   actual users capabilities
	 */
	public function map_meta_caps( $caps, $cap, $user_id, $args ) {
		//only process if we're checking our mapped cap;
		if ( $cap !== $this->meta_cap ) {
			return $caps;
		}

		$obj = ! empty( $args[0] ) ? $this->model->get_one_by_ID( $args[0] ) : NULL;

		//if no obj then let's just do cap
		if ( ! $obj instanceof EE_Base_Class ) {
			$caps[] = $cap;
			return $caps;
		}

		if ( $obj instanceof EE_CPT_Base ) {
			$status_obj = get_post_status_object( $obj->status() );
			if ( $status_obj->public ) {
				$caps[] = $cap;
				return $caps;
			}

			//if the item author is set and the user is the author...
			if ( $obj->wp_user() && $user_id == $obj->wp_user() ) {
				$caps[] = $cap;
			} elseif ( $status_obj->private && ! empty( $this->private_cap ) ) {
				//the user is trying to view someone else's obj
				$caps[] = $this->private_cap;
			} elseif ( !empty( $this->others_cap ) ) {
				$caps[] = $this->others_cap;
			} else {
				$caps[] = $cap;
			}
		} else {
			//not a cpt object so handled differently
			if ( $obj->wp_user() && $user_id == $obj->wp_user() ) {
				$caps[] = $cap;
			} elseif ( !empty( $this->private_cap ) ) {
				$caps[] = $this->private_cap;
			} elseif ( ! empty( $this->others_cap ) ) {
				$caps[] = $this->others_cap;
			} else {
				$caps[] = $cap;
			}
		}
		return $caps;
	}
}




/**
 * Meta Capability Map class for the messages component
 * This is a special map due to messages having global and custom messages.  Only users with the edit_global_message capability should be able to do things with the global messages.
 *
 * @since 4.5.0
 * @package Event Espresso
 * @subpackage core, capabilities
 * @author  Darren Ethier
 */
class EE_Meta_Capability_Map_Messages_Cap extends EE_Meta_Capability_Map {

	/**
	 * This is the callback for the wp map_meta_caps() function which allows for ensuring certain caps that act as a "meta" for other caps ( i.e. edit_event is a meta for edit_others_events ) work as expected.
	 *
	 * @since 4.5.0
	 * @see  wp-includes/capabilities.php
	 *
	 * @param array  $caps    actual users capabilities
	 * @param string $cap     initial capability name that is being checked (the "map" key)
	 * @param int     $user_id The user id
	 * @param array  $args    Adds context to the cap. Typically the object ID.
	 *
	 * @return array   actual users capabilities
	 */
	public function map_meta_caps( $caps, $cap, $user_id, $args ) {
		//only process if we're checking our mapped_cap
		if ( $cap !== $this->meta_cap ) {
			return $caps;
		}

		$obj = ! empty( $args[0] ) ? $this->model->get_one_by_ID( $args[0] ) : NULL;

		//if no obj then let's just do cap
		if ( ! $obj instanceof EE_Message_Template_Group ) {
			$caps[] = $cap;
			return $caps;
		}

		$is_global = $obj->is_global();

		if ( $obj->wp_user() && $user_id == $obj->wp_user() ) {
			if ( $is_global ) {
				$caps[]  = $this->private_cap;
			} else {
				$caps[] = $cap;
			}
		} else {
			if ( $is_global ) {
				$caps[] = $this->private_cap;
			} else {
				$caps[] = $this->others_cap;
			}
		}

		return $caps;
	}
}




/**
 * Meta Capability Map class for the registration form (questions and question groups) component
 * This is a special map due to questions and question groups having special "system" data.  Only users with the edit_system_question or edit_system_question_group capability should be able to do things with the system data.
 *
 * @since 4.5.0
 * @package Event Espresso
 * @subpackage core, capabilities
 * @author  Darren Ethier
 */
class EE_Meta_Capability_Map_Registration_Form_Cap extends EE_Meta_Capability_Map {

	/**
	 * This is the callback for the wp map_meta_caps() function which allows for ensuring certain caps that act as a "meta" for other caps ( i.e. edit_event is a meta for edit_others_events ) work as expected.
	 *
	 * @since 4.5.0
	 * @see  wp-includes/capabilities.php
	 *
	 * @param array  $caps    actual users capabilities
	 * @param string $cap     initial capability name that is being checked (the "map" key)
	 * @param int     $user_id The user id
	 * @param array  $args    Adds context to the cap. Typically the object ID.
	 *
	 * @return array   actual users capabilities
	 */
	public function map_meta_caps( $caps, $cap, $user_id, $args ) {
		//only process if we're checking our mapped_cap
		if ( $cap !== $this->meta_cap ) {
			return $caps;
		}

		$obj = ! empty( $args[0] ) ? $this->model->get_one_by_ID( $args[0] ) : NULL;

		//if no obj then let's just do cap
		if ( ! $obj instanceof EE_Base_Class ) {
			$caps[] = $cap;
			return $caps;
		}

		$is_system = $obj instanceof EE_Question_Group ? $obj->system_group() : FALSE;
		$is_system = $obj instanceof EE_Question ? $obj->is_system_question() : $is_system;

		if ( $is_system ) {
			$caps[] = $this->private_cap;
		} else {
			$caps[] = $cap;
		}

		return $caps;
	}
}
