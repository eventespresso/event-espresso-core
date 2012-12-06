<?php

if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license				http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	3.2
 *
 * ------------------------------------------------------------------------
 *
 * EE_messages class
 *
 * This class is the main controller class for EE_messages, it delegates messages to the messengers and contains other methods for obtaining various details about the active messengers and message types.
 *
 * @package			Event Espresso
 * @subpackage	includes/core/messages
 * @author				Darren Ethier, Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EE_messages {
 
	private $_active_messengers = array();
	private $_active_message_types = array();
	private $_messenger;
	private $_message_type;

	/**
	 * holds the EEM_message_templates model for interacting with the database and retrieving active templates for the messenger
	 * @var object
	 */
	private $_EEM_data;
	// main controller
	function __construct() {
		global $espresso_wp_user;
		
		// get list of active messengers and active message types
		$this->_EEM_data = EEM_Message_Template::instance();
		$this->_get_active_messengers();
		$this->_get_active_message_types();	
	}

	/**
	 * get active messengers from db and instantiate them.
	 */
	private function _get_active_messengers() {
		global $espresso_wp_user;
		// todo: right now this just gets active global messengers: at some point we'll have to get what the active messengers are for the event.
		$actives = get_user_meta($espresso_wp_user, 'ee_active_messengers', true);
		$actives = is_array($actives) ? array_keys($actives) : $actives;
		$active_names = $this->_load_files('messenger', $actives);


		if ( empty($active_names) ) {
			return new WP_Error(__('no_active_messengers', 'event_espresso'), __('No messages have gone out because there are no active_messengers.', 'event_espresso') . espresso_get_error_code(__FILE__, __FUNCTION__, __LINE__) );
		}

		foreach ( $active_names as $name => $class ) {
			$a = new ReflectionClass( $class );
			$active = $a->newInstance();
			if ( is_wp_error($active) ) {
				//we've got an error so let's bubble up the error_object to be caught by caller.
				//todo: would be better to just catch the errors and then return any aggregated errors later.
				return $active;
			}
			$this->_active_messengers[$name] = $active;
		}
	}

	/**
	 * get active types from db and load the related files.  They don't get instantiated till $this->send_message.
	 * 
	 */
	private function _get_active_message_types() {
		global $espresso_wp_user;
		$actives = get_user_meta($espresso_wp_user, 'ee_active_message_types', true);
		$actives = is_array($actives) ? array_keys($actives) : $actives;
		$active_names = $this->_load_files('message_type', $actives);

		if ( empty($active_names) ) {
			return new WP_Error(__('no_active_types', 'event_espresso'), __('No messages have gone out because there are no active message types.', 'event_espresso') . espresso_get_error_code(__FILE__, __FUNCTION__, __LINE__) );
		}

		foreach ( $active_names as $name => $class ) {
			$a = new ReflectionClass( $class );
			$active = $a->newInstance();
			if ( is_wp_error($active) ) {
				//we've got an error so let's bubble up the error_object to be caught by caller.
				//todo: would be better to just catch the errors and then return any aggregated errors later.
				return $active;
			}
			$this->_active_message_types[$name] = $active;
		} 
	}

	/**
	 * load the active files needed (key word... NEEDED)
	 * @param string $kind indicates what kind of files we are loading. 
	 * @param array $actives indicates what active types of the $kind are actually to be loaded. 
	 */
	private function _load_files($kind, $actives) {
		$active_names = array();
		$base_path = EE_CORE . 'messages' . DS . $kind . DS;
		if ( empty($actives) ) return false;

		//make sure $actives is an array
		$actives = (array) $actives;

		foreach ( $actives as $active ) {
			$msg_name = 'EE_' . ucwords( str_replace( ' ', '_', $active) ) . '_' . $kind;
			$filename = $msg_name . '.class.php';
			$load_file = $base_path . DS . $filename;
			if ( file_exists($load_file) ) {
				require_once($load_file);
				$active_names[$active] = $msg_name;
			} else {
				$this->_unset_active($active, $kind);
				//set WP_Error
				return new WP_Error(__('missing_file', 'event_espresso'), sprintf(__("missing messenger file set as active: (%s) %s \nMessenger has been made inactive.", 'event_espresso'), $load_file, espresso_get_error_code(__FILE__, __FUNCTION__, __LINE__ ) ) );
			}
		}
		return $active_names; 
	}

	


	/**
	 * unsets the active if we can't find the file (failsafe)
	 *
	 * @access private
	 * @param  string $active_name name of messenger or message type
	 * @param  string $kind        messenger or message_type?
	 * @return void              
	 */
	private function _unset_active( $active_name, $kind ) {
		global $espresso_wp_user;
		//pluralize
		$kind = $kind . 's';
		unset($this->_active_{$kind}[$active_name]);
		update_user_meta($espresso_wp_user, 'ee_active_'.$kind, $this->_active{$kind});
	}

	// delegates message sending to messengers
	public function send_message( $type, $vars ) {
	

		// is that a real class ?
		if ( isset(  $this->_active_message_types[$type] ) ) {
			// then send it
			foreach ( $this->_active_messengers as $active_messenger ) {
				// create message data
				$messages = $this->_active_messages_types[$type];
				$messages->set_messages($vars, $active_messenger);

				if ( is_wp_error($messages) ) {
					//we've got an error so let's bubble up the error_object to be caught by caller.
					//todo: would be better to just catch the errors and then return any aggregated errors later.
					return $messages;
				}

				if ( $messages->count === 0 ) continue; //it is possible that the user has the messenger turned off for this type.

				//TODO: check count (at some point we'll use this to decide whether we send to queue or not i.e.
				//if ( $messages->count > 1000 ) ... do something
				//else...
				foreach ( $messages->messages as $message ) {
					//todo: should we do some reporting on messages gone out at some point?  I think we could have the $active_messenger object return bool for whether message was sent or not and we can compile a report based on that.
					$active_messenger->send_message( $message );
				}
				unset($messages);
			}
		} else {
			return new WP_Error(__('missing_class', 'event_espresso'), sprintf(__('Class: %s does not exist', 'event_espresso'), $classname) .espresso_get_error_code(__FILE__, __FUNCTION__, __LINE__ ) );
		}
	}

	/**
	 * _validate_setup
	 * @param  string $messenger    EE_messenger
	 * @param  string $message_type EE_message_type
	 * @param bool $is_global whether this is a global template or not.
	 * @return bool(true)|wp_error_object
	 */
	private function _validate_setup($messenger, $message_type, $is_global = FALSE) {

		$message_type = strtolower(str_replace(' ', '_', $message_type) );
		$messenger = strtolower(str_replace(' ', '_', $messenger));

		//setup messenger and message_type object
		$this->_messenger = isset($this->_active_messengers[$messenger]) ? $this->_active_messengers[$messenger] : null;


		//message type
		$mt = isset($this->_active_message_types[$message_type]) ? $this->_active_message_types[$message_type] : 'message_type_not_existent';

		$this->_message_type = is_object($mt) ? $mt : null;

		//do we have the necessary objects loaded?
		if ( empty( $this->_messenger) || empty($this->_message_type) )
			return new WP_Error(__('problem_creating_required_objects', 'event_espresso'), sprintf(__(' We had a problem creating the %s messenger or the %s message_type. Are you sure they exist?', 'event_espresso'), $messenger, $message_type) . espresso_get_error_code(__FILE__, __FUNCTION__, __LINE__) ); 
		
		//is given message_type valid for given messenger (if this is not a global save)
		if ( !$is_global ) {
			foreach ( $this->_messenger->active_templates as $template ) {
				if ( $template->message_type() != $message_type )
					return new WP_Error(__('invalid_message_type_messenger_match', 'event_espresso'), sprintf(__(' The %s message type is not registered with the %s messenger. Please visit the Messenger activation page to assign this message type first if you want to use it.', 'event_espresso'), $messenger, $message_type) . espresso_get_error_code(__FILE__, __FUNCTION__, __LINE__) );
			}
		}
		return true;
	}

	/**
	 * This is a wrapper for the protected _create_new_templates function
	 * @param  string $message_type message type that the templates are being created for
	 * @return array|object               if creation is succesful then we return an array of info, otherwise an error_object is returned. 
	 */
	public function create_new_templates( $messenger, $message_type, $evt_id, $is_global = false ) {
		$valid_mt = false;
		$evt_id = absint($evt_id);

		$valid_mt = $this->_validate_setup($messenger, $message_type, $is_global);
		
		if ( is_wp_error($valid_mt) && $is_global ) {
			//we're setting up a brand new global templates (with messenger activation) so we're assuming that the message types sent in are valid.
			$valid_mt = true;
		}

		if ( is_wp_error($valid_mt) ) {
			//if we've still got no valid_mt then bubble up error object
			return $valid_mt;
		}

		if ( !$is_global && empty($evt_id) ) {
			//hey we need an evt_id to create this custom template
			return new WP_Error(__('missing_event_id', 'event_espresso'), __('This template is not being created by messenger activation and is a custom template that requires event id (which is missing)', 'event_espresso') . espresso_get_error_code(__FILE__, __FUNCTION__, __LINE__ ) );
		}

		//whew made it this far!  Okay, let's go ahead and create the templates then
		return $this->_create_new_templates($evt_id, $is_global);
	}

	protected function _create_new_templates($evt_id, $is_global) {

		$m_fields = $this->_messenger->get_template_fields();
		$m_defaults = $this->_messenger->get_default_field_content();
		$mt_contexts = $this->_message_type->get_contexts();
		$mt_defaults = $this->_message_type->get_default_field_content();
		$variable_template_data = array();

		//first are we setting up templates after messenger activation? If so then we need to get defaults from the messenger
		if ( empty($evt_id) && $is_global ) {
			//setup templates array
			foreach ( $mt_contexts as $context ) {
				foreach ( $m_fields as $field => $field_type ) {
					if ( $field !== 'extra' )
						$templates[$context][$field] = ( isset($mt_defaults[$field]) ? maybe_serialize($mt_defaults[$field]) : maybe_serialize($m_defaults[$field]) );
				}
			}

		} else if ( !empty($evt_id) ) {
			//k we're setting up a custom event template so let's just copy what's currently in the active global template for this messenger and message_type
			//first let's get all templates for this messenger
			$all_templates = $this->_EEM_data->get_all_message_templates_by_messenger($this->_messenger->name);
			foreach ( $all_templates as $template_object ) {
				if ( $this->_message_type->name == $template_object->message_type() ) {
					$context_templates = $template_object->context_templates();
					foreach ( $mt_contexts as $context ) {
						foreach ( $m_fields as $field => $field_type ) {
							if ( $field !== 'extra' ) {
								$templates[$context][$field] = ( isset($context_templates[$context][$field] ) ) ? $context_templates[$context][$field]['content'] : '';
								$templates[$context][$field] = (!is_serialized($templates[$context][$field]) ) ? maybe_serialize($templates[$context][$field]) : $templates[$context][$field];
							}
						}
					}
				}
			}
			
		}
		//setup data and update
		
		$template_data = array(
			'MTP_messenger' => $this->_messenger->name,
			'MTP_message_type' => $this->_message_type->name,
			'GRP_ID' => $this->_EEM_data->generate_grp_id(),
			'EVT_ID' => $evt_id,
			'MTP_is_override' => 0,
			'MTP_deleted' => 0,
			'MTP_is_global' => $is_global,
			'MTP_user_id' => get_current_user_id()
		);

		foreach ( $mt_contexts as $context ) {
			foreach ( $m_fields as $field => $field_type ) {
				if ( $field != 'extra' ) {
					$template_data['MTP_context'] = $context;
					$template_data['MTP_template_field'] = $field;
					$template_data['MTP_content'] = $templates[$context][$field];
					$MTP = $this->_EEM_data->insert($template_data);
					if ( !$MTP ) 
						return new WP_Error( __('template_creation_error', 'event_espresso'), sprintf(__('There was an error in saving new template data for %s messenger, %s message type, %s context and %s template field.', 'event_espresso'), $this->_messenger->name, $this->_message_type->name, $context, $field) . espresso_get_error_code(__FILE__, __FUNCTION__, __LINE__));
				}
			}
		}

		$success_array = array(
			'GRP_ID' => $template_data['GRP_ID'],
			'EVT_ID' => $template_data['EVT_ID'],
			'MTP_context' => $mt_contexts[0]
		);	

		return $success_array;	
	}

	/**
	 * get_fields
	 * This takes a given messenger and message type and returns all the template fields indexed by context (and with field type).
	 * @param  string $messenger    EE_messenger
	 * @param  string $message_type EE_message_type
	 * @return array|wp_error_object  template fields indexed by context.
	 */
	public function get_fields($messenger, $message_type) {
		$template_fields = array();

		$valid_msg = $this->_validate_setup($messenger, $message_type);

		//bubble up wp_error_obj if exists
		if ( is_wp_error($valid_msg) )
			return $valid_msg;


		//okay now let's assemble an array with the messenger template fields added to the message_type contexts.
		foreach ( $this->_message_type->get_contexts() as $context ) {
			foreach ( $this->_messenger->get_template_fields() as $field => $value ) {
				$template_fields[$context][$field] = $value;
			} 
		}

		if ( empty($template_fields) )
			return new WP_Error( __('get_template_field_error', 'event_espresso'), __('Something went wrong and we couldn\'t get any templates assembled', 'event_espresso') . espresso_get_error_code(__FILE__, __FUNCTION__, __LINE__));

		return $template_fields;
	}

	/**
	 * gets an array of installed messengers and message objects.
	 * 
	 * @access public
	 * @return array multidimensional array of messenger and message_type objects (messengers index, and message_type index);
	 */
	public function get_installed() {
		$installed = array();
		$message_base = EVENT_ESPRESSO_INCLUDES_DIR . "core" . DS . "messages" . DS;
		$messenger_files = scandir( $message_base . "messenger", 1);
		$messagetype_files = scandir( $message_base . "message_type", 1);

		$installed['messengers'] = $this->_get_installed($messenger_files);
		$installed['message_types'] = $this->_get_installed($messagetype_files);

		return $installed;
	}

	/**
	 * _get_installed
	 * takes an array of filenames and returns an array of objects instantiated from the class name found in the filename. 	
	 * @param  array $filenames and array of filenames
	 * @return array       array of objects
	 */
	private function _get_installed($filenames) {
		//make sure incoming filenames are in an array.
		$the_goods = array();
		$filenames = (array) $filenames;
		$replace = ".class.php";
		foreach ( $filenames as $filename ) {
			$classname = preg_match("/" . $replace . "/", $filename ) ? str_replace($replace, "", $filename) : false;
			
			//no classname? no match? move along, nothing to see here. note, the stripos is checking to make sure the filename (classname) begins with EE.
			if ( !$classname || 0 !== stripos($classname, 'EE') ) continue;

			//note: I'm not sure if this will work without including the file.  We do have autoloaders so it "may" work.
			$a = new ReflectionClass($classname);
			$the_goods[] = $a->newInstance();
		}
		return $the_goods;
	}

	public function get_active_messengers() {
		return $this->_active_messengers;
	}

	public function get_active_message_types() {
		return $this->_active_message_types;
	}
} 
//end EE_messages class





