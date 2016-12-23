<?php
namespace EventEspresso\core\db_models\helpers;

use EEM_Base;
use EE_Model_Field_Base;

defined('EVENT_ESPRESSO_VERSION') || exit;

/**
 * This is used to generate an array that can be used to generate a schema for a given model.
 * The format for the generated array follows the structure given in the json-schema standard
 * @see http://json-schema.org
 *
 * @package    EventEspresso
 * @subpackage core\db_models\helpers
 * @author     Darren Ethier
 * @since      4.9.24.rc.018
 */
class ModelSchema
{
    /**
     * Return the schema for a given model from a given model.
     * @param \EEM_Base $model
     * @return array
     */
    public function getModelSchema(EEM_Base $model)
    {
        $fields_on_model = $model->field_settings();
        return $this->getModelSchemaForFields($fields_on_model, $model);
    }


    /**
     * Get the json schema for a given set of model fields.
     * @param \EE_Model_Field_Base[]     $model_fields
     * @param \EEM_Base $model
     * @return array
     */
    public function getModelSchemaForFields(array $model_fields, EEM_Base $model)
    {
        $schema = $this->getInitialSchemaStructure($model);
        foreach ($model_fields as $field => $model_field) {
            if (! $model_field instanceof EE_Model_Field_Base) {
                continue;
            }
            $schema['properties'][$field] = $model_field->get_schema();
        }
        return $schema;
    }


    /**
     * Outputs the schema header for a model.
     * @param \EEM_Base $model
     * @return array
     */
    protected function getInitialSchemaStructure(EEM_Base $model)
    {
        return array(
            '$schema' => 'http://json-schema.org/draft-04/schema#',
            'title' => $model->get_this_model_name(),
            'type' => 'object',
            'properties' => array()
        );
    }


    /**
     * Helper function that simply allows one to get whatever has been generated in an actual json object as opposed to
     * an array.
     * @param array $array_to_convert
     * @return bool|false|mixed|string
     */
    public function toJson($array_to_convert)
    {
        return wp_json_encode($array_to_convert);
    }
}
