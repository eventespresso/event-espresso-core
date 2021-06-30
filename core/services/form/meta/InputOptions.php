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
    private $options = [];


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
        $data = $json_data_handler->decodeJson($json);
        return new InputOptions($json_data_handler, $data ?? []);
    }


    /**
     * @return array
     */
    public function toArray(): array
    {
        return array_values($this->options);
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
     * @param array $option
     */
    public function addOption(array $option): void
    {
        if (isset($option['label'], $option['value'])) {
            $label = sanitize_text_field($option['label']);
            $value = sanitize_key($option['value']);

            // use `value` as key
            $this->options[ $value ] = compact('label', 'value');
        }
    }


    /**
     * @param int|float|string $option_value
     */
    public function removeOption(string $option_value): void
    {
        $option_value = sanitize_key($option_value);
        unset($this->options[ $option_value ]);
    }


    /**
     * @param array $options an array where keys are option values and values are option labels
     */
    public function setOptions(array $options): void
    {
        foreach ($options as $option) {
            $this->addOption($option);
        }
    }
}
