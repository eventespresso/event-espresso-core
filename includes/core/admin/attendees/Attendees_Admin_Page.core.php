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
 * Attendees_Admin_Page class
 *
 * @package			Event Espresso
 * @subpackage	includes/core/admin/attendees/Attendees_Admin_Page.core.php 
 * @subpackage	includes/core/admin/attendees/Attendees_Admin_Page.core.php 
 * @author				Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class Attendees_Admin_Page extends EE_Admin_Page implements Admin_Page_Interface {

	private $_attendees;
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
		
		$this->page_slug = ATT_PG_SLUG;
		$this->default_nav_tab_name = 'attendees';
		// is this request for UI or backend 
		$this->_is_UI_request = $_is_UI_request;
		
		$this->_init();
		
		// add ajax calls here
		if ( $this->_AJAX ) {
		}
		
		if ( $this->_is_UI_request ) {
			add_action( 'admin_init', array( &$this, '_set_bulk_actions' ));
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
		$this->admin_base_url = ATT_ADMIN_URL;
		$this->admin_page_title = __( 'Attendees', 'event_espresso' );
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
				// attendees
				'default'	=> '_attendee_overview_list_table',
				'add_new_attendee'	=> array( 'func' => '_edit_attendee_details', 'args' => array( 'new_attendee' => TRUE )),
				'edit_attendee'	=> array( 'func' => '_edit_attendee_details', 'args' => array( 'new_attendee' => FALSE )),
				'insert_attendee'	=> array( 'func' => '_insert_or_update_attendee', 'args' => array( 'new_attendee' => TRUE )),
				'update_attendee'	=> array( 'func' => '_insert_or_update_attendee', 'args' => array( 'new_attendee' => FALSE )),
				'trash_attendees'	=> array( 'func' => '_trash_or_restore_attendees', 'args' => array( 'trash' => TRUE )),
				'restore_attendees'	=> array( 'func' => '_trash_or_restore_attendees', 'args' => array( 'trash' => FALSE )),
				'delete_attendees'	=> '_delete_attendees',

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
		$attendee_bulk_actions = array( 'trash_attendees', 'restore_attendees', 'delete_attendees' );
		
		if ( $this->_req_action == 'default' ) {
			$this->_views['in_use']['bulk_action'] = array( 'trash_attendees' => 'Move to Trash' );
			$this->_views['trashed']['bulk_action'] = array( 'restore_attendees' => 'Restore From Trash', 'delete_attendees' => 'Delete Permanently' );
		} else if ( in_array( $this->_req_action, $attendee_bulk_actions )) {
			// POST request
			if ( ! empty( $_POST )) {
				// reset requested nonce value - name = 'bulk-' . $this->_args['plural']  ( with spaces removed from $this->_args['plural'] )
				$this->_req_nonce = 'bulk-attendees';				
			}
			// set bulk actions
			$this->_views['in_use']['bulk_action'] = array( 'trash_attendees' => 'Move to Trash' );
			$this->_views['trashed']['bulk_action'] = array( 'restore_attendees' => 'Restore From Trash', 'delete_attendees' => 'Delete Permanently' );
		}

//		echo '<h4>$this->_req_action : ' . $this->_req_action . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		echo '<h4>$this->_req_nonce : ' . $this->_req_nonce . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
//		echo '<h4>$this->view : ' . $this->_view . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';

	}







	/**
	 * 		generates HTML for main Attendees Admin page
	*		@access protected
	*		@return void
	*/
	protected function _attendee_overview_list_table() {

		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
		//generate URL for Add New Attendee link
		$add_new_attendee_url = wp_nonce_url( add_query_arg( array( 'action' => 'add_new_attendee' ), ATT_ADMIN_URL ), 'add_new_attendee_nonce' );
		// add link to title
		$this->admin_page_title .= ' <a href="' . $add_new_attendee_url . '" class="button add-new-h2" style="margin-left: 20px;">' . __('Add New Attendee', 'event_espresso') . '</a>';
		
		$attendees = $this->_get_attendees();
		$this->template_args['table_rows'] = count( $attendees );
		$entries_per_page_dropdown = $this->_entries_per_page_dropdown( $this->template_args['table_rows'] );

		$this->template_args['view_RLs'] = $this->get_list_table_view_RLs();
		$this->template_args['list_table'] = new EE_Attendees_List_Table( $attendees, $this->_view, $this->_views, $entries_per_page_dropdown );

		// link back to here
		$this->template_args['attendee_overview_url'] = add_query_arg( array( 'noheader' => 'true' ), ATT_ADMIN_URL );
		//$this->template_args['noheader'] = 'true';
		$this->template_args['status'] = $this->_view;
		// path to template
		$template_path = ATT_TEMPLATE_PATH . 'attendee_admin_overview.template.php';
		$this->template_args['admin_page_content'] = espresso_display_template( $template_path, $this->template_args, TRUE );
		
		// the final template wrapper
		$this->display_admin_page_with_sidebar();	
 
	}





	/**
	 * 		_get_attendees
	*		@access protected
	*		@return array
	*/
	protected function _get_attendees() {  

		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
		// start with an empty array
		$attendees = array();
		
		require_once( ATT_ADMIN . 'EE_Attendees_List_Table.class.php' );
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Attendee.model.php');
		$ATT_MDL = EEM_Attendee::instance();
		
		$_GET['orderby'] = ! empty($_GET['orderby']) ? $_GET['orderby'] : '';
		
		switch ($_GET['orderby']) {
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
		
		$sort = ( isset( $_GET['order'] ) && ! empty( $_GET['order'] )) ? $_GET['order'] : 'ASC';

		if ( $all_attendees = $ATT_MDL->get_all_attendees( $orderby, $sort )) {
			//printr( $all_attendees, '$all_attendees <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
			foreach ( $all_attendees as $attendee ) {
				if ( $attendee->deleted() ) {
					$this->_views['trashed']['count']++;
					if ($this->_view == 'trashed') {
						$attendees[] = $attendee;
					}
				} else {
					$this->_views['in_use']['count']++;
					if ($this->_view == 'in_use') {
						$attendees[] = $attendee;
					}
				}
			}
		}
		//printr( $attendees, '$attendees <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span>', 'auto' );
		return $attendees;
	}






	/**
	 * 		_attendee_details
	*		@access protected
	*		@return void
	*/
	protected function _edit_attendee_details() {		
	
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
		global $espresso_notices;
		
		$ATT_ID = isset( $_REQUEST['id'] ) && ! empty( $_REQUEST['id'] ) ? absint( $_REQUEST['id'] ) : FALSE;

		$title = __( ucwords( str_replace( '_', ' ', $this->_req_action )), 'event_espresso' );
		// add ATT_ID to title if editing 
		$title = $ATT_ID ? $title . ' # ' . $ATT_ID : $title;
		
		// get attendees
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Attendee.model.php');
		$ATT_MDL = EEM_Attendee::instance();

		if ( $ATT_ID ) {
			$attendee = $ATT_MDL->get_attendee_by_ID( $ATT_ID );
			$action = 'update_attendee';
			$edit_attendee_form_url = add_query_arg( array( 'action' => $action, 'id' => $ATT_ID, 'noheader' => TRUE ), ATT_ADMIN_URL );
		} else {
			$attendee = new EE_Attendee();
			$action = 'insert_attendee';
			$edit_attendee_form_url = add_query_arg( array( 'action' => $action, 'noheader' => TRUE ), ATT_ADMIN_URL );
		}
		
		$this->template_args['ATT_ID'] = $ATT_ID;
		$this->template_args['attendee'] = $attendee;

		$this->template_args['action'] = $action;
		$this->template_args['edit_attendee_form_url'] = $edit_attendee_form_url;
	
		// add nav tab for this details page
		$this->nav_tabs['edit_attendee']['url'] = wp_nonce_url( add_query_arg( array( 'action'=>$action, 'id' => $ATT_ID ), ATT_ADMIN_URL ), $action . '_nonce' );  
		$this->nav_tabs['edit_attendee']['link_text'] = $ATT_ID ? __( 'Attendee Details', 'event_espresso' ) : __( 'Add New Attendee', 'event_espresso' );
		$this->nav_tabs['edit_attendee']['css_class'] = ' nav-tab-active';
		$this->nav_tabs['edit_attendee']['order'] = 15;

		// generate metabox - you MUST create a callback named __FUNCTION__ . '_meta_box'  ( see "_edit_attendee_details_meta_box" below )
		$this->_add_admin_page_meta_box( $action, $title, __FUNCTION__, NULL );

		// the final template wrapper
		$this->display_admin_page_with_sidebar();
		
	}






	/**
	 * 		_edit_attendee_details_meta_box
	*		@access public
	*		@return void
	*/
	public function _edit_attendee_details_meta_box() {		
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
		$template_path = ATT_TEMPLATE_PATH . 'attendee_details_main_meta_box.template.php';
		echo espresso_display_template( $template_path, $this->template_args, TRUE );		
	}






	/**
	 * 		insert_or_update_attendee
	*		@param boolean 		$new_attendee - whether to insert or update
	*		@access protected
	*		@return void
	*/
	protected function _insert_or_update_attendee( $new_attendee = FALSE ) {
		
		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );

		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Attendee.model.php');
		$ATT_MDL = EEM_Attendee::instance();

		// why be so pessimistic ???  : (
		$success = 0;
		//create attendee object
		$attendee = new EE_Attendee(
						$_POST['ATT_fname'],
						$_POST['ATT_lname'],
						$_POST['ATT_address'],
						$_POST['ATT_address2'],
						$_POST['ATT_city'],
						$_POST['STA_ID'],
						$_POST['CNT_ISO'],
						$_POST['ATT_zip'],
						$_POST['ATT_email'],
						$_POST['ATT_phone'],
						$_POST['ATT_social'],
						$_POST['ATT_comments'],
						$_POST['ATT_notes'],
						$_POST['ATT_deleted'],
						$_POST['ATT_ID']
				);
				
		// is this a new Attendee ?
		if ( $new_attendee ) {
			// run the insert
			if ( $attendee->insert() ) {
				$success = 1;
			} 
			$action_desc = 'created';
		} else {
			// run the update
			if ( $attendee->update() ) {
				$success = 1;
			}
			$action_desc = 'updated';
		}
		
		$this->_redirect_after_admin_action( $success, 'Attendee', $action_desc, array() );
			
	}
 




	/**
	 * 		_trash_or_restore_attendee
	*		@param boolean 		$trash - whether to move item to trash (TRUE) or restore it (FALSE)
	*		@access protected
	*		@return void
	*/
	protected function _trash_or_restore_attendees( $trash = TRUE ) {
	
		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );

		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Attendee.model.php');
		$ATT_MDL = EEM_Attendee::instance();
	
		$success = 1;
		$ATT_deleted = $trash ? TRUE : FALSE;
		//Checkboxes
		if (!empty($_POST['checkbox']) && is_array($_POST['checkbox'])) {
			// if array has more than one element than success message should be plural
			$success = count( $_POST['checkbox'] ) > 1 ? 2 : 1;
			// cycle thru checkboxes 
			while (list( $ATT_ID, $value ) = each($_POST['checkbox'])) {
				if ( ! $ATT_MDL->update(array('ATT_deleted' => $ATT_deleted), array('ATT_ID' => absint($ATT_ID)))) {
					$success = 0;
				}
			}
			
		} else {
			// grab single id and delete
			$ATT_ID = absint($_REQUEST['id']);
			if ( ! $ATT_MDL->update(array('ATT_deleted' => $ATT_deleted), array('ATT_ID' => absint($ATT_ID)))) {
				$success = 0;
			}
			
		}

		$what = $success > 1 ? 'Attendees' : 'Attendee';
		$action_desc = $trash ? 'moved to the trash' : 'restored';
		$this->_redirect_after_admin_action( $success, $what, $action_desc, array() );
		
	}






	/**
	 * 		_delete_attendee
	*		@access protected
	*		@return void
	*/
	protected function _delete_attendees() {
	
		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );

		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Attendee.model.php');
		$ATT_MDL = EEM_Attendee::instance();
		
		$success = 1;
		//Checkboxes
		if ( ! empty($_POST['checkbox']) && is_array( $_POST['checkbox'] )) {
			// if array has more than one element than success message should be plural
			$success = count( $_POST['checkbox'] ) > 1 ? 2 : 1;
			// cycle thru bulk action checkboxes
			while ( list( $ATT_ID, $value ) = each( $_POST['checkbox'] )) {
				if ( ! $ATT_MDL->delete_attendee_by_ID( absint( $ATT_ID ))) {
					$success = 0;
				}
			}
	
		} else {
			// grab single id and delete
			$ATT_ID = absint( $_REQUEST['id'] );
			if ( ! $ATT_MDL->delete_attendee_by_ID( $ATT_ID )) {
				$success = 0;
			}
			
		}
		$what = $success > 1 ? 'Attendees' : 'Attendee';
		$this->_redirect_after_admin_action( $success, $what, 'deleted', array() );
		
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

		$redirect_url = add_query_arg( $query_args, ATT_ADMIN_URL ); 
		//echo '<h4>$redirect_url : ' . $redirect_url . '  <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h4>';
		//die();
		wp_safe_redirect( $redirect_url );	
		exit();
	}






}
// end of file:  includes/core/admin/attendees/Attendees_Admin_Page.core.php