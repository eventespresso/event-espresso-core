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
 * espresso_events_Pricing_Hooks
 * Hooks various messages logic so that it runs on indicated Events Admin Pages.
 * Commenting/docs common to all children classes is found in the EE_Admin_Hooks parent.
 * 
 *
 * @package		espresso_events_Pricing_Hooks
 * @subpackage	caffeinated/admin/new/pricing/espresso_events_Pricing_Hooks.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class espresso_events_Pricing_Hooks extends EE_Admin_Hooks {

	protected function _set_hooks_properties() {
		$this->_name = 'pricing';
		//if we were going to add our own metaboxes we'd use the below.
		$this->_metaboxes = array(
			0 => array(
				'page_route' => array('edit','create_new'),
				'func' => 'pricing_metabox',
				'label' => __('Event Tickets & Datetimes (experimental)', 'event_espresso'),
				'priority' => 'high',
				'context' => 'normal'
				),

			);/**/

		$this->_remove_metaboxes = array(
			0 => array(
				'page_route' => array('edit', 'create_new'),
				'id' => 'espresso_event_editor_tickets',
				'context' => 'normal'
				)
			);

		$this->_scripts_styles = array(
			'registers' => array(
				'ee-tickets-datetimes-css' => array(
					'url' => EVENTS_ASSETS_URL . 'event-tickets-datetimes.css',
					'type' => 'css'
					),
				'ee-xp-ticket-metabox' => array(
					'url' => EVENTS_ASSETS_URL . 'xp-ticket-metabox.js',
					'depends' => array('jquery', 'ee-moment')
					)
				),
			'enqueues' => array(
				'ee-tickets-datetimes-css' => array( 'edit', 'create_new' ),
				'ee-xp-ticket-metabox' => array( 'edit', 'create_new' )
				),
			/*'localize' => array(
				'ee-prices-event-editor' => array(
					'PRICE_METABOX_ITEMS' => array(
						'adding_price_error' => __('There was a problem with adding the price.  No new price was generated', 'event_espresso')
						)
					)
				)/**/
			);

		add_action('AHEE__EE_Admin_Page_CPT_core_do_extra_autosave_stuff_Extend_Events_Admin_Page', array( $this, 'autosave_handling' ), 10 );

	}


	public function autosave_handling( $event_admin_obj ) {
		//todo when I get to this remember that I need to set the template args on the $event_admin_obj (use the set_template_args() method)
		
		/**
		 * need to remember to handle TICKET DEFAULT saves correctly:  I've got two input fields in the dom:
		 *
		 * 1. TKT_is_default_selector (visible)
		 * 2. TKT_is_default (hidden)
		 *
		 * I think we'll use the TKT_is_default for recording whether the ticket displayed IS a default ticket (on new event creations). Whereas the TKT_is_default_selector is for the user to indicate they want this ticket to be saved as a default.
		 *
		 * The tricky part is, on an initial display on create or edit (or after manually updating), the TKT_is_default_selector will always be unselected and the TKT_is_default will only be true if this is a create.  However, after an autosave, users will want some sort of indicator that the TKT HAS been saved as a default.. in other words we don't want to remove the check on TKT_is_default_selector. So here's what I'm thinking.
		 * On Autosave:
		 * 1. If TKT_is_default is true: we create a new TKT, send back the new id and add id to related elements, then set the TKT_is_default to false.
		 * 2. If TKT_is_default_selector is true: we create/edit existing ticket (following conditions above as well).  We do NOT create a new default ticket.  The checkbox stays selected after autosave.
		 * 3. only on MANUAL update do we check for the selection and if selected create the new default ticket. 
		 */
	}




	public function pricing_metabox() {
		echo 'IN PROGRESS';
		return;
	}


	/** experiemental box
	public function pricing_metabox() {
		$template = EVENTS_TEMPLATE_PATH . 'new_price_layout.template.php';
		espresso_display_template($template);
	} /**/



} //end class espresso_events_Pricing_Hooks