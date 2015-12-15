<?php
if ( !defined( 'EVENT_ESPRESSO_VERSION' ) ) {
	exit( 'No direct script access allowed' );
}
/*
 * Event Espresso
 *
 * Event Registration and Management Plugin for WordPress
 *
 * @ package		Event Espresso
 * @ author			Event Espresso
 * @ copyright	(c) 2008-2014 Event Espresso  All Rights Reserved.
 * @ license		http://eventespresso.com/support/terms-conditions/   * see Plugin Licensing *
 * @ link				http://www.eventespresso.com
 * @ version		$VID:$
 *
 * ------------------------------------------------------------------------
 */

/**
 * Class  EED_Core_REST_API
 *
 * @package			Event Espresso
 * @subpackage		eea-rest-api
 * @author 				Brent Christensen
 *
 * ------------------------------------------------------------------------
 */
class EED_Core_REST_API extends \EED_Module {

	const ee_api_namespace = 'ee/v';
	const ee_api_namespace_for_regex = 'ee\/v([^/]*)\/';
	const saved_routes_option_names = 'ee_routes';

	/**
	 * @return EED_Core_REST_API
	 */
	public static function instance() {
		return parent::get_instance( __CLASS__ );
	}



	/**
	 * 	set_hooks - for hooking into EE Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks() {
		self::set_hooks_both();
	}



	/**
	 * 	set_hooks_admin - for hooking into EE Admin Core, other modules, etc
	 *
	 *  @access 	public
	 *  @return 	void
	 */
	public static function set_hooks_admin() {
		self::set_hooks_both();
	}



	public static function set_hooks_both() {
		add_action( 'rest_api_init', array( 'EED_Core_REST_API', 'register_routes' ) );
		add_filter( 'rest_route_data', array( 'EED_Core_REST_API', 'hide_old_endpoints' ), 10, 2 );
		add_filter( 'json_index', array( 'EE_Core_REST_API_Controller_Model_Meta', 'filter_ee_metadata_into_index' ) );
	}


	/**
	 * Filters the WP routes to add our EE-related ones. This takes a bit of time
	 * so we actually prefer to only do it when an EE plugin is activated or upgraded
	 */
	public static function register_routes() {
		foreach( EED_Core_REST_API::get_ee_route_data() as $namespace => $relative_urls ) {
			foreach( $relative_urls as $endpoint => $routes ) {
				foreach( $routes as $route ) {
					register_rest_route( 
						$namespace,
						$endpoint,
						array(
							'callback' => $route[ 'callback' ],
							'methods' => $route[ 'methods' ],
							'args' => isset( $route[ 'args' ] ) ? $route[ 'args' ] : array(),
						)
					);
				}
			}
		}
	}
	
	/**
	 * Gets the EE route data
	 * @return array top-level key is the namespace, next-level key is the route and its value is array{
	 * 	@type string|array $callback 
	 * 	@type string $methods
	 * 	@type boolean $hidden_endpoint
	 * }
	 */
	public static function get_ee_route_data() { 
		$ee_routes = get_option( self::saved_routes_option_names, null );
		if( ! $ee_routes || ( defined('EE_REST_API_DEV') && EE_REST_API_DEV )){
			self::save_ee_routes();
			$ee_routes = get_option( self::saved_routes_option_names, array() );
		}
		return $ee_routes;
	}

	/**
	 * Calculates all the EE routes and saves it to a wordpress option so we don't
	 * need to calculate it on every request
	 * @return void
	 */
	public static function save_ee_routes() {
		if( EE_Maintenance_Mode::instance()->models_can_query() ){
			$instance = self::instance();
			$routes = array_replace_recursive( $instance->_register_config_routes(),  $instance->_register_meta_routes(), $instance->_register_model_routes() );
			update_option( self::saved_routes_option_names, $routes, true );
		}
	}

