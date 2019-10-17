<?php
namespace EventEspresso\core\domain\services\graphql\fields;

use EventEspresso\core\exceptions\InvalidDataTypeException;
use EventEspresso\core\exceptions\InvalidInterfaceException;
use InvalidArgumentException;

/**
 * Class GraphQLField
 *
 * @package       Event Espresso
 * @author        Manzoor Wani
 */
class GraphQLField
{

    /**
     * @var mixed $name
     */
    protected $name;


    /**
     * @param string $name
     * @param array  $config
     * @throws InvalidArgumentException
     */
    public function __construct($name, array $config = [])
    {
		$this->name   = $name;
		$this->setProps($config);
    }


    /**
     * @param array  $config
     * @throws InvalidArgumentException
     */
    public function setProps(array $config)
    {
		foreach ($config as $key => $value) {
			$this->{$key} = $value;
		}
    }


    /**
     * Get the field name.
	 *
     * @return string
     */
    public function name()
    {
        return $this->name;
    }


    /**
     * Get the model key of the field.
	 *
     * @return string|null
     */
    public function key()
    {
		if (isset($this->key)) {
			return $this->key;
		}
		return null;
    }


    /**
     * Get the caps required for the field.
	 *
     * @return array
     */
    public function caps()
    {
		if (isset($this->caps)) {
			return (array) $this->caps;
		}
		return [];
    }


    /**
	 * Whether the field should resolve
	 * based on the user caps etc.
     * @return boolean
     */
    public function shouldResolve()
    {
		foreach ($this->caps() as $cap) {
			if (!current_user_can($cap)) {
				return false;
			}
		}
		return true;
    }


    /**
	 * Whether the field has an explicit resolver set.
     * @return boolean
     */
    public function hasInternalResolver()
    {
		return isset($this->resolve) && is_callable($this->resolve);
    }


    /**
	 * Checks if the format callback is set.
	 * If yes, then uses it to format the value.
     * @param mixed $value
     * @return mixed The formatted value.
     */
    public function mayBeFormatValue($value)
    {
		if (isset($this->formatCallback) && is_callable($this->formatCallback)) {
			return call_user_func($this->formatCallback, $value);
		}
		return $value;
    }


    /**
	 * Convert the field to array to be
	 * able to pass as config to WP GraphQL
     * @return array
     */
    public function toArray()
    {
		return get_object_vars($this);
    }
}
