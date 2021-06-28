<?php

namespace EventEspresso\core\services\form\meta;

use EEM_Base;
use EventEspresso\core\services\form\meta\inputs\Text;
use EventEspresso\core\services\json\JsonDataHandler;
use EventEspresso\core\services\loaders\LoaderFactory;

/**
 * Class Attributes
 * For managing HTML attributes for a form element
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\services\form\meta
 * @since   $VID:$
 */
class Attributes implements JsonableInterface
{

    /**
     * @var JsonDataHandler
     */
    private $json_data_handler;

    /**
     * @var InputTypes
     */
    private $input_types;

    /**
     * @var array
     */
    private $attributes = [];

    /**
     * @var array
     */
    private $attribute_types = [
        'accept'          => 'string',
        'accesskey'       => 'string',
        'alt'             => 'string',
        'autocomplete'    => 'bool',
        'autofocus'       => 'bool',
        'checked'         => 'bool',
        // Custom HTML classes to be applied to the form input's container
        'class'           => 'string',
        'contenteditable' => 'bool',
        'dir'             => 'string',
        'disabled'        => 'bool',
        'height'          => 'string',
        'hidden'          => 'bool',
        'id'              => 'string',
        'list'            => 'string',
        // Maximum numeric value allowed for form input answer.
        'max'             => 'int',
        // Maximum characters allowed for form input answer.
        'maxlength'       => 'int',
        // Minimum numeric value allowed for form input answer.
        'min'             => 'int',
        'multiple'        => 'bool',
        'name'            => 'string',
        'pattern'         => 'string',
        // Example text displayed within an input to assist users with completing the form.
        'placeholder'     => 'string',
        'readonly'        => 'bool',
        'size'            => 'int',
        'spellcheck'      => 'bool',
        'step'            => 'float',
        'style'           => 'string',
        'tabindex'        => 'int',
        'title'           => 'string',
        'translate'       => 'bool',
        // Form input type. Values correspond to the Input::TYPE_* constants.
        'type'            => 'string',
        'value'           => 'string',
        'width'           => 'string',
    ];


    /**
     * Attributes constructor.
     *
     * @param JsonDataHandler $json_data_handler
     * @param InputTypes      $input_types
     * @param array           $attributes
     */
    public function __construct(JsonDataHandler $json_data_handler, array $attributes, InputTypes $input_types)
    {
        $this->json_data_handler = $json_data_handler;
        $this->input_types = $input_types;
        $this->setAttributes($attributes);
    }


    /**
     * @param string $json
     * @return Attributes
     */
    public static function fromJson(string $json): Attributes
    {
        $json_data_handler = new JsonDataHandler();
        $json_data_handler->configure(JsonDataHandler::DATA_TYPE_ARRAY);
        $attributes = $json_data_handler->decodeJson($json);
        $input_types = LoaderFactory::getShared('EventEspresso\core\services\form\meta\InputTypes');
        return LoaderFactory::getNew(Attributes::class, [ $json_data_handler, $attributes, $input_types ]);
    }


    /**
     * @return array
     */
    public function toArray(): array
    {
        return $this->attributes();
    }


    /**
     * @return string
     */
    public function toJson(): string
    {
        return $this->json_data_handler->encodeData($this->attributes());
    }


    /**
     * @param string                $attribute
     * @param bool|float|int|string $value
     * @return bool|float|int|string
     */
    private function sanitize(string $attribute, $value)
    {
        if ($attribute === 'type') {
            $valid_types = $this->input_types->validTypeOptions();
            return in_array($value, $valid_types, true) ?: Text::TYPE_TEXT;
        }
        $type = $this->attribute_types[ $attribute ] ?? 'string';
        switch ($type) {
            case 'bool':
                return filter_var($value, FILTER_VALIDATE_BOOLEAN);
            case 'int':
                return filter_var($value, FILTER_SANITIZE_NUMBER_INT);
            case 'float':
                return filter_var($value, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
            case 'string':
            default:
                return filter_var(
                    $value,
                    FILTER_SANITIZE_STRING,
                    FILTER_FLAG_ENCODE_LOW | FILTER_FLAG_ENCODE_HIGH | FILTER_FLAG_ENCODE_AMP
                );
        }
    }


    /**
     * Custom HTML classes to be applied to this form input's help text.
     * returns a concatenated string unless $as_array is set to true
     *
     * @return array
     */
    public function attributes(): array
    {
        return $this->attributes;
    }


    /**
     * @param string                $attribute
     * @param bool|float|int|string $value
     */
    public function addAttribute(string $attribute, $value): void
    {
        if (!array_key_exists($attribute, $this->attributes)) {
            $this->attributes[ $attribute ] = $this->sanitize($attribute, $value);
        }
    }


    /**
     * @param string $attribute
     */
    public function removeAttribute(string $attribute): void
    {
        unset($this->attributes[ $attribute ]);
    }


    /**
     * @param array $attributes array where keys are the attribute name and values are the attribute's value
     */
    public function setAttributes(array $attributes): void
    {
        foreach ($attributes as $attribute => $value) {
            $this->addAttribute($attribute, $value);
        }
    }
}
