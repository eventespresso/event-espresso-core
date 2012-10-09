<?php if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for Wordpress
 *
 * @package		Event Espresso
 * @author		Seth Shoultes
 * @copyright	(c)2009-2012 Event Espresso All Rights Reserved.
 * @license		@link http://eventespresso.com/support/terms-conditions/  ** see Plugin Licensing * *
 * @link		http://www.eventespresso.com
 * @version		3.2.P
 *
 * ------------------------------------------------------------------------
 *
 * EE_Message_Admin_Page class
 *
 * for Admin setup of the message pages
 *
 * @package		Event Espresso
 * @subpackage	includes/core/message/EE_Message_Admin_Page.core.php
 * @author		Darren Ethier
 *
 * ------------------------------------------------------------------------
 */

class Messages_Admin_Page extends EE_Admin_Page implements Admin_Page_Interface {

	private $_active_messengers = array();
	private $_active_message_types = array();
	private $_activate_state;
	private $_activate_meta_box_type;
	private $_current_message_meta_box;
	private $_current_message_meta_box_object;
	private $_context_switcher;

	/**
	 * constructor
	 * @constructor 
	 * @access public
	 * @return void
	 */
	public function __construct() {
		global $espresso_wp_user;
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );

		$this->page_slug = EE_MSG_PG_SLUG;
		$this->_init();
		
		if ( $this->_req_action == 'activate' )
			$this->_use_columns();

		//add ajax calls here
		if ( $this->_AJAX ) {
		}

		$this->_activate_state = isset($_REQUEST['activate_state']) ? (array) $_REQUEST['activate_state'] : array();

		//we're also going to set the active messengers and active message types in here.
		$this->_active_messengers = get_user_meta($espresso_wp_user, 'ee_active_messengers', true);
		$this->_active_messengers = !empty($this->_active_messengers) ?  $this->_active_messengers : array();
		$this->_active_message_types = get_user_meta($espresso_wp_user, 'ee_active_message_types', true);
		$this->_active_message_types = !empty($this->_active_message_types ) ? $this->_active_message_types : array();

