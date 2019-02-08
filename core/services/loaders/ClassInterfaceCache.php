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
    private $interfaces = array();

    /**
     * @type string[][] $aliases
     */
    protected $aliases = array();


    /**
     * @param string $fqn
     * @return string
     */
    public function getFqn($fqn)
    {
        $fqn = $fqn instanceof FullyQualifiedName ? $fqn->string() : $fqn;
        return ltrim($fqn, '\\');
    }


    /**
     * @param string $fqn
     * @return array
     */
    public function getInterfaces($fqn)
    {
        $fqn = $this->getFqn($fqn);
        // have we already seen this FQCN ?
        if (! array_key_exists($fqn, $this->interfaces)) {
            $this->interfaces[ $fqn ] = array();
            if (class_exists($fqn)) {
                $this->interfaces[ $fqn ] = class_implements($fqn, false);
                $this->interfaces[ $fqn ] = $this->interfaces[ $fqn ] !== false
                    ? $this->interfaces[ $fqn ]
                    : array();
            }
        }
        return $this->interfaces[ $fqn ];
    }


    /**
     * @param string $fqn
     * @param string $interface
     * @return bool
     */
    public function hasInterface($fqn, $interface)
    {
        $fqn        = $this->getFqn($fqn);
        $interfaces = $this->getInterfaces($fqn);
        return in_array($interface, $interfaces, true);
    }


    /**
     * adds an alias for a classname
     *
     * @param string $fqn       the class name that should be used (concrete class to replace interface)
     * @param string $alias     the class name that would be type hinted for (abstract parent or interface)
     * @param string $for_class the class that has the dependency (is type hinting for the interface)
     * @throws InvalidAliasException
     */
    public function addAlias($fqn, $alias, $for_class = '')
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
                $this->aliases[ $for_class ] = array();
            }
            $this->aliases[ $for_class ][ $alias ] = $fqn;
            return;
        }
        $this->aliases[ $alias ] = $fqn;
    }


    /**
     * returns TRUE if the provided FQN is an alias
     *
     * @param string $fqn
     * @param string $for_class
     * @return bool
     */
    public function isAlias($fqn = '', $for_class = '')
    {
        $fqn = $this->getFqn($fqn);
        if ($this->isAliasForClass($fqn, $for_class)) {
            return true;
        }
        if ($for_class === '' && $this->isDirectAlias($fqn)) {
            return true;
        }
        return false;
    }


    /**
     * returns TRUE if the provided FQN is an alias
     *
     * @param string $fqn
     * @return bool
     */
    protected function isDirectAlias($fqn = '')
    {
        return isset($this->aliases[ (string) $fqn ]) && ! is_array($this->aliases[ (string) $fqn ]);
    }


    /**
     * returns TRUE if the provided FQN is an alias for the specified class
     *
     * @param string $fqn
     * @param string $for_class
     * @return bool
     */
    protected function isAliasForClass($fqn = '', $for_class = '')
    {
        return (
            $for_class !== ''
            && isset($this->aliases[ (string) $for_class ][ (string) $fqn ])
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
     * @param string $alias
     * @param string $for_class
     * @return string
     */
    public function getFqnForAlias($alias = '', $for_class = '')
    {
        $alias = $this->getFqn($alias);
        if ($this->isAliasForClass($alias, $for_class)) {
            return $this->getFqnForAlias($this->aliases[ (string) $for_class ][ (string) $alias ], $for_class);
        }
        if ($this->isDirectAlias($alias)) {
            return $this->getFqnForAlias($this->aliases[ (string) $alias ], '');
        }
        return $alias;
    }
}
