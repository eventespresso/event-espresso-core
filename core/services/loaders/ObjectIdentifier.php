<?php

namespace EventEspresso\core\services\loaders;

use Closure;

/**
 * Class ObjectIdentifier
 * Builds a string representation of an object's FQCN and arguments
 * used for identifying whether two objects are functionally equivalent
 *
 * @package EventEspresso\core\services\loaders
 * @author  Brent Christensen
 * @since   4.9.62.p
 */
class ObjectIdentifier
{

    /**
     * used to separate the FQCN from the class's arguments identifier
     */
    const DELIMITER = '____';

    /**
     * @var ClassInterfaceCache $class_cache
     */
    private $class_cache;


    /**
     * ObjectIdentifier constructor.
     *
     * @param ClassInterfaceCache $class_cache
     */
    public function __construct(ClassInterfaceCache $class_cache)
    {
        $this->class_cache = $class_cache;
    }


    /**
     * Returns true if the supplied $object_identifier contains
     * the delimiter used to separate an fqcn from the arguments hash
     *
     * @param string $object_identifier
     * @return bool
     */
    public function hasArguments($object_identifier)
    {
        // type casting to bool instead of using strpos() !== false
        // because an object identifier should never begin with the delimiter
        // therefore the delimiter should NOT be found at position 0
        return (bool) strpos($object_identifier, ObjectIdentifier::DELIMITER);
    }


    /**
     * Returns true if the supplied FQCN equals the supplied $object_identifier
     * OR the supplied FQCN matches the FQCN portion of the supplied $object_identifier
     * AND that $object_identifier is for an object with arguments.
     * This allows a request for an object using a FQCN to match
     * a previously instantiated object with arguments
     * without having to know those arguments.
     *
     * @param string $fqcn
     * @param string $object_identifier
     * @return bool
     */
    public function fqcnMatchesObjectIdentifier($fqcn, $object_identifier)
    {
        return $fqcn === $object_identifier
               || strpos($object_identifier, $fqcn . ObjectIdentifier::DELIMITER) === 0;
    }


    /**
     * build a string representation of an object's FQCN and arguments
     *
     * @param string $fqcn
     * @param array  $arguments
     * @return string
     */
    public function getIdentifier($fqcn, array $arguments = array())
    {
        // only build identifier from arguments if class is not ReservedInstanceInterface
        $identifier = ! $this->class_cache->hasInterface(
            $fqcn,
            'EventEspresso\core\interfaces\ReservedInstanceInterface'
        )
            ? $this->getIdentifierForArguments($arguments)
            : '';
        if (! empty($identifier)) {
            $fqcn .= ObjectIdentifier::DELIMITER . md5($identifier);
        }
        return $fqcn;
    }


    /**
     * build a string representation of a object's arguments
     * (mostly because Closures can't be serialized)
     *
     * @param array $arguments
     * @return string
     */
    protected function getIdentifierForArguments(array $arguments)
    {
        if (empty($arguments)) {
            return '';
        }
        $identifier = '';
        foreach ($arguments as $argument) {
            switch (true) {
                case is_object($argument):
                case $argument instanceof Closure:
                    $identifier .= spl_object_hash($argument);
                    break;
                case is_array($argument):
                    $identifier .= $this->getIdentifierForArguments($argument);
                    break;
                default:
                    $identifier .= $argument;
                    break;
            }
        }
        return $identifier;
    }
}