/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license				http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	3.2
 *
 * ------------------------------------------------------------------------
 *
 * EE_message_type class
 *
 * Abstract class for message types. 
 * Different types can be setup by extending this class and adding them to the /includes/core/messages/types' directory. View examples there.
 *
 * @package			Event Espresso
 * @subpackage	includes/core/messages
 * @author				Darren Ethier, Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
abstract class EE_message_type {
	
	/** DETAILS PROPERTIES **/
	/** 
	 * The following are used to hold details on the type for reference (i.e. on admin screens)
	 */
	public $name;
	public $description;

	/**
	 * This property when set will hold the slugs of all EE admin pages that we will need to retrieve fields for (and used to determine which callback method to call from the childclass)
	 *
	 * structure should be
	 * array(
	 * 'page_action' => true
	 * )
	 * @var array
	 */
	public $_admin_registered_pages = array();

	/**
	 * there are certain template fields that are global across all messengers.  This will hold the default content for those global template fields that will be added 
	 * @var array
	 */
	protected $_default_field_content = array();

	/**
	 * message type child classes will set what contexts are associated with the message type via this array.
	 * @var array
	 */
	protected $_contexts = array();

	
	/** MESSAGE ASSEMBLING PROPERTIES **/	

	/**
	 * This parameter simply holds all the message objects for retrieval by the controller and sending to the messenger.
	 * @var array of message objects.
	 */
	public $messages = array();

