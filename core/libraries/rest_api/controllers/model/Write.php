<?php

namespace EventEspresso\core\libraries\rest_api\controllers\model;

use DomainException;
use EE_DB_Only_Field_Base;
use EE_HABTM_Relation;
use EE_Model_Relation_Base;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use EventEspresso\core\services\loaders\LoaderFactory;
use Exception;
use InvalidArgumentException;
use ReflectionException;
use \WP_REST_Request;
use \WP_REST_Response;
use EventEspresso\core\libraries\rest_api\Capabilities;
use EventEspresso\core\libraries\rest_api\ModelDataTranslator;
use EventEspresso\core\libraries\rest_api\RestException;
use \EEM_Base;
use \EE_Base_Class;
use \EE_Registry;
use \EE_Datetime_Field;
use \EEM_Soft_Delete_Base;
use EE_Restriction_Generator_Base;
use EED_Core_Rest_Api;
use EEH_Inflector;
use EE_Error;

/**
 * Write controller for models
 * Handles requests relating to GET-ting model information
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 */
class Write extends Base
{


    public function __construct()
    {
        parent::__construct();
        EE_Registry::instance()->load_helper('Inflector');
    }


    /**
     * Handles requests to get all (or a filtered subset) of entities for a particular model
     *
     * @param WP_REST_Request $request
     * @param string          $version
     * @param string          $model_name
     * @return WP_REST_Response|\WP_Error
     */
    public static function handleRequestInsert(WP_REST_Request $request, $version, $model_name)
    {
        $controller = new Write();
        try {
            $controller->setRequestedVersion($version);
            return $controller->sendResponse(
                $controller->insert(
                    $controller->getModelVersionInfo()->loadModel($model_name),
                    $request
                )
            );
        } catch (Exception $e) {
            return $controller->sendResponse($e);
        }
    }


    /**
     * Handles a request from \WP_REST_Server to update an EE model
     *
     * @param WP_REST_Request $request
     * @param string          $version
     * @param string          $model_name
     * @return WP_REST_Response|\WP_Error
     */
    public static function handleRequestUpdate(WP_REST_Request $request, $version, $model_name)
    {
        $controller = new Write();
        try {
            $controller->setRequestedVersion($version);
            return $controller->sendResponse(
                $controller->update(
                    $controller->getModelVersionInfo()->loadModel($model_name),
                    $request
                )
            );
        } catch (Exception $e) {
            return $controller->sendResponse($e);
        }
    }


    /**
     * Deletes a single model object and returns it. Unless
     *
     * @param WP_REST_Request $request
     * @param string          $version
     * @param string          $model_name
     * @return WP_REST_Response|\WP_Error
     */
    public static function handleRequestDelete(WP_REST_Request $request, $version, $model_name)
    {
        $controller = new Write();
        try {
            $controller->setRequestedVersion($version);
            return $controller->sendResponse(
                $controller->delete(
                    $controller->getModelVersionInfo()->loadModel($model_name),
                    $request
                )
            );
        } catch (Exception $e) {
            return $controller->sendResponse($e);
        }
    }


    /**
     * Inserts a new model object according to the $request
     *
     * @param EEM_Base        $model
     * @param WP_REST_Request $request
     * @return array
     * @throws EE_Error
     * @throws RestException
     */
    public function insert(EEM_Base $model, WP_REST_Request $request)
    {
        Capabilities::verifyAtLeastPartialAccessTo($model, EEM_Base::caps_edit, 'create');
        $default_cap_to_check_for = EE_Restriction_Generator_Base::get_default_restrictions_cap();
        if (! current_user_can($default_cap_to_check_for)) {
            throw new RestException(
                'rest_cannot_create_' . EEH_Inflector::pluralize_and_lower(($model->get_this_model_name())),
                sprintf(
                    esc_html__(
                    // @codingStandardsIgnoreStart
                        'For now, only those with the admin capability to "%1$s" are allowed to use the REST API to insert data into Event Espresso.',
                        // @codingStandardsIgnoreEnd
                        'event_espresso'
                    ),
                    $default_cap_to_check_for
                ),
                array('status' => 403)
            );
        }
        $submitted_json_data = array_merge((array) $request->get_body_params(), (array) $request->get_json_params());
        $model_data = ModelDataTranslator::prepareConditionsQueryParamsForModels(
            $submitted_json_data,
            $model,
            $this->getModelVersionInfo()->requestedVersion(),
            true
        );
        $model_obj = EE_Registry::instance()->load_class(
            $model->get_this_model_name(),
            array($model_data, $model->get_timezone()),
            false,
            false
        );
        $model_obj->save();
        $new_id = $model_obj->ID();
        if (! $new_id) {
            throw new RestException(
                'rest_insertion_failed',
                sprintf(__('Could not insert new %1$s', 'event_espresso'), $model->get_this_model_name())
            );
        }
        return $this->returnModelObjAsJsonResponse($model_obj, $request);
    }


