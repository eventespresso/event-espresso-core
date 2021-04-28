<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * EE_Plaintext_Validation_Strategy_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_Plaintext_Validation_Strategy_Test extends EE_UnitTestCase{

	/**
	 *
	 * @var EE_Validation_Strategy_Base
	 */
	protected $_validator = null;
	public function setUp(){
		parent::setUp();
		$this->_validator = new EE_Plaintext_Validation_Strategy();
		$input = new EE_Text_Input();
		//finalize its construction, but we don't actually need the input anyways
		$this->_validator->_construct_finalize( $input );
	}
	function test_validate__fail(){
		try{
			$this->_validator->validate( '<img src=x onerror=prompt(document.cookie)> <img src=x onerror=prompt(/XSS/)> <img src=x onerror=prompt(1)>' );
			$this->assertTrue( false );
		}catch( EE_Validation_Error $e ) {
			$this->assertTrue( true );
		}
	}

    /**
     * @doesNotPerformAssertions
     */
	function test_validate__pass(){
		$this->_validator->validate( 'just some text; no html anywhere' );
	}
}

// End of file EE_Plaintext_Validation_Strategy_Test.php