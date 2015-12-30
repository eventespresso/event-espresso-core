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
 * Extend_Registrations_Admin_Page
 *
 * This is the Registrations Caffeinated admin page.
 *
 *
 * @package		Extend_Registrations_Admin_Page
 * @subpackage	caffeinated/admin/extend/registrations/Extend_Registrations_Admin_Page.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Extend_EE_Attendee_Contact_List_Table extends EE_Attendee_Contact_List_Table {

	protected function _set_properties() {
		parent::_set_properties();
		$this->_bottom_buttons = array(
			'contact_list_report' => array(
				'route' => 'contact_list_report',
				'extra_request' =>  
						array( 
							'return_url' => urlencode( "//{$_SERVER['HTTP_HOST']}{$_SERVER['REQUEST_URI']}" ) ) 
			),
//			'contact_list_export'=> array(
//				'route' => 'contact_list_export'
//			)
		);
	}
}
