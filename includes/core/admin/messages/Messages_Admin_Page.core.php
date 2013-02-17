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

class Messages_Admin_Page extends EE_Admin_Page {

	private $_active_messengers = array();
	private $_active_message_types = array();
	private $_activate_state;
	private $_activate_meta_box_type;
	private $_current_message_meta_box;
	private $_current_message_meta_box_object;
	private $_context_switcher;
	private $_shortcodes = array();
	private $_message_template;

	/**
	 * constructor
	 * @constructor 
	 * @access public
	 * @return void
	 */
	public function __construct( $routing = TRUE ) {
		parent::__construct($routing);
	}





	protected function _init_page_props() {
		global $espresso_wp_user;
		$this->page_slug = 'ee_messages';
		$this->page_label = __('Messages System', 'event_espresso');

		$this->_activate_state = isset($this->_req_data['activate_state']) ? (array) $this->_req_data['activate_state'] : array();
	

		//we're also going to set the active messengers and active message types in here.
		$this->_active_messengers = get_user_meta($espresso_wp_user, 'ee_active_messengers', true);
		$this->_active_messengers = !empty($this->_active_messengers) ?  $this->_active_messengers : array();
		$this->_active_message_types = get_user_meta($espresso_wp_user, 'ee_active_message_types', true);
		$this->_active_message_types = !empty($this->_active_message_types ) ? $this->_active_message_types : array();

		//what about saving the objects in the active_messengers and active_message_types?
		$this->_load_active_messenger_objects();
		$this->_load_active_message_type_objects();
	}




	/**
	 * loads messenger objects into the $_active_messengers property (so we can access the needed methods)
	 *
	 * @access  private
	 * @return void 
	 */
	private function _load_active_messenger_objects() {
		foreach ( $this->_active_messengers as $messenger => $values ) {
			$ref = ucwords( str_replace( '_' , ' ', $messenger) );
			$ref = str_replace( ' ', '_', $ref );
			$classname = 'EE_' . $ref . '_messenger';

			if ( !class_exists($classname) )
				throw new EE_Error( sprintf( __('There is no messenger for the given classname (%s)', 'event_espresso'), $classname ) );

			$a = new ReflectionClass( $classname );
			$this->_active_messengers[$messenger]['obj'] = $a->newInstance();
		}
	}




	/**
	 * loads messenger objects into the $_active_messengers property (so we can access the needed methods)
	 *
	 * @access  private
	 * @return void 
	 */
	private function _load_active_message_type_objects() {
		foreach ( $this->_active_message_types as $message_type => $values ) {
			$ref = ucwords( str_replace( '_' , ' ', $message_type) );
			$ref = str_replace( ' ', '_', $ref );
			$classname = 'EE_' . $ref . '_message_type';

			if ( !class_exists($classname) )
				throw new EE_Error( sprintf( __('There is no message type for the given classname (%s)', 'event_espresso'), $classname ) );

			$a = new ReflectionClass( $classname );
			$this->_active_message_types[$message_type]['obj'] = $a->newInstance();
		}
	}



	protected function _ajax_hooks() {
		//todo: all hooks for ajax goes in here.
	}






	protected function _define_page_props() {
		$this->_admin_base_url = EE_MSG_ADMIN_URL;
		$this->_admin_page_title = $this->page_label;
		$this->_labels = array(
			'buttons' => array(
				'add' => __('Add New Message Template', 'event_espresso'),
				'edit' => __('Edit Message Template', 'event_espresso'),
				'delete' => __('Delete Message Template', 'event_espresso')
			)
		);
	}







	/**
	 * 		an array for storing key => value pairs of request actions and their corresponding methods
	*		@access protected
	*		@return void
	*/
	protected function _set_page_routes() {			

		$this->_page_routes = array(
				'default'=> '_ee_messages_overview_list_table',
				'add_new_message_template'	=> '_add_message_template',
				'edit_message_template'	=> '_edit_message_template',
				'insert_message_template' => array( 'func' => '_insert_or_update_message_template', 'args' => array( 'new_template' => TRUE ), 'noheader' => TRUE ),
				'update_message_template'	=> array( 'func' => '_insert_or_update_message_template', 'args' => array( 'new_template' => FALSE ), 'noheader' => TRUE ),
				'trash_message_template' => array( 'func' => '_trash_or_restore_message_template', 'args' => array( 'trash' => TRUE, 'all' => TRUE ), 'noheader' => TRUE ),
				'trash_message_template_context' => array( 'func' => '_trash_or_restore_message_template', 'args' => array( 'trash' => TRUE ), 'noheader' => TRUE ),
				'restore_message_template' => array( 'func' => '_trash_or_restore_message_template', 'args' => array( 'trash' => FALSE, 'all' => TRUE ), 'noheader' => TRUE ),
				'restore_message_template_context' => array( 'func' => '_trash_or_restore_message_template' , 'args' => array('trash' => FALSE), 'noheader' => TRUE  ),
				'delete_message_template' => array( 'func' => '_delete_message_template', 'noheader' => TRUE ),
				'activate'	=> '_activate_messages',
				'reports' => '_messages_reports'
		);
	}








	protected function _set_page_config() {

		//setting up the edit message template url for the nav tab
		$group_query_args = isset($this->_req_data['GRP_ID']) ? array('GRP_ID' => $this->_req_data['GRP_ID'] ) : array();
		$event_query_args = isset($this->_req_data['evt_id']) ? array('evt_id' => $this->_req_data['evt_id'] ) : array();
		$edit_query_args = array_merge( $group_query_args, $event_query_args );

		$this->_page_config = array(
			'default' => array(
				'nav' => array(
					'label' => __('Overview', 'event_espresso'),
					'order' => 10 
					),
			'list_table' => 'Messages_Template_List_Table'
			),
			'add_new_message_template' => array(
				'nav' => array(
					'label' => __('Add New Message Templates', 'event_espresso'),
					'order' => 5,
					'persistent' => FALSE 
					)
				),
			'edit_message_template' => array(
				'nav' => array(
					'label' => __('Edit Message Templates', 'event_espresso'),
					'order' => 5,
					'persistent' => FALSE,
					'url' => !empty($edit_query_args) ? add_query_arg( $edit_query_args, $this->_current_page_view_url ) : $this->_admin_base_url
					),
				'metaboxes' => array('_register_edit_meta_boxes'),
				'has_metaboxes' => TRUE
				),
			'activate' => array(
				'nav' => array(
					'label' => __('Activate', 'event_espresso'),
					'order' => 20,
					),
				'columns' => array(4, 3)
				),
			'reports' => array(
				'nav' => array(
					'label' => __('Reports', 'event_espresso'),
					'order' => 30
					)
				)
		);

	}





