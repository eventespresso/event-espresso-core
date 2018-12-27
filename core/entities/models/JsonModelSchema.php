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
use EventEspresso\core\libraries\rest_api\CalculatedModelFields;

/**
 * This is used to generate an array that can be used to generate a schema for a given model.
 * The format for the generated array follows the structure given in the json-schema standard
 *
 * @see        http://json-schema.org
 * @package    EventEspresso
 * @subpackage core\db_models\helpers
 * @author     Darren Ethier
 * @since      4.9.24.rc.018
 */
class JsonModelSchema
{

    /**
     * @var EEM_Base
     */
    protected $model;

    /**
     * @var CalculatedModelFields
     */
    protected $fields_calculator;


    /**
     * JsonModelSchema constructor.
     *
     * @param EEM_Base              $model
     * @param CalculatedModelFields $fields_calculator
     */
    public function __construct(EEM_Base $model, CalculatedModelFields $fields_calculator)
    {
        $this->model = $model;
        $this->fields_calculator = $fields_calculator;
    }


    /**
     * Return the schema for a given model from a given model.
     *
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
     *
     * @param EE_Model_Field_Base[] $model_fields
     * @param array                  $schema
     * @return array
     */
    public function getModelSchemaForFields(array $model_fields, array $schema)
    {
        foreach ($model_fields as $field => $model_field) {
            if (! $model_field instanceof EE_Model_Field_Base) {
                continue;
            }
            $schema['properties'][ $field ] = $model_field->getSchema();

            // if this is a primary key field add the primary key item
            if ($model_field instanceof EE_Primary_Key_Field_Base) {
                $schema['properties'][ $field ]['primary_key'] = true;
                if ($model_field instanceof EE_Primary_Key_Int_Field) {
                    $schema['properties'][ $field ]['readonly'] = true;
                }
            }

            // if this is a foreign key field add the foreign key item
            if ($model_field instanceof EE_Foreign_Key_Field_Base) {
                $schema['properties'][ $field ]['foreign_key'] = array(
                    'description' => esc_html__(
                        'This is a foreign key the points to the given models.',
                        'event_espresso'
                    ),
                    'type'        => 'array',
                    'enum'        => $model_field->get_model_class_names_pointed_to(),
                );
            }
        }
        return $schema;
    }


    /**
     * Get the schema for a given set of model relations
     *
     * @param EE_Model_Relation_Base[] $relations_on_model
     * @param array                    $schema
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
            $schema['properties'][ $model_name_for_schema ] = $relation->getSchema();
            $schema['properties'][ $model_name_for_schema ]['relation_model'] = $model_name;

            // links schema
            $links_key = 'https://api.eventespresso.com/' . strtolower($model_name);
            $schema['properties']['_links']['properties'][ $links_key ] = array(
                'description' => esc_html__(
                    'Array of objects describing the link(s) for this relation resource.',
                    'event_espresso'
                ),
                'type' => 'array',
                'readonly' => true,
                'items' => array(
                    'type' => 'object',
                    'properties' => array(
                        'href' => array(
                            'type' => 'string',
                            'description' => sprintf(
                                // translators: placeholder is the model name for the relation.
                                esc_html__(
                                    'The link to the resource for the %s relation(s) to this entity',
                                    'event_espresso'
                                ),
                                $model_name
                            ),
                        ),
                        'single' => array(
                            'type' => 'boolean',
                            'description' => sprintf(
                                // translators: placeholder is the model name for the relation.
                                esc_html__(
                                    'Whether or not there is only a single %s relation to this entity',
                                    'event_espresso'
                                ),
                                $model_name
                            ),
                        ),
                    ),
                    'additionalProperties' => false
                ),
            );
        }
        return $schema;
    }


    /**
     * Outputs the schema header for a model.
     *
     * @return array
     */
    public function getInitialSchemaStructure()
    {
        return array(
            '$schema'    => 'http://json-schema.org/draft-04/schema#',
            'title'      => $this->model->get_this_model_name(),
            'type'       => 'object',
            'properties' => array(
                'link' => array(
                    'description' => esc_html__(
                        'Link to event on WordPress site hosting events.',
                        'event_espresso'
                    ),
                    'type' => 'string',
                    'readonly' => true,
                ),
                '_links' => array(
                    'description' => esc_html__(
                        'Various links for resources related to the entity.',
                        'event_espresso'
                    ),
                    'type' => 'object',
                    'readonly' => true,
                    'properties' => array(
                        'self' => array(
                            'description' => esc_html__(
                                'Link to this entities resource.',
                                'event_espresso'
                            ),
                            'type' => 'array',
                            'items' => array(
                                'type' => 'object',
                                'properties' => array(
                                    'href' => array(
                                        'type' => 'string',
                                    ),
                                ),
                                'additionalProperties' => false
                            ),
                            'readonly' => true
                        ),
                        'collection' => array(
                            'description' => esc_html__(
                                'Link to this entities collection resource.',
                                'event_espresso'
                            ),
                            'type' => 'array',
                            'items' => array(
                                'type' => 'object',
                                'properties' => array(
                                    'href' => array(
                                        'type' => 'string'
                                    ),
                                ),
                                'additionalProperties' => false
                            ),
                            'readonly' => true
                        ),
                    ),
                    'additionalProperties' => false,
                ),
                '_calculated_fields' => array_merge(
                    $this->fields_calculator->getJsonSchemaForModel($this->model),
                    array(
                        '_protected' => $this->getProtectedFieldsSchema()
                    )
                ),
                '_protected' => $this->getProtectedFieldsSchema()
            ),
            'additionalProperties' => false,
        );
    }

    /**
     * Returns an array of JSON schema to describe the _protected property on responses
     * @since 4.9.74.p
     * @return array
     */
    protected function getProtectedFieldsSchema()
    {
        return array(
            'description' => esc_html__('Array of property names whose values were replaced with their default (because they are related to a password-protected entity.)', 'event_espresso'),
            'type' => 'array',
            'items' => array(
                'description' => esc_html__('Each name corresponds to a property that is protected by password for this entity and has its default value returned in the response.', 'event_espresso'),
                'type' => 'string',
                'readonly' => true,
            ),
            'readonly' => true
        );
    }


    /**
     * Allows one to just use the object as a string to get the json.
     * eg.
     * $json_schema = new JsonModelSchema(EEM_Event::instance(), new CalculatedModelFields);
     * echo $json_schema; //outputs the schema as a json formatted string.
     *
     * @return bool|false|mixed|string
     */
    public function __toString()
    {
        return wp_json_encode($this->getModelSchema());
    }
}
