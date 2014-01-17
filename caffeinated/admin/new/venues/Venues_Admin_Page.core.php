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
 * Venues_Admin_Page
 *
 * This contains the logic for setting up the Event Venue related admin pages.  Any methods without phpdoc comments have inline docs with parent class. 
 *
 *
 * @package		Venues_Admin_Page
 * @subpackage	caffeinated/admin/new/Venues_Admin_Page.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */
class Venues_Admin_Page extends EE_Admin_Page_CPT {


	/**
	 * _venue
	 * This will hold the venue object for venue_details screen.
	 *
	 * @access protected
	 * @var object
	 */
	protected $_venue;




	/**
	 * This will hold the category object for category_details screen.
	 * @var object
	 */
	protected $_category;




	/**
	 * This property will hold the venue model instance
	 * @var object
	 */
	protected $_venue_model;





	protected function _init_page_props() {
		require_once( EE_MODELS . 'EEM_Venue.model.php' );
		$this->page_slug = EE_VENUES_PG_SLUG;
		$this->_admin_base_url = EE_VENUES_ADMIN_URL;
		$this->_admin_base_path = EE_CORE_CAF_ADMIN . 'new/venues';
		$this->page_label = __('Event Venues', 'event_espresso');
		$this->_cpt_model_names = array(
			'create_new' => 'EEM_Venue',
			'edit' => 'EEM_Venue'
			);
		$this->_cpt_edit_routes = array(
			'espresso_venues' => 'edit'
			);
		$this->_venue_model = EEM_Venue::instance();
	}




	protected function _ajax_hooks() {
		//todo: all hooks for ee_venues ajax goes in here.
	}






	protected function _define_page_props() {
		$this->_admin_page_title = $this->page_label;
		$this->_labels = array(
			'buttons' => array(
				'add' => __('Add New Venue', 'event_espresso'),
				'edit' => __('Edit Venue', 'event_espresso'),
				'delete' => __('Delete Venue', 'event_espresso'),
				'add_category' => __('Add New Category', 'event_espresso'),
				'edit_category' => __('Edit Category', 'event_espresso'),
				'delete_category' => __('Delete Category', 'event_espresso')
			),
			'editor_title' => array(
				'espresso_venues' => __('Enter Venue name here')
				),
			'publishbox' => array( 
				'create_new' => __('Save New Venue', 'event_espresso'),
				'edit' => __('Update Venue', 'event_espresso'),
				'add_category' => __('Save New Category', 'event_espresso'),
				'edit_category' => __('Update Category', 'event_espresso')
				)
		);
	}





	protected function _set_page_routes() {

		//load formatter helper
		EE_Registry::instance()->load_helper( 'Formatter' );
		//load field generator helper
		EE_Registry::instance()->load_helper( 'Form_Fields' );

		$this->_page_routes = array(
			'default' => '_overview_list_table',
			'trash_venue' => array(
				'func' => '_trash_or_restore_venue',
				'args' => array( 'venue_status' => 'trash' ),
				'noheader' => TRUE
				),
			'trash_venues' => array(
				'func' => '_trash_or_restore_venues',
				'args' => array( 'venue_status' => 'trash' ),
				'noheader' => TRUE
				),
			'restore_venue' => array(
				'func' => '_trash_or_restore_venue',
				'args' => array( 'venue_status' => 'draft' ),
				'noheader' => TRUE
				),
			'restore_venues' => array(
				'func' => '_trash_or_restore_venues',
				'args' => array( 'venue_status' => 'draft' ),
				'noheader' => TRUE
				),
			'delete_venues' => array(
				'func' => '_delete_venues', 
				'noheader' => TRUE 
				),
			'delete_venue' => array(
				'func' => '_delete_venue', 
				'noheader' => TRUE
				),
			//venue category tab related
			'add_category' => array(
				'func' => '_category_details',
				'args' => array('add'),
				),
			'edit_category' => array(
				'func' => '_category_details',
				'args' => array('edit')
				),
			'delete_categories' => array(
				'func' => '_delete_categories', 
				'noheader' => TRUE 
				),

			'delete_category' => array(
				'func' => '_delete_categories', 
				'noheader' => TRUE
				),

			'insert_category' => array(
				'func' => '_insert_or_update_category',
				'args' => array('new_category' => TRUE),
				'noheader' => TRUE
				),

			'update_category' => array(
				'func' => '_insert_or_update_category',
				'args' => array('new_category' => FALSE),
				'noheader' => TRUE
				),
			'export_categories' => array(
				'func' => '_categories_export',
				'noheader' => TRUE
				),
			'import_categories' => '_import_categories',
			'category_list' => array(
				'func' => '_category_list_table'
				)
		);
	}




