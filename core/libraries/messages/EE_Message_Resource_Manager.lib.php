<?php

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class EE_Message_Resource_Manager
 *
 * Description
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 * @since         $VID:$
 *
 */
class EE_Message_Resource_Manager {

	/**
	 * @type boolean $_initialized
	 */
	protected $_initialized = false;

	/**
	 * @type EE_Messenger_Collection $_messenger_collection_loader
	 */
	protected $_messenger_collection_loader;

	/**
	 * @type EE_Message_Type_Collection $_message_type_collection_loader
	 */
	protected $_message_type_collection_loader;

	/**
	 * @type EEM_Message_Template_Group $_message_template_group_model
	 */
	protected $_message_template_group_model;

	/**
	 * @type EE_messenger[]
	 */
	protected $_installed_messengers = array();

	/**
	 * @type EE_message_type[]
	 */
	protected $_installed_message_types = array();

	/**
	 * Array of active messengers.
	 * Format is this:
	 * array(
	 *      'messenger_name' => EE_messenger
	 * )
	 *
	 * @type EE_messenger[]
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
	 *
	 * @type array
	 */
	protected $_active_message_types = array();


	/**
	 * This holds the array of messengers and their corresponding message types that have
	 * been activated on a site at some point.  This is an important record that helps the messages system
	 * not accidentally reactivate something that was intentionally deactivated by a user.
	 * @type array
	 */
	protected $_has_activated_messengers_and_message_types = array();

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
	 *
	 * @type array
	 */
	protected $_contexts = array();



	/**
	 * EE_Message_Resource_Manager constructor.
	 *
	 * @param \EE_Messenger_Collection_Loader    $Messenger_Collection_Loader
	 * @param \EE_Message_Type_Collection_Loader $Message_Type_Collection_Loader
	 * @param \EEM_Message_Template_Group        $Message_Template_Group_Model
	 */
	function __construct(
		EE_Messenger_Collection_Loader $Messenger_Collection_Loader,
		EE_Message_Type_Collection_Loader $Message_Type_Collection_Loader,
		EEM_Message_Template_Group $Message_Template_Group_Model
	) {
		$this->_messenger_collection_loader = $Messenger_Collection_Loader;
		$this->_message_type_collection_loader = $Message_Type_Collection_Loader;
		$this->_message_template_group_model = $Message_Template_Group_Model;
	}



	/**
	 * @return void
	 */
	protected function _initialize_collections() {
		if ( $this->_initialized ) {
			return;
		}
		$this->_initialized = true;
		$this->_messenger_collection_loader->load_messengers_from_folder();
		$this->_message_type_collection_loader->load_message_types_from_folder();
		$this->get_has_activated_messengers_option( true );
		$this->_set_active_messengers_and_message_types();
	}



	/**
	 * @return EE_Messenger_Collection
	 */
	public function messenger_collection() {
		$this->_initialize_collections();
		return $this->_messenger_collection_loader->messenger_collection();
	}



	/**
	 * @return EE_messenger[]
	 */
	public function active_messengers() {
		$this->_initialize_collections();
		return $this->_active_messengers;
	}



	/**
	 * @param string $messenger_name
	 * @return \EE_messenger
	 */
	public function get_messenger( $messenger_name ) {
		return $this->messenger_collection()->get_by_info( $messenger_name );
	}



	/**
	 * This returns the corresponding EE_messenger object for the given string if it is active.
	 *
	 * @param string $messenger
	 * @return EE_messenger | null
	 */
	public function get_active_messenger( $messenger ) {
		$this->_initialize_collections();
		return ! empty( $this->_active_messengers[ $messenger ] ) ? $this->_active_messengers[ $messenger ] : null;
	}



	/**
	 * @return \EE_messenger[]
	 */
	public function installed_messengers() {
		if ( empty( $this->_installed_messengers ) ) {
			$this->_installed_messengers = array();
			$this->messenger_collection()->rewind();
			while ( $this->messenger_collection()->valid() ) {
				$this->_installed_messengers[ $this->messenger_collection()->current()->name ] = $this->messenger_collection()->current();
				$this->messenger_collection()->next();
			}
		}
		return $this->_installed_messengers;
	}



