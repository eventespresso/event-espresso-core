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
 * @version		3.2.P
 *
 * ------------------------------------------------------------------------
 *
 * Events_Admin_Page
 *
 * This contains the logic for setting up the Events related pages.  Any methods without phpdoc comments have inline docs with parent class. 
 *
 * NOTE:  TODO: This is a straight conversion from the legacy 3.1 events related pages.  It is NOT optimized and will need modification to fully use the new system (and also will need adjusted when Events model is setup)
 *
 * @package		Events_Admin_Page
 * @subpackage	includes/core/admin/Events_Admin_Page.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Extend_Events_Admin_Page extends Events_Admin_Page {


	public function __construct() {
		parent::__construct();
	}


	protected function _extend_page_config() {
		$this->_page_routes['new_route'] = '_new_route_callback';

		//demo remove once we add the stuff!
		$this->_page_config['new_route'] = array(
			'nav' => array(
				'label' => __('New Tab', 'event_espresso'),
				'order' => 60
				),
			);

	}



	protected function _new_route_callback() {
		$this->_template_args['admin_page_content'] =  'this is a test';
		$this->display_admin_page_with_no_sidebar();
	}


} //end class Events_Admin_Page