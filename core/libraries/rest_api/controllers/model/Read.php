<?php
namespace EventEspresso\core\libraries\rest_api\controllers\model;

use EE_Model_Field_Base;
use EventEspresso\core\libraries\rest_api\ObjectDetectedException;
use Exception;
use WP_Error;
use WP_REST_Request;
use EventEspresso\core\libraries\rest_api\Capabilities;
use EventEspresso\core\libraries\rest_api\CalculatedModelFields;
use EventEspresso\core\libraries\rest_api\RestException;
use EventEspresso\core\libraries\rest_api\ModelDataTranslator;
use EventEspresso\core\entities\models\JsonModelSchema;
use EE_Belongs_To_Relation;
use EE_Datetime_Field;
use EE_Error;
use EE_Registry;
use EED_Core_Rest_Api;
use EEH_Inflector;
use EEM_Base;
use EEM_CPT_Base;

if (! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * Read controller for models
 * Handles requests relating to GET-ting model information
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 */
class Read extends Base
{



    /**
     * @var CalculatedModelFields
     */
    protected $fields_calculator;



    /**
     * Read constructor.
     */
    public function __construct()
    {
        parent::__construct();
        $this->fields_calculator = new CalculatedModelFields();
    }



    /**
     * Handles requests to get all (or a filtered subset) of entities for a particular model

     *
*@param WP_REST_Request $request
     * @param string           $version
     * @param string           $model_name
     * @return \WP_REST_Response|WP_Error
     */
    public static function handleRequestGetAll(WP_REST_Request $request, $version, $model_name)
    {
        $controller = new Read();
        try {
            $controller->setRequestedVersion($version);
            if (! $controller->getModelVersionInfo()->isModelNameInThisVersion($model_name)) {
                return $controller->sendResponse(
                    new WP_Error(
                        'endpoint_parsing_error',
                        sprintf(
                            __(
                                'There is no model for endpoint %s. Please contact event espresso support',
                                'event_espresso'
                            ),
                            $model_name
                        )
                    )
                );
            }
            return $controller->sendResponse(
                $controller->getEntitiesFromModel(
                    $controller->getModelVersionInfo()->loadModel($model_name),
                    $request
                )
            );
        } catch (Exception $e) {
            return $controller->sendResponse($e);
        }
    }



    /**
     * Prepares and returns schema for any OPTIONS request.
     *
     * @param string $version    The API endpoint version being used.
     * @param string $model_name Something like `Event` or `Registration`
     * @return array
     */
    public static function handleSchemaRequest($version, $model_name)
    {
        $controller = new Read();
        try {
            $controller->setRequestedVersion($version);
            if (! $controller->getModelVersionInfo()->isModelNameInThisVersion($model_name)) {
                return array();
            }
            //get the model for this version
            $model = $controller->getModelVersionInfo()->loadModel($model_name);
            $model_schema = new JsonModelSchema($model);
            return $model_schema->getModelSchemaForRelations(
                $controller->getModelVersionInfo()->relationSettings($model),
                $controller->customizeSchemaForRestResponse(
                    $model,
                    $model_schema->getModelSchemaForFields(
                        $controller->getModelVersionInfo()->fieldsOnModelInThisVersion($model),
                        $model_schema->getInitialSchemaStructure()
                    )
                )
            );
        } catch (Exception $e) {
            return array();
        }
    }



    /**
     * This loops through each field in the given schema for the model and does the following:
     * - add any extra fields that are REST API specific and related to existing fields.
     * - transform default values into the correct format for a REST API response.
     *
     * @param EEM_Base $model
     * @param array     $schema
     * @return array  The final schema.
     */
    protected function customizeSchemaForRestResponse(EEM_Base $model, array $schema)
    {
        foreach ($this->getModelVersionInfo()->fieldsOnModelInThisVersion($model) as $field_name => $field) {
            $schema = $this->translateDefaultsForRestResponse(
                $field_name,
                $field,
                $this->maybeAddExtraFieldsToSchema($field_name, $field, $schema)
            );
        }
        return $schema;
    }



    /**
     * This is used to ensure that the 'default' value set in the schema response is formatted correctly for the REST
     * response.
     *
     * @param                      $field_name
     * @param EE_Model_Field_Base $field
     * @param array                $schema
     * @return array
     * @throws ObjectDetectedException if a default value has a PHP object, which should never do (and if we
     * did, let's know about it ASAP, so let the exception bubble up)
     */
    protected function translateDefaultsForRestResponse($field_name, EE_Model_Field_Base $field, array $schema)
    {
        if (isset($schema['properties'][$field_name]['default'])) {
            if (is_array($schema['properties'][$field_name]['default'])) {
                foreach ($schema['properties'][$field_name]['default'] as $default_key => $default_value) {
                    if ($default_key === 'raw') {
                        $schema['properties'][$field_name]['default'][$default_key] =
                            ModelDataTranslator::prepareFieldValueForJson(
                                $field,
                                $default_value,
                                $this->getModelVersionInfo()->requestedVersion()
                            );
                    }
                }
            } else {
                $schema['properties'][$field_name]['default'] = ModelDataTranslator::prepareFieldValueForJson(
                    $field,
                    $schema['properties'][$field_name]['default'],
                    $this->getModelVersionInfo()->requestedVersion()
                );
            }
        }
        return $schema;
    }



    /**
     * Adds additional fields to the schema
     * The REST API returns a GMT value field for each datetime field in the resource.  Thus the description about this
     * needs to be added to the schema.
     *
     * @param                      $field_name
     * @param EE_Model_Field_Base $field
     * @param array                $schema
     * @return array
     */
    protected function maybeAddExtraFieldsToSchema($field_name, EE_Model_Field_Base $field, array $schema)
    {
        if ($field instanceof EE_Datetime_Field) {
            $schema['properties'][$field_name . '_gmt'] = $field->getSchema();
            //modify the description
            $schema['properties'][$field_name . '_gmt']['description'] = sprintf(
                esc_html__('%s - the value for this field is in GMT.', 'event_espresso'),
                wp_specialchars_decode($field->get_nicename(), ENT_QUOTES)
            );
        }
        return $schema;
    }



    /**
     * Used to figure out the route from the request when a `WP_REST_Request` object is not available
     *
     * @return string
     */
    protected function getRouteFromRequest()
    {
        if (isset($GLOBALS['wp'])
            && $GLOBALS['wp'] instanceof \WP
            && isset($GLOBALS['wp']->query_vars['rest_route'])
        ) {
            return $GLOBALS['wp']->query_vars['rest_route'];
        } else {
            return isset($_SERVER['PATH_INFO']) ? $_SERVER['PATH_INFO'] : '/';
        }
    }



    /**
     * Gets a single entity related to the model indicated in the path and its id

     *
*@param WP_REST_Request $request
     * @param string           $version
     * @param string           $model_name
     * @return \WP_REST_Response|WP_Error
     */
    public static function handleRequestGetOne(WP_REST_Request $request, $version, $model_name)
    {
        $controller = new Read();
        try {
            $controller->setRequestedVersion($version);
            if (! $controller->getModelVersionInfo()->isModelNameInThisVersion($model_name)) {
                return $controller->sendResponse(
                    new WP_Error(
                        'endpoint_parsing_error',
                        sprintf(
                            __(
                                'There is no model for endpoint %s. Please contact event espresso support',
                                'event_espresso'
                            ),
                            $model_name
                        )
                    )
                );
            }
            return $controller->sendResponse(
                $controller->getEntityFromModel(
                    $controller->getModelVersionInfo()->loadModel($model_name),
                    $request
                )
            );
        } catch (Exception $e) {
            return $controller->sendResponse($e);
        }
    }



    /**
     * Gets all the related entities (or if its a belongs-to relation just the one)
     * to the item with the given id

     *
*@param WP_REST_Request $request
     * @param string           $version
     * @param string           $model_name
     * @param string           $related_model_name
     * @return \WP_REST_Response|WP_Error
     */
    public static function handleRequestGetRelated(
        WP_REST_Request $request,
        $version,
        $model_name,
        $related_model_name
    ) {
        $controller = new Read();
        try {
            $controller->setRequestedVersion($version);
            if (! $controller->getModelVersionInfo()->isModelNameInThisVersion($model_name)) {
                return $controller->sendResponse(
                    new WP_Error(
                        'endpoint_parsing_error',
                        sprintf(
                            __(
                                'There is no model for endpoint %s. Please contact event espresso support',
                                'event_espresso'
                            ),
                            $model_name
                        )
                    )
                );
            }
            $main_model = $controller->getModelVersionInfo()->loadModel($model_name);
            if (! $controller->getModelVersionInfo()->isModelNameInThisVersion($related_model_name)) {
                return $controller->sendResponse(
                    new WP_Error(
                        'endpoint_parsing_error',
                        sprintf(
                            __(
                                'There is no model for endpoint %s. Please contact event espresso support',
                                'event_espresso'
                            ),
                            $related_model_name
                        )
                    )
                );
            }
            return $controller->sendResponse(
                $controller->getEntitiesFromRelation(
                    $request->get_param('id'),
                    $main_model->related_settings_for($related_model_name),
                    $request
                )
            );
        } catch (Exception $e) {
            return $controller->sendResponse($e);
        }
    }



    /**
     * Gets a collection for the given model and filters

     *
*@param EEM_Base        $model
     * @param WP_REST_Request $request
     * @return array|WP_Error
     */
    public function getEntitiesFromModel($model, $request)
    {
        $query_params = $this->createModelQueryParams($model, $request->get_params());
        if (! Capabilities::currentUserHasPartialAccessTo($model, $query_params['caps'])) {
            $model_name_plural = EEH_Inflector::pluralize_and_lower($model->get_this_model_name());
            return new WP_Error(
                sprintf('rest_%s_cannot_list', $model_name_plural),
                sprintf(
                    __('Sorry, you are not allowed to list %1$s. Missing permissions: %2$s', 'event_espresso'),
                    $model_name_plural,
                    Capabilities::getMissingPermissionsString($model, $query_params['caps'])
                ),
                array('status' => 403)
            );
        }
        if (! $request->get_header('no_rest_headers')) {
            $this->setHeadersFromQueryParams($model, $query_params);
        }
        /** @type array $results */
        $results = $model->get_all_wpdb_results($query_params);
        $nice_results = array();
        foreach ($results as $result) {
            $nice_results[] = $this->createEntityFromWpdbResult(
                $model,
                $result,
                $request
            );
        }
        return $nice_results;
    }



    /**
     * Gets the collection for given relation object
     * The same as Read::get_entities_from_model(), except if the relation
     * is a HABTM relation, in which case it merges any non-foreign-key fields from
     * the join-model-object into the results
     *
     * @param array                   $primary_model_query_params query params for finding the item from which
     *                                                            relations will be based
     * @param \EE_Model_Relation_Base $relation
     * @param WP_REST_Request        $request
     * @return WP_Error|array
     * @throws RestException
     */
    protected function getEntitiesFromRelationUsingModelQueryParams($primary_model_query_params, $relation, $request)
    {
        $context = $this->validateContext($request->get_param('caps'));
        $model = $relation->get_this_model();
        $related_model = $relation->get_other_model();
        if (! isset($primary_model_query_params[0])) {
            $primary_model_query_params[0] = array();
        }
        //check if they can access the 1st model object
        $primary_model_query_params = array(
            0       => $primary_model_query_params[0],
            'limit' => 1,
        );
        if ($model instanceof \EEM_Soft_Delete_Base) {
            $primary_model_query_params = $model->alter_query_params_so_deleted_and_undeleted_items_included(
                $primary_model_query_params
            );
        }
        $restricted_query_params = $primary_model_query_params;
        $restricted_query_params['caps'] = $context;
        $this->setDebugInfo('main model query params', $restricted_query_params);
        $this->setDebugInfo('missing caps', Capabilities::getMissingPermissionsString($related_model, $context));
        if (! (
            Capabilities::currentUserHasPartialAccessTo($related_model, $context)
            && $model->exists($restricted_query_params)
        )
        ) {
            if ($relation instanceof EE_Belongs_To_Relation) {
                $related_model_name_maybe_plural = strtolower($related_model->get_this_model_name());
            } else {
                $related_model_name_maybe_plural = EEH_Inflector::pluralize_and_lower(
                    $related_model->get_this_model_name()
                );
            }
            return new WP_Error(
                sprintf('rest_%s_cannot_list', $related_model_name_maybe_plural),
                sprintf(
                    __(
                        'Sorry, you are not allowed to list %1$s related to %2$s. Missing permissions: %3$s',
                        'event_espresso'
                    ),
                    $related_model_name_maybe_plural,
                    $relation->get_this_model()->get_this_model_name(),
                    implode(
                        ',',
                        array_keys(
                            Capabilities::getMissingPermissions($related_model, $context)
                        )
                    )
                ),
                array('status' => 403)
            );
        }
        $query_params = $this->createModelQueryParams($relation->get_other_model(), $request->get_params());
        foreach ($primary_model_query_params[0] as $where_condition_key => $where_condition_value) {
            $query_params[0][$relation->get_this_model()->get_this_model_name()
                             . '.'
                             . $where_condition_key] = $where_condition_value;
        }
        $query_params['default_where_conditions'] = 'none';
        $query_params['caps'] = $context;
        if (! $request->get_header('no_rest_headers')) {
            $this->setHeadersFromQueryParams($relation->get_other_model(), $query_params);
        }
        /** @type array $results */
        $results = $relation->get_other_model()->get_all_wpdb_results($query_params);
        $nice_results = array();
        foreach ($results as $result) {
            $nice_result = $this->createEntityFromWpdbResult(
                $relation->get_other_model(),
                $result,
                $request
            );
            if ($relation instanceof \EE_HABTM_Relation) {
                //put the unusual stuff (properties from the HABTM relation) first, and make sure
                //if there are conflicts we prefer the properties from the main model
                $join_model_result = $this->createEntityFromWpdbResult(
                    $relation->get_join_model(),
                    $result,
                    $request
                );
                $joined_result = array_merge($nice_result, $join_model_result);
                //but keep the meta stuff from the main model
                if (isset($nice_result['meta'])) {
                    $joined_result['meta'] = $nice_result['meta'];
                }
                $nice_result = $joined_result;
            }
            $nice_results[] = $nice_result;
        }
        if ($relation instanceof EE_Belongs_To_Relation) {
            return array_shift($nice_results);
        } else {
            return $nice_results;
        }
    }



    /**
     * Gets the collection for given relation object
     * The same as Read::get_entities_from_model(), except if the relation
     * is a HABTM relation, in which case it merges any non-foreign-key fields from
     * the join-model-object into the results

     *
*@param string                  $id the ID of the thing we are fetching related stuff from
     * @param \EE_Model_Relation_Base $relation
     * @param WP_REST_Request        $request
     * @return array|WP_Error
     * @throws EE_Error
     */
    public function getEntitiesFromRelation($id, $relation, $request)
    {
        if (! $relation->get_this_model()->has_primary_key_field()) {
            throw new EE_Error(
                sprintf(
                    __(
                        // @codingStandardsIgnoreStart
                        'Read::get_entities_from_relation should only be called from a model with a primary key, it was called from %1$s',
                        // @codingStandardsIgnoreEnd
                        'event_espresso'
                    ),
                    $relation->get_this_model()->get_this_model_name()
                )
            );
        }
        return $this->getEntitiesFromRelationUsingModelQueryParams(
            array(
                array(
                    $relation->get_this_model()->primary_key_name() => $id,
                ),
            ),
            $relation,
            $request
        );
    }



    /**
     * Sets the headers that are based on the model and query params,
     * like the total records. This should only be called on the original request
     * from the client, not on subsequent internal
     *
     * @param EEM_Base $model
     * @param array     $query_params
     * @return void
     */
    protected function setHeadersFromQueryParams($model, $query_params)
    {
        $this->setDebugInfo('model query params', $query_params);
        $this->setDebugInfo(
            'missing caps',
            Capabilities::getMissingPermissionsString($model, $query_params['caps'])
        );
        //normally the limit to a 2-part array, where the 2nd item is the limit
        if (! isset($query_params['limit'])) {
            $query_params['limit'] = EED_Core_Rest_Api::get_default_query_limit();
        }
        if (is_array($query_params['limit'])) {
            $limit_parts = $query_params['limit'];
        } else {
            $limit_parts = explode(',', $query_params['limit']);
            if (count($limit_parts) == 1) {
                $limit_parts = array(0, $limit_parts[0]);
            }
        }
        //remove the group by and having parts of the query, as those will
        //make the sql query return an array of values, instead of just a single value
        unset($query_params['group_by'], $query_params['having'], $query_params['limit']);
        $count = $model->count($query_params, null, true);
        $pages = $count / $limit_parts[1];
        $this->setResponseHeader('Total', $count, false);
        $this->setResponseHeader('PageSize', $limit_parts[1], false);
        $this->setResponseHeader('TotalPages', ceil($pages), false);
    }



    /**
     * Changes database results into REST API entities
     *
     * @param EEM_Base        $model
     * @param array            $db_row     like results from $wpdb->get_results()
     * @param WP_REST_Request $rest_request
     * @param string           $deprecated no longer used
     * @return array ready for being converted into json for sending to client
     */
    public function createEntityFromWpdbResult($model, $db_row, $rest_request, $deprecated = null)
    {
        if (! $rest_request instanceof WP_REST_Request) {
            //ok so this was called in the old style, where the 3rd arg was
            //$include, and the 4th arg was $context
            //now setup the request just to avoid fatal errors, although we won't be able
            //to truly make use of it because it's kinda devoid of info
            $rest_request = new WP_REST_Request();
            $rest_request->set_param('include', $rest_request);
            $rest_request->set_param('caps', $deprecated);
        }
        if ($rest_request->get_param('caps') == null) {
            $rest_request->set_param('caps', EEM_Base::caps_read);
        }
        $entity_array = $this->createBareEntityFromWpdbResults($model, $db_row);
        $entity_array = $this->addExtraFields($model, $db_row, $entity_array);
        $entity_array['_links'] = $this->getEntityLinks($model, $db_row, $entity_array);
        $entity_array['_calculated_fields'] = $this->getEntityCalculations($model, $db_row, $rest_request);
        $entity_array = apply_filters(
            'FHEE__Read__create_entity_from_wpdb_results__entity_before_including_requested_models',
            $entity_array,
            $model,
            $rest_request->get_param('caps'),
            $rest_request,
            $this
        );
        $entity_array = $this->includeRequestedModels($model, $rest_request, $entity_array, $db_row);
        $entity_array = apply_filters(
            'FHEE__Read__create_entity_from_wpdb_results__entity_before_inaccessible_field_removal',
            $entity_array,
            $model,
            $rest_request->get_param('caps'),
            $rest_request,
            $this
        );
        $result_without_inaccessible_fields = Capabilities::filterOutInaccessibleEntityFields(
            $entity_array,
            $model,
            $rest_request->get_param('caps'),
            $this->getModelVersionInfo(),
            $model->get_index_primary_key_string(
                $model->deduce_fields_n_values_from_cols_n_values($db_row)
            )
        );
        $this->setDebugInfo(
            'inaccessible fields',
            array_keys(array_diff_key($entity_array, $result_without_inaccessible_fields))
        );
        return apply_filters(
            'FHEE__Read__create_entity_from_wpdb_results__entity_return',
            $result_without_inaccessible_fields,
            $model,
            $rest_request->get_param('caps')
        );
    }



    /**
     * Creates a REST entity array (JSON object we're going to return in the response, but
     * for now still a PHP array, but soon enough we'll call json_encode on it, don't worry),
     * from $wpdb->get_row( $sql, ARRAY_A)
     *
     * @param EEM_Base $model
     * @param array     $db_row
     * @return array entity mostly ready for converting to JSON and sending in the response
     *
     */
    protected function createBareEntityFromWpdbResults(EEM_Base $model, $db_row)
    {
        $result = $model->deduce_fields_n_values_from_cols_n_values($db_row);
        $result = array_intersect_key(
            $result,
            $this->getModelVersionInfo()->fieldsOnModelInThisVersion($model)
        );
        //if this is a CPT, we need to set the global $post to it,
        //otherwise shortcodes etc won't work properly while rendering it
        if ($model instanceof \EEM_CPT_Base) {
            $do_chevy_shuffle = true;
        } else {
            $do_chevy_shuffle = false;
        }
        if ($do_chevy_shuffle) {
            global $post;
            $old_post = $post;
            $post = get_post($result[$model->primary_key_name()]);
            if (! $post instanceof \WP_Post) {
                //well that's weird, because $result is what we JUST fetched from the database
                throw new RestException(
                    'error_fetching_post_from_database_results',
                    esc_html__(
                        'An item was retrieved from the database but it\'s not a WP_Post like it should be.',
                        'event_espresso'
                    )
                );
            }
            $model_object_classname = 'EE_' . $model->get_this_model_name();
            $post->{$model_object_classname} = \EE_Registry::instance()->load_class(
                $model_object_classname,
                $result,
                false,
                false
            );
        }
        foreach ($result as $field_name => $field_value) {
            $field_obj = $model->field_settings_for($field_name);
            if ($this->isSubclassOfOne($field_obj, $this->getModelVersionInfo()->fieldsIgnored())) {
                unset($result[$field_name]);
            } elseif ($this->isSubclassOfOne(
                $field_obj,
                $this->getModelVersionInfo()->fieldsThatHaveRenderedFormat()
            )
            ) {
                $result[$field_name] = array(
                    'raw'      => $this->prepareFieldObjValueForJson($field_obj, $field_value),
                    'rendered' => $this->prepareFieldObjValueForJson($field_obj, $field_value, 'pretty'),
                );
            } elseif ($this->isSubclassOfOne(
                $field_obj,
                $this->getModelVersionInfo()->fieldsThatHavePrettyFormat()
            )
            ) {
                $result[$field_name] = array(
                    'raw'    => $this->prepareFieldObjValueForJson($field_obj, $field_value),
                    'pretty' => $this->prepareFieldObjValueForJson($field_obj, $field_value, 'pretty'),
                );
            } elseif ($field_obj instanceof \EE_Datetime_Field) {
                $field_value = $field_obj->prepare_for_set_from_db($field_value);
                $timezone = $field_value->getTimezone();
                $field_value->setTimezone(new \DateTimeZone('UTC'));
                $result[$field_name . '_gmt'] = ModelDataTranslator::prepareFieldValuesForJson(
                    $field_obj,
                    $field_value,
                    $this->getModelVersionInfo()->requestedVersion()
                );
                $field_value->setTimezone($timezone);
                $result[$field_name] = ModelDataTranslator::prepareFieldValuesForJson(
                    $field_obj,
                    $field_value,
                    $this->getModelVersionInfo()->requestedVersion()
                );
            } else {
                $result[$field_name] = $this->prepareFieldObjValueForJson($field_obj, $field_value);
            }
        }
        if ($do_chevy_shuffle) {
            $post = $old_post;
        }
        return $result;
    }



    /**
     * Takes a value all the way from the DB representation, to the model object's representation, to the
     * user-facing PHP representation, to the REST API representation. (Assumes you've already taken from the DB
     * representation using $field_obj->prepare_for_set_from_db())
     *
     * @param EE_Model_Field_Base $field_obj
     * @param mixed $value as it's stored on a model object
     * @param string $format valid values are 'normal' (default), 'pretty', 'datetime_obj'
     * @return mixed
     * @throws ObjectDetectedException if $value contains a PHP object
     */
    protected function prepareFieldObjValueForJson(EE_Model_Field_Base $field_obj, $value, $format = 'normal')
    {
        $value = $field_obj->prepare_for_set_from_db($value);
        switch ($format) {
            case 'pretty':
                $value = $field_obj->prepare_for_pretty_echoing($value);
                break;
            case 'normal':
            default:
                $value = $field_obj->prepare_for_get($value);
                break;
        }
        return ModelDataTranslator::prepareFieldValuesForJson(
            $field_obj,
            $value,
            $this->getModelVersionInfo()->requestedVersion()
        );
    }



    /**
     * Adds a few extra fields to the entity response
     *
     * @param EEM_Base $model
     * @param array     $db_row
     * @param array     $entity_array
     * @return array modified entity
     */
    protected function addExtraFields(EEM_Base $model, $db_row, $entity_array)
    {
        if ($model instanceof EEM_CPT_Base) {
            $entity_array['link'] = get_permalink($db_row[$model->get_primary_key_field()->get_qualified_column()]);
        }
        return $entity_array;
    }



    /**
     * Gets links we want to add to the response
     *
     * @global \WP_REST_Server $wp_rest_server
     * @param EEM_Base        $model
     * @param array            $db_row
     * @param array            $entity_array
     * @return array the _links item in the entity
     */
    protected function getEntityLinks($model, $db_row, $entity_array)
    {
        //add basic links
        $links = array();
        if ($model->has_primary_key_field()) {
            $links['self'] = array(
                array(
                    'href' => $this->getVersionedLinkTo(
                        EEH_Inflector::pluralize_and_lower($model->get_this_model_name())
                        . '/'
                        . $entity_array[$model->primary_key_name()]
                    ),
                ),
            );
        }
        $links['collection'] = array(
            array(
                'href' => $this->getVersionedLinkTo(
                    EEH_Inflector::pluralize_and_lower($model->get_this_model_name())
                ),
            ),
        );
        //add links to related models
        if ($model->has_primary_key_field()) {
            foreach ($this->getModelVersionInfo()->relationSettings($model) as $relation_name => $relation_obj) {
                $related_model_part = Read::getRelatedEntityName($relation_name, $relation_obj);
                $links[EED_Core_Rest_Api::ee_api_link_namespace . $related_model_part] = array(
                    array(
                        'href'   => $this->getVersionedLinkTo(
                            EEH_Inflector::pluralize_and_lower($model->get_this_model_name())
                            . '/'
                            . $entity_array[$model->primary_key_name()]
                            . '/'
                            . $related_model_part
                        ),
                        'single' => $relation_obj instanceof EE_Belongs_To_Relation ? true : false,
                    ),
                );
            }
        }
        return $links;
    }



    /**
     * Adds the included models indicated in the request to the entity provided
     *
     * @param EEM_Base        $model
     * @param WP_REST_Request $rest_request
     * @param array            $entity_array
     * @param array            $db_row
     * @return array the modified entity
     */
    protected function includeRequestedModels(
        EEM_Base $model,
        WP_REST_Request $rest_request,
        $entity_array,
        $db_row = array()
    ) {
        //if $db_row not included, hope the entity array has what we need
        if (! $db_row) {
            $db_row = $entity_array;
        }
        $includes_for_this_model = $this->explodeAndGetItemsPrefixedWith($rest_request->get_param('include'), '');
        $includes_for_this_model = $this->removeModelNamesFromArray($includes_for_this_model);
        //if they passed in * or didn't specify any includes, return everything
        if (! in_array('*', $includes_for_this_model)
            && ! empty($includes_for_this_model)
        ) {
            if ($model->has_primary_key_field()) {
                //always include the primary key. ya just gotta know that at least
                $includes_for_this_model[] = $model->primary_key_name();
            }
            if ($this->explodeAndGetItemsPrefixedWith($rest_request->get_param('calculate'), '')) {
                $includes_for_this_model[] = '_calculated_fields';
            }
            $entity_array = array_intersect_key($entity_array, array_flip($includes_for_this_model));
        }
        $relation_settings = $this->getModelVersionInfo()->relationSettings($model);
        foreach ($relation_settings as $relation_name => $relation_obj) {
            $related_fields_to_include = $this->explodeAndGetItemsPrefixedWith(
                $rest_request->get_param('include'),
                $relation_name
            );
            $related_fields_to_calculate = $this->explodeAndGetItemsPrefixedWith(
                $rest_request->get_param('calculate'),
                $relation_name
            );
            //did they specify they wanted to include a related model, or
            //specific fields from a related model?
            //or did they specify to calculate a field from a related model?
            if ($related_fields_to_include || $related_fields_to_calculate) {
                //if so, we should include at least some part of the related model
                $pretend_related_request = new WP_REST_Request();
                $pretend_related_request->set_query_params(
                    array(
                        'caps'      => $rest_request->get_param('caps'),
                        'include'   => $related_fields_to_include,
                        'calculate' => $related_fields_to_calculate,
                    )
                );
                $pretend_related_request->add_header('no_rest_headers', true);
                $primary_model_query_params = $model->alter_query_params_to_restrict_by_ID(
                    $model->get_index_primary_key_string(
                        $model->deduce_fields_n_values_from_cols_n_values($db_row)
                    )
                );
                $related_results = $this->getEntitiesFromRelationUsingModelQueryParams(
                    $primary_model_query_params,
                    $relation_obj,
                    $pretend_related_request
                );
                $entity_array[Read::getRelatedEntityName($relation_name, $relation_obj)] = $related_results
                                                                                           instanceof
                                                                                           WP_Error
                    ? null
                    : $related_results;
            }
        }
        return $entity_array;
    }



    /**
     * Returns a new array with all the names of models removed. Eg
     * array( 'Event', 'Datetime.*', 'foobar' ) would become array( 'Datetime.*', 'foobar' )
     *
     * @param array $arr
     * @return array
     */
    private function removeModelNamesFromArray($arr)
    {
        return array_diff($arr, array_keys(EE_Registry::instance()->non_abstract_db_models));
    }



    /**
     * Gets the calculated fields for the response
     *
     * @param EEM_Base        $model
     * @param array            $wpdb_row
     * @param WP_REST_Request $rest_request
     * @return \stdClass the _calculations item in the entity
     * @throws ObjectDetectedException if a default value has a PHP object, which should never do (and if we
     * did, let's know about it ASAP, so let the exception bubble up)
     */
    protected function getEntityCalculations($model, $wpdb_row, $rest_request)
    {
        $calculated_fields = $this->explodeAndGetItemsPrefixedWith(
            $rest_request->get_param('calculate'),
            ''
        );
        //note: setting calculate=* doesn't do anything
        $calculated_fields_to_return = new \stdClass();
        foreach ($calculated_fields as $field_to_calculate) {
            try {
                $calculated_fields_to_return->$field_to_calculate = ModelDataTranslator::prepareFieldValueForJson(
                    null,
                    $this->fields_calculator->retrieveCalculatedFieldValue(
                        $model,
                        $field_to_calculate,
                        $wpdb_row,
                        $rest_request,
                        $this
                    ),
                    $this->getModelVersionInfo()->requestedVersion()
                );
            } catch (RestException $e) {
                //if we don't have permission to read it, just leave it out. but let devs know about the problem
                $this->setResponseHeader(
                    'Notices-Field-Calculation-Errors['
                    . $e->getStringCode()
                    . ']['
                    . $model->get_this_model_name()
                    . ']['
                    . $field_to_calculate
                    . ']',
                    $e->getMessage(),
                    true
                );
            }
        }
        return $calculated_fields_to_return;
    }



    /**
     * Gets the full URL to the resource, taking the requested version into account
     *
     * @param string $link_part_after_version_and_slash eg "events/10/datetimes"
     * @return string url eg "http://mysite.com/wp-json/ee/v4.6/events/10/datetimes"
     */
    public function getVersionedLinkTo($link_part_after_version_and_slash)
    {
        return rest_url(
            EED_Core_Rest_Api::get_versioned_route_to(
                $link_part_after_version_and_slash,
                $this->getModelVersionInfo()->requestedVersion()
            )
        );
    }



    /**
     * Gets the correct lowercase name for the relation in the API according
     * to the relation's type
     *
     * @param string                  $relation_name
     * @param \EE_Model_Relation_Base $relation_obj
     * @return string
     */
    public static function getRelatedEntityName($relation_name, $relation_obj)
    {
        if ($relation_obj instanceof EE_Belongs_To_Relation) {
            return strtolower($relation_name);
        } else {
            return EEH_Inflector::pluralize_and_lower($relation_name);
        }
    }



    /**
     * Gets the one model object with the specified id for the specified model
     *
     * @param EEM_Base        $model
     * @param WP_REST_Request $request
     * @return array|WP_Error
     */
    public function getEntityFromModel($model, $request)
    {
        $context = $this->validateContext($request->get_param('caps'));
        return $this->getOneOrReportPermissionError($model, $request, $context);
    }



    /**
     * If a context is provided which isn't valid, maybe it was added in a future
     * version so just treat it as a default read
     *
     * @param string $context
     * @return string array key of EEM_Base::cap_contexts_to_cap_action_map()
     */
    public function validateContext($context)
    {
        if (! $context) {
            $context = EEM_Base::caps_read;
        }
        $valid_contexts = EEM_Base::valid_cap_contexts();
        if (in_array($context, $valid_contexts)) {
            return $context;
        } else {
            return EEM_Base::caps_read;
        }
    }



    /**
     * Verifies the passed in value is an allowable default where conditions value.
     *
     * @param $default_query_params
     * @return string
     */
    public function validateDefaultQueryParams($default_query_params)
    {
        $valid_default_where_conditions_for_api_calls = array(
            EEM_Base::default_where_conditions_all,
            EEM_Base::default_where_conditions_minimum_all,
            EEM_Base::default_where_conditions_minimum_others,
        );
        if (! $default_query_params) {
            $default_query_params = EEM_Base::default_where_conditions_all;
        }
        if (in_array(
            $default_query_params,
            $valid_default_where_conditions_for_api_calls,
            true
        )) {
            return $default_query_params;
        } else {
            return EEM_Base::default_where_conditions_all;
        }
    }



    /**
     * Translates API filter get parameter into $query_params array used by EEM_Base::get_all().
     * Note: right now the query parameter keys for fields (and related fields)
     * can be left as-is, but it's quite possible this will change someday.
     * Also, this method's contents might be candidate for moving to Model_Data_Translator
     *
     * @param EEM_Base $model
     * @param array     $query_parameters from $_GET parameter @see Read:handle_request_get_all
     * @return array like what EEM_Base::get_all() expects or FALSE to indicate
     *                                    that absolutely no results should be returned
     * @throws EE_Error
     * @throws RestException
     */
    public function createModelQueryParams($model, $query_parameters)
    {
        $model_query_params = array();
        if (isset($query_parameters['where'])) {
            $model_query_params[0] = ModelDataTranslator::prepareConditionsQueryParamsForModels(
                $query_parameters['where'],
                $model,
                $this->getModelVersionInfo()->requestedVersion()
            );
        }
        if (isset($query_parameters['order_by'])) {
            $order_by = $query_parameters['order_by'];
        } elseif (isset($query_parameters['orderby'])) {
            $order_by = $query_parameters['orderby'];
        } else {
            $order_by = null;
        }
        if ($order_by !== null) {
            if (is_array($order_by)) {
                $order_by = ModelDataTranslator::prepareFieldNamesInArrayKeysFromJson($order_by);
            } else {
                //it's a single item
                $order_by = ModelDataTranslator::prepareFieldNameFromJson($order_by);
            }
            $model_query_params['order_by'] = $order_by;
        }
        if (isset($query_parameters['group_by'])) {
            $group_by = $query_parameters['group_by'];
        } elseif (isset($query_parameters['groupby'])) {
            $group_by = $query_parameters['groupby'];
        } else {
            $group_by = array_keys($model->get_combined_primary_key_fields());
        }
        //make sure they're all real names
        if (is_array($group_by)) {
            $group_by = ModelDataTranslator::prepareFieldNamesFromJson($group_by);
        }
        if ($group_by !== null) {
            $model_query_params['group_by'] = $group_by;
        }
        if (isset($query_parameters['having'])) {
            $model_query_params['having'] = ModelDataTranslator::prepareConditionsQueryParamsForModels(
                $query_parameters['having'],
                $model,
                $this->getModelVersionInfo()->requestedVersion()
            );
        }
        if (isset($query_parameters['order'])) {
            $model_query_params['order'] = $query_parameters['order'];
        }
        if (isset($query_parameters['mine'])) {
            $model_query_params = $model->alter_query_params_to_only_include_mine($model_query_params);
        }
        if (isset($query_parameters['limit'])) {
            //limit should be either a string like '23' or '23,43', or an array with two items in it
            if (! is_array($query_parameters['limit'])) {
                $limit_array = explode(',', (string)$query_parameters['limit']);
            } else {
                $limit_array = $query_parameters['limit'];
            }
            $sanitized_limit = array();
            foreach ($limit_array as $key => $limit_part) {
                if ($this->debug_mode && (! is_numeric($limit_part) || count($sanitized_limit) > 2)) {
                    throw new EE_Error(
                        sprintf(
                            __(
                                // @codingStandardsIgnoreStart
                                'An invalid limit filter was provided. It was: %s. If the EE4 JSON REST API weren\'t in debug mode, this message would not appear.',
                                // @codingStandardsIgnoreEnd
                                'event_espresso'
                            ),
                            wp_json_encode($query_parameters['limit'])
                        )
                    );
                }
                $sanitized_limit[] = (int)$limit_part;
            }
            $model_query_params['limit'] = implode(',', $sanitized_limit);
        } else {
            $model_query_params['limit'] = EED_Core_Rest_Api::get_default_query_limit();
        }
        if (isset($query_parameters['caps'])) {
            $model_query_params['caps'] = $this->validateContext($query_parameters['caps']);
        } else {
            $model_query_params['caps'] = EEM_Base::caps_read;
        }
        if (isset($query_parameters['default_where_conditions'])) {
            $model_query_params['default_where_conditions'] = $this->validateDefaultQueryParams(
                $query_parameters['default_where_conditions']
            );
        }
        return apply_filters('FHEE__Read__create_model_query_params', $model_query_params, $query_parameters, $model);
    }



    /**
     * Changes the REST-style query params for use in the models
     *
     * @deprecated
     * @param EEM_Base $model
     * @param array     $query_params sub-array from @see EEM_Base::get_all()
     * @return array
     */
    public function prepareRestQueryParamsKeyForModels($model, $query_params)
    {
        $model_ready_query_params = array();
        foreach ($query_params as $key => $value) {
            if (is_array($value)) {
                $model_ready_query_params[$key] = $this->prepareRestQueryParamsKeyForModels($model, $value);
            } else {
                $model_ready_query_params[$key] = $value;
            }
        }
        return $model_ready_query_params;
    }



    /**
     * @deprecated instead use ModelDataTranslator::prepareFieldValuesFromJson()
     * @param $model
     * @param $query_params
     * @return array
     */
    public function prepareRestQueryParamsValuesForModels($model, $query_params)
    {
        $model_ready_query_params = array();
        foreach ($query_params as $key => $value) {
            if (is_array($value)) {
                $model_ready_query_params[$key] = $this->prepareRestQueryParamsValuesForModels($model, $value);
            } else {
                $model_ready_query_params[$key] = $value;
            }
        }
        return $model_ready_query_params;
    }



    /**
     * Explodes the string on commas, and only returns items with $prefix followed by a period.
     * If no prefix is specified, returns items with no period.
     *
     * @param string|array $string_to_explode eg "jibba,jabba, blah, blah, blah" or array('jibba', 'jabba' )
     * @param string       $prefix            "Event" or "foobar"
     * @return array $string_to_exploded exploded on COMMAS, and if a prefix was specified
     *                                        we only return strings starting with that and a period; if no prefix was
     *                                        specified we return all items containing NO periods
     */
    public function explodeAndGetItemsPrefixedWith($string_to_explode, $prefix)
    {
        if (is_string($string_to_explode)) {
            $exploded_contents = explode(',', $string_to_explode);
        } elseif (is_array($string_to_explode)) {
            $exploded_contents = $string_to_explode;
        } else {
            $exploded_contents = array();
        }
        //if the string was empty, we want an empty array
        $exploded_contents = array_filter($exploded_contents);
        $contents_with_prefix = array();
        foreach ($exploded_contents as $item) {
            $item = trim($item);
            //if no prefix was provided, so we look for items with no "." in them
            if (! $prefix) {
                //does this item have a period?
                if (strpos($item, '.') === false) {
                    //if not, then its what we're looking for
                    $contents_with_prefix[] = $item;
                }
            } elseif (strpos($item, $prefix . '.') === 0) {
                //this item has the prefix and a period, grab it
                $contents_with_prefix[] = substr(
                    $item,
                    strpos($item, $prefix . '.') + strlen($prefix . '.')
                );
            } elseif ($item === $prefix) {
                //this item is JUST the prefix
                //so let's grab everything after, which is a blank string
                $contents_with_prefix[] = '';
            }
        }
        return $contents_with_prefix;
    }



    /**
     * @deprecated since 4.8.36.rc.001 You should instead use Read::explode_and_get_items_prefixed_with.
     * Deprecated because its return values were really quite confusing- sometimes it returned
     * an empty array (when the include string was blank or '*') or sometimes it returned
     * array('*') (when you provided a model and a model of that kind was found).
     * Parses the $include_string so we fetch all the field names relating to THIS model
     * (ie have NO period in them), or for the provided model (ie start with the model
     * name and then a period).
     * @param string $include_string @see Read:handle_request_get_all
     * @param string $model_name
     * @return array of fields for this model. If $model_name is provided, then
     *                               the fields for that model, with the model's name removed from each.
     *                               If $include_string was blank or '*' returns an empty array
     */
    public function extractIncludesForThisModel($include_string, $model_name = null)
    {
        if (is_array($include_string)) {
            $include_string = implode(',', $include_string);
        }
        if ($include_string === '*' || $include_string === '') {
            return array();
        }
        $includes = explode(',', $include_string);
        $extracted_fields_to_include = array();
        if ($model_name) {
            foreach ($includes as $field_to_include) {
                $field_to_include = trim($field_to_include);
                if (strpos($field_to_include, $model_name . '.') === 0) {
                    //found the model name at the exact start
                    $field_sans_model_name = str_replace($model_name . '.', '', $field_to_include);
                    $extracted_fields_to_include[] = $field_sans_model_name;
                } elseif ($field_to_include == $model_name) {
                    $extracted_fields_to_include[] = '*';
                }
            }
        } else {
            //look for ones with no period
            foreach ($includes as $field_to_include) {
                $field_to_include = trim($field_to_include);
                if (strpos($field_to_include, '.') === false
                    && ! $this->getModelVersionInfo()->isModelNameInThisVersion($field_to_include)
                ) {
                    $extracted_fields_to_include[] = $field_to_include;
                }
            }
        }
        return $extracted_fields_to_include;
    }



    /**
     * Gets the single item using the model according to the request in the context given, otherwise
     * returns that it's inaccessible to the current user

     *
*@param EEM_Base        $model
     * @param WP_REST_Request $request
     * @param null             $context
     * @return array|WP_Error
     */
    public function getOneOrReportPermissionError(EEM_Base $model, WP_REST_Request $request, $context = null)
    {
        $query_params = array(array($model->primary_key_name() => $request->get_param('id')), 'limit' => 1);
        if ($model instanceof \EEM_Soft_Delete_Base) {
            $query_params = $model->alter_query_params_so_deleted_and_undeleted_items_included($query_params);
        }
        $restricted_query_params = $query_params;
        $restricted_query_params['caps'] = $context;
        $this->setDebugInfo('model query params', $restricted_query_params);
        $model_rows = $model->get_all_wpdb_results($restricted_query_params);
        if (! empty($model_rows)) {
            return $this->createEntityFromWpdbResult(
                $model,
                array_shift($model_rows),
                $request
            );
        } else {
            //ok let's test to see if we WOULD have found it, had we not had restrictions from missing capabilities
            $lowercase_model_name = strtolower($model->get_this_model_name());
            $model_rows_found_sans_restrictions = $model->get_all_wpdb_results($query_params);
            if (! empty($model_rows_found_sans_restrictions)) {
                //you got shafted- it existed but we didn't want to tell you!
                return new WP_Error(
                    'rest_user_cannot_' . $context,
                    sprintf(
                        __('Sorry, you cannot %1$s this %2$s. Missing permissions are: %3$s', 'event_espresso'),
                        $context,
                        strtolower($model->get_this_model_name()),
                        Capabilities::getMissingPermissionsString(
                            $model,
                            $context
                        )
                    ),
                    array('status' => 403)
                );
            } else {
                //it's not you. It just doesn't exist
                return new WP_Error(
                    sprintf('rest_%s_invalid_id', $lowercase_model_name),
                    sprintf(__('Invalid %s ID.', 'event_espresso'), $lowercase_model_name),
                    array('status' => 404)
                );
            }
        }
    }
}



// End of file Read.php