    /**
     * Updates an existing model object according to the $request
     *
     * @param EEM_Base        $model
     * @param WP_REST_Request $request
     * @return array
     * @throws EE_Error
     */
    public function update(EEM_Base $model, WP_REST_Request $request)
    {
        Capabilities::verifyAtLeastPartialAccessTo($model, EEM_Base::caps_edit, 'edit');
        $default_cap_to_check_for = EE_Restriction_Generator_Base::get_default_restrictions_cap();
        if (! current_user_can($default_cap_to_check_for)) {
            throw new RestException(
                'rest_cannot_edit_' . EEH_Inflector::pluralize_and_lower(($model->get_this_model_name())),
                sprintf(
                    esc_html__(
                    // @codingStandardsIgnoreStart
                        'For now, only those with the admin capability to "%1$s" are allowed to use the REST API to update data into Event Espresso.',
                        // @codingStandardsIgnoreEnd
                        'event_espresso'
                    ),
                    $default_cap_to_check_for
                ),
                array('status' => 403)
            );
        }
        $obj_id = $request->get_param('id');
        if (! $obj_id) {
            throw new RestException(
                'rest_edit_failed',
                sprintf(__('Could not edit %1$s', 'event_espresso'), $model->get_this_model_name())
            );
        }
        $model_data = ModelDataTranslator::prepareConditionsQueryParamsForModels(
            $this->getBodyParams($request),
            $model,
            $this->getModelVersionInfo()->requestedVersion(),
            true
        );
        $model_obj = $model->get_one_by_ID($obj_id);
        if (! $model_obj instanceof EE_Base_Class) {
            $lowercase_model_name = strtolower($model->get_this_model_name());
            throw new RestException(
                sprintf('rest_%s_invalid_id', $lowercase_model_name),
                sprintf(__('Invalid %s ID.', 'event_espresso'), $lowercase_model_name),
                array('status' => 404)
            );
        }
        $model_obj->save($model_data);
        return $this->returnModelObjAsJsonResponse($model_obj, $request);
    }


    /**
     * Updates an existing model object according to the $request
     *
     * @param EEM_Base        $model
     * @param WP_REST_Request $request
     * @return array of either the soft-deleted item, or
     * @throws EE_Error
     */
    public function delete(EEM_Base $model, WP_REST_Request $request)
    {
        Capabilities::verifyAtLeastPartialAccessTo($model, EEM_Base::caps_delete, 'delete');
        $default_cap_to_check_for = EE_Restriction_Generator_Base::get_default_restrictions_cap();
        if (! current_user_can($default_cap_to_check_for)) {
            throw new RestException(
                'rest_cannot_delete_' . EEH_Inflector::pluralize_and_lower(($model->get_this_model_name())),
                sprintf(
                    esc_html__(
                    // @codingStandardsIgnoreStart
                        'For now, only those with the admin capability to "%1$s" are allowed to use the REST API to delete data into Event Espresso.',
                        // @codingStandardsIgnoreEnd
                        'event_espresso'
                    ),
                    $default_cap_to_check_for
                ),
                array('status' => 403)
            );
        }
        $obj_id = $request->get_param('id');
        // this is where we would apply more fine-grained caps
        $model_obj = $model->get_one_by_ID($obj_id);
        if (! $model_obj instanceof EE_Base_Class) {
            $lowercase_model_name = strtolower($model->get_this_model_name());
            throw new RestException(
                sprintf('rest_%s_invalid_id', $lowercase_model_name),
                sprintf(__('Invalid %s ID.', 'event_espresso'), $lowercase_model_name),
                array('status' => 404)
            );
        }
        $requested_permanent_delete = filter_var($request->get_param('force'), FILTER_VALIDATE_BOOLEAN);
        $requested_allow_blocking = filter_var($request->get_param('allow_blocking'), FILTER_VALIDATE_BOOLEAN);
        if ($requested_permanent_delete) {
            $previous = $this->returnModelObjAsJsonResponse($model_obj, $request);
            $deleted = (bool) $model->delete_permanently_by_ID($obj_id, $requested_allow_blocking);
            return array(
                'deleted'  => $deleted,
                'previous' => $previous,
            );
        } else {
            if ($model instanceof EEM_Soft_Delete_Base) {
                $model->delete_by_ID($obj_id, $requested_allow_blocking);
                return $this->returnModelObjAsJsonResponse($model_obj, $request);
            } else {
                throw new RestException(
                    'rest_trash_not_supported',
                    501,
                    sprintf(
                        esc_html__('%1$s do not support trashing. Set force=1 to delete.', 'event_espresso'),
                        EEH_Inflector::pluralize($model->get_this_model_name())
                    )
                );
            }
        }
    }


