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


	public function set_up(){
		parent::set_up();
		$this->_validator = new EE_Email_Validation_Strategy();
		//finalize its construction, but we don't actually need the input anyways
		$this->_validator->_construct_finalize( new EE_Email_Input() );
	}



	/**
	 * @param      $counter
	 * @param      $email_address
	 * @param bool $assert_success
	 */
	public function validate_email_address( $counter, $email_address, $assert_success = true ) {

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
					'Email addy #%1$s "%2$s" passed validation when it should have failed.',
					$counter,
					$email_address
				)
			);
		} catch ( EE_Validation_Error $e ) {
			$this->assertTrue(
				$fail,
				sprintf(
					'Email addy #%1$s "%2$s" failed validation when it should have passed.',
					$counter,
					$email_address
				)
			);
		}
		// i'm using = and NOT ==, so that I can bypass the following tests,
		// these were only added for dev purposes, but fail too often to be useful
		/*if ( $test_PHP_and_WP_validators = false ) {
			if ( $assert_success ) {
				$this->assertEquals(
					$email_address,
					filter_var( $email_address, FILTER_VALIDATE_EMAIL ),
					sprintf(
						'PHP says email addy #%1$s "%2$s" failed validation when it should have passed.',
						$counter,
						$email_address
					)
				);
				$this->assertEquals(
					$email_address,
					is_email( $email_address ),
					sprintf(
						'WordPress says email addy #%1$s "%2$s" failed validation when it should have passed.',
						$counter,
						$email_address
					)
				);
			} else {
				$this->assertFalse(
					filter_var( $email_address, FILTER_VALIDATE_EMAIL ),
					sprintf(
						'PHP says email addy #%1$s "%2$s" passed validation when it should have failed.',
						$counter,
						$email_address
					)
				);
				$this->assertFalse(
					is_email( $email_address ),
					sprintf(
						'WordPress says email addy #%1$s "%2$s" passed validation when it should have failed.',
						$counter,
						$email_address
					)
				);
			}
		}*/

	}



	public function test_validate__pass_basic() {
		EE_Registry::instance()->CFG->registration->email_validation_level = 'basic';
		// these should pass ALL validations
		$good_addys = array(
			'bogus@eventespresso.com',
			'developers@eventespresso.museum',
			'üñîçøðé@example.com', // (Unicode characters in local part)
			'äöüÄÖÜß@eventespresso.com', // lötsä umläüts
			'用户@例子.广告', // ( Chinese, Unicode )
			'उपयोगकर्ता@उदाहरण.कॉम', // ( Hindi, Unicode )
			'юзер@екзампл.ком', // ( Ukrainian, Unicode )
			'θσερ@εχαμπλε.ψομ', // ( Greek, Unicode )
			'Dörte@Sörensen.example.com', // ( German, Unicode )
			// short domain
			'developers@e.com',
			'developers@eventespresso.c',
			// from https://en.wikipedia.org/wiki/Email_address#Examples
			'niceandsimple@example.com',
			'very.common@example.com',
			'a.little.lengthy.but.fine@dept.example.com',
			'disposable.style.email.with+symbol@example.com',
			"!#$%&'*+-/=?^_`{}|~@example.org",
		    // the following, despite being valid, do NOT pass our validation
		    //'user@[IPv6:2001:db8:1ff::a0b:dbd0]',
			'"much.more unusual"@example.com',
			'"very.unusual.@.unusual.com"@example.com',
			'"very.(),:;<>[]\".VERY.\"very@\ \"very\".unusual"@strange.example.com',
			'postbox@com',
			'admin@mailserver1', // local domain name with no TLD
			'"()<>[]:,;@\\"!#$%&\'*+-/=?^_`{}| ~.a"@example.org',
			'" "@example.org', // (space between the quotes)
			// the following, despite being INVALID, pass validation when they should NOT
			// haxxor
			'<script>alert("XSS ATTACK")</script>@eventespresso.com',
		);
		// turn off DNS checks
		foreach ( $good_addys as $count => $good_addy ) {
			$this->validate_email_address( $count, $good_addy );
		}
	}



	public function test_validate__fail_basic(){
		EE_Registry::instance()->CFG->registration->email_validation_level = 'basic';
		$bad_addys = array(
			// double dots
			'develop..ers@eventespresso.com',
			'developers@event..espresso.com',
			// no local
			'@eventespresso.com',
			// no domain
			'developers@',
		);
		foreach ( $bad_addys as $count => $bad_addy ) {
			$this->validate_email_address( $count, $bad_addy, false );
		}
	}



	public function test_validate__pass_wp_default() {
		EE_Registry::instance()->CFG->registration->email_validation_level = 'wp_default';
		// these should pass ALL validations
		$good_addys = array(
			'bogus@eventespresso.com',
			'developers@eventespresso.museum',
			// short domain
			'developers@e.com',
			'developers@eventespresso.c',
			// from https://en.wikipedia.org/wiki/Email_address#Examples
			'niceandsimple@example.com',
			'very.common@example.com',
			'a.little.lengthy.but.fine@dept.example.com',
			'disposable.style.email.with+symbol@example.com',
			"!#$%&'*+-/=?^_`{}|~@example.org",
			// the following, despite being valid, do NOT pass WordPress is_email() validation
		    //'üñîçøðé@example.com', // (Unicode characters in local part)
		    //'äöüÄÖÜß@eventespresso.com', // lötsä umläüts
		    //'用户@例子.广告', // ( Chinese, Unicode )
		    //'उपयोगकर्ता@उदाहरण.कॉम', // ( Hindi, Unicode )
		    //'юзер@екзампл.ком', // ( Ukrainian, Unicode )
		    //'θσερ@εχαμπλε.ψομ', // ( Greek, Unicode )
		    //'Dörte@Sörensen.example.com', // ( German, Unicode )
			//'user@[IPv6:2001:db8:1ff::a0b:dbd0]',
			//'"much.more unusual"@example.com',
			//'"very.unusual.@.unusual.com"@example.com',
			//'"very.(),:;<>[]\".VERY.\"very@\ \"very\".unusual"@strange.example.com',
			//'postbox@com',
			//'admin@mailserver1', // local domain name with no TLD
			//'"()<>[]:,;@\\"!#$%&\'*+-/=?^_`{}| ~.a"@example.org',
			//'" "@example.org', // (space between the quotes)
		);
		// turn off DNS checks
		foreach ( $good_addys as $count => $good_addy ) {
			$this->validate_email_address( $count, $good_addy );
		}
	}



	public function test_validate__fail_wp_default() {
		EE_Registry::instance()->CFG->registration->email_validation_level = 'wp_default';
		$bad_addys = array(
			// double dots
			'develop..ers@eventespresso.com',
			'developers@event..espresso.com',
			// haxxor
			'<script>alert("XSS ATTACK")</script>@eventespresso.com',
			// no local
			'@eventespresso.com',
			// no domain
			'developers@',
			// valid but international
			'üñîçøðé@example.com', // (Unicode characters in local part)
			'äöüÄÖÜß@eventespresso.com', // lötsä umläüts
			'用户@例子.广告', // ( Chinese, Unicode )
			'उपयोगकर्ता@उदाहरण.कॉम', // ( Hindi, Unicode )
			'юзер@екзампл.ком', // ( Ukrainian, Unicode )
			'θσερ@εχαμπλε.ψομ', // ( Greek, Unicode )
			'Dörte@Sörensen.example.com', // ( German, Unicode )
		);
		foreach ( $bad_addys as $count => $bad_addy ) {
			$this->validate_email_address( $count, $bad_addy, false );
		}
	}



	public function test_validate__pass_i18n() {
		EE_Registry::instance()->CFG->registration->email_validation_level = 'i18n';
		// these should pass ALL validations
		$good_addys = array(
			'bogus@eventespresso.com',
			'developers@eventespresso.museum',
			'üñîçøðé@example.com', // (Unicode characters in local part)
			'äöüÄÖÜß@eventespresso.com', // lötsä umläüts
			'用户@例子.广告', // ( Chinese, Unicode )
			'उपयोगकर्ता@उदाहरण.कॉम', // ( Hindi, Unicode )
			'юзер@екзампл.ком', // ( Ukrainian, Unicode )
			'θσερ@εχαμπλε.ψομ', // ( Greek, Unicode )
			'Dörte@Sörensen.example.com', // ( German, Unicode )
			// short domain
			'developers@e.com',
			// from https://en.wikipedia.org/wiki/Email_address#Examples
			'niceandsimple@example.com',
			'very.common@example.com',
			'a.little.lengthy.but.fine@dept.example.com',
			'disposable.style.email.with+symbol@example.com',
			"!#$%&'*+-/=?^_`{}|~@example.org",
		    // the following, despite being valid, do NOT pass our validation
		    //'user@[IPv6:2001:db8:1ff::a0b:dbd0]',
		    //'"much.more unusual"@example.com',
		    //'"very.unusual.@.unusual.com"@example.com',
		    //'"very.(),:;<>[]\".VERY.\"very@\ \"very\".unusual"@strange.example.com',
		    //'postbox@com',
		    //'admin@mailserver1', // local domain name with no TLD
		    //'"()<>[]:,;@\\"!#$%&\'*+-/=?^_`{}| ~.a"@example.org',
		    //'" "@example.org', // (space between the quotes)
		);
		// turn off DNS checks
		foreach ( $good_addys as $count => $good_addy ) {
			$this->validate_email_address( $count, $good_addy );
		}
	}



	public function test_validate__fail_i18n() {
		EE_Registry::instance()->CFG->registration->email_validation_level = 'i18n';
		$bad_addys = array(
			// double dots
			'develop..ers@eventespresso.com',
			'developers@event..espresso.com',
			// haxxor
			'<script>alert("XSS ATTACK")</script>@eventespresso.com',
			// domain too short
			'developers@eventespresso.c',
			// no local
			'@eventespresso.com',
			// no domain
			'developers@',
		);
		foreach ( $bad_addys as $count => $bad_addy ) {
			$this->validate_email_address( $count, $bad_addy, false );
		}
	}



	public function test_DNS_and_MX_record_check_fail(){
		EE_Registry::instance()->CFG->registration->email_validation_level = 'i18n_dns';
		$bad_addys = array(
			// no MX records (bogus addresses)
			'valid-but-not-real@siiiiiiiiiiiiiiite.com',
			'developers@eventespresso.museum',
			'用户@例子.广告', // ( Chinese, Unicode )
			'उपयोगकर्ता@उदाहरण.कॉम', // ( Hindi, Unicode )
			'юзер@екзампл.ком', // ( Ukrainian, Unicode )
			'θσερ@εχαμπλε.ψομ', // ( Greek, Unicode )
			'Dörte@Sörensen.staaaaaaaandooooooooort.com', // ( German, Unicode )
		);
		foreach ( $bad_addys as $count => $bad_addy ) {
			$this->validate_email_address( $count, $bad_addy, false );
		}
	}


}
// End of file tests/testcases/core/libraries/form_sections/strategies/validation/EE_Email_Validation_Strategy_Test.php
