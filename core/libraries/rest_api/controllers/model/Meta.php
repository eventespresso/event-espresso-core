<?php
namespace EventEspresso\core\libraries\rest_api\controllers\model;

use EventEspresso\core\libraries\rest_api\Model_Data_Translator;

if (! defined('EVENT_ESPRESSO_VERSION')) {
    exit('No direct script access allowed');
}



/**
 * Controller for handling requests regarding meta info about the models
 * Handles requests relating to meta info
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 */
class Meta extends Base
{


    /**
     * @param \WP_REST_Request $request
     * @return array|\WP_REST_Response
     */
    public static function handle_request_models_meta(\WP_REST_Request $request)
    {
        $controller = new Meta();
        try {
            $matches = $controller->parse_route(
                $request->get_route(),
                '~' . \EED_Core_Rest_Api::ee_api_namespace_for_regex . 'resources~',
                array('version'));
            if ($matches instanceof \WP_REST_Response) {
                return $matches;
            }
            $controller->set_requested_version($matches['version']);
            return $controller->send_response($controller->_get_models_metadata_entity());
        } catch (\Exception $e) {
            return $controller->send_response($e);
        }
    }



    /*
     * Gets the model metadata resource entity
     * @return array for JSON response, describing all the models available in teh requested version
     */
    protected function _get_models_metadata_entity()
    {
        $response = array();
        foreach ($this->get_model_version_info()->models_for_requested_version() as $model_name => $model_classname) {
            $model = $this->get_model_version_info()->load_model($model_name);
            $fields_json = array();
            foreach (
                $this->get_model_version_info()->fields_on_model_in_this_version($model) as $field_name =>
                $field_obj
            ) {
                if ($this->get_model_version_info()->field_is_ignored($field_obj)) {
                    continue;
                }
                if ($field_obj instanceof \EE_Boolean_Field) {
                    $datatype = 'Boolean';
                } elseif ($field_obj->get_wpdb_data_type() == '%d') {
                    $datatype = 'Number';
                } elseif ($field_name instanceof \EE_Serialized_Text_Field) {
                    $datatype = 'Object';
                } else {
                    $datatype = 'String';
                }
                $default_value = Model_Data_Translator::prepare_field_value_for_json(
                    $field_obj,
                    $field_obj->get_default_value(),
                    $this->get_model_version_info()->requested_version()
                );
                $field_json = array(
                    'name'                => $field_name,
                    'nicename'            => $field_obj->get_nicename(),
                    'has_rendered_format' => $this->get_model_version_info()->field_has_rendered_format($field_obj),
                    'has_pretty_format'   => $this->get_model_version_info()->field_has_pretty_format($field_obj),
                    'type'                => str_replace('EE_', '', get_class($field_obj)),
                    'datatype'            => $datatype,
                    'nullable'            => $field_obj->is_nullable(),
                    'default'             => $default_value,
                    'table_alias'         => $field_obj->get_table_alias(),
                    'table_column'        => $field_obj->get_table_column(),
                );
                $fields_json[$field_json['name']] = $field_json;
            }
            $fields_json = array_merge($fields_json,
                $this->get_model_version_info()->extra_resource_properties_for_model($model));
            $response[$model_name]['fields'] = apply_filters('FHEE__Meta__handle_request_models_meta__fields',
                $fields_json, $model);
            $relations_json = array();
            foreach ($model->relation_settings() as $relation_name => $relation_obj) {
                $relation_json = array(
                    'name'   => $relation_name,
                    'type'   => str_replace('EE_', '', get_class($relation_obj)),
                    'single' => $relation_obj instanceof \EE_Belongs_To_Relation ? true : false,
                );
                $relations_json[$relation_name] = $relation_json;
            }
            $response[$model_name]['relations'] = apply_filters('FHEE__Meta__handle_request_models_meta__relations',
                $relations_json, $model);
        }
        return $response;
    }



    /**
     * Adds EE metadata to the index
     *
     * @param \WP_REST_Response $rest_response_obj
     * @return \WP_REST_Response
     */
    public static function filter_ee_metadata_into_index(\WP_REST_Response $rest_response_obj)
    {
        $response_data = $rest_response_obj->get_data();
        $addons = array();
        foreach (\EE_Registry::instance()->addons as $addon) {
            $addon_json = array(
                'name'    => $addon->name(),
                'version' => $addon->version(),
            );
            $addons[$addon_json['name']] = $addon_json;
        }
        $response_data['ee'] = array(
            'version'              => \EEM_System_Status::instance()->get_ee_version(),
            'documentation_url'    => 'https://github.com/eventespresso/event-espresso-core/tree/master/docs/C--REST-API',
            'addons'               => $addons,
            'maintenance_mode'     => \EE_Maintenance_Mode::instance()->real_level(),
            'served_core_versions' => array_keys(\EED_Core_Rest_Api::versions_served()),
        );
        $rest_response_obj->set_data($response_data);
        return $rest_response_obj;
    }
}


// End of file Read.class.php