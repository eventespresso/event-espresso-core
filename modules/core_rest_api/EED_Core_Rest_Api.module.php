<?php
use EventEspresso\core\libraries\rest_api\Calculated_Model_Fields;
use EventEspresso\core\libraries\rest_api\controllers\model\Read as ModelRead;
use EventEspresso\core\libraries\rest_api\changes\Changes_In_Base;
use EventEspresso\core\libraries\rest_api\Model_Version_Info;

defined('EVENT_ESPRESSO_VERSION') || exit;



/**
 * Class  EED_Core_Rest_Api
 *
 * @package            Event Espresso
 * @subpackage         eea-rest-api
 * @author             Mike Nelson
 */
class EED_Core_Rest_Api extends \EED_Module
{

    const ee_api_namespace           = 'ee/v';

    const ee_api_namespace_for_regex = 'ee\/v([^/]*)\/';

    const saved_routes_option_names  = 'ee_core_routes';

    /**
     * string used in _links response bodies to make them globally unique.
     *
     * @see http://v2.wp-api.org/extending/linking/
     */
    const ee_api_link_namespace = 'https://api.eventespresso.com/';

    /**
     * @var Calculated_Model_Fields
     */
    protected static $_field_calculator = null;



    /**
     * @return EED_Core_Rest_Api
     */
    public static function instance()
    {
        self::$_field_calculator = new Calculated_Model_Fields();
        return parent::get_instance(__CLASS__);
    }



    /**
     *    set_hooks - for hooking into EE Core, other modules, etc
     *
     * @access    public
     * @return    void
     */
    public static function set_hooks()
    {
        self::set_hooks_both();
    }



    /**
     *    set_hooks_admin - for hooking into EE Admin Core, other modules, etc
     *
     * @access    public
     * @return    void
     */
    public static function set_hooks_admin()
    {
        self::set_hooks_both();
    }



    public static function set_hooks_both()
    {
        add_action('rest_api_init', array('EED_Core_Rest_Api', 'register_routes'), 10);
        add_action('rest_api_init', array('EED_Core_Rest_Api', 'set_hooks_rest_api'), 5);
        add_filter('rest_route_data', array('EED_Core_Rest_Api', 'hide_old_endpoints'), 10, 2);
        add_filter('rest_index',
            array('EventEspresso\core\libraries\rest_api\controllers\model\Meta', 'filter_ee_metadata_into_index'));
        EED_Core_Rest_Api::invalidate_cached_route_data_on_version_change();
    }



    /**
     * sets up hooks which only need to be included as part of REST API requests;
     * other requests like to the frontend or admin etc don't need them
     */
    public static function set_hooks_rest_api()
    {
        //set hooks which account for changes made to the API
        EED_Core_Rest_Api::_set_hooks_for_changes();
    }



    /**
     * public wrapper of _set_hooks_for_changes.
     * Loads all the hooks which make requests to old versions of the API
     * appear the same as they always did
     */
    public static function set_hooks_for_changes()
    {
        self::_set_hooks_for_changes();
    }







    /**
     * Loads all the hooks which make requests to old versions of the API
     * appear the same as they always did
     */
    protected static function _set_hooks_for_changes()
    {
        $folder_contents = EEH_File::get_contents_of_folders(array(EE_LIBRARIES . 'rest_api' . DS . 'changes'), false);
        foreach ($folder_contents as $classname_in_namespace => $filepath) {
            //ignore the base parent class
            if ($classname_in_namespace === 'Changes_In_Base') {
                continue;
            }
            $full_classname = 'EventEspresso\core\libraries\rest_api\changes\\' . $classname_in_namespace;
            if (class_exists($full_classname)) {
                $instance_of_class = new $full_classname;
                if ($instance_of_class instanceof Changes_In_Base) {
                    $instance_of_class->set_hooks();
                }
            }
        }
    }



    /**
     * Filters the WP routes to add our EE-related ones. This takes a bit of time
     * so we actually prefer to only do it when an EE plugin is activated or upgraded
     */
    public static function register_routes()
    {
        foreach (EED_Core_Rest_Api::get_ee_route_data() as $namespace => $relative_urls) {
            foreach ($relative_urls as $endpoint => $routes) {
                foreach ($routes as $route) {
                    $route_args = array(
                        array(
                            'callback' => $route['callback'],
                            'methods'  => $route['methods'],
                            'args'     => isset($route['args']) ? $route['args'] : array(),
                        )
                    );
                    if (isset($route['schema_callback'])) {
                        $model_name = isset($route['schema_callback'][0])
                            ? $route['schema_callback'][0]
                            : '';
                        $version = isset( $route['schema_callback'][1])
                            ? $route['schema_callback'][1]
                            : '';
                        if (! empty($model_name) && ! empty($version)) {
                            $route_args['schema'] = function () use ($model_name, $version) {
                                return ModelRead::handle_schema_request(
                                    $model_name,
                                    $version
                                );
                            };
                        }
                    }
                    register_rest_route(
                        $namespace,
                        $endpoint,
                        $route_args
                    );
                }
            }
        }
    }



