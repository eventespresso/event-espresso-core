<?php

namespace EventEspresso\core\services\dependencies;

use EventEspresso\core\exceptions\InvalidAliasException;

/**
 * Class ClassAlias
 * Simple value object for representing a class alias such as an interface
 *
 * @package EventEspresso\core\services\dependencies
 * @author  Brent Christensen
 * @since   $VID:$
 */
class ClassAlias
{

    /**
     * @var string $alias
     */
    private $alias;

    /**
     * @var string $fqcn
     */
    private $fqcn;

    /**
     * DependencyAlias constructor.
     *
     * @param string $alias Interface specified by implementing class
     * @param string $fqcn  Concrete class that satisfies interface
     * @throws InvalidAliasException
     */
    public function __construct($alias, $fqcn)
    {
        if (! is_subclass_of($fqcn, $alias)) {
            throw new InvalidAliasException($fqcn, $alias);
        }
        $this->alias = $alias;
        $this->fqcn = $fqcn;
    }

    /**
     * @return string
     */
    public function alias()
    {
        return $this->alias;
    }

    /**
     * @return string
     */
    public function fqcn()
    {
        return $this->fqcn;
    }
}
