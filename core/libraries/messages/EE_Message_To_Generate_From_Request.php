<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }

/**
 * This class is the signature for an object representing prepped message for queueing.
 * The difference with this class from its parent, is that it contains info from a url.  Thus it has the following differences:
 *
 * - Includes a sending messenger
 * - Data is prepped from the corresponding message type.
 *
 *
 * @package    Event Espresso
 * @subpackage messages
 * @author     Darren Ethier
 * @since      4.9.0
 */
class EE_Message_To_Generate_From_Request extends EE_Message_To_Generate {


	/**
	 * This messenger is used to send the generated messenger.
	 * @type string
	 */
	public $sending_messenger = '';


	/**
	 * Holds the token from the request.
	 * @type string
	 */
	public $token = '';


	/**
	 * Constructor
	 * This doesn't receive any params because they are derived from the request object.
	 * @param   EE_messages $ee_msg
	 * @param   EE_Request_Handler $request
	 */
	public function __construct( EE_messages $ee_msg, EE_Request_Handler $request ) {
		$this->_instantiate_from_request( $ee_msg, $request );
	}



	/**
	 * This instantiates the object from the given request by grabbing required arguments from the request and calling the
	 * parent constructor.
	 * @param EE_messages $ee_msg
	 * @param EE_Request_Handler $request
	 */
	protected function _instantiate_from_request( EE_messages $ee_msg, EE_Request_Handler $request ) {
		parent::__construct( $request->get('gen_msgr'), $request->get('message_type'), array(), $ee_msg, $request->get('context') );
		if ( ! $this->valid() ) {
			return false;
		}
		$this->sending_messenger = $request->get('snd_msgr');
		$this->token = $request->get('token');
		$this->_validate_request();
		$this->data = $this->_get_data_from_request( $request->get('id') );
	}





	/**
	 * This validates set properties from the incoming request.
	 * @throws EE_Error
	 */
	protected function _validate_request() {
		if ( empty( $this->sending_messenger )
		     || empty( $this->messenger )
		     || empty( $this->message_type )
		     || empty( $this->context )
			 || empty( $this->token ) ) {
			throw new EE_Error( __( 'The request for the "msg_url_trigger" route has a malformed url.', 'event_espresso' ) );
			return;
		}
	}




	/**
	 * This returns the data property according to what is expected from the request.
	 * @param $id
	 * @throws EE_Error
	 * @return mixed (whatever the data is returned from the message type).
	 */
	protected function _get_data_from_request( $id ) {
		//get the EE_Registration from the token
		/** @type EE_Registration $registration */
		$registration = EEM_Registration::instance()->get_one( array( array( 'REG_url_link' => $this->token ) ) );
		//if no registration then bail early.
		if ( ! $registration instanceof EE_Registration ) {
			throw new EE_Error( __( 'Unable to complete the request because the token is invalid.', 'event_espresso' ) );
			return;
		}

		return $this->_get_data_to_use( $registration, $id );
	}



	/**
	 * This uses the set message type to retrieve the data in the correct format as it came from the url.
	 * @throws EE_Error
	 * @param EE_Registration $registration
	 * @param int             $data_id   This is sometimes used for secondary data a message type requires.
	 * @return mixed   Data prepared as needed for generating this message.
	 */
	protected function _get_data_to_use( $registration, $data_id ) {
		$message_type = $this->_EEMSG->get_active_message_type( $this->messenger, $this->message_type );
		//if no message type then it likely isn't active for this messenger.
		if ( ! $message_type instanceof EE_message_type ) {
			throw new EE_Error( sprintf( __('Unable to get data for the %s message type, likely because it is not active for the %s messenger.', 'event_espresso'), $message_type->name, $this->messenger ) );
		}
		//use incoming data from url to setup data for the message type requirements
		return $message_type->get_data_for_context( $this->context, $registration, $data_id );
	}


} //end class EE_Message_To_Generate_From_Url