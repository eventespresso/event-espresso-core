<?php
/**
 * Tests for EEM_Message
 * @package Event Espresso
 * @author  Darren Ethier
 * @since   4.9.0
 * @group   messages
 */
class EEM_Message_Test extends EE_UnitTestCase {

	public function test_debug() {
		//for this test we need to ensure the constant isn't set, otherwise fail immediately.
		if ( defined( 'EE_DEBUG_MESSAGES' ) ) {
			$this->fail( __METHOD__ . ' cannot be tested because the EE_DEBUG_MESSAGES constant has been set somewhere. Please ensure this constant isn\'t set for unit tests' );
		}

		//set constant and ensure it defaults to true.
		define( 'EE_DEBUG_MESSAGES', true );
		$this->assertTrue( EEM_Message::debug() );

		//ensure it continues to return true
		$this->assertTrue( EEM_Message::debug() );

		//set false and ensure it continues to return false
		EEM_Message::debug( false );
		$this->assertFalse( EEM_Message::debug() );

		//set true and ensure it continues to return true
		EEM_Message::debug( true );
		$this->assertTrue( EEM_Message::debug() );

		//filter so it always returns true.
		add_filter( 'FHEE__EEM_Message__debug', '__return_true' );
		EEM_Message::debug( false );
		$this->assertTrue( EEM_Message::debug() );

		//remove filter and restore to default.
		remove_filter( 'FHEE__EEM_Message__debug', '__return_true' );
		EEM_Message::debug( false );
	}
}
