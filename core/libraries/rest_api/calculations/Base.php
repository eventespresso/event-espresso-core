<?php

namespace EventEspresso\core\libraries\rest_api\calculations;

use EventEspresso\core\libraries\rest_api\RestException;
use EEH_Inflector;

/**
 * Class Base
 * Description here
 *
 * @package               Event Espresso
 * @subpackage
 * @author                Mike Nelson
 */
class Base
{

    /**
     * @param $required_permission
     * @param $attempted_calculation
     * @throws RestException
     */
    protected function verifyCurrentUserCan($required_permission, $attempted_calculation)
    {
        if (! current_user_can($required_permission)) {
            throw new RestException(
                'permission_denied',
                sprintf(
                    __(
                    // @codingStandardsIgnoreStart
                        'Permission denied, you cannot calculate %1$s on %2$s because you do not have the capability "%3$s"',
                        // @codingStandardsIgnoreEnd
                        'event_espresso'
                    ),
                    $attempted_calculation,
                    EEH_Inflector::pluralize_and_lower($this->getResourceName()),
                    $required_permission
                )
            );
        }
    }


    /**
     * Gets the name of the resource of the called class
     *
     * @return string
     */
    public function getResourceName()
    {
        return substr(__CLASS__, strrpos(__CLASS__, '\\') + 1);
    }

    /**
     * Returns an array to be used for the schema for the calculated fields.
     * @since 4.9.68.p
     * @return array keys are calculated field names (eg "optimum_sales_at_start") values are arrays {
     * @type string $description
     * @type string $type, eg "string", "int", "boolean", "object", "array", etc
     * }
     */
    public function schemaForCalculations()
    {
        return array();
    }

    /**
     * Returns the json schema for the given calculation index.
     *
     * @since 4.9.68.p
     * @param $calculation_index
     * @return array
     */
    public function schemaForCalculation($calculation_index)
    {
        $schema_map = $this->schemaForCalculations();
        return isset($schema_map[ $calculation_index ]) ? $schema_map[ $calculation_index ] : array();
    }
}
