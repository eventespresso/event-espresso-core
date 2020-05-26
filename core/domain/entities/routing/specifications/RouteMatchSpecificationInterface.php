<?php

namespace EventEspresso\core\domain\entities\routing\specifications;

/**
 * Class RouteMatchSpecificationInterface
 * Variation of the Specification design pattern for matching current request to specific routes
 *
 * @package EventEspresso\core\domain\entities\routing\specifications
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
interface RouteMatchSpecificationInterface
{
    /**
     * returns true if current request matches specification
     *
     * @since 4.9.71.p
     * @return boolean
     */
    public function isMatchingRoute();
}