    /**
     * Checks if there was a version change or something that merits invalidating the cached
     * route data. If so, invalidates the cached route data so that it gets refreshed
     * next time the WP API is used
     */
    public static function invalidate_cached_route_data_on_version_change()
    {
        if (EE_System::instance()->detect_req_type() != EE_System::req_type_normal) {
            EED_Core_Rest_Api::invalidate_cached_route_data();
        }
        foreach (EE_Registry::instance()->addons as $addon) {
            if ($addon instanceof EE_Addon && $addon->detect_req_type() != EE_System::req_type_normal) {
                EED_Core_Rest_Api::invalidate_cached_route_data();
            }
        }
    }



    /**
     * Removes the cached route data so it will get refreshed next time the WP API is used
     */
    public static function invalidate_cached_route_data()
    {
        //delete the saved EE REST API routes
        foreach (EED_Core_Rest_Api::versions_served() as $version => $hidden) {
            delete_option(EED_Core_Rest_Api::saved_routes_option_names . $version);
        }
    }



    /**
     * Gets the EE route data
     *
     * @return array top-level key is the namespace, next-level key is the route and its value is array{
     * @type string|array $callback
     * @type string       $methods
     * @type boolean      $hidden_endpoint
     * }
     */
    public static function get_ee_route_data()
    {
        $ee_routes = array();
        foreach (self::versions_served() as $version => $hidden_endpoints) {
            $ee_routes[self::ee_api_namespace . $version] = self::_get_ee_route_data_for_version($version,
                $hidden_endpoints);
        }
        return $ee_routes;
    }



    /**
     * Gets the EE route data from the wp options if it exists already,
     * otherwise re-generates it and saves it to the option
     *
     * @param string  $version
     * @param boolean $hidden_endpoints
     * @return array
     */
    protected static function _get_ee_route_data_for_version($version, $hidden_endpoints = false)
    {
        $ee_routes = get_option(self::saved_routes_option_names . $version, null);
        if ( ! $ee_routes || (defined('EE_REST_API_DEBUG_MODE') && EE_REST_API_DEBUG_MODE)) {
            $ee_routes = self::_save_ee_route_data_for_version($version, $hidden_endpoints);
        }
        return $ee_routes;
    }



    /**
     * Saves the EE REST API route data to a wp option and returns it
     *
     * @param string  $version
     * @param boolean $hidden_endpoints
     * @return mixed|null|void
     */
    protected static function _save_ee_route_data_for_version($version, $hidden_endpoints = false)
    {
        $instance = self::instance();
        $routes = apply_filters(
            'EED_Core_Rest_Api__save_ee_route_data_for_version__routes',
            array_replace_recursive(
                $instance->_get_config_route_data_for_version($version, $hidden_endpoints),
                $instance->_get_meta_route_data_for_version($version, $hidden_endpoints),
                $instance->_get_model_route_data_for_version($version, $hidden_endpoints),
                $instance->_get_rpc_route_data_for_version($version, $hidden_endpoints)
            )
        );
        $option_name = self::saved_routes_option_names . $version;
        if (get_option($option_name)) {
            update_option($option_name, $routes, true);
        } else {
            add_option($option_name, $routes, null, 'no');
        }
        return $routes;
    }



    /**
     * Calculates all the EE routes and saves it to a wordpress option so we don't
     * need to calculate it on every request
     *
     * @deprecated since version 4.9.1
     * @return void
     */
    public static function save_ee_routes()
    {
        if (EE_Maintenance_Mode::instance()->models_can_query()) {
            $instance = self::instance();
            $routes = apply_filters(
                'EED_Core_Rest_Api__save_ee_routes__routes',
                array_replace_recursive(
                    $instance->_register_config_routes(),
                    $instance->_register_meta_routes(),
                    $instance->_register_model_routes(),
                    $instance->_register_rpc_routes()
                )
            );
            update_option(self::saved_routes_option_names, $routes, true);
        }
    }



    /**
     * Gets all the route information relating to EE models
     *
     * @return array @see get_ee_route_data
     * @deprecated since version 4.9.1
     */
    protected function _register_model_routes()
    {
        $model_routes = array();
        foreach (self::versions_served() as $version => $hidden_endpoint) {
            $model_routes[EED_Core_Rest_Api::ee_api_namespace
                          . $version] = $this->_get_config_route_data_for_version($version, $hidden_endpoint);
        }
        return $model_routes;
    }