	/**
	 * The following holds the templates that will be used to assemble the message object for the messenger.
	 * @var array
	 */
	protected $templates;
	

	/** OTHER INFO PROPERTIES **/
	/**
	 * This will hold the count of the message objects in the messages array. This could be used for determining if batching/queueing is needed.
	 * @var int
	 */
	protected $count = 0;

	/**
	 * This will hold the active messenger object that is passed to the type so the message_type knows what template files to process.  IT is possible that the active_messenger sent along actually doesn't HAVE a template (or maybe turned off) for the given message_type.
	 * @var object
	 */
	protected $active_messenger; 

	/**
	 * This will hold the shortcode_replace instance for handling replacement of shortcodes in the various templates
	 * @var object
	 */
	protected $_shortcode_replace;

	/**
	 * This will hold the EEM_message_templates model for interacting with the database and retrieving templates.
	 * @var object
	 */
	protected $EEM_data;

	/**
	 * holds the gateway object
	 * @var object
	 */
	protected $gateways;

	/**
	 * This holds the data passed to this class from the controller
	 * @var object
	 */
	protected $data;

	/**
	 * This holds any specific fields for holding any settings related to a message type (if any needed)
	 * @var array
	 */
	protected $_admin_settings_fields = array();

	/**
	 * this property will hold any existing setting that may have been set in the admin.
	 * @var array
	 */
	protected $_existing_admin_settings = array();

