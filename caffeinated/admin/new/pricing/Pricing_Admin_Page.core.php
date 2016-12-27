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
 * @ since		 		4.0
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
	 *    constructor
	 *
	 * @Constructor
	 * @access public
	 * @param bool $routing
	 * @return Pricing_Admin_Page
	 */
	public function __construct( $routing = TRUE ) {
		parent::__construct( $routing );
	}




	protected function _init_page_props() {
		$this->page_slug = PRICING_PG_SLUG;
		$this->page_label = PRICING_LABEL;
		$this->_admin_base_url = PRICING_ADMIN_URL;
		$this->_admin_base_path = PRICING_ADMIN;
	}




	protected function _ajax_hooks() {
		add_action('wp_ajax_espresso_update_prices_order', array( $this, 'update_price_order' ));
	}





	protected function _define_page_props() {
		$this->_admin_page_title = PRICING_LABEL;
		$this->_labels = array(
			'buttons' => array(
				'add' => __('Add New Default Price', 'event_espresso'),
				'edit' => __('Edit Default Price', 'event_espresso'),
				'delete' => __('Delete Default Price', 'event_espresso'),
				'add_type' => __('Add New Default Price Type', 'event_espresso'),
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
		$prc_id = ! empty( $this->_req_data['PRC_ID'] ) && ! is_array( $this->_req_data['PRC_ID'] ) ? $this->_req_data['PRC_ID'] : 0;
		$prt_id =  ! empty( $this->_req_data['PRT_ID'] ) && ! is_array( $this->_req_data['PRT_ID'] ) ? $this->_req_data['PRT_ID'] : 0;
		$this->_page_routes = array(
			'default' => array(
					'func' => '_price_overview_list_table',
					'capability' => 'ee_read_default_prices'
				),
			'add_new_price'	=> array(
					'func' => '_edit_price_details',
					'args' => array( 'new_price' => TRUE ),
					'capability' => 'ee_edit_default_prices'
				),
			'edit_price'	=> array(
					'func' => '_edit_price_details',
					'args' => array( 'new_price' => FALSE ),
					'capability' => 'ee_edit_default_price',
					'obj_id' => $prc_id
				),
			'insert_price'	=> array(
					'func' => '_insert_or_update_price',
					'args' => array( 'new_price' => TRUE ),
					'noheader' => TRUE,
					'capability' => 'ee_edit_default_prices',
				),
			'update_price'	=> array(
					'func' => '_insert_or_update_price',
					'args' => array( 'new_price' => FALSE ),
					'noheader' => TRUE,
					'capability' => 'ee_edit_default_price',
					'obj_id' => $prc_id
				),
			'trash_price'	=> array(
					'func' => '_trash_or_restore_price',
					'args' => array( 'trash' => TRUE ),
					'noheader' => TRUE,
					'capability' => 'ee_delete_default_price',
					'obj_id' => $prc_id
				),
			'restore_price'	=> array(
					'func' => '_trash_or_restore_price',
					'args' => array( 'trash' => FALSE ),
					'noheader' => TRUE,
					'capability' => 'ee_delete_default_price',
					'obj_id' => $prc_id
				),
			'delete_price'	=> array(
					'func' => '_delete_price',
					'noheader' => TRUE,
					'capability' => 'ee_delete_default_price',
					'obj_id' => $prc_id
				),
			'espresso_update_price_order' => array(
				'func' => 'update_price_order',
				'noheader' => TRUE,
				'capability' => 'ee_edit_default_prices'
				),
			// price types
			'price_types'	=> array(
					'func' => '_price_types_overview_list_table',
					'capability' => 'ee_read_default_price_types'
				),
			'add_new_price_type'	=> array(
					'func' => '_edit_price_type_details',
					'capability' => 'ee_edit_default_price_types'
				),
			'edit_price_type'	=> array(
					'func' => '_edit_price_type_details',
					'capability' => 'ee_edit_default_price_type',
					'obj_id' => $prt_id
				),
			'insert_price_type'	=> array(
					'func' => '_insert_or_update_price_type',
					'args' => array( 'new_price_type' => TRUE ),
					'noheader' => TRUE,
					'capability' => 'ee_edit_default_price_types'
				),
			'update_price_type' => array(
					'func' => '_insert_or_update_price_type',
					'args' => array( 'new_price_type' => FALSE ),
					'noheader' => TRUE,
					'capability' => 'ee_edit_default_price_type',
					'obj_id' => $prt_id
				),
			'trash_price_type'	=> array(
					'func' => '_trash_or_restore_price_type',
					'args' => array( 'trash' => TRUE ),
					'noheader' => TRUE,
					'capability' => 'ee_delete_default_price_type',
					'obj_id' => $prt_id
				),
			'restore_price_type'	=> array(
					'func' => '_trash_or_restore_price_type',
					'args' => array( 'trash' => FALSE ),
					'noheader' => TRUE,
					'capability' => 'ee_delete_default_price_type',
					'obj_id' => $prt_id
				),
			'delete_price_type'	=> array(
					'func' => '_delete_price_type',
					'noheader' => TRUE,
					'capability' => 'ee_delete_default_price_type',
					'obj_id' => $prt_id
				),
            'tax_settings' => array(
                'func'       => '_tax_settings',
                'capability' => 'manage_options'
            ),
            'update_tax_settings' => array(
                'func'       => '_update_tax_settings',
                'capability' => 'manage_options',
                'noheader'   => true
            ),
        );
	}




	protected function _set_page_config() {

		$this->_page_config = array(
			'default' => array(
					'nav' => array(
							'label' => __('Default Pricing', 'event_espresso'),
							'order' => 10
						),
					'list_table' => 'Prices_List_Table',
                    'help_tabs' => array(
						'pricing_default_pricing_help_tab' => array(
							'title' => __('Default Pricing', 'event_espresso'),
							'filename' => 'pricing_default_pricing'
							),
						'pricing_default_pricing_table_column_headings_help_tab' => array(
							'title' => __('Default Pricing Table Column Headings', 'event_espresso'),
							'filename' => 'pricing_default_pricing_table_column_headings'
							),
						'pricing_default_pricing_views_bulk_actions_search_help_tab' => array(
							'title' => __('Default Pricing Views & Bulk Actions & Search', 'event_espresso'),
							'filename' => 'pricing_default_pricing_views_bulk_actions_search'
							)
						),
					'help_tour' => array( 'Pricing_Default_Prices_Help_Tour'),
					'require_nonce' => FALSE
				),
			'add_new_price' => array(
					'nav' => array(
							'label' => __('Add New Default Price', 'event_espresso'),
							'order' => 20,
							'persistent' => FALSE
						),
                    'help_tabs' => array(
						'add_new_default_price_help_tab' => array(
							'title' => __('Add New Default Price', 'event_espresso'),
							'filename' => 'pricing_add_new_default_price'
							)
						),
                    'help_tour' => array('Pricing_Add_New_Default_Price_Help_Tour'),
					'metaboxes' => array( '_publish_post_box', '_espresso_news_post_box', '_price_details_meta_boxes' ),
					'require_nonce' => FALSE
				),
			'edit_price' => array(
					'nav' => array(
							'label' => __('Edit Default Price', 'event_espresso'),
							'order' => 20,
							'url' => isset($this->_req_data['id']) ? add_query_arg(array('id' => $this->_req_data['id'] ), $this->_current_page_view_url )  : $this->_admin_base_url,
							'persistent' => FALSE
						),
					'metaboxes' => array( '_publish_post_box', '_espresso_news_post_box', '_price_details_meta_boxes' ),
                    'help_tabs' => array(
						'edit_default_price_help_tab' => array(
							'title' => __('Edit Default Price', 'event_espresso'),
							'filename' => 'pricing_edit_default_price'
							)
						),
					'help_tour' => array( 'Pricing_Edit_Default_Price_Help_Tour' ),
					'require_nonce' => FALSE
				),
			'price_types' => array(
					'nav' => array(
							'label' => __('Price Types', 'event_espresso'),
							'order' => 30
						),
					'list_table' => 'Price_Types_List_Table',
                    'help_tabs' => array(
						'pricing_price_types_help_tab' => array(
							'title' => __('Price Types', 'event_espresso'),
							'filename' => 'pricing_price_types'
							),
						'pricing_price_types_table_column_headings_help_tab' => array(
							'title' => __('Price Types Table Column Headings', 'event_espresso'),
							'filename' => 'pricing_price_types_table_column_headings'
							),
						'pricing_price_types_views_bulk_actions_search_help_tab' => array(
							'title' => __('Price Types Views & Bulk Actions & Search', 'event_espresso'),
							'filename' => 'pricing_price_types_views_bulk_actions_search'
							),
						),
					'help_tour' => array( 'Pricing_Price_Types_Default_Help_Tour' ),
					'metaboxes' => array('_espresso_news_post_box', '_espresso_links_post_box'),
					'require_nonce' => FALSE
				),
			'add_new_price_type' => array(
					'nav' => array(
							'label' => __('Add New Price Type', 'event_espresso'),
							'order' => 40,
							'persistent' => FALSE
						),
                    'help_tabs' => array(
						'add_new_price_type_help_tab' => array(
							'title' => __('Add New Price Type', 'event_espresso'),
							'filename' => 'pricing_add_new_price_type'
							)
						),
                    'help_tour' => array( 'Pricing_Add_New_Price_Type_Help_Tour' ),
					'metaboxes' => array( '_publish_post_box', '_espresso_news_post_box', '_price_type_details_meta_boxes' ),
					'require_nonce' => FALSE
				),
			'edit_price_type' => array(
					'nav' => array(
							'label' => __('Edit Price Type', 'event_espresso'),
							'order' => 40,
							'persistent' => FALSE
						),
                    'help_tabs' => array(
						'edit_price_type_help_tab' => array(
							'title' => __('Edit Price Type', 'event_espresso'),
							'filename' => 'pricing_edit_price_type'
							)
						),
                    'help_tour' => array( 'Pricing_Edit_Price_Type_Help_Tour' ),
					'metaboxes' => array( '_publish_post_box', '_espresso_news_post_box', '_price_type_details_meta_boxes' ),

					'require_nonce' => FALSE
				),
            'tax_settings' => array(
                'nav'           => array(
                    'label' => esc_html__('Tax Settings', 'event_espresso'),
                    'order' => 40
                ),
                'labels'        => array(
                    'publishbox' => esc_html__('Update Tax Settings', 'event_espresso')
                ),
                'metaboxes'     => array_merge($this->_default_espresso_metaboxes, array('_publish_post_box')),
                // 'help_tabs'     => array(
                //     'registration_form_reg_form_settings_help_tab' => array(
                //         'title'    => esc_html__('Registration Form Settings', 'event_espresso'),
                //         'filename' => 'registration_form_reg_form_settings'
                //     ),
                // ),
                // 'help_tour'     => array('Registration_Form_Settings_Help_Tour'),
                'require_nonce' => true
            )
        );
	}


	protected function _add_screen_options() {
		//todo
	}


	protected function _add_screen_options_default() {
		$this->_per_page_screen_option();
	}


	protected function _add_screen_options_price_types() {
		$page_title = $this->_admin_page_title;
		$this->_admin_page_title = __('Price Types', 'event_espresso');
		$this->_per_page_screen_option();
		$this->_admin_page_title = $page_title;
	}




	protected function _add_feature_pointers() {}





	public function load_scripts_styles() {
		//styles
		wp_enqueue_style('espresso-ui-theme');
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





	public function load_scripts_styles_default() {
		wp_enqueue_script( 'espresso_ajax_table_sorting' );
	}





	public function admin_footer_scripts() {}
	public function admin_init() {}
	public function admin_notices() {}






	protected function _set_list_table_views_default() {
		$this->_views = array(
			'all' => array(
					'slug' => 'all',
					'label' => __('View All Default Pricing', 'event_espresso'),
					'count' => 0,
					'bulk_action' => array(
							'trash_price' => __('Move to Trash', 'event_espresso')
						)
				)
		);

		if ( EE_Registry::instance()->CAP->current_user_can( 'ee_delete_default_prices', 'pricing_trash_price' ) ) {
			$this->_views['trashed'] = array(
					'slug' => 'trashed',
					'label' => __('Trash', 'event_espresso'),
					'count' => 0,
					'bulk_action' => array(
							'restore_price' => __('Restore from Trash', 'event_espresso'),
							'delete_price' => __('Delete Permanently', 'event_espresso')
						)
				);
		}
	}






	protected function _set_list_table_views_price_types() {
		$this->_views = array(
			'all' => array(
					'slug' => 'all',
					'label' => __('All', 'event_espresso'),
					'count' => 0,
					'bulk_action' => array(
							'trash_price_type' => __('Move to Trash', 'event_espresso')
						)
				)
		);

		if ( EE_Registry::instance()->CAP->current_user_can( 'ee_delete_default_price_types', 'pricing_trash_price_type' ) ) {
			 $this->_views['trashed'] = array(
					'slug' => 'trashed',
					'label' => __('Trash', 'event_espresso'),
					'count' => 0,
					'bulk_action' => array(
							'restore_price_type' => __('Restore from Trash', 'event_espresso'),
							'delete_price_type' => __('Delete Permanently', 'event_espresso')
						)
				);
		}
	}


	/**
	 * 		generates HTML for main Prices Admin page
	*		@access protected
	*		@return void
	*/
	protected function _price_overview_list_table() {
		$this->_admin_page_title .= ' ' . $this->get_action_link_or_button(
		    'add_new_price',
            'add',
            array(),
            'add-new-h2'
        );
		$this->admin_page_title .= $this->_learn_more_about_pricing_link();
		$this->_search_btn_label = __('Default Prices', 'event_espresso');
		$this->display_admin_list_table_page_with_no_sidebar();
	}






	/**
	*	retrieve data for Prices List table
	*	@access public
	* 	@param  int  $per_page    how many prices displayed per page
	* 	@param  boolean $count   return the count or objects
	* 	@param  boolean $trashed   whether the current view is of the trash can - eww yuck!
	* 	@return mixed (int|array)  int = count || array of price objects
	*/
	public function get_prices_overview_data( $per_page = 10, $count = FALSE, $trashed = FALSE ) {

		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		// start with an empty array
		$event_pricing = array();

		require_once( PRICING_ADMIN . 'Prices_List_Table.class.php' );
		require_once(EE_MODELS . 'EEM_Price.model.php');
		//$PRC = EEM_Price::instance();

		$this->_req_data['orderby'] = empty($this->_req_data['orderby']) ? '' : $this->_req_data['orderby'];
		$order = ( isset( $this->_req_data['order'] ) && ! empty( $this->_req_data['order'] )) ? $this->_req_data['order'] : 'ASC';

		switch ($this->_req_data['orderby']) {
			case 'name':
				$orderby = array('PRC_name'=>$order);
				break;
			case 'type':
				$orderby = array('Price_Type.PRT_name'=>$order);
				break;
			case 'amount':
				$orderby = array('PRC_amount'=>$order);
				break;
			default:
				$orderby = array( 'PRC_order'=>$order, 'Price_Type.PRT_order'=>$order, 'PRC_ID'=>$order);
		}

		$current_page = isset( $this->_req_data['paged'] ) && !empty( $this->_req_data['paged'] ) ? $this->_req_data['paged'] : 1;
		$per_page = isset( $this->_req_data['perpage'] ) && !empty( $this->_req_data['perpage'] ) ? $this->_req_data['perpage'] : $per_page;

		$_where = array(
				'PRC_is_default' => 1,
				'PRC_deleted' => $trashed
				);

		$offset = ($current_page-1)*$per_page;
		$limit = array( $offset, $per_page );

		if ( isset( $this->_req_data['s'] ) ) {
			$sstr = '%' . $this->_req_data['s'] . '%';
			$_where['OR'] = array(
				'PRC_name' => array('LIKE',$sstr ),
				'PRC_desc' => array('LIKE',$sstr ),
				'PRC_amount' => array( 'LIKE',$sstr ),
				'Price_Type.PRT_name' => array( 'LIKE', $sstr )
				);
		}

		$query_params = array(
			$_where,
			'order_by'=>$orderby,
			'limit'=>$limit,
			'group_by'=>'PRC_ID'
			);

		if($count){
			return $trashed ? EEM_Price::instance()->count( array( $_where ) ) : EEM_Price::instance()->count_deleted_and_undeleted(array($_where));
		}else{
			return EEM_Price::instance()->get_all_deleted_and_undeleted($query_params);
		}
	}






	/**
	 * 		_price_details
	*		@access protected
	*		@return void
	*/
	protected function _edit_price_details() {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		// grab price ID
		$PRC_ID = isset( $this->_req_data['id'] ) && ! empty( $this->_req_data['id'] ) ? absint( $this->_req_data['id'] ) : FALSE;
		// change page title based on request action
		switch( $this->_req_action ) {
			case 'add_new_price' :
				$this->_admin_page_title = esc_html__( 'Add New Price', 'event_espresso' );
				break;
			case 'edit_price' :
				$this->_admin_page_title = esc_html__( 'Edit Price', 'event_espresso' );
				break;
			default :
				$this->_admin_page_title = ucwords( str_replace( '_', ' ', $this->_req_action ));
		}
		// add PRC_ID to title if editing
		$this->_admin_page_title = $PRC_ID ? $this->_admin_page_title . ' # ' . $PRC_ID : $this->_admin_page_title;

		// get prices
		require_once(EE_MODELS . 'EEM_Price.model.php');
		$PRC = EEM_Price::instance();

		if ( $PRC_ID ) {
			$price = $PRC->get_one_by_ID( $PRC_ID );
			$additional_hidden_fields = array(
					'PRC_ID' => array( 'type' => 'hidden', 'value' => $PRC_ID )
				);
			$this->_set_add_edit_form_tags( 'update_price', $additional_hidden_fields );
		} else {
			$price = $PRC->get_new_price();
			$this->_set_add_edit_form_tags( 'insert_price' );
		}

		$this->_template_args['PRC_ID'] = $PRC_ID;
		$this->_template_args['price'] = $price;

		// get price types
		require_once(EE_MODELS . 'EEM_Price_Type.model.php');
		$PRT = EEM_Price_Type::instance();
		$price_types = $PRT->get_all( array( array('PBT_ID' => array('!=', 1 ) ) ) );
		$price_type_names = array();
		if (empty($price_types)) {
			$msg = __( 'You have no price types defined. Please add a price type before adding a price.', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
			exit();
		} else {
			foreach ($price_types as $type) {
//				if ($type->is_global()) {
					$price_type_names[] = array('id' => $type->ID(), 'text' => $type->name());
//				}
			}
		}

		$this->_template_args['price_types'] = $price_type_names;
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
		add_meta_box( 'edit-price-details-mbox', __( 'Default Price Details', 'event_espresso' ), array( $this, '_edit_price_details_meta_box' ), $this->wp_page_slug, 'normal', 'high' );
	}






	/**
	 * 		_edit_price_details_meta_box
	*		@access public
	*		@return void
	*/
	public function _edit_price_details_meta_box() {
		echo EEH_Template::display_template( PRICING_TEMPLATE_PATH . 'pricing_details_main_meta_box.template.php', $this->_template_args, TRUE );
	}





	/**
	 * 		set_price_column_values
	*		@access protected
	*		@return array
	*/
	protected function set_price_column_values() {

		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );

		$set_column_values = array(
				'PRT_ID' => absint($this->_req_data['PRT_ID']),
				'PRC_amount' => $this->_req_data['PRC_amount'],
				'PRC_name' => $this->_req_data['PRC_name'],
				'PRC_desc' => $this->_req_data['PRC_desc'],
				'PRC_is_default' => 1,
				'PRC_overrides' => NULL,
				'PRC_order' => 0,
				'PRC_deleted' => 0,
				'PRC_parent' => 0
		);
		return $set_column_values;
	}







	/**
	 * 		insert_or_update_price
	*		@param boolean 		$insert - whether to insert or update
	*		@access protected
	*		@return void
	*/
	protected function _insert_or_update_price( $insert = FALSE ) {

		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );

		require_once(EE_MODELS . 'EEM_Price.model.php');
		$PRC = EEM_Price::instance();

		// why be so pessimistic ???  : (
		$success = 0;

		$set_column_values = $this->set_price_column_values();
		// is this a new Price ?
		if ( $insert ) {
			// run the insert
			if ( $PRC_ID = $PRC->insert( $set_column_values )) {
				//make sure this new price modifier is attached to the ticket but ONLY if it is not a tax type
				$PR = EEM_price::instance()->get_one_by_ID($PRC_ID);
				if ( $PR->type_obj()->base_type() !== EEM_Price_Type::base_type_tax ) {
					$ticket = EEM_Ticket::instance()->get_one_by_ID(1);
					$ticket->_add_relation_to( $PR, 'Price' );
					$ticket->save();
				}
				$success = 1;
			} else {
				$PRC_ID = FALSE;
				$success = 0;
			}
			$action_desc = 'created';
		} else {
			$PRC_ID = absint( $this->_req_data['PRC_ID'] );
			// run the update
			$where_cols_n_values = array( 'PRC_ID' => $PRC_ID );
			if ( $PRC->update( $set_column_values, array($where_cols_n_values))) {
				$success = 1;
			}

			$PR = EEM_Price::instance()->get_one_by_ID($PRC_ID);
			if ( $PR->type_obj()->base_type() !== EEM_Price_Type::base_type_tax ) {

				//if this is $PRC_ID == 1, then we need to update the default ticket attached to this price so the TKT_price value is updated.
				if ( $PRC_ID === 1 ) {
					$ticket = $PR->get_first_related('Ticket');
					if ( $ticket ) {
						$ticket->set('TKT_price', $PR->get('PRC_amount') );
						$ticket->set('TKT_name', $PR->get('PRC_name') );
						$ticket->set('TKT_description', $PR->get('PRC_desc'));
						$ticket->save();
					}
				} else {
					//we make sure this price is attached to base ticket. but ONLY if its not a tax ticket type.
					$ticket = EEM_Ticket::instance()->get_one_by_ID(1);
					$ticket->_add_relation_to( $PRC_ID, 'Price' );
					$ticket->save();
				}
			}

			$action_desc = 'updated';
		}

		$query_args = array( 'action' => 'edit_price', 'id' => $PRC_ID );

		$this->_redirect_after_action( $success, 'Prices', $action_desc, $query_args );

	}





	/**
	 * 		_trash_or_restore_price
	*		@param boolean 		$trash - whether to move item to trash (TRUE) or restore it (FALSE)
	*		@access protected
	*		@return void
	*/
	protected function _trash_or_restore_price( $trash = TRUE ) {

		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );

		require_once(EE_MODELS . 'EEM_Price.model.php');
		$PRC = EEM_Price::instance();

		$success = 1;
		$PRC_deleted = $trash ? TRUE : FALSE;

		//get base ticket for updating
		$ticket = EEM_Ticket::instance()->get_one_by_ID(1);
		//Checkboxes
		if (!empty($this->_req_data['checkbox']) && is_array($this->_req_data['checkbox'])) {
			// if array has more than one element than success message should be plural
			$success = count( $this->_req_data['checkbox'] ) > 1 ? 2 : 1;
			// cycle thru checkboxes
			while (list( $PRC_ID, $value ) = each($this->_req_data['checkbox'])) {
				if ( ! $PRC->update_by_ID(array('PRC_deleted' => $PRC_deleted), absint($PRC_ID) ) ) {
					$success = 0;
				} else {
					$PR = EEM_Price::instance()->get_one_by_ID($PRC_ID);
					if ( $PR->type_obj()->base_type() !== EEM_Price_Type::base_type_tax ) {
						//if trashing then remove relations to base default ticket.  If restoring then add back to base default ticket
						if ( $PRC_deleted ) {
							$ticket->_remove_relation_to($PRC_ID, 'Price');
						} else {
							$ticket->_add_relation_to($PRC_ID, 'Price');
						}
						$ticket->save();
					}
				}
			}

		} else {
			// grab single id and delete
			$PRC_ID = isset( $this->_req_data['id'] ) ? absint($this->_req_data['id']) : 0;
			if ( empty( $PRC_ID ) || ! $PRC->update_by_ID(array('PRC_deleted' => $PRC_deleted), $PRC_ID) ) {
				$success = 0;
			} else {
				$PR = EEM_Price::instance()->get_one_by_ID($PRC_ID);
				if ( $PR->type_obj()->base_type() !== EEM_Price_Type::base_type_tax ) {
					//if trashing then remove relations to base default ticket.  If restoring then add back to base default ticket
					if ( $PRC_deleted ) {
						$ticket->_remove_relation_to($PRC_ID, 'Price');
					} else {
						$ticket->_add_relation_to($PRC_ID, 'Price');
					}
					$ticket->save();
				}
			}

		}
		$query_args = array(
			'action' => 'default'
			);

		if ( $success ) {
			if ( $trash ) {
				$msg = $success == 2 ? __('The Prices have been trashed.', 'event_espresso') : __('The Price has been trashed.', 'event_espresso');
			} else {
				$msg = $success == 2 ? __('The Prices have been restored.', 'event_espresso') : __('The Price has been restored.', 'event_espresso');
			}

			EE_Error::add_success( $msg );
		}

		$this->_redirect_after_action( FALSE, '', '', $query_args, TRUE );

	}






	/**
	 * 		_delete_price
	*		@access protected
	*		@return void
	*/
	protected function _delete_price() {

		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );

		require_once(EE_MODELS . 'EEM_Price.model.php');
		$PRC = EEM_Price::instance();

		$success = 1;
		//Checkboxes
		if (!empty($this->_req_data['checkbox']) && is_array($this->_req_data['checkbox'])) {
			// if array has more than one element than success message should be plural
			$success = count( $this->_req_data['checkbox'] ) > 1 ? 2 : 1;
			// cycle thru bulk action checkboxes
			while (list( $PRC_ID, $value ) = each($this->_req_data['checkbox'])) {
				if (!$PRC->delete_permanently_by_ID(absint($PRC_ID))) {
					$success = 0;
				}
			}

		} else {
			// grab single id and delete
			$PRC_ID = absint($this->_req_data['id']);
			if ( ! $PRC->delete_permanently_by_ID($PRC_ID)) {
				$success = 0;
			}

		}

		$this->_redirect_after_action( $success, 'Prices', 'deleted', array() );

	}




	public function update_price_order() {
		$success = __( 'Price order was updated successfully.', 'event_espresso' );

		// grab our row IDs
		$row_ids = isset( $this->_req_data['row_ids'] ) && ! empty( $this->_req_data['row_ids'] ) ? explode( ',', rtrim( $this->_req_data['row_ids'], ',' )) : FALSE;

		if ( is_array( $row_ids )) {
			for ( $i = 0; $i < count( $row_ids ); $i++ ) {
				//Update the prices when re-ordering
				$id = absint($row_ids[$i]);
				if ( EEM_Price::instance()->update ( array( 'PRC_order' => $i+1 ), array(array( 'PRC_ID' => $id ) )) === FALSE ) {
					$success = FALSE;
				}
			}
		} else {
			$success = FALSE;
		}

		$errors = ! $success ? __( 'An error occurred. The price order was not updated.', 'event_espresso' ) : FALSE;

		echo wp_json_encode( array( 'return_data' => FALSE, 'success' => $success, 'errors' => $errors ));
		die();
	}






	/**************************************************************************************************************************************************************
	  ********************************************************************  TICKET PRICE TYPES  ******************************************************************
	 **************************************************************************************************************************************************************/






	/**
	 * 		generates HTML for main Prices Admin page
	*		@access protected
	*		@return void
	*/
	protected function _price_types_overview_list_table() {
		$this->_admin_page_title .= ' ' . $this->get_action_link_or_button(
		    'add_new_price_type',
            'add_type',
            array(),
            'add-new-h2'
        );
		$this->admin_page_title .= $this->_learn_more_about_pricing_link();
		$this->_search_btn_label = __('Price Types', 'event_espresso');
		$this->display_admin_list_table_page_with_no_sidebar();
	}






	/**
	*	retrieve data for Price Types List table
	*	@access public
	* 	@param  int  $per_page    how many prices displayed per page
	* 	@param  boolean $count   return the count or objects
	* 	@param  boolean $trashed   whether the current view is of the trash can - eww yuck!
	* 	@return mixed (int|array)  int = count || array of price objects
	*/
	public function get_price_types_overview_data( $per_page = 10, $count = FALSE, $trashed = FALSE ) {

		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		// start with an empty array

		require_once( PRICING_ADMIN . 'Price_Types_List_Table.class.php' );
		require_once( EE_MODELS . 'EEM_Price_Type.model.php' );

		$this->_req_data['orderby'] = empty($this->_req_data['orderby']) ? '' : $this->_req_data['orderby'];
		$order = ( isset( $this->_req_data['order'] ) && ! empty( $this->_req_data['order'] )) ? $this->_req_data['order'] : 'ASC';
		switch ($this->_req_data['orderby']) {
			case 'name':
				$orderby = array( 'PRT_name' => $order);
				break;
			default:
				$orderby = array( 'PRT_order' => $order);
		}


		$current_page = isset( $this->_req_data['paged'] ) && !empty( $this->_req_data['paged'] ) ? $this->_req_data['paged'] : 1;
		$per_page = isset( $this->_req_data['perpage'] ) && !empty( $this->_req_data['perpage'] ) ? $this->_req_data['perpage'] : $per_page;

		$offset = ($current_page-1)*$per_page;
		$limit = array( $offset, $per_page );

		$_where = array('PRT_deleted'=>$trashed, 'PBT_ID' => array('!=', 1 ) );

		if ( isset( $this->_req_data['s'] ) ) {
			$sstr = '%' . $this->_req_data['s'] . '%';
			$_where['OR'] = array(
				'PRT_name' => array( 'LIKE', $sstr )
				);
		}
		$query_params = array(
			$_where,
			'order_by'=>$orderby,
			'limit'=>$limit);
		if($count){
			return EEM_Price_Type::instance()->count_deleted_and_undeleted($query_params);
		}else{
			return EEM_Price_Type::instance()->get_all_deleted_and_undeleted($query_params);
		}

		//EEH_Debug_Tools::printr( $price_types, '$price_types  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
	}







	/**
	 * 		_edit_price_type_details
	*		@access protected
	*		@return void
	*/
	protected function _edit_price_type_details() {

		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );


		// grab price type ID
		$PRT_ID = isset( $this->_req_data['id'] ) && ! empty( $this->_req_data['id'] ) ? absint( $this->_req_data['id'] ) : FALSE;
		// change page title based on request action
		switch( $this->_req_action ) {
			case 'add_new_price_type' :
				$this->_admin_page_title = esc_html__( 'Add New Price Type', 'event_espresso' );
				break;
			case 'edit_price_type' :
				$this->_admin_page_title = esc_html__( 'Edit Price Type', 'event_espresso' );
				break;
			default :
				$this->_admin_page_title = ucwords( str_replace( '_', ' ', $this->_req_action ));
		}
		// add PRT_ID to title if editing
		$this->_admin_page_title = $PRT_ID ? $this->_admin_page_title . ' # ' . $PRT_ID : $this->_admin_page_title;

