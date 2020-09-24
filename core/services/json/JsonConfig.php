<?php

namespace EventEspresso\core\services\json;

use DomainException;

/**
 * Class JsonConfig
 * Abstract parent DTO class for managing configuration data that needs to be persisted to the database.
 * Encodes properties to JSON and saves the data in a WP option using the sanitized class name as a key.
 * Intended as a replacement for EE_Config_Base classes that are currently serialized
 * and saved in one massive ee-config object that has many downsides.
 *
 * @package EventEspresso\core\domain\entities\config
 * @since   $VID:$
 */
abstract class JsonConfig
{

    /**
     * @var boolean $has_changes
     */
    private $has_changes = false;

    /**
     * @var string $option_name
     */
    private $option_name;


    /**
     * SettingsConfig constructor.
     *
     * @param array $defaults
     */
    public function __construct(array $defaults)
    {
        $this->setOptionName();
        $this->load($defaults);
        $this->clearChanges();
    }


    /**
     * @return array
     */
    abstract protected function getProperties();


    /**
     * converts property name to:
     *      camelCase for getters ex: show_expired => showExpired
     *      PascalCase for setters ex: show_expired => ShowExpired
     *
     * @param string $string
     * @param false  $camelCase
     * @return string|string[]
     * @since   $VID:$
     */
    private function convertCase($string, $camelCase = false)
    {
        $string = str_replace(' ', '', ucwords(str_replace('_', ' ', $string)));
        if ($camelCase) {
            $string = lcfirst($string);
        }
        return $string;
    }


    /**
     * @param string $property
     * @param bool   $getter
     * @return string
     */
    private function createGetterSetter($property, $getter = true)
    {
        $setterOrGetter = $this->convertCase($property, $getter);
        // if not a getter, prepend with "set". ex: Show_expired => setShowExpired
        $setterOrGetter = ! $getter ? 'set' . $setterOrGetter : $setterOrGetter;
        return $this->isValidMethod($setterOrGetter) ? $setterOrGetter : '';
    }


    /**
     * @param string $method
     * @return bool
     * @throws DomainException
     */
    private function isValidMethod($method)
    {
        if (method_exists($this, $method)){
            return true;
        }
        throw new DomainException(
            sprintf(
                esc_html__('Missing %1$s method on JsonConfig class %2$s.', 'eventespresso'),
                $method,
                get_class($this)
            )
        );
    }


    /**
     * converts class name to option name by changing backslashes to dashes
     */
    private function setOptionName()
    {
        $this->option_name = str_replace(['EventEspresso', '\\'], ['ee', '-'], get_class($this));
    }



    /**
     * retrieves WP option for class, decodes the data, and resigns values to properties
     *
     * @param array $defaults
     */
    protected function load(array $defaults)
    {
        $config = get_option($this->option_name, '{}');
        $config = (array) json_decode($config) + $defaults;
        foreach ($this->getProperties() as $property => $value) {
            if ($property === 'option_name') {
                continue;
            }
            // convert to PascalCase and prepend with "set". ex: show_expired => setShowExpired
            $setter = $this->createGetterSetter($property, false);
            $value = array_key_exists($property, $config) ? $config[ $property ] : null;
            $this->{$setter}($value);
        }
    }


    /**
     * updates property value and marks changes if property value has changed
     *
     * @param string $property
     * @param mixed $value
     */
    protected function setProperty($property, $value)
    {
        $this->markChanges($this->{$property} === $value );
        $this->{$property} = $value;
    }


    /**
     * will only toggle has_changes to true otherwise keeps existing value (ie: will never toggle to false)
     * why? this allows this method to be fed with the result of a conditional
     * that compares an incoming value in a setter with it's previously set value.
     * ie: if $x = 1 and you call setX(1) then the value has not really changed.
     *
     * @param bool $changes
     * @since   $VID:$
     */
    protected function markChanges($changes = true)
    {
        $this->has_changes = filter_var($changes, FILTER_VALIDATE_BOOLEAN) ? true : $this->has_changes;
    }


    /**
     * resets $has_changes flag to false but does NOT actually reset any data
     */
    public function clearChanges()
    {
        $this->has_changes = false;
    }


    /**
     * flag for marking that changes have been made to property data
     *
     * @return bool
     */
    public function hasChanges()
    {
        return $this->has_changes;
    }


    /**
     * encodes all property data to JSON and saves it to a WP option
     */
    public function update()
    {
        $config_exists = get_option($this->option_name);
        if ($config_exists && ! $this->has_changes) {
            return;
        }
        $config = [];
        foreach ($this->getProperties() as $property => $value) {
            if ($property === 'option_name') {
                continue;
            }
            $getter = $this->createGetterSetter($property);
            $config[ $property ] = $this->{$getter}();
        }
        $config = wp_json_encode($config);
        if ($config_exists) {
            update_option($this->option_name, $config);
        } else {
            add_option($this->option_name, $config, '', 'no');
        }
        $this->clearChanges();
    }
}
