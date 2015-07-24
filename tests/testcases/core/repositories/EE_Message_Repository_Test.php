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
 */
class EE_Message_Repository_Test extends EE_UnitTestCase {


	/**
	 * @return EE_Message_Repository
	 */
	function test_add() {
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
		$test_repo->remove( $message, true );
		$this->assertEmpty( EEM_Message::instance()->get_one_by_ID( $msgid ) );
	}


	/**
	 * @return EE_Message_Repository
	 */
	function test_saveAll() {
		//create a bunch of message objects and add to repo.
		$test_repo = new EE_Message_Repository();
		$generation_data = array( 'MSG_generation_data' => array(
			'REG_ID' => 12
		));
		$messages = array();
		for( $i=0;$i<5;$i++) {
			$message = $this->factory->message->create( array( 'nosave' => 1 ) );
			//verify not saved
			$this->assertEquals( 0, $message->ID() );
			$messages[] = $message;
			$test_repo->add( $message, $generation_data, true );
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


} //end EE_Message_Repository_Test