		// remove settings tab
		add_filter( 'filter_hook_espresso_admin_page_nav_tabs', array( &$this, '_remove_settings_from_admin_page_nav_tabs' ), 10 , 1 );
	}

	/**
	 * 		define_page_vars
	*		@access public
	*		@return void
	*/
	public function define_page_vars() {
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
		$this->admin_base_url = EE_MSG_ADMIN_URL;
		$this->admin_page_title = __( 'Messages', 'event_espresso' );

		//add new default tab for activation
		$this->nav_tabs['activate'] = array(
			'link_text' => __('Activate', 'event_espresso'),
			'url' => add_query_arg( array( 'action' => 'activate'), EE_MSG_ADMIN_URL),
			'order' => 40,
			'css_class' => ''
			);
	}

	/**
	 * set views array for List Table
	 * @access public
	 * @return array
	 */
	public function _set_list_table_views() {
		global $espresso_wp_user;
		do_action('action_hook_espresso_log', __FILE__, __FUNCTION__, '');

		$this->_views = array(
			'in_use' => array(
				'slug' => 'in_use',
				'label' => __('In Use', 'event_espresso'),
				'count' => 0,
				'bulk_action' => array(
					'trash_message_template' => __('Move to Trash', 'event_espresso')
				)
			),
			'all' => array(
				'slug' => 'all',
				'label' => __('All', 'event_espresso'),
				'count' => 0,
				'bulk_action' => array(
					'trash_message_template' => __('Move to Trash', 'event_espresso')
				)
			),
			'global' => array(
				'slug' => 'global',
				'label' => __('Global', 'event_espresso'),
				'count' => 0,
				'bulk_action' => array(
					'trash_message_template' => __('Move to Trash', 'event_espresso')
				)
			),
			'event' => array(
				'slug' => 'event',
				'label' => __('Events', 'event_espresso'),
				'count' => 0,
				'bulk_action' => array(
					'trash_message_template' => __('Move to Trash', 'event_espresso')
				)
			),
			'trashed' => array(
				'slug' => 'trashed',
				'label' => __('Trash', 'event_espresso'),
				'count' => 0,
				'bulk_action' => array(
					'restore_message_template' => __('Restore From Trash', 'event_espresso'),
					'delete_message_template' => __('Delete Permanently', 'event_espresso')
				)
			)
		);
	}

	/**
	 * 		an array for storing key => value pairs of request actions and their corresponding methods
	*		@access public
	*		@return void
	*/
	public function set_page_routes() {			

		//echo '<h3>'. __CLASS__ . '->' . __FUNCTION__ . ' <br /><span style="font-size:10px;font-weight:normal;">' . __FILE__ . '<br />line no: ' . __LINE__ . '</span></h3>';
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );

		$this->_page_routes = array(
				// prices
				'default'	=> '_ee_messages_overview_list_table',
				'add_new_message_template'	=> '_add_message_template',
				'edit_message_template'	=> '_edit_message_template',
				'insert_message_template'	=> array( 'func' => '_insert_or_update_message_template', 'args' => array( 'new_template' => TRUE )),
				'update_message_template'	=> array( 'func' => '_insert_or_update_message_template', 'args' => array( 'new_template' => FALSE )),
				'trash_message_template'	=> array( 'func' => '_trash_or_restore_message_template', 'args' => array( 'trash' => TRUE, 'all' => TRUE )),
				'trash_message_template_context' => array( 'func' => '_trash_or_restore_message_template', 'args' => array( 'trash' => TRUE )),
				'restore_message_template'	=> array( 'func' => '_trash_or_restore_message_template', 'args' => array( 'trash' => FALSE )),
				'restore_message_template_context' => array( 'func' => '_trash_or_restore_message_template' , 'args' => array('trash' => FALSE) ),
				'delete_message_template'	=> '_delete_message_template',
				'activate'	=> '_activate_messages',
				'reports' => '_messages_reports'
		);
	}

	/**
	 * generates HTML for main EE Messages Admin page
	 * @access protected
	 * @return void
	 * @todo I expect that this will modify somewhat but uncertain if it will occur in the extended WP_List_tables or not.
	 */
	protected function _ee_messages_overview_list_table() {
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '');

		//generate URL for Add New Price link
		$add_new_message_template_url = wp_nonce_url( add_query_arg( array( 'action' => 'add_new_message_template' ), EE_MSG_ADMIN_URL ), 'add_new_message_template_nonce' );
		// add link to title
		$this->admin_page_title .= ' <a href="' . $add_new_message_template_url . '" class="button add-new-h2" style="margin-left: 20px;">' . __('Add New Message Template', 'event_espresso') . '</a>';
		$this->admin_page_title .= $this->_learn_more_about_message_templates_link();
		
		$all_message_templates = $this->_get_message_templates();
		
		if ( empty($all_message_templates) ) {
			$all_message_templates = new WP_Error( __('no_message_templates', 'event_espresso'), __('There are no message templates in the system.  Have you activated any messengers?', 'event_espresso') . espresso_get_error_code( __FILE__, __FUNCTION__, __LINE__) );
		}

		//$message_templates COULD be an error object. IF it is then we want to handle/display the error
		if ( is_wp_error($all_message_templates) ) {
			$this->_handle_errors($all_message_templates);
			$all_message_templates = array();
		}

		$this->template_args['table_rows'] = count( $all_message_templates );


		//setup dropdown filters
		//todo: we need to make sure that the dropdown filters (i.e. messenger/message_type) show the active status.  and that they are handled correctly by the list table.  We will need to use $this->_get_message_templates method to select the called templates.
		//send along active messengers and active message_types for filters
		$this->template_args['active_messengers'] = $this->_active_messengers;
		$this->template_args['active_message_types'] = $this->_active_message_types;

		$entries_per_page_dropdown = $this->_entries_per_page_dropdown( $this->template_args['table_rows'] );

		$this->template_args['view_RLs'] = $this->get_list_table_view_RLs();
		$this->template_args['list_table'] = new Messages_Template_List_Table( $all_message_templates, $this->_view, $this->_views, $entries_per_page_dropdown );

		// link back to here
		$this->template_args['ee_msg_overview_url'] = add_query_arg( array( 'noheader' => 'true' ), EE_MSG_ADMIN_URL );
		$this->template_args['status'] = $this->_view;
		// path to template
		$template_path = EE_MSG_TEMPLATE_PATH . 'ee_msg_admin_overview.template.php';
		$this->template_args['admin_page_content'] = espresso_display_template( $template_path, $this->template_args, TRUE );
		
		// the final template wrapper
		$this->admin_page_wrapper();
	}

	/**
	 * _get_message_templates
	 * This gets all the message templates for listing on the overview list.
	 * @access protected
	 * @return array|WP_Error object
	 */
	protected function _get_message_templates() {
		global $espresso_wp_user;
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
		// start with an empty array
		$message_templates = array();

		/** todo: is this even needed?
		//require_once( EE_MSG_ADMIN . 'EE_Message_Template_List_Table.class.php' ); /**/
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Message_Template.model.php');
		$MTP = EEM_Message_Template::instance();
		
		$_GET['orderby'] = empty($_GET['orderby']) ? '' : $_GET['orderby'];

		switch ( $_GET['orderby'] ) {
			case 'messenger' :
				$orderby = 'MTP_messenger';
				break;
			case 'message_type' :
				$orderby = 'MTP_message_type';
				break;
			case 'user_id' :
				$orderby = 'MTP_user_id';
				break;
			default:
				$orderby = 'GRP_ID';
				break; 
		}

		$order = ( isset( $_GET['order'] ) && ! empty( $_GET['order'] ) ) ? $_GET['order'] : 'ASC';

		$trashed_templates = $MTP->get_all_trashed_grouped_message_templates();
		$all_templates = $MTP->get_all_message_templates($orderby, $order);
		$global_templates = $MTP->get_all_global_message_templates($orderby, $order);
		$event_templates = $MTP->get_all_event_message_templates($orderby, $order);
		$in_use_templates = $MTP->get_all_active_message_templates($orderby, $order);

		$view_templates_ref = $this->_view . '_templates';
		$message_templates = ${$view_templates_ref};

		foreach ( $this->_views as $view ) {
			$count_ref = $view['slug'] . '_templates';
			$this->_views[$view['slug']]['count'] = (${$count_ref}) ? count(${$count_ref}) : 0;
		}

		return $message_templates;
	}

	/**
	 * _add_message_template
	 * 
	 * @access  protected
	 * @return void
	 */
	protected function _add_message_template() {
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '');

		//we need to ask for a messenger and message type in order to generate the templates.
		
		//is this for a custom evt?
		$EVT_ID = isset( $_REQUEST['evt_id'] ) && !empty( $_REQUEST['evt_id'] ) ? absint( $_REQUEST['evt_id'] ) : FALSE;
		
		$this->template_args['EVT_ID'] = $EVT_ID ? $EVT_ID : FALSE;
		$this->template_args['event_name'] = $EVT_ID ? $this->_event_name($EVT_ID) : FALSE;
		$this->template_args['active_messengers'] = $this->_active_messengers;
		$this->template_args['active_message_types'] = $this->_active_message_types;
		$this->template_args['action'] = 'insert_message_template';
		$this->template_args['edit_message_template_form_url'] = add_query_arg( array( 'action' => 'insert_message_template', 'noheader' => TRUE ), EE_MSG_ADMIN_URL );
		$this->template_args['learn_more_about_message_templates_link'] = $this->_learn_more_about_message_templates_link();
		$this->template_args['action_message'] = __('Before we generate the new templates we need to ask you what messenger and message type you want the templates for');

		//add nav tab for this page
		$this->nav_tabs['add_message_template']['url'] = wp_nonce_url( add_query_arg( array( 'action' => 'add_message_template'), EE_MSG_ADMIN_URL ), 'add_message_template_nonce' );
		$this->nav_tabs['add_message_template']['link_text'] = __('Add Message Template', 'event_espresso');
		$this->nav_tabs['add_message_template']['css_class'] = ' nav-tab-active';
		$this->nav_tabs['add_message_template']['order'] = 15;

		//generate metabox
		
		$this->_template_path = EE_MSG_TEMPLATE_PATH . 'ee_msg_details_main_add_meta_box.template.php';
		$this->_add_admin_page_meta_box( 'insert_message_template', __('Add New Message Templates', 'event_espresso'), __FUNCTION__, NULL);

		//final template wrapper
		$this->display_admin_page_with_sidebar();

	}

	/**
	 * _edit_message_template
	 * 
	 * @access protected
	 * @return void
	 */
	protected function _edit_message_template() {
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		$GRP_ID = isset( $_REQUEST['id'] ) && !empty( $_REQUEST['id'] ) ? absint( $_REQUEST['id'] ) : FALSE;

		$EVT_ID = isset( $_REQUEST['evt_id'] ) && !empty( $_REQUEST['evt_id'] ) ? absint( $_REQUEST['evt_id'] ) : FALSE;

		$context = isset( $_REQUEST['context']) && !empty($_REQUEST['context'] ) ? strtolower($_REQUEST['context']) : 'admin';

		//let's get the message templates
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Message_Template.model.php');
		$MTP = EEM_Message_Template::instance();

		if ( empty($GRP_ID) && $new_template ) {
			$message_template = $MTP->get_new_template;
			$action = 'insert_message_template';
			$button_both = FALSE;
			$button_text = array( __( 'Save','event_espresso') );
			$button_actions = array('something_different');
			$edit_message_template_form_url = add_query_arg( array( 'action' => $action, 'noheader' => TRUE ), EE_MSG_ADMIN_URL );
		} else {
			$message_template = $MTP->get_message_template_by_ID($GRP_ID);
			$action = 'update_message_template';
			$button_both = TRUE;
			$button_text = array();
			$button_actions = array();
			$edit_message_template_form_url = add_query_arg( array( 'action' => $action, 'noheader' => TRUE ), EE_MSG_ADMIN_URL );
		}

		//todo: we need to assemble the title from Various details
		$context_label = sprintf( __('(%s Context)', 'event_espresso'), ucwords(str_replace('_', ' ', $context) ) );

		//todo: we should eventually display the event title instead of ID.
		$event_label = $EVT_ID ? sprintf( __('for Event ID: %s', 'event_espresso'), $EVT_ID) : '';
		$title = sprintf( __('Edit %s %s Template %s %s', 'event_espresso'), ucwords(str_replace('_', ' ', $message_template->messenger()) ), ucwords(str_replace('_', ' ', $message_template->message_type()) ), $context_label, $event_label );

		$this->template_args['GRP_ID'] = $GRP_ID;
		$this->template_args['message_template'] = $message_template;
		$this->template_args['is_extra_fields'] = FALSE;



		//let's get the EE_messages_controller so we can get templates
		$MSG = new EE_messages();
		$template_field_structure = $MSG->get_fields($message_template->messenger(), $message_template->message_type());
		
		if ( is_wp_error($template_field_structure) ) {
			$this->_handle_errors($template_field_structure); 
			$template_field_structure = false;
			$template_fields = 'There was an error in assembling the fields for this display (you should see an error message';
		}

		$message_templates = $message_template->context_templates();

		//if we have the extra key.. then we need to remove the content index from the template_field_structure as it will get handled in the "extra" array.
		if ( isset( $template_field_structure[$context]['extra']) ) {
			foreach ( $template_field_structure[$context]['extra'] as $reference_field => $new_fields ) {
				unset( $template_field_structure[$context][$reference_field] );
			}
		}

		//let's loop through the template_field_structure and actually assemble the input fields!
		if ( !empty($template_field_structure) ) {
			$id_prefix= 'ee-msg-edit-template-fields-';
			foreach ( $template_field_structure[$context] as $template_field => $field_setup_array ) {
				//if this is an 'extra' template field then we need to remove any existing fields that are keyed up in the extra array and reset them.
				if ( $template_field == 'extra' ) {
					$this->template_args['is_extra_fields'] = TRUE;
					foreach ( $field_setup_array as $reference_field => $new_fields_array ) {
						foreach ( $new_fields_array as $extra_field =>  $extra_array ) {
							$field_id = $reference_field . '-' . $extra_field . '-content';
							$template_form_fields[$field_id] = $extra_array;
							$template_form_fields[$field_id]['name'] = 'MTP_template_fields[' . $reference_field . '][content][' . $extra_field . ']';
							$template_form_fields[$field_id]['value'] = !empty($message_templates) && isset($message_templates[$context][$reference_field]['content'][$extra_field]) ? $message_templates[$context][$reference_field]['content'][$extra_field] : '';
							$template_form_fields[$field_id]['db-col'] = 'MTP_content';
							
						}
						$templatefield_MTP_id = $reference_field . '-MTP_ID';
						$templatefield_templatename_id = $reference_field . '-name';

						$template_form_fields[$templatefield_MTP_id] = array(
							'name' => 'MTP_template_fields[' . $reference_field . '][MTP_ID]',
							'label' => NULL,
							'input' => 'hidden',
							'type' => 'int',
							'required' => FALSE,
							'validation' => FALSE,
							'value' => !empty($message_templates) ? $message_templates[$context][$reference_field]['MTP_ID'] : '',
							'css_class' => '',
							'format' => '%d',
							'db-col' => 'MTP_ID'
						);

						$template_form_fields[$templatefield_templatename_id] = array(
							'name' => 'MTP_template_fields[' . $reference_field . '][name]',
							'label' => NULL,
							'input' => 'hidden',
							'type' => 'string',
							'required' => FALSE,
							'validation' => TRUE,
							'value' => $reference_field,
							'css_class' => '',
							'format' => '%s',
							'db-col' => 'MTP_template_field'
						);
					}
					continue; //skip the next stuff, we got the necessary fields here for this dataset.
				} else {
					$field_id = $template_field . '-content';
					$template_form_fields[$field_id] = $field_setup_array;
					$template_form_fields[$field_id]['name'] = 'MTP_template_fields[' . $template_field . '][content]';
					$template_form_fields[$field_id]['value'] = !empty($message_templates) && isset($message_templates[$context][$template_field]['content']) ? $message_templates[$context][$template_field]['content'] : '';
					$template_form_fields[$field_id]['db-col'] = 'MTP_content';
				}

				//k took care of content field(s) now let's take care of others.

				$templatefield_MTP_id = $template_field . '-MTP_ID';
				$templatefield_field_templatename_id = $template_field . '-name';

				//foreach template field there are actually two form fields created
				$template_form_fields[$templatefield_MTP_id] = array(
					'name' => 'MTP_template_fields[' . $template_field . '][MTP_ID]',
					'label' => NULL,
					'input' => 'hidden',
					'type' => 'int',
					'required' => FALSE,
					'validation' => TRUE,
					'value' => !empty($message_templates) ? $message_templates[$context][$template_field]['MTP_ID'] : '',
					'css_class' => '',
					'format' => '%d',
					'db-col' => 'MTP_ID'
				);

				$template_form_fields[$templatefield_field_templatename_id] = array(
					'name' => 'MTP_template_fields[' . $template_field . '][name]',
					'label' => NULL,
					'input' => 'hidden',
					'type' => 'string',
					'required' => FALSE,
					'validation' => TRUE,
					'value' => $template_field,
					'css_class' => '',
					'format' => '%s',
					'db-col' => 'MTP_template_field'
				);

			}

			//add other fields
			$template_form_fields['ee-msg-current-context'] = array(
					'name' => 'MTP_context',
					'label' => null,
					'input' => 'hidden',
					'type' => 'string',
					'required' => FALSE,
					'validation' => TRUE,
					'value' => $context,
					'css_class' => '',
					'format' => '%s',
					'db-col' => 'MTP_context'
				);
			$template_form_fields['ee-msg-event'] = array(
					'name' => 'EVT_ID',
					'label' => null,
					'input' => 'hidden',
					'type' => 'int',
					'required' => FALSE,
					'validation' => TRUE,
					'value' => $EVT_ID,
					'css_class' => '',
					'format' => '%d',
					'db-col' => 'EVT_ID'
				);

			$template_form_fields['ee-msg-grp-id'] = array(
					'name' => 'GRP_ID',
					'label' => null,
					'input' => 'hidden',
					'type' => 'int',
					'required' => FALSE,
					'validation' => TRUE,
					'value' => $GRP_ID,
					'css_class' => '',
					'format' => '%d',
					'db-col' => 'GRP_ID'
				);

			$template_form_fields['ee-msg-messenger'] = array(
					'name' => 'MTP_messenger',
					'label' => null,
					'input' => 'hidden',
					'type' => 'string',
					'required' => FALSE,
					'validation' => TRUE,
					'value' => $message_template->messenger(),
					'css_class' => '',
					'format' => '%s',
					'db-col' => 'MTP_messenger'
				);

			$template_form_fields['ee-msg-message-type'] = array(
					'name' => 'MTP_message_type',
					'label' => null,
					'input' => 'hidden',
					'type' => 'string',
					'required' => FALSE,
					'validation' => TRUE,
					'value' => $message_template->message_type(),
					'css_class' => '',
					'format' => '%s',
					'db-col' => 'MTP_message_type'
				);

			$sidebar_form_fields['ee-msg-is-global'] = array(
					'name' => 'MTP_is_global',
					'label' => __('Global Template', 'event_espresso'),
					'input' => 'checkbox',
					'type' => 'int',
					'required' => FALSE,
					'validation' => TRUE,
					'value' => $message_templates[$context]['MTP_is_global'],
					'css_class' => '',
					'format' => '%d',
					'db-col' => 'MTP_is_global'
				);

			$sidebar_form_fields['ee-msg-is-override'] = array(
					'name' => 'MTP_is_override',
					'label' => __('Override all custom', 'event_espresso'),
					'input' => 'checkbox',
					'type' => 'int',
					'required' => FALSE,
					'validation' => TRUE,
					'value' => $message_templates[$context]['MTP_is_override'],
					'css_class' => '',
					'format' => '%d',
					'db-col' => 'MTP_is_override'
				);

			$sidebar_form_fields['ee-msg-deleted'] = array(
					'name' => 'MTP_deleted',
					'label' => null,
					'input' => 'hidden',
					'type' => 'int',
					'required' => FALSE,
					'validation' => TRUE,
					'value' => $message_templates[$context]['MTP_deleted'],
					'css_class' => '',
					'format' => '%d',
					'db-col' => 'MTP_deleted'
				);
			$sidebar_form_fields['ee-msg-author'] = array(
				'name' => 'MTP_user_id',
				'label' => __('Author', 'event_espresso'),
				'input' => 'hidden',
				'type'=> 'int',
				'required' => FALSE,
				'validation' => FALSE,
				'value' => !empty($message_templates[$context]['MTP_user_id']) ? $message_templates[$context]['MTP_user_id'] : get_current_user_id(),
				'format' => '%d',
				'db-col' => 'MTP_user_id'
			);

			$sidebar_array = array('ee-msg-is-global', 'ee-msg-is-override', 'ee-msg-deleted');

			//send to field generator
			
			$template_fields = $this->_generate_admin_form_fields( $template_form_fields );
			$sidebar_fields = $this->_generate_admin_form_fields( $sidebar_form_fields );

			if ( is_wp_error($template_fields) ) {
				$this->_handle_errors($template_fields);
			}

		} //end if ( !empty($template_field_structure) )

		//setup context switcher
		$context_switcher_args = array(
			'page' => 'messages',
			'action' => 'edit_message_template',
			'id' => $GRP_ID,
			'evt_id' => $EVT_ID,
			'context' => $context
		);
		$this->_set_context_switcher($message_template, $context_switcher_args);

		$this->_set_save_buttons($button_both, $button_text, $button_actions);

		//sidebar box
		$this->template_args['sidebar_content'] = $sidebar_fields . $this->template_args['save_buttons'];
		$this->template_args['sidebar_description'] = '';
		$this->template_args['sidebar_title'] = '';
		$sidebar_title = __('Other Details', 'event_espresso');
		$sidebar_action = 'update_message_template_sidebar';
		$sidebar_template_path = EE_MSG_TEMPLATE_PATH . 'ee_msg_details_sidebar_edit_meta_box.template.php';

		//main box
		$this->template_args['template_fields'] = $template_fields;
		$this->template_args['sidebar_box_id'] = 'details';
		$this->template_args['action'] = $action;
		$this->template_args['context'] = $context;
		$this->template_args['EVT_ID'] = $EVT_ID;
		$this->template_args['edit_message_template_form_url'] = $edit_message_template_form_url;
		$this->template_args['learn_more_about_message_templates_link'] = $this->_learn_more_about_message_templates_link();

		//add nav tab for this page
		$this->nav_tabs['edit_message_template']['url'] = wp_nonce_url( add_query_arg( array( 'action' => 'edit_message_template', 'id' => $GRP_ID, 'context' => $context, 'evt_id' => $EVT_ID), EE_MSG_ADMIN_URL ), $action . '_nonce' );
		$this->nav_tabs['edit_message_template']['link_text'] = __('Edit Message Template', 'event_espresso');
		$this->nav_tabs['edit_message_template']['css_class'] = ' nav-tab-active';
		$this->nav_tabs['edit_message_template']['order'] = 15;

		add_action('action_hook_espresso_before_admin_page_content', array($this, 'add_context_switcher'), 5 );
		add_action('action_hook_espresso_before_admin_page_content', array($this, '_add_form_element_before'), 10 );
		add_action('action_hook_espresso_after_admin_page_content', array($this, '_add_form_element_after') );

		$this->_template_path = $this->template_args['GRP_ID'] ? EE_MSG_TEMPLATE_PATH . 'ee_msg_details_main_edit_meta_box.template.php' : EE_MSG_TEMPLATE_PATH . 'ee_msg_details_main_add_meta_box.template.php';

		//generate metabox
		$this->_add_admin_page_meta_box( $action, $title, __FUNCTION__, NULL );

		//sidebar metabox (if we are editing)
		if ( $this->template_args['GRP_ID'] ) {
			$this->_template_path = $sidebar_template_path;
			$this->_add_admin_page_meta_box( $sidebar_action, $sidebar_title, __FUNCTION__, NULL, 'side');
		}

		//shortcode metabox (if we are editing)
		//todo: this should be moved to it's own method.  It's just a placeholder right now but the displayed shortcodes should be dynamic (we might need to create a shortcoode object for holding all valid shortcodes and message_types can register_new shortocdes with the object);
		if ( $this->template_args['GRP_ID'] ) {
			$this->template_args['sidebar_content'] = 'Place holder, this will contain shortcodes that can be used with the template';
			$sidebar_title = __('Shortcodes', 'event_espresso');
			$this->template_args['sidebar_box_id'] = 'shortcodes';
			$sidebar_action = 'update_message_template_sidebar_shortcodes';
			$this->_add_admin_page_meta_box( $sidebar_action, $sidebar_title, __FUNCTION__, NULL, 'side');
		}/**/

		//oh while we're at it... let's remove the espresso metaboxes.  We don't need them on this page.
		remove_meta_box('espresso_news_post_box', $this->wp_page_slug, 'side');
		remove_meta_box('espresso_links_post_box', $this->wp_page_slug, 'side');

		//final template wrapper
		$this->display_admin_page_with_sidebar();
	}

	public function add_context_switcher() {
		echo $this->_context_switcher;
	}

	public function _add_form_element_before() {
		echo '<form method="post" action="' . $this->template_args["edit_message_template_form_url"] . '" id="ee-msg-edit-frm">';
	}

	public function _add_form_element_after() {
		echo '</form>';
	}

	/**
	 * sets up a context switcher for edit forms
	 *
	 * @access  private
	 * @param  object $template_object the template object being displayed on the form
	 * @param array $args various things the context switcher needs.
	 * @return void
	 */
	private function _set_context_switcher($template_object, $args) {
		ob_start();
		?>
		<div class="ee-msg-switcher-container">
			<form method="get" action="<?php echo EE_MSG_ADMIN_URL; ?>" id="ee-msg-context-switcher-frm">
				<?php
					foreach ( $args as $name => $value ) {
						if ( $name == 'context' || empty($value) ) continue;
						?>
						<input type="hidden" name="<?php echo $name; ?>" value = "<?php echo $value; ?>" />
						<?php
					}
					//setup nonce_url
					wp_nonce_field($args['action'] . '_nonce', '_wpnonce', false);
				?>
				<select name="context">
					<?php 
					$context_templates = $template_object->context_templates();
					if ( is_array($context_templates) ) :
							foreach ( $context_templates as $context => $template_fields ) :
								$checked = ($context == $args['context']) ? 'selected="selected"' : '';
					?>
					<option value="<?php echo $context; ?>" <?php echo $checked; ?>><?php echo $context; ?></option>
					<?php endforeach; endif; ?>
				</select>
				<input id="submit-msg-context-switcher-sbmt" class="button-secondary" type="submit" value="Switch Context">
			</form>
		</div> <!-- end .ee-msg-switcher-container -->
		<?php
		$output = ob_get_contents();
		ob_clean();
		$this->_context_switcher = $output;
	}

	/**
	 * utility for sanitizing new values coming in.
	 * Note: this is only used when updating a context.
	 * 
	 * @access protected
	 * @param int $index This helps us know which template field to select from the request array.
	 */
	protected function _set_message_template_column_values($index) {
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
		$set_column_values = array(
			'MTP_ID' => absint($_REQUEST['MTP_template_fields'][$index]['MTP_ID']),
			'EVT_ID' => absint($_REQUEST['EVT_ID']),
			'GRP_ID' => absint($_REQUEST['GRP_ID']),
			'MTP_user_id' => absint($_REQUEST['MTP_user_id']),
			'MTP_messenger'	=> strtolower($_REQUEST['MTP_messenger']),
			'MTP_message_type' => strtolower($_REQUEST['MTP_message_type']),
			'MTP_template_field' => strtolower($_REQUEST['MTP_template_fields'][$index]['name']),
			'MTP_context' => strtolower($_REQUEST['MTP_context']),
			'MTP_content' => maybe_serialize($_REQUEST['MTP_template_fields'][$index]['content']),
			'MTP_is_global' => isset($_REQUEST['MTP_is_global']) ? absint($_REQUEST['MTP_is_global']) : 0,
			'MTP_is_override' => isset($_REQUEST['MTP_is_override']) ? absint($_REQUEST['MTP_is_override']) : 0,
			'MTP_deleted' => absint($_REQUEST['MTP_deleted'])
		);
		return $set_column_values;
	}

	protected function _insert_or_update_message_template($new = FALSE ) {
		
		do_action ( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		$success = 0;

		//setup notices description	
		$messenger = !empty($_REQUEST['MTP_messenger']) ? ucwords(str_replace('_', ' ', $_REQUEST['MTP_messenger'] ) ) : false;
		$message_type = !empty($_REQUEST['MTP_message_type']) ? ucwords(str_replace('_', ' ', $_REQUEST['MTP_message_type'] ) ) : false;
		$context = !empty($_REQUEST['MTP_context']) ? ucwords(str_replace('_', ' ', $_REQUEST['MTP_context'] ) ) : false;
		$evt_id = !empty($_REQUEST['EVT_ID']) ? (int) $_REQUEST['EVT_ID'] : NULL;

		$item_desc = $messenger ? $messenger . ' ' . $message_type . ' ' . $context . ' ' : '';
		$item_desc .= 'Message Template';
		$query_args = array();

		//if this is "new" then we need to generate the default contexts for the selected messenger/message_type for user to edit.
		if ( $new ) {
			if ( $edit_array = $this->_generate_new_templates($messenger, $message_type, $evt_id) ) {
				if ( is_wp_error($edit_array) ) {
					$success = 0;
				} else {
					$success = 1;
					$edit_array = $edit_array[0];
					$query_args = array(
						'id' => $edit_array['GRP_ID'],
						'evt_id' => $edit_array['EVT_ID'],
						'context' => $edit_array['MTP_context'],
						'action' => 'edit_message_template'
						);
				}
			}
			$action_desc = 'created';
		} else {
			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Message_Template.model.php');
			$MTP = EEM_Message_Template::instance();
			
			//run update for each template field in displayed context
			if ( !isset($_REQUEST['MTP_template_fields']) && empty($_REQUEST['MTP_template_fields'] ) ) {
				$error =  new WP_Error( __('problem_saving_template_fields', 'event_espresso'), __('There was a problem saving the template fields from the form becuase I didn\'t receive any actual template field data.', 'even_espresso') . espresso_get_error_code(__FILE__, __FUNCTION__, __LINE__) );
				$this->_handle_errors($error);
				$success = 0;
				$action_desc = '';
				$query_args = array(
						'id' => $edit_array['GRP_ID'],
						'evt_id' => $edit_array['EVT_ID'],
						'context' => $edit_array['MTP_context'],
						'action' => 'edit_message_template'
						);
			} else {
				foreach ( $_REQUEST['MTP_template_fields'] as $template_field => $content ) {
					$set_column_values = $this->_set_message_template_column_values($template_field);
					$where_cols_n_values = array( 'MTP_ID' => $_REQUEST['MTP_template_fields'][$template_field]['MTP_ID']);
					if ( $updated = $MTP->update( $set_column_values, $where_cols_n_values ) ) {
						if ( is_wp_error($updated) ) {
							$this->_handle_errors($updated);
						} else {
							$success = 1;
						}
					}
					$action_desc = 'updated';
				}
			}
		
		$this->_redirect_after_action( $success, $item_desc, $action_desc, $query_args );

		}
	}

	/**
	 * _generate_new_templates
	 * This will handle the messenger, message_type selection when "adding a new custom template" for an event and will automatically create the defaults for the event.  The user would then be redirected to edit the default context for the event.
	 *
	 * @access protected
	 * @param  string  $messenger the messenger we are generating templates for
	 * @param array $message_types array of message types that the templates are generated for.
	 * @param int $evt_id If templates are event specific then we are also including the event_id
	 * @param bool $global true indicates generating templates on messenger activation. false requires evt_id for event specific template generation.
	 * @return array|error_object array of data required for the redirect to the correct edit page or error object if encountering problems.
	 */
	protected function _generate_new_templates($messenger, $message_types, $evt_id = NULL, $global = FALSE) {

		//make sure message_type is an array.
		$message_types = (array) $message_types;
		$templates = array();

		if ( empty($messenger) ) {
			$error = new WP_Error('empty_variable', __('We need a messenger to generate templates!', 'event_espresso') . espresso_get_error_code(__FILE__, __FUNCTION__, __LINE__) );
			$this->_handle_errors($error);
			return $error;
		}

		//if we STILL have empty $message_types then we need to generate an error message b/c we NEED message types to do the template files.
		if ( empty($message_types) ) {
			$error = new WP_Error('empty_variable', __('We need at least one message type to generate templates!', 'event_espresso') . espresso_get_error_code(__FILE__, __FUNCTION__, __LINE__) );
			$this->_handle_errors($error);
			return $error;
		}

		//todo: may need to explicitly load the file containing the class here.
		$MSG = new EE_messages();
		
		foreach ( $message_types as $message_type ) {
			$new_message_template_group = $MSG->create_new_templates($messenger, $message_type, $evt_id, $global);
			if ( is_wp_error($new_message_template_group) ) {
				$this->_handle_errors($new_message_template_group);
				continue;
			}
			$templates[] = $new_message_template_group;
		}

		return $templates;

	}

	/**
	 * [_trash_or_restore_message_template]
	 * 
	 * @access protected
	 * @param  boolean $trash whether to move an item to trash (TRUE) or restore it (FALSE)
	 * @param boolean $all whether this is going to trash all contexts within a template group (TRUE) OR just an individual context (FALSE).
	 * @return void
	 */
	protected function _trash_or_restore_message_template($trash = TRUE, $all = FALSE ) {
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Message_Template.model.php');
			$MTP = EEM_Message_Template::instance();

		$success = 1;
		$MTP_deleted = $trash ? TRUE : FALSE;

		//incoming GRP_IDs
		if ( $all ) {
			//Checkboxes
			if ( !empty( $_POST['checkbox'] ) && is_array($_POST['checkbox'] ) ) {
				//if array has more than one element then success message should be plural.
				//todo: what about nonce?
				$success = count( $_POST['checkbox'] ) > 1 ? 2 : 1;

				//cycle through checkboxes
				while ( list( $GRP_ID, $value ) = each ($_POST['checkbox']) ) {
					if ( ! $MTP->update(array('MTP_deleted' => $MTP_deleted), array('GRP_ID' => absint($GRP_ID) ) ) ) {
						$success = 0;
					}
				}
			} else {
				//grab single GRP_ID and handle
				$GRP_ID = absint($_REQUEST['id']);
				if ( !$MTP->update(array('MTP_deleted' => $MTP_deleted), array('GRP_ID' => $GRP_ID ) ) ) {
					$success = 0;
				}
			}
		//not entire GRP, just individual context
		} else {
			//we should only have the MTP_id for the context,
			//todo: will probably need to make sure we have a nonce here?
			$GRP_ID = absint( $_REQUEST['id'] );
			$MTP_message_type = strtolower( $_REQUEST['message_type']);
			$MTP_context = strtolower( $_REQUEST['context'] );
			
			if ( !$MTP->update(array('MTP_deleted' => $MTP_deleted), array('GRP_ID' => $GRP_ID, 'MTP_message_type' => $MTP_message_type, 'MTP_context' => $MTP_context ) ) ) {
				$success = 0;
			}
		}

		$action_desc = $trash ? 'moved to the trash' : 'restored';
		$item_desc = $all ? 'Message Template Group' : 'Message Template Context';
		$this->_redirect_after_action( $success, $item_desc, $action_desc, array() );
	
	}

	/**
	 * [_delete_message_template]
	 * NOTE: at this point only entire message template GROUPS can be deleted because it 
	 * @return void
	 */
	protected function _delete_message_template() {
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '' );
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Message_Template.model.php');
			$MTP = EEM_Message_Template::instance();

		$success = 1;

		//checkboxes
		if ( !empty($_POST['checkbox']) && is_array($_POST['checkbox'] ) ) {
			//if array has more than one element then success message should be plural
			$success = count( $_POST['checkbox'] ) > 1 ? 2 : 1;

			//cycle through bulk action checkboxes
			while ( list( $GRP_ID, $value ) = each($_POST['checkbox'] ) ) {
				if ( ! $MTP->delete_by_id(absint($GRP_ID) ) ) {
					$success = 0;
				}
			}
		} else {
			//grab single grp_id and delete
			$GRP_ID = absint($_REQUEST['id'] );
			if ( ! $MTP->delete_by_id($GRP_ID) ) {
				$success = 0;
			}
		}

		$this->_redirect_after_action( $success, 'Message Templates', 'deleted', array() );

	}

	/**
	 * 	_learn_more_about_message_templates_link
	*	@access protected
	*	@return string
	*/
	protected function _learn_more_about_message_templates_link() {
		return '<a class="hidden" style="margin:0 20px; cursor:pointer; font-size:12px;" >' . __('learn more about how message templates works', 'event_espresso') . '</a>';
	}

	/**
	 * [_event_name description]
	 * This just takes a given event_id and will output the name of the event for it.
	 * @todo: temporary... will need to remove/replace once proper Event models/classes are in place.
	 * @access private
	 * @param  int $evt_id event_id
	 * @return string event_name 
	 */
	private function _event_name($evt_id) {
		global $wpdb;
		$evt_id = absint($evt_id);
		$tablename = $wpdb->prefix . 'events_detail';
		$query = "SELECT event_name FROM {$table_name} WHERE id = '{$evt_id}'";
		$event_name = $wpdb->get_var( $wpdb->prepare($query) );
		return $event_name;
	}

	/**
	 * This sets up the activate messages and message types templates.
	 * 
	 * @access protected
	 * @return void
	 */
	protected function _activate_messages() {
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '');

		$view = isset($_REQUEST['activate_view']) ? $_REQUEST['activate_view'] : 'message_types';
		$this->_template_path = EE_MSG_TEMPLATE_PATH . 'ee_msg_activate_meta_box.template.php';

		//this will be an associative array for setting up the initial metaboxes for display.
		$meta_box_callbacks = array();

		$box_reference = array(
			'1' => 'normal',
			'2' => 'side',
			'3' => 'column3',
			'4' => 'column4'
			);

		$EE_MSG = new EE_messages();
		$installed_message_objects = $EE_MSG->get_installed();

		$column = 1;
		foreach ( $installed_message_objects[$view] as $installed ) {

			//if column is equal to 5 let's reset to 1.
			$column = 5 ? 1 : $column;
			$metabox_callback = 'activate_message_template_meta_box';
			$meta_box_callbacks[$column][] = array(
				'callback' => $metabox_callback,
				'object' => $installed,
				'view' => $view
				); 
			$column++;
		}

		//now let's handle adding the metaboxes
		foreach ( $meta_box_callbacks as $column => $callbacks ) {
			foreach ( $callbacks as $callback ) {
				$this->_activate_message_template_meta_box(array('name' => $callback['object']->name, 'view' => $callback['view'], 'object' => $callback['object'] ) );
				$meta_box_title = ucwords( str_replace('_', '', $callback['object'] -> name) ) . '  <span class="' . $this->_activate_state . '">[' . $this->_activate_state . ']</span>';
				$this->_add_admin_page_meta_box( $callback['object']->name . '-' . $view . '-metabox', $meta_box_title, $callback['callback'], '', $box_reference[$column], 'default' );
			}
		}

		//oh while we're at it... let's remove the espresso metaboxes.  We don't need them on this page.
		remove_meta_box('espresso_news_post_box', $this->wp_page_slug, 'side');
		remove_meta_box('espresso_links_post_box', $this->wp_page_slug, 'side');

		//final template wrapper
		$this->display_admin_page_with_metabox_columns();
	}

	/**
	 * this method sets the messenger/message_type metabox contents
	 * @param  array $metabox arguments passed via the caller
	 * @return string          outputs the actual metabox contents
	 */
	private function _activate_message_template_meta_box($args) {
		$box_name = false;
		$this->_activate_meta_box_type = $args['view'];
		$this->_current_message_meta_box = $args['name'];
		$this->_current_message_meta_box_object = $args['object'];

		//first let's handle any database actions
		$this->_handle_activate_db_actions();

		//define template arg defaults
		$default_edit_query_args = array(
			'activate_view' => $this->_activate_meta_box_type,
			'activate_state' => $this->_current_message_meta_box . '_editing',
			'action' => 'activate'
		);
		$nonce_edit_ref = $this->_current_message_meta_box . '_edit_nonce';

		$default_activate_query_args = array(
			'activate_view' => $this->_activate_meta_box_type,
			'activate_state' => $this->_current_message_meta_box . '_active',
			'box_action' => 'activated',
			'action' => 'activate'
		);
		$nonce_activate_ref = $this->_current_message_meta_box . '_activate_nonce';

		$default_deactivate_query_args = array(
			'activate_view' => $this->_activate_meta_box_type,
			'activate_state' => $this->_current_message_meta_box . '_inactive',
			'box_action' => 'deactivated',
			'action' => 'activate'
		);
		$nonce_deactivate_ref = $this->_current_message_meta_box . '_deactivate_nonce';

		

		$switch_view_toggle_text = $this->_activate_meta_box_type == 'message_types' ? 'messengers' : 'message_types';

		$switch_view_query_args = array(
			'action' => 'activate',
			'activate_view' => $switch_view_toggle_text,
		);

		$default_template_args = array(
			'box_id' => $this->_current_message_meta_box,
			'box_view' => $this->_activate_meta_box_type,
			'activate_state' => 'inactive',
			'box_head_content' => 'hmm... missing some content',
			'show_hide_active_content' => 'hidden',
			'activate_msgs_active_details' => '',
			'activate_msgs_details_url' => wp_nonce_url(add_query_arg($default_edit_query_args, $this->admin_base_url), $nonce_edit_ref),
			'show_hide_edit_form' => 'hidden',
			'activate_message_template_form_action' => wp_nonce_url(add_query_arg($default_activate_query_args, $this->admin_base_url), $nonce_activate_ref),
			'activate_msgs_form_fields' => '',
			'on_off_action' => wp_nonce_url(add_query_arg($default_edit_query_args, $this->admin_base_url), $nonce_edit_ref),
			'on_off_status' => 'inactive',
			'activate_msgs_on_off_descrp' => __('Activate', 'event-espresso'),
			'activate_meta_box_type' => ucwords(str_replace('_', ' ', $this->_activate_meta_box_type) ),
			'activate_meta_box_page_instructions' => $this->_activate_meta_box_type == 'message_types' ? __('Message Types are the areas of Event Espresso that you can activate notifications for.  On this page you can see all the various message types currently available and whether they are active or not.', 'event-espresso') : __('Messengers are the vehicles for delivering your notifications.  On this page you can see all the various messengers available and whether they are active or not.', 'event-espresso'),
			'activate_msg_type_toggle_link' => add_query_arg($switch_view_query_args, $this->admin_base_url),
			'activate_meta_box_toggle_type' => ucwords(str_replace('_', ' ', $switch_view_toggle_text) ),
			'on_off_action_on' => wp_nonce_url(add_query_arg($default_edit_query_args, $this->admin_base_url), $nonce_edit_ref),
			'on_off_action_off' => wp_nonce_url(add_query_arg($default_deactivate_query_args, $this->admin_base_url), $nonce_deactivate_ref),
			'show_on_off_button' => ''
			);

		$this->template_args = array_merge($default_template_args, $this->template_args);

		
		//let's check and see if we've got a specific state for this box. if so we need to set the state accordingly (or if no state set we need to try and figure that out - can't be stateless now can we?)
		if ( !empty($this->_activate_state) && is_array($this->_activate_state) && $box_name = explode('_', $this->_activate_state[0]) ) {

			$this->_activate_state = $box_name ? $box_name[1] : false;
		}

		//still stateless eh?  K let's see if we can get the state from the database.
		$ref = '_active_' . $this->_activate_meta_box_type;
		if ( !$this->_activate_state ) {
			$this->_activate_state = isset($this->{$ref}[$this->_current_message_meta_box]) ? 'active' : 'inactive';
		}

		$admin_header_template_path = EE_MSG_TEMPLATE_PATH . 'ee_msg_activate_details_header.template.php';
		$this->template_args['admin_page_header'] = espresso_display_template( $admin_header_template_path, $this->template_args, TRUE);

		call_user_func( array($this, '_box_content_'.$this->_activate_state) );
	}


	/**
	 * this method sets up basic info about the messenger/message type and the relevant buttons for activating.
	 * @return void	
	 */
	private function _box_content_inactive() {
		//this is default view.  But we need to check and see if this messenger/message_type is actually active.  If it is, then let's load that instead.

		if ( (in_array($this->_current_message_meta_box, array_keys($this->_active_messengers) ) || in_array($this->_current_message_meta_box, array_keys($this->_active_message_types) )) && !isset($_REQUEST['box_action']) ) {
			$this->_box_content_active();
			return;
		}

		//common elements
		$this->template_args['box_head_content'] = $this->_current_message_meta_box_object->description;
	}

	/**
	 * this method shows the messenger/message type as active and shows buttons for editing settings/making inactive
	 * @return void 
	 */
	private function _box_content_active() {
		//setup content
		$content = '';
		$ref = '_active_' . $this->_activate_meta_box_type;

		//fields
		$settings_fields = $this->_current_message_meta_box_object->get_admin_settings_fields();
		$existing_settings_fields = isset($this->{$ref}[$this->_current_message_meta_box]['settings']) ? $this->{$ref}[$this->_current_message_meta_box]['settings'] : null;


		//if the following condition is met then we need to load the edit form instead.
		//note that if there are not any existing settings and this is a messengers box display then we show editing even if there are no default fields BECAUSE, messengers need to have selected message types with them.
		
		if ( ( empty($existing_settings_fields) && !empty($settings_fields) ) || ( empty($existing_settings_fields) && $this->_activate_meta_box_type == 'messengers' ) ) {
			$this->_box_content_editing();
			return;
		}

		//we're still here so let's setup the display for this page.
		if ( !empty($existing_settings_fields) ) {
			$content = '<ul>';
			foreach ( $existing_settings_fields as $field_name => $field_value ) {
				$field_name = str_replace($this->_current_message_meta_box . '-', '', $field_name);
				$content .= '<li>' . ucwords(str_replace('_', ' ', $field_name) ) . ': ';
				if ( $field_name == 'message_types' ) {
					$content .= '<ul class="message-type-list">';
					foreach ( $field_value as $mt => $value ) {
						$content .= '<li>' . $mt . '</li>';
					}
					$content .= '</ul></li>';
				} else {
					$content .= $field_value;
				}
			}
			$content .= '</ul>';
		}

		//setup template args
		$this->template_args['activate_state'] = 'active';
		$this->template_args['box_head_content'] = $this->_current_message_meta_box_object->description;

		if ( !empty($content ) ) {
			$this->template_args['show_hide_active_content'] = '';
			$this->template_args['activate_msgs_active_details'] = $content;
			$this->template_args['activate_msgs_details_url'] = $this->template_args['on_off_action'];
		}

		$this->_activate_state = 'active';

		$this->template_args['on_off_status'] = 'active';
		$this->template_args['activate_msgs_on_off_descrp'] = __('Deactivate', 'event_espresso');
		$this->template_args['on_off_action'] = $this->template_args['on_off_action_off'];
	}

	/**
	 * this method shows the settings form for the displayed messenger/message_type meta box.
	 * @return void 
	 */
	private function _box_content_editing() {
		$template_form_fields = '';
		$settings_fields = $this->_current_message_meta_box_object->get_admin_settings_fields();
		$existing_settings_fields = $this->_current_message_meta_box_object->get_existing_admin_settings();
		$template_form_field = $mt_template_form_field = array();
		$mt_field_content = NULL;

		//if we don't have any settings fields then we don't need to do any editing so let's just make active
		if ( empty($settings_fields) && $this->_activate_meta_box_type != 'messengers' ) {
			$_REQUEST['box_action'] = 'activated';
			$this->_activate_state = 'active';
			$this->_handle_activate_db_actions();
			return;
		}

		// if we don't have any active message types and this is a messenger box view, then we need to display a notice that we can't activate any messengers until a message type is activated (NOTE: this is just a failsafe.  By default EE will always ship with at least one message type active, but we do want to make it possible for people to turn off all notifications if they want (don't know why they'd want to but anyway...))
		if ( $this->_activate_meta_box_type == 'messengers' && empty($this->_active_message_types) ) {
			$switch_view_query_arg = array(
				'action' => 'activate',
				'activate_view' => 'message_types'
				);
			$error = new WP_Error('missing_required_message_types', sprintf( __('Before any messengers can be activated there needs to be at least one <a href="%s" title="Click to switch to message types">Message Type</a> active', 'event_espresso'), add_query_arg($switch_view_query_arg, $this->admin_base_url) ) . espresso_get_error_code(__FILE__, __FUNCTION__, __LINE__ ) );
			$this->_handle_errors($error);
			$this->_activate_state = 'inactive';
			$this->_box_content_inactive();
			return;
		}

		foreach ( $settings_fields as $field => $items ) {
			$field_id = $this->_current_message_meta_box . '-' . $field;
			$template_form_field[$field_id] = array(
				'name' => $field_id,
				'label' => $items['label'],
				'input' => $items['field_type'],
				'type' => $items['value_type'],
				'required' => $items['required'],
				'validation' => $items['validation'],
				'value' => isset($existing_settings_fields[$field_id]) ? $existing_settings_fields[$field_id] : $items['default'],
				'css_class' => '',
				'format' => $items['format'],
				'db-col' => NULL
			);
		}

		//hang on.  We also need to make sure we get fields setup for the active message types (if this is a messenger view) b/c we need to know what messagetypes this messenger is going to be used with.
		
		
		if ( $this->_activate_meta_box_type == 'messengers' && !empty($this->_active_message_types) ) {
			foreach ( $this->_active_message_types as $mt => $values ) {
				$field_id = $this->_current_message_meta_box . '-message_types[' . $mt . ']';
				$is_using_message_type = isset($existing_settings_fields[$field_id]) && $existing_settings_fields[$field_id] ? TRUE : FALSE;
				$mt_template_form_field[$field_id] = array(
					'name' => $field_id,
					'label' => ucwords(str_replace('_',' ', $mt) ),
					'input' => 'checkbox',
					'type' => 'int',
					'required' => FALSE,
					'validation' => TRUE,
					'value' => isset($existing_settings_fields[$field_id]) ? $existing_settings_fields[$field_id] : NULL,
					'css_class' => '',
					'format' => '%d',
					'db-col' => NULL
				);
			}

			//we need to make sure at least one of these fields is checked.  If there is no fields checked then let's check the payment message type.
			if ( isset($is_using_message_type) && !$is_using_message_type ) {
				$mt_template_form_field[$this->_current_message_meta_box . '-message_types[payment]']['value'] = 1;
			}

			$mt_template_form_fields = !empty($mt_template_form_field) ? $this->_generate_admin_form_fields( $mt_template_form_field, 'ee_msg_activate_form') : NULL;

			//make sure is an array.
			$mt_template_form_fields = (array) $mt_template_form_fields;

			if ( is_wp_error($mt_template_form_fields) ) {
				$this->_handle_errors($mt_template_form_fields);
				$mt_template_form_fields = NULL;
			}


			if ( !empty($mt_template_form_fields) ) {
				$mt_field_content = '<div class="ee_msg_activate_form_mts">';
				$mt_field_content .= '<p><strong>' . __('Use these message types', 'event_espresso') . '</strong></p>';
				$mt_field_content .= '<ul>';

				foreach ( $mt_template_form_fields as $checkbox ) {
					$mt_field_content .= '<li>' . $checkbox . '</li>';
				}

				$mt_field_content .= '</ul>';
				$mt_field_content .= '</div> <!-- end .ee_msg_activate_form_mts -->';
			}
		}

		$template_form_fields = !empty($template_form_field) ? $this->_generate_admin_form_fields( $template_form_field, 'ee_msg_activate_form' ) : '';

		if ( is_wp_error($template_form_fields) ) {
			$this->_handle_errors($template_form_fields);
			$template_form_fields = NULL;
		}

		$template_form_fields = !empty($mt_field_content) ? $template_form_fields . $mt_field_content : $template_form_fields;

		$this->template_args['activate_state'] = 'editing';
		$this->template_args['box_head_content'] = $this->_current_message_meta_box_object->description;
		$this->_activate_state = 'editing';

		if ( !empty($template_form_fields) ) {
			$this->template_args['show_hide_edit_form'] = '';
			$this->template_args['activate_msgs_form_fields'] = $template_form_fields;
			$this->template_args['on_off_action'] = empty($existing_settings_fields) ? $this->template_args['on_off_action_on'] : $this->template_args['on_off_action_off'];
			$this->template_args['activate_msgs_on_off_descrp'] = empty($existing_settings_fields) ? __('Activate','event_espresso') : __('Deactivate', 'event_espresso');
			$this->template_args['on_off_status'] = empty($existing_settings_fields) ? 'inactive' : 'active';
			$this->template_args['show_on_off_button'] = 'hidden';
		}
	}





	/**
	 * this simply takes care of any box_actions coming in for activation metaboxes and handles the data appropriately.
	 *
	 * @access  private
	 * @return void
	 */
	private function _handle_activate_db_actions() {
		//nothing needed if there is no box_action.
		if ( !isset($_REQUEST['box_action'] ) )
			return;
		
		switch ( $_REQUEST['box_action'] ) {
			case 'activated' :
				//check nonces
				$nonce = $_REQUEST['_wpnonce'];
				if ( !wp_verify_nonce($nonce, $this->_current_message_meta_box . '_activate_nonce' ) && !wp_verify_nonce($nonce, $this->_current_message_meta_box . '_edit_nonce') ) {
					$this->_nonce_error( espresso_get_error_code(__FILE__, __FUNCTION__, __LINE__) );
					$this->_activate_state = 'inactive';
					$this->_box_content_inactive();
					return;
				}
				$this->_update_msg_settings();
				break;

			case 'deactivated' :
				//check nonce
				$nonce = $_REQUEST['_wpnonce'];
				if ( !wp_verify_nonce($nonce, $this->_current_message_meta_box . '_deactivate_nonce' ) ) {
					$this->_nonce_error( espresso_get_error_code(__FILE__, __FUNCTION__, __LINE__) );
					$this->_activate_state = 'inactive';
					$this->_box_content_inactive();
					return;
				}
				$this->_update_msg_settings(true);
				break;	
		}
	}




	/**
	 * This just updates the active_messenger or active_message_types usermeta field when activated/deactivated.
	 * @param  boolean $remove if true then we remove
	 * @return void
	 */
	private function _update_msg_settings($remove = false) {
		global $espresso_wp_user, $espresso_notices;
		$success_msg = array();
		$update = FALSE;
		$ref = '_active_' . $this->_activate_meta_box_type;
		if ( !$remove ) {
			if ( isset($_POST['ee-msg-activate-form'] ) ) {
				unset($_POST['ee-msg-activate-form']);
				$update = TRUE;
			}
			$this->{$ref}[$this->_current_message_meta_box]['settings'] = $update ? $_POST : NULL;
			update_user_meta($espresso_wp_user, 'ee_active_' . $this->_activate_meta_box_type, $this->{$ref});
			$success_msg = sprintf( __('%s %s has been successfully activated', 'event_espresso'), ucwords(str_replace('_', ' ' , $this->_current_message_meta_box) ), ucwords(str_replace('_', ' ', rtrim($this->_activate_meta_box_type, 's') ) ) );
			
			if ( $this->_activate_meta_box_type == 'messengers' && $this->_activate_state[0] == $this->_current_message_meta_box . '_active' ) {
				$message_types = isset($this->_active_messengers[$this->_current_message_meta_box]['settings'][$this->_current_message_meta_box . '-message_types']) ? array_keys($this->_active_messengers[$this->_current_message_meta_box]['settings'][$this->_current_message_meta_box . '-message_types']) : NULL;
				$templates = $this->_generate_new_templates($this->_current_message_meta_box, $message_types, '', TRUE);
				//todo: templates aren't getting generated.
			}
		} else {
			unset($this->{$ref}[$this->_current_message_meta_box]);
			update_user_meta($espresso_wp_user, 'ee_active_' . $this->_activate_meta_box_type, $this->{$ref});
			$success_msg = sprintf( __('%s %s has been successfully deactivated', 'event_espresso'), ucwords(str_replace('_', ' ', $this->_current_message_meta_box) ) , ucwords(str_replace('_', ' ', rtrim($this->_activate_meta_box_type, 's') ) ) );
			//todo: we need to delete any templates that are associated.  If this is a messenger, then delete all templates matching the messenger.  If this is a message_type, then delete all templates matching the message type.  We also need to make sure that any messengers that have this associated message type have that message type removed from the messenger settings.
		}

		$espresso_notices['success'][] = $success_msg;
	}



	/**
	 * This is just a common error handler for nonce check fails.
	 * @param  string $error_code generated error code (so we know where the nonce fail happened)
	 * @return void 
	 */
	private function _nonce_error($error_code) {
		$error = new WP_Error('nonce_check_fail', __('Security check failed.', 'event_espresso') . $error_code);
		$this->_handle_errors($error);
	}
}