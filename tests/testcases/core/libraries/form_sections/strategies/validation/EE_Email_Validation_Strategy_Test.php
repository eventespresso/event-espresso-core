<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EE_Email_Validation_Strategy_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_Email_Validation_Strategy_Test extends EE_UnitTestCase{

	/**
	 *
	 * @var EE_Validation_Strategy_Base
	 */
	protected $_validator = null;


	public function setUp(){
		parent::setUp();
		$this->_validator = new EE_Email_Validation_Strategy();
		//finalize its construction, but we don't actually need the input anyways
		$this->_validator->_construct_finalize( new EE_Email_Input() );
	}



	function validate_email_address( $email_address, $assert_success = true ) {
		if ( $assert_success ) {
			$success = true;
			$fail = false;
		} else {
			$success = false;
			$fail = true;
		}
		try {
			$this->_validator->validate( $email_address );
			$this->assertTrue(
				$success,
				sprintf(
					'The email addy "%s" passed validation when it should have failed.',
					$email_address
				)
			);
		} catch ( EE_Validation_Error $e ) {
			$this->assertTrue(
				$fail,
				sprintf(
					'The email addy "%s" failed validation when it should have passed.',
					$email_address
				)
			);
		}
	}



	function test_validate__pass() {
		$this->validate_email_address( 'developers@eventespresso.com' );
	}



	function test_validate__fail(){
		$bad_addys = array(
			// double dots
			'develop..ers@eventespresso.com',
			'developers@event..espresso.com',
			// domain too short
			'developers@e.com',
			// domain too short
			'developers@eventespresso.c',
			// no local
			'@eventespresso.com',
			// no domain
			'developers@',
			// no MX records (bogus addresses)
			'developers@eventespresso.museum',
			'dävälöpärs@äöüÄÖÜß.com', // häs umläüts
			'用户@例子.广告', // ( Chinese, Unicode )
			'उपयोगकर्ता@उदाहरण.कॉम', // ( Hindi, Unicode )
			'юзер@екзампл.ком', // ( Ukrainian, Unicode )
			'θσερ@εχαμπλε.ψομ', // ( Greek, Unicode )
			'Dörte@Sörensen.example.com', // ( German, Unicode )
		);
		foreach ( $bad_addys as $bad_addy ) {
			$this->validate_email_address( $bad_addy, false );
		}
	}


}
// End of file tests/testcases/core/libraries/form_sections/strategies/validation/EE_Email_Validation_Strategy_Test.php
