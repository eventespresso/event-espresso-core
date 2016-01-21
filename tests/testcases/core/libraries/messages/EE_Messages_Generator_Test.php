<?php
/**
 * Contains test class for /core/libraries/messages/EE_Messages_Generator.lib.php
 *
 * @since  		4.9.0
 * @package 	Event Espresso
 * @subpackage 	tests
 */

/**
 * All tests for the EE_Messages_Generator class.
 *
 * Note: the following public methods in this class are implicitly tested via the EE_Messages_Processor_Test
 * - generate() (and the children methods it calls)
 * - create_and_add_message_to_queue() (and the children it depends on)
 *
 * @since 		4.9.0
 * @package 	Event Espresso
 * @subpackage 	tests
 * @group       messages
 */
class EE_Messages_Generator_Test extends EE_UnitTestCase {


	/**
	 * @return EE_Messages_Generator
	 */
	function test_construct() {
		/** @type EE_Messages_Generator $generator */
		$generator = EE_Registry::instance()->load_lib( 'Messages_Generator' );
		//assert $generator loaded okay
		$this->assertInstanceOf( 'EE_Messages_Generator', $generator );
		return $generator;
	}






} //end EE_Messages_Generator_Test class