	public function __construct() {
		$this->_set_admin_settings_fields();
		$this->_set_existing_admin_settings();
		$this->_set_default_field_content();
		$this->_set_contexts();
		$this->_set_admin_pages();
	}

	/** METHODS **/

	/**
	 * This method simply takes care of setting up message objects and returning them in an array.
	 * 
	 * @access public
	 * @param  array|object $data       Data to be parsed for messenger/message_type
	 * @param  string $active_messenger The active messenger being used
	 * @return void      
	 */
	public function set_messages($data, $active_messenger) {
		//todo: need to move require into registration hook but for now we'll require here.
		require_once EVENT_ESPRESSO_PLUGINFULLPATH . '/helpers/EE_Parse_Shortcodes.helper.php';
		//get shortcode_replace instance- set when _get_messages is called in child...
		$this->_shortcode_replace = EE_Parse_Shortcodes::instance();
		$this->active_messenger = $active_messenger;
		$this->data = $data;
		$this->_get_templates(); //get the templates that have been set with this type and for the given messenger that have been saved in the database.
		$this->_set_default_field_content;
		$this->_set_contexts;
		$this->_init_data();
		$this->_assemble_messages();
		$this->count = count($this->messages);
	}
	/**
	 * The main purpose of this function is to setup the various parameters within the message_type.  $templates and any extra stuff to the data object that can come from the messenger template options for the child class type.
	 * @return void
	 * @abstract
	 * @access protected
	 */
	abstract protected function _init_data();