    /**
     * Returns an array ready to be converted into a JSON response, based solely on the model object
     *
     * @param EE_Base_Class   $model_obj
     * @param WP_REST_Request $request
     * @return array ready for a response
     */
    protected function returnModelObjAsJsonResponse(EE_Base_Class $model_obj, WP_REST_Request $request)
    {
        $model = $model_obj->get_model();
        // create an array exactly like the wpdb results row,
        // so we can pass it to controllers/model/Read::create_entity_from_wpdb_result()
        $simulated_db_row = array();
        foreach ($model->field_settings(true) as $field_name => $field_obj) {
            // we need to reconstruct the normal wpdb results, including the db-only fields
            // like a secondary table's primary key. The models expect those (but don't care what value they have)
            if ($field_obj instanceof EE_DB_Only_Field_Base) {
                $raw_value = true;
            } elseif ($field_obj instanceof EE_Datetime_Field) {
                $raw_value = $model_obj->get_DateTime_object($field_name);
            } else {
                $raw_value = $model_obj->get_raw($field_name);
            }
            $simulated_db_row[ $field_obj->get_qualified_column() ] = $field_obj->prepare_for_use_in_db($raw_value);
        }
        $read_controller = LoaderFactory::getLoader()->getNew('EventEspresso\core\libraries\rest_api\controllers\model\Read');
        $read_controller->setRequestedVersion($this->getRequestedVersion());
        // the simulates request really doesn't need any info downstream
        $simulated_request = new WP_REST_Request('GET');
        // set the caps context on the simulated according to the original request.
        switch ($request->get_method()) {
            case 'POST':
            case 'PUT':
                $caps_context = EEM_Base::caps_edit;
                break;
            case 'DELETE':
                $caps_context = EEM_Base::caps_delete;
                break;
            default:
                $caps_context = EEM_Base::caps_read_admin;
        }
        $simulated_request->set_param('caps', $caps_context);
        return $read_controller->createEntityFromWpdbResult(
            $model_obj->get_model(),
            $simulated_db_row,
            $simulated_request
        );
    }


    /**
     * Gets the item affected by this request
     *
     * @param EEM_Base        $model
     * @param WP_REST_Request $request
     * @param  int|string     $obj_id
     * @return \WP_Error|array
     */
    protected function getOneBasedOnRequest(EEM_Base $model, WP_REST_Request $request, $obj_id)
    {
        $requested_version = $this->getRequestedVersion($request->get_route());
        $get_request = new WP_REST_Request(
            'GET',
            EED_Core_Rest_Api::ee_api_namespace
            . $requested_version
            . '/'
            . EEH_Inflector::pluralize_and_lower($model->get_this_model_name())
            . '/'
            . $obj_id
        );
        $get_request->set_url_params(
            array(
                'id'      => $obj_id,
                'include' => $request->get_param('include'),
            )
        );
        $read_controller = new Read();
        $read_controller->setRequestedVersion($this->getRequestedVersion());
        return $read_controller->getEntityFromModel($model, $get_request);
    }

