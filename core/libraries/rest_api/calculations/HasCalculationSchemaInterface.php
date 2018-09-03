<?php
namespace EventEspresso\core\libraries\rest_api\calculations;

/**
 * Interface HasCalculationSchemaInterface
 * This should be implemented by any calculation classes that expose a json schema.
 *
 * @author Darren Ethier
 * @since  $VID:$
 */
interface HasCalculationSchemaInterface
{
    /**
     * Provides an array for all the calculations possible that outlines a json schema for those calculations.
     * Array is indexed by calculation (snake case) and value is the schema for that calculation.
     * @return array
     */
    public static function schemaForCalculations();


    /**
     * Returns the json schema for the given calculation index.
     * @param $calculation_index
     * @return array
     */
    public static function schemaForCalculation($calculation_index);
}
