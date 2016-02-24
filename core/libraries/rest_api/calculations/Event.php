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
		$event_obj = \EEM_Event::instance()->get_one_by_ID( $wpdb_row[ 'Event_CPT.ID' ] );
		return $event_obj->total_available_spaces( true );
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
		$event_obj = \EEM_Event::instance()->get_one_by_ID( $wpdb_row[ 'Event_CPT.EVT_ID' ] );
		return $event_obj->total_available_spaces( false );
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
		$event_obj = \EEM_Event::instance()->get_one_by_ID( $wpdb_row[ 'Event_CPT.EVT_ID' ] );
		return $event_obj->spaces_remaining_for_sale();
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
		return \EEM_Registration::instance()->count(
			array(
				array(
					'EVT_ID' => $wpdb_row[ 'Event_CPT.ID' ],
					'STS_ID' => \EEM_Registration::status_id_approved ) ),
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
	 * @return int
	 */
	public static function registrations_checked_in_count( $wpdb_row, $request, $controller ){
		return \EEM_Registration::instance()->count(
			array(
				array(
					'Checkin.CHK_in' => true,
					'Checkin.Datetime.EVT_ID' => $wpdb_row[ 'Event_CPT.ID' ]
				)
			)
		);
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
		return \EEM_Registration::instance()->count(
			array(
				array(
					'Checkin.CHK_in' => true,
					'Checkin.Datetime.EVT_ID' => $wpdb_row[ 'Event_CPT.ID' ]
				)
			)
		);
	}
}
