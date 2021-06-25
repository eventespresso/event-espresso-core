<?php

namespace EventEspresso\core\services\form\meta;

use EventEspresso\core\services\json\JsonDataHandler;

/**
 * Class Required
 * For managing the HTML required attribute for a form element
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\services\form\meta
 * @since   $VID:$
 */
class Required
{

    /**
     * @var JsonDataHandler
     */
    private $json_data_handler;

    /** Whether or not the input must be supplied with a value in order to complete the form.
     *
     * @var bool
     */
    private $required;

    /**
     * Custom validation text displayed alongside a required form input to assist users with completing the form.
     *
     * @var string
     */
    private $validationText;


    /**
     * Required constructor.
     *
     * @param JsonDataHandler $json_data_handler
     * @param bool            $required
     * @param string          $validationText
     */
    public function __construct(JsonDataHandler $json_data_handler, bool $required, string $validationText)
    {
        $this->json_data_handler = $json_data_handler;
        $this->setRequired($required);
        $this->setValidationText($validationText);
    }


    /**
     * @param string $json
     * @return Required
     */
    public static function fromJson(string $json): Required
    {
        $json_data_handler = new JsonDataHandler();
        $json_data_handler->configure(
            JsonDataHandler::DATA_TYPE_OBJECT
        );
        $data           = $json_data_handler->decodeJson($json);
        $required       = $data->required ?? false;
        $validationText = $data->validationText ?? '';
        return new Required($json_data_handler, $required, $validationText);
    }


    /**
     * @return array
     */
    public function toArray(): array
    {
        return [
            'required'       => $this->required,
            'validationText' => $this->validationText,
        ];
    }


    /**
     * @return string
     */
    public function toJson(): string
    {
        return $this->json_data_handler->encodeData($this->toArray());
    }


    /**
     *
     *
     * @return bool
     */
    public function isRequired(): ?bool
    {
        return $this->required;
    }


    /**
     * @param bool|int|string $required
     */
    public function setRequired($required = true)
    {
        $this->required = filter_var($required, FILTER_VALIDATE_BOOLEAN);
    }


    /**
     * @return string
     */
    public function validationText(): ?string
    {
        return $this->validationText;
    }


    /**
     * @param string $validationText
     */
    public function setValidationText(string $validationText)
    {
        $this->validationText = sanitize_text_field($validationText);
    }
}