	protected function _set_page_config() {
		$this->_page_config = array(
			'default' => array(
				'nav' => array(
					'label' => __('Overview', 'event_espresso'),
					'order' => 10
				),
				'list_table' => 'Venues_Admin_List_Table',
                'help_tabs' => array(
					'venues_overview_help_tab' => array(
						'title' => __('Venues Overview', 'event_espresso'),
						'filename' => 'venues_overview'
					),
					'venues_overview_table_column_headings_help_tab' => array(
						'title' => __('Venues Overview Table Column Headings', 'event_espresso'),
						'filename' => 'venues_overview_table_column_headings'
					),
					'venues_overview_views_bulk_actions_search_help_tab' => array(
						'title' => __('Venues Overview Views & Bulk Actions & Search', 'event_espresso'),
						'filename' => 'venues_overview_views_bulk_actions_search'
					)
				),
				'help_tour' => array( 'Venues_Overview_Help_Tour' ),
				'metaboxes' => array('_espresso_news_post_box', '_espresso_links_post_box'),
				'require_nonce' => FALSE
			),
			'create_new' => array(
				'nav' => array(
					'label' => __('Add Venue', 'event_espresso'),
					'order' => 5,
					'persistent' => FALSE
				),
                'help_tabs' => array(
					'venues_editor_help_tab' => array(
						'title' => __('Venue Editor', 'event_espresso'),
						'filename' => 'venues_editor'
					),
					'venues_editor_title_richtexteditor_help_tab' => array(
						'title' => __('Venue Title & Rich Text Editor', 'event_espresso'),
						'filename' => 'venues_editor_title_richtexteditor'
					),
					'venues_editor_tags_categories_help_tab' => array(
						'title' => __('Venue Tags & Categories', 'event_espresso'),
						'filename' => 'venues_editor_tags_categories'
					),
                'venues_editor_physical_location_google_map_virtual_location_help_tab' => array(
						'title' => __('Venue Editor Physical Location & Google Map & Virtual Location', 'event_espresso'),
						'filename' => 'venues_editor_physical_location_google_map_virtual_location'
					),
					'venues_editor_save_new_venue_help_tab' => array(
						'title' => __('Save New Venue', 'event_espresso'),
						'filename' => 'venues_editor_save_new_venue'
					),
					'venues_editor_other_help_tab' => array(
						'title' => __('Venue Editor Other', 'event_espresso'),
						'filename' => 'venues_editor_other'
					)
				),
                'help_tour' => array( 'Venues_Add_Venue_Help_Tour' ),
				'metaboxes' => array('_venue_editor_metaboxes'),
				'require_nonce' => FALSE
				),
			'edit' => array(
				'nav' => array(
					'label' => __('Edit Venue', 'event_espresso'),
					'order' => 5,
					'persistent' => FALSE,
					'url' => isset($this->_req_data['post']) ? add_query_arg(array('post' => $this->_req_data['post'] ), $this->_current_page_view_url )  : $this->_admin_base_url
				),
                'help_tabs' => array(
					'venues_editor_help_tab' => array(
						'title' => __('Venue Editor', 'event_espresso'),
						'filename' => 'venues_editor'
					),
					'venues_editor_title_richtexteditor_help_tab' => array(
						'title' => __('Venue Title & Rich Text Editor', 'event_espresso'),
						'filename' => 'venues_editor_title_richtexteditor'
					),
					'venues_editor_tags_categories_help_tab' => array(
						'title' => __('Venue Tags & Categories', 'event_espresso'),
						'filename' => 'venues_editor_tags_categories'
					),
					'venues_editor_physical_location_google_map_virtual_location_help_tab' => array(
						'title' => __('Venue Editor Physical Location & Google Map & Virtual Location', 'event_espresso'),
						'filename' => 'venues_editor_physical_location_google_map_virtual_location'
					),
					'venues_editor_save_new_venue_help_tab' => array(
						'title' => __('Save New Venue', 'event_espresso'),
						'filename' => 'venues_editor_save_new_venue'
					),
					'venues_editor_other_help_tab' => array(
						'title' => __('Venue Editor Other', 'event_espresso'),
						'filename' => 'venues_editor_other'
					)
				),
                'help_tour' => array( 'Venues_Edit_Venue_Help_Tour' ),
				'metaboxes' => array('_venue_editor_metaboxes'),
				'require_nonce' => FALSE
			),
			//event category stuff
			'add_category' => array(
				'nav' => array(
					'label' => __('Add Category', 'event_espresso'),
					'order' => 15,
					'persistent' => false),
				'metaboxes' => array('_publish_post_box'),
                'help_tabs' => array(
					'venues_add_category_help_tab' => array(
						'title' => __('Add New Venue Category', 'event_espresso'),
						'filename' => 'venues_add_category'
					)
				),
                'help_tour' => array( 'Venues_Add_Category_Help_Tour' ),
				'require_nonce' => FALSE
				),
			'edit_category' => array(
				'nav' => array(
					'label' => __('Edit Category', 'event_espresso'),
					'order' => 15,
					'persistent' => FALSE,
					'url' => isset($this->_req_data['EVT_CAT_ID']) ? add_query_arg(array('EVT_CAT_ID' => $this->_req_data['EVT_CAT_ID'] ), $this->_current_page_view_url )  : $this->_admin_base_url
					),
				'metaboxes' => array('_publish_post_box'),
                'help_tabs' => array(
					'venues_edit_category_help_tab' => array(
						'title' => __('Edit Venue Category', 'event_espresso'),
						'filename' => 'venues_edit_category'
					)
				),
                'help_tour' => array( 'Venues_Edit_Category_Help_Tour' ),
				'require_nonce' => FALSE
				),
			'category_list' => array(
				'nav' => array(
					'label' => __('Categories', 'event_espresso'),
					'order' => 20
					),
				'list_table' => 'Venue_Categories_Admin_List_Table',
                'help_tabs' => array(
					'venues_categories_help_tab' => array(
						'title' => __('Venue Categories', 'event_espresso'),
						'filename' => 'venues_categories'
					),
					'venues_categories_table_column_headings_help_tab' => array(
						'title' => __('Venue Categories Table Column Headings', 'event_espresso'),
						'filename' => 'venues_categories_table_column_headings'
					),
					'venues_categories_views_help_tab' => array(
						'title' => __('Venue Categories Views', 'event_espresso'),
						'filename' => 'venues_categories_views'
					),
					'venues_categories_other_help_tab' => array(
						'title' => __('Venue Categories Other', 'event_espresso'),
						'filename' => 'venues_categories_other'
					)
				),
                'help_tour' => array( 'Venues_Categories_Help_Tour' ),
				'metaboxes' => array('_espresso_news_post_box', '_espresso_links_post_box', '_espresso_sponsors_post_box'),
				'require_nonce' => FALSE
				)
		);
	}





