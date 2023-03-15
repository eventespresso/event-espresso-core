<?php

namespace EventEspresso\core\services\graphql\enums;

/**
 * Class EnumBase
 * Description
 *
 * @package EventEspresso\core\services\graphql
 * @author  Manzoor Wani
 * @since   5.0.0.p
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
     * @since 5.0.0.p
     */
    public function values();
}
