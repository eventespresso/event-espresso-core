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
 * Any methods without phpdoc comments have inline docs with parent class. 
 *
 * @package			Event Espresso
 * @subpackage	includes/core/admin/attendees/Attendees_Admin_Page.core.php 
 * @author				Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class Attendees_Admin_Page extends EE_Admin_Page {

	private $_attendees;
	private $_session;
	private static $_reg_status;





	/**
	 * 		constructor
	 * 		@Constructor
	 * 		@access public
	 * 		@return void
	 */
	public function __construct() {
		parent::__construct();
	}





	protected function _init_page_props() {
		$this->page_slug = ATT_PG_SLUG;
		$this->page_label = __('Attendees', 'event_espresso');
	}





	protected function _ajax_hooks() {
		//all ajax hooks would go here.
	}






	
	protected function _define_page_props() {
		$this->_admin_base_url = ATT_ADMIN_URL;
		$this->_admin_page_title = __( 'Attendees', 'event_espresso' );
		$this->_labels = array(
			'buttons' => array(
				'add' => __('Add New Attendee', 'event_espresso'),
				'edit' => __('Edit Event', 'event_espresso'),
				'delete' => __('Delete Event', 'event_espresso')
				)
			);
	}






	

	protected function _set_page_routes() {	
		$this->_page_routes = array(
				// attendees
				'default'	=> '_attendee_overview_list_table',
				'add_new_attendee'	=> array( 'func' => '_edit_attendee_details', 'args' => array( 'new_attendee' => TRUE )),
				'edit_attendee'	=> array( 'func' => '_edit_attendee_details'),
				'insert_attendee'	=> array( 'func' => '_insert_or_update_attendee', 'args' => array( 'new_attendee' => TRUE ), 'noheader' => TRUE ),
				'update_attendee'	=> array( 'func' => '_insert_or_update_attendee', 'args' => array( 'new_attendee' => FALSE ), 'noheader' => TRUE ),
				'trash_attendees'	=> array( 'func' => '_trash_or_restore_attendees', 'args' => array( 'trash' => TRUE ), 'noheader' => TRUE ),
				'restore_attendees'	=> array( 'func' => '_trash_or_restore_attendees', 'args' => array( 'trash' => FALSE ), 'noheader' => TRUE ),
				'delete_attendees'	=> array( 'func' => '_delete_attendees', 'noheader' => TRUE )

		);
	}





	protected function _set_page_config() {
		$this->_page_config = array(
			'default' => array(
				'nav' => array(
					'label' => __('Overview', 'event_espresso'),
					'order' => 10
					),
				'list_table' => 'EE_Attendees_List_Table',
				'metaboxes' => array()
				),
			'add_new_attendee' => array(
				'nav' => array(
					'label' => __('Add Attendee', 'event_espresso'),
					'order' => 5,
					'persistent' => FALSE
					),
				'metaboxes' => array('_publish_post_box', '_espresso_news_post_box', '_espresso_links_post_box')
				),
			'edit_attendee' => array(
				'nav' => array(
					'label' => __('Edit Attendee', 'event_espresso'),
					'order' => 5,
					'persistent' => FALSE,
					'url' => isset($this->_req_data['id']) ? add_query_arg(array('id' => $this->_req_data['id'] ), $this->_current_page_view_url )  : $this->_admin_base_url
					),
				'metaboxes' => array('_publish_post_box', '_espresso_news_post_box', '_espresso_links_post_box')
				)
		);
	}


	/**
	 * The below methods aren't used by this class currently
	 */
	protected function _add_screen_options() {}
	protected function _add_help_tabs() {}
	protected function _add_feature_pointers() {}
	public function admin_init() {}
	public function admin_notices() {}
	public function admin_footer_scripts() {}






	public function load_scripts_styles() {
		//styles for all attendee pages	
		wp_enqueue_style('espresso_attendees');


		//scripts for all attendee pages
		wp_enqueue_script('espresso_attendees');
	}




	protected function _add_screen_options_default() {
		$this->_per_page_screen_option();
	}



	/**
	 * enqueuing scripts and styles specific to this view
	 * @return void
	 */
	public function load_scripts_styles_add_new_attendee() {
		$this->load_scripts_styles_edit_attendee();
	}




	/**
	 * enqueuing scripts and styles specific to this view
	 * @return void 
	 */
	public function load_scripts_styles_edit_attendee() {
		//styles
		wp_enqueue_style('jquery-ui-style');
		wp_enqueue_style('jquery-ui-style-datepicker-css');

		//scripts
		wp_enqueue_script('ee_admin_js');
		wp_enqueue_script('event_editor_js');
	}




	protected function _set_list_table_views_default() {
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
					'delete_attendees' => __('Delete Permanently', 'event_espresso'),
					)
				)
				
			);
	}






	/**
	 * 		generates HTML for main Attendees Admin page
	*		@access protected
	*		@return void
	*/
	protected function _attendee_overview_list_table() {
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );

		$this->_admin_page_title .= $this->_get_action_link_or_button('add_new_attendee', 'add', array(), 'button add-new-h2');
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
		
		require_once( ATT_ADMIN . 'EE_Attendees_List_Table.class.php' );
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
			$all_attendees = $count ? $ATT_MDL->get_all_trashed_attendees( $orderby, $sort, $limit, TRUE ) : $ATT_MDL->get_all_trashed_attendees( $orderby, $sort, $limit );
		else
			$all_attendees = $count ? $ATT_MDL->get_all_inuse_attendees( $orderby, $sort, $limit, 'COUNT' ) : $ATT_MDL->get_all_inuse_attendees( $orderby, $sort, $limit );

		return $all_attendees;
	}






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
			$this->_template_path = ATT_TEMPLATE_PATH . 'attendee_registrations_main_meta_box.template.php';
			$meta_box_args['template_path'] = $this->_template_path;
			$meta_box_args['template_args'] = $this->_template_args;
			$this->_add_admin_page_meta_box( 'attendee_registrations_meta_', __( 'Event Registrations for this Attendee', 'event_espresso' ), 'attendee_registrations', $meta_box_args );
		}
		
		// generate metabox - you MUST create a callback named __FUNCTION__ . '_meta_box'  ( see "_edit_attendee_details_meta_box" below )
		$this->_template_path = ATT_TEMPLATE_PATH . 'attendee_details_main_meta_box.template.php';
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
			$action_desc = 'created';
		} else {
			// run the update
			if ( $attendee->update() ) {
				$success = 1;
			}
			$action_desc = 'updated';
		}
		
		$this->_redirect_after_action( $success, 'Attendee', $action_desc, array() );
			
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

		$what = $success > 1 ? 'Attendees' : 'Attendee';
		$action_desc = $trash ? 'moved to the trash' : 'restored';
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
		$what = $success > 1 ? 'Attendees' : 'Attendee';
		$this->_redirect_after_action( $success, $what, 'deleted', array() );
		
	}


}
// end of file:  includes/core/admin/attendees/Attendees_Admin_Page.core.php