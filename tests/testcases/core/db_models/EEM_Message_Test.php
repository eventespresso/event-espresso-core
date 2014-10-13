<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EEM_Message_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EEM_Message_Test extends EE_UnitTestCase{

	public function test_message_sent(){
		$att = $this->new_model_obj_with_dependencies( 'Attendee' );
		$this->assertFalse( EEM_Message::instance()->message_sent( $att, 'registration' ) );

		$msg_sent_of_other_type = $this->new_model_obj_with_dependencies( 'Message', array( 'MSG_recipient_ID' => $att->ID(), 'MSG_recipient_type' => 'Attendee', 'MSG_message_type' => 'pending_payment' ) );

		$this->assertFalse( EEM_Message::instance()->message_sent( $att, 'registration' ) );

		$msg_sent = $this->new_model_obj_with_dependencies( 'Message', array( 'MSG_recipient_ID' => $att->ID(), 'MSG_recipient_type' => 'Attendee', 'MSG_message_type' => 'registration' ) );
		$this->assertFalse( EEM_Message::instance()->message_sent( $att, 'registration' ) );

		$msg_sent->set_STS_ID( EEM_Message::status_sent );
		$msg_sent->save();
		$this->assertTrue( EEM_Message::instance()->message_sent( $att, 'registration' ) );
	}
}

// End of file EEM_Message_Test.php