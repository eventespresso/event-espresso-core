<?php if ( ! defined( 'EVENT_ESPRESSO_VERSION' )) { exit( 'No direct script access allowed' ); }

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
	 * @type EE_Messages_Data_Handler_Collection
	 */
	protected $_data_handler_collection;




	/**
	 * @type  EE_Message_Template_Group_Collection
	 */
	protected $_template_collection;





	/**
	 * This will hold the data handler for the current EE_Message being generated.
	 * @type EE_Messages_incoming_data
	 */
	protected $_current_data_handler;





	/**
	 * @type  EE_Messages
	 */
	protected $_EEMSG;





	/**
	 * This holds the EE_Messages_Queue that contains the messages to generate.
	 * @type EE_Messages_Queue
	 */
	protected $_generation_queue;




	/**
	 * This holds the EE_Messages_Queue that will store the generated EE_Message objects.
	 * @type EE_Messages_Queue
	 */
	protected $_ready_queue;




	/**
	 * This is a container for any error messages that get created through the generation
	 * process.
	 * @type array
	 */
	protected $_error_msg = array();





	/**
	 * Flag used to set when the current EE_Message in the generation queue has been verified.
	 * @type bool
	 */
	protected $_verified = false;






	/**
	 * This will hold the current messenger object corresponding with the current EE_Message in the generation queue.
	 *
	 * @type EE_Messenger
	 */
	protected $_current_messenger;




	/**
	 * This will hold the current message type object corresponding with the current EE_Message in the generation queue.
	 * @type EE_message_type
	 */
	protected $_current_message_type;




	/**
	 * @type EEH_Parse_Shortcodes
	 */
	protected $_shortcode_parser;





	/**
	 * @param EE_Messages_Queue $queue
	 * @param EE_Messages       $eemsg
	 */
	public function __construct( EE_Messages_Queue $queue, EE_Messages $eemsg ) {
		$this->_generation_queue = $queue;
		$this->_ready_queue = new EE_Messages_Queue( $eemsg );
		$this->_EEMSG = $eemsg;
		$this->_data_handler_collection = new EE_Messages_Data_Handler_Collection();
		$this->_template_collection = new EE_Message_Template_Group_Collection();

		EE_Registry::instance()->load_helper( 'Parse_Shortcodes' );
		$this->_shortcode_parser = new EEH_Parse_Shortcodes();

		//load request handler
		EE_Registry::instance()->load_core( 'Request_Handler' );
	}





	/**
	 *  This iterates through the provided queue and generates the EE_Message objects.
	 *  When iterating through the queue, the queued item that served as the base for generating other EE_Message objects
	 *  gets removed and the new EE_Message objects get added to a NEW queue.  The NEW queue is then returned for the
	 *  caller to decide what to do with it.
	 *
	 * @param   bool    $save   Whether to save the EE_Message objects in the new queue or just return.
	 *
	 * @return EE_Messages_Queue  The new queue for holding generated EE_Message objects.
	 */
	public function generate( $save = true ) {
		//iterate through the messages in the queue, generate, and add to new queue.
		$this->_generation_queue->get_queue()->rewind();
		while ( $this->_generation_queue->get_queue()->valid() ) {
			//resent "current" properties
			$this->_reset_current_properties();

			/** @type EE_Message $msg */
			$msg = $this->_generation_queue->get_queue()->current();

			if ( $this->_verify() ) {
				//let's get generating!
				$this->_generate();
			}

			/**
			 * need to get the next object and capture it for setting manually after deletes.  The reason is that when
			 * an object is removed from the repo then valid for the next object will fail.
			 */
			$this->_generation_queue->get_queue()->next();
			$next_msg = $this->_generation_queue->get_queue()->current();
			//restore pointer to current item
			$this->_generation_queue->get_queue()->set_current( $msg );

			//if there are error messages then let's set the status and the error message.
			if ( $this->_error_msg ) {
				$msg->set_STS_ID( EEM_Message::status_failed );
				$msg->set_error_message(
					__( 'Message failed to generate for the following reasons: ' )
					. "\n"
					. implode( "\n", $this->_error_msg )
				);
				$msg->set_modified( time() );
			} else {
				//remove from db
				$this->_generation_queue->get_queue()->delete();
			}
			//next item
			$this->_generation_queue->get_queue()->set_current( $next_msg );
		}

		//generation queue is ALWAYS saved to record any errors in the generation process.
		$this->_generation_queue->save();

		/**
		 * save _ready_queue if flag set.
		 * Note: The EE_Message objects have values set via the EE_Base_Class::set_field_or_extra_meta() method.  This
		 * means if a field was added that is not a valid database column.  The EE_Message was already saved to the db
		 * so a EE_Extra_Meta entry could be created and attached to the EE_Message.  In those cases the save flag is
		 * irrelevant.
		 */
		if ( $save ) {
			$this->_ready_queue->save();
		}
		return $this->_ready_queue;
	}


	/**
	 * This resets all the properties used for holding "current" values corresponding to the current EE_Message object
	 * in the generation queue.
	 */
	protected function _reset_current_properties() {
		$this->_verified = false;
		$this->_current_messenger = $this->_current_message_type = $this->_current_data_handler = null;
	}





	/**
	 * This proceeds with the actual generation of a message.  By the time this is called, there should already be a
	 * $_current_data_handler set and all incoming information should be validated for the current EE_Message in the
	 * _generating_queue.
	 *
	 * @return bool Whether the message was successfully generated or not.
	 */
	protected function _generate() {
		//double check verification has run and that everything is ready to work with (saves us having to validate everything again).
		if ( ! $this->_verified ) {
			return false; //get out because we don't have a valid setup to work with.
		}


		try {
			$addressees = $this->_current_message_type->get_addressees(
				$this->_current_data_handler,
				$this->_generation_queue->get_queue()->current()->context()
			);
		} catch ( EE_Error $e ) {
			$this->_error_msg[] = $e->getMessage();
			return false;
		}


		//if no addressees then get out because there is nothing to generation (possible bad data).
		if ( ! $this->_valid_addressees( $addressees ) ) {
			$this->_error_msg[] = __( 'Unable to generate messages EE_Messages_Addressee objects.  There were no attendees prepared by the data handler.
			  Sometimes this is because messages only get generated for certain registration statuses. For example, the ticket notice message type only goes to
			  approved registrations.', 'event_espresso' );
			return false;
		}

		$mtpg = $this->_get_message_template_group();

		//in the unlikely event there is no EE_Message_Template_Group available, get out!
		if ( ! $mtpg instanceof EE_Message_Template_Group ) {
			$this->_error_msg[] = __( 'Unable to get the Message Templates for the Message being generated.  No message template group accessible.', 'event_espresso' );
			return false;
		}

		//get formatted templates for using to parse and setup EE_Message objects.
		$templates = $this->_get_templates( $mtpg );


		//setup new EE_Message objects (and add to _ready_queue)
		return $this->_assemble_messages( $addressees, $templates, $mtpg );
	}





	/**
	 * Retrieves the message template group being used for generating messages.
	 * Note: this also utilizes the EE_Message_Template_Group_Collection to avoid having to hit the db multiple times.
	 *
	 * @return EE_Message_Template_Group | null
	 */
	protected function _get_message_template_group() {
		//is there a GRP_ID already on the EE_Message object?  If there is, then a specific template has been requested
		//so let's use that.
		$GRP_ID = $this->_generation_queue->get_queue()->current()->GRP_ID();

		if ( $GRP_ID ) {
			//attempt to retrieve from repo first
			$GRP = $this->_template_collection->get_by_ID( $GRP_ID );
			if ( $GRP instanceof EE_Message_Template_Group ) {
				return $GRP;  //got it!
			}

			//nope don't have it yet.  Get from DB then add to repo
			$GRP = EEM_Message_Template_Group::instance()->get_one_by_ID( $GRP_ID );
			if ( $GRP instanceof EE_Message_Template_Group ) {
				$this->_template_collection->add( $GRP );
			}
			return $GRP;
		}

		//whatcha still doing here?  Oh, no Message Template Group yet I see.  Okay let's see if we can get it for you.

		//defaults
		$EVT_ID = 0;

		$template_qa = array(
			'MTP_is_active' => true,
			'MTP_messenger' => $this->_current_messenger->name,
			'MTP_message_type' => $this->_current_message_type->name,
		);

		//in vanilla EE we're assuming there's only one event.
		//However, if there are multiple events then we'll just use the default templates instead of different
		// templates per event (which could create problems).
		if ( count( $this->_current_data_handler->events ) === 1 ) {
			foreach ( $this->_current_data_handler->events as $event ) {
				$EVT_ID = $event['ID'];
			}
		}

		//before going any further, let's see if its in the queue
		$GRP = $this->_template_collection->get_by_key( $this->_template_collection->get_key( $this->_current_messenger->name, $this->_current_message_type->name, $EVT_ID ) );

		if ( $GRP instanceof EE_Message_Template_Group ) {
			return $GRP;
		}

		//nope still no GRP?
		//first we get the global template in case it has an override set.
		$global_template_qa = array_merge( array( 'MTP_is_global' => true ), $template_qa );
		$global_GRP = EEM_Message_Template_Group::instance()->get_one( array( $global_template_qa ) );

		//if this is an override, then we just return it.
		if ( $global_GRP instanceof EE_Message_Template_Group && $global_GRP->get( 'MTP_is_override' ) ) {
			$this->_template_collection->add( $global_GRP, $EVT_ID );
			return $global_GRP;
		}

		//STILL here? Okay that means we want to see if there is event specific group and if there is we return it,
		//otherwise we return the global group we retrieved.
		if ( $EVT_ID ) {
			$template_qa['Event.EVT_ID'] = $EVT_ID;
		}

		$GRP = EEM_Message_Template_Group::instance()->get_one( array( $template_qa ) );
		$GRP = $GRP instanceof EE_Message_Template_Group ? $GRP : $global_GRP;

		if ( $GRP instanceof EE_Message_Template_Group ) {
			$this->_template_collection->add( $GRP, $EVT_ID );
			return $GRP;
		}

		//nothing, nada, there ain't no group from what you fed the machine. (Getting here is a very hard thing to do).
		return null;
	}





	/**
	 *  Retrieves formatted array of template information for each context specific to the given  EE_Message_Template_Group
	 *
	 * @param   EE_Message_Template_Group
	 *
	 * @return  array   The returned array is in this structure:
	 *                  array(
	 *                      'field_name' => array(
	 *                          'context' => 'content'
	 *                      )
	 *                  )
	 */
	protected function _get_templates( EE_Message_Template_Group $mtpg ) {
		$templates = array();
		$context_templates = $mtpg->context_templates();
		foreach ( $context_templates as $context => $template_fields ) {
			foreach ( $template_fields as $template_field => $template_obj ) {
				if ( ! $template_obj instanceof EE_Message_Template ) {
					continue;
				}
				$templates[ $template_field ][ $context ] = $template_obj->get( 'MTP_content' );
			}
		}
		return $templates;
	}






	/**
	 * Assembles new fully generated EE_Message objects and adds to _ready_queue
	 *
	 * @param array $addressees  Array of EE_Messages_Addressee objects indexed by message type context.
	 * @param array $templates   formatted array of templates used for parsing data.
	 * @param EE_Message_Template_Group $mtpg
	 * @return bool   true if message generation went a-ok.  false if some sort of exception occurred.  Note: The method will
	 *                attempt to generate ALL EE_Message objects and add to the _ready_queue.  Successfully generated messages
	 *                get added to the queue with EEM_Message::status_idle, unsuccessfully generated messages will get added
	 *                to the queue as EEM_Message::status_failed.  Very rarely should "false" be returned from this method.
	 */
	protected function _assemble_messages( $addressees, $templates, EE_Message_Template_Group $mtpg ) {

		//if templates are empty then get out because we can't generate anything.
		if ( ! $templates ) {
			return false;
		}

		//We use this as the counter for generated messages because don't forget we may be executing this inside of a
		//generation_queue.  So _ready_queue may have generated EE_Message objects already.
		$generated_count = 0;
		foreach ( $addressees as $context => $recipients ) {
			foreach ( $recipients as $recipient ) {
				$message = $this->_setup_message_object( $context, $recipient, $templates, $mtpg );
				if ( $message instanceof EE_Message ) {
					$this->_ready_queue->add( $message, array(), $this->_generation_queue->get_queue()->is_preview(), $this->_generation_queue->get_queue()->is_test_send() );
					$generated_count++;
				}
			}
		}

		//if there are no generated messages then something else fatal went wrong.
		return $generated_count > 0;
	}





	/**
	 * @param string $context   The context for the generated message.
	 * @param EE_Messages_Addressee $recipient
	 * @param array  $templates  formatted array of templates used for parsing data.
	 * @param EE_Message_Template_Group $mtpg
	 * @return EE_Message | bool  (false is used when no EE_Message is generated)
	 */
	protected function _setup_message_object( $context, EE_Messages_Addressee $recipient, $templates, EE_Message_Template_Group $mtpg ) {
		//stuff we already know
		$transaction_id = $recipient->txn instanceof EE_Transaction ? $recipient->txn->ID() : 0;
		$transaction_id = empty( $transaction_id ) && $this->_current_data_handler->txn instanceof EE_Transaction ? $this->_current_data_handler->txn->ID() : $transaction_id;
		$message_fields = array(
			'GRP_ID' => $mtpg->ID(),
			'TXN_ID' => $transaction_id,
			'MSG_messenger' => $this->_current_messenger->name,
			'MSG_message_type' => $this->_current_message_type->name,
			'MSG_context' => $context,
			'MSG_priority' => $this->_generation_queue->get_queue()->current()->priority(),
		);

		//recipient id and type should be on the EE_Messages_Addressee object but if this is empty, let's try to grab the
		//info from the att_obj found in the EE_Messages_Addressee object.
		if ( empty( $recipient->recipient_id ) || empty( $recipient->recipient_type ) ) {
			$message_fields['MSG_recipient_ID'] = $recipient->att_obj instanceof EE_Attendee ? $recipient->att_obj->ID() : 0;
			$message_fields['MSG_recipient_type'] = 'Attendee';
		} else {
			$message_fields['MSG_recipient_ID'] = $recipient->recipient_id;
			$message_fields['MSG_recipient_type'] = $recipient->recipient_type;
		}
		$message = EE_Message_Factory::create( $message_fields );

		//grab valid shortcodes for shortcode parser
		$mt_shortcodes = $this->_current_message_type->get_valid_shortcodes();
		$m_shortcodes = $this->_current_messenger->get_valid_shortcodes();

		//if the 'to' field is empty (messages will ALWAYS have a "to" field, then we get out because that means this
		//context is turned off) EXCEPT if we're previewing
		if ( empty( $templates['to'][ $context ] )
		     && ! $this->_generation_queue->get_queue()->is_preview()
		     && ! $this->_current_messenger->allow_empty_to_field() ) {
			//we silently exit here and do NOT record a fail because the message is "turned off" by having no "to" field.
			return false;
		}
		$error_msg = array();
		foreach ( $templates as $field => $ctxt ) {
			$error_msg = array();
			//let's setup the valid shortcodes for the incoming context.
			$valid_shortcodes = $mt_shortcodes[ $context ];
			//merge in valid shortcodes for the field.
			$shortcodes = isset($m_shortcodes[ $field ]) ? $m_shortcodes[ $field ] : $valid_shortcodes;
			if ( isset( $templates[ $field ][ $context ] ) ) {
				//prefix field.
				$column_name = 'MSG_' . $field;
				try {
					$content = $this->_shortcode_parser->parse_message_template(
						$templates[ $field ][ $context ],
						$recipient,
						$shortcodes,
						$this->_current_message_type,
						$this->_current_messenger,
						$message );
					$message->set_field_or_extra_meta( $column_name, $content );
				} catch ( EE_Error $e ) {
					$error_msg[] = sprintf( __( 'There was a problem generating the content for the field %s: %s', 'event_espresso' ), $field, $e->getMessage() );
					$message->set_STS_ID( EEM_Message::status_failed );
				}
			}
		}

		if ( $message->STS_ID() === EEM_Message::status_failed ) {
			$error_msg = __( 'There were problems generating this message:', 'event_espresso' ) . "\n" . implode( "\n", $error_msg );
			$message->set_error_message( $error_msg );
		} else {
			$message->set_STS_ID( EEM_Message::status_idle );
		}
		return $message;
	}



	/**
	 * This verifies that the incoming array has a EE_Messenger object and a EE_message_type object and sets appropriate
	 * error message if either is missing.
	 *
	 * @return bool         true means there were no errors, false means there were errors.
	 */
	protected function _verify() {
		//reset error message to an empty array.
		$this->_error_message = array();
		$valid = true;
		$valid = $valid ? $this->_validate_messenger_and_message_type() : $valid;
		$valid = $valid ? $this->_validate_and_setup_data() : $valid;

		//set the verified flag so we know everything has been validated.
		$this->_verified = $valid;

		return $valid;
	}


	/**
	 * This accepts an array and validates that it is an array indexed by context with each value being an array of
	 * EE_Messages_Addressee objects.
	 *
	 * @param array $addressees  Keys correspond to contexts for the message type and values are EE_Messages_Addressee[]
	 * @return bool
	 */
	protected function _valid_addressees( $addressees ) {
		if ( ! $addressees || ! is_array( $addressees ) ) {
			return false;
		}

		foreach( $addressees as $addressee_array ) {
			foreach ( $addressee_array as $addressee ) {
				if ( ! $addressee instanceof EE_Messages_Addressee ) {
					return false;
				}
			}
		}
		return true;
	}





	/**
	 * This validates the messenger, message type, and presences of generation data for the current EE_Message in the queue.
	 * This process sets error messages if something is wrong.
	 *
	 * @return bool   true is if there are no errors.  false is if there is.
	 */
	protected function _validate_messenger_and_message_type() {

		//first are there any existing error messages?  If so then return.
		if ( $this->_error_msg ) {
			return false;
		}

		$validated_for_use = $this->_EEMSG->validate_for_use( $this->_generation_queue->get_queue()->current() );

		if ( ! isset( $validated_for_use['messenger'] ) || ! $validated_for_use['messenger'] instanceof EE_Messenger ) {
			$this->_error_msg[] = sprintf( __( 'The %s Messenger is not active.', 'event_espresso' ), $this->_generation_queue->get_queue()->current()->messenger() );
		} else {
			$this->_current_messenger = $validated_for_use['messenger'];
		}

		if ( ! isset( $validated_for_use['message_type'] ) || ! $validated_for_use['message_type'] instanceof EE_message_type ) {
			$this->_error_msg[] = sprintf( __( 'The %s Message Type is not active.', 'event_espresso' ), $this->_generation_queue->get_queue()->current()->message_type() );
		} else {
			$this->_current_message_type = $validated_for_use['message_type'];
		}

		/**
		 * Check if there is any generation data, but only if this is not for a preview.
		 */
		if ( ! $this->_generation_queue->get_queue()->get_generation_data()
		     && (
			     ! $this->_generation_queue->get_queue()->is_preview()
			     && $this->_generation_queue->get_queue()->get_data_handler() !== 'EE_Messages_Preview_incoming_data' )
		) {
			$this->_error_msg[] = __( 'There is no generation data for this message. Unable to generate.' );
		}

		return empty( $this->_error_msg );
	}





	/**
	 * This method retrieves the expected data handler for the message type and validates the generation data for that
	 * data handler.
	 *
	 * @return bool true means there are no errors.  false means there were errors (and handler did not get setup).
	 */
	protected function _validate_and_setup_data() {

		//First, are there any existing error messages?  If so, return because if there were errors elsewhere this can't
		//be used anyways.
		if ( $this->_error_msg ) {
			return false;
		}

		$generation_data = $this->_generation_queue->get_queue()->get_generation_data();

		$data_handler_class_name = $this->_generation_queue->get_queue()->get_data_handler()
			? $this->_generation_queue->get_queue()->get_data_handler()
			: 'EE_Messages_' .  $this->_current_message_type->get_data_handler( $generation_data ) . '_incoming_data';



		//If this EE_Message is for a preview, then let's switch out to the preview data handler.
		if ( $this->_generation_queue->get_queue()->is_preview() ) {
			$data_handler_class_name  = 'EE_Messages_Preview_incoming_data';
		}

		//First get the class name for the data handler (and also verifies it exists.
		if ( ! class_exists( $data_handler_class_name ) ) {
			$this->_error_msg[] = sprintf(
				__('The included data handler class name does not match any valid, accessible, "EE_Messages_incoming_data" classes.  Looking for %s.', 'event_espresso'),
				$data_handler_class_name );
			return false;
		}

		//convert generation_data for data_handler_instantiation.
		$generation_data = $data_handler_class_name::convert_data_from_persistent_storage( $generation_data );

		//note, this may set error messages as well.
		$this->_set_data_handler( $generation_data, $data_handler_class_name  );

		return empty( $this->_error_msg );
	}





	/**
	 * Sets the $_current_data_handler property that is used for generating the current EE_Message in the queue, and
	 * adds it to the _data repository.
	 *
	 * @param mixed     $generating_data        This is data expected by the instantiated data handler.
	 * @param string    $data_handler_class_name This is the reference string indicating what data handler is being
	 *                                          instantiated.
	 *
	 * @return void.
	 */
	protected function _set_data_handler( $generating_data, $data_handler_class_name ) {
		//valid classname for the data handler.  Now let's setup the key for the data handler repository to see if there
		//is already a ready data handler in the repository.
		$this->_current_data_handler = $this->_data_handler_collection->get_by_key( $this->_data_handler_collection->get_key( $data_handler_class_name, $generating_data ) );
		if ( ! $this->_current_data_handler instanceof EE_messages_incoming_data ) {
			//no saved data_handler in the repo so let's set one up and add it to the repo.
			try {
				$this->_current_data_handler = new $data_handler_class_name( $generating_data );
				$this->_data_handler_collection->add( $this->_current_data_handler, $generating_data );
			} catch( EE_Error $e ) {
				$this->_error_msg[] = $e->get_error();
			}
		}
	}





	/**
	 * The queued EE_Message for generation does not save the data used for generation as objects
	 * because serialization of those objects could be problematic if the data is saved to the db.
	 * So this method calls the static method on the associated data_handler for the given message_type
	 * and that preps the data for later instantiation when generating.
	 *
	 * @param EE_Message_To_Generate $mtg
	 * @param bool                   $preview       Indicate whether this is being used for a preview or not.
	 * @return mixed Prepped data for persisting to the queue.  false is returned if unable to prep data.
	 */
	protected function _prepare_data_for_queue( EE_Message_To_Generate $mtg, $preview ) {
		$data_handler = $mtg->get_data_handler_class_name( $preview );
		if ( ! $mtg->valid() ) {
			return false; //unable to get the data because the info in the EE_Message_To_Generate class is invalid.
		}
		return $data_handler::convert_data_for_persistent_storage( $mtg->data );
	}





	/**
	 * This sets up a EEM_Message::status_incomplete EE_Message object and adds it to the generation queue.
	 * @param EE_Message_To_Generate    $mtg
	 * @param bool                      $test_send  Whether this is just a test send or not.  Typically used for previews.
	 */
	public function create_and_add_message_to_queue( EE_Message_To_Generate $mtg, $test_send = false ) {
		//prep data
		$data = $this->_prepare_data_for_queue( $mtg, $mtg->preview );

		$message = $mtg->get_EE_Message();

		//is there a GRP_ID in the request?
		if ( $GRP_ID = EE_Registry::instance()->REQ->get( 'GRP_ID' ) ) {
			$message->set_GRP_ID( $GRP_ID );
		}

		if ( $data === false ) {
			$message->set_STS_ID( EEM_Message::status_failed );
			$message->set_error_message( __( 'Unable to prepare data for persistence to the database.', 'event_espresso' ) );
		} else {
			//make sure that the data handler is cached on the message as well
			$data['data_handler_class_name'] = $mtg->get_data_handler_class_name();
		}

		$this->_generation_queue->add( $message, $data, $mtg->preview, $test_send );
	}



} //end EE_Messages_Generator