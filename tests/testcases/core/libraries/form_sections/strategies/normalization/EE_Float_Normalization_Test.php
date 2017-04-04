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
     * @var EE_Float_Normalization
     */
    protected $_strategy;


    public function setUp(){
        parent::setUp();
        $this->_strategy = new EE_Float_Normalization();
        $input = new EE_Text_Input();
        $this->_strategy->_construct_finalize( $input );
    }


    /**
     * Data Provider for OK float inputs
     * @return array{
     *              array{
     *                  $0 the expected float
     *                  $1 the input value
     *              }
     *          }
     */
    public function test_ok_float_inputs(){
        return array(
            array(10, '10'),
            array(10, '10'),
            array(1000,'1,000'),
            array(1000,' 1 000'),
            array(10,'$10'),
            array(1,'1.00'),
            array(1000,' 1, 000.00'),
            array(-1,'-1'),
            array(-1,'- 1'),
            array(20,'20 guineas'),
            array(5,'5 quid 6 pence'),
            array(10,10.00)
        );
    }



    /**
     * @dataProvider ok_float_inputs
     * @param $output
     * @param $input
     * @throws EE_Validation_Error
     */
    public function test_normalize_ok($output, $input){
        $this->assertEquals( $output, $this->_strategy->normalize($input));
    }


    /**
     * Data Provider for bad float inputs
     * @return array of arrays with the invalid inputs
     */
    public function bad_float_inputs(){
        return array(
            array('one hundred'),
            array(array()),
        );
    }



    /**
     * @group        10586
     * @dataProvider bad_float_inputs
     * @expectedException EE_Validation_Error
     * @param $input
     * @throws EE_Validation_Error
     */
	public function test_bad_float_inputs($input){
        $this->_strategy->normalize( $input );
	}
}

// End of file EE_Float_Normalization_Test.php
// Location: tests/testcases/core/libraries/form_sections/strategies/normalization/EE_Float_Normalization_Test.php