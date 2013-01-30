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
require_once('EE_Question.class.php');
class Registration_Forms_Question_Groups_Admin_List_Table extends EE_Admin_List_Table {


	public function __construct( $admin_page ) {
		parent::__construct($admin_page);
	}




	protected function _setup_data() {
		$this->_per_page = $this->get_items_per_page( $this->_screen . '_per_page' );
		$this->_data = $this->_view != 'trash' ? $this->_admin_page->get_question_groups( $this->_per_page,$this->_current_page, FALSE ) : $this->_admin_page->get_trashed_question_groups( $this->_per_page,$this->_current_page, FALSE );
		$this->_all_data_count = $this->_view != 'trash' ? $this->_admin_page->get_question_groups( $this->_per_page,$this->_current_page, TRUE ) : $this->_admin_page->get_trashed_question_groups( $this->_per_page,$this->_current_page, TRUE );
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
			'id' => array( 'QSG_ID' => true ),
			'name' => array( 'QSG_name' => false ),
			'identifier'=>array('QSG_identifier'=>false)
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
		$this->_views['all']['count'] = $this->_admin_page->get_question_groups( $this->_per_page,$this->_current_page, TRUE );
		$this->_views['trash']['count'] = $this->_admin_page->get_trashed_question_groups( $this->_per_page,$this->_current_page, TRUE );
	}






	public function column_cb($item) {
		return sprintf( '<input type="checkbox" name="checkbox[%s]" value="%s" />', $item->ID(),$item->ID());
	}





	public function column_default(EE_Question_Group $item) {
		/*switch($column_name) {
            case 'question_group_id':
				return $item[$column_name];
             default:
				return ( isset( $item->$column_name )) ? $item->$column_name : '';
        }*/
	}

	public function column_name(EE_Question_Group $item) {
		//return $item->name();
			if ( !defined('ATT_ADMIN_URL') )
			define('ATT_ADMIN_URL', EVENTS_ADMIN_URL);

		$edit_query_args = array(
				'action' => 'edit_question_group',
				'QSG_ID' => $item->ID()
			);

		$trash_query_args = array(
				'action' => 'trash_question_group',
				'QSG_ID' => $item->ID()
			);



		$edit_link = wp_nonce_url( add_query_arg( $edit_query_args, EE_FORMS_ADMIN_URL ), 'edit_question_group_nonce');
		$trash_link = wp_nonce_url( add_query_arg( $trash_query_args, EE_FORMS_ADMIN_URL ), 'trash_question_group_nonce' );
		
		$actions = array(
			'edit' => '<a href="' . $edit_link . '" title="' . __('Edit Event', 'event_espresso') . '">' . __('Edit', 'event_espresso') . '</a>',
			'delete' => '<a href="' . $trash_link . '" title="' . __('Delete Event', 'event_espresso') . '">' . __('Trash', 'event_espresso') . '</a>',
			);

		$content = '<strong><a class="row-title" href="' . $edit_link . '">' . $item->name() . '</a></strong>';
		$content .= $this->row_actions($actions);
		return $content;
	}
	public function column_identifier(EE_Question_Group $item) {
		return $item->identifier();
	}
	public function column_description(EE_Question_Group $item) {
		return $item->desc();
	}
	

} //end class Registration_Forms_Questions_Admin_List_Table