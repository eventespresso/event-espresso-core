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
	 * @type EE_Message_Resource_Manager $_message_resource_manager
	 */
	protected $_message_resource_manager;

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
	 *
	 * @param EE_Message_Resource_Manager $message_resource_manager
	 */
	public function __construct( EE_Message_Resource_Manager $message_resource_manager ) {
		$this->_message_resource_manager = $message_resource_manager;
		$this->_init_queue_and_generator();
	}




	/**
	 * This method sets (or resets) the various properties for use.
	 *
	 * - $_queue = holds the messages queue
	 * - $_generator = holds the messages generator
	 */
	protected function _init_queue_and_generator() {
		$this->_generator = EE_Registry::factory( 'EE_Messages_Generator' );
		$this->_queue = $this->_generator->generation_queue();
	}




	/**
	 * This returns the current set queue.
	 * @return EE_Messages_Queue
	 */
	public function get_queue() {
		return $this->_queue;
	}



	/**
	 * This method can be utilized to process messages from a queue and they will be processed immediately on the same request.
	 * Please note that this method alone does not bypass the usual "locks" for generation/sending (it assumes client code
	 * has already filtered those if necessary).
	 *
	 * @param EE_Messages_Queue $queue_to_process
	 * @return bool  true for success false for error.
	 */
	public function process_immediately_from_queue( EE_Messages_Queue $queue_to_process ) {
		$success = false;
		$messages_to_send = array();
		$messages_to_generate = array();
		//loop through and setup the various messages from the queue so we know what is being processed
		$queue_to_process->get_message_repository()->rewind();
		foreach ( $queue_to_process->get_message_repository() as $message ) {
			if ( $message->STS_ID() === EEM_Message::status_incomplete ) {
				$messages_to_generate[] = $message;
				continue;
			}

			if ( in_array( $message->STS_ID(), EEM_Message::instance()->stati_indicating_to_send() ) ) {
				$messages_to_send[] = $message;
				continue;
			}
		}

		//do generation/sends
		if ( $messages_to_generate ) {
			$success = $this->batch_generate_from_queue( $messages_to_generate, true );
		}

		if ( $messages_to_send ) {
			$sent = $this->batch_send_from_queue( $messages_to_send, true );
			//if there was messages to generate and it failed, then we override any success value for the sending process
			//otherwise we just use the return from batch send.  The intent is that there is a simple response for success/fail.
			//Either everything was successful or we consider it a fail.  To be clear, this is a limitation of doing
			//all messages processing on the same request.
			$success = $messages_to_generate && ! $success ? false : $sent;
		}
		return $success;
	}


	/**
	 * Calls the EE_Messages_Queue::get_batch_to_generate() method and sends to EE_Messages_Generator.
	 *
	 * @param  EE_Message[] $messages    Array of EE_Message objects (optional) to build the queue with.
	 * @param  bool         $clear_queue Whether to ensure a fresh queue or not.
	 *
	 * @return bool|EE_Messages_Queue return false if nothing generated.  This returns a new EE_Message_Queue with
	 *                                   generated messages.
	 */
	public function batch_generate_from_queue( $messages = array(), $clear_queue = false ) {
		if ( $this->_build_queue_for_generation( $messages, $clear_queue ) ) {
			$new_queue = $this->_generator->generate();
			if ( $new_queue instanceof EE_Messages_Queue ) {
				//unlock queue
				$this->_queue->unlock_queue();
				$new_queue->initiate_request_by_priority( 'send' );
				return $new_queue;
			}
		}
		$this->_queue->unlock_queue();
		return false;
	}



	/**
	 * This method preps a queue for generation.
	 *
	 * @since    4.9.0
	 *
	 * @param EE_Message[] $messages    Array of EE_Message objects to build the queue with
	 *
	 * @param   bool       $clear_queue This indicates whether the existing queue should be dumped or not.
	 *
	 * @return bool true means queue prepped, false means there was a lock so no generation please.
	 */
	protected function _build_queue_for_generation( $messages = array(), $clear_queue = false ) {

		if ( $clear_queue ) {
			$this->_init_queue_and_generator();
		}

		if ( $messages ) {
			//if generation is locked then get out now because that means processing is already happening.
			if ( $this->_queue->is_locked() ) {
				return false;
			}

			$this->_queue->lock_queue();
			$messages = is_array( $messages ) ? $messages : array( $messages );
			foreach ( $messages as $message ) {
				if ( $message instanceof EE_Message ) {
					$data = $message->all_extra_meta_array();
					$this->_queue->add( $message, $data );
				}
			}
			return true;
		} else {
			return $this->_queue->get_batch_to_generate();
		}
	}


	/**
	 * This method preps a queue for sending.
	 *
	 * @param EE_Message[] $messages
	 * @param bool  $clear_queue Used to indicate whether to start with a fresh queue or not.
	 *
	 * @return bool true means queue prepped, false means there was a lock so no queue prepped.
	 */
	protected function _build_queue_for_sending( $messages, $clear_queue = false ) {
		//if sending is locked then get out now because that means processing is already happening.
		if ( $this->_queue->is_locked( EE_Messages_Queue::action_sending ) ) {
			return false;
		}

		$this->_queue->lock_queue( EE_Messages_Queue::action_sending );

		if ( $clear_queue ) {
			$this->_init_queue_and_generator();
		}

		$messages = is_array( $messages ) ? $messages : array( $messages );

		foreach ( $messages as $message ) {
			$this->_queue->add( $message );
		}
		return true;
	}


	/**
	 * Calls the EE_Message_Queue::get_to_send_batch_and_send() method and then immediately just calls EE_Message_Queue::execute()
	 * to iterate and send unsent messages.
	 *
	 * @param EE_Message[] $messages    If an array of messages is sent in then use it.
	 *
	 * @param bool         $clear_queue Whether to initialize a new queue or keep the existing one.
	 *
	 * @return EE_Messages_Queue
	 */
	public function batch_send_from_queue( $messages = array(), $clear_queue = false ) {

		if ( $messages && $this->_build_queue_for_sending( $messages, $clear_queue ) ) {
			$this->_queue->execute();
			$this->_queue->unlock_queue( EE_Messages_Queue::action_sending );
		} else {
			//get messages to send and execute.
			$this->_queue->get_to_send_batch_and_send();
		}
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
		$this->_init_queue_and_generator();
		$this->_queue_for_generation_loop( $messages_to_generate );
		return $this->_generator->generate( false );
	}




	/**
	 * Executes the generator generate method on the current internal queue, and returns the generated queue.
	 * @param  bool     $persist    Indicate whether to instruct the generator to persist the generated queue (true) or not (false).
	 * @return EE_Messages_Queue
	 */
	public function generate_queue( $persist = true ) {
		return $this->_generator->generate( $persist );
	}




	/**
	 * Queue for generation.  Note this does NOT persist to the db.  Client code should call get_message_repository()->save() if desire
	 * to persist.  This method is provided to client code to decide what it wants to do with queued messages for generation.
	 * @param EE_Message_To_Generate $message_to_generate
	 * @param bool                   $test_send             Whether this item is for a test send or not.
	 * @return  EE_Messages_Queue
	 */
	public function queue_for_generation( EE_Message_To_Generate $message_to_generate, $test_send = false ) {
		if ( $message_to_generate->valid() ) {
			$this->_generator->create_and_add_message_to_queue( $message_to_generate, $test_send );
		}
	}







	/**
	 * This receives an array of EE_Message_To_Generate objects, converts them to EE_Message adds them to the generation queue
	 * and then persists to storage.
	 *
	 * @param EE_Message_To_Generate[] $messages_to_generate
	 */
	public function batch_queue_for_generation_and_persist( $messages_to_generate ) {
		$this->_init_queue_and_generator();
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
		$this->_init_queue_and_generator();
		$this->_queue_for_generation_loop( $messages_to_generate );
	}




	/**
	 * Simply loops through the given array of EE_Message_To_Generate objects and adds them to the _queue as EE_Message
	 * objects.
	 *
	 * @param EE_Message_To_Generate[] $messages_to_generate
	 */
	protected function _queue_for_generation_loop( $messages_to_generate ) {
		//make sure is in an array.
		if ( ! is_array( $messages_to_generate ) ) {
			$messages_to_generate = array( $messages_to_generate );
		}

		foreach ( $messages_to_generate as $message_to_generate ) {
			if ( $message_to_generate instanceof EE_Message_To_Generate && $message_to_generate->valid() ) {
				$this->queue_for_generation( $message_to_generate );
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
		$this->_init_queue_and_generator();
		$this->_queue_for_generation_loop( $messages_to_generate );
		return $this->_generator->generate( true );
	}





	/**
	 * Generate for preview and execute right away.
	 *
	 * @param   EE_Message_To_Generate $message_to_generate
	 * @param   bool                   $test_send                Whether this is a test send or not.
	 * @return  EE_Messages_Queue | bool   false if unable to generate otherwise the generated queue.
	 */
	public function generate_for_preview( EE_Message_To_Generate $message_to_generate, $test_send = false ) {
		if ( ! $message_to_generate->valid() ) {
			EE_Error::add_error(
				__( 'Unable to generate preview because of invalid data', 'event_espresso' ),
				__FILE__,
				__FUNCTION__,
				__LINE__
			);
			return false;
		}
		//just make sure preview is set on the $message_to_generate (in case client forgot)
		$message_to_generate->set_preview( true );
		$this->_init_queue_and_generator();
		$this->queue_for_generation( $message_to_generate, $test_send );
		$generated_queue = $this->_generator->generate( false );
		if ( $generated_queue->execute( false ) ) {
			//the first queue item should be the preview
			$generated_queue->get_message_repository()->rewind();
			if ( ! $generated_queue->get_message_repository()->valid() ) {
				return $generated_queue;
			}
			return $generated_queue->get_message_repository()->is_test_send() ? true : $generated_queue;
		} else {
			return false;
		}
	}


	/**
	 * This queues for sending.
	 * The messenger send now method is also verified to see if sending immediately is requested.
	 * otherwise its just saved to the queue.
	 * @param EE_Message_To_Generate $message_to_generate
	 * @return bool true or false for success.
	 */
	public function queue_for_sending( EE_Message_To_Generate $message_to_generate ) {
		if ( ! $message_to_generate->valid() ) {
			return false;
		}
		$this->_init_queue_and_generator();
		$message = $message_to_generate->get_EE_Message();
		$this->_queue->add( $message );
		if ( $message->send_now() ) {
			$this->_queue->execute( false );
		} else {
			$this->_queue->save();
		}
		return true;
	}


	/**
	 * This generates and sends from the given EE_Message_To_Generate class immediately.
	 * @param EE_Message_To_Generate $message_to_generate
	 * @return EE_Messages_Queue | null
	 */
	public function generate_and_send_now( EE_Message_To_Generate $message_to_generate ) {
		if ( ! $message_to_generate->valid() ) {
			return null;
		}
		// is there supposed to be a sending messenger for this message?
		if ( $message_to_generate instanceof EEI_Has_Sending_Messenger ) {
			// make sure it's valid, but if it's not,
			// then set the value of $sending_messenger to an EE_Error object
			// so that downstream code can easily see that things went wrong.
			$sending_messenger = $message_to_generate->sending_messenger() instanceof EE_messenger
				? $message_to_generate->sending_messenger()
				: new EE_Error(
					__(
						'There was a specific sending messenger requested for the send action, but it was either invalid or not active at time of sending.',
						'event_espresso'
					)
				);
		} else {
			$sending_messenger = null;
		}

		if ( $message_to_generate->get_EE_Message()->STS_ID() === EEM_Message::status_idle ) {
			$this->_init_queue_and_generator();
			$this->_queue->add( $message_to_generate->get_EE_Message() );
			$this->_queue->execute( false, $sending_messenger );
			return $this->_queue;
		} elseif ( $message_to_generate->get_EE_Message()->STS_ID() === EEM_Message::status_incomplete ) {
			$generated_queue = $this->generate_and_return( array( $message_to_generate ) );
			$generated_queue->execute( false, $sending_messenger );
			return $generated_queue;
		}
		return null;
	}




	/**
	 * Creates mtg objects for all active messengers and queues for generation.
	 * This method also calls the execute by priority method on the queue which will optionally kick off a new non-blocking
	 * request to complete the action if the priority for the message requires immediate action.
	 * @param string $message_type
	 * @param mixed  $data   The data being used for generation.
	 * @param bool   $persist   Whether to persist the queued messages to the db or not.
	 */
	public function generate_for_all_active_messengers( $message_type, $data, $persist = true ) {
		$messages_to_generate = $this->setup_mtgs_for_all_active_messengers( $message_type, $data );
		if ( $persist ) {
			$this->batch_queue_for_generation_and_persist( $messages_to_generate );
			$this->_queue->initiate_request_by_priority();
		} else {
			$this->batch_queue_for_generation_no_persist( $messages_to_generate );
		}
	}




	/**
	 * This simply loops through all active messengers and takes care of setting up the
	 * EE_Message_To_Generate objects.
	 * @param $message_type
	 * @param $data
	 *
	 * @return EE_Message_To_Generate[]
	 */
	public function setup_mtgs_for_all_active_messengers( $message_type, $data ) {
		$messages_to_generate = array();
		foreach ( $this->_message_resource_manager->active_messengers() as $messenger_slug => $messenger_object  ) {
			$message_to_generate = new EE_Message_To_Generate( $messenger_slug, $message_type, $data );
			if ( $message_to_generate->valid() ) {
				$messages_to_generate[] = $message_to_generate;
			}
		}
		return $messages_to_generate;
	}




	/**
	 * This accepts an array of EE_Message::MSG_ID values and will use that to retrieve the objects from the database
	 * and send.
	 * @param array $message_ids
	 */
	public function setup_messages_from_ids_and_send( $message_ids ) {
		$this->_init_queue_and_generator();
		$messages = EEM_Message::instance()->get_all( array(
			array(
				'MSG_ID' => array( 'IN', $message_ids ),
				'STS_ID' => array(
					'IN',
					array_merge(
						EEM_Message::instance()->stati_indicating_sent(),
						array( EEM_Message::status_retry )
					),
				),
			),
		));
		//set the Messages to resend.
		foreach ( $messages as $message ) {
			if ( $message instanceof EE_Message ) {
				$message->set_STS_ID( EEM_Message::status_resend );
				$this->_queue->add( $message );
			}
		}

		$this->_queue->initiate_request_by_priority( 'send' );
	}



	/**
	 * This method checks for registration IDs in the request via the given key and creates the messages to generate
	 * objects from them, then returns the array of messages to generate objects.
	 * Note, this sets up registrations for the registration family of message types.
	 *
	 * @param string $registration_ids_key  This is used to indicate what represents the registration ids in the request.
	 *
	 * @return EE_Message_To_Generate[]
	 */
	public function setup_messages_to_generate_from_registration_ids_in_request( $registration_ids_key = '_REG_ID' ) {
		EE_Registry::instance()->load_core( 'Request_Handler' );
		EE_Registry::instance()->load_helper( 'MSG_Template' );
		$regs_to_send = array();
		$regIDs = EE_Registry::instance()->REQ->get( $registration_ids_key );
		if ( empty( $regIDs ) ) {
			EE_Error::add_error( __('Something went wrong because we\'re missing the registration ID', 'event_espresso'), __FILE__, __FUNCTION__, __LINE__ );
			return false;
		}

		//make sure is an array
		$regIDs = is_array( $regIDs ) ? $regIDs : array( $regIDs );

		foreach( $regIDs as $regID ) {
			$reg = EEM_Registration::instance()->get_one_by_ID( $regID );
			if ( ! $reg instanceof EE_Registration ) {
				EE_Error::add_error( sprintf( __('Unable to retrieve a registration object for the given reg id (%s)', 'event_espresso'), $regID ) );
				return false;
			}
			$regs_to_send[$reg->transaction_ID()][$reg->status_ID()][] = $reg;
		}

		$messages_to_generate = array();

		foreach ( $regs_to_send as $status_group ) {
			foreach ( $status_group as $status_id => $registrations ) {
				$messages_to_generate = array_merge(
					$messages_to_generate,
					$this->setup_mtgs_for_all_active_messengers(
						EEH_MSG_Template::convert_reg_status_to_message_type( $status_id ),
						array( $registrations, $status_id )
					)
				);
			}
		}

		return $messages_to_generate;
	}



} //end class EE_Messages_Processor