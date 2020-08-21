<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;

class EE_Model_Matching_Query_Validation_Strategy_Test extends EE_UnitTestCase {

    /**
     * @since $VID:$
     * @throws EE_Error
     * @throws EE_Validation_Error
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @doesNotPerformAssertions
     */
	public function test_valid() {
		$validator = new EE_Model_Matching_Query_Validation_Strategy(
			'',
			'Event',
			array(
				array(
					'EVT_name' => array( 'LIKE', '%bar' )
				)
			)
		);
		$ev = $this->new_model_obj_with_dependencies( 'Event', array( 'EVT_name' => 'bobit' ) );
		try{ 
			$validator->validate( $ev->ID() + 1 );
			$this->fail( 'this one doesn\'t match because there is no event with this ID');
		}catch( EE_Validation_Error $e ) {}
		try{
			$this->assertfalse( $validator->validate( $ev->ID() ) );
			$this->fail("this one doesn't match because the validator only looks for events with EVT_name like '%bar'" );
		}catch( EE_Validation_Error $e ) {}
		
		$ev->set( 'EVT_name', 'foobar' );
		$ev->save();
		//this one is valid because the name matches the validator's criteria and
		//and the id exists
		$validator->validate( $ev->ID() );
	}

    /**
     * @since $VID:$
     * @throws EE_Error
     * @throws EE_Validation_Error
     * @doesNotPerformAssertions
     */
	public function test_valid__treating_input_as_other_field() {
		$validator = new EE_Model_Matching_Query_Validation_Strategy(
			'',
			'Event',
			array(),
			'EVT_name'
		);
		$ev = $this->new_model_obj_with_dependencies( 'Event', array( 'EVT_name' => 'bobit' ) );
		try{
			$validator->validate( 'non-existent-event-name' );
			$this->fail( 'There is no event with this name so it shouldnt pass validation');
		} catch ( EE_Validation_Error $ex) {}
		$validator->validate('bobit');
	}
}