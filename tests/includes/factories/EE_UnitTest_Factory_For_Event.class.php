<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * EE Factory Class for Events
 *
 * @since        4.3.0
 * @package        Event Espresso
 * @subpackage    tests
 *
 */
class EE_UnitTest_Factory_For_Event extends WP_UnitTest_Factory_For_Thing {

	public function __construct( $factory = null ) {
		parent::__construct( $factory );
		//default args for creating events.
		$this->default_generation_definitions = array(
			'EVT_name'       => new WP_UnitTest_Generator_Sequence( 'Event %s' ),
			'EVT_desc'       => new WP_UnitTest_Generator_Sequence( 'Event content %s' ),
			'EVT_short_desc' => new WP_UnitTest_Generator_Sequence( 'Event excerpt %s' ),
			'EVT_wp_user' => 1
		);
	}



	/**
	 * used by factory to create event object
	 *
	 * @since 4.3.0
	 *
	 * @param array $args Incoming field values to set on the new object
	 *
	 * @return EE_Event|false
	 */
	public function create_object( $args ) {
        $event = EE_Event::new_instance( $args );
		$evtID = $event->save();
		return $evtID ? $event : false;
	}



	/**
	 * Update event object for given event
	 *
	 * @since 4.3.0
	 *
	 * @param int $EVT_ID Event ID for the event to update
	 * @param array $cols_n_data columns and values to change/update
	 *
	 * @return EE_Event|false
	 */
	public function update_object( $EVT_ID, $cols_n_data ) {
		//all the stuff for updating an event.
		$event = EEM_Event::instance()->get_one_by_ID( $EVT_ID );
		if ( ! $event instanceof EE_Event ) {
			return null;
		}
		foreach ( $cols_n_data as $key => $val ) {
			$event->set( $key, $val );
		}
		$success = $event->save();
		return $success ? $event : false;
	}



	/**
	 * return the event object for a given event ID
	 *
	 * @since 4.3.0
	 *
	 * @param int $EVT_ID the event id for the event to attempt to retrieve
	 *
	 * @return null|EE_Event
	 */
	public function get_object_by_id( $EVT_ID ) {
		return EEM_Event::instance()->get_one_by_ID( $EVT_ID );
	}



}
// End of file EE_UnitTest_Factory_For_Event.class.php
// Location: tests/includes/factories/EE_UnitTest_Factory_For_Event.class.php