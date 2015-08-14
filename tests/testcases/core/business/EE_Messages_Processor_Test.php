<?php
/**
 * Contains test class for /core/business/EE_Messages_Processor_Test.php
 *
 * @since  		4.9.0
 * @package 	Event Espresso
 * @subpackage 	tests
 */

/**
 * All tests for the EE_Messages_Processor class.
 *
 * @since 		4.9.0
 * @package 	Event Espresso
 * @subpackage 	tests
 * @group       messages
 */
class EE_Messages_Processor_Test extends EE_UnitTestCase {



	public function setUp() {
		parent::setUp();
		//setup events etc for previewer to use
		$this->scenarios->get_scenarios_by_type('event');
	}



	/**
	 * This returns an array of components used in testing.
	 * An array with the following:
	 * - EE_messages object
	 * - EE_Messages_Processor object (clean)
	 * - EE_Message_To_Generate object.
	 * @return array
	 */
	protected function _test_components() {
		//setup up new processor
		$ee_msg = EE_Registry::instance()->load_lib( 'messages' );
		$proc = EE_Registry::instance()->load_class( 'Messages_Processor', $ee_msg );

		//set up a EE_Message_To_Generate object
		$mtg = new EE_Message_To_Generate(
			'email',
			'registration',
			array(),
			$ee_msg,
			'admin',
			true
		);
		return array(
			'ee_msg' => $ee_msg,
			'proc' => $proc,
			'mtg' => $mtg
		);
	}



	/**
	 * Tests constructing the processor object and retrieving a EE_Messages_Queue after construct.
	 * Passes along EE_Messages_Processor for other test.
	 *
	 * @return EE_Messages_Processor
	 */
	function test_construct_and_get_queue() {
		$eemsg = EE_Registry::instance()->load_lib( 'messages' );
		try {
			$message_proc = EE_Registry::instance()->load_class( 'Messages_Processor', $eemsg );
		} catch( Exception $e ) {
			$this->fail( sprintf( 'Loading EE_Messages_Processor failed: %s', $e->getMessage() ) );
		}

		//verify things loaded okay via the queue.
		$this->assertInstanceOf( 'EE_Messages_Queue', $message_proc->get_queue() );
		return $message_proc;
	}


	/**
	 * @depends test_construct_and_get_queue
	 * @param EE_Messages_Processor $message_proc
	 */
	function test_batch_generate_from_queue( EE_Messages_Processor $message_proc ) {
		//first we know there is nothing in the db, so let's verify that returns false. (this also verifies the clear param)
		$this->assertFalse( $message_proc->batch_generate_from_queue( array(), true ) );

		//now let's test getting some batch ready to generate.
		$this->factory->message->create_many( 5 );

		$new_queue = $message_proc->batch_generate_from_queue();

		$this->assertInstanceOf( 'EE_Messages_Queue', $new_queue );
		//this will be 5 because there the messages the factory create set the preview data handler for the data used.
		$this->assertEquals( 5, $new_queue->get_queue()->count() );
	}




	/**
	 * Same as above test except only doing batch generation on specific messages
	 * @depends test_construct_and_get_queue
	 * @param   EE_Messages_Processor $message_proc
	 */
	function test_batch_generate_from_queue_with_messages( EE_Messages_Processor $message_proc ) {
		//make sure clear works
		$this->assertFalse( $message_proc->batch_generate_from_queue( array(), true ) );

		//setup some messages for generation.
		$messages_to_test = $this->factory->message->create_many( 5 );

		//now let's create 3 more that will NOT be used.
		$this->factory->message->create_many( 3 );

		$new_queue = $message_proc->batch_generate_from_queue( $messages_to_test );

		$this->assertInstanceOf( 'EE_Messages_Queue', $new_queue );

		//verify 5 got generated
		$this->assertEquals( 5, $new_queue->get_queue()->count() );

		//verify the original MIC Messages do not exist in the db anymore.
		$messages_no_exist = EEM_Message::instance()->count( array( array(
			'MSG_ID' => array( 'IN', array_keys( $messages_to_test ) )
		) ) );

		$this->assertEquals( 0, $messages_no_exist );
	}


	/**
	 * @depends test_construct_and_get_queue
	 * @param EE_Messages_Processor $message_proc
	 */
	function test_batch_send_from_queue( EE_Messages_Processor $message_proc ) {

		//create messages ready to send.
		$this->factory->message->create_many( 5, array( 'STS_ID' => EEM_Message::status_idle ) );

		$sent_queue = $message_proc->batch_send_from_queue(array(),true);

		$this->assertInstanceOf( 'EE_Messages_Queue', $sent_queue );
		$this->assertEquals( 5, $sent_queue->get_queue()->count() );

		//verify no errors
		$this->assertEquals( 0, $sent_queue->count_STS_in_queue( EEM_Message::instance()->stati_indicating_failed_sending() ) );

		$this->assertEquals( 5, $sent_queue->count_STS_in_queue( EEM_Message::status_sent ) );
	}


	/**
	 * Same as previous test except tests with sending in messages.
	 * @depends test_construct_and_get_queue
	 * @param EE_Messages_Processor $messages_proc
	 */
	function test_batch_send_from_queue_with_messages( EE_Messages_Processor $messages_proc ) {
		//create messages we're going to use for sending
		$messages_to_send = $this->factory->message->create_many( 5, array( 'STS_ID' => EEM_Message::status_idle ) );

		//create messages that are not ready for sending as a foil.
		$this->factory->message->create_many( 3 );

		$sent_queue = $messages_proc->batch_send_from_queue( $messages_to_send, true );

		$this->assertInstanceOf( 'EE_Messages_Queue', $sent_queue );
		$this->assertEquals( 5, $sent_queue->get_queue()->count() );

		//verify no errors
		$this->assertEquals( 0, $sent_queue->count_STS_in_queue( EEM_Message::instance()->stati_indicating_failed_sending() ) );
		$this->assertEquals( 5, $sent_queue->count_STS_in_queue( EEM_Message::status_sent ) );
	}


