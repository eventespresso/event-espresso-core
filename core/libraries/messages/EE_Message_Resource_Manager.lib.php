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
	 * @type EE_Messenger[]
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
	 *
	 * @type array
	 */
	protected $_active_message_types = array();

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
		$this->_messenger_collection_loader->load_messengers_from_folder();
		$this->_message_type_collection_loader = $Message_Type_Collection_Loader;
		$this->_message_type_collection_loader->load_message_types_from_folder();
		$this->_message_template_group_model = $Message_Template_Group_Model;
		$this->_set_active_messengers_and_message_types();
		//$this->messenger_collection()->show_collection_classes();
		//$this->message_type_collection()->show_collection_classes();
	}



	/**
	 * @return EE_Messenger_Collection
	 */
	public function messenger_collection() {
		return $this->_messenger_collection_loader->messenger_collection();
	}



	/**
	 * @return EE_Messenger[]
	 */
	public function active_messengers() {
		return $this->_active_messengers;
	}



	/**
	 * @param string $messenger_name
	 * @return \EE_Messenger
	 */
	public function get_messenger( $messenger_name ) {
		return $this->messenger_collection()->get_by_info( $messenger_name );
	}



	/**
	 * This returns the corresponding EE_Messenger object for the given string if it is active.
	 *
	 * @param string $messenger
	 * @return EE_Messenger | null
	 */
	public function get_active_messenger( $messenger ) {
		return ! empty( $this->_active_messengers[ $messenger ] ) ? $this->_active_messengers[ $messenger ] : null;
	}



	/**
	 * @return \EE_Messenger[]
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
	 * @return \EE_Messenger
	 * @throws \EE_Error
	 */
	public function valid_messenger( $messenger_name ) {
		$messenger = $this->get_messenger( $messenger_name );
		if ( $messenger instanceof EE_Messenger ) {
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
		return $this->_message_type_collection_loader->message_type_collection();
	}



	/**
	 * @return array
	 */
	public function active_message_types() {
		return $this->_active_message_types;
	}



	/**
	 * @param string $message_type_name
	 * @return \EE_Message_Type
	 */
	public function get_message_type( $message_type_name ) {
		return $this->message_type_collection()->get_by_info( $message_type_name );
	}



	/**
	 * This returns the EE_message_type from the active message types array ( if present );
	 *
	 * @param string $messenger_name
	 * @param string $message_type_name
	 * @return \EE_Message_Type|null
	 */
	public function get_active_message_type_for_messenger( $messenger_name, $message_type_name ) {
		return $this->is_message_type_active_for_messenger( $messenger_name, $message_type_name )
			? $this->get_message_type( $message_type_name )
			: null;
	}



	/**
	 * Returns whether the given message type is active for the given messenger.
	 * @param $messenger_name
	 * @param $message_type_name
	 *
	 * @return bool
	 */
	public function is_message_type_active_for_messenger( $messenger_name, $message_type_name ) {
		return ! empty( $this->_active_message_types[ $messenger_name ]['settings'][$messenger_name . '-message_types'][ $message_type_name ] );
	}



	/**
	 * This checks the _active_message_types property for any active message types
	 * that are present for the given messenger and returns them.
	 *
	 * @since 4.9.0
	 * @param string $messenger_name The messenger being checked
	 * @return EE_message_type[]    (or empty array if none present)
	 */
	public function get_active_message_types_for_messenger( $messenger_name ) {
		$message_types = array();
		if ( empty( $this->_active_message_types[ $messenger_name ] ) ) {
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
		foreach ( $this->_active_message_types as $messenger => $messenger_settings ) {
			foreach ( $messenger_settings[ $messenger . '-message_types' ] as $message_type_name => $message_type_config ) {
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
	 * @return \EE_Message_Type[]
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
	 * @param EE_Messenger $messenger
	 * @param string $message_type_name
	 * @return array
	 * @throws \EE_Error
	 */
	public function valid_message_type_for_messenger( EE_Messenger $messenger, $message_type_name ) {
		$valid_message_types = $messenger->get_valid_message_types();
		if ( ! in_array( $message_type_name, $valid_message_types ) ) {
			throw new EE_Error(
				sprintf(
					__(
						'The message type (%1$s) sent to %2$s is not valid for the %3$s messenger.  Double-check the spelling and verify that message type has been registered as a valid type with the messenger.',
						'event_espresso'
					),
					$message_type_name,
					__METHOD__,
					$messenger
				)
			);
		}
		return true;
	}


	/**
	 * Used to return active messengers array stored in the wp options table.
	 * If no value is present in the option then an empty array is returned.
	 *
	 * @return array
	 */
	public function get_active_messengers_option() {
		return get_option( 'ee_active_messengers', array() );
	}



	/**
	 * Used to update the active messengers array stored in the wp options table.
	 *
	 * @param array $active_messengers Incoming data to save.
	 * @return bool FALSE if not updated, TRUE if updated.
	 */
	public function update_active_messengers_option( $active_messengers ) {
		return update_option( 'ee_active_messengers', $active_messengers );
	}



	/**
	 * Used to return active messengers array stored in the wp options table.
	 * If no value is present in the option then an empty array is returned.
	 *
	 * @return array
	 */
	public function get_has_activated_messengers_option() {
			get_option( 'ee_has_activated_messenger', array() );
	}



	/**
	 * Used to update the active messengers array stored in the wp options table.
	 *
	 * @param array $has_activated_messengers Incoming data to save.
	 * @return bool FALSE if not updated, TRUE if updated.
	 */
	public function update_has_activated_messengers_option( $has_activated_messengers ) {
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
		$active_messengers = $this->get_active_messengers_option();
		$active_messengers = is_array( $active_messengers ) ? $active_messengers : array( $active_messengers );
		//echo "\n active_messengers: \n";
		//var_dump( $active_messengers );
		$not_installed = array();
		foreach ( $active_messengers as $active_messenger => $data ) {
			// check if supposedly active messenger is actually installed by looking in our collection
			if ( $this->messenger_collection()->has_by_name( $active_messenger ) ) {
				$this->activate_messenger( $active_messenger, array(), false );
				// grab installed messenger object
				//$this->_active_messengers[ $active_messenger ] = $this->messenger_collection()->get_by_info(
				//	$active_messenger
				//);
				//
				//$this->_active_message_types[ $active_messenger ] = ! empty( $data[ 'settings' ][ $active_messenger . '-message_types' ] )
				//	? $data[ 'settings' ][ $active_messenger . '-message_types' ]
				//	: array();
			} else {
				$not_installed[] = $active_messenger;
				$this->deactivate_messenger( $active_messenger );
			}
		}
		if ( ! empty( $not_installed ) ) {
			EE_Error::add_error(
				sprintf(
					__( 'The following messengers are either not installed or are invalid:%1$s %2$s', 'event_espresso' ),
					'<br />',
					implode( ', ', $not_installed )
				),
				__FILE__, __FUNCTION__, __LINE__
			);
		}
	}



	/**
	 * Ensures that the specified messenger is currently active.
	 * If not, activates it and its default message types.
	 *
	 * @param string $messenger_name
	 * @return boolean TRUE if it was PREVIOUSLY active, and FALSE if it was previously inactive
	 */
	public function ensure_messenger_is_active( $messenger_name ) {
		if ( ! isset( $this->_active_messengers[ $messenger_name ] ) ) {
			$this->activate_messenger( $messenger_name );
			return false;
		}
		return true;
	}



	/**
	 * Ensures that the specified message type for the given messenger is currently active, if not activates it.
	 * This ALSO ensures that the given messenger is active as well!
	 *
	 * @param string $message_type message type name
	 * @param        $messenger_name
	 * @return array
	 * @throws \EE_Error
	 */
	public function ensure_message_type_is_active( $message_type, $messenger_name ) {
		// grab the messenger to work with.
		$messenger = $this->valid_messenger( $messenger_name );
		if ( $this->valid_message_type_for_messenger( $messenger, $message_type ) ) {
			//all is good so let's just get it active
			$this->_activate_message_types( $messenger, array( $message_type ) );
			$this->update_active_messengers_option( $this->_active_message_types );
		}
		return $this->active_message_types();
	}



	/**
	 * Activates the specified messenger.
	 *
	 * @param string $messenger_name
	 * @param array  $message_type_names        An array of message type names to activate with this messenger.
	 *                                          If included we do NOT setup the default message types
	 *                                          (assuming they are already setup.)
	 * @param bool   $update_active_messengers_option
	 * @return array of generated templates
	 * @throws \EE_Error
	 */
	public function activate_messenger(
		$messenger_name,
		$message_type_names = array(),
		$update_active_messengers_option = true
	) {
		//EEH_Debug_Tools::printr( __FUNCTION__, __CLASS__, __FILE__, __LINE__ );
		$templates = array();
		// grab the messenger to work with.
		$messenger = $this->messenger_collection()->get_by_info( $messenger_name );
		// it's inactive. Activate it.
		if ( $messenger instanceof EE_Messenger ) {
			//EEH_Debug_Tools::printr( $messenger->name, 'activate_messenger', __FILE__, __LINE__ );
			$this->_active_messengers[ $messenger->name ] = $messenger;
			// setup any initial settings for the messenger
			$this->_add_settings_for_messenger( $messenger );
			//activate incoming message types set to be activated with messenger.
			$message_type_names = $this->_activate_message_types( $messenger, $message_type_names );
			if ( $update_active_messengers_option ) {
				$this->update_active_messengers_option( $this->_active_message_types );
			}
			// might need to generate new templates
			if ( ! empty( $message_type_names ) ) {
				$templates = EEH_MSG_Template::generate_new_templates( $messenger->name, $message_type_names, 0, true );
			}
		}
		return $templates;
	}


	/**
	 * Activates given message types for the given EE_Messenger object.
	 *
	 * @param \EE_Messenger $messenger
	 * @param  array        $message_type_names
	 *
	 * @return array
	 */
	protected function _activate_message_types( EE_Messenger $messenger, $message_type_names = array() ) {
		//EEH_Debug_Tools::printr( __FUNCTION__, __CLASS__, __FILE__, __LINE__ );
		// get has_active so we can be sure its kept up to date.
		$has_activated = $this->get_has_activated_messengers_option();
		// use incoming list of message types or if that's empty, then get defaults
		$message_type_names = ! empty( $message_type_names )
			? $message_type_names
			: $messenger->get_default_message_types();
		// cycle thru message types
		foreach ( $message_type_names as $message_type_name ) {
			//EEH_Debug_Tools::printr( $message_type_name, '$message_type_name', __FILE__, __LINE__ );
			$this->_add_settings_for_message_type( $messenger, $message_type_name );
			$has_activated = $this->_set_messenger_has_activated_message_type(
				$messenger,
				$has_activated,
				$message_type_name
			);
		}
		$this->update_has_activated_messengers_option( $has_activated );
		return $message_type_names;
	}



	/**
	 * _get_settings_for_message_type
	 *
	 * @access protected
	 * @param \EE_Messenger $messenger
	 * @param  string       $message_type_name
	 */
	protected function _add_settings_for_message_type( EE_Messenger $messenger, $message_type_name ) {
		$settings = array();
		// get installed message type from collection
		$message_type = $this->message_type_collection()->get_by_info( $message_type_name );
		//we need to setup any initial settings for message types
		if ( $message_type instanceof EE_Message_Type ) {
			$settings_fields = $message_type->get_admin_settings_fields();
			foreach ( $settings_fields as $field => $values ) {
				$settings[ $field ] = $values[ 'default' ];
			}
		}
		$this->_active_message_types[ $messenger->name ][ 'settings' ][ $messenger->name . '-message_types' ][ $message_type_name ][ 'settings' ] = $settings;
	}



	/**
	 * _set_messenger_has_activated_message_type
	 *
	 * @access protected
	 * @param \EE_Messenger $messenger
	 * @param array         $has_activated
	 * @param string        $message_type_name
	 * @return array
	 */
	protected function _set_messenger_has_activated_message_type( EE_Messenger $messenger, $has_activated, $message_type_name ) {
		// make sure this messenger has a record in the has_activated array
		if ( ! isset( $has_activated[ $messenger->name ] ) ) {
			$has_activated[ $messenger->name ] = array();
		}
		// check if message type has already been added
		if ( ! in_array( $message_type_name, $has_activated[ $messenger->name ] ) ) {
			$has_activated[ $messenger->name ][] = $message_type_name;
		}
		return $has_activated;
	}



	/**
	 * _add_settings_for_messenger
	 *
	 * @access protected
	 * @param \EE_Messenger $messenger
	 */
	protected function _add_settings_for_messenger( EE_Messenger $messenger ) {
		$msgr_settings = $messenger->get_admin_settings_fields();
		if ( ! empty( $msgr_settings ) ) {
			foreach ( $msgr_settings as $field => $value ) {
				$this->_active_message_types[ $messenger->name ][ 'settings' ][ $field ] = $value;
			}
		}
	}



	/**
	 * deactivate_messenger
	 *
	 * @param  string $messenger_name name of messenger
	 * @return void
	 */
	public function deactivate_messenger( $messenger_name ) {
		if ( $messenger_name instanceof EE_Messenger ) {
			$messenger_name = $messenger_name->name;
		}
		unset( $this->_active_messengers[ $messenger_name ] );
		unset( $this->_active_message_types[ $messenger_name ] );
		$this->_message_template_group_model->deactivate_message_template_groups_for( $messenger_name );
		$this->update_active_messengers_option( $this->_active_message_types );
	}


	/**
	 * Deactivates a message type (note this will deactivate across all messenger's it is active on.
	 *
	 * @param  string $message_type_name name of message type being deactivated
	 */
	public function deactivate_message_type( $message_type_name ) {
		if ( $message_type_name instanceof EE_Message_Type ) {
			$message_type_name = $message_type_name->name;
		}
		foreach ( $this->_active_message_types as $messenger => $settings ) {
			unset(
				$this->_active_message_types[ $messenger ][ 'settings' ][ $messenger . '-message_types' ][ $message_type_name ]
			);
		}
		$this->_message_template_group_model->deactivate_message_template_groups_for( '', $message_type_name );
		$this->update_active_messengers_option( $this->_active_message_types );
	}



	/**
	 * activate_default_messengers_and_message_types
	 *
	 * @return void
	 */
	public function activate_default_messengers_and_message_types() {
		$installed_messengers = $this->installed_messengers();
		foreach ( $installed_messengers as $messenger ) {
			if ( $messenger->activate_on_install ) {
				$this->activate_messenger( $messenger->name );
			}
		}
	}



	/**
	 * Used to verify if a message can be sent for the given messenger and message type
	 * and that it is a generating messenger (used for generating message templates).
	 *
	 * @param EE_Messenger    $messenger    messenger used in trigger
	 * @param EE_message_type $message_type message type used in trigger
	 *
	 * @return bool true is a generating messenger and can be sent OR FALSE meaning cannot send.
	 */
	public function is_generating_messenger_and_active( EE_Messenger $messenger, EE_message_type $message_type ) {
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
	 * If $slugs_only is true, then just an array indexed by unique context slugs with the latest label representation for that slug.
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
	 * Keep in mind that although different message types may share the same context slugs, it is possible that the context
	 * is described differently by the message type.
	 *
	 * >>>>>>>>>>>> 1 usage in \EE_Message_List_Table::_get_table_filters()
	 * >>>>>>>>>>>> 1 usage in \EE_Message::context_label()
	 * >>>>>>>>>>>> 1 usage in \EE_messages_Test::test_get_all_contexts()
	 *
	 * @since 4.9.0
	 * @param   bool $slugs_only Whether to return an array of just slugs and labels (true) or all contexts indexed by message type.
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


}
// End of file EE_Message_Resource_Manager.lib.php
// Location: /EE_Message_Resource_Manager.lib.php