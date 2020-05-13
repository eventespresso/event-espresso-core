<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class EE_Model_Matching_Query_Validation_Strategy_Test extends EE_UnitTestCase {
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

        // this one doesn't match because there is no event with this ID
        $this->setExceptionExpected('EE_Validation_Error', 500);
        $validator->validate($ev->ID() + 1);

        // this one doesn't match because the validator only looks for events with EVT_name like '%bar'"
        $this->setExceptionExpected('EE_Validation_Error', 500);
        $this->assertfalse($validator->validate($ev->ID()));

		$ev->set( 'EVT_name', 'foobar' );
		$ev->save();
		//this one is valid because the name matches the validator's criteria and
		//and the id exists
		$validator->validate( $ev->ID() );
	}

	public function test_valid__treating_input_as_other_field() {
		$validator = new EE_Model_Matching_Query_Validation_Strategy(
			'',
			'Event',
			array(),
			'EVT_name'
		);
		$this->new_model_obj_with_dependencies( 'Event', array( 'EVT_name' => 'bobit' ) );

		// There is no event with this name so it shouldn't pass validation
        $this->setExceptionExpected('EE_Validation_Error', 500);
        $validator->validate('non-existent-event-name');

		$validator->validate('bobit');
	}
}