	/**
	 * This sets the _default_field_content property which needs to be defined by child classes.
	 * 
	 * @abstract
	 * @access  protected
	 * @return void
	 */
	abstract protected function _set_default_field_content();


	/**
	 * sets any properties on whether a message type interface shows up on a ee administration page.  Child classes have to define this method but don't necessarily have to set the flags as they will be set to false by default.
	 *
	 * Child classes use this method to set the `_admin_registered_page` property.  That property is to indicate what EE admin pages we have a corresponding callback for in the child class so Message Type fields/content is included on that admin page. 
	 *
	 * @abstract
	 * @access protected
	 * @return void
	 */
	abstract protected function _set_admin_pages();

	/**
	 * this public method accepts a page slug (for an EE_admin page) and will return the response from the child class callback function if that page is registered via the `_admin_registered_page` property set by the child class.
	 *
	 * * 
	 * @param string $page the slug of the EE admin page
	 * @param array $messengers an array of active message type objects 
	 * @param string $action the page action (to allow for more specific handling - i.e. edit vs. add pages)
	 * @access public
	 * @return void
	 */
	public function get_message_type_admin_page_content($page, $messengers = array(), $action = null) {
		//we can also further refine the context by action (if present).
		if ( !empty($action) ) {
			$page = $page . '_' . $action;
		}

		if ( !isset( $this->_admin_registered_pages[$page]) ) return false; //todo: a place to throw an exception?  We need to indicate there is no registered page so this function is not being called correctly.

		//k made it here so let's call the method
		if ( FALSE === ( $content = call_user_func_array( array( $this, '_get_admin_content_' . $page), array($messengers) ) ) ) {
			return false; //todo this needs to be an exception once we've got exceptions in place.
		}		
		return $content;
	}

