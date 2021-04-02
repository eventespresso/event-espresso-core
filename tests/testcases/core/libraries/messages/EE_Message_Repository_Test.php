<?php
/**
 * Contains test class for /core/repositories/EE_Message_Repository.lib.php
 *
 * @since  		4.9.0
 * @package 	Event Espresso
 * @subpackage 	tests
 */

/**
 * All tests for the EE_Message_Repository class.
 *
 * @since 		4.9.0
 * @package 	Event Espresso
 * @subpackage 	tests
 * @group       messages
 */
class EE_Message_Repository_Test extends EE_UnitTestCase {


	/**
	 * @return EE_Message_Repository
	 */
	function test_add() {
        $this->loadFactories();
		$message = $this->factory->message->create( array( 'nosave' => 1 ) );
		$test_repo = new EE_Message_Repository();
		$this->assertInstanceOf( 'EE_Message_Repository', $test_repo );

		$test_repo->add( $message );

		//verify the message was added
		$this->assertEquals( 1, $test_repo->count() );
		$test_repo->rewind();
		$this->assertInstanceOf( 'EE_Message', $test_repo->current() );
		return $test_repo;
	}



	/**
	 * @depends test_add
	 * @param EE_Message_Repository $test_repo
	 */
	function test_remove( EE_Message_Repository $test_repo ) {
		//get the object to remove.
		$message = $test_repo->current();

		//let's persist this object for persist tests
		$message->save();
		$msgid = $message->ID();
		//verify in db
		$this->assertInstanceOf( 'EE_Message', EEM_Message::instance()->get_one_by_ID( $msgid ) );

		//remove from repo only and verify removed and verify still in db.
		$test_repo->remove( $message );
		$this->assertEquals( 0, $test_repo->count() );
		$this->assertInstanceOf( 'EE_Message', EEM_Message::instance()->get_one_by_ID( $msgid ) );

		//add back to repo and then try persist remove
		$test_repo->add( $message );
		$test_repo->delete();
		$this->assertEmpty( EEM_Message::instance()->get_one_by_ID( $msgid ) );
	}


	/**
	 * @return EE_Message_Repository
	 */
	function test_saveAll() {
        $this->loadFactories();
		//create a bunch of message objects and add to repo.
		$test_repo = new EE_Message_Repository();
		$generation_data = array( 'MSG_generation_data' => array(
			'REG_ID' => 12
			),
			'preview' => true
		);
		$messages = array();
		for( $i=0;$i<5;$i++) {
			$message = $this->factory->message->create( array( 'nosave' => 1 ) );
			//verify not saved
			$this->assertEquals( 0, $message->ID() );
			$messages[] = $message;
			$test_repo->add( $message, $generation_data );
		}

		$saved = $test_repo->saveAll();
		$this->assertEquals( 5, $saved['updated'] );
		return $test_repo;
	}




	/**
	 * @depends test_saveAll
	 * @param EE_Message_Repository $test_repo
	 * @return EE_Message_Repository
	 */
	function test_getMessageByToken( EE_Message_Repository $test_repo ) {
		//pop a message out of the repo to test with
		$test_repo->rewind();
		$message = $test_repo->current();
		$this->assertEquals( $message, $test_repo->getMessageByToken( $message->MSG_token() ) );
		return $test_repo;
	}


	/**
	 * @depends test_getMessageByToken
	 * @param EE_Message_Repository $test_repo
	 * @return EE_Message_Repository
	 */
	function test_get_generation_data( EE_Message_Repository $test_repo ) {
		$test_repo->rewind();
		$actual_generation_data = $test_repo->get_generation_data();
		$this->assertTrue( isset( $actual_generation_data['REG_ID'] ) );
		$this->assertEquals( 12, $actual_generation_data['REG_ID'] );
		return $test_repo;
	}


	/**
	 * @depends test_get_generation_data
	 * @param EE_Message_Repository $test_repo
	 */
	function test_is_preview( EE_Message_Repository $test_repo ) {
		$test_repo->rewind();
		$this->assertTrue( $test_repo->is_preview() );
	}




	function test__maybe_persist_generation_data() {
        $this->loadFactories();
		$test_repo = new EE_Message_Repository();
		$message = $this->factory->message->create();
		$actual_generation_data = array( 'MSG_generation_data' => array(
			'REG_ID' => 14
		) );
		$test_repo->add( $message, $actual_generation_data );
		$test_repo->saveAll();
		$test_repo->rewind();
		$message = $test_repo->current();
		$actual_generation_data = $message->get_generation_data();
		$this->assertTrue( isset( $actual_generation_data['REG_ID'] ) );
		$this->assertEquals( 14, $actual_generation_data['REG_ID'] );
	}





	function test_count_by_priority_and_status() {
        $this->loadFactories();
		$test_repo = new EE_Message_Repository();
		//let's setup some message objects with a variety of priorities and statuses.
		//high priority, idle  (invoice is high priority hence it is used as a message type).
		$messages_a = $this->factory->message->create_many( 3, array( 'STS_ID' => EEM_Message::status_idle, 'MSG_message_type' => 'invoice' ) );
		//medium priority, sent (the default message type has a priority of medium)
		$messages_b = $this->factory->message->create_many( 2, array( 'STS_ID' => EEM_Message::status_sent ) );
		//medium priority, resend (the default message type has a priority of medium)
		$messages_c = $this->factory->message->create_many( 2, array( 'STS_ID' => EEM_Message::status_resend ) );
		//low priority, resend
		$messages_d = $this->factory->message->create_many( 4, array( 'STS_ID' => EEM_Message::status_resend ) );
		//need to manually force this priority because there are no message types currently that set low priority
		foreach ( $messages_d as $message ) {
			$message->set_priority( EEM_Message::priority_low );
		}

		$all_messages = array_merge( $messages_a, $messages_b, $messages_c, $messages_d );

		//add to queue
		foreach( $all_messages as $message ) {
			$test_repo->add( $message );
		}

		//test high priority results
		$this->assertEquals( 3, $test_repo->count_by_priority_and_status( EEM_Message::priority_high ) );
		$this->assertEquals( 0, $test_repo->count_by_priority_and_status( EEM_Message::priority_high, EEM_Message::status_incomplete ) );
		$this->assertEquals( 3, $test_repo->count_by_priority_and_status( EEM_Message::priority_high, array( EEM_Message::status_incomplete, EEM_Message::status_idle ) ) );

		//test medium priority results
		$this->assertEquals( 4, $test_repo->count_by_priority_and_status( EEM_Message::priority_medium ) );
		$this->assertEquals( 2, $test_repo->count_by_priority_and_status( EEM_Message::priority_medium, EEM_Message::status_resend ) );
		$this->assertEquals( 4, $test_repo->count_by_priority_and_status( EEM_Message::priority_medium, array( EEM_Message::status_incomplete, EEM_Message::status_resend, EEM_Message::status_sent ) ) );

		//test low priority results
		$this->assertEquals( 4, $test_repo->count_by_priority_and_status( EEM_Message::priority_low, EEM_Message::status_resend ) );
	}


} //end EE_Message_Repository_Test