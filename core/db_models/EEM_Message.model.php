<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Message Model
 *
 * @package			Event Espresso
 * @subpackage		models
 * @author			Mike Nelson
 */
class EEM_Message extends EEM_Base {

	// private instance of the Message object
	protected static $_instance = null;


	/**
	 * priority constants.
	 */
	const priority_high = 0;
	const priority_medium = 1;
	const priority_low = 2;

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
	 * indicates the message was successfully resent at the time modified
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

		$this->_tables = array(
			'Message'=>new EE_Primary_Table('esp_message','MSG_ID')
		);

		$allowed_priority = array(
			self::priority_high,
			self::priority_medium,
			self::priority_low
		);

		$this->_fields = array(
			'Message'=>array(
				'MSG_ID'=>new EE_Primary_Key_Int_Field('MSG_ID', __('Message ID','event_espresso')),
				'GRP_ID'=>new EE_Foreign_Key_Int_Field( 'GRP_ID', __('Foreign key to the EEM_Message_Template_Group table.', 'event_espresso' ), false, 0, 'Message_Template_Group' ),
				'MSG_messenger' => new EE_Plain_Text_Field('MSG_messenger', __( 'Corresponds to the EE_messenger::name used to send this message. This will also be used to attempt any resends of the message.', 'event_espresso' ), false ),
				'MSG_message_type' => new EE_Plain_Text_Field( 'MSG_message_type', __( 'Corresponds to the EE_message_type::name used to generate this message.', 'event_espresso' ), false ),
				'MSG_context' => new EE_Plain_Text_Field( 'MSG_context', __( 'Context', 'event_espresso' ), false ),
				'MSG_recipient_ID' => new EE_Foreign_Key_Int_Field( 'MSG_recipient_ID', __( 'Recipient ID', 'event_espresso' ), true, null, array( 'Registration', 'Attendee' ) ),
				'MSG_recipient_type' => new EE_Any_Foreign_Model_Name_Field( 'MSG_recipient_type', __( 'Recipient Type', 'event_espresso' ), true, null, array( 'Registration', 'Attendee' ) ),
				'MSG_content' => new EE_Full_HTML_Field( 'MSG_content', __( 'Content', 'event_espresso' ), false, '' ),
				'MSG_address_to' => new EE_Plain_Text_Field( 'MSG_address_to', __( 'Address To', 'event_espresso' ), true ),
				'MSG_address_from' => new EE_Plain_Text_Field( 'MSG_address_from', __( 'Address From', 'event_espresso' ), true ),
				'MSG_subject' => new EE_Full_Html_Field( 'MSG_subject', __( 'Subject', 'event_espresso' ), true, '' ),
				'MSG_priority' => new EE_Enum_Integer_Field( 'MSG_priority', __( 'Priority', 'event_espresso' ), false, self::priority_medium, $allowed_priority ),
				'STS_ID' => new EE_Foreign_Key_String_Field( 'STS_ID', __( 'Status', 'event_espresso' ), false, self::status_idle, 'Status' ),
				'MSG_created' => new EE_Datetime_Field( 'MSG_created', __( 'Created', 'event_espresso' ), false, time() ),
				'MSG_modified' => new EE_Datetime_Field( 'MSG_modified', __( 'Modified', 'event_espresso' ), true, time() )
			)
		);
		$this->_model_relations = array(
			'Attendee' => new EE_Belongs_To_Any_Relation(),
			'Registration' => new EE_Belongs_To_Any_Relation(),
			'Message_Template_Group' => new EE_Belongs_To_Relation()
		);
		parent::__construct( $timezone );
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
			'STS_ID' => array( 'IN', $this->stati_indicating_sent() ) ) ) );
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
			'STS_ID' => array( 'IN', $this->stati_indicating_sent() ) ) ) );
	}


	/**
	 * Returns stati that indicate the message HAS been sent
	 * @return array of strings for possible stati
	 */
	public function stati_indicating_sent(){
		return apply_filters( 'FHEE__EEM_Message__stati_indicating_sent', array( self::status_sent, self::status_retry ) );
	}

}
// End of file EEM_Message.model.php
// Location: /includes/models/EEM_Message.model.php