    /**
     * Gets the route data for EE models in the specified version
     *
     * @param string  $version
     * @param boolean $hidden_endpoint
     * @return array
     */
    protected function _get_model_route_data_for_version($version, $hidden_endpoint = false)
    {
        $model_version_info = new Model_Version_Info($version);
        $models_to_register = apply_filters(
            'FHEE__EED_Core_REST_API___register_model_routes',
            $model_version_info->models_for_requested_version()
        );
        //let's not bother having endpoints for extra metas
        unset($models_to_register['Extra_Meta']);
        unset($models_to_register['Extra_Join']);
        $model_routes = array();
        foreach ($models_to_register as $model_name => $model_classname) {
            $model = \EE_Registry::instance()->load_model($model_name);

            //if this isn't a valid model then let's skip iterate to the next item in the loop.
            if (! $model instanceof EEM_Base) {
                continue;
            }

            //yes we could just register one route for ALL models, but then they wouldn't show up in the index
            $plural_model_route = EEH_Inflector::pluralize_and_lower($model_name);
            $singular_model_route = $plural_model_route . '/(?P<id>\d+)';
            $model_routes[$plural_model_route] = array(
                array(
                    'callback'        => array(
                        'EventEspresso\core\libraries\rest_api\controllers\model\Read',
                        'handle_request_get_all',
                    ),
                    'methods'         => WP_REST_Server::READABLE,
                    'hidden_endpoint' => $hidden_endpoint,
                    'args'            => $this->_get_read_query_params($model, $version),
                    '_links'          => array(
                        'self' => rest_url(EED_Core_Rest_Api::ee_api_namespace . $version . $singular_model_route),
                    ),
                    'schema_callback' => array($model_name, $version)
                ),
                //						array(
                //							'callback' => array(
                //								'EventEspresso\core\libraries\rest_api\controllers\model\Write',
                //								'handle_request_create_one' ),
                //							'methods' => WP_REST_Server::CREATABLE,
                //							'hidden_endpoint' => $hidden_endpoint
                //						)
            );
            $model_routes[$singular_model_route] = array(
                array(
                    'callback'        => array(
                        'EventEspresso\core\libraries\rest_api\controllers\model\Read',
                        'handle_request_get_one',
                    ),
                    'methods'         => WP_REST_Server::READABLE,
                    'hidden_endpoint' => $hidden_endpoint,
                    'args'            => $this->_get_response_selection_query_params($model, $version),
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
            foreach ($model_version_info->relation_settings($model) as $relation_name => $relation_obj) {
                $related_model_name_endpoint_part = ModelRead::get_related_entity_name(
                    $relation_name,
                    $relation_obj
                );
                $model_routes[$singular_model_route . '/' . $related_model_name_endpoint_part] = array(
                    array(
                        'callback'        => array(
                            'EventEspresso\core\libraries\rest_api\controllers\model\Read',
                            'handle_request_get_related',
                        ),
                        'methods'         => WP_REST_Server::READABLE,
                        'hidden_endpoint' => $hidden_endpoint,
                        'args'            => $this->_get_read_query_params($relation_obj->get_other_model(), $version),
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
        return $model_routes;
    }



    /**
     * Adds all the RPC-style routes (remote procedure call-like routes, ie
     * routes that don't conform to the traditional REST CRUD-style).
     *
     * @deprecated since 4.9.1
     */
    protected function _register_rpc_routes()
    {
        $routes = array();
        foreach (self::versions_served() as $version => $hidden_endpoint) {
            $routes[self::ee_api_namespace . $version] = $this->_get_rpc_route_data_for_version($version,
                $hidden_endpoint);
        }
        return $routes;
    }



    /**
     * @param string  $version
     * @param boolean $hidden_endpoint
     * @return array
     */
    protected function _get_rpc_route_data_for_version($version, $hidden_endpoint = false)
    {
        $this_versions_routes = array();
        //checkin endpoint
        $this_versions_routes['registrations/(?P<REG_ID>\d+)/toggle_checkin_for_datetime/(?P<DTT_ID>\d+)'] = array(
            array(
                'callback'        => array(
                    'EventEspresso\core\libraries\rest_api\controllers\rpc\Checkin',
                    'handle_request_toggle_checkin',
                ),
                'methods'         => WP_REST_Server::CREATABLE,
                'hidden_endpoint' => $hidden_endpoint,
                'args'            => array(
                    'force' => array(
                        'required'    => false,
                        'default'     => false,
                        'description' => __('Whether to force toggle checkin, or to verify the registration status and allowed ticket uses',
                            'event_espresso'),
                    ),
                ),
            ),
        );
        return apply_filters(
            'FHEE__EED_Core_Rest_Api___register_rpc_routes__this_versions_routes',
            $this_versions_routes,
            $version,
            $hidden_endpoint
        );
    }



    /**
     * Gets the query params that can be used when request one or many
     *
     * @param EEM_Base $model
     * @param string   $version
     * @return array
     */
    protected function _get_response_selection_query_params(\EEM_Base $model, $version)
    {
        return apply_filters(
            'FHEE__EED_Core_Rest_Api___get_response_selection_query_params',
            array(
                'include'   => array(
                    'required' => false,
                    'default'  => '*',
                ),
                'calculate' => array(
                    'required' => false,
                    'default'  => '',
                    'enum'     => self::$_field_calculator->retrieve_calculated_fields_for_model($model),
                ),
            ),
            $model,
            $version
        );
    }



    /**
     * Gets info about reading query params that are acceptable
     *
     * @param \EEM_Base $model eg 'Event' or 'Venue'
     * @param  string   $version
     * @return array    describing the args acceptable when querying this model
     * @throws \EE_Error
     */
    protected function _get_read_query_params(\EEM_Base $model, $version)
    {
        $default_orderby = array();
        foreach ($model->get_combined_primary_key_fields() as $key_field) {
            $default_orderby[$key_field->get_name()] = 'ASC';
        }
        return array_merge(
            $this->_get_response_selection_query_params($model, $version),
            array(
                'where'    => array(
                    'required' => false,
                    'default'  => array(),
                ),
                'limit'    => array(
                    'required' => false,
                    'default'  => EED_Core_Rest_Api::get_default_query_limit(),
                ),
                'order_by' => array(
                    'required' => false,
                    'default'  => $default_orderby,
                ),
                'group_by' => array(
                    'required' => false,
                    'default'  => null,
                ),
                'having'   => array(
                    'required' => false,
                    'default'  => null,
                ),
                'caps'     => array(
                    'required' => false,
                    'default'  => EEM_Base::caps_read,
                ),
            )
        );
    }



    /**
     * Gets routes for the config
     *
     * @return array @see _register_model_routes
     * @deprecated since version 4.9.1
     */
    protected function _register_config_routes()
    {
        $config_routes = array();
        foreach (self::versions_served() as $version => $hidden_endpoint) {
            $config_routes[self::ee_api_namespace . $version] = $this->_get_config_route_data_for_version($version,
                $hidden_endpoint);
        }
        return $config_routes;
    }



    /**
     * Gets routes for the config for the specified version
     *
     * @param string  $version
     * @param boolean $hidden_endpoint
     * @return array
     */
    protected function _get_config_route_data_for_version($version, $hidden_endpoint)
    {
        return array(
            'config'    => array(
                array(
                    'callback'        => array(
                        'EventEspresso\core\libraries\rest_api\controllers\config\Read',
                        'handle_request',
                    ),
                    'methods'         => WP_REST_Server::READABLE,
                    'hidden_endpoint' => $hidden_endpoint,
                ),
            ),
            'site_info' => array(
                array(
                    'callback'        => array(
                        'EventEspresso\core\libraries\rest_api\controllers\config\Read',
                        'handle_request_site_info',
                    ),
                    'methods'         => WP_REST_Server::READABLE,
                    'hidden_endpoint' => $hidden_endpoint,
                ),
            ),
        );
    }



    /**
     * Gets the meta info routes
     *
     * @return array @see _register_model_routes
     * @deprecated since version 4.9.1
     */
    protected function _register_meta_routes()
    {
        $meta_routes = array();
        foreach (self::versions_served() as $version => $hidden_endpoint) {
            $meta_routes[self::ee_api_namespace . $version] = $this->_get_meta_route_data_for_version($version,
                $hidden_endpoint);
        }
        return $meta_routes;
    }



    /**
     * @param string  $version
     * @param boolean $hidden_endpoint
     * @return array
     */
    protected function _get_meta_route_data_for_version($version, $hidden_endpoint = false)
    {
        return array(
            'resources' => array(
                array(
                    'callback'        => array(
                        'EventEspresso\core\libraries\rest_api\controllers\model\Meta',
                        'handle_request_models_meta',
                    ),
                    'methods'         => WP_REST_Server::READABLE,
                    'hidden_endpoint' => $hidden_endpoint,
                ),
            ),
        );
    }



    /**
     * Tries to hide old 4.6 endpoints from the
     *
     * @param array $route_data
     * @return array
     */
    public static function hide_old_endpoints($route_data)
    {
        //allow API clients to override which endpoints get hidden, in case
        //they want to discover particular endpoints
        //also, we don't have access to the request so we have to just grab it from the superglobal
        $force_show_ee_namespace = ltrim(
            EEH_Array::is_set($_REQUEST, 'force_show_ee_namespace', ''),
            '/'
        );
        foreach (EED_Core_Rest_Api::get_ee_route_data() as $namespace => $relative_urls) {
            foreach ($relative_urls as $endpoint => $routes) {
                foreach ($routes as $route) {
                    //by default, hide "hidden_endpoint"s, unless the request indicates
                    //to $force_show_ee_namespace, in which case only show that one
                    //namespace's endpoints (and hide all others)
                    if (($route['hidden_endpoint'] && $force_show_ee_namespace === '')
                        || ($force_show_ee_namespace !== '' && $force_show_ee_namespace !== $namespace)
                    ) {
                        $full_route = '/' . ltrim($namespace, '/') . '/' . ltrim($endpoint, '/');
                        unset($route_data[$full_route]);
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
     *
     * @return array
     */
    public static function version_compatibilities()
    {
        return apply_filters(
            'FHEE__EED_Core_REST_API__version_compatibilities',
            array(
                '4.8.29' => '4.8.29',
                '4.8.33' => '4.8.29',
                '4.8.34' => '4.8.29',
                '4.8.36' => '4.8.29',
            )
        );
    }



    /**
     * Gets the latest API version served. Eg if there
     * are two versions served of the API, 4.8.29 and 4.8.32, and
     * we are on core version 4.8.34, it will return the string "4.8.32"
     *
     * @return string
     */
    public static function latest_rest_api_version()
    {
        $versions_served = \EED_Core_Rest_Api::versions_served();
        $versions_served_keys = array_keys($versions_served);
        return end($versions_served_keys);
    }



    /**
     * Using EED_Core_Rest_Api::version_compatibilities(), determines what version of
     * EE the API can serve requests for. Eg, if we are on 4.15 of core, and
     * we can serve requests from 4.12 or later, this will return array( '4.12', '4.13', '4.14', '4.15' ).
     * We also indicate whether or not this version should be put in the index or not
     *
     * @return array keys are API version numbers (just major and minor numbers), and values
     * are whether or not they should be hidden
     */
    public static function versions_served()
    {
        $versions_served = array();
        $possibly_served_versions = EED_Core_Rest_Api::version_compatibilities();
        $lowest_compatible_version = end($possibly_served_versions);
        reset($possibly_served_versions);
        $versions_served_historically = array_keys($possibly_served_versions);
        $latest_version = end($versions_served_historically);
        reset($versions_served_historically);
        //for each version of core we have ever served:
        foreach ($versions_served_historically as $key_versioned_endpoint) {
            //if it's not above the current core version, and it's compatible with the current version of core
            if ($key_versioned_endpoint == $latest_version) {
                //don't hide the latest version in the index
                $versions_served[$key_versioned_endpoint] = false;
            } else if (
                $key_versioned_endpoint < EED_Core_Rest_Api::core_version()
                && $key_versioned_endpoint >= $lowest_compatible_version
            ) {
                //include, but hide, previous versions which are still supported
                $versions_served[$key_versioned_endpoint] = true;
            } elseif (
            apply_filters(
                'FHEE__EED_Core_Rest_Api__versions_served__include_incompatible_versions',
                false,
                $possibly_served_versions
            )
            ) {
                //if a version is no longer supported, don't include it in index or list of versions served
                $versions_served[$key_versioned_endpoint] = true;
            }
        }
        return $versions_served;
    }



    /**
     * Gets the major and minor version of EE core's version string
     *
     * @return string
     */
    public static function core_version()
    {
        return apply_filters('FHEE__EED_Core_REST_API__core_version',
            implode('.', array_slice(explode('.', espresso_version()), 0, 3)));
    }



    /**
     * Gets the default limit that should be used when querying for resources
     *
     * @return int
     */
    public static function get_default_query_limit()
    {
        //we actually don't use a const because we want folks to always use
        //this method, not the const directly
        return apply_filters(
            'FHEE__EED_Core_Rest_Api__get_default_query_limit',
            50
        );
    }



    /**
     *    run - initial module setup
     *
     * @access    public
     * @param  WP $WP
     * @return    void
     */
    public function run($WP)
    {
    }
}

// End of file EED_Core_Rest_Api.module.php
// Location: /wp-content/plugins/eea-rest-api/EED_Core_Rest_Api.module.php