	/**
	 * @param string $messenger_name
	 * @return \EE_messenger
	 * @throws \EE_Error
	 */
	public function valid_messenger( $messenger_name ) {
		$messenger = $this->get_messenger( $messenger_name );
		if ( $messenger instanceof EE_messenger ) {
			return $messenger;
		}
		throw new EE_Error(
			sprintf(
				__( 'The "%1$s" messenger is either invalid or not installed', 'event_espresso' ),
				$messenger_name
			)
		);
	}



	/**
	 * @return EE_Message_Type_Collection
	 */
	public function message_type_collection() {
		$this->_initialize_collections();
		return $this->_message_type_collection_loader->message_type_collection();
	}



	/**
	 * @return array
	 */
	public function active_message_types() {
		$this->_initialize_collections();
		return $this->_active_message_types;
	}



	/**
	 * @param string $message_type_name
	 * @return \EE_message_type
	 */
	public function get_message_type( $message_type_name ) {
		return $this->message_type_collection()->get_by_info( $message_type_name );
	}



	/**
	 * This returns the EE_message_type from the active message types array ( if present );
	 *
	 * @param string $messenger_name
	 * @param string $message_type_name
	 * @return \EE_message_type|null
	 */
	public function get_active_message_type_for_messenger( $messenger_name, $message_type_name ) {
		return $this->is_message_type_active_for_messenger( $messenger_name, $message_type_name )
			? $this->get_message_type( $message_type_name )
			: null;
	}



	/**
	 * Returns whether the given message type is active for the given messenger.
	 *
	 * @param string $messenger_name
	 * @param string $message_type_name
	 *
	 * @return bool
	 */
	public function is_message_type_active_for_messenger( $messenger_name, $message_type_name ) {
		$this->_initialize_collections();
		return ! empty( $this->_active_message_types[ $messenger_name ]['settings'][ $messenger_name . '-message_types' ][ $message_type_name ] );
	}



	/**
	 * Returns whether the given messenger is active.
	 *
	 * @param string $messenger_name  the name of the messenger to check if active.
	 * @return bool
	 */
	public function is_messenger_active( $messenger_name ) {
		$this->_initialize_collections();
		return ! empty( $this->_active_message_types[ $messenger_name ] );
	}


	/**
	 * This returns any settings that might be on a message type for a messenger
	 *
	 * @param string $messenger_name  The slug of the messenger
	 * @param string $message_type_name  The slug of the message type getting the settings for.
	 * @return array
	 */
	public function get_message_type_settings_for_messenger( $messenger_name, $message_type_name ) {
		$settings = array();
		if ( $this->is_message_type_active_for_messenger( $messenger_name, $message_type_name ) ) {
			$settings =  isset( $this->_active_message_types[ $messenger_name ]['settings'][ $messenger_name . '-message_types' ][ $message_type_name ]['settings'] )
				? $this->_active_message_types[ $messenger_name ]['settings'][ $messenger_name . '-message_types' ][ $message_type_name ]['settings']
				: array();
		}
		return $settings;
	}



	/**
	 * Returns whether the given messenger name has active message types on it.
	 * Infers whether the messenger is active or not as well.
	 *
	 * @param string $messenger_name
	 * @return bool
	 */
	public function messenger_has_active_message_types( $messenger_name ) {
		$this->_initialize_collections();
		return
			! empty( $this->_active_message_types[ $messenger_name ] )
			&& ! empty( $this->_active_message_types[ $messenger_name ]['settings'][ $messenger_name . '-message_types' ] );
	}



	/**
	 * This checks the _active_message_types property for any active message types
	 * that are present for the given messenger and returns them.
	 *
	 * @since 4.9.0
	 * @param string $messenger_name The messenger being checked
	 * @return EE_message_type[]|array    (empty array if no active_message_types)
	 */
	public function get_active_message_types_for_messenger( $messenger_name ) {
		$message_types = array();
		if ( ! $this->messenger_has_active_message_types( $messenger_name ) ) {
			return $message_types;
		}
		$installed_message_types = $this->installed_message_types();
		foreach ( $installed_message_types as $message_type_name => $message_type ) {
			if ( $this->is_message_type_active_for_messenger( $messenger_name, $message_type_name ) ) {
				$message_types[ $message_type_name ] = $message_type;
			}
		}
		return $message_types;
	}



