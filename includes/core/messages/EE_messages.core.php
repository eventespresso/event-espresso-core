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
		$this->_load_active_message_types();	
	}

	/**
	 * get active messengers from db and instantiate them.
	 */
	private function _get_active_messengers() {
		global $espresso_wp_user;
		// todo: right now this just gets active global messengers: at some point we'll have to get what the active messengers are for the event.
		$actives = get_user_meta($espresso_wp_user, 'ee_active_messengers', true);
		$active_names = $this->_load_files('messenger', $actives);

		if ( empty($active_names) ) {
			return new WP_Error(__('no_active_messengers', 'event_espresso'), __('No messages have gone out because there are no active_messengers.', 'event_espresso') . espresso_get_error_code(__FILE__, __FUNCTION__, __LINE__) );
		}

		foreach ( $active_names as $name => $class ) {
			$active = call_user_func($class);
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
	private function _load_active_message_types() {
		global $espresso_wp_user;
		$actives = get_user_meta($espresso_wp_user, 'ee_active_message_types');
		$active_names = $this->_load_files('message_type', $actives);

		if ( empty($active_names) ) {
			return new WP_Error(__('no_active_types', 'event_espresso'), __('No messages have gone out because there are no active message types.', 'event_espresso') . espresso_get_error_code(__FILE__, __FUNCTION__, __LINE__) );
		} 

		$this->_active_message_types = $active_names;
	}

	/**
	 * load the active files needed (key word... NEEDED)
	 * @param string $kind indicates what kind of files we are loading. 
	 * @param array $actives indicates what active types of the $kind are actually to be loaded. 
	 */
	private function _load_files($kind, $actives) {
		$active_names = array();
		$base_path = EE_CORE . 'messages' . DS . $kind . DS;
		foreach ( $actives as $active ) {
			$messenger_name = 'EE_' . ucwords( str_replace( ' ', '_', $active) ) . '_' . $kind;
			$filename = $messenger_name . '.class.php';
			$load_file = $base_path . DS . $filename;
			if ( file_exists($load_file) ) {
				require_once($load_file);
				$active_names[$active] = $messenger_name;
			} else {
				$this->unset_active($active);
				//set WP_Error
				return new WP_Error(__('missing_file', 'event_espresso'), sprintf(__("missing messenger file set as active: (%s) %s \nMessenger has been made inactive.", 'event_espresso'), $load_file, espresso_get_error_code(__FILE__, __FUNCTION__, __LINE__ ) ) );
			}
		}
		return $active_names; 
	}

	// delegates message sending to messengers
	public function send_message( $type, $vars ) {
		
		//getting classname from $this->active_message_types array.  However, if we don't have it let's set up a default for the error message.
		$classname = empty($this->_active_message_types[$type]) ? 'EE_' . $type . '_something' : $this->_active_message_types[$type];

		// is that a real class ?
		if ( class_exists( $classname ) ) {
			// then send it
			foreach ( $this->_active_messengers as $active_messenger ) {
				// create message data
				$messages = call_user_func( $classname );
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
	 * This is a wrapper for the protected _create_new_templates function
	 * @param  string $message_type message type that the templates are being created for
	 * @return array|object               if creation is succesful then we return an array of info, otherwise an error_object is returned. 
	 */
	public function create_new_templates( $messenger, $message_type, $evt_id, $is_global = false ) {
		$valid_mt = false;
		$evt_id = absint($evt_id);
		
		$message_type = strtolower(str_replace(' ', '_', $message_type) );
		$messenger = strtolower(str_replace(' ', '_', $messenger));

		//setup messenger and message_type object
		$this->_messenger = isset($this->_active_messengers[$messenger]) ? $this->active_messenger[$messenger] : null;

		//message type
		$mt_class = isset($this->_active_message_types[$message_type]) ? $this->_active_message_types[$message_type] : 'non_existant_class';
		$this->_message_type = class_exists($mt_class) ? call_user_func( $mt_class ) : null;

		//do we have the necessary objects loaded?
		if ( empty( $this->_messenger) || empty($this->_message_type) )
			return new WP_Error(__('problem_creating_required_objects', 'event_espresso'), sprintf(__(' We had a problem creating the %s messenger or the %s message_type. Are you sure they exist?', 'event_espresso'), $messenger, $message_type) . espresso_get_error_code(__FILE__, __FUNCTION__, __LINE__) ); 
		
		//is given message_type valid for given messenger?
		foreach ( $this_messenger->active_templates as $template ) {
			if ( $template->message_type() == $message_type )
				$valid_mt = true;
		}
		
		if ( !$valid_mt && $is_global ) {
			//we're setting up a brand global templates (with messenger activation) so we're assuming that the message types sent in are valid.
			$valid_mt = true;
		}

		if ( !$valid_mt ) {
			//if we've still got no valid_mt then error roger
			return new WP_Error(__('invalid_message_type', 'event_espresso'), sprintf(__(' % is an invalid message_type', 'event_espresso'), $message_type) . espresso_get_error_code(__FILE__, __FUNCTION__, __LINE__) );
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
								$templates[$context][$field] = ( isset($context_templates[$context][$field] ) ) ? $context_templates[$context][$field] : '';
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
	protected $name;
	protected $description;

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

	public function __construct() {
		$this->_set_default_field_content();
		$this->_set_contexts();
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
	abstract protected function _init_data() {}

	/**
	 * This sets the _default_field_content property which needs to be defined by child classes.
	 * 
	 * @abstract
	 * @access  protected
	 * @return void
	 */
	abstract protected function _set_default_field_content() {}

	/**
	 * _set_contexts
	 * This sets up the contexts associated with the message_type
	 * 
	 * @abstract
	 * @access  protected
	 * @return  void
	 */
	abstract protected function _set_contexts() {}

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
			if ( isset( $this->templates[$template_type][$reciever->context] ) ) {
				$message->$template_type = $this->_shortcode_replace->parse_template($this->templates[$template_type][$reciever->context], $this->data);
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
	public $active_templates = array(); //holds all the active templates saved in the database.

	public function __construct() {
		$this->_EEM_data = EEM_Message_Template::instance();
		$this->_set_templates();	
		$this->_set_template_fields();
		$this->_set_default_field_content();
	}

	/**
	 * _set_template_fields
	 * This sets up the fields that a messenger requires for the message to go out.
	 * 
	 * @abstract
	 * @access  protected
	 * @return void
	 */
	abstract protected function _set_template_fields() {}

	/**
	 * _set_default_field_content
	 * child classes need to define this function to set the _default_field_content property (what gets added in the default templates).
	 * 
	 * @abstract
	 * @access protected
	 * @return void
	 */
	abstract protected function _set_default_field_content() {}

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
		$this->active_templates = $this->EEM_data->get_all_active_message_templates_by_messenger($this->name);
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
	abstract protected function _send_message() {}

	

} 
// end EE_messenger class


// end of file:	includes/core/messages/EE_messages.core.php