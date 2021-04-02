<?php
/**
 * Contains test class for /core/libraries/messages/EE_Messages_Queue.lib.php
 *
 * @since  		4.9.0
 * @package 	Event Espresso
 * @subpackage 	tests
 */

/**
 * All tests for the EE_Messages_Queue class.
 *
 * @since 		4.9.0
 * @package 	Event Espresso
 * @subpackage 	tests
 * @group       messages
 */
class EE_Messages_Queue_Test extends EE_UnitTestCase {




	/**
	 * Utility to provide a EE_Messages_Queue object.
	 * @return EE_Messages_Queue
	 */
	protected function _get_queue() {
		return EE_Registry::instance()->load_lib( 'Messages_Queue' );
	}





	/**
	 * Testing adding to the queue
	 * @return EE_Messages_Queue
	 */
	function test_add_and_get_queue() {
        $this->loadFactories();
		$queue = $this->_get_queue();
		$message = $this->factory->message->create(array('nosave'=> 1));


		//add message
		$added = $queue->add( $message );

		//verify bool returns that it was added
		$this->assertTrue( $added );

		//get_message_repository to verify EE_Message is in it.
		$test_queue = $queue->get_message_repository();
		$this->assertInstanceOf( 'EE_Message_Repository', $test_queue );

		//verify the queue contains the message object
		$test_queue->rewind();
		$this->assertTrue( $test_queue->valid() );
		$this->assertInstanceOf( 'EE_Message', $test_queue->current() );
		return $queue;
	}





	/**
	 * @param EE_Messages_Queue $queue
	 * @depends test_add_and_get_queue
	 * @return EE_Messages_Queue
	 */
	function test_remove( EE_Messages_Queue $queue ) {
		$test_queue = $queue->get_message_repository();

		$test_queue->rewind();
		$this->assertTrue( $test_queue->valid() );
		$message = $test_queue->current();
		$test_queue->remove( $message );

		//validate that the queue is empty
		$test_queue->rewind();
		$this->assertFalse( $test_queue->valid() );

		//add the message back to the queue for the next test
		$test_queue->add( $message );
		return $queue;
	}





	/**
	 * @param EE_Messages_Queue $queue
	 * @depends test_remove
	 * @return EE_Messages_Queue
	 */
	function test_save( EE_Messages_Queue $queue ) {
		//first verify that the current EE_Message object in the queue does
		//not have an ID() (it shouldn't)
		$test_queue = $queue->get_message_repository();
		$test_queue->rewind();
		$this->assertEmpty( $test_queue->current()->ID() );

		//save!
		$queue->save();
		$test_queue->rewind();
		//verify we have an ID and can retrieve from db.
		$message = EEM_Message::instance()->get_one_by_ID( $test_queue->current()->ID() );
		$this->assertInstanceOf( 'EE_Message', $message );
		return $queue;
	}





	/**
	 * @param EE_Messages_Queue $queue
	 * @depends test_save
	 * @return EE_Messages_Queue
	 */
	function test_remove_with_persist( EE_Messages_Queue $queue ) {
		$test_queue = $queue->get_message_repository();
		$test_queue->rewind();
		//verify we have a message object before removing
		$message = $test_queue->current();
		$this->assertInstanceOf( 'EE_Message', $message );

		//now do a remove of this message object but with the persist flag set.
		$queue->remove( $message, true );

		//did it get removed?
		$test_queue->rewind();
		$this->assertFalse( $test_queue->valid() );
		//ensure message gets removed from entity map
		EEM_Message::instance()->clear_entity_map( $message->ID() );
		//should not be in db either
		$this->assertEmpty( EEM_Message::instance()->get_one_by_ID( $message->ID() ) );
	}





	/**
	 * This is also testing the lock functionality
	 * @return EE_Messages_Queue
	 */
	function test_get_batch_to_generate() {
        $this->loadFactories();
		//grab a bunch of message objects and add to queue.
		$queue = $this->_get_queue();
		for ( $i=0;$i<5;$i++ ) {
			$queue->add( $this->factory->message->create() );
		}

		//now get a new queue
		$queue = $this->_get_queue();

		//test getting batch and that there is the right count in the batch.
		$this->assertTrue( $queue->get_batch_to_generate() );
		$this->assertEquals( 5, $queue->get_message_repository()->count() );

		//test lock is set.
		$lock_test_queue = $this->_get_queue();
		$this->assertTrue( $lock_test_queue->is_locked() );
		$this->assertFalse( $lock_test_queue->get_batch_to_generate() );

		//test unlocking
		$lock_test_queue->unlock_queue( 'generation' );
		$this->assertFalse( $lock_test_queue->is_locked() );
		$this->assertTrue( $lock_test_queue->get_batch_to_generate() );
	}




	function test_get_to_send_batch_and_send() {
        $this->loadFactories();
		//grab a bunch of message objects and add to queue.
		$queue = $this->_get_queue();
		for ( $i=0;$i<5;$i++ ) {
			$queue->add( $this->factory->message->create() );
		}
		//persist
		$queue->save();

		//next verify that nothing gets processed when there are no messages TO send (i.e. current EE_Message objects
		//in db should be all incomplete.
		$test_queue = $this->_get_queue();
		$this->assertFalse( $test_queue->get_to_send_batch_and_send() );

		//okay let's now set all messages to be ready for sending.
		foreach( $queue->get_message_repository() as $message ) {
			$message->set_STS_ID( EEM_Message::status_idle );
		}

		//save queue
		$queue->save();

		//run test
		$test_queue = $this->_get_queue();
		$this->assertTrue( $test_queue->get_to_send_batch_and_send() );

		//verify no messages have failed status.
		$this->assertEquals( 0, $test_queue->count_STS_in_queue( EEM_Message::instance()->stati_indicating_failed_sending() ) );
		//verify all have been marked as sent.
		$this->assertEquals( 5, $test_queue->count_STS_in_queue(EEM_Message::status_sent ) );
	}


	/**
	 * This is used to test the execute method when there are messages in the queue that are NOT with a status representing
	 * to send.  They should NOT get sent if that's the case.
	 * @group 9787
	 */
	public function test_send_only_ready_to_send_messages() {
        $this->loadFactories();
		//get some messages ready for the test and add to queue
		$queue = $this->_get_queue();
		for ( $i = 0; $i < 5; $i++ ) {
			$queue->add( $this->factory->message->create() );
		}

		//should be 5 items in the queue with MIC status
		$this->assertEquals( 5, $queue->count_STS_in_queue( array( EEM_Message::status_incomplete ) ) );

		//now if we execute now, NOTHING should get sent and we should still see all messages in the queue as MIC.
		//anything else and we know the test has failed.
		$queue->execute();

		$this->assertEquals( 5, $queue->count_STS_in_queue( array( EEM_Message::status_incomplete ) ) );

	}


} //end EE_Messages_Queue_Test