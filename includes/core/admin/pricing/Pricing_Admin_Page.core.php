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
 * Pricing_Admin_Page class
 *
 * @package			Event Espresso
 * @subpackage		includes/core/admin/pricing/Pricing_Admin_Page.core.php 
 * @author				Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class Pricing_Admin_Page extends EE_Admin_Page {


	/**
	 * _category
	 * This will hold the category object for category_details screen.
	 *
	 * @access protected
	 * @var object
	 */
	protected $_category;




	/**
	 * 	constructor
	 * 	@Constructor
	 * 	@access public
	 * 	@return void
	 */
	public function __construct() {		
		parent::__construct();
	}




	protected function _init_page_props() {
		$this->page_slug = PRICING_PG_SLUG;
		$this->page_label = PRICING_LABEL;
	}




	protected function _ajax_hooks() {
		//todo: all hooks for event_categories ajax goes in here.
	}





	protected function _define_page_props() {
		$this->_admin_base_url = PRICING_ADMIN_URL;
		$this->_admin_page_title = PRICING_LABEL;
		$this->_labels = array(
			'buttons' => array(
				'add' => __('Add New Price', 'event_espresso'),
				'edit' => __('Edit Price', 'event_espresso'),
				'delete' => __('Delete Price', 'event_espresso'),
				'add_type' => __('Add New Price Type', 'event_espresso'),
				'edit_type' => __('Edit Price Type', 'event_espresso'),
				'delete_type' => __('Delete Price Type', 'event_espresso')
			)
		);
	}







	/**
	 * 		an array for storing request actions and their corresponding methods
	*		@access private
	*		@return void
	*/	
	protected function _set_page_routes() {
		$this->_page_routes = array(
			'default' => array( 
					'func' => '_price_overview_list_table'
				),
			'add_new_price'	=> array( 
					'func' => '_edit_price_details', 
					'args' => array( 'new_price' => TRUE )
				),
			'edit_price'	=> array( 
					'func' => '_edit_price_details', 
					'args' => array( 'new_price' => FALSE )
				),
			'insert_price'	=> array( 
					'func' => '_insert_or_update_price', 
					'args' => array( 'new_price' => TRUE ), 
					'noheader' => TRUE 
				),
			'update_price'	=> array( 
					'func' => '_insert_or_update_price', 
					'args' => array( 'new_price' => FALSE ), 
					'noheader' => TRUE 
				),
			'trash_price'	=> array( 
					'func' => '_trash_or_restore_price',
					'args' => array( 'trash' => TRUE ), 
					'noheader' => TRUE 
				),
			'restore_price'	=> array( 
					'func' => '_trash_or_restore_price', 
					'args' => array( 'trash' => FALSE ), 
					'noheader' => TRUE 
				),
			'delete_price'	=> array( 
					'func' => '_delete_price',
					'noheader' => TRUE 
				),
			// price types
			'price_types'	=> array( 
					'func' => '_price_types_overview_list_table'
				),
			'add_new_price_type'	=> array( 
					'func' => '_edit_price_type_details'
				),
			'edit_price_type'	=> array( 
					'func' => '_edit_price_type_details'
				),
			'insert_price_type'	=> array( 
					'func' => '_insert_or_update_price_type', 
					'args' => array( 'new_price_type' => TRUE ),
					'noheader' => TRUE
				),
			'update_price_type' => array( 
					'func' => '_insert_or_update_price_type', 
					'args' => array( 'new_price_type' => FALSE ),
					'noheader' => TRUE
				),
			'trash_price_type'	=> array( 
					'func' => '_trash_or_restore_price_type', 
					'args' => array( 'trash' => TRUE ),
					'noheader' => TRUE
				),
			'restore_price_type'	=> array( 
					'func' => '_trash_or_restore_price_type', 
					'args' => array( 'trash' => FALSE ),
					'noheader' => TRUE
				),
			'delete_price_type'	=> array(
					'func' => '_delete_price_type',
					'noheader' => TRUE
				)			
		);
	}




	protected function _set_page_config() {
		$this->_page_config = array(
			'default' => array(
					'nav' => array(
							'label' => __('Prices', 'event_espresso'),
							'order' => 10
						),
					'list_table' => 'Prices_List_Table',
					'metaboxes' => array('_espresso_news_post_box', '_espresso_links_post_box'),
				),
			'add_new_price' => array(
					'nav' => array(
							'label' => __('Add New Price', 'event_espresso'),
							'order' => 20,
							'persistent' => FALSE
						),
					'metaboxes' => array( '_publish_post_box', '_espresso_news_post_box', '_price_details_meta_boxes' ),
				),
			'edit_price' => array(
					'nav' => array(
							'label' => __('Edit Price', 'event_espresso'),
							'order' => 20,
							'url' => isset($this->_req_data['id']) ? add_query_arg(array('id' => $this->_req_data['id'] ), $this->_current_page_view_url )  : $this->_admin_base_url,
							'persistent' => FALSE
						),
					'metaboxes' => array( '_publish_post_box', '_espresso_news_post_box', '_price_details_meta_boxes' )
				),
			'price_types' => array(
					'nav' => array(
							'label' => __('Price Types', 'event_espresso'),
							'order' => 30
						),
					'list_table' => 'Price_Types_List_Table',
					'metaboxes' => array('_editor_metaboxes')
				),
			'add_new_price_type' => array(
					'nav' => array(
							'label' => __('Add New Price Type', 'event_espresso'),
							'order' => 40,
							'persistent' => FALSE
						),
					'metaboxes' => array('_editor_metaboxes'),
				),
			'edit_price_type' => array(
					'nav' => array(
							'label' => __('Edit Price Type', 'event_espresso'),
							'order' => 40,
							'persistent' => FALSE
						),
					'metaboxes' => array('_editor_metaboxes')
				)
		);
	}





	protected function _add_screen_options() {
		//todo
	}





	protected function _add_screen_options_default() {
		$this->_per_page_screen_option();
	}





	protected function _add_help_tabs() {}
	protected function _add_feature_pointers() {}





	public function load_scripts_styles() {
		//styles
		wp_enqueue_style('jquery-ui-style');
		wp_register_style( 'espresso_PRICING', PRICING_ASSETS_URL . 'espresso_pricing_admin.css', array(), EVENT_ESPRESSO_VERSION );		
		wp_enqueue_style('espresso_PRICING');

		//scripts
		wp_enqueue_script('ee_admin_js');
		wp_enqueue_script('jquery-ui-position');
		wp_enqueue_script('jquery-ui-widget');
		//wp_enqueue_script('jquery-ui-dialog');
		//wp_enqueue_script('jquery-ui-draggable');
		//wp_enqueue_script('jquery-ui-datepicker');
		wp_register_script( 'espresso_PRICING', PRICING_ASSETS_URL . 'espresso_pricing_admin.js', array('jquery'), EVENT_ESPRESSO_VERSION, TRUE );
		wp_enqueue_script( 'espresso_PRICING' );	
	}





	public function admin_footer_scripts() {}
	public function admin_init() {}
	public function admin_notices() {}






	protected function _set_list_table_views_default() {
		$this->_views = array(
			'all' => array(
					'slug' => 'all',
					'label' => __('All', 'event_espreso'),
					'count' => 0,
					'bulk_action' => array(
							'trash_price' => __('Move to Trash', 'event_espresso'),
							'export_price' => __('Export Prices', 'event_espresso')
						)
				),
			'trashed' => array(
					'slug' => 'trashed',
					'label' => __('Trash Can', 'event_espreso'),
					'count' => 0,
					'bulk_action' => array(
							'restore_price' => __('Restore from Trash', 'event_espresso'),
							'delete_price' => __('Delete Permanently', 'event_espresso')
						)
				)
		);
	}






	protected function _set_list_table_views_price_types() {
		$this->_views = array(
			'all' => array(
					'slug' => 'all',
					'label' => __('All', 'event_espreso'),
					'count' => 0,
					'bulk_action' => array(
							'trash_price_type' => __('Move to Trash', 'event_espresso'),
							'export_price_type' => __('Export Price Types', 'event_espresso')
						)
				),
			'trashed' => array(
					'slug' => 'trashed',
					'label' => __('Trash Can', 'event_espreso'),
					'count' => 0,
					'bulk_action' => array(
							'restore_price_type' => __('Restore from Trash', 'event_espresso'),
							'delete_price_type' => __('Delete Permanently', 'event_espresso')
						)
				)
		);
	}






	/**
	 * 		generates HTML for main Prices Admin page
	*		@access protected
	*		@return void
	*/
	protected function _price_overview_list_table() {
		$this->_admin_page_title .= $this->_get_action_link_or_button('add_new_price', 'add', array(), 'button add-new-h2');
		$this->display_admin_list_table_page_with_no_sidebar();
	}






	/**
	*	retrieve data for Prices List table 
	*	@access public
	* 	@param  int  $perpage    how many prices displayed per page
	* 	@param  boolean $count   return the count or objects
	* 	@return mixed (int|array)  int = count || array of price objects
	*/
	public function get_prices_overview_data( $per_page = 10, $count = FALSE ) {  

		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
		// start with an empty array
		$event_pricing = array();
		
		require_once( PRICING_ADMIN . 'Prices_List_Table.class.php' );
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price.model.php');
		//$PRC = EEM_Price::instance();
		
		$this->_req_data['orderby'] = empty($this->_req_data['orderby']) ? '' : $this->_req_data['orderby'];
		
		switch ($this->_req_data['orderby']) {
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
		
		$trash = $this->_view == 'trash' ? TRUE : FALSE;

		$order = ( isset( $this->_req_data['order'] ) && ! empty( $this->_req_data['order'] )) ? $this->_req_data['order'] : 'ASC';
		$current_page = isset( $this->_req_data['paged'] ) && !empty( $this->_req_data['paged'] ) ? $this->_req_data['paged'] : 1;
		$per_page = isset( $this->_req_data['perpage'] ) && !empty( $this->_req_data['perpage'] ) ? $this->_req_data['perpage'] : $per_page;

		$offset = ($current_page-1)*$per_page;
		$limit = array( $offset, $per_page );

		$prices = EEM_Price::instance()->get_all_prices_that_are_global( $trash, $orderby, $order, $limit, $count );
		return $prices;
		
	}






	/**
	 * 		_price_details
	*		@access protected
	*		@return void
	*/
	protected function _edit_price_details() {		
	
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
		// change page title based on request action
		$this->_admin_page_title = ucwords( str_replace( '_', ' ', $this->_req_action ));
		// add PRC_ID to title if editing 
		$this->_admin_page_title = $PRC_ID ? $this->_admin_page_title . ' # ' . $PRC_ID : $this->_admin_page_title;
		
		// get prices
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price.model.php');
		$PRC = EEM_Price::instance();

			// grab price ID
		$PRC_ID = isset( $this->_req_data['id'] ) && ! empty( $this->_req_data['id'] ) ? absint( $this->_req_data['id'] ) : FALSE;
		if ( $PRC_ID ) {
			$price = $PRC->get_price_by_ID( $PRC_ID );
			$action = 'update_price';
			$additional_hidden_fields = array( 
					'PRC_ID' => array( 'type' => 'hidden', 'value' => $PRC_ID ),
				);	
		} else {
			$price = $PRC->get_new_price();
			$action = 'insert_price';
		}
		
		$this->_set_add_edit_form_tags( $action, $additional_hidden_fields );
		
		$this->_template_args['PRC_ID'] = $PRC_ID;
		$this->_template_args['price'] = $price;
	
		// get price types
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price_Type.model.php');
		$PRT = EEM_Price_Type::instance();
		
		if (empty($PRT->type)) {
			$msg = __( 'You have no price types defined. Please add a price type before adding a price.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			exit();
		} else {
			foreach ($PRT->type as $type) {
				if ($type->is_global()) {
					$price_types[] = array('id' => $type->ID(), 'text' => $type->name());
				}
			}
		}

		$this->_template_args['price_types'] = $price_types;
		$this->_template_args['learn_more_about_pricing_link'] = $this->_learn_more_about_pricing_link();

		$this->_set_publish_post_box_vars( 'id', $PRC_ID );
		// the details template wrapper
		$this->display_admin_page_with_sidebar();	
		
	}






	/**
	 * 		declare price details page metaboxes
	*		@access protected
	*		@return void
	*/
	protected function _price_details_meta_boxes() {		
		add_meta_box( 'edit-price-details-mbox', __( 'Price Details', 'event_espresso' ), array( $this, '_edit_price_details_meta_box' ), $this->wp_page_slug, 'normal', 'high' );		
	}






	/**
	 * 		_edit_price_details_meta_box
	*		@access public
	*		@return void
	*/
	public function _edit_price_details_meta_box() {		
		echo espresso_display_template( PRICING_TEMPLATE_PATH . 'PRICING_details_main_meta_box.template.php', $this->_template_args, TRUE );		
	}





	/**
	 * 		set_price_column_values
	*		@access protected
	*		@return array
	*/
	protected function set_price_column_values() {
	
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );

		//$_REQUEST['PRC_name'] = ucwords(strtolower($_REQUEST['PRC_name']));
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
	 * 		insert_or_update_price
	*		@param boolean 		$new_price - whether to insert or update
	*		@access protected
	*		@return void
	*/
	protected function _insert_or_update_price( $new_price = FALSE ) {
		
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
		
		$this->_redirect_after_admin_action( $success, 'Prices', $action_desc, array() );
			
	}
 




	/**
	 * 		_trash_or_restore_price
	*		@param boolean 		$trash - whether to move item to trash (TRUE) or restore it (FALSE)
	*		@access protected
	*		@return void
	*/
	protected function _trash_or_restore_price( $trash = TRUE ) {
	
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
		$this->_redirect_after_admin_action( $success, 'Prices', $action_desc, array() );
		
	}






	/**
	 * 		_delete_price
	*		@access protected
	*		@return void
	*/
	protected function _delete_price() {
	
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
		
		$this->_redirect_after_admin_action( $success, 'Prices', 'deleted', array() );
		
	}






	/**************************************************************************************************************************************************************
	  ********************************************************************  TICKET PRICE TYPES  ******************************************************************
	 **************************************************************************************************************************************************************/





	/**
	 * 		generates HTML for  Price Types Admin page tab
	*		@access protected
	*		@return void
	*/
	protected function _price_types_overview_list_table() { 
	
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );

		//generate URL for Add New Price link
		$add_new_price_type_url = wp_nonce_url( add_query_arg(array('action' => 'add_new_price_type'), PRICING_ADMIN_URL), 'add_new_price_type_nonce' );
		// add link to title
		$this->admin_page_title .= ' <a href="' . $add_new_price_type_url . '" class="button add-new-h2" style="margin: 0 20px;">' . __('Add New Price Type', 'event_espresso') . '</a>';
		$this->admin_page_title .= $this->_learn_more_about_pricing_link();
		// get prices
		$price_types = $this->_get_price_types();
		
		$this->_template_args['table_rows'] = count( $price_types );
		$entries_per_page_dropdown = $this->_entries_per_page_dropdown( $this->_template_args['table_rows'] );

		require_once( PRICING_ADMIN . 'EE_Price_Types_List_Table.class.php' );
		$this->_template_args['list_table'] = new EE_Price_Types_List_Table( $price_types, $this->_view, $this->_views, $entries_per_page_dropdown );

		// link back to here
		$this->_template_args['PRICING_overview_url'] = add_query_arg( array( 'noheader' => 'true' ), PRICING_ADMIN_URL );
		//$this->_template_args['noheader'] = 'true';
		$this->_template_args['status'] = $this->_view;
		$this->_template_args['view_RLs'] = $this->get_list_table_view_RLs();

		$this->_template_args['search']['btn_label'] = __( 'Search Price Types', 'event_espresso' );
		$this->_template_args['search']['callback'] = 'search_price_types';

		// path to template
		$template_path = PRICING_TEMPLATE_PATH . 'PRICING_admin_overview.template.php';
		$this->_template_args['admin_page_content'] = espresso_display_template( $template_path, $this->_template_args, TRUE );
		
		// the final template wrapper
		$this->display_admin_page_with_sidebar();	
	}





	/**
	 * 		get_price_types
	*		@access protected
	*		@return void
	*/
	protected function _get_price_types() {

		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );

		require_once( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price_Type.model.php' );
		$PRT = EEM_Price_Type::instance();

		// start with an empty array
		$price_types = array();

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
					$price_types[] = $type;
				}
			} else {
				$this->_views['in_use']['count']++;
				if ($this->_view == 'in_use') {
					$price_types[] = $type;
				}
			}
		}
		return $price_types;
	}






	/**
	 * 		_edit_price_type_details
	*		@access protected
	*		@return void
	*/
	protected function _edit_price_type_details() {		
	
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );

		$PRT_ID = isset( $_REQUEST['id'] ) && ! empty( $_REQUEST['id'] ) ? absint( $_REQUEST['id'] ) : FALSE;

		$title = __( ucwords( str_replace( '_', ' ', $this->_req_action )), 'event_espresso' );
		// add PRC_ID to title if editing 
		$title = $PRT_ID ? $title . ' # ' . $PRT_ID : $title;
		
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price_Type.model.php');
		$PRT = EEM_Price_Type::instance();
	
		if ( $PRT_ID ) {
			$price_type = $PRT->get_price_type_by_ID( $PRT_ID );
			$action = 'update_price_type';
			$edit_price_type_form_url = add_query_arg( array( 'action' => $action, 'id' => $PRT_ID, 'noheader' => TRUE ), PRICING_ADMIN_URL );
		} else {
			$price_type = $PRT->get_new_price_type();
			$action = 'insert_price_type';
			$edit_price_type_form_url = add_query_arg( array( 'action' => $action, 'noheader' => TRUE ), PRICING_ADMIN_URL );
		}

		$this->_template_args['PRT_ID'] = $PRT_ID;
		$this->_template_args['price_type'] = $price_type;
		$this->_template_args['action'] = $action;
		$this->_template_args['edit_price_type_form_url'] = $edit_price_type_form_url;

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
		
		$this->_template_args['base_type_select'] = select_input('base_type', $values, $set_value, 'id="price-type-base-type-slct"'); 		
		$this->_template_args['learn_more_about_pricing_link'] = $this->_learn_more_about_pricing_link();
		
		// add nav tab for this details page
		$this->nav_tabs['edit_price_type']['url'] = wp_nonce_url( add_query_arg( array( 'action'=>$action, 'id' => $PRT_ID ), PRICING_ADMIN_URL ), $action . '_nonce' );  
		$this->nav_tabs['edit_price_type']['link_text'] = $PRT_ID ? __( 'Price Type Details', 'event_espresso' ) : __( 'Add New Price Type', 'event_espresso' );
		$this->nav_tabs['edit_price_type']['css_class'] = ' nav-tab-active';
		$this->nav_tabs['edit_price_type']['order'] = 25;

		// generate metabox - you MUST create a callback named __FUNCTION__ . '_meta_box'  ( see "_edit_price_type_details_meta_box" below )
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
	
		//$_REQUEST['PRT_name'] = ucwords(strtolower($_REQUEST['PRT_name']));
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
	 * 		_edit_price_type_details_meta_box
	*		@access public
	*		@return void
	*/
	public function _edit_price_type_details_meta_box() {		
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
		$template_path = PRICING_TEMPLATE_PATH . 'PRICING_type_details_main_meta_box.template.php';
		echo espresso_display_template( $template_path, $this->_template_args, TRUE );		
	}






	/**
	 * 		_insert_or_update_price_type
	*		@param boolean 		$new_price_type - whether to insert or update
	*		@access protected
	*		@return void
	*/
	protected function _insert_or_update_price_type( $new_price_type = FALSE ) {
		
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
		$this->_redirect_after_admin_action( $success, 'Price Type', $action_desc, $query_args );
			
	}
 




	/**
	 * 		_trash_or_restore_price_type
	*		@param boolean 		$trash - whether to move item to trash (TRUE) or restore it (FALSE)
	*		@access protected
	*		@return void
	*/
	protected function _trash_or_restore_price_type( $trash = TRUE ) {
	
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
			$what = count( $_POST['checkbox'] ) > 1 ? 'Price Types' : 'Price Type';
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
			$what = 'Price Type';
			
		}
		
		$action_desc = $trash ? 'moved to the trash' : 'restored';
		$query_args = array( 'action'=> 'price_types' );
		$this->_redirect_after_admin_action( $success, $what, $action_desc, $query_args );
		
	}






	/**
	 * 		_delete_price_type
	*		@access protected
	*		@return void
	*/
	protected function _delete_price_type() {
	
		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );

		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Price_Type.model.php');
		$PRT = EEM_Price_Type::instance();
		
		$success = 1;
		//Checkboxes
		if (!empty($_POST['checkbox']) && is_array($_POST['checkbox'])) {
			// if array has more than one element than success message should be plural
			$success = count( $_POST['checkbox'] ) > 1 ? 2 : 1;
			$what = count( $_POST['checkbox'] ) > 1 ? 'Prices' : 'Price';
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
			$what = 'Price';
			
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
		// overwrite default success messages
		EE_Error::overwrite_success();
		// how many records affected ? more than one record ? or just one ?
		if ( $success == 2 ) {
			// set plural msg
			$msg = sprintf( __( 'The %s have been successfully %s.', 'event_espresso' ), $what, $action_desc );
			EE_Error::add_success( $msg, __FILE__, __FUNCTION__, __LINE__ );

		} else if ( $success == 1 ) {
			// set singular msg
			$msg = sprintf( __( 'The %s has been successfully %s.', 'event_espresso' ), $what, $action_desc );
			EE_Error::add_success( $msg, __FILE__, __FUNCTION__, __LINE__ );
		}

		// check that $query_args isn't something crazy
		if ( ! is_array( $query_args )) {
			$query_args = array();
		}
		// grab messages
		$notices = EE_Error::get_notices( FALSE, TRUE, TRUE, FALSE );
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

		$redirect_url = add_query_arg( $query_args, PRICING_ADMIN_URL ); 
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
// end of file:  includes/core/admin/pricing/Pricing_Admin_Page.core.php