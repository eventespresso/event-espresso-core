<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EE_Text_Validation_Strategy_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 * @group forms
 * @group core/libraries/form_sections/validation
 * @group EE_Text_Validation_Strategy_Test
 *
 */
class EE_Text_Validation_Strategy_Test extends EE_UnitTestCase{

	protected $_validator = null;
	public function set_up(){
		parent::set_up();
		$this->_validator = new EE_Text_Validation_Strategy( 'oups', '~Darth ([\w]*)~' );
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
			$this->assertFalse( true, 'This isnt the requried validation. Blank string is ok' );
		}
	}

	/**
	 * tests that validation passes with LESS than the maximum characters
	 */
	public function test_validate__pass() {
		try{
			$this->_validator->validate( 'Darth Vader' );
			$this->assertTrue(true);
		}catch(EE_Validation_Error $e ){
			$this->assertFalse( true, 'This should have matched the regex' );
		}
	}


	/**
	 * tests that validation fails when there are FEWER than the maximum number of characters
	 */
	public function test_validate__fail() {
		try{
			$this->_validator->validate( 'Han Solo' );
			$this->assertFalse( true, '"Han Solo" should not mathc regex' );
		}catch(EE_Validation_Error $e ){
			$this->assertTrue( true );
		}
	}

	public function test_regex_js(){
		$this->assertEquals( 'Darth ([\w]*)', $this->_validator->regex_js() );
	}


}

// End of file EE_Text_Validation_Strategy_Test.php