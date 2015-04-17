<?php if ( ! defined('EVENT_ESPRESSO_VERSION')) { exit('No direct script access allowed'); }
/**
 * EE Factory Class for Venues
 *
 * @since        4.3.0
 * @package        Event Espresso
 * @subpackage    tests
 *
 */
class EE_UnitTest_Factory_For_Venue extends WP_UnitTest_Factory_For_Thing {

	public function __construct( $factory = null ) {
		parent::__construct( $factory );
		//default args for creating events.
		$this->default_generation_definitions = array(
			'VNU_name'       => new WP_UnitTest_Generator_Sequence( 'Venue %s' ),
			'VNU_desc'       => new WP_UnitTest_Generator_Sequence( 'Venue content %s' ),
			'VNU_short_desc' => new WP_UnitTest_Generator_Sequence( 'Venue excerpt %s' ),
		);
	}



	/**
	 * used by factory to create venue object
	 *
	 * @since 4.3.0
	 *
	 * @param array $args Incoming field values to set on the new object
	 *
	 * @return EE_Venue|false
	 */
	public function create_object( $args ) {
		$venue = EE_Venue::new_instance( $args );
		$venID = $venue->save();
		return $venID ? $venue : false;
	}



	/**
	 * Update venue object for given venue
	 *
	 * @since 4.3.0
	 *
	 * @param int $VNU_ID Venue ID for the event to update
	 * @param array $cols_n_data columns and values to change/update
	 *
	 * @return EE_Venue|false
	 */
	public function update_object( $VNU_ID, $cols_n_data ) {
		//all the stuff for updating an event.
		$venue = EEM_Venue::instance()->get_one_by_ID( $VNU_ID );
		if ( ! $venue instanceof EE_Venue ) {
			return null;
		}
		foreach ( $cols_n_data as $key => $val ) {
			$venue->set( $key, $val );
		}
		$success = $venue->save();
		return $success ? $venue : false;
	}



	/**
	 * return the venue object for a given venue ID
	 *
	 * @since 4.3.0
	 *
	 * @param int $VNU_ID the venue id for the venue to attempt to retrieve
	 *
	 * @return mixed null|EE_Venue
	 */
	public function get_object_by_id( $VNU_ID ) {
		return EEM_Venue::instance()->get_one_by_ID( $VNU_ID );
	}



}
// End of file EE_UnitTest_Factory_For_Venue.class.php
// Location: /EE_UnitTest_Factory_For_Venue.class.php