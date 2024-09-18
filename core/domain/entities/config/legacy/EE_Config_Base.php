<?php

use EventEspresso\core\services\container\Mirror;
use EventEspresso\core\services\loaders\LoaderFactory;

/**
 * Base class used for config classes. These classes should generally not have
 * magic functions in use, except we'll allow them to magically set and get stuff...
 * basically, they should just be well-defined stdClasses
 */
abstract class EE_Config_Base
{
    /**
     * Utility function for escaping the value of a property and returning.
     *
     * @param string $property property name (checks to see if exists).
     * @return mixed if a detected type found return the escaped value, otherwise just the raw value is returned.
     * @throws EE_Error
     */
    public function get_pretty(string $property)
    {
        if (! property_exists($this, $property)) {
            throw new EE_Error(
                sprintf(
                    esc_html__(
                        '%1$s::get_pretty() has been called with the property %2$s which does not exist on the %1$s config class.',
                        'event_espresso'
                    ),
                    get_class($this),
                    $property
                )
            );
        }
        // just handling escaping of strings for now.
        if (is_string($this->{$property})) {
            return stripslashes($this->{$property});
        }
        return $this->{$property};
    }


    /**
     * @throws ReflectionException
     */
    public function populate()
    {
        // grab defaults via a new instance of this class.
        $class_name      = get_class($this);
        $mirror          = $this->getReflector();
        $defaults        = $mirror->getDefaultProperties($class_name);
        $static_defaults = $mirror->getStaticProperties($class_name);
        // loop through the properties for this class and see if they are set.  If they are NOT, then grab the
        // default from our $defaults object.
        foreach ($defaults as $property => $value) {
            $is_static_property  = array_key_exists($property, $static_defaults);
            // double $$ is not a typo, it's how to access a static variable dynamically.
            if ($is_static_property && $class_name::$$property !== null) {
                continue;
            }
            $reflection_property = $mirror->getProperty($class_name, $property);
            $is_public_property  = $reflection_property->isPublic();
            if ($is_public_property && ! $is_static_property && $this->{$property} !== null) {
                continue;
            }
            $camelGetter = EEH_Inflector::camelize_all_but_first($property);
            if (method_exists($this, $camelGetter) && $this->{$camelGetter}() !== null) {
                continue;
            }
            $setter = "set_$property";
            if (method_exists($this, $setter)) {
                $this->$setter($value);
                continue;
            }
            $camelSetter = 'set' . EEH_Inflector::camelize($property);
            if (method_exists($this, $camelSetter)) {
                $this->$camelSetter($value);
                continue;
            }
            if ($is_static_property) {
                // double $$ is not a typo, it's how to access a static variable dynamically.
                $class_name::$$property = $static_defaults[ $property ];
                continue;
            }
            if ($is_public_property) {
                $this->{$property} = $value;
            }
        }
        // cleanup
        unset($defaults);
    }


    private function getReflector(): Mirror
    {
        static $mirror = null;
        if ($mirror === null) {
            $mirror = LoaderFactory::getShared(Mirror::class);
        }
        return $mirror;
    }


    /**
     * @param mixed $a
     * @return bool
     */
    public function __isset($a)
    {
        return false;
    }


    /**
     * @param mixed $a
     * @return bool
     */
    public function __unset($a)
    {
        return false;
    }


    public function __clone()
    {
    }


    public function __wakeup()
    {
    }


    public function __destruct()
    {
    }
}
