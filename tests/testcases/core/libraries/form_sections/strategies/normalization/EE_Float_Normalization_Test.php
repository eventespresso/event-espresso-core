<?php

if (!defined('EVENT_ESPRESSO_VERSION')) {
	exit('No direct script access allowed');
}

/**
 *
 * EE_Float_Normalization_Test
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class EE_Float_Normalization_Test extends EE_UnitTestCase{
    /**
     * @group 10586
     */
	public function test_normalize(){
		$strategy = new EE_Float_Normalization();
		$input = new EE_Text_Input();
		$strategy->_construct_finalize( $input );
		$this->assertEquals( 10, $strategy->normalize( '10' ) );
		$this->assertEquals( 10, $strategy->normalize( '10' ) );
		$this->assertEquals( 1000, $strategy->normalize( '1,000' ) );
		$this->assertEquals( 1000, $strategy->normalize( ' 1 000 ' ) );
        $this->assertEquals( 10, $strategy->normalize( '$10' ) );
        $this->assertEquals( 1, $strategy->normalize( ' 1.00 ' ) );
        $this->assertEquals( 1000, $strategy->normalize( ' 1, 000.00 ' ) );
        $this->assertEquals( -1, $strategy->normalize( '-1' ) );
        $this->assertEquals( -1, $strategy->normalize( '-1.00' ) );
        $this->assertEquals( 20, $strategy->normalize( '20 guineas' ) );
        $this->assertEquals( 5, $strategy->normalize( '5 quid 6 pence' ) );


		try{
			$strategy->normalize( 'one hundred' );
			$this->assertTrue( FALSE );
		}catch( EE_Validation_Error $e){
			$this->assertTrue( TRUE );
		}

		$this->assertEquals( 10, $strategy->normalize( 10 ) );
		try{
			$strategy->normalize( array() );
			$this->assertTrue( FALSE );
		}catch(EE_Validation_Error $e){
			$this->assertTrue( TRUE );
		}
	}
}

// End of file EE_Float_Normalization_Test.php