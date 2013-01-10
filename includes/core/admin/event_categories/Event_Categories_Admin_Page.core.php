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
 * Event_Categories_Admin_Page
 *
 * This contains the logic for setting up the Event Category related admin pages.  Any methods without phpdoc comments have inline docs with parent class. 
 *
 * NOTE:  TODO: This is a straight conversion from the legacy 3.1 event category related pages.  It is NOT optimized and will need modification to fully use the new system (and also will need adjusted when Event Categories model is setup)
 *
 * @package		Event_Categories_Admin_Page
 * @subpackage	includes/core/admin/Event_Categories_Admin_Page.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Event_Categories_Admin_Page extends EE_Admin_Page {


	public function __construct($wp_page_slug) {
		parent::__construct($wp_page_slug);
	}




	protected function _init_page_props() {
		$this->page_slug = 'event_categories';
	}




	protected function _ajax_hooks() {
		//todo: all hooks for event_categories ajax goes in here.
	}






	protected function _define_page_props() {
		$this->_admin_base_url = EE_CATS_ADMIN_URL;
		$this->_admin_page_title = __('Event Categories', 'event_espresso');
		$this->_labels = array(
			'buttons' => array(
				'add' => __('Add New Category', 'event_espresso'),
				'edit' => __('Edit Category', 'event_espresso'),
				'delete' => __('Delete Category', 'event_espresso')
			)
		);
	}





	protected function _set_page_routes() {
		$this->_page_routes = array(
			
		);
	}
}