	protected function _add_screen_options() {
		//todo
	}





	protected function _add_screen_options_default() {
		$this->_per_page_screen_option();
	}



	protected function _add_screen_options_category_list() {
		$page_title = $this->_admin_page_title;
		$this->_admin_page_title = __('Venue Categories', 'event_espresso');
		$this->_per_page_screen_option();
		$this->_admin_page_title = $page_title;
	}






	//none of the below group are currently used for Event Venues
	protected function _add_feature_pointers() {}
	public function admin_init() {}
	public function admin_notices() {}
	public function admin_footer_scripts() {}






	public function load_scripts_styles_create_new() {
		$this->load_scripts_styles_edit();
	}





	public function load_scripts_styles() {
		wp_register_style('ee-cat-admin', EVENTS_ASSETS_URL . 'ee-cat-admin.css', array(), EVENT_ESPRESSO_VERSION );
		wp_enqueue_style('ee-cat-admin');
	}



	public function load_scripts_styles_add_category() {
		$this->load_scripts_styles_edit_category();
	}





	public function load_scripts_styles_edit_category() {
		//scripts
		wp_enqueue_script( 'ee_cat_admin_js', EVENTS_ASSETS_URL . 'ee-cat-admin.js', array('jquery-validate'), EVENT_ESPRESSO_VERSION, TRUE );
		EE_Registry::$i18n_js_strings['add_cat_name'] = __('Category Name is a required field. Please enter a value in order to continue.', 'event_espresso');
		wp_localize_script( 'ee_cat_admin_js', 'eei18n', EE_Registry::$i18n_js_strings );

	}





	public function load_scripts_styles_edit() {
		//styles
		wp_enqueue_style('espresso-ui-theme');
		wp_register_style( 'espresso_venues', EE_VENUES_ASSETS_URL . 'ee-venues-admin.css', array(), EVENT_ESPRESSO_VERSION );
		wp_enqueue_style('espresso_venues');

		//scripts
		wp_register_script('espresso_venue_admin', EE_VENUES_ASSETS_URL . 'ee-venues-admin.js', array('jquery-validate'), EVENT_ESPRESSO_VERSION, TRUE );
		wp_enqueue_script('espresso_venue_admin');

		;
		EE_Registry::$i18n_js_strings['required'] = __( 'This is a required field. Please add a value in order to continue.', 'event_espresso' );
		wp_localize_script( 'espresso_venue_admin', 'eei18n', EE_Registry::$i18n_js_strings );

	}






	protected function _set_list_table_views_default() {
		$this->_views = array(
			'all' => array(
				'slug' => 'all',
				'label' => __('View All Venues', 'event_espresso'),
				'count' => 0,
				'bulk_action' => array(
					//'restore_venues' => __('Restore_from Trash', 'event_espresso'),
					//'trash_venues' => __('Move to Trash', 'event_espresso'),
					'delete_venues' => __('Delete', 'event_espresso')
					)
				)
		);
	}





	protected function _set_list_table_views_category_list() {
		$this->_views = array(
			'all' => array(
				'slug' => 'all',
				'label' => __('All', 'event_espresso'),
				'count' => 0,
				'bulk_action' => array(
					'delete_categories' => __('Delete Permanently', 'event_espresso'),
					'export_categories' => __('Export Categories', 'event_espresso'),
					)
				)
		);
	}





	protected function _overview_list_table() {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		$this->_admin_page_title .= $this->get_action_link_or_button('create_new', 'add', array(), 'add-new-h2');
		$this->_search_btn_label = __('Venues', 'event_espresso');
		$this->display_admin_list_table_page_with_sidebar();
	}