//		require_once(EE_MODELS . 'EEM_Price_Type.model.php');

		if ( $PRT_ID ) {
			$price_type = EEM_Price_Type::instance()->get_one_by_ID( $PRT_ID );
			$additional_hidden_fields = array( 'PRT_ID' => array( 'type' => 'hidden', 'value' => $PRT_ID ));
			$this->_set_add_edit_form_tags( 'update_price_type', $additional_hidden_fields );
		} else {
			$price_type = EEM_Price_Type::instance()->get_new_price_type();
			$this->_set_add_edit_form_tags( 'insert_price_type' );
		}

		$this->_template_args['PRT_ID'] = $PRT_ID;
		$this->_template_args['price_type'] = $price_type;


		$base_types = EEM_Price_Type::instance()->get_base_types();
		$select_values = array();
		foreach ( $base_types as $ref => $text ) {
			if ( $ref == EEM_Price_Type::base_type_base_price ) {
				//do not allow creation of base_type_base_prices because that's a system only base type.
				continue;
			}
			$values[] = array( 'id' => $ref, 'text' => $text );
		}


		$this->_template_args['base_type_select'] = EEH_Form_Fields::select_input('base_type', $values, $price_type->base_type(), 'id="price-type-base-type-slct"');
		$this->_template_args['learn_more_about_pricing_link'] = $this->_learn_more_about_pricing_link();
		$redirect_URL = add_query_arg( array( 'action' => 'price_types'), $this->_admin_base_url );
		$this->_set_publish_post_box_vars( 'id', $PRT_ID, FALSE, $redirect_URL );
		// the details template wrapper
		$this->display_admin_page_with_sidebar();

	}






	/**
	 * 		declare price type details page metaboxes
	*		@access protected
	*		@return void
	*/
	protected function _price_type_details_meta_boxes() {
		add_meta_box( 'edit-price-details-mbox', __( 'Price Type Details', 'event_espresso' ), array( $this, '_edit_price_type_details_meta_box' ), $this->wp_page_slug, 'normal', 'high' );
	}





	/**
	 * 		_edit_price_type_details_meta_box
	*		@access public
	*		@return void
	*/
	public function _edit_price_type_details_meta_box() {
		echo EEH_Template::display_template( PRICING_TEMPLATE_PATH . 'pricing_type_details_main_meta_box.template.php', $this->_template_args, TRUE );
	}




	/**
	 * 		set_price_type_column_values
	*		@access protected
	*		@return void
	*/
	protected function set_price_type_column_values() {

		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );

		$base_type = !empty( $this->_req_data['base_type'] ) ? $this->_req_data['base_type'] : EEM_Price_Type::base_type_base_price;

		switch ($base_type) {

			case EEM_Price_Type::base_type_base_price :
				$this->_req_data['PBT_ID'] = EEM_Price_Type::base_type_base_price;
				$this->_req_data['PRT_is_percent'] = 0;
				$this->_req_data['PRT_order'] = 0;
				break;

			case EEM_Price_Type::base_type_discount :
				$this->_req_data['PBT_ID'] = EEM_Price_Type::base_type_discount;
				break;

			case EEM_Price_Type::base_type_surcharge :
				$this->_req_data['PBT_ID'] = EEM_Price_Type::base_type_surcharge;
				break;

			case EEM_Price_Type::base_type_tax :
				$this->_req_data['PBT_ID'] = EEM_Price_Type::base_type_tax;
				$this->_req_data['PRT_is_percent'] = 1;
				break;
		}/**/

		$set_column_values = array(
				'PRT_name' => $this->_req_data['PRT_name'],
				'PBT_ID' => absint($this->_req_data['PBT_ID']),
				'PRT_is_percent' => absint($this->_req_data['PRT_is_percent']),
				'PRT_order' => absint($this->_req_data['PRT_order']),
				'PRT_deleted' => 0
		);

		return $set_column_values;
	}







	/**
	 * 		_insert_or_update_price_type
	*		@param boolean 		$new_price_type - whether to insert or update
	*		@access protected
	*		@return void
	*/
	protected function _insert_or_update_price_type( $new_price_type = FALSE ) {

//		echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );

		require_once(EE_MODELS . 'EEM_Price_Type.model.php');
		$PRT = EEM_Price_Type::instance();

		// why be so pessimistic ???  : (
		$success = 0;

		$set_column_values = $this->set_price_type_column_values();
		// is this a new Price ?
		if ( $new_price_type ) {
			// run the insert
			if ( $PRT_ID = $PRT->insert( $set_column_values )) {
				$success = 1;
			}
			$action_desc = 'created';
		} else {
			$PRT_ID = absint($this->_req_data['PRT_ID']);
			// run the update
			$where_cols_n_values = array('PRT_ID' => $PRT_ID );
			if ( $PRT->update( $set_column_values, array( $where_cols_n_values ))) {
				$success = 1;
			}
			$action_desc = 'updated';
		}

		$query_args = array( 'action'=> 'edit_price_type', 'id' => $PRT_ID );
		$this->_redirect_after_action( $success, 'Price Type', $action_desc, $query_args );

	}





	/**
	 * 		_trash_or_restore_price_type
	*		@param boolean 		$trash - whether to move item to trash (TRUE) or restore it (FALSE)
	*		@access protected
	*		@return void
	*/
	protected function _trash_or_restore_price_type( $trash = TRUE ) {

		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );

		require_once(EE_MODELS . 'EEM_Price_Type.model.php');
		$PRT = EEM_Price_Type::instance();

		$success = 1;
		$PRT_deleted = $trash ? TRUE : FALSE;
		//Checkboxes
		if (!empty($this->_req_data['checkbox']) && is_array($this->_req_data['checkbox'])) {
			// if array has more than one element than success message should be plural
			$success = count( $this->_req_data['checkbox'] ) > 1 ? 2 : 1;
			$what = count( $this->_req_data['checkbox'] ) > 1 ? 'Price Types' : 'Price Type';
			// cycle thru checkboxes
			while (list( $PRT_ID, $value ) = each($this->_req_data['checkbox'])) {
				if ( ! $PRT->update_by_ID(array('PRT_deleted' => $PRT_deleted), $PRT_ID ) ) {
					$success = 0;
				}
			}

		} else {
			// grab single id and delete
			$PRT_ID = isset( $this->_req_data['id'] ) ? absint($this->_req_data['id']) : 0;
			if ( empty( $PRT_ID ) || ! $PRT->update_by_ID(array('PRT_deleted' => $PRT_deleted), $PRT_ID )) {
				$success = 0;
			}
			$what = 'Price Type';

		}

		$query_args = array( 'action' => 'price_types' );
		if ( $success ) {
			if ( $trash ) {
				$msg = $success > 1 ? __('The Price Types have been trashed.', 'event_espresso') : __('The Price Type has been trashed.', 'event_espresso');
			} else {
				$msg = $success > 1 ? __('The Price Types have been restored.', 'event_espresso') : __('The Price Type has been restored.', 'event_espresso');
			}
			EE_Error::add_success( $msg );
		}

		$this->_redirect_after_action( FALSE, '', '', $query_args, TRUE );

	}






	/**
	 * 		_delete_price_type
	*		@access protected
	*		@return void
	*/
	protected function _delete_price_type() {

		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );

		$PRT = EEM_Price_Type::instance();

		$success = 1;
		//Checkboxes
		if (!empty($this->_req_data['checkbox'])) {
			// if array has more than one element than success message should be plural
			$success = count( $this->_req_data['checkbox'] ) > 1 ? 2 : 1;
			$what = $PRT->item_name($success);
			// cycle thru bulk action checkboxes
			while (list( $PRT_ID, $value ) = each($this->_req_data['checkbox'])) {
				if (!$PRT->delete_permanently_by_ID($PRT_ID) ) {
					$success = 0;
				}
			}

		}


		$query_args = array( 'action'=> 'price_types' );
		$this->_redirect_after_action( $success, $what, 'deleted', $query_args );

	}







	/**
	 * 		_learn_more_about_pricing_link
	*		@access protected
	*		@return string
	*/
	protected function _learn_more_about_pricing_link() {
		return '<a class="hidden" style="margin:0 20px; cursor:pointer; font-size:12px;" >' . __('learn more about how pricing works', 'event_espresso') . '</a>';
	}



    protected function _tax_settings() {
        $this->_set_add_edit_form_tags('update_tax_settings');
        $this->_set_publish_post_box_vars(null, false, false, null, false);
        $this->_template_args['admin_page_content'] = $this->tax_settings_form()->get_html();
        $this->display_admin_page_with_sidebar();
    }



    /**
     * @return \EE_Form_Section_Proper
     * @throws \EE_Error
     */
    protected function tax_settings_form() {
        return new EE_Form_Section_Proper(
            array(
                'name'            => 'tax_settings_form',
                'html_id'         => 'tax_settings_form',
                'layout_strategy' => new EE_Div_Per_Section_Layout(),
                'subsections'     => apply_filters(
                    'FHEE__Pricing_Admin_Page__tax_settings_form__form_subsections',
                    array(
                        'tax_settings'     => new EE_Form_Section_Proper(
	                        array(
		                        'name'            => 'tax_settings_tbl',
		                        'html_id'         => 'tax_settings_tbl',
		                        'html_class'      => 'form-table',
		                        'layout_strategy' => new EE_Admin_Two_Column_Layout(),
		                        'subsections'     => array(
			                        'prices_displayed_including_taxes' => new EE_Yes_No_Input(
				                        array(
					                        'html_label_text'         => __(
						                        "Show Prices With Taxes Included?",
						                        'event_espresso'
					                        ),
					                        'html_help_text'          => __(
						                        'Indicates whether or not to display prices with the taxes included',
						                        'event_espresso'
					                        ),
					                        'default'                 => isset(
					                            EE_Registry::instance()
							                        ->CFG
							                        ->tax_settings
							                        ->prices_displayed_including_taxes
					                        )
						                        ? EE_Registry::instance()
							                        ->CFG
							                        ->tax_settings
							                        ->prices_displayed_including_taxes
						                        : true,
					                        'display_html_label_text' => false
				                        )
			                        ),
		                        )
	                        )
                        )
                    )
                )
            )
        );
    }



	/**
	 * _update_tax_settings
	 *
	 * @since 4.9.13
	 * @return void
	 */
	public function _update_tax_settings() {
		if ( ! isset( EE_Registry::instance()->CFG->tax_settings ) ) {
			EE_Registry::instance()->CFG->tax_settings = new EE_Tax_Config();
		}
		try {
			$tax_form = $this->tax_settings_form();
			//check for form submission
			if ( $tax_form->was_submitted() ) {
				//capture form data
				$tax_form->receive_form_submission();
				//validate form data
				if ( $tax_form->is_valid() ) {
					//grab validated data from form
					$valid_data = $tax_form->valid_data();
					//set data on config
					EE_Registry::instance()
						->CFG
						->tax_settings
						->prices_displayed_including_taxes
						= $valid_data['tax_settings']['prices_displayed_including_taxes'];
				} else {
					if ( $tax_form->submission_error_message() !== '' ) {
						EE_Error::add_error(
							$tax_form->submission_error_message(),
							__FILE__,
							__FUNCTION__,
							__LINE__
						);
					}
				}
			}
		} catch ( EE_Error $e ) {
			EE_Error::add_error( $e->get_error(), __FILE__, __FUNCTION__, __LINE__ );
		}

		$what = 'Tax Settings';
		$success = $this->_update_espresso_configuration(
			$what,
			EE_Registry::instance()->CFG->tax_settings,
			__FILE__,
			__FUNCTION__,
			__LINE__
		);
		$this->_redirect_after_action( $success, $what, 'updated', array( 'action' => 'tax_settings' ) );
	}



}
// end of file:  includes/core/admin/pricing/Pricing_Admin_Page.core.php
