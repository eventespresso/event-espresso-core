<?php

namespace EventEspresso\core\services\container;

use ArrayAccess;
use ArrayIterator;
use OutOfBoundsException;

/**
 * Class RegistryContainer
 * Object for storing data that behaves as an array
 *
 * @package EventEspresso\core\services\container
 * @author  Brent Christensen
 * @since   4.9.49
 */
class RegistryContainer implements ArrayAccess, CountableTraversableAggregate
{

    /**
     * @var array $container
     */
    private $container;

    /**
     * RegistryContainer constructor.
     * Container data can be seeded by passing parameters to constructor.
     * Each parameter will become its own element in the container
     */
    public function __construct()
    {
        $this->container = func_get_args();
        if (func_num_args() === 0) {
            $this->container = array();
        }
    }


    /**
     * @param mixed $offset
     * @param mixed $value
     */
    public function offsetSet($offset, $value)
    {
        $this->container[ $offset ] = $value;
    }


    /**
     * @param mixed $offset
     * @return bool
     */
    public function offsetExists($offset)
    {
        return isset($this->container[ $offset ]);
    }


    /**
     * @param mixed $offset
     */
    public function offsetUnset($offset)
    {
        unset($this->container[ $offset ]);
    }


    /**
     * @param mixed $offset
     * @return mixed|null
     */
    public function offsetGet($offset)
    {
        return isset($this->container[ $offset ]) ? $this->container[ $offset ] : null;
    }


    /**
     * @return int
     */
    public function count()
    {
        return count($this->container);
    }


    /**
     * @return ArrayIterator
     */
    public function getIterator()
    {
        return new ArrayIterator($this->container);
    }


    /**
     * @param $offset
     * @param $value
     */
    public function __set($offset, $value)
    {
        $this->container[ $offset ] = $value;
    }


    /**
     * @param $offset
     * @return mixed
     * @throws OutOfBoundsException
     */
    public function __get($offset)
    {
        if (array_key_exists($offset, $this->container)) {
            return $this->container[ $offset ];
        }
        $trace = debug_backtrace();
        throw new OutOfBoundsException(
            sprintf(
                esc_html__('Invalid offset: %1$s %2$sCalled from %3$s on line %4$d', 'event_espresso'),
                $offset,
                '<br  />',
                $trace[0]['file'],
                $trace[0]['line']
            )
        );
    }


    /**
     * @param $offset
     * @return bool
     */
    public function __isset($offset)
    {
        return isset($this->container[ $offset ]);
    }


    /**
     * @param $offset
     */
    public function __unset($offset)
    {
        unset($this->container[ $offset ]);
    }
}
