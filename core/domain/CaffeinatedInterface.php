<?php
namespace EventEspresso\core\domain;

/**
 * Interface CaffeinatedInterface
 * Interface is used for classes indicating caffeinated (premium) functionality.
 *
 * @package EventEspresso\core\domain
 * @subpackage
 * @author  Darren Ethier
 * @since   1.0.0
 */
interface CaffeinatedInterface
{
    /**
     * Used to indicate when functionality is caffeinated or not.
     * @return bool
     */
    public function isCaffeinated();
}
