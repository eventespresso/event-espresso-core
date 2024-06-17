<?php

namespace EventEspresso\core\services\json;

use EventEspresso\core\services\database\WordPressOption;
use stdClass;

/**
 * Class JsonDataWordpressOption
 * A version of WordPressOption that allows more complex data to be saved and accessed via individual properties
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\services\json
 * @since   5.0.0.p
 */
abstract class JsonDataWordpressOption extends WordPressOption
{
    private JsonDataHandler $json_data_handler;

    /**
     * @var array|mixed|stdClass
     */
    private $options = [];


    /**
     * JsonDataWordpressOption constructor.
     *
     * @param JsonDataHandler $json_data_handler
     * @param string          $option_name
     * @param                 $default_value
     * @param bool            $autoload
     */
    public function __construct(
        JsonDataHandler $json_data_handler,
        string $option_name,
        $default_value,
        bool $autoload = false
    ) {
        $this->json_data_handler = $json_data_handler;
        if (! $this->json_data_handler->dataType()) {
            $this->json_data_handler->configure(JsonDataHandler::DATA_TYPE_OBJECT);
        }
        parent::__construct($option_name, $default_value, $autoload);
    }


    /**
     * @param $value
     * @return int
     */
    public function updateOption($value, bool $force_update = false): int
    {
        $update = parent::updateOption($this->json_data_handler->encodeData($value), $force_update);
        if ($update === WordPressOption::UPDATE_SUCCESS) {
            $this->options = $value;
        }
        return $update;
    }


    /**
     * @param string $property
     * @param mixed  $value
     * @return void
     */
    public function addProperty(string $property, $value)
    {
        $options              = $this->getAll();
        $options->{$property} = $value;
        $this->updateOption($options);
    }


    /**
     * @param string $property
     * @return mixed
     */
    public function getProperty(string $property)
    {
        $options = $this->getAll();
        return property_exists($options, $property) ? $options->{$property} : null;
    }


    /**
     * @return array|mixed|stdClass
     */
    public function getAll()
    {
        if (empty($this->options)) {
            $this->options = $this->json_data_handler->decodeJson($this->loadOption());
        }
        return $this->options;
    }


    /**
     * @param string $property
     * @return void
     */
    public function removeProperty(string $property)
    {
        $options = $this->getAll();
        unset($options->{$property});
        $this->updateOption($options);
    }
}
