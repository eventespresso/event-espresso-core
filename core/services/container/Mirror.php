<?php

namespace EventEspresso\core\services\container;

use EventEspresso\core\exceptions\InvalidDataTypeException;
use ReflectionClass;
use ReflectionException;
use ReflectionMethod;
use ReflectionParameter;
use ReflectionProperty;

/**
 * Class Mirror
 * Utility class for obtaining details about classes using PHP Reflection.
 * To prevent extra processing, all generated reflectors are cached for reuse.
 *
 * @package EventEspresso\core\services\container
 * @author  Brent Christensen
 * @since   4.9.62.p
 */
class Mirror
{

    /**
     * @var ReflectionClass[] $classes
     */
    private $classes = array();

    /**
     * @var ReflectionMethod[] $constructors
     */
    private $constructors = array();

    /**
     * @var ReflectionParameter[][] $parameters
     */
    private $parameters = array();

    /**
     * @var ReflectionParameter[][] $parameters
     */
    private $parameter_classes = array();

    /**
     * @var ReflectionProperty[][] $properties
     */
    private $properties = array();

    /**
     * @var ReflectionMethod[][] $methods
     */
    private $methods = array();


    /**
     * @param string $class_name
     * @return ReflectionClass
     * @throws ReflectionException
     * @throws InvalidDataTypeException
     */
    public function getReflectionClass($class_name)
    {
        if (! is_string($class_name)) {
            throw new InvalidDataTypeException($class_name, '$class_name', 'string (fully qualified class name)');
        }
        if (! isset($this->classes[ $class_name ])) {
            $this->classes[ $class_name ] = new ReflectionClass($class_name);
        }
        return $this->classes[ $class_name ];
    }


    /**
     * @param string $class_name
     * @return ReflectionMethod
     * @throws InvalidDataTypeException
     * @throws ReflectionException
     */
    public function getConstructor($class_name)
    {
        if (! is_string($class_name)) {
            throw new InvalidDataTypeException($class_name, '$class_name', 'string (fully qualified class name)');
        }
        if (! isset($this->constructors[ $class_name ])) {
            $reflection_class                  = $this->getReflectionClass($class_name);
            $this->constructors[ $class_name ] = $reflection_class->getConstructor();
        }
        return $this->constructors[ $class_name ];
    }


    /**
     * @param ReflectionClass $reflection_class
     * @return ReflectionMethod
     * @throws InvalidDataTypeException
     * @throws ReflectionException
     */
    public function getConstructorFromReflection(ReflectionClass $reflection_class)
    {
        return $this->getConstructor($reflection_class->getName());
    }


    /**
     * @param string $class_name
     * @return ReflectionParameter[]
     * @throws InvalidDataTypeException
     * @throws ReflectionException
     */
    public function getParameters($class_name)
    {
        if (! isset($this->parameters[ $class_name ])) {
            $constructor                     = $this->getConstructor($class_name);
            $this->parameters[ $class_name ] = $constructor->getParameters();
        }
        return $this->parameters[ $class_name ];
    }


    /**
     * @param ReflectionClass $reflection_class
     * @return ReflectionParameter[]
     * @throws InvalidDataTypeException
     * @throws ReflectionException
     */
    public function getParametersFromReflection(ReflectionClass $reflection_class)
    {
        return $this->getParameters($reflection_class->getName());
    }


    /**
     * @param ReflectionMethod $constructor
     * @return ReflectionParameter[]
     * @throws InvalidDataTypeException
     * @throws ReflectionException
     */
    public function getParametersFromReflectionConstructor(ReflectionMethod $constructor)
    {
        return $this->getParameters($constructor->getDeclaringClass());
    }


    /**
     * @param ReflectionParameter $param
     * @param string              $class_name
     * @param string              $index
     * @return string|null
     */
    public function getParameterClassName(ReflectionParameter $param, $class_name, $index)
    {
        if (isset($this->parameter_classes[ $class_name ][ $index ]['param_class_name'])) {
            return $this->parameter_classes[ $class_name ][ $index ]['param_class_name'];
        }
        if (! isset($this->parameter_classes[ $class_name ])) {
            $this->parameter_classes[ $class_name ] = array();
        }
        if (! isset($this->parameter_classes[ $class_name ][ $index ])) {
            $this->parameter_classes[ $class_name ][ $index ] = array();
        }
        $this->parameter_classes[ $class_name ][ $index ]['param_class_name'] = $param->getClass()
            ? $param->getClass()->name
            : null;
        return $this->parameter_classes[ $class_name ][ $index ]['param_class_name'];
    }


    /**
     * @param ReflectionParameter $param
     * @param string              $class_name
     * @param string              $index
     * @return string|null
     */
    public function getParameterDefaultValue(ReflectionParameter $param, $class_name, $index)
    {
        if (isset($this->parameter_classes[ $class_name ][ $index ]['param_class_default'])) {
            return $this->parameter_classes[ $class_name ][ $index ]['param_class_default'];
        }
        if (! isset($this->parameter_classes[ $class_name ])) {
            $this->parameter_classes[ $class_name ] = array();
        }
        if (! isset($this->parameter_classes[ $class_name ][ $index ])) {
            $this->parameter_classes[ $class_name ][ $index ] = array();
        }
        $this->parameter_classes[ $class_name ][ $index ]['param_class_default'] = $param->isDefaultValueAvailable()
            ? $param->getDefaultValue()
            : null;
        return $this->parameter_classes[ $class_name ][ $index ]['param_class_default'];
    }


    /**
     * @param string $class_name
     * @return ReflectionProperty[]
     * @throws InvalidDataTypeException
     * @throws ReflectionException
     */
    public function getProperties($class_name)
    {
        if (! isset($this->properties[ $class_name ])) {
            $reflection_class                = $this->getReflectionClass($class_name);
            $this->properties[ $class_name ] = $reflection_class->getProperties();
        }
        return $this->properties[ $class_name ];
    }


    /**
     * @param ReflectionClass $reflection_class
     * @return ReflectionProperty[]
     * @throws InvalidDataTypeException
     * @throws ReflectionException
     */
    public function getPropertiesFromReflection(ReflectionClass $reflection_class)
    {
        return $this->getProperties($reflection_class->getName());
    }


    /**
     * @param string $class_name
     * @return ReflectionMethod[]
     * @throws InvalidDataTypeException
     * @throws ReflectionException
     */
    public function getMethods($class_name)
    {
        if (! isset($this->methods[ $class_name ])) {
            $reflection_class             = $this->getReflectionClass($class_name);
            $this->methods[ $class_name ] = $reflection_class->getMethods();
        }
        return $this->methods[ $class_name ];
    }


    /**
     * @param ReflectionClass $reflection_class )
     * @return ReflectionMethod[]
     * @throws InvalidDataTypeException
     * @throws ReflectionException
     */
    public function getMethodsFromReflection(ReflectionClass $reflection_class)
    {
        return $this->getMethods($reflection_class->getName());
    }
}
