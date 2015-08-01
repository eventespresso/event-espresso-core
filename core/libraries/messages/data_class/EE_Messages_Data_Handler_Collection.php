<?php
if (!defined('EVENT_ESPRESSO_VERSION'))
	exit('No direct script access allowed');


/**
 * Serves as a collection for EE_Messages_incoming_data objects
 * @package    Event Espresso
 * @subpackage colleciton
 * @author     Darren Ethier
 * @since      4.9.0
 */
class EE_Messages_Data_Handler_Collection extends EE_Object_Collection {


	public function __construct() {
		$this->interface = 'EE_Messages_incoming_data';
	}


	/**
	 * This adds the EE_Messages_incoming_data data handler object to the collection.
	 *
	 * @param EE_Messages_incoming_data  $data_handler
	 * @param mixed                      $data           Usually an array of data used in combination with the $data_handler
	 *                                                   classname to create an alternative index for retrieving data_handlers.
	 * @return bool
	 */
	public function add( $data_handler, $data = null) {
		$data = $data === null ? array() : (array) $data;
		$info['key'] = $this->get_key( get_class( $data_handler ), $data );
		return parent::add( $data_handler, $info );
	}
	




	/**
	 * This returns a key for retrieving data for the given references used to generate the key.
	 * Data handlers are cached to the repository along with a md5() generated key using known references.
	 * @param string    $classname      The classname of the datahandler being checked for.
	 * @param mixed     $data           The data that was used to instantiate the data_handler.
	 *
	 * @return  string      md5 hash using provided info.
	 */
	public function get_key( $classname, $data ) {
		return md5( $classname . print_r( $data, true ) );
	}






	/**
	 * This returns a saved EE_Messages_incoming_data object if there is one in the repository indexed by a key matching
	 * the given string.
	 *
	 * @param string  $key  @see EE_Messages_Data_Handler_Collection::get_key() to setup a key formatted for searching.
	 *
	 * @return null|EE_Messages_incoming_data
	 */
	public function get_by_key( $key ) {
		$this->rewind();
		while( $this->valid() ) {
			$data = $this->getInfo();
			if ( isset( $data['key'] ) && $data['key'] === $key ) {
				$handler = $this->current();
				$this->rewind();
				return $handler;
			}
			$this->next();
		}
		return null;
	}

}