	/**
	 * This does NOT return the _active_message_types property but
	 * simply returns an array of active message type names from that property.
	 * (The _active_message_types property is indexed by messenger and active message_types per messenger).
	 *
	 * @return array message_type references (string)
	 */
	public function list_of_active_message_types() {
		$active_message_type_names = array();
		$this->_initialize_collections();
		foreach ( $this->_active_message_types as $messenger => $messenger_settings ) {
			if ( ! isset( $messenger_settings['settings'][ $messenger . '-message_types' ] ) ) {
				continue;
			}
			foreach ( $messenger_settings['settings'][ $messenger . '-message_types' ] as $message_type_name => $message_type_config ) {
				if ( ! in_array( $message_type_name, $active_message_type_names ) ) {
					$active_message_type_names[] = $message_type_name;
				}
			}
		}
		return $active_message_type_names;
	}



	/**
	 * Same as list_of_active_message_types() except this returns actual EE_message_type objects
	 *
	 * @since 4.9.0
	 * @return \EE_message_type[]
	 */
	public function get_active_message_type_objects() {
		$active_message_types = array();
		$installed_message_types = $this->installed_message_types();
		$active_message_type_names = $this->list_of_active_message_types();
		foreach ( $active_message_type_names as $active_message_type_name ) {
			if ( isset( $installed_message_types[ $active_message_type_name ] ) ) {
				$active_message_types[ $active_message_type_name ] = $installed_message_types[ $active_message_type_name ];
			}
		}
		return $active_message_types;
	}



	/**
	 * @return \EE_message_type[]
	 */
	public function installed_message_types() {
		if ( empty( $this->_installed_message_types ) ) {
			$this->message_type_collection()->rewind();
			while ( $this->message_type_collection()->valid() ) {
				$this->_installed_message_types[ $this->message_type_collection()->current()->name ] = $this->message_type_collection()->current();
				$this->message_type_collection()->next();
			}
		}
		return $this->_installed_message_types;
	}


	/**
	 * @param string $message_type_name
	 * @return \EE_message_type
	 * @throws \EE_Error
	 */
	public function valid_message_type( $message_type_name ) {
		$message_type = $this->get_message_type( $message_type_name );
		if ( $message_type instanceof EE_message_type ) {
			return $message_type;
		}
		throw new EE_Error(
			sprintf(
				__( 'The "%1$s" message type is either invalid or not installed', 'event_espresso' ),
				$message_type_name
			)
		);
	}



	/**
	 * valid_message_type_for_messenger
	 *
	 * @param EE_messenger $messenger
	 * @param string $message_type_name
	 * @return boolean
	 * @throws \EE_Error
	 */
	public function valid_message_type_for_messenger( EE_messenger $messenger, $message_type_name ) {
		$valid_message_types = $messenger->get_valid_message_types();
		if ( ! in_array( $message_type_name, $valid_message_types ) ) {
			throw new EE_Error(
				sprintf(
					__(
						'The message type (%1$s) sent to "%2$s" is not valid for the "%3$s" messenger.  Double-check the spelling and verify that message type has been registered as a valid type with the messenger.',
						'event_espresso'
					),
					$message_type_name,
					__METHOD__,
					$messenger->name
				)
			);
		}
		return true;
	}


	/**
	 * Used to return active messengers array stored in the wp options table.
	 * If no value is present in the option then an empty array is returned.
	 *
	 * @param   bool    $reset  If true then we ignore whether the option is cached on the _active_message_types
	 *                          property and pull directly from the db.  Otherwise whatever is currently on the
	 *                          $_active_message_types property is pulled.
	 *
	 * @return array
	 */
	public function get_active_messengers_option( $reset = false) {
		if ( $reset ) {
			$this->_active_message_types = get_option( 'ee_active_messengers', array() );
		}
		return $this->_active_message_types;
	}



