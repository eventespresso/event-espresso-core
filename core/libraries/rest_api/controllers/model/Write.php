<?php
namespace EventEspresso\core\libraries\rest_api\controllers\model;
use EventEspresso\core\libraries\rest_api\Capabilities;
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}

/**
 *
 * Write controller for models
 *
 * Handles requests relating to GET-ting model information
 *
 * @package			Event Espresso
 * @subpackage
 * @author				Mike Nelson
 *
 */
class Write extends Base {





	public function __construct() {
		parent::__construct();
		\EE_Registry::instance()->load_helper( 'Inflector' );
	}

	/**
	 * Handles requests to get all (or a filtered subset) of entities for a particular model
	 * @param \WP_REST_Request $request
	 * @return \WP_REST_Response|\WP_Error
	 */
	public static function handle_request_insert( \WP_REST_Request $request) {
		$controller = new Write();
		try{
			$matches = $controller->parse_route(
				$request->get_route(),
				'~' . \EED_Core_Rest_Api::ee_api_namespace_for_regex . '(.*)~',
				array( 'version', 'model' )
			);
			$controller->set_requested_version( $matches[ 'version' ] );
			$model_name_singular = \EEH_Inflector::singularize_and_upper( $matches[ 'model' ] );
			if ( ! $controller->get_model_version_info()->is_model_name_in_this_version( $model_name_singular ) ) {
				return $controller->send_response(
					new \WP_Error(
						'endpoint_parsing_error',
						sprintf(
							__( 'There is no model for endpoint %s. Please contact event espresso support', 'event_espresso' ),
							$model_name_singular
						)
					)
				);
			}
			return $controller->insert(
					$controller->get_model_version_info()->load_model( $model_name_singular ),
					$request
			);
		} catch( \Exception $e ) {
			return $controller->send_response( $e );
		}
	}

	/**
	 * Gets a single entity related to the model indicated in the path and its id
	 *
	 * @param \WP_Rest_Request $request
	 * @return \WP_REST_Response|\WP_Error
	 */
	public static function handle_request_update( \WP_Rest_Request $request ) {
		$controller = new Write();
		try{
			$matches = $controller->parse_route(
				$request->get_route(),
				'~' . \EED_Core_Rest_Api::ee_api_namespace_for_regex . '(.*)/(.*)~',
				array( 'version', 'model', 'id' ) );
			$controller->set_requested_version( $matches[ 'version' ] );
			$model_name_singular = \EEH_Inflector::singularize_and_upper( $matches[ 'model' ] );
			if ( ! $controller->get_model_version_info()->is_model_name_in_this_version( $model_name_singular ) ) {
				return $controller->send_response(
					new \WP_Error(
						'endpoint_parsing_error',
						sprintf(
							__( 'There is no model for endpoint %s. Please contact event espresso support', 'event_espresso' ),
							$model_name_singular
						)
					)
				);
			}
			return $controller->send_response(
					$controller->get_entity_from_model(
							$controller->get_model_version_info()->load_model( $model_name_singular ),
							$request
						)
				);
		} catch( \Exception $e ) {
			return $controller->send_response( $e );
		}
	}

	/**
	 *
	 * Gets all the related entities (or if its a belongs-to relation just the one)
	 * to the item with the given id
	 *
	 * @param \WP_REST_Request $request
	 * @return \WP_REST_Response|\WP_Error
	 */
	public static function handle_request_update_related( \WP_REST_Request $request ) {
		$controller = new Write();
		try{
			$matches = $controller->parse_route(
				$request->get_route(),
				'~' . \EED_Core_Rest_Api::ee_api_namespace_for_regex . '(.*)/(.*)/(.*)~',
				array( 'version', 'model', 'id', 'related_model' )
			);
			$controller->set_requested_version( $matches[ 'version' ] );
			$main_model_name_singular = \EEH_Inflector::singularize_and_upper( $matches[ 'model' ] );
			if ( ! $controller->get_model_version_info()->is_model_name_in_this_version( $main_model_name_singular ) ) {
				return $controller->send_response(
					new \WP_Error(
						'endpoint_parsing_error',
						sprintf(
							__( 'There is no model for endpoint %s. Please contact event espresso support', 'event_espresso' ),
							$main_model_name_singular
						)
					)
				);
			}
			$main_model = $controller->get_model_version_info()->load_model( $main_model_name_singular );
			//assume the related model name is plural and try to find the model's name
			$related_model_name_singular = \EEH_Inflector::singularize_and_upper( $matches[ 'related_model' ] );
			if ( ! $controller->get_model_version_info()->is_model_name_in_this_version( $related_model_name_singular ) ) {
				//so the word didn't singularize well. Maybe that's just because it's a singular word?
				$related_model_name_singular = \EEH_Inflector::humanize( $matches[ 'related_model' ] );
			}
			if ( ! $controller->get_model_version_info()->is_model_name_in_this_version( $related_model_name_singular ) ) {
				return $controller->send_response(
					new \WP_Error(
						'endpoint_parsing_error',
						sprintf(
							__( 'There is no model for endpoint %s. Please contact event espresso support', 'event_espresso' ),
							$related_model_name_singular
						)
					)
				);
			}

			return $controller->send_response(
					$controller->get_entities_from_relation(
						$request->get_param( 'id' ),
						$main_model->related_settings_for( $related_model_name_singular ) ,
						$request
					)
				);
		} catch( \Exception $e ) {
			return $controller->send_response( $e );
		}
	}
	
	/**
	 * 
	 * @param \EEM_Base $model
	 * @param \WP_REST_Request $request
	 * @return WP_REST_Response
	 * @throws \EE_Error
	 */
	public function insert( \EEM_Base $model, \WP_REST_Request $request ) {
		$new_id = $model->insert( array_merge( (array)$request->get_body_params(), (array)$request->get_json_params() ) );
		if( ! $new_id ) {
			throw new \EE_Error(
				'rest_insertion_failed', 
				sprintf( __( 'Could not insert new %1$s', 'event_espresso'), $model->get_this_model_name() ) 
			);
		}
		$requested_version = $this->get_requested_version( $request->get_route() );
		$get_request = new \WP_REST_Request(
			'GET',
			\EED_Core_Rest_Api::ee_api_namespace . $requested_version . '/' . \EEH_Inflector::pluralize_and_lower(  $model->get_this_model_name() ).'/' . $new_id
		);
		$get_request->set_url_params(
			array(
				'id' => $new_id
			)
		);
		return Read::handle_request_get_one( $get_request );
	}
}


// End of file Read.php