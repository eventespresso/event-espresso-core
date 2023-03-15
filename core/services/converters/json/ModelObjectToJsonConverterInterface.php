<?php

namespace EventEspresso\core\services\converters\json;

/**
 * Interface ModelObjectToJsonConverterInterface
 * Description
 *
 * @package EventEspresso\core\services\converters\json
 * @author  Brent Christensen
 * @since   5.0.0.p
 */
interface ModelObjectToJsonConverterInterface
{
    /**
     * @param array $entities
     * @return array
     * @since 5.0.0.p
     */
    public function convertAndEncodeArrayOf(array $entities);


    /**
     * @param $entity
     * @return false|string
     * @since 5.0.0.p
     */
    public function convertAndEncode($entity);


    /**
     * @param array $entities
     * @return array
     * @since 5.0.0.p
     */
    public function convertArrayOf(array $entities);


    /**
     * @param $entity
     * @return array
     * @since 5.0.0.p
     */
    public function convert($entity);


    /**
     * @param array $entities
     * @return array
     * @since 5.0.0.p
     */
    public function encodeArrayOf(array $entities);


    /**
     * @param array $entity_array
     * @return false|string
     * @since 5.0.0.p
     */
    public function encode(array $entity_array);
}
