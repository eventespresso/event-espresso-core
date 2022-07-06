<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EE_Max_Length_Validation_Strategy_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 * @group forms
 * @group core/libraries/form_sections/validation
 * @group EE_Max_Length_Validation_Strategy_Test
 *
 */
class EE_Max_Length_Validation_Strategy_Test extends EE_UnitTestCase{

	protected $_validator = null;
	public function set_up(){
		parent::set_up();
		$this->_validator = new EE_Max_Length_Validation_Strategy( 'oups', 5 );
		$input = new EE_Text_Input();
		//finalize its construction, but we don't actually need the input anyways
		$this->_validator->_construct_finalize( $input );
	}
	/**
	 * tests that it can be left blank and pass validation (because the required validation
	 * strategy is what should fail here, if it's added as a validation strategy)
	 */
	public function test_validate__blank_but_not_required() {
		try{
			$this->_validator->validate( '' );
			$this->assertTrue(true);
		}catch(EE_Validation_Error $e ){
			$this->assertFalse( true, 'The empty string is shorter than 5 so it should be ok' );
		}
	}

	/**
	 * tests that validation passes with LESS than the maximum characters
	 */
	public function test_validate__pass() {
		try{
			$this->_validator->validate( '1234' );
			$this->assertTrue(true);
		}catch(EE_Validation_Error $e ){
			$this->assertFalse( true, '1234 has less than 5 characters and so should be ok' );
		}
	}

	/**
	 * tests validation passes with the maximum number of characters
	 */
	public function test_validate__pass_but_barely() {
		try{
			$this->_validator->validate( '12345' );
			$this->assertTrue(true);
		}catch(EE_Validation_Error $e ){
			$this->assertFalse( true, '12345 has 5 characters and so should be ok' );
		}
	}

	/**
	 * tests that validation fails when there are FEWER than the maximum number of characters
	 */
	public function test_validate__fail() {
		try{
			$this->_validator->validate( '123456' );
			$this->assertFalse( true, '123456 has too MANY character' );
		}catch(EE_Validation_Error $e ){
			$this->assertTrue( true );
		}
	}



}

// End of file EE_Max_Length_Validation_Strategy_Test.php