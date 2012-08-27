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
 * This class is the main controller class for EE_messages, it delegates messages to the messengers.
 *
 * @package			Event Espresso
 * @subpackage	includes/core/messages
 * @author				Darren Ethier, Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EE_messages {
 
	private $active_messengers = array();
	private $active_message_types = array();
	// main controller
	function __construct() {
		global $espresso_wp_user;
		
		// get list of active messengers and active message types
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

		foreach ( $active_names as $name ) {
			$active = call_user_func($name);
			if ( is_wp_error($active) ) {
				//we've got an error so let's bubble up the error_object to be caught by caller.
				//todo: would be better to just catch the errors and then return any aggregated errors later.
				return $active;
			}
			$this->active_messengers[] = $active;
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

		$this->active_message_types = $active_names;
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
		$classname = empty($this->active_message_types[$type]) ? 'EE_' . $type . '_something' : $this->active_message_types[$type];

		// is that a real class ?
		if ( class_exists( $classname ) ) {
			// then send it
			foreach ( $this->active_messengers as $active_messenger ) {
				// create message data
				$messages = call_user_func( $classname, $vars, $active_messenger );

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
	protected $shortcode_replace;

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

	public function __construct($data, $active_messenger) {
		global $EEM_Gateways;
		//get shortcode_replace instance- set when parent::__construct() is called in child...
		$this->shortcode_replace = EE_Parse_Shortcodes::instance();
		$this->active_messenger = $active_messenger;
		$this->data = $data;

		$this->_get_templates(); //get the templates that have been set with this type and for the given messenger that have been saved in the database.
	}

	/** METHODS **/
	/**
	 * The main purpose of this function is to setup the various parameters within the message_type.  $templates and any extra stuff to the data object that can come from the messenger template options for the child class type.
	 * @return void
	 * @access protected
	 */
	abstract protected function _init_data() {}

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
				if ( $this->name == $template_object->message_type() ) ) {
					$templates = $template_object->context_templates();
					foreach ( $templates as $context => $template_types ) {
						foreach ( $template_types as $template_type => $value ) {
								if ( is_array($value ) )
									$this->templates[$template_type][$context] = $value['content'];
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
				$message->$template_type = $this->shortcode_replace->parse_template($this->templates[$template_type][$reciever->context], $this->data);
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
	 * This wil hold the EEM_message_templates model for interacting with the database and retrieving active templates for the messenger
	 * @var object
	 */
	protected $_EEM_data;

	/**
	 * this property just holds an array of the various template refs.
	 * @var array
	 */
	protected $_templates = array();
	public $active_templates = array(); //holds all the active templates saved in the database.

	/** MESSAGE SEND PROPERTIES **/
	/**
	 * The following are some common properties that would be shared by most messengers for delivering messages. However, individual messengers may add more items (or not use all of these)
	 */
	protected $_to;
	protected $_from;
	protected $_subject;
	protected $_content;

	public function __construct() {
		$this->_EEM_data = EEM_Message_Template::instance();
		$this->_set_templates();	
	}

	/**
	 * This sets the templates property to the different template_types used by the messenger.  We set defaults in here but the child classes could setup their own. Child classes will also need to make sure that they declare any different "templates" as properties.
	 * @access protected
	 */
	protected function _set_templates() {
		$this->_templates = array(
			'to',
			'from',
			'subject',
			'content'
			);
		$this->active_templates = $this->EEM_data->get_all_active_message_templates_by_messenger($this->name);
	}


	/** SETUP METHODS **/

	/**
	 * The following method doesn't NEED to be used by child classes but might be modified by the specific messenger
	 */
	protected function _set_template_value($item, $value) {
		if ( in_array($item, $this->_templates) )
			$this->$item = $value;
	}

	/**
	 * Sets up the message for sending.
	 * @param  EE_message_type $message the message object that contains details about the message.
	 */
	public function send_message( EE_message_type $message ) {
		foreach ( $this->_templates as $template ) {
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