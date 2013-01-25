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
 * Registration_Forms_Question_Groups_Admin_List_Table
 *
 * Class for preparing the table listing all the custom event Question_Groups
 *
 * note: anywhere there are no php docs it is because the docs are available in the parent class.
 *
 * @package		Registration_Forms_Question_Groups_Admin_List_Table
 * @subpackage	includes/core/admin/events/Registration_Forms_Question_Groups_Admin_List_Table.class.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */

class Registration_Forms_Question_Groups_Admin_List_Table extends EE_Admin_List_Table {


	public function __construct( $admin_page ) {
		parent::__construct($admin_page);
	}




	protected function _setup_data() {
		$this->_per_page = $this->get_items_per_page( $this->_screen . '_per_page' );
		$this->_data = $this->_view != 'trash' ? $this->_admin_page->get_question_groups( $this->_per_page, FALSE ) : $this->_admin_page->get_trashed_question_groups( $this->_per_page, FALSE );
		$this->_all_data_count = $this->_view != 'trash' ? $this->_admin_page->get_question_groups( $this->_per_page, TRUE ) : $this->_admin_page->get_trashed_question_groups( $this->_per_page, TRUE );
	}





	protected function _set_properties() {
		$this->_wp_list_args = array(
			'singular' => __('question group', 'event_espresso' ),
			'plural' => __('question groups', 'event_espresso' ),
			'ajax' => TRUE, //for now,
			'screen' => $this->_admin_page->get_current_screen()->id 
			);

		$this->_columns = array(
			'cb' => '<input type="checkbox" />',
			'id' => __('ID', 'event_espresso'),
			'name' => __('Group Name', 'event_espresso'),
			'identifier' => __('Identifier', 'event_espresso'),
			'description' => __('Description', 'event_espresso')
			);

		$this->_sortable_columns = array(
			'id' => array( 'q.id' => true ),
			'name' => array( 'q.question_group_name' => false )
			);

		$this->_hidden_columns = array(
			'id'
			);
	}






	//not needed
	protected function _get_table_filters() {
		return array();
	}





	protected function _add_view_counts() {
		$this->_views['all']['count'] = $this->_admin_page->get_question_groups( $this->_per_page, TRUE );
		$this->_views['trash']['count'] = $this->_admin_page->get_trashed_question_groups( $this->_per_page, TRUE );
	}






	public function column_cb($item) {
		return sprintf( '<input type="checkbox" name="question_id[]" value="%s" />', $item->id);
	}





	public function column_default($item) {
		switch($column_name) {
            case 'question_group_id':
				return $item[$column_name];
             default:
				return ( isset( $item->$column_name )) ? $item->$column_name : '';
        }
	}

	public function column_name($item) {}
	public function column_identifier($item) {}
	public function column_description($item) {}
	

} //end class Registration_Forms_Questions_Admin_List_Table