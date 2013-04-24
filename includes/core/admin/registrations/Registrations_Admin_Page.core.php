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
class Registrations_Admin_Page extends EE_Admin_Page {

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
		$this->page_label = __('Registrations', 'event_espresso');
	}





	protected function _ajax_hooks() {
		//todo: all hooks for registrations ajax goes in here
		add_action( 'action_hook_espresso_attendee_check_in', array( $this, '_attendee_check_in' ));
	}





	protected function  _define_page_props() {
		$this->_admin_base_url = REG_ADMIN_URL;
		$this->_admin_page_title = $this->page_label;
		$this->_labels = array(
			'buttons' => array(
					'add-registrant' => __('Register New Attendee', 'event_espresso'),
					'add-attendee' => __('Add New Attendee', 'event_espresso'),
					'edit' => __('Edit Attendee', 'event_espresso'),
					'delete' => __('Delete Attendee', 'event_espresso')
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
					
				'update_attendee_registration_form'	=> array( 
						'func' => '_update_attendee_registration_form', 
						'noheader' => TRUE						
					),
					
				'new_registration' => '_new_registration',
					
				'save_new_registration'	=> array(
						'func' => '_save_new_registration',
						'noheader' => TRUE
					),
					
				'delete_registration'	=> array(
						'func' => '_delete_registration',
						'noheader' => TRUE
					),
					
				'approve_reg_status'	=> array(
						'func' => '_approve_or_decline_reg_status',
						'args' => array( 'RAP' ),
						'noheader' => TRUE
					),
					
				'decline_reg_status'	=> array(
						'func' => '_approve_or_decline_reg_status',
						'args' => array( 'RNA' ),
						'noheader' => TRUE
					),
					
				'set_pending_reg_status'	=> array(
						'func' => '_approve_or_decline_reg_status',
						'args' => array( 'RPN' ),
						'noheader' => TRUE
					),
					
				'reports'	=> '_registration_reports',

				'event_registrations'	=> '_event_registrations_list_table',
				
				'contact_list'	=> '_attendee_contact_list_table',
				
				'add_new_attendee'	=> array( 
					'func' => '_edit_attendee_details', 
					'args' => array( 
						'new_attendee' => TRUE 
					)
				),
				
				'edit_attendee'	=> array( 
					'func' => '_edit_attendee_details'
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
				
				'delete_attendees'	=> array( 
					'func' => '_delete_attendees', 
					'noheader' => TRUE 
				),
				
				'attendee_check_in'	=> array( 
					'func' => '_attendee_check_in', 
					'args' => array( 
						'check_in' => TRUE 
					), 
					'noheader' => TRUE 
				),
				
				'attendee_check_out'	=> array( 
					'func' => '_attendee_check_out', 
					'args' => array( 
						'check_in' => FALSE 
					), 
					'noheader' => TRUE 
				),
				
				'resend_registration' => array(
					'func' => '_resend_registration',
					'noheader' => TRUE
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
				'list_table' => 'EE_Registrations_List_Table'
				),

			'event_registrations' => array(
				'nav' => array(
					'label' => __('Check In List', 'event_espresso'),
					'order' => 10,
					'persistent' => FALSE
					),
					'list_table' => 'EE_Event_Registrations_List_Table',
					'metaboxes' => array()
				),
								
			'view_registration' => array(
				'nav' => array(
					'label' => __('REG Details', 'event_espresso'),
					'order' => 15,
					'url' => isset($this->_req_data['_REG_ID']) ? add_query_arg(array('_REG_ID' => $this->_req_data['_REG_ID'] ), $this->_current_page_view_url )  : $this->_admin_base_url,
					'persistent' => FALSE
					),
				'metaboxes' => array( '_registration_details_metaboxes', '_espresso_news_post_box', '_espresso_links_post_box', '_espresso_sponsors_post_box' )
				),
				
			'new_registration' => array(
				'nav' => array(
					'label' => __('Register New Attendee', 'event_espresso'),
					'order' => 15,
					'persistent' => FALSE
					),
				'metaboxes' => array( 'new_registration_metaboxes', '_publish_post_box', '_espresso_news_post_box', '_espresso_links_post_box', '_espresso_sponsors_post_box' ),
				'labels' => array(
					'publishbox' => __('Save Registration', 'event_espresso')
					)
				),
				
			'add_new_attendee' => array(
				'nav' => array(
					'label' => __('Add Attendee', 'event_espresso'),
					'order' => 15,
					'persistent' => FALSE
					),
					'metaboxes' => array('_publish_post_box', '_espresso_news_post_box', '_espresso_links_post_box', '_espresso_sponsors_post_box')
				),
				
			'edit_attendee' => array(
				'nav' => array(
					'label' => __('Edit Attendee', 'event_espresso'),
					'order' => 15,
					'persistent' => FALSE,
					'url' => isset($this->_req_data['id']) ? add_query_arg(array('id' => $this->_req_data['id'] ), $this->_current_page_view_url )  : $this->_admin_base_url
					),
					'metaboxes' => array('_publish_post_box', '_espresso_news_post_box', '_espresso_links_post_box', '_espresso_sponsors_post_box')
				),
				
			'contact_list' => array(
				'nav' => array(
					'label' => __('Contact List', 'event_espresso'),
					'order' => 20
					),
					'list_table' => 'EE_Attendee_Contact_List_Table',
					'metaboxes' => array()
				),

			'reports' => array(
				'nav' => array(
					'label' => __('Reports', 'event_espresso'),
					'order' => 30
					)
				)
				
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

		global $wpdb;
		$SQL = 'SELECT STS_ID, STS_code FROM '. $wpdb->prefix . 'esp_status WHERE STS_type = "registration"';
		$results = $wpdb->get_results( $SQL );

		self::$_reg_status = array();
		foreach ( $results as $status ) {
			self::$_reg_status[ $status->STS_ID ] = $status->STS_code;
		}
	}








	protected function _add_screen_options_default() {
		$this->_per_page_screen_option();
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






	public function load_scripts_styles_view_registration() {
		//styles
		wp_enqueue_style('jquery-ui-style');
		wp_enqueue_style('jquery-ui-style-datepicker-css');
		//scripts
		global $eei18n_js_strings;
		$eei18n_js_strings['update_att_qstns'] = __( 'click "Update Attendee Questions" to save your changes', 'event_espresso' );
		wp_localize_script( 'espresso_reg', 'eei18n', $eei18n_js_strings );
	}






	public function load_scripts_styles_new_registration() {
		wp_register_script( 'espresso-validate-new-reg', REG_ASSETS_URL . 'espresso-validate-new-reg.js', array('jquery-validate'), EVENT_ESPRESSO_VERSION, TRUE);
		wp_enqueue_script('espresso-validate-new-reg');
	}







	public function load_scripts_styles_reports() {
		//styles
		wp_enqueue_style('jquery-jqplot-css', JQPLOT_URL . 'jquery.jqplot.min.css', array(), EVENT_ESPRESSO_VERSION);

		//scripts
		wp_deregister_script( 'jquery' );
        wp_register_script( 'jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js');
		global $is_IE;
		if ( $is_IE ) {
			wp_enqueue_script( 'excanvas' , JQPLOT_URL . 'excanvas.min.js', array(), ESPRESSO_E, FALSE);
		}
		wp_enqueue_script('jqplot-all');
	}








	protected function _set_list_table_views_default() {
		$this->_views = array(
			'all' => array(
				'slug' => 'all',
				'label' => __('All Registrations', 'event_espresso'),
				'count' => 0,
				'bulk_action' => array(
					'delete_registration' => __('Delete Registrations', 'event_espresso'),
					)
				),
			'month' => array(
				'slug' => 'month',
				'label' => __('This Month', 'event_espresso'),
				'count' => 0,
				'bulk_action' => array(
					'delete_registration' => __('Delete Registrations', 'event_espresso'),
					)
				),
			'today' => array(
				'slug' => 'today',
				'label' => sprintf( __('Today - %s', 'event_espresso'), date('M d, Y', current_time('timestamp', 0) ) ),
				'count' => 0,
				'bulk_action' => array(
					'delete_registration' => __('Delete Registrations', 'event_espresso'),
					)
				)
			);
	}




	protected function _set_list_table_views_event_registrations() {
		$this->_views = array(
			'all' => array(
				'slug' => 'all',
				'label' => __('All', 'event_espresso'),
				'count' => 0,
				'bulk_action' => array(
					'attendee_check_in' => __('Toggle Attendees Check In', 'event_espresso'),
					)
				),
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
					'delete_attendees' => __('Delete Permanently', 'event_espresso')
					)
				)
				
			);
	}





	protected function _registration_legend_items() {
		$items = array(
			'star-icon' => array(
				'icon' => EVENT_ESPRESSO_PLUGINFULLURL . 'images/star-8x8.png',
				'desc' => __('This indicates that the Attendee is the Primary Attendee', 'event_espresso')
				),
			'view_details' => array(
				'icon' => EVENT_ESPRESSO_PLUGINFULLURL .'/images/magnifier.png',
				'desc' => __('View Registration Details', 'event_espresso')
				),
			'edit_attendee' => array(
				'icon' => EVENT_ESPRESSO_PLUGINFULLURL .'/images/user_edit.png',
				'desc' => __('Edit Attendee Details', 'event_espresso')
				),
			'resend_registration' => array(
				'icon' => EVENT_ESPRESSO_PLUGINFULLURL .'/images/email_go.png',
				'desc' => __('Resend registration details to attendee', 'event_espresso')
				),
			'view_transaction' => array(
				'icon' => EVENT_ESPRESSO_PLUGINFULLURL .'/images/money.png',
				'desc' => __('View Transaction details.', 'event_espresso')
				)
			);
		return $items;
	}



	/***************************************		REGISTRATION OVERVIEW 		***************************************/






	protected function _registrations_overview_list_table() {
		$EVT_ID = ( ! empty( $this->_req_data['event_id'] )) ? absint( $this->_req_data['event_id'] ) : FALSE;
		if ( $EVT_ID ) {
			$this->_admin_page_title .= $this->_get_action_link_or_button( 'new_registration', 'add-registrant', array( 'event_id' => $EVT_ID ), 'button add-new-h2' );
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

	    require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Registration.model.php' );
	    $REG = EEM_Registration::instance();

		$REG_ID = ( ! empty( $this->_req_data['_REG_ID'] )) ? absint( $this->_req_data['_REG_ID'] ) : FALSE;

		if ( $this->_registration = $REG->get_registration_for_admin_page( $REG_ID ))
			return TRUE;
		else {
			$error_msg = sprintf( __('An error occured and the details for Registration ID #%s could not be retreived.', 'event_espresso'), $REG_ID );
			EE_Error::add_error( $error_msg, __FILE__, __FUNCTION__, __LINE__ );
			$this->_registration = NULL;
			return FALSE;
		}
	}





	/**
	 * get registrations for given parameters (used by list table)
	 * @param  int  $per_page    how many registrations displayed per page
	 * @param  boolean $count   return the count or objects
	 * @return mixed (int|array)  int = count || array of registration objects
	 */
	public function get_registrations( $per_page = 10, $count = FALSE ) {

		$EVT_ID = isset( $this->_req_data['event_id'] ) ? absint( $this->_req_data['event_id'] ) : FALSE;
		$CAT_ID = isset( $this->_req_data['category_id'] ) ? absint( $this->_req_data['category_id'] ) : FALSE;
		$reg_status = isset( $this->_req_data['reg_status'] ) ? sanitize_text_field( $this->_req_data['reg_status'] ) : FALSE;
		$month_range = isset( $this->_req_data['month_range'] ) ? sanitize_text_field( $this->_req_data['month_range'] ) : FALSE;
		$today_a = isset( $this->_req_data['status'] ) && $this->_req_data['status'] == 'today' ? TRUE : FALSE;
		$this_month_a = isset( $this->_req_data['status'] ) && $this->_req_data['status'] == 'month' ? TRUE  : FALSE;
		$start_date = FALSE;
		$end_date = FALSE;

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
				$orderby = 'ATT_lname';
				break;
			case 'event_name':
				$orderby = 'event_name';
				break;
			case 'DTT_EVT_start':
				$orderby = 'DTT_EVT_start';
				break;
			default: //'REG_date'
				$orderby = 'REG_date';
		}

		$sort = ( isset( $this->_req_data['order'] ) && ! empty( $this->_req_data['order'] )) ? $this->_req_data['order'] : 'DESC';
		$current_page = isset( $this->_req_data['paged'] ) && !empty( $this->_req_data['paged'] ) ? $this->_req_data['paged'] : 1;
		$per_page = isset( $this->_req_data['perpage'] ) && !empty( $this->_req_data['perpage'] ) ? $this->_req_data['perpage'] : $per_page;

		$offset = ($current_page-1)*$per_page;
		$limit = array( $offset, $per_page );


		$registrations = EEM_Registration::instance()->get_registrations_for_admin_page( $EVT_ID, $CAT_ID, $reg_status, $month_range, $today_a, $this_month_a, $start_date, $end_date, $orderby, $sort, $limit, $count );
		//printr( $registrations, '$registrations  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		
		if ( $EVT_ID && isset( $registrations[0] ) && isset( $registrations[0]->event_name )) {
			//printr( $registrations[0], '$registrations  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
			$event_name = isset( $registrations[0]->event_name ) ? $registrations[0]->event_name : '';
			$event_date = isset( $registrations[0]->DTT_EVT_start ) ? date( 'l F j, Y,    g:i:s a', $registrations[0]->DTT_EVT_start ) : '';
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
			<span class="admin-page-header-edit-lnk not-bold">' . $back_2_reg_lnk . '</span>
		</div>
		';
		}
		return $registrations;
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

		global $wpdb, $org_options;
		
		$this->_template_args = array();

		$this->_set_registration_object();

		if ( is_object( $this->_registration )) {
			
			//printr( $this->_registration, '$this->_registration  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		
			$this->_session = maybe_unserialize( unserialize( $this->_registration->TXN_session_data ));

			$title = __( ucwords( str_replace( '_', ' ', $this->_req_action )), 'event_espresso' );
			// add PRC_ID to title if editing 
			$title = $this->_registration->REG_ID ? $title . ' # ' . $this->_registration->REG_ID : $title;


			$this->_template_args['reg_nmbr']['value'] = $this->_registration->REG_ID;
			$this->_template_args['reg_nmbr']['label'] = __( 'Registration Number', 'event_espresso' );

			$this->_template_args['reg_datetime']['value'] = date( 'l F j, Y,    g:i:s a', $this->_registration->REG_date );
			$this->_template_args['reg_datetime']['label'] = __( 'Date', 'event_espresso' );

			$this->_template_args['reg_status']['value'] = str_replace( '_', ' ', self::$_reg_status[ $this->_registration->REG_status ] );
			$this->_template_args['reg_status']['label'] = __( 'Registration Status', 'event_espresso' );
			$this->_template_args['reg_status']['class'] = 'status-' . $this->_registration->REG_status;
			
			$this->_template_args['approve_decline_reg_status_buttons'] = $this->_set_approve_or_decline_reg_status_buttons();

			$this->_template_args['grand_total'] = $this->_registration->TXN_total;

			$this->_template_args['currency_sign'] = $org_options['currency_symbol'];
			// link back to overview
			$this->_template_args['reg_overview_url'] = REG_ADMIN_URL;	

			// grab header
			$template_path = REG_TEMPLATE_PATH . 'reg_admin_details_header.template.php';
			$this->_template_args['admin_page_header'] = espresso_display_template( $template_path, $this->_template_args, TRUE );
						
		} else {
			
			$this->_template_args['admin_page_header'] = $this->display_espresso_notices();

		}

		// the details template wrapper
		$this->display_admin_page_with_sidebar();		

	}






	protected function _registration_details_metaboxes() {
		$this->_set_registration_object();
		add_meta_box( 'edit-reg-details-mbox', __( 'Registration Details', 'event_espresso' ), array( $this, '_reg_details_meta_box' ), $this->wp_page_slug, 'normal', 'high' );
		add_meta_box( 'edit-reg-questions-mbox', __( 'Attendee\'s Registration Form', 'event_espresso' ), array( $this, '_reg_questions_meta_box' ), $this->wp_page_slug, 'normal', 'high' );
		add_meta_box( 'edit-reg-registrant-mbox', __( 'Attendee Details', 'event_espresso' ), array( $this, '_reg_registrant_side_meta_box' ), $this->wp_page_slug, 'side', 'high' );
		if ( $this->_registration->REG_group_size > 1 ) {
			add_meta_box( 'edit-reg-attendees-mbox', __( 'Other Attendees Registered in this Transaction', 'event_espresso' ), array( $this, '_reg_attendees_meta_box' ), $this->wp_page_slug, 'normal', 'high' );
		}
	}






	/**
	 * 		_set_approve_or_decline_reg_status_buttons
	*		@access protected
	*		@param string	$REG_status
	*		@return void
	*/
	protected function _set_approve_or_decline_reg_status_buttons() {
		
		$approve_decline_reg_status_buttons = '';

		if ( $this->_set_registration_object() ) {
			switch ( $this->_registration->REG_status ) {
				
				case 'RAP' :
					$pending_url = self::add_query_args_and_nonce( array( 'action'=>'set_pending_reg_status', '_REG_ID'=>$this->_registration->REG_ID ), REG_ADMIN_URL );
					$decline_url = self::add_query_args_and_nonce( array( 'action'=>'decline_reg_status', '_REG_ID'=>$this->_registration->REG_ID ), REG_ADMIN_URL );
					$approve_decline_reg_status_buttons = '
			<a id="reg-admin-pending-reg-status-lnk" class="button-secondary" href="' . $pending_url . '">' . __( 'Set this Registration to Pending', 'event_espresso' ) . '</a>
			<a id="reg-admin-decline-reg-status-lnk" class="button-secondary" href="' . $decline_url . '">' . __( 'Decline this Registration', 'event_espresso' ) . '</a>';
					break;
				
				case 'RPN' :
					$aprove_url = self::add_query_args_and_nonce( array( 'action'=>'approve_reg_status', '_REG_ID'=>$this->_registration->REG_ID ), REG_ADMIN_URL );
					$decline_url = self::add_query_args_and_nonce( array( 'action'=>'decline_reg_status', '_REG_ID'=>$this->_registration->REG_ID ), REG_ADMIN_URL );
					$approve_decline_reg_status_buttons = '
			<a id="reg-admin-approve-reg-status-lnk" class="espresso-button-green button-primary" href="' . $aprove_url . '">' . __( 'Approve this Registration', 'event_espresso' ) . '</a>
			<a id="reg-admin-decline-reg-status-lnk" class="button-secondary" href="' . $decline_url . '">' . __( 'Decline this Registration', 'event_espresso' ) . '</a>';
					break;
				
				case 'RNA' :
					$aprove_url = self::add_query_args_and_nonce( array( 'action'=>'approve_reg_status', '_REG_ID'=>$this->_registration->REG_ID ), REG_ADMIN_URL );
					$pending_url = self::add_query_args_and_nonce( array( 'action'=>'set_pending_reg_status', '_REG_ID'=>$this->_registration->REG_ID ), REG_ADMIN_URL );
					$approve_decline_reg_status_buttons = '
			<a id="reg-admin-approve-reg-status-lnk" class="espresso-button-green button-primary" href="' . $aprove_url . '">' . __( 'Approve this Registration', 'event_espresso' ) . '</a>
			<a id="reg-admin-pending-reg-status-lnk" class="button-secondary" href="' . $pending_url . '">' . __( 'Set this Registration to Pending', 'event_espresso' ) . '</a>';
					break;
				
			}		
		}
		
		return $approve_decline_reg_status_buttons;
		
	}






	/**
	 * 		set reg status to approved
	*		@access public
	*		@param string	$REG_status
	*		@return void
	*/
	public function _approve_or_decline_reg_status( $REG_status = FALSE ) {
		$override = FALSE;
		$success = FALSE;
		$REG_ID = ( ! empty( $this->_req_data['_REG_ID'] )) ? absint( $this->_req_data['_REG_ID'] ) : FALSE;			
		if ( $REG_ID && array_key_exists( $REG_status, self::$_reg_status )) {
			if ( $registration = EEM_Registration::instance()->get_registration_by_ID( $REG_ID )) {
				$registration->set_status( $REG_status );
				$success = $registration->update();		
			}
		}

		if ( $success && $REG_status == 'RAP' ) {
			$override = TRUE;
			EE_Error::overwrite_success();
			$this->_process_resend_registration();
		}
		
		$what = 'Attendee Registration Status';
		$route = $REG_ID ? array( 'action' => 'view_registration', '_REG_ID' => $REG_ID ) : array( 'action' => 'default' );
		$this->_redirect_after_action( $success, $what, 'updated', $route, $override );
	}







	/**
	 * 		generates HTML for the Registration main meta box
	*		@access public
	*		@return void
	*/
	public function _reg_details_meta_box() {

		global $wpdb, $org_options;

		//printr( $this->_session, '$this->_session  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

		// process items in cart
		$cart_items = $this->_session['cart']['REG']['items'];
		$this->_template_args['items'] = array();
		$exclude = array( 'attendees' );
		
		if ( ! empty( $cart_items )) {
			foreach ( $cart_items as $line_item_ID => $item ) {
				foreach ( $item as $key => $value ) {
					if ( ! in_array( $key, $exclude )) {
						if ( $key == 'options' ) {
							$options = $value;
							foreach ( $options as $opt => $option ) {
								if ( $opt == 'date' ) {
									$option = strtotime( $option );
								} else if  ( $opt == 'time' ) {
									$ampm = ( (float)$option > 11.59 ) ? (( (float)$option == 24.00 ) ? 'am' : 'pm' ) : 'am';
									$option = strtotime( $option . ' ' . $ampm );
								}
								$this->_template_args['items'][ $item['name'] ][ $opt ] = $option;
							}
						} else {
							$this->_template_args['items'][ $item['name'] ][ $key ] = $value;
						}
					} else {
						$this->_template_args['event_attendees'][ $item['name'] ][ $key ] = $value;
					}
				}
			}
		}


		// process taxes
		if ( $taxes = maybe_unserialize( $this->_registration->TXN_tax_data )) {
			$this->_template_args['taxes'] = $taxes['taxes'];
		} else {
			$this->_template_args['taxes'] = FALSE;
		}

		$this->_template_args['grand_total'] = $this->_registration->TXN_total;

		$this->_template_args['currency_sign'] = $org_options['currency_symbol'];
		$reg_status_class = 'status-' . $this->_registration->STS_ID;
		$reg_details = maybe_unserialize( $this->_registration->TXN_details );


		if ( !is_array($reg_details) || ( is_array($reg_details) && isset($reg_details['REDO_TXN']) && $reg_details['REDO_TXN'] ) ) {
			$reg_details = array();
			$reg_details['method'] = '';
			$reg_details['response_msg'] = '';
			$reg_details['registration_id'] = '';
			$reg_details['invoice_number'] = '';
		} 


		$card_type = isset( $reg_details['card_type'] ) ? ' : ' . $reg_details['card_type'] : '';
		$reg_details['method'] = $reg_details['method'] == 'CC' ? 'Credit Card' . $card_type : $reg_details['method'];
		$this->_template_args['method']['value'] = $reg_details['method'];
		$this->_template_args['method']['label'] = __( 'Payment Method', 'event_espresso' );
		$this->_template_args['method']['class'] = 'regular-text';

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
			$this->_template_args['reg_details']['invoice_number']['value'] = $reg_details['invoice_number'];
			$this->_template_args['reg_details']['invoice_number']['label'] = __( 'Invoice Number', 'event_espresso' );
			$this->_template_args['reg_details']['invoice_number']['class'] = 'regular-text';
		}

		$this->_template_args['reg_details']['registration_session']['value'] = $this->_registration->REG_session;
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
		echo espresso_display_template( $template_path, $this->_template_args, TRUE );
		
	}






	/**
	 * 		generates HTML for the Registration Attendee Questions meta box
	*		@access public
	*		@return void
	*/
	public function _reg_questions_meta_box() {

		global $wpdb, $org_options;	
		// event question groups
		$SQL = 'SELECT QSG.*, EQG.EVT_ID FROM ' . $wpdb->prefix . 'esp_event_question_group EQG '; 
		$SQL .= 'INNER JOIN ' . $wpdb->prefix . 'esp_question_group QSG ON  EQG.QSG_ID = QSG.QSG_ID ';
		$SQL .= 'WHERE EQG.EVT_ID = %d AND QSG.QSG_deleted = 0 '; 
		$SQL .= 'ORDER BY QSG.QSG_order'; 
		$QSGs = $wpdb->get_results( $wpdb->prepare( $SQL, $this->_registration->EVT_ID ), 'OBJECT_K' );
		//printr( $QSGs, '$QSGs  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

		// attendee questions
		$SQL = 'SELECT QST.*, ANS.ANS_ID, ANS.ANS_value, QGQ.QSG_ID FROM ' . $wpdb->prefix . 'esp_answer ANS '; 
		$SQL .= 'INNER JOIN ' . $wpdb->prefix . 'esp_question_group_question QGQ ON QGQ.QST_ID = ANS.QST_ID '; 
		$SQL .= 'INNER JOIN ' . $wpdb->prefix . 'esp_question QST ON  QGQ.QST_ID = QST.QST_ID '; 
		$SQL .= 'WHERE ANS.REG_ID = %d '; 
		$SQL .= 'ORDER BY QST.QST_order'; 
		$QSTs = $wpdb->get_results( $wpdb->prepare( $SQL, $this->_registration->REG_ID ), 'OBJECT_K' );
		//printr( $QSTs, '$QSTs  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

		// csv list of QST IDs
		$QST_IDs = implode( array_keys( $QSTs ), ',' );
		// get Question Options
		$QSOs = EEM_Event::instance()->get_options_for_question( $QST_IDs );
		//printr( $QSOs, '$QSOs  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

		add_filter( 'filter_hook_espresso_form_before_question_group_questions', array( $this, 'form_before_question_group' ), 10, 1 );
		add_filter( 'filter_hook_espresso_form_after_question_group_questions', array( $this, 'form_after_question_group' ), 10, 1 );	
		add_filter( 'filter_hook_espresso_form_field_label_html', array( $this, 'form_form_field_label_wrap' ), 10, 1 );
		add_filter( 'filter_hook_espresso_form_field_input_html', array( $this, 'form_form_field_input__wrap' ), 10, 1 );

		$question_groups = EEM_Event::instance()->assemble_array_of_groups_questions_and_options( $QSGs, $QSTs, $QSOs );
		//printr( $question_groups, '$question_groups  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

		require_once EVENT_ESPRESSO_PLUGINFULLPATH . '/helpers/EE_Form_Fields.helper.php';
		$this->_template_args['att_questions'] = EE_Form_Fields::generate_question_groups_html( $question_groups );

		$this->_template_args['reg_questions_form_action'] = 'update_attendee_registration_form';
		$this->_template_args['REG_ID'] = $this->_registration->REG_ID;

		$template_path = REG_TEMPLATE_PATH . 'reg_admin_details_main_meta_box_reg_questions.template.php';
		echo espresso_display_template( $template_path, $this->_template_args, TRUE );

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
	<table class="form-table ee-width-50">
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
					<a class="reg-admin-edit-attendee-question-lnk" href="#" title="' . __( 'click to edit attendee question', 'event_espresso' ) . '">
						<span class="reg-admin-edit-question-group-spn lt-grey-txt">' . __( 'edit the above question group', 'event_espresso' ) . '</span>
						<img width="16" height="16" alt="' . __( 'Edit Attendee Question', 'event_espresso' ) . '" src="'. EVENT_ESPRESSO_PLUGINFULLURL .'/images/pencil-16x16.png">		
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
	 * 		generates HTML for the Attendees Registration main meta box
	*		@access protected
	*		@return void
	*/
	protected function _update_attendee_registration_form() {	
		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		$success = TRUE;
		$qstns = isset( $this->_req_data['qstn'] ) ? $this->_req_data['qstn'] : FALSE;
		$REG_ID = isset( $this->_req_data['_REG_ID'] ) ? absint( $this->_req_data['_REG_ID'] ) : FALSE;
		$qstns = apply_filters('filter_hook_espresso_reg_admin_attendee_registration_form', $qstns);	
		$success = $this->_save_attendee_registration_form( $qstns );
		$what = __('Attendee Registration Form', 'event_espresso');
		$route = $REG_ID ? array( 'action' => 'view_registration', '_REG_ID' => $REG_ID ) : array( 'action' => 'default' );
		$this->_redirect_after_action( $success, $what, __('updated', 'event_espresso'), $route );

	}





	/**
	 * 		_save_attendee_registration_form
	*		@access private
	*		@return void
	*/
	private function _save_attendee_registration_form( $qstns = FALSE ) {
		
		if ( ! $qstns ) {	
			return FALSE;
		}		
		
		$success = TRUE;
		global $wpdb;
		// loop thru questions
		foreach ( $qstns as $QST_ID => $qstn ) {
			foreach ( $qstn as $ANS_ID => $ANS_value ) {
//					echo '<h4>$QST_ID : ' . $QST_ID . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//					echo '<h4>$ANS_ID : ' . $ANS_ID . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//					echo '<h4>$ANS_value : ' . $ANS_value . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';

				if ( ! $wpdb->update(
					$wpdb->prefix . 'esp_answer',
					array( 'ANS_value' => sanitize_text_field( $ANS_value )),
					array( 'ANS_ID' => absint( $ANS_ID )),
					array( '%s' ),
					array( '%d' )
				)) {
					$success = FALSE;
				}
			}
		}
	}





	/**
	 * 		generates HTML for the Attendees Registration main meta box
	*		@access public
	*		@return void
	*/
	public function _reg_attendees_meta_box() {

		global $wpdb, $org_options;

	    $REG = EEM_Registration::instance();
		$attendees = $REG->get_registrations_for_transaction( $this->_registration->TXN_ID, $this->_registration->REG_ID );

		$this->_template_args['attendees'] = array();
		$this->_template_args['attendee_notice'] = '';

		if ( empty( $attendees)  || ( is_array($attendees) && empty($attendees[0]) ) ) {
			EE_Error::add_error( __('There are no attendees attached to this registration. Something may have gone wrong with the registration', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
			$this->_template_args['attendee_notice'] = EE_Error::get_notices();
		} else {

			$att_nmbr = 1;
			foreach ( $attendees as $attendee ) {
			
				$this->_template_args['attendees'][ $att_nmbr ]['fname'] = ( isset( $attendee->ATT_fname ) & ! empty( $attendee->ATT_fname ) ) ? $attendee->ATT_fname : '';
				$this->_template_args['attendees'][ $att_nmbr ]['lname'] = ( isset( $attendee->ATT_lname ) & ! empty( $attendee->ATT_lname ) ) ? $attendee->ATT_lname : '';
				$this->_template_args['attendees'][ $att_nmbr ]['email'] = ( isset( $attendee->ATT_email ) & ! empty( $attendee->ATT_email ) ) ? $attendee->ATT_email : '';
				$this->_template_args['attendees'][ $att_nmbr ]['final_price'] = ( isset( $attendee->REG_final_price ) & ! empty( $attendee->REG_final_price ) ) ? $attendee->REG_final_price : '';
				
				$address = array();
				
				if ( isset( $attendee->ATT_address ) && ( ! empty( $attendee->ATT_address ))) {
					$address[] = $attendee->ATT_address;
				}
				if ( isset( $attendee->ATT_address2 ) && ( ! empty( $attendee->ATT_address2 ))) {
					$address[] = $attendee->ATT_address2;
				}
				if ( isset( $attendee->ATT_city ) && ( ! empty( $attendee->ATT_city ))) {
					$address[] = $attendee->ATT_city;
				}
				if ( isset( $attendee->ATT_state ) && ( ! empty( $attendee->ATT_state ))) {
					$address[] = $attendee->ATT_state;
				}
				if ( isset( $attendee->ATT_zip ) && ( ! empty( $attendee->ATT_zip ))) {
					$address[] = $attendee->ATT_zip;
				}
				$this->_template_args['attendees'][ $att_nmbr ]['address'] = implode( ', ', $address );
				
				$this->_template_args['attendees'][ $att_nmbr ]['att_link'] = self::add_query_args_and_nonce( array( 'action'=>'edit_attendee', 'id'=>$attendee->ATT_ID ), REG_ADMIN_URL );
				
				$att_nmbr++;
			}

			//printr( $attendees, '$attendees  <br /><span style="font-size:10px;font-weight:normal;">( file: '. __FILE__ . ' - line no: ' . __LINE__ . ' )</span>', 'auto' );

			$this->_template_args['event_name'] = $this->_registration->event_name;
			$this->_template_args['currency_sign'] = $org_options['currency_symbol'];

	//			$this->_template_args['registration_form_url'] = add_query_arg( array( 'action' => 'edit_registration', 'process' => 'attendees'  ), REG_ADMIN_URL );
		}

		$template_path = REG_TEMPLATE_PATH . 'reg_admin_details_main_meta_box_attendees.template.php';
		echo espresso_display_template( $template_path, $this->_template_args, TRUE );

	}






	/**
	 * 		generates HTML for the Edit Registration side meta box
	*		@access public
	*		@return void
	*/
	public function _reg_registrant_side_meta_box() {

		$this->_template_args['ATT_ID'] = $this->_registration->ATT_ID;
		$this->_template_args['fname'] = $this->_registration->ATT_fname;
		$this->_template_args['lname'] = $this->_registration->ATT_lname;
		$this->_template_args['email'] = $this->_registration->ATT_email;
		$this->_template_args['address'] = $this->_registration->ATT_address;
		$this->_template_args['address2'] = ( ! empty ( $this->_registration->ATT_address2 )) ? '<br />' . $this->_registration->ATT_address2 : '';
		$this->_template_args['city'] = ( ! empty ( $this->_registration->ATT_city )) ? '<br />' . $this->_registration->ATT_city . ', ' : '';
		$this->_template_args['state'] = ( ! empty ( $this->_registration->STA_ID )) ? '<br />' . $this->_registration->STA_ID . ', ' : '';
		$this->_template_args['country'] = ( ! empty ( $this->_registration->CNT_ISO )) ? $this->_registration->CNT_ISO : '';
		$this->_template_args['zip'] = ( ! empty ( $this->_registration->ATT_zip )) ? '<br />' . $this->_registration->ATT_zip : '';
		$this->_template_args['phone'] = $this->_registration->ATT_phone;
		$this->_template_args['social'] = stripslashes( $this->_registration->ATT_social );
		$this->_template_args['comments'] = stripslashes( $this->_registration->ATT_comments );
		$this->_template_args['notes'] = stripslashes( $this->_registration->ATT_notes );

		$template_path = REG_TEMPLATE_PATH . 'reg_admin_details_side_meta_box_registrant.template.php';
		echo espresso_display_template( $template_path, $this->_template_args, TRUE );
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
			
			$this->_template_args['country']['value'] = ! empty ( $billing_info['reg-page-billing-country']['value'] ) ? $billing_info['reg-page-billing-country']['value'] : '';
			$this->_template_args['country']['label'] = ! empty ( $billing_info['reg-page-billing-country']['label'] ) ? $billing_info['reg-page-billing-country']['label'] : __( 'Country', 'event_espresso' );
			
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
		echo espresso_display_template( $template_path, $this->_template_args, TRUE );
	}







	/**
	 * 		generates HTML for the View Registration Details Admin page
	*		@access private
	*		@return void
	*/
	private function _delete_registration() {
		_e('Registrations can not be deleted', 'event_espresso');
	}





	/**
	 * 		generates HTML for the Register New Attendee Admin page
	*		@access private
	*		@return void
	*/
	public function _new_registration() {
		
		if ( ! $this->_set_reg_event() ) {
			return FALSE;
		}
		// gotta start with a clean slate
		espresso_clear_session();
		$this->_template_args['event_name'] = '' ;
		// event name
		if ( $this->_reg_event ) {
			$this->_template_args['event_name'] = $this->_reg_event->event_name;
			$edit_event_url = self::add_query_args_and_nonce( array( 'action'=>'edit_event', 'EVT_ID'=>$this->_reg_event->id ), EVENTS_ADMIN_URL );	
			$edit_event_lnk = '<a href="'.$edit_event_url.'" title="' . __( 'Edit ', 'event_espresso' ) . $this->_reg_event->event_name . '">' . __( 'Edit Event', 'event_espresso' ) . '</a>';	
			$this->_template_args['event_name'] .= ' <span class="admin-page-header-edit-lnk not-bold">' . $edit_event_lnk . '</span>' ;
		}

		// grab header
		$template_path = REG_TEMPLATE_PATH . 'reg_admin_register_new_attendee.template.php';
		$this->_template_args['admin_page_header'] = espresso_display_template( $template_path, $this->_template_args, TRUE );

		$this->_set_add_edit_form_tags( 'save_new_registration' );
		$this->_set_publish_post_box_vars( NULL, FALSE, FALSE, NULL, FALSE );
		// the details template wrapper
		$this->display_admin_page_with_sidebar();	
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
		global $wpdb;
		$SQL = 'SELECT * FROM ' . EVENTS_DETAIL_TABLE . ' ';
		$SQL .= 'WHERE id = %d';
		$this->_reg_event = $wpdb->get_row(  $wpdb->prepare( $SQL, $EVT_ID ));
		return TRUE;
	}





	/**
	 * 		generates metaboxes for
	*		@access private
	*		@return void
	*/
	protected function new_registration_metaboxes() {
		
		$EVT_ID = ( ! empty( $this->_req_data['event_id'] )) ? absint( $this->_req_data['event_id'] ) : FALSE;
		if ( ! $EVT_ID ) {
			return FALSE;
		}
		
		add_meta_box( 
			'reg-new-att-tickets-mbox', 
			__( 'Date, Time, &amp; Price Selection', 'event_espresso' ), 
			array( $this, '_reg_new_att_tickets_meta_box' ), 
			$this->wp_page_slug, 
			'normal', 
			'high', 
			array( 'EVT_ID' => $EVT_ID )
		);
		
		add_meta_box( 
			'reg-new-att-questions-mbox', 
			__( 'Registration Form Questions', 'event_espresso' ), 
			array( $this, '_reg_new_att_questions_meta_box' ), 
			$this->wp_page_slug, 
			'normal', 
			'high', 
			array( 'EVT_ID' => $EVT_ID )
		);
	}





	/**
	 * 		generates HTML for the Register New Attendee Admin Page Ticket Selector meta box
	*		@access private
	*		@return void
	*/
	public function _reg_new_att_tickets_meta_box( $post, $metabox = array( 'args' => array()) ) {
		
		global $wpdb, $org_options;	
		extract( $metabox['args'] );		
		
		if ( ! $this->_set_reg_event() ) {
			return FALSE;
		}

		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'functions/event_details.helper.php');
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Datetime.model.php');
		$this->_reg_event->datetimes = EEM_Datetime::instance()->get_all_event_dates( $EVT_ID );

		require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Ticket_Prices.class.php' );
		$TKT_PRCs = new EE_Ticket_Prices( $EVT_ID );
		$this->_reg_event->prices = $TKT_PRCs->get_all_final_event_prices();

		$this->_reg_event->currency_symbol = $org_options['currency_symbol'];

		$this->_reg_event->available_spaces = get_number_of_attendees_reg_limit( $EVT_ID, 'available_spaces' );
		$this->_reg_event->allow_multiple = FALSE;
		$this->_template_args['event'] = $this->_reg_event;
		
		// ticket selector
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Ticket_Selector.class.php');
		echo EE_Ticket_Selector::init( $this->_reg_event, TRUE ); 
		echo '<br />';

	}





	/**
	 * 		generates HTML for the Register New Attendee Admin Page Questions
	*		@access private
	*		@return void
	*/
	public function _reg_new_att_questions_meta_box( $post, $metabox = array( 'args' => array()) ) {
		
		global $wpdb, $org_options;	
		extract( $metabox['args'] );		

		// event question groups
		$SQL = 'SELECT QSG.*, EQG.EVT_ID FROM ' . $wpdb->prefix . 'esp_event_question_group EQG '; 
		$SQL .= 'INNER JOIN ' . $wpdb->prefix . 'esp_question_group QSG ON  EQG.QSG_ID = QSG.QSG_ID ';
		$SQL .= 'WHERE EQG.EVT_ID = %d AND QSG.QSG_deleted = 0 '; 
		$SQL .= 'ORDER BY QSG.QSG_order'; 
		$QSGs = $wpdb->get_results( $wpdb->prepare( $SQL, $EVT_ID ), 'OBJECT_K' );
		//echo '<h4>' . $wpdb->last_query . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
		//printr( $QSGs, '$QSGs  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		$QSG_IDs = implode( array_keys( $QSGs ), ',' );
		//echo '<h4>$QSG_IDs : ' . $QSG_IDs . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';

		// attendee questions
		$SQL = 'SELECT QST.*, QGQ.QSG_ID FROM ' . $wpdb->prefix . 'esp_question_group_question QGQ '; 
		$SQL .= 'INNER JOIN ' . $wpdb->prefix . 'esp_question QST ON QGQ.QST_ID = QST.QST_ID '; 
		$SQL .= 'WHERE QGQ.QSG_ID IN (' . $QSG_IDs . ') '; 
		$SQL .= 'ORDER BY QST.QST_order'; 
		$QSTs = $wpdb->get_results( $SQL, 'OBJECT_K' );
		//echo '<h4>' . $wpdb->last_query . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
		//printr( $QSTs, '$QSTs  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

		// csv list of QST IDs
		$QST_IDs = implode( array_keys( $QSTs ), ',' );
		// get Question Options
		$QSOs = EEM_Event::instance()->get_options_for_question( $QST_IDs );
		//printr( $QSOs, '$QSOs  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

		add_filter( 'filter_hook_espresso_form_before_question_group_questions', array( $this, 'form_before_question_group' ), 10, 1 );
		add_filter( 'filter_hook_espresso_form_after_question_group_questions', array( $this, 'form_after_question_group_new_reg' ), 10, 1 );	
		add_filter( 'filter_hook_espresso_form_field_label_html', array( $this, 'form_form_field_label_wrap' ), 10, 1 );
		add_filter( 'filter_hook_espresso_form_field_input_html', array( $this, 'form_form_field_input_wrap_new_reg' ), 10, 1 );

		$question_groups = EEM_Event::instance()->assemble_array_of_groups_questions_and_options( $QSGs, $QSTs, $QSOs );
		//printr( $question_groups, '$question_groups  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

		require_once EVENT_ESPRESSO_PLUGINFULLPATH . '/helpers/EE_Form_Fields.helper.php';
		echo EE_Form_Fields::generate_question_groups_html( $question_groups );

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
	 * 		_save_new_registration
	 *
	 * 		@access 		public
	 * 		@return 		string
	 */
	public function _save_new_registration() {	
			
		// grab event id
		$EVT_ID = isset( $this->_req_data['tkt-slctr-event-id'] ) ? absint( $this->_req_data['tkt-slctr-event-id'] ) : FALSE;		
		if ( ! $EVT_ID ) {
			$error_msg = __( 'An error occured. No Event ID or an  invalid Event ID was submitted.', 'event_espresso' );
			EE_Error::add_error( $error_msg, __FILE__, __FUNCTION__, __LINE__ );
			$this->_redirect_after_action( 
				FALSE, 
				__('New Attendee Registration', 'event_espresso'), 
				__('created', 'event_espresso'), 
				array( 'action' => 'default' ) 
			);
		}
		
		// process Ticket Option
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Ticket_Selector.class.php');
		// get ticket option added to cart, which adds it to session, etc, etc
		if ( ! EE_Ticket_Selector::process_ticket_selections( FALSE, TRUE )) {
			$error_msg = __( 'An error occured. The ticket option could not be processed for the registration.', 'event_espresso' );
			EE_Error::add_error( $error_msg, __FILE__, __FUNCTION__, __LINE__ );
			$this->_redirect_after_action( 
				FALSE, 
				__('New Attendee Registration', 'event_espresso'), 
				__('created', 'event_espresso'), 
				array( 'action' => 'default', 'event_id' => $EVT_ID ) 
			);
		}
		
		if ( ! defined( 'ESPRESSO_CART' )) {
			require_once( EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Cart.class.php' );
		}
		// grab cart item
		$cart = EE_Cart::instance()->whats_in_the_cart();
		//grab first (and only) item
		$item = array_pop( $cart['items'] );
		// grab line item id
		$line_item_id = $item['line_item'];
		
		//grab session
		global $EE_Session;
		$EE_Session->set_session_data( array( 'fill' => TRUE ), 'billing_info' );
			
		// load gateways
		if ( ! defined( 'ESPRESSO_GATEWAYS' )) {
			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Gateways.model.php');
		}
		$EEM_Gateways = EEM_Gateways::instance();
		

		// set some defaults
		$attendees = array();
		$primary_attendee = array();
		$att_nmbr = 1;

		// grab a bunch of data directly from the ticket selector
		$requires_pre_approval = isset( $this->_req_data['tkt-slctr-pre-approval-' . $EVT_ID] ) ? absint( $this->_req_data['tkt-slctr-pre-approval-' . $EVT_ID] ) : FALSE;
		if ( isset( $this->_req_data['tkt-slctr-qty-' . $EVT_ID] )) {
			$ts_row = explode( '-', $this->_req_data['tkt-slctr-qty-' . $EVT_ID] );
			$ts_row = absint( $ts_row[0] );
		} else {
			$ts_row = 0;
		}
		// datetime ID
		$DTT_ID = isset( $this->_req_data['tkt-slctr-dtt-id-' . $EVT_ID][ $ts_row ] ) ? absint( $this->_req_data['tkt-slctr-dtt-id-' . $EVT_ID][ $ts_row ] ) : FALSE;
		// date string
		$event_date = isset( $this->_req_data['tkt-slctr-date-id-' . $EVT_ID][ $ts_row ] ) ? sanitize_text_field( $this->_req_data['tkt-slctr-date-id-' . $EVT_ID][ $ts_row ] ) : FALSE;
		// time string
		$event_time = isset( $this->_req_data['tkt-slctr-time-id-' . $EVT_ID][ $ts_row ] ) ? date( 'Gi', absint( $this->_req_data['tkt-slctr-time-id-' . $EVT_ID][ $ts_row ] )) : FALSE;
		// price string
		$tckt_price = isset( $this->_req_data['tkt-slctr-price-id-' . $EVT_ID][ $ts_row ] ) ? sanitize_text_field( $this->_req_data['tkt-slctr-price-id-' . $EVT_ID][ $ts_row ] ) : FALSE;
		// total ticket cost
		$grand_total = isset( $this->_req_data['tkt-slctr-price-' . $EVT_ID][ $ts_row ] ) ? ( $this->_req_data['tkt-slctr-price-' . $EVT_ID][ $ts_row ] ) : FALSE;		
				
//		printr( $_POST, '$_POST  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

		if ( isset( $this->_req_data['qstn'] )) {
			$qstns = apply_filters('filter_hook_espresso_reg_admin_new_registration_form', $this->_req_data['qstn']);	
			// sanitize reg form questions
			array_walk_recursive( $qstns, array( $this, 'sanitize_text_field_for_array_walk' ));
			// add questions
			foreach ( $qstns as $form_input => $input_value) {
				// get rid of htmlentities
				$input_value = html_entity_decode($input_value, ENT_QUOTES, 'UTF-8');
				// add ticket price to the array
				$attendees['attendees'][1]['price_paid'] = number_format( $grand_total, 2, '.', '' );
				// now add all other post data that was generated by attendee questions
				$attendees['attendees'][1][$form_input] = $input_value;
				unset( $attendees['attendees'][1]['line_item_id'] );		
			}
			
			// now save the attendee data
			if ( ! EE_Cart::instance()->set_line_item_details( $attendees, $line_item_id )) {
				$notices = EE_Error::get_notices(FALSE);
				$error_msg = $notices['errors'];
			}

			// and store a bit of data about the primary attendee
			$primary_attendee['line_item_id'] = $line_item_id;
			$primary_attendee['fname'] = $qstns['1'];
			$primary_attendee['lname'] = $qstns['2'];
			$primary_attendee['email'] = $qstns['3'];
			$EE_Session->set_session_data(array('primary_attendee' => $primary_attendee), 'session_data');

		}
		// update attendee details
		EE_Cart::instance()->_save_cart();
		// grab cart item
		$cart = EE_Cart::instance()->whats_in_the_cart();
		//printr( $cart, '$cart  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
			
		// taxes ?
		require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Taxes.class.php' );
		$taxes = EE_Taxes::calculate_taxes( $grand_total );
		$grand_total = apply_filters( 'espresso_filter_hook_grand_total_after_taxes', $grand_total );
		// totals over 0 initially get set to Incomlete, whereas Free Events get set to complete
		$txn_status = $grand_total > 0 ? 'TPN' : 'TCM';

		// grab session data
		$session = $EE_Session->get_session_data();
		// start the transaction record
		require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'classes/EE_Transaction.class.php' );
		// create TXN object
		$transaction = new EE_Transaction( 
			time(), 
			$grand_total, 
			0, 
			$txn_status, 
			NULL, 
			$session, 
			NULL, 
			array(
				'tax_totals'=>$session['tax_totals'],
				'taxes'=>$session['taxes']
			) 
		);
		$transaction->save();
//		echo '<h4>$results : ' . $results . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		printr( $transaction, '$transaction  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

		$reg_items = $session['cart']['REG']['items'];
		$saved_registrations = EE_Single_Page_Checkout::save_registration_items( $reg_items, $transaction );

		$transaction->set_txn_session_data( $session );
		$success = $transaction->save();
//		echo '<h4>$results : ' . $results . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		printr( $transaction, '$transaction  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

		//remove the session from teh transaction befores saving it to teh session... otherwise we'll ahve a recursive relationship! bad!!
//		$transaction->set_txn_session_data(null);
//		//var_dump($EE_Session->get_session_data());
//		$EE_Session->set_session_data(array( 'registration' => $saved_registrations, 'transaction' => $transaction ), 'session_data');
//		$EE_Session->_update_espresso_session();
			
//		printr( $EE_Session, '$EE_Session  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
//		die();
//		$this->_req_data = array();
//		
		$txn_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'view_transaction', 'txn'=>$transaction->ID() ), TXN_ADMIN_URL );
		wp_safe_redirect( $txn_url );
		exit();
//		$this->_redirect_after_action( $success, __( 'New Registration', 'event_espresso' ), 'created', array( 'action' => 'view_transaction', 'txn'=>$transaction->ID() ), TXN_ADMIN_URL );
	
	}




	function sanitize_text_field_for_array_walk( &$item, &$key ) {
	   $item = sanitize_text_field( $item );
	}






	/***************************************		EVENT REGISTRATIONS 		***************************************/





	/**
	 * 		generates HTML for the Event Registrations List Table
	*		@access protected
	*		@return void
	*/
	protected function _event_registrations_list_table() {
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
		$this->_admin_page_title .= $this->_get_action_link_or_button('new_registration', 'add-registrant', array(), 'button add-new-h2');
		$legend_items = array(
			'star-icon' => array(
				'icon' => EVENT_ESPRESSO_PLUGINFULLURL . 'images/star-8x8.png',
				'desc' => __('This indicates that the Attendee is the Primary Attendee', 'event_espresso')
				)
			);
		$this->_template_args['after_list_table'] = $this->_display_legend( $legend_items );
		$this->display_admin_list_table_page_with_no_sidebar();
	}





	/**
	 * 		get_attendees
	 * 		@param bool $count whether to return count or data.
	*		@access public
	*		@return array
	*/
	public function get_event_attendees( $per_page = 10, $count = FALSE, $trash = FALSE, $orderby = '' ) {  

		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
		// start with an empty array
		$attendees = array();
		
		require_once( REG_ADMIN . 'EE_Event_Registrations_List_Table.class.php' );
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Attendee.model.php');
		//$ATT_MDL = EEM_Attendee::instance();
		
		$EVT_ID = isset($this->_req_data['event_id']) ? absint( $this->_req_data['event_id'] ) : FALSE;
		$CAT_ID = isset($this->_req_data['category_id']) ? absint( $this->_req_data['category_id'] ) : FALSE;
		$reg_status = isset($this->_req_data['reg_status']) ? sanitize_text_field( $this->_req_data['reg_status'] ) : FALSE;
		
		$this->_req_data['orderby'] = ! empty($this->_req_data['orderby']) ? $this->_req_data['orderby'] : $orderby;
		
		switch ($this->_req_data['orderby']) {
			case 'REG_date':
				$orderby = 'REG_date';
				break;
			default :
				$orderby = 'ATT_lname';
//				$orderby = 'reg.REG_final_price';
		}
		
		$sort = ( isset( $this->_req_data['order'] ) && ! empty( $this->_req_data['order'] )) ? $this->_req_data['order'] : 'ASC';

		$current_page = isset( $this->_req_data['paged'] ) && !empty( $this->_req_data['paged'] ) ? $this->_req_data['paged'] : 1;
		$per_page = isset( $this->_req_data['perpage'] ) && !empty( $this->_req_data['perpage'] ) ? $this->_req_data['perpage'] : $per_page;


		$offset = ($current_page-1)*$per_page;
		$limit = array( $offset, $per_page );
		
		$output = $count ? 'COUNT' : 'OBJECT_K';
		$all_attendees = EEM_Attendee::instance()->get_event_attendees( $EVT_ID, $CAT_ID, $reg_status, $trash, $orderby, $sort, $limit, $output );
		if ( isset( $all_attendees[0] ) && isset( $all_attendees[0]->event_name )) {
			//printr( $all_attendees[0], '$all_attendees[0]  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
			// name
			$event_name = isset( $all_attendees[0]->event_name ) ? $all_attendees[0]->event_name : '';
			$event_date = isset( $all_attendees[0]->DTT_EVT_start ) ? date( 'l F j, Y,    g:i:s a', $all_attendees[0]->DTT_EVT_start ) : '';
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
			<span class="admin-page-header-edit-lnk not-bold">' . $back_2_reg_lnk . '</span>
		</div>
		';
		}

		return $all_attendees;
	}





	/**
	 * 		generates HTML for the Attendee Contact List
	*		@access protected
	*		@return void
	*/
	protected function _attendee_contact_list_table() {
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
		$this->_admin_page_title .= $this->_get_action_link_or_button('add_new_attendee', 'add-attendee', array(), 'button add-new-h2');
		$this->display_admin_list_table_page_with_no_sidebar();
	}





	/**
	 * 		get_attendees
	 * 		@param bool $count whether to return count or data.
	*		@access public
	*		@return array
	*/
	public function get_attendees( $per_page, $count = FALSE, $trash = FALSE ) {  

		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
		// start with an empty array
		$attendees = array();
		
		require_once( REG_ADMIN . 'EE_Attendee_Contact_List_Table.class.php' );
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Attendee.model.php');
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


		$offset = ($current_page-1)*$per_page;
		$limit = array( $offset, $per_page );

		if ( $trash )
			$all_attendees = $count ? $ATT_MDL->get_all_trashed_attendees( $orderby, $sort, $limit, 'COUNT' ) : $ATT_MDL->get_all_trashed_attendees( $orderby, $sort, $limit );
		else
			$all_attendees = $count ? $ATT_MDL->get_all_inuse_attendees( $orderby, $sort, $limit, 'COUNT' ) : $ATT_MDL->get_all_inuse_attendees( $orderby, $sort, $limit );

		return $all_attendees;
	}






	/**
	 * 		_attendee_check_in
	*		@access public
	*		@return void
	*/
	public function _attendee_check_in( ) {	
		 $this->_toggle_attendee_check_in_status( TRUE );
	}





	/**
	 * 		_attendee_check_out
	*		@access public
	*		@return void
	*/
	public function _attendee_check_out( ) {	
		 $this->_toggle_attendee_check_in_status( FALSE );
	}





	/**
	 * This is just taking care of resending the registration confirmation
	 *
	 * @access protected
	 * @return void
	 */
	protected function _resend_registration() {
		$this->_process_resend_registration();
		$query_args = array(
			'action' => 'default'
		);
		$this->_redirect_after_action();
	}







	/**
	 * 		_attendee_check_in
	*		@access protected
	*		@param boolean 	$check_in
	*		@return void
	*/
	private function _toggle_attendee_check_in_status( $REG_att_checked_in = FALSE ) {
		
		// bulk action check in toggle
		if ( ! empty( $this->_req_data['checkbox'] ) && is_array( $this->_req_data['checkbox'] )) {
			
			$success = TRUE;
			// if array has more than one element than success message should be plural
			$success = count( $this->_req_data['checkbox'] ) > 1 ? 2 : 1;
			// cycle thru checkboxes 
			while ( list( $REG_ID, $value ) = each($this->_req_data['checkbox'])) {
				if ( ! EEM_Registration::instance()->update( array( 'REG_att_checked_in' => $REG_att_checked_in ), array( 'REG_ID' => absint( $REG_ID )))) {
					$success = FALSE;
				}
			}
			
		} elseif ( $REG_ID = ! empty($this->_req_data['id']) ? $this->_req_data['id'] : FALSE ) {
			
			$success = FALSE;
			//echo '<h4>$REG_ID : ' . $REG_ID . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
			$REG_url_link = ! empty($this->_req_data['_REG_ID']) ? sanitize_text_field( $this->_req_data['_REG_ID'] ) : FALSE;
			//$REG_att_checked_in = ! empty($this->_req_data['check_in']) ? absint( $this->_req_data['check_in'] ) : 0;
			
			if ( $REG = EEM_Registration::instance()->get_one( array( 'REG_ID' => absint( $REG_ID ), 'REG_url_link' => $REG_url_link ))) {
				//echo '<h4>$REG ID : ' . $REG->ID() . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
				if ( $REG->set_att_checked_in( $REG_att_checked_in )) {
					//echo '<h1>set_att_checked_in<br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h1>';
					$success = $REG->update();
				}
			}		
				
		} else {
			$success = FALSE;
		}

		$EVT_ID = isset($this->_req_data['event_id']) ? absint( $this->_req_data['event_id'] ) : FALSE;

		//echo '<h4>$success : ' . $success . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
		$this->_redirect_after_action( $success, __( 'Attendee Check In Status', 'event_espresso' ), __( 'updated', 'event_espresso' ), array( 'action' => 'event_registrations', 'event_id' => $EVT_ID ));
		
	}






	/***************************************		ATTENDEE DETAILS 		***************************************/





	/**
	 * 		_attendee_details
	*		@access protected
	*		@return void
	*/
	protected function _edit_attendee_details( $new = FALSE ) {		
	
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
		
		$ATT_ID = isset( $this->_req_data['id'] ) && ! empty( $this->_req_data['id'] ) ? absint( $this->_req_data['id'] ) : FALSE;

		$title = __( ucwords( str_replace( '_', ' ', $this->_req_action )), 'event_espresso' );
		// add ATT_ID to title if editing 
		$title = $ATT_ID ? $title . ' # ' . $ATT_ID : $title;

		// get attendees
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Attendee.model.php');
		$ATT_MDL = EEM_Attendee::instance();

		if ( $ATT_ID ) {
		
			$attendee = $ATT_MDL->get_attendee_by_ID( $ATT_ID );
			$action = 'update_attendee';
			
		} else {
			$attendee = new EE_Attendee();
			$action = 'insert_attendee';
		}

		$this->_set_add_edit_form_tags($action);

		
		$this->_template_args['ATT_ID'] = $ATT_ID;
		$this->_template_args['attendee_fname'] = html_entity_decode( stripslashes( $attendee->fname() ), ENT_QUOTES, 'UTF-8' );
		$this->_template_args['attendee_lname'] = html_entity_decode( stripslashes( $attendee->lname() ), ENT_QUOTES, 'UTF-8' );
		$this->_template_args['attendee_email'] = $attendee->email();
		$this->_template_args['attendee_phone'] = $attendee->phone();
		$this->_template_args['attendee_address'] = html_entity_decode( stripslashes( $attendee->address() ), ENT_QUOTES, 'UTF-8' );
		$this->_template_args['attendee_address2'] = html_entity_decode( stripslashes( $attendee->address2() ), ENT_QUOTES, 'UTF-8' );
		$this->_template_args['attendee_city'] = html_entity_decode( stripslashes( $attendee->city() ), ENT_QUOTES, 'UTF-8' );		
		$this->_template_args['attendee_state_ID'] = $attendee->state_ID();
		$this->_template_args['attendee_country_ISO'] = $attendee->country_ISO();
		$this->_template_args['attendee_zip'] = $attendee->zip();
		$this->_template_args['attendee_social'] = html_entity_decode( stripslashes( $attendee->social() ), ENT_QUOTES, 'UTF-8' );
		$this->_template_args['attendee_comments'] = html_entity_decode( stripslashes( $attendee->comments() ), ENT_QUOTES, 'UTF-8' );
		$this->_template_args['attendee_notes'] = html_entity_decode( stripslashes( $attendee->notes() ), ENT_QUOTES, 'UTF-8' );


		//get list of all registrations for this attendee
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Registration.model.php');
		$REG_MDL = EEM_Registration::instance();		
		if ( $this->_template_args['registrations'] = $REG_MDL->get_all_registrations_for_attendee( $ATT_ID )) {
			$this->_template_path = REG_TEMPLATE_PATH . 'attendee_registrations_main_meta_box.template.php';
			$meta_box_args['template_path'] = $this->_template_path;
			$meta_box_args['template_args'] = $this->_template_args;
			$this->_add_admin_page_meta_box( 'attendee_registrations_meta_', __( 'Event Registrations for this Attendee', 'event_espresso' ), 'attendee_registrations', $meta_box_args );
		}
		
		// generate metabox - you MUST create a callback named __FUNCTION__ . '_meta_box'  ( see "_edit_attendee_details_meta_box" below )
		$this->_template_path = REG_TEMPLATE_PATH . 'attendee_details_main_meta_box.template.php';
		//$this->_add_admin_page_meta_box( $action, $title, 'edit_attendee_details', NULL );
		$this->_template_args['admin_page_content'] = espresso_display_template($this->_template_path, $this->_template_args, TRUE);

		$this->_set_publish_post_box_vars( 'id', $ATT_ID, 'delete_attendees' );

		// the final template wrapper
		$this->display_admin_page_with_sidebar();
		
	}










	/**
	 * 		insert_or_update_attendee
	*		@param boolean 		$new_attendee - whether to insert or update
	*		@access protected
	*		@return void
	*/
	protected function _insert_or_update_attendee( $new_attendee = FALSE ) {

		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );

		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Attendee.model.php');
		$ATT_MDL = EEM_Attendee::instance();
		
		//printr( $this->_req_data ); die();
		
		// why be so pessimistic ???  : (
		$success = 0;
		//create attendee object
		$attendee = new EE_Attendee(
						$this->_req_data['ATT_fname'],
						$this->_req_data['ATT_lname'],
						$this->_req_data['ATT_address'],
						$this->_req_data['ATT_address2'],
						$this->_req_data['ATT_city'],
						$this->_req_data['STA_ID'],
						$this->_req_data['CNT_ISO'],
						$this->_req_data['ATT_zip'],
						$this->_req_data['ATT_email'],
						$this->_req_data['ATT_phone'],
						$this->_req_data['ATT_social'],
						$this->_req_data['ATT_comments'],
						$this->_req_data['ATT_notes'],
						isset($this->_req_data['ATT_deleted']) ? $this->_req_data['ATT_deleted'] : 0,
						$this->_req_data['ATT_ID']
				);
				
		// is this a new Attendee ?
		if ( $new_attendee ) {
			// run the insert
			if ( $attendee->insert() ) {
				$success = 1;
			} 
			$action_desc = __( 'created', 'event_espresso' );
		} else {
			// run the update
			if ( $attendee->update() ) {
				$success = 1;
			}
			$action_desc = __( 'updated', 'event_espresso' );
		}
		
		$this->_redirect_after_action( $success, __( 'Attendee', 'event_espresso' ), $action_desc, array( 'action' => 'edit_attendee', 'id' => $this->_req_data['ATT_ID'] ) );
			
	}
 




	/**
	 * 		_trash_or_restore_attendee
	*		@param boolean 		$trash - whether to move item to trash (TRUE) or restore it (FALSE)
	*		@access protected
	*		@return void
	*/
	protected function _trash_or_restore_attendees( $trash = TRUE ) {
	
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );

		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Attendee.model.php');
		$ATT_MDL = EEM_Attendee::instance();
	
		$success = 1;
		$ATT_deleted = $trash ? TRUE : FALSE;
		//Checkboxes
		if (!empty($this->_req_data['checkbox']) && is_array($this->_req_data['checkbox'])) {
			// if array has more than one element than success message should be plural
			$success = count( $this->_req_data['checkbox'] ) > 1 ? 2 : 1;
			// cycle thru checkboxes 
			while (list( $ATT_ID, $value ) = each($this->_req_data['checkbox'])) {
				if ( ! $ATT_MDL->update(array('ATT_deleted' => $ATT_deleted), array('ATT_ID' => absint($ATT_ID)))) {
					$success = 0;
				}
			}
			
		} else {
			// grab single id and delete
			$ATT_ID = absint($this->_req_data['id']);
			if ( ! $ATT_MDL->update(array('ATT_deleted' => $ATT_deleted), array('ATT_ID' => absint($ATT_ID)))) {
				$success = 0;
			}
			
		}

		$what = $success > 1 ? __( 'Attendees', 'event_espresso' ) : __( 'Attendee', 'event_espresso' );
		$action_desc = $trash ? __( 'moved to the trash', 'event_espresso' ) : __( 'restored', 'event_espresso' );
		$this->_redirect_after_action( $success, $what, $action_desc, array() );
		
	}






	/**
	 * 		_delete_attendee
	*		@access protected
	*		@return void
	*/
	protected function _delete_attendees() {
	
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );

		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Attendee.model.php');
		$ATT_MDL = EEM_Attendee::instance();
		
		$success = 1;
		//Checkboxes
		if ( ! empty($this->_req_data['checkbox']) && is_array( $this->_req_data['checkbox'] )) {
			// if array has more than one element than success message should be plural
			$success = count( $this->_req_data['checkbox'] ) > 1 ? 2 : 1;
			// cycle thru bulk action checkboxes
			while ( list( $ATT_ID, $value ) = each( $this->_req_data['checkbox'] )) {
				if ( ! $ATT_MDL->delete_attendee_by_ID( absint( $ATT_ID ))) {
					$success = 0;
				}
			}
	
		} else {
			// grab single id and delete
			$ATT_ID = absint( $this->_req_data['id'] );
			if ( ! $ATT_MDL->delete_attendee_by_ID( $ATT_ID )) {
				$success = 0;
			}
			
		}
		$what = $success > 1 ? __( 'Attendees', 'event_espresso' ) : __( 'Attendee', 'event_espresso' );
		$this->_redirect_after_action( $success, $what, __( 'deleted', 'event_espresso' ), array() );
		
	}





	/***************************************		REPORTS 		***************************************/






	/**
	 * 		generates Business Reports regarding Registrations
	*		@access protected
	*		@return void
	*/
	protected function _registration_reports() {

		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');
	
		$page_args = array();
		
		$page_args['admin_reports'][] = $this->_registrations_per_day_report( '-1 month' );  //  option: '-1 week', '-2 weeks' defaults to '-1 month'
		$page_args['admin_reports'][] = $this->_get_registrations_per_event_report( '-1 month' ); //  option: '-1 week', '-2 weeks' defaults to '-1 month'
//		$page_args['admin_reports'][] = 'chart1';
		
		$template_path = EE_CORE_ADMIN_TEMPLATE . 'admin_reports.template.php';
		$this->_template_args['admin_page_content'] = espresso_display_template( $template_path, $page_args, TRUE );
		
//		printr( $page_args, '$page_args' );
		
		// the final template wrapper
		$this->display_admin_page_with_no_sidebar();

	}






	/**
	 * 		generates Business Report showing total registratiopns per day
	*		@access private
	*		@return void
	*/
	private function _registrations_per_day_report( $period = '-1 month' ) {
	
		$report_ID = 'reg-admin-registrations-per-day-report-dv';
		$report_JS = 'espresso_reg_admin_regs_per_day';
		
		wp_enqueue_script( $report_JS, REG_ASSETS_URL . $report_JS . '_report.js', array('jquery', 'jqplot'), EVENT_ESPRESSO_VERSION, TRUE);

		require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Registration.model.php' );
	    $REG = EEM_Registration::instance();
	 
		if( $results = $REG->get_registrations_per_day_report( $period ) ) {		
			//printr( $results, '$registrations_per_day' );
			$regs = array();
			$xmin = date( 'Y-m-d', strtotime( '+1 year' ));
			$xmax = 0;
			$ymax = 0;
			foreach ( $results as $result ) {
				$regs[] = array( $result->regDate, (int)$result->total );
				$xmin = strtotime( $result->regDate ) < strtotime( $xmin ) ? $result->regDate : $xmin;
				$xmax = strtotime( $result->regDate ) > strtotime( $xmax ) ? $result->regDate : $xmax;
				$ymax = $result->total > $ymax ? $result->total : $ymax;
			}
			
			$xmin = date( 'Y-m-d', strtotime( date( 'Y-m-d', strtotime($xmin)) . ' -1 day' ));			
			$xmax = date( 'Y-m-d', strtotime( date( 'Y-m-d', strtotime($xmax)) . ' +1 day' ));
			// calculate # days between our min and max dates				
			$span = floor( (strtotime($xmax) - strtotime($xmin)) / (60*60*24)) + 1;
			
			$report_params = array(
														'title' 	=> __( 'Total Registrations per Day', 'event_espresso' ),
														'id' 		=> $report_ID,
														'regs' 	=> $regs,												
														'xmin' 	=> $xmin,
														'xmax' 	=> $xmax,
														'ymax' 	=> ceil($ymax * 1.25),
														'span' 	=> $span,
														'width'	=> ceil(900 / $span)												
													);
			wp_localize_script( $report_JS, 'regPerDay', $report_params );
		}
												
		return $report_ID;
	}






	/**
	 * 		generates Business Report showing total registratiopns per event
	*		@access private
	*		@return void
	*/
	private function _get_registrations_per_event_report( $period = '-1 month' ) {
	
		$report_ID = 'reg-admin-registrations-per-event-report-dv';
		$report_JS = 'espresso_reg_admin_regs_per_event';
		
		wp_enqueue_script( $report_JS, REG_ASSETS_URL . $report_JS . '_report.js', array('jquery', 'jqplot'), '1.0', TRUE);

		require_once ( EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Registration.model.php' );
	    $REG = EEM_Registration::instance();
	 
		if( $results = $REG->get_registrations_per_event_report( $period ) ) {		
			//printr( $results, '$registrations_per_event' );
			$regs = array();
			$limits = array();
			$ymax = 0;
			foreach ( $results as $result ) {
				$regs[] = array( $result->event_name, (int)$result->total );
				$ymax = $result->total > $ymax ? $result->total : $ymax;
			}	

			$span = $period == 'week' ? 9 : 33;

			$report_params = array(
														'title' 	=> __( 'Total Registrations per Event', 'event_espresso' ),
														'id' 		=> $report_ID,
														'regs' 	=> $regs,												
														'limits' => $limits,												
														'ymax' 	=> ceil($ymax * 1.25),
														'span' 	=> $span,
														'width'	=> ceil(900 / $span)								
													);
			wp_localize_script( $report_JS, 'regPerEvent', $report_params );		
		}

		return $report_ID;
	}





	



}



// end of file:  includes/core/admin/transactions/Registrations_Admin_Page.core.php