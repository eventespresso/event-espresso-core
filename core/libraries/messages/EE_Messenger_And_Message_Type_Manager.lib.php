<?php

if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class EE_Messenger_And_Message_Type_Manager
 *
 * Description
 *
 * @package       Event Espresso
 * @subpackage    core
 * @author        Brent Christensen
 * @since         $VID:$
 *
 */
class EE_Messenger_And_Message_Type_Manager {



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
	 * EE_Messenger_And_Message_Type_Manager constructor.
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
	 * @param string $messenger_classname
	 * @return \EE_Messenger
	 */
	public function get_messenger( $messenger_classname ) {
		return $this->messenger_collection()->get_by_info( $messenger_classname );
	}



	/**
	 * @param string $message_type_classname
	 * @return \EE_Message_Type
	 */
	public function get_message_type( $message_type_classname ) {
		return $this->message_type_collection()->get_by_info( $message_type_classname );
	}



	/**
	 * Used to return active messengers array stored in the wp options table.
	 * If no value is present in the option then an empty array is returned.
	 *
	 * @return array
	 */
	public static function get_active_messengers_option() {
		return apply_filters(
			'FHEE__EE_Messenger_And_Message_Type_Manager__get_active_messengers_option',
			get_option( 'ee_active_messengers', array() )
		);
	}



	/**
	 * Used to update the active messengers array stored in the wp options table.
	 *
	 * @param array $active_messengers Incoming data to save.
	 * @return bool FALSE if not updated, TRUE if updated.
	 */
	public static function update_active_messengers_option( $active_messengers ) {
		return update_option( 'ee_active_messengers', $active_messengers );
	}



	/**
	 * _set_active_messengers_and_message_types
	 * generate list of active messengers and message types from collection
	 */
	protected function _set_active_messengers_and_message_types() {
		$this->messenger_collection()->rewind();
		while ( $this->messenger_collection()->valid() ) {
			$this->_active_messengers[ $this->messenger_collection()->current()->name ] = $this->messenger_collection()->current();
			$this->messenger_collection()->next();

			//$this->_active_message_types[ $name ] = ! empty( $_actives[ $name ][ 'settings' ][ $name . '-message_types' ] )
			//	? $_actives[ $name ][ 'settings' ][ $name . '-message_types' ]
			//	: array();

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
		EE_Messenger_And_Message_Type_Manager::update_active_messengers_option( $this->_active_messengers );
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
		EE_Messenger_And_Message_Type_Manager::update_active_messengers_option( $this->_active_messengers );
	}


}
// End of file EE_Messenger_And_Message_Type_Manager.lib.php
// Location: /EE_Messenger_And_Message_Type_Manager.lib.php