<?php

use EventEspresso\core\domain\Domain;
use EventEspresso\core\domain\entities\notifications\PersistentAdminNotice;
use EventEspresso\core\domain\services\factories\EmailAddressFactory;
use EventEspresso\core\domain\services\validation\email\EmailValidationException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\libraries\rest_api\CalculatedModelFields;
use EventEspresso\core\libraries\rest_api\controllers\model\Read as ModelRead;
use EventEspresso\core\libraries\rest_api\changes\ChangesInBase;
use EventEspresso\core\libraries\rest_api\ModelDataTranslator;
use EventEspresso\core\libraries\rest_api\ModelVersionInfo;
use EventEspresso\core\services\loaders\LoaderFactory;

/**
 * Class  EED_Core_Rest_Api
 *
 * @package            Event Espresso
 * @subpackage         eea-rest-api
 * @author             Mike Nelson
 */
class EED_Core_Rest_Api extends \EED_Module
{

    const ee_api_namespace = Domain::API_NAMESPACE;

    const ee_api_namespace_for_regex = 'ee\/v([^/]*)\/';

    const saved_routes_option_names = 'ee_core_routes';

    /**
     * string used in _links response bodies to make them globally unique.
     *
     * @see http://v2.wp-api.org/extending/linking/
     */
    const ee_api_link_namespace = 'https://api.eventespresso.com/';

    /**
     * @var CalculatedModelFields
     */
    protected static $_field_calculator;


    /**
     * @return EED_Core_Rest_Api|EED_Module
     */
    public static function instance()
    {
        self::$_field_calculator = LoaderFactory::getLoader()->load('EventEspresso\core\libraries\rest_api\CalculatedModelFields');
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
        add_filter(
            'rest_index',
            array('EventEspresso\core\libraries\rest_api\controllers\model\Meta', 'filterEeMetadataIntoIndex')
        );
        EED_Core_Rest_Api::invalidate_cached_route_data_on_version_change();
    }


    /**
     * sets up hooks which only need to be included as part of REST API requests;
     * other requests like to the frontend or admin etc don't need them
     *
     * @throws \EE_Error
     */
    public static function set_hooks_rest_api()
    {
        // set hooks which account for changes made to the API
        EED_Core_Rest_Api::_set_hooks_for_changes();
    }


    /**
     * public wrapper of _set_hooks_for_changes.
     * Loads all the hooks which make requests to old versions of the API
     * appear the same as they always did
     *
     * @throws EE_Error
     */
    public static function set_hooks_for_changes()
    {
        self::_set_hooks_for_changes();
    }


    /**
     * Loads all the hooks which make requests to old versions of the API
     * appear the same as they always did
     *
     * @throws EE_Error
     */
    protected static function _set_hooks_for_changes()
    {
        $folder_contents = EEH_File::get_contents_of_folders(array(EE_LIBRARIES . 'rest_api' . DS . 'changes'), false);
        foreach ($folder_contents as $classname_in_namespace => $filepath) {
            // ignore the base parent class
            // and legacy named classes
            if ($classname_in_namespace === 'ChangesInBase'
                || strpos($classname_in_namespace, 'Changes_In_') === 0
            ) {
                continue;
            }
            $full_classname = 'EventEspresso\core\libraries\rest_api\changes\\' . $classname_in_namespace;
            if (class_exists($full_classname)) {
                $instance_of_class = new $full_classname;
                if ($instance_of_class instanceof ChangesInBase) {
                    $instance_of_class->setHooks();
                }
            }
        }
    }


