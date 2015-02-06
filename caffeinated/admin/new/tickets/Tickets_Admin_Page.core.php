<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			{@link http://eventespresso.com/support/terms-conditions/}   * see Plugin Licensing *
 * @ link				{@link http://www.eventespresso.com}
 * @ since		 		4.0
 *
 * ------------------------------------------------------------------------
 *
 * Tickets_Admin_Page class
 *
 * @package			Event Espresso
 * @subpackage		caffeinated/admin/new/tickets/Tickets_Admin_Page.core.php
 * @author			Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Tickets_Admin_Page extends EE_Admin_Page {


	protected function _init_page_props() {
		$this->page_slug = TICKETS_PG_SLUG;
		$this->page_label = TICKETS_LABEL;
		$this->_admin_base_url = TICKETS_ADMIN_URL;
		$this->_admin_base_path = TICKETS_ADMIN;
	}




	protected function _ajax_hooks() {}



	protected function _define_page_props() {
		$this->_admin_page_title = TICKETS_LABEL;
		$this->_labels = array(
			'buttons' => array(
				'add' => __('Add New Default Ticket', 'event_espresso'),
				'edit' => __('Edit Default Ticket', 'event_espresso'),
				'delete' => __('Delete Default Ticket', 'event_espresso'),
			)
		);
	}


	protected function _set_page_routes() {

		$tkt_id = ! empty( $this->_req_data['TKT_ID'] )  && ! is_array( $this->_req_data['TKT_ID'] ) ? $this->_req_data['TKT_ID'] : 0;

		$this->_page_routes = array(
			'default' => array(
				'func' => '_tickets_overview_list_table',
				'capability' => 'ee_read_default_tickets'
				),
			'trash_ticket' => array(
				'func' => '_trash_or_restore_ticket',
				'noheader' => TRUE,
				'args' => array( 'trash' => TRUE ),
				'capability' => 'ee_delete_default_ticket',
				'obj_id' => $tkt_id
				),
			'trash_tickets' => array(
				'func' => '_trash_or_restore_ticket',
				'noheader' => TRUE,
				'args' => array( 'trash' => TRUE ),
				'capability' => 'ee_delete_default_tickets'
				),
			'restore_ticket' => array(
				'func' => '_trash_or_restore_ticket',
				'noheader' => TRUE,
				'capability' => 'ee_delete_default_ticket',
				'obj_id' => $tkt_id
				),
			'restore_tickets' => array(
				'func' => '_trash_or_restore_ticket',
				'noheader' => TRUE,
				'capability' => 'ee_delete_default_tickets'
				),
			'delete_ticket' => array(
				'func' => '_delete_ticket',
				'noheader' => TRUE,
				'capability' => 'ee_delete_default_ticket',
				'obj_id' => $tkt_id
				),
			'delete_tickets' => array(
				'func' => '_delete_ticket',
				'noheader' => TRUE,
				'capability' => 'ee_delete_default_tickets'
				),
			);
	}



	protected function _set_page_config() {
		$this->_page_config = array(
			'default' => array(
				'nav' => array(
					'label' => __('Default Tickets', 'event_espresso'),
					'order' => 10
					),
				'list_table' => 'Tickets_List_Table',
				'require_nonce' => FALSE
				)
			);
	}


	protected function _add_screen_options() {}
	protected function _add_screen_options_default() {
		$this->_per_page_screen_option();
	}


	protected function _add_feature_pointers() {}

	public function load_scripts_styles() {}
	public function load_scripts_styles_default() {}
	public function admin_footer_scripts() {}
	public function admin_init() {}
	public function admin_notices() {}


	public function _set_list_table_views_default() {
		$this->_views = array(
			'all' => array(
				'slug' => 'all',
				'label' => __('All', 'event_espresso'),
				'count' => 0,
				'bulk_action' => array(
					'trash_tickets' => __('Move to Trash', 'event_espresso')
					)
				),
			'trashed' => array(
				'slug' => 'trashed',
				'label' => __('Trash', 'event_espresso'),
				'count' => 0,
				'bulk_action' => array(
					'restore_tickets' => __('Restore from Trash' , 'event_espresso'),
					'delete_tickets' => __('Delete Permanently', 'event_espresso')
					)
				)
			);
	}




	public function _tickets_overview_list_table() {
		$this->_search_btn_label = __('Tickets', 'event_espresso');
		$this->display_admin_list_table_page_with_no_sidebar();
	}




	public function get_default_tickets( $per_page = 10, $count = FALSE, $trashed = FALSE ) {

		$orderby= empty( $this->_req_data['orderby'] ) ? 'TKT_name' : $this->_req_data['orderby'];
		$order = empty( $this->_req_data['order'] ) ? 'ASC' : $order;

		switch ( $orderby ) {
			case 'TKT_name' :
				$orderby = array( 'TKT_name' => $order );
				break;

			case 'TKT_price' :
				$orderby = array( 'TKT_price' => $order );
				break;

			case 'TKT_uses' :
				$orderby = array( 'TKT_uses' => $order );
				break;

			case 'TKT_min' :
				$orderby = array( 'TKT_min' => $order );
				break;

			case 'TKT_max' :
				$orderby = array( 'TKT_max' => $order );
				break;

			case 'TKT_qty' :
				$orderby = array( 'TKT_qty' => $order );
				break;
		}

		$current_page = isset( $this->_req_data['paged'] ) && !empty( $this->_req_data['paged'] ) ? $this->_req_data['paged'] : 1;
		$per_page = isset( $this->_req_data['perpage'] ) && !empty( $this->_req_data['perpage'] ) ? $this->_req_data['perpage'] : $per_page;

		$_where = array(
			'TKT_is_default' => 1,
			'TKT_deleted' => $trashed
			);

		$offset = ($current_page-1)*$per_page;
		$limit = array( $offset, $per_page );

		if ( isset( $this->_req_data['s'] ) ) {
			$sstr = '%' . $this->_req_data['s'] . '%';
			$_where['OR'] = array(
				'TKT_name' => array('LIKE',$sstr ),
				'TKT_description' => array('LIKE',$sstr )
				);
		}

		$query_params = array(
			$_where,
			'order_by'=>$orderby,
			'limit'=>$limit,
			'group_by'=>'TKT_ID'
			);

		if($count){
			return EEM_Ticket::instance()->count_deleted_and_undeleted(array($_where));
		}else{
			return EEM_Ticket::instance()->get_all_deleted_and_undeleted($query_params);
		}

	}





	protected function _trash_or_restore_ticket(  $trash = FALSE ) {
		$success = 1;

		$TKT = EEM_Ticket::instance();

		//checkboxes?
		if ( !empty( $this->_req_data['checkbox'] ) && is_array( $this->_req_data['checkbox'] ) ) {
			//if array has more than one element then success message should be plural
			$success = count( $this->_req_data['checkbox'] ) > 1 ? 2 : 1;

			//cycle thru the boxes
			while ( list( $TKT_ID, $value ) = each( $this->_req_data['checkbox'] ) ) {
				if ( $trash ) {
					if ( ! $TKT->delete_by_ID( $TKT_ID ) )
						$success = 0;
				} else {
					if ( ! $TKT->restore_by_ID( $TKT_ID ) )
						$success = 0;
				}
			}
		} else {
			//grab single id and trash
			$TKT_ID = absint( $this->_req_data['TKT_ID'] );

			if ( $trash ) {
				if ( ! $TKT->delete_by_ID( $TKT_ID ) )
					$success = 0;
			} else {
				if ( ! $TKT->restore_by_ID( $TKT_ID ) )
					$success = 0;
			}
		}

		$action_desc = $trash ? 'moved to the trash' : 'restored';
		$this->_redirect_after_action( $success, 'Tickets', $action_desc, array() );
	}





	protected function _delete_ticket() {
		$success = 1;

		$TKT = EEM_Ticket::instance();

		//checkboxes?
		if ( !empty( $this->_req_data['checkbox'] ) && is_array( $this->_req_data['checkbox'] ) ) {
			//if array has more than one element then success message should be plural
			$success = count( $this->_req_data['checkbox'] ) > 1 ? 2 : 1;

			//cycle thru the boxes
			while ( list( $TKT_ID, $value ) = each( $this->_req_data['checkbox'] ) ) {
				//delete
				if ( ! $this->_delete_the_ticket( $TKT_ID ) ) {
					$success = 0;
				}
			}
		} else {
			//grab single id and trash
			$TKT_ID = absint( $this->_req_data['TKT_ID'] );
			if ( ! $this->_delete_the_ticket( $TKT_ID ) ) {
					$success = 0;
				}
		}

		$action_desc = 'deleted';
		$this->_redirect_after_action( $success, 'Tickets', $action_desc, array() );
	}




	protected function _delete_the_ticket( $TKT_ID ) {
		$tkt = EEM_Ticket::instance()->get_one_by_ID( $TKT_ID );

		//delete all related prices first
		$tkt->delete_related_permanently('Price');
		return $tkt->delete_permanently();
	}




} //end Tickets_Admin_Page class.
