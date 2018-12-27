<?php

namespace EventEspresso\core\domain\entities\route_match;

use EventEspresso\core\exceptions\InvalidEntityException;
use EventEspresso\core\services\request\RequestInterface;

/**
 * Class MultiRouteSpecification
 * Used for combining multiple Route Match Specifications into a single specification
 *
 * @package EventEspresso\core\domain\entities\route_match
 * @author  Brent Christensen
 * @since   4.9.71.p
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
     * @throws InvalidEntityException
     */
    public function __construct(array $specifications, RequestInterface $request)
    {
        foreach ($specifications as $specification) {
            if (! $specification instanceof RouteMatchSpecificationInterface) {
                throw new InvalidEntityException(
                    $specification,
                    'EventEspresso\core\domain\entities\route_match\RouteMatchSpecificationInterface'
                );
            }
        }
        $this->specifications = $specifications;
        parent::__construct($request);
    }
}
