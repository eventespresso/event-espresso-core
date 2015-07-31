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
		$this->_queue = new EE_Messages_Queue( $ee_messages );
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
				$this->_queue->unlock_queue();
				$this->_queue->initiate_request_by_priority('send');
				return $new_queue;
			}
		} else {
			$this->_queue->unlock_queue();
			return false;
		}
	}




	/**
	 * Calls the EE_Message_Queue::get_to_send_batch_and_send() method and then immediately just calls EE_Message_Queue::execute()
	 * to iterate and send unsent messages.
	 * @return EE_Messages_Queue
	 */
	public function batch_send_from_queue() {
		//get messages to send and execute.
		$this->_queue->get_to_send_batch_and_send();
		//note: callers can use the EE_Messages_Queue::count_STS_in_queue() method to find out if there were any failed
		//messages in the queue and decide how to handle at that point.
		return $this->_queue;
	}






	/**
	 * This immediately generates messages using the given array of EE_Message_To_Generate objects and returns the
	 * EE_Message_Queue with the generated messages for the caller to work with.  Note, this does NOT save the generated
	 * messages in the queue, leaving it up to the caller to do so.
	 *
	 * @param EE_Message_To_Generate[] $messages_to_generate
	 * @return EE_Messages_Queue
	 */
	public function generate_and_return(  $messages_to_generate ) {
		$this->_queue_for_generation_loop( $messages_to_generate );
		return $this->_generator->generate( false );
	}




	/**
	 * Queue for generation.  Note this does NOT persist to the db.  Client code should call get_queue()->save() if desire
	 * to persist.  This method is provided to client code to decide what it wants to do with queued messages for generation.
	 * @param EE_Message_To_Generate $mtg
	 * @return  EE_Messages_Queue
	 */
	public function queue_for_generation( EE_Message_To_Generate $mtg ) {
		if ( $mtg->valid() ) {
			$this->_generator->create_and_add_message_to_queue( $mtg );
		}
	}







	/**
	 * This receives an array of EE_Message_To_Generate objects, converts them to EE_Message adds them to the generation queue
	 * and then persists to storage.
	 *
	 * @param EE_Message_To_Generate[] $messages_to_generate
	 */
	public function batch_queue_for_generation_and_persist( $messages_to_generate ) {
		$this->_queue_for_generation_loop( $messages_to_generate );
		$this->_queue->save();
	}






	/**
	 * This receives an array of EE_Message_To_Generate objects, converts them to EE_Message and adds them to the generation
	 * queue.  Does NOT persist to storage (unless there is an error.
	 * Client code can retrieve the generated queue by calling EEM_Messages_Processor::get_queue()
	 *
	 * @param EE_Message_To_Generate[]  $messages_to_generate
	 */
	public function batch_queue_for_generation_no_persist( $messages_to_generate ) {
		$this->_queue_for_generation_loop( $messages_to_generate );
	}




	/**
	 * Simply loops through the given array of EE_Message_To_Generate objects and adds them to the _queue as EE_Message
	 * objects.
	 *
	 * @param $messages_to_generate
	 */
	protected function _queue_for_generation_loop( $messages_to_generate ) {
		//make sure is in an array.
		if ( ! is_array( $messages_to_generate ) ) {
			$messages_to_generate = array( $messages_to_generate );
		}

		foreach ( $messages_to_generate as $mtg ) {
			if ( $mtg instanceof EE_Message_To_Generate && $mtg->valid() ) {
				$this->queue_for_generation( $mtg );
			}
		}
	}





	/**
	 * Receives an array of EE_Message_To_Generate objects and generates the EE_Message objects, then persists (so its
	 * queued for sending).
	 * @param  EE_Message_To_Generate[]
	 * @return EE_Messages_Queue
	 */
	public function generate_and_queue_for_sending( $messages_to_generate ) {
		$this->_queue_for_generation_loop( $messages_to_generate );
		return $this->_generator->generate( true );
	}





	/**
	 * Generate for preview and execute right away.
	 * @param  EE_Message_To_Generate $mtg
	 * @return EE_Messages_Queue | null
	 */
	public function generate_for_preview( EE_Message_To_Generate $mtg ) {
		if ( ! $mtg->valid() ) {
			return null;
		}
		//just make sure preview is set on the $mtg (in case client forgot)
		$mtg->preview = true;
		$generated_queue = $this->generate_and_return( array( $mtg ) );
		if ( $generated_queue->execute( false ) ) {
			return $generated_queue;
		} else {
			return null;
		}
	}


	/**
	 * This generates and sends from the given EE_Message_To_Generate class immediately.
	 * @param EE_Message_To_Generate $mtg
	 * @return bool
	 */
	public function generate_and_send_now( EE_Message_To_Generate $mtg ) {
		if ( ! $mtg->valid() ) {
			return false;
		}
		if ( $mtg instanceof EE_Message_Generated_From_Token ) {
			$this->_queue->add( $mtg->get_EE_Message() );
			$this->_set_errors( $this->_queue );
			$this->_queue->execute(false);
		} else {
			$generated_queue = $this->generate_and_return( $mtg );
			$this->_set_errors( $generated_queue );
			$generated_queue->execute( false );
		}
		return false;
	}




	/**
	 * This simply loops through all active messengers and takes care of setting up the
	 * EE_Message_To_Generate objects and queueing for generation.  This method also calls the
	 * execute by priority method on the queue which will optionally kick off a new non-blocking
	 * request to complete the action if the priority for the message requires immediate action.
	 * @param string $message_type
	 * @param $data
	 */
	public function generate_for_all_active_messengers( $message_type, $data ) {
		$messages_to_generate = array();
		foreach( $this->_EEMSG->get_active_messengers() as $messenger ) {
			$mtg = new EE_Message_To_Generate(
				$messenger,
				$message_type,
				$data,
				$this->_EEMSG
			);
			if ( $mtg->valid() ) {
				$messages_to_generate[] = $mtg;
			}
		}
		$this->batch_queue_for_generation_and_persist( $messages_to_generate );
		$this->_queue->initiate_request_by_priority();
	}



} //end class EE_Messages_Processor