	/**
	 * sets the _existing_admin_settings property can be overridden by child classes.  We do this so we only do database calls if needed.
	 *
	 * @access protected
	 * @return void
	 */
	protected function _set_existing_admin_settings() {
		global $espresso_wp_user;
		$active_message_types = get_user_meta($espresso_wp_user, 'ee_active_message_types', true);

		//if there are no setting fields then there won't be any existing admin settings either.
		if ( !isset($active_message_types[$this->name]) && empty($this->_admin_settings_fields) )
			return $this->_existing_admin_settings = NULL;
		
		$this->_existing_admin_settings = isset($active_message_types[$this->name] ) ?  $active_message_types[$this->name]['settings'] : null;

	}

	public function get_existing_admin_settings() {
		// if admin_settings property empty lets try setting it.
		if ( empty( $this->_existing_admin_settings ) && method_exists($this, '_set_existing_admin_settings') )
			$this->_set_existing_admin_settings();

		return property_exists($this,'_existing_admin_settings') ? $this->_existing_admin_settings : null;
	}

	/**
	 * getter that returns the protected admin_settings_fields property
	 * 
	 * @access public
	 * @return array admin settings fields
	 */
	public function get_admin_settings_fields() {
		return $this->_admin_settings_fields;
	}

	/**
	 * _set_contexts
	 * This sets up the contexts associated with the message_type
	 * 
	 * @abstract
	 * @access  protected
	 * @return  void
	 */
	abstract protected function _set_contexts();

	public function get_default_field_content() {
		return $this->_default_field_content;
	}

	public function get_contexts() {
		return $this->_contexts;
	}

	/**
	 * get and set the templates for the type and messenger from the database
	 * @return void
	 * @access protected
	 */
	protected function _get_templates() {
		//todo: $this->data is set by the message_type child at this point SO... we CAN check for if there is an event_specific template in here eventually. 
		$current_templates = $this->active_messenger->active_templates;

		if ( isset($current_templates) ) {
			foreach ( $current_templates as $template_object ) {
				if ( $this->name == $template_object->message_type() ) {
					$templates = $template_object->context_templates();
					foreach ( $templates as $context => $template_fields ) {
						foreach ( $template_fields as $template_field => $value ) {
								if ( is_array($value ) )
									$this->templates[$template_field][$context] = $value['content'];
						}
					}
				}
			}
		}
	}

	/**
	 * This function assembles the $messages array which will contain the message objects.
	 * @return void
	 * @access protected
	 */
	protected function _assemble_messages() {
		foreach ( $this->data->addressees as $receiver ) {
			$this->messages[] = $this->_setup_message_object($receiver);
		}
	}
	
	/**
	 * This function setups up and returns the message object
	 * 
	 * @return void
	 * @access protected
	 * 
	 */
	protected function _setup_message_object($receiver) {
		$message = new stdClass();
		
		foreach ( $this->templates as $template_type => $context ) {
			if ( isset( $this->templates[$template_type][$receiver->context] ) ) {
				$message->$template_type = $this->_shortcode_replace->parse_template($this->templates[$template_type][$receiver->context], $this->data);
			}
		}
		return $message;
	}	
} 
//end EE_message_type class