	/**
	 * Gets all the route information relating to EE models
	 * @return array @see get_ee_route_data
	 */
	protected function _register_model_routes() {
		EE_Registry::instance()->load_helper( 'Inflector' );
		$models_to_register = apply_filters( 'FHEE__EED_Core_REST_API___register_model_routes', EE_Registry::instance()->non_abstract_db_models );
		//let's not bother having endpoints for extra metas
		unset($models_to_register['Extra_Meta']);
		unset($models_to_register['Extra_Join']);
		$model_routes = array( );
		foreach( self::versions_served() as $version => $hidden_endpoint ) {
			
			foreach ( $models_to_register as $model_name => $model_classname ) {
				//yes we could jsut register one route for ALL models, but then they wouldn't show up in the index
				$ee_namespace = self::ee_api_namespace . $version;
				$plural_model_route = EEH_Inflector::pluralize_and_lower( $model_name );
				$singular_model_route = $plural_model_route . '/(?P<id>\d+)' ;
				
				$model_routes[ $ee_namespace ][ $plural_model_route ] = array(
						array( 
							'callback' => array( 
								'EventEspresso\core\libraries\rest_api\controllers\model\Read', 
								'handle_request_get_all' ), 
							'methods' => WP_REST_Server::READABLE,
							'hidden_endpoint' => $hidden_endpoint,
							'args' => array(
								'filter' => array(
									'required' => false,
									'default' => array(),
									'description' => __( 'See http://developer.eventespresso.com/docs/ee4-json-rest-api-reading/#Filtering_Results for documentation', 'event_espresso' ),
									),
								'include' => array(
									'required' => false,
									'default' => '*',
									'description' => __( 'See http://developer.eventespresso.com/docs/ee4-json-rest-api-reading/#Including_Specific_Fields_and_Related_Entities_in_Results for documentation', 'event_espresso' ),
								),
							),
							'_links' => array(
								'self' => rest_url( $ee_namespace . $singular_model_route ),
							)
						),
//						array(
//							'callback' => array(
//								'EventEspresso\core\libraries\rest_api\controllers\model\Write',
//								'handle_request_create_one' ),
//							'methods' => WP_REST_Server::CREATABLE,
//							'hidden_endpoint' => $hidden_endpoint
//						)
					);
				$model_routes[ $ee_namespace ][ $singular_model_route ] = array(
						array( 
							'callback' => array( 
								'EventEspresso\core\libraries\rest_api\controllers\model\Read', 
								'handle_request_get_one' ), 
							'methods' => WP_REST_Server::READABLE,
							'hidden_endpoint' => $hidden_endpoint,
							'args' => array(
								'include' => array(
									'required' => false,
									'default' => '*',
									'description' => __( 'See http://developer.eventespresso.com/docs/ee4-json-rest-api-reading/#Including_Specific_Fields_and_Related_Entities_in_Results for documentation', 'event_espresso' ),
								),
							)
						),
//						array(
//							'callback' => array(
//								'EventEspresso\core\libraries\rest_api\controllers\model\Write',
//								'handle_request_edit_one' ),
//							'methods' => WP_REST_Server::EDITABLE,
//							'hidden_endpoint' => $hidden_endpoint
//							),
				);
				//@todo: also handle  DELETE for a single item
				$model = EE_Registry::instance()->load_model( $model_classname );
				foreach ( $model->relation_settings() as $relation_name => $relation_obj ) {
					$related_model_name_endpoint_part = EventEspresso\core\libraries\rest_api\controllers\model\Read::get_related_entity_name( $relation_name, $relation_obj );
					$model_routes[ $ee_namespace ][ $singular_model_route . '/' . $related_model_name_endpoint_part ] = array(
							array( 
								'callback' => array( 
									'EventEspresso\core\libraries\rest_api\controllers\model\Read',
									'handle_request_get_related' ), 
								'methods' => WP_REST_Server::READABLE,
								'hidden_endpoint' => $hidden_endpoint,
								'args' => array(
									'filter' => array(
										'required' => false,
										'default' => array(),
										'description' => __( 'See http://developer.eventespresso.com/docs/ee4-json-rest-api-reading/#Filtering_Results for documentation', 'event_espresso' ),
									),
									'include' => array(
										'required' => false,
										'default' => '*',
										'description' => __( 'See http://developer.eventespresso.com/docs/ee4-json-rest-api-reading/#Including_Specific_Fields_and_Related_Entities_in_Results for documentation', 'event_espresso' ),
									)
								),
							),
//							array(
//								'callback' => array(
//									'EventEspresso\core\libraries\rest_api\controllers\model\Write',
//									'handle_request_create_or_update_related' ),
//								'methods' => WP_REST_Server::EDITABLE,
//								'hidden_endpoint' => $hidden_endpoint
//							)
						);
					//@todo: handle delete related and possibly remove relation (not sure hwo to distinguish)
				}
			}
		}

		return $model_routes;
	}

