<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }

/**
 * This class is used for managing and interacting with the EE_Messages Queue.  An instance
 * of this object is used for interacting with a specific batch of EE_Message objects.
 *
 * @package    Event Espresso
 * @subpackage messages
 * @author     Darren Ethier
 * @since      4.8.0
 */
class EE_Messages_Queue {

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


	public function __construct() {}


	/**
	 * An array of EE_Messages to add to the queue.
	 *
	 * @param EE_Message[] $messages
	 */
	public function add( $messages ) {}
	public function remove( $queue_id ) {}
	public function save() {}
	public function get_batch() {}
	public function lock_queue() {}
	public function unlock_queue() {}
	public function is_locked() {}
	public function execute() {}
}