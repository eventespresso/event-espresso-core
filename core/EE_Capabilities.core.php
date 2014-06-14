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
	 * This used to hold an array of EE_Capabilities_Meta_Map objects that define the granular capabilities mapped to for a user depending on context.
	 *
	 * @var EE_Capabilities_Meta_Map[]
	 */
	private $_meta_caps = array();





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
		add_action( 'AHEE__EE_System__core_loaded_and_ready', array( $this, 'init_caps' ));
	}



	/**
	 * This delays the initialization of the capabilities class until EE_System core is loaded and ready.
	 *
	 * @since 4.5.0
	 * @return void
	 */
	public function init_caps() {
		$this->_caps_map = $this->_init_caps_map();
		$this->_init_role_caps();
		$this->_set_meta_caps();
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
			new EE_Meta_Capability_Map_Edit( 'edit_event', array( EEM_Event::instance(), 'edit_published_event', 'edit_others_event', 'edit_private_event' ) ),
			new EE_Meta_Capability_Map_Edit( 'edit_venue', array( EEM_Venue::instance(), 'edit_published_venue', 'edit_others_venue', 'edit_private_venue' ) ),
			new EE_Meta_Capability_Map_Edit( 'edit_contact', array( EEM_Attendee::instance(), '', 'edit_others_contact', '' ) ),
			new EE_Meta_Capability_Map_Edit( 'edit_registration', array( EEM_Registration::instance(), '', 'edit_others_registration', '' ) ),
			new EE_Meta_Capability_Map_Edit( 'edit_checkin', array( EEM_Checkin::instance(), '', 'edit_others_checkin', '' ) ),
			new EE_Meta_Capability_Map_Edit( 'edit_transaction', array( EEM_Transaction::instance(), '', 'edit_others_transaction', '' ) ),
			new EE_Meta_Capability_Map_Edit( 'edit_message', array( EEM_Message_Template_Group::instance(), '', 'edit_others_message', '' ) ),
			new EE_Meta_Capability_Map_Edit( 'edit_default_ticket', array( EEM_Ticket::instance(), '', 'edit_others_default_ticket', '' ) ),
			new EE_Meta_Capability_Map_Edit( 'edit_default_price', array( EEM_Price::instance(), '', 'edit_others_default_price', '' ) ),
			new EE_Meta_Capability_Map_Edit( 'edit_default_price_type', array( EEM_Price_Type::instance(), '', 'edit_others_default_price_type', '' ) ),
			new EE_Meta_Capability_Map_Edit( 'edit_question', array( EEM_Question::instance(), '', 'edit_others_question', '' ) ),
			new EE_Meta_Capability_Map_Edit( 'edit_question_group', array( EEM_Question_Group::instance(), '', 'edit_others_question_group', '' ) ),
			//reads
			new EE_Meta_Capability_Map_Read( 'read_event', array( EEM_Event::instance(), '', 'read_others_event', 'read_private_event' ) ),
			new EE_Meta_Capability_Map_Read( 'read_venue', array( EEM_Venue::instance(), '', 'read_others_venue', 'read_private_venue' ) ),
			new EE_Meta_Capability_Map_Read( 'read_contact', array( EEM_Attendee::instance(), '', 'read_others_contact', 'read_private_contact' ) ),
			new EE_Meta_Capability_Map_Read( 'read_registration', array( EEM_Registration::instance(), '', '', 'edit_others_registration' ) ),
			new EE_Meta_Capability_Map_Read( 'read_checkin', array( EEM_Checkin::instance(), '', '', 'edit_others_checkin' ) ),
			new EE_Meta_Capability_Map_Read( 'read_transaction', array( EEM_Transaction::instance(), '', '', 'edit_others_transaction' ) ),
			new EE_Meta_Capability_Map_Read( 'read_message', array( EEM_Message_Template_Group::instance(), '', '', 'edit_others_message' ) ),
			new EE_Meta_Capability_Map_Read( 'read_default_ticket', array( EEM_Ticket::instance(), '', '', 'edit_others_default_ticket' ) ),
			new EE_Meta_Capability_Map_Read( 'read_default_price', array( EEM_Price::instance(), '', '', 'edit_others_default_price' ) ),
			new EE_Meta_Capability_Map_Read( 'read_default_price_type', array( EEM_Price_Type::instance(), '', '', 'edit_others_default_price_type' ) ),
			new EE_Meta_Capability_Map_Read( 'read_default_question', array( EEM_Question::instance(), '', '', 'edit_others_default_question' ) ),
			new EE_Meta_Capability_Map_Read( 'read_default_question_group', array( EEM_Question_Group::instance(), '', '', 'edit_others_default_question_group' ) ),
			//deletes
			new EE_Meta_Capability_Map_Delete( 'delete_event', array( EEM_Event::instance(), 'edit_published_event', 'edit_others_event', 'delete_private_event' ) ),
			new EE_Meta_Capability_Map_Delete( 'delete_venue', array( EEM_Venue::instance(), 'edit_published_venue', 'edit_others_venue', 'delete_private_venue' ) ),
			new EE_Meta_Capability_Map_Delete( 'delete_contact', array( EEM_Attendee::instance(), '', 'edit_others_contact', '' ) ),
			new EE_Meta_Capability_Map_Delete( 'delete_registration', array( EEM_Registration::instance(), '', 'edit_others_registration', '' ) ),
			new EE_Meta_Capability_Map_Delete( 'delete_checkin', array( EEM_Checkin::instance(), '', 'edit_others_checkin', '' ) ),
			new EE_Meta_Capability_Map_Delete( 'delete_transaction', array( EEM_Transaction::instance(), '', 'edit_others_transaction', '' ) ),
			new EE_Meta_Capability_Map_Delete( 'delete_message', array( EEM_Message_Template_Group::instance(), '', 'edit_others_message', '' ) ),
			new EE_Meta_Capability_Map_Delete( 'delete_default_ticket', array( EEM_Ticket::instance(), '', 'edit_others_default_ticket', '' ) ),
			new EE_Meta_Capability_Map_Delete( 'delete_default_price', array( EEM_Price::instance(), '', 'edit_others_default_price', '' ) ),
			new EE_Meta_Capability_Map_Delete( 'delete_default_price_type', array( EEM_Price_Type::instance(), '', 'edit_others_default_price_type', '' ) ),
			new EE_Meta_Capability_Map_Delete( 'delete_question', array( EEM_Question::instance(), '', 'edit_others_question', '' ) ),
			new EE_Meta_Capability_Map_Delete( 'delete_question_group', array( EEM_Question_Group::instance(), '', 'edit_others_question_group', '' ) ),
		);
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
				'edit_others_registration',
				'create_registration',
				'read_registration',
				'delete_registration',
				'read_checkin',
				'edit_checkin',
				'edit_others_checkin',
				//transactions && payments
				'edit_transaction',
				'edit_others_transaction',
				'read_transaction',
				'edit_payment',
				'delete_payment',
				//messages
				'edit_global_message',
				'read_message',
				'edit_message',
				'read_messages',
				//tickets
				'read_default_ticket',
				'edit_default_ticket',
				'edit_others_default_ticket',
				//prices
				'edit_default_price',
				'delete_default_price',
				'edit_others_default_price',
				'edit_default_price_type',
				'delete_default_price_type',
				'edit_others_default_price_type',
				'read_default_price',
				'read_default_price_type',
				//registration form
				'edit_question',
				'edit_others_questions',
				'read_question',
				'delete_question',
				'edit_question_group',
				'edit_others_question_groups',
				'read_question_group',
				'delete_question_group'
				)
			);
	}




	/**
	 * This adds all the default caps to roles as registered in the _caps_map property.
	 *
	 * @since 4.5.0
	 *
	 * @return void
	 */
	public function _init_role_caps() {
		//only do this if the read_ee cap isn't on the administrator role
		$administrator = get_role('administrator');
		if ( $administrator->has_cap( 'read_ee' ) ) {
			return;
		}

		//loop through the _init_caps_map for each role and add the caps to the role.
		foreach ( $this->_caps_map as $role => $caps ) {
			foreach ( $caps as $cap ) {
				$this->add_cap_to_role( $role, $cap );
			}
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
	 * Recieves the setup arguments for the map.
	 *
	 * @since 4.5.0
	 *
	 * @param string $meta_cap     What meta capability is this mapping.
	 * @param array  $map_values   array{
	 *                             //array of valuse that MUST match a count of 4.  It's okay to send an empty string for capabilities that don't get mapped to.
	 *                             @type EEM_Base model used for grabbing any context object. Required.
	 *                             @type string  represents the capability used for published. Optional.
	 *                             @type string  represents the capability used for "others". Optional.
	 *                             @type string  represents the capability used for private. Optional.
	 * }
	 */
	public function __construct( $meta_cap, $map_values ) {
		$this->meta_cap = $meta_cap;
		//verify there are four args in the $map_values array;
		if ( count( $map_values ) !== 4 ) {
			throw new EE_Error( sprintf( __('Incoming $map_values array should have a count of four values in it.  This is what was given: %s<br>', 'event_espresso'), print_r( $map_values, TRUE ) ) );
		}

		//the first value should be an instance of EEM_Base
		if ( ! $map_values[0] instanceof EEM_Base ) {
			throw new EE_Error( sprintf( __('The first value in the $map_values array should be an instance of EEM_Base.  It is not, instead this was given: %s', 'event_espresso'), print_r( $map_values[0], true ) ) );
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
	 * @param ing     $user_id The user id
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

	public function map_meta_caps( $caps, $cap, $user_id, $args ) {
		//only process if we're checking our mapped_cap
		if ( $cap !== $this->meta_cap )
			return $caps;
		$obj = $this->model->get_one_by_ID( $args[0] );

		//if no obj then let's just do cap
		if ( ! $obj instanceof EE_Base_Class ) {
			$caps[] = $cap;
			break;
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
 * Merely extends the Edit map.  Intention is for typhinting so it's clear a capability is a "delete" type of capability (in case mapping needs to change in the future)
 *
 * @since 4.5.0
 * @package Event Espresso
 * @subpackage core, capabilities
 * @author  Darren Ethier
 */
class EE_Meta_Capability_Map_Delete extends EE_Meta_Capability_Map_Edit {

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

	public function map_meta_caps( $caps, $cap, $user_id, $args ) {
		//only process if we're checking our mapped cap;
		if ( $cap !== $this->meta_cap )
			return $caps;
		$obj = $this->model->get_one_by_ID( $args[0] );

		//if no obj then let's just do cap
		if ( ! $obj instanceof EE_Base_Class ) {
			$caps[] = $cap;
			break;
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
