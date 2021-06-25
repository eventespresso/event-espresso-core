<?php

namespace EventEspresso\core\services\form\meta;

use EventEspresso\core\services\json\JsonDataHandler;

/**
 * Class HelpText
 * For managing help text that may accompany a form element
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\services\form\meta
 * @since   $VID:$
 */
class HelpText
{

    /**
     * @var JsonDataHandler
     */
    private $json_data_handler;

    /**
     * Additional text displayed alongside a form input to assist users with completing the form.
     *
     * @var string
     */
    private $helpText;

    /**
     * Custom HTML classes to be applied to this form input's help text.
     *
     * @var array
     */
    private $htmlClasses;


    /**
     * HelpText constructor.
     *
     * @param JsonDataHandler $json_data_handler
     * @param array           $htmlClass
     * @param string          $helpText
     */
    public function __construct(
        JsonDataHandler $json_data_handler,
        array $htmlClass,
        string $helpText
    ) {
        $this->json_data_handler = $json_data_handler;
        $this->setHtmlClasses($htmlClass);
        $this->setHelpText($helpText);
    }


    /**
     * @param string $json
     * @return HelpText
     */
    public static function fromJson(string $json): HelpText
    {
        $json_data_handler = new JsonDataHandler();
        $json_data_handler->configure(
            JsonDataHandler::DATA_TYPE_OBJECT
        );
        $data      = $json_data_handler->decodeJson($json);
        $htmlClass = (array) $data->htmlClass ?? [];
        $helpText  = $data->helpText ?? '';
        return new HelpText($json_data_handler, $htmlClass, $helpText);
    }


    /**
     * @return array
     */
    public function toArray(): array
    {
        return [
            'helpText'  => $this->helpText,
            'htmlClass' => $this->htmlClasses(),
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
     * Input label displayed on public forms, ie: the actual question text.
     *
     * @return string
     */
    public function helpText(): string
    {
        return $this->helpText;
    }


    /**
     * @param string $helpText
     */
    public function setHelpText(string $helpText): void
    {
        $this->helpText = sanitize_text_field($helpText);
    }


    /**
     * Custom HTML classes to be applied to this form input's help text.
     * returns a concatenated string unless $as_array is set to true
     *
     * @return array|string
     */
    public function htmlClasses($as_array = false)
    {
        return $as_array
            ? $this->htmlClasses
            : implode(' ', $this->htmlClasses);
    }


    /**
     * @param string $htmlClass
     */
    public function addHtmlClass(string $htmlClass): void
    {
        $htmlClass = sanitize_key($htmlClass);
        if (! in_array($htmlClass, $this->htmlClasses, true)) {
            $this->htmlClasses[] = $htmlClass;
        }
    }


    /**
     * @param string $htmlClass
     */
    public function removeHtmlClass(string $htmlClass): void
    {
        $htmlClass = sanitize_key($htmlClass);
        unset($this->htmlClasses[ $htmlClass ]);
    }


    /**
     * @param array $htmlClasses
     */
    public function setHtmlClasses(array $htmlClasses): void
    {
        $this->htmlClasses = array_map('sanitize_key', $htmlClasses);
    }
}
