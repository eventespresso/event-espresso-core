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
 * Registrations_Admin_Page class
 *
 * @package			Event Espresso
 * @subpackage	includes/core/admin/transactions/Registrations_Admin_Page.core.php 
 * @author				Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class Registrations_Admin_Page extends EE_Admin_Page_CPT {

	/**
	 *
	 * @var EE_Registration
	 */
	private $_registration;
	private $_reg_event;
	private $_session;
	private static $_reg_status;





	/**
	 * 		constructor
	 * 		@Constructor
	 * 		@access public
	 * 		@return void
	 */
	public function __construct( $routing = TRUE ) {
		parent::__construct( $routing );
	}






	protected function _init_page_props() {
		$this->page_slug = REG_PG_SLUG;
		$this->_admin_base_url = REG_ADMIN_URL;
		$this->_admin_base_path = REG_ADMIN;
		$this->page_label = __('Registrations', 'event_espresso');
		$this->_cpt_routes = array(
			'add_new_attendee' => 'espresso_attendees',
			'edit_attendee' => 'espresso_attendees',
			'insert_attendee' => 'espresso_attendees',
			'update_attendee' => 'espresso_attendees'
			);
		$this->_cpt_model_names = array(
			'add_new_attendee' => 'EEM_Attendee',
			'edit_attendee' => 'EEM_Attendee'
			);
		$this->_cpt_edit_routes = array(
			'espresso_attendees' => 'edit_attendee'
			);

		add_action('edit_form_after_title', array($this, 'after_title_form_fields'), 10 );
		//add filters so that the comment urls don't take users to a confusing 404 page
		add_filter('get_comment_link', array( $this, 'clear_comment_link' ), 10, 3 );
	}


	public function clear_comment_link( $link, $comment, $args ) {
		//gotta make sure this only happens on this route
		$post_type = get_post_type( $comment->comment_post_ID);
		if ( $post_type == 'espresso_attendees' )
			return '#commentsdiv';
		return $link;
	}


	protected function _ajax_hooks() {
		//todo: all hooks for registrations ajax goes in here
		add_action( 'wp_ajax_toggle_checkin_status', array( $this, 'toggle_checkin_status' ));
	}





	protected function  _define_page_props() {
		$this->_admin_page_title = $this->page_label;
		$this->_labels = array(
			'buttons' => array(
					'add-registrant' => __('Add New Registration', 'event_espresso'),
					'add-attendee' => __('Add Contact', 'event_espresso'),
					'edit' => __('Edit Contact', 'event_espresso'),
					'report'=>  __("Registrations CSV Report", "event_espresso"),
					'contact_list_export'=>  __("Contact List CSV Export", "event_espresso"),
				),
			'publishbox' => array(
				'edit_attendee' => __("Update Contact Record", 'event_espresso')
				),
			'hide_add_button_on_cpt_route' => array(
				'edit_attendee' => true
				)
			);
	}







	/**
	 * 		grab url requests and route them
	*		@access private
	*		@return void
	*/
	public function _set_page_routes() {			

		$this->_get_registration_status_array();

		$this->_page_routes = array(
		
				'default'	=> '_registrations_overview_list_table',
				
				'view_registration'	=> '_registration_details',
				
				'edit_registration'	=> array( 
						'func' => '_registration_details', 
						'args' => array( 'edit' ), 
						'noheader' => TRUE 
						
					),

				'trash_registrations' => array(
					'func' => '_trash_or_restore_registrations',
					'args' => array('trash' => TRUE),
					'noheader' => TRUE
					),

				'restore_registrations' => array(
					'func' => '_trash_or_restore_registrations',
					'args' => array( 'trash' => FALSE ),
					'noheader' => TRUE
					),

				'delete_registrations' => array(
					'func' => '_delete_registrations',
					'noheader' => TRUE
					),
					
				'update_attendee_registration_form'	=> array( 
						'func' => '_update_attendee_registration_form', 
						'noheader' => TRUE						
					),
					
				'new_registration' => 'new_registration',
					
				'process_registration_step'	=> array(
						'func' => '_process_registration_step',
						'noheader' => TRUE
					),

				'change_reg_status' => array(
					'func' => '_change_reg_status',
					'noheader' => TRUE
					),
					
				'approve_registration'	=> array(
						'func' => 'approve_registration',
						'noheader' => TRUE
					),
					
				'decline_registration'	=> array(
						'func' => 'decline_registration',
						'noheader' => TRUE
					),
					
				'pending_registration'	=> array(
						'func' => 'pending_registration',
						'noheader' => TRUE
					),

				'no_approve_registration' => array(
					'func' => 'not_approve_registration',
					'noheader' => TRUE
					),
					
				'cancel_registration'	=> array(
						'func' => 'cancel_registration',
						'noheader' => TRUE
					),
				
				'contact_list'	=> '_attendee_contact_list_table',

				
				'add_new_attendee'	=> array( 
					'func' => '_create_new_cpt_item', 
					'args' => array( 
						'new_attendee' => TRUE 
					)
				),
				
				'edit_attendee'	=> array( 
					'func' => '_edit_cpt_item'
				),
				
				'insert_attendee'	=> array( 
					'func' => '_insert_or_update_attendee', 
					'args' => array( 
						'new_attendee' => TRUE 
					), 
					'noheader' => TRUE 
				),

				'update_attendee'	=> array( 
					'func' => '_insert_or_update_attendee', 
					'args' => array( 
						'new_attendee' => FALSE 
					), 
					'noheader' => TRUE
				),

				'trash_attendees'	=> array( 
					'func' => '_trash_or_restore_attendees', 
					'args' => array( 
						'trash' => TRUE 
					), 
					'noheader' => TRUE 
				),
				
				'restore_attendees'	=> array( 
					'func' => '_trash_or_restore_attendees', 
					'args' => array( 
						'trash' => FALSE 
					), 
					'noheader' => TRUE 
				),
				'resend_registration' => array(
					'func' => '_resend_registration',
					'noheader' => TRUE
					),
				'registrations_report'=>array(
					'func'=>'_registrations_report',
					'noheader'=> TRUE
				),
				'contact_list_export'=>array(
					'func'=>'_contact_list_export',
					'noheader'=>TRUE
				)
		);
		
	}





	protected function _set_page_config() {
		$this->_page_config = array(
		
			'default' => array(
				'nav' => array(
					'label' => __('Overview', 'event_espresso'),
					'order' => 5
					),
                'help_tabs' => array(
					'registrations_overview_help_tab' => array(
						'title' => __('Registrations Overview', 'event_espresso'),
						'filename' => 'registrations_overview'
					),
					'registrations_overview_table_column_headings_help_tab' => array(
						'title' => __('Registrations Table Column Headings', 'event_espresso'),
						'filename' => 'registrations_overview_table_column_headings'
					),
					'registrations_overview_filters_help_tab' => array(
						'title' => __('Registration Filters', 'event_espresso'),
						'filename' => 'registrations_overview_filters'
					),
					'registrations_overview_views_help_tab' => array(
						'title' => __('Registration Views', 'event_espresso'),
						'filename' => 'registrations_overview_views'
					),
					'registrations_overview_other_help_tab' => array(
						'title' => __('Registrations Other', 'event_espresso'),
						'filename' => 'registrations_overview_other'
					)	
                ),
				'help_tour' => array( 'Registration_Overview_Help_Tour' ),
				'qtips' => array('Registration_List_Table_Tips'),
				'list_table' => 'EE_Registrations_List_Table',
				'require_nonce' => FALSE
				),
				
			'view_registration' => array(
				'nav' => array(
					'label' => __('REG Details', 'event_espresso'),
					'order' => 15,
					'url' => isset($this->_req_data['_REG_ID']) ? add_query_arg(array('_REG_ID' => $this->_req_data['_REG_ID'] ), $this->_current_page_view_url )  : $this->_admin_base_url,
					'persistent' => FALSE
					),
                'help_tabs' => array(
					'registrations_details_help_tab' => array(
						'title' => __('Registration Details', 'event_espresso'),
						'filename' => 'registrations_details'
						),
					'registrations_details_table_help_tab' => array(
						'title' => __('Registration Details Table', 'event_espresso'),
						'filename' => 'registrations_details_table'
						),
					'registrations_details_form_answers_help_tab' => array(
						'title' => __('Registration Form Answers', 'event_espresso'),
						'filename' => 'registrations_details_form_answers'
						),
					'registrations_details_registrant_details_help_tab' => array(
						'title' => __('Registration Details', 'event_espresso'),
						'filename' => 'registrations_details_registrant_details'
						)
					),
				'help_tour' => array( 'Registration_Details_Help_Tour' ),
				'metaboxes' => array( '_registration_details_metaboxes', '_espresso_news_post_box', '_espresso_links_post_box', '_espresso_sponsors_post_box' ),
				'require_nonce' => FALSE
				),
				
			'new_registration' => array(
				'nav' => array(
					'label' => __('Add New Registration', 'event_espresso'),
					'order' => 15,
					'persistent' => FALSE
					),
				'metaboxes' => array( '_espresso_news_post_box', '_espresso_links_post_box', '_espresso_sponsors_post_box' ),
				'labels' => array(
					'publishbox' => __('Save Registration', 'event_espresso')
					),
				'require_nonce' => FALSE
				),
				
			'add_new_attendee' => array(
				'nav' => array(
					'label' => __('Add Contact', 'event_espresso'),
					'order' => 15,
					'persistent' => FALSE
					),
				'metaboxes' => array('_publish_post_box', '_espresso_news_post_box', '_espresso_links_post_box', '_espresso_sponsors_post_box'),
				'require_nonce' => FALSE
				),
				
			'edit_attendee' => array(
				'nav' => array(
					'label' => __('Edit Contact', 'event_espresso'),
					'order' => 15,
					'persistent' => FALSE,
					'url' => isset($this->_req_data['ATT_ID']) ? add_query_arg(array('ATT_ID' => $this->_req_data['ATT_ID'] ), $this->_current_page_view_url )  : $this->_admin_base_url
					),
				'metaboxes' => array('attendee_editor_metaboxes'),
				'require_nonce' => FALSE
				),
				
			'contact_list' => array(
				'nav' => array(
					'label' => __('Contact List', 'event_espresso'),
					'order' => 20
					),
				'list_table' => 'EE_Attendee_Contact_List_Table',
                'help_tabs' => array(
					'registrations_contact_list_help_tab' => array(
						'title' => __('Registrations Contact List', 'event_espresso'),
						'filename' => 'registrations_contact_list'
					),
					'registrations_contact-list_table_column_headings_help_tab' => array(
						'title' => __('Contact List Table Column Headings', 'event_espresso'),
						'filename' => 'registrations_contact_list_table_column_headings'
					),
					'registrations_contact_list_views_help_tab' => array(
						'title' => __('Contact List Views', 'event_espresso'),
						'filename' => 'registrations_contact_list_views'
					),
					'registrations_contact_list_other_help_tab' => array(
						'title' => __('Contact List Other', 'event_espresso'),
						'filename' => 'registrations_contact_list_other'
					)	
                ),
				'help_tour' => array( 'Contact_List_Help_Tour' ),
				'metaboxes' => array(),
				'require_nonce' => FALSE
				),

			//override default cpt routes
			'create_new' => '',
			'edit' => ''
				
			);
	}


	/**
	 * The below methods aren't used by this class currently
	 */
	protected function _add_screen_options() {}
	protected function _add_feature_pointers() {}
	public function admin_init() {}
	public function admin_notices() {}
	public function admin_footer_scripts() {}








	/**
	 * 		get list of registration statuses
	*		@access private
	*		@return void
	*/
	private function _get_registration_status_array() {
		self::$_reg_status = EEM_Registration::reg_status_array( array(), TRUE);
	}




	protected function _add_screen_options_default() {
		$this->_per_page_screen_option();
	}

	protected function _add_screen_options_contact_list() {
		$page_title = $this->_admin_page_title;
		$this->_admin_page_title = __("Contacts", 'event_espresso');
		$this->_per_page_screen_option();
		$this->_admin_page_title = $page_title;
	}




	public function load_scripts_styles() {
		//style
		//wp_register_style('espresso_attendees', ATT_ASSETS_URL . 'espresso_attendees_admin.css', array(), EVENT_ESPRESSO_VERSION );	
		wp_register_style('espresso_reg', REG_ASSETS_URL . 'espresso_registrations_admin.css', array('ee-admin-css'), EVENT_ESPRESSO_VERSION );
		wp_enqueue_style('espresso_reg');

		//script
		wp_register_script('espresso_reg', REG_ASSETS_URL . 'espresso_registrations_admin.js', array('jquery-ui-datepicker', 'jquery-ui-draggable', 'ee_admin_js'), EVENT_ESPRESSO_VERSION, TRUE);
		wp_enqueue_script('espresso_reg');
	}



	public function load_scripts_styles_edit_attendee() {
		//stuff to only show up on our attendee edit details page.
		$attendee_details_translations = array(
			'att_publish_text' => sprintf( __('Created on: <b>%1$s</b>', 'event_espresso'), $this->_cpt_model_obj->get_datetime('ATT_created') )
			);
		wp_localize_script( 'espresso_reg', 'ATTENDEE_DETAILS', $attendee_details_translations );
		wp_enqueue_script('jquery-validate');
	}


	public function load_scripts_styles_view_registration() {
		//styles
		wp_enqueue_style('espresso-ui-theme');
		//scripts
		EE_Registry::$i18n_js_strings['update_att_qstns'] = __( 'click "Update Registration Questions" to save your changes', 'event_espresso' );
		wp_localize_script( 'espresso_reg', 'eei18n', EE_Registry::$i18n_js_strings );
	}






	public function load_scripts_styles_contact_list() {
		wp_deregister_style('espresso_reg');
		wp_register_style('espresso_att', REG_ASSETS_URL . 'espresso_attendees_admin.css', array('ee-admin-css'), EVENT_ESPRESSO_VERSION );
		wp_enqueue_style('espresso_att');
	}





	public function load_scripts_styles_new_registration() {
		wp_register_script( 'espresso-validate-new-reg', REG_ASSETS_URL . 'espresso-validate-new-reg.js', array('jquery-validate'), EVENT_ESPRESSO_VERSION, TRUE);
		wp_register_script( 'ee-spco-for-admin', REG_ASSETS_URL . 'spco_for_admin.js', array('underscore', 'jquery'), EVENT_ESPRESSO_VERSION, TRUE );
		wp_enqueue_script('espresso-validate-new-reg');
		wp_enqueue_script('ee-spco-for-admin');
		add_filter('FHEE__EED_Ticket_Selector__load_tckt_slctr_assets', '__return_true' );
		EED_Ticket_Selector::load_tckt_slctr_assets();
		EED_Single_Page_Checkout::wp_enqueue_scripts();
	}





	public function AHEE__EE_Admin_Page__route_admin_request_resend_registration() {
		add_filter('FHEE_load_EE_messages', '__return_true');
	}



	public function AHEE__EE_Admin_Page__route_admin_request_approve_registration() {
		add_filter('FHEE_load_EE_messages', '__return_true');
	}



	protected function _set_list_table_views_default() {
		$this->_views = array(
			'all' => array(
				'slug' => 'all',
				'label' => __('View All Registrations', 'event_espresso'),
				'count' => 0,
				'bulk_action' => array(
					'approve_registration' => __('Approve Registrations', 'event_espresso'),
					'decline_registration' => __('Decline Registrations', 'event_espresso'),
					'pending_registration' => __('Set Registrations to Pending Payment', 'event_espresso'),
					'no_approve_registration' => __('Set Registrations to Not Approved', 'event_espresso'),
					'cancel_registration' => __('Cancel Registrations', 'event_espresso'),
					'trash_registrations' => __('Trash Registrations', 'event_espresso')
					)
				),
			'month' => array(
				'slug' => 'month',
				'label' => __('This Month', 'event_espresso'),
				'count' => 0,
				'bulk_action' => array(
					'approve_registration' => __('Approve Registrations', 'event_espresso'),
					'decline_registration' => __('Decline Registrations', 'event_espresso'),
					'pending_registration' => __('Set Registrations to Pending Payment', 'event_espresso'),
					'no_approve_registration' => __('Set Registrations to Not Approved', 'event_espresso'),
					'cancel_registration' => __('Cancel Registrations', 'event_espresso'),
					'trash_registrations' => __('Trash Registrations', 'event_espresso')
					)
				),
			'today' => array(
				'slug' => 'today',
				'label' => sprintf( __('Today - %s', 'event_espresso'), date('M d, Y', current_time('timestamp', 0) ) ),
				'count' => 0,
				'bulk_action' => array(
					'approve_registration' => __('Approve Registrations', 'event_espresso'),
					'decline_registration' => __('Decline Registrations', 'event_espresso'),
					'pending_registration' => __('Set Registrations to Pending Payment', 'event_espresso'),
					'no_approved_registration' => __('Set Registrations to Not Approved', 'event_espresso'),
					'cancel_registration' => __('Cancel Registrations', 'event_espresso'),
					'trash_registrations' => __('Trash Registrations', 'event_espresso')
					)
				),
			'trash' => array(
				'slug' => 'trash',
				'label' => __('Trash', 'event_espresso'),
				'count' => 0,
				'bulk_action' => array(
					'restore_registrations' => __('Restore Registrations', 'event_espresso'),
					'delete_registrations' => __('Delete Registrations Permanently', 'event_espresso')
					)
				)
			);
	}




	protected function _set_list_table_views_contact_list() {
		$this->_views = array(
			'in_use' => array(
				'slug' => 'in_use',
				'label' => __('In Use', 'event_espresso'),
				'count' => 0,
				'bulk_action' => array(
					'trash_attendees' => __('Move to Trash', 'event_espresso'),
					)
				),
			'trash' => array(
				'slug' => 'trash',
				'label' => 'Trash',
				'count' => 0,
				'bulk_action' => array(
					'restore_attendees' => __('Restore from Trash', 'event_espresso'),
					)
				)
				
			);
	}





	protected function _registration_legend_items() {
		$items = array(
			'star-icon' => array(
				'icon' => EE_GLOBAL_ASSETS_URL . 'images/star-8x8.png',
				'desc' => __('This is the Primary Registrant', 'event_espresso')
				),
			'view_details' => array(
				'class' => 'dashicons dashicons-search',
				'desc' => __('View Registration Details', 'event_espresso')
				),
			'edit_attendee' => array(
				'class' => 'dashicons dashicons-businessman',
				'desc' => __('Edit Contact Details', 'event_espresso')
				),
			'resend_registration' => array(
				'class' => 'ee-icon ee-icon-email-send',
				'desc' => __('Resend Registration Details', 'event_espresso')
				),
			'view_transaction' => array(
				'class' => 'ee-icon ee-icon-cash',
				'desc' => __('View Transaction Details', 'event_espresso')
				),
            'approved_status' => array(
				'class' => 'ee-status-legend ee-status-legend-' . EEM_Registration::status_id_approved,
				'desc' => EEH_Template::pretty_status( EEM_Registration::status_id_approved, FALSE, 'sentence' )
				),
            'cancelled_status' => array(
				'class' => 'ee-status-legend ee-status-legend-' . EEM_Registration::status_id_cancelled,
				'desc' => EEH_Template::pretty_status( EEM_Registration::status_id_cancelled, FALSE, 'sentence' )
				),
            'declined_status' => array(
				'class' => 'ee-status-legend ee-status-legend-' . EEM_Registration::status_id_declined,
				'desc' => EEH_Template::pretty_status( EEM_Registration::status_id_declined, FALSE, 'sentence' )
				),
			'not_approved' => array(
				'class' => 'ee-status-legend ee-status-legend-' . EEM_Registration::status_id_not_approved,
				'desc' => EEH_Template::pretty_status( EEM_Registration::status_id_not_approved, FALSE, 'sentence' )
				),
			'pending_status' => array(
				'class' => 'ee-status-legend ee-status-legend-' . EEM_Registration::status_id_pending_payment,
				'desc' => EEH_Template::pretty_status( EEM_Registration::status_id_pending_payment, FALSE, 'sentence' )
				)
			);
		return $items;
	}



	/***************************************		REGISTRATION OVERVIEW 		***************************************/






	protected function _registrations_overview_list_table() {
		$EVT_ID = ( ! empty( $this->_req_data['event_id'] )) ? absint( $this->_req_data['event_id'] ) : FALSE;
		if ( $EVT_ID ) {
			$this->_admin_page_title .= $this->get_action_link_or_button( 'new_registration', 'add-registrant', array( 'event_id' => $EVT_ID ), 'add-new-h2' );
			$event = EEM_Event::instance()->get_one_by_ID( $EVT_ID );
			$this->_template_args['admin_page_header'] = $event instanceof EE_Event ? sprintf( __('%s Viewing registrations for the event: %s%s', 'event_espressso'), '<h2>', '<a href="' . EE_Admin_Page::add_query_args_and_nonce( array('action' => 'edit', 'post' => $event->ID() ), EVENTS_ADMIN_URL ) . '">' . $event->get('EVT_name') . '</a>', '</h2>' ) : '';
		}		
		$this->_template_args['after_list_table'] = $this->_display_legend( $this->_registration_legend_items() );
		$this->display_admin_list_table_page_with_no_sidebar();
	}




	/**
	 * This sets the _registration property for the registration details screen
	 *
	 * @access private
	 * @return void
	 */
	private function _set_registration_object() {
		//get out if we've already set the object
		if ( is_object( $this->_registration )) {
			return TRUE; 			
		}

	    $REG = EEM_Registration::instance();

		$REG_ID = ( ! empty( $this->_req_data['_REG_ID'] )) ? absint( $this->_req_data['_REG_ID'] ) : FALSE;

		if ( $this->_registration = $REG->get_one_by_ID( $REG_ID ))
			return TRUE;
		else {
			$error_msg = sprintf( __('An error occurred and the details for Registration ID #%s could not be retreived.', 'event_espresso'), $REG_ID );
			EE_Error::add_error( $error_msg, __FILE__, __FUNCTION__, __LINE__ );
			$this->_registration = NULL;
			return FALSE;
		}
	}





	/**
	 * get registrations for given parameters (used by list table)
	 * @param  int  $per_page    how many registrations displayed per page
	 * @param  boolean $count   return the count or objects
	 * @param  boolean $this_month whether to return for just this month
	 * @param  boolean $today    whether to return results for just today
	 * @param  boolean $all      whether to ignore all query params and just return ALL registrations (or count if count is set)
	 * @return mixed (int|array)  int = count || array of registration objects
	 */
	public function get_registrations( $per_page = 10, $count = FALSE, $this_month = FALSE, $today = FALSE ) {

		$EVT_ID = isset( $this->_req_data['event_id'] ) ? absint( $this->_req_data['event_id'] ) : FALSE;
		$CAT_ID = isset( $this->_req_data['category_id'] ) ? absint( $this->_req_data['category_id'] ) : FALSE;
		$reg_status = isset( $this->_req_data['reg_status'] ) ? sanitize_text_field( $this->_req_data['reg_status'] ) : FALSE;
		$month_range = isset( $this->_req_data['month_range'] ) ? sanitize_text_field( $this->_req_data['month_range'] ) : FALSE;//should be like 2013-april
		$today_a = isset( $this->_req_data['status'] ) && $this->_req_data['status'] == 'today' ? TRUE : FALSE;
		$this_month_a = isset( $this->_req_data['status'] ) && $this->_req_data['status'] == 'month' ? TRUE  : FALSE;
		$start_date = FALSE;
		$end_date = FALSE;
		$_where = array();
		$trash = isset( $this->_req_data['status'] ) && $this->_req_data['status'] == 'trash' ? TRUE : FALSE;

		//set orderby
		$this->_req_data['orderby'] = ! empty($this->_req_data['orderby']) ? $this->_req_data['orderby'] : '';

		switch ( $this->_req_data['orderby'] ) {
			case 'REG_ID':
				$orderby = 'REG_ID';
				break;
			case 'Reg_status':
				$orderby = 'STS_ID';
				break;
			case 'ATT_fname':
				$orderby = 'Attendee.ATT_lname';
				break;
			case 'event_name':
				$orderby = 'Event.EVT_name';
				break;
			case 'DTT_EVT_start':
				$orderby = 'Event.Datetime.DTT_EVT_start';
				break;
			default: //'REG_date'
				$orderby = 'REG_date';
		}

		$sort = ( isset( $this->_req_data['order'] ) && ! empty( $this->_req_data['order'] )) ? $this->_req_data['order'] : 'DESC';
		$current_page = isset( $this->_req_data['paged'] ) && !empty( $this->_req_data['paged'] ) ? $this->_req_data['paged'] : 1;
		$per_page = isset( $this->_req_data['perpage'] ) && !empty( $this->_req_data['perpage'] ) ? $this->_req_data['perpage'] : $per_page;

		
		$offset = ($current_page-1)*$per_page;
		$limit = $count  ? NULL : array( $offset, $per_page );

		$query_params = array();
		if($EVT_ID){
			$_where['EVT_ID']=$EVT_ID;
		}
		if($CAT_ID){
			throw new EE_Error("not sure how to handle filtering event categories here");
		}
		if($reg_status){
			$_where['STS_ID'] = $reg_status;
		}
		
		
		
		$this_year_r = date('Y', current_time('timestamp'));
		
		
		$time_start = ' 00:00:00';
		$time_end = ' 23:59:59';
		
		if($today_a || $today ){
			$curdate = date('Y-m-d', current_time('timestamp'));
			$_where['REG_date']= array('BETWEEN',
				array(
					strtotime($curdate . $time_start),
					strtotime($curdate . $time_end)
			));
		}elseif($this_month_a || $this_month){
			$this_month_r = date('m', current_time('timestamp'));
			$days_this_month = date( 't', current_time('timestamp') );
			$_where['REG_date']= array('BETWEEN',
				array(
					strtotime( $this_year_r . '-' . $this_month_r . '-01' . ' ' . $time_start ),
					strtotime( $this_year_r . '-' . $this_month_r . $days_this_month . ' ' . $time_end ) 
			));
		}elseif($month_range){
			$pieces = explode(' ', $this->_req_data['month_range'], 3);
			$month_r = !empty($pieces[0]) ? date('m', strtotime($pieces[0])) : '';
			$year_r = !empty($pieces[1]) ? $pieces[1] : '';
			$_where['REG_date']= array('BETWEEN',
				array( strtotime($year_r . '-' . $month_r . '-01 00:00:00'), strtotime($year_r . '-' . $month_r . '-31 23:59:59' ) ) );	
		}elseif($start_date && $end_date){
			throw new EE_Error("not yet supported");
		}elseif($start_date){
			throw new EE_Error("not yet supported");
		}elseif($end_date){
			throw new EE_Error("not yet supported");
		}

		if ( isset( $this->_req_data['s'] ) ) {
			$sstr = '%' . $this->_req_data['s'] . '%';
			$_where['OR'] = array(
				'Event.EVT_name' => array( 'LIKE', $sstr),
				'Event.EVT_desc' => array( 'LIKE', $sstr ),
				'Event.EVT_short_desc' => array( 'LIKE' , $sstr ),
				'Attendee.ATT_fname' => array( 'LIKE', $sstr ),
				'Attendee.ATT_lname' => array( 'LIKE', $sstr ),
				'Attendee.ATT_short_bio' => array( 'LIKE', $sstr ),
				'Attendee.ATT_email' => array('LIKE', $sstr ),
				'Attendee.ATT_address' => array( 'LIKE', $sstr ),
				'Attendee.ATT_address2' => array( 'LIKE', $sstr ),
				'Attendee.ATT_city' => array( 'LIKE', $sstr ),
				'REG_final_price' => array( 'LIKE', $sstr ),
				'REG_code' => array( 'LIKE', $sstr ),
				'REG_count' => array( 'LIKE' , $sstr ),
				'REG_group_size' => array( 'LIKE' , $sstr ),
				'Ticket.TKT_name' => array( 'LIKE', $sstr ),
				'Ticket.TKT_description' => array( 'LIKE', $sstr )		
				);

			$_where['OR*'] = array(
				'Event.status' => 'draft',
				'Event.status*' => 'trash',
				'Event.status**' => 'publish',
				);
		}

		
		if($count){
			return EEM_Registration::instance()->count(array($_where));
		}else{
			//make sure we remove default where conditions cause all registrations matching query are returned
			$query_params = array( $_where, 'order_by' => array( $orderby => $sort ) );
			if ( $per_page !== -1 ) {
				$query_params['limit'] = $limit;
			}
			$registrations =  $trash ? EEM_Registration::instance()->get_all_deleted($query_params) : EEM_Registration::instance()->get_all($query_params);
			global $wpdb;
	

			if ( $EVT_ID && isset( $registrations[0] ) && $registrations[0] instanceof EE_Registration &&  $registrations[0]->event_obj()) {
				$first_registration = $registrations[0];
				//printr( $registrations[0], '$registrations  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
				$event_name = $first_registration->event_obj()->name();
				$event_date = $first_registration->date_obj()->start_date_and_time('l F j, Y,', 'g:i:s a');// isset( $registrations[0]->DTT_EVT_start ) ? date( 'l F j, Y,    g:i:s a', $registrations[0]->DTT_EVT_start ) : '';
				// edit event link
				if ( $event_name != '' ) {
					$edit_event_url = self::add_query_args_and_nonce( array( 'action'=>'edit_event', 'EVT_ID'=>$EVT_ID ), EVENTS_ADMIN_URL );	
					$edit_event_lnk = '<a href="'.$edit_event_url.'" title="' . __( 'Edit ', 'event_espresso' ) . $event_name . '">' . __( 'Edit Event', 'event_espresso' ) . '</a>';	
					$event_name .= ' <span class="admin-page-header-edit-lnk not-bold">' . $edit_event_lnk . '</span>' ;
				}

				$back_2_reg_url = self::add_query_args_and_nonce( array( 'action'=>'default' ), REG_ADMIN_URL );	
				$back_2_reg_lnk = '<a href="'.$back_2_reg_url.'" title="' . __( 'click to return to viewing all registrations ', 'event_espresso' ) . '">&laquo; ' . __( 'Back to All Registrations', 'event_espresso' ) . '</a>';	

				$this->_template_args['before_admin_page_content'] = '
			<div id="admin-page-header">
				<h1><span class="small-text not-bold">'.__( 'Event: ', 'event_espresso' ).'</span>'. $event_name .'</h1>
				<h3><span class="small-text not-bold">'.__( 'Date: ', 'event_espresso' ). '</span>'. $event_date .'</h3>
				<span class="admin-page-header-go-back-lnk not-bold">' . $back_2_reg_lnk . '</span>
			</div>
			';

			}
			return $registrations;
		}
	}






	public function get_registration_status_array() {
		return self::$_reg_status;
	}




	/***************************************		REGISTRATION DETAILS 		***************************************/





	/**
	 * 		generates HTML for the View Registration Details Admin page
	*		@access protected
	*		@return void
	*/
	protected function _registration_details() {
		
		$this->_template_args = array();

		$this->_set_registration_object();

		if ( is_object( $this->_registration )) {
			$transaction = $this->_registration->transaction() ? $this->_registration->transaction() : EE_Transaction::new_instance();
			$this->_session = $transaction->session_data();

			$title = __( ucwords( str_replace( '_', ' ', $this->_req_action )), 'event_espresso' );
			// add PRC_ID to title if editing 
			$title = $this->_registration->ID() ? $title . ' # ' . $this->_registration->ID() : $title;


			$this->_template_args['reg_nmbr']['value'] = $this->_registration->ID();
			$this->_template_args['reg_nmbr']['label'] = __( 'Registration Number', 'event_espresso' );

			$this->_template_args['reg_datetime']['value'] =  $this->_registration->pretty_date('l F j, Y','g:i:s a') ;
			$this->_template_args['reg_datetime']['label'] = __( 'Date', 'event_espresso' );

			$this->_template_args['reg_status']['value'] = $this->_registration->pretty_status();
			$this->_template_args['reg_status']['label'] = __( 'Registration Status', 'event_espresso' );
			$this->_template_args['reg_status']['class'] = 'status-' . $this->_registration->status_ID();
			
			$this->_template_args['approve_decline_reg_status_buttons'] = $this->_set_approve_or_decline_reg_status_buttons();

			$this->_template_args['grand_total'] = $transaction->total();

			$this->_template_args['currency_sign'] = EE_Registry::instance()->CFG->currency->sign;
			// link back to overview
			$this->_template_args['reg_overview_url'] = REG_ADMIN_URL;	
			$this->_template_args['registration'] = $this->_registration;

			// grab header
			$template_path = REG_TEMPLATE_PATH . 'reg_admin_details_header.template.php';
			$this->_template_args['admin_page_header'] = EEH_Template::display_template( $template_path, $this->_template_args, TRUE );
						
		} else {
			
			$this->_template_args['admin_page_header'] = $this->display_espresso_notices();

		}

		// the details template wrapper
		$this->display_admin_page_with_sidebar();		

	}






	protected function _registration_details_metaboxes() {
		$this->_set_registration_object();
		add_meta_box( 'edit-reg-details-mbox', __( 'Registration Details', 'event_espresso' ), array( $this, '_reg_details_meta_box' ), $this->wp_page_slug, 'normal', 'high' );
		add_meta_box( 'edit-reg-questions-mbox', __( 'Registration Form Answers', 'event_espresso' ), array( $this, '_reg_questions_meta_box' ), $this->wp_page_slug, 'normal', 'high' );
		add_meta_box( 'edit-reg-registrant-mbox', __( 'Registrant Details', 'event_espresso' ), array( $this, '_reg_registrant_side_meta_box' ), $this->wp_page_slug, 'side', 'high' );
		if ( $this->_registration->group_size() > 1 ) {
			add_meta_box( 'edit-reg-attendees-mbox', __( 'Other Registrations in this Transaction', 'event_espresso' ), array( $this, '_reg_attendees_meta_box' ), $this->wp_page_slug, 'normal', 'high' );
		}
	}






	/**
	 * 		_set_approve_or_decline_reg_status_buttons
	*		@access protected
	*		@param string	$REG_status
	*		@return void
	*/
	protected function _set_approve_or_decline_reg_status_buttons() {
		//is registration for free event OR for a completed transaction? This will determine whether the set to pending option is shown.
		$is_complete = $this->_registration->transaction()->is_completed();

		//let's get an array of all possible buttons that we can just reference
		$status_buttons = $this->_get_reg_status_buttons();

		$default_status = EE_Registry::instance()->CFG->registration->default_STS_ID;
		$template = REG_TEMPLATE_PATH . 'reg_status_change_buttons.template.php';
		if ( $this->_set_registration_object() ) {
			$current_status = $this->_registration->status_ID();
			unset( $status_buttons[$current_status] );
			if ( $current_status != EEM_Registration::status_id_pending_payment && $is_complete ) {
				unset( $status_buttons[EEM_Registration::status_id_pending_payment] );
			}
			$template_args['status_buttons'] = implode( "\n", $status_buttons );
		}
		$template_args['form_url'] = REG_ADMIN_URL;
		$template_args['REG_ID'] = $this->_registration->ID();
		$template_args['nonce'] = wp_nonce_field( 'change_reg_status_nonce',  'change_reg_status_nonce', FALSE, FALSE );

		return EEH_Template::display_template( $template, $template_args, TRUE );
		
	}




	/**
	 * Returns an array of all the buttons for the various statuses and switch status actions
	 * @return array 
	 */
	private function _get_reg_status_buttons() {

		$buttons = array(
			EEM_Registration::status_id_approved => '<input type="submit" name="reg_status_id" class="button-secondary ee-status-strip reg-status-' . EEM_Registration::status_id_approved . '" value="' . EEH_Template::pretty_status( EEM_Registration::status_id_approved, FALSE, 'sentence' ) . '">',
			EEM_Registration::status_id_pending_payment => '<input type="submit" name="reg_status_id" class="button-secondary ee-status-strip reg-status-' . EEM_Registration::status_id_pending_payment . '" value="' . EEH_Template::pretty_status( EEM_Registration::status_id_pending_payment, FALSE, 'sentence' ) . '">',
			EEM_Registration::status_id_not_approved => '<input type="submit" name="reg_status_id" class="button-secondary ee-status-strip reg-status-' . EEM_Registration::status_id_not_approved . '" value="' . EEH_Template::pretty_status( EEM_Registration::status_id_not_approved, FALSE, 'sentence' ) . '">',
			EEM_Registration::status_id_declined => '<input type="submit" name="reg_status_id" class="button-secondary ee-status-strip reg-status-' . EEM_Registration::status_id_declined . '" value="' . EEH_Template::pretty_status( EEM_Registration::status_id_declined, FALSE, 'sentence' ) . '">',
			EEM_Registration::status_id_cancelled =>'<input type="submit" name="reg_status_id" class="button-secondary ee-status-strip reg-status-' . EEM_Registration::status_id_cancelled . '" value="' . EEH_Template::pretty_status( EEM_Registration::status_id_cancelled, FALSE, 'sentence' ) . '">',
			);
		return $buttons;
	}







	/**
	 * 		_set_registration_status
	*		@access private
	*		@return void
	*/
	private function _set_registration_status( $REG_ID = FALSE, $status = FALSE ) {
		$success = FALSE;
		// set default status if none is passed
		$status = $status ? $status : EEM_Registration::status_id_pending_payment;
		// have we been passed a REG_ID ?
		if ( ! $REG_ID ) {
			// no ? then check for one in the req data
			$REG_ID = isset( $this->_req_data['_REG_ID'] ) && !is_array( $this->_req_data['_REG_ID'] ) ? absint( $this->_req_data['_REG_ID'] ) : $REG_ID;
		}
		// still don't have one?
		if ( ! $REG_ID ) {
			// then check req data for an array of REG_IDs
			$REG_IDs = isset( $this->_req_data['_REG_ID'] ) && is_array( $this->_req_data['_REG_ID'] ) ? (array) $this->_req_data['_REG_ID'] : array();
			$success = TRUE;
			// loop thru REG_IDs and set each reg status separately
			foreach ( $REG_IDs as $REG_ID ) {
				$result = $this->_set_registration_status( $REG_ID, $status );
				$success = isset( $result['success'] ) && $result['success'] ? $success : FALSE;
			}
			$REG_ID = FALSE;
		}
		if ( $REG_ID ) {
			$registration = EEM_Registration::instance()->get_one_by_ID( $REG_ID );
			$registration->set_status( $status );
			$success = $registration->save();
		} 
		return array( 'REG_ID' => $REG_ID, 'success' => $success );
	}




	/**
	 * Common logic for setting up success message and redirecting to appropriate route
	 * @param  string $STS_ID  status id for the registration changed to
	 * @param  array  $result array from _set_registration_status()
	 * @return void         
	 */
	private function _reg_status_change_return( $STS_ID, $result ) {
		$success = isset( $result['success'] ) && $result['success'] ? TRUE : FALSE;
		
		//setup success message
		if ( $success ) {

			$msg = $result['REG_ID'] ? sprintf( __('Registration status has been set to %s', 'event_espresso'), EEH_Template::pretty_status($STS_ID, FALSE, 'lower' ) ) :  sprintf( __('Registrations have been %s.', 'event_espresso'), EEH_Template::pretty_status($STS_ID, FALSE, 'lower' ) ) ;
			EE_Error::add_success( $msg );
		} else {
			EE_Error::add_error( __('Something went wrong, and the status was not changed', 'event_espresso' ), __FILE__, __LINE__, __FUNCTION__ );
		}

		$route = isset( $this->_req_data['return'] ) && $this->_req_data['return'] == 'view_registration' ? array( 'action' => 'view_registration', '_REG_ID' => $result['REG_ID'] ) : array( 'action' => 'default' );

		//was the send notification toggle checked?
		if ( !empty( $this->_req_data['txn_reg_status_change']['send_notifications'] ) ) {
			$this->_req_data['_REG_ID'] = $result['REG_ID'];
			$this->_process_resend_registration();
		}

		$this->_redirect_after_action( FALSE, '', '', $route, TRUE );
	}



	/**
	 * incoming reg status change from reg details page.
	 * @return void
	 */
	protected function _change_reg_status() {
		$success = FALSE;
		$this->_req_data['return'] = 'view_registration';
		if ( !isset( $this->_req_data['reg_status_id'] ) ) {
			$result['success'] = FALSE;
			$this->_reg_status_change_return( '', $result );
		}

		switch ( $this->_req_data['reg_status_id'] ) {
			case EEH_Template::pretty_status( EEM_Registration::status_id_approved, FALSE, 'sentence' ) :
				$this->approve_registration();
				break;
			case EEH_Template::pretty_status( EEM_Registration::status_id_pending_payment, FALSE, 'sentence' ) :
				$this->pending_registration();
				break;
			case EEH_Template::pretty_status( EEM_Registration::status_id_not_approved, FALSE, 'sentence' ) :
				$this->not_approve_registration();
				break;
			case EEH_Template::pretty_status( EEM_Registration::status_id_declined, FALSE, 'sentence' ) :
				$this->decline_registration();
				break;
			case EEH_Template::pretty_status( EEM_Registration::status_id_cancelled, FALSE, 'sentence' ) :
				$this->cancel_registration();
				break;
			default :
				$result['success'] = FALSE;
				$this->_reg_status_change_return( '', $result );
				break;
		}
	}



	/**
	 * 		approve_registration
	*		@access protected
	*		@return void
	*/
	protected function approve_registration() {
		$result = $this->_set_registration_status( FALSE, EEM_Registration::status_id_approved );
		$this->_reg_status_change_return( EEM_Registration::status_id_approved, $result );
	}



	/**
	 * 		decline_registration
	*		@access protected
	*		@return void
	*/
	protected function decline_registration() {
		$result = $this->_set_registration_status( FALSE, EEM_Registration::status_id_declined );
		$this->_reg_status_change_return( EEM_Registration::status_id_declined, $result );
	}




	/**
	 * 		cancel_registration
	*		@access protected
	*		@return void
	*/
	protected function cancel_registration() {
		$result = $this->_set_registration_status( FALSE, EEM_Registration::status_id_cancelled );
		$this->_reg_status_change_return( EEM_Registration::status_id_cancelled, $result );
	}





	/**
	 * 		not_approve_registration
	*		@access protected
	*		@return void
	*/
	protected function not_approve_registration() {
		$result = $this->_set_registration_status( FALSE, EEM_Registration::status_id_not_approved );
		$this->_reg_status_change_return( EEM_Registration::status_id_not_approved, $result );
	}



	/**
	 * 		decline_registration
	*		@access protected
	*		@return void
	*/
	protected function pending_registration() {
		$result = $this->_set_registration_status( FALSE, EEM_Registration::status_id_pending_payment );
		$this->_reg_status_change_return( EEM_Registration::status_id_pending_payment, $result );
	}




	/**
	 * 		generates HTML for the Registration main meta box
	*		@access public
	*		@return void
	*/
	public function _reg_details_meta_box() {
		$transaction = $this->_registration->transaction() ? $this->_registration->transaction() : EE_Transaction::new_instance();
		
		$this->_template_args['line_items'] = $transaction->get_many_related('Line_Item', array( array('LIN_type' => 'line-item' ) ) );

		

		$event = $this->_registration->get_first_related('Event');
		$this->_template_args['event'] = $event;
		$this->_template_args['event_name'] = $event->get('EVT_name');

		// process taxes
		if ( $transaction ) {
			//get all "tax" line items for this transaction and we'll use them for the tax display.
			$taxes = $transaction->get_many_related('Line_Item', array(array('LIN_type' => EEM_Line_Item::type_tax ) ) );
			$this->_template_args['taxes'] = !empty($taxes) ? $taxes : array();
		} else {
			$this->_template_args['taxes'] = array();
		}

		$this->_template_args['view_transaction_button'] = EEH_Template::get_button_or_link( EE_Admin_Page::add_query_args_and_nonce( array('action'=> 'view_transaction', 'TXN_ID' => $transaction->ID() ), TXN_ADMIN_URL ), __('View Transaction'), 'button secondary-button right ee-icon ee-icon-cash' );
		$this->_template_args['resend_registration_button'] = EEH_Template::get_button_or_link( EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'resend_registration', '_REG_ID'=>$this->_registration->ID(), 'redirect_to' => 'view_registration' ), REG_ADMIN_URL ), __('Resend Registration'), 'button secondary-button ee-icon ee-icon-email-send right' );

		$this->_template_args['grand_total'] = EEH_Template::format_currency( $transaction->total() );

		$this->_template_args['currency_sign'] = EE_Registry::instance()->CFG->currency->sign;
		$reg_status_class = 'status-' . $this->_registration->status_ID();
		$payment = $transaction->get_first_related('Payment');
		$reg_details = !empty($payment) ? maybe_unserialize( $payment->details() ) : NULL;

		//REG_ID will NOT be retrieved from $payment!
		$reg_details['registration_id'] = $this->_registration->get('REG_code');

		if ( !is_array($reg_details) || ( is_array($reg_details) && isset($reg_details['REDO_TXN']) && $reg_details['REDO_TXN'] ) ) {
			$reg_details = array();
			$reg_details['method'] = '';
			$reg_details['response_msg'] = '';
			$reg_details['invoice_number'] = '';
		} 


		$card_type = isset( $reg_details['card_type'] ) ? ' : ' . $reg_details['card_type'] : '';

		//if method is empty then we'll attempt getting it from the transaction extra meta
		$reg_details['method'] = !empty( $reg_details['method'] ) ? $reg_details['method'] : $transaction->get_extra_meta('gateway', TRUE);
		$reg_details['method'] = $reg_details['method'] == 'CC' ? 'Credit Card' . $card_type : $reg_details['method'];
		$this->_template_args['method']['value'] = $reg_details['method'];
		$this->_template_args['method']['label'] = __( 'Payment Method', 'event_espresso' );
		$this->_template_args['method']['class'] = 'regular-text';

		$reg_details['response_msg'] = isset($reg_details['response_msg'] ) ? $reg_details['response_msg'] : '';

		$reg_details['response_msg'] = '<span class="' . $reg_status_class . '">' . $reg_details['response_msg'] . '</span>';
		$this->_template_args['gateway_response_msg']['value'] = $reg_details['response_msg'];
		$this->_template_args['gateway_response_msg']['label'] = __( 'Gateway Response Message', 'event_espresso' );
		$this->_template_args['gateway_response_msg']['class'] = 'regular-text';

		if ( isset( $reg_details['registration_id'] )) {
			$this->_template_args['reg_details']['registration_id']['value'] = $reg_details['registration_id'];
			$this->_template_args['reg_details']['registration_id']['label'] = __( 'Registration ID', 'event_espresso' );
			$this->_template_args['reg_details']['registration_id']['class'] = 'regular-text';
		}

		if ( isset( $reg_details['invoice_number'] )) {
			$this->_template_args['reg_details']['invoice_number']['value'] = isset($reg_details['invoice_number']) ? $reg_details['invoice_number'] : '';
			$this->_template_args['reg_details']['invoice_number']['label'] = __( 'Invoice Number', 'event_espresso' );
			$this->_template_args['reg_details']['invoice_number']['class'] = 'regular-text';
		}

		$this->_template_args['reg_details']['registration_session']['value'] = $this->_registration->session_ID();
		$this->_template_args['reg_details']['registration_session']['label'] = __( 'Registration Session', 'event_espresso' );
		$this->_template_args['reg_details']['registration_session']['class'] = 'regular-text';

		$this->_template_args['reg_details']['ip_address']['value'] = $this->_session['ip_address'];
		$this->_template_args['reg_details']['ip_address']['label'] = __( 'Registration placed from IP', 'event_espresso' );
		$this->_template_args['reg_details']['ip_address']['class'] = 'regular-text';

		$this->_template_args['reg_details']['user_agent']['value'] = $this->_session['user_agent'];
		$this->_template_args['reg_details']['user_agent']['label'] = __( 'Registrant User Agent', 'event_espresso' );
		$this->_template_args['reg_details']['user_agent']['class'] = 'large-text';
		
		$this->_template_args['full_session'] = $this->_session;

		$template_path = REG_TEMPLATE_PATH . 'reg_admin_details_main_meta_box_reg_details.template.php';
		echo EEH_Template::display_template( $template_path, $this->_template_args, TRUE );
		
	}






	/**
	 * 		generates HTML for the Registration Questions meta box
	*		@access public
	*		@return void
	*/
	public function _reg_questions_meta_box() {				

		add_filter( 'FHEE_form_before_question_group_questions', array( $this, 'form_before_question_group' ), 10, 1 );
		add_filter( 'FHEE_form_after_question_group_questions', array( $this, 'form_after_question_group' ), 10, 1 );	
		add_filter( 'FHEE_form_field_label_html', array( $this, 'form_form_field_label_wrap' ), 10, 1 );
		add_filter( 'FHEE_form_field_input_html', array( $this, 'form_form_field_input__wrap' ), 10, 1 );
		
		$question_groups = EEM_Event::instance()->assemble_array_of_groups_questions_and_options( $this->_registration, $this->_registration->get('EVT_ID') );

		//printr( $question_groups, '$question_groups  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

		EE_Registry::instance()->load_helper( 'Form_Fields' );
		$this->_template_args['att_questions'] = EEH_Form_Fields::generate_question_groups_html( $question_groups );

		$this->_template_args['reg_questions_form_action'] = 'update_attendee_registration_form';
		$this->_template_args['REG_ID'] = $this->_registration->ID();

		$template_path = REG_TEMPLATE_PATH . 'reg_admin_details_main_meta_box_reg_questions.template.php';
		echo EEH_Template::display_template( $template_path, $this->_template_args, TRUE );

	}





	/**
	 * 		form_before_question_group
	 *
	 * 		@access 		public
	 * 		@param 		string 		$output
	 * 		@return 		string
	 */
	public function form_before_question_group( $output ) {
		return '
	<table class="form-table ee-width-100">
		<tbody>
			';		
	}




	/**
	 * 		form_after_question_group
	 *
	 * 		@access 		public
	 * 		@param 		string 		$output
	 * 		@return 		string
	 */
	public function form_after_question_group( $output ) {
		return  '
			<tr class="hide-if-no-js">
				<th> </th>		
				<td class="reg-admin-edit-attendee-question-td">
					<a class="reg-admin-edit-attendee-question-lnk" href="#" title="' . __( 'click to edit question', 'event_espresso' ) . '">
						<span class="reg-admin-edit-question-group-spn lt-grey-txt">' . __( 'edit the above question group', 'event_espresso' ) . '</span>
						<img width="16" height="16" alt="' . __( 'Edit Question', 'event_espresso' ) . '" src="'. EE_GLOBAL_ASSETS_URL .'/images/pencil-16x16.png">		
					</a>
				</td>
			</tr>
		</tbody>
	</table>
';		
	}




	/**
	 * 		form_form_field_label_wrap
	 *
	 * 		@access 		public
	 * 		@param 		string 		$label
	 * 		@return 		string
	 */
	public function form_form_field_label_wrap( $label ) {
		return '
			<tr>
				<th>
					' . $label  . '
				</th>';		
	}




	/**
	 * 		form_form_field_input__wrap
	 *
	 * 		@access 		public
	 * 		@param 		string 		$label
	 * 		@return 		string
	 */
	public function form_form_field_input__wrap( $input ) {
		return '
				<td class="reg-admin-attendee-questions-input-td disabled-input">
					' . $input . ' 
				</td>
			</tr>';		
	}




	/**
	 * 		generates HTML for the Registration main meta box
	*		@access protected
	*		@return void
	*/
	protected function _update_attendee_registration_form() {	
		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		$success = TRUE;
		$qstns = isset( $this->_req_data['qstn'] ) ? $this->_req_data['qstn'] : FALSE;
		$REG_ID = isset( $this->_req_data['REG_ID'] ) ? absint( $this->_req_data['REG_ID'] ) : FALSE;
		$qstns = apply_filters('FHEE_reg_admin_attendee_registration_form', $qstns);	
		$success = $this->_save_attendee_registration_form( $REG_ID, $qstns );
		$what = __('Registration Form', 'event_espresso');
		$route = $REG_ID ? array( 'action' => 'view_registration', '_REG_ID' => $REG_ID ) : array( 'action' => 'default' );
		$this->_redirect_after_action( $success, $what, __('updated', 'event_espresso'), $route );

	}





	/**
	 * 		_save_attendee_registration_form
	*		@access private
	*		@return void
	*/
	private function _save_attendee_registration_form( $REG_ID = FALSE, $qstns = FALSE ) {
		
		if ( ! $REG_ID || ! $qstns ) {	
			EE_Error::add_error( __('An error occurred. No registration ID and/or registration questions were received.', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
		}
		$success = TRUE;
		$registration = NULL;
		// grab values for fname, lname, and email from qstns
		$QST_fname 	= isset( $qstns['fname'] ) && ! empty( $qstns['fname'] ) ? array_shift( array_values( $qstns['fname'] )) : FALSE;
		$QST_lname 	= isset( $qstns['lname'] ) && ! empty( $qstns['lname'] ) ? array_shift( array_values( $qstns['lname'] )) : FALSE;
		$QST_email 	= isset( $qstns['email'] ) && ! empty( $qstns['email'] ) ? array_shift( array_values( $qstns['email'] )) : FALSE;
		// check if fname, lname, and email were set (and possibly changed)
		if ( $QST_fname && $QST_lname && $QST_email ) {		
			// load REG model
		    $REG = EE_Registry::instance()->load_model( 'Registration' ); 
			// get registration
			$registration = $REG->get_one_by_ID( $REG_ID );
			// and then get this registration's details
			$attendee = $registration->attendee();
			// check if the critical attendee details were changed
			if ( $QST_fname != $attendee->fname() || $QST_lname != $attendee->lname() || $QST_email != $attendee->email() ) {
				// we're either updating an already existing attendee or creating an entirely new attendee 
				//so grab the rest of the details
				$QST_address 		= isset( $qstns['address'] ) && ! empty( $qstns['address'] ) ? array_shift( array_values( $qstns['address'] )) : NULL;
				$QST_address2 	= isset( $qstns['address2'] ) && ! empty( $qstns['address2'] ) ? array_shift( array_values( $qstns['address2'] )) : NULL;
				$QST_city 				= isset( $qstns['city'] ) && ! empty( $qstns['city'] ) ? array_shift( array_values( $qstns['city'] )) : NULL;
				$QST_state 			= isset( $qstns['state'] ) && ! empty( $qstns['state'] ) ? array_shift( array_values( $qstns['state'] )) : NULL;
				$QST_country 		= isset( $qstns['country'] ) && ! empty( $qstns['country'] ) ? array_shift( array_values( $qstns['country'] )) : NULL;
				$QST_zip 				= isset( $qstns['zip'] ) && ! empty( $qstns['zip'] ) ? array_shift( array_values( $qstns['zip'] )) : NULL;
				$QST_phone 		= isset( $qstns['phone'] ) && ! empty( $qstns['phone'] ) ? array_shift( array_values( $qstns['phone'] )) : NULL;	
				// load attendee model
				$ATT = EE_Registry::instance()->load_model( 'Attendee' );
				// create array for query where statement
				$where_cols_n_values = array('ATT_fname' => $QST_fname, 'ATT_lname' => $QST_lname, 'ATT_email' => $QST_email);
				// do we already have an existing record for this "new" attendee ?
				if ( $existing_attendee = $ATT->find_existing_attendee( $where_cols_n_values )) {
					// found a match
					// copy details from existing attendee
					$attendee = $existing_attendee;
					// in case other details were updated
					$attendee->set( 'ATT_address', $QST_address );
					$attendee->set( 'ATT_address2', $QST_address2 );
					$attendee->set( 'ATT_city', $QST_city );
					// is state a string or a foreign key ?
					if ( ! is_numeric( $QST_state )) {
						$state = EEM_State::instance()->get_one( array( array('STA_name' => $QST_state ) ) );
						if ( !empty( $state ) )
							$QST_state = $state->ID();
					}
					$attendee->set( 'STA_ID', $QST_state );
					// is country a string or a foreign key ?
					if ( ! is_numeric( $QST_country )) {
						$country = EEM_Country::instance()->get_one( array( array('CNT_name' => $QST_country ) ) );
						if ( !empty( $country ) ) {
							$QST_country = $country->ID();
						}
					}
					$attendee->set( 'CNT_ISO', $QST_country );
					$attendee->set( 'ATT_zip', $QST_zip );
					$attendee->set( 'ATT_phone', $QST_phone );
					// save to the db
					$attendee->save();
				} else {
					// no existing attendee exists so create a new one
					$attendee = new EE_Attendee( array(
						'ATT_full_name' => $QST_fname . ' ' . $QST_lname,
						'ATT_fname' => $Qst_fname,
						'ATT_lname' => $QST_lname,
						'ATT_email' => $QST_email,
						'ATT_address' => $QST_address,
						'ATT_address2' => $QST_address2,
						'ATT_city' => $QST_city,
						'STA_ID' => $QST_state,
						'CNT_ISO' => $QST_country,
						'ATT_zip' => $QST_zip,
						'ATT_phone' => $QST_phone
						)
					);
					// save to db
					$new_id = $attendee->save();
					// grab and set the new ID
					if ( ! $new_id) {
						$success = FALSE;
						EE_Error::add_error( __('An error occurred. An ID for the new registration could not be retreived.', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
					}					
				}
				if ( $attendee->ID() ) {
//					echo '<h1>$attendee->ID()  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h1>';
//					var_dump( $attendee->ID() );
					// now update the registration with the "new" attendee ID
					$registration->set( 'ATT_ID', $attendee->ID() );
					$registration->save();
				}
			}
		}

//		echo '<h1>$attendee->ID()  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h1>';
//		var_dump( $attendee->ID() );
		// allow others to get in on this awesome fun   :D
		do_action( 'AHEE_save_attendee_registration_form', $registration, $qstns );
		// loop thru questions... FINALLY!!!

		foreach ( $qstns as $QST_ID => $qstn ) {
			//if $qstn isn't an array then it doesnt' already have an answer, so let's create the answer
			if ( !is_array($qstn) ) {
				$success = $this->_save_new_answer( $REG_ID, $QST_ID, $qstn);
				continue;
			}


			foreach ( $qstn as $ANS_ID => $ANS_value ) {
				//get answer 
				$query_params = array(
					0 => array(
						'ANS_ID' => $ANS_ID,
						'REG_ID' => $REG_ID,
						'QST_ID' => $QST_ID
						)
					);
				$answer = EEM_Answer::instance()->get_one($query_params);
				//this MAY be an array but NOT have an answer because its multi select.  If so then we need to create the answer
				if ( ! $answer instanceof EE_Answer ) {
					$success = $this->_save_new_answer( $REG_ID, $QST_ID, $qstn);
					continue 2;
				}

				$answer->set('ANS_value', $ANS_value);
				$success = $answer->save();
			}
		}

		return $success;
	}


	//TODO: try changing this to use the model directly... not indirectly through creating a default object...
	private function _save_new_answer( $REG_ID, $QST_ID, $ans ) {
		$set_values = array(
			'QST_ID' => $QST_ID,
			'REG_ID' => $REG_ID,
			'ANS_value' => $ans
			);
		$success = EEM_Answer::instance()->insert($set_values);
		return $success;
	}





	/**
	 * 		generates HTML for the Registration main meta box
	*		@access public
	*		@return void
	*/
	public function _reg_attendees_meta_box() {

		global $wpdb;

	    $REG = EEM_Registration::instance();
		//get all other registrations on this transaction, and cache 
		//the attendees for them so we don't have to run another query using force_join
		$registrations = $REG->get_all(array(
			array(
				'TXN_ID'=>$this->_registration->transaction_ID(),
				'REG_ID'=>array('!=',$this->_registration->ID())
			),
			'force_join'=>array('Attendee')));

		$this->_template_args['attendees'] = array();
		$this->_template_args['attendee_notice'] = '';
		EE_Registry::instance()->load_helper('Array');
		if ( empty( $registrations)  || ( is_array($registrations) &&  ! EEH_Array::get_one_item_from_array($registrations) ) ) {
			EE_Error::add_error( __('There are no records attached to this registration. Something may have gone wrong with the registration', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
			$this->_template_args['attendee_notice'] = EE_Error::get_notices();
		} else {

			$att_nmbr = 1;
			foreach ( $registrations as $registration ) {
				/* @var $registration EE_Registration */
				$attendee = $registration->attendee() ? $registration->attendee() : EEM_Attendee::instance()->create_default_object();
				$this->_template_args['attendees'][ $att_nmbr ]['fname'] = $attendee->fname();//( isset( $registration->ATT_fname ) & ! empty( $registration->ATT_fname ) ) ? $registration->ATT_fname : '';
				$this->_template_args['attendees'][ $att_nmbr ]['lname'] = $attendee->lname();//( isset( $registration->ATT_lname ) & ! empty( $registration->ATT_lname ) ) ? $registration->ATT_lname : '';
				$this->_template_args['attendees'][ $att_nmbr ]['email'] = $attendee->email();//( isset( $registration->ATT_email ) & ! empty( $registration->ATT_email ) ) ? $registration->ATT_email : '';
				$this->_template_args['attendees'][ $att_nmbr ]['final_price'] = $registration->price_paid();//( isset( $registration->REG_final_price ) & ! empty( $registration->REG_final_price ) ) ? $registration->REG_final_price : '';
				
				$this->_template_args['attendees'][ $att_nmbr ]['address'] = implode( ', ', $attendee->full_address_as_array() );
				
				$this->_template_args['attendees'][ $att_nmbr ]['att_link'] = self::add_query_args_and_nonce( array( 'action'=>'edit_attendee', 'post'=>$attendee->ID() ), REG_ADMIN_URL );
				
				$att_nmbr++;
			}

			//printr( $attendees, '$attendees  <br /><span style="font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span>', 'auto' );

			$this->_template_args['event_name'] = $this->_registration->event_obj()->name();
			$this->_template_args['currency_sign'] = EE_Registry::instance()->CFG->currency->sign;

	//			$this->_template_args['registration_form_url'] = add_query_arg( array( 'action' => 'edit_registration', 'process' => 'attendees'  ), REG_ADMIN_URL );
		}
		$template_path = REG_TEMPLATE_PATH . 'reg_admin_details_main_meta_box_attendees.template.php';
		echo EEH_Template::display_template( $template_path, $this->_template_args, TRUE );

	}






	/**
	 * 		generates HTML for the Edit Registration side meta box
	*		@access public
	*		@return void
	*/
	public function _reg_registrant_side_meta_box() {
		
		/*@var $attendee EE_Attendee */
		$attendee = $this->_registration->attendee() ? $this->_registration->attendee() : EEM_Attendee::instance()->create_default_object();
		
		$this->_template_args['ATT_ID'] = $attendee->ID();
		$this->_template_args['fname'] = $attendee->fname();//$this->_registration->ATT_fname;
		$this->_template_args['lname'] = $attendee->lname();//$this->_registration->ATT_lname;
		$this->_template_args['email'] = $attendee->email();//$this->_registration->ATT_email;
		$this->_template_args['address'] = $attendee->address();//$this->_registration->ATT_address;
		$this->_template_args['address2'] =  $attendee->address2() ? '<br />' . $attendee->address2() : '';
		$this->_template_args['city'] =  $attendee->city() ? '<br />' . $attendee->city(). ', ' : '';
		$this->_template_args['state'] =  $attendee->state_obj() ? '<br />' . $attendee->state_obj()->name() . ', ' : '';
		$this->_template_args['country'] =  $attendee->country_obj() ? $attendee->country_obj()->name() : '';
		$this->_template_args['zip'] =  $attendee->zip() ? '<br />' . $attendee->zip() : '';
		$this->_template_args['phone'] = $attendee->phone();

		$template_path = REG_TEMPLATE_PATH . 'reg_admin_details_side_meta_box_registrant.template.php';
		echo EEH_Template::display_template( $template_path, $this->_template_args, TRUE );
	}





	/**
	 * 		generates HTML for the Edit Registration side meta box
	*		@access public
	*		@return void
	*/
	public function _reg_billing_info_side_meta_box() {

		$billing_info = $this->_session['billing_info'];
		//echo printr( $billing_info, '$billing_info' );

		if ( is_array( $billing_info )) {

			$this->_template_args['free_event'] = FALSE;

			$this->_template_args['fname']['value'] = ! empty ( $billing_info['reg-page-billing-fname']['value'] ) ? $billing_info['reg-page-billing-fname']['value'] : '';
			$this->_template_args['fname']['label'] = ! empty ( $billing_info['reg-page-billing-fname']['label'] ) ? $billing_info['reg-page-billing-fname']['label'] :  __( 'First Name', 'event_espresso' );
			
			$this->_template_args['lname']['value'] = ! empty ( $billing_info['reg-page-billing-lname']['value'] ) ? $billing_info['reg-page-billing-lname']['value'] : '';
			$this->_template_args['lname']['label'] = ! empty ( $billing_info['reg-page-billing-lname']['label'] ) ? $billing_info['reg-page-billing-lname']['label'] :  __( 'Last Name', 'event_espresso' );
			
			$this->_template_args['email']['value'] = ! empty ( $billing_info['reg-page-billing-email']['value'] ) ? $billing_info['reg-page-billing-email']['value'] : '';
			$this->_template_args['email']['label'] = __( 'Email', 'event_espresso' );
			
			$this->_template_args['address']['value'] = ! empty ( $billing_info['reg-page-billing-address']['value'] ) ? $billing_info['reg-page-billing-address']['value'] : '';
			$this->_template_args['address']['label'] = ! empty ( $billing_info['reg-page-billing-address']['label'] ) ? $billing_info['reg-page-billing-address']['label'] :  __( 'Address', 'event_espresso' );
			
			$this->_template_args['city']['value'] = ! empty ( $billing_info['reg-page-billing-city']['value'] ) ? $billing_info['reg-page-billing-city']['value'] : '';
			$this->_template_args['city']['label'] = ! empty ( $billing_info['reg-page-billing-city']['label'] ) ? $billing_info['reg-page-billing-city']['label'] :  __( 'City', 'event_espresso' );
			
			$this->_template_args['state']['value'] = ! empty ( $billing_info['reg-page-billing-state']['value'] ) ? $billing_info['reg-page-billing-state']['value'] : '';
			$this->_template_args['state']['label'] = ! empty ( $billing_info['reg-page-billing-state']['label'] ) ? $billing_info['reg-page-billing-state']['label'] :  __( 'State', 'event_espresso' );
			if ( $state_obj = EEM_State::instance()->get_one_by_ID( $this->_template_args['state']['value'] )) {			
				$this->_template_args['state']['value'] = $state_obj instanceof EE_State ? $state_obj->name() : $billing_info['reg-page-billing-state']['value'];
			}
			
			$this->_template_args['country']['value'] = ! empty ( $billing_info['reg-page-billing-country']['value'] ) ? $billing_info['reg-page-billing-country']['value'] : '';
			$this->_template_args['country']['label'] = ! empty ( $billing_info['reg-page-billing-country']['label'] ) ? $billing_info['reg-page-billing-country']['label'] : __( 'Country', 'event_espresso' );
			if ( $country_obj = EEM_Country::instance()->get_one_by_ID( $this->_template_args['country']['value'] )) {			
				$this->_template_args['country']['value'] = $country_obj instanceof EE_Country ? $country_obj->name() : $billing_info['reg-page-billing-country']['value'];
			}
			
			$this->_template_args['zip']['value'] = ! empty ( $billing_info['reg-page-billing-zip']['value'] ) ? $billing_info['reg-page-billing-zip']['value'] : '';
			$this->_template_args['zip']['label'] = ! empty ( $billing_info['reg-page-billing-zip']['label'] ) ? $billing_info['reg-page-billing-zip']['label'] :  __( 'Zip Code', 'event_espresso' );

			if ( isset( $billing_info['reg-page-billing-card-nmbr'] )) {

				$this->_template_args['credit_card_info'] = TRUE;

				$ccard = $billing_info['reg-page-billing-card-nmbr']['value'];
				$this->_template_args['card_nmbr']['value'] = substr( $ccard, 0, 4 ) . ' XXXX XXXX ' . substr( $ccard, -4 );
				$this->_template_args['card_nmbr']['label'] = __('Credit Card', 'event_espresso');

				$this->_template_args['card_exp_date']['value'] = $billing_info['reg-page-billing-card-exp-date-mnth']['value'] . ' / ' . $billing_info['reg-page-billing-card-exp-date-year']['value'];
				$this->_template_args['card_exp_date']['label'] = __('mm / yy', 'event_espresso');

				$this->_template_args['card_ccv_code']['value'] = $billing_info['reg-page-billing-card-ccv-code']['value'];
				$this->_template_args['card_ccv_code']['label'] = $billing_info['reg-page-billing-card-ccv-code']['label'];

			} else {
				$this->_template_args['credit_card_info'] = FALSE;
			}

		} else {

			$this->_template_args['free_event'] = $billing_info;

		}


		$template_path = REG_TEMPLATE_PATH . 'reg_admin_details_side_meta_box_box_billing_info.template.php';
		echo EEH_Template::display_template( $template_path, $this->_template_args, TRUE );
	}




	/**
	 * trash or restore registrations
	 * @param  boolean $trash whether to archive or restore
	 * @access protected
	 * @return void         
	 */
	protected function _trash_or_restore_registrations( $trash = TRUE ) {
		$REGM = EEM_Registration::instance();

		$success = 1;

		$tickets = array();
		$dtts = array();

		//Checkboxes
		if (!empty($this->_req_data['_REG_ID']) && is_array($this->_req_data['_REG_ID'])) {
			// if array has more than one element than success message should be plural
			$success = count( $this->_req_data['_REG_ID'] ) > 1 ? 2 : 1;
			// cycle thru checkboxes 
			while (list( $ind, $REG_ID ) = each($this->_req_data['_REG_ID'])) {

				$REG = $REGM->get_one_by_ID($REG_ID);
				$ticket = $REG->get_first_related('Ticket');
				$tickets[$ticket->ID()] = $ticket;
				$dtt = $ticket->get_many_related('Datetime');
				$dtts = array_merge($dtts, $dtt);

				$updated = $trash ? $REG->delete() : $REG->restore();
				if ( !$updated ) {
					$success = 0;
				}/**/
			}
			
		} else {
			// grab single id and delete
			$REG_ID = absint($this->_req_data['_REG_ID']);
			$REG = $REGM->get_one_by_ID($REG_ID);
			$ticket = $REG->get_first_related('Ticket');
			$tickets[$ticket->ID()] = $ticket;
			$dtts = $ticket->get_many_related('Datetime');
			$updated = $trash ? $REG->delete() : $REG->restore();
			if ( ! $updated ) {
				$success = 0;
			}
			
		}

		//now let's update counts
		EEM_Ticket::instance()->update_tickets_sold($tickets);
		EEM_Datetime::instance()->update_sold($dtts);

		$what = $success > 1 ? __( 'Registrations', 'event_espresso' ) : __( 'Registration', 'event_espresso' );
		$action_desc = $trash ? __( 'moved to the trash', 'event_espresso' ) : __( 'restored', 'event_espresso' );
		$this->_redirect_after_action( $success, $what, $action_desc, array( 'action' => 'default' ) );
	}





	/**
	 * This is used to permanently delete registrations.  Note, this will handle not only deleting permanently the registration but also.
	 *
	 * 1. Deleting permanently any related Attendees IF that attendee has no other registrations attached to it.
	 * 2. Deleting permanently the related transaction, but ONLY if all related registrations to the transaction are ALSO trashed.
	 * 3. Deleting permanently any related Line items but only if the above conditions are met.
	 * 4. Removing relationships between all tickets and the related registrations
	 * 5. Deleting permanently any related Answers (and the answers for other related registrations that were deleted.)
	 * 6. Deleting permanently any related Checkins.
	 * @return void
	 */
	protected function _delete_registrations() {
		$REG_MDL = EEM_Registration::instance();

		$success = 1;

		//Checkboxes
		if (!empty($this->_req_data['_REG_ID']) && is_array($this->_req_data['_REG_ID'])) {
			// if array has more than one element than success message should be plural
			$success = count( $this->_req_data['_REG_ID'] ) > 1 ? 2 : 1;
			// cycle thru checkboxes 
			while (list( $ind, $REG_ID ) = each($this->_req_data['_REG_ID'])) {
				$REG = $REG_MDL->get_one_by_ID($REG_ID);
				$deleted = $this->_delete_registration($REG);
				if ( !$deleted ) {
					$success = 0;
				}
			}
			
		} else {
			// grab single id and delete
			$REG_ID = $this->_req_data['_REG_ID'];
			$REG = $REG_MDL->get_one_by_ID($REG_ID);
			$deleted = $this->_delete_registration($REG);
			if ( ! $deleted ) {
				$success = 0;
			}
			
		}

		$what = $success > 1 ? __( 'Registrations', 'event_espresso' ) : __( 'Registration', 'event_espresso' );
		$action_desc = __( 'permanently deleted.', 'event_espresso' );
		$this->_redirect_after_action( $success, $what, $action_desc, array( 'action' => 'default' ), TRUE );
	}




	
	/**
	 * handles the permanent deletion of a registration.  See comments with _delete_registrations() for details on what models get affected.
	 * @param  EE_Registration $REG registration to be deleted permenantly
	 * @return boolean              true = successful deletion, false = fail.
	 */
	protected function _delete_registration( EE_Registration $REG ) {
		//first we start with the transaction... ultimately, we WILL not delete permanently if there are any related registrations on the transaction that are NOT trashed.
		$TXN = $REG->get_first_related('Transaction');
		$REGS = $TXN->get_many_related('Registration');

		$all_trashed = TRUE;
		foreach ( $REGS as $registration ) {
			if ( ! $registration->get('REG_deleted') )
				$all_trashed = FALSE;
		}

		if ( ! $all_trashed ) {
			EE_Error::add_error( __('Unable to permanently delete this registration. Before this registration can be permanently deleted, all registrations made in the same transaction must be trashed as well.  These registrations will be permanently deleted in the same action.', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
			return false;
		}

		//k made it here so that means we can delete all the related transactions and their answers (but let's do them separately from THIS one).
		foreach ( $REGS as $registration ) {

			//delete related answers
			$registration->delete_related_permanently('Answer');

			//delete Attendee (if this registration is the only one on the attendee ).
			$attendee = $registration->get_first_related('Attendee');
			if ( $attendee instanceof EE_Attendee && $attendee->count_related('Registration') > 1 )
				$registration->_remove_relation_to($attendee, 'Attendee');
			else
				$registration->delete_related_permanently('Attendee');

			//now remove relationships to tickets on this registration.
			$registration->_remove_relations('Ticket');

			//now delete permanently the checkins related to this registration.
			$registration->delete_related_permanently('Checkin');

			if ( $registration->ID() === $REG->ID() )
				continue; //we don't want to delete permanently the existing registration just yet.

			//remove relation to transaction for these registrations if NOT the existing registrations
			$registration->_remove_relations('Transaction');

			//now delete this registration permanently
			$registration->delete_permanently();
		}

		//now all related registrations on the transaction are handled.  So let's just handle this registration itself (the transaction and line items should be all that's left).
		//delete the line items related to the transaction for this registration.
		$TXN->delete_related_permanently('Line_Item');

		//we need to remove all the relationships on the transaction
		$TXN->delete_related_permanently('Payment');
		$TXN->_remove_relations('Promotion_Object');
		$TXN->delete_related_permanently('Extra_Meta');

		//now we can delete this REG permanently (and the transaction of course)
		$REG->delete_related_permanently('Transaction');
		return $REG->delete_permanently();
	}









	/**
	 * 		generates HTML for the Register New Attendee Admin page
	*		@access private
	*		@return void
	*/
	public function new_registration() {
		
		if ( ! $this->_set_reg_event() ) {
			throw new EE_Error(__('Unable to continue with registering because there is no Event ID in the request', 'event_espresso') );
		}

		// gotta start with a clean slate if we're not coming here via ajax
		if ( !defined('DOING_AJAX' ) && ( !isset($this->_req_data['processing_registration']) || isset( $this->_req_data['step_error'] ) ) )
			EE_Registry::instance()->SSN->clear_session( __CLASS__, __FUNCTION__ );
		
		$this->_template_args['event_name'] = '' ;
		// event name
		if ( $this->_reg_event ) {
			$this->_template_args['event_name'] = $this->_reg_event->name();
			$edit_event_url = self::add_query_args_and_nonce( array( 'action'=>'edit', 'post'=>$this->_reg_event->ID() ), EVENTS_ADMIN_URL );	
			$edit_event_lnk = '<a href="'.$edit_event_url.'" title="' . __( 'Edit ', 'event_espresso' ) . $this->_reg_event->name() . '">' . __( 'Edit Event', 'event_espresso' ) . '</a>';	
			$this->_template_args['event_name'] .= ' <span class="admin-page-header-edit-lnk not-bold">' . $edit_event_lnk . '</span>' ;
		}

		$this->_template_args['step_content'] = $this->_get_registration_step_content();

		if ( defined('DOING_AJAX' ) )
			$this->_return_json();


		// grab header
		$template_path = REG_TEMPLATE_PATH . 'reg_admin_register_new_attendee.template.php';
		$this->_template_args['admin_page_content'] = EEH_Template::display_template( $template_path, $this->_template_args, TRUE );

		//$this->_set_publish_post_box_vars( NULL, FALSE, FALSE, NULL, FALSE );
		// the details template wrapper
		$this->display_admin_page_with_sidebar();	
	}




	/**
	 * This returns the content for a registration step
	 *
	 * @access protected
	 * @return string html
	 */
	protected function _get_registration_step_content() {
		
		$template_path = REG_TEMPLATE_PATH . 'reg_admin_register_new_attendee_step_content.template.php';
		$template_args = array(
			'title' => '',
			'content' => '',
			'step_button_text' => ''
			);

		//to indicate we're processing a new registration
		$hidden_fields = array(
			'processing_registration' => array(
				'type' => 'hidden',
				'value' => 1
				),
			'event_id' => array(
				'type' => 'hidden',
				'value' => $this->_reg_event->ID()
				)
			);
		
		//if the cart is empty then we know we're at step one so we'll display ticket selector
		$cart = EE_Registry::instance()->SSN->get_session_data('cart');
		$step = empty( $cart ) ? 'ticket' : 'questions';

		switch ( $step ) {
			case 'ticket' :
				$template_args['title'] = __('Step One: Select the Ticket for this registration', 'event_espresso');
				$template_args['content'] = EED_Ticket_Selector::display_ticket_selector( $this->_reg_event, TRUE );
				$template_args['step_button_text'] = __('Continue', 'event_espresso');
				$template_args['show_notification_toggle'] = FALSE;
				break;
			case 'questions' :
				$template_args['title'] = __('Step Two: Add Registrant Details for this Registration', 'event_espresso');
				$template_args['content'] = $this->_get_new_registration_questions();
				$template_args['step_button_text'] = __('Save Registration and Continue to Details', 'event_espresso');
				$template_args['show_notification_toggle'] = TRUE;
				break;
		}

		$this->_set_add_edit_form_tags( 'process_registration_step', $hidden_fields ); //we come back to the process_registration_step route.

		return EEH_Template::display_template( $template_path, $template_args, TRUE );
	}




	/**
	 * This returns the questions form for a new registration
	 *
	 * @access protected
	 * @return string html
	 */
	protected function _get_new_registration_questions() {
		//in theory we should be able to run EED_SPCO at this point because the cart should have been setup properly by the first _process_registration_step run.
		$SPCO = EED_Single_Page_Checkout::instance();
		return $SPCO->registration_checkout_for_admin();
	}





	/**
	 * 		set_reg_event
	*		@access private
	*		@return void
	*/
	private function _set_reg_event() {
		if ( is_object( $this->_reg_event )) {
			return TRUE;
		}
		$EVT_ID = ( ! empty( $this->_req_data['event_id'] )) ? absint( $this->_req_data['event_id'] ) : FALSE;
		if ( ! $EVT_ID ) {
			return FALSE;
		}

		$this->_reg_event = EEM_Event::instance()->get_one_by_ID($EVT_ID);
		return TRUE;
	}






	/**
	 * The purpose of this method is to simply setup the SPCO instance on page load for registering a new attendee via the admin.
	 *
	 * @access protected
	 * @return void
	 */
	protected function _setup_SPCO_for_admin() {
		$SPCO = EED_Single_Page_Checkout::instance();
		$SPCO->set_definitions();

		//filter in our own array
		
	}




	/**
	 * 		form_after_question_group
	 *
	 * 		@access 		public
	 * 		@param 		string 		$output
	 * 		@return 		string
	 */
	public function form_after_question_group_new_reg( $output ) {
		return  '
		</tbody>
	</table>
';		
	}






	/**
	 * 		form_form_field_input__wrap
	 *
	 * 		@access 		public
	 * 		@param 		string 		$label
	 * 		@return 		string
	 */
	public function form_form_field_input_wrap_new_reg( $input ) {
		return '
				<td class="reg-admin-new-attendee-input-td">
					' . $input . ' 
				</td>
			</tr>';		
	}





	/**
	 * 		_process_registration_step
	 *
	 * 		@access 		public
	 * 		@return 		string
	 */
	public function _process_registration_step() {
		$this->_set_reg_event();
		//what step are we on?
		$cart = EE_Registry::instance()->SSN->get_session_data( 'cart' );
		$step = empty( $cart ) ? 'ticket' : 'questions';

		//if doing ajax then we need to verify the nonce
		if ( 'DOING_AJAX' ) {
			$nonce = isset( $this->_req_data[$this->_req_nonce] ) ? sanitize_text_field( $this->_req_data[$this->_req_nonce] ) : '';
			$this->_verify_nonce( $nonce, $this->_req_nonce );
		}

		switch ( $step ) {
			case 'ticket' :
				//process ticket selection
				$success = EED_Ticket_Selector::process_tickets_selection_from_admin();
				if ( $success ) {
					EE_Error::add_success( __('Tickets Selected. Now complete the registration.'), 'event_espresso');
				} else {
					$query_args['step_error'] = $this->_req_data['step_error'] = TRUE;
				}
				if ( defined('DOING_AJAX') ) {
					$this->new_registration(); //display next step
				} else {
					$query_args['action'] = 'new_registration';
					$query_args['processing_registration'] = true;
					$query_args['event_id'] = $this->_reg_event->ID();
					$this->_redirect_after_action( FALSE, '', '', $query_args, TRUE );	
				}
				break;
			case 'questions' :
				//process registration
				$TXN_ID = EED_Single_Page_Checkout::instance()->process_registration_from_admin();
				if ( !$TXN_ID ) {
					$query_args = array(
						'action' => 'new_registration',
						'processing_registration' => true,
						'event_id' => $this->_reg_event->ID()
						);
					if ( defined('DOING_AJAX' ) ) {
						$this->new_registration(); //display registration form again because there are errors (maybe validation?)
					} else {
						$this->_redirect_after_action( FALSE, '', '', $query_args, TRUE );	
					}
				}
				$query_args = array(
					'action' => 'view_transaction',
					'TXN_ID' => $TXN_ID,
					'page' => 'espresso_transactions'
					);
				EE_Error::add_success( __('Registration Created.  Please review the transaction and add any payments as necessary', 'event_espresso') );
				$this->_redirect_after_action( FALSE, '', '', $query_args, TRUE );
				break;
			}

			//what are you looking here for?  Should be nothing to do at this point.	
	}




	function sanitize_text_field_for_array_walk( &$item, &$key ) {
	   $item = sanitize_text_field( $item );
	}







	/**
	 * 		generates HTML for the Attendee Contact List
	*		@access protected
	*		@return void
	*/
	protected function _attendee_contact_list_table() {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		$this->_search_btn_label = __('Contacts', 'event_espresso');
		$this->display_admin_list_table_page_with_no_sidebar();
	}





	/**
	 * 		get_attendees
	 * 		@param bool $count whether to return count or data.
	*		@access public
	*		@return array
	*/
	public function get_attendees( $per_page, $count = FALSE, $trash = FALSE ) {  

		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		// start with an empty array
		$attendees = array();
		
		require_once( REG_ADMIN . 'EE_Attendee_Contact_List_Table.class.php' );
		$ATT_MDL = EEM_Attendee::instance();
		
		$this->_req_data['orderby'] = ! empty($this->_req_data['orderby']) ? $this->_req_data['orderby'] : '';
		
		switch ($this->_req_data['orderby']) {
			case 'ATT_ID':
				$orderby = 'ATT_ID';
				break;
			case 'ATT_fname':
				$orderby = 'ATT_fname';
				break;
			case 'ATT_email':
				$orderby = 'ATT_email';
				break;
			case 'ATT_city':
				$orderby = 'ATT_city';
				break;
			case 'STA_ID':
				$orderby = 'STA_ID';
				break;
			case 'CNT_ID':
				$orderby = 'CNT_ID';
				break;
			default:
				$orderby = 'ATT_lname';
		}
		
		$sort = ( isset( $this->_req_data['order'] ) && ! empty( $this->_req_data['order'] )) ? $this->_req_data['order'] : 'ASC';

		$current_page = isset( $this->_req_data['paged'] ) && !empty( $this->_req_data['paged'] ) ? $this->_req_data['paged'] : 1;
		$per_page = isset( $per_page ) && !empty( $per_page ) ? $per_page : 10;
		$per_page = isset( $this->_req_data['perpage'] ) && !empty( $this->_req_data['perpage'] ) ? $this->_req_data['perpage'] : $per_page;

		$_where = array();

		if ( isset( $this->_req_data['s'] ) ) {
			$sstr = '%' . $this->_req_data['s'] . '%';
			$_where['OR'] = array(
				'Registration.Event.EVT_name' => array( 'LIKE', $sstr),
				'Registration.Event.EVT_desc' => array( 'LIKE', $sstr ),
				'Registration.Event.EVT_short_desc' => array( 'LIKE' , $sstr ),
				'ATT_fname' => array( 'LIKE', $sstr ),
				'ATT_lname' => array( 'LIKE', $sstr ),
				'ATT_short_bio' => array( 'LIKE', $sstr ),
				'ATT_email' => array('LIKE', $sstr ),
				'ATT_address' => array( 'LIKE', $sstr ),
				'ATT_address2' => array( 'LIKE', $sstr ),
				'ATT_city' => array( 'LIKE', $sstr ),
				'ATT_comments' => array( 'LIKE', $sstr ),
				'ATT_notes' => array( 'LIKE', $sstr ),
				'Registration.REG_final_price' => array( 'LIKE', $sstr ),
				'Registration.REG_code' => array( 'LIKE', $sstr ),
				'Registration.REG_count' => array( 'LIKE' , $sstr ),
				'Registration.REG_group_size' => array( 'LIKE' , $sstr )		
				);
		}


		$offset = ($current_page-1)*$per_page;
		$limit = $count ? NULL : array( $offset, $per_page );

		if ( $trash )
			$all_attendees = $count ? $ATT_MDL->count_deleted( array($_where,'order_by'=>array($orderby=>$sort), 'limit'=>$limit)): $ATT_MDL->get_all_deleted( array($_where,'order_by'=>array($orderby=>$sort), 'limit'=>$limit));
		else
			$all_attendees = $count ? $ATT_MDL->count( array($_where, 'order_by'=>array($orderby=>$sort),'limit'=>$limit)) : $ATT_MDL->get_all( array($_where, 'order_by'=>array($orderby=>$sort), 'limit'=>$limit) );

		return $all_attendees;
	}




	/**
	 * This is just taking care of resending the registration confirmation
	 *
	 * @access protected
	 * @return void
	 */
	protected function _resend_registration() {
		$success = $this->_process_resend_registration();
		$query_args = isset($this->_req_data['redirect_to'] ) ? array('action' => $this->_req_data['redirect_to'], '_REG_ID' => $this->_req_data['_REG_ID'] ) : array(
			'action' => 'default'
		);
		$this->_redirect_after_action(FALSE, '', '', $query_args, TRUE );
	}



	
	
	
	public function _registrations_report(){
		$new_request_args = array(
			'export' => 'report',
			'action' => 'registrations_report_for_event',
			'EVT_ID' => $this->_req_data['EVT_ID'],
		);
		$this->_req_data = array_merge($this->_req_data, $new_request_args);

		if (file_exists(EE_CLASSES . 'EE_Export.class.php')) {
			require_once(EE_CLASSES . 'EE_Export.class.php');
			$EE_Export = EE_Export::instance($this->_req_data);
			$EE_Export->export();
		}
	}
	public function _contact_list_export(){

		if (file_exists(EE_CLASSES . 'EE_Export.class.php')) {
			require_once(EE_CLASSES . 'EE_Export.class.php');
			$EE_Export = EE_Export::instance($this->_req_data);
			$EE_Export->export_attendees();
		}
	}






	/***************************************		ATTENDEE DETAILS 		***************************************/

	//related to cpt routes
	protected function _insert_update_cpt_item($post_id, $post) {
		$success = true;
		$attendee = EEM_Attendee::instance()->get_one_by_ID( $post_id );
		//for attendee updates
		if ( $post->post_type = 'espresso_attendees' && !empty( $attendee ) ) {
			//note we should only be UPDATING attendees at this point.
			$updated_fields = array(
				'ATT_fname' => $this->_req_data['ATT_fname'],
				'ATT_lname' => $this->_req_data['ATT_lname'],
				'ATT_full_name'=> $this->_req_data['ATT_fname'] . ' ' . $this->_req_data['ATT_lname'],
				'ATT_address' => isset($this->_req_data['ATT_address']) ? $this->_req_data['ATT_address'] : '',
				'ATT_address2' => isset($this->_req_data['ATT_address2']) ? $this->_req_data['ATT_address2'] : '',
				'ATT_city' => isset( $this->_req_data['ATT_city'] ) ? $this->_req_data['ATT_city'] : '',
				'STA_ID' => isset( $this->_req_data['STA_ID'] ) ? $this->_req_data['STA_ID'] : '',
				'CNT_ISO' => isset( $this->_req_data['CNT_ISO'] ) ? $this->_req_data['CNT_ISO'] : '',
				'ATT_zip' => isset( $this->_req_data['ATT_zip'] ) ? $this->_req_data['ATT_zip'] : '',
				'ATT_email' => isset( $this->_req_data['ATT_email'] ) ? $this->_req_data['ATT_email'] : '',
				'ATT_phone' => isset( $this->_req_data['ATT_phone'] ) ? $this->_req_data['ATT_phone'] : '',
				'ATT_comments' => isset( $this->_req_data['ATT_comments'] ) ? $this->_req_data['ATT_comments'] : '',
				'ATT_notes' => isset( $this->_req_data['ATT_notes'] ) ? $this->_req_data['ATT_notes'] : '',
				);
			foreach ( $updated_fields as $field => $value ) {
				$attendee->set($field, $value);
			}

			$success = $attendee->save();

			$attendee_update_callbacks = apply_filters( 'FHEE__Registrations_Admin_Page__insert_update_cpt_item__attendee_update', array() );
			foreach ( $attendee_update_callbacks as $a_callback ) {
				if ( FALSE === call_user_func_array( $a_callback, array($attendee, $this->_req_data ) ) ) {
					throw new EE_Error( sprintf( __('The %s callback given for the "FHEE__Registrations_Admin_Page__insert_update_cpt_item__attendee_update" filter is not a valid callback.  Please check the spelling.', 'event_espresso'), $a_callback ) );
				}
			}
		}

		if ( $success === FALSE )
			EE_Error::add_error(__('Something went wrong with updating the meta table data for the registration.', 'event_espresso'));

	}
	



	public function trash_cpt_item($post_id) {}
	public function delete_cpt_item($post_id) {}
	public function restore_cpt_item($post_id) {}
	protected function _restore_cpt_item($post_id, $revision_id) {}


	public function attendee_editor_metaboxes() {

		$this->verify_cpt_object();

		remove_meta_box('postexcerpt', __('Excerpt'), 'post_excerpt_meta_box', $this->_cpt_routes[$this->_req_action], 'normal', 'core');
		remove_meta_box('commentstatusdiv', $this->_cpt_routes[$this->_req_action], 'normal', 'core');
		add_meta_box('postexcerpt', __('Short Biography', 'event_espresso'), 'post_excerpt_meta_box', $this->_cpt_routes[$this->_req_action], 'normal' );
		add_meta_box('commentsdiv', __('Notes on the Contact', 'event_espresso'), 'post_comment_meta_box', $this->_cpt_routes[$this->_req_action], 'normal', 'core');
		add_meta_box('attendee_contact_info', __('Contact Info', 'event_espresso'), array( $this, 'attendee_contact_info'), $this->_cpt_routes[$this->_req_action], 'side', 'core' );
		add_meta_box('attendee_details_address', __('Address Details', 'event_espresso'), array($this, 'attendee_address_details'), $this->_cpt_routes[$this->_req_action], 'normal', 'core' );
		add_meta_box('attendee_registrations', __('Registrations for this Contact', 'event_espresso'), array( $this, 'attendee_registrations_meta_box'), $this->_cpt_routes[$this->_req_action], 'normal', 'high');
	}

	
	/**
	 * Metabox for attendee contact info
	 * @param  WP_Post $post wp post object
	 * @return string        attendee contact info ( and form )
	 */
	public function attendee_contact_info( $post ) {
		//get attendee object ( should already have it )
		$this->_template_args['attendee'] = $this->_cpt_model_obj;
		$template = REG_TEMPLATE_PATH . 'attendee_contact_info_metabox_content.template.php';
		EEH_Template::display_template($template, $this->_template_args);
	}



	/**
	 * Metabox for attendee details
	 * @param  WP_Post $post wp post object
	 * @return string        attendee address detials (and form)
	 */
	public function attendee_address_details($post) {
		//get attendee object (should already have it)
		$this->_template_args['attendee'] = $this->_cpt_model_obj;
		$this->_template_args['state_html'] = EEH_Form_Fields::generate_form_input(
				new EE_Question_Form_Input(
				EE_Question::new_instance( array(
					'QST_ID' => 0,
					'QST_display_text' => __('State/Province', 'event_espresso'),
					'QST_system' => 'admin-state'
					)),
				EE_Answer::new_instance( array(
					'ANS_ID' => 0,
					'ANS_value' => $this->_cpt_model_obj->state_ID()
					)),
				array(
					'input_id' => 'STA_ID',
					'input_name' => 'STA_ID',
					'input_prefix' => '',
					'append_qstn_id' => FALSE 
					)
			));
		$this->_template_args['country_html'] = EEH_Form_Fields::generate_form_input(
				new EE_Question_Form_Input(
				EE_Question::new_instance( array(
					'QST_ID' => 0,
					'QST_display_text' => __('Country', 'event_espresso'),
					'QST_system' => 'admin-country'
					)),
				EE_Answer::new_instance( array(
					'ANS_ID' => 0,
					'ANS_value' => $this->_cpt_model_obj->country_ID()
					)),
				array(
					'input_id' => 'CNT_ISO',
					'input_name' => 'CNT_ISO',
					'input_prefix' => '',
					'append_qstn_id' => FALSE 
					)
				));
		$template = REG_TEMPLATE_PATH . 'attendee_address_details_metabox_content.template.php';
		EEH_Template::display_template($template, $this->_template_args );

	}


	/**
	 * 		_attendee_details
	*		@access protected
	*		@return void
	*/
	public function attendee_registrations_meta_box( $post ) {		
	
		$this->_template_args['attendee'] = $this->_cpt_model_obj;
		$this->_template_args['registrations'] = $this->_cpt_model_obj->get_many_related('Registration');
		$template = REG_TEMPLATE_PATH . 'attendee_registrations_main_meta_box.template.php';
		EEH_Template::display_template($template, $this->_template_args);
		
	}




	/**
	 * add in the form fields for the attendee edit
	 * @param  WP_Post $post wp post object
	 * @return string        html for new form.
	 */
	public function after_title_form_fields($post) {
		if ( $post->post_type == 'espresso_attendees' ) {
			$template = REG_TEMPLATE_PATH . 'attendee_details_after_title_form_fields.template.php';
			$template_args['attendee'] = $this->_cpt_model_obj;
			EEH_Template::display_template($template, $template_args);
		}
	}

 




	/**
	 * 		_trash_or_restore_attendee
	*		@param boolean 		$trash - whether to move item to trash (TRUE) or restore it (FALSE)
	*		@access protected
	*		@return void
	*/
	protected function _trash_or_restore_attendees( $trash = TRUE ) {
	
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );

		$ATT_MDL = EEM_Attendee::instance();
	
		$success = 1;
		//Checkboxes
		if (!empty($this->_req_data['checkbox']) && is_array($this->_req_data['checkbox'])) {
			// if array has more than one element than success message should be plural
			$success = count( $this->_req_data['checkbox'] ) > 1 ? 2 : 1;
			// cycle thru checkboxes 
			while (list( $ATT_ID, $value ) = each($this->_req_data['checkbox'])) {
				$updated = $trash ? $ATT_MDL->delete_by_ID($ATT_ID) : $ATT_MDL->restore_by_ID($ATT_ID);
				if ( !$updated ) {
					$success = 0;
				}
			}
			
		} else {
			// grab single id and delete
			$ATT_ID = absint($this->_req_data['ATT_ID']);
			$updated = $trash ? $ATT_MDL->delete_by_ID($ATT_ID) : $ATT_MDL->restore_by_ID($ATT_ID);
			if ( ! $updated ) {
				$success = 0;
			}
			
		}

		$what = $success > 1 ? __( 'Contacts', 'event_espresso' ) : __( 'Contact', 'event_espresso' );
		$action_desc = $trash ? __( 'moved to the trash', 'event_espresso' ) : __( 'restored', 'event_espresso' );
		$this->_redirect_after_action( $success, $what, $action_desc, array( 'action' => 'contact_list' ) );
		
	}
  
}



// end of file:  includes/core/admin/transactions/Registrations_Admin_Page.core.php
