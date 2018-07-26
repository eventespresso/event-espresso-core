<?php

namespace EventEspresso\core\domain\entities\route_match;

use EventEspresso\core\services\request\RequestInterface;

/**
 * Class MultiRouteSpecification
 * Used for combining multiple Route Match Specifications into a single specification
 *
 * @package EventEspresso\core\domain\entities\route_match
 * @author  Brent Christensen
 * @since   $VID:$
 */
abstract class MultiRouteSpecification extends RouteMatchSpecification
{

    /**
     * @var RouteMatchSpecificationInterface[] $specifications
     */
    protected $specifications;

    /**
     * MultiRouteSpecification constructor.
     *
     * @param RouteMatchSpecificationInterface[] $specifications
     * @param RequestInterface                   $request
     */
    public function __construct(array $specifications, RequestInterface $request)
    {
        $this->specifications = $specifications;
        parent::__construct($request);
    }
}
