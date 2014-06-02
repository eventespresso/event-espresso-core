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
		$this->datetime = new EE_UnitTest_Factory_For_Datetime( $this );
		$this->datetime_chained = new EE_UnitTest_Factory_For_Datetime( $this, true );
	}
}




/**
 * EE Factory Class for Events
 *
 * @since 		4.3.0
 * @package 		Event Espresso
 * @subpackage 	tests
 *
 */
class EE_UnitTest_Factory_For_Event extends WP_UnitTest_Factory_For_Thing {

	public function __construct( $factory = NULL ) {
		parent::__construct( $factory );
		//default args for creating events.
		$this->default_generation_definitions = array(
			'EVT_name' => new WP_UnitTest_Generator_Sequence( 'Event %s' ),
			'EVT_desc' => new WP_UnitTest_Generator_Sequence( 'Event content %s' ),
			'EVT_short_desc' => new WP_UnitTest_Generator_Sequence( 'Event excerpt %s' ),
		);
	}


	/**
	 * used by factory to create event object
	 *
	 * @param array  $args Incoming field values to set on the new object
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
	 * @param int      $EVT_ID         Event ID for the event to update
	 * @param array   $cols_n_data columns and values to change/update
	 *
	 * @return EE_Event|false
	 */
	public function update_object( $EVT_ID, $cols_n_data ) {
		//all the stuff for updating an event.
		$event = EEM_Event::instance()->get_one_by_ID( $EVT_ID );
		if ( ! $event instanceof EE_Event )
			return null;
		foreach ( $cols_n_data as $key => $val ) {
			$event->set( $key, $val );
		}
		$success = $event->save();
		return $success ? $event : false;
	}



	/**
	 * return the event object for a given event ID
	 *
	 * @param int  $EVT_ID the event id for the event to attemp to retrieve
	 *
	 * @return mixed null|EE_Event
	 */
	public function get_object_by_id( $EVT_ID ) {
		return EEM_Event::instance()->get_one_by_ID( $EVT_ID );
	}
}




/**
 * EE Factory Class for Datetimes
 *
 * @since 		4.3.0
 * @package 		Event Espresso
 * @subpackage 	tests
 *
 */
class EE_UnitTest_Factory_For_Datetime extends WP_UnitTest_Factory_For_Thing {

	/**
	 * Datetimes always have to be attached to an event, so this holds a Event default.
	 *
	 * @since  4.3.0
	 * @var EE_Event
	 */
	protected $_event;


	/**
	 * Used to indicate whether the generated objects are chained in the EE Model Heirarchy or not.
	 *
	 * @var bool
	 */
	protected $_chained;



	/**
	 * constructor
	 *
	 * @param EE_UnitTest_Factory $factory
	 * @param bool   $chained        This indicates that we are chaining this datetime to an event (instead of creating a isolated Datetime).
	 */
	public function __construct( $factory = NULL, $chained = FALSE ) {
		parent::__construct( $factory );
		$this->_chained = $chained;
		//default args for creating datetimes
		$this->default_generation_definitions = array(
			'DTT_name' => new WP_UnitTest_Generator_Sequence( 'Datetime %s' ),
			'DTT_description' => new WP_UnitTest_Generator_Sequence( 'Datetime Description %s' ),
			'DTT_EVT_start' => strtotime( '+1 month', current_time('timestamp') ),
			'DTT_EVT_end' => strtotime( '+2 months', current_time('timestamp') )
		);
	}


	/**
	 * This allows setting the $_event property to a new event object if the incoming args for the
	 * new dtt have an event id (orset to default if no evt_id)
	 *
	 * @since 4.3.0
	 * @param int $EVT_ID EE_Event ID
	 */
	private function _set_new_event( $EVT_ID = 0 ) {
		$this->_event = empty( $EVT_ID ) ? EEM_Event::instance()->get_one_by_ID( $EVT_ID ) : $this->factory->event->create();

		//failsafe just in case (so we can be sure to have an event).
		if ( empty( $this->_event ) ) {
			$this->_event = $this->factory->event->create();
		}
	}



	/**
	 * This handles connecting a datetime to the event object that's been generated.
	 *
	 * @param EE_Datetime $dtt
	 *
	 * @return EE_Datetime
	 */
	private function _maybe_chained( EE_Datetime $dtt ) {
		if ( $this->_chained ) {
			if ( empty( $this->_event ) ) {
				$EVT_ID = isset( $args['EVT_ID'] ) ? $args['EVT_ID'] : 0;
				$this->_set_new_event();
			}
			//add relation to event
			$dtt->_add_relation_to( $this->_event, 'EE_Event' );
			$dtt->save();
			return $dtt;
		}
	}


	/**
	 * used by factory to create datetime object
	 *
	 * @param array  $args Incoming field values to set on the new object
	 *
	 * @return EE_Datetime|false
	 */
	public function create_object( $args ) {
		$dtt = EE_Datetime::new_instance( $args );
		$dttID = $dtt->save();
		$dtt = $this->_maybe_chained( $dtt );
		return $dttID ? $dtt : false;
	}



	/**
	 * Update datetime object for given datetime
	 *
	 * @param int      $DTT_ID         Datetime ID for the datetime to update
	 * @param array   $cols_n_data columns and values to change/update
	 *
	 * @return EE_Datetime|false.
	 */
	public function update_object( $DTT_ID, $cols_n_data ) {
		//all the stuff for updating an datetime.
		$dtt = EEM_Datetime::instance()->get_one_by_ID( $DTT_ID );
		if ( ! $dtt instanceof EE_Datetime )
			return null;
		foreach ( $cols_n_data as $key => $val ) {
			$dtt->set( $key, $val );
		}
		$success = $dtt->save();
		return $success ? $dtt : false;
	}




	/**
	 * return the datetime object for a given datetime ID
	 *
	 * @param int  $DTT_ID the datetime id for the datetime to attemp to retrieve
	 *
	 * @return mixed null|EE_Datetime
	 */
	public function get_object_by_id( $DTT_ID ) {
		return EEM_Datetime::instance()->get_one_by_ID( $DTT_ID );
	}
}
