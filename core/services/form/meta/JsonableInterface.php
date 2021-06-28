<?php

namespace EventEspresso\core\services\form\meta;

/**
 * Class JsonableInterface
 *
 * @package EventEspresso\core\services\form\meta
 * @author  Manzoor Wani
 * @since   $VID:$
 */
interface JsonableInterface
{
    /**
     * @param string $json
     * @return JsonableInterface
     */
    public static function fromJson(string $json): JsonableInterface;


    /**
     * @return string
     */
    public function toJson(): string;
}
