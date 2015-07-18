<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }

/**
 * This class is used for generating EE_Message objects with given info.
 *
 * @package    Event Espresso
 * @subpackage messages
 * @author     Darren Ethier
 * @since      4.9.0
 */
class EE_Messages_Generator {


	/**
	 * @type EE_Messages_Data_Handler_Repository
	 */
	protected $_data;





	/**
	 * @type EE_Message_Queue
	 */
	protected $_queue;





	/**
	 * @param EE_Message_Queue $queue
	 */
	public function __construct( EE_Message_Queue $queue ) {
		$this->_queue = $queue;
		$this->_data = new EE_Messages_Data_Handler_Repository();
	}





	/**
	 *  This iterates through the provided queue and generates the EE_Message objects.
	 *  When iterating through the queue, the queued item that served as the base for generating other EE_Message objects
	 *  gets removed and the new EE_Message objects get added to a NEW queue.  The NEW queue is then returned for the
	 *  caller to decide what to do with it.
	 */
	public function generate() {

	}



} //end EE_Messages_Generator