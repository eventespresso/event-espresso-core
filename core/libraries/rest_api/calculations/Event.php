<?php
namespace EventEspresso\core\libraries\rest_api\calculations;
use EventEspresso\core\libraries\rest_api\controllers\model\Base;
/**
 *
 * Class Event_Calculations
 *
 * Description here
 *
 * @package         Event Espresso
 * @subpackage
 * @author				Mike Nelson
 * @since		 	   $VID:$
 *
 */
if( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

class Event {
	/**
	 * Calculates the total spaces on the event (not subtracting sales, but taking
	 * sales into account; so this is the optimum sales that CAN still be achieved)
	 * See EE_Event::total_available_spaces( true );
	 *
	 * @param array $wpdb_row
	 * @param \WP_REST_Request $request
	 * @param Base $controller
	 * @return int
	 */
	public static function optimum_sales_at_start( $wpdb_row, $request, $controller ){
		if( is_array( $wpdb_row ) && isset( $wpdb_row[ 'Event_CPT.ID' ] ) ) {
			$event_obj = \EEM_Event::instance()->get_one_by_ID( $wpdb_row[ 'Event_CPT.ID' ] );
		} else {
			$event_obj = null;
		}
		if( $event_obj instanceof \EE_Event ) {
			return $event_obj->total_available_spaces( true );
		} else {
			throw new \EE_Error( 
				sprintf( 
					__( 'Cannot calculate optimum_sales_at_start because the event with ID %1$s (from database row %2$s) was not found', 'event_espresso' ),
					$wpdb_row[ 'Event_CPT.ID' ], 
					print_r( $wpdb_row, true )
				)
			);
		}
	}

	/**
	 * Calculates the total spaces on the event (ignoring all sales; so this is the optimum
	 * sales that COULD have been achieved)
	 * See EE_Event::total_available_spaces( true );
	 *
	 * @param array $wpdb_row
	 * @param \WP_REST_Request $request
	 * @param Base $controller
	 * @return int
	 */
	public static function optimum_sales_now( $wpdb_row, $request, $controller ){
		if( is_array( $wpdb_row ) && isset( $wpdb_row[ 'Event_CPT.ID' ] ) ) {
			$event_obj = \EEM_Event::instance()->get_one_by_ID( $wpdb_row[ 'Event_CPT.ID' ] );
		} else {
			$event_obj = null;
		}
		if( $event_obj instanceof \EE_Event ) {
			return $event_obj->total_available_spaces( false );
		} else {
			throw new \EE_Error( 
				sprintf( 
					__( 'Cannot calculate optimum_sales_now because the event with ID %1$s (from database row %2$s) was not found', 'event_espresso' ),
					$wpdb_row[ 'Event_CPT.ID' ], 
					print_r( $wpdb_row, true )
				)
			);
		}
	}

	/**
	 * Like optimum_sales_now, but minus total sales so far.
	 * See EE_Event::spaces_remaining_for_sale( true );
	 *
	 * @param array $wpdb_row
	 * @param \WP_REST_Request $request
	 * @param Base $controller
	 * @return int
	 */
	public static function spaces_remaining( $wpdb_row, $request, $controller ){
		if( is_array( $wpdb_row ) && isset( $wpdb_row[ 'Event_CPT.ID' ] ) ) {
			$event_obj = \EEM_Event::instance()->get_one_by_ID( $wpdb_row[ 'Event_CPT.ID' ] );
		} else {
			$event_obj = null;
		}
		if( $event_obj instanceof \EE_Event ) {
			return $event_obj->spaces_remaining_for_sale();
		} else {
			throw new \EE_Error( 
				sprintf( 
					__( 'Cannot calculate spaces_remaining because the event with ID %1$s (from database row %2$s) was not found', 'event_espresso' ),
					$wpdb_row[ 'Event_CPT.ID' ], 
					print_r( $wpdb_row, true )
				)
			);
		}
	}

	/**
	 * Counts the number of approved registrations for this event (regardless
	 * of how many datetimes each registrations' ticket purchase is for)
	 *
	 * @param array $wpdb_row
	 * @param \WP_REST_Request $request
	 * @param Base $controller
	 * @return int
	 */
	public static function spots_taken( $wpdb_row, $request, $controller ){
		if( ! is_array( $wpdb_row ) || ! isset( $wpdb_row[ 'Event_CPT.ID' ] ) ) {
			throw new \EE_Error( 
				sprintf( 
					__( 'Cannot calculate spots_taken because the database row %1$s does not have an entry for "Event_CPT.ID"', 'event_espresso' ),
					print_r( $wpdb_row, true )
				)
			);
		}
		return \EEM_Registration::instance()->count(
			array(
				array(
					'EVT_ID' => $wpdb_row[ 'Event_CPT.ID' ],
					'STS_ID' => \EEM_Registration::status_id_approved
				)
			),
			'REG_ID',
			true
		);
	}

	/**
	 * Counts the number of pending-payment registrations for this event (regardless
	 * of how many datetimes each registrations' ticket purchase is for)
	 *
	 * @param array $wpdb_row
	 * @param \WP_REST_Request $request
	 * @param Base $controller
	 * @return int
	 */
	public static function spots_taken_pending_payment( $wpdb_row, $request, $controller ){
		if( ! is_array( $wpdb_row ) || ! isset( $wpdb_row[ 'Event_CPT.ID' ] ) ) {
			throw new \EE_Error( 
				sprintf( 
					__( 'Cannot calculate spots_taken_pending_payment because the database row %1$s does not have an entry for "Event_CPT.ID"', 'event_espresso' ),
					print_r( $wpdb_row, true )
				)
			);
		}
		if( ! current_user_can( 'ee_read_registrations' ) ) {
			return null;
		}
		return \EEM_Registration::instance()->count(
			array(
				array(
					'EVT_ID' => $wpdb_row[ 'Event_CPT.ID' ],
					'STS_ID' => \EEM_Registration::status_id_pending_payment
				)
			),
			'REG_ID',
			true
		);
	}



	/**
	 * Counts all the registrations who have checked into one of this events' datetimes
	 * See EE_Event::total_available_spaces( false );
	 *
	 * @param array $wpdb_row
	 * @param \WP_REST_Request $request
	 * @param Base $controller
	 * @return int|null if permission denied
	 */
	public static function registrations_checked_in_count( $wpdb_row, $request, $controller ){
		if( ! is_array( $wpdb_row ) || ! isset( $wpdb_row[ 'Event_CPT.ID' ] ) ) {
			throw new \EE_Error( 
				sprintf( 
					__( 'Cannot calculate registrations_checked_in_count because the database row %1$s does not have an entry for "Event_CPT.ID"', 'event_espresso' ),
					print_r( $wpdb_row, true )
				)
			);
		}
		if( ! current_user_can( 'ee_read_checkins' ) ) {
			return null;
		}
		return \EEM_Registration::instance()->count_registrations_checked_into_event( $wpdb_row[ 'Event_CPT.ID' ], true );
	}

	/**
	 * Counts all the registrations who have checked out of one of this events' datetimes
	 * See EE_Event::total_available_spaces( false );
	 *
	 * @param array $wpdb_row
	 * @param \WP_REST_Request $request
	 * @param Base $controller
	 * @return int
	 */
	public static function registrations_checked_out_count( $wpdb_row, $request, $controller ){
		if( ! is_array( $wpdb_row ) || ! isset( $wpdb_row[ 'Event_CPT.ID' ] ) ) {
			throw new \EE_Error( 
				sprintf( 
					__( 'Cannot calculate registrations_checked_out_count because the database row %1$s does not have an entry for "Event_CPT.ID"', 'event_espresso' ),
					print_r( $wpdb_row, true )
				)
			);
		}
		if( ! current_user_can( 'ee_read_checkins' ) ) {
			return null;
		}
		return \EEM_Registration::instance()->count_registrations_checked_into_event( $wpdb_row[ 'Event_CPT.ID' ], false );
	}
}
