<?php

namespace EventEspresso\core\services\loaders;

use EventEspresso\core\domain\values\FullyQualifiedName;
use EventEspresso\core\exceptions\InvalidAliasException;

/**
 * Class ClassInterfaceCache
 * Tracks and caches the interfaces and their aliases implemented by classes
 * so that we are not continuously and/or repeatedly looking up that information
 *
 * @package EventEspresso\core\services\loaders
 * @author  Brent Christensen
 * @since   4.9.62.p
 */
class ClassInterfaceCache
{
    /**
     * array of interfaces indexed by FQCNs where values are arrays of interface FQNs
     *
     * @var string[][] $interfaces
     */
    private $interfaces = [];

    /**
     * @type string[][] $aliases
     */
    protected $aliases = [];


    /**
     * @return string[][]
     */
    public function getAliases(): array
    {
        return $this->aliases;
    }


    /**
     * @param string|FullyQualifiedName $fqn
     * @return string
     */
    public function getFqn($fqn): string
    {
        $fqn = $fqn instanceof FullyQualifiedName
            ? $fqn->string()
            : $fqn;
        return ltrim((string) $fqn, '\\');
    }


    /**
     * @param string|FullyQualifiedName $fqn
     * @return array
     */
    public function getInterfaces($fqn): array
    {
        $fqn = $this->getFqn($fqn);
        // have we already seen this FQCN ?
        if (! array_key_exists($fqn, $this->interfaces)) {
            $this->interfaces[ $fqn ] = [];
            if (class_exists($fqn)) {
                $this->interfaces[ $fqn ] = class_implements($fqn, false);
                $this->interfaces[ $fqn ] = $this->interfaces[ $fqn ] !== false
                    ? $this->interfaces[ $fqn ]
                    : [];
            }
        }
        return $this->interfaces[ $fqn ];
    }


    /**
     * @param string|FullyQualifiedName $fqn
     * @param string                    $interface
     * @return bool
     */
    public function hasInterface($fqn, string $interface): bool
    {
        $fqn        = $this->getFqn($fqn);
        $interfaces = $this->getInterfaces($fqn);
        return in_array($interface, $interfaces, true);
    }


    /**
     * adds an alias for a classname
     *
     * @param string|FullyQualifiedName $fqn       the class name that should be used
     *                                             (concrete class to replace interface)
     * @param string|FullyQualifiedName $alias     the class name that would be type hinted for
     *                                             (abstract parent or interface)
     * @param string $for_class                    the class that has the dependency
     *                                             (is type hinting for the interface)
     * @throws InvalidAliasException
     */
    public function addAlias($fqn, $alias, string $for_class = '')
    {
        $fqn   = $this->getFqn($fqn);
        $alias = $this->getFqn($alias);
        if (strpos($alias, '\\') !== false && ! is_subclass_of($fqn, $alias)) {
            throw new InvalidAliasException($fqn, $alias);
        }
        // are we adding an alias for a specific class?
        if ($for_class !== '') {
            // make sure it's set up as an array
            if (! isset($this->aliases[ $for_class ])) {
                $this->aliases[ $for_class ] = [];
            }
            $this->aliases[ $for_class ][ $alias ] = $fqn;
            return;
        }
        $this->aliases[ $alias ] = $fqn;
    }


    /**
     * returns TRUE if the provided FQN is an alias
     *
     * @param string|FullyQualifiedName $fqn
     * @param string                    $for_class
     * @return bool
     */
    public function isAlias($fqn = '', string $for_class = ''): bool
    {
        $fqn = $this->getFqn($fqn);
        if ($this->isAliasForClass($fqn, $for_class)) {
            return true;
        }
        return $this->isDirectAlias($fqn);
    }


    /**
     * returns TRUE if the provided FQN is an alias
     *
     * @param string $alias
     * @return bool
     */
    protected function isDirectAlias(string $alias = ''): bool
    {
        return isset($this->aliases[ $alias ]) && ! is_array($this->aliases[ $alias ]);
    }


    /**
     * returns TRUE if the provided FQN is an alias for the specified class
     *
     * @param string $alias
     * @param string $for_class
     * @return bool
     */
    protected function isAliasForClass(string $alias = '', string $for_class = ''): bool
    {
        return (
            $for_class !== ''
            && isset($this->aliases[ $for_class ][ $alias ])
        );
    }


    /**
     * returns FQN for provided alias if one exists, otherwise returns the original FQN
     * functions recursively, so that multiple aliases can be used to drill down to a FQN
     *  for example:
     *      if the following two entries were added to the aliases array:
     *          array(
     *              'interface_alias'           => 'some\namespace\interface'
     *              'some\namespace\interface'  => 'some\namespace\classname'
     *          )
     *      then one could use Loader::getNew( 'interface_alias' )
     *      to load an instance of 'some\namespace\classname'
     *
     * @param string|FullyQualifiedName $alias
     * @param string                    $for_class
     * @return string
     */
    public function getFqnForAlias($alias = '', string $for_class = ''): string
    {
        $alias = $this->getFqn($alias);
        if ($this->isAliasForClass($alias, $for_class)) {
            return $this->getFqnForAlias($this->aliases[ $for_class ][ $alias ], $for_class);
        }
        if ($this->isDirectAlias($alias)) {
            // note: changed '' to $for_class
            return $this->getFqnForAlias($this->aliases[ $alias ], $for_class);
        }
        return $alias;
    }


    // public function debug($for_class = '')
    // {
    //     if ($for_class !== '') {
    //         if ( ! isset($this->aliases[ $for_class ])) {
    //             \EEH_Debug_Tools::printr('NOT FOUND', "aliases[ $for_class ]", __FILE__, __LINE__);
    //             return;
    //         }
    //         \EEH_Debug_Tools::printr($this->aliases[ $for_class ], "aliases[ $for_class ]", __FILE__, __LINE__);
    //         return;
    //     }
    //     \EEH_Debug_Tools::printr($this->aliases, '$this->aliases', __FILE__, __LINE__);
    // }
}
