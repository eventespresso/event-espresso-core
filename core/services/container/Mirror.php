<?php

namespace EventEspresso\core\services\container;

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
     * @var ReflectionClass[]
     */
    private array $classes = [];

    /**
     * @var ReflectionMethod[]
     */
    private array $constructors = [];

    /**
     * @var ReflectionParameter[][]
     */
    private array $parameters = [];

    /**
     * @var ReflectionParameter[][]
     */
    private array $parameter_classes = [];

    /**
     * @var ReflectionProperty[][]
     */
    private array $properties = [];

    /**
     * @var ReflectionMethod[][]
     */
    private array $methods = [];

    /**
     * @var array
     */
    private array $default_properties = [];

    /**
     * @var array
     */
    private array $static_properties = [];


    /**
     * @param string $class_name
     * @return ReflectionClass
     * @throws ReflectionException
     */
    public function getReflectionClass(string $class_name): ReflectionClass
    {
        if (! isset($this->classes[ $class_name ])) {
            $this->classes[ $class_name ] = new ReflectionClass($class_name);
        }
        return $this->classes[ $class_name ];
    }


    /**
     * @param string $class_name
     * @return ReflectionMethod|null
     * @throws ReflectionException
     */
    public function getConstructor(string $class_name): ?ReflectionMethod
    {
        if (! isset($this->constructors[ $class_name ])) {
            $reflection_class                  = $this->getReflectionClass($class_name);
            $this->constructors[ $class_name ] = $reflection_class->getConstructor();
        }
        return $this->constructors[ $class_name ];
    }


    /**
     * @param ReflectionClass $reflection_class
     * @return ReflectionMethod|null
     * @throws ReflectionException
     */
    public function getConstructorFromReflection(ReflectionClass $reflection_class): ?ReflectionMethod
    {
        return $this->getConstructor($reflection_class->getName());
    }


    /**
     * @param string $class_name
     * @return ReflectionParameter[]
     * @throws ReflectionException
     */
    public function getParameters(string $class_name): array
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
     * @throws ReflectionException
     */
    public function getParametersFromReflection(ReflectionClass $reflection_class): array
    {
        return $this->getParameters($reflection_class->getName());
    }


    /**
     * @param ReflectionMethod $constructor
     * @return ReflectionParameter[]
     * @throws ReflectionException
     */
    public function getParametersFromReflectionConstructor(ReflectionMethod $constructor): array
    {
        return $this->getParameters($constructor->getDeclaringClass());
    }


    /**
     * returns array of ReflectionParameter objects for parameters that are NOT optional
     *
     * @param string $class_name
     * @return ReflectionParameter[]
     * @throws ReflectionException
     */
    public function getRequiredParameters(string $class_name): array
    {
        $required_parameters = [];
        $parameters          = $this->getParameters($class_name);
        foreach ($parameters as $parameter) {
            if ($parameter instanceof ReflectionParameter && ! $parameter->isOptional()) {
                $required_parameters[] = $parameter;
            }
        }
        return $required_parameters;
    }


    /**
     * @param ReflectionParameter $param
     * @param string              $class_name
     * @param string              $index
     * @return string|null
     */
    public function getParameterClassName(ReflectionParameter $param, string $class_name, string $index): ?string
    {
        if (isset($this->parameter_classes[ $class_name ][ $index ]['param_class_name'])) {
            return $this->parameter_classes[ $class_name ][ $index ]['param_class_name'];
        }
        if (! isset($this->parameter_classes[ $class_name ])) {
            $this->parameter_classes[ $class_name ] = [];
        }
        if (! isset($this->parameter_classes[ $class_name ][ $index ])) {
            $this->parameter_classes[ $class_name ][ $index ] = [];
        }
        // ReflectionParameter::getClass() is deprecated in PHP 8+
        $this->parameter_classes[ $class_name ][ $index ]['param_class_name'] = PHP_VERSION_ID < 70100
            ? $this->getParameterClassNameLegacy($param)
            : $this->getParameterClassNamePhp8($param);
        return $this->parameter_classes[ $class_name ][ $index ]['param_class_name'];
    }


    /**
     * @param ReflectionParameter $param
     * @return string|null
     * @since   4.10.13.p
     */
    private function getParameterClassNameLegacy(ReflectionParameter $param): ?string
    {
        $reflection_class = $param->getClass();
        return $reflection_class instanceof ReflectionClass
            ? $reflection_class->getName()
            : null;
    }


    /**
     * ReflectionParameter::getClass() is deprecated in PHP 8+,
     * so the class name for a parameter needs to be extracted from the ReflectionType,
     * which can either be a ReflectionNamedType or ReflectionUnionType
     *
     * @param ReflectionParameter $param
     * @return string|null
     * @since   4.10.13.p
     */
    private function getParameterClassNamePhp8(ReflectionParameter $param): ?string
    {
        $reflection_type = $param->getType();
        if ($reflection_type instanceof \ReflectionNamedType) {
            return $reflection_type->getName();
        }
        if ($reflection_type instanceof \ReflectionUnionType) {
            $reflection_types = $reflection_type->getTypes();
            if (is_array($reflection_types)) {
                $first = reset($reflection_types);
                return $first->getName();
            }
        }
        return null;
    }


    /**
     * @param ReflectionParameter $param
     * @param string              $class_name
     * @param string              $index
     * @return array|string|null
     */
    public function getParameterDefaultValue(ReflectionParameter $param, string $class_name, string $index)
    {
        if (isset($this->parameter_classes[ $class_name ][ $index ]['param_class_default'])) {
            return $this->parameter_classes[ $class_name ][ $index ]['param_class_default'];
        }
        if (! isset($this->parameter_classes[ $class_name ])) {
            $this->parameter_classes[ $class_name ] = [];
        }
        if (! isset($this->parameter_classes[ $class_name ][ $index ])) {
            $this->parameter_classes[ $class_name ][ $index ] = [];
        }
        $this->parameter_classes[ $class_name ][ $index ]['param_class_default'] = $param->isDefaultValueAvailable()
            ? $param->getDefaultValue()
            : null;
        return $this->parameter_classes[ $class_name ][ $index ]['param_class_default'];
    }


    /**
     * @param string $class_name
     * @return ReflectionProperty[]
     * @throws ReflectionException
     */
    public function getProperties(string $class_name): array
    {
        if (! isset($this->properties[ $class_name ])) {
            $reflection_class = $this->getReflectionClass($class_name);
            $properties       = $reflection_class->getProperties();
            foreach ($properties as $property) {
                $this->properties[ $class_name ][ $property->getName() ] = $property;
            }
        }
        return $this->properties[ $class_name ];
    }


    /**
     * @param ReflectionClass $reflection_class
     * @return ReflectionProperty[]
     * @throws ReflectionException
     */
    public function getPropertiesFromReflection(ReflectionClass $reflection_class): array
    {
        return $this->getProperties($reflection_class->getName());
    }


    /**
     * @param string $class_name
     * @param string $property_name
     * @return ReflectionProperty|null
     * @throws ReflectionException
     */
    public function getProperty(string $class_name, string $property_name): ?ReflectionProperty
    {
        if (! isset($this->properties[ $class_name ][ $property_name ])) {
            $this->getProperties($class_name);
        }
        return $this->properties[ $class_name ][ $property_name ] ?? null;
    }


    /**
     * @param string $class_name
     * @return ReflectionMethod[]
     * @throws ReflectionException
     */
    public function getMethods(string $class_name): array
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
     * @throws ReflectionException
     */
    public function getMethodsFromReflection(ReflectionClass $reflection_class): array
    {
        return $this->getMethods($reflection_class->getName());
    }


    /**
     * @param string $class_name
     * @return array
     * @throws ReflectionException
     */
    public function getDefaultProperties(string $class_name): array
    {
        if (! isset($this->default_properties[ $class_name ])) {
            $reflection_class                        = $this->getReflectionClass($class_name);
            $this->default_properties[ $class_name ] = $reflection_class->getDefaultProperties();
        }
        return $this->default_properties[ $class_name ];
    }


    /**
     * @param string $class_name
     * @return array
     * @throws ReflectionException
     */
    public function getStaticProperties(string $class_name): array
    {
        if (! isset($this->static_properties[ $class_name ])) {
            $reflection_class                       = $this->getReflectionClass($class_name);
            $this->static_properties[ $class_name ] = $reflection_class->getStaticProperties();
        }
        return $this->static_properties[ $class_name ];
    }


    /**
     * @param string $class_name
     * @param string $property
     * @return bool
     * @throws ReflectionException
     */
    public function hasProperty(string $class_name, string $property): bool
    {
        $this->getProperties($class_name);
        return isset($this->properties[ $class_name ][ $property ]);
    }
}