	public function extra_misc_actions_publish_box() {
		$extra_rows = array(
			'vnu_capacity' => $this->_cpt_model_obj->get_pretty('VNU_capacity', 'input'),
			'vnu_url' => $this->_cpt_model_obj->venue_url(),
			'vnu_phone' => $this->_cpt_model_obj->phone()
			);
		$template = EE_VENUES_TEMPLATE_PATH . 'venue_publish_box_extras.template.php';
		EEH_Template::display_template( $template, $extra_rows );
	}



	protected function _venue_editor_metaboxes() {
		$this->verify_cpt_object();

		add_meta_box( 'espresso_venue_address_options', __('Physical Location', 'event_espresso'), array( $this, 'venue_address_metabox'), $this->page_slug, 'side', 'default' );
		add_meta_box( 'espresso_venue_gmap_options', __('Google Map', 'event_espresso'), array( $this, 'venue_gmap_metabox'), $this->page_slug, 'side', 'default' );
		add_meta_box( 'espresso_venue_virtual_loc_options', __('Virtual Location', 'event_espresso'), array( $this, 'venue_virtual_loc_metabox'), $this->page_slug, 'side', 'default' );

	}



	public function venue_gmap_metabox() {
		$template_args = array(
			'vnu_enable_for_gmap' => EEH_Form_Fields::select_input('vnu_enable_for_gmap', $this->get_yes_no_values(), $this->_cpt_model_obj->enable_for_gmap() ),
			'vnu_google_map_link' => $this->_cpt_model_obj->google_map_link(),
			);
		$template = EE_VENUES_TEMPLATE_PATH . 'venue_gmap_metabox_content.template.php';
		EEH_Template::display_template( $template, $template_args );
	}



	public function venue_address_metabox() {

		$template_args['_venue'] =$this->_cpt_model_obj;

		$template_args['states_dropdown'] = EEH_Form_Fields::generate_form_input( 
			$QFI = new EE_Question_Form_Input(
				EE_Question::new_instance( array( 'QST_display_text' => 'State', 'QST_system' => 'state' )),
				EE_Answer::new_instance( array(  'ANS_value'=> $this->_cpt_model_obj->state_ID() )),
				array(
					'input_name' =>  'sta_id',
					'input_id' => 'sta_id',
					'input_class' => '',
					'input_prefix' => '',
					'append_qstn_id' => FALSE
				)
			)
		);
		$template_args['countries_dropdown'] = EEH_Form_Fields::generate_form_input( 
			$QFI = new EE_Question_Form_Input(
				EE_Question::new_instance( array( 'QST_display_text' => 'Country', 'QST_system' => 'country' )),
				EE_Answer::new_instance( array(  'ANS_value'=> $this->_cpt_model_obj->country_ID() )),
				array(
					'input_name' =>  'cnt_iso',
					'input_id' => 'cnt_iso',
					'input_class' => '',
					'input_prefix' => '',
					'append_qstn_id' => FALSE
				)
			)
		);

		$template = EE_VENUES_TEMPLATE_PATH . 'venue_address_metabox_content.template.php';
		EEH_Template::display_template( $template, $template_args );
	}






	public function venue_virtual_loc_metabox() {
		$template_args = array(
			'_venue' => $this->_cpt_model_obj
			);
		$template = EE_VENUES_TEMPLATE_PATH . 'venue_virtual_location_metabox_content.template.php';
		EEH_Template::display_template( $template, $template_args );
	}



	protected function _restore_cpt_item($post_id, $revision_id) {
		$venue_obj = $this->_venue_model->get_one_by_ID($post_id);

		//meta revision restore
		$venue_obj->restore_revision($revision_id);
	}






