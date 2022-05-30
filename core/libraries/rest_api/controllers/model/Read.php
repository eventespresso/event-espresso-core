<?php

namespace EventEspresso\core\libraries\rest_api\controllers\model;

use DateTimeZone;
use EED_Core_Rest_Api;
use EEH_DTT_Helper;
use EEH_Inflector;
use EEM_Base;
use EEM_CPT_Base;
use EEM_Soft_Delete_Base;
use EE_Belongs_To_Relation;
use EE_Datetime_Field;
use EE_Error;
use EE_HABTM_Relation;
use EE_Model_Field_Base;
use EE_Model_Relation_Base;
use EE_Registry;
use EventEspresso\core\entities\models\JsonModelSchema;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\exceptions\ModelConfigurationException;
use EventEspresso\core\exceptions\RestPasswordIncorrectException;
use EventEspresso\core\exceptions\RestPasswordRequiredException;
use EventEspresso\core\libraries\rest_api\CalculatedModelFields;
use EventEspresso\core\libraries\rest_api\Capabilities;
use EventEspresso\core\libraries\rest_api\ModelDataTranslator;
use EventEspresso\core\libraries\rest_api\RestException;
use EventEspresso\core\services\loaders\LoaderFactory;
use EventEspresso\core\services\request\RequestInterface;
use Exception;
use InvalidArgumentException;
use ReflectionException;
use WP;
use WP_Error;
use WP_Post;
use WP_REST_Request;
use WP_REST_Response;
use WP_REST_Server;
use stdClass;

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
     *
     * @param CalculatedModelFields $fields_calculator
     */
    public function __construct(CalculatedModelFields $fields_calculator)
    {
        parent::__construct();
        $this->fields_calculator = $fields_calculator;
    }


    /**
     * Handles requests to get all (or a filtered subset) of entities for a particular model
     *
     * @param WP_REST_Request $request
     * @param string          $version
     * @param string          $model_name
     * @return WP_REST_Response|WP_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function handleRequestGetAll(WP_REST_Request $request, $version, $model_name)
    {
        $controller =
            LoaderFactory::getLoader()->getNew('EventEspresso\core\libraries\rest_api\controllers\model\Read');
        try {
            $controller->setRequestedVersion($version);
            if (! $controller->getModelVersionInfo()->isModelNameInThisVersion($model_name)) {
                return $controller->sendResponse(
                    new WP_Error(
                        'endpoint_parsing_error',
                        sprintf(
                            esc_html__(
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
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     */
    public static function handleSchemaRequest($version, $model_name)
    {
        $controller =
            LoaderFactory::getLoader()->getNew('EventEspresso\core\libraries\rest_api\controllers\model\Read');
        try {
            $controller->setRequestedVersion($version);
            if (! $controller->getModelVersionInfo()->isModelNameInThisVersion($model_name)) {
                return [];
            }
            // get the model for this version
            $model        = $controller->getModelVersionInfo()->loadModel($model_name);
            $model_schema = new JsonModelSchema(
                $model,
                LoaderFactory::getLoader()->getShared('EventEspresso\core\libraries\rest_api\CalculatedModelFields')
            );
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
            return [];
        }
    }


    /**
     * This loops through each field in the given schema for the model and does the following:
     * - add any extra fields that are REST API specific and related to existing fields.
     * - transform default values into the correct format for a REST API response.
     *
     * @param EEM_Base $model
     * @param array    $schema
     * @return array  The final schema.
     * @throws EE_Error
     * @throws EE_Error
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
     * @param EE_Model_Field_Base  $field
     * @param array                $schema
     * @return array
     * @throws RestException  if a default value has a PHP object, which we should never do
     *                                  (but if we did, let's know about it ASAP, so let the exception bubble up)
     * @throws EE_Error
     *
     */
    protected function translateDefaultsForRestResponse($field_name, EE_Model_Field_Base $field, array $schema)
    {
        if (isset($schema['properties'][ $field_name ]['default'])) {
            if (is_array($schema['properties'][ $field_name ]['default'])) {
                foreach ($schema['properties'][ $field_name ]['default'] as $default_key => $default_value) {
                    if ($default_key === 'raw') {
                        $schema['properties'][ $field_name ]['default'][ $default_key ] =
                            ModelDataTranslator::prepareFieldValueForJson(
                                $field,
                                $default_value,
                                $this->getModelVersionInfo()->requestedVersion()
                            );
                    }
                }
            } else {
                $schema['properties'][ $field_name ]['default'] = ModelDataTranslator::prepareFieldValueForJson(
                    $field,
                    $schema['properties'][ $field_name ]['default'],
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
     * @param EE_Model_Field_Base  $field
     * @param array                $schema
     * @return array
     */
    protected function maybeAddExtraFieldsToSchema($field_name, EE_Model_Field_Base $field, array $schema)
    {
        if ($field instanceof EE_Datetime_Field) {
            $schema['properties'][ $field_name . '_gmt' ] = $field->getSchema();
            // modify the description
            $schema['properties'][ $field_name . '_gmt' ]['description'] = sprintf(
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
        if (
            isset($GLOBALS['wp'])
            && $GLOBALS['wp'] instanceof WP
            && isset($GLOBALS['wp']->query_vars['rest_route'])
        ) {
            return $GLOBALS['wp']->query_vars['rest_route'];
        } else {
            /** @var RequestInterface $request */
            $request = LoaderFactory::getLoader()->getShared(RequestInterface::class);
            return $request->serverParamIsSet('PATH_INFO')
                ? $request->getServerParam('PATH_INFO')
                : '/';
        }
    }


    /**
     * Gets a single entity related to the model indicated in the path and its id
     *
     * @param WP_REST_Request $request
     * @param string          $version
     * @param string          $model_name
     * @return WP_REST_Response|WP_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     */
    public static function handleRequestGetOne(WP_REST_Request $request, $version, $model_name)
    {
        $controller =
            LoaderFactory::getLoader()->getNew('EventEspresso\core\libraries\rest_api\controllers\model\Read');
        try {
            $controller->setRequestedVersion($version);
            if (! $controller->getModelVersionInfo()->isModelNameInThisVersion($model_name)) {
                return $controller->sendResponse(
                    new WP_Error(
                        'endpoint_parsing_error',
                        sprintf(
                            esc_html__(
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
     * @param WP_REST_Request $request
     * @param string          $version
     * @param string          $model_name
     * @param string          $related_model_name
     * @return WP_REST_Response|WP_Error
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     */
    public static function handleRequestGetRelated(
        WP_REST_Request $request,
        $version,
        $model_name,
        $related_model_name
    ) {
        $controller =
            LoaderFactory::getLoader()->getNew('EventEspresso\core\libraries\rest_api\controllers\model\Read');
        try {
            $controller->setRequestedVersion($version);
            $main_model = $controller->validateModel($model_name);
            $controller->validateModel($related_model_name);
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
     * @param EEM_Base        $model
     * @param WP_REST_Request $request
     * @return array
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws RestException
     */
    public function getEntitiesFromModel($model, $request)
    {
        $query_params = $this->createModelQueryParams($model, $request->get_params());
        if (! Capabilities::currentUserHasPartialAccessTo($model, $query_params['caps'])) {
            $model_name_plural = EEH_Inflector::pluralize_and_lower($model->get_this_model_name());
            throw new RestException(
                sprintf('rest_%s_cannot_list', $model_name_plural),
                sprintf(
                    esc_html__('Sorry, you are not allowed to list %1$s. Missing permissions: %2$s', 'event_espresso'),
                    $model_name_plural,
                    Capabilities::getMissingPermissionsString($model, $query_params['caps'])
                ),
                ['status' => 403]
            );
        }
        if (! $request->get_header('no_rest_headers')) {
            $this->setHeadersFromQueryParams($model, $query_params);
        }
        /** @type array $results */
        $results      = $model->get_all_wpdb_results($query_params);
        $nice_results = [];
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
     * @param array                  $primary_model_query_params  query params for finding the item from which
     *                                                            relations will be based
     * @param EE_Model_Relation_Base $relation
     * @param WP_REST_Request        $request
     * @return array
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws ReflectionException
     * @throws RestException
     * @throws ModelConfigurationException
     */
    protected function getEntitiesFromRelationUsingModelQueryParams($primary_model_query_params, $relation, $request)
    {
        $context       = $this->validateContext($request->get_param('caps'));
        $model         = $relation->get_this_model();
        $related_model = $relation->get_other_model();
        if (! isset($primary_model_query_params[0])) {
            $primary_model_query_params[0] = [];
        }
        // check if they can access the 1st model object
        $primary_model_query_params = [
            0       => $primary_model_query_params[0],
            'limit' => 1,
        ];
        if ($model instanceof EEM_Soft_Delete_Base) {
            $primary_model_query_params = $model->alter_query_params_so_deleted_and_undeleted_items_included(
                $primary_model_query_params
            );
        }
        $restricted_query_params          = $primary_model_query_params;
        $restricted_query_params['caps']  = $context;
        $restricted_query_params['limit'] = 1;
        $this->setDebugInfo('main model query params', $restricted_query_params);
        $this->setDebugInfo('missing caps', Capabilities::getMissingPermissionsString($related_model, $context));
        $primary_model_rows = $model->get_all_wpdb_results($restricted_query_params);
        $primary_model_row  = null;
        if (is_array($primary_model_rows)) {
            $primary_model_row = reset($primary_model_rows);
        }
        if (
            ! (
                $primary_model_row
                && Capabilities::currentUserHasPartialAccessTo($related_model, $context)
            )
        ) {
            if ($relation instanceof EE_Belongs_To_Relation) {
                $related_model_name_maybe_plural = strtolower($related_model->get_this_model_name());
            } else {
                $related_model_name_maybe_plural = EEH_Inflector::pluralize_and_lower(
                    $related_model->get_this_model_name()
                );
            }
            throw new RestException(
                sprintf('rest_%s_cannot_list', $related_model_name_maybe_plural),
                sprintf(
                    esc_html__(
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
                ['status' => 403]
            );
        }

        $this->checkPassword(
            $model,
            $primary_model_row,
            $restricted_query_params,
            $request
        );
        $query_params = $this->createModelQueryParams($relation->get_other_model(), $request->get_params());
        foreach ($primary_model_query_params[0] as $where_condition_key => $where_condition_value) {
            $query_params[0][ $relation->get_this_model()->get_this_model_name()
                              . '.'
                              . $where_condition_key ] = $where_condition_value;
        }
        $query_params['default_where_conditions'] = 'none';
        $query_params['caps']                     = $context;
        if (! $request->get_header('no_rest_headers')) {
            $this->setHeadersFromQueryParams($relation->get_other_model(), $query_params);
        }
        /** @type array $results */
        $results      = $relation->get_other_model()->get_all_wpdb_results($query_params);
        $nice_results = [];
        foreach ($results as $result) {
            $nice_result = $this->createEntityFromWpdbResult(
                $relation->get_other_model(),
                $result,
                $request
            );
            if ($relation instanceof EE_HABTM_Relation) {
                // put the unusual stuff (properties from the HABTM relation) first, and make sure
                // if there are conflicts we prefer the properties from the main model
                $join_model_result = $this->createEntityFromWpdbResult(
                    $relation->get_join_model(),
                    $result,
                    $request
                );
                $joined_result     = array_merge($join_model_result, $nice_result);
                // but keep the meta stuff from the main model
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
     * @param string                 $id the ID of the thing we are fetching related stuff from
     * @param EE_Model_Relation_Base $relation
     * @param WP_REST_Request        $request
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function getEntitiesFromRelation($id, $relation, $request)
    {
        if (! $relation->get_this_model()->has_primary_key_field()) {
            throw new EE_Error(
                sprintf(
                    esc_html__(
                    // @codingStandardsIgnoreStart
                        'Read::get_entities_from_relation should only be called from a model with a primary key, it was called from %1$s',
                        // @codingStandardsIgnoreEnd
                        'event_espresso'
                    ),
                    $relation->get_this_model()->get_this_model_name()
                )
            );
        }
        // can we edit that main item?
        // if not, show nothing but an error
        // otherwise, please proceed
        return $this->getEntitiesFromRelationUsingModelQueryParams(
            [
                [
                    $relation->get_this_model()->primary_key_name() => $id,
                ],
            ],
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
     * @param array    $query_params
     * @return void
     * @throws EE_Error
     * @throws EE_Error
     */
    protected function setHeadersFromQueryParams($model, $query_params)
    {
        $this->setDebugInfo('model query params', $query_params);
        $this->setDebugInfo(
            'missing caps',
            Capabilities::getMissingPermissionsString($model, $query_params['caps'])
        );
        // normally the limit to a 2-part array, where the 2nd item is the limit
        if (! isset($query_params['limit'])) {
            $query_params['limit'] = EED_Core_Rest_Api::get_default_query_limit();
        }
        if (is_array($query_params['limit'])) {
            $limit_parts = $query_params['limit'];
        } else {
            $limit_parts = explode(',', $query_params['limit']);
            if (count($limit_parts) == 1) {
                $limit_parts = [0, $limit_parts[0]];
            }
        }
        // remove the group by and having parts of the query, as those will
        // make the sql query return an array of values, instead of just a single value
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
     * @param array           $db_row     like results from $wpdb->get_results()
     * @param WP_REST_Request $rest_request
     * @param string          $deprecated no longer used
     * @return array ready for being converted into json for sending to client
     * @throws EE_Error
     * @throws RestException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     */
    public function createEntityFromWpdbResult($model, $db_row, $rest_request, $deprecated = null)
    {
        if (! $rest_request instanceof WP_REST_Request) {
            // ok so this was called in the old style, where the 3rd arg was
            // $include, and the 4th arg was $context
            // now setup the request just to avoid fatal errors, although we won't be able
            // to truly make use of it because it's kinda devoid of info
            $rest_request = new WP_REST_Request();
            $rest_request->set_param('include', $rest_request);
            $rest_request->set_param('caps', $deprecated);
        }
        if ($rest_request->get_param('caps') == null) {
            $rest_request->set_param('caps', EEM_Base::caps_read);
        }
        $current_user_full_access_to_entity = $model->currentUserCan(
            EEM_Base::caps_read_admin,
            $model->deduce_fields_n_values_from_cols_n_values($db_row)
        );
        $entity_array                       = $this->createBareEntityFromWpdbResults($model, $db_row);
        $entity_array                       = $this->addExtraFields($model, $db_row, $entity_array);
        $entity_array['_links']             = $this->getEntityLinks($model, $db_row, $entity_array);
        // when it's a regular read request for a model with a password and the password wasn't provided
        // remove the password protected fields
        $has_protected_fields = false;
        try {
            $this->checkPassword(
                $model,
                $db_row,
                $model->alter_query_params_to_restrict_by_ID(
                    $model->get_index_primary_key_string(
                        $model->deduce_fields_n_values_from_cols_n_values($db_row)
                    )
                ),
                $rest_request
            );
        } catch (RestPasswordRequiredException $e) {
            if ($model->hasPassword()) {
                // just remove protected fields
                $has_protected_fields = true;
                $entity_array         = Capabilities::filterOutPasswordProtectedFields(
                    $entity_array,
                    $model,
                    $this->getModelVersionInfo()
                );
            } else {
                // that's a problem. None of this should be accessible if no password was provided
                throw $e;
            }
        }

        $entity_array['_calculated_fields'] =
            $this->getEntityCalculations($model, $db_row, $rest_request, $has_protected_fields);
        $entity_array                       = apply_filters(
            'FHEE__Read__create_entity_from_wpdb_results__entity_before_including_requested_models',
            $entity_array,
            $model,
            $rest_request->get_param('caps'),
            $rest_request,
            $this
        );
        // add an empty protected property for now. If it's still around after we remove everything the request didn't
        // want, we'll populate it then. k?
        $entity_array['_protected'] = [];
        // remove any properties the request didn't want. This way _protected won't bother mentioning them
        $entity_array = $this->includeOnlyRequestedProperties($model, $rest_request, $entity_array);
        $entity_array =
            $this->includeRequestedModels($model, $rest_request, $entity_array, $db_row, $has_protected_fields);
        // if they still wanted the _protected property, add it.
        if (isset($entity_array['_protected'])) {
            $entity_array = $this->addProtectedProperty($model, $entity_array, $has_protected_fields);
        }
        $entity_array = apply_filters(
            'FHEE__Read__create_entity_from_wpdb_results__entity_before_inaccessible_field_removal',
            $entity_array,
            $model,
            $rest_request->get_param('caps'),
            $rest_request,
            $this
        );
        if (! $current_user_full_access_to_entity) {
            $result_without_inaccessible_fields = Capabilities::filterOutInaccessibleEntityFields(
                $entity_array,
                $model,
                $rest_request->get_param('caps'),
                $this->getModelVersionInfo()
            );
        } else {
            $result_without_inaccessible_fields = $entity_array;
        }
        $this->setDebugInfo(
            'inaccessible fields',
            array_keys(array_diff_key((array) $entity_array, (array) $result_without_inaccessible_fields))
        );
        return apply_filters(
            'FHEE__Read__create_entity_from_wpdb_results__entity_return',
            $result_without_inaccessible_fields,
            $model,
            $rest_request->get_param('caps')
        );
    }


    /**
     * Returns an array describing which fields can be protected, and which actually were removed this request
     *
     * @param EEM_Base $model
     * @param array    $results_so_far
     * @param bool     $protected
     * @return array results
     * @throws EE_Error
     * @since 4.9.74.p
     */
    protected function addProtectedProperty(EEM_Base $model, $results_so_far, $protected)
    {
        if (! $model->hasPassword() || ! $protected) {
            return $results_so_far;
        }
        $password_field  = $model->getPasswordField();
        $all_protected   = array_merge(
            [$password_field->get_name()],
            $password_field->protectedFields()
        );
        $fields_included = array_keys($results_so_far);
        $fields_included = array_intersect(
            $all_protected,
            $fields_included
        );
        foreach ($fields_included as $field_name) {
            $results_so_far['_protected'][] = $field_name;
        }
        return $results_so_far;
    }


    /**
     * Creates a REST entity array (JSON object we're going to return in the response, but
     * for now still a PHP array, but soon enough we'll call json_encode on it, don't worry),
     * from $wpdb->get_row( $sql, ARRAY_A)
     *
     * @param EEM_Base $model
     * @param array    $db_row
     * @return array entity mostly ready for converting to JSON and sending in the response
     * @throws EE_Error
     * @throws ReflectionException
     * @throws RestException
     */
    protected function createBareEntityFromWpdbResults(EEM_Base $model, $db_row)
    {
        $result = $model->deduce_fields_n_values_from_cols_n_values($db_row);
        $result = array_intersect_key(
            $result,
            $this->getModelVersionInfo()->fieldsOnModelInThisVersion($model)
        );
        // if this is a CPT, we need to set the global $post to it,
        // otherwise shortcodes etc won't work properly while rendering it
        if ($model instanceof EEM_CPT_Base) {
            $do_chevy_shuffle = true;
        } else {
            $do_chevy_shuffle = false;
        }
        if ($do_chevy_shuffle) {
            global $post;
            $old_post = $post;
            $post     = get_post($result[ $model->primary_key_name() ]);
            if (! $post instanceof WP_Post) {
                // well that's weird, because $result is what we JUST fetched from the database
                throw new RestException(
                    'error_fetching_post_from_database_results',
                    esc_html__(
                        'An item was retrieved from the database but it\'s not a WP_Post like it should be.',
                        'event_espresso'
                    )
                );
            }
            $model_object_classname          = 'EE_' . $model->get_this_model_name();
            $post->{$model_object_classname} = EE_Registry::instance()->load_class(
                $model_object_classname,
                $result,
                false,
                false
            );
        }
        foreach ($result as $field_name => $field_value) {
            $field_obj = $model->field_settings_for($field_name);
            if ($this->isSubclassOfOne($field_obj, $this->getModelVersionInfo()->fieldsIgnored())) {
                unset($result[ $field_name ]);
            } elseif (
                $this->isSubclassOfOne(
                    $field_obj,
                    $this->getModelVersionInfo()->fieldsThatHaveRenderedFormat()
                )
            ) {
                $result[ $field_name ] = [
                    'raw'      => $this->prepareFieldObjValueForJson($field_obj, $field_value),
                    'rendered' => $this->prepareFieldObjValueForJson($field_obj, $field_value, 'pretty'),
                ];
            } elseif (
                $this->isSubclassOfOne(
                    $field_obj,
                    $this->getModelVersionInfo()->fieldsThatHavePrettyFormat()
                )
            ) {
                $result[ $field_name ] = [
                    'raw'    => $this->prepareFieldObjValueForJson($field_obj, $field_value),
                    'pretty' => $this->prepareFieldObjValueForJson($field_obj, $field_value, 'pretty'),
                ];
            } elseif ($field_obj instanceof EE_Datetime_Field) {
                $field_value = $field_obj->prepare_for_set_from_db($field_value);
                // if the value is null, but we're not supposed to permit null, then set to the field's default
                if (is_null($field_value)) {
                    $field_value = $field_obj->getDefaultDateTimeObj();
                }
                if (is_null($field_value)) {
                    $gmt_date = $local_date = ModelDataTranslator::prepareFieldValuesForJson(
                        $field_obj,
                        $field_value,
                        $this->getModelVersionInfo()->requestedVersion()
                    );
                } else {
                    $timezone = $field_value->getTimezone();
                    EEH_DTT_Helper::setTimezone($field_value, new DateTimeZone('UTC'));
                    $gmt_date = ModelDataTranslator::prepareFieldValuesForJson(
                        $field_obj,
                        $field_value,
                        $this->getModelVersionInfo()->requestedVersion()
                    );
                    EEH_DTT_Helper::setTimezone($field_value, $timezone);
                    $local_date = ModelDataTranslator::prepareFieldValuesForJson(
                        $field_obj,
                        $field_value,
                        $this->getModelVersionInfo()->requestedVersion()
                    );
                }
                $result[ $field_name . '_gmt' ] = $gmt_date;
                $result[ $field_name ]          = $local_date;
            } else {
                $result[ $field_name ] = $this->prepareFieldObjValueForJson($field_obj, $field_value);
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
     * @param mixed               $value  as it's stored on a model object
     * @param string              $format valid values are 'normal' (default), 'pretty', 'datetime_obj'
     * @return array
     * @throws RestException if $value contains a PHP object
     * @throws EE_Error
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
     * @param array    $db_row
     * @param array    $entity_array
     * @return array modified entity
     * @throws EE_Error
     * @throws EE_Error
     */
    protected function addExtraFields(EEM_Base $model, $db_row, $entity_array)
    {
        if ($model instanceof EEM_CPT_Base) {
            $entity_array['link'] = get_permalink($db_row[ $model->get_primary_key_field()->get_qualified_column() ]);
        }
        return $entity_array;
    }


    /**
     * Gets links we want to add to the response
     *
     * @param EEM_Base        $model
     * @param array           $db_row
     * @param array           $entity_array
     * @return array the _links item in the entity
     * @throws EE_Error
     * @throws EE_Error
     * @global WP_REST_Server $wp_rest_server
     */
    protected function getEntityLinks($model, $db_row, $entity_array)
    {
        // add basic links
        $links = [];
        if ($model->has_primary_key_field()) {
            $links['self'] = [
                [
                    'href' => $this->getVersionedLinkTo(
                        EEH_Inflector::pluralize_and_lower($model->get_this_model_name())
                        . '/'
                        . $entity_array[ $model->primary_key_name() ]
                    ),
                ],
            ];
        }
        $links['collection'] = [
            [
                'href' => $this->getVersionedLinkTo(
                    EEH_Inflector::pluralize_and_lower($model->get_this_model_name())
                ),
            ],
        ];
        // add links to related models
        if ($model->has_primary_key_field()) {
            foreach ($this->getModelVersionInfo()->relationSettings($model) as $relation_name => $relation_obj) {
                $related_model_part                                                      =
                    Read::getRelatedEntityName($relation_name, $relation_obj);
                $links[ EED_Core_Rest_Api::ee_api_link_namespace . $related_model_part ] = [
                    [
                        'href'   => $this->getVersionedLinkTo(
                            EEH_Inflector::pluralize_and_lower($model->get_this_model_name())
                            . '/'
                            . $entity_array[ $model->primary_key_name() ]
                            . '/'
                            . $related_model_part
                        ),
                        'single' => $relation_obj instanceof EE_Belongs_To_Relation,
                    ],
                ];
            }
        }
        return $links;
    }


    /**
     * Adds the included models indicated in the request to the entity provided
     *
     * @param EEM_Base        $model
     * @param WP_REST_Request $rest_request
     * @param array           $entity_array
     * @param array           $db_row
     * @param boolean         $included_items_protected if the original item is password protected, don't include any
     *                                                  related models.
     * @return array the modified entity
     * @throws EE_Error
     * @throws ReflectionException
     */
    protected function includeRequestedModels(
        EEM_Base $model,
        WP_REST_Request $rest_request,
        $entity_array,
        $db_row = [],
        $included_items_protected = false
    ) {
        // if $db_row not included, hope the entity array has what we need
        if (! $db_row) {
            $db_row = $entity_array;
        }
        $relation_settings = $this->getModelVersionInfo()->relationSettings($model);
        foreach ($relation_settings as $relation_name => $relation_obj) {
            $related_fields_to_include   = $this->explodeAndGetItemsPrefixedWith(
                $rest_request->get_param('include'),
                $relation_name
            );
            $related_fields_to_calculate = $this->explodeAndGetItemsPrefixedWith(
                $rest_request->get_param('calculate'),
                $relation_name
            );
            // did they specify they wanted to include a related model, or
            // specific fields from a related model?
            // or did they specify to calculate a field from a related model?
            if ($related_fields_to_include || $related_fields_to_calculate) {
                // if so, we should include at least some part of the related model
                $pretend_related_request = new WP_REST_Request();
                $pretend_related_request->set_query_params(
                    [
                        'caps'      => $rest_request->get_param('caps'),
                        'include'   => $related_fields_to_include,
                        'calculate' => $related_fields_to_calculate,
                        'password'  => $rest_request->get_param('password'),
                    ]
                );
                $pretend_related_request->add_header('no_rest_headers', true);
                $primary_model_query_params = $model->alter_query_params_to_restrict_by_ID(
                    $model->get_index_primary_key_string(
                        $model->deduce_fields_n_values_from_cols_n_values($db_row)
                    )
                );
                if (! $included_items_protected) {
                    try {
                        $related_results = $this->getEntitiesFromRelationUsingModelQueryParams(
                            $primary_model_query_params,
                            $relation_obj,
                            $pretend_related_request
                        );
                    } catch (RestException $e) {
                        $related_results = null;
                    }
                } else {
                    // they're protected, hide them.
                    $related_results              = null;
                    $entity_array['_protected'][] = Read::getRelatedEntityName($relation_name, $relation_obj);
                }
                if ($related_results instanceof WP_Error || $related_results === null) {
                    $related_results =
                        $relation_obj instanceof EE_Belongs_To_Relation
                            ? null
                            : [];
                }
                $entity_array[ Read::getRelatedEntityName($relation_name, $relation_obj) ] = $related_results;
            }
        }
        return $entity_array;
    }


    /**
     * If the user has requested only specific properties (including meta properties like _links or _protected)
     * remove everything else.
     *
     * @param EEM_Base        $model
     * @param WP_REST_Request $rest_request
     * @param                 $entity_array
     * @return array
     * @throws EE_Error
     * @since 4.9.74.p
     */
    protected function includeOnlyRequestedProperties(
        EEM_Base $model,
        WP_REST_Request $rest_request,
        $entity_array
    ) {

        $includes_for_this_model = $this->explodeAndGetItemsPrefixedWith($rest_request->get_param('include'), '');
        $includes_for_this_model = $this->removeModelNamesFromArray($includes_for_this_model);
        // if they passed in * or didn't specify any includes, return everything
        if (
            ! in_array('*', $includes_for_this_model)
            && ! empty($includes_for_this_model)
        ) {
            if ($model->has_primary_key_field()) {
                // always include the primary key. ya just gotta know that at least
                $includes_for_this_model[] = $model->primary_key_name();
            }
            if ($this->explodeAndGetItemsPrefixedWith($rest_request->get_param('calculate'), '')) {
                $includes_for_this_model[] = '_calculated_fields';
            }
            $entity_array = array_intersect_key($entity_array, array_flip($includes_for_this_model));
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
     * @param array           $wpdb_row
     * @param WP_REST_Request $rest_request
     * @param boolean         $row_is_protected whether this row is password protected or not
     * @return stdClass the _calculations item in the entity
     * @throws RestException if a default value has a PHP object, which should never do (and if we
     * @throws EE_Error
     *                                          did, let's know about it ASAP, so let the exception bubble up)
     */
    protected function getEntityCalculations($model, $wpdb_row, $rest_request, $row_is_protected = false)
    {
        $calculated_fields = $this->explodeAndGetItemsPrefixedWith(
            $rest_request->get_param('calculate'),
            ''
        );
        // note: setting calculate=* doesn't do anything
        $calculated_fields_to_return = new stdClass();
        $protected_fields            = [];
        foreach ($calculated_fields as $field_to_calculate) {
            try {
                // it's password protected, so they shouldn't be able to read this. Remove the value
                $schema = $this->fields_calculator->getJsonSchemaForModel($model);
                if (
                    $row_is_protected
                    && isset($schema['properties'][ $field_to_calculate ]['protected'])
                    && $schema['properties'][ $field_to_calculate ]['protected']
                ) {
                    $calculated_value   = null;
                    $protected_fields[] = $field_to_calculate;
                    if ($schema['properties'][ $field_to_calculate ]['type']) {
                        switch ($schema['properties'][ $field_to_calculate ]['type']) {
                            case 'boolean':
                                $calculated_value = false;
                                break;
                            case 'integer':
                                $calculated_value = 0;
                                break;
                            case 'string':
                                $calculated_value = '';
                                break;
                            case 'array':
                                $calculated_value = [];
                                break;
                            case 'object':
                                $calculated_value = new stdClass();
                                break;
                        }
                    }
                } else {
                    $calculated_value = ModelDataTranslator::prepareFieldValueForJson(
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
                }
                $calculated_fields_to_return->{$field_to_calculate} = $calculated_value;
            } catch (RestException $e) {
                // if we don't have permission to read it, just leave it out. but let devs know about the problem
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
        $calculated_fields_to_return->_protected = $protected_fields;
        return $calculated_fields_to_return;
    }


    /**
     * Gets the full URL to the resource, taking the requested version into account
     *
     * @param string $link_part_after_version_and_slash eg "events/10/datetimes"
     * @return string url eg "http://mysite.com/wp-json/ee/v4.6/events/10/datetimes"
     * @throws EE_Error
     * @throws EE_Error
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
     * @param string                 $relation_name
     * @param EE_Model_Relation_Base $relation_obj
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
     * @return array
     * @throws EE_Error
     * @throws EE_Error
     * @throws ReflectionException
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
        $valid_default_where_conditions_for_api_calls = [
            EEM_Base::default_where_conditions_all,
            EEM_Base::default_where_conditions_minimum_all,
            EEM_Base::default_where_conditions_minimum_others,
        ];
        if (! $default_query_params) {
            $default_query_params = EEM_Base::default_where_conditions_all;
        }
        if (
            in_array(
                $default_query_params,
                $valid_default_where_conditions_for_api_calls,
                true
            )
        ) {
            return $default_query_params;
        }
        return EEM_Base::default_where_conditions_all;
    }


    /**
     * Translates API filter get parameter into model query params @see
     * https://github.com/eventespresso/event-espresso-core/tree/master/docs/G--Model-System/model-query-params.md#0-where-conditions.
     * Note: right now the query parameter keys for fields (and related fields) can be left as-is, but it's quite
     * possible this will change someday. Also, this method's contents might be candidate for moving to
     * Model_Data_Translator
     *
     * @param EEM_Base $model
     * @param array    $query_params
     * @return array model query params (@see
     *               https://github.com/eventespresso/event-espresso-core/tree/master/docs/G--Model-System/model-query-params.md#0-where-conditions)
     *               or FALSE to indicate that absolutely no results should be returned
     * @throws EE_Error
     * @throws RestException
     */
    public function createModelQueryParams($model, $query_params)
    {
        $model_query_params = [];
        if (isset($query_params['where'])) {
            $model_query_params[0] = ModelDataTranslator::prepareConditionsQueryParamsForModels(
                $query_params['where'],
                $model,
                $this->getModelVersionInfo()->requestedVersion()
            );
        }
        if (isset($query_params['order_by'])) {
            $order_by = $query_params['order_by'];
        } elseif (isset($query_params['orderby'])) {
            $order_by = $query_params['orderby'];
        } else {
            $order_by = null;
        }
        if ($order_by !== null) {
            if (is_array($order_by)) {
                $order_by = ModelDataTranslator::prepareFieldNamesInArrayKeysFromJson($order_by);
            } else {
                // it's a single item
                $order_by = ModelDataTranslator::prepareFieldNameFromJson($order_by);
            }
            $model_query_params['order_by'] = $order_by;
        }
        if (isset($query_params['group_by'])) {
            $group_by = $query_params['group_by'];
        } elseif (isset($query_params['groupby'])) {
            $group_by = $query_params['groupby'];
        } else {
            $group_by = array_keys($model->get_combined_primary_key_fields());
        }
        // make sure they're all real names
        if (is_array($group_by)) {
            $group_by = ModelDataTranslator::prepareFieldNamesFromJson($group_by);
        }
        if ($group_by !== null) {
            $model_query_params['group_by'] = $group_by;
        }
        if (isset($query_params['having'])) {
            $model_query_params['having'] = ModelDataTranslator::prepareConditionsQueryParamsForModels(
                $query_params['having'],
                $model,
                $this->getModelVersionInfo()->requestedVersion()
            );
        }
        if (isset($query_params['order'])) {
            $model_query_params['order'] = $query_params['order'];
        }
        if (isset($query_params['mine'])) {
            $model_query_params = $model->alter_query_params_to_only_include_mine($model_query_params);
        }
        if (isset($query_params['limit'])) {
            // limit should be either a string like '23' or '23,43', or an array with two items in it
            if (! is_array($query_params['limit'])) {
                $limit_array = explode(',', (string) $query_params['limit']);
            } else {
                $limit_array = $query_params['limit'];
            }
            $sanitized_limit = [];
            foreach ($limit_array as $limit_part) {
                if ($this->debug_mode && (! is_numeric($limit_part) || count($sanitized_limit) > 2)) {
                    throw new EE_Error(
                        sprintf(
                            esc_html__(
                            // @codingStandardsIgnoreStart
                                'An invalid limit filter was provided. It was: %s. If the EE4 JSON REST API weren\'t in debug mode, this message would not appear.',
                                // @codingStandardsIgnoreEnd
                                'event_espresso'
                            ),
                            wp_json_encode($query_params['limit'])
                        )
                    );
                }
                $sanitized_limit[] = (int) $limit_part;
            }
            $model_query_params['limit'] = implode(',', $sanitized_limit);
        } else {
            $model_query_params['limit'] = EED_Core_Rest_Api::get_default_query_limit();
        }
        if (isset($query_params['caps'])) {
            $model_query_params['caps'] = $this->validateContext($query_params['caps']);
        } else {
            $model_query_params['caps'] = EEM_Base::caps_read;
        }
        if (isset($query_params['default_where_conditions'])) {
            $model_query_params['default_where_conditions'] = $this->validateDefaultQueryParams(
                $query_params['default_where_conditions']
            );
        }
        // if this is a model protected by a password on another model, exclude the password protected
        // entities by default. But if they passed in a password, try to show them all. If the password is wrong,
        // though, they'll get an error (see Read::createEntityFromWpdbResult() which calls Read::checkPassword)
        if (
            ! $model->hasPassword()
            && $model->restrictedByRelatedModelPassword()
            && $model_query_params['caps'] === EEM_Base::caps_read
        ) {
            if (empty($query_params['password'])) {
                $model_query_params['exclude_protected'] = true;
            }
        }

        return apply_filters('FHEE__Read__create_model_query_params', $model_query_params, $query_params, $model);
    }


    /**
     * Changes the REST-style query params for use in the models
     *
     * @param EEM_Base $model
     * @param array    $query_params sub-array from @see EEM_Base::get_all()
     * @return array
     * @deprecated
     */
    public function prepareRestQueryParamsKeyForModels($model, $query_params)
    {
        $model_ready_query_params = [];
        foreach ($query_params as $key => $value) {
            $model_ready_query_params[ $key ] = is_array($value)
                ? $this->prepareRestQueryParamsKeyForModels($model, $value)
                : $value;
        }
        return $model_ready_query_params;
    }


    /**
     * @param $model
     * @param $query_params
     * @return array
     * @deprecated instead use ModelDataTranslator::prepareFieldValuesFromJson()
     */
    public function prepareRestQueryParamsValuesForModels($model, $query_params)
    {
        $model_ready_query_params = [];
        foreach ($query_params as $key => $value) {
            if (is_array($value)) {
                $model_ready_query_params[ $key ] = $this->prepareRestQueryParamsValuesForModels($model, $value);
            } else {
                $model_ready_query_params[ $key ] = $value;
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
            $exploded_contents = [];
        }
        // if the string was empty, we want an empty array
        $exploded_contents    = array_filter($exploded_contents);
        $contents_with_prefix = [];
        foreach ($exploded_contents as $item) {
            $item = trim($item);
            // if no prefix was provided, so we look for items with no "." in them
            if (! $prefix) {
                // does this item have a period?
                if (strpos($item, '.') === false) {
                    // if not, then its what we're looking for
                    $contents_with_prefix[] = $item;
                }
            } elseif (strpos($item, $prefix . '.') === 0) {
                // this item has the prefix and a period, grab it
                $contents_with_prefix[] = substr(
                    $item,
                    strpos($item, $prefix . '.') + strlen($prefix . '.')
                );
            } elseif ($item === $prefix) {
                // this item is JUST the prefix
                // so let's grab everything after, which is a blank string
                $contents_with_prefix[] = '';
            }
        }
        return $contents_with_prefix;
    }


    /**
     * @param string $include_string @see Read:handle_request_get_all
     * @param string $model_name
     * @return array of fields for this model. If $model_name is provided, then
     *                               the fields for that model, with the model's name removed from each.
     *                               If $include_string was blank or '*' returns an empty array
     * @throws EE_Error
     * @throws EE_Error
     * @deprecated since 4.8.36.rc.001 You should instead use Read::explode_and_get_items_prefixed_with.
     *                               Deprecated because its return values were really quite confusing- sometimes it
     *                               returned an empty array (when the include string was blank or '*') or sometimes it
     *                               returned array('*') (when you provided a model and a model of that kind was
     *                               found). Parses the $include_string so we fetch all the field names relating to
     *                               THIS model
     *                               (ie have NO period in them), or for the provided model (ie start with the model
     *                               name and then a period).
     */
    public function extractIncludesForThisModel($include_string, $model_name = null)
    {
        if (is_array($include_string)) {
            $include_string = implode(',', $include_string);
        }
        if ($include_string === '*' || $include_string === '') {
            return [];
        }
        $includes                    = explode(',', $include_string);
        $extracted_fields_to_include = [];
        if ($model_name) {
            foreach ($includes as $field_to_include) {
                $field_to_include = trim($field_to_include);
                if (strpos($field_to_include, $model_name . '.') === 0) {
                    // found the model name at the exact start
                    $field_sans_model_name         = str_replace($model_name . '.', '', $field_to_include);
                    $extracted_fields_to_include[] = $field_sans_model_name;
                } elseif ($field_to_include == $model_name) {
                    $extracted_fields_to_include[] = '*';
                }
            }
        } else {
            // look for ones with no period
            foreach ($includes as $field_to_include) {
                $field_to_include = trim($field_to_include);
                if (
                    strpos($field_to_include, '.') === false
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
     * @param EEM_Base        $model
     * @param WP_REST_Request $request
     * @param null            $context
     * @return array
     * @throws EE_Error
     * @throws ReflectionException
     */
    public function getOneOrReportPermissionError(EEM_Base $model, WP_REST_Request $request, $context = null)
    {
        $query_params = [[$model->primary_key_name() => $request->get_param('id')], 'limit' => 1];
        if ($model instanceof EEM_Soft_Delete_Base) {
            $query_params = $model->alter_query_params_so_deleted_and_undeleted_items_included($query_params);
        }
        $restricted_query_params         = $query_params;
        $restricted_query_params['caps'] = $context;
        $this->setDebugInfo('model query params', $restricted_query_params);
        $model_rows = $model->get_all_wpdb_results($restricted_query_params);
        if (! empty($model_rows)) {
            return $this->createEntityFromWpdbResult(
                $model,
                reset($model_rows),
                $request
            );
        } else {
            // ok let's test to see if we WOULD have found it, had we not had restrictions from missing capabilities
            $lowercase_model_name = strtolower($model->get_this_model_name());
            if ($model->exists($query_params)) {
                // you got shafted- it existed but we didn't want to tell you!
                throw new RestException(
                    'rest_user_cannot_' . $context,
                    sprintf(
                        esc_html__('Sorry, you cannot %1$s this %2$s. Missing permissions are: %3$s', 'event_espresso'),
                        $context,
                        $lowercase_model_name,
                        Capabilities::getMissingPermissionsString(
                            $model,
                            $context
                        )
                    ),
                    ['status' => 403]
                );
            } else {
                // it's not you. It just doesn't exist
                throw new RestException(
                    sprintf('rest_%s_invalid_id', $lowercase_model_name),
                    sprintf(esc_html__('Invalid %s ID.', 'event_espresso'), $lowercase_model_name),
                    ['status' => 404]
                );
            }
        }
    }


    /**
     * Checks that if this content requires a password to be read, that it's been provided and is correct.
     *
     * @param EEM_Base        $model
     * @param array           $model_row
     * @param array           $query_params Adds 'default_where_conditions' => 'minimum'
     *                                      to ensure we don't confuse trashed with password protected.
     * @param WP_REST_Request $request
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws RestPasswordRequiredException
     * @throws RestPasswordIncorrectException
     * @throws ModelConfigurationException
     * @throws ReflectionException
     * @since 4.9.74.p
     */
    protected function checkPassword(EEM_Base $model, $model_row, $query_params, WP_REST_Request $request)
    {
        $query_params['default_where_conditions'] = 'minimum';
        // stuff is only "protected" for front-end requests. Elsewhere, you either get full permission to access the object
        // or you don't.
        $request_caps = $request->get_param('caps');
        if (isset($request_caps) && $request_caps !== EEM_Base::caps_read) {
            return;
        }
        // if this entity requires a password, they better give it and it better be right!
        if (
            $model->hasPassword()
            && $model_row[ $model->getPasswordField()->get_qualified_column() ] !== ''
        ) {
            if (empty($request['password'])) {
                throw new RestPasswordRequiredException();
            }
            if (
                ! hash_equals(
                    $model_row[ $model->getPasswordField()->get_qualified_column() ],
                    $request['password']
                )
            ) {
                throw new RestPasswordIncorrectException();
            }
        } elseif (
            // wait! maybe this content is password protected
            $model->restrictedByRelatedModelPassword()
            && $request->get_param('caps') === EEM_Base::caps_read
        ) {
            $password_supplied = $request->get_param('password');
            if (empty($password_supplied)) {
                $query_params['exclude_protected'] = true;
                if (! $model->exists($query_params)) {
                    throw new RestPasswordRequiredException();
                }
            } else {
                $query_params[0][ $model->modelChainAndPassword() ] = $password_supplied;
                if (! $model->exists($query_params)) {
                    throw new RestPasswordIncorrectException();
                }
            }
        }
    }
}
