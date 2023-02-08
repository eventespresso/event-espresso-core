<?php

namespace EventEspresso\core\services\converters\json;

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
    public function convertAndEncodeArrayOf($entities);


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
    public function convertArrayOf($entities);


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
    public function encodeArrayOf($entities);


    /**
     * @param array $entity_array
     * @return false|string
     * @since $VID:$
     */
    public function encode($entity_array);
}