	/**
	 * Used to update the active messengers array stored in the wp options table.
	 *
	 * @param array $active_messenger_settings Incoming data to save.  If empty, then the internal cached property
	 *                                 representing this data is used.
	 * @return bool FALSE if not updated, TRUE if updated.
	 */
	public function update_active_messengers_option( $active_messenger_settings = array() ) {
		$active_messenger_settings = empty( $active_messenger_settings ) ? $this->_active_message_types : $active_messenger_settings;
		//make sure _active_message_types is updated (this is the internal cache for the settings).
		$this->_active_message_types = $active_messenger_settings;
		return update_option( 'ee_active_messengers', $active_messenger_settings );
	}



	/**
	 * Used to return active messengers array stored in the wp options table.
	 * If no value is present in the option then an empty array is returned.
	 *
	 * The value is cached on the $_has_activated_messengers_and_message_types property for future calls.
	 *
	 * @param   bool    $reset  Used to indicate that any cached value should be ignored.
	 *
	 * @return array
	 */
	public function get_has_activated_messengers_option( $reset = false ) {
		if ( $reset || empty( $this->_has_activated_messengers_and_message_types ) ) {
			$this->_has_activated_messengers_and_message_types = get_option( 'ee_has_activated_messenger', array() );
		}
		return $this->_has_activated_messengers_and_message_types;
	}



	/**
	 * Used to update the active messengers array stored in the wp options table.
	 *
	 * @param array $has_activated_messengers Incoming data to save.  If empty, then the internal cached property
	 *                                        representing this data is used.
	 *
	 * @return bool FALSE if not updated, TRUE if updated.
	 */
	public function update_has_activated_messengers_option( $has_activated_messengers = array() ) {
		//make sure the option has been retrieved from first so we don't overwrite it accidentally.
		if ( empty( $has_activated_messengers ) && empty( $this->_has_activated_messengers_and_message_types ) ) {
			$this->get_has_activated_messengers_option();
		}
		$has_activated_messengers = empty( $has_activated_messengers )
			? $this->_has_activated_messengers_and_message_types
			: $has_activated_messengers;
		return update_option( 'ee_has_activated_messenger', $has_activated_messengers );
	}



	/**
	 * wrapper for _set_active_messengers_and_message_types()
	 */
	public function reset_active_messengers_and_message_types() {
		$this->_set_active_messengers_and_message_types();
	}



	/**
	 * Generate list of active messengers and message types from collection.
	 * This sets up the active messengers from what is present in the database.
	 */
	protected function _set_active_messengers_and_message_types() {
		//echo "\n\n " . __LINE__ . ") " . __METHOD__ . "() \n";
		// list of activated messengers as set via the admin
		// note calling `get_active_messengers_options` also initializes the _active_message_types property.
		$this->get_active_messengers_option( true );
		$this->ensure_messengers_are_active( array(), false, true );
		$this->update_active_messengers_option();
		$this->update_has_activated_messengers_option();
	}






	/**
	 * Ensures that the specified messenger is currently active.
	 * If not, activates it and its default message types.
	 *
	 * @param string $messenger_name
	 * @param bool   $update_option  Whether to update the option in the db or not.
	 * @return boolean true if either already active or successfully activated.
	 */
	public function ensure_messenger_is_active( $messenger_name, $update_option = true ) {
		if ( ! isset( $this->_active_messengers[ $messenger_name ] ) ) {
			try {
				$this->activate_messenger( $messenger_name, array(), $update_option );
			} catch( EE_Error $e ) {
				EE_Error::add_error(
					$e->getMessage(),
					__FILE__,
					__FUNCTION__,
					__LINE__
				);
				return false;
			}
		}
		return true;
	}


