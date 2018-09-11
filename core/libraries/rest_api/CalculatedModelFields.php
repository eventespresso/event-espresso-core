<?php

namespace EventEspresso\core\libraries\rest_api;

use EEM_Base;
use EventEspresso\core\exceptions\UnexpectedEntityException;
use EventEspresso\core\libraries\rest_api\calculations\CalculatedModelFieldsFactory;
use EventEspresso\core\libraries\rest_api\controllers\Base;
use EEH_Inflector;
use EventEspresso\core\libraries\rest_api\controllers\Base as BaseController;

/**
 * Class CalculatedModelFields
 * Class for defining which model fields can be calculated, and performing those calculations
 * as requested
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 * @since                 4.8.35.rc.001
 */
class CalculatedModelFields
{

    /**
     * @var array
     */
    protected $mapping;

    /**
     * @var array
     */
    protected $mapping_schema;

    /**
     * @var CalculatedModelFieldsFactory
     */
    private $factory;

    /**
     * CalculatedModelFields constructor.
     * @param CalculatedModelFieldsFactory $factory
     */
    public function __construct(CalculatedModelFieldsFactory $factory)
    {
        $this->factory = $factory;
    }
    /**
     * @param bool $refresh
     * @return array top-level-keys are model names (eg "Event")
     * next-level are the calculated field names AND method names on classes
     * which perform calculations, values are the fully qualified classnames which do the calculations
     * These callbacks should accept as arguments:
     * the wpdb row results,
     * the WP_Request object,
     * the controller object
     */
    public function mapping($refresh = false)
    {
        if (! $this->mapping || $refresh) {
            $this->mapping = $this->generateNewMapping();
        }
        return $this->mapping;
    }


    /**
     * Generates a new mapping between model calculated fields and their callbacks
     *
     * @return array
     */
    protected function generateNewMapping()
    {
        $mapping = array();
        $models_with_calculated_fields = array(
            'Attendee',
            'Datetime',
            'Event',
            'Registration'
        );
        foreach ($models_with_calculated_fields as $model_name) {
            $calculator = $this->factory->createFromModel($model_name);
            foreach (array_keys(call_user_func(array($calculator, 'schemaForCalculations'))) as $field_name) {
                $mapping[ $model_name ][ $field_name ] = get_class($calculator);
            }
        }
        return apply_filters(
            'FHEE__EventEspresso\core\libraries\rest_api\Calculated_Model_Fields__mapping',
            $mapping
        );
    }


    /**
     * Generates the schema for each calculation index in the calculation map.
     *
     * @return array
     * @throws UnexpectedEntityException
     */
    protected function generateNewMappingSchema()
    {
        $schema_map = array();
        foreach ($this->mapping() as $map_model => $map_for_model) {
            /**
             * @var string $calculation_index
             * @var string $calculations_class
             */
            foreach ($map_for_model as $calculation_index => $calculations_class) {
                $calculator = $this->factory->createFromClassname($calculations_class);
                $schema = call_user_func(array($calculator, 'schemaForCalculation'), $calculation_index);
                if (! empty($schema)) {
                    $schema_map[ $map_model ][ $calculation_index ] = $schema;
                }
            }
        }
        return $schema_map;
    }


    /**
     * Gets the known calculated fields for model
     *
     * @param EEM_Base $model
     * @return array allowable values for this field
     */
    public function retrieveCalculatedFieldsForModel(EEM_Base $model)
    {
        $mapping = $this->mapping();
        if (isset($mapping[ $model->get_this_model_name() ])) {
            return array_keys($mapping[ $model->get_this_model_name() ]);
        }
        return array();
    }


    /**
     * Returns the JsonSchema for the calculated fields on the given model.
     * @param EEM_Base $model
     * @return array
     */
    public function getJsonSchemaForModel(EEM_Base $model)
    {
        if (! $this->mapping_schema) {
            $this->mapping_schema = $this->generateNewMappingSchema();
        }
        return array(
            'description' => esc_html__(
                'Available calculated fields for this model.  Fields are only present in the response if explicitly requested',
                'event_espresso'
            ),
            'type' => 'object',
            'properties' => isset($this->mapping_schema[ $model->get_this_model_name() ])
                ? $this->mapping_schema[ $model->get_this_model_name() ]
                : array(),
            'additionalProperties' => false,
            'readonly' => true,
        );
    }


    /**
     * Retrieves the value for this calculation
     *
     * @param EEM_Base $model
     * @param string $field_name
     * @param array $wpdb_row
     * @param $rest_request
     * @param BaseController $controller
     * @return mixed|null
     * @throws RestException
     * @throws UnexpectedEntityException
     */
    public function retrieveCalculatedFieldValue(
        EEM_Base $model,
        $field_name,
        $wpdb_row,
        $rest_request,
        Base $controller
    ) {
        $mapping = $this->mapping();
        if (isset($mapping[ $model->get_this_model_name() ])
            && isset($mapping[ $model->get_this_model_name() ][ $field_name ])
        ) {
            $classname = $mapping[ $model->get_this_model_name() ][ $field_name ];
            $calculator = $this->factory->createFromClassname($classname);
            $class_method_name = EEH_Inflector::camelize_all_but_first($field_name);
            return call_user_func(array($calculator, $class_method_name), $wpdb_row, $rest_request, $controller);
        }
        throw new RestException(
            'calculated_field_does_not_exist',
            sprintf(
                __('There is no calculated field %1$s on resource %2$s', 'event_espresso'),
                $field_name,
                $model->get_this_model_name()
            )
        );
    }
}
