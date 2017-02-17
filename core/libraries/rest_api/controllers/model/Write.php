<?php
namespace EventEspresso\core\libraries\rest_api\controllers\model;
use EventEspresso\core\libraries\rest_api\Capabilities;
use EventEspresso\core\libraries\rest_api\Model_Data_Translator;
use EventEspresso\core\libraries\rest_api\Rest_Exception;
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
		Capabilities::verify_at_least_partial_access_to( $model, \EEM_Base::caps_edit, 'create' );
        $default_cap_to_check_for = \EE_Restriction_Generator_Base::get_default_restrictions_cap();
        if(!current_user_can($default_cap_to_check_for)){
            throw new Rest_Exception(
                'rest_cannot_create_' . \EEH_Inflector::pluralize_and_lower(($model->get_this_model_name())),
                sprintf(
                    esc_html__('For now, only those with the admin capability to "%1$s" are allowed to use the REST API to insert data into Event Espresso.', 'event_espresso'),
                    $default_cap_to_check_for
                ),
                array('status' => 403)
            );
        }
        $submitted_json_data = array_merge( (array)$request->get_body_params(), (array)$request->get_json_params() );
        $model_data = Model_Data_Translator::prepare_conditions_query_params_for_models(
            $submitted_json_data,
            $model,
            $this->get_model_version_info()->requested_version()
        );
        $model_obj = \EE_Registry::instance()
                                ->load_class($model->get_this_model_name(), array($model_data,$model->get_timezone()),
                                    false, false);
        $model_obj->save();
		$new_id = $model_obj->ID();
		if( ! $new_id ) {
			throw new Rest_Exception(
				'rest_insertion_failed', 
				sprintf( __( 'Could not insert new %1$s', 'event_espresso'), $model->get_this_model_name() )
			);
		}
		//ok so is that the sort of thing they are allowed to edit?
		if( 
			apply_filters( 
				'FHEE__EventEspresso\core\libraries\rest_api\controllers\model\Write__insert__allowed',
				$model->exists( 
					$model->alter_query_params_to_restrict_by_ID( 
						$new_id, 
						array( 
							'caps' => \EEM_Base::caps_edit 
						) 
					) 
				),
				$model,
				$new_id, 
				$request
			)
		) {
		} else {
			return new \WP_Error(
					'rest_user_cannot_insert',
					sprintf(
						__( 'Sorry, you cannot insert a new %1$s with properties %2$s. Missing permissions are: %3$s', 'event_espresso' ),
						strtolower( $model->get_this_model_name() ),
						apply_filters( 
							'FHEE__EventEspresso\core\libraries\rest_api\controllers\model\Write__insert__caps_missing',
							Capabilities::get_missing_permissions_string(
							$model,
							$this->validate_context( \EEM_Base::caps_edit ) ),
							$model,
							$new_id,
							$request
						)
					),
					array( 'status' => 403 )
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