	/**
	 * This ensures the given array of messenger names is active in the system.
	 * Note, this method will not activate any NEW message types for the messenger when it is called. Instead,
	 * it will automatically activate the default message types for the messenger if its not active.
	 *
	 * @param array $messenger_names  Array of messenger names for messengers to be activated.  If an empty array (default)
	 *                                then will attempt to set the active messengers from the activated_messengers option
	 *                                (stored in $_active_message_types property).
	 * @param bool  $update_option    Whether to update the related active messengers option.
	 * @param bool  $verify           Whether to verify the messengers are installed before activating. Note if this is set to true
	 *                                and a messenger is indicated as active, but is NOT installed, then it will automatically be
	 *                                deactivated.
	 */
	public function ensure_messengers_are_active( $messenger_names = array(), $update_option = true, $verify = false ) {
		$messenger_names = empty( $messenger_names ) ? array_keys( $this->_active_message_types ) : $messenger_names;

		$not_installed = array();
		foreach( $messenger_names as $messenger_name ) {
			if ( $verify && ! $this->messenger_collection()->has_by_name( $messenger_name ) ) {
				$not_installed[] = $messenger_name;
				$this->deactivate_messenger( $messenger_name );
				continue;
			}
			$this->ensure_messenger_is_active( $messenger_name, $update_option );
		}

		if ( ! empty( $not_installed_messenger ) ) {
			EE_Error::add_error(
				sprintf(
					__( 'The following messengers are either not installed or are invalid:%1$s %2$s', 'event_espresso' ),
					'<br />',
					implode( ', ', $not_installed_messenger )
				),
				__FILE__, __FUNCTION__, __LINE__
			);
		}
	}



	/**
	 * Ensures that the specified message type for the given messenger is currently active, if not activates it.
	 * This ALSO ensures that the given messenger is active as well!
	 *
	 * @param string $message_type_name message type name.
	 * @param        $messenger_name
	 * @param bool   $update_option     Whether to update the option in the db or not.
	 * @return bool  Returns true if already is active or if was activated successfully.
	 * @throws \EE_Error
	 */
	public function ensure_message_type_is_active( $message_type_name, $messenger_name, $update_option = true ) {
		// grab the messenger to work with.
		$messenger = $this->valid_messenger( $messenger_name );
		if ( $this->valid_message_type_for_messenger( $messenger, $message_type_name ) ) {
			//ensure messenger is active (that's an inherent coupling between active message types and the
			//messenger they are being activated for.
			try {
				if ( ! $this->is_message_type_active_for_messenger( $messenger_name, $message_type_name ) ) {
					//all is good so let's just get it active
					$this->activate_messenger( $messenger_name, array( $message_type_name ), $update_option );
				}
			} catch( EE_Error $e ) {
				EE_Error::add_error(
					$e->getMessage(),
					__FILE__,
					__FUNCTION__,
					__LINE__
				);
				return false;
			}
		}
		return true;
	}




	/**
	 * This is a wrapper for `ensure_message_type_is_active` that will handle ensuring multiple message types for a
	 * messenger are active in one go.
	 *
	 * @param array  $message_type_names  Array of message type names to ensure are active.
	 * @param string $messenger_name      The name of the messenger that the message types are to be activated on.
	 * @param bool   $update_option       Whether to persist the activation to the database or not (default true).
	 */
	public function ensure_message_types_are_active( $message_type_names, $messenger_name, $update_option = true ) {
		$message_type_names = (array) $message_type_names;
		foreach ( $message_type_names as $message_type_name ) {
			// note, intentionally not updating option here because we're in a loop.
			// We'll follow the instructions of the incoming $update_option argument after the loop.
			$this->ensure_message_type_is_active( $message_type_name, $messenger_name, false );
		}
		if ( $update_option ) {
			$this->update_active_messengers_option();
			$this->update_has_activated_messengers_option();
		}
	}



	/**
	 * Activates the specified messenger.
	 *
	 * @param string $messenger_name
	 * @param array  $message_type_names        An array of message type names to activate with this messenger.
	 *                                          If included we do NOT setup the default message types
	 *                                          (assuming they are already setup.)
	 * @param bool   $update_active_messengers_option
	 *
	 * @return array of generated templates
	 * @throws \EE_Error
	 */
	public function activate_messenger(
		$messenger_name,
		$message_type_names = array(),
		$update_active_messengers_option = true
	) {
		$templates = array();
		// grab the messenger to work with.
		$messenger = $this->messenger_collection()->get_by_info( $messenger_name );
		// it's inactive. Activate it.
		if ( $messenger instanceof EE_messenger ) {
			$this->_active_messengers[ $messenger->name ] = $messenger;
			//activate incoming message types set to be activated with messenger.
			$message_type_names = $this->_activate_message_types( $messenger, $message_type_names );
			// setup any initial settings for the messenger if necessary.
			$this->add_settings_for_messenger( $messenger->name );
			if ( $update_active_messengers_option ) {
				$this->update_active_messengers_option();
				$this->update_has_activated_messengers_option();
			}
			//generate new templates if necessary and ensure all related templates that are already in the database are
			//marked active.  Note, this will also deactivate a message type for a messenger if the template
			//cannot be successfully created during its attempt (only happens for global template attempts).
			if ( ! empty( $message_type_names ) ) {
				$templates = EEH_MSG_Template::generate_new_templates( $messenger->name, $message_type_names, 0, true );
				EEH_MSG_Template::update_to_active( array( $messenger->name ), $message_type_names );
			}
		}
		return $templates;
	}



