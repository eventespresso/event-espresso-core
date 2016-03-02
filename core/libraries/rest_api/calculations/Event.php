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
		if( ! current_user_can( 'ee_read_registrations' )
			|| ! current_user_can( 'ee_read_checkins' ) ) {
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
		if( ! current_user_can( 'ee_read_registrations' )
			|| ! current_user_can( 'ee_read_checkins' ) ) {
			return null;
		}
		return \EEM_Registration::instance()->count_registrations_checked_into_event( $wpdb_row[ 'Event_CPT.ID' ], false );
	}

	/**
	 * Gets the thumbnail image
	 * @param array $wpdb_row
	 * @param \WP_REST_Request $request
	 * @param Base $controller
	 * @return array
	 */
	public static function image_thumbnail( $wpdb_row, $request, $controller ) {
		return self::_calculate_image_data($wpdb_row[ 'Event_CPT.ID' ], 'thumbnail' );
	}

	/**
	 * Gets the medium image
	 * @param array $wpdb_row
	 * @param \WP_REST_Request $request
	 * @param Base $controller
	 * @return array
	 */
	public static function image_medium( $wpdb_row, $request, $controller ) {
		return self::_calculate_image_data($wpdb_row[ 'Event_CPT.ID' ], 'medium' );
	}

	/**
	 * Gets the medium-large image
	 * @param array $wpdb_row
	 * @param \WP_REST_Request $request
	 * @param Base $controller
	 * @return array
	 */
	public static function image_medium_large( $wpdb_row, $request, $controller ) {
		return self::_calculate_image_data($wpdb_row[ 'Event_CPT.ID' ], 'medium_large' );
	}

	/**
	 * Gets the large image
	 * @param array $wpdb_row
	 * @param \WP_REST_Request $request
	 * @param Base $controller
	 * @return array
	 */
	public static function image_large( $wpdb_row, $request, $controller ) {
		return self::_calculate_image_data($wpdb_row[ 'Event_CPT.ID' ], 'large' );
	}

	/**
	 * Gets the post-thumbnail image
	 * @param array $wpdb_row
	 * @param \WP_REST_Request $request
	 * @param Base $controller
	 * @return array
	 */
	public static function image_post_thumbnail( $wpdb_row, $request, $controller ) {
		return self::_calculate_image_data($wpdb_row[ 'Event_CPT.ID' ], 'post-thumbnail' );
	}

	/**
	 * Gets the full size image
	 * @param array $wpdb_row
	 * @param \WP_REST_Request $request
	 * @param Base $controller
	 * @return array
	 */
	public static function image_full( $wpdb_row, $request, $controller ) {
		return self::_calculate_image_data($wpdb_row[ 'Event_CPT.ID' ], 'full' );
	}

	/**
	 * Gets image specs and formats them for the display in the API,
	 * according to the image size requested
	 * @param int $EVT_ID
	 * @param string $image_size one of these: thumbnail, medium, medium_large, large, post-thumbnail, full
	 * @return array|false if no such image exists. If array it will have keys 'url', 'width', 'height' and 'original'
	 */
	protected static function _calculate_image_data( $EVT_ID, $image_size ) {
		$attachment_id = get_post_thumbnail_id( $EVT_ID );
		$data = wp_get_attachment_image_src( $attachment_id, $image_size );
		if( ! $data ) {
			return false;
		}
		if( isset( $data[ 3] ) ) {
			$generated = $data[ 3 ];
		} else {
			$generated = true;
		}
		return array(
			'url' => $data[ 0 ],
			'width' => $data[ 1 ],
			'height' => $data[ 2 ],
			'generated' => $generated
		);
	}
}
