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
	}



	/**
	 * @return EE_Messenger_Collection
	 */
	public function messenger_collection() {
		return $this->_messenger_collection_loader->messenger_collection();
	}



	/**
	 * @return EE_Message_Type_Collection
	 */
	public function message_type_collection() {
		return $this->_message_type_collection_loader->message_type_collection();
	}



	/**
	 * @param string $messenger_name
	 * @return \EE_Messenger
	 */
	public function get_messenger( $messenger_name ) {
		return $this->messenger_collection()->get_by_info( $messenger_name );
	}



	/**
	 * @param string $message_type_name
	 * @return \EE_Message_Type
	 */
	public function get_message_type( $message_type_name ) {
		return $this->message_type_collection()->get_by_info( $message_type_name );
	}



	/**
	 * Used to return active messengers array stored in the wp options table.
	 * If no value is present in the option then an empty array is returned.
	 *
	 * @return array
	 */
	public function get_active_messengers_option() {
		return apply_filters(
			'FHEE__EE_Message_Resource_Manager__get_active_messengers_option',
			get_option( 'ee_active_messengers', array() )
		);
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
	 * _set_active_messengers_and_message_types
	 * generate list of active messengers and message types from collection
	 */
	protected function _set_active_messengers_and_message_types() {

		$active_messengers = $this->get_active_messengers_option();
		$active_messengers = is_array( $active_messengers ) ? $active_messengers : array( $active_messengers );
		$not_installed = array();
		foreach ( $active_messengers as $active_messenger => $data ) {
			if ( $this->messenger_collection()->has_by_name( $active_messenger ) ) {
				$this->_active_messengers[ $active_messenger ] = $this->messenger_collection()->get_by_info(
					$active_messenger
				);
				$this->_active_message_types[ $active_messenger ] = ! empty( $data[ 'settings' ][ $active_messenger . '-message_types' ] )
					? $data[ 'settings' ][ $active_messenger . '-message_types' ]
					: array();
			} else {
				$not_installed[] = $active_messenger;
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
	 * _deactivate_messenger
	 *
	 * @access protected
	 * @param  string $messenger name of messenger
	 * @return void
	 */
	protected function _deactivate_messenger( $messenger ) {
		unset( $this->_active_messengers[ $messenger ] );
		unset( $this->_active_message_types[ $messenger ] );
		$this->_message_template_group_model->deactivate_message_template_groups_for( $messenger );
		$this->update_active_messengers_option( $this->_active_messengers );
	}



	/**
	 * _deactivate_message_type
	 *
	 * @access protected
	 * @param  string $message_type name of message type
	 * @return void
	 */
	protected function _deactivate_message_type( $message_type ) {
		foreach ( $this->_active_messengers as $messenger => $settings ) {
			unset(
				$this->_active_messengers[ $messenger ][ 'settings' ][ $messenger . '-message_types' ][ $message_type ]
			);
		}
		$this->_message_template_group_model->deactivate_message_template_groups_for( '', $message_type );
		unset( $this->_active_message_types[ $message_type ] );
		$this->update_active_messengers_option( $this->_active_messengers );
	}


}
// End of file EE_Message_Resource_Manager.lib.php
// Location: /EE_Message_Resource_Manager.lib.php