	/**
	 * Activates given message types for the given EE_messenger object.
	 *
	 * Note: (very important) This method does not persist the activation to the database.
	 * See code implementing this method in this class for examples of how to persist.
	 *
	 * @param \EE_messenger $messenger
	 * @param  array        $message_type_names
	 *
	 * @return array
	 */
	protected function _activate_message_types( EE_messenger $messenger, $message_type_names = array() ) {
		//If $message_type_names is empty, AND $this->_active_message_types is empty, then that means
		//things have never been initialized (which should happen on EEH_Activation::generate_message_templates).
		//So ONLY then do we need to actually grab defaults and cycle through them.  Otherwise we
		//only override _active_message_types when an explicit array of $message_type_names has been provided.
		$message_type_names = empty( $message_type_names ) && ! isset( $this->_active_message_types[ $messenger->name ] )
			? $messenger->get_default_message_types()
			: (array) $message_type_names;

		//now we ALWAYS need to make sure that the messenger is active for the message types we're activating!
		if ( ! isset( $this->_active_message_types[ $messenger->name ] ) ) {
			$this->_active_message_types[ $messenger->name ]['settings'] = array();
		}

		if ( $message_type_names ) {
			// cycle thru message types
			foreach ( $message_type_names as $message_type_name ) {
				//only register the message type as active IF it isn't already active
				//and if its actually installed.
				if (
					! $this->is_message_type_active_for_messenger( $messenger->name, $message_type_name )
				) {
					$this->add_settings_for_message_type( $messenger->name, $message_type_name );
					$this->_set_messenger_has_activated_message_type(
						$messenger,
						$message_type_name
					);
				}
			}
		}
		return $message_type_names;
	}



	/**
	 * add_settings_for_message_type
	 *
	 * NOTE This does NOT automatically persist any settings to the db.  Client code should call $this->update_active_messengers_option
	 * to persist.
	 *
	 * @param  string       $messenger_name   The name of the messenger adding the settings for
	 * @param  string       $message_type_name The name of the message type adding the settings for
	 * @param  array        $new_settings     Any new settings being set for the message type and messenger
	 */
	public function add_settings_for_message_type( $messenger_name, $message_type_name, $new_settings = array() ) {
		// get installed message type from collection
		$message_type = $this->message_type_collection()->get_by_info( $message_type_name );
		$existing_settings = $this->get_message_type_settings_for_messenger( $messenger_name, $message_type_name );
		//we need to setup any initial settings for message types
		if ( $message_type instanceof EE_message_type ) {
			$default_settings = $message_type->get_admin_settings_fields();
			foreach ( $default_settings as $field => $values ) {
				if ( isset( $new_settings[ $field ] ) ) {
					$existing_settings[ $field ] = $new_settings[ $field ];
					continue;
				}
				if ( ! isset( $existing_settings[ $field ] ) ) {
					$existing_settings[ $field ] = $values['default'];
				}
			}
		}
		$this->_active_message_types[ $messenger_name ]['settings'][ $messenger_name . '-message_types' ][ $message_type_name ]['settings'] = $existing_settings;
	}



	/**
	 * Updates the internal cached _has_activated_messengers_and_message_types property with the given messenger
	 * and message type.
	 *
	 * @access protected
	 * @param \EE_messenger $messenger
	 * @param string        $message_type_name
	 */
	protected function _set_messenger_has_activated_message_type( EE_messenger $messenger, $message_type_name ) {

		//if _has_activated_messengers_and_message_types is empty then lets ensure its initialized
		if ( empty( $this->_has_activated_messengers_and_message_types ) ) {
			$this->get_has_activated_messengers_option();
		}

		// make sure this messenger has a record in the has_activated array
		if ( ! isset( $this->_has_activated_messengers_and_message_types[ $messenger->name ] ) ) {
			$this->_has_activated_messengers_and_message_types[ $messenger->name ] = array();
		}
		// check if message type has already been added
		if ( ! in_array( $message_type_name, $this->_has_activated_messengers_and_message_types[ $messenger->name ] ) ) {
			$this->_has_activated_messengers_and_message_types[ $messenger->name ][] = $message_type_name;
		}
	}



