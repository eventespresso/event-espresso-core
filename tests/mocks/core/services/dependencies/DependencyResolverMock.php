<?php

namespace EventEspresso\tests\mocks\core\services\dependencies;

use EventEspresso\core\exceptions\InvalidAliasException;
use EventEspresso\core\services\dependencies\ClassAlias;
use EventEspresso\core\services\dependencies\DependencyResolver;

/**
 * Class DependencyResolverMock
 * Description
 *
 * @package EventEspresso\tests\mocks\core\services\dependencies
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class DependencyResolverMock extends DependencyResolver
{
    /**
     * @return ClassAlias[]
     */
    public function getAliases()
    {
        return $this->aliases;
    }

    /**
     * @return array
     */
    public function getNamespaceRoots()
    {
        return $this->namespace_roots;
    }

    /**
     * Used to configure and/or setup any aliases or namespace roots required by the DependencyResolver
     *
     * @since 4.9.71.p
     * @throws InvalidAliasException
     */
    public function initialize()
    {
        // do nothing as we will configure everything within our tests
    }
}