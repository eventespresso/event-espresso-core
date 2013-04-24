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


	public function __construct ( EE_Admin_Page $admin_page ) {
		parent::__construct( $admin_page );
	}




	protected function _set_hooks_properties() {
		$this->_name = 'pricing';
		//if we were going to add our own metaboxes we'd use the below.
		/*$this->_metaboxes = array(
			0 => array(
				'page_route' => 'edit_event',
				'func' => 'pricing_metabox',
				'label' => __('Event Pricing', 'event_espresso'),
				'priority' => 'core',
				'context' => 'normal'
				),

			);*/
	
		add_filter('espresso_hook_espresso_show_no_event_price_msg', array($this, 'no_price_message' ) );

	}




	public function edit_event_action_hook_espresso_metaboxes() {
		//if we were going to remove the default metabox we'd add this.
		//remove_meta_box( 'espresso_event_editor_pricing', $this->_adminpage_obj->get_current_screen()->id, 'normal' );
		return;
	}



	public function no_price_message( $message ) {
		return sprintf( __('Please enter at lease one Event Price for this Event, or one Default Event Price to ensure that this Event displays and functions properly. Default Event Prices can be set on the %sPricing Management%s.', 'event_espresso'), '<a href="' . admin_url( 'admin.php?page=espresso_pricing' ). '">', '</a>' );
	}



	public function pricing_metabox() {}


} //end class espresso_events_Pricing_Hooks