	/**
	 * add_settings_for_messenger
	 *
	 * NOTE This does NOT automatically persist any settings to the db.  Client code should call $this->update_active_messengers_option
	 * to persist.
	 *
	 * @param string        $messenger_name The name of the messenger the settings is being added for.
	 * @param array         $new_settings   An array of settings to update the existing settings.
	 */
	public function add_settings_for_messenger( $messenger_name, $new_settings = array() ) {
		$messenger = $this->get_messenger( $messenger_name );
		if ( $messenger instanceof EE_messenger ) {
			$msgr_settings = $messenger->get_admin_settings_fields();
			if ( ! empty( $msgr_settings ) ) {
				foreach ( $msgr_settings as $field => $value ) {
					//is there a new setting for this?
					if ( isset( $new_settings[ $field ] ) ) {
						$this->_active_message_types[ $messenger->name ]['settings'][ $field ] = $new_settings[ $field ];
						continue;
					}
					//only set the default if it isn't already set.
					if ( ! isset( $this->_active_message_types[ $messenger->name ]['settings'][ $field ] ) ) {
						$this->_active_message_types[ $messenger->name ]['settings'][ $field ] = $value;
					}
				}
			}
		}
	}



	/**
	 * deactivate_messenger
	 *
	 * @param  string|EE_messenger $messenger_name name of messenger
	 * @return void
	 */
	public function deactivate_messenger( $messenger_name ) {
        $this->_initialize_collections();
        if ( $messenger_name instanceof EE_messenger ) {
			$messenger_name = $messenger_name->name;
		}
		unset( $this->_active_messengers[ $messenger_name ] );
		unset( $this->_active_message_types[ $messenger_name ] );
		$this->_message_template_group_model->deactivate_message_template_groups_for( $messenger_name );
		$this->update_active_messengers_option();
	}


	/**
	 * Deactivates a message type (note this will deactivate across all messenger's it is active on.
	 *
	 * @param  string $message_type_name name of message type being deactivated
	 */
	public function deactivate_message_type( $message_type_name ) {
        $this->_initialize_collections();
		if ( $message_type_name instanceof EE_message_type ) {
			$message_type_name = $message_type_name->name;
		}
		foreach ( $this->_active_message_types as $messenger_name => $settings ) {
			unset(
				$this->_active_message_types[ $messenger_name ]['settings'][ $messenger_name . '-message_types' ][ $message_type_name ]
			);

			//we always record (even on deactivation) that a message type has been activated because there should at
			//least be a record in the "has_activated" option that it WAS active at one point.
			$messenger = $this->get_messenger( $messenger_name );
			$this->_set_messenger_has_activated_message_type( $messenger, $message_type_name );
		}
		$this->_message_template_group_model->deactivate_message_template_groups_for( '', $message_type_name );
		$this->update_active_messengers_option();
		$this->update_has_activated_messengers_option();
	}





	/**
	 * Deactivates a message type for a specific messenger as opposed to all messengers.
	 *
	 * @param string $message_type_name  Name of message type being deactivated.
	 * @param string $messenger_name     Name of messenger the message type is being deactivated for.
	 */
	public function deactivate_message_type_for_messenger( $message_type_name, $messenger_name ) {
        $this->_initialize_collections();
		if ( $this->is_message_type_active_for_messenger( $messenger_name, $message_type_name ) ) {
			unset( $this->_active_message_types[ $messenger_name ]['settings'][ $messenger_name . '-message_types' ][ $message_type_name ] );
		}
		$this->_message_template_group_model->deactivate_message_template_groups_for( array( $messenger_name ), array( $message_type_name ) );
		$this->update_active_messengers_option();
	}





