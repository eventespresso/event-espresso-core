<?php
if ( ! defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}



/**
 * Class EE_Email_Field_Test
 *
 * @package       Event Espresso
 * @author        Brent Christensen
 * @since         4.9.1
 */
class EE_Email_Field_Test extends EE_UnitTestCase {

	public function test_prepare_for_set() {
		$international_email_address = 'jägerjürgen@deutschland.com';
		$email_field = EEM_Attendee::instance()->field_settings_for( 'ATT_email' );
		$actual_email_address = $email_field->prepare_for_set( $international_email_address );
		$this->assertEquals(
			$international_email_address,
			$actual_email_address,
			sprintf(
				'Was ist das? Die E-Mail-Adresse des Teilnehmers sollte "%1$s", nicht "%2$s" sein!',
				$international_email_address,
				$actual_email_address
			)
			// translation:
			// What is this? The attendee's email address should be "jägerjürgen@deutschland.com", not "{actual result}"
		);
	}

}
// End of file EE_Email_Field_Test.php
// Location: tests/testcases/core/db_models/fields/EE_Email_Field_Test.php