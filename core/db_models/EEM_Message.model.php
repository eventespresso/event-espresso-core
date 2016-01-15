<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Message Model
 *
 * @package			Event Espresso
 * @subpackage		models
 * @author			Darren Ethier
 */
class EEM_Message extends EEM_Base implements EEI_Query_Filter {

	// private instance of the Message object
	protected static $_instance = null;


	/**
	 * This priority indicates a message should be generated and sent ASAP
	 * @type int
	 */
	const priority_high = 10;




	/**
	 * This priority indicates a message should be generated ASAP and queued for sending.
	 * @type
	 */
	const priority_medium = 20;




	/**
	 * This priority indicates a message should be queued for generating.
	 * @type int
	 */
	const priority_low = 30;



	/**
	 * indicates this message was sent at the time modified
	 */
	const status_sent = 'MSN';


	/**
	 * indicates this message is waiting to be sent
	 */
	const status_idle = 'MID';


	/**
	 * indicates an attempt was a made to send this message
	 * at the scheduled time, but it failed at the time modified
	 */
	const status_failed = 'MFL';


	/**
	 * indicates the message has been flagged for resending (at the time modified).
	 */
	const status_resend = 'MRS';


	/**
	 * indicates the message has been flagged for generation but has not been generated yet.  Messages always start as this
	 * status when added to the queue.
	 */
	const status_incomplete = 'MIC';




	/**
	 * Indicates everything was generated fine for the message, however, the messenger was unable to send.
	 * This status means that its possible to retry sending the message.
	 */
	const status_retry = 'MRT';





	/**
	 *	Private constructor to prevent direct creation.
	 *
	 * @param string $timezone string representing the timezone we want to set for returned Date Time Strings (and
	 *                         any incoming timezone data that gets saved).  Note this just sends the timezone info to the
	 *                         date time model field objects.  Default is null (and will be assumed using the set timezone
	 *                         in the 'timezone_string' wp option)
	 *
	 * @return EEM_Message
	 */
	protected function __construct( $timezone = null ) {
		$this->singular_item = __('Message','event_espresso');
		$this->plural_item = __('Messages','event_espresso');

		//used for token generator
		EE_Registry::instance()->load_helper( 'URL' );

		$this->_tables = array(
			'Message'=>new EE_Primary_Table('esp_message','MSG_ID')
		);

		$allowed_priority = array(
			self::priority_high => __( 'high', 'event_espresso' ),
			self::priority_medium => __( 'medium', 'event_espresso' ),
			self::priority_low => __( 'low', 'event_espresso' )
		);

		$this->_fields = array(
			'Message'=>array(
				'MSG_ID'=>new EE_Primary_Key_Int_Field('MSG_ID', __('Message ID','event_espresso')),
				'MSG_token' => new EE_Plain_Text_Field( 'MSG_token', __('Unique Token used to represent this row in publicly viewable contexts (eg. a url).', 'event_espresso' ), false, EEH_URL::generate_unique_token() ),
				'GRP_ID'=>new EE_Foreign_Key_Int_Field( 'GRP_ID', __('Foreign key to the EEM_Message_Template_Group table.', 'event_espresso' ), true, 0, 'Message_Template_Group' ),
				'TXN_ID' => new EE_Foreign_Key_Int_Field( 'TXN_ID', __( 'Foreign key to the related EE_Transaction.  This is required to give context for regenerating the specific message', 'event_espresso' ), true, 0, 'Transaction' ),
				'MSG_messenger' => new EE_Plain_Text_Field('MSG_messenger', __( 'Corresponds to the EE_Messenger::name used to send this message. This will also be used to attempt any resending of the message.', 'event_espresso' ), false, 'email' ),
				'MSG_message_type' => new EE_Plain_Text_Field( 'MSG_message_type', __( 'Corresponds to the EE_message_type::name used to generate this message.', 'event_espresso' ), false, 'receipt' ),
				'MSG_context' => new EE_Plain_Text_Field( 'MSG_context', __( 'Context', 'event_espresso' ), false ),
				'MSG_recipient_ID' => new EE_Foreign_Key_Int_Field( 'MSG_recipient_ID', __( 'Recipient ID', 'event_espresso' ), true, null, array( 'Registration', 'Attendee', 'WP_User' ) ),
				'MSG_recipient_type' => new EE_Any_Foreign_Model_Name_Field( 'MSG_recipient_type', __( 'Recipient Type', 'event_espresso' ), true, null, array( 'Registration', 'Attendee', 'WP_User' ) ),
				'MSG_content' => new EE_Maybe_Serialized_Text_Field( 'MSG_content', __( 'Content', 'event_espresso' ), true, '' ),
				'MSG_to' => new EE_Maybe_Serialized_Text_Field( 'MSG_to', __( 'Address To', 'event_espresso' ), true ),
				'MSG_from' => new EE_Maybe_Serialized_Text_Field( 'MSG_from', __( 'Address From', 'event_espresso' ), true ),
				'MSG_subject' => new EE_Maybe_Serialized_Text_Field( 'MSG_subject', __( 'Subject', 'event_espresso' ), true, '' ),
				'MSG_priority' => new EE_Enum_Integer_Field( 'MSG_priority', __( 'Priority', 'event_espresso' ), false, self::priority_low, $allowed_priority ),
				'STS_ID' => new EE_Foreign_Key_String_Field( 'STS_ID', __( 'Status', 'event_espresso' ), false, self::status_incomplete, 'Status' ),
				'MSG_created' => new EE_Datetime_Field( 'MSG_created', __( 'Created', 'event_espresso' ), false, time() ),
				'MSG_modified' => new EE_Datetime_Field( 'MSG_modified', __( 'Modified', 'event_espresso' ), true, time() )
			)
		);
		$this->_model_relations = array(
			'Attendee' => new EE_Belongs_To_Any_Relation(),
			'Registration' => new EE_Belongs_To_Any_Relation(),
			'WP_User' => new EE_Belongs_To_Any_Relation(),
			'Message_Template_Group' => new EE_Belongs_To_Relation(),
			'Transaction' => new EE_Belongs_To_Relation()
		);
		parent::__construct( $timezone );
	}



