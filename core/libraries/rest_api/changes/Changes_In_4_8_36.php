<?php namespace EventEspresso\core\libraries\rest_api\changes;
use EventEspresso\core\libraries\rest_api\controllers\model\Read;

/* 
 * The checkin and checkout endpoints were added in 4.8.36, 
 * where we just added a response headers
 */
class Changes_In_4_8_36 extends Changes_In_Base {
	/**
	 * Adds hooks so requests to 4.8.29 don't have the checkin endpoints
	 */
	public function set_hooks() {
		//set a hook to remove the "calculate" query param
		add_filter( 
			'FHEE__EED_Core_Rest_Api___get_response_selection_query_params',
			array( $this, 'remove_calculate_query_param' ),
			10,
			3
		);
		//don't add the _calculated_fields either
		add_filter( 
			'FHEE__Read__create_entity_from_wpdb_results__entity_before_inaccessible_field_removal',
			array( $this, 'remove_calculated_fields_from_response' ),
			10,
			5
		);
		//and also don't add the count headers 
		
	}
	
	/**
	 * Dont show "calculate" as an query param option in the index
	 * @param array $query_params
	 * @param \EEM_base $model
	 * @param string $version
	 * @return array
	 */
	public function remove_calculate_query_param( $query_params, \EEM_Base $model, $version ) {
		if( $this->applies_to_version( $version ) ) {
			unset( $query_params[ 'calculate' ] );
		}
		return $query_params;
	}
	
	public function remove_calculated_fields_from_response( 
		$entity_response_array, 
		\EEM_Base $model, 
		$request_context, 
		\WP_REST_Request $request, 
		Read $controller ) {
		if( $this->applies_to_version( $controller->get_model_version_info()->requested_version() ) ) {
			unset( $entity_response_array[ '_calculated_fields' ] );
		}
		return $entity_response_array;
	}
	
}

