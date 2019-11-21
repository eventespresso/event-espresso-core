<?php

namespace EventEspresso\core\services\graphql\enums;

/**
 * Class EnumBase
 * Description
 *
 * @package EventEspresso\core\services\graphql
 * @author  Manzoor Wani
 * @since   $VID:$
 */
interface EnumInterface
{

    /**
     * @return string
     */
    public function name();


    /**
     * @return string
     */
    public function description();


    /**
     * @return array
     * @since $VID:$
     */
    public function values();
}