	/**
	 * @return \EE_Message
	 */
	public function create_default_object() {
		/** @type EE_Message $message */
		$message = parent::create_default_object();
		if ( $message instanceof EE_Message ) {
			return EE_Message_Factory::set_messenger_and_message_type( $message );
		}
		return null;
	}



	/**
	 * @param mixed $cols_n_values
	 * @return \EE_Message
	 */
	public function instantiate_class_from_array_or_object( $cols_n_values ) {
		/** @type EE_Message $message */
		$message = parent::instantiate_class_from_array_or_object( $cols_n_values );
		if ( $message instanceof EE_Message ) {
			return EE_Message_Factory::set_messenger_and_message_type( $message );
		}
		return null;
	}



	/**
	 * Returns whether or not a message of that type was sent for a given attendee.
	 * @param EE_Attendee|int $attendee
	 * @param string $message_type the message type slug
	 * @return boolean
	 */
	public function message_sent_for_attendee( $attendee, $message_type ) {
		$attendee_ID = EEM_Attendee::instance()->ensure_is_ID( $attendee );
		return $this->exists( array( array(
			'Attendee.ATT_ID' => $attendee_ID,
			'MSG_message_type' => $message_type,
			'STS_ID' => array( 'IN', $this->stati_indicating_sent() )
		) ) );
	}




	/**
	 * Returns whether or not a message of that type was sent for a given registration
	 * @param EE_Registration|int $registration
	 * @param string $message_type the message type slug
	 * @return boolean
	 */
	public function message_sent_for_registration( $registration, $message_type ) {
		$registrationID = EEM_Registration::instance()->ensure_is_ID( $registration );
		return $this->exists( array( array(
			'Registration.REG_ID' => $registrationID,
			'MSG_message_type' => $message_type,
			'STS_ID' => array( 'IN', $this->stati_indicating_sent() )
		) ) );
	}




	/**
	 * This retrieves an EE_Message object from the db matching the given token string.
	 * @param string $token
	 * @return EE_Message | null
	 */
	public function get_one_by_token( $token ) {
		return $this->get_one( array( array(
			'MSG_token' => $token
		) ) );
	}


	/**
	 * Returns stati that indicate the message HAS been sent
	 * @return array of strings for possible stati
	 */
	public function stati_indicating_sent(){
		return apply_filters( 'FHEE__EEM_Message__stati_indicating_sent', array( self::status_sent ) );
	}




	/**
	 * Returns stati that indicate the message is waiting to be sent.
	 * @return array of strings for possible stati.
	 */
	public function stati_indicating_to_send() {
		return apply_filters( 'FHEE__EEM_Message__stati_indicating_to_send', array( self::status_idle, self::status_resend ) );
	}



	public function stati_indicating_failed_sending() {
		return apply_filters( 'FHEE__EEM_Message__stati_indicating_failed_sending', array( self::status_failed, self::status_retry ) );
	}




	/**
	 * Returns filterable array of all EEM_Message statuses.
	 * @return array
	 */
	public function all_statuses() {
		return apply_filters(
			'FHEE__EEM_Message__all_statuses',
			array(
				EEM_Message::status_sent,
				EEM_Message::status_incomplete,
				EEM_Message::status_idle,
				EEM_Message::status_resend,
				EEM_Message::status_retry,
				EEM_Message::status_failed,
			)
		);
	}

	/**
	 * Detects any specific query variables in the request and uses those to setup appropriate
	 * filter for any queries.
	 * @return array
	 */
	public function filter_by_query_params() {
		//expected possible query_vars, the key in this array matches an expected key in the request, the value, matches
		//the corresponding EEM_Base child reference.
		$expected_vars = array(
			'_REG_ID' => 'Registration',
			'ATT_ID' => 'Attendee',
			'ID' => 'WP_User',
			'TXN_ID' => 'Transaction',
			'EVT_ID' => 'Event',
		);
		$query_params[0] = array();
		EE_Registry::instance()->load_class( 'Request_Handler' );
		foreach ( $expected_vars as $request_key => $model_name ) {
			if ( $request_value = EE_Registry::instance()->REQ->get( $request_key ) ) {
				//special case
				if ( $request_key === '_REG_ID' ) {
					$query_params[0]['AND**filter_by']['OR**filter_by'] = array(
						'Registration.REG_ID' => $request_value,
						'Attendee.Registration.REG_ID' => $request_value,
					);
					continue;
				}
				if ( $request_key === 'EVT_ID' ) {
					$query_params[0]['AND**filter_by']['OR**filter_by'] = array(
						'Registration.EVT_ID' => $request_value,
						'Attendee.Registration.EVT_ID' => $request_value,
					);
					continue;
				}
				$query_params[0][ $model_name . '.' . $request_key ] = EE_Registry::instance()->REQ->get( $request_key );
			}
		}
		return $query_params;
	}


}
// End of file EEM_Message.model.php
// Location: /includes/models/EEM_Message.model.php
