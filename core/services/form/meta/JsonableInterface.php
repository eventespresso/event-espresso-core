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
     * @return mixed
     */
    public static function fromJson(string $json);


    /**
     * @return string
     */
    public function toJson(): string;
}
