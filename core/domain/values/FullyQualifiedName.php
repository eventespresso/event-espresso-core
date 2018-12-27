<?php

namespace EventEspresso\core\domain\values;

use EventEspresso\core\exceptions\InvalidClassException;
use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;

/**
 * Class FullyQualifiedName
 * Value Object representing a Fully Qualified Class or Interface Name
 *
 * @package EventEspresso\core\domain\values
 * @author  Brent Christensen
 * @since   4.9.51
 */
class FullyQualifiedName
{

    /**
     * @var string $fully_qualified_name
     */
    private $fully_qualified_name;


    /**
     * FullyQualifiedName constructor.
     *
     * @param string $fully_qualified_name
     * @throws InvalidClassException
     * @throws InvalidInterfaceException
     * @throws InvalidDataTypeException
     */
    public function __construct($fully_qualified_name)
    {
        if (! is_string($fully_qualified_name)) {
            throw new InvalidDataTypeException(
                '$fully_qualified_name',
                $fully_qualified_name,
                'string'
            );
        }
        if (! class_exists($fully_qualified_name) && ! interface_exists($fully_qualified_name)) {
            if (strpos($fully_qualified_name, 'Interface') !== false) {
                throw new InvalidInterfaceException($fully_qualified_name);
            }
            throw new InvalidClassException($fully_qualified_name);
        }
        $this->fully_qualified_name = $fully_qualified_name;
    }


    /**
     * @return string
     */
    public function string()
    {
        return $this->fully_qualified_name;
    }


    /**
     * @return string
     */
    public function __toString()
    {
        return $this->fully_qualified_name;
    }
}
