<?php
if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for Wordpress
 *
 * @package		Event Espresso
 * @author		Seth Shoultes
 * @copyright	(c)2009-2012 Event Espresso All Rights Reserved.
 * @license		http://eventespresso.com/support/terms-conditions/  ** see Plugin Licensing **
 * @link		http://www.eventespresso.com
 * @version		4.0
 *
 * ------------------------------------------------------------------------
 *
 * espresso_events_Venues_Hooks
 * Hooks various messages logic so that it runs on indicated Events Admin Pages.
 * Commenting/docs common to all children classes is found in the EE_Admin_Hooks parent.
 *
 *
 * @package		espresso_events_Venues_Hooks
 * @subpackage	caffeinated/admin/new/venues/espresso_events_Venues_Hooks.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class espresso_events_Venues_Hooks extends EE_Admin_Hooks {


	protected $_event;


	public function __construct( EE_Admin_Page $admin_page ) {
		parent::__construct( $admin_page );
	}


	protected function _set_hooks_properties() {
		$this->_name = 'venues';

		$this->_metaboxes = array(
			0 => array(
				'page_route' => array('edit', 'create_new'),
				'func' => 'venue_metabox',
				'label' => __('Venue Details', 'event_espresso'),
				'priority' => 'high',
				'context' => 'normal'
				)
		);/**/

		$this->_scripts_styles = array(
			'registers' => array(
				'ee_event_venues' => array(
					'type' => 'js',
					'url' => EE_VENUES_ASSETS_URL . 'ee-event-venues-admin.js',
					'depends' => array('jquery')
					),
				'ee_event_venues_css' => array(
					'type' => 'css',
					'url' => EE_VENUES_ASSETS_URL . 'ee-event-venues-admin.css',
					)
				),
			'enqueues' => array(
				'ee_event_venues' => array('edit', 'create_new'),
				'ee_event_venues_css' => array('edit', 'create_new')
				)
			);

		//hook into the handler for saving venue
		add_filter( 'FHEE__Events_Admin_Page___insert_update_cpt_item__event_update_callbacks', array( $this, 'modify_callbacks' ), 10 );

		//remove default ee_autosave returns for DECAF venues (not needed for CAF venues cause we have a dropdown selector)
		add_filter( 'FHEE__Events_Admin_Page__ee_autosave_edit_do_decaf_venue_save', '__return_false' );

	}


	public function modify_callbacks( $callbacks ) {
		// first remove default venue callback
		foreach ( $callbacks as $key => $callback ) {
			if ( $callback[1] == '_default_venue_update' ) {
				unset( $callbacks[$key] );
			}
		}

		//now let's add the caf version
		$callbacks[] = array( $this, 'caf_venue_update' );
		return $callbacks;
	}


	public function venue_metabox() {

		$values = array(
			array('id' => true, 'text' => __('Yes', 'event_espresso')),
			array('id' => false, 'text' => __('No', 'event_espresso'))
		);

		$evt_obj = $this->_adminpage_obj->get_event_object();
		$evt_id = $evt_obj->ID();

		//first let's see if we have a venue already
		$evt_venues = !empty( $evt_id ) ? $evt_obj->venues() : array();
		$evt_venue = $evt_venues && is_array( $evt_venues ) ? reset( $evt_venues ) : null;
		$evt_venue_id = $evt_venue instanceof EE_Venue ? $evt_venue->ID() : null;

		//possibly private venues.
		if ( EE_Registry::instance()->CAP->current_user_can( 'ee_read_private_venues', 'get_venues' ) ) {
			$vnu_where['status']= array( 'IN' , array( 'publish', 'private' ) );
		} else {
			$vnu_where['status'] = 'publish';
		}

		//cap checks
		if ( ! EE_Registry::instance()->CAP->current_user_can( 'ee_read_others_venues', 'get_venues' ) ) {
			$vnu_where['VNU_wp_user'] = get_current_user_id();
		}

		$vnumdl = EE_Registry::instance()->load_model( 'Venue' );
		$venues = $vnumdl->get_all( array( $vnu_where, 'order_by' => array( 'VNU_name' => 'ASC' ) ) );

		$ven_select = array();
		$ven_select[0] = __('Select a Venue', 'event_espresso');
		//setup venues for selector
		foreach ( $venues as $venue ) {
			$ven_select[$venue->ID()] = $venue->name();
		}

		//if $ven_select does not have the existing venue attached to event then let's add that because we'll always
		//show existing attached venues even if it's trashed (or some other restricted status).

		if ( $evt_venue_id && ! isset( $ven_select[$evt_venue_id] ) ) {
			$ven_select[$evt_venue_id] = $evt_venue->name();
			$venues = array_merge( $venues, array( $evt_venue ) );
		}

		$template_args['venues'] = $venues;
		$template_args['evt_venue_id'] = $evt_venue_id;
		$template_args['venue_selector'] = EEH_Form_Fields::select_input('venue_id', $ven_select, $evt_venue_id, 'id="venue_id"' );
		$template_args['enable_for_gmap'] = EEH_Form_Fields::select_input('enable_for_gmap', $values, is_object( $evt_venue ) ? $evt_venue->enable_for_gmap() : NULL, 'id="enable_for_gmap"');
		$template_path = empty( $venues ) ? EE_VENUES_TEMPLATE_PATH . 'event_venues_metabox_content.template.php' : EE_VENUES_TEMPLATE_PATH . 'event_venues_metabox_content_from_manager.template.php';
		EEH_Template::display_template( $template_path, $template_args );
	}




	public function caf_venue_update( $evtobj, $data ) {
		EE_Registry::instance()->load_model('Venue');
		$venue_id = !empty( $data['venue_id'] ) ? $data['venue_id'] : NULL;


		//first let's check if the selected venue matches any existing venue attached to the event
		$evt_venue = $evtobj->venues();
		$evt_venue = !empty( $evt_venue ) ? array_shift( $evt_venue ) : NULL;

		if ( !empty( $evt_venue ) && $evt_venue->ID() != $venue_id )
			$evtobj->_remove_relation_to( $evt_venue->ID(), 'Venue' );

		if ( empty( $venue_id ) )
			return TRUE; //no venue to attach

		// this should take care of adding to revisions as well as main post object
		$success = $evtobj->_add_relation_to( $venue_id, 'Venue' );
		return !empty($success) ? TRUE : FALSE;
	}


} //end espresso_events_Venues_Hooks class
