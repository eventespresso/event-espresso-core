<?php
/**
 * This file contains the EE Unit Test Factory
 *
 * @since 		4.3.0
 * @package 		Event Espresso
 * @subpackage 	tests
 */

/**
 * This is a factory for more quickly setting up objects/items needed for EE Unit Tests.
 *
 * Examples of things we might setup using the factory are events, registrations, tickets etc.
 *
 * @since 		4.3.0
 * @package 		Event Espresso
 * @subpackage 	tests
 *
 * @todo 		This is not done yet.  Just a shell as an example of what can be done.
 */
class EE_UnitTest_Factory extends WP_UnitTest_Factory {

	public function __construct() {
		parent::__construct();

		//setup any properties containing various test factory objects. EE_Test_Factories should extend the WP_UnitTest_Factory_for_Thing abstract class ( @see wp tests/includes/factory.php).  It's possible that EE might be able to extend the EE Factories (i.e. post) as well.
		//eg.
		//$this->event = new EE_UnitTest_Factory_For_Event( $this );
	}
}




/**
 * EE Factory Class for Events
 *
 * @since 		4.3.0
 * @package 		Event Espresso
 * @subpackage 	tests
 *
 * @todo 	This is not done yet.  Just have the shell as an example.
 */
class EE_UnitTest_Factory_For_Event extends WP_UnitTest_Factory_For_Thing {

	public function __construct( $factory = NULL ) {
		parent::__construct( $factory );
		$this->default_generation_definitions = array(); //default args for creating events.  We might put in here the default event column values that we want for tests.
	}


	public function create_object( $args ) {
		//all the stuff in here for creating an event.
	}



	public function update_object( $EVT_ID, $cols_n_data ) {
		//all the stuff for updating an event.
	}


	public function get_object_by_id( $EVT_ID ) {
		//all the stuff for getting an event by Event ID.
	}
}