/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license				http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	3.2
 *
 * ------------------------------------------------------------------------
 *
 * EE_messenger class
 *
 * Abstract class for setting up messengers. 
 * Different messengers (i.e. email, sms) can be setup by extending this class and adding them to the /includes/core/messages/messengers' directory. View examples there.
 *
 * @package			Event Espresso
 * @subpackage	includes/core/messages
 * @author				Darren Ethier, Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
abstract class EE_messenger {
	/** DETAILS PROPERTIES **/
	/** 
	 * The following are used to hold details on the type for reference (i.e. on admin screens) and also used by the EE_message_type object to figure out where to get template data.
	 */
	public $name;
	public $description;

	/**
	 * This property when set will hold the slugs of all EE admin pages that we will need to retrieve fields for (and used to determine which callback method to call from the childclass)
	 *
	 * structure should be
	 * array(
	 * 'page_action' => true
	 * )
	 * @var array
	 */
	public $_admin_registered_pages = array();

	/**
	 * there are certain template fields that are global across all messengers.  This will hold the default content for those global template fields that will be added 
	 * @var array
	 */
	protected $_default_field_content = array();

	/**
	 * This wil hold the EEM_message_templates model for interacting with the database and retrieving active templates for the messenger
	 * @var object
	 */
	protected $_EEM_data;

	/**
	 * this property just holds an array of the various template refs.
	 * @var array
	 */
	protected $_template_fields = array();

	/**
	 * this property holds any specific fields for holding any settings related to a messenger (if any needed)
	 * @var array
	 */
	protected $_admin_settings_fields = array();

	/**
	 * this property will hold any existing settings that may have been set in the admin.
	 * @var array
	 */
	protected $_existing_admin_settings = array();

	public $active_templates = array(); //holds all the active templates saved in the database.

	public function __construct() {
		$this->_EEM_data = EEM_Message_Template::instance(); //todo might move this into the constructor and typehint
		$this->_set_admin_settings_fields();
		$this->_set_existing_admin_settings();
		$this->_set_templates();	
		$this->_set_template_fields();
		$this->_set_default_field_content();
		$this->_set_admin_pages();
	}

	/**
	 * _set_template_fields
	 * This sets up the fields that a messenger requires for the message to go out.
	 * 
	 * @abstract
	 * @access  protected
	 * @return void
	 */
	abstract protected function _set_template_fields();

	/**
	 * _set_default_field_content
	 * child classes need to define this function to set the _default_field_content property (what gets added in the default templates).
	 * 
	 * @abstract
	 * @access protected
	 * @return void
	 */
	abstract protected function _set_default_field_content();

	/**
	 * sets the _admin_settings_fields property which needs to be defined by child classes.
	 * You will want to set the _admin_settings_fields properties as a multi-dimensional array with the following format
	 * array(
	 * 		{field_name - also used for setting index} => array(
	 * 			'field_type' => {type of field: 'text', 'textarea', 'checkbox'},
	 * 			'value_type' => {type of value: 'string', 'int', 'array', 'bool'},
	 * 			'required' => {bool, required or not},
	 * 			'validation' => {bool, true if we want validation, false if not},
	 * 			'format' => {%d, or %s},
	 * 			'label' => {label for the field, make sure it's localized},
	 * 			'default' => {default value for the setting}
	 * 		),
	 * );
	 *
	 * @abstract
	 * @access protected
	 * @return void
	 */
	abstract protected function _set_admin_settings_fields();

	/**
	 * sets any properties on whether a message type interface shows up on a ee administration page.  Child classes have to define this method but don't necessarily have to set the flags as they will be set to false by default.
	 *
	 * Child classes use this method to set the `_admin_registered_page` property.  That property is to indicate what EE admin pages we have a corresponding callback for in the child class so Message Type fields/content is included on that admin page. 
	 *
	 * @abstract
	 * @access protected
	 * @return void
	 */
	abstract protected function _set_admin_pages();

