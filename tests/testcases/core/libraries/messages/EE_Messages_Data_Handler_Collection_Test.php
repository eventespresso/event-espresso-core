<?php
/**
 * Contains test class for /core/repositories/EE_Messages_Data_Handler_Collection.lib.php
 *
 * @since  		4.9.0
 * @package 	Event Espresso
 * @subpackage 	tests
 */

/**
 * All tests for the EE_Messages_Data_Handler_Collection class.
 *
 * @since 		4.9.0
 * @package 	Event Espresso
 * @subpackage 	tests
 * @group       messages
 */
class EE_Messages_Data_Handler_Collection_Test extends EE_UnitTestCase {


	/**
	 * @return EE_Messages_Data_Handler_Collection
	 */
	public function test_add() {
        $this->loadTestScenarios();
        //need to add some events for previewer to use... we'll just use the event scenarios
		$this->scenarios->get_scenarios_by_type( 'event' );

		$data_handler = new EE_Messages_Preview_incoming_data();
		$test_repo = new EE_Messages_Data_Handler_Collection();

		$this->assertInstanceOf( 'EE_Messages_Data_Handler_Collection', $test_repo );

		$test_repo->add( $data_handler, array() );

		//verify the message was added
		$this->assertEquals( 1, $test_repo->count() );
		$test_repo->rewind();
		$this->assertInstanceOf( 'EE_Messages_Preview_incoming_data', $test_repo->current() );
		return $test_repo;
	}



	/**
	 * @depends test_add
	 *
*@param EE_Messages_Data_Handler_Collection $test_repo
	 *
*@return EE_Messages_Data_Handler_Collection
	 */
	function test_remove( EE_Messages_Data_Handler_Collection $test_repo ) {
		//get the object to remove.
		$data_handler = $test_repo->current();

		//verify in db
		$this->assertInstanceOf( 'EE_Transaction', $data_handler->txn );

		//remove and verify removed.
		$test_repo->remove( $data_handler );
		$this->assertEquals( 0, $test_repo->count() );

		//add back to repo for next test.
		$test_repo->add( $data_handler, array() );
		return $test_repo;
	}




	/**
	 * @depends test_remove
	 *
*@param EE_Messages_Data_Handler_Collection $test_repo
	 */
	function test_get_by_key( EE_Messages_Data_Handler_Collection $test_repo ) {
		$key_should_exist = $test_repo->get_key( 'EE_Messages_Preview_incoming_data', array() );
		$key_should_not_exist = $test_repo->get_key( 'Some_Bogus_Class', array() );
		$this->assertNotInstanceOf( 'EE_Messages_Preview_incoming_data', $test_repo->get_by_key( $key_should_not_exist ) );
		$this->assertInstanceOf( 'EE_Messages_Preview_incoming_data', $test_repo->get_by_key( $key_should_exist ) );
	}


} //end EE_Messages_Data_Handler_Collection_Test
