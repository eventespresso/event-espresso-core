<?php

namespace EventEspresso\core\domain\entities\route_match;

/**
 * Class RouteMatchSpecificationDecorator
 * Used for wrapping an existing Route Match Specification with additional logic
 *
 * @package EventEspresso\core\domain\entities\route_match
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
abstract class RouteMatchSpecificationDecorator implements RouteMatchSpecificationInterface
{

    /**
     * @var RouteMatchSpecificationInterface $specification
     */
    protected $specification;

    /**
     * RouteMatchSpecificationDecorator constructor.
     *
     * @param RouteMatchSpecificationInterface $specification
     */
    public function __construct(RouteMatchSpecificationInterface $specification)
    {
        $this->specification = $specification;
    }
}
