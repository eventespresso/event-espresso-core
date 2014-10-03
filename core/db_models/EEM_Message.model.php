<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) exit('No direct script access allowed');
/**
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package			Event Espresso
 * @ author				Seth Shoultes
 * @ copyright		(c) 2008-2011 Event Espresso  All Rights Reserved.
 * @ license			http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link					http://www.eventespresso.com
 * @ version		 	4.0
 *
 * ------------------------------------------------------------------------
 *
 * Message Model
 *
 * @package			Event Espresso
 * @subpackage		includes/models/
 * @author				Mike Nelson
 *
 * ------------------------------------------------------------------------
 */
require_once ( EE_MODELS . 'EEM_Base.model.php' );


class EEM_Message extends EEM_Base {

  	// private instance of the Message object
	private static $_instance = NULL;

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
	 *		private constructor to prevent direct creation
	 *		@Constructor
	 *		@access protected
	 *		@param string $timezone string representing the timezone we want to set for returned Date Time Strings (and any incoming timezone data that gets saved).  Note this just sends the timezone info to the date time model field objects.  Default is NULL (and will be assumed using the set timezone in the 'timezone_string' wp option)
	 *		@return void
	 */
	protected function __construct( $timezone ) {
		$this->singular_item = __('Message','event_espresso');
		$this->plural_item = __('Messages','event_espresso');

		$this->_tables = array(
			'Message'=>new EE_Primary_Table('esp_message','TXN_ID')
		);

		$allowed_stati = array(
			self::priority_high,
			self::priority_medium,
			self::priority_low
		);

		$this->_fields = array(
			'Message'=>array(
				'MSG_ID'=>new EE_Primary_Key_Int_Field('MSG_ID', __('Message ID','event_espresso')),
				'MSG_messenger' => new EE_Plain_Text_Field('MSG_messenger', __( 'Messenger', 'event_espresso' ), FALSE ),
				'MSG_message_type' => new EE_Plain_Text_Field( 'MSG_message_type', __( 'Message Type', 'event_espresso' ), FALSE ),
				'MSG_context' => new EE_Plain_Text_Field( 'MSG_context', __( 'Context', 'event_espresso' ), FALSE ),
				'MSG_recipient_ID' => new EE_Foreign_Key_String_Field( 'MSG_recipient_ID', __( 'Recipient ID', 'event_espresso' ), TRUE, NULL, array( 'Attendee' ) ),
				'MSG_recipient_type' => new EE_Any_Foreign_Model_Name_Field( 'MSG_recipient_type', __( 'Recipient Type', 'event_espresso' ), TRUE, NULL, array('Attendee' ) ),
				'MSG_content' => new EE_Full_HTML_Field( 'MSG_content', __( 'Content', 'event_espresso' ), FALSE, '' ),
				'MSG_address_to' => new EE_Plain_Text_Field( 'MSG_address_to', __( 'Address To', 'event_espresso' ), TRUE ),
				'MSG_address_from' => new EE_Plain_Text_Field( 'MSG_address_from', __( 'Address From', 'event_espresso' ), TRUE ),
				'MSG_priority' => new EE_Enum_Integer_Field( 'MSG_priority', __( 'Priority', 'event_espresso' ), FALSE, self::priority_medium, $allowed_stati ),
				'STS_ID' => new EE_Foreign_Key_String_Field( 'STS_ID', __( 'Status', 'event_espresso' ), FALSE, self::status_idle, 'Status' ),
				'MSG_created' => new EE_Datetime_Field( 'MSG_created', __( 'Created', 'event_espresso' ), FALSE, current_time('timestamp' ) ),
				'MSG_modified' => new EE_Datetime_Field( 'MSG_modified', __( 'Modifieid', 'event_espresso' ), TRUE, current_time('timestamp') )
			)
		);
		$this->_model_relations = array(
			'Attendee'=>new EE_Belongs_To_Any_Relation(),
		);
		parent::__construct( $timezone );

	}




	/**
	 *		This function is a singleton method used to instantiate the Espresso_model object
	 *
	 *		@access public
	 *		@param string $timezone string representing the timezone we want to set for returned Date Time Strings (and any incoming timezone data that gets saved).  Note this just sends the timezone info to the date time model field objects.  Default is NULL (and will be assumed using the set timezone in the 'timezone_string' wp option)
	 *		@return EEM_Message instance
	 */
	public static function instance( $timezone = NULL ){

		// check if instance of Espresso_model already exists
		if ( self::$_instance === NULL ) {
			// instantiate Espresso_model
			self::$_instance = new self( $timezone );
		}

		//we might have a timezone set, let set_timezone decide what to do with it
		self::$_instance->set_timezone( $timezone );

		// Espresso_model object
		return self::$_instance;
	}



	/**
	 * resets the model and returns it
	 * @return EEM_Message
	 */
	public static function reset( $timezone = NULL ){
		self::$_instance = NULL;
		return self::instance( $timezone );
	}

	/**
	 * Returns whether or not a message of that type was sent for that attendee
	 * @param EE_Attendee|int $attendee
	 * @param string $message_type the message type slug
	 * @return boolean
	 */
	public function message_sent( $attendee, $message_type ){
		$attendee_ID = EEM_Attendee::instance()->ensure_is_ID( $attendee );
		return $this->exists( array( array(
			'Attendee.ATT_ID' => $attendee_ID,
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
