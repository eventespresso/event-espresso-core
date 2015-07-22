<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }

/**
 * This class contains all business logic related to generating, queuing, and scheduling of
 * messages in the EE_messages system.
 *
 * @package    Event Espresso
 * @subpackage messages
 * @author     Darren Ethier
 * @since      4.9.0
 */
class EE_Messages_Processor {


	/**
	 * This is set on instantiation.  Is an instance of the EE_messages object.
	 * @type EE_messages
	 */
	protected $_EEMSG;


	/**
	 * @type EE_Messages_Queue
	 */
	protected $_queue;





	/**
	 * @type  EE_Messages_Generator
	 */
	protected $_generator;




	/**
	 * constructor
	 * @param EE_messages $ee_messages
	 */
	public function __construct( EE_messages $ee_messages ) {
		$this->_EEMSG = $ee_messages;
		$this->_queue = new EE_Messages_Queue();
		$this->_generator = new EE_Messages_Generator( $this->_queue, $ee_messages );
	}




	/**
	 * This returns the current set queue.
	 * @return EE_Messages_Queue
	 */
	public function get_queue() {
		return $this->_queue;
	}




	/**
	 *  Calls the EE_Messages_Queue::get_batch_to_generate() method and sends to EE_Messages_Generator.
	 * @return EE_Messages_Queue | bool  return false if nothing generated.  This returns a new EE_Message_Queue with
	 *                                   generated messages.
	 */
	public function batch_generate_from_queue() {
		if ( $this->_queue->get_batch_to_generate() ) {
			$new_queue = $this->_generator->generate();
			if ( $new_queue instanceof EE_Messages_Queue ) {
				//unlock queue
				$this->_queue->unlock();
				return $new_queue;
			}
		} else {
			$this->_queue->unlock();
			return false;
		}
	}




	/**
	 * Calls the EE_Message_Queue::get_batch_to_send() method and then immediately just calls EE_Message_Queue::execute()
	 * to iterate and send unsent messages.
	 * @return EE_Messages_Queue
	 */
	public function batch_send_from_queue() {
		//get messages to send and execute.
		$this->_queue->get_batch_to_send();
		//note: callers can use the EE_Messages_Queue::count_STS_in_queue() method to find out if there were any failed
		//messages in the queue and decide how to handle at that point.
		return $this->_queue;
	}






	/**
	 * This immediately generates messages using the given data and returns the
	 * EE_Message_Queue with the generated messages for the caller to work with.  Note, this does NOT save the generated
	 * messages in the queue, leaving it up to the caller to do so.
	 *
	 * @param EE_Message_To_Generate $mtg
	 * @return EE_Messages_Queue
	 */
	public function generate_and_return(  EE_Message_To_Generate $mtg ) {
		$this->_generator->_create_and_add_message_to_queue( $mtg );
		return $this->_generator->generate( false );
	}




	/**
	 * Queue for generation.  Note this does NOT persist to the db.  Client code should call get_queue()->save() if desire
	 * to persist.  This method is provided to client code to decide what it wants to do with queued messages for generation.
	 * @param EE_Message_To_Generate $mtg
	 * @return  EE_Messages_Queue
	 */
	public function queue_for_generation( EE_Message_To_Generate $mtg ) {
		$this->_generator->_create_and_add_message_to_queue( $mtg );
	}







	/**
	 * This receives a formatted array of argument arrays for queuing messages for generation and then persisting to storage
	 * after the queue is prepared.
	 *
	 * @see EE_Messages_Processor::queue_for_generation() for phpdocs about the arguments used as
	 *
	 * @param EE_Message_To_Generate[]
	 */
	public function batch_queue_for_generation_and_persist( $to_queue ) {

	}



	public function batch_queue_for_generation_no_persist( $to_queue ) {}





	/**
	 *
	 * @param string    $generating_messenger   This is the slug for the messenger.
	 * @param string    $message_type           This is the slug for the message type.
	 * @param array     $data                   This is the data needed for generating the message.
	 * @param string    $context                If generating a message for a specific context, then included.
	 * @return EE_Messages_Queue
	 */
	public function generate_and_queue_for_sending( $generating_messenger, $message_type, $data, $context = '' ) {}





	/**
	 * Generate for preview and return queue.
	 * @param string    $generating_messenger   This is the slug for the messenger.
	 * @param string    $message_type           This is the slug for the message type.
	 * @param array     $data                   This is the data needed for generating the message.
	 * @param string    $context                If generating a message for a specific context, then included.
	 * @return EE_Messages_Queue
	 */
	public function generate_for_preview( $generating_messenger, $message_type, $data, $context = '' ) {}








} //end class EE_Messages_Processor