    /**
     * Filters the WP routes to add our EE-related ones. This takes a bit of time
     * so we actually prefer to only do it when an EE plugin is activated or upgraded
     *
     * @throws \EE_Error
     */
    public static function register_routes()
    {
        foreach (EED_Core_Rest_Api::get_ee_route_data() as $namespace => $relative_routes) {
            foreach ($relative_routes as $relative_route => $data_for_multiple_endpoints) {
                /**
                 * @var array     $data_for_multiple_endpoints numerically indexed array
                 *                                         but can also contain route options like {
                 * @type array    $schema                      {
                 * @type callable $schema_callback
                 * @type array    $callback_args               arguments that will be passed to the callback, after the
                 * WP_REST_Request of course
                 * }
                 * }
                 */
                // when registering routes, register all the endpoints' data at the same time
                $multiple_endpoint_args = array();
                foreach ($data_for_multiple_endpoints as $endpoint_key => $data_for_single_endpoint) {
                    /**
                     * @var array     $data_for_single_endpoint {
                     * @type callable $callback
                     * @type string methods
                     * @type array args
                     * @type array _links
                     * @type array    $callback_args            arguments that will be passed to the callback, after the
                     * WP_REST_Request of course
                     * }
                     */
                    // skip route options
                    if (! is_numeric($endpoint_key)) {
                        continue;
                    }
                    if (! isset($data_for_single_endpoint['callback'], $data_for_single_endpoint['methods'])) {
                        throw new EE_Error(
                            esc_html__(
                            // @codingStandardsIgnoreStart
                                'Endpoint configuration data needs to have entries "callback" (callable) and "methods" (comma-separated list of accepts HTTP methods).',
                                // @codingStandardsIgnoreEnd
                                'event_espresso'
                            )
                        );
                    }
                    $callback = $data_for_single_endpoint['callback'];
                    $single_endpoint_args = array(
                        'methods' => $data_for_single_endpoint['methods'],
                        'args'    => isset($data_for_single_endpoint['args']) ? $data_for_single_endpoint['args']
                            : array(),
                    );
                    if (isset($data_for_single_endpoint['_links'])) {
                        $single_endpoint_args['_links'] = $data_for_single_endpoint['_links'];
                    }
                    if (isset($data_for_single_endpoint['callback_args'])) {
                        $callback_args = $data_for_single_endpoint['callback_args'];
                        $single_endpoint_args['callback'] = function (\WP_REST_Request $request) use (
                            $callback,
                            $callback_args
                        ) {
                            array_unshift($callback_args, $request);
                            return call_user_func_array(
                                $callback,
                                $callback_args
                            );
                        };
                    } else {
                        $single_endpoint_args['callback'] = $data_for_single_endpoint['callback'];
                    }
                    $multiple_endpoint_args[] = $single_endpoint_args;
                }
                if (isset($data_for_multiple_endpoints['schema'])) {
                    $schema_route_data = $data_for_multiple_endpoints['schema'];
                    $schema_callback = $schema_route_data['schema_callback'];
                    $callback_args = $schema_route_data['callback_args'];
                    $multiple_endpoint_args['schema'] = function () use ($schema_callback, $callback_args) {
                        return call_user_func_array(
                            $schema_callback,
                            $callback_args
                        );
                    };
                }
                register_rest_route(
                    $namespace,
                    $relative_route,
                    $multiple_endpoint_args
                );
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
        if (EE_System::instance()->detect_req_type() !== EE_System::req_type_normal) {
            EED_Core_Rest_Api::invalidate_cached_route_data();
        }
        foreach (EE_Registry::instance()->addons as $addon) {
            if ($addon instanceof EE_Addon && $addon->detect_req_type() !== EE_System::req_type_normal) {
                EED_Core_Rest_Api::invalidate_cached_route_data();
            }
        }
    }


    /**
     * Removes the cached route data so it will get refreshed next time the WP API is used
     */
    public static function invalidate_cached_route_data()
    {
        // delete the saved EE REST API routes
        foreach (EED_Core_Rest_Api::versions_served() as $version => $hidden) {
            delete_option(EED_Core_Rest_Api::saved_routes_option_names . $version);
        }
    }


    /**
     * Gets the EE route data
     *
     * @return array top-level key is the namespace, next-level key is the route and its value is array{
     * @throws \EE_Error
     * @type string|array $callback
     * @type string       $methods
     * @type boolean      $hidden_endpoint
     * }
     */
    public static function get_ee_route_data()
    {
        $ee_routes = array();
        foreach (self::versions_served() as $version => $hidden_endpoints) {
            $ee_routes[ self::ee_api_namespace . $version ] = self::_get_ee_route_data_for_version(
                $version,
                $hidden_endpoints
            );
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
     * @throws \EE_Error
     */
    protected static function _get_ee_route_data_for_version($version, $hidden_endpoints = false)
    {
        $ee_routes = get_option(self::saved_routes_option_names . $version, null);
        if (! $ee_routes || EED_Core_Rest_Api::debugMode()) {
            $ee_routes = self::_save_ee_route_data_for_version($version, $hidden_endpoints);
        }
        return $ee_routes;
    }


    /**
     * Saves the EE REST API route data to a wp option and returns it
     *
     * @param string  $version
     * @param boolean $hidden_endpoints
     * @return mixed|null
     * @throws \EE_Error
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
     * Calculates all the EE routes and saves it to a WordPress option so we don't
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
            $model_routes[ EED_Core_Rest_Api::ee_api_namespace
                           . $version ] = $this->_get_config_route_data_for_version($version, $hidden_endpoint);
        }
        return $model_routes;
    }


    /**
     * Decides whether or not to add write endpoints for this model.
     *
     * Currently, this defaults to exclude all global tables and models
     * which would allow inserting WP core data (we don't want to duplicate
     * what WP API does, as it's unnecessary, extra work, and potentially extra bugs)
     *
     * @param EEM_Base $model
     * @return bool
     */
    public static function should_have_write_endpoints(EEM_Base $model)
    {
        if ($model->is_wp_core_model()) {
            return false;
        }
        foreach ($model->get_tables() as $table) {
            if ($table->is_global()) {
                return false;
            }
        }
        return true;
    }


    /**
     * Gets the names of all models which should have plural routes (eg `ee/v4.8.36/events`)
     * in this versioned namespace of EE4
     *
     * @param $version
     * @return array keys are model names (eg 'Event') and values ar either classnames (eg 'EEM_Event')
     */
    public static function model_names_with_plural_routes($version)
    {
        $model_version_info = new ModelVersionInfo($version);
        $models_to_register = $model_version_info->modelsForRequestedVersion();
        // let's not bother having endpoints for extra metas
        unset(
            $models_to_register['Extra_Meta'],
            $models_to_register['Extra_Join'],
            $models_to_register['Post_Meta']
        );
        return apply_filters(
            'FHEE__EED_Core_REST_API___register_model_routes',
            $models_to_register
        );
    }


    /**
     * Gets the route data for EE models in the specified version
     *
     * @param string  $version
     * @param boolean $hidden_endpoint
     * @return array
     * @throws EE_Error
     */
    protected function _get_model_route_data_for_version($version, $hidden_endpoint = false)
    {
        $model_routes = array();
        $model_version_info = new ModelVersionInfo($version);
        foreach (EED_Core_Rest_Api::model_names_with_plural_routes($version) as $model_name => $model_classname) {
            $model = \EE_Registry::instance()->load_model($model_name);
            // if this isn't a valid model then let's skip iterate to the next item in the loop.
            if (! $model instanceof EEM_Base) {
                continue;
            }
            // yes we could just register one route for ALL models, but then they wouldn't show up in the index
            $plural_model_route = EED_Core_Rest_Api::get_collection_route($model);
            $singular_model_route = EED_Core_Rest_Api::get_entity_route($model, '(?P<id>[^\/]+)');
            $model_routes[ $plural_model_route ] = array(
                array(
                    'callback'        => array(
                        'EventEspresso\core\libraries\rest_api\controllers\model\Read',
                        'handleRequestGetAll',
                    ),
                    'callback_args'   => array($version, $model_name),
                    'methods'         => WP_REST_Server::READABLE,
                    'hidden_endpoint' => $hidden_endpoint,
                    'args'            => $this->_get_read_query_params($model, $version),
                    '_links'          => array(
                        'self' => rest_url(EED_Core_Rest_Api::ee_api_namespace . $version . $singular_model_route),
                    ),
                ),
                'schema' => array(
                    'schema_callback' => array(
                        'EventEspresso\core\libraries\rest_api\controllers\model\Read',
                        'handleSchemaRequest',
                    ),
                    'callback_args'   => array($version, $model_name),
                ),
            );
            $model_routes[ $singular_model_route ] = array(
                array(
                    'callback'        => array(
                        'EventEspresso\core\libraries\rest_api\controllers\model\Read',
                        'handleRequestGetOne',
                    ),
                    'callback_args'   => array($version, $model_name),
                    'methods'         => WP_REST_Server::READABLE,
                    'hidden_endpoint' => $hidden_endpoint,
                    'args'            => $this->_get_response_selection_query_params($model, $version, true),
                ),
            );
            if (apply_filters(
                'FHEE__EED_Core_Rest_Api___get_model_route_data_for_version__add_write_endpoints',
                EED_Core_Rest_Api::should_have_write_endpoints($model),
                $model
            )) {
                $model_routes[ $plural_model_route ][] = array(
                    'callback'        => array(
                        'EventEspresso\core\libraries\rest_api\controllers\model\Write',
                        'handleRequestInsert',
                    ),
                    'callback_args'   => array($version, $model_name),
                    'methods'         => WP_REST_Server::CREATABLE,
                    'hidden_endpoint' => $hidden_endpoint,
                    'args'            => $this->_get_write_params($model_name, $model_version_info, true),
                );
                $model_routes[ $singular_model_route ] = array_merge(
                    $model_routes[ $singular_model_route ],
                    array(
                        array(
                            'callback'        => array(
                                'EventEspresso\core\libraries\rest_api\controllers\model\Write',
                                'handleRequestUpdate',
                            ),
                            'callback_args'   => array($version, $model_name),
                            'methods'         => WP_REST_Server::EDITABLE,
                            'hidden_endpoint' => $hidden_endpoint,
                            'args'            => $this->_get_write_params($model_name, $model_version_info),
                        ),
                        array(
                            'callback'        => array(
                                'EventEspresso\core\libraries\rest_api\controllers\model\Write',
                                'handleRequestDelete',
                            ),
                            'callback_args'   => array($version, $model_name),
                            'methods'         => WP_REST_Server::DELETABLE,
                            'hidden_endpoint' => $hidden_endpoint,
                            'args'            => $this->_get_delete_query_params($model, $version),
                        ),
                    )
                );
            }
            foreach ($model->relation_settings() as $relation_name => $relation_obj) {
                $related_route = EED_Core_Rest_Api::get_relation_route_via(
                    $model,
                    '(?P<id>[^\/]+)',
                    $relation_obj
                );
                $model_routes[ $related_route ] = array(
                    array(
                        'callback'        => array(
                            'EventEspresso\core\libraries\rest_api\controllers\model\Read',
                            'handleRequestGetRelated',
                        ),
                        'callback_args'   => array($version, $model_name, $relation_name),
                        'methods'         => WP_REST_Server::READABLE,
                        'hidden_endpoint' => $hidden_endpoint,
                        'args'            => $this->_get_read_query_params($relation_obj->get_other_model(), $version),
                    ),
                );

                $related_write_route = $related_route . '/' . '(?P<related_id>[^\/]+)';
                $model_routes[ $related_write_route ] = array(
                    array(
                        'callback'        => array(
                            'EventEspresso\core\libraries\rest_api\controllers\model\Write',
                            'handleRequestAddRelation',
                        ),
                        'callback_args'   => array($version, $model_name, $relation_name),
                        'methods'         => WP_REST_Server::EDITABLE,
                        'hidden_endpoint' => $hidden_endpoint,
                        'args'            => $this->_get_add_relation_query_params($model, $relation_obj->get_other_model(), $version)
                    ),
                    array(
                        'callback'        => array(
                            'EventEspresso\core\libraries\rest_api\controllers\model\Write',
                            'handleRequestRemoveRelation',
                        ),
                        'callback_args'   => array($version, $model_name, $relation_name),
                        'methods'         => WP_REST_Server::DELETABLE,
                        'hidden_endpoint' => $hidden_endpoint,
                        'args'            => array()
                    ),
                );
            }
        }
        return $model_routes;
    }


    /**
     * Gets the relative URI to a model's REST API plural route, after the EE4 versioned namespace,
     * excluding the preceding slash.
     * Eg you pass get_plural_route_to('Event') = 'events'
     *
     * @param EEM_Base $model
     * @return string
     */
    public static function get_collection_route(EEM_Base $model)
    {
        return EEH_Inflector::pluralize_and_lower($model->get_this_model_name());
    }


    /**
     * Gets the relative URI to a model's REST API singular route, after the EE4 versioned namespace,
     * excluding the preceding slash.
     * Eg you pass get_plural_route_to('Event', 12) = 'events/12'
     *
     * @param EEM_Base $model eg Event or Venue
     * @param string   $id
     * @return string
     */
    public static function get_entity_route($model, $id)
    {
        return EED_Core_Rest_Api::get_collection_route($model) . '/' . $id;
    }


    /**
     * Gets the relative URI to a model's REST API singular route, after the EE4 versioned namespace,
     * excluding the preceding slash.
     * Eg you pass get_plural_route_to('Event', 12) = 'events/12'
     *
     * @param EEM_Base               $model eg Event or Venue
     * @param string                 $id
     * @param EE_Model_Relation_Base $relation_obj
     * @return string
     */
    public static function get_relation_route_via(EEM_Base $model, $id, EE_Model_Relation_Base $relation_obj)
    {
        $related_model_name_endpoint_part = ModelRead::getRelatedEntityName(
            $relation_obj->get_other_model()->get_this_model_name(),
            $relation_obj
        );
        return EED_Core_Rest_Api::get_entity_route($model, $id) . '/' . $related_model_name_endpoint_part;
    }


    /**
     * Adds onto the $relative_route the EE4 REST API versioned namespace.
     * Eg if given '4.8.36' and 'events', will return 'ee/v4.8.36/events'
     *
     * @param string $relative_route
     * @param string $version
     * @return string
     */
    public static function get_versioned_route_to($relative_route, $version = '4.8.36')
    {
        return '/' . EED_Core_Rest_Api::ee_api_namespace . $version . '/' . $relative_route;
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
            $routes[ self::ee_api_namespace . $version ] = $this->_get_rpc_route_data_for_version(
                $version,
                $hidden_endpoint
            );
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
        // checkin endpoint
        $this_versions_routes['registrations/(?P<REG_ID>\d+)/toggle_checkin_for_datetime/(?P<DTT_ID>\d+)'] = array(
            array(
                'callback'        => array(
                    'EventEspresso\core\libraries\rest_api\controllers\rpc\Checkin',
                    'handleRequestToggleCheckin',
                ),
                'methods'         => WP_REST_Server::CREATABLE,
                'hidden_endpoint' => $hidden_endpoint,
                'args'            => array(
                    'force' => array(
                        'required'    => false,
                        'default'     => false,
                        'description' => __(
                        // @codingStandardsIgnoreStart
                            'Whether to force toggle checkin, or to verify the registration status and allowed ticket uses',
                            // @codingStandardsIgnoreEnd
                            'event_espresso'
                        ),
                    ),
                ),
                'callback_args'   => array($version),
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
    protected function _get_response_selection_query_params(\EEM_Base $model, $version, $single_only = false)
    {
        $query_params = array(
            'include'   => array(
                'required' => false,
                'default'  => '*',
                'type'     => 'string',
            ),
            'calculate' => array(
                'required'          => false,
                'default'           => '',
                'enum'              => self::$_field_calculator->retrieveCalculatedFieldsForModel($model),
                'type'              => 'string',
                // because we accept a CSV'd list of the enumerated strings, WP core validation and sanitization
                // freaks out. We'll just validate this argument while handling the request
                'validate_callback' => null,
                'sanitize_callback' => null,
            ),
            'password' => array(
                'required' => false,
                'default' => '',
                'type' => 'string'
            )
        );
        return apply_filters(
            'FHEE__EED_Core_Rest_Api___get_response_selection_query_params',
            $query_params,
            $model,
            $version
        );
    }


    /**
     * Gets the parameters acceptable for delete requests
     *
     * @param \EEM_Base $model
     * @param string    $version
     * @return array
     */
    protected function _get_delete_query_params(\EEM_Base $model, $version)
    {
        $params_for_delete = array(
            'allow_blocking' => array(
                'required' => false,
                'default'  => true,
                'type'     => 'boolean',
            ),
        );
        $params_for_delete['force'] = array(
            'required' => false,
            'default'  => false,
            'type'     => 'boolean',
        );
        return apply_filters(
            'FHEE__EED_Core_Rest_Api___get_delete_query_params',
            $params_for_delete,
            $model,
            $version
        );
    }

    protected function _get_add_relation_query_params(\EEM_Base $source_model, \EEM_Base $related_model, $version)
    {
        // if they're related through a HABTM relation, check for any non-FKs
        $all_relation_settings = $source_model->relation_settings();
        $relation_settings = $all_relation_settings[ $related_model->get_this_model_name() ];
        $params = array();
        if ($relation_settings instanceof EE_HABTM_Relation && $relation_settings->hasNonKeyFields()) {
            foreach ($relation_settings->getNonKeyFields() as $field) {
                /* @var $field EE_Model_Field_Base */
                $params[ $field->get_name() ] = array(
                    'required' => ! $field->is_nullable(),
                    'default' => ModelDataTranslator::prepareFieldValueForJson($field, $field->get_default_value(), $version),
                    'type' => $field->getSchemaType(),
                    'validate_callbaack' => null,
                    'sanitize_callback' => null
                );
            }
        }
        return $params;
    }


    /**
     * Gets info about reading query params that are acceptable
     *
     * @param \EEM_Base $model eg 'Event' or 'Venue'
     * @param  string   $version
     * @return array    describing the args acceptable when querying this model
     * @throws EE_Error
     */
    protected function _get_read_query_params(\EEM_Base $model, $version)
    {
        $default_orderby = array();
        foreach ($model->get_combined_primary_key_fields() as $key_field) {
            $default_orderby[ $key_field->get_name() ] = 'ASC';
        }
        return array_merge(
            $this->_get_response_selection_query_params($model, $version),
            array(
                'where'    => array(
                    'required'          => false,
                    'default'           => array(),
                    'type'              => 'object',
                    // because we accept an almost infinite list of possible where conditions, WP
                    // core validation and sanitization freaks out. We'll just validate this argument
                    // while handling the request
                    'validate_callback' => null,
                    'sanitize_callback' => null,
                ),
                'limit'    => array(
                    'required'          => false,
                    'default'           => EED_Core_Rest_Api::get_default_query_limit(),
                    'type'              => array(
                        'array',
                        'string',
                        'integer',
                    ),
                    // because we accept a variety of types, WP core validation and sanitization
                    // freaks out. We'll just validate this argument while handling the request
                    'validate_callback' => null,
                    'sanitize_callback' => null,
                ),
                'order_by' => array(
                    'required'          => false,
                    'default'           => $default_orderby,
                    'type'              => array(
                        'object',
                        'string',
                    ),// because we accept a variety of types, WP core validation and sanitization
                    // freaks out. We'll just validate this argument while handling the request
                    'validate_callback' => null,
                    'sanitize_callback' => null,
                ),
                'group_by' => array(
                    'required'          => false,
                    'default'           => null,
                    'type'              => array(
                        'object',
                        'string',
                    ),
                    // because we accept  an almost infinite list of possible groupings,
                    // WP core validation and sanitization
                    // freaks out. We'll just validate this argument while handling the request
                    'validate_callback' => null,
                    'sanitize_callback' => null,
                ),
                'having'   => array(
                    'required'          => false,
                    'default'           => null,
                    'type'              => 'object',
                    // because we accept an almost infinite list of possible where conditions, WP
                    // core validation and sanitization freaks out. We'll just validate this argument
                    // while handling the request
                    'validate_callback' => null,
                    'sanitize_callback' => null,
                ),
                'caps'     => array(
                    'required' => false,
                    'default'  => EEM_Base::caps_read,
                    'type'     => 'string',
                    'enum'     => array(
                        EEM_Base::caps_read,
                        EEM_Base::caps_read_admin,
                        EEM_Base::caps_edit,
                        EEM_Base::caps_delete,
                    ),
                ),
            )
        );
    }


    /**
     * Gets parameter information for a model regarding writing data
     *
     * @param string           $model_name
     * @param ModelVersionInfo $model_version_info
     * @param boolean          $create                                       whether this is for request to create (in
     *                                                                       which case we need all required params) or
     *                                                                       just to update (in which case we don't
     *                                                                       need those on every request)
     * @return array
     */
    protected function _get_write_params(
        $model_name,
        ModelVersionInfo $model_version_info,
        $create = false
    ) {
        $model = EE_Registry::instance()->load_model($model_name);
        $fields = $model_version_info->fieldsOnModelInThisVersion($model);
        $args_info = array();
        foreach ($fields as $field_name => $field_obj) {
            if ($field_obj->is_auto_increment()) {
                // totally ignore auto increment IDs
                continue;
            }
            $arg_info = $field_obj->getSchema();
            $required = $create && ! $field_obj->is_nullable() && $field_obj->get_default_value() === null;
            $arg_info['required'] = $required;
            // remove the read-only flag. If it were read-only we wouldn't list it as an argument while writing, right?
            unset($arg_info['readonly']);
            $schema_properties = $field_obj->getSchemaProperties();
            if (isset($schema_properties['raw'])
                && $field_obj->getSchemaType() === 'object'
            ) {
                // if there's a "raw" form of this argument, use those properties instead
                $arg_info = array_replace(
                    $arg_info,
                    $schema_properties['raw']
                );
            }
            $arg_info['default'] = ModelDataTranslator::prepareFieldValueForJson(
                $field_obj,
                $field_obj->get_default_value(),
                $model_version_info->requestedVersion()
            );
            // we do our own validation and sanitization within the controller
            if (function_exists('rest_validate_value_from_schema')) {
                $sanitize_callback = array(
                    'EED_Core_Rest_Api',
                    'default_sanitize_callback',
                );
            } else {
                $sanitize_callback = null;
            }
            $arg_info['sanitize_callback'] = $sanitize_callback;
            $args_info[ $field_name ] = $arg_info;
            if ($field_obj instanceof EE_Datetime_Field) {
                $gmt_arg_info = $arg_info;
                $gmt_arg_info['description'] = sprintf(
                    esc_html__(
                        '%1$s - the value for this field in UTC. Ignored if %2$s is provided.',
                        'event_espresso'
                    ),
                    $field_obj->get_nicename(),
                    $field_name
                );
                $args_info[ $field_name . '_gmt' ] = $gmt_arg_info;
            }
        }
        return $args_info;
    }


    /**
     * Replacement for WP API's 'rest_parse_request_arg'.
     * If the value is blank but not required, don't bother validating it.
     * Also, it uses our email validation instead of WP API's default.
     *
     * @param                 $value
     * @param WP_REST_Request $request
     * @param                 $param
     * @return bool|true|WP_Error
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     */
    public static function default_sanitize_callback($value, WP_REST_Request $request, $param)
    {
        $attributes = $request->get_attributes();
        if (! isset($attributes['args'][ $param ])
            || ! is_array($attributes['args'][ $param ])) {
            $validation_result = true;
        } else {
            $args = $attributes['args'][ $param ];
            if ((
                    $value === ''
                    || $value === null
                )
                && (! isset($args['required'])
                    || $args['required'] === false
                )
            ) {
                // not required and not provided? that's cool
                $validation_result = true;
            } elseif (isset($args['format'])
                      && $args['format'] === 'email'
            ) {
                $validation_result = true;
                if (! self::_validate_email($value)) {
                    $validation_result = new WP_Error(
                        'rest_invalid_param',
                        esc_html__(
                            'The email address is not valid or does not exist.',
                            'event_espresso'
                        )
                    );
                }
            } else {
                $validation_result = rest_validate_value_from_schema($value, $args, $param);
            }
        }
        if (is_wp_error($validation_result)) {
            return $validation_result;
        }
        return rest_sanitize_request_arg($value, $request, $param);
    }


    /**
     * Returns whether or not this email address is valid. Copied from EE_Email_Validation_Strategy::_validate_email()
     *
     * @param $email
     * @return bool
     * @throws InvalidArgumentException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     */
    protected static function _validate_email($email)
    {
        try {
            EmailAddressFactory::create($email);
            return true;
        } catch (EmailValidationException $e) {
            return false;
        }
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
            $config_routes[ self::ee_api_namespace . $version ] = $this->_get_config_route_data_for_version(
                $version,
                $hidden_endpoint
            );
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
                        'handleRequest',
                    ),
                    'methods'         => WP_REST_Server::READABLE,
                    'hidden_endpoint' => $hidden_endpoint,
                    'callback_args'   => array($version),
                ),
            ),
            'site_info' => array(
                array(
                    'callback'        => array(
                        'EventEspresso\core\libraries\rest_api\controllers\config\Read',
                        'handleRequestSiteInfo',
                    ),
                    'methods'         => WP_REST_Server::READABLE,
                    'hidden_endpoint' => $hidden_endpoint,
                    'callback_args'   => array($version),
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
            $meta_routes[ self::ee_api_namespace . $version ] = $this->_get_meta_route_data_for_version(
                $version,
                $hidden_endpoint
            );
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
                        'handleRequestModelsMeta',
                    ),
                    'methods'         => WP_REST_Server::READABLE,
                    'hidden_endpoint' => $hidden_endpoint,
                    'callback_args'   => array($version),
                ),
            ),
        );
    }


    /**
     * Tries to hide old 4.6 endpoints from the
     *
     * @param array $route_data
     * @return array
     * @throws \EE_Error
     */
    public static function hide_old_endpoints($route_data)
    {
        // allow API clients to override which endpoints get hidden, in case
        // they want to discover particular endpoints
        // also, we don't have access to the request so we have to just grab it from the superglobal
        $force_show_ee_namespace = ltrim(
            EEH_Array::is_set($_REQUEST, 'force_show_ee_namespace', ''),
            '/'
        );
        foreach (EED_Core_Rest_Api::get_ee_route_data() as $namespace => $relative_urls) {
            foreach ($relative_urls as $resource_name => $endpoints) {
                foreach ($endpoints as $key => $endpoint) {
                    // skip schema and other route options
                    if (! is_numeric($key)) {
                        continue;
                    }
                    // by default, hide "hidden_endpoint"s, unless the request indicates
                    // to $force_show_ee_namespace, in which case only show that one
                    // namespace's endpoints (and hide all others)
                    if (($force_show_ee_namespace !== '' && $force_show_ee_namespace !== $namespace)
                        || ($endpoint['hidden_endpoint'] && $force_show_ee_namespace === '')
                    ) {
                        $full_route = '/' . ltrim($namespace, '/');
                        $full_route .= '/' . ltrim($resource_name, '/');
                        unset($route_data[ $full_route ]);
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
        // for each version of core we have ever served:
        foreach ($versions_served_historically as $key_versioned_endpoint) {
            // if it's not above the current core version, and it's compatible with the current version of core
            if ($key_versioned_endpoint === $latest_version) {
                // don't hide the latest version in the index
                $versions_served[ $key_versioned_endpoint ] = false;
            } elseif ($key_versioned_endpoint >= $lowest_compatible_version
                && $key_versioned_endpoint < EED_Core_Rest_Api::core_version()
            ) {
                // include, but hide, previous versions which are still supported
                $versions_served[ $key_versioned_endpoint ] = true;
            } elseif (apply_filters(
                'FHEE__EED_Core_Rest_Api__versions_served__include_incompatible_versions',
                false,
                $possibly_served_versions
            )) {
                // if a version is no longer supported, don't include it in index or list of versions served
                $versions_served[ $key_versioned_endpoint ] = true;
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
        return apply_filters(
            'FHEE__EED_Core_REST_API__core_version',
            implode(
                '.',
                array_slice(
                    explode(
                        '.',
                        espresso_version()
                    ),
                    0,
                    3
                )
            )
        );
    }


    /**
     * Gets the default limit that should be used when querying for resources
     *
     * @return int
     */
    public static function get_default_query_limit()
    {
        // we actually don't use a const because we want folks to always use
        // this method, not the const directly
        return apply_filters(
            'FHEE__EED_Core_Rest_Api__get_default_query_limit',
            50
        );
    }


    /**
     *
     * @param string $version api version string (i.e. '4.8.36')
     * @return array
     */
    public static function getCollectionRoutesIndexedByModelName($version = '')
    {
        $version = empty($version) ? self::latest_rest_api_version() : $version;
        $model_names = self::model_names_with_plural_routes($version);
        $collection_routes = array();
        foreach ($model_names as $model_name => $model_class_name) {
            $collection_routes[ strtolower($model_name) ] = '/' . self::ee_api_namespace . $version . '/'
                                                            . EEH_Inflector::pluralize_and_lower($model_name);
        }
        return $collection_routes;
    }


    /**
     * Returns an array of primary key names indexed by model names.
     * @param string $version
     * @return array
     */
    public static function getPrimaryKeyNamesIndexedByModelName($version = '')
    {
        $version = empty($version) ? self::latest_rest_api_version() : $version;
        $model_names = self::model_names_with_plural_routes($version);
        $primary_key_items = array();
        foreach ($model_names as $model_name => $model_class_name) {
            $primary_keys = $model_class_name::instance()->get_combined_primary_key_fields();
            foreach ($primary_keys as $primary_key_name => $primary_key_field) {
                if (count($primary_keys) > 1) {
                    $primary_key_items[ strtolower($model_name) ][] = $primary_key_name;
                } else {
                    $primary_key_items[ strtolower($model_name) ] = $primary_key_name;
                }
            }
        }
        return $primary_key_items;
    }

    /**
     * Determines the EE REST API debug mode is activated, or not.
     * @since 4.9.76.p
     * @return bool
     */
    public static function debugMode()
    {
        static $debug_mode = null; // could be class prop
        if ($debug_mode === null) {
            $debug_mode = defined('EE_REST_API_DEBUG_MODE') && EE_REST_API_DEBUG_MODE;
        }
        return $debug_mode;
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
