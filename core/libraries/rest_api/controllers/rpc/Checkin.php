<?php namespace EventEspresso\core\libraries\rest_api\controllers\rpc;
use EventEspresso\core\libraries\rest_api\controllers\Base as Base;
use EventEspresso\core\libraries\rest_api\controllers\model\Read;

if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * Controller for handling checkin/checkout requests
 *
 * Handles the RPC-style requests to check a registrant into a datetime
 * or check them out
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class Checkin extends Base {
	public static function handle_checkin( $request ) {
		$controller = new Checkin();
		return $controller->_create_checkin_checkout_object( $request, true );
	}
	
	public static function handle_checkout( $request ) {
		$controller = new Checkin();
		return $controller->_create_checkin_checkout_object( $request, false );
	}
	
	/**
	 * Creates a row in the esp_checkin table given the reqest data.
	 * @param \WP_REST_Request $request
	 * @param type $in_or_out
	 */
	protected function _create_checkin_checkout_object( $request, $in_or_out ) {
		$reg_id = $request->get_param( 'REG_ID' );
		$dtt_id = $request->get_param( 'DTT_ID' );
		if( ! \EE_Capabilities::instance()->current_user_can( 'ee_edit_checkin', 'rest_api_checkin_endpoint', $reg_id ) ) {
			return $this->send_response( 
				new \WP_Error( 
					'rest_registration_invalid_id', 
					sprintf( 
						__( 'You are not allowed to checkin registration with ID $1$s.', 'event_espresso' ),
						$reg_id
					),
					array( 'status' => 403 )
				)
			);
		}
		if( ! \EEM_Datetime::instance()->exists_by_ID(  $dtt_id ) ) {
			return $this->send_response( 
				new \WP_Error( 
					'rest_datetime_invalid_id', 
					sprintf( 
						__( 'You cannot checkin registrations to datetime with ID $1$s because it does not exist.', 'event_espresso' ),
						$dtt_id
					),
					array( 'status' => 422 )
				)
			);
		}
		
		$checkin = \EE_Checkin::new_instance(
				array(
					'REG_ID' => $reg_id,
					'DTT_ID' => $dtt_id,
					'CHK_in' => $in_or_out,
					'CHK_timestamp' => time()
				));
		$success = $checkin->save();
		if( ! $success ) {
			return $this->send_response( 
				new \WP_Error( 
					'checkin_error', 
					sprintf( 
						__( 'There was an error checking the registration %1$s into datetime $2$s.', 'event_espresso' ),
						$reg_id,
						$dtt_id
					)
				)
			);
		}
		$requested_version = $this->get_requested_version( $request->get_route() );
		$get_request = new \WP_REST_Request( 
			'GET', 
			\EED_Core_Rest_Api::ee_api_namespace . $requested_version . '/checkins/' . $checkin->ID() 
		);
		$get_request->set_url_params(
			array(
				'id' => $checkin->ID()
			)
		);
		return Read::handle_request_get_one( $get_request );
	}
}