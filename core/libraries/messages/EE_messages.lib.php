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
 * @ version		 	4.0
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
		//load helper
		EE_Registry::instance()->load_helper('MSG_Template');

		// get list of active messengers and active message types
		$this->_EEM_data = EEM_Message_Template::instance();
		$this->_set_active_messengers_and_message_types();
		$this->_set_installed_message_types();
	}

	/**
	 * get active messengers from db and instantiate them.
	 */
	private function _set_active_messengers_and_message_types() {
		// todo: right now this just gets active global messengers: at some point we'll have to get what the active messengers are for the event.
		$_actives = EEH_MSG_Template::get_active_messengers_in_db();
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
	private function _set_installed_message_types() {
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
		$base_path = EE_LIBRARIES . 'messages' . DS . $kind . DS;
		if ( empty($actives) ) return false;

		//make sure autoloaders are set (failsafe)
		EE_Messages_Init::set_autoloaders();

		//make sure $actives is an array
		$actives = (array) $actives;

		EE_Registry::instance()->load_helper( 'File' );
		foreach ( $actives as $active ) {
			$msg_name = 'EE_' . ucwords( str_replace( ' ', '_', $active) ) . '_' . $kind;
			$filename = $msg_name . '.class.php';
			$load_file = $base_path . DS . $filename;
			if ( is_readable($load_file) ) {
				require_once($load_file);
				$active_names[$active] = $msg_name;
			} else {
				$this->_unset_active($active, $kind);
				//set WP_Error
				return EE_Error::add_error( sprintf( __("Missing messages system file set as inactive: (%s) %s has been made inactive.", 'event_espresso'), $load_file, $msg_name), __FILE__, __FUNCTION__, __LINE__ );
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
		//pluralize
		$active_messengers = EEH_MSG_Template::get_active_messengers_in_db();
		EE_Registry::instance()->load_helper( 'MSG_Template' );
		if ( $kind == 'messenger' ) {
			unset( $active_messengers[$active_name] );
			EEH_MSG_Template::update_to_inactive( $active_name );
			if ( isset( $this->_active_messengers[$active_name] ) ) {
				unset( $this->_active_messengers[$active_name] );
			}
		} else {
			foreach( $active_messengers as $messenger => $settings ) {
				if ( ! empty( $settings['settings'][$messenger . '-message_types'][$active_name] ) ) {
					unset( $active_messengers[$messenger]['settings'][$messenger . '-message_types'][$active_name] );
				}
			}
			EEH_MSG_Template::update_to_inactive( '', $active_name );
			if ( isset( $this->_active_message_types[$active_name] ) ) {
				unset( $this->_active_message_types[$active_name] );
			}
		}

		EEH_MSG_Template::update_active_messengers_in_db($active_messengers);
	}




	/**
	 * delegates message sending to messengers
	 * @param  string  $type    What type of message are we sending (corresponds to message types)
	 * @param  array  $vars    Data being sent for parsing in the message
	 * @return void
	 */
	public function send_message( $type, $vars ) {
		$success = FALSE;
		$error = FALSE;
		// is that a real class ?
		if ( isset(  $this->_installed_message_types[$type] ) ) {
			// then send it
			foreach ( $this->_active_messengers as $active_messenger ) {

				//we ONLY continue if the given messenger has that message type active with it.
				if ( !isset( $this->_active_message_types[$active_messenger->name][$type] ) )
					return false;

				// create message data
				$messages = $this->_installed_message_types[$type];
				$exit = $messages->set_messages( $vars, $active_messenger );

				if ( is_wp_error($messages) || $messages === FALSE || $exit === FALSE ) {
					//we've got an error so let's bubble up the error_object to be caught by caller.
					//todo: would be better to just catch the errors and then return any aggregated errors later.
					$error = TRUE;
					continue;
				}

				if ( $messages->count === 0 ) continue; //it is possible that the user has the messenger turned off for this type.

				//TODO: check count (at some point we'll use this to decide whether we send to queue or not i.e.
				//if ( $messages->count > 1000 ) ... do something
				//else...
				foreach ( $messages->messages as $message ) {
					//todo: should we do some reporting on messages gone out at some point?  I think we could have the $active_messenger object return bool for whether message was sent or not and we can compile a report based on that.
					$success = $active_messenger->send_message( $message );
					if ( $success === FALSE  ) {
						$error = TRUE;
					}
				}
				unset($messages);
			}
		} else {
			return EE_Error::add_error( sprintf( __('Message type: %s does not exist', 'event_espresso'), $type ), __FILE__, __FUNCTION__, __LINE__ );
		}
		// add a success message
		if ( ! $error ) {
			EE_Error::add_success( sprintf( __( 'The %s message has been succesfully sent.', 'event_espresso'), $this->_installed_message_types[$type]->label['singular'] ), __FILE__, __FUNCTION__, __LINE__ );
		}

		return $error ? FALSE : TRUE; //yeah backwards eh?  Really what we're returning is if there is a total success for all the messages or not.  We'll modify this once we get message recording in place.
	}




	/**
	 * Use to generate and return a message preview!
	 * @param  string $type    This should correspond with a valid message type
	 * @param  string $context This should correspond with a valid context for the message type
	 * @param  string $messenger This should correspond with a valid messenger.
	 * @param bool 	$send true we will do a test send using the messenger delivery, false we just do a regular preview
	 * @return string          The body of the message.
	 */
	public function preview_message( $type, $context, $messenger, $send = FALSE ) {

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
				return $messenger->get_preview( $message->messages[0], $send );

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
		$types_to_check = array();
		if ( !$is_global ) {
			$has_active = EEM_Message_Template_Group::instance()->count( array( array( 'MTP_is_active' => TRUE, 'MTP_messenger' => $this->_messenger->name, 'MTP_message_type' => $message_type ) ) );

			if ( $has_active == 0 ) {
				EE_Error::add_error( sprintf(__(' The %s message type is not registered with the %s messenger. Please visit the Messenger activation page to assign this message type first if you want to use it.', 'event_espresso'), $message_type, $messenger), __FILE__, __FUNCTION__, __LINE__ );
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
	public function create_new_templates( $messenger, $message_type, $GRP_ID = 0, $is_global = false ) {
		$valid_mt = false;

		$valid_mt = $this->_validate_setup($messenger, $message_type, $is_global);

		if ( is_wp_error($valid_mt) && $is_global ) {
			//we're setting up a brand new global templates (with messenger activation) so we're assuming that the message types sent in are valid.
			$valid_mt = true;
		}

		if ( is_wp_error($valid_mt) ) {
			//if we've still got no valid_mt then bubble up error object
			return $valid_mt;
		}

		//whew made it this far!  Okay, let's go ahead and create the templates then
		return $this->_create_new_templates($GRP_ID, $is_global);
	}

	protected function _create_new_templates($GRP_ID, $is_global) {

		//if we're creating a custom template then we don't need to use the defaults class
		if ( ! $is_global )
			return $this->_create_custom_template_group( $GRP_ID );

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
		$DFLT = $a->newInstance( $this, $GRP_ID );

		//generate templates
		$success = $DFLT->create_new_templates();

		/**
		 * $success is in an array in the following format
		 * array(
		 * 	'GRP_ID' => $new_grp_id,
		 * 	'MTP_context' => $first_context_in_new_templates,
		 * )
		 */
		return $success;
	}



	/**
	 * This creates a custom template using the incoming GRP_ID
	 *
	 * @param  int     $GRP_ID GRP_ID for the template_group being used as the base
	 * @return  array $success             This will be an array in the format:
	 *                                     			array(
	 *                                     				'GRP_ID' => $new_grp_id,
	 *                                     				'MTP_context' => $first_context_in_created_template
	 *                                     			)
	 * @access private
	 */
	private function _create_custom_template_group( $GRP_ID ) {
		//defaults
		$success = array( 'GRP_ID' => NULL, 'MTP_context' => '' );

		//get the template group to use as a template from the db.  If $GRP_ID is empty then we'll assume the base will be the global template matching the messenger and message type.
		$mtg = empty( $GRP_ID ) ? EEM_Message_Template_Group::instance()->get_one( array( array( 'MTP_messenger' => $this->_messenger->name, 'MTP_message_type' => $this->_message_type->name, 'MTP_is_global' => TRUE ) ) ) : EEM_Message_Template_Group::instance()->get_one_by_ID( $GRP_ID );

		//if we don't have a mtg at this point then we need to bail.
		if ( ! $mtg instanceof EE_Message_Template_Group ) {
			EE_Error::add_error( sprintf( __('Something went wrong with generating the custom template from this group id: %s.  This usually happens when there is no matching message template group in the db.', 'event_espresso'), $GRP_ID ), __FILE__, __FUNCTION__, __LINE__ );
			return $success;
		}

		//let's get all the related message_template objects for this group.
		$mtts = $mtg->message_templates();

		//now we have what we need to setup the new template
		$new_mtg = clone $mtg;
		$new_mtg->set('GRP_ID', 0);
		$new_mtg->set('MTP_is_global', FALSE);

		$template_name = defined('DOING_AJAX') && !empty( $_POST['templateName'] ) ? $_POST['templateName'] : __('New Custom Template', 'event_espresso');
		$template_description = defined("DOING_AJAX") && !empty( $_POST['templateDescription'] ) ? $_POST['templateDescription'] : sprintf( __('This is a custom template that was created for the %s messenger and %s message type.', 'event_espresso' ), $new_mtg->messenger_obj()->label['singular'], $new_mtg->message_type_obj()->label['singular'] );


		$new_mtg->set('MTP_name', $template_name );
		$new_mtg->set('MTP_description', $template_description );
		$new_mtg->save();
		$success['GRP_ID'] = $new_mtg->ID();
		$success['template_name'] = $template_name;

		//add new message templates and add relation to.
		foreach ( $mtts as $mtt ) {
			if ( ! $mtt instanceof EE_Message_Template )
				continue;
			$nmtt = clone $mtt;
			$nmtt->set('MTP_ID', 0);
			$nmtt->set( 'GRP_ID', $new_mtg->ID() ); //relation
			$nmtt->save();
			if ( empty( $success['MTP_context'] ) )
				$success['MTP_context'] = $nmtt->get('MTP_context');
		}

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
	 * gets an array of installed messengers and message types objects.
	 *
	 * @access public
	 * @param string $type we can indicate just returning installed message types or messengers (or both) via this parameter.
	 * @return array multidimensional array of messenger and message_type objects (messengers index, and message_type index);
	 */
	public function get_installed( $type = 'all' ) {
		$installed = array();

		$message_base = EE_LIBRARIES . "messages" . DS;

		$messenger_files = $type == 'all' || $type == 'messengers' ? scandir( $message_base . "messenger", 1) : NULL;
		$messagetype_files = $type == 'all' || $type == 'message_types' ? scandir( $message_base . "message_type", 1) : NULL;

		//allow plugins to filter in their messenger/message_type files
		$messenger_files = apply_filters('FHEE__EE_messages__get_installed__messenger_files', $messenger_files, $type );
		$messagetype_files = apply_filters('FHEE__EE_messages__get_installed__messagetype_files', $messagetype_files, $type );

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


	/**
	 * This does NOT return the _active_message_types property but simply returns an array of active message types from that property.  (The _active_message_types property is indexed by messenger and active message_types per messenger).
	 *
	 * @access public
	 * @return array array of message_type references
	 */
	public function get_active_message_types() {
		$message_types = array();
		foreach ( $this->_active_message_types as $messenger => $mtvalues ) {
			foreach ( $mtvalues as $mt => $config ) {
				if ( !in_array( $mt, $message_types ) )
					$message_types[] = $mt;
			}
		}

		return $message_types;
	}

	public function get_installed_message_types() {
		return $this->_installed_message_types;
	}
}
//end EE_messages class

// end of file:	includes/core/messages/EE_messages.core.php
