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
		$this->page_label = __('Registrations', 'event_espresso');
	}





	protected function _ajax_hooks() {
		//todo: all hooks for registrations ajax goes in here
		add_action( 'AHEE_attendee_check_in', array( $this, '_attendee_check_in' ));
	}





	protected function  _define_page_props() {
		$this->_admin_base_url = REG_ADMIN_URL;
		$this->_admin_page_title = $this->page_label;
		$this->_labels = array(
			'buttons' => array(
					'add-registrant' => __('Register New Attendee', 'event_espresso'),
					'add-attendee' => __('Add New Attendee Contact Info', 'event_espresso'),
					'edit' => __('Edit Attendee', 'event_espresso'),
					'delete' => __('Delete Attendee', 'event_espresso'),
					'report'=>  __("Registrations CSV Report", "event_espresso")
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
					
				'approve_registration'	=> array(
						'func' => 'approve_registration',
						'noheader' => TRUE
					),
					
				'decline_registration'	=> array(
						'func' => 'decline_registration',
						'noheader' => TRUE
					),
					
				'pending_registration'	=> array(
						'func' => 'activate_registration',
						'noheader' => TRUE
					),
					
				'activate_registration'	=> array(
						'func' => 'activate_registration',
						'noheader' => TRUE
					),
					
				'cancel_registration'	=> array(
						'func' => 'cancel_registration',
						'noheader' => TRUE
					),

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
				
				'restore_attendees'	=> array( 
					'func' => '_trash_or_restore_attendees', 
					'args' => array( 
						'trash' => FALSE 
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
					),
				'registrations_report'=>array(
					'func'=>'_registrations_report',
					'noheader'=> TRUE
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
					'persistent' => true
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
					'url' => isset($this->_req_data['ATT_ID']) ? add_query_arg(array('ATT_ID' => $this->_req_data['ATT_ID'] ), $this->_current_page_view_url )  : $this->_admin_base_url
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
		;
		EE_Registry::$i18n_js_strings['update_att_qstns'] = __( 'click "Update Attendee Questions" to save your changes', 'event_espresso' );
		wp_localize_script( 'espresso_reg', 'eei18n', EE_Registry::$i18n_js_strings );
	}






	public function load_scripts_styles_contact_list() {
		wp_deregister_style('espresso_reg');
		wp_register_style('espresso_att', REG_ASSETS_URL . 'espresso_attendees_admin.css', array('ee-admin-css'), EVENT_ESPRESSO_VERSION );
		wp_enqueue_style('espresso_att');
	}





	public function load_scripts_styles_new_registration() {
		wp_register_script( 'espresso-validate-new-reg', REG_ASSETS_URL . 'espresso-validate-new-reg.js', array('jquery-validate'), EVENT_ESPRESSO_VERSION, TRUE);
		wp_enqueue_script('espresso-validate-new-reg');
	}









	protected function _set_list_table_views_default() {
		$this->_views = array(
			'all' => array(
				'slug' => 'all',
				'label' => __('All Registrations', 'event_espresso'),
				'count' => 0,
				'bulk_action' => array(
					'approve_registration' => __('Approve Registrations', 'event_espresso'),
					'decline_registration' => __('Decline Registrations', 'event_espresso'),
					'pending_registration' => __('Set Registrations to Pending', 'event_espresso'),
					'activate_registration' => __('Activate Registrations', 'event_espresso'),
					'cancel_registration' => __('Cancel Registrations', 'event_espresso')
					)
				),
			'month' => array(
				'slug' => 'month',
				'label' => __('This Month', 'event_espresso'),
				'count' => 0,
				'bulk_action' => array(
					'approve_registration' => __('Approve Registrations', 'event_espresso'),
					'decline_registration' => __('Decline Registrations', 'event_espresso'),
					'pending_registration' => __('Set Registrations to Pending', 'event_espresso'),
					'activate_registration' => __('Activate Registrations', 'event_espresso'),
					'cancel_registration' => __('Cancel Registrations', 'event_espresso')
					)
				),
			'today' => array(
				'slug' => 'today',
				'label' => sprintf( __('Today - %s', 'event_espresso'), date('M d, Y', current_time('timestamp', 0) ) ),
				'count' => 0,
				'bulk_action' => array(
					'approve_registration' => __('Approve Registrations', 'event_espresso'),
					'decline_registration' => __('Decline Registrations', 'event_espresso'),
					'pending_registration' => __('Set Registrations to Pending', 'event_espresso'),
					'activate_registration' => __('Activate Registrations', 'event_espresso'),
					'cancel_registration' => __('Cancel Registrations', 'event_espresso')
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
			$this->_admin_page_title .= $this->get_action_link_or_button( 'new_registration', 'add-registrant', array( 'event_id' => $EVT_ID ), 'button add-new-h2' );
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
				$orderby = 'Datetime.DTT_EVT_start';
				break;
			default: //'REG_date'
				$orderby = 'REG_date';
		}

		$sort = ( isset( $this->_req_data['order'] ) && ! empty( $this->_req_data['order'] )) ? $this->_req_data['order'] : 'DESC';
		$current_page = isset( $this->_req_data['paged'] ) && !empty( $this->_req_data['paged'] ) ? $this->_req_data['paged'] : 1;
		$per_page = isset( $this->_req_data['perpage'] ) && !empty( $this->_req_data['perpage'] ) ? $this->_req_data['perpage'] : $per_page;

		$offset = ($current_page-1)*$per_page;
		$limit = array( $offset, $per_page );
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
					strtotime( $this_month_r . ' 01 ' . $this_year_r . ' ' . $time_start ),
					strtotime( $this_month_r . ' ' . $days_this_month . ' ' . $this_year_r . ' ' . $time_end ) 
			));
		}elseif($month_range){
			$pieces = explode('-', $month_range, 3);
			$year_r = $pieces[0];
			$month_r = $pieces[1];
			$_where['REG_date']= array('BETWEEN',
				array(
					$month_r . ' 01 ' . $this_year_r . ' ' . $time_start ,
					$month_r . ' ' . date( 't', strtotime( $year_r . ' ' . $month_r )) . ' ' . $year_r . ' ' . $time_end 
			));	
		}elseif($start_date && $end_date){
			throw new EE_Error("not yet supported");
		}elseif($start_date){
			throw new EE_Error("not yet supported");
		}elseif($end_date){
			throw new EE_Error("not yet supported");
		}
		
		if($count){
			return EEM_Registration::instance()->count(array($_where));
		}else{
			$query_params = array( $_where, 'order_by' => array( $orderby => $sort ), 'limit' => $limit );
			$registrations = EEM_Registration::instance()->get_all($query_params);
	

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

			$this->_template_args['reg_status']['value'] = str_replace( '_', ' ', self::$_reg_status[ $this->_registration->status_ID() ] );
			$this->_template_args['reg_status']['label'] = __( 'Registration Status', 'event_espresso' );
			$this->_template_args['reg_status']['class'] = 'status-' . $this->_registration->status_ID();
			
			$this->_template_args['approve_decline_reg_status_buttons'] = $this->_set_approve_or_decline_reg_status_buttons();

			$this->_template_args['grand_total'] = $transaction->total();

			$this->_template_args['currency_sign'] = EE_Registry::instance()->CFG->currency->sign;
			// link back to overview
			$this->_template_args['reg_overview_url'] = REG_ADMIN_URL;	

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
		add_meta_box( 'edit-reg-questions-mbox', __( 'Attendee\'s Registration Form', 'event_espresso' ), array( $this, '_reg_questions_meta_box' ), $this->wp_page_slug, 'normal', 'high' );
		add_meta_box( 'edit-reg-registrant-mbox', __( 'Attendee Details', 'event_espresso' ), array( $this, '_reg_registrant_side_meta_box' ), $this->wp_page_slug, 'side', 'high' );
		if ( $this->_registration->group_size() > 1 ) {
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
		
//		$reg_status_array = EEM_Registration::reg_status_array();
//		printr( $reg_status_array, '$reg_status_array  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

		if ( $this->_set_registration_object() ) {
			switch ( $this->_registration->status_ID() ) {
				
				case 'RAP' :
					$pending_url = self::add_query_args_and_nonce( array( 'action'=>'pending_registration', '_REG_ID'=>$this->_registration->ID() ), REG_ADMIN_URL );
					$decline_url = self::add_query_args_and_nonce( array( 'action'=>'decline_registration', '_REG_ID'=>$this->_registration->ID() ), REG_ADMIN_URL );
					$cancel_url = self::add_query_args_and_nonce( array( 'action'=>'cancel_registration', '_REG_ID'=>$this->_registration->ID() ), REG_ADMIN_URL );
					$approve_decline_reg_status_buttons = '
			<a id="reg-admin-pending-reg-status-lnk" class="button-secondary" href="' . $pending_url . '" title="' . __( 'Set Registration Status to Pending', 'event_espresso' ) . '">
				' . __( 'Set this Registration to Pending', 'event_espresso' ) . '
			</a>
			<a id="reg-admin-decline-reg-status-lnk" class="button-secondary" href="' . $decline_url . '" title="' . __( 'Set Registration Status to Not Approved', 'event_espresso' ) . '">
				' . __( 'Decline this Registration', 'event_espresso' ) . '
			</a>
			<a id="reg-admin-cancel-reg-status-lnk" class="button-secondary" href="' . $cancel_url . '" title="' . __( 'Set Registration Status to Cancelled', 'event_espresso' ) . '">
				' . __( 'Cancel this Registration', 'event_espresso' ) . '
			</a>';
					break;
				
				case 'RPN' :
					$aprove_url = self::add_query_args_and_nonce( array( 'action'=>'approve_registration', '_REG_ID'=>$this->_registration->ID() ), REG_ADMIN_URL );
					$decline_url = self::add_query_args_and_nonce( array( 'action'=>'decline_registration', '_REG_ID'=>$this->_registration->ID() ), REG_ADMIN_URL );
					$cancel_url = self::add_query_args_and_nonce( array( 'action'=>'cancel_registration', '_REG_ID'=>$this->_registration->ID() ), REG_ADMIN_URL );
					$approve_decline_reg_status_buttons = '
			<a id="reg-admin-approve-reg-status-lnk" class="espresso-button-green button-primary" href="' . $aprove_url . '" title="' . __( 'Set Registration Status to Approved', 'event_espresso' ) . '">
				' . __( 'Approve this Registration', 'event_espresso' ) . '
			</a>
			<a id="reg-admin-decline-reg-status-lnk" class="button-secondary" href="' . $decline_url . '" title="' . __( 'Set Registration Status to Not Approved', 'event_espresso' ) . '">
				' . __( 'Decline this Registration', 'event_espresso' ) . '
			</a>
			<a id="reg-admin-cancel-reg-status-lnk" class="button-secondary" href="' . $cancel_url . '" title="' . __( 'Set Registration Status to Cancelled', 'event_espresso' ) . '">
				' . __( 'Cancel this Registration', 'event_espresso' ) . '
			</a>';
					break;
				
				case 'RNA' :
					$aprove_url = self::add_query_args_and_nonce( array( 'action'=>'approve_registration', '_REG_ID'=>$this->_registration->ID() ), REG_ADMIN_URL );
					$pending_url = self::add_query_args_and_nonce( array( 'action'=>'pending_registration', '_REG_ID'=>$this->_registration->ID() ), REG_ADMIN_URL );
					$cancel_url = self::add_query_args_and_nonce( array( 'action'=>'cancel_registration', '_REG_ID'=>$this->_registration->ID() ), REG_ADMIN_URL );
					$approve_decline_reg_status_buttons = '
			<a id="reg-admin-approve-reg-status-lnk" class="espresso-button-green button-primary" href="' . $aprove_url . '" title="' . __( 'Set Registration Status to Approved', 'event_espresso' ) . '">
				' . __( 'Approve this Registration', 'event_espresso' ) . '
			</a>
			<a id="reg-admin-pending-reg-status-lnk" class="button-secondary" href="' . $pending_url . '" title="' . __( 'Set Registration Status to Pending', 'event_espresso' ) . '">
				' . __( 'Set this Registration to Pending', 'event_espresso' ) . '
			</a>
			<a id="reg-admin-cancel-reg-status-lnk" class="button-secondary" href="' . $cancel_url . '" title="' . __( 'Set Registration Status to Cancelled', 'event_espresso' ) . '">
				' . __( 'Cancel this Registration', 'event_espresso' ) . '
			</a>';
					break;
				
				case 'RCN' :
					$activate_url = self::add_query_args_and_nonce( array( 'action'=>'activate_registration', '_REG_ID'=>$this->_registration->ID() ), REG_ADMIN_URL );
					$approve_decline_reg_status_buttons = '
			<a id="reg-admin-cancel-reg-status-lnk" class="button-secondary" href="' . $activate_url . '" title="' . __( 'Set Registration Status to Pending', 'event_espresso' ) . '">
				' . __( 'Reactivate this Registration', 'event_espresso' ) . '
			</a>';
					break;
				
			}		
		}
		
		return $approve_decline_reg_status_buttons;
		
	}







	/**
	 * 		_set_registration_status
	*		@access private
	*		@return void
	*/
	private function _set_registration_status( $REG_ID = FALSE, $status = FALSE ) {
		$success = FALSE;
		// set default status if none is passed
		$status = $status ? $status : EEM_Registration::status_id_pending;
		// have we been passed a REG_ID ?
		if ( ! absint( $REG_ID )) {
			// no ? then check for one in the req data
			$REG_ID = isset( $this->_req_data['_REG_ID'] ) ? absint( $this->_req_data['_REG_ID'] ) : $REG_ID;
		}
		// still don't have one?
		if ( ! $REG_ID ) {
			// then check req data for an array of REG_IDs
			$REG_IDs = isset( $this->_req_data['REG_ID'] ) ? (array) $this->_req_data['REG_ID'] : array();
			$success = TRUE;
			// loop thru REG_IDs and set each reg status separately
			foreach ( $REG_IDs as $REG_ID ) {
				$result = $this->_set_registration_status( $REG_ID, $status );
				$success = isset( $result['success'] ) && $result['success'] ? $success : FALSE;
				if ( $success && $status == EEM_Registration::status_id_approved ) {
					$this->_req_data['_REG_ID'] = $REG_ID;
					$this->_process_resend_registration();
				}
			}
			$REG_ID = FALSE;
		}
		if ( $REG_ID ) {
			//echo '<h4>$REG_ID : ' . $REG_ID . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
			$registration = EEM_Registration::instance()->get_one_by_ID( $REG_ID );
			$success = $registration->set_status( $status );
			$registration->save();
			//printr( $registration, '$registration  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		} 
		return array( 'REG_ID' => $REG_ID, 'success' => $success );
	}



	/**
	 * 		approve_registration
	*		@access protected
	*		@return void
	*/
	protected function approve_registration() {
		$result = $this->_set_registration_status( FALSE, EEM_Registration::status_id_approved );
		$success = isset( $result['success'] ) && $result['success'] ? TRUE : FALSE;
		$route = isset( $result['REG_ID'] ) && absint( $result['REG_ID'] ) ? array( 'action' => 'view_registration', '_REG_ID' => absint( $result['REG_ID'] )) : array( 'action' => 'default' );
		$this->_redirect_after_action( $success, 'Attendee Registration Status', 'approved', $route );
	}



	/**
	 * 		decline_registration
	*		@access protected
	*		@return void
	*/
	protected function decline_registration() {
		$result = $this->_set_registration_status( FALSE, EEM_Registration::status_id_not_approved );
		$success = isset( $result['success'] ) && $result['success'] ? TRUE : FALSE;
		$route = isset( $result['REG_ID'] ) && absint( $result['REG_ID'] ) ? array( 'action' => 'view_registration', '_REG_ID' => absint( $result['REG_ID'] )) : array( 'action' => 'default' );
		$this->_redirect_after_action( $success, 'Attendee Registration Status', 'set to not approved', $route );
	}



	/**
	 * 		activate_registration
	*		@access protected
	*		@return void
	*/
	protected function activate_registration() {
		$result = $this->_set_registration_status( FALSE, EEM_Registration::status_id_pending );
		$success = isset( $result['success'] ) && $result['success'] ? TRUE : FALSE;
		$route = isset( $result['REG_ID'] ) && absint( $result['REG_ID'] ) ? array( 'action' => 'view_registration', '_REG_ID' => absint( $result['REG_ID'] )) : array( 'action' => 'default' );
		$this->_redirect_after_action( $success, 'Attendee Registration Status', 'set to pending', $route );
	}



	/**
	 * 		cancel_registration
	*		@access protected
	*		@return void
	*/
	protected function cancel_registration() {
		$result = $this->_set_registration_status( FALSE, EEM_Registration::status_id_cancelled );
		$success = isset( $result['success'] ) && $result['success'] ? TRUE : FALSE;
		$route = isset( $result['REG_ID'] ) && absint( $result['REG_ID'] ) ? array( 'action' => 'view_registration', '_REG_ID' => absint( $result['REG_ID'] )) : array( 'action' => 'default' );
		$this->_redirect_after_action( $success, 'Attendee Registration Status', 'set to cancelled', $route );
	}








	/**
	 * 		set reg status to approved
	*		@access public
	*		@param string	$REG_status
	*		@return void
	*/
//	public function _approve_or_decline_reg_status( $REG_status = FALSE ) {
//		$override = FALSE;
//		$success = FALSE;
//		$REG_ID = ( ! empty( $this->_req_data['_REG_ID'] )) ? absint( $this->_req_data['_REG_ID'] ) : FALSE;			
//		if ( $REG_ID && array_key_exists( $REG_status, self::$_reg_status )) {
//			if ( $registration = EEM_Registration::instance()->get_registration_by_ID( $REG_ID )) {
//				$registration->set_status( $REG_status );
//				$success = $registration->update();		
//			}
//		}
//
//		if ( $success && $REG_status == 'RAP' ) {
//			$override = TRUE;
//			EE_Error::overwrite_success();
//			$this->_process_resend_registration();
//		}
//		
//		$what = 'Attendee Registration Status';
//		$route = $REG_ID ? array( 'action' => 'view_registration', '_REG_ID' => $REG_ID ) : array( 'action' => 'default' );
//		$this->_redirect_after_action( $success, $what, 'updated', $route, $override );
//	}







	/**
	 * 		generates HTML for the Registration main meta box
	*		@access public
	*		@return void
	*/
	public function _reg_details_meta_box() {
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

		$transaction = $this->_registration->transaction() ? $this->_registration->transaction() : EE_Transaction::new_instance();

		// process taxes
		if ( $transaction ) {
			$taxes = $transaction->tax();
			$this->_template_args['taxes'] = isset( $taxes['taxes'] ) ? $taxes['taxes'] : FALSE;
		} else {
			$this->_template_args['taxes'] = FALSE;
		}

		$this->_template_args['grand_total'] = EEH_Template::format_currency( $transaction->total() );

		$this->_template_args['currency_sign'] = EE_Registry::instance()->CFG->currency->sign;
		$reg_status_class = 'status-' . $this->_registration->status_ID();
		$reg_details = maybe_unserialize( $transaction->details() );


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
	 * 		generates HTML for the Registration Attendee Questions meta box
	*		@access public
	*		@return void
	*/
	public function _reg_questions_meta_box() {		
		//we also need to get the answers to the questions from this registration.
		$_where = array(
			'REG_ID' => $this->_registration->ID()
			);
		$query_params = array( $_where, 'order_by' => 'Question.QST_order');
		$ANS = EEM_Answer::instance()->get_all( $query_params );

		add_filter( 'FHEE_form_before_question_group_questions', array( $this, 'form_before_question_group' ), 10, 1 );
		add_filter( 'FHEE_form_after_question_group_questions', array( $this, 'form_after_question_group' ), 10, 1 );	
		add_filter( 'FHEE_form_field_label_html', array( $this, 'form_form_field_label_wrap' ), 10, 1 );
		add_filter( 'FHEE_form_field_input_html', array( $this, 'form_form_field_input__wrap' ), 10, 1 );
		
		$question_groups = EEM_Event::instance()->assemble_array_of_groups_questions_and_options( $ANS );

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
		$REG_ID = isset( $this->_req_data['REG_ID'] ) ? absint( $this->_req_data['REG_ID'] ) : FALSE;
		$qstns = apply_filters('FHEE_reg_admin_attendee_registration_form', $qstns);	
		$success = $this->_save_attendee_registration_form( $REG_ID, $qstns );
		$what = __('Attendee Registration Form', 'event_espresso');
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
			EE_Error::add_error( __('An error occured. No registration ID and/or registration questions were received.', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
		}
		$success = TRUE;
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
			// and then get this registration's attendee details
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
						EE_Error::add_error( __('An error occured. An ID for the new attendee could not be retreived.', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
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
			foreach ( $qstn as $ANS_ID => $ANS_value ) {
				//get answer 
				$answer = EEM_Answer::instance()->get_one_by_ID($ANS_ID);
				$answer->set('ANS_value');
				$success = $answer->save();
			}
		}
		return $success;
	}





	/**
	 * 		generates HTML for the Attendees Registration main meta box
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
		$this->EE->load_helper('Array');
		if ( empty( $registrations)  || ( is_array($registrations) &&  ! EEH_Array::get_one_item_from_array($registrations) ) ) {
			EE_Error::add_error( __('There are no attendees attached to this registration. Something may have gone wrong with the registration', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
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
				
				$this->_template_args['attendees'][ $att_nmbr ]['att_link'] = self::add_query_args_and_nonce( array( 'action'=>'edit_attendee', 'ATT_ID'=>$attendee->ID() ), REG_ADMIN_URL );
				
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
		$attendee = $this->_registration->attendee() ? $this->_registration->attendee() : EE_Attendee::new_instance();
		
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
		$this->_template_args['social'] = $attendee->social();
		$this->_template_args['comments'] = $attendee->comments();
		$this->_template_args['notes'] = $attendee->notes();

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
		echo EEH_Template::display_template( $template_path, $this->_template_args, TRUE );
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
		$this->EE->SSN->clear_session( __CLASS__, __FUNCTION__ );
		$this->_template_args['event_name'] = '' ;
		// event name
		if ( $this->_reg_event ) {
			$this->_template_args['event_name'] = stripslashes(  $this->_reg_event->event_name );
			$edit_event_url = self::add_query_args_and_nonce( array( 'action'=>'edit_event', 'EVT_ID'=>$this->_reg_event->id ), EVENTS_ADMIN_URL );	
			$edit_event_lnk = '<a href="'.$edit_event_url.'" title="' . __( 'Edit ', 'event_espresso' ) . stripslashes( $this->_reg_event->event_name ) . '">' . __( 'Edit Event', 'event_espresso' ) . '</a>';	
			$this->_template_args['event_name'] .= ' <span class="admin-page-header-edit-lnk not-bold">' . $edit_event_lnk . '</span>' ;
		}

		// grab header
		$template_path = REG_TEMPLATE_PATH . 'reg_admin_register_new_attendee.template.php';
		$this->_template_args['admin_page_header'] = EEH_Template::display_template( $template_path, $this->_template_args, TRUE );

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
		
		extract( $metabox['args'] );		
		
		if ( ! $this->_set_reg_event() ) {
			return FALSE;
		}

		$this->_reg_event->datetimes = EE_Registry::instance()->load_model( 'Datetime' )->get_all_event_dates( $EVT_ID );

		EE_Registry::instance()->load_class( 'Ticket_Prices', array(), FALSE, TRUE, TRUE );
		$TKT_PRCs = new EE_Ticket_Prices( $EVT_ID );
		$this->_reg_event->prices = $TKT_PRCs->get_all_final_event_prices();

		$this->_reg_event->currency_symbol = EE_Registry::instance()->CFG->currency->sign;

		$this->_reg_event->available_spaces = get_number_of_attendees_reg_limit( $EVT_ID, 'available_spaces' );
		$this->_reg_event->allow_multiple = FALSE;
		$this->_template_args['event'] = $this->_reg_event;
		
		// ticket selector
		EE_Registry::instance()->load_class( 'Ticket_Selector', array(), FALSE, TRUE, TRUE );
		echo EE_Ticket_Selector::init( $this->_reg_event, TRUE ); 
		echo '<br />';

	}





	/**
	 * 		generates HTML for the Register New Attendee Admin Page Questions
	*		@access private
	*		@return void
	*/
	public function _reg_new_att_questions_meta_box( $post, $metabox = array( 'args' => array()) ) {
		
		global $wpdb;	
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

		add_filter( 'FHEE_form_before_question_group_questions', array( $this, 'form_before_question_group' ), 10, 1 );
		add_filter( 'FHEE_form_after_question_group_questions', array( $this, 'form_after_question_group_new_reg' ), 10, 1 );	
		add_filter( 'FHEE_form_field_label_html', array( $this, 'form_form_field_label_wrap' ), 10, 1 );
		add_filter( 'FHEE_form_field_input_html', array( $this, 'form_form_field_input_wrap_new_reg' ), 10, 1 );

		$question_groups = EEM_Event::instance()->assemble_array_of_groups_questions_and_options( $QSGs, $QSTs, $QSOs );
		//printr( $question_groups, '$question_groups  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );

		EE_Registry::instance()->load_helper( 'Form_Fields' );
		echo EEH_Form_Fields::generate_question_groups_html( $question_groups );

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
		EE_Registry::instance()->load_class( 'Ticket_Selector', array(), FALSE, TRUE, TRUE );
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
		
		EE_Registry::instance()->load_class( 'Cart', array(), FALSE, TRUE, TRUE );
		// grab cart item
		$cart = EE_Registry::instance()->CART->whats_in_the_cart();
		//grab first (and only) item
		$item = array_pop( $cart['items'] );
		// grab line item id
		$line_item_id = $item['line_item'];
		
		//grab session
		EE_Registry::instance()->SSN->set_session_data( array( 'fill' => TRUE ), 'billing_info' );			
		// load gateways
		$EEM_Gateways = EE_Registry::instance()->load_model( 'Gateways' );		

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
			$qstns = apply_filters('FHEE_reg_admin_new_registration_form', $this->_req_data['qstn']);	
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
			if ( ! EE_Registry::instance()->CART->set_line_item_details( $attendees, $line_item_id )) {
				$notices = EE_Error::get_notices(FALSE);
				$error_msg = $notices['errors'];
			}

			// and store a bit of data about the primary attendee
			$primary_attendee['line_item_id'] = $line_item_id;
			$primary_attendee['fname'] = $qstns['fname'];
			$primary_attendee['lname'] = $qstns['lname'];
			$primary_attendee['email'] = $qstns['email'];
			EE_Registry::instance()->SSN->set_session_data(array('primary_attendee' => $primary_attendee), 'session_data');

		}
		// update attendee details
		EE_Registry::instance()->CART->_save_cart();
		// grab cart item
		$cart = EE_Registry::instance()->CART->whats_in_the_cart();
		//printr( $cart, '$cart  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
			
		// taxes ?
		EE_Registry::instance()->load_class( 'Taxes', array(), FALSE, TRUE, TRUE );
		$taxes = EE_Taxes::calculate_taxes( $grand_total );
		$grand_total = apply_filters( 'espresso_filter_hook_grand_total_after_taxes', $grand_total );
		// totals over 0 initially get set to Incomlete, whereas Free Events get set to complete
		$txn_status = $grand_total > 0 ? 'TPN' : 'TCM';

		// grab session data
		$session = EE_Registry::instance()->SSN->get_session_data();
		// start the transaction record
		EE_Registry::instance()->load_class( 'Transaction', array(), FALSE, TRUE, TRUE );
		// create TXN object
		$transaction = EE_Transaction::new_instance(
			array( 
				'TXN_timestamp' => current_time('timestamp'), 
				'TXN_total' => $grand_total, 
				'TXN_paid' => 0, 
				'STS_ID' => $txn_status, 
				'TXN_details' => NULL, 
				'TXN_session_data' => $session, 
				'TXN_hash_salt' => NULL, 
				'TXN_tax_data' => array(
					'tax_totals'=>$session['tax_totals'],
					'taxes'=>$session['taxes']
					)
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
//		//var_dump(EE_Registry::instance()->SSN->get_session_data());
//		EE_Registry::instance()->SSN->set_session_data(array( 'registration' => $saved_registrations, 'transaction' => $transaction ), 'session_data');
//		EE_Registry::instance()->SSN->update_espresso_session();
			
//		printr( EE_Registry::instance()->SSN, 'EE_Registry::instance()->SSN  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
//		die();
//		$this->_req_data = array();
//		
		$txn_url = EE_Admin_Page::add_query_args_and_nonce( array( 'action'=>'view_transaction', 'TXN_ID'=>$transaction->ID() ), TXN_ADMIN_URL );
		wp_safe_redirect( $txn_url );
		exit();
//		$this->_redirect_after_action( $success, __( 'New Registration', 'event_espresso' ), 'created', array( 'action' => 'view_transaction', 'TXN_ID'=>$transaction->ID() ), TXN_ADMIN_URL );
	
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
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		$this->_admin_page_title .= $this->get_action_link_or_button('new_registration', 'add-registrant', array(), 'button add-new-h2');
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

		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		
		require_once( REG_ADMIN . 'EE_Event_Registrations_List_Table.class.php' );
		require_once(EE_MODELS . 'EEM_Attendee.model.php');
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
				$orderby = 'Attendee.ATT_lname';
//				$orderby = 'reg.REG_final_price';
		}
		
		$sort = ( isset( $this->_req_data['order'] ) && ! empty( $this->_req_data['order'] )) ? $this->_req_data['order'] : 'ASC';

		$current_page = isset( $this->_req_data['paged'] ) && !empty( $this->_req_data['paged'] ) ? $this->_req_data['paged'] : 1;
		$per_page = isset( $this->_req_data['perpage'] ) && !empty( $this->_req_data['perpage'] ) ? $this->_req_data['perpage'] : $per_page;


		$offset = ($current_page-1)*$per_page;
		$limit = array( $offset, $per_page );
		$query_params = array(array());
		if ($EVT_ID){
			$query_params[0]['EVT_ID']=$EVT_ID;
		}
		if($CAT_ID){
			throw new EE_Error("You specified a Cateogry Id for this query. Thats odd because we are now using terms and taxonomies. So did you mean the term taxonomy id o rthe term id?");
		}
		if($reg_status){
			$query_params[0]['STS_ID']=$reg_status;
		}
		if($trash){
			$query_params[0]['Attendee.ATT_status']=  EEM_CPT_Base::post_status_trashed;
		}
		$query_params['order_by'][$orderby] = $sort;
		$query_params['limit'] = $limit;
		$query_params['force_join'] = array('Attendee');//force join to attendee model so that it gets cached, because we're going to need the attendee for each registration
		if($count){
			$registrations = EEM_Registration::instance()->count($query_params);
		}else{
			$registrations = EEM_Registration::instance()->get_all($query_params);
		
		
	//		$registrations = EEM_Registration::instance();
	//		$all_attendees = EEM_Attendee::instance()->get_event_attendees( $EVT_ID, $CAT_ID, $reg_status, $trash, $orderby, $sort, $limit, $output );
			if ( isset( $registrations[0] ) && $registrations[0] instanceof EE_Registration ) {
				//printr( $all_attendees[0], '$all_attendees[0]  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
				// name
				$first_registration = $registrations[0];
				$event_obj = $first_registration->event_obj();
				if($event_obj){
					$event_name = $first_registration->event_obj()->name();
					$event_date = 'TODO: we need to get date from earliest price date or should this be the actual event date?';//$first_registration->date_obj()->reg_start_date_and_time('l F j, Y,', ' g:i:s a');// isset( $registrations[0]->DTT_EVT_start ) ? date( 'l F j, Y,    g:i:s a', $registrations[0]->DTT_EVT_start ) : '';
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
			}
		}

		return $registrations;
	}





	/**
	 * 		generates HTML for the Attendee Contact List
	*		@access protected
	*		@return void
	*/
	protected function _attendee_contact_list_table() {
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		$this->_admin_page_title .= $this->get_action_link_or_button('add_new_attendee', 'add-attendee', array(), 'button add-new-h2');
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
		require_once(EE_MODELS . 'EEM_Attendee.model.php');
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
			$all_attendees = $count ? $ATT_MDL->count_deleted( array('order_by'=>array($orderby=>$sort), 'limit'=>$limit)): $ATT_MDL->get_all_deleted( array('order_by'=>array($orderby=>$sort), 'limit'=>$limit));
		else
			$all_attendees = $count ? $ATT_MDL->count( array('order_by'=>array($orderby=>$sort),'limit'=>$limit)) : $ATT_MDL->get_all( array('order_by'=>array($orderby=>$sort), 'limit'=>$limit) );

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
				if ( ! EEM_Registration::instance()->update( array( 'REG_att_checked_in' => $REG_att_checked_in ), array(array( 'REG_ID' => absint( $REG_ID ))))) {
					$success = FALSE;
				}
			}
			
		} elseif ( $REG_ID = ! empty($this->_req_data['id']) ? $this->_req_data['id'] : FALSE ) {
			
			$success = FALSE;
			//echo '<h4>$REG_ID : ' . $REG_ID . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
			$REG_url_link = ! empty($this->_req_data['_REG_ID']) ? sanitize_text_field( $this->_req_data['_REG_ID'] ) : FALSE;
			//$REG_att_checked_in = ! empty($this->_req_data['check_in']) ? absint( $this->_req_data['check_in'] ) : 0;
			
			if ( $reg_obj = EEM_Registration::instance()->get_one( array( 'REG_ID' => absint( $REG_ID ), 'REG_url_link' => $REG_url_link ))) {
				//echo '<h4>$REG ID : ' . $REG->ID() . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
				if ( $reg_obj->set_att_checked_in( $REG_att_checked_in )) {
					//echo '<h1>set_att_checked_in<br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h1>';
					$success = $reg_obj->save();
				}
			}		
				
		} else {
			$success = FALSE;
		}

		$EVT_ID = isset($this->_req_data['event_id']) ? absint( $this->_req_data['event_id'] ) : FALSE;

		//echo '<h4>$success : ' . $success . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
		$this->_redirect_after_action( $success, __( 'Attendee Check In Status', 'event_espresso' ), __( 'updated', 'event_espresso' ), array( 'action' => 'event_registrations', 'event_id' => $EVT_ID ));
		
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






	/***************************************		ATTENDEE DETAILS 		***************************************/





	/**
	 * 		_attendee_details
	*		@access protected
	*		@return void
	*/
	protected function _edit_attendee_details( $new = FALSE ) {		
	
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );
		
		$ATT_ID = isset( $this->_req_data['ATT_ID'] ) && ! empty( $this->_req_data['ATT_ID'] ) ? absint( $this->_req_data['ATT_ID'] ) : FALSE;

		$title = __( ucwords( str_replace( '_', ' ', $this->_req_action )), 'event_espresso' );
		// add ATT_ID to title if editing 
		$title = $ATT_ID ? $title . ' # ' . $ATT_ID : $title;

		// get attendees
		require_once(EE_MODELS . 'EEM_Attendee.model.php');
		$ATT_MDL = EEM_Attendee::instance();

		if ( $ATT_ID ) {
		
			$attendee = $ATT_MDL->get_one_by_ID( $ATT_ID );
			$action = 'update_attendee';
			
		} else {
			$attendee = EE_Attendee::new_instance();
			$action = 'insert_attendee';
		}

		$this->_set_add_edit_form_tags($action);

		
		$this->_template_args['attendee']= $attendee;
		$this->_template_args['state_html'] = EEH_Form_Fields::generate_form_input(
				array(
					'QST_display_text'=>' ',
					'ANS_value'=>$attendee->state_ID(),
					'QST_input_name'=>'STA_ID',
					'QST_input_name'=>'STA_ID',
					'QST_system'=>'state'
				));
		$this->_template_args['country_html'] = EEH_Form_Fields::generate_form_input(
				array(
					'QST_display_text'=>' ',
					'ANS_value'=>$attendee->country_ISO(),
					'QST_input_name'=>'CNT_ISO',
					'QST_input_name'=>'CNT_ISO',
					'QST_system'=>'country'
				));
		//get list of all registrations for this attendee
		require_once(EE_MODELS . 'EEM_Registration.model.php');
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
		$this->_template_args['admin_page_content'] = EEH_Template::display_template($this->_template_path, $this->_template_args, TRUE);

		$this->_set_publish_post_box_vars( 'ATT_ID', $ATT_ID, 'delete_attendees' );

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

		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );

		require_once(EE_MODELS . 'EEM_Attendee.model.php');
		$ATT_MDL = EEM_Attendee::instance();
		
		//printr( $this->_req_data ); die();
		
		// why be so pessimistic ???  : (
		$success = 0;
		//create attendee object
		$attendee = EE_Attendee::new_instance(
			array(
				'ATT_fname' => $this->_req_data['ATT_fname'],
				'ATT_lname' => $this->_req_data['ATT_lname'],
				'ATT_address' => $this->_req_data['ATT_address'],
				'ATT_address2' => $this->_req_data['ATT_address2'],
				'ATT_city' => $this->_req_data['ATT_city'],
				'STA_ID' => $this->_req_data['STA_ID'],
				'CNT_ISO' => $this->_req_data['CNT_ISO'],
				'ATT_zip' => $this->_req_data['ATT_zip'],
				'ATT_email' => $this->_req_data['ATT_email'],
				'ATT_phone' => $this->_req_data['ATT_phone'],
				'ATT_social' => $this->_req_data['ATT_social'],
				'ATT_comments' => $this->_req_data['ATT_comments'],
				'ATT_notes' => $this->_req_data['ATT_notes'],
				'ATT_deleted' => isset($this->_req_data['ATT_deleted']) ? $this->_req_data['ATT_deleted'] : 0,
				'ATT_ID' => $this->_req_data['ATT_ID']
				)
			);
				
		// is this a new Attendee ?
		
		if ( $new_attendee ) {
			$action_desc = __( 'created', 'event_espresso' );
		} else {
			$action_desc = __( 'updated', 'event_espresso' );
		}
		if ( $attendee->save() ) {
			$success = 1;
		}else{
			$success = 0;
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
	
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );

		require_once(EE_MODELS . 'EEM_Attendee.model.php');
		$ATT_MDL = EEM_Attendee::instance();
	
		$success = 1;
		$ATT_deleted = $trash ? TRUE : FALSE;
		//Checkboxes
		if (!empty($this->_req_data['checkbox']) && is_array($this->_req_data['checkbox'])) {
			// if array has more than one element than success message should be plural
			$success = count( $this->_req_data['checkbox'] ) > 1 ? 2 : 1;
			// cycle thru checkboxes 
			while (list( $ATT_ID, $value ) = each($this->_req_data['checkbox'])) {
				if ( ! $ATT_MDL->update(array('ATT_deleted' => $ATT_deleted), array(array('ATT_ID' => absint($ATT_ID))))) {
					$success = 0;
				}
			}
			
		} else {
			// grab single id and delete
			//@todo verifywe actually want to delete by 'id', not 'ATT_ID'. This was different between 4.0-BETA and 4.1-DEV
			$ATT_ID = absint($this->_req_data['id']);
			if ( ! $ATT_MDL->update(array('ATT_deleted' => $ATT_deleted), array(array('ATT_ID' => absint($ATT_ID))))) {
				$success = 0;
			}
			
		}

		$what = $success > 1 ? __( 'Attendees', 'event_espresso' ) : __( 'Attendee', 'event_espresso' );
		$action_desc = $trash ? __( 'moved to the trash', 'event_espresso' ) : __( 'restored', 'event_espresso' );
		$this->_redirect_after_action( $success, $what, $action_desc, array( 'action' => 'contact_list' ) );
		
	}






	/**
	 * 		_delete_attendee
	*		@access protected
	*		@return void
	*/
	protected function _delete_attendees() {
	
		do_action( 'AHEE_log', __FILE__, __FUNCTION__, '' );

		require_once(EE_MODELS . 'EEM_Attendee.model.php');
		$ATT_MDL = EEM_Attendee::instance();
				
		$success = 1;
		//Checkboxes
		if ( ! empty($this->_req_data['checkbox']) && is_array( $this->_req_data['checkbox'] )) {
			// if array has more than one element than success message should be plural
			$success = count( $this->_req_data['checkbox'] ) > 1 ? 2 : 1;
			// cycle thru bulk action checkboxes
			while ( list( $ATT_ID, $value ) = each( $this->_req_data['checkbox'] )) {
				if ( ! $ATT_MDL->delete_by_ID( absint( $ATT_ID ))) {
					$success = 0;
				}
			}
	
		} else {
			// grab single id and delete
			$ATT_ID = absint( $this->_req_data['ATT_ID'] );
			if ( ! $ATT_MDL->delete_by_ID( $ATT_ID )) {
				$success = 0;
			}
			
		}
		$what = $success > 1 ? __( 'Attendees', 'event_espresso' ) : __( 'Attendee', 'event_espresso' );
		$this->_redirect_after_action( $success, $what, __( 'deleted', 'event_espresso' ), array( 'action' => 'contact_list' ) );
		
	}




  
}



// end of file:  includes/core/admin/transactions/Registrations_Admin_Page.core.php
