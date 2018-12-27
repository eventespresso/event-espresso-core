<?php

namespace EventEspresso\core\services\blocks;

/**
 * Interface BlockRendererInterface
 *
 *
 * @package EventEspresso\core\services\blocks
 * @subpackage
 * @author  Darren Ethier
 * @since   4.9.71.p
 */
interface BlockRendererInterface
{

    /**
     * This receives an array of attributes and returns rendered content for the block using those attributes.
     *
     * @param array $attributes
     * @return string Rendered Content
     */
    public function render(array $attributes);
}