    /**
     * Adds a relation between the specified models (if it doesn't already exist.)
     * @since 4.9.76.p
     * @param WP_REST_Request $request
     * @return WP_REST_Response
     */
    public static function handleRequestAddRelation(WP_REST_Request $request, $version, $model_name, $related_model_name)
    {
        $controller = new Write();
        try {
            $controller->setRequestedVersion($version);
            $main_model = $controller->validateModel($model_name);
            $controller->validateModel($related_model_name);
            return $controller->sendResponse(
                $controller->addRelation(
                    $main_model,
                    $main_model->related_settings_for($related_model_name),
                    $request
                )
            );
        } catch (Exception $e) {
            return $controller->sendResponse($e);
        }
    }

    /**
     * Adds a relation between the two model specified model objects.
     * @since 4.9.76.p
     * @param EEM_Base $model
     * @param EE_Model_Relation_Base $relation
     * @param WP_REST_Request $request
     * @return array
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws RestException
     * @throws DomainException
     */
    public function addRelation(EEM_Base $model, EE_Model_Relation_Base $relation, WP_REST_Request $request)
    {
        list($model_obj, $other_obj) = $this->getBothModelObjects($model, $relation, $request);
        $extra_params = array();
        if ($relation instanceof EE_HABTM_Relation) {
            $extra_params = array_intersect_key(
                ModelDataTranslator::prepareConditionsQueryParamsForModels(
                    $request->get_body_params(),
                    $relation->get_join_model(),
                    $this->getModelVersionInfo()->requestedVersion(),
                    true
                ),
                $relation->getNonKeyFields()
            );
        }
        // Add a relation.
        $related_obj = $model_obj->_add_relation_to(
            $other_obj,
            $relation->get_other_model()->get_this_model_name(),
            $extra_params
        );
        $response = array(
            strtolower($model->get_this_model_name()) => $this->returnModelObjAsJsonResponse($model_obj, $request),
            strtolower($relation->get_other_model()->get_this_model_name()) => $this->returnModelObjAsJsonResponse($related_obj, $request),
        );
        if ($relation instanceof EE_HABTM_Relation) {
            $join_model_obj = $relation->get_join_model()->get_one(
                array(
                    array(
                        $model->primary_key_name() => $model_obj->ID(),
                        $relation->get_other_model()->primary_key_name() => $related_obj->ID()
                    )
                )
            );
            $response['join'][ strtolower($relation->get_join_model()->get_this_model_name()) ] = $this->returnModelObjAsJsonResponse($join_model_obj, $request);
        }
        return $response;
    }


    /**
     * Removes the relation between the specified models (if it exists).
     * @since 4.9.76.p
     * @param WP_REST_Request $request
     * @return WP_REST_Response
     */
    public static function handleRequestRemoveRelation(WP_REST_Request $request, $version, $model_name, $related_model_name)
    {
        $controller = new Write();
        try {
            $controller->setRequestedVersion($version);
            $main_model = $controller->getModelVersionInfo()->loadModel($model_name);
            return $controller->sendResponse(
                $controller->removeRelation(
                    $main_model,
                    $main_model->related_settings_for($related_model_name),
                    $request
                )
            );
        } catch (Exception $e) {
            return $controller->sendResponse($e);
        }
    }

