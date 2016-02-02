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
class EE_Message_To_Generate_From_Request extends EE_Message_To_Generate implements EEI_Has_Sending_Messenger {


	/**
	 * This messenger is used to send the generated message.
	 *
	 * @type EE_messenger
	 */
	protected $_sending_messenger = '';


	/**
	 * Holds the token from the request.
	 * @type string
	 */
	public $token = '';


	/**
	 * Constructor
	 * This instantiates the object using arguments from the given request and calling the parent constructor.
	 *
	 * @param   EE_Message_Resource_Manager $message_resource_manager
	 * @param   EE_Request_Handler 			$request
	 */
	public function __construct( EE_Message_Resource_Manager $message_resource_manager, EE_Request_Handler $request ) {
		parent::__construct(
			$request->get( 'gen_msgr' ),
			$request->get( 'message_type' ),
			array(),
			$request->get( 'context' )
		);
		if ( ! $this->valid() ) {
			return;
		}
		$this->_sending_messenger = $message_resource_manager->get_active_messenger( $request->get( 'snd_msgr' ) );
		$this->token = $request->get( 'token' );
		$this->_validate_request();
		$this->_data = $this->_get_data_from_request( $request->get( 'id' ) );
	}




	/**
	 * @return EE_messenger
	 */
	public function sending_messenger() {
		return $this->_sending_messenger;
	}



	/**
	 * This validates set properties from the incoming request.
	 * @throws EE_Error
	 */
	protected function _validate_request() {
		if (
			! $this->_sending_messenger instanceof EE_messenger
			|| ! $this->_messenger instanceof EE_messenger
			|| ! $this->_message_type instanceof EE_message_type
			|| empty( $this->_context )
			|| empty( $this->token )
		) {
			throw new EE_Error( __( 'The request for the "msg_url_trigger" route has a malformed url.', 'event_espresso' ) );
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
		//use incoming data from url to setup data for the message type requirements
		return $this->_message_type->get_data_for_context( $this->_context, $registration, $data_id );
	}


} //end class EE_Message_To_Generate_From_Url