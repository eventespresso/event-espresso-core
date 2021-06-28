<?php

namespace EventEspresso\core\services\form\meta;

use EventEspresso\core\services\json\JsonDataHandler;

/**
 * Class InputOptions
 * For managing options for a multi input form element such as a checkboxes, radio buttons, or select inputs
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\services\form\meta
 * @since   $VID:$
 */
class InputOptions implements JsonableInterface
{

    /**
     * @var JsonDataHandler
     */
    private $json_data_handler;

    /**
     * Options for ENUM type inputs like checkboxes, radio buttons, select inputs, etc
     *
     * @var array
     */
    private $options;


    /**
     * HelpText constructor.
     *
     * @param JsonDataHandler $json_data_handler
     * @param array           $options
     */
    public function __construct(JsonDataHandler $json_data_handler, array $options)
    {
        $this->json_data_handler = $json_data_handler;
        $this->setOptions($options);
    }


    /**
     * @param string $json
     * @return InputOptions
     */
    public static function fromJson(string $json): InputOptions
    {
        $json_data_handler = new JsonDataHandler();
        $json_data_handler->configure(JsonDataHandler::DATA_TYPE_ARRAY);
        $data    = $json_data_handler->decodeJson($json);
        $options = $data['options'] ?? [];
        return new InputOptions($json_data_handler, $options);
    }


    /**
     * @return array
     */
    public function toArray(): array
    {
        return ['options' => $this->options];
    }


    /**
     * @return string
     */
    public function toJson(): string
    {
        return $this->json_data_handler->encodeData($this->toArray());
    }


    /**
     * an array where keys are option values and values are option labels
     *
     * @return array
     */
    public function options(): array
    {
        return $this->options;
    }


    /**
     * @param int|float|string $option_value
     * @param int|float|string $display_text
     */
    public function addOption($option_value, $display_text): void
    {
        $option_value = sanitize_key($option_value);
        if (! isset($this->options[ $option_value ])) {
            $this->options[ $option_value ] = sanitize_text_field($display_text);
        }
    }


    /**
     * @param int|float|string $option_value
     */
    public function removeOption($option_value): void
    {
        $option_value = sanitize_key($option_value);
        unset($this->options[ $option_value ]);
    }


    /**
     * @param array $options an array where keys are option values and values are option labels
     */
    public function setOptions(array $options): void
    {
        // grab all of the keys and sanitize those for use as option values
        $keys = array_keys($options);
        $keys = array_map('sanitize_key', $keys);
        // grab all of the array values and sanitize those for use as option display text
        $values = array_values($options);
        $values = array_map('sanitize_text_field', $values);
        // recombine sanitized values
        $this->options = array_combine($keys, $values);
    }
}
