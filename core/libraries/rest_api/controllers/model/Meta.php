<?php
namespace EventEspresso\core\libraries\rest_api\controllers\model;

use Exception;
use EE_Boolean_Field;
use EE_Maintenance_Mode;
use EE_Registry;
use EE_Serialized_Text_Field;
use EED_Core_Rest_Api;
use EEM_System_Status;
use EventEspresso\core\libraries\rest_api\ModelDataTranslator;

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
     * @param string           $version
     * @return array|\WP_REST_Response
     */
    public static function handleRequestModelsMeta(\WP_REST_Request $request, $version)
    {
        $controller = new Meta();
        try {
            $controller->setRequestedVersion($version);
            return $controller->sendResponse($controller->getModelsMetadataEntity());
        } catch (Exception $e) {
            return $controller->sendResponse($e);
        }
    }



    /*
     * Gets the model metadata resource entity
     * @return array for JSON response, describing all the models available in teh requested version
     */
    protected function getModelsMetadataEntity()
    {
        $response = array();
        foreach ($this->getModelVersionInfo()->modelsForRequestedVersion() as $model_name => $model_classname) {
            $model = $this->getModelVersionInfo()->loadModel($model_name);
            $fields_json = array();
            foreach ($this->getModelVersionInfo()->fieldsOnModelInThisVersion($model) as $field_name => $field_obj) {
                if ($this->getModelVersionInfo()->fieldIsIgnored($field_obj)) {
                    continue;
                }
                if ($field_obj instanceof EE_Boolean_Field) {
                    $datatype = 'Boolean';
                } elseif ($field_obj->get_wpdb_data_type() == '%d') {
                    $datatype = 'Number';
                } elseif ($field_name instanceof EE_Serialized_Text_Field) {
                    $datatype = 'Object';
                } else {
                    $datatype = 'String';
                }
                $default_value = ModelDataTranslator::prepareFieldValueForJson(
                    $field_obj,
                    $field_obj->get_default_value(),
                    $this->getModelVersionInfo()->requestedVersion()
                );
                $field_json = array(
                    'name'                => $field_name,
                    'nicename'            => wp_specialchars_decode($field_obj->get_nicename(), ENT_QUOTES),
                    'has_rendered_format' => $this->getModelVersionInfo()->fieldHasRenderedFormat($field_obj),
                    'has_pretty_format'   => $this->getModelVersionInfo()->fieldHasPrettyFormat($field_obj),
                    'type'                => str_replace('EE_', '', get_class($field_obj)),
                    'datatype'            => $datatype,
                    'nullable'            => $field_obj->is_nullable(),
                    'default'             => $default_value,
                    'table_alias'         => $field_obj->get_table_alias(),
                    'table_column'        => $field_obj->get_table_column(),
                );
                $fields_json[$field_json['name']] = $field_json;
            }
            $fields_json = array_merge(
                $fields_json,
                $this->getModelVersionInfo()->extraResourcePropertiesForModel($model)
            );
            $response[$model_name]['fields'] = apply_filters(
                'FHEE__Meta__handle_request_models_meta__fields',
                $fields_json,
                $model
            );
            $relations_json = array();
            foreach ($model->relation_settings() as $relation_name => $relation_obj) {
                $relation_json = array(
                    'name'   => $relation_name,
                    'type'   => str_replace('EE_', '', get_class($relation_obj)),
                    'single' => $relation_obj instanceof \EE_Belongs_To_Relation ? true : false,
                );
                $relations_json[$relation_name] = $relation_json;
            }
            $response[$model_name]['relations'] = apply_filters(
                'FHEE__Meta__handle_request_models_meta__relations',
                $relations_json,
                $model
            );
        }
        return $response;
    }



    /**
     * Adds EE metadata to the index
     *
     * @param \WP_REST_Response $rest_response_obj
     * @return \WP_REST_Response
     */
    public static function filterEeMetadataIntoIndex(\WP_REST_Response $rest_response_obj)
    {
        $response_data = $rest_response_obj->get_data();
        $addons = array();
        foreach (EE_Registry::instance()->addons as $addon) {
            $addon_json = array(
                'name'    => $addon->name(),
                'version' => $addon->version(),
            );
            $addons[$addon_json['name']] = $addon_json;
        }
        $response_data['ee'] = array(
            'version'              => EEM_System_Status::instance()->get_ee_version(),
            // @codingStandardsIgnoreStart
            'documentation_url'    => 'https://github.com/eventespresso/event-espresso-core/tree/master/docs/C--REST-API',
            // @codingStandardsIgnoreEnd
            'addons'               => $addons,
            'maintenance_mode'     => EE_Maintenance_Mode::instance()->real_level(),
            'served_core_versions' => array_keys(EED_Core_Rest_Api::versions_served()),
        );
        $rest_response_obj->set_data($response_data);
        return $rest_response_obj;
    }
}


// End of file Read.class.php
