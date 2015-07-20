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





	/**
	 * @type  EE_messages
	 */
	protected $_EEMSG;




	/**
	 * Constructor.
	 * Setup all the initial properties and load a EE_Message_Repository.
	 *
	 * @param  EE_messages  $msg  dependency on EE_messsages.
	 */
	public function __construct( EE_messages $msg ) {
		$this->_batch_count = apply_filters( 'FHEE__EE_Messages_Queue___batch_count', 50 );
		$this->_rate_limit = $this->get_rate_limit();
		$this->_EEMSG = $msg;
		$this->_queue = new EE_Message_Repository();
	}


	/**
	 * Add a EE_Message object to the queue
	 *
	 * @param EE_Message    $message
	 * @param array         $data     This will be an array of data to attach to the object in the repository.  If the
	 *                                object is persisted, this data will be saved on an extra_meta object related to
	 *                                EE_Message.
	 * @param  bool         $preview  Whether this EE_Message represents a preview or not.
	 * @return bool          Whether the message was successfully added to the repository or not.
	 */
	public function add( EE_Message $message, $data = array(), $preview = false ) {
		return $this->_queue->add( $message, $data, $preview );
	}




	/**
	 * Removes EE_Message from _queue that matches the given token.
	 * @param EE_Message    $message    The message to detach from the queue
	 * @param bool          $persist    This flag indicates whether to attempt to delete the object from the db as well.
	 */
	public function remove( EE_Message $message, $persist = false ) {
		return $this->_queue->remove( $message, $persist );
	}




	/**
	 * Persists all queued EE_Message objects to the db.
	 * @return array()  @see EE_Messages_Repository::saveAll() for return values.
	 */
	public function save() {
		return $this->_queue->saveAll();
	}





	/**
	 * @return EE_Message_Repository
	 */
	public function get_queue() {
		return $this->_queue;
	}




	/**
	 * This does the following things:
	 * 1. Checks if there is a lock on generation (prevents race conditions).  If there is a lock then exits (return false).
	 * 2. If no lock, sets lock, then retrieves a batch of non-generated EE_Message objects and adds to queue
	 * 3. Returns bool.  True = batch ready.  False = no batch ready (or nothing available for generation).
	 *
	 * Note: Callers should make sure they release the lock otherwise batch generation will be prevented from continuing.
	 *       The lock is on a transient that is set to expire after one hour as a fallback in case locks are not removed.
	 *
	 * @return bool  true if successfully retrieved batch, false no batch ready.
	 */
	public function get_batch_to_generate() {
		if ( $this->is_locked( 'generation' ) ) {
			return false;
		}

		//lock batch generation to prevent race conditions.
		$this->_lock_queue( 'generation' );

		$where_conditions = array(
			'STS_ID' => EEM_Message::status_incomplete
		);

		$query_args = array(
			0 => $where_conditions,
			'orderby' => $this->_get_priority_orderby(),
			'limit' => $this->_batch_count
		);
		$messages = EEM_Message::instance()->get_all( $query_args );

		if ( ! $messages ) {
			return false; //nothing to generate
		}

		foreach ( $messages as $message ) {
			$data = $message->all_extra_meta_array();
			$this->add( $message, $data );
		}
		return true;
	}


	/**
	 * This does the following things:
	 * 1. Checks if there is a lock on sending (prevents race conditions).  If there is a lock then exits (return false).
	 * 2. Grabs the allowed number of messages to send for the rate_limit.  If cannot send any more messages, then return false.
	 * 2. If no lock, sets lock, then retrieves a batch of EE_Message objects, adds to queue and triggers execution.
	 * 3. On success or unsuccessful send, sets status appropriately.
	 * 4. Saves messages via the queue
	 * 5. Releases lock.
	 *
	 * @return bool  true on success, false if something preventing sending (i.e. lock set).
	 *
	 */
	public function get_batch_to_send() {
		if ( $this->is_locked( 'sending' ) || $this->_rate_limit < 1 ) {
			return false;
		}

		$batch = $this->_batch_count < $this->_rate_limit ? $this->_batch_count : $this->_rate_limit;

		$where = array(
			'STS_ID' => array( 'IN', EEM_Message::instance()->stati_indicating_sent() )
		);

		$query_args = array(
			'orderby' => $this->_get_priority_orderby(),
			'limit' => $batch
		);

		$messages_to_send = EEM_Message::instance()->get_all( $query_args );


		//any to send?
		if ( ! $messages_to_send ) {
			return false;
		}

		//add to queue.
		foreach ( $messages_to_send as $message ) {
			$this->add( $message );
		}

		//send messages  (this also updates the rate limit)
		$this->execute();

		//release lock
		$this->unlock_queue( 'sending' );
	}




	/**
	 * Locks the queue so that no other queues can call the "batch" methods.
	 *
	 * @param   string  $type   The type of queue being locked.
	 */
	protected function _lock_queue( $type = 'generation' ) {
		set_transient( $this->_get_lock_key( $type ), 1, $this->_get_lock_expiry( $type ) );
	}




	/**
	 * Unlocks the queue so that batch methods can be used.
	 *
	 * @param   string  $type   The type of queue being unlocked.
	 */
	public function unlock_queue( $type = 'generation' ) {
		delete_transient( $this->_get_lock_key( $type ) );
	}




	/**
	 * Retrieve the key used for the lock transient.
	 * @param string $type  The type of lock.
	 * @return string
	 */
	protected function _get_lock_key( $type = 'generation' ) {
		return '_ee_lock_' . $type;
	}




	/**
	 * Retrieve the expiry time for the lock transient.
	 * @param string $type  The type of lock
	 * @return int   time to expiry in seconds.
	 */
	protected function _get_lock_expiry( $type = 'generation' ) {
		return (int) apply_filters( 'FHEE__EE_Messages_Queue__lock_expiry', HOUR_IN_SECONDS, $type );
	}


	/**
	 * Returns the key used for rate limit transient.
	 * @return string
	 */
	protected function _get_rate_limit_key() {
		return '_ee_rate_limit';
	}


	/**
	 * Returns the rate limit expiry time.
	 * @return int
	 */
	protected function _get_rate_limit_expiry() {
		return (int) apply_filters( 'FHEE__EE_Messages_Queue__rate_limit_expiry', HOUR_IN_SECONDS );
	}




	/**
	 * Returns the default rate limit for sending messages.
	 * @return int
	 */
	protected function _default_rate_limit() {
		return (int) apply_filters( 'FHEE__EE_Messages_Queue___rate_limit', 200 );
	}




	/**
	 * Return the orderby array for priority.
	 * @return array
	 */
	protected function _get_priority_orderby() {
		return array(
			array(
				'MSG_priority' => ASC,
				'MSG_modified' => DESC
			)
		);
	}




	/**
	 * Returns whether batch methods are "locked" or not.
	 *
	 * @param   string $type The type of lock being checked for.
	 * @return int
	 */
	public function is_locked( $type = 'generation' ) {
		return get_transient( $this->_get_lock_key( $type ) );
	}







	/**
	 * Retrieves the rate limit that may be cached as a transient.
	 * If the rate limit is not set, then this sets the default rate limit and expiry and returns it.
	 * @return int
	 */
	public function get_rate_limit() {
		if ( ! $rate_limit = get_transient( $this->_get_rate_limit_key() ) ) {
			$rate_limit = $this->_default_rate_limit();
			set_transient( $this->_get_rate_limit_key(), $rate_limit, $this->_get_rate_limit_key() );
		}
		return $rate_limit;
	}




	/**
	 * This updates existing rate limit with the new limit which is the old minus the batch.
	 * @param int $batch_completed  This sets the new rate limit based on the given batch that was completed.
	 */
	public function set_rate_limit( $batch_completed ) {
		//first get the most up to date rate limit (in case its expired and reset)
		$rate_limit = $this->get_rate_limit();
		$new_limit = $rate_limit - $batch_completed;
		//updating the transient option directly to avoid resetting the expiry.
		update_option( '_transient_' . $this->_get_rate_limit_key(), $new_limit );
	}





	/**
	 *  Loops through the EE_Message objects in the _queue and calls the messenger send methods for each message.
	 *
	 * @param   bool    $save   Used to indicate whether to save the message queue after sending (default will save).
	 */
	public function execute( $save = true ) {
		$messages_sent = 0;
		foreach( $this->_queue as $message ) {
			$error_message = array();
			$messenger = $this->_EEMSG->get_messenger_if_active( $message->messenger() );
			$message_type = $this->_EEMSG->get_active_message_type( $message->messenger(), $message->message_type() );

			//error checking
			if ( ! $messenger instanceof EE_messenger ) {
				$error_msg[] = sprintf( __( 'the %s messenger is not active at time of sending.', 'event_espresso' ), $message->messenger() );
			}

			if ( ! $message_type instanceof EE_message_type ) {
				$error_msg[] = sprintf( __( 'the %s message type is not active at the time of sending.', 'event_espresso' ), $message->message_type() );
			}
			//send using messenger
			if ( $messenger instanceof EE_messenger && $message_type instanceof $message_type ) {
				if ( $messenger->send_message( $message, $message_type ) ) {
					$messages_sent++;
					$message->set_STS_ID( EEM_Message::status_sent );
				} else {
					//see if there are any error messages
					$notices = EE_Errors::has_notices();
					if ( $notices && $notices['errors'] ) {
						$error_msg[] = implode( "\n", $notices );
					} else {
						$error_msg[] = __( 'Messenger and Message Type were valid and active, but the messenger send method failed.', 'event_espresso' );
					}
				}
			}

			if ( count( $error_msg > 0 ) ) {
				$msg = __( 'Message was not sent successfully.', 'event_espresso' );
				$msg = $msg . "\n" . implode( "\n", $error_msg );
				$message->set_STS_ID( EEM_Message::status_failed );
				$message->set_error_message( $msg );
			}
		}

		if ( $save ) {
			$this->save();
		}
	}


	/**
	 * The intention of this method is to count how many EE_Message objects
	 * are in the queue with a given status.
	 *
	 * Example usage:
	 * After a caller calls the "EE_Message_Queue::execute()" method, the caller can check if there were any failed sends
	 * by calling $queue->count_STS_in_queue( EEM_Message_Queue::status_failed ).
	 *
	 * @param string $status  The STS_ID for the status being checked.
	 * @return int  Count of EE_Message's matching the given status.
	 */
	public function count_STS_in_queue( $status ) {
		$count = 0;
		foreach( $this->_queue as $message ) {
			if ( $message->STS_ID() === $status ) {
				$count++;
			}
		}
		return $count;
	}

}