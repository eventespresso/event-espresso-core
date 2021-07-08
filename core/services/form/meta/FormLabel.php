<?php

namespace EventEspresso\core\services\form\meta;

use EventEspresso\core\services\json\JsonDataHandler;

/**
 * Class FormLabel
 * For managing the admin and public labels for a form element
 *
 * @author  Brent Christensen
 * @package EventEspresso\core\services\form\meta
 * @since   $VID:$
 */
class FormLabel implements JsonableInterface
{

    /**
     * @var JsonDataHandler
     */
    private $json_data_handler;

    /**
     * Input label displayed in the admin to help differentiate input from others
     *
     * @var string
     */
    private $adminLabel;

    /**
     * Input label displayed on public forms, ie: the actual question text.
     *
     * @var string
     */
    private $publicLabel;

    /**
     * @var bool
     */
    private $showLabel;

    /**
     * The HTML block displayed for block elements.
     *
     * @var string
     */
    private $html;


    /**
     * FormLabel constructor.
     *
     * @param JsonDataHandler $json_data_handler
     * @param string          $adminLabel
     * @param string          $publicLabel
     * @param bool            $showLabel
     */
    public function __construct(
        JsonDataHandler $json_data_handler,
        string $adminLabel,
        string $publicLabel,
        bool $showLabel,
        string $html
    ) {
        $this->json_data_handler = $json_data_handler;
        $this->setAdminLabel($adminLabel);
        $this->setPublicLabel($publicLabel);
        $this->setShowLabel($showLabel);
        $this->setHtml($html);
    }


    /**
     * @param string $json
     * @return FormLabel
     */
    public static function fromJson(string $json): FormLabel
    {
        $json_data_handler = new JsonDataHandler();
        $json_data_handler->configure(JsonDataHandler::DATA_TYPE_OBJECT);
        $data        = $json_data_handler->decodeJson($json);
        $adminLabel  = $data->adminLabel ?? '';
        $publicLabel = $data->publicLabel ?? '';
        $showLabel   = $data->showLabel ?? false;
        $html        = $data->html ?? '';
        return new FormLabel($json_data_handler, $adminLabel, $publicLabel, $showLabel, $html);
    }


    /**
     * @return array
     */
    public function toArray(): array
    {
        return [
            'adminLabel'  => $this->adminLabel,
            'publicLabel' => $this->publicLabel,
            'showLabel'   => $this->showLabel,
            'html'        => $this->html,
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
     * Input label displayed in the admin to help differentiate input from others
     *
     * @return string
     */
    public function adminLabel(): string
    {
        return $this->adminLabel;
    }


    /**
     * @param string $adminLabel
     */
    public function setAdminLabel(string $adminLabel): void
    {
        $this->adminLabel = sanitize_text_field($adminLabel);
    }


    /**
     * Input label displayed on public forms, ie: the actual question text.
     *
     * @return string
     */
    public function publicLabel(): string
    {
        return $this->publicLabel;
    }


    /**
     * @param string $publicLabel
     */
    public function setPublicLabel(string $publicLabel): void
    {
        $this->publicLabel = sanitize_text_field($publicLabel);
    }


    /**
     * @return bool
     */
    public function showLabel(): bool
    {
        return $this->showLabel;
    }


    /**
     * @param bool|int|string $showLabel
     */
    public function setShowLabel($showLabel): void
    {
        $this->showLabel = filter_var($showLabel, FILTER_VALIDATE_BOOLEAN);
    }


    /**
     * @return string
     */
    public function html(): string
    {
        return $this->html;
    }


    /**
     * @param string $html
     */
    public function setHtml($html): void
    {
        $this->html = wp_kses_post($html);
    }
}
