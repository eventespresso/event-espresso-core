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
		$this->event = new EE_UnitTest_Factory_For_Event( $this );
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
		//default args for creating events.
		$this->default_generation_definitions = array(
			'EVT_name' => new WP_UnitTest_Generator_Sequence( 'Event %s' ),
			'EVT_desc' => new WP_UnitTest_Generator_Sequence( 'Event content %s' ),
			'EVT_short_desc' => new WP_Unit_Test_Generator_Sequence( 'Event excerpt %s' ),
		);
	}


	public function create_object( $args ) {
		$event = EE_Event::new_instance( $args );
		return $event->save();
	}



	public function update_object( $EVT_ID, $cols_n_data ) {
		//all the stuff for updating an event.
		$event = EEM_Event::instance()->get_one_by_ID( $EVT_ID );
		if ( ! $event instanceof EE_Event )
			return null;
		foreach ( $cols_n_data as $key => $val ) {
			$event->set( $key, $val );
		}
		return $event->save();
	}


	public function get_object_by_id( $EVT_ID ) {
		return EEM_Event::instance()->get_one_by_ID( $EVT_ID );
	}
}