	/**
	 * Gets routes for the config
	 * @return array @see _register_model_routes
	 */
	protected function _register_config_routes() {
		foreach( self::versions_served() as $version => $hidden_endpoint ) {
			$config_routes[ self::ee_api_namespace . $version ][ 'config' ] = array(
					array( 
						'callback' => array( 
							'EventEspresso\core\libraries\rest_api\controllers\config\Read', 
							'handle_request' ), 
						'methods' => WP_REST_Server::READABLE,
						'hidden_endpoint' => $hidden_endpoint
						),
				);
		}
		return $config_routes;
	}

	/**
	 * Gets the meta info routes
	 * @return array @see _register_model_routes
	 */
	protected function _register_meta_routes() {
		foreach( self::versions_served() as $version => $hidden_endpoint ) {
			
			$meta_routes[ self::ee_api_namespace . $version ][ '/resources' ] = array(
				array( 
					'callback' => array( 
						'EventEspresso\core\libraries\rest_api\controllers\model\Meta', 
						'handle_request_models_meta' ), 
					'methods' => WP_REST_Server::READABLE,
					'hidden_endpoint' => $hidden_endpoint
				)
			);
		}
		return $meta_routes;
	}
	
	/**
	 * Tries to hide old 4.6 endpoints from the 
	 * @param unknown $route_data
	 */
	public function hide_old_endpoints( $route_data, $routes ) {
		foreach( EED_Core_REST_API::get_ee_route_data() as $namespace => $relative_urls ) {
			foreach( $relative_urls as $endpoint => $routes ) {
				foreach( $routes as $route ) {
					if( $route[ 'hidden_endpoint' ] ) {
						$full_route = '/' . ltrim( $namespace, '/' ) . '/' . ltrim( $endpoint, '/' );
						unset( $route_data[ $full_route ] );
					}
				}
			}
		}
		return $route_data;
	}

	/**
	 * Returns an array describing which versions of core support serving requests for.
	 * Keys are core versions' major and minor version, and values are the
	 * LOWEST requested version they can serve. Eg, 4.7 can serve requests for 4.6-like
	 * data by just removing a few models and fields from the responses. However, 4.15 might remove
	 * the answers table entirely, in which case it would be very difficult for
	 * it to serve 4.6-style responses.
	 * Versions of core that are missing from this array are unknowns.
	 * previous ver
	 * @return array
	 */
	public static function version_compatibilities() {
		return  apply_filters( 'FHEE__EED_Core_REST_API__version_compatibilities',
				array(
					'4.8.28' => '4.6.28'
				));
	}

	/**
	 * Using EED_Core_REST_API::version_compatibilities(), determines what version of
	 * EE the API can serve requests for. Eg, if we are on 4.15 of core, and
	 * we can serve reqeusts from 4.12 or later, this will return array( '4.12', '4.13', '4.14', '4.15' ).
	 * We also indicate whether or not this version should be put in the index or not
	 * @return array keys are API version numbers (just major and minor numbers), and values
	 * are whether or not they should be hidden
	 */
	public static function versions_served() {
		$version_compatibilities = EED_Core_REST_API::version_compatibilities();
		$versions_served = array();
		$lowest_compatible_version = $version_compatibilities[ EED_Core_REST_API::core_version() ];
		//for each version of core we have ever served:
		foreach( array_keys( EED_Core_REST_API::version_compatibilities() ) as $possibly_served_version ) {
			//if it's not above the current core version, and it's compatible with the current version of core
			if( $possibly_served_version < EED_Core_REST_API::core_version() && $possibly_served_version >= $lowest_compatible_version ) {
				$versions_served[ $possibly_served_version ] = true;
			}else {
				$versions_served[ $possibly_served_version ] = false;
			}
		}
		return $versions_served;
	}



	/**
	 * Gets the major and minor version of EE core's version string
	 * @return string
	 */
	public static function core_version() {
		return apply_filters( 'FHEE__EED_Core_REST_API__core_version', implode('.', array_slice( explode( '.', espresso_version() ), 0, 3 ) ) );
	}



	/**
	 *    run - initial module setup
	 *
	 * @access    public
	 * @param  WP $WP
	 * @return    void
	 */
	public function run( $WP ) {

	}



}

// End of file EED_Core_REST_API.module.php
// Location: /wp-content/plugins/eea-rest-api/EED_Core_REST_API.module.php
