<?php

if (!defined('EVENT_ESPRESSO_VERSION') )
	exit('NO direct script access allowed');

/**
 * EE_Messages class
 *
 * This class is the main controller class for EE_Messages, it delegates messages to the messengers and contains other methods for obtaining various details about the active messengers and message types.
 *
 * @package		Event Espresso
 * @subpackage	includes/core/messages
 * @author		Darren Ethier, Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EE_Messages {


	/**
	 * Array of active messengers.
	 * Format is this:
	 * array(
	 *      'messenger_name' => EE_messenger
	 * )
	 *
	 * @type EE_Messenger[]
	 */
	protected $_active_messengers = array();




	/**
	 * Formatted array of active message types grouped per messenger.
	 * Format is this:
	 * array(
	 *      'messenger_name' => array(
	 *          'settings' => array(
	 *              '{messenger_name}-message_types' => array(
	 *                  'message_type_name' => array() //variable array of settings corresponding to message type.
	 *              )
	 *          )
	 *      )
	 * )
	 * @type array
	 */
	protected $_active_message_types = array();





	/**
	 * @type EE_message_type[]
	 */
	protected $_installed_message_types = array();





	/**
	 * When setting up values this is a temporary holder of the current EE_messenger object.
	 *
*@type EE_Messenger
	 */
	protected $_messenger;





	/**
	 * When setting up values this is a temporary holder of the current EE_message_type object.
	 * @type EE_message_type
	 */
	protected $_message_type;


	/**
	 * @type EE_Messenger_Collection
	 */
	protected $_messenger_collection;





	/**
	 * An array of unique message type contexts across all active message types.
	 *
	 * The array will be indexed by either 'slugs' or 'all'.
	 * The slugs index contains an array indexed by unique context slugs with the latest label representation for that slug.
	 * array(
	 *      'context_slug' => 'localized label for context obtained from latest message type in the loop'.
	 * );
	 *
	 * The all index returns an array in this format:
	 * array(
	 *      'message_type_name' => array(
	 *          'context_slug' => array(
	 *              'label' => 'localized label for context',
	 *              'description' => 'localized description for context'
	 *          )
	 *      )
	 * );
	 * @type array
	 */
	protected $_contexts = array();





	/**
	 * holds the EEM_message_templates model for interacting with the database and retrieving active templates for the messenger
	 * @var object
	 */
	private $_EEM_data;



	/**
	 * EE_Messages constructor.
	 *
	 * @param \EE_Messenger_Collection_Loader $Messenger_Collection_Loader
	 */
	function __construct( EE_Messenger_Collection_Loader $Messenger_Collection_Loader ) {
		$Messenger_Collection_Loader = new EE_Messenger_Collection_Loader( new EE_Messenger_Collection() );
		$Messenger_Collection_Loader->load_messengers_from_folder();
		$this->set_messenger_collection( $Messenger_Collection_Loader->messenger_collection() );
		//load helper
		EE_Registry::instance()->load_helper('MSG_Template');
		// get list of active messengers and active message types
		$this->_EEM_data = EEM_Message_Template::instance();
		$this->_set_active_messengers_and_message_types();

		//load debug tools
		//EE_Registry::instance()->load_helper('Debug_Tools');
	}



	/**
	 * @return EE_Messenger_Collection
	 */
	public function get_messenger_collection() {
		return $this->_messenger_collection;
	}



	/**
	 * @param mixed $messengers
	 */
	public function set_messenger_collection( EE_Messenger_Collection $messengers ) {
		$this->_messenger_collection = $messengers;
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
				$this->_active_message_types[$name] = ! empty( $_actives[$name]['settings'][$name . '-message_types'] ) ? $_actives[$name]['settings'][$name . '-message_types'] : array();
			}
		}
	}

	/**
	 * Ensures that the specified messenger is currently active.
	 * If not, activates it and its default message types.
	 * @param string $messenger_name
	 * @return boolean TRUE if it was PREVIOUSLY active, and FALSE if it was previously inactive
	 */
	public function ensure_messenger_is_active( $messenger_name ){
		//note: active messengers indexed by their names
		$active_messengers = EEH_MSG_Template::get_active_messengers_in_db();
		if( ! isset( $active_messengers[ $messenger_name ] ) ) {
			$this->activate_messenger( $messenger_name );
			return FALSE;
		}else{
			return TRUE;
		}
	}



	/**
	 * Ensures that the specified message type for the given messenger is currently active, if not activates it.
	 * This ALSO ensures that the given messenger is active as well!.
	 *
	 * @param string $message_type message type name
	 * @param        $messenger
	 * @return bool true if it got activated (or was active) and false if not.
	 * @throws \EE_Error
	 */
	public function ensure_message_type_is_active( $message_type, $messenger ) {
		//first validate that the incoming messenger allows this message type to be activated.
		$messengers = $this->get_messenger_collection();
		if ( ! isset( $messengers[$messenger] ) ) {
			throw new EE_Error( sprintf( __('The messenger sent to %s is not installed', 'event_espresso'), __METHOD__ ) );
		}

		$msgr = $messengers[$messenger];
		$valid_message_types = $msgr->get_valid_message_types();
		if ( ! in_array( $message_type, $valid_message_types ) ) {
			throw new EE_Error(
				sprintf(
					__('The message type (%1$s) sent to %2$s is not valid for the %3$s messenger.  Double-check the spelling and verify that message type has been registered as a valid type with the messenger.', 'event_espresso' ),
					$message_type,
					__METHOD__,
					$messenger
				)
			);
		}

		//all is good so let's just get it active
		return $this->activate_messenger( $messenger, array( $message_type ) );
	}

	/**
	 * Activates the specified messenger
	 * @param string $messenger_name
	 * @param array $mts_to_activate (optional) An array of message types to activate with this messenger.  If
	 *                             				included we do NOT setup the default message types (assuming
	 *                             				they are already setup.)
	 * @return boolean an array of generated templates or false if nothing generated/activated.
	 */
	public function activate_messenger( $messenger_name, $mts_to_activate = array() ){
		$active_messengers = EEH_MSG_Template::get_active_messengers_in_db();
		$message_types = $this->get_installed_message_types();
		$installed_messengers = $this->get_messenger_collection();
		$templates = false;
		$settings = array();
		//get has_active so we can be sure its kept up to date.
		$has_activated = get_option( 'ee_has_activated_messenger' );

		//grab the messenger to work with.
		$messenger = isset( $installed_messengers[$messenger_name] ) ? $installed_messengers[$messenger_name] : null;

		//it's inactive. Activate it.

		if( $messenger instanceof EE_Messenger ) {
			$active_messengers[ $messenger->name ][ 'obj' ] = $messenger;

			/** @var EE_Messenger[] $installed_messengers  */
			$mts_to_activate = ! empty( $mts_to_activate ) ? $mts_to_activate :  $messenger->get_default_message_types();
			foreach ( $mts_to_activate as $message_type ) {
				//we need to setup any initial settings for message types
				/** @var EE_message_type[] $installed_mts */
				$settings_fields = isset( $message_types[$message_type] ) ? $message_types[ $message_type ]->get_admin_settings_fields() : array();
				if ( !empty( $settings_fields ) ) {
					foreach ( $settings_fields as $field => $values ) {
						$settings[$field] = $values[ 'default' ];
					}
				} else {
					$settings = array();
				}

				$active_messengers[ $messenger->name ][ 'settings' ][ $messenger->name . '-message_types' ][ $message_type ][ 'settings' ] = $settings;

				if (  ! empty( $has_activated[$messenger->name] ) && ! in_array( $message_type, $has_activated[$messenger->name] ) ) {
					$has_activated[$messenger->name][] = $message_type;
				}
			}

			//setup any initial settings for the messenger
			$msgr_settings = $messenger->get_admin_settings_fields();

			if ( !empty( $msgr_settings ) ) {
				foreach ( $msgr_settings as $field => $value ) {
					$active_messengers[ $messenger->name ][ 'settings' ][ $field ] = $value;
				}
			}

			EEH_MSG_Template::update_active_messengers_in_db( $active_messengers );
			update_option( 'ee_has_activated_messenger', $has_activated );

			//make sure that the cached active_messengers is set on this object
			$this->_active_messengers[$messenger->name] = $messenger;
			$this->_active_message_types[$messenger->name] = $active_messengers[$messenger->name];

			//might need to generate new templates
			if ( ! empty( $mts_to_activate ) ) {
				$templates = EEH_MSG_Template::generate_new_templates( $messenger->name, $mts_to_activate, 0, TRUE );
			}
		}

		return $templates;
	}



	/**
	 * load the active files needed (key word... NEEDED)
	 * @param string $kind    indicates what kind of files we are loading.
	 * @param array  $actives indicates what active types of the $kind are actually to be loaded.
	 * @return array|void
	 */
	private function _load_files($kind, $actives) {
		$active_names = array();
		$base_path = EE_LIBRARIES . 'messages' . DS . $kind . DS;
		if ( empty($actives) ) return false;

		//make sure autoloaders are set (fail-safe)
		EED_Messages::set_autoloaders();

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
				EE_Error::add_error(
					sprintf(
						__('Missing messages system file set as inactive: (%1$s) %2$s has been made inactive.', 'event_espresso'),
						$load_file,
						$msg_name
					),
					__FILE__, __FUNCTION__, __LINE__
				);
				return false;
			}
		}
		return $active_names;
	}




	/**
	 * unsets the active if we can't find the file (fail-safe)
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
	 * Used to verify if a message can be sent for the given messenger and message type and that it is a generating messenger (used for generating message templates).
	 *
	 * @param EE_Messenger    $messenger    messenger used in trigger
	 * @param EE_message_type $message_type message type used in trigger
	 *
	 * @return bool true is a generating messenger and can be sent OR FALSE meaning cannot send.
	 */
	public function is_generating_messenger_and_active( EE_Messenger $messenger, EE_message_type $message_type ) {
		//get the $messengers the message type says it can be used with.
		$used_with = $message_type->with_messengers();

		foreach ( $used_with as $generating_msgr => $secondary_msgrs ) {
			if ( $messenger->name == $generating_msgr && isset( $this->_active_message_types[$generating_msgr][$message_type->name] ) ) {
				return true;
			}
		}

		return false;
	}


	/**
	 * This returns the corresponding EE_Messenger object for the given string if it is active.
	 *
	 * @param string    $messenger
	 * @return EE_Messenger | null
	 */
	public function get_messenger_if_active( $messenger ) {
		return ! empty( $this->_active_messengers[$messenger] ) ? $this->_active_messengers[$messenger] : null;
	}


	/**
	 * This validates whether the given EE_Message object can be used for either sending or generation.
	 * This is done by grabbing the messenger and message type on the EE_Message and verifying that both are installed
	 * and active.
	 *
	 * @param EE_Message $message
	 *
	 * @return array  An array with 'messenger' and 'message_type' as the index and the corresponding valid object if
	 *                available.
	 *                Eg. Valid Messenger and Message Type:
	 *                array(
	 *                  'messenger' => new EE_Email_Messenger(),
	 *                  'message_type' => new EE_Registration_Approved_message_type()
	 *                )
	 *                Valid Messenger and Invalid Message Type:
	 *                array(
	 *                  'messenger' => new EE_Email_Messenger(),
	 *                  'message_type' => null
	 *                )
	 */
	public function validate_for_use( EE_Message $message ) {
		$validated_for_use['messenger'] = $this->get_messenger_if_active($message->messenger());
		$validated_for_use['message_type'] = $this->get_active_message_type( $message->messenger(), $message->message_type() );
		return $validated_for_use;
	}



	/**
	 * Delegates message sending to messengers
	 * @deprecated 4.9.0
	 * @param  string  $type    What type of message are we sending (corresponds to message types)
	 * @param  mixed  $vars    Data being sent for parsing in the message
	 * @param  string $sending_messenger if included then we ONLY use the specified messenger for delivery.  Otherwise we cycle through all active messengers.
	 * @param string $generating_messenger if included then this messenger is used for generating the message templates (but not for sending).
	 * @param string $context If included then only a message type for a specific context will be generated.
	 * @param bool  $send 			       Default TRUE.  If false, then this will just return the generated EE_Messages objects which might be used by the trigger to setup a batch message (typically html messenger uses it).
	 * @return bool
	 */
	public function send_message( $type, $vars, $sending_messenger = '', $generating_messenger='', $context='', $send = TRUE ) {
		$processor = new EE_Messages_Processor( $this );
		$error = FALSE;

		//try to intelligently determine what method we'll call based on the incoming data.
		//if generating and sending are different then generate and send immediately.
		if ( ! empty( $sending_messenger ) && $sending_messenger != $generating_messenger && $send ) {
			//in the legacy system, when generating and sending were different, that means all the
			//vars are already in the request object.  So let's just use that.
			try {
				$mtg = new EE_Message_To_Generate_From_Request( $this, EE_Registry::instance()->REQ );
				$processor->generate_and_send_now( $mtg );
			} catch ( EE_Error $e ) {
				$error_msg = __( 'Please note that a system message failed to send due to a technical issue.', 'event_espresso' );
				// add specific message for developers if WP_DEBUG in on
				$error_msg .= '||' . $e->getMessage();
				EE_Error::add_error( $error_msg, __FILE__, __FUNCTION__, __LINE__ );
				$error = true;
			}
		} else {
			$processor->generate_for_all_active_messengers( $type, $vars, $send );
			//let's find out if there were any errors and how many successfully were queued.
			$count_errors = $processor->get_queue()->count_STS_in_queue( EEM_Message::status_failed );
			$count_queued = $processor->get_queue()->count_STS_in_queue( EEM_Message::status_incomplete );
			$count_retry = $processor->get_queue()->count_STS_in_queue( EEM_Message::status_retry );
			$count_errors = $count_errors + $count_retry;
			if ( $count_errors > 0 ) {
				$error = true;
				if ( $count_errors > 1 && $count_retry > 1 && $count_queued > 1  ) {
					$message = sprintf(
						__(
							'There were %d errors and %d messages successfully queued for generation and sending',
							'event_espresso'
						),
						$count_errors,
						$count_queued
					);
				} elseif ( $count_errors > 1 && $count_queued === 1 ) {
					$message = sprintf(
						__(
							'There were %d errors and %d message successfully queued for generation.',
							'event_espresso'
						),
						$count_errors,
						$count_queued
					);
				} elseif ( $count_errors === 1 && $count_queued > 1 ) {
					$message = sprintf(
						__(
							'There was %d error and %d messages successfully queued for generation.',
							'event_espresso'
						),
						$count_errors,
						$count_queued
					);
				} else {
					$message = sprintf(
						__(
							'There was %d message that failed to be queued for generation.',
							'event_espresso'
						),
						$count_errors
					);
				}
				EE_Error::add_error( $message, __FILE__, __FUNCTION__, __LINE__ );
			} else {
				if ( $count_queued === 1 ) {
					$message = sprintf(
						__(
							'%d message successfully queued for generation.',
							'event_espresso'
						),
						$count_queued
					);
				} else {
					$message = sprintf(
						__(
							'%d messages were successfully queued for generation.',
							'event_espresso'
						),
						$count_queued
					);
				}
				EE_Error::add_success( $message );
			}
		}
		//if no error then return the generated message(s).
		if ( ! $error && ! $send ) {
			$generated_queue = $processor->generate_queue( false );
			//get message and return.
			$generated_queue->get_queue()->rewind();
			$messages = array();
			while( $generated_queue->get_queue()->valid() ) {
				$message = $generated_queue->get_queue()->current();
				if ( $message instanceof EE_Message ) {
					//set properties that might be expected by add-ons (backward compat)
					$message->content = $message->content();
					$message->template_pack = $message->get_template_pack();
					$message->template_variation = $message->get_template_pack_variation();
					$messages[] = $message;
				}
				$generated_queue->get_queue()->next();
			}

			return $messages;
		}
		return $error ? false : true; //yeah backwards eh?  Really what we're returning is if there is a total success for all the messages or not.  We'll modify this once we get message recording in place.
	}




	/**
	 * Use to generate and return a message preview!
	 * @deprecated 4.9.0
	 * @param  string $type    This should correspond with a valid message type
	 * @param  string $context This should correspond with a valid context for the message type
	 * @param  string $messenger This should correspond with a valid messenger.
	 * @param bool 	$send true we will do a test send using the messenger delivery, false we just do a regular preview
	 * @return string          The body of the message.
	 */
	public function preview_message( $type, $context, $messenger, $send = FALSE ) {
		return EED_Messages::preview_message( $type, $context, $messenger, $send );
	}


	/**
	 * This is a method that allows for sending a message using a messenger matching the string given and the provided EE_Message stdClass objects.
	 *
	 * @since 4.5.0
	 * @deprecated 4.9.0   Moved to EED_Messages Module
	 * @param string       $messenger a string matching a valid active messenger in the system
	 * @param string       $message_type   Although it seems contrary to the name of the method, a message type name is still required to send along the message type to the messenger because this is used for determining what specific variations might be loaded for the generated message.
	 * @param stdClass $message  a stdClass object in the format expected by the messenger.
	 *
	 * @return bool          success or fail.
	 */
	public function send_message_with_messenger_only( $messenger, $message_type, $message ) {
		//setup for sending to new method.
		$queue = new EE_Messages_Queue( $this );
		//make sure we have a proper message object
		if ( ! $message instanceof EE_Message && is_object( $message ) && isset( $message->content ) ) {
			$msg = EE_Message::new_instance(
				array(
					'MSG_messenger' => $messenger,
					'MSG_message_type' => $message_type,
					'MSG_content' => $message->content,
					'MSG_subject' => $message->subject
				)
			);
		} else {
			$msg = $message;
		}

		if ( ! $msg instanceof EE_Message ) {
			return false;
		}
		//make sure any content in a content property (if not empty) is set on the MSG_content.
		if ( ! empty( $msg->content ) ) {
			$msg->set( 'MSG_content', $msg->content );
		}
		$queue->add( $msg );
		return EED_Messages::send_message_with_messenger_only( $messenger, $message_type, $queue );
	}





	/**
	 * _validate_setup
	 * @param  string $messenger    EE_Messenger
	 * @param  string $message_type EE_message_type
	 * @param bool $is_global whether this is a global template or not.
	 * @throws EE_Error
	 * @return bool(true)|WP_Error
	 */
	private function _validate_setup($messenger, $message_type, $is_global = FALSE) {

		$message_type = strtolower(str_replace(' ', '_', $message_type) );
		$messenger = strtolower(str_replace(' ', '_', $messenger));
		$installed_message_types = $this->get_installed_message_types();


		//setup messenger and message_type object
		$this->_messenger = isset($this->_active_messengers[$messenger]) ? $this->_active_messengers[$messenger] : null;


		//message type
		$mt = isset($installed_message_types[$message_type]) ? $installed_message_types[$message_type] : 'message_type_not_existent';

		$this->_message_type = is_object($mt) ? $mt : null;


		//do we have the necessary objects loaded?
		if ( empty( $this->_messenger) || empty($this->_message_type) )
			throw new EE_Error( sprintf( __(' The %s messenger or the %s message_type are not active. Are you sure they exist?', 'event_espresso'), $messenger, $message_type ) );

		//is given message_type valid for given messenger (if this is not a global save)
		if ( !$is_global ) {
			$has_active = EEM_Message_Template_Group::instance()->count( array( array( 'MTP_is_active' => TRUE, 'MTP_messenger' => $this->_messenger->name, 'MTP_message_type' => $message_type ) ) );

			if ( $has_active == 0 ) {
				EE_Error::add_error(
					sprintf(
						__(' The %1$s message type is not registered with the %2$s messenger. Please visit the Messenger activation page to assign this message type first if you want to use it.', 'event_espresso'),
						$message_type,
						$messenger
					),
					__FILE__, __FUNCTION__, __LINE__
				);
				return false;
			}

		}
		return true;
	}



	/**
	 * This is a wrapper for the protected _create_new_templates function
	 * @param         $messenger
	 * @param  string $message_type message type that the templates are being created for
	 * @param int     $GRP_ID
	 * @param bool    $is_global
	 * @return array|object if creation is successful then we return an array of info, otherwise an error_object is returned.
	 * @throws \EE_Error
	 */
	public function create_new_templates( $messenger, $message_type, $GRP_ID = 0, $is_global = false ) {

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

		$DFLT = new EE_Message_Template_Defaults( $this, $this->_messenger->name, $this->_message_type->name, $GRP_ID );

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
		//remove ALL relations on this template group so they don't get saved!
		$new_mtg->_remove_relations( 'Message_Template' );
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
	 * @param  string $messenger    EE_Messenger
	 * @param  string $message_type EE_message_type
	 * @return array|WP_Error  template fields indexed by context.
	 */
	public function get_fields($messenger, $message_type) {
		$template_fields = array();

		$this->_validate_setup($messenger, $message_type);


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
	 * @param string $type 				we can indicate just returning installed message types
	 *                     				or messengers (or both) via this parameter.
	 * @param bool 		$skip_cache 	if true then we skip the cache and retrieve via files.
	 * @return array                    multidimensional array of messenger and message_type objects
	 *                                    (messengers index, and message_type index);
	 */
	public function get_installed( $type = 'all', $skip_cache = false ) {
		$installed = array();

		//first let's account for caching
		if ( $skip_cache ) {
			$message_base = EE_LIBRARIES . "messages" . DS;

			$messenger_files = $type == 'all' || $type == 'messengers' ? scandir( $message_base . "messenger", 1) : NULL;
			$messagetype_files = $type == 'all' || $type == 'message_types' ? scandir( $message_base . "message_type", 1) : NULL;


			//allow plugins to filter in their messenger/message_type files
			$messenger_files = apply_filters('FHEE__EE_messages__get_installed__messenger_files', $messenger_files, $type );
			$messagetype_files = apply_filters('FHEE__EE_messages__get_installed__messagetype_files', $messagetype_files, $type );

			$installed['messengers'] = !empty($messenger_files ) ? $this->_get_installed($messenger_files) : '';
			$installed['message_types'] = !empty($messagetype_files) ? $this->_get_installed($messagetype_files) : '';
		} else {
			$installed['messengers'] = $this->get_messenger_collection();
			$installed['message_types'] = $this->get_installed_message_types();
		}


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
			$obj = $a->newInstance();
			$the_goods[$obj->name] = $obj;
		}
		return $the_goods;
	}

	public function get_active_messengers() {
		return $this->_active_messengers;
	}


	/**
	 * This does NOT return the _active_message_types property but simply returns an array of active message types from that property.  (The _active_message_types property is indexed by messenger and active message_types per messenger).
	 *
	 * @return array array of message_type references (string)
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


	/**
	 * Same as get_active_message_types() except this returns actual EE_message_type objects
	 *
	 * @since 4.9.0
	 * @return EE_message_type[]
	 */
	public function get_active_message_type_objects() {
		$message_types = array();
		$message_type_refs = $this->get_active_message_types();
		$installed_message_types = $this->get_installed_message_types();
		foreach ( $message_type_refs as $ref ) {
			if ( isset( $installed_message_types[$ref] ) ) {
				$message_types[] = $installed_message_types[$ref];
			}
		}
		return $message_types;
	}




	/**
	 * This checks the _active_message_types property for any active message types that are present for the given messenger and returns them.
	 *
	 * @since 4.5.0
	 *
	 * @param string $messenger The messenger being checked
	 *
	 * @return EE_message_type[]    (or empty array if none present)
	 */
	public function get_active_message_types_per_messenger( $messenger ) {
		$messenger = (string) $messenger;
		if ( empty( $this->_active_message_types[$messenger] ) ) {
			return array();
		}

		$mts = array();
		$message_types = $this->_active_message_types[$messenger];
		$installed_message_types = $this->get_installed_message_types();
		foreach ( $message_types as $mt => $settings ) {
			if ( ! empty( $installed_message_types[$mt] ) )  {
				$mts[] = $installed_message_types[$mt];
			}
		}
		return $mts;
	}


	/**
	 * This returns the EE_message_type from the active message types array ( if present );
	 *
	 * @param string $messenger      The string should correspond to the messenger (message types are
	 *                               		    assigned to a messenger in the messages settings)
	 * @param string $message_type The string should correspond to a message type.
	 *
	 * @return EE_Message_Type|null
	 */
	public function get_active_message_type( $messenger, $message_type ) {
		$installed_message_types = $this->get_installed_message_types();
		if ( !empty( $this->_active_message_types[$messenger][$message_type] ) && !empty( $installed_message_types[$message_type] ) )  {
			return $installed_message_types[$message_type];
		}
		return NULL;
	}



	public function get_installed_message_types() {
		$this->_installed_message_types = empty( $this->_installed_message_types ) ? $this->get_installed( 'message_types', true ) : $this->_installed_message_types;
		return $this->_installed_message_types;
	}




	/**
	 * This returns all the contexts that are registered by all message types.
	 *
	 * If $slugs_only is true, then just an array indexed by unique context slugs with the latest label representation for that slug.
	 * array(
	 *      'context_slug' => 'localized label for context obtained from latest message type in the loop'.
	 * );
	 *
	 * If $slugs_only is false, then the format is:
	 * array(
	 *      'message_type_name' => array(
	 *          'context_slug' => array(
	 *              'label' => 'localized lable for context',
	 *              'description' => 'localized description for context'
	 *          )
	 *      )
	 * );
	 *
	 * Keep in mind that although different message types may share the same context slugs, it is possible that the context
	 * is described differently by the message type.
	 *
	 * @since 4.9.0
	 * @param   bool    $slugs_only     Whether to return an array of just slugs and labels (true) or all contexts indexed by message type.
	 * @return array
	 */
	public function get_all_contexts( $slugs_only = true ) {
		$key = $slugs_only ? 'slugs' : 'all';
		if ( ! empty( $this->_contexts[$key] ) ) {
			return $this->_contexts[$key];
		}

		//contexts has not been setup yet.  So let's get all active message type objects and loop through to get all
		//unique contexts
		$contexts = array();
		foreach ( $this->get_active_message_type_objects() as $mt ) {
			if ( $mt instanceof EE_message_type ) {
				$mt_contexts = $mt->get_contexts();
				if ( $slugs_only ) {
					foreach ( $mt_contexts as $context => $context_details ) {
						$contexts[ $context ] = $context_details['label'];
					}
				} else {
					$contexts[$mt->name] = $mt_contexts;
				}
			}
		}

		$this->_contexts[$key] = $contexts;
		return $this->_contexts[$key];
	}




	/**
	 * Validates the given string as a reference for an existing, accessible data handler and returns the class name
	 * For the handler the reference matches.
	 * @param string $data_handler_reference
	 * @return string
	 */
	public function verify_and_retrieve_class_name_for_data_handler_reference( $data_handler_reference ) {
		$class_name = 'EE_Messages_' . $data_handler_reference . '_incoming_data';
		if (  ! class_exists( $class_name ) ) {
			EE_Error::add_error( sprintf(
				__('The included data handler reference (%s) does not match any valid, accessible, "EE_Messages_incoming_data" classes.  Looking for %s.', 'event_espresso'),
				$data_handler_reference,
				$class_name ),
				__FILE__, __FUNCTION__, __LINE__
			);
			$class_name = ''; //clear out class_name so caller knows this isn't valid.
		}

		return $class_name;
	}



	/**
	 * @deprecated
	 * @return array
	 */
	public function get_installed_messengers() {
		//return $this->get_messenger_collection();
		$this->_installed_messengers = empty( $this->_installed_messengers )
			? $this->get_installed( 'messengers', true )
			: $this->_installed_messengers;
		return $this->_installed_messengers;
	}



}
//end EE_Messages class
// end of file:	includes/core/messages/EE_Messages.core.php
