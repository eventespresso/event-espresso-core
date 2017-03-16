<?php
namespace EventEspresso\core\libraries\rest_api\controllers\model;

use \WP_REST_Request;
use \WP_REST_Response;
use \EEM_Base;
use \EE_Base_Class;
use \EE_Registry;
use \EE_Datetime_Field;
use \EEM_Soft_Delete_Base;
use EventEspresso\core\libraries\rest_api\Capabilities;
use EventEspresso\core\libraries\rest_api\Model_Data_Translator;
use EventEspresso\core\libraries\rest_api\Rest_Exception;

if (! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



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
    public static function handle_request_insert(WP_REST_Request $request, $version, $model_name)
    {
        $controller = new Write();
        try {
            $controller->set_requested_version($version);
            $model_name_singular = \EEH_Inflector::singularize_and_upper($model_name);
            if (! $controller->get_model_version_info()->is_model_name_in_this_version($model_name_singular)) {
                return $controller->send_response(
                    new \WP_Error(
                        'endpoint_parsing_error',
                        sprintf(
                            __('There is no model for endpoint %s. Please contact event espresso support',
                                'event_espresso'),
                            $model_name_singular
                        )
                    )
                );
            }
            return $controller->send_response(
                $controller->insert(
                    $controller->get_model_version_info()->load_model($model_name_singular),
                    $request
                )
            );
        } catch (\Exception $e) {
            return $controller->send_response($e);
        }
    }



    /**
     * Handles a request from \WP_REST_Server to update an EE model
     *
     * @param WP_Rest_Request $request
     * @param string          $version
     * @param string          $model_name
     * @return WP_REST_Response|\WP_Error
     */
    public static function handle_request_update(WP_Rest_Request $request, $version, $model_name)
    {
        $controller = new Write();
        try {
            $controller->set_requested_version($version);
            $model_name_singular = \EEH_Inflector::singularize_and_upper($model_name);
            if (! $controller->get_model_version_info()->is_model_name_in_this_version($model_name_singular)) {
                return $controller->send_response(
                    new \WP_Error(
                        'endpoint_parsing_error',
                        sprintf(
                            __('There is no model for endpoint %s. Please contact event espresso support',
                                'event_espresso'),
                            $model_name_singular
                        )
                    )
                );
            }
            return $controller->send_response(
                $controller->update(
                    $controller->get_model_version_info()->load_model($model_name_singular),
                    $request
                )
            );
        } catch (\Exception $e) {
            return $controller->send_response($e);
        }
    }



    /**
     * Deletes a single model object and returns it. Unless
     *
     * @param WP_Rest_Request $request
     * @param string          $version
     * @param string          $model_name
     * @return WP_REST_Response|\WP_Error
     */
    public static function handle_request_delete(WP_Rest_Request $request, $version, $model_name)
    {
        $controller = new Write();
        try {
            $controller->set_requested_version($version);
            $model_name_singular = \EEH_Inflector::singularize_and_upper($model_name);
            if (! $controller->get_model_version_info()->is_model_name_in_this_version($model_name_singular)) {
                return $controller->send_response(
                    new \WP_Error(
                        'endpoint_parsing_error',
                        sprintf(
                            __('There is no model for endpoint %s. Please contact event espresso support',
                                'event_espresso'),
                            $model_name_singular
                        )
                    )
                );
            }
            return $controller->send_response(
                $controller->delete(
                    $controller->get_model_version_info()->load_model($model_name_singular),
                    $request
                )
            );
        } catch (\Exception $e) {
            return $controller->send_response($e);
        }
    }



    /**
     * Inserts a new model object according to the $request
     *
     * @param EEM_Base        $model
     * @param WP_REST_Request $request
     * @return array
     * @throws \EE_Error
     */
    public function insert(EEM_Base $model, WP_REST_Request $request)
    {
        Capabilities::verify_at_least_partial_access_to($model, EEM_Base::caps_edit, 'create');
        $default_cap_to_check_for = \EE_Restriction_Generator_Base::get_default_restrictions_cap();
        if (! current_user_can($default_cap_to_check_for)) {
            throw new Rest_Exception(
                'rest_cannot_create_' . \EEH_Inflector::pluralize_and_lower(($model->get_this_model_name())),
                sprintf(
                    esc_html__('For now, only those with the admin capability to "%1$s" are allowed to use the REST API to insert data into Event Espresso.',
                        'event_espresso'),
                    $default_cap_to_check_for
                ),
                array('status' => 403)
            );
        }
        $submitted_json_data = array_merge((array)$request->get_body_params(), (array)$request->get_json_params());
        $model_data = Model_Data_Translator::prepare_conditions_query_params_for_models(
            $submitted_json_data,
            $model,
            $this->get_model_version_info()->requested_version()
        );
        $model_obj = EE_Registry::instance()
                                ->load_class($model->get_this_model_name(),
                                    array($model_data, $model->get_timezone()),
                                    false, false);
        $model_obj->save();
        $new_id = $model_obj->ID();
        if (! $new_id) {
            throw new Rest_Exception(
                'rest_insertion_failed',
                sprintf(__('Could not insert new %1$s', 'event_espresso'), $model->get_this_model_name())
            );
        }
        return $this->_return_model_obj_as_json_response($model_obj);
    }



    /**
     * Updates an existing model object according to the $request
     *
     * @param EEM_Base        $model
     * @param WP_REST_Request $request
     * @return array
     * @throws \EE_Error
     */
    public function update(EEM_Base $model, WP_REST_Request $request)
    {
        Capabilities::verify_at_least_partial_access_to($model, EEM_Base::caps_edit, 'edit');
        $default_cap_to_check_for = \EE_Restriction_Generator_Base::get_default_restrictions_cap();
        if (! current_user_can($default_cap_to_check_for)) {
            throw new Rest_Exception(
                'rest_cannot_edit_' . \EEH_Inflector::pluralize_and_lower(($model->get_this_model_name())),
                sprintf(
                    esc_html__('For now, only those with the admin capability to "%1$s" are allowed to use the REST API to update data into Event Espresso.',
                        'event_espresso'),
                    $default_cap_to_check_for
                ),
                array('status' => 403)
            );
        }
        $obj_id = $request->get_param('id');
        if (! $obj_id) {
            throw new Rest_Exception(
                'rest_edit_failed',
                sprintf(__('Could not edit %1$s', 'event_espresso'), $model->get_this_model_name())
            );
        }
        $model_data = Model_Data_Translator::prepare_conditions_query_params_for_models(
            $this->_get_body_params($request),
            $model,
            $this->get_model_version_info()->requested_version()
        );
        $model_obj = $model->get_one_by_ID($obj_id);
        $model_obj->save($model_data);
        return $this->_return_model_obj_as_json_response($model_obj);
    }



    /**
     * Updates an existing model object according to the $request
     *
     * @param EEM_Base        $model
     * @param WP_REST_Request $request
     * @return array of eithe2r the soft-deleted item, or
     * @throws \EE_Error
     */
    public function delete(EEM_Base $model, WP_REST_Request $request)
    {
        $obj_id = $request->get_param('id');
        $requested_permanent_delete = (bool)$request->get_param('permanent');
        $requested_allow_blocking = (bool)$request->get_param('allow_blocking');
        if ($requested_permanent_delete || ! $model instanceof EEM_Soft_Delete_Base) {
            $read_controller = new Read();
            $read_controller->set_requested_version($this->get_requested_version());
            $original_entity = $read_controller->get_one_or_report_permission_error($model, $request,
                EEM_Base::caps_delete);
            $deleted = (bool)$model->delete_permanently_by_ID($obj_id, $requested_allow_blocking);
            return array(
                'deleted'  => $deleted,
                'previous' => $original_entity,
            );
        } else {
            $model->delete_by_ID($obj_id, $requested_allow_blocking);
            return $this->_get_one_based_on_request($model, $request, $obj_id);
        }
    }



    /**
     * Returns an array ready to be converted into a JSON response, based solely on the model object
     *
     * @param \EE_Base_Class $model_obj
     * @return array ready for a response
     */
    protected function _return_model_obj_as_json_response(EE_Base_Class $model_obj)
    {
        $model = $model_obj->get_model();
        //create an array exactly like the wpdb results row, so we can pass it to controllers/model/Read::create_entity_from_wpdb_result()
        $simulated_db_row = array();
        foreach ($model->field_settings() as $field_name => $field_obj) {
            if ($field_obj instanceof EE_Datetime_Field) {
                $raw_value = $model_obj->get_DateTime_object($field_name);
            } else {
                $raw_value = $model_obj->get_raw($field_name);
            }
            $simulated_db_row[$field_obj->get_qualified_column()] = $field_obj->prepare_for_use_in_db($raw_value);
        }
        $read_controller = new Read();
        $read_controller->set_requested_version($this->get_requested_version());
        //the simulates request really doesn't need any info downstream
        $simulated_request = new WP_REST_Request('GET');
        return $read_controller->create_entity_from_wpdb_result($model_obj->get_model(), $simulated_db_row,
            $simulated_request);
    }



    /**
     * Gets the item affected by this request
     *
     * @param EEM_Base        $model
     * @param WP_REST_Request $request
     * @param  int|string     $obj_id
     * @return \WP_Error|array
     */
    protected function _get_one_based_on_request(EEM_Base $model, WP_REST_Request $request, $obj_id)
    {
        $requested_version = $this->get_requested_version($request->get_route());
        $get_request = new WP_REST_Request(
            'GET',
            \EED_Core_Rest_Api::ee_api_namespace
            . $requested_version
            . '/'
            . \EEH_Inflector::pluralize_and_lower($model->get_this_model_name())
            . '/'
            . $obj_id
        );
        $get_request->set_url_params(
            array(
                'id' => $obj_id,
            )
        );
        $read_controller = new Read();
        $read_controller->set_requested_version($this->get_requested_version());
        return $read_controller->get_entity_from_model($model, $get_request);
    }

}


// End of file Read.php