	/**
	 * This implicitly tests the following methods as well:
	 * - queue_for_generation
	 * - queue_for_generation_loop
	 */
	function test_generate_and_return() {
		$test_components = $this->_test_components();
		/** @type EE_Messages_Processor $proc */
		$proc = $test_components['proc'];
		$mtg = $test_components['mtg'];

		$generated_queue = $proc->generate_and_return( $mtg );

		$this->assertInstanceOf( 'EE_Messages_Queue', $generated_queue );

		/**
		 * Expect 1 generated messages from the one MTG because there is a specific context provided (admin) that
		 * should only result in one message.
		 */
		$this->assertEquals( 1, $generated_queue->count_STS_in_queue( EEM_Message::status_idle ) );

		//messages in queue should NOT be saved.
		$generated_queue->get_queue()->rewind();
		$msg = $generated_queue->get_queue()->current();
		$this->assertEquals( 0, $msg->ID() );
	}




	function test_batch_queue_for_generation_and_persist() {
		$this->_common_test_with_specific_expected_status( 'batch_queue_for_generation_and_persist', EEM_Message::status_incomplete );
	}



	function test_batch_queue_for_generation_no_persist() {
		$this->_common_test_with_specific_expected_status( 'batch_queue_for_generation_no_persist', EEM_Message::status_incomplete, false );
	}



	function test_generate_and_queue_for_sending() {
		$this->_common_test_with_specific_expected_status( 'generate_and_queue_for_sending', EEM_Message::status_idle, false, 0 );
		//now there should be Messages in the database all queued up for sending.  Let's check
		$messages = EEM_Message::instance()->get_all( array( array(
			'STS_ID' => EEM_Message::status_idle,
		)));

		//expecting only one message because the specific context was provided.
		$this->assertEquals( 1, count( $messages ) );
	}




	function test_generate_for_preview() {
		$test_components = $this->_test_components();
		/** @type EE_Messages_Processor $proc */
		$proc = $test_components['proc'];
		/** @type EE_Message_To_Generate $mtg */
		$mtg = $test_components['mtg'];

		$this->assertTrue( $mtg->preview );

		try {
			/** @type EE_Messages_Queue $generated_queue */
			$generated_queue = $proc->generate_for_preview( $mtg );
		} catch( Exception $e ) {
			$this->fail( sprintf( 'Something went wrong with the test: %s', $e->getMessage() ) );
		}

		//if made it here then we should have some content to verify.  We're not matching entire string, just key
		//components of what should be generated for the email messenger and registration message type using
		//default dummy preview data.
		$this->assertInstanceOf( 'EE_Messages_Queue', $generated_queue );
		$generated_queue->get_queue()->rewind();
		/** @type EE_Message $msg */
		$msg = $generated_queue->get_queue()->current();
		$this->assertInstanceOf( 'EE_Message', $msg );
		$this->assertContains( 'Registration Notification', $msg->content() );
		$this->assertContains( 'Luke Skywalker', $msg->content() );
		$this->assertContains( 'Test Scenario EVT A', $msg->content() );

		//also verify not persisted!
		$this->assertEquals( 0, $msg->ID() );

		//verify sent!
		$this->assertEquals( EEM_Message::status_sent, $msg->STS_ID() );
	}




	/**
	 * Has common assertions for multiple EE_Messages_Processor method tests.
	 * @param string $method_to_test  EE_Messages_Processor method being tested
	 * @param string $expected_status  Expected EEM_Message::STS_ID() for the status test.
	 * @param bool   $in_database     Whether the test for persistence in db should be checked.
	 * @param int    $expected_message_objects  How many message objects are expected in the queue.
	 */
	protected function _common_test_with_specific_expected_status( $method_to_test, $expected_status, $in_database = true, $expected_message_objects = 1 ) {
		$test_components = $this->_test_components();
		/** @type EE_Messages_Processor $proc */
		$proc = $test_components['proc'];
		/** @type EE_Message_To_Generate $mtg */
		$mtg = $test_components['mtg'];

		$queue = $proc->get_queue();

		$proc->$method_to_test( array( $mtg ) );

		//queue should have $expected_message_objects EE_Message_object(s) and it/they should not be in the db and it/they
		//should have status for the sent in status.
		$this->assertEquals( $expected_message_objects, $queue->get_queue()->count(), sprintf( 'Failed test for the %s method', $method_to_test ) );
		if ( $expected_message_objects > 0 ) {
			$queue->get_queue()->rewind();
			$msg = $queue->get_queue()->current();
			$this->assertInstanceOf( 'EE_Message', $msg, sprintf( 'Failed test for the %s method', $method_to_test ) );
			if ( $in_database ) {
				$this->assertInstanceOf( 'EE_Message', EEM_Message::instance()->get_one_by_ID( $msg->ID() ), sprintf( 'Failed test for the %s method', $method_to_test ) );
			} else {
				$this->assertEquals( 0, $msg->ID(), sprintf( 'Failed test for the %s method', $method_to_test ) );
			}
			$this->assertEquals( $expected_status, $msg->STS_ID(), sprintf( 'Failed test for the %s method', $method_to_test ) );
		}
	}


} //end EE_Messages_Processor_Test