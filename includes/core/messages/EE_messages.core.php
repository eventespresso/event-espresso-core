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
	private $_installed_message_types = array();
	private $_messenger;
	private $_message_type;

	/**
	 * holds the EEM_message_templates model for interacting with the database and retrieving active templates for the messenger
	 * @var object
	 */
	private $_EEM_data;
	// main controller
	function __construct() {
		// get list of active messengers and active message types
		$this->_EEM_data = EEM_Message_Template::instance();
		$this->_get_active_messengers();
		$this->_get_installed_message_types();	
	}

	/**
	 * get active messengers from db and instantiate them.
	 */
	private function _get_active_messengers() {
		// todo: right now this just gets active global messengers: at some point we'll have to get what the active messengers are for the event.
		$_actives = get_option('ee_active_messengers');
		$actives = is_array($_actives) ? array_keys($_actives) : $_actives;
		$active_names = $this->_load_files('messenger', $actives);

		if ( is_array($active_names) ) {
			foreach ( $active_names as $name => $class ) {
				$a = new ReflectionClass( $class );
				$active = $a->newInstance();
				if ( is_wp_error($active) ) {
					//we've got an error so let's bubble up the error_object to be caught by caller.
					//todo: would be better to just catch the errors and then return any aggregated errors later.
					EE_Error::add_error($active->get_error_message(), __FILE__, __FUNCTION__, __LINE__);
				}
				$this->_active_messengers[$name] = $active;
				$this->_active_message_types[$name] = $_actives[$name]['settings'][$name . '-message_types'];
			}
		}
	}

	/**
	 * get active types from db and load the related files.  They don't get instantiated till $this->send_message.
	 * 
	 */
	private function _get_installed_message_types() {
		//get installed
		$message_types = $this->get_installed( 'message_types' );

		foreach ( $message_types as $message_type ) {
			$this->_installed_message_types[$message_type->name] = $message_type;
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
				return EE_Error::add_error( sprintf( __("missing messenger file set as active: (%s) %s \nMessenger has been made inactive.", 'event_espresso'), $load_file), __FILE__, __FUNCTION__, __LINE__ );
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




	/**
	 * delegates message sending to messengers
	 * @param  string  $type    What type of message are we sending (corresponds to message types)
	 * @param  array  $vars    Data being sent for parsing in the message
	 * @return void           
	 */
	public function send_message( $type, $vars ) {
	

		// is that a real class ?
		if ( isset(  $this->_installed_message_types[$type] ) ) {
			// then send it
			foreach ( $this->_active_messengers as $active_messenger ) {

				//we ONLY continue if the given messenger has that message type active with it.
				if ( !isset( $this->_active_message_types[$active_messenger->name][$type] ) )
					return false;

				// create message data
				$messages = $this->_installed_message_types[$type];
				$messages->set_messages( $vars, $active_messenger );

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
			return EE_Error::add_error( sprintf( __('Message type: %s does not exist', 'event_espresso'), $type ), __FILE__, __FUNCTION__, __LINE__ );
		}
	}




	/**
	 * Use to generate and return a message preview!
	 * @param  string $type    This should correspond with a valid message type
	 * @param  string $context This should correspond with a valid context for the message type
	 * @param  string $messenger This should correspond with a valid messenger.
	 * @return string          The body of the message.
	 */
	public function preview_message( $type, $context, $messenger ) {

		//does the given type match an actual message type class.
		if ( isset(  $this->_installed_message_types[$type] ) ) {
			// valid messenger?
			if ( isset( $this->_active_messengers[$messenger] ) ) {

				//we ONLY continue if the given messenger has that message type active with it.
				if ( !isset( $this->_active_message_types[$messenger][$type] ) )
					return false;

				$message = $this->_installed_message_types[$type];
				$messenger = $this->_active_messengers[$messenger];

				//set data for preview
				$message->set_messages( array(), $messenger, $context );

				//let's GET the message body from the messenger (instead of the normal send_message)
				return $messenger->get_preview( $message->messages[0] );

			} else {
				EE_Error::add_error( sprintf( __('Messenger: %s does not exist', 'event_espresso'), $messenger ), __FILE__, __FUNCTION__, __LINE__ );
				return FALSE;
			}

		} else {
			EE_Error::add_error( sprintf( __('Message type: %s does not exist', 'event_espresso'), $type ), __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
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
		$mt = isset($this->_installed_message_types[$message_type]) ? $this->_installed_message_types[$message_type] : 'message_type_not_existent';

		$this->_message_type = is_object($mt) ? $mt : null;


		//do we have the necessary objects loaded?
		if ( empty( $this->_messenger) || empty($this->_message_type) )
			throw new EE_Error( sprintf( __(' The %s messenger or the %s message_type are not active. Are you sure they exist?', 'event_espresso'), $messenger, $message_type ) );
		
		//is given message_type valid for given messenger (if this is not a global save)
		if ( !$is_global ) {
			foreach ( $this->_messenger->active_templates as $template ) {
				if ( $template->message_type() != $message_type )
					EE_Error::add_error( sprintf(__(' The %s message type is not registered with the %s messenger. Please visit the Messenger activation page to assign this message type first if you want to use it.', 'event_espresso'), $messenger, $message_type), __FILE__, __FUNCTION__, __LINE__ );
				return false;
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
			EE_Error::add_error( __('This template is not being created by messenger activation and is a custom template that requires event id (which is missing)', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
			return false;
		}

		//whew made it this far!  Okay, let's go ahead and create the templates then
		return $this->_create_new_templates($evt_id, $is_global);
	}

	protected function _create_new_templates($evt_id, $is_global) {

		//assemble class name
		$messenger = ucwords( str_replace( '_', ' ', $this->_messenger->name ) );
		$messenger = str_replace( ' ', '_', $messenger );
		$message_type = ucwords( str_replace( '_', ' ', $this->_message_type->name ) );
		$message_type = str_replace( ' ', '_', $message_type );
		$classname = 'EE_Messages_' . $messenger . '_' . $message_type . '_Defaults';

		//next we need to see if the defaults class exists
		if ( !class_exists( $classname ) ) {
			$msg[] = __('Something went wrong with creating a new template', 'event_espresso');
			$msg[] = sprintf( __('The defaults class being checked for is <strong>%s</strong>. Please doublecheck the spelling and make sure you have a class for this messenger/message_type combo setup. Also verify that the autoloaders are setup correctly for the class', 'event_espresso'), $classname );
			throw new EE_Error( implode('||', $msg ) );
		}

		//if we've made it this far we have the class so let's instantiate
		$a = new ReflectionClass( $classname );
		$DFLT = $a->newInstance( $this );

		//generate templates
		$success = $DFLT->create_new_templates($evt_id, $is_global);
		return $success;
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


		//okay now let's assemble an array with the messenger template fields added to the message_type contexts.
		foreach ( $this->_message_type->get_contexts() as $context => $details ) {
			foreach ( $this->_messenger->get_template_fields() as $field => $value ) {
				$template_fields[$context][$field] = $value;
			} 
		}

		if ( empty($template_fields) ) {
			EE_Error::add_error( __('Something went wrong and we couldn\'t get any templates assembled', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
			return FALSE;
		}

		return $template_fields;
	}

	/**
	 * gets an array of installed messengers and message objects.
	 * 
	 * @access public
	 * @param string $type we can indicate just returning installed message types or messengers (or both) via this parameter.
	 * @return array multidimensional array of messenger and message_type objects (messengers index, and message_type index);
	 */
	public function get_installed( $type = 'all' ) {
		$installed = array();

		$message_base = EVENT_ESPRESSO_INCLUDES_DIR . "core" . DS . "messages" . DS;

		$messenger_files = $type == 'all' || $type == 'messengers' ? scandir( $message_base . "messenger", 1) : NULL;
		$messagetype_files = $type == 'all' || $type == 'message_types' ? scandir( $message_base . "message_type", 1) : NULL;

		$installed['messengers'] = !empty($messenger_files ) ? $this->_get_installed($messenger_files) : '';
		$installed['message_types'] = !empty($messagetype_files) ? $this->_get_installed($messagetype_files) : '';

		if ( $type != 'all' ) {
			$installed = $type == 'messengers' ? $installed['messengers'] : $installed['message_types'];
		}

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

	public function get_installed_message_types() {
		return $this->_installed_message_types;
	}
} 
//end EE_messages class

// end of file:	includes/core/messages/EE_messages.core.php
