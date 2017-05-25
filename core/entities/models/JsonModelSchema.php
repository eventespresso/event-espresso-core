<?php
namespace EventEspresso\core\entities\models;

use EEM_Base;
use EE_Model_Field_Base;
use EE_Primary_Key_Field_Base;
use EE_Primary_Key_Int_Field;
use EE_Foreign_Key_Field_Base;
use EE_Model_Relation_Base;
use EEH_Inflector;
use EE_Belongs_To_Relation;

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
class JsonModelSchema
{

    /**
     * @var \EEM_Base
     */
    protected $model;

    /**
     * JsonModelSchema constructor.
     *
     * @param \EEM_Base $model
     */
    public function __construct(EEM_Base $model)
    {
        $this->model = $model;
    }

    /**
     * Return the schema for a given model from a given model.
     * @param \EEM_Base $model
     * @return array
     */
    public function getModelSchema()
    {
        return $this->getModelSchemaForRelations(
            $this->model->relation_settings(),
            $this->getModelSchemaForFields(
                $this->model->field_settings(),
                $this->getInitialSchemaStructure()
            )
        );
    }


    /**
     * Get the schema for a given set of model fields.
     * @param \EE_Model_Field_Base[]     $model_fields
     * @return array
     */
    public function getModelSchemaForFields(array $model_fields, array $schema)
    {
        foreach ($model_fields as $field => $model_field) {
            if (! $model_field instanceof EE_Model_Field_Base) {
                continue;
            }
            $schema['properties'][$field] = $model_field->getSchema();

            //if this is a primary key field add the primary key item
            if ($model_field instanceof EE_Primary_Key_Field_Base) {
                $schema['properties'][$field]['primary_key'] = true;
                if ($model_field instanceof EE_Primary_Key_Int_Field) {
                    $schema['properties'][$field]['readonly'] = true;
                }
            }

            //if this is a foreign key field add the foreign key item
            if ($model_field instanceof EE_Foreign_Key_Field_Base) {
                $schema['properties'][$field]['foreign_key'] = array(
                    'description' => esc_html__('This is a foreign key the points to the given models.', 'event_espresso'),
                    'type' => 'array',
                    'enum' => $model_field->get_model_class_names_pointed_to()
                );
            }
        }
        return $schema;
    }


    /**
     * Get the schema for a given set of model relations
     * @param EE_Model_Relation_Base[] $relations_on_model
     * @return array
     */
    public function getModelSchemaForRelations(array $relations_on_model, array $schema)
    {
        foreach ($relations_on_model as $model_name => $relation) {
            if (! $relation instanceof EE_Model_Relation_Base) {
                continue;
            }
            $model_name_for_schema = $relation instanceof EE_Belongs_To_Relation
                ? strtolower($model_name)
                : EEH_Inflector::pluralize_and_lower($model_name);
            $schema['properties'][$model_name_for_schema] = $relation->getSchema();
            $schema['properties'][$model_name_for_schema]['relation_model'] = $model_name;
        }
        return $schema;
    }


    /**
     * Outputs the schema header for a model.
     * @param \EEM_Base $model
     * @return array
     */
    public function getInitialSchemaStructure()
    {
        return array(
            '$schema' => 'http://json-schema.org/draft-04/schema#',
            'title' => $this->model->get_this_model_name(),
            'type' => 'object',
            'properties' => array()
        );
    }


    /**
     * Allows one to just use the object as a string to get the json.
     * eg.
     *
     * $json_schema = new JsonModelSchema(EEM_Event::instance());
     * echo $json_schema; //outputs the schema as a json formatted string.
     *
     * @return bool|false|mixed|string
     */
    public function __toString()
    {
        return wp_json_encode($this->getModelSchema());
    }
}