	/**
	 * Handles updates for venue cpts
	 * @param  int    $post_id ID of Venue CPT
	 * @param  object $post    Post object (with "blessed" WP properties)
	 * @return void
	 */
	protected function _insert_update_cpt_item( $post_id, $post ) {
		$wheres = array( $this->_venue_model->primary_key_name() => $post_id );

		$venue_values = array(
			'VNU_address' => !empty( $this->_req_data['vnu_address'] ) ? $this->_req_data['vnu_address'] : NULL,
			'VNU_address2' => !empty( $this->_req_data['vnu_address2'] ) ? $this->_req_data['vnu_address2'] : NULL,
			'VNU_city' => !empty( $this->_req_data['vnu_city'] ) ? $this->_req_data['vnu_city'] : NULL,
			'STA_ID' => !empty( $this->_req_data['sta_id'] ) ? $this->_req_data['sta_id'] : NULL,
			'CNT_ISO' => !empty( $this->_req_data['cnt_iso'] ) ? $this->_req_data['cnt_iso'] : NULL,
			'VNU_zip' => !empty( $this->_req_data['vnu_zip'] ) ? $this->_req_data['vnu_zip'] : NULL,
			'VNU_phone' => !empty( $this->_req_data['vnu_phone'] ) ? $this->_req_data['vnu_phone'] : NULL,
			'VNU_capacity' => !empty( $this->_req_data['vnu_capacity'] ) ? $this->_req_data['vnu_capacity'] : INF,
			'VNU_url' => !empty( $this->_req_data['vnu_url'] ) ? $this->_req_data['vnu_url'] : NULL,
			'VNU_virtual_phone' => !empty( $this->_req_data['vnu_virtual_phone'] ) ? $this->_req_data['vnu_virtual_phone'] : NULL,
			'VNU_virtual_url' => !empty( $this->_req_data['vnu_virtual_url'] ) ? $this->_req_data['vnu_virtual_url'] : NULL,
			'VNU_enable_for_gmap' => !empty( $this->_req_data['vnu_enable_for_gmap'] ) ? TRUE : FALSE,
			'VNU_google_map_link' => !empty( $this->_req_data['vnu_google_map_link'] ) ? $this->_req_data['vnu_google_map_link'] : NULL
			);
		
		//update venue
		$success = $this->_venue_model->update( $venue_values, array( $wheres ) );

		//get venue_object for other metaboxes that might be added via the filter... though it would seem to make sense to just use $this->_venue_model->get_one_by_ID( $post_id ).. i have to setup where conditions to override the filters in the model that filter out autodraft and inherit statuses so we GET the inherit id!
		$get_one_where = array( $this->_venue_model->primary_key_name() => $post_id, 'status' => $post->post_status  );
		$venue = $this->_venue_model->get_one( array( $get_one_where ) );

		//notice we've applied a filter for venue metabox callbacks but we don't actually have any default venue metaboxes in use.  So this is just here for addons to more easily hook into venue saves.
		$venue_update_callbacks = apply_filters('FHEE_venue_editor_update', array() );

		$att_success = TRUE;

		foreach ( $venue_update_callbacks as $v_callback ) {
			$_succ = call_user_func_array( $v_callback, array( $venue,  $this->_req_data ) );
			$att_success = !$att_success ? $att_success : $_succ; //if ANY of these updates fail then we want the appropriate global error message
		}

		//any errors?
		if ( $success && !$att_success ) {
			EE_Error::add_error( __('Venue Details saved successfully but something went wrong with saving attachments.', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
		} else if ( $success === FALSE ) {
			EE_Error::add_error( __('Venue Details did not save successfully.', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
		}	
	}





	public function trash_cpt_item( $post_id ) {
		$this->_req_data['VNU_ID'] = $post_id;
		$this->_trash_or_restore_venue( 'trash', FALSE );
	}






	public function restore_cpt_item( $post_id ) {
		$this->_req_data['VNU_ID'] = $post_id;
		$this->_trash_or_restore_venue( 'draft', FALSE );
	}





	public function delete_cpt_item( $post_id ) {
		$this->_req_data['VNU_ID'] = $post_id;
		$this->_delete_venue( FALSE );
	}






	public function get_venue_object() {
		return $this->_cpt_model_obj;
	}




	protected function _trash_or_restore_venue( $venue_stats = 'trash', $redirect_after = TRUE ) {
		$VNU_ID = isset( $this->_req_data['VNU_ID'] ) ? absint( $this->_req_data['VNU_ID'] ) : FALSE;

		//loop thru venues
		if ( $VNU_ID ) {
			//clean status
			$venue_status = strtoupper( sanitize_key( $venue_status ) );
			// grab status
			if (!empty($venue_status)) {
				$success = $this->_change_venue_status($VNU_ID, $venue_status);
			} else {
				$success = FALSE;
				$msg = __('An error occurred. The venue could not be moved to the trash because a valid venue status was not not supplied.', 'event_espresso');
				EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
			}
		} else {
			$success = FALSE;
			$msg = __('An error occurred. The venue could not be moved to the trash because a valid venue ID was not not supplied.', 'event_espresso');
			EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
		}
		$action = $venue_status == 'trash' ? 'moved to the trash' : 'restored from the trash';

		if ( $redirect_after )
			$this->_redirect_after_action($success, 'Venue', $action, array('action' => 'default'));

	}





	protected function _trash_or_restore_venues( $venue_status = 'trash' ) {
		// clean status
		$venue_status = strtoupper(sanitize_key($venue_status));
		// grab status
		if (!empty($venue_status)) {
			$success = TRUE;
			//determine the event id and set to array.
			$VNU_IDs = isset($this->_req_data['VNU_IDs']) ? (array) $this->_req_data['VNU_IDs'] : array();
			// loop thru events
			foreach ($VNU_IDs as $VNU_ID) {
				if ($VNU_ID = absint($VNU_ID)) {
					$results = $this->_change_venue_status($VNU_ID, $venue_status);
					$success = $results !== FALSE ? $success : FALSE;
				} else {
					$msg = sprintf(__('An error occurred. Venue #%d could not be moved to the trash because a valid venue ID was not not supplied.', 'event_espresso'), $VNU_ID);
					EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
					$success = FALSE;
				}
			}
		} else {
			$success = FALSE;
			$msg = __('An error occurred. The venue could not be moved to the trash because a valid venue status was not not supplied.', 'event_espresso');
			EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
		}
		// in order to force a pluralized result message we need to send back a success status greater than 1
		$success = $success ? 2 : FALSE;
		$action = $venue_status == 'trash' ? 'moved to the trash' : 'restored from the trash';
		$this->_redirect_after_action($success, 'Venues', $action, array('action' => 'default'));
	}





	/**
	 * _trash_or_restore_venues
	 *
	 * //todo this is pretty much the same as the corresponding change_event_status method in Events_Admin_Page.  We should probably abstract this up to the EE_Admin_Page_CPT (or even EE_Admin_Page) and make this a common method accepting a certain number of params.
	 *
	 * @access  private
	 * @param  int $event_id 
	 * @param  string $event_status 
	 * @return void
	 */
	private function _change_venue_status( $VNU_ID = FALSE, $venue_status = FALSE ) {
		// grab venue id
		if (!$VNU_ID) {
			$msg = __('An error occurred. No Venue ID or an invalid Venue ID was received.', 'event_espresso');
			EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
			return FALSE;
		}

		$this->_set_model_object( $VNU_ID );

		// clean status
		$venue_status = strtoupper(sanitize_key($venue_status));
		// grab status
		if (empty($venue_status)) {
			$msg = __('An error occurred. No Venue Status or an invalid Venue Status was received.', 'event_espresso');
			EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
			return FALSE;
		}
		
		// was event trashed or restored ?
		switch ($venue_status) {
			case 'draft' :
				$action = 'restored from the trash';
				$hook = 'AHEE_venue_restored_from_trash';
				break;
			case 'trash' :
				$action = 'moved to the trash';
				$hook = 'AHEE_venue_moved_to_trash';
				break;
			default :
				$action = 'updated';
				$hook = FALSE;
		}
		//use class to change status
		$this->_cpt_model_obj->set_status( $venue_status );
		$success = $this->_cpt_model_obj->save();
		
		if ($success === FALSE) {
			$msg = sprintf(__('An error occurred. The venue could not be %s.', 'event_espresso'), $action);
			EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
			return FALSE;
		}
		if ($hook) {
			do_action($hook);
		}
		return TRUE;
	}


	/**
	 * @param  boolean $redirect_after [description]
	 * @return [type]                  [description]
	 */
	protected function _delete_venue( $redirect_after = TRUE ) {
		//determine the venue id and set to array.
		$VNU_ID = isset($this->_req_data['VNU_ID']) ? absint($this->_req_data['VNU_ID']) : NULL;
		$VNU_ID = isset( $this->_req_data['post'] ) ? absint( $this->_req_data['post'] ) : NULL;


		// loop thru venues
		if ($VNU_ID) {
			$success = $this->_delete_or_trash_venue( $VNU_ID );
		} else {
			$success = FALSE;
			$msg = __('An error occurred. An venue could not be deleted because a valid venue ID was not not supplied.', 'event_espresso');
			EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
		}
		if ( $redirect_after )
			$this->_redirect_after_action($success, 'Venue', 'deleted', array('action' => 'default'));
	}



	protected function _delete_venues() {
		$success = TRUE;
		//determine the event id and set to array.
		$VNU_IDs = isset($this->_req_data['venue_id']) ? (array) $this->_req_data['venue_id'] : array();
		// loop thru events
		foreach ($VNU_IDs as $VNU_ID) {
			if ($VNU_ID = absint($VNU_ID)) {
				$results = $this->_delete_or_trash_venue($VNU_ID);
				$success = $results !== FALSE ? $success : FALSE;
			} else {
				$success = FALSE;
				$msg = __('An error occurred. An venue could not be deleted because a valid venue ID was not not supplied.', 'event_espresso');
				EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
			}
		}
		// in order to force a pluralized result message we need to send back a success status greater than 1
		$success = $success ? 2 : FALSE;
		$this->_redirect_after_action($success, __('Venues', 'event_espresso'), __('deleted', 'event_espresso'), array('action' => 'default'));
	}




	//todo: put in parent
	private function _delete_or_trash_venue($VNU_ID = FALSE) {
		// grab event id
		if (!$VNU_ID = absint($VNU_ID)) {
			$msg = __('An error occurred. No Venue ID or an invalid Venue ID was received.', 'event_espresso');
			EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
			return FALSE;
		}
		

		$venue = EEM_Venue::instance()->get_one_by_ID($VNU_ID);
		//first need to remove all term relationships
		$venue->_remove_relations('Term_Taxonomy');
		$success = $venue->delete_permanently();
		// did it all go as planned ?
		if ($success) {
			$msg = sprintf(__('Venue ID # %d has been deleted.', 'event_espresso'), $VNU_ID);
			EE_Error::add_success($msg);
		} else {
			$msg = sprintf(__('An error occurred. Venue ID # %d could not be deleted.', 'event_espresso'), $VNU_ID);
			EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__);
			return FALSE;
		}
		do_action('AHEE_venue_deleted');
		return TRUE;
	}

	


	/***********/
	/* QUERIES */


	public function get_venues( $per_page = 10, $count = FALSE ) {
		global $wpdb;

		$_orderby = !empty( $this->_req_data['orderby'] ) ? $this->_req_data['orderby'] : '';

		switch ( $_orderby ) {
			case 'id':
				$orderby = 'VNU_id';
				break;

			case 'capacity':
				$orderby = 'VNU_capacity';
				break;

			case 'city':
				$orderby = 'VNU_city';
				break;

			default:
				$orderby = 'VNU_name';
		}


		$sort = ( isset( $this->_req_data['order'] ) && ! empty( $this->_req_data['order'] )) ? $this->_req_data['order'] : 'ASC';

		$current_page = isset( $this->_req_data['paged'] ) && !empty( $this->_req_data['paged'] ) ? $this->_req_data['paged'] : 1;
		$per_page = isset( $per_page ) && !empty( $per_page ) ? $per_page : 10;
		$per_page = isset( $this->_req_data['perpage'] ) && !empty( $this->_req_data['perpage'] ) ? $this->_req_data['perpage'] : $per_page;


		$offset = ($current_page-1)*$per_page;
		$limit = array($offset, $per_page);

		$where = array(
			'status' => isset( $this->_req_data['venue_status'] ) && $this->_req_data['venue_status'] != '' ? $this->_req_data['venue_status'] : array('IN', array('publish', 'draft') )
			//todo add filter by category
			);


		if ( isset( $this->_req_data['s'] ) ) {
			$sstr = '%' . $this->_req_data['s'] . '%';
			$where['OR'] = array(
				'VNU_name' => array('LIKE',$sstr ),
				'VNU_desc' => array('LIKE',$sstr ),
				'VNU_short_desc' => array( 'LIKE',$sstr ),
				'VNU_address' => array( 'LIKE', $sstr ),
				'VNU_address2' => array( 'LIKE', $sstr ),
				'VNU_city' => array( 'LIKE', $sstr ),
				'VNU_zip' => array( 'LIKE', $sstr ),
				'VNU_phone' => array( 'LIKE', $sstr ),
				'VNU_url' => array( 'LIKE', $sstr ),
				'VNU_virtual_phone' => array( 'LIKE', $sstr ),
				'VNU_virtual_url' => array( 'LIKE', $sstr ),
				'VNU_google_map_link' => array( 'LIKE', $sstr ),
				'Event.EVT_name' => array('LIKE', $sstr ),
				'Event.EVT_desc' => array('LIKE', $sstr ),
				'Event.EVT_phone' => array('LIKE', $sstr ),
				'Event.EVT_external_URL' => array('LIKE', $sstr ),
				);
		}

		$venues = $count ? $this->_venue_model->count( array($where), 'VNU_ID' ) : $this->_venue_model->get_all( array( $where, 'limit' => $limit, 'order_by' => $orderby, 'order' => $sort ) );

		return $venues;

	}




	/** Venue Category Stuff **/

	/**
	 * set the _category property with the category object for the loaded page.
	 *
	 * @access private
	 * @return void
	 */
	private function _set_category_object() {
		if ( isset( $this->_category->id ) && !empty( $this->_category->id ) )
			return; //already have the category object so get out.

		//set default category object
		$this->_set_empty_category_object();
		
		//only set if we've got an id
		if ( !isset($this->_req_data['VEN_CAT_ID'] ) ) {
			return;
		}

		$category_id = absint($this->_req_data['VEN_CAT_ID']);
		$term = get_term( $category_id, 'espresso_venue_categories' );


		if ( !empty( $term ) ) {
			$this->_category->category_name = $term->name;
			$this->_category->category_identifier = $term->slug;
			$this->_category->category_desc = $term->description;
			$this->_category->id = $term->term_id;
		}
	}




	private function _set_empty_category_object() {
		$this->_category = new stdClass();
		$this->_category->id = $this->_category->category_name = $this->_category->category_identifier = $this->_category->category_desc = '';
	}



	protected function _category_list_table() {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		$this->_admin_page_title .= $this->get_action_link_or_button('add_category', 'add_category', array(), 'add-new-h2');
		$this->_search_btn_label = __('Venue Categories', 'event_espresso');
		$this->display_admin_list_table_page_with_sidebar();
	}


	protected function _category_details($view) {

		//load formatter helper
		EE_Registry::instance()->load_helper( 'Formatter' );
		//load field generator helper
		EE_Registry::instance()->load_helper( 'Form_Fields' );

		$route = $view == 'edit' ? 'update_category' : 'insert_category';
		$this->_set_add_edit_form_tags($route);

		$this->_set_category_object();
		$id = !empty($this->_category->id) ? $this->_category->id : '';

		$delete_action = $this->_category->category_identifier == 'uncategorized' ? FALSE : 'delete_category';

		$redirect = EE_Admin_Page::add_query_args_and_nonce( array( 'action' => 'category_list' ), $this->_admin_base_url );

		$this->_set_publish_post_box_vars( 'VEN_CAT_ID', $id, $delete_action, $redirect );

		//take care of contents
		$this->_template_args['admin_page_content'] = $this->_category_details_content();
		$this->display_admin_page_with_sidebar();
	}



	protected function _category_details_content() {
		$editor_args['category_desc'] = array(
			'type' => 'wp_editor',
			'value' => EEH_Formatter::admin_format_content($this->_category->category_desc),
			'class' => 'my_editor_custom'
		);
		$_wp_editor = $this->_generate_admin_form_fields( $editor_args, 'array' );
		$template_args = array(
			'category' => $this->_category,
			'unique_id_info_help_link' => $this->_get_help_tab_link('unique_id_info'),
			'category_desc_editor' =>  $_wp_editor['category_desc']['field'],
			'disable' => $this->_category->category_identifier == 'uncategorized' ? ' disabled' : '',
			'disabled_message' => $this->_category->category_identifier == 'uncategorized' ? TRUE : FALSE
			);
		$template = EVENTS_TEMPLATE_PATH . 'event_category_details.template.php';
		return EEH_Template::display_template($template, $template_args, TRUE );
	}


	protected function _delete_categories() {
		$cat_ids = isset( $this->_req_data['VEN_CAT_ID'] ) ? (array) $this->_req_data['VEN_CAT_ID'] : (array) $this->_req_data['category_id'];

		foreach ( $cat_ids as $cat_id ) {
			$this->_delete_category($cat_id);
		}

		//doesn't matter what page we're coming from... we're going to the same place after delete.
		$query_args = array(
			'action' => 'category_list'
			);
		$this->_redirect_after_action(0,'','',$query_args);

	}





	protected function _delete_category($cat_id) {
		global $wpdb;
		$cat_id = absint( $cat_id );
		wp_delete_term( $cat_id, 'espresso_venue_categories' );
	}



	protected function _insert_or_update_category($new_category) {

		$cat_id = $new_category ? $this->_insert_category() : $this->_insert_category( TRUE );
		$success = 0; //we already have a success message so lets not send another.
		$query_args = array(
			'action' => 'edit_category', 
			'VEN_CAT_ID' => $cat_id
		);
		$this->_redirect_after_action( $success, '','', $query_args, TRUE );

	}



	private function _insert_category( $update = FALSE ) {
		global $wpdb;
		$cat_id = $update ? $this->_req_data['VEN_CAT_ID'] : '';
		$category_name= $this->_req_data['category_name'];
		$category_identifier = $this->_req_data['category_identifier'];
		$category_desc= $this->_req_data['category_desc']; 


	
		$term_args=array(
			'name'=>$category_name, 
			'slug'=>$category_identifier, 
			'description'=>$category_desc,
			//'parent'=>$espresso_wp_user //eventually this will be added.
		);
		
		$insert_ids = $update ? wp_update_term( $cat_id, 'espresso_venue_categories', $term_args ) :wp_insert_term( $category_name, 'espresso_venue_categories', $term_args );

		if ( !is_array( $insert_ids ) ) {
			$msg = __( 'An error occurred and the category has not been saved to the database.', 'event_espresso', 'event_espresso' );
			EE_Error::add_error( $msg, __FILE__, __FUNCTION__, __LINE__ );
		} else {
			$cat_id = $insert_ids['term_id'];
			$msg = sprintf ( __('The category %s was successfuly created', 'event_espresso'), $category_name );
			EE_Error::add_success( $msg );
		}
		
		return $cat_id;
	}


	/**
	 * TODO handle category exports()
	 * @return file export
	 */
	protected function _categories_export() {

		//todo: I don't like doing this but it'll do until we modify EE_Export Class.
		$new_request_args = array(
			'export' => 'report',
			'action' => 'categories',
			'category_ids' => $this->_req_data['VEN_CAT_ID']
			);

		$this->_req_data = array_merge( $this->_req_data, $new_request_args );

		if ( file_exists( EE_CLASSES . 'EE_Export.class.php') ) {
			require_once( EE_CLASSES . 'EE_Export.class.php');
			$EE_Export = EE_Export::instance( $this->_req_data );
			$EE_Export->export();
		}

	}





	protected function _import_categories() {

		require_once(EE_CLASSES . 'EE_Import.class.php');
		EE_Import::instance()->import();

	}




	public function get_categories( $per_page = 10, $current_page = 1, $count = FALSE ) {
		global $wpdb;

		//testing term stuff
		$orderby = isset( $this->_req_data['orderby'] ) ? $this->_req_data['orderby'] : 'Term.term_id';
		$order = isset( $this->_req_data['order'] ) ? $this->_req_data['order'] : 'DESC';
		$limit = ($current_page-1)*$per_page;
		$where = array( 'taxonomy' => 'espresso_venue_categories' );
		if ( isset( $this->_req_data['s'] ) ) {
			$sstr = '%' . $this->_req_data['s'] . '%';
			$where['OR'] = array(
				'Term.name' => array( 'LIKE', $sstr),
				'description' => array( 'LIKE', $sstr )
				);
		}

		$query_params = array(
			$where,
			'order_by' => array( $orderby => $order ),
			'limit' => $limit . ',' . $per_page,
			'force_join' => array('Term')
			);

		$categories = $count ? EEM_Term_Taxonomy::instance()->count( $query_params, 'term_id' ) :EEM_Term_Taxonomy::instance()->get_all( $query_params );

		return $categories;
	}


	/* end category stuff */
	/**************/


	
} //end Venues_Admin_Page class