	protected function _add_screen_options() {
		//todo
	}





	protected function _add_screen_options_default() {
		$this->_per_page_screen_option();
	}






	//none of the below group are currently used for Messages
	protected function _add_help_tabs() {}
	protected function _add_feature_pointers() {}
	public function admin_init() {}
	public function admin_notices() {}
	public function admin_footer_scripts() {}






	public function load_scripts_styles() {
		wp_register_style('espresso_ee_msg', EE_MSG_ASSETS_URL . 'ee_message_admin.css', EVENT_ESPRESSO_VERSION );
		wp_enqueue_style('espresso_ee_msg');
	}



	public function load_scripts_styles_activate() {
		wp_register_script('espresso_msg_js', EE_MSG_ASSETS_URL . 'espresso_ee_msg_admin.js', array('jquery', 'jquery-ui-position', 'jquery-ui-widget', 'dashboard'), EVENT_ESPRESSO_VERSION, TRUE);
		wp_enqueue_script('espress_msg_js');
	}


	public function load_scripts_styles_edit_message_template() {
		wp_enqueue_script('ee_admin_js');
	}



	/**
	 * set views array for List Table
	 * @access public
	 * @return array
	 */
	public function _set_list_table_views_default() {
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





	protected function _ee_messages_overview_list_table() {
		$this->_admin_page_title .= $this->_get_action_link_or_button('add_new_message_template', 'add', array(), 'button add-new-h2');
		$this->display_admin_list_table_page_with_no_sidebar();
	}



	


	/**
	 * get_message_templates
	 * This gets all the message templates for listing on the overview list.
	 * 
	 * @access public
	 * @param int $perpage the amount of templates groups to show per page
	 * @param string $type the current _view we're getting templates for
	 * @param bool $count return count?
	 * @param bool $all disregard any paging info (get all data);
	 * @return array|WP_Error object
	 */
	public function get_message_templates( $perpage = 10, $type = 'in_use', $count = FALSE, $all = FALSE ) {
		global $espresso_wp_user;
		// start with an empty array
		$message_templates = array();

		/** todo: is this even needed?
		//require_once( EE_MSG_ADMIN . 'EE_Message_Template_List_Table.class.php' ); /**/
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Message_Template.model.php');
		$MTP = EEM_Message_Template::instance();
		
		$this->_req_data['orderby'] = empty($this->_req_data['orderby']) ? '' : $this->_req_data['orderby'];

		switch ( $this->_req_data['orderby'] ) {
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

		$order = ( isset( $this->_req_data['order'] ) && ! empty( $this->_req_data['order'] ) ) ? $this->_req_data['order'] : 'ASC';

		$current_page = isset( $this->_req_data['paged'] ) && !empty( $this->_req_data['paged'] ) ? $this->_req_data['paged'] : 1;
		$per_page = isset( $this->_req_data['perpage'] ) && !empty( $this->_req_data['perpage'] ) ? $this->_req_data['perpage'] : $perpage;

		$offset = ($current_page-1)*$per_page;
		$limit = $all ? NULL : array( $offset, $per_page );

		//options will match what is in the _views array property
		switch( $type ) {

			case 'in_use':
				$templates = $MTP->get_all_active_message_templates($orderby, $order, $limit, $count);
				break;

			case 'all':
				$templates = $MTP->get_all_message_templates($orderby, $order, $limit, $count);
				break;

			case 'global':
				$templates = $MTP->get_all_global_message_templates($orderby, $order, $limit, $count);
				break;

			case 'event':
				$templates = $MTP->get_all_event_message_templates($orderby, $order, $limit, $count);
				break;

			default:
				$templates = $MTP->get_all_trashed_grouped_message_templates($orderby, $order, $limit, $count);	

		}

		return $templates;
	}







	public function get_active_messengers() {
		return $this->_active_messengers;
	}




	public function get_active_message_types() {
		return $this->_active_message_types;
	}




	/**
	 * _add_message_template
	 * 
	 * @access  protected
	 * @return void
	 */
	protected function _add_message_template() {
		$events = array();
		//we need to ask for a messenger and message type in order to generate the templates.
		
		//is this for a custom evt?
		$EVT_ID = isset( $this->_req_data['evt_id'] ) && !empty( $this->_req_data['evt_id'] ) ? absint( $this->_req_data['evt_id'] ) : FALSE;

		//if we've got an empty EVT_ID then we need to get the list of Events for selection.
		if ( empty($EVT_ID ) ) {
			$events = $this->_get_active_events();
		}
		
		$this->_template_args['EVT_ID'] = $EVT_ID ? $EVT_ID : FALSE;
		$this->_template_args['event_name'] = $EVT_ID ? $this->_event_name($EVT_ID) : FALSE;
		$this->_template_args['active_messengers'] = $this->_active_messengers;
		$this->_template_args['active_message_types'] = $this->_active_message_types;
		$this->_template_args['active_events'] = $events;
		$this->_template_args['action'] = 'insert_message_template';
		$this->_template_args['edit_message_template_form_url'] = add_query_arg( array( 'action' => 'insert_message_template', 'noheader' => TRUE ), EE_MSG_ADMIN_URL );
		$this->_template_args['learn_more_about_message_templates_link'] = $this->_learn_more_about_message_templates_link();
		$this->_template_args['action_message'] = __('Before we generate the new templates we need to ask you what messenger and message type you want the templates for');

		$hidden_inputs['ee-msg-route'] = array(
				'name' => 'action',
				'input' => 'hidden',
				'type' => 'string',
				'value' => 'insert_message_template'
				);

		$hidden_inputs['ee-msg-evt-nonce'] = array(
			'name' => '_wpnonce',
			'input' => 'hidden',
			'type' => 'string',
			'value' => wp_create_nonce( 'insert_message_template' . '_nonce')
			);

		$this->_template_args['hidden_fields'] = $this->_generate_admin_form_fields( $hidden_inputs );


		//generate metabox	
		$this->_template_path = EE_MSG_TEMPLATE_PATH . 'ee_msg_details_main_add_meta_box.template.php';

	
		$this->_template_args['admin_page_content'] = espresso_display_template( $this->_template_path, $this->_template_args, TRUE );


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
		$GRP_ID = isset( $this->_req_data['id'] ) && !empty( $this->_req_data['id'] ) ? absint( $this->_req_data['id'] ) : FALSE;

		$EVT_ID = isset( $this->_req_data['evt_id'] ) && !empty( $this->_req_data['evt_id'] ) ? absint( $this->_req_data['evt_id'] ) : FALSE;

		$this->_set_message_template();
		$message_template = $this->_message_template;
		$c_label = $message_template->context_label();
		$c_config = $message_template->contexts_config();

		$context = isset( $this->_req_data['context']) && !empty($this->_req_data['context'] ) ? strtolower($this->_req_data['context']) : key($c_config);


		if ( empty($GRP_ID) ) {
			$action = 'insert_message_template';
			$button_both = FALSE;
			$button_text = array( __( 'Save','event_espresso') );
			$button_actions = array('something_different');
			$referrer = FALSE;
			$edit_message_template_form_url = add_query_arg( array( 'action' => $action, 'noheader' => TRUE ), EE_MSG_ADMIN_URL );
		} else {
			$action = 'update_message_template';
			$button_both = !defined( 'DOING_AJAX' ) ? TRUE : FALSE;
			$event_name = $message_template->event_name();
			$button_text = array();
			$button_actions = array();
			$referrer = NULL;
			$edit_message_template_form_url = add_query_arg( array( 'action' => $action, 'noheader' => TRUE ), EE_MSG_ADMIN_URL );
		}


		//todo: we need to assemble the title from Various details
		$context_label = sprintf( __('(%s %s)', 'event_espresso'), $c_config[$context]['label'], ucwords($c_label['label'] ));

		//todo: we should eventually display the event title instead of ID.
		$event_label = isset($event_name) && !empty($event_name) ? sprintf( __('for Event: %s', 'event_espresso'), $event_name) : '';
		$title = sprintf( __(' %s %s Template %s %s', 'event_espresso'), ucwords(str_replace('_', ' ', $message_template->messenger()) ), ucwords(str_replace('_', ' ', $message_template->message_type()) ), $context_label, $event_label );

		$this->_template_args['GRP_ID'] = $GRP_ID;
		$this->_template_args['message_template'] = $message_template;
		$this->_template_args['is_extra_fields'] = FALSE;


		//let's get the EE_messages_controller so we can get template form fields
		$MSG = new EE_messages();
		$template_field_structure = $MSG->get_fields($message_template->messenger(), $message_template->message_type());
		
		if ( !$template_field_structure ) {
			$template_field_structure = FALSE;
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
					$this->_template_args['is_extra_fields'] = TRUE;
					foreach ( $field_setup_array as $reference_field => $new_fields_array ) {
						foreach ( $new_fields_array as $extra_field =>  $extra_array ) {
							$field_id = $reference_field . '-' . $extra_field . '-content';
							$template_form_fields[$field_id] = $extra_array;
							$template_form_fields[$field_id]['name'] = 'MTP_template_fields[' . $reference_field . '][content][' . $extra_field . ']';
							$template_form_fields[$field_id]['value'] = !empty($message_templates) && isset($message_templates[$context][$reference_field]['content'][$extra_field]) ? $message_templates[$context][$reference_field]['content'][$extra_field] : '';
							$template_form_fields[$field_id]['db-col'] = 'MTP_content';	

							//if doing ajax and the extra field input type is wp_editor, let's change back to text area and also change class.
							if ( isset( $extra_array['input'] ) && $extra_array['input'] == 'wp_editor' && defined('DOING_AJAX') ) {
								$template_form_fields[$field_id]['input'] = 'textarea';
								$template_form_fields[$field_id]['css_class'] = 'large-text';
								$template_form_fields[$field_id]['label'] = $extra_array['label'] . '&nbsp;' . __('(Basic HTML tags allowed)', 'event_espresso');
							}/**/
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

					//if doing ajax and the extra field input type is wp_editor, let's change to text area and also change class.
					if ( isset( $field_setup_array['input'] ) && $field_setup_array['input'] == 'wp_editor' && defined('DOING_AJAX') ) {
						$template_form_fields[$field_id]['input'] = 'textarea';
						$template_form_fields[$field_id]['css_class'] = 'large-text';
						$template_form_fields[$field_id]['label'] = $extra_array['label'] . '&nbsp;' . __('(Basic HTML tags allowed)', 'event_espresso');
					}/**/
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
					'input' => 'hidden',
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
					'input' => $message_template->is_global() ? 'checkbox' : 'hidden',
					'type' => 'int',
					'required' => FALSE,
					'validation' => TRUE,
					'value' => $message_templates[$context]['MTP_is_override'],
					'css_class' => '',
					'format' => '%d',
					'db-col' => 'MTP_is_override'
				);

			$sidebar_form_fields['ee-msg-is-active'] = array(
					'name' => 'MTP_is_active',
					'label' => __('Active Template', 'event_espresso'),
					'input' => 'hidden',
					'type' => 'int',
					'required' => FALSE,
					'validation' => TRUE,
					'value' => $message_template->is_active(),
					'css_class' => '',
					'format' => '%d',
					'db-col' => 'MTP_is_active'
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

			$sidebar_form_fields['ee-msg-route'] = array(
				'name' => 'action',
				'input' => 'hidden',
				'type' => 'string',
				'value' => $action
				);

			$sidebar_form_fields['ee-msg-id'] = array(
				'name' => 'id',
				'input' => 'hidden',
				'type' => 'int',
				'value' => $GRP_ID
				);

			$sidebar_form_fields['ee-msg-evt-id'] = array(
				'name' => 'evt_id',
				'input' => 'hidden',
				'type' => 'int',
				'value' => $EVT_ID
				);
			$sidebar_form_fields['ee-msg-evt-nonce'] = array(
				'name' => '_wpnonce',
				'input' => 'hidden',
				'type' => 'string',
				'value' => wp_create_nonce( $action . '_nonce')
				);

			$sidebar_array = array('ee-msg-is-global', 'ee-msg-is-override', 'ee-msg-deleted', 'ee-msg-is-active');

			if ( isset($this->_req_data['template_switch']) && $this->_req_data['template_switch'] ) {
				$sidebar_form_fields['ee-msg-template-switch'] = array(
					'name' => 'template_switch',
					'input' => 'hidden',
					'type' => 'int',
					'value' => 1
					);
			}

			//send to field generator
			
			$template_fields = $this->_generate_admin_form_fields( $template_form_fields );
			$sidebar_fields = $this->_generate_admin_form_fields( $sidebar_form_fields );


		} //end if ( !empty($template_field_structure) )

		//setup context switcher
		$context_switcher_args = array(
			'page' => 'ee_messages',
			'action' => 'edit_message_template',
			'id' => $GRP_ID,
			'evt_id' => $EVT_ID,
			'context' => $context
		);
		$this->_set_context_switcher($message_template, $context_switcher_args);

		$this->_set_save_buttons($button_both, $button_text, $button_actions, $referrer);

		//sidebar box
		$this->_template_args['sidebar_content'] = $sidebar_fields . $this->_template_args['save_buttons'];
		$this->_template_args['sidebar_description'] = '';
		$this->_template_args['sidebar_title'] = '';
		$sidebar_title = __('Other Details', 'event_espresso');
		$sidebar_action = 'update_message_template_sidebar';
		$sidebar_template_path = EE_MSG_TEMPLATE_PATH . 'ee_msg_details_sidebar_edit_meta_box.template.php';

		//main box
		$this->_template_args['template_fields'] = $template_fields;
		$this->_template_args['sidebar_box_id'] = 'details';
		$this->_template_args['action'] = $action;
		$this->_template_args['context'] = $context;
		$this->_template_args['EVT_ID'] = $EVT_ID;
		$this->_template_args['edit_message_template_form_url'] = $edit_message_template_form_url;
		$this->_template_args['learn_more_about_message_templates_link'] = $this->_learn_more_about_message_templates_link();


		$this->_template_args['before_admin_page_content'] = $this->add_context_switcher();
		$this->_template_args['before_admin_page_content'] .= $this->_add_form_element_before();
		$this->_template_args['after_admin_page_content'] = $this->_add_form_element_after();

		$this->_template_path = $this->_template_args['GRP_ID'] ? EE_MSG_TEMPLATE_PATH . 'ee_msg_details_main_edit_meta_box.template.php' : EE_MSG_TEMPLATE_PATH . 'ee_msg_details_main_add_meta_box.template.php';

	
		$this->_template_args['admin_page_content'] = espresso_display_template( $this->_template_path, $this->_template_args, TRUE );

		//sidebar metabox (if we are editing)
		if ( $this->_template_args['GRP_ID'] ) {
			$this->_template_path = $sidebar_template_path;

			if ( !defined( 'DOING_AJAX' ) )
				$this->_add_admin_page_meta_box( $sidebar_action, $sidebar_title, __FUNCTION__, NULL, 'side');
			else {
				$this->_template_args['admin_page_content'] .= espresso_display_template( $this->_template_path, $this->_template_args, TRUE );
			}
		}


		//finally, let's set the admin_page title
		$this->_admin_page_title = sprintf( __('Editing %s', 'event_espresso'), $title );

		//we need to take care of setting the shortcodes property for use elsewhere.
		$this->_set_shortcodes();

		//final template wrapper
		$this->display_admin_page_with_sidebar();
	}

	public function add_context_switcher() {
		return $this->_context_switcher;
	}

	public function _add_form_element_before() {
		return '<form method="post" action="' . $this->_template_args["edit_message_template_form_url"] . '" id="ee-msg-edit-frm">';
	}

	public function _add_form_element_after() {
		return '</form>';
	}




	/**
	 * registers metaboxes that should show up on the "edit_message_template" page
	 *
	 * @access protected
	 * @return void
	 */
	protected function _register_edit_meta_boxes() {
		add_meta_box( 'mtp_valid_shortcodes', __('Valid Shortcodes', 'event_espresso'), array( $this, 'shortcode_meta_box' ), $this->_current_screen->id, 'side', 'default' );
	}


	/**
	 * This just takes care of returning the meta box content for shortcodes (only used on the edit message template page)
	 *
	 * @access public
	 * @return void 
	 */
	public function shortcode_meta_box() {
		$this->_set_shortcodes(); //just make sure shortcodes property is set
		

		//now let's set the content depending on the status of the shortcodes array
		if ( empty( $this->_shortcodes ) ) {
			$content = '<p>' . __('There are no valid shortcodes available', 'event_espresso') . '</p>';
			echo $content;
		} else {
			$alt = 0;
			?>
			<table class="widefat ee-shortcode-table">
			<?php foreach ( $this->_shortcodes as $code => $label ) : ?>
				<?php $alt_class = !($alt%2) ? 'class="alternate"' : ''; ?>
				<tr <?php echo $alt_class; ?>>
					<td><?php $this->_set_help_trigger( 'shortcode_' . $alt, TRUE, array('100', '400') ); echo $code; ?></td>
				</tr>
			<?php $alt++; endforeach; ?>
			</table> <!-- end .ee-shortcode-table -->
			<?php
		}


	}


	/**
	 * used to set the $_shortcodes property for when its needed elsewhere.
	 *
	 * @access private
	 * @return void
	 */
	private function _set_shortcodes() {

		//no need to run this if the property is already set
		if ( !empty($this->_shortcodes ) ) return;

		$this->_set_message_template();

		//we need the messenger and message template to retrieve the valid shortcodes array.
		$GRP_ID = isset( $this->_req_data['id'] ) && !empty( $this->_req_data['id'] ) ? absint( $this->_req_data['id'] ) : FALSE;
		$context = isset( $this->_req_data['context'] ) ? $this->_req_data['context'] : key( $this->_message_template->contexts_config() );

		if ( !empty($GRP_ID) ) {
			$this->_shortcodes = $this->_message_template->get_shortcodes( $context );
		} else {
			$this->_shortcodes = array();
		}
	}



	/**
	 * This sets the _message_template property (containing the called message_template object)
	 *
	 * @access private
	 * @return  void 
	 */
	private function _set_message_template() {

		if ( !empty( $this->_message_template ) )
			return; //get out if this is already set.

		$GRP_ID = isset( $this->_req_data['id'] ) && !empty( $this->_req_data['id'] ) ? absint( $this->_req_data['id'] ) : FALSE;

		//let's get the message templates
		require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Message_Template.model.php');
		$MTP = EEM_Message_Template::instance();

		if ( empty($GRP_ID) )
			$this->_message_template = $MTP->get_new_template();
		else
			$this->_message_template = $MTP->get_message_template_by_ID( $GRP_ID );

	}


	protected function _help_popup_content_edit_message_template() {
		$this->_set_shortcodes();

		$help = array();

		$i = 0;
		//let's setup the $help array for each shortcode
		foreach ( $this->_shortcodes as $shortcode => $description ) {
			$help['shortcode_' . $i] = array(
				'title' => $shortcode,
				'content' => $description
				);
			$i++;
		}


		$context_label = $this->_message_template->context_label();
		$context_configs = $this->_message_template->contexts_config();
		$current_context = isset($this->_req_data['context']) ? $this->_req_data['context'] : key($context_configs);

		$content = '<p>' . $context_label['description'] . '</p>';
		$content .= '<p>' . sprintf( __(' The current %s selected is <strong>%s</strong>', 'event_espresso'), $context_label['label'], $context_configs[$current_context]['label'] ) . '<br />';
		$content .= '<em>' . $context_configs[$current_context]['description'] . '</em></p>';
		$content .= '<p>' . sprintf( __('Other %s:', 'event_espresso'), ucwords($context_label['plural']) ) . '</p>';

		foreach ( $context_configs as $ctxt => $details ) {
			if ( $ctxt == $current_context ) continue;
			$content .= '<p>' . $details['label'] . '<br />';
			$content .= '<em>' . $details['description'] . '</em></p>';
		}

		$title = sprintf( __('What is a %s?', 'event_espresso'), $context_label['label']);

		$help['context_switcher'] = array(
			'title' => $title,
			'content' => $content
		);

		return $help;
	}



	/**
	 * sets up a context switcher for edit forms
	 *
	 * @access  private
	 * @param  object $template_object the template object being displayed on the form
	 * @param array $args various things the context switcher needs.
	 * @return void
	 */
	private function _set_context_switcher(EE_Message_Template $template_object, $args) {
		$context_details = $template_object->contexts_config();
		$context_label = $template_object->context_label();
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
					<option value="<?php echo $context; ?>" <?php echo $checked; ?>><?php echo $context_details[$context]['label']; ?></option>
					<?php endforeach; endif; ?>
				</select>
				<?php $button_text = sprintf( __('Switch %s', 'event_espresso'), ucwords($context_label['label']) ); ?>
				<input id="submit-msg-context-switcher-sbmt" class="button-secondary" type="submit" value="<?php echo $button_text; ?>"> <?php $this->_set_help_trigger( 'context_switcher' ); ?>
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
		$set_column_values = array(
			'MTP_ID' => absint($this->_req_data['MTP_template_fields'][$index]['MTP_ID']),
			'EVT_ID' => absint($this->_req_data['EVT_ID']),
			'GRP_ID' => absint($this->_req_data['GRP_ID']),
			'MTP_user_id' => absint($this->_req_data['MTP_user_id']),
			'MTP_messenger'	=> strtolower($this->_req_data['MTP_messenger']),
			'MTP_message_type' => strtolower($this->_req_data['MTP_message_type']),
			'MTP_template_field' => strtolower($this->_req_data['MTP_template_fields'][$index]['name']),
			'MTP_context' => strtolower($this->_req_data['MTP_context']),
			'MTP_content' => maybe_serialize($this->_req_data['MTP_template_fields'][$index]['content']),
			'MTP_is_global' => isset($this->_req_data['MTP_is_global']) ? absint($this->_req_data['MTP_is_global']) : 0,
			'MTP_is_override' => isset($this->_req_data['MTP_is_override']) ? absint($this->_req_data['MTP_is_override']) : 0,
			'MTP_deleted' => absint($this->_req_data['MTP_deleted']),
			'MTP_is_active' => absint($this->_req_data['MTP_is_active'])
		);
		return $set_column_values;
	}






	protected function _insert_or_update_message_template($new = FALSE ) {
		
		do_action ( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '');
		$success = 0;

		//setup notices description	
		$messenger = !empty($this->_req_data['MTP_messenger']) ? ucwords(str_replace('_', ' ', $this->_req_data['MTP_messenger'] ) ) : false;
		$message_type = !empty($this->_req_data['MTP_message_type']) ? ucwords(str_replace('_', ' ', $this->_req_data['MTP_message_type'] ) ) : false;
		$context = !empty($this->_req_data['MTP_context']) ? ucwords(str_replace('_', ' ', $this->_req_data['MTP_context'] ) ) : false;
		$evt_id = !empty($this->_req_data['EVT_ID']) ? (int) $this->_req_data['EVT_ID'] : NULL;

		$item_desc = $messenger ? $messenger . ' ' . $message_type . ' ' . $context . ' ' : '';
		$item_desc .= 'Message Template';
		$query_args = array();

		//if this is "new" then we need to generate the default contexts for the selected messenger/message_type for user to edit.
		if ( $new ) {
			if ( $edit_array = $this->_generate_new_templates($messenger, $message_type, $evt_id) ) {
				if ( empty($edit_array) ) {
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
			if ( !isset($this->_req_data['MTP_template_fields']) && empty($this->_req_data['MTP_template_fields'] ) ) {
				EE_Error::add_error( __('There was a problem saving the template fields from the form because I didn\'t receive any actual template field data.', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
				$success = 0;
				$action_desc = '';
				$query_args = array(
						'id' => $this->_req_data['GRP_ID'],
						'evt_id' => $this->_req_data['EVT_ID'],
						'context' => $this->_req_data['MTP_context'],
						'action' => 'edit_message_template'
						);
			} else {
				foreach ( $this->_req_data['MTP_template_fields'] as $template_field => $content ) {
					$set_column_values = $this->_set_message_template_column_values($template_field);
					$where_cols_n_values = array( 'MTP_ID' => $this->_req_data['MTP_template_fields'][$template_field]['MTP_ID']);
					if ( $updated = $MTP->update( $set_column_values, $where_cols_n_values ) ) {
						if ( !$updated ) {
							$msg = sprintf( __('%s field was NOT updated for some reason', 'event_espresso') );
							EE_Error::add_error($msg, __FILE__, __FUNCTION__, __LINE__ );
						} else {
							$success = 1;
						}
					}
					$action_desc = 'updated';
				}
			}

		}

		if ( defined('DOING_AJAX') && $new ) {
			$this->_req_data = array_merge($this->_req_data, $query_args);
			$this->_req_data['template_switch'] = TRUE;
			$this->_edit_message_template();
		}

		if ( defined('DOING_AJAX') ) {
			$this->_check_template_switch();
		}

		$this->_redirect_after_action( $success, $item_desc, $action_desc, $query_args );
	}





	/**
	 * This ajax method is called during ajax requests and checks to see if a template switch has been triggered (via edit_event notifications meta box.  If it has then we want to regenerate the switching ui to reflect the change and assign that to the 'admin_page_content' template arg key
	 *
	 * 
	 * @return void 
	 */
	private function _check_template_switch() {
		if ( defined('DOING_AJAX') && isset($this->_req_data['template_switch']) && $this->_req_data['template_switch'] ) {
			if ( isset($this->_req_data['evt_id'] ) && !isset($this->_req_data['EVT_ID']) )
				$this->_req_data['EVT_ID'] = $this->_req_data['evt_id'];
			$this->_template_args['admin_page_content'] = $this->_hook_obj->messages_metabox('', array());
			$this->_template_args['data']['what'] = 'clear';
			$this->_template_args['data']['where'] = 'main';
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
		$success = TRUE;

		if ( empty($messenger) ) {
			throw new EE_Error( __('We need a messenger to generate templates!', 'event_espresso') );
		}

		//if we STILL have empty $message_types then we need to generate an error message b/c we NEED message types to do the template files.
		if ( empty($message_types) ) {
			throw new EE_Error( __('We need at least one message type to generate templates!', 'event_espresso') );
		}

		$MSG = new EE_messages();

		foreach ( $message_types as $message_type ) {
			//first let's determine if we already HAVE global templates for this messenger and message_type combination.  If we do then NO generation!!
			if ( $this->_already_generated($messenger, $message_type, $evt_id ) )
				continue; //get out we've already got generated templates for this.
			$new_message_template_group = $MSG->create_new_templates($messenger, $message_type, $evt_id, $global);
			if ( !$new_message_template_group ) {
				$success = FALSE;
				continue;
			}

			$templates[] = $new_message_template_group;
		}
		
		return ($success) ? $templates : $success;

	}




	/**
	 * The purpose of this method is to determine if there are already generated templates in the database for the given variables.
	 * @param  string $messenger     messenger
	 * @param  string $message_type message type
	 * @param  int $evt_id        Event ID ( if an event specific template)
	 * @return bool                true = generated, false = hasn't been generated.
	 */
	private function _already_generated( $messenger, $message_type, $evt_id = NULL ) {
		require_once EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Message_Template.model.php';
		$MTP = EEM_Message_Template::instance();

		//what method we use depends on whether we have an evt_id or not
		$count = !empty( $evt_id) ? $MTP->get_event_message_templates_by_m_and_mt_and_evt( $messenger, $message_type, $evt_id, 'GRP_ID', 'ASC', NULL, TRUE, FALSE ) : $MTP->get_global_message_template_by_m_and_mt( $messenger, $message_type, 'GRP_ID', 'ASC', NULL, TRUE, FALSE);


		//if the count is greater than 0 then we need to update the templates so they are active.
		if ( $count > 0 ) {
			$MTP->update( array('MTP_is_active' => 1), array('MTP_messenger' => $messenger, 'MTP_message_type' => $message_type ) );
		}

		return ( $count > 0 ) ? TRUE : FALSE;
	}






	/**
	 * [_trash_or_restore_message_template]
	 * 
	 * @access protected
	 * @param  boolean $trash whether to move an item to trash/restore (TRUE) or restore it (FALSE)
	 * @param boolean $all whether this is going to trash/restore all contexts within a template group (TRUE) OR just an individual context (FALSE).
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
			if ( !empty( $this->_req_data['checkbox'] ) && is_array($this->_req_data['checkbox'] ) ) {
				//if array has more than one element then success message should be plural.
				//todo: what about nonce?
				$success = count( $this->_req_data['checkbox'] ) > 1 ? 2 : 1;

				//cycle through checkboxes
				while ( list( $GRP_ID, $value ) = each ($this->_req_data['checkbox']) ) {
					if ( ! $MTP->update(array('MTP_deleted' => $MTP_deleted), array('GRP_ID' => absint($GRP_ID) ) ) ) {
						$success = 0;
					}
				}
			} else {
				//grab single GRP_ID and handle
				$GRP_ID = absint($this->_req_data['id']);
				if ( !$MTP->update(array('MTP_deleted' => $MTP_deleted), array('GRP_ID' => $GRP_ID ) ) ) {
					$success = 0;
				}
			}
		//not entire GRP, just individual context
		} else {
			//we should only have the MTP_id for the context,
			//todo: will probably need to make sure we have a nonce here?
			$GRP_ID = absint( $this->_req_data['id'] );
			$MTP_message_type = strtolower( $this->_req_data['message_type']);
			$MTP_context = strtolower( $this->_req_data['context'] );
			
			if ( !$MTP->update(array('MTP_deleted' => $MTP_deleted), array('GRP_ID' => $GRP_ID, 'MTP_message_type' => $MTP_message_type, 'MTP_context' => $MTP_context ) ) ) {
				$success = 0;
			}
		}

		$action_desc = $trash ? 'moved to the trash' : 'restored';
		$item_desc = $all ? 'Message Template Group' : 'Message Template Context';

		if ( defined('DOING_AJAX') ) {
			$this->_check_template_switch();
		}

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
		if ( !empty($this->_req_data['checkbox']) && is_array($this->_req_data['checkbox'] ) ) {
			//if array has more than one element then success message should be plural
			$success = count( $this->_req_data['checkbox'] ) > 1 ? 2 : 1;

			//cycle through bulk action checkboxes
			while ( list( $GRP_ID, $value ) = each($this->_req_data['checkbox'] ) ) {
				if ( ! $MTP->delete_by_id(absint($GRP_ID) ) ) {
					$success = 0;
				}
			}
		} else {
			//grab single grp_id and delete
			$GRP_ID = absint($this->_req_data['id'] );
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
		$query = "SELECT event_name FROM {$tablename} WHERE id = %d";
		$event_name = $wpdb->get_var( $wpdb->prepare($query, $evt_id) );
		return $event_name;
	}







	/**
	 * get_active_events
	 * This just returns an array of event objects for events that are active. (objects contain event_name and ID);
	 *
	 * @access private
	 * @return array array of objects (event_name, event_id);
	 */
	private function _get_active_events() {
		global $wpdb;
		$tablename = $wpdb->prefix . 'events_detail';
		$msg_table = $wpdb->prefix . 'esp_message_template';
		$sub_query = "SELECT EVT_ID FROM {$msg_table} GROUP BY EVT_ID";
		$query = "SELECT event_name, id as event_id FROM {$tablename} WHERE is_active = '1' AND id NOT IN ({$sub_query})";
		$events = $wpdb->get_results( $query );
		return $events;
	}






	/**
	 * This sets up the activate messages and message types templates.
	 * 
	 * @access protected
	 * @return void
	 */
	protected function _activate_messages() {
		do_action( 'action_hook_espresso_log', __FILE__, __FUNCTION__, '');

		$view = isset($this->_req_data['activate_view']) ? $this->_req_data['activate_view'] : 'message_types';
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


		//final template wrapper
		$this->display_admin_page_with_metabox_columns();
	}






	protected function _messages_reports() {
		$this->_template_args['admin_page_content'] = "Feature coming soon man,  sit back, relax, and enjoy the fireworks.";
		$this->display_admin_page_with_no_sidebar();
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

		$default_activate_query_args = array(
			'activate_view' => $this->_activate_meta_box_type,
			'activate_state' => $this->_current_message_meta_box . '_active',
			'box_action' => 'activated',
			'action' => 'activate'
		);

		$default_deactivate_query_args = array(
			'activate_view' => $this->_activate_meta_box_type,
			'activate_state' => $this->_current_message_meta_box . '_inactive',
			'box_action' => 'deactivated',
			'action' => 'activate'
		);

		

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
			'activate_msgs_details_url' => wp_nonce_url(add_query_arg($default_edit_query_args, $this->_admin_base_url), 'activate_nonce'),
			'show_hide_edit_form' => 'hidden',
			'activate_message_template_form_action' => wp_nonce_url(add_query_arg($default_activate_query_args, $this->_admin_base_url), 'activate_nonce'),
			'activate_msgs_form_fields' => '',
			'on_off_action' => wp_nonce_url(add_query_arg($default_edit_query_args, $this->_admin_base_url), 'activate_nonce'),
			'on_off_status' => 'inactive',
			'activate_msgs_on_off_descrp' => __('Activate', 'event-espresso'),
			'activate_meta_box_type' => ucwords(str_replace('_', ' ', $this->_activate_meta_box_type) ),
			'activate_meta_box_page_instructions' => $this->_activate_meta_box_type == 'message_types' ? __('Message Types are the areas of Event Espresso that you can activate notifications for.  On this page you can see all the various message types currently available and whether they are active or not.', 'event-espresso') : __('Messengers are the vehicles for delivering your notifications.  On this page you can see all the various messengers available and whether they are active or not.', 'event-espresso'),
			'activate_msg_type_toggle_link' => wp_nonce_url(add_query_arg($switch_view_query_args, $this->_admin_base_url), 'activate_nonce'),
			'activate_meta_box_toggle_type' => ucwords(str_replace('_', ' ', $switch_view_toggle_text) ),
			'on_off_action_on' => wp_nonce_url(add_query_arg($default_edit_query_args, $this->_admin_base_url), 'activate_nonce'),
			'on_off_action_off' => wp_nonce_url(add_query_arg($default_deactivate_query_args, $this->_admin_base_url), 'activate_nonce'),
			'show_on_off_button' => ''
			);

		$this->_template_args = array_merge($default_template_args, $this->_template_args);

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
		$this->_template_args['admin_page_header'] = espresso_display_template( $admin_header_template_path, $this->_template_args, TRUE);

		call_user_func( array($this, '_box_content_'.$this->_activate_state) );
	}







	/**
	 * this method sets up basic info about the messenger/message type and the relevant buttons for activating.
	 * @return void	
	 */
	private function _box_content_inactive() {
		//this is default view.  But we need to check and see if this messenger/message_type is actually active.  If it is, then let's load that instead.

		if ( (in_array($this->_current_message_meta_box, array_keys($this->_active_messengers) ) || in_array($this->_current_message_meta_box, array_keys($this->_active_message_types) )) && !isset($this->_req_data['box_action']) ) {
			$this->_box_content_active();
			return;
		}

		//common elements
		$this->_template_args['box_head_content'] = $this->_current_message_meta_box_object->description;
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
		$this->_template_args['activate_state'] = 'active';
		$this->_template_args['box_head_content'] = $this->_current_message_meta_box_object->description;

		if ( !empty($content ) ) {
			$this->_template_args['show_hide_active_content'] = '';
			$this->_template_args['activate_msgs_active_details'] = $content;
			$this->_template_args['activate_msgs_details_url'] = $this->_template_args['on_off_action'];
		}

		$this->_activate_state = 'active';

		$this->_template_args['on_off_status'] = 'active';
		$this->_template_args['activate_msgs_on_off_descrp'] = __('Deactivate', 'event_espresso');
		$this->_template_args['on_off_action'] = $this->_template_args['on_off_action_off'];
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
			$this->_req_data['box_action'] = 'activated';
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
			EE_Error::add_error( sprintf( __('Before any messengers can be activated there needs to be at least one <a href="%s" title="Click to switch to message types">Message Type</a> active', 'event_espresso'), add_query_arg($switch_view_query_arg, $this->_admin_base_url) ), __FILE__, __FUNCTION__, __LINE__ );
			$this->_activate_state = 'inactive';
			$this->_box_content_inactive();
			return;
		}

		foreach ( $settings_fields as $field => $items ) {
			$field_id = $this->_current_message_meta_box . '-' . $field;
			$template_form_field[$field_id] = array(
				'name' => 'message_settings['.$field_id.']',
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
				$name = 'message_settings[' . $this->_current_message_meta_box . '-message_types][' . $mt . ']';
				$is_using_message_type = isset($existing_settings_fields[$field_id]) && $existing_settings_fields[$field_id] ? TRUE : FALSE;
				$mt_template_form_field[$field_id] = array(
					'name' => $name,
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

			$mt_template_form_fields = !empty($mt_template_form_field) ? $this->_generate_admin_form_fields( $mt_template_form_field, 'string', 'ee_msg_activate_form') : NULL;

			//make sure is an array.
			$mt_template_form_fields = (array) $mt_template_form_fields;

			if ( !$mt_template_form_fields ) {
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

		$template_form_fields = !empty($template_form_field) ? $this->_generate_admin_form_fields( $template_form_field, 'string', 'ee_msg_activate_form' ) : '';

		if ( !$template_form_fields ) {
			$template_form_fields = NULL;
		}

		$template_form_fields = !empty($mt_field_content) ? $template_form_fields . $mt_field_content : $template_form_fields;

		$this->_template_args['activate_state'] = 'editing';
		$this->_template_args['box_head_content'] = $this->_current_message_meta_box_object->description;
		$this->_activate_state = 'editing';

		if ( !empty($template_form_fields) ) {
			$this->_template_args['show_hide_edit_form'] = '';
			$this->_template_args['activate_msgs_form_fields'] = $template_form_fields;
			$this->_template_args['on_off_action'] = empty($existing_settings_fields) ? $this->_template_args['on_off_action_on'] : $this->_template_args['on_off_action_off'];
			$this->_template_args['activate_msgs_on_off_descrp'] = empty($existing_settings_fields) ? __('Activate','event_espresso') : __('Deactivate', 'event_espresso');
			$this->_template_args['on_off_status'] = empty($existing_settings_fields) ? 'inactive' : 'active';
			$this->_template_args['show_on_off_button'] = 'hidden';
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
		if ( !isset($this->_req_data['box_action'] ) )
			return;
		
		switch ( $this->_req_data['box_action'] ) {
			case 'activated' :
				//check nonces
				$this->_update_msg_settings();
				break;

			case 'deactivated' :
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
		global $espresso_wp_user;
		$success_msg = array();
		$update = FALSE;
		$ref = '_active_' . $this->_activate_meta_box_type;
		$templates = TRUE;
		
		if ( !$remove ) {
			if ( isset($this->_req_data['ee-msg-activate-form'] ) ) {
				unset($this->_req_data['ee-msg-activate-form']);
				$update = TRUE;
			}
			$this->{$ref}[$this->_current_message_meta_box]['settings'] = $update ? $this->_req_data['message_settings'] : NULL;
			update_user_meta($espresso_wp_user, 'ee_active_' . $this->_activate_meta_box_type, $this->{$ref});
			$success_msg = sprintf( __('%s %s has been successfully activated', 'event_espresso'), ucwords(str_replace('_', ' ' , $this->_current_message_meta_box) ), ucwords(str_replace('_', ' ', rtrim($this->_activate_meta_box_type, 's') ) ) );
			
			if ( $this->_activate_meta_box_type == 'messengers' && $this->_activate_state[0] == $this->_current_message_meta_box . '_active' ) {
				$message_types = isset($this->_active_messengers[$this->_current_message_meta_box]['settings'][$this->_current_message_meta_box . '-message_types']) ? array_keys($this->_active_messengers[$this->_current_message_meta_box]['settings'][$this->_current_message_meta_box . '-message_types']) : NULL;
				$templates = $this->_generate_new_templates($this->_current_message_meta_box, $message_types, '', TRUE);
				
			}

			//if generation failed then we need to remove the active messenger
			if ( !$templates ) {
				unset($this->{$ref}[$this->_current_message_meta_box]);
				update_user_meta($espresso_wp_user, 'ee_active_' . $this->_activate_meta_box_type, $this->{$ref});
			}
		} else {
			
			require_once(EVENT_ESPRESSO_INCLUDES_DIR . 'models/EEM_Message_Template.model.php');
			$MTP = EEM_Message_Template::instance();

			//first lets make sure that there are NO existing event templates for the given messenger or message type.  If there ARE then we need to drop out with an error message, prevent deactivation and display warning.
			$where_col = $this->_activate_meta_box_type == 'messengers' ? 'MTP_messenger' : 'MTP_message_type';
			$_where = array(
				$where_col => $this->_current_message_meta_box,
				'MTP_is_global' => FALSE
				);
			$event_templates = $MTP->get_all_message_templates_where( $_where );

			if ( $event_templates && count($event_templates) > 0 ) {
				$m_label_pl = $this->_activate_meta_box_type == 'messengers' ? __('Messengers', 'event_espresso') : __('Message Types', 'event_espresso');
				$m_label_sg = $this->_activate_meta_box_type == 'messengers' ? __('messenger', 'event_espresso') : __('message type', 'event_espresso');
				$warning_msg = sprintf( __('<strong>Warning:</strong> %s cannot be deactivated if there are any Events currently using a custom template for it. Before you can deactivate the "%s" %s, you must switch the following "Events" to use global templates:', 'event_espresso' ), $m_label_pl, $this->_current_message_meta_box, $m_label_sg  );
				$warning_msg .= '<ul>';

				//output list of events
				$base_event_admin_url = admin_url( 'admin.php?page=events' );
				foreach ( $event_templates as $template ) {
					$event_name = $this->event_name($template->event());
					$query_args = array(
						'action' => 'edit_event',
						'EVT_ID' => $template->event()
						);
					$edit_event_url = wp_nonce_url( add_query_arg( $query_args, $base_event_admin_url ), 'edit_event_nonce');
					$warning_msg .= "\n" . '<li><a href="' . $edit_event_url . '" title="' . __('Edit Event', 'event_espresso') . '">' . $event_name . '</a></li>';
				}

				$warning_msg .= '</ul>';
				$warning_msg .= '<br />' . __('Remember, deactivating messengers or message types does NOT delete any templates or any customization you have done.  All it does is "deactivate" them. Should you activate the message type or messenger later your templates will be restored.', 'event_espresso');
				$this->_activate_state = 'active';
				EE_Error::add_error($warning_msg);
				echo EE_Error::get_notices();
				return;
			}



			//okay let's update the message templates that match this type (i.e. messenger or message type ) so that they are deactivated in the database as well.
			
			$success = $MTP->update( array( 'MTP_is_active' => 0 ), array( $where_col => $this->_current_message_meta_box ) );


			unset($this->{$ref}[$this->_current_message_meta_box]);
			update_user_meta($espresso_wp_user, 'ee_active_' . $this->_activate_meta_box_type, $this->{$ref});

			$success_msg = sprintf( __('%s %s has been successfully deactivated', 'event_espresso'), ucwords(str_replace('_', ' ', $this->_current_message_meta_box) ) , ucwords(str_replace('_', ' ', rtrim($this->_activate_meta_box_type, 's') ) ) );
			
		}
	
		if ( $templates ) EE_Error::add_success($success_msg);
		echo EE_Error::get_notices();
	}




	/**
	 * [event_name description]
	 * This just takes a given event_id and will output the name of the event for it.
	 * @todo: temporary... will need to remove/replace once proper Event models/classes are in place.
	 * @access private
	 * @param  int $evt_id event_id
	 * @return string event_name 
	 */
	public function event_name($evt_id) {
		global $wpdb;
		$evt_id = absint($evt_id);
		$tablename = $wpdb->prefix . 'events_detail';
		$query = "SELECT event_name FROM {$tablename} WHERE id = %d";
		$event_name = $wpdb->get_var( $wpdb->prepare($query, $evt_id) );
		return $event_name;
	}

	
}
