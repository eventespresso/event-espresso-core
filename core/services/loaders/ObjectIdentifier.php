<?php

namespace EventEspresso\core\services\loaders;

use Closure;
use EventEspresso\core\interfaces\ReservedInstanceInterface;

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

    private ClassInterfaceCache $class_cache;


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
     * the delimiter used to separate a fqcn from the arguments hash
     *
     * @param string $object_identifier
     * @return bool
     */
    public function hasArguments(string $object_identifier): bool
    {
        // not using strpos() !== false
        // because an object identifier should never begin with the delimiter
        // therefore the delimiter should NOT be found at position 0
        return strpos($object_identifier, ObjectIdentifier::DELIMITER) > 0;
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
    public function fqcnMatchesObjectIdentifier(string $fqcn, string $object_identifier): bool
    {
        $fqcn = str_replace('\\', '_', $fqcn);
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
    public function getIdentifier(string $fqcn, array $arguments = []): string
    {
        // only build identifier from arguments if class is not ReservedInstanceInterface
        $identifier = ! $this->class_cache->hasInterface($fqcn, ReservedInstanceInterface::class)
            ? $this->getIdentifierForArguments($arguments)
            : '';
        if (! empty($identifier)) {
            $fqcn .= ObjectIdentifier::DELIMITER . md5($identifier);
        }
        return str_replace('\\', '_', $fqcn);
    }


    /**
     * build a string representation of an object's arguments
     * (mostly because Closures can't be serialized)
     *
     * @param array $arguments
     * @return string
     */
    protected function getIdentifierForArguments(array $arguments): string
    {
        if (empty($arguments)) {
            return '';
        }
        $identifier = '';
        foreach ($arguments as $key => $argument) {
            // don't include arguments used to assist with loading legacy classes
            if (is_string($key) && strpos($key, 'EE_Registry::create') === 0) {
                continue;
            }
            switch (true) {
                case is_object($argument):
                case $argument instanceof Closure:
                    $identifier .= spl_object_hash($argument);
                    break;
                case is_array($argument):
                    $identifier .= $this->getIdentifierForArguments($argument);
                    break;
                default:
                    $identifier .= sanitize_key($argument);
                    break;
            }
        }
        return $identifier;
    }
}
