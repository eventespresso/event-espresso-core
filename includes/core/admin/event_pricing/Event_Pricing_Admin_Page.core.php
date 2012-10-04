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
 * @ link					{@link http://www.eventespresso.com}
 * @ since		 		3.2.P
 *
 * ------------------------------------------------------------------------
 *
 * Event_Pricing_Admin_Page class
 *
 * @package			Event Espresso
 * @subpackage	includes/core/admin/event_pricing/Event_Pricing_Admin_Page.core.php 
 * @subpackage	includes/core/admin/event_pricing/Event_Pricing_Admin_Page.core.php 
 * @author				Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class Event_Pricing_Admin_Page extends EE_Admin_Page implements Admin_Page_Interface {

	private $_event_pricing;
	private $_session;
	private static $_reg_status;





	/**
	 * 		constructor
	 * 		@Constructor
	 * 		@access public
	 * 		@return void
	 */
	public function __construct( $_is_UI_request ) {

		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';	
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
		
		$this->page_slug = EVT_PRC_PG_SLUG;
		$this->default_nav_tab_name = 'prices';
		// is this request for UI or backend 
		$this->_is_UI_request = $_is_UI_request;
		
		$this->_init();
		
		// add ajax calls here
		if ( $this->_AJAX ) {
		}
		
		if ( $this->_is_UI_request ) {
			add_action( 'admin_init', array( &$this, '_set_bulk_actions' ));
			// add nav tab for price types page	
			add_filter( 'filter_hook_espresso_admin_page_nav_tabs', array( $this, '_add_price_types_to_admin_page_nav_tabs' ));
			// remove reports tab
			add_filter( 'filter_hook_espresso_admin_page_nav_tabs', array( $this, '_remove_reports_from_admin_page_nav_tabs' ), 10 , 1 );
			// remove settings tab
			add_filter( 'filter_hook_espresso_admin_page_nav_tabs', array( $this, '_remove_settings_from_admin_page_nav_tabs' ), 10 , 1 );			
		}

		
	}





	/**
	 * 		define_page_vars
	*		@access private
	*		@return void
	*/
	public function define_page_vars() {
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
		$this->admin_base_url = EVT_PRC_ADMIN_URL;
		$this->admin_page_title = __( 'Event Pricing', 'event_espresso' );
	}






	/**
	 * 		an array for storing key => value pairs of request actions and their corresponding methods
	*		@access private
	*		@return void
	*/
	public function set_page_routes() {			

		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );

		$this->_page_routes = array(
				// prices
				'default'	=> '_event_price_overview_list_table',
				'add_new_event_price'	=> array( 'func' => '_edit_event_price_details', 'args' => array( 'new_price' => TRUE )),
				'edit_event_price'	=> array( 'func' => '_edit_event_price_details', 'args' => array( 'new_price' => FALSE )),
				'insert_event_price'	=> array( 'func' => '_insert_or_update_event_price', 'args' => array( 'new_price' => TRUE )),
				'update_event_price'	=> array( 'func' => '_insert_or_update_event_price', 'args' => array( 'new_price' => FALSE )),
				'trash_event_price'	=> array( 'func' => '_trash_or_restore_event_price', 'args' => array( 'trash' => TRUE )),
				'restore_event_price'	=> array( 'func' => '_trash_or_restore_event_price', 'args' => array( 'trash' => FALSE )),
				'delete_event_price'	=> '_delete_event_price',
				// price types
				'price_types'	=> '_event_price_types_overview_list_table',
				'add_new_event_price_type'	=> '_edit_event_price_type_details',
				'edit_event_price_type'	=> '_edit_event_price_type_details',
				'insert_event_price_type'	=> array( 'func' => '_insert_or_update_event_price_type', 'args' => array( 'new_price_type' => TRUE )),
				'update_event_price_type' => array( 'func' => '_insert_or_update_event_price_type', 'args' => array( 'new_price_type' => FALSE )),
				'trash_event_price_type'	=> array( 'func' => '_trash_or_restore_event_price_type', 'args' => array( 'trash' => TRUE )),
				'restore_event_price_type'	=> array( 'func' => '_trash_or_restore_event_price_type', 'args' => array( 'trash' => FALSE )),
				'delete_event_price_type'	=> '_delete_event_price_type'
		);

	}





	/**
	 * 		_set_bulk_actions
	*		@access public
	*		@return void
	*/
	public function _set_bulk_actions() {
	
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';

		// lists of bulk actions
		$price_bulk_actions = array( 'trash_event_price', 'restore_event_price', 'delete_event_price' );
		$price_type_bulk_actions = array( 'trash_event_price_type', 'restore_event_price_type', 'delete_event_price_type' );
		
		if ( $this->_req_action == 'default' ) {
//			echo '<h1>1 !!!</h1>';
			$this->_views['in_use']['bulk_action'] = array( 'trash_event_price' => 'Move to Trash' );
			$this->_views['trashed']['bulk_action'] = array( 'restore_event_price' => 'Restore From Trash', 'delete_event_price' => 'Delete Permanently' );
		} else if ( $this->_req_action == 'price_types' ) {
//			echo '<h1>2 !!!</h1>';
			$this->_views['in_use']['bulk_action'] = array( 'trash_event_price_type' => 'Move to Trash' );
			$this->_views['trashed']['bulk_action'] = array( 'restore_event_price_type' => 'Restore From Trash', 'delete_event_price_type' => 'Delete Permanently' );
		} else if ( in_array( $this->_req_action, $price_bulk_actions )) {
//			echo '<h1>3 !!!</h1>';
			// POST request
			if ( ! empty( $_POST )) {
				// reset requested nonce value - name = 'bulk-' . $this->_args['plural']  ( with spaces removed from $this->_args['plural'] )
				$this->_req_nonce = 'bulk-prices';				
			}
			// set bulk actions
			$this->_views['in_use']['bulk_action'] = array( 'trash_event_price' => 'Move to Trash' );
			$this->_views['trashed']['bulk_action'] = array( 'restore_event_price' => 'Restore From Trash', 'delete_event_price' => 'Delete Permanently' );
		} else if ( in_array( $this->_req_action, $price_type_bulk_actions )) {
//			echo '<h1>4 !!!</h1>';
			// POST request
			if ( ! empty( $_POST )) {
				// reset requested nonce value - name = 'bulk-' . $this->_args['plural']  ( with spaces removed from $this->_args['plural'] )
				$this->_req_nonce = 'bulk-pricestypes';
			}
			// set bulk actions
			$this->_views['in_use']['bulk_action'] = array( 'trash_event_price_type' => 'Move to Trash' );
			$this->_views['trashed']['bulk_action'] = array( 'restore_event_price_type' => 'Restore From Trash', 'delete_event_price_type' => 'Delete Permanently' );
		} 

//		echo '<h4>$this->_req_action : ' . $this->_req_action . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		echo '<h4>$this->_req_nonce : ' . $this->_req_nonce . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		echo '<h4>$this->view : ' . $this->_view . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';

	}





	/**
	 * 		add price_types tab to admin_page_nav_tabs
	*		@access private
	*		@param array	$nav_tabs
	*		@return array
	*/
	public function _add_price_types_to_admin_page_nav_tabs( $nav_tabs = array() ) {
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
		$nav_tabs['price_types']['url'] = wp_nonce_url( add_query_arg( array( 'action'=>'price_types' ), EVT_PRC_ADMIN_URL ), 'price_types_nonce' );  
		$nav_tabs['price_types']['link_text'] = __( 'Price Types', 'event_espresso' );
		$nav_tabs['price_types']['css_class'] = '';
		$nav_tabs['price_types']['order'] = 20;
		return $nav_tabs;		
	}






	/**
	 * 		generates HTML for main Event Prices Admin page
	*		@access protected
	*		@return void
	*/
	protected function _event_price_overview_list_table() {

		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
		//generate URL for Add New Price link
		$add_new_price_url = wp_nonce_url( add_query_arg( array( 'action' => 'add_new_event_price' ), EVT_PRC_ADMIN_URL ), 'add_new_event_price_nonce' );
		// add link to title
		$this->admin_page_title .= ' <a href="' . $add_new_price_url . '" class="button add-new-h2" style="margin-left: 20px;">' . __('Add New Price', 'event_espresso') . '</a>';
		$this->admin_page_title .= $this->_learn_more_about_pricing_link();
		
		$event_pricing = $this->_get_event_pricing();
		$this->template_args['table_rows'] = count( $event_pricing );
		$entries_per_page_dropdown = $this->_entries_per_page_dropdown( $this->template_args['table_rows'] );

		$this->template_args['view_RLs'] = $this->get_list_table_view_RLs();
		$this->template_args['list_table'] = new EE_Prices_List_Table( $event_pricing, $this->_view, $this->_views, $entries_per_page_dropdown );

		// link back to here
		$this->template_args['evt_prc_overview_url'] = add_query_arg( array( 'noheader' => 'true' ), EVT_PRC_ADMIN_URL );
		//$this->template_args['noheader'] = 'true';
		$this->template_args['status'] = $this->_view;
		// path to template
		$template_path = EVT_PRC_TEMPLATE_PATH . 'evt_prc_admin_overview.template.php';
		$this->template_args['admin_page_content'] = espresso_display_template( $template_path, $this->template_args, TRUE );
		
		// the final template wrapper
		$this->display_admin_page_with_sidebar();	
 
	}





	/**
	 * 		_get_event_pricing
	*		@access protected
	*		@return array
	*/
	protected function _get_event_pricing() {  

		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
		// start with an empty array
		$event_pricing = array();
		
		require_once( EVT_PRC_ADMIN . 'EE_Prices_List_Table.class.php' );
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price.model.php');
		$PRC = EEM_Price::instance();
		
		$_GET['orderby'] = empty($_GET['orderby']) ? '' : $_GET['orderby'];
		
		switch ($_GET['orderby']) {
			case 'name':
				$orderby = 'prc.PRC_name';
				break;
			case 'type':
				$orderby = 'prt.PRT_name';
				break;
			case 'amount':
				$orderby = 'prc.PRC_amount';
				break;
			default:
				$orderby = 'prc.PRC_ID';
		}
		
		$order = ( isset( $_GET['order'] ) && ! empty( $_GET['order'] )) ? $_GET['order'] : 'ASC';

		if ( $prices = $PRC->get_all_prices_that_are_global($orderby, $order)) {
			//printr( $prices, '$prices <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
			foreach ($prices as $price) {
				if ($price->deleted()) {
					$this->_views['trashed']['count']++;
					if ($this->_view == 'trashed') {
						$event_pricing[] = $price;
					}
				} else {
					$this->_views['in_use']['count']++;
					if ($this->_view == 'in_use') {
						$event_pricing[] = $price;
					}
				}
			}
		}
		return $event_pricing;
	}






	/**
	 * 		_event_price_details
	*		@access protected
	*		@return void
	*/
	protected function _edit_event_price_details() {		
	
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
		global $espresso_notices;
		
		$PRC_ID = isset( $_REQUEST['id'] ) && ! empty( $_REQUEST['id'] ) ? absint( $_REQUEST['id'] ) : FALSE;

		$title = __( ucwords( str_replace( '_', ' ', $this->_req_action )), 'event_espresso' );
		// add PRC_ID to title if editing 
		$title = $PRC_ID ? $title . ' # ' . $PRC_ID : $title;
		
		// get prices
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price.model.php');
		$PRC = EEM_Price::instance();

		if ( $PRC_ID ) {
			$price = $PRC->get_price_by_ID( $PRC_ID );
			$action = 'update_event_price';
			$edit_event_price_form_url = add_query_arg( array( 'action' => $action, 'id' => $PRC_ID, 'noheader' => TRUE ), EVT_PRC_ADMIN_URL );
		} else {
			$price = $PRC->get_new_price();
			$action = 'insert_event_price';
			$edit_event_price_form_url = add_query_arg( array( 'action' => $action, 'noheader' => TRUE ), EVT_PRC_ADMIN_URL );
		}
		
		$this->template_args['PRC_ID'] = $PRC_ID;
		$this->template_args['price'] = $price;

		$this->template_args['action'] = $action;
		$this->template_args['edit_event_price_form_url'] = $edit_event_price_form_url;
	
		// get price types
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price_Type.model.php');
		$PRT = EEM_Price_Type::instance();
		
		if (empty($PRT->type)) {
			$espresso_notices['errors'][] = __('You have no price types defined. Please add a price type before adding a price.', 'event_espresso');
			exit();
		} else {
			foreach ($PRT->type as $type) {
				if ($type->is_global()) {
					$price_types[] = array('id' => $type->ID(), 'text' => $type->name());
				}
			}
		}

		$this->template_args['price_types'] = $price_types;
		$this->template_args['learn_more_about_pricing_link'] = $this->_learn_more_about_pricing_link();
		
		// add nav tab for this details page
		$this->nav_tabs['edit_event_price']['url'] = wp_nonce_url( add_query_arg( array( 'action'=>$action, 'id' => $PRC_ID ), EVT_PRC_ADMIN_URL ), $action . '_nonce' );  
		$this->nav_tabs['edit_event_price']['link_text'] = $PRC_ID ? __( 'Price Details', 'event_espresso' ) : __( 'Add New Price', 'event_espresso' );
		$this->nav_tabs['edit_event_price']['css_class'] = ' nav-tab-active';
		$this->nav_tabs['edit_event_price']['order'] = 15;

		// generate metabox - you MUST create a callback named __FUNCTION__ . '_meta_box'  ( see "_edit_event_price_details_meta_box" below )
		$this->_template_path = EVT_PRC_TEMPLATE_PATH . 'evt_prc_details_main_meta_box.template.php';
		$this->_add_admin_page_meta_box( $action, $title, __FUNCTION__, NULL );

		// the final template wrapper
		$this->display_admin_page_with_sidebar();
		
	}





	/**
	 * 		set_price_column_values
	*		@access protected
	*		@return array
	*/
	protected function set_price_column_values() {
	
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );

		$_REQUEST['PRC_name'] = ucwords(strtolower($_REQUEST['PRC_name']));
		$_REQUEST['PRC_name'] = htmlentities(wp_strip_all_tags($_REQUEST['PRC_name']), ENT_QUOTES, 'UTF-8');
	
		$set_column_values = array(
				'PRT_ID' => absint($_REQUEST['PRT_ID']),
				'EVT_ID' => 0,
				'PRC_amount' => floatval ($_REQUEST['PRC_amount']),
				'PRC_name' => $_REQUEST['PRC_name'],
				'PRC_desc' => htmlentities(wp_strip_all_tags($_REQUEST['PRC_desc']), ENT_QUOTES, 'UTF-8'),
				'PRC_use_dates' => absint($_REQUEST['PRC_use_dates']),
				'PRC_start_date' => NULL,
				'PRC_end_date' => NULL,
				'PRC_disc_code' => ( ! empty( $_REQUEST['PRC_disc_code'] )) ? wp_strip_all_tags($_REQUEST['PRC_disc_code']) : NULL,
				'PRC_disc_limit_qty' => absint($_REQUEST['PRC_disc_limit_qty']),
				'PRC_disc_qty' => absint($_REQUEST['PRC_disc_qty']),
				'PRC_disc_apply_all' => absint($_REQUEST['PRC_disc_apply_all']),
				'PRC_disc_wp_user' => absint($_REQUEST['PRC_disc_wp_user']),
				'PRC_overrides' => NULL,
				'PRC_order' => 0,
				'PRC_is_active' => absint($_REQUEST['PRC_is_active']),
				'PRC_deleted' => 0,
				'PRC_reg_limit' => NULL,
				'PRC_tckts_left' => NULL
		);
		return $set_column_values;
	}





	/**
	 * 		_edit_event_price_details_meta_box
	*		@access public
	*		@return void
	*/
	public function _edit_event_price_details_meta_box() {		
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
		$template_path = EVT_PRC_TEMPLATE_PATH . 'evt_prc_details_main_meta_box.template.php';
		echo espresso_display_template( $template_path, $this->template_args, TRUE );		
	}






	/**
	 * 		insert_or_update_event_price
	*		@param boolean 		$new_price - whether to insert or update
	*		@access protected
	*		@return void
	*/
	protected function _insert_or_update_event_price( $new_price = FALSE ) {
		
		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );

		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price.model.php');
		$PRC = EEM_Price::instance();

		// why be so pessimistic ???  : (
		$success = 0;

		$set_column_values = $this->set_price_column_values();
		// is this a new Price ?
		if ( $new_price ) {
			// run the insert
			if ( $PRC->insert( $set_column_values )) {
				$success = 1;
			} 
			$action_desc = 'created';
		} else {
			// run the update
			$where_cols_n_values = array( 'PRC_ID' => $_REQUEST['PRC_ID'] );
			if ( $PRC->update( $set_column_values, $where_cols_n_values )) {
				$success = 1;
			}
			$action_desc = 'updated';
		}
		
		$this->_redirect_after_admin_action( $success, 'Event Prices', $action_desc, array() );
			
	}
 




	/**
	 * 		_trash_or_restore_event_price
	*		@param boolean 		$trash - whether to move item to trash (TRUE) or restore it (FALSE)
	*		@access protected
	*		@return void
	*/
	protected function _trash_or_restore_event_price( $trash = TRUE ) {
	
		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );

		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price.model.php');
		$PRC = EEM_Price::instance();
	
		$success = 1;
		$PRC_deleted = $trash ? TRUE : FALSE;
		//Checkboxes
		if (!empty($_POST['checkbox']) && is_array($_POST['checkbox'])) {
			// if array has more than one element than success message should be plural
			$success = count( $_POST['checkbox'] ) > 1 ? 2 : 1;
			// cycle thru checkboxes 
			while (list( $PRC_ID, $value ) = each($_POST['checkbox'])) {
				if ( ! $PRC->update(array('PRC_deleted' => $PRC_deleted), array('PRC_ID' => absint($PRC_ID)))) {
					$success = 0;
				}
			}
			
		} else {
			// grab single id and delete
			$PRC_ID = absint($_REQUEST['id']);
			if ( ! $PRC->update(array('PRC_deleted' => $PRC_deleted), array('PRC_ID' => absint($PRC_ID)))) {
				$success = 0;
			}
			
		}
		
		$action_desc = $trash ? 'moved to the trash' : 'restored';
		$this->_redirect_after_admin_action( $success, 'Event Prices', $action_desc, array() );
		
	}






	/**
	 * 		_delete_event_price
	*		@access protected
	*		@return void
	*/
	protected function _delete_event_price() {
	
		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );

		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price.model.php');
		$PRC = EEM_Price::instance();
		
		$success = 1;
		//Checkboxes
		if (!empty($_POST['checkbox']) && is_array($_POST['checkbox'])) {
			// if array has more than one element than success message should be plural
			$success = count( $_POST['checkbox'] ) > 1 ? 2 : 1;
			// cycle thru bulk action checkboxes
			while (list( $PRC_ID, $value ) = each($_POST['checkbox'])) {
				if (!$PRC->delete_by_id(absint($PRC_ID))) {
					$success = 0;
				}
			}
	
		} else {
			// grab single id and delete
			$PRC_ID = absint($_REQUEST['id']);
			if ( ! $PRC->delete_by_id($PRC_ID)) {
				$success = 0;
			}
			
		}
		
		$this->_redirect_after_admin_action( $success, 'Event Prices', 'deleted', array() );
		
	}






	/**************************************************************************************************************************************************************
	  ********************************************************************  TICKET PRICE TYPES  ******************************************************************
	 **************************************************************************************************************************************************************/





	/**
	 * 		generates HTML for  Event Price Types Admin page tab
	*		@access protected
	*		@return void
	*/
	protected function _event_price_types_overview_list_table() { 
	
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );

		//generate URL for Add New Price link
		$add_new_price_type_url = wp_nonce_url( add_query_arg(array('action' => 'add_new_event_price_type'), EVT_PRC_ADMIN_URL), 'add_new_event_price_type_nonce' );
		// add link to title
		$this->admin_page_title .= ' <a href="' . $add_new_price_type_url . '" class="button add-new-h2" style="margin: 0 20px;">' . __('Add New Price Type', 'event_espresso') . '</a>';
		$this->admin_page_title .= $this->_learn_more_about_pricing_link();
		// get prices
		$event_price_types = $this->_get_event_price_types();
		
		$this->template_args['table_rows'] = count( $event_price_types );
		$entries_per_page_dropdown = $this->_entries_per_page_dropdown( $this->template_args['table_rows'] );

		require_once( EVT_PRC_ADMIN . 'EE_Price_Types_List_Table.class.php' );
		$this->template_args['list_table'] = new EE_Price_Types_List_Table( $event_price_types, $this->_view, $this->_views, $entries_per_page_dropdown );

		// link back to here
		$this->template_args['evt_prc_overview_url'] = add_query_arg( array( 'noheader' => 'true' ), EVT_PRC_ADMIN_URL );
		//$this->template_args['noheader'] = 'true';
		$this->template_args['status'] = $this->_view;
		$this->template_args['view_RLs'] = $this->get_list_table_view_RLs();

		$this->template_args['search']['btn_label'] = __( 'Search Event Price Types', 'event_espresso' );
		$this->template_args['search']['callback'] = 'search_event_price_types';

		// path to template
		$template_path = EVT_PRC_TEMPLATE_PATH . 'evt_prc_admin_overview.template.php';
		$this->template_args['admin_page_content'] = espresso_display_template( $template_path, $this->template_args, TRUE );
		
		// the final template wrapper
		$this->display_admin_page_with_sidebar();	
	}





	/**
	 * 		get_event_price_types
	*		@access protected
	*		@return void
	*/
	protected function _get_event_price_types() {

		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );

		require_once( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price_Type.model.php' );
		$PRT = EEM_Price_Type::instance();

		// start with an empty array
		$event_price_types = array();

		$_GET['orderby'] = empty( $_GET['orderby'] ) ? '' : $_GET['orderby'];
		switch ($_GET['orderby']) {
			case 'name':
				$orderby = 'PRT_name';
				break;
			default:
				$orderby = 'PRT_order';
		}

		$order = ( isset( $_GET['order'] ) && ! empty( $_GET['order'] )) ? strtoupper( sanitize_keys( $_GET['order'] )) : 'ASC';

		$types = $PRT->get_all_price_types($orderby, $order);
		//printr( $types, '$types <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		foreach ($types as $type) {
			if ($type->deleted()) {
				$this->_views['trashed']['count']++;
				if ($this->_view == 'trashed') {
					$event_price_types[] = $type;
				}
			} else {
				$this->_views['in_use']['count']++;
				if ($this->_view == 'in_use') {
					$event_price_types[] = $type;
				}
			}
		}
		return $event_price_types;
	}






	/**
	 * 		_edit_event_price_type_details
	*		@access protected
	*		@return void
	*/
	protected function _edit_event_price_type_details() {		
	
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
		global $espresso_notices;

		$PRT_ID = isset( $_REQUEST['id'] ) && ! empty( $_REQUEST['id'] ) ? absint( $_REQUEST['id'] ) : FALSE;

		$title = __( ucwords( str_replace( '_', ' ', $this->_req_action )), 'event_espresso' );
		// add PRC_ID to title if editing 
		$title = $PRT_ID ? $title . ' # ' . $PRT_ID : $title;
		
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price_Type.model.php');
		$PRT = EEM_Price_Type::instance();
	
		if ( $PRT_ID ) {
			$price_type = $PRT->get_price_type_by_ID( $PRT_ID );
			$action = 'update_event_price_type';
			$edit_event_price_type_form_url = add_query_arg( array( 'action' => $action, 'id' => $PRT_ID, 'noheader' => TRUE ), EVT_PRC_ADMIN_URL );
		} else {
			$price_type = $PRT->get_new_price_type();
			$action = 'insert_event_price_type';
			$edit_event_price_type_form_url = add_query_arg( array( 'action' => $action, 'noheader' => TRUE ), EVT_PRC_ADMIN_URL );
		}

		$this->template_args['PRT_ID'] = $PRT_ID;
		$this->template_args['price_type'] = $price_type;
		$this->template_args['action'] = $action;
		$this->template_args['edit_event_price_type_form_url'] = $edit_event_price_type_form_url;

		// set base type
		$values = array(
									array('id' => 'Price', 'text' 			=> __('Base Price', 'event_espresso') . '&nbsp;&nbsp;' ),
									array('id' => 'Discount', 'text' 	=> __('Discount', 'event_espresso') . '&nbsp;&nbsp;' ),
									array('id' => 'Surcharge', 'text' 	=> __('Surcharge', 'event_espresso') . '&nbsp;&nbsp;' ),
									array('id' => 'Tax', 'text' 			=> __('Tax', 'event_espresso') . '&nbsp;&nbsp;' )
								);
		$set_value = 'Price';						
		foreach ( $values as $value ) {
			$pos = strpos( $price_type->name(), $value['id'] );
			if ( $pos !== FALSE ) {
				$set_value = $value['id'];
			}
		}
		
		$this->template_args['base_type_select'] = select_input('base_type', $values, $set_value, 'id="price-type-base-type-slct"'); 		
		$this->template_args['learn_more_about_pricing_link'] = $this->_learn_more_about_pricing_link();
		
		// add nav tab for this details page
		$this->nav_tabs['edit_event_price_type']['url'] = wp_nonce_url( add_query_arg( array( 'action'=>$action, 'id' => $PRT_ID ), EVT_PRC_ADMIN_URL ), $action . '_nonce' );  
		$this->nav_tabs['edit_event_price_type']['link_text'] = $PRT_ID ? __( 'Price Type Details', 'event_espresso' ) : __( 'Add New Price Type', 'event_espresso' );
		$this->nav_tabs['edit_event_price_type']['css_class'] = ' nav-tab-active';
		$this->nav_tabs['edit_event_price_type']['order'] = 25;

		// generate metabox - you MUST create a callback named __FUNCTION__ . '_meta_box'  ( see "_edit_event_price_type_details_meta_box" below )
		$this->_add_admin_page_meta_box( $action, $title, __FUNCTION__, NULL );

		// the final template wrapper
		$this->display_admin_page_with_sidebar();
		
	}





	/**
	 * 		set_price_type_column_values
	*		@access protected
	*		@return void
	*/
	protected function set_price_type_column_values() {
	
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );

		$base_type = wp_strip_all_tags( $_REQUEST['base_type'] );
		$name = ucwords( strtolower( wp_strip_all_tags( $_REQUEST['PRT_name'] )));
	
		switch ($base_type) {
	
			case 'Price' :
				$_REQUEST['PRT_is_discount'] = 0;
				$_REQUEST['PRT_is_tax'] = 0;
				$_REQUEST['PRT_is_percent'] = 0;
				$_REQUEST['PRT_order'] = 0;
	
				$pos = strpos($name, ' Price');
				$trunc = strlen($name) - 6;
				if ($pos == $trunc) {
					$name = substr($name, 0, $trunc);
				}
				$name = trim($name) . ' Price';
				$_REQUEST['PRT_name'] = $name;
				break;
	
			case 'Discount' :
				$_REQUEST['PRT_is_discount'] = 1;
				$pos = strpos($name, ' Discount');
				$trunc = strlen($name) - 9;
				if ($pos == $trunc) {
					$name = substr($name, 0, $trunc);
				}
				$name = trim($name) . ' Discount';
				$_REQUEST['PRT_name'] = $name;
				break;
	
			case 'Surcharge' :
				$_REQUEST['PRT_is_discount'] = 0;
				$_REQUEST['PRT_is_tax'] = 0;
				$pos = strpos($name, ' Surcharge');
				$trunc = strlen($name) - 10;
				if ($pos == $trunc) {
					$name = substr($name, 0, $trunc);
				}
				$name = trim($name) . ' Surcharge';
				$_REQUEST['PRT_name'] = $name;
				break;
	
			case 'Tax' :
				$_REQUEST['PRT_is_discount'] = 0;
				$_REQUEST['PRT_is_tax'] = 1;
				$_REQUEST['PRT_is_percent'] = 1;
				$pos = strpos($name, ' Tax');
				$trunc = strlen($name) - 4;
				if ($pos == $trunc) {
					$name = substr($name, 0, $trunc);
				}
				$name = trim($name) . ' Tax';
				$_REQUEST['PRT_name'] = $name;
				break;
		}
	
		$_REQUEST['PRT_name'] = ucwords(strtolower($_REQUEST['PRT_name']));
		$_REQUEST['PRT_name'] = htmlentities($_REQUEST['PRT_name'], ENT_QUOTES, 'UTF-8');
	
		$set_column_values = array(
				'PRT_name' => $_REQUEST['PRT_name'],
				'PRT_is_member' => absint($_REQUEST['PRT_is_member']),
				'PRT_is_discount' => absint($_REQUEST['PRT_is_discount']),
				'PRT_is_tax' => absint($_REQUEST['PRT_is_tax']),
				'PRT_is_percent' => absint($_REQUEST['PRT_is_percent']),
				'PRT_is_global' => absint($_REQUEST['PRT_is_global']),
				'PRT_order' => absint($_REQUEST['PRT_order'])
		);
	
		return $set_column_values;
	//		echo printr( $set_column_values, '$set_column_values' );	
	//		echo printr( $where_cols_n_values, '$where_cols_n_values' );	
	}





	/**
	 * 		_edit_event_price_type_details_meta_box
	*		@access public
	*		@return void
	*/
	public function _edit_event_price_type_details_meta_box() {		
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
		$template_path = EVT_PRC_TEMPLATE_PATH . 'evt_prc_type_details_main_meta_box.template.php';
		echo espresso_display_template( $template_path, $this->template_args, TRUE );		
	}






	/**
	 * 		_insert_or_update_event_price_type
	*		@param boolean 		$new_price_type - whether to insert or update
	*		@access protected
	*		@return void
	*/
	protected function _insert_or_update_event_price_type( $new_price_type = FALSE ) {
		
//		echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );

		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price_Type.model.php');
		$PRT = EEM_Price_Type::instance();

		// why be so pessimistic ???  : (
		$success = 0;

		$set_column_values = $this->set_price_type_column_values();
		// is this a new Price ?
		if ( $new_price_type ) {
			// run the insert
			if ( $PRT->insert( $set_column_values )) {
				$success = 1;
			} 
			$action_desc = 'created';
		} else {
			// run the update
			$where_cols_n_values = array('PRT_ID' => absint($_REQUEST['PRT_ID']));
			if ( $PRT->update( $set_column_values, $where_cols_n_values )) {
				$success = 1;
			}
			$action_desc = 'updated';
		}
		
		$query_args = array( 'action'=> 'price_types' );
		$this->_redirect_after_admin_action( $success, 'Event Price Type', $action_desc, $query_args );
			
	}
 




	/**
	 * 		_trash_or_restore_event_price_type
	*		@param boolean 		$trash - whether to move item to trash (TRUE) or restore it (FALSE)
	*		@access protected
	*		@return void
	*/
	protected function _trash_or_restore_event_price_type( $trash = TRUE ) {
	
		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );

		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price_Type.model.php');
		$PRT = EEM_Price_Type::instance();
	
		$success = 1;
		$PRT_deleted = $trash ? TRUE : FALSE;
		//Checkboxes
		if (!empty($_POST['checkbox']) && is_array($_POST['checkbox'])) {
			// if array has more than one element than success message should be plural
			$success = count( $_POST['checkbox'] ) > 1 ? 2 : 1;
			$what = count( $_POST['checkbox'] ) > 1 ? 'Event Price Types' : 'Event Price Type';
			// cycle thru checkboxes 
			while (list( $PRT_ID, $value ) = each($_POST['checkbox'])) {
				if ( ! $PRT->update(array('PRT_deleted' => $PRT_deleted), array('PRT_ID' => absint($PRT_ID)))) {
					$success = 0;
				}
			}
			
		} else {
			// grab single id and delete
			$PRT_ID = absint($_REQUEST['id']);
			if ( ! $PRT->update(array('PRT_deleted' => $PRT_deleted), array('PRT_ID' => absint($PRT_ID)))) {
				$success = 0;
			}
			$what = 'Event Price Type';
			
		}
		
		$action_desc = $trash ? 'moved to the trash' : 'restored';
		$query_args = array( 'action'=> 'price_types' );
		$this->_redirect_after_admin_action( $success, $what, $action_desc, $query_args );
		
	}






	/**
	 * 		_delete_event_price_type
	*		@access protected
	*		@return void
	*/
	protected function _delete_event_price_type() {
	
		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );

		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price_Type.model.php');
		$PRT = EEM_Price_Type::instance();
		
		$success = 1;
		//Checkboxes
		if (!empty($_POST['checkbox']) && is_array($_POST['checkbox'])) {
			// if array has more than one element than success message should be plural
			$success = count( $_POST['checkbox'] ) > 1 ? 2 : 1;
			$what = count( $_POST['checkbox'] ) > 1 ? 'Event Prices' : 'Event Price';
			// cycle thru bulk action checkboxes
			while (list( $PRT_ID, $value ) = each($_POST['checkbox'])) {
				if (!$PRT->delete_by_id(absint($PRT_ID))) {
					$success = 0;
				}
			}
	
		} else {
			// grab single id and delete
			$PRT_ID = absint($_REQUEST['id']);
			if ( ! $PRT->delete_by_id($PRT_ID)) {
				$success = 0;
			}
			$what = 'Event Price';
			
		}