    /**
     * Adds a relation between the two model specified model objects.
     * @since 4.9.76.p
     * @param EEM_Base $model
     * @param EE_Model_Relation_Base $relation
     * @param WP_REST_Request $request
     * @return array
     * @throws DomainException
     * @throws EE_Error
     * @throws InvalidArgumentException
     * @throws InvalidDataTypeException
     * @throws InvalidInterfaceException
     * @throws RestException
     */
    public function removeRelation(EEM_Base $model, EE_Model_Relation_Base $relation, WP_REST_Request $request)
    {
        // This endpoint doesn't accept body parameters (it's understandable to think it might, so let developers know
        // up-front that it doesn't.)
        if (!empty($request->get_body_params())) {
            $body_params = $request->get_body_params();
            throw new RestException(
                'invalid_field',
                sprintf(
                    esc_html__('This endpoint doesn\'t accept post body arguments, you sent in %1$s', 'event_espresso'),
                    implode(array_keys($body_params))
                )
            );
        }
        list($model_obj, $other_obj) = $this->getBothModelObjects($model, $relation, $request);
        // Remember the old relation, if it used a join entry.
        $join_model_obj = null;
        if ($relation instanceof EE_HABTM_Relation) {
            $join_model_obj = $relation->get_join_model()->get_one(
                array(
                    array(
                        $model->primary_key_name() => $model_obj->ID(),
                        $relation->get_other_model()->primary_key_name() => $other_obj->ID()
                    )
                )
            );
        }
        // Remove the relation.
        $related_obj = $model_obj->_remove_relation_to(
            $other_obj,
            $relation->get_other_model()->get_this_model_name()
        );
        $response = array(
            strtolower($model->get_this_model_name()) => $this->returnModelObjAsJsonResponse($model_obj, $request),
            strtolower($relation->get_other_model()->get_this_model_name()) => $this->returnModelObjAsJsonResponse($related_obj, $request),
        );
        if ($relation instanceof EE_HABTM_Relation) {
            $join_model_obj_after_removal = $relation->get_join_model()->get_one(
                array(
                    array(
                        $model->primary_key_name() => $model_obj->ID(),
                        $relation->get_other_model()->primary_key_name() => $other_obj->ID()
                    )
                )
            );
            if ($join_model_obj instanceof EE_Base_Class) {
                $response['join'][ strtolower($relation->get_join_model()->get_this_model_name()) ] = $this->returnModelObjAsJsonResponse($join_model_obj, $request);
            } else {
                $response['join'][ strtolower($relation->get_join_model()->get_this_model_name()) ] = null;
            }
        }
        return $response;
    }

    /**
     * Gets the model objects indicated by the model, relation object, and request.
     * Throws an exception if the first object doesn't exist, and currently if the related object also doesn't exist.
     * However, this behaviour may change, as we may add support for simultaneously creating and relating data.
     * @since 4.9.76.p
     * @param EEM_Base $model
     * @param EE_Model_Relation_Base $relation
     * @param WP_REST_Request $request
     * @return array {
     * @type EE_Base_Class $model_obj
     * @type EE_Base_Class|null $other_model_obj
     * }
     * @throws RestException
     */
    protected function getBothModelObjects(EEM_Base $model, EE_Model_Relation_Base $relation, WP_REST_Request $request)
    {
        // Check generic caps. For now, we're only allowing access to this endpoint to full admins.
        Capabilities::verifyAtLeastPartialAccessTo($model, EEM_Base::caps_edit, 'edit');
        $default_cap_to_check_for = EE_Restriction_Generator_Base::get_default_restrictions_cap();
        if (! current_user_can($default_cap_to_check_for)) {
            throw new RestException(
                'rest_cannot_edit_' . EEH_Inflector::pluralize_and_lower(($model->get_this_model_name())),
                sprintf(
                    esc_html__(
                        // @codingStandardsIgnoreStart
                        'For now, only those with the admin capability to "%1$s" are allowed to use the REST API to add relations in Event Espresso.',
                        // @codingStandardsIgnoreEnd
                        'event_espresso'
                    ),
                    $default_cap_to_check_for
                ),
                array('status' => 403)
            );
        }
        // Get the main model object.
        $model_obj = $this->getOneOrThrowException($model, $request->get_param('id'));
        // For now, we require the other model object to exist too. This might be relaxed later.
        $other_obj = $this->getOneOrThrowException($relation->get_other_model(), $request->get_param('related_id'));
        return array($model_obj,$other_obj);
    }

    /**
     * Gets the model with that ID or throws a REST exception.
     * @since 4.9.76.p
     * @param EEM_Base $model
     * @param $id
     * @return EE_Base_Class
     * @throws RestException
     */
    protected function getOneOrThrowException(EEM_Base $model, $id)
    {
        $model_obj = $model->get_one_by_ID($id);
        // @todo: check they can permission for it. For now unnecessary because only full admins can use this endpoint.
        if ($model_obj instanceof EE_Base_Class) {
            return $model_obj;
        }
        $lowercase_model_name = strtolower($model->get_this_model_name());
        throw new RestException(
            sprintf('rest_%s_invalid_id', $lowercase_model_name),
            sprintf(__('Invalid %s ID.', 'event_espresso'), $lowercase_model_name),
            array('status' => 404)
        );
    }
}