	/**
	 * Used to verify if a message can be sent for the given messenger and message type
	 * and that it is a generating messenger (used for generating message templates).
	 *
	 * @param EE_messenger    $messenger    messenger used in trigger
	 * @param EE_message_type $message_type message type used in trigger
	 *
	 * @return bool true is a generating messenger and can be sent OR FALSE meaning cannot send.
	 */
	public function is_generating_messenger_and_active( EE_messenger $messenger, EE_message_type $message_type ) {
		//get the $messengers the message type says it can be used with.
		foreach ( $message_type->with_messengers() as $generating_messenger => $secondary_messengers ) {
			if (
				$messenger->name === $generating_messenger
				&& $this->is_message_type_active_for_messenger( $messenger->name, $message_type->name )
			) {
				return true;
			}
		}
		return false;
	}



	/**
	 * This returns all the contexts that are registered by all message types.
	 *
	 * If $slugs_only is true,
	 * then just an array indexed by unique context slugs with the latest label representation for that slug.
	 * array(
	 *      'context_slug' => 'localized label for context obtained from latest message type in the loop'.
	 * );
	 *
	 * If $slugs_only is false, then the format is:
	 * array(
	 *      'message_type_name' => array(
	 *          'context_slug' => array(
	 *              'label' => 'localized label for context',
	 *              'description' => 'localized description for context'
	 *          )
	 *      )
	 * );
	 *
	 * Keep in mind that although different message types may share the same context slugs,
	 * it is possible that the context is described differently by the message type.
	 *
	 * @since 4.9.0
	 * @param   bool $slugs_only Whether to return an array of just slugs and labels (true)
	 *                           or all contexts indexed by message type.
	 * @return array
	 */
	public function get_all_contexts( $slugs_only = true ) {
		$key = $slugs_only ? 'slugs' : 'all';
		// check if contexts has been setup yet.
		if ( empty( $this->_contexts[ $key ] ) ) {
			// So let's get all active message type objects and loop through to get all unique contexts
			foreach ( $this->get_active_message_type_objects() as $message_type ) {
				if ( $message_type instanceof EE_message_type ) {
					$message_type_contexts = $message_type->get_contexts();
					if ( $slugs_only ) {
						foreach ( $message_type_contexts as $context => $context_details ) {
							$this->_contexts[ $key ][ $context ] = $context_details[ 'label' ];
						}
					} else {
						$this->_contexts[ $key ][ $message_type->name ] = $message_type_contexts;
					}
				}
			}
		}
		return ! empty( $this->_contexts[ $key ] ) ? $this->_contexts[ $key ] : array();
	}




	/**
	 * This checks the internal record of what message types are considered "active" and verifies that
	 * there is an installed class definition for that message type.  If the active message type does not have a corresponding
	 * accessible message type class then it will be deactivated from all messengers it is active on and any related
	 * message templates will be inactivated as well.
	 *
	 * @return bool   true means all active message types are valid, false means at least one message type was deactivated.
	 */
	public function validate_active_message_types_are_installed() {
		$list_of_active_message_type_names = $this->list_of_active_message_types();
		$installed_message_types = $this->installed_message_types();
		$all_message_types_valid = true;
		//loop through list of active message types and verify they are installed.
		foreach( $list_of_active_message_type_names as $message_type_name ) {
			if ( ! isset( $installed_message_types[$message_type_name] ) ) {
				$this->deactivate_message_type( $message_type_name );
				$all_message_types_valid = false;
			}
		}
		return $all_message_types_valid;
	}




	/**
	 * This method checks the `ee_has_activated_messenger` option to see if the message type has ever been
	 * activated for the given messenger.  This can be called by client code on plugin updates etc to determine whether
	 * to attempt automatically reactivating message types that should be activated by default or not.
	 *
	 * @param $message_type_name
	 * @param $messenger_name
	 * @return bool
	 */
	public function has_message_type_been_activated_for_messenger( $message_type_name, $messenger_name ) {
		$has_activated = $this->get_has_activated_messengers_option();
		return isset( $has_activated[ $messenger_name ] )
			&& in_array( $message_type_name, $has_activated[ $messenger_name ] );
	}
}
// End of file EE_Message_Resource_Manager.lib.php
// Location: /EE_Message_Resource_Manager.lib.php