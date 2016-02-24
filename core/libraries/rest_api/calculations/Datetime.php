<?php
namespace EventEspresso\core\libraries\rest_api\calculations;
use EventEspresso\core\libraries\rest_api\controllers\model\Base;
/**
 *
 * Class Datetime
 *
 * Calculations relating to datetimes
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

class Datetime {
	/**
	 * Calculates the total spaces available on the datetime, taking into account
	 * ticket limits too.
	 * @see EE_Datetime::spaces_remaining( true )
	 * @param array $wpdb_row
	 * @param WP_Request $request
	 * @param Base $controller
	 * @return int
	 */
	public static function spaces_remaining_considering_tickets( $wpdb_row, $request, $controller ){
		$dtt_obj = \EEM_Datetime::instance()->get_one_by_ID( $wpdb_row[ 'Datetime.DTT_ID' ] );
		return $dtt_obj->spaces_remaining( true );
	}
	
	/**
	 * Counts registrations who have checked into this datetime
	 * @param array $wpdb_row
	 * @param WP_Request $request
	 * @param Base $controller
	 * @return int
	 */
	public static function registrations_checked_in_count( $wpdb_row, $request, $controller ){
		return \EEM_Registration::instance()->count(
			array(
				array(
					'Checkin.CHK_in' => true,
					'Checkin.DTT_ID' => $wpdb_row[ 'Datetime.DTT_ID' ]
				)
			)
		);
	}
	
	/**
	 * Counts registrations who have checked out of this datetime
	 * @param array $wpdb_row
	 * @param WP_Request $request
	 * @param Base $controller
	 * @return int
	 */
	public static function registrations_checked_out_count( $wpdb_row, $request, $controller ){
		return \EEM_Registration::instance()->count(
			array(
				array(
					'Checkin.CHK_in' => false,
					'Checkin.DTT_ID' => $wpdb_row[ 'Datetime.DTT_ID' ]
				)
			)
		);
	}
}
