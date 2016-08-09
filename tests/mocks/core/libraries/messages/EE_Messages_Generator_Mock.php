<?php if ( ! defined( 'EVENT_ESPRESSO_VERSION' )) { exit( 'No direct script access allowed' ); }

/**
 * This class is the mock for EE_Messages_Generator
 *
 * @package    Event Espresso
 * @subpackage messages
 * @author     Darren Ethier
 * @since      4.9.0
 */
class EE_Messages_Generator_Mock extends EE_Messages_Generator {

	public function ready_queue() {
		return $this->_ready_queue;
	}
}