//echo '<h4>$PRT_ID : ' . $PRT_ID . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//echo '<h4>$success : ' . $success . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//echo '<h4>$what : ' . $what . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';

		
		$query_args = array( 'action'=> 'price_types' );
		$this->_redirect_after_admin_action( $success, $what, 'deleted', $query_args );
		
	}





	/**
	 * 		_redirect_after_admin_action
	*		@param int 		$success 				- whether success was for two or more records, or just one, or none
	*		@param string 	$what 					- what the action was performed on
	*		@param string 	$action_desc 		- what was done ie: updated, deleted, etc
	*		@param int 		$query_args		- an array of query_args to be added to the URL to redirect to after the admin action is completed
	*		@access private
	*		@return void
	*/
	private function _redirect_after_admin_action( $success = FALSE, $what = 'item', $action_desc = 'processed',  $query_args = array() ) {		
	
		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );		
		global $espresso_notices;
		// overwrite default success messages
		$espresso_notices['success'] = array();
		// how many records affected ? more than one record ? or just one ?
		if ( $success == 2 ) {
			// set plural msg
			$espresso_notices['success'][] = __('The ' . $what . ' have been successfully ' . $action_desc . '.', 'event_espresso');
		} else if ( $success == 1 ) {
			// set singular msg
			$espresso_notices['success'][] = __('The ' . $what . ' has been successfully ' . $action_desc . '.', 'event_espresso');
		}

		// check that $query_args isn't something crazy
		if ( ! is_array( $query_args )) {
			$query_args = array();
		}
		// grab messages
		$notices = espresso_get_notices( FALSE, TRUE, TRUE, FALSE );
		//combine $query_args and $notices
		$query_args = array_merge( $query_args, $notices );
		// generate redirect url

		// if redirecting to anything other than the main page, add a nonce
		if ( isset( $query_args['action'] )) {
			// manually generate wp_nonce
			$nonce = array( '_wpnonce' => wp_create_nonce( $query_args['action'] . '_nonce' ));
			// and merge that with the query vars becuz the wp_nonce_url function wrecks havoc on some vars
			$query_args = array_merge( $query_args, $nonce );
		} 
		//printr( $query_args, '$query_args  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

		$redirect_url = add_query_arg( $query_args, EVT_PRC_ADMIN_URL ); 
		//echo '<h4>$redirect_url : ' . $redirect_url . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
		//die();
		wp_safe_redirect( $redirect_url );	
		exit();
	}






	/**
	 * 		_learn_more_about_pricing_link
	*		@access protected
	*		@return string
	*/
	protected function _learn_more_about_pricing_link() {
		return '<a class="hidden" style="margin:0 20px; cursor:pointer; font-size:12px;" >' . __('learn more about how pricing works', 'event_espresso') . '</a>';
	}




}
// end of file:  includes/core/admin/event_pricing/Event_Pricing_Admin_Page.core.php