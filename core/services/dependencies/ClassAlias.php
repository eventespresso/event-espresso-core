<?php

namespace EventEspresso\core\services\dependencies;

use EventEspresso\core\exceptions\InvalidAliasException;

/**
 * ClassAlias
 * Simple value object for representing
 * a class alias such as an interface or base class
 * and the actual class that should be utilized instead
 *
 * @package EventEspresso\core\services\dependencies
 * @author  Brent Christensen
 * @since   4.9.71.p
 */
class ClassAlias
{

    /**
     * @var string $alias   an interface or base class representing what object
     *                      can be utilized by another object and/or function
     */
    private $alias;

    /**
     * @var string $fqcn the actual class that should be substituted for the alias above
     */
    private $fqcn;

    /**
     * ClassAlias constructor.
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
