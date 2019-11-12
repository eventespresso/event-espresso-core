<?php

namespace EventEspresso\core\services\converters\json;

use EE_Base_Class;

/**
 * Interface ModelObjectToJsonConverterInterface
 * Description
 *
 * @package EventEspresso\core\services\converters\json
 * @author  Brent Christensen
 * @since   $VID:$
 */
interface ModelObjectToJsonConverterInterface
{

    /**
     * @param array $entities
     * @return array
     * @since $VID:$
     */
    public function convertAndEncodeArrayOf(array $entities);


    /**
     * @param $entity
     * @return false|string
     * @since $VID:$
     */
    public function convertAndEncode($entity);


    /**
     * @param array $entities
     * @return array
     * @since $VID:$
     */
    public function convertArrayOf(array $entities);


    /**
     * @param $entity
     * @return array
     * @since $VID:$
     */
    public function convert($entity);


    /**
     * @param array $entities
     * @return array
     * @since $VID:$
     */
    public function encodeArrayOf(array $entities);


    /**
     * @param array $entity_array
     * @return false|string
     * @since $VID:$
     */
    public function encode(array $entity_array);
}