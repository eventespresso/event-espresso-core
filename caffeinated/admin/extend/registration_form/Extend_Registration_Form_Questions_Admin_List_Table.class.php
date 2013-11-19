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
 * Extend_Registration_Form_Questions_Admin_List_Table
 *
 * Class for preparing the table listing all the custom event questions
 *
 * note: anywhere there are no php docs it is because the docs are available in the parent class.
 *
 * @package		Extend_Registration_Form_Questions_Admin_List_Table
 * @subpackage	caffeinated/admin/extend/registration_form/Extend_Registration_Form_Questions_Admin_List_Table.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */

class Extend_Registration_Form_Questions_Admin_List_Table extends Registration_Form_Questions_Admin_List_Table {

	public function __construct( $admin_page ) {
		parent::__construct( $admin_page );
	}


	protected function _setup_data() {
		$this->_per_page = $this->get_items_per_page( $this->_screen . '_per_page' );
		$this->_data = $this->_view != 'trash' ? $this->_admin_page->get_questions( $this->_per_page,$this->_current_page, FALSE ) : $this->_admin_page->get_trashed_questions( $this->_per_page,$this->_current_page, FALSE );
		$this->_all_data_count = $this->_view != 'trash' ? $this->_admin_page->get_questions( $this->_per_page,$this->_current_page, TRUE ) : $this->_admin_page->get_trashed_questions( $this->_per_page,$this->_current_page, TRUE );
	}


	protected function _add_view_counts() {
		$this->_views['all']['count'] = $this->_admin_page->get_questions( $this->_per_page,$this->_current_page, TRUE );
		$this->_views['trash']['count'] = $this->_admin_page->get_trashed_questions( $this->_per_page,$this->_current_page, TRUE );
	}

}