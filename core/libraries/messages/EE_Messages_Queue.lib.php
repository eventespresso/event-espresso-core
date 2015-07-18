<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }

/**
 * This class is used for managing and interacting with the EE_Messages Queue.  An instance
 * of this object is used for interacting with a specific batch of EE_Message objects.
 *
 * @package    Event Espresso
 * @subpackage messages
 * @author     Darren Ethier
 * @since      4.9.0
 */
class EE_Messages_Queue {


	/**
	 * Sets the limit of how many messages are generated per process.
	 * @type int
	 */
	protected $_batch_count;


	/**
	 * Sets the limit of how many messages can be sent per hour.
	 * @type int
	 */
	protected $_rate_limit;


	/**
	 * @type EE_Message_Repository
	 */
	protected $_queue;


	/**
	 * This is an array of cached queue items being stored in this object.
	 * The array keys will be the ID of the EE_Message in the db if saved.  If the EE_Message
	 * is not saved to the db then its key will be an increment of "UNS" (i.e. UNS1, UNS2 etc.)
	 * @type EE_Message[]
	 */
	protected $_cached_queue_items;


	/**
	 * Tracks the number of unsaved queue items.
	 * @type int
	 */
	protected $_unsaved_count = 0;


	public function __construct() {
		$this->_batch_count = apply_filters( 'FHEE__EE_Messages_Queue___batch_count', 50 );
		$this->_rate_limit = apply_filters( 'FHEE__EE_Messages_Queue___rate_limit', 200 );
		$this->_queue = new EE_Message_Repository();
	}


	/**
	 * Add a EE_Message object to the queue
	 *
	 * @param EE_Message $message
	 */
	public function add( EE_Message $message ) {}




	/**
	 * Removes EE_Message from _queue that matches the given token.
	 * @param string    $message_token  The token for the EE_Message to remove from the _queue
	 * @param bool      $persist        This flag indicates whether to attempt to delete the object from the db as well.
	 */
	public function remove( $message_token, $persist = false ) {}




	/**
	 * Persists all queued EE_Message objects to the db.
	 */
	public function save() {}




	/**
	 * This does the following things:
	 * 1. Checks if there is a lock on generation (prevents race conditions).  If there is a lock then exits (return false).
	 * 2. If no lock, sets lock, then retrieves a batch of nongenerated EE_Message objects and adds to queue
	 * 3. Returns bool.  True = batch ready.  False = no batch ready (or nothing available for generation).
	 *
	 * Note: will need to come up with some sort of mechanism for automatically unlocking queue when all the batch has been processed.
	 *
	 *
	 */
	public function get_batch_to_generate() {}


	/**
	 * Same as get_batch_to_generate except for sending.
	 */
	public function get_batch_to_send() {}


	/**
	 * Locks the queue so that no other queues can call the "batch" methods.
	 */
	protected function _lock_queue() {}




	/**
	 * Unlocks the queue so that batch methods can be used.
	 */
	protected function _unlock_queue() {}




	/**
	 * Returns whether batch methods are "locked" or not.
	 */
	public function is_locked() {}



	/**
	 *  Loops through the EE_Message objects in the _queue and calls the messenger send methods for each message.
	 */
	public function execute() {}
}