	/**
	 * this public method accepts a page slug (for an EE_admin page) and will return the response from the child class callback function if that page is registered via the `_admin_registered_page` property set by the child class.
	 * 
	 * @param string $page the slug of the EE admin page
	 * @param array $message_types an array of active message type objects 
	 * @param string $action the page action (to allow for more specific handling - i.e. edit vs. add pages)
	 * @access public
	 * @return void
	 */
	public function get_messenger_admin_page_content($page, $message_types = array(), $action = null) {
		//we can also further refine the context by action (if present).
		if ( !empty($action) ) {
			$page = $page . '_' . $action;
		}

		if ( !isset( $this->_admin_registered_pages[$page]) ) return false; //todo: a place to throw an exception?  We need to indicate there is no registered page so this function is not being called correctly.

		//k made it here so let's call the method
		if ( FALSE === ( $content = call_user_func_array( array( $this, '_get_admin_content_' . $page), array($message_types) ) ) ) {
			return false; //todo this needs to be an exception once we've got exceptions in place.
		}		
		return $content;
	}

	/**
	 * sets the _existing_admin_settings property can be overridden by child classes.  We do this so we only do database calls if needed.
	 *
	 * @access protected
	 * @return void
	 */
	protected function _set_existing_admin_settings() {
		global $espresso_wp_user;
			
		$active_messengers = get_user_meta($espresso_wp_user, 'ee_active_messengers', true);

		//if there are no setting fields then there won't be any existing admin settings either.
		if ( !isset($active_messengers[$this->name]) && empty($this->_admin_settings_fields) )
			return $this->_existing_admin_settings = NULL;
		
		$this->_existing_admin_settings = isset($active_messengers[$this->name]) ? $active_messengers[$this->name]['settings'] : null;
	}

	/**
	 * get_existing_admin_settings
	 * (if needed) sets and returns the _existing_admin_settings property.
	 *
	 * @access public
	 * @return array          settings
	 */
	public function get_existing_admin_settings() {
		// if admin_settings property empty lets try setting it.
		if ( method_exists($this, '_set_existing_admin_settings()') && empty( $this->_existing_admin_settings ) )
			$this->_set_existing_admin_settings();

		return property_exists($this, '_existing_admin_settings') ? $this->_existing_admin_settings : null;
	}

	/**
	 * getter that returns the protected admin_settings_fields property
	 * 
	 * @access public
	 * @return array admin settings fields
	 */
	public function get_admin_settings_fields() {
		return $this->_admin_settings_fields;
	}

	/**
	 * get_template_fields
	 * 
	 * @access public
	 * @return array $this->_template_fields
	 */
	public function get_template_fields() {
		return $this->_template_fields;
	}

	public function get_default_field_content() {
		return $this->_default_field_content;
	}

	/**
	 * This sets the active templates for the messenger.  
	 * @access protected
	 */
	protected function _set_templates() {
		$this->active_templates = $this->_EEM_data->get_all_active_message_templates_by_messenger($this->name);
	}

	/** SETUP METHODS **/

	/**
	 * The following method doesn't NEED to be used by child classes but might be modified by the specific messenger
	 */
	protected function _set_template_value($item, $value) {
		if ( array_key_exists($item, $this->_template_fields) )
			$this->$item = $value;
	}

	/**
	 * Sets up the message for sending.
	 * @param  EE_message_type $message the message object that contains details about the message.
	 */
	public function send_message( EE_message_type $message ) {
		foreach ( $this->_template_fields as $template => $value ) {
			if ( $template !== 'extra' )
				$this->_set_template_value($template, $message->$template);
		}
		$this->_send_message();
	}

	/**
	 * We just deliver the messages don't kill us!!  This method will need to be modified by child classes for whatever action is taken to actually send a message.  
	 * @return void
	 * @todo  at some point we may want to return success or fail so we know whether a message has gone off okay and we can assemble reporting.
	 */
	abstract protected function _send_message();

	

} 
// end EE_messenger class


// end of file:	includes/core/messages/EE_messages.core.php